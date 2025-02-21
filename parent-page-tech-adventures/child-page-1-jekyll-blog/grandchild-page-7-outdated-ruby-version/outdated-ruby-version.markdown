---
layout: page
title: Outdated Ruby Version
permalink: /tech-adventures/jekyll-blog/outdated-ruby-version
parent: Jekyll Blog
grand_parent: Tech Adventures
nav_order: 7
index: 'yes'
follow: 'yes'
description: Stumbled across a build failure due to an outdated ruby version. These are the steps to resolve it
# image: ../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-6-missing-blog-post/missing-blog-post.png
---

# Outdated Ruby Version

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

## Hello, I'm Back!
Hey Fellas!

Back from a hiatus and immediately stumbled across a build failure when trying to push a new blog post. With the new AI hype, it shouldn've been a breeze to fix (and it was -- just not using AI).

I'll step you through my 30 minutes of trying to fix the issue, and it comprises of 
- 5 minutes of figuring out where was the breakage
- 20 minutes of back and forth with chatGPT, trying to understand what the issue is
- 5 minutes of Googling and realising that this was a solved issue (faced by many others that are using Github pages)

## First 5 Minutes -- Identifying the Breakage

First, for no good reason -- I've tracked the changes in a separate branch `shafik/sexiest-dog-singapore`. Once ready:
1. Merged the "feature branch" into the main branch `main`
2. And then push the changes into my remote

![Merging my feature branch into main branch and pushing the changes into the remote repo](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-7-outdated-ruby-version/merge-sexy-article-push-into-repo.png)

This automatically, pushes the changes into my remote repository which triggers the GitHub pages pipeline bla bla bla... I should be able to see my site updated within 5 minutes (but it didn't because there was a build failure). See the screenshot below for reference:

![Build failure due to outdated ruby version](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-7-outdated-ruby-version/image-build-failure.png)

Now I know the reason why my site was not updated -- a build failure. I need to find out
1. Why the build failed
2. What should I fix so that the build works (with hopefully no further downstream issues)

That was when I turned to my pal ChatGPT

## Investigating the Root Cause -- heart to heart w Chat GPT

Since I don't have much technical knowledge on these stuff, I just copied the error message and see what ChatGPT has to say:

``` bash
Run ruby/setup-ruby@8575951200e472d5f2d95c625da0c7bec8217c42
Error: The current runner (ubuntu-24.04-x64) was detected as self-hosted because the platform does not match a GitHub-hosted runner image (or that image is deprecated and no longer supported).
In such a case, you should install Ruby in the $RUNNER_TOOL_CACHE yourself, for example using https://github.com/rbenv/ruby-build
You can take inspiration from this workflow for more details: https://github.com/ruby/ruby-builder/blob/master/.github/workflows/build.yml
$ ruby-build 3.1.4 /opt/hostedtoolcache/Ruby/3.1.4/x64
Once that completes successfully, mark it as complete with:
$ touch /opt/hostedtoolcache/Ruby/3.1.4/x64.complete
It is your responsibility to ensure installing Ruby like that is not done in parallel.
```

And this is what ChatGPT advised:
- Deprecated image being used, so we need to change the runner beig used
![ChatGPT asking me to use a different runner](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-7-outdated-ruby-version/image-use-different-runner.png)
- Installing Ruby manually (use Ruby Build 3.1.4. instead -- as per advised in the error message)
![ChatGPT advising that we install Ruby Manually](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-7-outdated-ruby-version/image-manually-install-ruby.png)
- Ensuring Cache is managed properly (if we use caching in the build process)
![ChatGPT advising for us to verify that caching is managed properly](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-7-outdated-ruby-version/image-manage-caching-for-build-process.png)

You can see the [full conversation here!](https://chatgpt.com/share/67b863e4-a5cc-800c-93b7-4652fb412bd4)

Although these coversation gave my a deeper understanding that the issue either lies in the incompatibility between the ruby version and the image used as the runner. It's not actually clear how to fix it -- and the solutions provided seems a little vague and complex (with no definitive solution).

## Good old Google and Forum -- Solved Issues

So I turned to the good old forum, by googling how to fix the issue. And I literally searched this:
`github pages runner issue to build ruby`

![Google search for resolution to the GitHub build issue](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-7-outdated-ruby-version/image-google-search-github-issue.png)

And the answer was literally in the first SERP result. Don't believe it, [check it out here](https://talk.jekyllrb.com/t/building-error-on-github-actions/9471/2) yourself!

![Results from the first position link in SERP when searching for the build error](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-7-outdated-ruby-version/image-first-result-serp.png)

For the exact version to use (including the script), [check out the thread here!](https://github.com/ruby/setup-ruby/issues/595)

![Github issue thread with the exact script to fix the ruby version](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-7-outdated-ruby-version/image-exact-script-new-version-ruby.png)

## Apply the solution - watch your site go-live

So, based on our findings, we simply applied the [changes to our YAML script here](https://github.com/walakaka77/test-doc-site/blob/main/.github/workflows/jekyll.yml). See the snippet from our YAML below:

``` bash
jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Ruby
        uses: ruby/setup-ruby@086ffb1a2090c870a3f881cc91ea83aa4243d408 # v1.195.0, updated based on https://github.com/ruby/setup-ruby/issues/595#issuecomment-2395466628
        # uses: ruby/setup-ruby@8575951200e472d5f2d95c625da0c7bec8217c42 # v1.161.0
        with:
          ruby-version: '3.1' # Not needed with a .ruby-version file
          bundler-cache: true # runs 'bundle install' and caches installed gems automatically
          cache-version: 0 # Increment this number if you need to re-download cached gems

```

And wala, this fixes the build issue -- and deployment is now successful! Success screenshot below for reference:

![Deployment in GitHub pages pipeline successful](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-7-outdated-ruby-version/image-successful-deployment.png)


## Personal conclusion

Even though AI and stuff is revolutionary (no doubt), it's still not a one-stop-solution for everything. For example, in this case -- ChatCPT would not have been able to give me the exact ruby version and command (or maybe I just don't know how to prompt it yet).

But ofcourse, she's gonna get better -- this is just the start. So let's see where this new direction takes us -- but as of today, I still need to use my brains to resolve the problems that are throwned to me to manage this personal blog.

Peace, and love <br>
Shafik Walakaka