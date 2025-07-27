---
layout: page
title: How API Works
permalink: /tech-adventures/third-party-integrations/how-api-works
parent: Third Party Integrations
grand_parent: Tech Adventures
nav_order: 3
index: 'yes'
follow: 'yes'
description: How API works, from the perspective of a lay person!
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/adyen-online-payments.png
---

# How API Works?

API (Application Programming Interface) is an abstract term (a.k.a. tech jargon) that IT professionals use to specify how systems talk. But how does it actually look like, and how does it work?

In this article, we aim to break down what API is, and how it works -- for the lay person. We'll use a Stripe Test API to showcase this behaviour.

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>


## Pre-requisite

To be able to follow this article, you'll need a few things setup:
- A Stripe Test Account. See the [Stripe Docs](https://docs.stripe.com/get-started/account) for details on how to create one.
- Postman Installed. You can download and install it [here!](https://www.postman.com/downloads/)


## Stripe API

Now, the Stripe API that we are going to access is the "Checkout Session" API. This basically creates a checkout session. The flow is as follows:
1. We (or an application) will make a request to Stripe
2. Stripe returns the relevant detail, and also the "Checkout Session"
3. The Checkout Session can then be used by the end user to make payment.

### Configuring Postman

No Stripe account setup? Don't worry -- I'll share my creds here lol.
It's terrible practice, but it's a test account, so I don't really care.

I have prepared a postman collection, for you to test it out. Click in the link below to download the postman collection prepared.
<p><a href="/parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/stripe-walakaka-test-postman-collection.json" download>Download the postman collection here!</a></p>


#### Load the Postman Collection

1. Open postman and hit `Import`
![image of postman import collection](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 9.46.56 PM.png)
2. Select the postman collection that you downloaded
![image of selecting downloaded imported collection](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 9.49.12 PM.png)
3. The collection will be imported, and click into the `New Request` to see the configuration that has been imported
![image post importing](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 9.51.42 PM.png)


#### API Anatomy (viewed from Postman)

So, every API has these "features":
1. A URL, it's basically the location of the target resource is located.
![image of url in postman]](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 9.54.22 PM.png)
  - The URL is unique, and will need to be provided by the "target application" the app the is exposing the resource
  - In our case, we want to create a stripe checkout session
  - So Stripe needs to tell us, where to call to create this checkout session
  - And you can find the location in [Stripe Documentation here](https://docs.stripe.com/api/checkout/sessions)
  ![image of postman collection and stripe matching](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 9.58.15 PM.png)

  2. Next, we need to send the request body. These are a bunch of key value pairs that Stripe expects
    - In this example, Stripe expects a key `mode` with a value `payment`
    - Each record is it's own key value pair that Stripe expects
    ![image of key value pair in postman](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.02.44 PM.png)

  3. To have a better picture of what key value pair looks like, we will now initiate the request by hitting `Send`
  ![image of hitting send in postman](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.04.05 PM.png)

  4. When you send a request, you will get a response. In Postman, the response is displayed here -- now you know what an API response looks like. Just a bunch of key value pairs:
  ![image of response postman](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.05.44 PM.png)
    - Scroll down, and you will see a checkout session URL
    ![image of checkout session URL](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.06.58 PM.png)
    - Copy and paste this URL into your browser's address bar and hit `Enter`. It brings you to the checkout page
    ![image of checkout page](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.08.20 PM.png)
    - Notice now that the details in the checkout page, actually matches what we send Stripe when we hit `Send` in step #3
    ![image of request matching strpe response](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.11.18 PM.png)

5. Now, we go back to what the request looks like. To do that, we can check the logs in postman:
  - Click into `console` in postman
  ![image click into console](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.16.47 PM.png)
  - Next expand the latest request (in our case, we only have one)
  ![image of request expanded](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.19.43 PM.png)
  - You can see that the reqeust from step #3, is sent in the request body.
  ![image of request body](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.21.37 PM.png)
  - The request is what we send stripe. And the response is what stripe returns back to us
  ![image of request and response](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.23.49 PM.png)


  6. Now you can test and fiddle with the different properties that we send Stripe
    - For example, uncheck `PayNow` and hit `Send`
    ![image uncheck paynow and hit send](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.27.45 PM.png)
    - You can see now that the `PayNow` option in the stripe UI is gone
    ![paynow is gone](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-3-how-api-works/Screenshot 2025-07-27 at 10.30.22 PM.png)



## Next

Didn't have time to finish everything, but next we can go into
- Fiddling with different properties of the request body
- Understand what's in the reqeust header
- Including the authorisation header, etc.