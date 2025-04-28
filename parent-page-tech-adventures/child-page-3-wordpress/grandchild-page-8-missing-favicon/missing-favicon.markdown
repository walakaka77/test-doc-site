---
layout: page
title: Favion Missing
permalink: /tech-adventures/wordpress/favicon-missing
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 8
index: 'yes'
follow: 'yes'
description: Favicon missing and what was the issue
image: ../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/heic-image-incompatible-browser.png
---

# Automated Testing

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

Our site previously went down due to our hosting provider, and the reasons was unclear. Majority of assets such as css, js and photos were simply returning 404 (including our favicon).

Google happened to have crawled the main page during this downtime, and realized that the favicon was 404 -- and hence removed the favicon from being displayed in our SERP!

![Assets returning 404 due to hosting issues](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-8-missing-favicon/assets-returning-404.png)

{: .warning}
> Google caches the favicon and takes a little longer to update favicons. Crawling favicons are considered lower priority, and we have no way of increasing the frequency that Favicons are crawled, and updated
>
> So, if you're planning to update favicons, ensure you buffer a few days because there are lag time!

## Issue

Not having our favicon displayed significantly impacts our Click Through Rate -- as the site will be deemed as less trustworthy!

Think we're downplaying it, check it out for yourself -- I'm sure you'll be less likely to click on the results that has no icon (favicon):
![Missing Favicon for Pet Coach SG in SERP](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-8-missing-favicon/petcoach-sg-missing-favicon-serp.png)

## Troubleshooting Steps

Ofcourse we verified the above based on hindsight, as we roughly know the cause now.

{: .note} 
The issue has since been fixed, so we can infer from experience that the downtime indeed caused the favicon to be updated by Google and not served.

We checked and ensured the following items are handled:
- Ensured that we have the favicon in our html element header
![Favicon exists in html header](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-8-missing-favicon/favicon-exists-html-header.png)
- The favicon links must be accessible. The links are as follows (and all are accessbile):
![All favicon links are accessible](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-8-missing-favicon/favicon-links-accessible.png)
  - `https://petcoach.sg/wp-content/uploads/2021/07/Main-Logo-cropped-e1672628553536-100x100.png`
  - `https://petcoach.sg/wp-content/uploads/2021/07/Main-Logo-cropped-e1672628553536-298x300.png`
  - `https://petcoach.sg/wp-content/uploads/2021/07/Main-Logo-cropped-e1672628553536-298x300.png`
- Ensure the following path redirects to the favicon and does not result in 404:
![Favicon ico redirects to favicon](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-8-missing-favicon/favicon-ico-correct-redirects.png)
  - petcoach.sg/favicon.ico
  - petcoach.sg/favicon.ico/
- Check Google favicon API that the favicon is reachable:
  - https://www.google.com/s2/favicons?domain=petcoach.sg
  ![Verified that google api can access the favicon](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-8-missing-favicon/google-api-can-access-favicon.png)


## Sought Community Help

Asking the community in webmaster forum -- experts seems to notice minor sub-optimal sizing issues. However, there is no reason why the favicon should not be accessible by google.

The advise was to wait out, and see if the favicon shows in awhile -- because Google Favicon updates does take time (since it's not a priority)

You can check out our [cry for help here!](https://webmasters.stackexchange.com/questions/146758/serp-not-showing-favicon/146759?noredirect=1#comment205242_146759)

The expert advise is that, the favicon seems accessbile -- we might simply have to wait awhile:
![Favicon accessible by google](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-8-missing-favicon/webmaster-favicon-accessible-by-google.png)

## Success -- Google Updated Favicon

After waiting for one week, the favicon is now updated:
![Favicon is again updated by google](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-8-missing-favicon/favicon-updated-by-google.png)

This further stregthened our suspcicion that the original downtime, which resulted in 404 when accessing favicon urls, caused google to infer that the favicon is no longer available -- and hence, remove the favicon.

A costly error, due to the downtime.

Thanks to the community for helping me check through any possible optimisations or errors. Indeed grateful, for the collective insights!

## FAQ
Some of the checks that we have done, was based on our research, we specify them below here for future reference.


### Why ensure favicon.ico in the root path redirects correctly

By default, Google check <url>/favicon.ico -- and expects the favicon here.
Google is smart enough to also respect the favicon URL specified in the header text -- but best practices will ensure that all paths specified are valid, to avoid confusion.

{: .note}
Google only craws the favicon in your main page.
If your main page and sub-pages have favicon links in the html header that points to different favicons, Google will only take the favicon that is specified in the main page

You can read further favicon documentation by Google themselves, [check it out here!](https://developers.google.com/search/docs/appearance/favicon-in-search)

### Where is the Google Favicon API
This is actually, undocumented -- but community is aware of the API, and it's referenced in multiple blogs.

The API is a simple get request that works like this:
```bash
https://www.google.com/s2/favicons?domain=${domain}&sz=${size}
```

You can further check it out in [this blog here!](https://dev.to/derlin/get-favicons-from-any-website-using-a-hidden-google-api-3p1e)