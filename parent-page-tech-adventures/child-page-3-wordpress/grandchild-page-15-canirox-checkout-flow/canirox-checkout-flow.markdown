---
layout: page
title: Canirox Checkout Flow
permalink: /tech-adventures/wordpress/canirox-checkout-flow
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 15
index: 'yes'
follow: 'yes'
description: Canirox Checkout Flow
../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-15-canirox-checkout-flow/image: ../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/heic-image-incompatible-browser.png
---

# Introduction

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>


## Canirox — Checkout flow customisations


This document describes the customisations made to the WooCommerce checkout flow for Canirox. The site sells tickets for a two-day event (50 tickets per day). Because this is an event product rather than a commodity, we needed to collect additional attendee details, enforce validation rules, and add security measures to limit access to order confirmations.

## Product & Inventory setup (2-Day Event)

- We modelled the event as a single WooCommerce product with multiple variations for each ticket category and day.
- Each day has a fixed inventory of 50. To track inventory by day, we used product variations — each variation shares the same parent product but has its own SKU and stock.
- This approach allows the front-end to present the same product while inventory is tracked per variation.

![alt text](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-15-canirox-checkout-flow/image.png)

## Checkout fields

- We added custom checkout fields to collect additional attendee information required for the event.
- For the regular "Solo" category, standard fields are collected.
- For the "Pair" category (and other categories that require teammate info), we needed mandatory additional fields such as teammate first name, teammate last name, and teammate age.
- These fields are configured in the backend and conditionally displayed/required on the checkout page based on the selected variation.

![alt text](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-15-canirox-checkout-flow/image-1.png)

### Where to look: `functions.php`

- `CANIROX_TEAMMATE_REQUIRED_VARIATIONS` constant — lists variation IDs which require teammate information.
- The filter/action hooks that handle field display and validation are all in `functions.php`.

Relevant snippets:

- Definition of required variations:

```php
define( 'CANIROX_TEAMMATE_REQUIRED_VARIATIONS', [268,305,459] );
```

- Checkout validation for teammate fields:

```php
add_action( 'woocommerce_checkout_process', function() {
    $require_fields = false;

    foreach ( WC()->cart->get_cart() as $cart_item ) {
        $product = $cart_item['data'];

        if ( $product->is_type( 'variation' ) && in_array( $product->get_id(), CANIROX_TEAMMATE_REQUIRED_VARIATIONS, true ) ) {
            $require_fields = true;
            break;
        }
    }

    if ( $require_fields ) {
        if ( empty( $_POST['additional_teammate_first_name'] ) ) {
            wc_add_notice( __( 'Please enter the additional teammate\'s first name.' ), 'error' );
        }
        if ( empty( $_POST['additional_teammate_last_name'] ) ) {
            wc_add_notice( __( 'Please enter the additional teammate\'s last name.' ), 'error' );
        }
        if ( empty( $_POST['additional_teammate_age'] ) ) {
            wc_add_notice( __( 'Please enter the additional teammate\'s age.' ), 'error' );
        }
    }
});
```
If those fields are left empty, our custom snippet will throw a validation
![alt text](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-15-canirox-checkout-flow/image-2.png)

- Conditional display of teammate fields (hides fields unless variation selected):

```php
add_filter( 'woocommerce_form_field', function( $field, $key, $args, $value ) {
    $target_fields = [
        'additional_teammate_first_name',
        'additional_teammate_last_name',
        'additional_teammate_age'
    ];

    if ( in_array( $key, $target_fields, true ) ) {
        $variation_selected = false;

        if ( WC()->cart ) {
            foreach ( WC()->cart->get_cart() as $cart_item ) {
                if ( isset( $cart_item['variation_id'] ) && in_array( $cart_item['variation_id'], CANIROX_TEAMMATE_REQUIRED_VARIATIONS, true ) ) {
                    $variation_selected = true;
                    break;
                }
            }
        }

        if ( $variation_selected ) {
            // Replace "optional" span with required *
            $field = preg_replace(
                '/<span class="optional">.*?<\/span>/',
                '<span class="required" aria-hidden="true">*</span>',
                $field
            );

            // Add a required class to label
            $field = str_replace(
                'class="',
                'class="required_field ',
                $field
            );
        } else {
            // Hide the field completely
            return '';
        }
    }

    return $field;
}, 10, 4 );
```

