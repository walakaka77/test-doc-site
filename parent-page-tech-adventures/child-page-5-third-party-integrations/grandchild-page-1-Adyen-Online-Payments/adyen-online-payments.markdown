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
image: ../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-1-indexing-pages-that-are-not-yours/image-indexing-pages-that-do-not-belong-to-you.png
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

From a user's perspective, the process is straightforward and intuitive.

### Step #0: Prior to Initiating Checkout

For actions that occurs, before the user reaches the checkout page:


- **Search for Accommodation**: The shopper searches for accommodation for their holiday on Booking.com.
- **Click Reserve**: They click the "Reserve" button, initiating the booking process.

![Selecting accomodation and hitting reserve button in booking.com](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/selecting-acom-and-reserving.png)

### Step #1: Shopper Navigates to Checkout Page

When the user is satisfied with their cart selection, they will initiate and proceed to the checkout page.

Prior to the checkout page being displayed, `booking.com` will need to create a checkout session with Adyen to track this transaction. This is further elaborated in the next section.

![Shopper hitting the Final Details button to reach checkout page](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/image-final-details-button-to-reach-checjkout.png)


### Step #2: E-commerce Site Creates Checkout Session with Adyen

Booking.com creates a checkout session with Adyen and generates the checkout UI, displaying payment options. This corresponds to step #2 in our payments flow.

This step happens behind the scene, hence there is nothing that we can see in the browser.

{: .note}
We have restricted access to the information transacted between Adyen and Booking.com, probably due to security reasons. We will dive deeper into the implementation in subsequent sections using the Adyen Sandbox environment.

### Step #3: Payment Options Displayed

The user is shown a page to enter their credit card details, corresponding to step #3 in the payments flow.

This means that `booking.com` has successfully received information from Adyen that allows for them to display the relevant details such as payment mods in the checkout page.



{: .note}
We have restricted access to the information transacted between Adyen and Booking.com, probably due to security reasons. We will dive deeper into the implementation in subsequent sections using the Adyen Sandbox environment.

### Step #4: Shopper Performs Payment

The user enters their payment details and hits "Submit." They are then shown a success page, corresponding to step #4 in the payments flow.

### Step #5: Adyen Processes Payment

Behind the scenes, Adyen informs Booking.com about the successful payment through a web hook (step #5 in the payments flow). This step ensures no one can fake a successful payment using JavaScript from the browser.


## **Going Deeper into the Implementation**

Let's delve deeper into the technical implementation using Adyen's sandbox environment. We'll showcase two approaches: the hosted page approach and the Adyen UI drop-in component approach.


### **The Hosted Checkout Page Approach**

In this approach, the checkout page is hosted by Adyen. Let's revisit the payment flow:



1. **Create Checkout Session**: In step #2 (of the online payment flow), when creating the checkout session, specify the mode as "hosted."
* The response will include the URL of the hosted link.
* You can view the logs in the Adyen Console.
* For those curious, you can use Postman to play around with the API further (see screenshot).
1. **Redirect to Hosted Page**: In step #3 (of the online payment flow), the browser redirects the user to the hosted link, where the user sees the checkout page hosted by Adyen.
* Here’s a screenshot of the UI in the test app.
* For the curious, pasting the URL from the Postman response should bring you to the hosted page.
1. **Enter Payment Details**: In step #4, the user enters their payment details. If successful, the page redirects the user back to our application.
* Here’s a screenshot of the success message in the test app.
* For Postman users, here's a screenshot of the redirect back to our application.
1. **Webhook Confirmation**: In step #5, a callback/webhook is sent for confirmation of payment.
* Here's the Adyen log for the webhook callback.
* Here's the log for receiving the callback in our application.


### **Using the Adyen UI Components**

Adyen provides a set of UI components that are completely open-sourced and customisable using CSS styles. The flow remains the same:



1. **Create Checkout Session**: In step #2 (of the online payment flow), the e-commerce site creates the checkout session.
* Here’s the checkout session created in the application.
* Here’s the session created in Adyen logs (session data returned).
* The second call from the browser passes the session data, which returns a second set of session data containing payment methods.
1. **Create UI Components**: In step #3 (of the online payment flow), the e-commerce site uses the session data to create UI components based on scripts provided by Adyen.
* Here’s the UI component created in our test app.
* The second set of session data seems to be the unique identifier used to identify the transaction.
1. **Submit Payment Details**: In step #4, the shopper enters their credentials and submits the payment details.
* Here’s a screenshot of the session data in the second checkout session call being passed back to Adyen.
* Compare the session data against Adyen logs – it's the same. This ensures the data integrity and smooth progression of the payment process.
* Here’s the success confirmation page shown in our app.
1. **Webhook Confirmation**: In step #5, a callback is received again.
* Here’s the callback in Adyen logs.
* Here’s the callback in our application logs.


## **Conclusion**

Understanding the online payment flow and its implementation can significantly enhance the efficiency and security of your e-commerce operations. By leveraging Adyen's comprehensive payment processing solutions, businesses can provide seamless and secure payment experiences for their customers.

Whether you're an e-commerce entrepreneur, tech recruiter, or payment technology enthusiast, integrating a robust payment system like Adyen can streamline your operations and improve customer satisfaction.

Ready to take your e-commerce business to the next level? Dive into the world of seamless online payments with Adyen today. Explore their offerings and see how they can transform your online payment processes.

Stay tuned for more insights into the fascinating world of online payments and fintech!




Peace and Love<br>
Shafik Walakaka