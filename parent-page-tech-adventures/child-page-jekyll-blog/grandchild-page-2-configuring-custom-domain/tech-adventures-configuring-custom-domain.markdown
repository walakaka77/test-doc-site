---
layout: page
title: Configure Domain
permalink: /tech-adventures/jekyll-blog/configure-custom-domain
parent: Jekyll Blog
grand_parent: Tech Adventures
nav_order: 2
index: 'yes'
follow: 'yes'
---

# Configure Custom Domain

In this section, we plan to just show you how we configured the custom domain in GitHub Pages, so that you can replicate the same.

## Pre-requisites

To go through this section, you would need to already have:
1. Have GitHub pages site up and running. If not, you can refer to [creating a Jekyll Blog](/tech-adventures/github-and-git)
2. Procured a custom domain from a registrat such as GoDaddy or Hostinger. 

## Update your domain to point to GitHub Nameservers

1. If you have a domain name already, please access your registar's console. For me -- it's GoDaddy. 
2. In the Console, look for a section specifying DNS Management and update your A records based on GitHub IP address
![Image showing my A records pointing to the GitHub pages IP addresses](../../img/tech-adventure-img/tech-adventures-github-pages-IP-address-config.png)
  - Here, update your A records to point to the list of IP addresses provided by GitHub
  - Always refer to GitHub latest docs in case there are any changes. You find details here on [configuring apex domain for GitHub pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)
  - At the time of writing, the IP addresses provided by GitHub are as follows
  ```bash
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

3. Verify that your domain are now pointing to the GitHub nameservers IP adress by running `nslookup <your-domain-name>`
  - For my domain `shafikwalakaka.com`, results were as follows:
  ![Image showing the verification of my shafikwalakaka.com nameserver using nslookup](../../img/tech-adventure-img/tech-adventures-github-nameserver-verification-nslookup.png)


  Once the verification is complete, we can proceed to update the GitHub pages settings for our domain in our GitHub Repository Settings.

## Update GitHub Pages Repository Settings

1. Login to GitHub and access your repository that hosted your Jekyll page
2. Access the Settings of your repository
3. Access the `pages` tab
4. Update the `custom domain` with your main domain that was purchased for your registrar. For mine -- it's `shafikwalakaka.com` 

![Image showing the steps to configure the GitHub pages settings for setting custom Domain](../../img/tech-adventure-img/tech-adventures-configure-github-pages-settings-custom-domain.png)


## Thank you!

Note -- if you want to configure subdomains, such as `blog.shafikwalakaka.com`, there's a different config in your DNS management to be done.
Will update to reflect the steps to do this later

Else, that's all folks, it's done!


Peace, Love<br>
Shafik Walakaka

