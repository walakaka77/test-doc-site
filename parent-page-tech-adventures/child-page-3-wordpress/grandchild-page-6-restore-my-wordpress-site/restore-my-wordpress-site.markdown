---
layout: page
title: Restore my wordpress site
permalink: /tech-adventures/wordpress/restore-my-wordpress-site
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 6
index: 'yes'
follow: 'yes'
description: How i restored my wordpress website
image: ../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/heic-image-incompatible-browser.png
---

# Restoring my wordpress website

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

Previously, we discussed regarding setting up and configuring our own wordpress server. Once that is done, we will either want to:
1. Start building our wordpress site from scratch or
2. Restore our website from an existing backup.

Since we had a production site prior to the downtime, we'd want to restore our back up, and I'll step down the steps that I took -- step-by-step!

{: .note}
This actually simply highlights the importance of taking periodic backups. Imaging if we didn't have a backup of our production site, then we'd need to rebuild our site from scratch -- what a nightmare (or we'd be dependent on our hosting provider to get our site back up -- which in our case took 3-4 calendar days >< -- can't afford that much downtime given what's at stake!)

So checkout our steps below!

## Configuring our DNS

Since our original hosting was down, we'll need to configure our DNS to point to the remote server that we spun up. For this article, I'll use `demo.petcoach.sg`.

Since our DNS is managed using Cloudflare, we added/updated our DNS records to have `demo.petcoach.sg` point towards our server IP: `172.105.118.241`. See the screenshot below for reference:
![DNS in Cloudflare updated to point demo.petcoach.sg to 172.105.118.241](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/point-domain-to-server-ip.png)

## Configure Server for Domain

Next, we need to explicitly configure our server to receive traffic for the `demo.petcoach.sg` domain:
1. Create a config file using this command `sudo vim /etc/apache2/sites-available/demo.petcoach.sg.conf`
  - In the config file, I set the server to listen on the hostname `demo.petcoach.sg`
  ![setting server config to listen to demo.petcoach.sg](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/configure-server-to-listen-for-traffic.png)
  - You can find the snippet of our configuration below for reference

```
<Directory /var/www/demo.petcoach.sg>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>

<VirtualHost *:80>
    ServerName demo.petcoach.sg
    ServerAlias www.demo.petcoach.sg
    DocumentRoot /var/www/demo.petcoach.sg/html
    ErrorLog /var/log/apache2/demo.petcoach.sg_error.log
    CustomLog /var/log/apache2/demo.petcoach.sg_access.log combined
    
    <Files xmlrpc.php>
        Order allow,deny
        Deny from all
    </Files>
</VirtualHost>
```
This config, will have to later be activated -- we go through this in the next section.

## Create a directory and activate the config

1. After the config is set, we also need to create the directory for `demo.petcoach.sg`
  - This is where all our wordpress files will be hosted
  - Create the directory using this command `sudo mkdir -p /var/www/demo.petcoach.sg/html`
  - Subsequently, give wordpress access to those directories `sudo chown -R www-data:www-data /var/www/demo.petcoach.sg`


2. Once the directory is set, we need to activate the configuration
  - Activate the configuration using this command: `sudo a2ensite demo.petcoach.sg.conf`
  - Restart apache so that the configuration is loaded: `sudo systemctl reload apache2`
  - Once restarted, verify that the config is loaded by inspecting the configuration: `apache2ctl -S`
  - You can see the our `demo.petcoach.sg` configuration is active
  ![active configuration for demo.petcoach.sg](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/active-configuration-loaded.png)
3. Since we have set the configuration, next we want to sanity check that traffic to `demo.petcoach.sg` is indeed reaching our server
  - Hitting `demo.petcoach.sg` reaches this site:
  ![Testing access to demo.petcoach.sg](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/test-access-to-server.png)
  - We can verify that this is indeed our site, by checking the access logs. See screenshot below to see our traffic logged in the access logs:
  ![Access logs receiving traffic from our browser](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/acess-logs-showing-traffic.png)


Since traffic is already reaching our site, and the site is serving the wordpress website correctly. The next step is to load our wordpress files and database into the wordpress server!

## Restoring Wordpress Files and DB

1. We transfer the backup files from our local machine into our remote server via SFTP
![SFTP transfer our files into wordpress server](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/trasnfer-files-local-to-remote.png)
2. Once done, we can list the directory to check that the files are transferred:
![List the directory to confirm files are transferred](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/list-directory-to-validate-transfer.png)
3. Since our config has the wordpress files located at `var/www/demo/petcoach.sg/html`, update the directory name from **files** to **html**
![Update directory name from files to html](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/image-update-directory-files-2-html.png)
4. Now that files are loaded, it's time to create our database. We name our DB `demodatabase`
![Create demodatabase](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/create-demodatabase.png)
5. Now restore our SQL dump (of our prod DB), into this `demodatabase`
![restore sql dump into demodatabase](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/restore-sql-dump-into-demodb.png)

Now the files and database has been restored. It's time to make some minor configurations, adjustments, and then we can check access to our restored site :)!

## Configure your wordpress site

1. Configure your `siteurl` and `home` in wordpress options table to point to your revised domain. Ensure to include the relevant protocol here, for us -- it's `http://demo.petcoach.sg`
  - Original
  ![change siteurl and home setting in wordpress](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/change-siteurl-home-setting.png)
  - Revised
  ![revised siteurl and home setting in wordpress](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/revised-siteurl-home-setting.png)
2. We also need to update our database user, name and password (because these details are different in our production site -- and the wp-config.php, was copied from our production site)
![update db user, db name and password](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/update-db-user-name-password.png)
  - If you don't update, you cannot access the site after restoring your files, DB
  ![fail to establish db connection](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/fail-to-establish-db-connection.png)
  - Once you updated, you can access your site
  ![Successfully accessed the site](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/successfully-accessed-the-site.png)


### Tell Wordpress that it's already https

Since my demo site is fronted by Cloudflare, and it's just a demo site  -- and I'm not actually using production data
- My demo origin server is listening on http, port 80
- Cloudflare is serving no https, port 443, and terminating the SSL there. Cloudflare then reaches to my origin on port 80
- So to the users, they are being served from port 80, with no issues

But this causes, several errors:
![CORS error](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/cors-error.png)

To fix this, we need to tell wordpress that it's already https, and we do this by including a header when cloudfront is initiating the traffic to wordpress. We add the following into our `wp-config.php` file:
```php
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}
```
![configure http-x-forwarded-proto](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/configure-header-forward-https.png)

Once we have set the config, access the site again and wala -- all errors are gone:
![Accessed site with no error](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-6-restore-my-wordpress-site/access-site-w-no-error.png)

## Conclusion

And that's all folks -- now we can access our "production" site that was restored with no errors. And it's on a site fully hosted and spun up by ourselves.

How cool is that!!