---
layout: page
title: Why We're Using rel=noopener
permalink: /tech-adventures/security-cookies-and-more/rel-noopener
parent: Security, Cookies and More!
grand_parent: Tech Adventures
nav_order: 1
index: 'yes'
follow: 'yes'
description: The rel-no-opener explained!
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/adyen-online-payments.png
---

# Why We're Using rel=noopener for Pet Coach SG’s Security

When it comes to SEO, there’s a lot more involved than just optimizing pages and building backlinks. It’s about creating a secure and trusted online experience. I’ve been engaged to help Pet Coach SG grow their online presence, and as we progress, one of the things I’ve come across is a small yet powerful HTML attribute: `rel=noopener`.

At first glance, it might seem like just another technical detail, but `rel=noopener` plays an important role in web security. In this article, I’ll explain what it is, why it matters, and how I’m implementing it for Pet Coach SG to ensure their site remains safe for users and continues to build authority online.


## The Journey to Strengthen Pet Coach SG’s SEO and Website Authority

We’re in the mid-phase of Pet Coach SG’s SEO campaign. After fine-tuning the on-page elements and securing quality backlinks, the focus has shifted to building domain authority. This phase is crucial for getting Pet Coach SG recognized as a trustworthy site by search engines.

As part of the process, I carefully analyze each backlink to ensure it’s high quality and aligns with our goals. During these reviews, I stumbled upon the `rel=noopener` attribute, which led me down a rabbit hole of research. 

![alt_text](../../parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/images/image1.png "image_tooltip")


Turns out, this little attribute is a game-changer when it comes to security, especially for sites like Pet Coach SG that are static and primarily focused on providing information to their users.


## What Is rel=noopener?

Now, let’s break it down. `rel=noopener` is an attribute you can add to a link that opens in a new tab. If you’ve ever clicked on a link and had it pop open in a new browser tab, that’s thanks to the `target="_blank"` attribute in HTML.

But here’s the thing: when a link opens in a new tab, the new page can still communicate with the original page. This might not seem like a big deal, but it opens up the possibility for some pretty sneaky tricks—things like phishing attacks or redirect hijacking. If you add `rel=noopener` to that link, you prevent the new page from having any control over the original page, closing that loophole for potential bad actors.

It’s important to note that this security risk only exists when links open in a new tab. If the link opens in the same tab (no `target="_blank"`), there’s no need for `rel=noopener` because the security risk doesn’t apply.


## The Security Risks rel=noopener Aims to Prevent

Even though Pet Coach SG is a static site, there are still security concerns that need to be addressed. While our main focus is on phishing attacks and redirect hijacking, it's also important to be aware of the potential for script injection attacks. Let’s walk through each of these risks, so you can see why we’re taking proactive steps to protect users.



* **Phishing Attacks:** Imagine you’re visiting Pet Coach SG’s site, enjoying some helpful tips for your pet, and you click on an external link that opens in a new tab. Without `rel=noopener`, that new tab could gain access to the original Pet Coach SG page and replace its content with something harmful—like a fake login page designed to steal your credentials. While Pet Coach SG isn’t handling sensitive data directly, phishing can still deceive users, leading to security risks and potential harm.
* **Redirect Hijacking:** Another scenario could involve you clicking a link that opens in a new tab. While you’re exploring that new page, the original Pet Coach SG tab suddenly redirects to a suspicious website filled with malicious ads or malware. This is not just an inconvenience—it’s a real threat to users, and it could harm the trust and credibility of Pet Coach SG.
* **Script Injection Attacks:** Although Pet Coach SG is a static site, it’s worth noting that without `rel=noopener`, an external page could execute malicious scripts in the original tab. This means that a hacker could inject harmful code into the original site, potentially leading to further attacks or unauthorized changes. While this may not be the primary concern for Pet Coach SG, it’s still something worth safeguarding against to ensure complete protection for the site and its users.

By implementing `rel=noopener`, we’re mitigating these risks. Even though data breaches aren’t our main worry, phishing, redirect hijacking, and the possibility of script injection are real concerns that we need to protect against. After all, maintaining a safe and secure user experience is critical for both Pet Coach SG’s audience and its reputation.


## Ensuring Best Practices for Pet Coach SG

As someone dedicated to enhancing Pet Coach SG’s SEO and web presence, my role goes beyond simply boosting their search engine rankings. It’s also about ensuring that the site remains secure and reliable for every visitor.

When I came across the `rel=noopener` attribute, it wasn’t due to any current security issues. Instead, it was a reminder of the importance of staying up-to-date with best practices in web security. Modern browsers have indeed improved and now handle the `window.opener` property in a way that mitigates many risks. For example, most browsers, including Chrome, now set `window.opener` to `null` for links that open in new tabs without `rel=noopener`.

To illustrate this, I can show screenshots demonstrating how the `window.opener` property is handled by Chrome in such scenarios. These images will clearly depict how modern browser security measures work:



* **A Backlink from Dogs Vets Website:** I found a backlink from the Dogs Vets website, which I updated to open in a new tab by adding `target="_blank"` to the HTML link. To see how modern browsers handle this, I opened the link and checked the `window.opener` property. \

![alt_text](../../parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/images/image2.png "image_tooltip")

* **Browser Handling of <code>window.opener</code>:</strong> Sure enough, when I examined the <code>window.opener</code> property in Chrome, it was set to <code>null</code>. This shows that modern browsers are taking steps to manage security risks associated with opening links in new tabs.
![alt_text](../../parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/images/image3.png "image_tooltip")


However, even with these advancements, it’s still wise to explicitly use <code>rel=noopener</code>. Think of it as an extra layer of protection—one more step to ensure that your website remains as secure as possible. While browsers have made great strides, being cautious and implementing <code>rel=noopener</code> is a straightforward way to add that additional safeguard. After all, it’s better to be over-prepared than to leave any room for potential vulnerabilities.

So, implementing `rel=noopener` is not just about addressing current risks, but about taking a proactive stance on web security. It’s part of a broader commitment to keeping Pet Coach SG’s site safe and trustworthy for all its users.


## Implementing rel=noopener for Pet Coach SG

So, what’s the plan moving forward? From now on, I’ll be implementing `rel=noopener` for all external links that open in a new tab on Pet Coach SG’s site. This small but significant change will help protect users from phishing attacks and redirect hijacking, making sure their browsing experience remains safe and seamless.

While the main goal of the SEO campaign is to build authority and visibility for Pet Coach SG, user safety and trust are just as important. By implementing security measures like `rel=noopener`, we’re not only optimizing for search engines but also creating a secure environment that users can rely on.


## Conclusion

To wrap things up, `rel=noopener` might seem like a minor detail, but it plays a crucial role in securing websites—especially when opening external links in new tabs. For Pet Coach SG, implementing this security measure is a proactive step to ensure their users are protected from potential phishing attacks and redirect hijacking, while also maintaining the trust and reputation of the site.

As someone responsible for optimizing and safeguarding Pet Coach SG’s online presence, my goal is to strike the perfect balance between strong SEO performance and a safe, user-friendly experience. It’s all part of making sure Pet Coach SG’s growth is sustainable and secure.


### **Looking Ahead**

As we continue to enhance Pet Coach SG’s online presence, implementing `rel=noopener` is just one of the many steps we’re taking to ensure a safe and reliable user experience. This small but important measure reflects our commitment to both top-notch SEO and robust security practices.

I’ll keep sharing updates on our progress and other useful tips. In the meantime, if you’re managing your own website, consider how you can implement similar best practices to protect your users and maintain their trust.

Thanks for joining us on this journey, and I look forward to bringing you more insights soon!
