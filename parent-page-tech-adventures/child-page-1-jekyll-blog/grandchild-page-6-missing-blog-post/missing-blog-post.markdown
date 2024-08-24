---
layout: page
title: Missing Blog Post!
permalink: /tech-adventures/jekyll-blog/missing-blog-post
parent: Jekyll Blog
grand_parent: Tech Adventures
nav_order: 6
index: 'yes'
follow: 'yes'
description: This article shares with you the story of the missing blog post due to how GitHub pages work.
image: ../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-6-missing-blog-post/missing-blog-post.png
---

# The Mystery of the Missing Blog Posts


## A Jekyll and GitHub Pages Adventure

So, here's a little behind-the-scenes peek at a recent adventure I had with my Jekyll blog. I was knee-deep in writing about vermicomposting—yes, that's the fancy term for worm composting—when my trusty sidekick, Storm, decided to play alarm clock at 3:00 AM. As you can imagine, I didn’t quite manage to get back to sleep, so I figured, why not dive into some blogging?

That’s when things took a puzzling turn. I published my latest posts to the main site, and although everything seemed healthy on GitHub Pages, my new blog posts were nowhere to be found. What on earth was going on?


## Developing Locally: A Sneak Peek

Before pushing anything live, I always make sure to verify my blog posts locally. I double-check everything to ensure it's all in order before sending it off to the GitHub repository. Once I’m satisfied, I push the changes, and GitHub Pages is set to automatically deploy from there. Here’s a screenshot of my local setup, showing the two new posts looking as they should.

![alt_text](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-6-missing-blog-post/images/image2.png "image_tooltip")


Since everything was looking good, I went and proceed to push to my main site!


## The Push to the Main Site

I pushed the changes to the main site at around 7:56 AM. The commit went through smoothly, and everything seemed to be on track. Here’s a screenshot of the commit timestamp.


![alt_text](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-6-missing-blog-post/images/image5.png "image_tooltip")


But here’s the kicker: this was still at 23:56 GMT. GitHub Pages operates on GMT, which was a clue as to why my posts aren't appearing.


![alt_text](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-6-missing-blog-post/images/image4.png "image_tooltip")


See the above screenshot for the missing blog post in my main site! Since I didn’t know any better, the first place I thought to look was whether the site was deployed successfully.


## Checking Deployment Issues

GitHub Pages uses GitHub Actions to handle deployments. Everything looked successful on the Actions page, so it was a bit baffling to see the posts missing. Here’s a screenshot showing the successful deployment status.


![alt_text](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-6-missing-blog-post/images/image3.png "image_tooltip")


Now that I couldn't find anything with the deployment, it took me some time before I figured out where to look.To be honest, I was just randomly looking around dev tools, network tab to check for clues – and that was where it clicked.


## Unpacking the Timestamp Mystery

Diving deeper into the dev tools, I noticed that the timestamp was in GMT, which meant the date stamp was actually 23 August 2024, 23:57 GMT. 
![alt_text](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-6-missing-blog-post/images/image1.png "image_tooltip")


Diving deeper into the dev tools, I noticed that the timestamp was in GMT, which meant the date stamp was actually 23 August 2024, 23:57 GMT. This was a clue I wasn't familiar with, so I did a bit of research to understand how GitHub Pages decides which posts to publish.


## What I Discovered About GitHub Pages and Jekyll

It turns out that GitHub Pages uses the date-time stamp in your markdown files to determine when to publish blog posts. If the timestamp in the file is set for a future date, GitHub Pages will hold off on publishing it until that date arrives in GMT. In my case, my post was stamped for 24 August 2024, but because GitHub Pages was still operating on 23 August 2024 GMT, it didn't show the post yet.

This was a concept I hadn't fully grasped before, and learning about it was both eye-opening and quite fascinating. It’s a crucial detail for anyone working with Jekyll and GitHub Pages, and a big reminder to always double-check the time zones and timestamps when dealing with deployments.


## The Jekyll and GitHub Pages Puzzle

GitHub Pages and Jekyll rely on the date-time stamp in your markdown file to determine when a post should go live. My post was stamped for 24 August 2024. Locally, it showed up fine because my machine was in SGT, but when pushed to GitHub Pages, the date was still showing as 23 August 2024. Hence, the posts weren't displayed yet. It's fascinating and a bit mind-boggling!

And a big shoutout to all the devs out there dealing with production issues under tight deadlines. This little hiccup made me appreciate the pressure they work under. Hats off to you!


## The Fix: A Little Tweak Goes a Long Way

To get GitHub Pages to rebuild and deploy on 24 August GMT, we made a small change. At around 12:00 PM SGT (0400 GMT), I added a few whitespaces to the markdown file and committed the change. 


![alt_text](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-6-missing-blog-post/images/image8.png "image_tooltip")


After pushing it to GitHub Pages, we saw that the deployment was successful, and the build was updated to 24 August 2024 GMT. 


![alt_text](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-6-missing-blog-post/images/image6.png "image_tooltip")


Refreshing the site, the two new blog posts were finally visible. Mystery solved!


![alt_text](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-6-missing-blog-post/images/image7.png "image_tooltip")



## Wrapping Up

If you made it this far, thanks for sticking with me! It’s been a bit of a rollercoaster, but sharing this experience makes it feel less like a solitary struggle. As they say, misery loves company! Otherwise, enjoy your Saturday, and happy blogging!

Thanks for joining me on this journey. Looking forward to your thoughts and experiences with Jekyll and GitHub Pages!
