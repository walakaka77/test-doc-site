---
layout: page
title: Steps to host your Jekyll Site
permalink: /tech-adventures/jekyll-blog/steps-to-host-your-jekyll-site
parent: Jekyll Blog
grand_parent: Tech Adventures
nav_order: 1
index: 'yes'
follow: 'yes'
description: This article provides a step-by-step instruction on how you can create a website using the Jekyll Static Generator and host it on GitHub Pages completely free of charge!
image: ../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-1-steps-to-host-your-jekyll-site/image-jekyll-blog-host-your-site.png
---

# Steps to host your Jekyll Site
Here, we'll walk you through the step-by-step process that would allow you guys to host your own free professional website. We will be utilizing the Jekyll Static Site generator and hosting the site on GitHub pages completely for free!

## Git

Please download Git prior to proceeding to the next section. You can download Git [Here!](https://git-scm.com/downloads)


Before diving into GitHub, it's essential to grasp the basics of Git. Here are the fundamental commands that would be good to know:

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
5. Your remote repository would have been created here: ![Image of newly created repository](../../img/github-repo-created-repository.png)


## Clone the Jekyll Minima Template

Now that we have Git Installed, we will proceed to clone the Jekyll Minima template:
1. Proceed to the Minima Project Github repository at [this link](https://github.com/jekyll/minima)
2. Click on `Code` and copy the github project URL ![Picture showing the buttons to click to obtain the minima project url](../../img/github-repo-obtain-minima-url.png)
3. Clone the Minima Project to you PC by running the following command `git clone https://github.com/jekyll/minima.git`
4. The Minima Project will appear in the directory that you are in ![Picture showing successful cloning of the Minima Project](../../img/github-repo-successful-cloned-minima.png)
5. Access the cloned Minima Project using `cd minima`

## Push the Cloned Minima Project to your Remote Repo

1. Check the remote repository tied to the project directory by using `git remote -v`. ![Picture showing that Minima Project is still the remote for this directroy](../../img/github-repo-remote-still-Minima.png)
Notice that the Minima project directory is still tied to the project directory. 
2. Change the remote repository to our github repository that we previously created by running the following command `git remote set-url origin https://github.com/<username>/<username>.github.io` ![Image to show that my remote repo has changed](../../img/github-repo-change-remote-to-my-repo.png)
Please note to ensure you change the remote directory URL based on your github project URL obtained in step #2.
3. Now push your files into the remote repository by following the instructions specified in github in the earlier section
![Image showing successful push of local repo to my remote github repo](../../img/github-repo-pushed-local-repo-to-remote.png)
 - Run `git branch -M main`
 - Then run `git push -u origin main`

4. Refresh your github repo, and all the files on your local should be available in your remote repo:
![Image showing files successfully pushed to remote repo](../../img/github-repo-files-available-in-remote.png)


## Configure your GitHub Repo to support GitHub Pages
1. Configure GitHub Actions
![Image showing steps to configure github actions](../../img/github-repo-configure-github-actions.png)
    1. Click into `Settings`
    2. Click into `Pages`
    3. Have Source indcate as `Github Actions`
    4. Click on `Configure`
2. Do not change the defaul settings, and click `Commit Changes`
![Image to show committing changes for GitHub Actions configuration](../../img/github-repo-commit-github-actions.png)
![Second image to show the confirmation to commit changes for GitHub Actions configuration](../../img/github-repo-commit-github-actions-confirmation-modal.png)

3. Once you have completed the above configuration, GitHub will proceed to deploy your page, and you can see that your site will be hosted at this URL: `<username>.github.io`
![Image showing completed GitHub pages deployment and link to live site](../../img/github-repo-site-is-live.png)

    - For mine, it's at `https://walakaka77.github.io/` ![Image showing my site live at walakaka77.github.io](../../img/github-repo-walakaka77-site-live.png)


If you guys are keen to see the repo, can check it out [here!](https://github.com/walakaka77/walakaka77.github.io) These were based on the exact steps mentioned above ^^


## Push your changes

Now that you have successfully obtained a live site. You can fiddle around with this Jekyll tool -- make some changes, push it and see it come to live!

1. First we made some changes ![Image showing that we made some changes to the code](../../img/github-repo-made-some-changes-in-code-ss.png)

2. Next we performed the following: ![image showing us staging, committing and pushing the changes](../../img/github-repo-stage-commit-and-push-changes.png)
    - staged the changes by running `git add .`
    - commited the changes by running `git commit -m "<any-commit-message>`
    - Push the changes to the remote repository by running `git push`

3. The amazing thing is seeing your changes come to live ![image of my changes coming to live](../../img/github-repo-changes-come-tolive-local.png)

The tool is really friend, minimal html, css knowledge required. All you need to know is markdown, and this can be covered in an hour. In fact, can refer to [this article!](/tech-adventures/markdown-syntax).
I use it for reference all the time haha.

## Thank You!

That was a heavy one, and tried to give step-by-step instructionals so that anyone can set it up, and see their first free website come to live.

Hope this helps, let me know if there is any part that can be improved etc.

Peace and Love<br>
Shafik Walakaka