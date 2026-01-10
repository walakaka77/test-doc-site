---
layout: page
title: Bash script merge CSV
permalink: /tech-adventures/general-tech/bash-script-merge-csv
parent: General Tech
grand_parent: Tech Adventures
nav_order: 5
index: 'yes'
follow: 'yes'
description: BASH Script Merge CSV
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/adyen-online-payments.png
---

# Automated CSV Validation Walkthrough

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

# merge.sh — purpose, usage and operational guidance

## Overview
We receive daily integration files (invoices, returns, payments, etc.) that contain many records (typically 20–100 each). After go‑live we need a reliable way to monitor these feeds and detect inconsistent or missing records. Manually opening each file is error prone and slow.

{: .note}
This is a period of high volatility where the system is stabilising and  we need to monitor a crucial interface between 2 systems! We need to reduce overheads for monitoring whilst maintaining accuracy!

The `merge.sh` script solves this by combining multiple integration text files into one consolidated file ready for inspection or Excel import. The script:
- merges files matching a prefix,
- optionally strips a configurable number of footer lines (useful when some files contain 3-line summary footers),
- appends the source filename (and a category) to each row so records are traceable back to the source file,
- supports categorisation by filename prefix (e.g. Invoice, GiroColl, PaymentMode, CustomerMaster).

## Business context and process around the script

{: .note}
Full business context is always required before you can introduce or automate a process. If the business context is missing or the process is messy, you'll simply be automating the incorret things -- and scaling the inaccuracies lol

Outside the script you should:
1. Collect daily integration files in a single folder.
2. Run `merge.sh` from that folder to produce a single merged output.
3. Run quick validation checks (field counts, missing columns) on the merged file.
4. Load the merged file into Excel (Power Query) or a BI tool for deeper analysis and exception reporting.
5. Record any anomalies (e.g. unexpected field counts, missing files) and follow-up with the upstream sender.

This workflow:
- reduces manual work and human error,
- preserves provenance (filename) for each record,
- helps spot structural changes (new/removed columns) quickly.

{: .warning}
Throughout my limited experience so far, the cost of communication or miscommunication and confusion is the main reason for delays in timelines. One of the main reasons is human error when validating or checking results. Removing human error from a process that is mind-numbing and also low-value is a surefire way to increase productivity of your team!

## Script behavior (important details)

Here, we come to the nitty gritty of the script. The part that I like (but am not good at).

- The script takes one optional numeric argument: number of tail rows to remove from each input (e.g. summary/footer rows). Example: `bash merge.sh 3`.
- If you pass `0` or omit the parameter, no footer rows are removed.
- Each output row is annotated with the source filename and category (comma separated).
- Files are selected by prefix — the script maps prefixes to categories (examples below). Update the prefix→category mapping inside the script if other types are needed.
- The script does not alter field quoting — it preserves the original line content (except trimming CRs).

Example category mapping (modify in script as needed):
- GIRO_COLL* → GiroColl  
- CUSTOMER.INVOICE* → Invoice  
- PAYMENT_MODE* → PaymentMode  
- CUSTOMER_MASTER* → CustomerMaster  
- Otherwise → Other

## How to run (WSL)
{: .note}
I have WSL installed, so it makes it easier for me to run bash scripts. If you're running on windows cmd -- it might be slightly different, but just chatGPT it, i'm sure its possible.

From the directory that contains the files and the script:

- Run without making executable:
```bash
bash merge.sh 0
```

- Or make executable and run:
```bash
chmod +x merge.sh
./merge.sh 0
```

`0` means "remove no footer rows". Replace with `3` to remove last 3 rows from each file.

## Tips for Excel / Power Query
- Power Query's `Csv.Document(..., Columns=n, ...)` with a hardcoded `Columns` value will truncate fields beyond `n`. Remove the `Columns` parameter or set it to a sufficiently large value to avoid lost columns.
- If you import via Excel Data → From Text/CSV, verify the preview shows all columns before loading.
- If you see missing trailing columns in Excel, check the merged file for inconsistent quoting or stray delimiters.

## Quick validation commands (run in WSL / bash)
Check delimiter consistency and row field counts (adjust `-F` for your delimiter):

```bash
# header field count (comma)
awk -F',' 'NR==1{print "header_fields="NF; exit}' merged_output.txt

# show field counts for first 50 rows
awk -F',' 'NR<=50{print NR, NF}' merged_output.txt

# distinct field counts and how many rows each
awk -F',' '{print NF}' merged_output.txt | sort | uniq -c
```

If your files use `|` as delimiter, change `-F','` to `-F'|'` (or `-F';'` for semicolons).

## If columns are inconsistent
- Use a CSV-aware tool for merging (Python/pandas or csvkit) to preserve quoting and merge headers safely.
- Minimal Python example (safe union of columns, prepends filename):
```python
# python3 merge_preserve.py
import pandas as pd, glob
files = sorted(glob.glob("HSA.I.SHARE.CUSTOMER.INVOICE*"))
dfs = []
for f in files:
    df = pd.read_csv(f, dtype=str, sep=',', keep_default_na=False, header=0)
    df.insert(0, "_source_file", f)
    dfs.append(df)
out = pd.concat(dfs, ignore_index=True, sort=False)
out.to_csv("merged_invoices_preserved.csv", index=False)
```

## Monitoring and follow-up steps (recommended)
- After merging, run the validation commands and store the output counts.
- Create a small Excel/Power Query report to list:
  - files received and record counts,
  - rows with unexpected field counts,
  - unique values that indicate processing issues (e.g. empty key fields).
- Automate daily run (cron / scheduled task) and push a short summary email when anomalies are detected.

## Troubleshooting
- Missing columns in Excel: likely caused by a hardcoded `Columns` param in Power Query. Remove it or increase the value.
- Unexpected extra columns or line breaks: inspect CSV quoting and carriage returns; re-merge using csv-aware tool.
- Filename not visible in Excel rows: ensure you prepend the filename as a column (script option) and that field delimiters match when importing.

## Summary
`merge.sh` provides a fast, auditable way to consolidate daily integration files into a single dataset for monitoring. Combine the script with the recommended validation steps and Excel import guidance to build a repeatable daily check process that reduces manual effort

- This saves countless man‑hours.
- Ensures developers have accurate information based on the true source, not altered by manual intervention.
- The script is reliable and repeatable.
- Can be executed by anyone — share the script and simple usage instructions.

If you have further clarifications, regarding the innerworkings or how this helped us, please feel free to reach out!!