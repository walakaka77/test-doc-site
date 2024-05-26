---
layout: page
title: Indexing Pages that aren't yours!
permalink: /tech-adventures/search-engine-optimization/indexing-pages-that-arent-yours
parent: Search Engine Optimization
grand_parent: Tech Adventures
nav_order: 1
index: 'yes'
follow: 'yes'
description: Ever had a need to index pages that are not yours? Here's a legal hack on how to do it!
image: ../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-1-steps-to-host-your-jekyll-site/image-jekyll-blog-host-your-site.png
---

<!-----



Conversion time: 0.521 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β36
* Sat May 25 2024 23:32:49 GMT-0700 (PDT)
* Source doc: Untitled document
----->



# **Indexing Pages that Aren't Yours!**

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

Ever had a need to index pages that are not yours? Here's a legal hack on how to do it! In this blog post, we take a deep dive into the intricacies of getting third-party web pages indexed by Google, which can be quite a challenge if it's not your own site. This guide is particularly valuable for SEO enthusiasts, website owners, and digital marketers who aim to maximise their online presence.

{: .note}
This article explores steps to have Google index pages that do not belong to you. For pages that actually belong to you, the approch is much simpler and will be covered in a separate article!

## **The Importance of Indexing Pages**

Before we delve into the "how," let’s start with the "why." When a page is not indexed by Google, it essentially doesn't exist in the eyes of search engines. This can have several ramifications:



* **Backlink and Citation Recognition**: If your website is listed in a directory but the page isn't indexed, Google doesn't acknowledge the backlink and citations.
* **SEO Impact**: Unindexed pages can affect your Local SEO efforts and overall site authority.


## **Identifying the Problem: Non-Indexed Directory Pages**

We have our website listed in a couple of directories for Local SEO purposes (but as seen in the next few sections, the directory pages are not indexed):

{: .note}
The below links are actually pointing to the actual directory listing itself. In doing so, we hope that crawls our links and indexes that page in the future!

- [Globeia listing](https://sg.enrollbusiness.com/BusinessProfile/5458475/Globeia)
![sg enroll directory](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-1-indexing-pages-that-are-not-yours/image-srenroll-directory.png)


- [2FindLocal listing](https://www.2findlocal.com/b/15096552/pet-coach-sg-singapore)
![2find local listing](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-1-indexing-pages-that-are-not-yours/image-2findlocal-listing.png)

## **Verify whether directory pages are indexed**

### **How to check if pages are indexed**

In google search console, we can easily check for whether a page is indexed by searching for `site:<full website url>`. Try it yourself!

![Google Site Search for petcoach.sg shows list of indexed pages by google](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-1-indexing-pages-that-are-not-yours/image-google-site-search-show-petcoach-indexed-pages.png)

For us, we are interested in the following links:
- `https://sg.enrollbusiness.com/BusinessProfile/6559523/Pet-Coach-SG-079903`
- `https://www.2findlocal.com/b/15096552/pet-coach-sg-singapore`

Details of the search query is described in subsequent sections.

### **Results for directory listing page indexing status**

Unfortunately, these pages are not indexed by Google. Here are some screenshots indicating their current status. See the search queries below for details.

### **Screenshot 1: sg.enrollbusiness.com Not Indexed**

1. Access google search and search for `site: sg.enrollbusiness.com/BusinessProfile/6559523/Pet-Coach-SG-079903`. 
2. You will see that there are not results found.

![site search on google does not find any indexed petcoach listing for sgenroll](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-1-indexing-pages-that-are-not-yours/image-site-search-no-petcoachliting-sgenroll.png)


### **Screenshot 2: 2findlocal.com Not Indexed**

1. Access google search and search for `site: www.2findlocal.com/b/15096552/pet-coach-sg-singapore`. 
2. You will see that there are not results found.

![site search on google does not find any indexed petcoach listing for 2find local](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-1-indexing-pages-that-are-not-yours/image-2find-local-page-listing-petcoach.png)


### **Missing Backlinks**

When these pages are not indexed, Google fails to register the backlinks and citations. Here’s a screenshot from our Google Search Console showing the absence of these backlinks:

![no backlinks in GSC from sgenroll and 2find local pointing to pet coach](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-1-indexing-pages-that-are-not-yours/image-gsc-no-backlinks-fromsgenroll-2findlocal.png)

We can see that there are no backlinks recognized by Google Search Console (GSC), from either *2findlocal* or *sgenroll*. 

Now, we need a way to get these directory pages indexed so that Google recognizes the backlinks and citations.

## **The Plan to Get Pages Indexed**

**Step 1: Create an Indexable Page**

We'll create a new page that will definitely be indexed by Google. This page will include links pointing to the directory pages listing our website. Essentially, this blog post serves that purpose. The links can be found in [this section!](#identifying-the-problem-non-indexed-directory-pages)

**Step 2: Request Indexing for Our Page**

Once our page is live, we’ll request Google to index it. This will ensure Google crawls our page and all links within it, including the directory pages.


### **How to Request Indexing**



1. Log into Google Search Console.
2. Inspect the URL of the page to be indexed.
3. Run live testing by clicking the 'Test Live URL' button.
4. If Google indicates the page can be indexed, click 'Request Indexing'.


### **Potential Issues**

If the page cannot be indexed:



1. Check the `robots.txt` file to ensure it’s not blocking Google bots.
2. Check the meta tags in the HTML to confirm there isn't a `noindex` directive.


### **Ensure that the Directory Page Be Indexed**

We have checked the directory pages and found:



* **No Blockages in robots.txt**: There are no `robots.txt` tags blocking Google bots. 
![robots meta tag does not block google bot](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-1-indexing-pages-that-are-not-yours/image-robotstxt-does-not-block-googlebot.png)
* **No `noindex` Meta Tags**: The pages do not have `noindex` robots meta tags. 
![robots meta tags does not specify `noindex`](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-1-indexing-pages-that-are-not-yours/image-robots-meta-doesnt-say-noindex.png)

This means, theoretically, the directory pages should be indexable. We will review the pages again after several days and update this post with the results.


### **Revisiting the Pages**



* **If successful**: Our approach works, and the pages get indexed.
* **If not**: We may need to explore alternative methods.


## **Understanding No Follow Links**


### **What is a No Follow Link?**

A `nofollow` attribute is added to a hyperlink to tell search engines not to pass any SEO value to the linked webpage. For further details regarding follow vs no follow links, checkout the article by Semrush here:[ SEMrush on Follow vs No Follow Links](https://www.semrush.com/blog/nofollow-links/)


### **How to Check for No Follow Links**

You can inspect links using developer tools in browsers to see if the `rel="nofollow"` attribute is present.


### **Impact of No Follow Links**

While Google does follow `nofollow` links, it doesn't give them as much weight as `follow` links. However, Google still follows the link, and the pages should still be indexed. See the detailed testing done by Backlinko in this article:[ Backlinko on No Follow Links](https://backlinko.com/nofollow-link#)

This means that even if a link is marked with `nofollow`, it can still contribute to your overall indexing efforts.


## **Conclusion**

Trying to get a page indexed that isn't yours is a bit like navigating a labyrinth, but it’s certainly doable. Our experiment with creating an indexable page pointing to non-indexed directory listings serves as a practical approach to overcome this challenge.Stay tuned for updates on the success of this method, and feel free to share your experiences or ask any questions in the comments section below. Happy indexing!



Peace and Love<br>
Shafik Walakaka