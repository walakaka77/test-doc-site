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

#### Unique Identifier
This sheet is fully computed, no human inputs. The first column is the unique identifier -- Year, Month, Staff Name. This MUST be unique for each record.

Based on this unique identifier, we will combine the amount payable for the person (if the person has more than one payment item). For example they might have:
- Overtime
- Basic Salary
- Bonus

Let's take Walakaka Staff for Aug 2025 for example. In the Salary sheet, he has several payment items:
![Walakaka Salary Sheet](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 4.35.33 PM.png)

So in the `Salary Combined` sheet, these payment items are consolidated:
![Salary combined for walakaka](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 4.37.01 PM.png)

{: .note }
Recall that the unique identifer must be unique for each month + staff. Else, the consolidation will incorrectly consolidate

#### Total Amount

The total amount field is just a consolidation of all the items payable in the `salary sheet`.

This is what the CPF, Skills Development Levy is computed from!

Formula used is as follows:
```
=ARRAYFORMULA(
  IF(A2:A<>"",
     VLOOKUP(A2:A, 'Salary Unit'!A:I, 9, FALSE),
     )
)
```

#### Employee CPF Contribution

This column computes the employee CPF contribution. See the formula we use here:
```
=ARRAYFORMULA(
  LET(
    key, A2:A,
    yr, LEFT(key,4),
    pay, B2:B,
    cap, XLOOKUP(yr, 'Validation Sheet'!C:C, 'Validation Sheet'!D:D),
    IF(pay<>"", IF(pay>cap, cap, pay) * 0.2, )
  )
)
```

