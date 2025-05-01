---
layout: page
title: Elusive Mixed Content Issue
permalink: /tech-adventures/wordpress/elusive-mixed-content
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 9
index: 'yes'
follow: 'yes'
description: Elusive mixed content, causing formatting errors in footer
image: ../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/heic-image-incompatible-browser.png
---

# Elusive Mixed Content Issue

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

This is another elusive bug -- but low priority. Basically, PLESK WP Toolkit has a feature to allow us to clone our sites. This allows for us to easily create staging or troubleshooting sites.

However, when we clone the site, the formatting of our footer was incorrect. Completely mind boggling considering that we are using the same codebase and same database.

So we decided to do a deep dive into what actually happened here!

## Image Carousel -- Incorrect Image for cloned sites

As mentioned in the previous section, the image in the cloned site is incorrect. The correct image should be displayed like this:
![correct carousel image](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/correct-image.png)

But for the cloned site, the image appears too large and the formatting runs:
![image was too large](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/incorrect image.png)

## First Assessment -- Suspected Cloudflare cache issue

We reached out to the support team to check -- and their initial thought was a Cloudflare caching issue. What they've done was:
1. Verified that the image carousel in the `staging.petcoach.sg` site was indeed different from `petcoach.sg` -- Yes it was
2. Modified their hostfile, to point traffic directly to the server (without this modification, our traffic is fronted by CloudFlare)
3. When they modified their hostfile, and reached the server directly
![accessing server directly](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/access-server-directly.png)
  - Traffic was on http (we really should change this zzz, been putting it off), because our server does not have SSL configured. SSL only configured on CloudFlare
  - And the images were loaded correctly -- What!??
4. Based on the above, it's understandable that the assumption is with CloudFlare. Probably some caching issue

### Verify the hypotheses -- incorrect

So we verified the hypotheses:
1. We purged cloudflare cache, but the image was still loaded incorrectly
![purged cloudflare but image still large](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/purge-cloudflare-image-large.png)

{: .note}
The steps of debugging is iterative -- you check for clues, and come up with a hypotheses. You test the hypotheses, and repeat if its not fixed. That is why debugging can sometimes take so long


In our case, cloudflare cache did not seem to be the issue. We verified this by purging the cloudflare cache, but the issue still persists.

So now, we need to perform more tests

## My Suspicion -- PLESK Cloning Feature was causing issues

Since this was my suspicion, 
1. I exported the codebase and database for the following:
  - Production (petcoach.sg)
  - Staging (staging.petcoach.sg)
2. Restored the exact site into a separate wordpress installation
3. For each copied site, I checked for the following and see whether the footer format breaks:
  - Route via CloudFlare
  - Route directly to Server (either by modifying hostfile, or configuring CloudFlare to `DNS Only`)

The findings are as follows:
1. Hitting the staging.petcoach.sg site directly, by modifying hostfile --> layout issue is fixed
2. Hitting the staging.petcoach.sg site with CloudFlare configured to DNS Only (bypass cloudflare) --> layout is fixed
3. Hitting the staging.petcoach.sg site via CloudFlare --> layout issue persist
  - Purged cache on cloudflare --> layout issue persist
  - Turned on dev mode on cloudflare --> layout issue persist
  - Purge litespeed cache and regenerate all css files --> layout issue persists
4. We have a separate site dev.petcoach.sg that is restored from petcoach.sg. This is hosted in our own servers -- the layout does not break even when proxied via cloudflare

### Validates Assumption
This validates the assumption -- only the sites that were generated using the PLESK WP Toolkit Cloning feature had issues.

{: .note}
Spoiler this is a step in the correct direction, but we still do not know the root cause of the issue. If indeed PLESK WP Toolkit Cloning feature was causing the issue, we'll need to understand what is the change -- code change, DB change, or config change? Because ideally -- when you clone something, it should be identical.

## Next Layer troubleshooting
Upon receiving this information, the support team further checked the differences loaded -- and realised that there is a ton of mixed content issues for sites that were cloned:
![mixed content issue](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/mixed-content-issue.png)

Based on this, we were advised to configure SSL on our servers. This should fix the mixed content issue.

{: .note}
This was where my spider sense starts tingling -- hang on, my production site also does not have SSL on our servers. So why is only staging site facing this issue? Will installing the SSL really resolve the issue -- if it's not the root cause?

So, I decided to perform further testing, and share the information with the support team for their further troubleshooting

### Deeper Assessment and Testing

