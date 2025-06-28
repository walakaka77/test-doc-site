---
layout: page
title: Decoupled systems for maintainability
permalink: /tech-adventures/third-party-integrations/decoupled-systems-for-maintainability
parent: Third Party Integrations
grand_parent: Tech Adventures
nav_order: 2
index: 'yes'
follow: 'yes'
description: Every performed a card payment online. This article takes you behind the scenes of the implementation with Adyen
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/adyen-online-payments.png
---

# Pre-amble


When doing software development, you can't really run away from third party integrations. The name itself is self-explanatory, you integrate with other systems.

## Benefits of Integrations

It's actually the beauty of technology -- when systems are able to talk to each other, you can cross-share information, streamline processes and eliminate manual work!

{: .note}
But as everything -- it's a double edged sword. There is no free lunch in this world ><

## Downsides of Integration

Integrations are complex -- when you integrate, you need to understand both systems:
- The system requesting the information
- They system providing the information

Putting the nitty gritty aside, I'd like to take you through one example on how we ensure that systems are decoupled.

## Decoupled systems

What is a decoupled system -- this essentially, means that two systems, who's business logic are isolated.

That means that if we have two systems:
- Stripe
- Shafik's Software

If a business logic changes in Stripe, then our design should prevent Shafik Software from breaking.

It's all nice conceptually -- but let's step down to the nitty gritty now, so that we can see one permutation of how it plays out.

## Stripe Checkout Session

Let's take the [Stripe Checkout Session flow](https://docs.stripe.com/api/checkout/sessions) for example. Here, the steps are as follows:
1. We first create a Stripe Checkout Session by calling the Stripe API
![Create a checkout session](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.00.13 AM.png)
![Request body](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.01.39 AM.png)
2. Stripe returns us the URL (assume we are using their hosted checkout UI).
![Stripe returns URL to their hosted checkout page](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.03.26 AM.png)
  - Personally, prefer to use their hosted checkout UI
  - That way, any issues - Stripe is to blame lol. Jokes aside, Stripe would have heavily tested their Stripe UI page for security and functionality. So we can be confident that the risk is mitigated in comparison to creating our own checkout UI components 
3. We send the user to the URL --> Stripes hosted checkout page
![User sent to stripe hosted checkout page](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.04.22 AM.png)
4. User completes the payment transaction
![User completes the payment transaction](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.06.36 AM.png)
5. Stripe sends us a callback. This is a server-to-server call to inform us that the payment has been successfully completed.
![Callback and callback payload received](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.07.12 AM.png)
6. Shafik's Software now can update the payment status to paid!

Easy right?

## Highly Coupled

Assume that Shafik's system needs to generate a receipt -- and the name specified in the receipt is dependent on a property in Stripe's callback payload. 

This was a discussion during one of our requirements gathering session -- and our lead dev advised against it. His reason:
- The customer name is optional. 
- In the scenario where Stripe changes a logic, and doesn't send back the Customer Name, our receipt generation logic will break

The field that we were thinking of using is here:
![Customer Name -- Nullable Strig](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 11.27.39 AM.png)

See [Stripe Documentatio on Payment Intent](https://docs.stripe.com/api/checkout/sessions/object#checkout_session_object-customer_details) for more details!


His proposed option:
- Use a field that is already stored in Shafik's system to generate the receipt
- If it is a hard business requirement to use data from stripe, ensure we use a mandatory field and not an optional field when expecting the payload value from Stripe.


## Validate Concerns

To validate his concerns, I decided to do some homework -- and check if indeed, an issue could happen if there were changes to Stripe.

Because as far as my knowledge, when you enter a credit card detail -- you will need to enter card holder name. AND, the cardholder name will always be returned by the Stripe Webhook.

Basically, I don't see a way how the customer name will ever be left blank!

{: .warning}
As murphy's law has it -- if something can go wrong, it will!

### Wallets may not send Customer Information

As per the [Stripe Wallet Documentation](https://docs.stripe.com/payments/wallets) -- Wallets such as Apple Pay or Google Pay may not send Customer Information. 

It's not explicitly mentioned, but the thing is that -- we can test it!

1. We trigger the stripe flows, and redirect to the Stripe Checkout Page
2. Here in the checkout page, I'm using a Mac Safari - hence, I can test out the Apple Wallet Flow
![Checkout UI -- showing Apple Wallet](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.08.31 AM.png)
3. And indeed, when I selected the wallet payment mode, I don't need to key in my name or address
![No need to enter name or address apple wallet](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.09.20 AM.png)
4. And ofcourse when the webhook callback comes, the payload is mising the customer details (because I did not key it in lol..)
![webhook callback payload without customer name](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.10.25 AM.png)


If my design needs customer name, then this would break my receipt generation flow!


## Workarounds

Are there workarounds that will allow for me to use Stripe Customer Name? Ofcourse there is!

Based on Stripe Documentation, we can actually disable wallet pay, or we can enforce the customer name.

### Disable Wallet Pay

Refer to this [stripe support forum](https://support.stripe.com/questions/disable-apple-pay-for-stripe-checkout) for how to disable apple wallet pay!

Again, we can test it out:
![configure stripe console to turn off apple pay](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 12.38.10 PM.png)

After turning it off -- no longer, able to see Apple Pay when redirected to the Stripe UI:
![No Apple Pay in Stripe UI](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 12.41.19 PM.png)

But ofcourse, with this configuration, it affects all other applications using the same Stripe account. Furthermore, there is one additional configuration that you need to remember -- simply so that we can generate a receipt!

Possible -- Yes
Ideal -- probably not. Imagine 100's of such configurations -- you will go mad.


### Enforce the Customer Name to be returned

Upon deeper investigation, we can actually enforce the customer name to be returned. But we need to change the way we initiate the stripe session checkout!

We need to set the `billing_address_collection` property to `required`.

Let's test this out!

1. Send a request to Stripe and set the `billing_address_collection` property to `required`
![request to create stripe checkout session w billing address collection required](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.15.36 AM.png)
2. Redirect to the Stripe UI and click into Apple Pay and now I'm forced to enter billing address, which includes customer name
![Apple Pay now enforces billing address details](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.16.46 AM.png)
3. Another screenshot to show you that I'm forced to configure my customer details
![Configuring customer details in billing address modal](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.17.36 AM.png)
4. See the webhook payload, and see that customer details is now filled
![webhook payload including customer name now!](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-2-Decoupled-System-Design/Screenshot 2025-06-28 at 10.18.21 AM.png)


But the downsides of this option is that, you need a deep understading of stripe configurations and what payment options are being used.

For a general application that aims to simply collect payment regardless of payment modes -- this level of investigation is not just unnecessary but also counter productive.

These technology changes often, and Stripe could easily have another update in the next 6 months to provide better offerings to their users.

When that happens -- are we going to change our code and handling again?
Technically -- possible.
But, not feasible nor scalable

## Conclusion

The best option would be to ensure that our systems are decoupled. Regardless of stripe logic, as long as the payment is successfully collected -- the receipt can be generated.

Ideally, all the fields in the receipt will come from our application.

{: .note}
This is my general take, and based on my experience -- it makes the application easier to maintain. Otherwise, your team will drown in issues that are due to changes in third party applications!

If there is a need for fields from third parties, those fields should be mandatory and critical fields that are used by the third party for integration.

If the fields shared are no critical, then we should not let if affect main flows of our application.

Thank you!