1. Notice that we use the unique identifer as the key. 
2. If there is a value, we populate this field
3. We also take the year from the unique identifier, and then check that is the salary cap
  - This is based on the [ordinary wage ceiling](https://www.cpf.gov.sg/service/article/what-is-the-ordinary-wage-ow-ceiling). Check out the CPF site itself to find out more details regarding the rates
  - For us we track this mapping in the validation sheet
4. Next we calculate
  - 20% of the total amount payable
  - If the amount is less than the amount capped, we take 20% of amount payable
  - If more that the cap amount, then we take the max cap amount. For 2025, it's  7400 SGD!

![formula for employee CPF contribution](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 4.44.16 PM.png)

As for the mapping for the max capped amount
- This is based the year
- And the mapping is tracked in the validation sheet. See screenshot below for reference

![Validation sheet mapping for OWP](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 4.45.38 PM.png)

{: .note }
Currently, there are only 2 years mapped -- 2025, 2026. In layer years, when CPF confirms the revised amount for subsequent years, we can update the mapping and the amount will be computed dynamically based on the unique keys!!


There is another key to note there! The formula assumes that all staff is below 55 years old.
CPF has a different CPF contribution rate based on your age. You can check it out on [their website here!](https://www.cpf.gov.sg/employer/employer-obligations/how-much-cpf-contributions-to-pay).

{: .warning }
The current formula does NOT support staff more than 55 years old. If there are hires more than 55 years old, the formulas must be adjusted accordingly!


#### Employer CPF Contribution (Dynamic)

Similar to the Employee CPF contribution, this tracks the employers CPF contribution
1. Instead of 20%, it's 17%
2. The capped CPF amount is the same
3. Similarly, we don't handle staff above 55 years old


Formula is as follows for reference (see how it's really similar to the employee cpf contribution):
```
=ARRAYFORMULA(
  LET(
    key, A2:A,
    yr, LEFT(key,4),
    pay, B2:B,
    cap, XLOOKUP(yr, 'Validation Sheet'!C:C, 'Validation Sheet'!D:D),
    IF(pay<>"", IF(pay>cap, cap, pay) * 0.17, )
  )
)
```
For reference, see the screenshot below:
![formula for employee cpf contribution](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 4.51.16 PM.png)

{: .note }
Skipping some unimportant fields as it takes too much time to explain everything. But feel free to reach out if there are any clarifications required!

#### Skills Development Levy
Skill development levy is an amount that the employer will have to pay to the CPF:
1. It will be 0.25% of the total amount paid to staff
2. It has a minimum amount payable of $2
3. It also has a maximum amount payable of $11.25

Hence, the formula used is as follows:
```
=ARRAYFORMULA(
  IF(B2:B<>"",
     IF(B2:B*0.0025<2,2,
        IF(B2:B*0.0025>11.25,11.25,B2:B*0.0025)
     ),
  )
)
```

1. We check whether there is a value in column B, the total amount
2. If yes, then we take 0.25% of that value
  - If value is less than $2, default to $2
  - If value is more than $2 we proceed to the next check
3. In the next check
  - If value is more than $11.25, default to 11.25
  - Else, we default to 0.25% of the total amount payable in column B?


{: .note }
Confusing? Hell yeah, that's why we automate the computation so that our end users don't need to spend time computing this!

See our formula in action for reference:
![Skills Development Levy](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 4.56.56 PM.png)

Now, we have all the fields required to generate our Pay Slip -- automatically!!

### Pay Slip Template!

So in our pay slip template, we will be referencing the `Salary Combined` and `Salary Unit` sheet using our unique identifier and populating the fields accordingly:
1. Reference Field
2. Earning Section
3. Deduction Section
4. Total Amount Section

#### Reference Field

This field is the unique identifier that we have been using across `Salary Unit` and `Salary Combined` sheet.

We allow the user to select an existing ID, see screenshot below:
![Pay Slip Template, Unique ID](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 5.00.54 PM.png)

{: .note }
Selecting the unique ID will populate the subsequent sections using fields from the `Salary Unit` and `Salary Combined` sheet!

#### Earning Section

The earning's section  aims to specify the total gross amount payable. This section aims to break each payment item into their different records.

Take for example Walakaka's payment:
![Shafik Walakaka Pay Slip](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 5.04.02 PM.png)

We expect each line item in the `Salary Unit` sheet to be listed here. To do so, we use this formula:
```
=FILTER('Salary Unit'!D:H,'Salary Unit'!A:A=E5)
```

Simple right! It basically, does this:
1. Takes the unique key from E5: `2025-08-Walakaka`
2. Cross checks it against the `Salary Unit` sheet column A
3. Takes anything that matches
4. Generates a table and populates the following columns from `Salary Unit`:
  - Column D
  - Column E
  - Column F
  - Column G
  - Column H

For reference:
![formula for earnings section](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 5.15.30 PM.png)

We have a separate formulat at the bottom to sum up the total amount:
```
=sum(F11:F13)
```

{: .warning }
This template does not support more than 3 payment items. We don't expect more than 3 payment items.
If more than 3 payment items is required, we will need to update the template!


Regardless, it's really cool -- that we can generate the earnings section dynamically!


### Deduction Section

The deduction section tracks how much deductions from your gross salary. For Walakaka example, he's hit the CPF ceiling so his deduction is 20% x 7400 SGD.

Reference screenshot for deduction section:
![Deduction Section!](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 5.09.09 PM.png)

The deduction section does the following:
1. Checks the unique identifier in E5
2. Checks against `Combined Salary` sheet, and matches the unique identifier
3. Takes the amount `Employee CPF Contribution`

Formula is as follows:
```
=FILTER('Salary Combined'!C:C,'Salary Combined'!A:A=E5)
```

For reference:
![deduction section](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 5.17.01 PM.png)

#### Total Amount Payable

Total amount payable is straight forward, we just take the Gross Salary - Deduction. In this case 9900 - 1480 = 8420!!

![final amount payable nett](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 5.18.27 PM.png)

#### Generating the Pay Slip

Next, to generate the payslip
1. Click on `File`
2. Hit on `Download`
3. Select `PDF`

![steps to export payslip](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 5.12.19 PM.png)

This gives you a nice PDF extract of the payslip that has been generated!

See a [sample here](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Payroll Working Document -- Shafik Test - Template-Pay-Slip.pdf) that you can download for reference!

![image of sample PDF pay slip downloaded](../../parent-page-tech-adventures/child-page-8-general-tech/grandchild-page-1-google-sheets-invoice/Screenshot 2025-08-24 at 5.20.49 PM.png)


## Thank you!

Hope this helps you, it definitely helped me! No more mundane shit tasks to do :)
Can focus my efforts on higher value stuff!!