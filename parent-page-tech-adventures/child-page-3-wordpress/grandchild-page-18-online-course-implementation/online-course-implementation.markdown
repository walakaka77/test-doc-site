---
layout: page
title: Online Course Implementation
permalink: /tech-adventures/wordpress/online-course-implementation
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 18
index: 'yes'
follow: 'yes'
description: Woocommerce Security Optimisation
image: ../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/heic-image-incompatible-browser.png
---

# Building a Local WordPress Online Course Platform with WooCommerce & Sensei LMS

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>


In this guide, we’ll walk through setting up a full-featured online course platform locally, testing course purchases, user registration, and email workflows using Mac, Apache, MariaDB, PHP, and WordPress. By the end, you’ll have a sandbox to experiment safely before going live.

## Local WordPress Stack Setup

Requirements

- Platform: macOS (Linux can be used similarly)
- Stack: Apache, PHP, MariaDB (installed via Homebrew)
- Ports: Use 4001, 4002 to separate test sites


### Step 1: Install Core Tools

Install Apache, PHP, and MariaDB using Homebrew:

```bash
brew install httpd php mariadb
```

Then start services:
```bash
brew services start httpd
brew services start mariadb
brew services start php
```

### Step 2: Configure Apache Virtual Hosts

Apache config location: `/private/etc/apache2/httpd.conf`
Virtual hosts: `/etc/apache2/extra/httpd-vhosts.conf`

Example virtual host for WordPress on port 4002:

```bash
<VirtualHost *:4002>
    ServerName localhost
    DocumentRoot "/usr/local/var/www/petcoach-course"

    <Directory "/usr/local/var/www/petcoach-course">
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog "/var/log/apache2/petcoach-error.log"
    CustomLog "/var/log/apache2/petcoach-access.log" common
</VirtualHost>
```

Restart Apache:
```bash
sudo apachectl restart
```

### Step 3: Install WordPress

1. Download WordPress and extract to /usr/local/var/www/petcoach-course
2. Configure wp-config.php to point to your MariaDB database:

```php
define('DB_NAME', 'local_course_db');
define('DB_USER', 'root');
define('DB_PASSWORD', 'password');
define('DB_HOST', '127.0.0.1');
```

Test your site: `http://localhost:4002`
![localhost port 4002 testing](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/testing-4002-port-localhost.png)

### Step 4: PHP Configuration

Check PHP config:
```bash
php --ini
```

Increase limits for uploads and execution:
```bash
upload_max_filesize = 64M
post_max_size = 64M
max_execution_time = 300
```

Restart Apache after changes:
```bash
sudo apachectl restart
```


## Install Your Online Course Stack

### Step 1: Theme & Plugins

1. Theme: Astra
2. WooCommerce: Core + Stripe Gateway
3. LMS: Sensei LMS Pro

Install via WordPress admin:
`Plugins → Add New → Search & Install`

![adding plugin in localhost](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/localhost-add-plugin.png)

### Step 2: Configure WooCommerce + Stripe
1. WooCommerce → Settings → Currency, Tax, Shipping
2. Payments → Stripe → Test API keys
3. Enable Test Mode for local development

Screenshot for configuration in woocommerce
![woocommerce payment configuratio](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/woocommerce-config.png)

## Configuring LMS Sensei

### Step 1: Create Courses

1. WordPress → Sensei LMS → Add New Course
![course management create course](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/course-in-lmssensei.png)

2. Link the course to a WooCommerce product
![course linked to woocommerce product](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/course-sensei-linked-to-woocommerce-product.png)

{: .note}
The woocommerce product have have a price and be of type `virtual` and `downloadable` product. See LMS sensei documentation for more [details here!](https://senseilms.com/documentation/getting-started-with-woocommerce-paid-courses/)
![product type virtual and downloadable](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/product-type-virtual-downloadable.png)

### Step 2: Video Hosting Options

1. YouTube: Easy, public access
2. Vimeo: Domain-based access control (better for paid courses)


## Configure Emails (SMTP)

### Gmail SMTP Setup

1. Install WP Mail SMTP
2. Choose Gmail Mailer
3. Create Google OAuth credentials for localhost
4. Add redirect URI: https://connect.wpmailsmtp.com/google/
5. Authorize Gmail account
6. Send test email

```bash
SMTP Host: smtp.gmail.com
Port: 587
Encryption: TLS
Username: your@gmail.com
Password: <App Password>

```

Reference screenshot of my setup:
![screenshot of the setup](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/wp-smtp.png)

And ofcourse, don't forget to test tht it sends successfully!!
![test local email send out](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/test-local-email.png)

{: .note}
Normally if your hosting provider has an STMP service, then this is not required. I needed to do this because i was running my testing on local (and duhh, no SMTP service installed in my local server)

## User Configuration

### Enable user registration:

1. Settings → General → Anyone can register
![membership anyone can register](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/membership-anyone-can-register.png)
2. Ensure WooCommerce accounts link to WordPress users
![woocommerce membership account](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/woocommerce-login-account.png)
3. Add Account Page to navigation menu (Astra → Customize → Menus)
![my account page](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/my-account-page.png)

## User Registration Testing
1. User registers or logs in
![image of user registering](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/registration and login.png)
2. Purchases product linked to Sensei course
    - Prior to the purchase, user cannot access the product. See the list view
    ![list view  no access](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/list-course-no-access.png)
    - If user tries to access course details, it will prompt payment
    ![details view no access](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/details-course-no-access.png)
3. Payment made via stripe
    - See the stripe in the UI
    ![stripe in the UI](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/test-purchase-stripe.png)
    - For those who like money, you can also see the money come in stripe
    ![money come in stripe](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/money-come-in.png)
4. Access granted only after purchase
    - After payment, they can see `continue` since they now have access
    ![list view w access](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/list-course-access-granted.png)
    - Wigthin each course they can access the lessons
    ![deatils view access granted](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/access-granted-details-view.png)


{: .note}
Self-enrollment can be enabled, but WooCommerce purchase is the main access gate
Emails & notifications are handled via SMTP


## Optional Enhancements

- Course Bundles: Product can unlock multiple courses
- Product Pages: Show included courses for clarity (via shortcode or template snippet)
- Video Hosting: Vimeo preferred for access control
- Local Testing: Use ports like 4002 for multiple test sites

```bash
<?php
$product_id = get_the_ID();
$courses = Sensei()->course->get_courses_by_product_id($product_id);
if($courses){
    echo '<ul>';
    foreach($courses as $course){
        echo '<li><a href="' . get_permalink($course->ID) . '">' . $course->post_title . '</a></li>';
    }
    echo '</ul>';
}
?>

```

## Conclusion

And that really sums it up, a simple learning management platform all under your control. All the materials are under your control. Theme, colour scheme etc., under your control -- and you are free to fiddle around with it as much as you want!

Until next time, peace and love!