---
layout: page
title: Fixing Broken Internal Links
permalink: /tech-adventures/search-engine-optimization/fixing-broken-internal-links
grand_parent: Tech Adventures
parent: Search Engine Optimization
nav_order: 6
index: 'yes'
follow: 'yes'
description: Reviewed broken internal links and fix it!
#image: ../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-7-rank-first-dog-training/ranking-first-pos-dog-training-singapore.jpg
image: ../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-6-fixing-broken-internal-links/images/fixing broken internal links.jpg
---

<!-- You have some errors, warnings, or alerts. If you are using reckless mode, turn it off to see useful information and inline alerts.
* ERRORs: 0
* WARNINGs: 0
* ALERTS: 8 -->


# Fixing Broken Internal Links
{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

## Interlinking

Interlinking is the backbone of a seamless website experience. It ensures visitors can move effortlessly from one page to another, finding exactly what they need without frustration. At its core, interlinking connects your content in a way that’s intuitive for users and informative for search engines. Google uses these links to map out your website’s structure and understand how your pages relate to each other—a crucial factor for ranking and visibility.

For users, think of interlinking as providing a crystal-clear roadmap. It leads visitors through your website, guiding them to the right information and keeping them engaged. For Google, these links work like a web of pathways, signaling the hierarchy and relevance of your content. Strong internal linking ensures your audience can navigate your site easily while boosting its search engine visibility.

## Impact when Links Break
Now, let’s consider when links break. Broken links frustrate users by leading them to dead ends, disrupting their experience. They also cause problems behind the scenes by interrupting the distribution of “link juice”—the ranking power that flows through your internal connections. While a few 404 errors won’t ruin your website entirely, they weaken both user trust and search engine efficiency. That’s why addressing broken links isn’t just good housekeeping—it’s a must for maintaining your site’s integrity.

In this article, we’ll focus on fixing broken internal links for [Pet Coach SG](https://petcoach.sg/). You’ll learn how to pinpoint these errors, resolve them effectively, and ensure your website works flawlessly for both visitors and Google. Let’s jump in and get things running smoothly!


## How to check for broken links | SE Ranking

Let’s roll up our sleeves and get into the nitty-gritty of identifying broken internal links. If you’re using SE Ranking, you’re in luck—it’s a powerful tool that makes the process straightforward. Here’s how you can zero in on those pesky 404 errors:



1. **Navigate to Projects** <br>
Start by logging into SE Ranking and heading to the **Projects** section. Select the project you’re working on—here, it’s Pet Coach SG. This will open up all the tools and data specific to your website.
2. **Access the Website Audit Tool** <br>
Once inside your project, find and click on the **Website Audit** section. This tool scans your site for issues and generates a comprehensive report, including a breakdown of internal links.
3. **Locate the Links Report** <br>
Within the audit, go to the **Found Links** section. This is your go-to area for uncovering all the internal links on your site and, more importantly, spotting any that are broken.
4. **Filter for 404 Status Codes** <br>
Broken links are marked with a **404 status code**—a signal that the target page no longer exists. To isolate these, use the filter options.
    * Set the filter to show only links with a **404 status code**.
    * Hit **Apply** to refine the list.
5. Review the Results. Once filtered, SE Ranking will display:
    * The **Target URL** (the link that’s broken) in the first column.
    * The **Source URL** (the page containing the broken link) in the second column. <br>
    ![alt_text](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-6-fixing-broken-internal-links/images/image1.png "image_tooltip")


This structured view makes it easy to pinpoint exactly where the issues are.

Once you’ve identified the broken links on your site, it’s time to organize the data and set the stage for fixing them. Follow these steps to process the data efficiently and plan your redirection strategy:

## Process the data, plan the fix

1. **Export the Data as a CSV File** <br>
In SE Ranking, export the filtered list of 404 links as a CSV file. This format keeps all the details structured and makes it easy to work with the data. <br>
![alt_text](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-6-fixing-broken-internal-links/images/image2.png "image_tooltip")

2. **Upload the CSV into Google Sheets** <br>
Open Google Sheets and upload your CSV file. Using Sheets lets you sort, filter, and manage the data collaboratively and dynamically. <br> 
![alt_text](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-6-fixing-broken-internal-links/images/image3.png "image_tooltip")

3. **Create a Unique List of Target URLs Returning 404**
    * Focus on the **Target URLs** column from the exported data.
    * Use the **Remove Duplicates** feature (under the "Data" menu in Google Sheets) to generate a unique list of URLs that are triggering 404 errors. 
This ensures you’re not addressing the same broken link multiple times, streamlining the process.
4. **Specify the Revised Location for Each 404 URL**
    * Next to each 404 Target URL, add a column for the **Revised Location**. <br>
    ![alt_text](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-6-fixing-broken-internal-links/images/image4.png "image_tooltip")

* Identify where each broken link should point and enter the correct URL. 
If the page no longer exists or has no replacement, consider redirecting it to the most relevant related page or your homepage as a fallback.

This step-by-step approach transforms your list of broken links into a clear action plan.


## Update .htaccess Redirect Rule

Once you have identified the broken links and planned your redirection strategy, it’s time to update your `.htaccess` file with the necessary redirect rules. Here’s how to do that:


### Original .htaccess for LiteSpeed Server:

This is your current `.htaccess` configuration, which includes existing redirects:
``` bash
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^our-training-approach/$ /about/our-training-approach/ [R=301,L]
    RewriteRule ^our-contributions/$ /about/our-contributions/ [R=301,L]
    RewriteRule ^canine-cooperative-care/$ /group-classes/canine-cooperative-care/ [R=301,L]
    RewriteRule ^canine-fitness/$ /group-classes/canine-fitness/ [R=301,L]
    RewriteRule ^phd-puppy/$ /group-classes/phd-puppy/ [R=301,L]
    RewriteRule ^canine-good-citizen-cgc/$ /group-classes/canine-good-citizen-cgc/ [R=301,L]
    RewriteRule ^behaviour-change-programme/$ /consultations/behaviour-change-programme/ [R=301,L]
    RewriteRule ^separation-anxiety-training/$ /consultations/separation-anxiety-training/ [R=301,L]
    RewriteRule ^animal-welfare-analysis-guidance/$ /consultations/animal-welfare-analysis-guidance/ [R=301,L]
    RewriteRule ^private-dog-training/$ /consultations/private-dog-training/ [R=301,L]
    RewriteRule ^courses/$ /group-classes/ [R=301,L]
    RewriteRule ^consultations/behaviour-change-programme/$ /consultations/canine-behaviour-training-programme/ [R=301,L]
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
    RewriteBase /
    RewriteRule ^index\.php$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.php [L]
</IfModule>
```

### Revised .htaccess for LiteSpeed Server:

After identifying and adding the necessary redirects, here’s the updated `.htaccess` configuration that includes the new rules for the broken links:
```bash
<IfModule mod_rewrite.c>
    RewriteEngine On

    # Existing redirects
    RewriteRule ^our-training-approach/$ /about/our-training-approach/ [R=301,L]
    RewriteRule ^our-contributions/$ /about/our-contributions/ [R=301,L]
    RewriteRule ^canine-cooperative-care/$ /group-classes/canine-cooperative-care/ [R=301,L]
    RewriteRule ^canine-fitness/$ /group-classes/canine-fitness/ [R=301,L]
    RewriteRule ^phd-puppy/$ /group-classes/phd-puppy/ [R=301,L]
    RewriteRule ^canine-good-citizen-cgc/$ /group-classes/canine-good-citizen-cgc/ [R=301,L]
    RewriteRule ^behaviour-change-programme/$ /consultations/behaviour-change-programme/ [R=301,L]
    RewriteRule ^separation-anxiety-training/$ /consultations/separation-anxiety-training/ [R=301,L]
    RewriteRule ^animal-welfare-analysis-guidance/$ /consultations/animal-welfare-analysis-guidance/ [R=301,L]
    RewriteRule ^private-dog-training/$ /consultations/private-dog-training/ [R=301,L]
    RewriteRule ^courses/$ /group-classes/ [R=301,L]
    RewriteRule ^consultations/behaviour-change-programme/$ /consultations/canine-behaviour-training-programme/ [R=301,L]

    # New redirects for broken links
    RewriteRule ^home-alone-training-how-to-leave-your-puppy-alone/$ /puppy-home-alone-training/ [R=301,L]
    RewriteRule ^canine-conditioning-coach-unleashing-your-dogs-full-physical-potential/$ /what-is-a-canine-conditioning-coach/ [R=301,L]
    RewriteRule ^dog-obedience-training-mastering-the-leave-it-cue/$ /train-dog-leave-it/ [R=301,L]
    RewriteRule ^from-ruff-to-ready-essential-obedience-training-steps/$ /essential-obedience-training-steps/ [R=301,L]
    RewriteRule ^private-dog-training-vs-group-classes-choosing-the-right-approach-for-your-canine-companion/$ /private-vs-group-dog-training/ [R=301,L]
    RewriteRule ^separation-anxiety-in-dogs/$ /what-is-separation-anxiety-in-dogs/ [R=301,L]
    RewriteRule ^how-to-manage-excessive-barking-or-howling-when-left-alone/$ /stop-dog-barking-howling-alone/ [R=301,L]
    RewriteRule ^poor-toilet-habits-when-leaving-your-dogs-alone/$ /reasons-dog-toilet-issues-alone/ [R=301,L]
    RewriteRule ^how-to-prevent-your-dog-from-being-destructive-when-left-alone-a-comprehensive-guide/$ /prevent-destructive-dog-behavior-alone/ [R=301,L]
    RewriteRule ^operant-conditioning-a-comprehensive-guide-for-dog-training/$ /operant-conditioning-dog-training/ [R=301,L]
    RewriteRule ^classical-conditioning-a-comprehensive-guide-for-dog-training/$ /classical-conditioning-dog-training/ [R=301,L]
    RewriteRule ^dog-separation-anxiety-training-a-comprehensive-guide/$ /dog-separation-anxiety-training-guide/ [R=301,L]
    RewriteRule ^8-effective-ways-to-get-rid-of-undesirable-behaviours/$ /eliminate-undesirable-dog-behaviors/ [R=301,L]
    RewriteRule ^punishment-free-training-5-reasons-why/$ /punishment-free-training-reasons/ [R=301,L]
    RewriteRule ^how-to-stop-a-dog-barking-when-theyre-left-alone/$ /stop-dog-barking-howling-alone/ [R=301,L]
    RewriteRule ^desensitisation-and-counterconditioning-dscc-an-effective-science-based-method-for-fears-and-phobias/$ /dog-fears-desensitisation-counterconditioning/ [R=301,L]
    RewriteRule ^a-comprehensive-guide-to-potty-training-your-puppy-setting-the-foundation-for-a-happy-and-healthy-companion/$ /puppy-potty-training-guide/ [R=301,L]

    # Preserve HTTP Authorization for WordPress
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
    RewriteBase /
    RewriteRule ^index\.php$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.php [L]
</IfModule>
```

### Sanity Check

Once you've updated your `.htaccess` file with the new redirects, it's time to perform a **sanity check** to ensure that the redirects are functioning as expected. 


Original URL (404 link):
`https://petcoach.sg/home-alone-training-how-to-leave-your-puppy-alone/` <br>
New URL (Redirect Target):
`https://petcoach.sg/puppy-home-alone-training/`


![alt_text](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-6-fixing-broken-internal-links/images/image5.png "image_tooltip")


Here's how you can do this using Chrome's Developer Tools.
#### Steps for Sanity Check: 




1. **Open the original URL in Chrome**:
    * In Chrome, enter the original URL (`https://petcoach.sg/home-alone-training-how-to-leave-your-puppy-alone/`) into the address bar and hit Enter.
2. **Open Chrome Developer Tools**:
    * Right-click anywhere on the page, and select **Inspect** (or use `Ctrl + Shift + I` on Windows, or `Cmd + Option + I` on Mac).
    * Switch to the **Network** tab in the Developer Tools window.
3. **Look for the Redirect Information**:
    * In the **Network** tab, you’ll see all network requests made when the page loads. Look for the request corresponding to the original URL (`https://petcoach.sg/home-alone-training-how-to-leave-your-puppy-alone/`).
    * Click on the request and inspect the **Headers** section.
4. **Check the Request and Response Headers**:
    * In the **Request** section, verify that the original URL is being requested.
    * In the **Response** section, look for the **Location** header, which should show the **revised location**: `https://petcoach.sg/puppy-home-alone-training/`.
    * The **Status Code** should be `301` (permanent redirect), confirming that the redirect is in place.
5. **Confirm the Redirect**:
    * If the response header indicates the correct `Location` and the status code is `301`, the redirect is working as expected. 
    ![alt_text](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-6-fixing-broken-internal-links/images/image6.png "image_tooltip")



## Re-run SE Ranking Website Audit

Now that we’ve implemented the redirects and completed our sanity check, it's time to **double-check** everything by running another audit in SE Ranking. This will ensure that all the broken internal links have been successfully fixed, and no 404 errors remain.


### Steps to Re-run the SE Ranking Audit:



1. **Rerun the Website Audit**:
    * Go back to your SE Ranking dashboard.
    * Navigate to the **Website Audit** section for your project.
    * Click on the **Re-run Audit** button to start a fresh scan of your site. <br>
    ![alt_text](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-6-fixing-broken-internal-links/images/image7.png "image_tooltip")

2. **Filter for 404 Status Code**:
    * Once the audit completes, go to the **Found Links** section.
    * Filter the results to only show **Status Code 404** links (the broken internal links you’ve just fixed).
    * Hit **Apply**.
3. **Check for No More 404 Results**:
    * If everything was done correctly, **no results should show up** for 404 internal links.
    * This means that there are no more broken internal links on your site, and all redirects are working as they should. <br>
    ![alt_text](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-6-fixing-broken-internal-links/images/image8.png "image_tooltip")


By re-running the audit, you confirm that your internal links are now working seamlessly, improving both the user experience and Google’s ability to crawl and understand your website.

## Thanks

Thanks if you made it this far -- let me know if you have a better approach. Happy to update, streamline my flow too ^^!