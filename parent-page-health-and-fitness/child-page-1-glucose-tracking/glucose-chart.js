// Interactive glucose chart: hover (or tap) any point for its value, time and stats.
// Data comes from glucose-readings.json, written by fitness-tracking/tools/glucose_build.py.
(function () {
  var box = document.getElementById("glucose-interactive");
  if (!box || !window.Chart) return;

  var HOUR = 3600e3;
  var fmt = function (ms, opts) {
    return new Date(ms).toLocaleString("en-SG", Object.assign({ timeZone: "Asia/Singapore", hour12: false }, opts));
  };
  var dayKey = function (ms) { return fmt(ms, { year: "numeric", month: "2-digit", day: "2-digit" }); };

  fetch(box.dataset.src).then(function (r) { return r.json(); }).then(function (d) {
    // Timestamps are Singapore time; pin the offset so every viewer sees SGT.
    var rows = d.readings.map(function (r) {
      return { x: Date.parse(r[0].replace(" ", "T") + ":00+08:00"), kind: r[1], y: r[2] };
    });
    var sensor = rows.filter(function (r) { return r.kind === "sensor"; });
    var scans = rows.filter(function (r) { return r.kind === "scan"; });

    // Per-day stats for the tooltip.
    var days = {};
    rows.forEach(function (r) {
      var k = dayKey(r.x), s = days[k] || (days[k] = { sum: 0, n: 0, lo: Infinity, hi: -Infinity });
      s.sum += r.y; s.n++; s.lo = Math.min(s.lo, r.y); s.hi = Math.max(s.hi, r.y);
    });

    // Break the line where the sensor skipped readings (> 20 min apart).
    var line = [];
    sensor.forEach(function (r, i) {
      if (i && r.x - sensor[i - 1].x > 20 * 60e3) line.push({ x: r.x - 1, y: null });
      r.prev = i ? sensor[i - 1] : null;
      line.push(r);
    });

    // Notes from the LibreLink app (e.g. meals), drawn just above the nearest reading.
    var notes = (d.notes || []).map(function (n) {
      var x = Date.parse(n[0].replace(" ", "T") + ":00+08:00");
      var near = rows.reduce(function (a, r) { return Math.abs(r.x - x) < Math.abs(a.x - x) ? r : a; });
      return { x: x, y: near.y + 0.5, kind: "note", text: n[1] };
    });
    // The most recent note within the 2 hours before a reading.
    var noteFor = function (r) {
      var hit = null;
      notes.forEach(function (n) { if (n.x <= r.x && r.x - n.x <= 2 * HOUR) hit = n; });
      return hit;
    };

    var over = function (r) { return r.y > d.ceiling; };
    var start = Math.floor((rows[0].x + 8 * HOUR) / (6 * HOUR)) * 6 * HOUR - 8 * HOUR;

    new Chart(box.querySelector("canvas"), {
      data: {
        datasets: [
          { type: "line", label: "Sensor (every 15 min)", data: line, borderColor: "#1f5fa8",
            borderWidth: 2, pointRadius: 0, pointHoverRadius: 5, pointBackgroundColor: "#1f5fa8", tension: 0 },
          { type: "scatter", label: "Manual scans", data: scans, pointRadius: 4, pointHoverRadius: 7,
            backgroundColor: scans.map(function (r) { return over(r) ? "#d62728" : "#e07b20"; }) },
          { type: "scatter", label: "My notes", data: notes, pointStyle: "triangle", pointRadius: 8,
            pointHoverRadius: 10, backgroundColor: "#7b3fa0", borderColor: "#fff", borderWidth: 1 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: "nearest", intersect: false },
        scales: {
          x: { type: "linear", min: start, max: rows[rows.length - 1].x + HOUR,
               // One tick every 6 hours on the SGT clock (00:00, 06:00, 12:00, 18:00).
               afterBuildTicks: function (axis) {
                 var t = [];
                 for (var v = start; v <= axis.max; v += 6 * HOUR) t.push({ value: v });
                 axis.ticks = t;
               },
               ticks: { maxRotation: 0, autoSkip: false,
                        callback: function (v) { return [fmt(v, { day: "numeric", month: "short" }), fmt(v, { hour: "2-digit", minute: "2-digit" })]; } } },
          y: { suggestedMin: 3, suggestedMax: 10, title: { display: true, text: "Glucose (mmol/L)" } }
        },
        plugins: {
          legend: { position: "top", align: "start", labels: { boxWidth: 12 } },
          tooltip: {
            filter: function (item) { return item.raw.y !== null; },
            callbacks: {
              title: function (items) { return fmt(items[0].raw.x, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); },
              label: function (item) {
                var r = item.raw;
                if (r.kind === "note") return "Note: " + r.text;
                return r.y.toFixed(1) + " mmol/L (" + (r.kind === "scan" ? "manual scan" : "sensor") + ")";
              },
              afterLabel: function (item) {
                var r = item.raw, s = days[dayKey(r.x)], out = [];
                if (r.kind === "note") return [];
                var n = noteFor(r);
                if (n) out.push("Note at " + fmt(n.x, { hour: "2-digit", minute: "2-digit" }) + ": " + n.text);
                out.push(over(r) ? "Above my " + d.ceiling + " ceiling by " + (r.y - d.ceiling).toFixed(1)
                                 : (d.ceiling - r.y).toFixed(1) + " below my " + d.ceiling + " ceiling");
                if (r.prev && r.x - r.prev.x <= 20 * 60e3) {
                  var diff = r.y - r.prev.y;
                  out.push("Change since previous reading: " + (diff >= 0 ? "+" : "") + diff.toFixed(1));
                }
                out.push("Day average " + (s.sum / s.n).toFixed(1) + ", low " + s.lo.toFixed(1) + ", high " + s.hi.toFixed(1));
                return out;
              }
            }
          }
        }
      },
      plugins: [{
        // Green target band and red dashed ceiling line, drawn behind the data.
        id: "bands",
        beforeDatasetsDraw: function (c) {
          var a = c.chartArea, y = c.scales.y, ctx = c.ctx;
          ctx.save();
          ctx.fillStyle = "rgba(46,158,91,0.10)";
          ctx.fillRect(a.left, y.getPixelForValue(d.high), a.width, y.getPixelForValue(d.low) - y.getPixelForValue(d.high));
          ctx.strokeStyle = "#d62728"; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(a.left, y.getPixelForValue(d.ceiling)); ctx.lineTo(a.right, y.getPixelForValue(d.ceiling)); ctx.stroke();
          ctx.restore();
        }
      }]
    });
    box.classList.add("ready");
  });
})();
