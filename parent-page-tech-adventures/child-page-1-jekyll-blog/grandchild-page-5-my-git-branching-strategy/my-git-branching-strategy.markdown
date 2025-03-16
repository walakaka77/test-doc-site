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
image: ../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-jekyll-blog-branching-strategy.png
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


### **The tech-for-the-layman Branch**

One of the articles that wasn't ready for publication was `Tech for the Layman`. To hide it, I created a separate branch. Here's how I did it:



1. Branch Out: From Main, I created a new branch specifically for the `Tech for the Layman` article.
![image showing me branching out from main into a fresh branch in visual studio code](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-showing-create-new-branch-from-main.png)
2. Test Deletion: Ensuring `Tech for the Layman` article was removed from the `main-staging` branch and validated the change.<br>
_Note: In the screenshot below, we have referenced the `main-staging` branch. Once we have tested the deletion, we will merge `main-staging` into `main`._
![image showing that I have deleted files for Tech for the Layman article](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-deleted-file-for-tech-for-the-layman.png)
3. When we access the site on our local (in `main-staging`), we can see that the `Tech for the Layman` article is no longer available
![image showing no tech for the layman article](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-showing-no-tech-for-the-layman-article.png)
4. Switch and Validate: I switched to the `tech-for-the-layman` branch and confirmed the article appeared as it should.
   - Indeed, the files are available in the `tech-for-the-layman` branch
   ![image showing the tech for the layman branch](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-showing-the-tech-for-the-layman-branch.png)
   - Refreshing the site also displays the `Tech for the Layman` article
   ![image showing that the tech for the layman article is displayed in the browser when we load the tech-for-the-layman branch](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-reloading-tech-for-the-layman-branch-in-browser.png)

## **Testing the Main-Staging Merge**

Making many changes on the local machine and then integrating those into the Main branch without any validation can be risky. Hence, the introduction of the `main-staging` branch served as a conduit for integration testing. This was crucial for ensuring the quality of the code set to go live.


### **Ensuring Deployment-Ready Code**

To ensure each batch of code was deployment-ready, I followed these steps:



1. Test Integration: I merged code changes from feature branches (such as `tech-for-the-layman`) into `main-staging` and ran a series of tests to simulate the deployment process.
   - In the previous example, we deleted all the files related to the `tech-for-the-layman` article in the `main-staging` branch.
   - After testing, we can merge the `main-staging` branch into the `main` branch. 
   ![image showing that I have checked out to the main branch, and am currently pending merge from main-staging](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-showing-checked-out-to-main-pending-merge-main-staging.png)
   - When checked out to `main`, you can run the command `git merge <source-branch>`. When successful, your `main` branch will be updated to reflect the changes that have been made in your `main-staging` branch
   ![image showing that changes in the main-staging has been merged and is now reflected in the main branch](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-showing-main-branch-updated-w-changes-in-main-staging.png)
2. Frequent Rebase: I regularly rebased `main-staging` with Main to keep all the changes up to date and aligned with the live site's features and design. <br>
_Note: Based on my understanding, `rebase` is just a fancy word for merging back, to ensure that the code versions in both branches are in sync_


## **Managing the Remote Repository**

### **Keeping Track of All Changes**

Maintaining a clean, up-to-date code base across all remote repositories is essential, especially when working from multiple devices. I regularly managed my remote and local branches to ensure they matched the project’s current state.



1. Pushing Branches: After completing changes in a branch, I push them to the remote repository. All branches (`main`, `main-staging` and `<feature-branches>`) are pushed!
   - Once pushed, the different versions of the code are available in our remote github repo, and we can edit them from anywhere!
   ![image showing github repository containing all branches, hence we can edit these from anywhere](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-showing-github-repo-containing-all-branches.png)
2. Merging and Deleting Branches: Once code changes were successfully tested in the main-staging branch, I merged them into Main and deleted the feature branch, subsequently removing any deleted branches from the remote repository with a single command
   - This command pushes all my branches into my remote repo:<br> `git push --all`
   - This command deletes branches in my remote repo:<br> `git push <remote_name> --delete <branch_name>`
   - This command deletes local tracking branches if associated branch in remote is already deleted:<br> `git fetch --prune`
   - If you want to prune specific branches, you can use the following:<br> `git fetch --prune <remote_name>`
3. Once `main` is pushed into your remote repository that is hosting your github pages. You can check and verify that your changes are applied.
![image showing that the production site already has the changes applied](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-5-my-git-branching-strategy/image-showing-production-site-having-changes-applied.png)


## **A Common Mistake with Deletion and Branching**


### **Deleting Images During Branch Cleanup**


In my eagerness to streamline the `main` branch, I made a notable mistake with the `Tech for the Layman` article. While removing the in-progress article from the Main branch, I also deleted related images, intending to track them separately in the `tech-for-the-layman` branch. 

{: .note }
This refers to the step mentioned earlier in [Step #2](#the-tech-for-the-layman-branch), where we initially branched out and subsequently deleted all the files related to the `Tech for the Layman` article.

However, since these images were not considered "changed" from the base commit in the `tech-for-the-layman` branch, they did not merge back into `main` upon completion. This oversight in understanding Git's handling of unmodified files across branches led to a lack of visual content in the final article presentation. This example underscores the importance of a thorough review and understanding of Git's file tracking mechanisms, especially when managing multimedia content in development projects.


### **Understanding Git's Base Commit Tracking**

Git's approach to tracking changes is fundamentally rooted in its ability to monitor differences from a base commit, where a commit represents a specific snapshot of your project's files. When you branch off from `main`, Git effectively takes a snapshot of all files at that point, considering it as the base commit for the new branch. 

{: .warning }
Any changes you make are tracked against this snapshot. If a file is not modified in the new branch, Git sees no difference from the base commit and thus, no "change" to track or merge back into `main`. 

This explains why the deletion of images in the `main` branch, while not re-adding or modifying them in the `tech-for-the-layman` branch, resulted in their absence post-merge. Understanding this mechanism is crucial for managing files across branches, especially when dealing with non-text files that may not show visible changes in the way that code does.

### **Resolution**

We had to manually re-add the image files one-by-one into the `main` and `main-staging` branch. Once this is added, we re-verified that the fix works, by testing it in the `main-staging` branch. Once we confirmed, functionality, we removed only the markdown file.

{: .note }
It's fine to remove the markdown file because we will be performing edits in the markdown file. Hence, git will track the files as there are additional changes when compared to the base commit in the `tech-for-the-layman` branch. That way, the markdown files will be merged into `main-staging` when we execute the merge command in the future.

## **Taking the Next Steps**


### **Eliciting Feedback and Continuous Improvement**

I understand that my project is relatively simple, and the branching strategy I've described may not be suited for all scenarios, especially those complex enterprise level applications. But one thing's for sure, getting your hands dirty and fiddling around with Git better allows me to understand the difficulties that the dev or DevOps team may face.

With regards to the branching strategy, would love to learn how others track their code base -- so do reach out and feedback on alternative ways on how we can do this. 

Thank you for joining me on this exploration of my Git branching strategy. It's a critical aspect of my personal and professional development process, and I hope it serves as a springboard for your own branching efforts. By understanding and customizing Git's extensive branching and merging capabilities to your project’s unique needs, you can significantly enhance collaboration, version control, and project management. 

Enough for now then, and thanks alot for those who made it this far!


Peace and love <br>
Shafik Walakaka