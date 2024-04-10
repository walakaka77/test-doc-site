---
layout: page
title: Configure Custom Domain for GitHub Pages
permalink: /tech-adventures/jekyll-blog/configure-custom-domain
parent: Jekyll Blog
grand_parent: Tech Adventures
nav_order: 2
index: 'yes'
follow: 'yes'
description: This article provides a step-by-step instruction with screenshots on how to configure your custom domain on your website (GitHub Pages, Jekyll SSG)
image: ../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-2-configuring-custom-domain/image-jekyll-blog-configure custom domain.png
---

# Configure Custom Domain | GitHub Pages

In this section, we plan to just show you how we configured the custom domain in GitHub Pages, so that you can replicate the same.

## Pre-requisites

To go through this section, you would need to already have:
1. Have GitHub pages site up and running. If not, you can refer to the article on how to [create a free professional website](/tech-adventures/jekyll-blog/create-a-free-professional-website)
2. Procured a custom domain from a registrar such as GoDaddy or Hostinger. 

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

## Configuring a subdomain
As previously mentioned, if you want to configure subdomains, such as `blog.shafikwalakaka.com`, there's a different config in your DNS management to be done. Once the configuration in your Domain Registrar is completed, the settings in GitHub pages are the same!

### Domain Registrar

Let's go to our domain registrar, GoDaddy and checkout the sub domain `blog` that has been configured for the main domain `shafikwalakaka.com`.
![Image showing the subdomain blog configured for the main domain shafikwalakaka.com in godaddy](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-2-configuring-custom-domain/image-showing-subdomain-blog-configured-for-shafikwalakaka-main-domina.png)
1. We have created a [CName record](https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/) 
2. The CName record has the subdomain value that we desire, in our case -- it's `blog`
3. The CName record is pointing to your `<github-username>.github.io`, unlike the configuration for your main domain. This is specified in [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain) (and since you're reading this blog, it's proven to work lol)

### GitHub Configuration
The GitHub Configuration is identical to what we had done earlier. Ensure that the fully qualified domain name is specified in the custom domain field, and you're all set. For us, we've set it to `blog.shafikwalakaka.com`!

![image showing the github pages configuration for setting the custom domain for subdomain](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-2-configuring-custom-domain/image-github-pages-config-for-setting-custom-domain-for-subdomain.png) 

## Thank you!

Thanks again for taking your time to engage and read this article. If anyone's got any other shortcuts, please feel free to holla.

Else, we look forward to you having your own website with your own domain soon :D!


Peace, Love<br>
Shafik Walakaka