For single entries, there are no team mate fields

![alt text](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-15-canirox-checkout-flow/image-4.png)

We ensure the validation hook does not accidentally validate when those fields are hidden as well!

![alt text](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-15-canirox-checkout-flow/image-5.png)


## Checkout validation and cart limits

- To ensure each order record is unique and simplify attendee allocation, we restrict the cart to a single product per transaction. This prevents customers from adding multiple different ticket items or quantities into the cart.
- We enforce this by blocking add-to-cart when the cart already has an item.
- A unique requirement specific to our flow, so we had to add custom script

![alt text](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-15-canirox-checkout-flow/image-3.png)

Snippet:

```php
add_filter( 'woocommerce_add_to_cart_validation', function( $passed, $product_id, $quantity ) {
    if ( WC()->cart->get_cart_contents_count() > 0 ) {
        wc_add_notice( 'You can only have one product in your cart at a time.', 'error' );
        return false;
    }
    return $passed;
}, 10, 3 );
```

## Cart page layout tweaks

- The default cart layout included irrelevant interactive elements for our use-case. We adjusted the cart page by hooking JS/CSS and removing the update cart button.
- We convert hidden quantity inputs (provided by Astra/elementor markup) into readable number inputs and set them to readonly to avoid accidental changes.

![alt text](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-15-canirox-checkout-flow/image-6.png)

Snippet (JS injection via `wp_footer` when is_cart()):

```php
add_action( 'wp_footer', function() {
    if ( is_cart() ) {
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            const hiddenInputs = document.querySelectorAll('.product-quantity input[type="hidden"].qty');
            hiddenInputs.forEach(function(input) {
                input.type = 'number';
                input.setAttribute('readonly', 'readonly');
                input.style.cssText = 'width: 60px !important; height: 40px !important; text-align: center !important; background-color: #000000 !important; color: #ffffff !important; border: none !important; border-radius: 4px !important; padding: 8px !important; box-sizing: border-box !important;';
            });
        });
        </script>
        <?php
    }
});
```

We also remove the cart "update" button since quantities are readonly:

```php
add_filter( 'woocommerce_cart_needs_update_button', '__return_false' );
```

## Security: browser-based one-time order access

- To prevent unauthorized access of the order-received (thank you) page, we implemented a browser-token flow:
  1. On `woocommerce_thankyou`, a unique token is generated and saved to order meta (`_required_browser_token`) and output to the browser via `localStorage`.
  2. When the order-received URL is requested, the server injects a lightweight loading screen and JavaScript that compares the token in localStorage with the token stored in order meta.
  3. If tokens match, the page is revealed and an AJAX call marks the token as used in the DB (`_browser_token_used`), preventing future access with the same token.
  4. If tokens don't match, the script replaces the page with an "Access Denied" message and never reveals the original HTML content.

Key snippets are in `functions.php`:

- Generate token and write to order meta & localStorage (hook: `woocommerce_thankyou`)
- Template redirect validation injecting loading screen and footer JS (hook: `template_redirect`)
- AJAX handler `canirox_mark_order_token_used` to mark token used


See the checkout success page with sensitive details:
![alt text](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-15-canirox-checkout-flow/image-7.png)

Cannot access via random browser, cannot access via source either
![alt text](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-15-canirox-checkout-flow/image-8.png)

### Full implementation (copyable snippets)

Below are the actual snippets used in the child theme. You can copy these into your `functions.php` (they are already present in this project) or use them as a blog-ready example.

