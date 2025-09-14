---
layout: page
title: CVE Scraper
permalink: /tech-adventures/general-tech/automate-csv-testing
parent: General Tech
grand_parent: Tech Adventures
nav_order: 4
index: 'yes'
follow: 'yes'
description: Automate CSV Testing
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


## Introduction

This walkthrough explains the logic and structure of the automated CSV validation implemented in `validate.js`. The goal is to reduce manual testing effort, allowing business analysts to focus on higher-value tasks. The code is designed as a quick, pragmatic check to ensure data quality and correctness, not as a scalable or production-grade solution. Some code is intentionally hacky for speed and transparency. All sensitive IDs and values in this document are replaced with realistic-looking placeholders (e.g., `COMPANY_ID_XYZ`, `BANK_ACCOUNT_ID_123`).

{: .note}
Disclaimer, this automation is actually inspired by my DevOps lead. He told me "You are too hardworking, you should automate more stuff". So I decided to be lazier haha!!


## Approach

Our validation approach is layered to maximize coverage and catch errors early:

1. **Static Field Checks (First Cut):**
    - Every record is first checked for required static field values (e.g., company ID, currency, account IDs).
    - This quickly filters out records with missing or incorrect static data before more complex checks.

2. **Grouping Records:**
    - Records are grouped based on business logic (e.g., by `TransactionMemo` + `ExternalReference` for charges and fees, or by `TransactionID` for payouts).

3. **Within-Group Checks:**
    - For each group, we check that certain fields are consistent (e.g., all records in a group have the same `TransactionDate`, `TransactionID`, or `AdHocBankTransactionID`).
    - Some fields are expected to differ within a group (e.g., `LineAmount` for each payment item).
    - Example: In a charge group, all `TransactionDate` values should be the same, but each `LineMemo` may be different.
    - We also ensure that each group has both types of records (e.g., both a charge and a fee) by checking for 2 distinct `AdHocBankTransactionKey` values.

4. **Across-Group Checks:**
    - We check that certain fields are unique across groups (e.g., `TransactionMemo`, `ExternalReference`, `AdHocBankTransactionKey` should not appear in multiple groups).
    - This prevents duplicate or conflicting records in the dataset.

This layered approach ensures that both individual records and their relationships within and across groups are validated, providing robust coverage for the business rules.


---

## Code Walkthrough

### 1. Static Field Assertions (Pre-Grouping)

**Purpose:** Ensure every record has the expected static values before any group-based validation.

```js
const EXPECTED_STATIC_VALUES = {
    Submit: "1",
    AddOnly: "1",
    CompanyReferenceIDType: "Company_Reference_ID",
    CompanyReferenceID: "COMPANY_ID_XYZ",
    Currency: "SGD",
    BankAccountReferenceIDType: "Bank_Account_ID",
    BankAccountReferenceID: "BANK_ACCOUNT_ID_123",
    // ...other static fields...
};

function validateStaticFieldsExact(rows) {
    const errors = [];
    rows.forEach((row, rowIndex) => {
        for (const [field, expected] of Object.entries(EXPECTED_STATIC_VALUES)) {
            const actual = String(row[field] ?? "").trim();
            if (actual !== expected) {
                errors.push(`❌ Row ${rowIndex + 2} field "${field}" has value "${actual}", expected "${expected}"`);
            }
        }
    });
    return errors;
}
```

**What it does:**
- Checks every row for exact matches to static values.
- Reports errors for any mismatches.

---

### 2. Enum Field Assertions

**Purpose:** Ensure fields with allowed value sets (enums) only contain valid values.

```js
const EXPECTED_ENUM_VALUES = {
    DepositOrWithdrawal: ["Withdrawal", "Deposit"],
    // ...other enums...
};

function validateStaticAndEnumFields(row, rowIndex, rowErrors) {
    // ...static checks...
    for (const [field, allowedValues] of Object.entries(EXPECTED_ENUM_VALUES)) {
        if (!allowedValues.includes(row[field])) {
            handleRowError(
                `Row ${rowIndex+2} ❌ ${field} "${row[field]}" not in allowed list: [${allowedValues.join(", ")}]`,
                rowErrors
            );
        }
    }
}
```