During my checks and comparison, I realised that when the site is serving the correct images, it's serving images from this location:
`/wp-content/uploads/elementor/thumbs/<filename>`

{: .note}
>Based on checks, I understand this to be an elementor generated file -- that will be used for their image carousel widget
>
> For example, file in prod was here `https://petcoach.sg/wp-content/uploads/elementor/thumbs/CPCFT_final_logo-qsc6cuy111eaepqpq4a75deblfywrtjp288rlz3oiw.png`

However, when the wrong format (image that is too large) is displayed, it's serving images from a separate location:
`/wp-content/uploads/2024/08/`

{: .note}
>Based on checks, I understand this to be the original file that we uploaded into wordpresss -- not elementor generated
>
> For example, file in staging was here `https://staging.petcoach.sg/wp-content/uploads/2024/08/CPCFT_final_logo.png`
> ![staging image](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/image-staging-image.png)


### Highlight the findings 

I highlighted the findings to the support team so that they have more context on where to look:
1. Files served correctly for production site (including the ones we restored in a separate wordpress installation)
2. Files served incorrectly for the staging site (including the ones we restored in a separate wordpress isntallation)
![Inform support team of findings](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/inform-support-team.png)
![backed up and restored cloned site to test](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/backup-restore.png)


## Final Assessment and Verification
After several back and forth, the support team realised that the site URL was set to http instead of https in the staging sites:
![site url set to http](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/http-site-url.png)

When the site url was set to http, a mixed content error occurs when trying to request certain assets using https.
When these mixed content error occurs, it seems that the elementor code has a fallback that serves the original image, insted of the elementor thumbnail image that was generated.

{: .note}
This explains the issue clearly, and we can replicate and fix this by updating the site url to https. But it still does not explain why the staging site was configured to http, when it was cloned from Prod which had https config

### Verification of this assessment

To verify, this the support team updated all configuration that has http into https. This was done using this commands:
```bash
# user=petcoach

# sudo -u $user curl -o wp-cli https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar

# php=/opt/plesk/php/7.4/bin/php

# alias wp='sudo -u $user $php wp-cli'

# wp search-replace 'http://staging.petcoach.sg' 'https://staging.petcoach.sg' --all-tables --precise --verbose
```

Once the commands has been executed, we access it using https (via cloudflare), and the images are loaded correcty:
![site shown correctly when loading over https](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/site-showned-correctly.png)

### How Does PLESK Clone

When PLESK clones, it actually checks the DNS records for the domain to assess whether it's http or https. I assume this happens when PLESK creates a "site" to manage.

If the DNS record does not have SSL configured, or the record does not exist -- PLESK will clone the site using the http configuration.

Since our staging site was created when `staging.petcoach.sg` record did not exist, PLESK stored `staging.petcoach.sg` site as http configuration. Everytime we clone the site into the `staging.petcoach.sg` domain, PLESK infers that we want to use a http configuration and specified the URL as http accordingly.

Confirmation from the support team on this flow was also obtained:
![confirmation of plesk cloning functionality](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/plesk-clone-functionality.png)


### Verification of how PLESK clones

Since I was curious, I tested this out:
1. Create a DNS record for `test2.petcoach.sg` in cloudflare
![create test2.petcoch.sg](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/test2-petcoach-site.png)
2. Clone the main site in PLESK -- `petcoach.sg` into `test2.petcoach.sg`
  - Access the PLESK site management dashboard, and click clone
  ![PLESK site click clone](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/plesk-site-clone.png)
  - Create the site for the new subdomain -- test2.petcoach.sg (in PLESK)
  ![create test2.petcoach.sg in plesk](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/test2-in-plesk.png)
3. Now we access the cloned site over https -- it looks good:
![access test2.petcoach.sg over https](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/test2-petcoach-httrps.png)
5. Double check the site URL created in the cloned DB -- it's https as well
![db site url are https](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-9-elusive-mixed-content/db-site-url-https.png)

### Complexity of Debugging
This part will close the loop once and for all, and will really highlight the complexity of debugging -- due to multiple moving parts. Just in this simple bug alone we have the following:
- How browsers handle mixed content errors
- How elementor handles fallback when thumbnail images cannot be served
- How Plesk WP Toolkit clones a site
- How Traffic is proxied via CloudFlare vs Directly to the servers

So hectic, and this is a simple site with minimal layers:
- Server and wordpress installation
- CloudFlare
- PLESK Management Tool

## Thanks

That's all folks -- hope I was able to share a little bit about how PLESK works.
And save you guys the pain that I went through!

Cheers
Shafik