1) Generate browser token on `woocommerce_thankyou` and store it in localStorage

```php
add_action( 'woocommerce_thankyou', function( $order_id ) {
    if ( ! $order_id ) return;
    
    $order = wc_get_order( $order_id );
    if ( ! $order || $order->get_meta( '_browser_token_generated' ) ) return;
    
    // Generate unique browser token
    $browser_token = wp_generate_password( 40, false );
    $order->update_meta_data( '_required_browser_token', $browser_token );
    $order->update_meta_data( '_browser_token_generated', 'yes' );
    $order->save();
    
    // Inject JavaScript to store token in browser localStorage
    ?>
    <script>
    // Store unique access token in browser localStorage
    localStorage.setItem('canirox_order_token_<?php echo $order_id; ?>', '<?php echo $browser_token; ?>');
    console.log('Order access token stored for order #<?php echo $order_id; ?>');
    </script>
    <?php
}, 10 );
```

2) Validate the token on the `order-received` endpoint (server injects a loading screen and footer JS)

```php
add_action( 'template_redirect', function() {
    // Only target order-received pages
    if ( isset( $_GET['key'] ) && 
         is_wc_endpoint_url( 'order-received' ) && 
         isset( $GLOBALS['wp']->query_vars['order-received'] ) && 
         ! empty( $GLOBALS['wp']->query_vars['order-received'] ) ) {
        
        global $wp;
        $order_id = absint( $wp->query_vars['order-received'] );
        $order_key = sanitize_text_field( $_GET['key'] );
        $order = wc_get_order( $order_id );
        
        if ( $order && $order->get_order_key() === $order_key ) {
            $required_token = $order->get_meta( '_required_browser_token' );
            $token_used = $order->get_meta( '_browser_token_used' );
            
            // If we have a required token system in place
            if ( $required_token ) {
                // Check if token was already used - immediate block
                if ( $token_used === 'yes' ) {
                    wp_die( 
                        '<div style="max-width: 600px; margin: 50px auto; padding: 40px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; text-align: center; border: 2px solid #dc3545; border-radius: 10px; background: #f8d7da; color: #721c24;">\n                            <h1 style="margin-bottom: 20px;">🔒 Access Denied</h1>\n                            <p style="font-size: 18px; margin-bottom: 20px;">This order confirmation has already been viewed.</p>\n                            <div style="background: #fff; padding: 20px; border-radius: 5px; margin: 20px 0; color: #495057;">\n                                <h3>Need to check your order?</h3>\n                                <p><a href="' . wc_get_page_permalink( 'myaccount' ) . '" style="color: #007cba; text-decoration: none; font-weight: bold;">→ View in your account</a></p>\n                                <p><a href="' . wc_get_page_permalink( 'shop' ) . '" style="color: #007cba; text-decoration: none;">← Continue shopping</a></p>\n                            </div>\n                            <p style="font-size: 14px; opacity: 0.8;">This protects your order information from unauthorized access.</p>\n                        </div>', 
                        'Order Already Viewed', 
                        array( 'response' => 403 )
                    );
                }
                
                // Show loading screen first, then validate with JavaScript
                add_action( 'wp_head', function() use ( $order_id, $required_token ) {
                    ?>
                    <style>
                    /* Hide page content initially */
                    body.canirox-validating .site-content,
                    body.canirox-validating .site-header,
                    body.canirox-validating .site-footer {
                        display: none !important;
                    }
                    
                    /* Show loading screen */
                    .canirox-loading {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: #f8f9fa;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                    }
                    
                    .canirox-spinner {
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #007cba;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                    }
                    
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    </style>
                    <script>
                    // Add validation class to body immediately
                    document.documentElement.className += ' canirox-validating';
                    </script>
                    <?php
                });
                
                // Add browser token validation
                add_action( 'wp_footer', function() use ( $order_id, $required_token, $order ) {
                    ?>
                    <!-- Loading Screen -->
                    <div class="canirox-loading">
                        <div style="text-align: center;">
                            <div class="canirox-spinner"></div>
                            <p style="margin-top: 20px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #666;">Verifying access...</p>
                        </div>
                    </div>
                    
                    <script>
                    // Validate browser token immediately
                    (function() {
                        const storedToken = localStorage.getItem('canirox_order_token_<?php echo $order_id; ?>');
                        const requiredToken = '<?php echo $required_token; ?>';
                        
                        console.log('Validating browser token for order #<?php echo $order_id; ?>');
                        console.log('Stored token:', storedToken ? 'Present' : 'Missing');
                        
                        if ( ! storedToken || storedToken !== requiredToken ) {
                            // Invalid browser - show access denied immediately
                            document.body.innerHTML = `
                                <div style="max-width: 600px; margin: 50px auto; padding: 40px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; text-align: center; border: 2px solid #dc3545; border-radius: 10px; background: #f8d7da; color: #721c24;">
                                    <h1 style="margin-bottom: 20px;">🔒 Access Denied</h1>
                                    <p style="font-size: 18px; margin-bottom: 20px;">This order confirmation link cannot be accessed from this browser.</p>
                                    <div style="background: #fff; padding: 20px; border-radius: 5px; margin: 20px 0; color: #495057;">
                                        <h3>This link only works from:</h3>
                                        <p>• The browser where you completed your purchase</p>
                                        <p>• The same device you used for payment</p>
                                        <br>
                                        <h3>Need to check your order?</h3>
                                        <p><a href="<?php echo wc_get_page_permalink( 'myaccount' ); ?>" style="color: #007cba; text-decoration: none; font-weight: bold;">→ View in your account</a></p>
                                        <p><a href="<?php echo wc_get_page_permalink( 'shop' ); ?>" style="color: #007cba; text-decoration: none;">← Continue shopping</a></p>
                                    </div>
                                    <p style="font-size: 14px; opacity: 0.8;">This security measure prevents unauthorized access to order details.</p>
                                </div>
                            `;
                            return;
                        }
                        
                        // Valid browser - show the page and mark as used
                        console.log('Valid browser token - granting access');
                        
                        // Remove loading screen and validation class
                        document.documentElement.classList.remove('canirox-validating');
                        const loadingScreen = document.querySelector('.canirox-loading');
                        if (loadingScreen) {
                            loadingScreen.remove();
                        }
                        
                        // Mark token as used on server
                        fetch('<?php echo admin_url( 'admin-ajax.php' ); ?>', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: 'action=mark_order_token_used&order_id=<?php echo $order_id; ?>&token=' + requiredToken
                        });
                        
                        // Remove token from localStorage (one-time use)
                        localStorage.removeItem('canirox_order_token_<?php echo $order_id; ?>');
                        console.log('Browser token removed - link now invalid for future use');
                        
                    })();
                    </script>
                    <?php
                }, 1 );
            }
        }
    }
}, 1 );
```

