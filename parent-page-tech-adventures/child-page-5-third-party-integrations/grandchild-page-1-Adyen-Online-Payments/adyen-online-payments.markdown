---
layout: page
title: Adyen Online Payments
permalink: /tech-adventures/third-party-integrations/adyen-online-payments
parent: Third Party Integrations
grand_parent: Tech Adventures
nav_order: 1
index: 'yes'
follow: 'yes'
description: Every performed a card payment online. This article takes you behind the scenes of the implementation with Adyen
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/adyen-online-payments.png
---

<!-----



Conversion time: 0.554 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β36
* Sat Jun 01 2024 18:43:51 GMT-0700 (PDT)
* Source doc: Untitled document
----->



# **Introduction to Online Payments**

In our fast-paced digital era, online card payments have become an integral part of our daily transactions. Whether booking a holiday, ordering groceries, or subscribing to a new streaming service, we rarely stop to think about what goes on behind the scenes. Today, we'll take a deep dive into the online payments flow, using Booking.com as our case study. We'll also explore how this process can be implemented seamlessly with Adyen, a leading payment technology company.


## **Online Payments Flow | Adyen**

To understand the intricacies of the online payment flow, let's break down the steps involved from the moment a shopper reaches the checkout page to when the payment is processed and confirmed. <br>

