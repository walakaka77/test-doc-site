---
layout: page
title: HEIC images incompatible with browsers
permalink: /tech-adventures/wordpress/heic-images-incompatible-browser
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 4
index: 'yes'
follow: 'yes'
description: Ever had images load on your phone, but not on your desktop. We unravelled this issue in this article!
image: ../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/heic-image-incompatible-browser.png
---

# HEIC Images

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

HEIC images is a format specific to apple iphones (as far as I'm aware). That means that it's not compatible with browsers or any other devices!

In this article, we take you through how we set a HEIC image in our wordpress website.
And the steps that we took to troubleshoot and figure out that it was the image format that was actually causing the image to break in the desktop view.

## Initial discovery of the broken image

We've been making significant updates to our [Animal Training Centre](https://petcoach.sg/animal-training-centre/) page. Main aim is to optimise user experience and increase conversions to our call to action.

We have added more pictures to increase the engagement on the site, and one of the images was a HEIC image. You can check out the exact image [here!](https://petcoach.sg/wp-content/uploads/2025/02/IMG_2416.heic)

{: .note}
> Note that when you accessed the link to checkout the image above, it actually downloads the file. This is because the browser cannot render the image -- so it downloads it into your desktop instead. <br>
> But if you check out the latest image that we used in [Jpeg format here](https://petcoach.sg/wp-content/uploads/2025/03/dog-in-woods-2-scaled.jpg), you see that the image is actually rendered directly in the browser without the need to download the file

### Why was the incompatible image missed

To add on to the complexity we use Elementor as a page builder in Wordpress. And Elementor was actually rendering the image in the browser -- see screenshot below:

![Elementor rendering the heic image, making it difficult to be aware that the image will break in desktop](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/image-heic-image-renders-on-wordpress.png)

{: .warning}
> As elementor renders the image, it was difficult for us to be aware that the HEIC image would actually break when viewed in the browser. <br>
> Moreover, there were no issues when you viewed it on your iphone (ofcourse, because Iphone supports the HEIC format) -- which makes the issue even more elusive

### Discovery of the broken image

When we were updating the website for all the new "features" such as call to action, we noticed that the image was not rendering in the browser. See screenshot below:

![Heic image not rendering on the browser](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/image-heic-image-not-rendering-on-browser.png)

The confusion was further compounded by the fact that the image was loading perfectly on my iphone!

![Heic image is rendering on my iphone](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/image-heic-image-rendering-on-iphone.jpeg){:width="30%"}

So we further investigated, and tried to troubleshoot the issue! And boy was it frustrating!

## Identifying the root cause

To investigate, we tried multiple settings in Elementor (assumed that it was an elementor issue at first):
- We removed the overlay
- We changed the image size etc.

Obviously none of the above worked

### Inspected the network tab in the browser

Next, we inspected the network tab in the browser, and we noticed that it was a HEIC image format. See screenshot below:

![Network tab shows that HEIC image is being used](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/image-network-tab-show-sheic-image.png)

{: .note}
At this point in time, we were not aware that HEIC image was not supported by browsers!

The instinctive thing to do was to copy and paste the image URL, and see what image is being loaded (and then try to figure out why the image was not loaded in the browser). When we copied and pasted the image into the browser address bar, it downloaded the image instead of rendering it in the browser -- try accessing the [HEIC image URL](https://petcoach.sg/wp-content/uploads/2025/02/IMG_2416.heic) here yourself!

### Quick check on Browser Supported Image Format

It was not a normal behaviour for the image to be downloaded, normally the browser simply renders it for us. So we did a quick google, to see if HEIC images were supported by the browser -- it Google confirmed that HEIC images were indeed not supported by the browser:

![Google confirms that HEIC images are not supported by the browser](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/image-google-confirms-heic-image-not-rendered-by-browser.png)

## The Fix

Once we know the root cause, the fix was simple
1. Update the image format to JPG
2. Re-upload the image into Wordpress
3. Use the JPG image instead of the HEIC image

Once we've made the changes, indeed the browser now renders the image clearly and beautifully:

![Browser renders HEIC image nicely](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/image-jpeg-image-renders-successfully-on-browser.png)

Wow -- what a simple fix, and it took so long to figure it out -.-! Such is the life in the world of 1's and 0's.

## Morale of the Story

The fix itself is rarely complex. What takes time is triaging the issue and identifying the root cause -- once the root cause is understood, that means that the issue is clear and the next steps is normally clear.

Take the timeline of this event for example:
1. Identifying that there was an issue -- 3 weeks. The issue was not discovered for 3 weeks, as it's not a major issue
2. Once discovered, I tried many unrelated things to resolve the issue. This actually took 2 hours believe it or not
    - Testing out different settings in Elementor
    - Verifying that the settings in Elementor (e.g., overlay opacity etc.) is not causing the image to be blocked
    - I only realized that the image format was an issue when I tried accessing the image URL in the address bar and it downloaded the image instead
    - Pro Tip: I actually realized it several hours later when I was having dinner, and suddenly recalled (wait a minute, browsers should render the image and not download it -- why did it download it) <br>
    _Note: So this was actually 4 hours into the troubleshooting, since I broke off for dinner lol_
3. Validation of my hypothesis was supported by my research on Google (quick 5 minutes search -.-)
4. Once confirmed, changing the image format, fixing it and verifying it took about 10 minutes

{: .note}
Just to re-iterate the madness, a 10 minute fix.<br>
A trivial issue with image formatting. <br>
4 hours to figure out and resolve -.-

## Thanks to all my Developer Colleagues!

Fiddling around with wordpress websites, and playing around with different technologies provides a better appreciation of what my dev colleagues go through haha!

Changing the image format, and troubleshooting this issue is actually trivial compared to debugging a bespoke application that must multiple upstream and downstream dependencies.

{: .note}
Next time I ask my dev colleagues for an ETA -- I will be sure to take this into account when they explain why they cannot give an exact ETA. The ETA can only be estimated based on experience.

I cannot even imagine the brain bomb my dev colleagues must be going through everytime there is an elusive bug haha! Thanks again guys, and keep going at it.
Meanwhile -- I will just admire from afar and fiddle around with my wordpress site (to get an inkling of an insight into your beautiful world of 1's and 0's).

Thanks again guys!<br>
Peace and Love<br>
Shafik Walakaka