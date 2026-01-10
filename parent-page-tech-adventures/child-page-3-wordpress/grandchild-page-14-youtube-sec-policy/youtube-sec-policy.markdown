---
layout: page
title: Custom Scrollspy
permalink: /tech-adventures/wordpress/youtube-sec-policy
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 14
index: 'yes'
follow: 'yes'
description: Youtube Security Policy
image: ../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/heic-image-incompatible-browser.png
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

## YouTube Now Requires Referrer Policy for Embeds

Recently, YouTube introduced a new requirement for websites embedding their videos: the inclusion of a `referrerpolicy` attribute. This change ensures that YouTube can handle referrer information securely and consistently. If your website embeds YouTube videos and you haven't updated your code, you might notice that the videos no longer display correctly.

{: .warning}
If you do not include the referrer policy, your embed will NOT work and will return [153 video player error](https://benword.com/youtube-embeds-error-153-video-player-configuration-error)

In this article, we'll explain the issue, show you the code changes required, and provide a step-by-step guide to implement the fix.

---

### What Changed?

Previously, YouTube embeds worked without requiring a `referrerpolicy` attribute. However, YouTube now mandates that this attribute be explicitly set to ensure proper handling of referrer information. Without this update, embedded videos may fail to load or display a blank screen.

{: .note}
See the youtube policy change [mentioned here](https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-player-api-client-identity)

---

### Before the Update

Here’s an example of how a YouTube embed might have looked before the update:

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0"
  allowfullscreen>
</iframe>
```

This code does not include the referrerpolicy attribute, which is now required.

After the Update
To comply with YouTube's new requirements, you need to add the `referrerpolicy` attribute to your `<iframe>` tag. Here’s the updated code:

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0"
  allowfullscreen
  referrerpolicy="strict-origin-when-cross-origin">
</iframe>
```

The `referrerpolicy="strict-origin-when-cross-origin"` attribute ensures that no referrer information is sent when the video is loaded. This is the recommended setting for most websites.

## Step-by-Step Implementation
Follow these steps to update your website:

### Locate Your YouTube Embeds
Search your website's codebase for all instances of `<iframe>` tags embedding YouTube videos. You can use a text editor or IDE to search for youtube.com/embed.

If you don't have the referrer policy, you will see that the video does not load in your website with 153 video player error.
![video failing with 153 video player error](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-14-youtube-sec-policy/video-failing-to-load-153-error.png)


### Verify Error Is Due to Referrer Policy

To confirm that the issue is caused by the referrer policy, follow these steps:

1. **Inspect the YouTube Embed in the Browser**  
   Open the page with the embedded YouTube video in your browser. If the video fails to load, right-click on the page and select **Inspect** (or press `Cmd+Option+I` on Mac to open the Developer Tools).

2. **Locate the `<iframe>` Element**  
   In the Developer Tools, navigate to the **Elements** tab and find the `<iframe>` tag that embeds the YouTube video. You can search for `youtube.com/embed` to locate it quickly.

3. **Check the Network Request**  
   Switch to the **Network** tab in the Developer Tools. Reload the page to capture all network requests. Look for the request made by the `<iframe>` to YouTube.

4. **Inspect the Referrer Policy**  
   Click on the network request for the YouTube embed. In the **Headers** section, look for the `Referrer Policy` header. You will likely see it set to `same-origin`, which means the referrer information is only sent for requests to the same origin as the website.

   ![Referrer policy of the iframe is same origin](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-14-youtube-sec-policy/wrong-referrer-policy-sent.png)

5. **Compare with YouTube's Requirements**  
   YouTube expects the `referrerpolicy` to be explicitly set to `no-referrer` or `origin`. If the policy is `same-origin`, YouTube will reject the request, causing the video to fail to load.

By following these steps, you can confirm that the error is due to the referrer policy mismatch. Once verified, proceed to update the `<iframe>` tag with the correct `referrerpolicy` attribute as described earlier.


### Add the referrerpolicy Attribute
For each `<iframe>` tag embedding a YouTube video, add the `referrerpolicy="strict-origin-when-cross-origin"` attribute. Ensure the attribute is added within the `<iframe>` tag.

See an example of how we added ours below:
![referrer policy added](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-14-youtube-sec-policy/referrer-policy-added-in-ide.png)

### Test Your Changes
After updating the code, test your website to ensure the embedded videos load correctly. Open the pages with YouTube embeds in your browser and verify that the videos display as expected.

See here, how we verify that the referrer policy sent by the iframe is correct:
![referrer policy sent by iframe is correct](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-14-youtube-sec-policy/referrer-policy-correct.png)

### Update Templates (if applicable)
If your website uses templates (e.g., in WordPress, Jekyll, or other CMS platforms), ensure the referrerpolicy attribute is added to the template files generating the `<iframe>` tags.

### Deploy Your Changes
Once you've verified that the videos work correctly, deploy the updated code to your live website.

It's that simple, see how the video now loads with no error.

![video loading with no 153 error](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-14-youtube-sec-policy/video-loading-with-no-153-error.png)


## Why Is This Important?
Adding the referrerpolicy attribute ensures that your website complies with YouTube's updated requirements. This change improves security and ensures that your embedded videos continue to work seamlessly.

## Conclusion
YouTube's new requirement for the referrerpolicy attribute is a small but important update for websites embedding videos. By following the steps outlined above, you can ensure that your website remains compatible with YouTube's embed functionality.

If you have any questions or run into issues, feel free to leave a comment below!