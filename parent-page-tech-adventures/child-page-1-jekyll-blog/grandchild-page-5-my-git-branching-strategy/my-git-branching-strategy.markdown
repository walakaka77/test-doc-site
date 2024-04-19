---
layout: page
title: My Git Branching Strategy!
permalink: /tech-adventures/jekyll-blog/my-git-branching-strategy
parent: Jekyll Blog
grand_parent: Tech Adventures
nav_order: 5
index: 'yes'
follow: 'yes'
description: This article aims to step down my Git Branching Strategy. For your comments and feedback to see if this is applicable or if it can be improved!
image: ../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-4-feeling-responsive-template/image-jekyll-blog-feeling-responsive-template.png
---

<!-----



Conversion time: 0.313 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β35
* Wed Apr 17 2024 09:01:55 GMT-0700 (PDT)
* Source doc: Untitled document
----->



# **My Git Branching Strategy**

When it comes to managing a software development project, an effective Git branching strategy is akin to having a well-thought-out roadmap. For my website project, I wanted to ensure a smooth go-live at the end of March but was faced with a challenge. Several articles weren’t yet ready for publication, cluttering the Main branch. To streamline the process, I had to introduce version tracking and hide unfinished articles from the main pipeline while ensuring the ability to track them separately.

Here's how I adapted my Git branching strategy to meet the needs of my evolving project.


## **Introducing Version Tracking with Git**


### **Tracking Essential Changes in Main**

Previously, every change was tracked within the Main branch. Now, I needed a more nuanced approach where only articles ready for publishing lived in Main. The rest would be tracked but remain hidden. This shift required the adoption of a more structured, multi-branch strategy, and Git's capabilities seemed tailor-made for this mission.


## **Hiding Unfinished Work**


### **The Tech-for-the-Layman Branch**

One of the articles that wasn't ready for publication was 'Tech for the Layman'. To hide it, I created a separate branch. Here's how I did it:



1. Branch Out: From Main, I created a new branch specifically for the 'Tech for the Layman' article.
2. Test Deletion: Ensuring 'Tech for the Layman' was removed from the Main branch and validated the change.z
![image showing that I have deleted files for Tech for the Layman article](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-deleted-file-for-tech-for-the-layman.png)
3. When we access the site on our local, we can see that the "Tech for the Layman" article is no longer available
![image showing no tech for the layman article](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-showing-no-tech-for-the-layman-article.png)
4. Switch and Validate: I switched to the 'Tech for the Layman' branch and confirmed the article appeared as it should.


## **Testing the Main-Staging Merge**

Making many changes on the local machine and then integrating those into the Main branch without any validation can be risky. Hence, the introduction of the 'main-staging' branch served as a conduit for integration testing. This was crucial for ensuring the quality of the code set to go live.


### **Ensuring Deployment-Ready Code**

To ensure each batch of code was deployment-ready, I followed these steps:



1. Test Integration: I merged code changes from feature branches (such as 'Tech-for-the-Layman') into 'main-staging' and ran a series of tests to simulate the deployment process.
2. Frequent Rebase: I regularly rebased 'main-staging' with Main to keep all the changes up to date and aligned with the live site's features and design.


## **Managing the Remote Repository**


### **Keeping Track of All Changes**

Maintaining a clean, up-to-date code base across all remote repositories is essential, especially when working from multiple devices. I regularly managed my remote and local branches to ensure they matched the project’s current state.



1. Pushing Feature Branches: After completing changes in a feature branch, I pushed them to the remote repository.
2. Merging and Deleting Branches: Once code changes were successfully tested in the main-staging branch, I merged them into Main and deleted the feature branch, subsequently removing any deleted branches from the remote repository with a single command.


## **A Common Mistake with Deletion and Branching**


### **Deleting Images During Branch Cleanup**

In my eagerness to streamline the Main branch, I made a notable mistake with the 'Tech for the Layman' article. While removing the in-progress article from the Main branch, I also deleted related images, intending to track them separately in the 'Tech-for-the-Layman' branch. However, since these images were not considered "changed" from the base commit in the 'Tech-for-the-Layman' branch, they did not merge back into Main upon completion. This oversight in understanding Git's handling of unmodified files across branches led to a lack of visual content in the final article presentation. This example underscores the importance of a thorough review and understanding of Git's file tracking mechanisms, especially when managing multimedia content in development projects.


### **Understanding Git's Base Commit Tracking**

Git's approach to tracking changes is fundamentally rooted in its ability to monitor differences from a base commit, where a commit represents a specific snapshot of your project's files. When you branch off from Main, Git effectively takes a snapshot of all files at that point, considering it as the base commit for the new branch. Any changes you make are tracked against this snapshot. If a file is not modified in the new branch, Git sees no difference from the base commit and thus, no "change" to track or merge back into Main. This explains why the deletion of images in the Main branch, while not re-adding or modifying them in the 'Tech-for-the-Layman' branch, resulted in their absence post-merge. Understanding this mechanism is crucial for managing files across branches, especially when dealing with non-text files that may not show visible changes in the way that code does.


## **Taking the Next Steps**


### **Eliciting Feedback and Continuous Improvement**

I understand that my project is relatively simple, and the branching strategy I've described may not be suited for all scenarios, especially those for enterprise applications. I'm open to feedback and would love to learn how others track their code base. Continuous learning and improvement are fundamental in the dynamic world of development.

Thank you for joining me on this exploration of my Git branching strategy. It's a critical aspect of my development process, and I hope it serves as a springboard for your own branching efforts. By understanding and customizing Git's extensive branching and merging capabilities to your project’s unique needs, you can significantly enhance collaboration, version control, and project management. Be diligent, learn from mistakes, and always seek to optimize your workflow. The result will be a finely tuned development cycle that is both efficient and effective.


Until then, peace and love <br>
Shafik Walakaka