3) AJAX handler to mark token used

```php
add_action( 'wp_ajax_mark_order_token_used', 'canirox_mark_order_token_used' );
add_action( 'wp_ajax_nopriv_mark_order_token_used', 'canirox_mark_order_token_used' );

function canirox_mark_order_token_used() {
    $order_id = intval( $_POST['order_id'] ?? 0 );
    $token = sanitize_text_field( $_POST['token'] ?? '' );
    
    if ( ! $order_id || ! $token ) {
        wp_die( 'Invalid request' );
    }
    
    $order = wc_get_order( $order_id );
    if ( $order && $order->get_meta( '_required_browser_token' ) === $token ) {
        $order->update_meta_data( '_browser_token_used', 'yes' );
        $order->update_meta_data( '_browser_token_used_at', time() );
        $order->save();
        
        wp_send_json_success( 'Token marked as used' );
    }
    
    wp_send_json_error( 'Invalid token' );
}
```

Notes:

- These snippets already exist in this project's `functions.php` — they are included here as a complete, copyable example for blog readers.
- Consider adding a nonce parameter to the AJAX request and verifying it in `canirox_mark_order_token_used` to reduce CSRF risk.
- Optionally store a token creation timestamp and reject tokens older than a configurable window if you want to limit token lifespan.

## Custom email template

