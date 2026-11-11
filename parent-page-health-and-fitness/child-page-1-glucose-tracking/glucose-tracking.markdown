---
layout: page
title: My Glucose Readings
permalink: /health-and-fitness/glucose-tracking/
parent: Health & Fitness
nav_order: 1
index: 'yes'
follow: 'yes'
description: My blood glucose readings from a FreeStyle Libre sensor, with a chart, average, and time in range, updated whenever I pull new data.
image: ../../parent-page-health-and-fitness/child-page-1-glucose-tracking/glucose-chart.png
---

# My Glucose Readings
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

I'm wearing a FreeStyle Libre sensor, which reads my blood glucose every 15 minutes. This page shows my latest readings, and I refresh it whenever I pull new data from LibreView.

## Latest readings

<!-- glucose-summary:start -->
_Last updated 11 Nov 2026, 20:51 (Singapore time). Covers 197 hours of sensor data._

<div id="glucose-interactive" data-src="/parent-page-health-and-fitness/child-page-1-glucose-tracking/glucose-readings.json?v=202611112051" style="position:relative;height:380px">
  <canvas role="img" aria-label="Interactive line chart of my glucose readings from 3 Nov 2026, 15:57 to 11 Nov 2026, 20:51, average 5.6 mmol/L, with my 7.8 mmol/L ceiling marked. Hover or tap a point for details."></canvas>
</div>
<noscript><img src="/parent-page-health-and-fitness/child-page-1-glucose-tracking/glucose-chart.png?v=202611112051" alt="Line chart of my glucose readings from 3 Nov 2026, 15:57 to 11 Nov 2026, 20:51, average 5.6 mmol/L, 100% within the 3.9–10.0 target range"></noscript>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="/parent-page-health-and-fitness/child-page-1-glucose-tracking/glucose-chart.js?v=202611112051"></script>

- **Average glucose:** 5.6 mmol/L
- **Lowest / highest:** 3.9 / 9.3 mmol/L
- **Time in range (3.9–10.0 mmol/L):** 100%
- **Above 7.8 mmol/L (my ceiling):** 1% of sensor readings, 4 of 125 scans; peak 9.3 at 5 Nov 2026, 19:30
- **Readings:** 651 sensor readings, 125 manual scans

### Swings and recovery

- **Variability:** standard deviation 0.65 mmol/L, coefficient of variation 12% (the usual CGM stability target is 36% or lower)
- **Steady readings:** 94% of 15-minute steps changed by less than 0.06 mmol/L per minute (LibreLink's flat arrow); 2 of 598 changed faster than 0.11 mmol/L per minute
- **Steepest rise:** 6.8 → 8.8 in 15 min (0.13 mmol/L per minute), 5 Nov 2026, 19:00
- **Steepest drop:** 6.4 → 4.4 in 15 min (0.13 mmol/L per minute), 4 Nov 2026, 18:59
- **Sensor spikes above 7.8:** 2
  - **5 Nov 2026, 19:30:** 5.2 → 9.3 (+4.1) in 90 min; above 7.8 for about 45 min; back to 5.7 or lower 150 min after the peak
  - **7 Nov 2026, 13:02:** 5.4 → 8.0 (+2.6) in 75 min; above 7.8 for about 30 min; back to 5.9 or lower 60 min after the peak
<!-- glucose-summary:end -->

## How to read the chart

- **Blue line:** the sensor's automatic reading, every 15 minutes.
- **Orange dots:** the times I scanned the sensor with my phone.
- **Green band:** 3.9–10.0 mmol/L, the target range most CGM reports use.
- **Gaps in the line:** times the sensor didn't record a reading.
- **Red dashed line:** 7.8 mmol/L, the ceiling I'm aiming to stay under. Scans above it show as red dots.
- **Purple triangles:** notes I logged in the LibreLink app, like what I ate.
- **Hover or tap any point** to see its exact value and time, how far it is from my ceiling, how much it changed since the previous reading, and that day's average, low and high.

## What the swing numbers mean

- **Coefficient of variation (CV):** how much my glucose moves around relative to its average. It's the standard measure of stability in CGM reports, where 36% or lower counts as stable.
- **Rate of change:** how fast glucose rises or falls between 15-minute sensor readings, in mmol/L per minute. The thresholds come from LibreLink's trend arrows: under 0.06 shows a flat arrow, and over 0.11 shows a straight up or down arrow.
- **Spikes above 7.8:** for each run of sensor readings over my ceiling, the low where the climb started, how high and how fast it went, how long it stayed above 7.8, and how long it took to come back down. A quick return to the starting level is what I want to see.

{: .warning }
This is my own personal data, shared for interest only. It's not medical advice.

Until next time, peace and love!
