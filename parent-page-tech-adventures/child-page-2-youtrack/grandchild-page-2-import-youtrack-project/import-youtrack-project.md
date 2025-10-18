---
layout: page
title: Import Youtrack Project
permalink: /tech-adventures/import-youtrack-project
parent: Youtrack
grand_parent: Tech Adventures
#has_children: true 
nav_order: 2
index: 'yes'
follow: 'yes'
description: This section shows the steps that was taken to successfully import youtrack projects into my local youtrack setup!
image: ../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-youtrack-import-youtrack-project.png
---



# Youtrack

Youtrack is a project management tool -- for a brief detail of what it does, you can check out [this article](/tech-adventures/run-youtrack-locally).

So I've recently managed to replicate youtrack locally on my machine. Now I can make and test changes without breaking the production environment configuration.

The problem is that I now have to sync all the configurations from the production environment into Youtrack -- and that's a massive pain.

Fortunately, Youtrack has a functionality that allows for you to import projects settings, configurations and even issues.
So we'll just note it down here for my future reference, and for anyone that is planning to do this too.


## Pre-requisites

Before we go into the details, there are a few pre-requisites:
1. Your Local Machine must have network access to your production youtrack instance
   - For me, my production youtrack instance is behind our organization VPN server
   ![image showing that we cannot access my production youtrack server without VPN](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-showing-unable-to-access-youtrack-without-vpn.png)
   - To verify connectivity, you just simply ensure that you can access the production environment via the browser. See an image with my VPN switched on:
   ![image showing the ability to access youtrack with the VPN switched on](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-showing-able-to-access-youtrack-w-vpn-swithced-on.png)

2. If your Production environment is using SSL, you need to download the SSL certificate and configure it in your local youtrack instance
   - Access your production youtrack server via the browser and open the settings in the browser and click into `Connection is secure` tab:
   ![image showing browser settings showing that connection is secure](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-browser-settings-prior-to-connection-is-secure.png)
   - Click into `Certificate is Valid` option:
   ![image showing the option to click into the "certificate is valid" option](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-browser-settings-after-click-connection-is-secure-prior-certificate-is-valid.png)
   - Export the certificate
   ![image showing the step to export and download the public certificate](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-showing-export-certificate-option.png)
   - Note down the location where certificate is exported to, we will need to configure this in our Local Youtrack instance
   ![image of exported certificate in my downloads folder](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-showing-the-location-where-certificate-exported-to.png)


## Steps to Import Project
Once you've got the above sorted, the steps to import a project is actually very user friendly - assuming you have all the relevant permissions required.

1. Create a permanent token in your production youtrack user account, you can [refer to the following docs](https://www.jetbrains.com/help/youtrack/server/import-from-youtrack.html#new-permanent-token). This will be used by your local Youtrack instance to authenticate against the Production Youtrack instance
![image showing how to generate access token](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-showing-how-to-generate-access-token.png)
2. Next, you need to configure you production env public certificate in your local youtrack instance
![iamge showing steps to configure SSL certificate in local youtrack instance to access prod youtrack instance](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-steps-to-import-SSL-cert-2.png)
   1. Open the settings panel, and access `Server Settings`. This opens a sub-menu.
   2. In the sub-menu, we click into `SSL Certificates`. This brings you to the SSL Certificate page
   3. In the SSL certificate page, we click into `Import trusted certificate...`. This opens the `Import Trusted Certificate` modal
   4. In the `Import Trusted Certificate` modal, we enter the name of the certificate import for reference
   5. In the `Import Trusted Certificate` modal, we click into `choose file`. This opens a file explorer
   6. In the file explorer, we navigate to the location where we stored the downloaded certificate from [our youtrack production server](/tech-adventures/import-youtrack-project#pre-requisites). This will bring you back to the `Import Trusted Certificate` modal view -- and you can see the selected file
   7. Once confirmed, hit `Import`. The selected certificate file will be imported and configured in your Local Youtrack instance
3. Next, you can configure and [import from Youtrack](https://www.jetbrains.com/help/youtrack/server/import-from-youtrack.html#setup-procedure)
   1. Access the settings -> integrations -> imports. This will iopen the imports page
   ![image showing how to navigate to the project imports page](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-showing-how-to-navigate-to-project-import-page-2.png)
   2. In the imports page, hit the `New Import` button. This will open a selection of tools to import from
   ![image showing selection of tools to import from](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-showing-selection-of-tools-to-import-fron.png)
   3. Select `Youtrack` as we are importing from our production youtrack import selection, and enter the production access credentials that was created earlier
   ![image-showing-configuring-of-production-creds](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-import-selection-modal-production-youtrack-creds.png)
   4. On hit of `Import`, you can monitor the progress of your import
   ![image showing the tracking of import](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-2-import-youtrack-project/image-dashboard-of-import-progress.png)


## Thank You!

And that's all folks -- pretty neat and straightforward. Ofcourse there'd be bumps and troubleshooting required depending how youtrack is setup in your context (for both local, prod env). But the concepts should be similar.

Hope this serves us well, good notes for myself too :D!

Peace and Love <br>
Shafik Walakaka