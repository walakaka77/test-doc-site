---
layout: page
title: Google Sheets -- Payroll
permalink: /tech-adventures/general-tech/google-sheets-payroll
parent: General Tech
grand_parent: Tech Adventures
nav_order: 1
index: 'yes'
follow: 'yes'
description: Automating Payroll Generation w Google Sheets
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/adyen-online-payments.png
---

# Introduction

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

So, Xero just retired their payroll system. See [this article for more details](https://central.xero.com/s/article/About-the-retirement-of-pay-run#:~:text=Xero%20will%20be%20retiring%20its,moved%20into%20read%2Donly%20mode.)!

Therefore, now companies that previously uses Xero for their payroll have to:
- Integrate with a third party (which will also incur additional fees) or
- Proceed to manually track and generate their pay slips


## What we decided -- Google Sheets

Given that our company is quite small -- tiny. Only has 4 people, it's not really worth it to integrate with a third party and incur additonal costs.

However, doing it manually will really consume time that can be used for doing focus work.
It's mind numbing repetetitive activity, that would take approximately 2 good hours from your day.


## Google Sheets Plan

So we try to automate the payslip generation with Google Sheet. The idea is that
1. We create a staff record
2. Enter their gross salary
3. Google sheets can calculate the relevant CPF contributions, skills development levy etc.
4. We then retrieve the relevant fields from the salary records into a template, that can be downloaded as PDF
5. We should also have a report to allow us to check monthly
  - Payouts performed to staff
  - Payouts performed to the bank


{: .note }
This is completely experimental, but it was an experiment that turned out well! Read on to see how we managed to do it!!


## Google Sheets Structure

To achieve the above, we need to have certain details. So we need to plan what details should be stored
- Are they static
- Dynamic? etc.

For us, we broke it down into these 4 tables:
- User Records -- details of the staff
- Basic Salary Records -- records of each salary line item (for example, basic salary bonus etc.)
- Combined Salary Records -- records of total salary for the month
  - This records shall be used to calculate CPF payable etc.
  - Because CPF is calculated based on the amount received per month
- Pay Slip Template
  - This is a template, that retrieves the relevant fields from `Combined Salary` records
  - This template will be exported as a PDF, and actually be shared to actual working staff --> So it's important to get it right!
- Report
  - This is just a pivot table
  - The main aim is to ensure that the person performing the payouts can counter check to ensure the correct amount is paid out per individual, and as a whole


### User Records

We kept the staff sheet simple for now, we just have the following fields:
- Name
- Date of Birth
- Age (Computed dynamically)

{: .note }
> We use this formula to ensure that the computed columns are generated dynamically as more record grows:
> ```vb
=ARRAYFORMULA(
  IF(B2:B<>"", DATEDIF(B2:B, TODAY(), "Y"), )
)
```
> This formula dynamically calculates the years between each date in column B and today’s date for every non-empty row, automatically expanding as new records (unique keys) are added.

See the image below for a sample of our user records table:
![user record table](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 2.19.43 PM.png)

To create a user, just add another record -- and the user becomes available to use in other sheets such as, the `Salary Unit` sheet.

Now is a good time for us to explore the `Salary Unit` sheet!

### Salary Unit

The `Salary Unit` sheet aims to capture each salary payout in the form of
- Salary
- Bonus or
- Overtime


{: .note }
`user` and `payment month` is the unique identifier for a payment record for the specific user for the month

Each salary record will be tied to a unique `user` + `payment month` record. We can see the structure of our `Salary Unit` sheet as follows:
- Helper Column to create a unique ID for each `user` and `payment month`
- Payment Month
- User
- Type (which represents tpye of salary, such as basic, OT etc.)
- Qty --> a static field, always 1
- Rate --> This is the basic Gross Salary, before payout
- Account --> Static field
- Amount --> Based on `Rate`
- Total Amount --> Basically `Amount` x `Qty`. But since `Qty` is always 1, its always the same value as `Amount`
- Helper Month, Year --> In case we want to filter by unique Months

See screenshot of a sample `salary unit` sheet:
![salary unit](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 2.26.58 PM.png)

{: .note }
Only the columns in blue are editable to the users. The rest are protected to prevent any data corruption

The Payment Month is a dropdown list from a pre-defined range of months. This prevents users from accidentally entering invalid months

The users is a dropdown list from a pre-defined range that references the user records (in the `user sheet`). 

See below for a screenshot of the data validation:
![Data Validation for dropdown](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 2.30.15 PM.png)

More details regarding the specific `Payment Month` validation selection for your reference:
![payment month validation](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 2.33.30 PM.png)

And to see the validation sheet, see the screenshot below -- this is where the values selectable comes from (For Payment Type and Payment Months):
![Validation Sheet](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 2.31.45 PM.png)



As for the helper column, we concatenate the payment month and user field to create a unique ID that we can use to reference later on:

```
=ARRAYFORMULA(
  IF((B2:B<>"")*(C2:C<>""), TEXT(B2:B,"YYYY-MM") & "-" & C2:C, )
)
```

Screenshot of the example is as follows:
![helper column and manual entry for rate](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 2.36.12 PM.png)


And the rate, is manually entered!


### Salary Combined

It's in this sheet where the heavy lifting occurs!
- We retrieve the basic salary
- Compute CPF Payable

We'll take a short break from writing this article here. We'll continue later!!