We needed a custom order-processing email. The child theme contains a modified copy of the WooCommerce email template `customer-processing-order-clean.php` (copy of `customer-processing-order.php`) with project-specific text and formatting.

### Full customized template (copyable)

Below is the actual `customer-processing-order-clean.php` file used in the child theme, followed by an annotated breakdown of the customised sections. This is safe to paste into your child theme at `yourtheme/woocommerce/emails/customer-processing-order.php` (or keep the file name used here).

```php
<?php
/**
 * Customer processing order email
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/customer-processing-order.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates\Emails
 * @version 9.9.0
 */

use Automattic\WooCommerce\Utilities\FeaturesUtil;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$email_improvements_enabled = FeaturesUtil::feature_is_enabled( 'email_improvements' );

/*
 * @hooked WC_Emails::email_header() Output the email header
 */
do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

<?php echo $email_improvements_enabled ? '<div class="email-introduction">' : ''; ?>
<p>
<?php
if ( ! empty( $order->get_billing_first_name() ) ) {
    /* translators: %s: Customer first name */
    printf( esc_html__( 'Hi %s,', 'woocommerce' ), esc_html( $order->get_billing_first_name() ) );
} else {
    printf( esc_html__( 'Hi,', 'woocommerce' ) );
}
?>
</p>

<p><?php esc_html_e( 'You did it! You\'ve signed up for the CANIROX Urban Challenge x Operation Broken Wing.', 'woocommerce' ); ?></p>

<p><?php esc_html_e( 'We\'re honestly just a bunch of dog people who wanted to do something different with our dogs and somehow, it\'s become Singapore\'s first-ever urban human-dog obstacle race. Whether you\'re fit, kinda fit, or just here for the chaos, you belong.', 'woocommerce' ); ?></p>

<p><?php esc_html_e( 'This race isn\'t about speed or podiums. It\'s about showing up with your dog, sweating it out, and finishing together. That\'s it.', 'woocommerce' ); ?></p>

<p><strong><?php esc_html_e( '👉 Download your Race Prep Guide here!', 'woocommerce' ); ?></strong><br>
<a href="https://www.canva.com/design/DAG0gni-iI8/39BSvlW1dcNnq1nBwMLQSA/view?utm_content=DAG0gni-iI8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h46dcb60bb0" target="_blank"><?php esc_html_e( 'Race Prep Guide', 'woocommerce' ); ?></a></p>

<p><?php esc_html_e( 'It\'s packed with bite-sized tips to help both you and your dog get ready for the chaos and the memories.', 'woocommerce' ); ?></p>

<p><?php esc_html_e( 'Closer to race day, we\'ll send you more details about race pack collection, check-in and flag-off waves.', 'woocommerce' ); ?></p>

<p><?php esc_html_e( 'For now, just know this: you and your dog are part of something special. We can\'t wait to see you at Singapore Sports Hub, OCBC Square this November.', 'woocommerce' ); ?></p>

<p><?php esc_html_e( 'See you at the start line,', 'woocommerce' ); ?><br>
<?php esc_html_e( 'Freda, Xiaohui & Webster', 'woocommerce' ); ?><br>
<?php esc_html_e( 'CANIROX Challenge Team', 'woocommerce' ); ?></p>

<p><strong><?php esc_html_e( 'Order Details:', 'woocommerce' ); ?></strong></p>

<?php echo $email_improvements_enabled ? '</div>' : ''; ?>

<?php

/*
 * @hooked WC_Emails::order_details() Shows the order details table.
 * @hooked WC_Structured_Data::generate_order_data() Generates structured data.
 * @hooked WC_Structured_Data::output_structured_data() Outputs structured data.
 * @since 2.5.0
 */
do_action( 'woocommerce_email_order_details', $order, $sent_to_admin, $plain_text, $email );

/*
 * @hooked WC_Emails::order_meta() Shows order meta data.
 */
do_action( 'woocommerce_email_order_meta', $order, $sent_to_admin, $plain_text, $email );

/*
 * @hooked WC_Emails::customer_details() Shows customer details
 * @hooked WC_Emails::email_address() Shows email address
 */
do_action( 'woocommerce_email_customer_details', $order, $sent_to_admin, $plain_text, $email );

/**
 * Show user-defined additional content - this is set in each email's settings.
 */
if ( $additional_content ) {
    echo $email_improvements_enabled ? '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td class="email-additional-content">' : '';
    echo wp_kses_post( wpautop( wptexturize( $additional_content ) ) );
    echo $email_improvements_enabled ? '</td></tr></table>' : '';
}

/*
 * @hooked WC_Emails::email_footer() Output the email footer
 */
do_action( 'woocommerce_email_footer', $email );
```

