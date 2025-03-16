---
layout: page
title: GitLab Pages -- Self Hosted v Cloud
permalink: /tech-adventures/security-cookies-and-more/gitlab-pages-self-hosted-vs-cloud
parent: DevOps and Shit ;)
grand_parent: Tech Adventures
nav_order: 2
index: 'yes'
follow: 'yes'
description: Introduction to GitLab pages based on my own recent experience
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/adyen-online-payments.png
---

# Self Hosted vs GitLab Cloud

Hello again! So now we are going to chat about the headache that I faced lol.

But before that, a quick clarification on the terminology.

## Cloud GitLab

This is basically the GitLab that any individual users use over the internet. You access it by going to URL `gitlab.com`. The GitLab is hosted by the GitLab company, and we only have to use their software :). All infrastructure problems are managed by them

## Self Hosted

For companies like mine, we have our own GitLab installed in our servers. The infrastructure is fully managed by us. Which means
- The domain name is ours
- The server is also ours (can be a cloud service, or on-prem)

![GitLab self hosted for TSP](../../parent-page-tech-adventures/child-page-7-devops-shit/grandchild-page-2-gitlab-pages-self-hosted-vs-cloud/image-self-hosted-gitlab-url.png)

So any server upgrades, GitLab patches etc. -- will be internally managed by our colleagues (and not the responsibility of the GitLab team).

{: .note}
Knowing the differences is key -- because for GitLab pages to be active, there are some additional administrative setup that is required to support this feature. In Cloud GitLab, this has already been setup, and we can already use it as you can see in our [GitLab Pages Intro](/tech-adventures/security-cookies-and-more/gitlab-pages-self-hosted-v-cloud). But in self-hosted GitLab, this was different!


## How did we bump into this issue

Firstly, as explained in a [previous article](/tech-adventures/security-cookies-and-more/gitlab-pages-self-hosted-v-cloud), we are trying to push a report to be hosted centrally for all our team members to view.

Ideally, this will be done as part of the automated testing pipeline playwright. The configuration also seems simple, just add the CI YAML file, and push the relevant artifacts into the `public` folder (all discussed in the [previous article](/tech-adventures/security-cookies-and-more/gitlab-pages-self-hosted-v-cloud)).

But ofcourse, things never go as planned -- so the pages never got deployed. And to fix it, I manually setup GitLab pages in my repo for both
1. My TSP GitLab account
2. My personal GitLab Cloud Account

And here are the differences:

### TSP CI File

My TSP GitLab CI file is as follows:
```bash
pages:
  stage: deploy
  script:
    - mkdir -p public
    - echo "Ready to deploy"
  artifacts:
    paths: 
      - public
  only:
    - main
  tags:
    - local

```

{: .note}
I need to specify the `local` tag because our setup requires us to specify which runner to use. Our sexy devops team has configured different runners with different specifications to run different jobs.

### My GitLab Cloud CI File

```bash

pages:
  stage: deploy
  script:
    - mkdir -p public
    # - cp -R * public/  # Or any command to move your build output to the public folder
  artifacts:
    paths:
      - public
  only:
    - main  # Adjust to your branch if needed
```

{: .note}
No `local` tag required, because GitLab Cloud has dedicated runners for users across the world by default

### No Deploy Job
Once merged into `main`, the TSP pipeline did not have a successful deploy job:
![No deploy job for TSP hosted GitLab](../../parent-page-tech-adventures/child-page-7-devops-shit/grandchild-page-2-gitlab-pages-self-hosted-vs-cloud/image-no-deploy-job.png)

As in the previous article, GitLab Cloud pipeline has the deploy job:
![GitLab Cloud pipeline has the relevant deploy jobs](../../parent-page-tech-adventures/child-page-7-devops-shit/grandchild-page-1-gitlab-pages/image-two-jobs-in-pipeline.png)


If you want to compare against the [youtube video tutorial](https://www.youtube.com/watch?v=Cs6YxW9mr6Y&t=419s), they also have the deploy job:
![Youtube tutorial specifies that you need the deploy job](../../parent-page-tech-adventures/child-page-7-devops-shit/grandchild-page-2-gitlab-pages-self-hosted-vs-cloud/image-youtube-tutorial-has-deploy-job.png)

### No GitLab Pages Button

In our self-hosted GitLab, the `GitLab Pages` button never appeared:
![No pages button in TSP GitLab](../../parent-page-tech-adventures/child-page-7-devops-shit/grandchild-page-2-gitlab-pages-self-hosted-vs-cloud/image-no-pages-button-in-tsp-gitlab.png)

As per the previous article, the pages button was clearly there in GitLab Cloud:
![Pages button available in GitLab Cloud](../../parent-page-tech-adventures/child-page-7-devops-shit/grandchild-page-1-gitlab-pages/image-gitlab-pages-button.png)

### No GitLab Pages Settings for Self Hosted GitLab

Just check the settings, and you will see that there is not `Pages` settings in my self hosted GitLab:
![No pages setting in our self hosted gitlab](../../parent-page-tech-adventures/child-page-7-devops-shit/grandchild-page-2-gitlab-pages-self-hosted-vs-cloud/image-self-hosted-gitlab-url.png)


Just compare this against the GitLab cloud -- the settings are all there:
![GitLab Cloud Pages settings available](../../parent-page-tech-adventures/child-page-7-devops-shit/grandchild-page-2-gitlab-pages-self-hosted-vs-cloud/image-gitlab-cloud-pages-settings-available.png)

## Conclusion

Self hosted GitLab will need some setup at the infrastructure level, to support the GitLab functionality feature. 

This is already pre-configured for the GitLab cloud.

So -- until our sexy DevOps colleauges completes the [administrative steps](https://docs.gitlab.com/administration/pages/source/) (which would take time to configure, test etc.). The feature is not supported for self-hosted.

Hope this helps anyone out there struggling w the same issue. And if it doesn't it helps me clarify my thoughts on the issue.

Peace and love,
Shafik Walakaka <3