{: .note}
_The specifics can be found in [Ayden's Session Flow Documentation!](https://docs.adyen.com/online-payments/build-your-integration/sessions-flow/?platform=Web&integration=Drop-in&version=5.64.0#how-it-works)_

![Adyen Payments Flow](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/Adyen-Online-Payments-Flow-Diagram-Generic-High-Level.drawio.png)

- **Step 1: Shopper Navigates to Checkout Page**: The journey begins when the shopper decides to purchase and navigates to the checkout page.
- **Step 2: E-commerce Site Creates Checkout Session with Adyen**: The e-commerce site initiates a checkout session with Adyen. This returns some details, such as session data.
- **Step 3:Payment Options Displayed**: Using the session details, the e-commerce site displays the available payment options and credit card UI. This can be done using Adyen's drop-in component or a hosted page.
- **Step 4:Shopper Performs Payment**: The shopper enters their payment details using the provided UI and submits the payment. They are then redirected to a payment success page.
- **Step 5: Adyen Processes Payment**: Adyen processes the payment and informs the e-commerce site via a web hook, confirming the transaction.

We'll reference this flow in subsequent sections to explore its implementation further.


## **Standard Flow (User Perspective)**

From a user's perspective, the process is straightforward and intuitive. The interface guides users seamlessly through each step, ensuring a smooth experience. We will include screenshots and flow from booking.com to supplement our understanding of the flows, providing visual aids that highlight key functionalities.

{: .warning}
Whatever that is displayed is our assumption based on playing around with their app in the browser. Nothing was confirmed with either booking.com or adyen. These flows are described solely so that readers (and myself) have a mental model of a possible implementation for payment integration!

### Step #0: Prior to Initiating Checkout

Activities before the checkout are handled in the browser and within Booking.com, with no interface to Adyen. These include browsing, selecting items, adding to the cart, and applying discounts. Users can review their cart and sign in to streamline future transactions. In our example, the activities are as follows:

- **Search for Accommodation**: The shopper searches for accommodation for their holiday on Booking.com.
- **Click Reserve**: They click the "Reserve" button, initiating the booking process.

![Selecting accomodation and hitting reserve button in booking.com](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/selecting-acom-and-reserving.png)

### Step #1: Shopper Navigates to Checkout Page

Once the user is happy with what’s in their cart, they’ll hit up the checkout page. But before that checkout screen pops up, booking.com needs to set up a checkout session with Adyen to keep tabs on the transaction. More details coming up next!

Check out the screenshot of the button click leading to the checkout page below

![Shopper hitting the Final Details button to reach checkout page](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/image-final-details-button-to-reach-checjkout.png)


### Step #2: E-commerce Site Creates Checkout Session with Adyen

Booking.com initiates a checkout session with Adyen and generates the checkout UI, showcasing various payment options. This corresponds to step #2 in our payments flow. This process occurs behind the scenes, so there’s nothing visible in the browser. For more details:

- See our sandbox test for [Creating a Payment Session for Adyen Hosted Checkout UI page](#step-2-create-checkout-session). 

### Step #3: Payment Options Displayed

The user is shown a page to enter their credit card details, corresponding to step #3 in the payments flow. This means that booking.com has successfully received information from Adyen, allowing them to display relevant details such as payment methods on the checkout page.

![payment options and checkout ui](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/image-payment-options-checkout-ui.png)

For more details:
- See our sandbox test for [Redirecting users to Adyen's Hosted Checkout UI page](#step-3-redirect-to-hosted-page)

### Step #4: Shopper Performs Payment

The user enters their payment details and hits "Submit." They are then shown a success page, corresponding to step #4 in the payments flow.

![success message post payment](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/image-success-message-post-payment.png)

For more details:
- See our sandbox test for [Completing and submitting payments in the Adyen's Hosted Checkout UI](#step-4-enter-payment-details)

### Step #5: Adyen Processes Payment

Behind the scenes, Adyen communicates the successful payment to Booking.com via a web hook (step #5 in the payment flow). This process ensures that fraudulent payment attempts using JavaScript from the browser are prevented.

For more details:
- See our sandbox test for [Webhook callback after successful payment in the Adyen's Hosted Checkout UI](#step-5-webhook-confirmation)

## **Going Deeper into the Implementation**

Let's delve deeper into the technical implementation using Adyen's sandbox environment. We'll showcase two approaches: the hosted page approach and the Adyen UI drop-in component approach.

If you'd like to follow through, please ensure that you have the following already set-up:
- [Created Test Account](https://www.adyen.com/signup)
- [Obtained API Key](https://docs.adyen.com/development-resources/api-credentials#generate-api-key)
- [Obtained Client Key](https://docs.adyen.com/development-resources/client-side-authentication#get-your-client-key)
- [Setup webhooks](https://docs.adyen.com/development-resources/webhooks)

You can see their [articles on the pre-requisites](https://docs.adyen.com/online-payments/build-your-integration/sessions-flow/?platform=Web&integration=Drop-in&version=5.64.0#before-you-begin
) before being able to fiddle around and play with their API's.

Their [Getting Started](https://docs.adyen.com/get-started-with-adyen/) documentation is also comprehensive and simple to follow.

If you have addressed all the above, let's proceed to the next section to familiarize with their APIs.


### **The Hosted Checkout Page Approach**

In this approach, the checkout page is hosted by Adyen. Let's revisit the payment flow, but specific to the hosted checkout page implementation:

![Online payments flow with hosted checkout page implementation](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/Adyen-Online-Payments-Flow-Hosted Checkout Page 2.drawio.png)

We will skip the sections where there are no significant interactions betweend Adyen and the E-commerce site. As such, the first meaningful interaction, is when the E-commerce site creates the checkout session with Adyen.

### Step #2: Create Checkout Session

Ayden [Create a Payment Session Documentation](https://docs.adyen.com/online-payments/build-your-integration/sessions-flow/?platform=Web&integration=Hosted+Checkout#step-3-create-a-payment-session) provides specific properties that can be passed to the Adyen when creating a session:

```bash
curl https://checkout-test.adyen.com/v70/sessions \
-H "x-API-key: YOUR_X-API-KEY" \
-H "content-type: application/json" \
-d '{
  "merchantAccount": "YOUR_MERCHANT_ACCOUNT",
  "amount": {
      "value": 1000,
      "currency": "EUR"
  },
  "returnUrl": "https://your-company.com/checkout?shopperOrder=12xy..",
  "reference": "YOUR_PAYMENT_REFERENCE",
  "mode": "hosted",
  "themeId": "AZ1234567",
  "countryCode": "NL",
  "expiresAt":  "2023-05-18T10:15:30+01:00"
}'
```

For a hosted checkout UI implementation, ensure that the `"mode:" "hosted"` is specified correctly. 
This will ensure that Adyen returns a URL. The URL is the location of the hosted checkout UI where we will need to send users to.

See our sample postman request and the response received from Adyen:
![postman of request and response for hosted checkout session adyen](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/image-postman-hostcheckout-session.png)

### Step #3: Redirect to Hosted Page

Recall the URL returned by Adye in step #2: `https://test.adyen.link/CS9BDC4A59E7DE0D25D`. This is the location of the checkout UI.

In an e-commerce application, th e-commerce application is expected to redirect the users to this location. For now, we will just access it directly from the browser to see what we get:
![Successfully reached hosted checkout ui using the url returned by Adyen](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/image-hosted-checkout-ui.png)

True enough, we are able to access the checkout UI. The next step is to test payment, and see whether we are able to successfully submit a payment

### Step 4: Enter Payment Details
Here, we enter payment details using the [test card numbers](https://docs.adyen.com/development-resources/testing/test-card-numbers/) provided by Adyen.

![enter test card details and hit pay](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/image-enter-test-card-details.png)

When you submit, you can see that adyen hosted checkout page posts the credit card details to their own servers:
![Adyen hosted checkout posting the detaisl to their own servers](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/image-adyen-hosted-checkout-post.png)

Don't worry, the card details are all encrypted:
![Adyen hosted checkout post encrypted card details](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/image-hosted-checkout-post-encrypted-card-details.png)

{: .note}
Ignore the broken page. This is because the return URL was stated as `https://your-company.com/checkout?shopperOrder=12xy..` in our postman test. This URL does not exist, hence the broken page is expected.

Next step, we need to ensure that the payment is successful. Since the page is hosted by Adyen, how would the ecommerce site know when the transaction is successful (besides the redirect URL).

### Step 5: Webhook Confirmation
This is where Adyen webhook comes into play! In general, my understanding is that we don't really trust client site redirect because it has a higher surface area for malicious attacks. Adyen webhook/callback will be the true source the e-commerce site will use to decide whether the transaction is successful or not.

When a payment is successul, Adyen would actually send a call to an endpoint that is configured by the e-commerce site. For us, we configured the `petcoach.sg` site as the webhook endpoint because:
- I happen to be site admin for the site, hence I can check the logs
- The site is publicly acessible, so no firewalls required to open traffic channels

Checking Adyen's logs, we can indeed see a webhook triggered at the same time the checkout payment button was hit:
![Adyen webhhook triggered at the same time the payment button was hit](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/image-webhook-adyen-logs.png)

From the logs, we can see the body of the webhook. With this, the e-commerce can ensure that the following property that is passed to Adyen is unique when creating the payment session: `"merchantReference": "YOUR_PAYMENT_REFERENCE"`. This is especially important when troubleshooting any missed payments that needs reconciliation.

```bash
{
  "live": "false",
  "notificationItems": [
    {
      "NotificationRequestItem": {
        "additionalData": {
          "expiryDate": "*******",
          "authCode": "******",
          "paymentLinkId": "*******************",
          "cardSummary": "4444",
          "threeds2.cardEnrolled": "false",
          "checkout.cardAddedBrand": "********",
          "hmacSignature": "Ho11JvTi3Cm4gdBy0rSW1NKW5efXtr/x0rtXgECnywI="
        },
        "amount": {
          "currency": "EUR",
          "value": 1000
        },
        "eventCode": "AUTHORISATION",
        "eventDate": "2024-06-02T11:06:07+02:00",
        "merchantAccountCode": "TheSoftwarePracticeECOM",
        "merchantReference": "YOUR_PAYMENT_REFERENCE",
        "operations": [
          "CANCEL",
          "CAPTURE",
          "REFUND"
        ],
        "paymentMethod": "mc",
        "pspReference": "CB5CN2PL6N2HLXT5",
        "reason": "033286:4444:03/2030",
        "success": "true"
      }
    }
  ]
}
```

Checking Pet Coach SG logs, we can see that the webhook callback was indeed received:
![Pet Coach website receiving adyen callback](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/image-petcoach-receive-adyen-callback.png)

Instead of Pet Coach, we would normally configure the e-commerce server to expose an endpoint. When receiving the callback, we will update the details of the payment to success!

## Using Adyen UI Components

{: .note}
We will subsequently update this article to also take into account the Adyen UI components approach. Notice that booking.com UI look fresh and different to the hosted page -- it's likely that they used the `adyen UI component` flows rather than using the Adyen hosted checkout page!

## **Conclusion**

Understanding the online payment flow and its implementation can significantly enhance the efficiency and security of your e-commerce operations. By leveraging Adyen's comprehensive payment processing solutions, businesses can provide seamless and secure payment experiences for their customers.

Whether you're an e-commerce entrepreneur, tech recruiter, or payment technology enthusiast, integrating a robust payment system like Adyen can streamline your operations and improve customer satisfaction.

Ready to take your e-commerce business to the next level? Dive into the world of seamless online payments with Adyen today. Explore their offerings and see how they can transform your online payment processes.

Stay tuned for more insights into the fascinating world of online payments and fintech!




Peace and Love<br>
Shafik Walakaka