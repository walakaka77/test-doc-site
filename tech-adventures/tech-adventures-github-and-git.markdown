---
layout: page
title: GitHub and Git
permalink: /tech-adventures/github-and-git
parent: Jekyll Blog
grand_parent: Tech Adventures
---

# Introduction

Here, we'll walk you through the Git and GitHub essentials required. Afterwhich, we'll conclude by having you guys host your own Jekyll Site on GitHub pages.

## Git

Before diving into GitHub, it's essential to grasp the basics of Git. Here are the fundamental commands you need to know:

1. **git init:** Initializes a new Git repository in your project directory.
2. **git clone:** Copies a repository from a remote source to your local machine.
3. **git remote:** Manages connections to remote repositories.
4. **git add:** Adds changes to the staging area, preparing them to be committed.
5. **git commit:** Records changes to the repository with a descriptive message.
6. **git status:** Shows the current status of your repository, including any changes to be committed.
7. **git pull:** Fetches changes from a remote repository and merges them into your local branch.
8. **git push:** Pushes your local commits to a remote repository.

Understanding and mastering these commands will streamline your workflow when working with Git. Don't worry, the next few sections will step down the steps so that you can follow and familiarize with the above concepts.

For those that are interested, the documentation for the full list of Git Commands can be found [Here!](https://git-scm.com/docs).

## GitHub
GitHub is a remote repository where you can push and store your code. Let's proceed with the following steps:

1. Create a GitHub Account [Here!](https://github.com/signup)
2. Create repository in GitHub

### Steps to Create Repository in GitHub

1. Login to your GitHub Account
2. Click `New` ![image of clicking new repository button in github](../../img/github-repo-creation-click-new.png)
3. Fill up the repository form ![image of specifying the repository details in github](../../img/github-repo-creation-form-details-repo.png)
    - Name your repository `<user>.github.io`. In my case it would be `walakaka77.github.io`
    - Ensure the repository type is `Public`
    - Leave the remaining fields as their default value
4. Click the `Create repository` button ![Image to specify clicking the Create Repo button](../../img/github-repo-creationg-click-create-repo.png)
5. Your remote repository would have been created here:

### Additional Good To Know
To fully be in control of the content, it'd be encourage to also understand these concepts:
1. Ruby Framework (basic understanding of Ruby Components)
2. Jekyll Server (or the concepts of servers in general)
2. CICD (basic understanding of CICD flows)
3. Custom Domain Names (basic understanding to obtain your own custom domain)
4. DNS (basic understanding to configure your domain to point to your Jekyll Site on Github Pages)