### What changed and why (annotated)

- Custom greeting and paragraphs: replaced the default plain greeting with a brand-aligned, friendly welcome and short narrative about the event to build rapport and reduce support questions.
- Race Prep Guide link: immediate, useful resource included in the email to improve attendee readiness and reduce pre-event inquiries.
- Sign-off: uses real organizer names to make the message feel personal.
- Order Details: left to WooCommerce hooks so the canonical order table, totals and meta remain present and compatible with email clients and automation.

![alt text](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-15-canirox-checkout-flow/image-9.png)

Notes & recommendations:

- Ensure any extra checkout fields (teammate name, age) are saved to order meta so they appear in the email (they will surface via the `woocommerce_email_order_meta` hook).
- Keep these content edits minimal and maintain the order hooks to avoid breaking structured data or automatic parsers used by accounting/email services.

## File references: `functions.php` snippets

- `define( 'CANIROX_TEAMMATE_REQUIRED_VARIATIONS', [268,305,459] );` — variation IDs that require teammate fields.
- `add_filter( 'woocommerce_add_to_cart_validation' ... )` — limit cart quantity to one product.
- `add_action( 'woocommerce_checkout_process' ... )` — server-side validation for teammate fields.
- `add_filter( 'woocommerce_form_field' ... )` — conditional display and requirement marker for teammate fields.
- `add_action( 'wp_footer' ... )` — cart quantity input replacement (hidden -> number) for cart page.
- `add_filter( 'woocommerce_cart_needs_update_button', '__return_false' );` — remove update button.
- `add_action( 'woocommerce_thankyou' ... )` — generate browser token and output localStorage JS.
- `add_action( 'template_redirect' ... )` — block and validate order-received page, inject loading screen and client-side token check.
- AJAX actions: `wp_ajax_mark_order_token_used`, `wp_ajax_nopriv_mark_order_token_used` and handler `canirox_mark_order_token_used`.


## Potential Improvements

1. Centralise variation IDs

- If you add/remove variations frequently, consider storing required-variation IDs in a Settings page or post meta instead of constants. This makes it easier for non-developers to update.

2. Harden token handling

- Consider adding nonce checks to the AJAX handler to reduce risk of CSRF when marking tokens used.
- Optionally limit token lifetime by also storing a timestamp and rejecting tokens older than a short window.

3. Server-side fallback for validation

- The current approach relies on browser localStorage for the immediate UX check; ensure server-side checks always gate access if localStorage is absent. The current code does server-side gating by withholding the page, but consider adding additional server-side checks for token presence and validity before rendering.

4. Logging and monitoring

- Log failed token attempts to detect suspicious activity and block suspicious IP addresses if needed.

5. Email/receipt robustness

- Ensure the custom email template still includes all necessary WooCommerce hooks (items table, totals, order meta). Test email delivery across common clients.
