---
layout: page
title: Implementing WP Super Cache (Easy)
permalink: /tech-adventures/wordpress/wp-super-cache
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 3
index: 'yes'
follow: 'yes'
description: Slow wordpress site on nginx server? Use WP Super Cache to boost your site load times
image: ../../parent-page-tech-adventures/child-page-3-wordpress/grandchile-page-3-wp-super-cache/w3-super-cache.jpg
---

# WP Super Cache

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

What is WP Super Cache -- it's essentially a tool (developed by some wordpress developer) to cache your site. Caching yoursite basically means that your html files are stored and served to users without being dynamically generated!

Mind boggling, don't worry -- we'll dumb it down, as we're not a fan of these jargons anyways

## How Wordpress Generate Pages

When you access a Wordpress website, the pages are generated in the following sequence:
1. You type some stuff in the browser address bar
2. Wordpress receives the request, and now dynamically generates the html document
3. Once the html document is generated, it's served to you on your browser
4. Browser renders it, retrieves all static files such as css, js images etc. And wala -- you see the website page

### The Issue -- Wordpress is Slow

I don't know about you, but all the wordpress sites I've worked on is slow as hell lol. And the bottleneck normally occurs when wordpress is generating the html document dynamically. Don't believe -- see sample bottleneck for page load (due to the damn wordpress server dynamically generating the html doc):
![Bottleneck of the page load due to server load time](../../parent-page-tech-adventures/child-page-3-wordpress/grandchile-page-3-wp-super-cache/image-content-download-speed.png)

Once the page is generated, the actual download speed is actually blazing fast. Wtf 2ms, I can't even blink that fast.

### The Solution -- Cache the static html doc
The solution -- why don't we save the html document, and just share it with users when they request for pages. Here comes static page server side html document caching (WP Super Cache is one solution).

This way, when a user tries to access the page -- your wordpress website does not re-generates the html document again. We just share the previous document that has already been generated

## Step-by-step using WP Super Cache

Let us take you through the step-by-step sequence of implementing the WP Super Cache. Idea is that you can just follow these steps and configure it for your wordpress site!
_Note: Happy to take any clarifications, and we'll add additional details as subsequent sections_

1. First, install the WP Super Cache Plugin (No tutorial required for this one -- but you can check out the steps to [install a wordpress plugin here!](https://www.scalahosting.com/blog/optimize-website-speed-with-wp-super-cache/))
![Steps to install WP Super Cache Plugin](../../parent-page-tech-adventures/child-page-3-wordpress/grandchile-page-3-wp-super-cache/image-steps-to-install-wp-super-cache-plugin.png)
2. Then, we configure WP Super Cache -- starting by toggling the cache settings to **ON** in the `Easy` tab
![Configuring the Easy Tab in WP Super Cache](../../parent-page-tech-adventures/child-page-3-wordpress/grandchile-page-3-wp-super-cache/image-configure-easy-wp-super-cache.png)
3. Afterwhich, we configure the advanced tab to switch **OFF** the _Garbage Collection_ feature. We also set the interval timing to 90 seconds so that it's easy for us to test the switching **OFF** of the _Garbage Collection_
![Configuring the Advanced Tab in WP Super Cache to switch off the Garbage Colletion](../../parent-page-tech-adventures/child-page-3-wordpress/grandchile-page-3-wp-super-cache/image-advanced-wp-super-cache-config.png)

And that's it -- we now have a blazing fast site lol. It's that simple? Yes it is!

### Verifying that the Cache is Working

Let's verify that the Cache is working. We'll do that by testing the load speed of the site with and without Cache.

1. First set the `Cache Timeout` to **30 Seconds**. This will check and indicate that the cache is "stale" every 30 seconds.
2. Next, let's access the site. The site should take some time to load, because Wordpress needs to generate the html document. See screenshot below for the load time of 10 seconds
![Cached site takes less than a second to load. Non-cached page takes 10 seconds to load](../../parent-page-tech-adventures/child-page-3-wordpress/grandchile-page-3-wp-super-cache/image-cache-testing-30seconds.png)
3. From the above image, you can also see that the cache is getting purged every 30 seconds. We would also need to test disabling the garbage collection feature, and verify that the cache is never purged -- see screenshot below, to see the cache that is stored permanently
![Sites are cached permanently, and site load speeds are fast](../../parent-page-tech-adventures/child-page-3-wordpress/grandchile-page-3-wp-super-cache/image-garbage-collector-turned-off.png)


### How to Purge the Cache

Now that our site is blazing fast -- we have to solve the final problem. If the cache is stored permanently, what happens when I actually need to update my site lol.

Easy -- we just purge it manually! Access the `Content` tab, and hit **Delete Cache**.
![Delete cache in the content tab in W3 Super Cache Settings](../../parent-page-tech-adventures/child-page-3-wordpress/grandchile-page-3-wp-super-cache/image-delete-all-cache.png)

This would delete the cache, and as you can see from the screenshot below -- the cache no longer exists and it takes some time for Wordpress to generate the page
![Cache no longer exist when manually purged, and site speed takes longer to load](../../parent-page-tech-adventures/child-page-3-wordpress/grandchile-page-3-wp-super-cache/image-manual-purge-load-site-increase.png)

So we'll just have to do this, everytime there is an update to the site!


### Easy Cache Setup vs Advanced Cache Setup

The easy cache setup actually uses php to find the cache files and serves it to the user. 
The advanced cache setup requires changes to the nginx configuration, to route the user accordingly to serve the relevant files that are cached.

![Configuring W3 Super Cache to use the Easy Setup](../../parent-page-tech-adventures/child-page-3-wordpress/grandchile-page-3-wp-super-cache/image-easy-vs-advanced-config.png)

Although php (easy config) approach is supposedly less efficient -- for most small scale websites, this is more than enough, and it reduces the cost overheads.

So we simply use the easy cache setup! Using this setup, we will not receive the return header specifing a cache `Hit`. 
So we have to verify using the manual tests that were previously mentioned.


### Results

All the damn pages are now loading within a fraction of a second ;). How sick is that!
![All pages are now loading within a fraction of a second as showned in the network tab](../../parent-page-tech-adventures/child-page-3-wordpress/grandchile-page-3-wp-super-cache/image-results-all-pages-blazing-fast.png)


## Thank You, Conclusion

That's all folks! Step-by-step approach, tried and tested wordpress caching site.
Try it out, and let us know if you have any issues ^^ !