---
layout: page
title: Custom Scrollspy
permalink: /tech-adventures/wordpress/custom-scrollspy
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 13
index: 'yes'
follow: 'yes'
description: Custom Scrollspy implementation
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

Hello! For those of you who don't know, I've been managing the [Pet Coach SG's website](https://petcoach.sg/) for awhile now!

Main tasks are basically optimising for SEO, and to do that we need to ensure two things:
1. Google can understand that we are the authority
2. Users (actual people), are actually staying on the website and finding it useful

{: .note }
Will not be going into the details of SEO optimisation etc. For that stuff you can check out my [SEO Optimisation section](/tech-adventures/search-engine-optimization/)!

Sidenote -- we've been successful thus far, number #1 !!!!!
![dog training singapore ranking first](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-13-custom-scrollspy/Screenshot 2025-08-24 at 8.56.53 PM.png)

## The Problem

So to have google understand we are the authority, I do need quite alot of information on my page specific to dog training.

We're trying to rank for the query "Dog Training Singapore", and we're trying to rank for the [Animal Training Centre](https://petcoach.sg/animal-training-centre/) page.

But with alot of information, it becomes difficult for users to navigate. If users get confused, they will simply leave the site.

{: .note }
> We live in an era of extremely short attention span. If you don't have your site user friendly, in a way that's easy to obtain information, you can expect users to leave.
> 
> AND, if users leave and your bounce rate is high, it's a clear signal to Google that your site is not serving the users well for the search query.

## How to Solve it

So to solve it, we broke our page into clear sections:
1. The Hero Section (with a clear CTA)
2. The Dog Training Facility Intro Section (with a Video)
3. A guide to Dog Training Singapore Section
4. A Customer Review Section
5. Dog Training (Fitness and Obedience) tips section
6. Private Dog Training Section
7. Dog Training Videos Section
8. Group Dog Training Class Section
9. Our Expertise Section
10. Scheduled Section
11. Price Section
12. FAQ Section


Damn, even writing that was tiring, how do we expect users to be able to navigate effectively between the different section (especially since they are in one page).

There comes the Scrollspy!!

{: .note }
In this article, I will walk you through step-by-step the custom implementation of my scrollspy. You can follow too!!

## Scrollspy Implementation

So my scrollspy is simple, it's a html list styled using CSS. We also track active sections based on section ID's and highlight the relevant section that we are on!

See an example screenshot of our Scrollspy:
![Scrollspy ATC Page](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-13-custom-scrollspy/Screenshot 2025-08-24 at 8.32.18 PM.png)

Let us step it down step-by-step, so that you can do it too!

### HTML Element

So, our scrollspy is just a list in html. See the code snippet below:
```html
<nav id="scrollspy-nav" class="scrollspy-nav">
  <ul>
    <li><a href="#section-intro">Welcome</a></li>
    <li><a href="#section-dog-training-accordion">Dog Training Guide</a>
    </li>
    <li><a href="#section-reviews">Our Reviews</a></li>
    <li><a href="#section-tips">Dog Training Tips</a></li>
    <li><a href="#section-private">Private Dog Training</a></li>
    <li><a href="#section-videos">ATC Videos</a></li>
    <li><a href="#section-group-class">Group Dog Training</a></li>
    <li><a href="#section-expertise">Our Expertise</a></li>
    <li><a href="#section-schedule">ATC Schedule</a></li>
    <li><a href="#section-pricing">Cost & Price</a></li>
    <li><a href="#section-faq">FAQ</a></li>
  </ul>
</nav>
```

This creates the element of each section in the scrollspy.

{: .note }
Notice each section has an id such as `#section-reviews`. This is important, it will be used by our script to detect whether the reader is on the correct section and highlights the relevant section. We will go through the script in more detail later!

We use Elementor, so we created a section, and they have a html widget that we use. See reference here:
![elementor html div](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-13-custom-scrollspy/Screenshot 2025-08-24 at 8.59.57 PM.png)


### CSS Style

Our scrollspy, is styled using CSS! And it's designed to be mobile responsive. 


See our css styles below:
```css
/* Fix z-index for sticky desktop-only header section 
   so that it appears above dropdown menus and other elements */
.elementor-section.elementor-sticky.elementor-sticky--active.elementor-hidden-tablet.elementor-hidden-mobile {
    z-index: 1200 !important;
}



/* Add spacing using gap — and maybe a faint vertical divider look */
#scrollspy-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 49.7109px;
}

#scrollspy-nav.sticky {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* subtle shadow when fixed */
   z-index: 1000; /* 👈 Ensures it’s above other UI */
}

.scrollspy-nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 20px;
  overflow-x: auto;
}

.scrollspy-nav a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-width: 100px;
  padding: 0 16px;
  border-radius: 6px;
  background: #f2f2f2;
  color: #444;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #ddd; /* 👈 subtle border around each box */
  box-sizing: border-box;
}

.scrollspy-nav a:hover,
.scrollspy-nav a.active {
  background: #CF515E;
  color: white;
  font-weight: 600;
  border-color: #bb28c0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Sticky state – when it scrolls past trigger point */



/* Responsive styles */

/* iPad/tablet landscape (768px - 1024px) */
@media (max-width: 1024px) {
  .scrollspy-nav a {
    min-width: 90px;
    height: 38px;
    padding: 0 12px;
    font-size: 14px;
  }

  .scrollspy-nav ul li:not(:last-child)::after {
    right: -8px;
    top: 6px;
    bottom: 6px;
  }
}

/* Mobile portrait (max-width: 767px) */
@media (max-width: 767px) {
  #scrollspy-nav {
    padding: 8px;
    gap: 6px;
  }

  .scrollspy-nav ul {
    gap: 12px;
  }

  .scrollspy-nav a {
    min-width: 80px;
    height: 36px;
    padding: 0 10px;
    font-size: 13px;
  }

  .scrollspy-nav ul li:not(:last-child)::after {
    right: -6px;
    top: 5px;
    bottom: 5px;
  }
}

/* Very small mobiles (max-width: 400px) */
@media (max-width: 400px) {
  #scrollspy-nav {
    padding: 6px;
    gap: 4px;
  }

  .scrollspy-nav ul {
    gap: 8px;
  }

  .scrollspy-nav a {
    min-width: 70px;
    height: 32px;
    padding: 0 8px;
    font-size: 12px;
  }

  .scrollspy-nav ul li:not(:last-child)::after {
    right: -5px;
    top: 4px;
    bottom: 4px;
  }
}
```

Elementor pro allows for us to insert custom CSS in the widghet. So we did just that:
![css style in elementor](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-13-custom-scrollspy/Screenshot 2025-08-24 at 9.01.14 PM.png)

#### Mobile Responsiveness

How do we ensure mobile responsiveness? Media queries!!
For example, for view ports (aka screensize) that are smaller than 787px, like ipad or smth -- these styles will override the base style originally set by the css:
```css
/* Mobile portrait (max-width: 767px) */
@media (max-width: 767px) {
  #scrollspy-nav {
    padding: 8px;
    gap: 6px;
  }

  .scrollspy-nav ul {
    gap: 12px;
  }

  .scrollspy-nav a {
    min-width: 80px;
    height: 36px;
    padding: 0 10px;
    font-size: 13px;
  }

  .scrollspy-nav ul li:not(:last-child)::after {
    right: -6px;
    top: 5px;
    bottom: 5px;
  }
}
```

### Script

So the above allows for the scrollspy to look nice and neat. Now, here comes the real magic, the script that brings the scroll spy to life!

The script is in charge of
1. Ensuring the scrollspy tracks the view port and highlights when readers reach the correct sections
2. Allowing readers to click into the scrollspy, and then the viewport will navigate to the relevant section


For the script, we placed it at the bottom of the document, so that it doesn't block any other elements from loading.

![javascript at the bottom of teh elementor widget](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-13-custom-scrollspy/Screenshot 2025-08-24 at 9.05.00 PM.png)

And, that's literally it lol. Let's dive into it!


This first part, actually reads the DOM elements and sets variables to track how far the scrollspy should be away from the top of the viewport.
- If the distance is not sufficiently, close to the viewport, scrollspy will be part of the DOM
- If the distance is sufficiently close, then we remove scrollspy component from the document, and scrollspy becomes sticky!!

```javascript
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("scrollspy-nav");
  const container = document.getElementById("scrollspy-container");
  let stickyTopGap = 116.367;
  let stickyTriggerScroll = 850;
  
  
  if (window.matchMedia("(max-width: 1024px)").matches) {
  // For ipad
  stickyTopGap = 100;      // adjust as needed
  stickyTriggerScroll = 700;  // adjust trigger scroll position if needed
 }

  if (window.matchMedia("(max-width: 767px)").matches) {
    stickyTopGap = 84.1094;
    stickyTriggerScroll = 1300;
  }
  
  if (window.matchMedia("(max-width: 400px)").matches) {
  // For very small devices like iPhone 15 Mini
  stickyTopGap = 75;      // adjust as needed
  stickyTriggerScroll = 1280;  // adjust trigger scroll position if needed
 }

```

Once we've done that, we realize there was a jumping movement. Because when we take the scrollspy out of the document flow, the elements jump to fill it in.

So, this snippet, adds a spacer -- to prevent the jarring jumping effect. This helps user experience, and it feels as though the scrollspy is moving without any jagged movements in the website!


```javascript


  // Spacer creation...
  const spacer = document.createElement("div");
  spacer.style.width = "100%";

  function setNavBounds() {
    const containerRect = container.getBoundingClientRect();
    const leftOffset = containerRect.left + window.pageXOffset;

    nav.style.width = containerRect.width + "px";
    nav.style.left = leftOffset + "px";
  }

  function addSpacer() {
    spacer.style.height = nav.offsetHeight + "px";
    nav.parentNode.insertBefore(spacer, nav);
  }

  function removeSpacer() {
    if (spacer.parentNode) {
      spacer.parentNode.removeChild(spacer);
    }
  }

```
 

The next few snippets actually helps to
1. Highlight the active section in the scrollspy
2. Horizontal scroll the scrollspy, so that we can see the active section in the scrollspy

Yes, there is so many sections, that we needed horizontal scrolling on our scrollspy. I that best practice? No bloody idea, but it seems to work for me ><!

This snippet defines a JavaScript function named scrollActiveLinkIntoView.
What it does
1. It looks for the scrollable navigation container:
    - const nav = document.querySelector("#scrollspy-nav ul");
2. Inside that container, it finds the currently active link (<a class="active">).
3. It then checks whether that active link is fully visible inside the horizontal scroll area.
4. If the active link is partially or fully out of view (to the left or right), it calculates how much to scroll.
5. Finally, it smoothly scrolls the navigation container so that the active link is centered horizontally.

In plain words, this function ensures that the active navigation item is always scrolled into view, centered within the nav bar, whenever it’s not visible.

```javascript
  // This function is defined before highlightActiveLink
function scrollActiveLinkIntoView() {
  const nav = document.querySelector("#scrollspy-nav ul"); // scrollable container
  const activeLink = nav.querySelector("a.active");
  if (activeLink) {
    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    // Check if activeLink is out of view horizontally
    if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
      // Calculate scrollLeft to center activeLink
      const scrollLeft = activeLink.offsetLeft - (nav.clientWidth / 2) + (activeLink.clientWidth / 2);
      nav.scrollTo({
        left: scrollLeft,
        behavior: "smooth"
      });
    }
  }
}

```

Next, this is the snippet that highlights the active link!! This code makes your nav bar become sticky at the top after scrolling down, and continuously updates the highlighted nav link as you move through sections. It also auto-centers the active link inside the scrollable nav bar, keeping the user’s current section in view both vertically (page scroll) and horizontally (nav scroll).

```javascript
  // Highlight links and call scroll into view
  function highlightActiveLink() {
    const navLinks = nav.querySelectorAll("a");
    const headerOffset = stickyTopGap; // Use stickyTopGap as header offset
    const scrollPosition = window.scrollY + headerOffset + nav.offsetHeight + 1;

    const sections = Array.from(navLinks).map(link =>
      document.querySelector(link.getAttribute("href"))
    );

    sections.forEach((section, index) => {
      if (
        section.offsetTop <= scrollPosition &&
        section.offsetTop + section.offsetHeight > scrollPosition
      ) {
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks[index].classList.add("active");
      }
    });

    scrollActiveLinkIntoView();
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY >= stickyTriggerScroll) {
      if (!nav.classList.contains("sticky")) {
        addSpacer();
      }
      nav.classList.add("sticky");
      nav.style.position = "fixed";
      nav.style.top = stickyTopGap + "px";
      setNavBounds();
    } else {
      nav.classList.remove("sticky");
      nav.style.position = "";
      nav.style.top = "";
      nav.style.left = "";
      nav.style.width = "";
      removeSpacer();
    }

    highlightActiveLink();
  });
```

This code makes your sticky scrollspy nav responsive: it adjusts layout on resize, enables smooth scrolling to sections when clicking nav links, and ensures the active link is highlighted correctly on load.

```javascript
  window.addEventListener("resize", function () {
    if (nav.classList.contains("sticky")) {
      setNavBounds();
      spacer.style.height = nav.offsetHeight + "px";
    }
  });

  // Smooth scroll on click
  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const scrollspyOffset = nav.offsetHeight;
        const totalOffset = stickyTopGap + scrollspyOffset;
        const scrollTarget = targetSection.offsetTop - totalOffset;
        window.scrollTo({
          top: scrollTarget,
          behavior: "smooth"
        });
      }
    });
  });

  highlightActiveLink(); // initial highlight + scroll on page load
});

</script>
```


## Thank you!

And that's all. A simple script, written with the help of chatGPT to be honest. But it's cool to learn and understand how the script works!!

And seriously, since when can a non-tech person create a scrollspy from scratch and have it look as sexy as this
![scrollspy image summary](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-13-custom-scrollspy/Screenshot 2025-08-24 at 8.54.54 PM.png)

{: .note }
Still not convinced, head over to the [ATC website](https://petcoach.sg/animal-training-centre/) and check it out for yourself here!! Remember to stay on for at least 10 seconds LOOL, that will help my SEO game!

We're already first! You can help us continue to stay on top!
![dog training singapore ranking first](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-13-custom-scrollspy/Screenshot 2025-08-24 at 8.56.53 PM.png)