**What it does:**
- Checks that enum fields only contain allowed values.

---

### 3. Grouping and Group-Level Assertions

#### a. Charge and Fees Groups

**Purpose:** Group charge records and their associated fee for each payment.

```js
function groupChargeAndFees(rows) {
    const grouped = {};
    rows.forEach(row => {
        const extRef = row.ExternalReference ?? "";
        if (extRef.toLowerCase().startsWith("txn")) return;
        const memo = row.TransactionMemo ?? "";
        const groupKey = `${memo}||${extRef}`;
        if (!grouped[groupKey]) grouped[groupKey] = [];
        grouped[groupKey].push(row);
    });
    return grouped;
}
```

**What it does:**
- Groups records by `TransactionMemo` and `ExternalReference` (excluding Stripe fee rows).

**Assertions:**
- Exactly 2 distinct transaction keys per group.
- All static fields match expected values (see above).
- All group fields are consistent.

#### b. Charge Alone Groups

**Purpose:** Validate charge records for the same payment item.

```js
function validateChargeGroup(groupRows, groupKey, rows) {
    // ...assert identical fields, sequential LineOrder, sum of LineAmount, etc...
}
```

**What it does:**
- Checks all charge records in a group for consistency and correct totals.
- Asserts all `Tax_Amount` values are identical (see TestPlan caveat).

#### c. Withdrawal Groups (Charge Fees)

**Purpose:** Validate charge fee records for each payment.

```js
function groupWithdrawalCharges(rows, rowErrors) {
    // ...group by TransactionMemo, ExternalReference, DepositOrWithdrawal...
}
```

**What it does:**
- Ensures only one charge fee record per payment.
- Checks static and group-level fields.

#### d. Withdrawal by TransactionID Groups

**Purpose:** Validate all fee records for the same payout.

```js
function groupWithdrawalByTransactionID(rows) {
    // ...group by DepositOrWithdrawal and TransactionID...
}
```

**What it does:**
- Ensures all fee records for a payout have consistent payout date and unique keys.

#### e. Stripe Fee Groups

**Purpose:** Validate additional Stripe fee records (e.g., 3DS fees).

```js
function groupTxnExternalReferences(rows) {
    // ...group by ExternalReference where it starts with "txn"...
}
```

**What it does:**
- Groups and validates all Stripe fee records for a payout.
- No assertion that LineMemo matches ExternalReference (see TestPlan).



## Error Output: Console and CSV

The validation script provides error feedback in two ways:

1. **Console Log:**
    - As the script runs, all validation errors are printed to the console in real time.
    - This is useful for quick debugging or for developers running the script interactively.

    ```js
    function handleRowError(err, rowErrors) {
        console.log("Validation error:", err);
        // ...append error to rowErrors for CSV output...
    }
    ```

2. **CSV Output:**
    - After validation, the script writes a new CSV file with an additional `Errors` column.
    - Each row's errors are listed in the corresponding row of the output file.
    - This allows business analysts to review validation results directly in Excel or another spreadsheet tool, and to share the annotated file with developers for further investigation.

    ```js
    function writeCsvWithErrors(rows, rowErrors, outPath) {
        rows.forEach((row, idx) => {
            row.Errors = rowErrors[idx].join("; ");
        });
        // ...write output CSV with errors column...
    }
    ```

This dual output makes it easy for both technical and non-technical users to review and act on validation results, without needing to parse console logs.



---

## Room for Improvement

- The code is intentionally quick and hacky, not meant for production or scaling.
- Error handling and reporting could be more robust.
- Grouping logic could be abstracted for maintainability.
- Sensitive IDs are replaced with placeholders for transparency in this documentation.
- For real-world use, consider refactoring for clarity, modularity, and testability.

---

## Transparency Note

All IDs and sensitive values in this walkthrough are dummy placeholders (e.g., `COMPANY_ID_XYZ`, `BANK_ACCOUNT_ID_123`). Replace with your actual values as needed.

---
{: .note}
Now, I have more time to actually do other stuff -- like checking that the logic of the application matches, the records that are generated. Because I can be confident that once generated, the fields will all be accurate!

This walkthrough should help business analysts and testers understand the validation logic, reduce manual effort, and focus on higher-value tasks.

