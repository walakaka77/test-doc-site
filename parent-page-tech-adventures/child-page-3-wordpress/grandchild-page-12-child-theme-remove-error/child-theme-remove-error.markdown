---
layout: page
title: Child Theme Removes Error
permalink: /tech-adventures/wordpress/child-theme-remove-error
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 12
index: 'yes'
follow: 'yes'
description: Removed an annoying error message by custom code in child theme
image: ../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/heic-image-incompatible-browser.png
---

# Automated Testing Enhancement

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

## WordPress Child Themes – Quick Explanation

A **child theme** in WordPress is a theme that inherits **all functionality, styles, and templates** from another theme — the **parent theme** — but allows you to **override or add to** those files **safely**, without modifying the parent directly.

### How It Works:
- WordPress **loads the parent theme first**, then checks for **matching files** in the child theme.
- If a file **exists in the child**, it **overrides** the parent version (e.g., `header.php`, `style.css`, or `functions.php`).
- For styles, `style.css` in the child theme typically **imports** the parent styles first, then applies custom rules.

This allows you to:
- Customize or fix issues
- Keep changes safe from updates to the parent theme

---

## Suppressing Elementor Warnings in a Child Theme

This code suppresses a known **Elementor PHP warning** (`background_image` bug) that keeps showing even when `WP_DEBUG_DISPLAY` is off.

### Add This to `functions.php` in Your Child Theme:

```php
function suppress_elementor_background_image_warnings( $errno, $errstr, $errfile, $errline ) {
    // Check if this is the specific warning from Elementor's conditions.php on background_image
    if ( strpos( $errfile, 'elementor/includes/conditions.php' ) !== false
        && (
            str_contains($errstr, 'Undefined array key "background_image"') 
            || str_contains($errstr, 'Trying to access array offset on value of type null')
        )
    ) {
        // Suppress this specific warning
        return true;
    }
    // Let other warnings behave normally
    return false;
}
set_error_handler('suppress_elementor_background_image_warnings', E_WARNING);
```

## The Real Power of AI in Development

Some people say “AI can’t code for you” — but that misses the point.

What AI really does is drastically improve your **information gain rate**.

### AI Increases Your Learning Curve by Abstracting Complexity

To understand a seemingly simple code snippet like the Elementor suppression function, you need:

- Knowledge of how PHP works (interpreted, not compiled)
- Familiarity with built-in functions like `set_error_handler()`
- Understanding of what `$errno`, `$errstr`, `$errfile`, and `$errline` mean
- Awareness of how WordPress themes work
- How child themes override parent files
- How Elementor interacts with the theme structure

Without all this, it looks confusing. With AI, it becomes approachable.

## Understanding `set_error_handler()` in PHP

### What Is It?

`set_error_handler()` is a built-in PHP function that lets you override the default error-handling behavior. It allows you to define your own function that will be triggered whenever a PHP warning or notice occurs.

### Syntax

```php
set_error_handler(callback $error_handler_function, int $error_levels);
```

### Defining the Handler Function
You define a custom function that will be called with four parameters:

```php
function custom_handler($errno, $errstr, $errfile, $errline) {
    // your logic here
}
```

### Explanation of the Parameters
- $errno: The numeric error level (e.g., E_WARNING, E_NOTICE)
- $errstr: The error message string describing the problem
- $errfile: The file in which the error occurred
- $errline: The line number in that file

### Why This Matters for the Elementor Bug

The known Elementor warning looks like this:
```php
Warning: Undefined array key "background_image" in elementor/includes/conditions.php
```

This is a non-breaking PHP warning, but it clutters logs and may still appear even if `WP_DEBUG_DISPLAY` is turned off.

To fix this, we can use `set_error_handler()` in the child theme’s functions.php file to catch and suppress just this warning, without affecting anything else.

### Explanation of the Warning Suppression Logic

```php
// Check if this is the specific warning from Elementor conditions.php on background_image
if ( strpos( $errfile, 'elementor/includes/conditions.php' ) !== false
    && (
        str_contains($errstr, 'Undefined array key "background_image"') 
        || str_contains($errstr, 'Trying to access array offset on value of type null')
    )
) {
    // Ignore these warnings
    return true;
}
// Otherwise, use normal error handler
return false;
```
This code checks whether the PHP warning that triggered the error handler matches a specific known issue with Elementor:

- `strpos( $errfile, 'elementor/includes/conditions.php' ) !== false`<br>
This verifies that the warning originated from the conditions.php file inside the Elementor plugin. It ensures only warnings from this specific file are targeted.
- The nested condition checks if the error message ($errstr) contains either of the following substrings:
  - `'Undefined array key "background_image"'`
  - `'Trying to access array offset on value of type null'`<br>
These are the exact warning messages caused by Elementor’s bug related to accessing a non-existent `background_image` key in an array.

If both conditions (file path and error message) are true, the function returns true, which tells PHP to suppress this warning and not display it.

If the conditions are not met, it returns `false`, which means PHP’s normal error handling will proceed for all other warnings.

### What AI Actually Does

- **Explains high-level intent**: What is this code supposed to do?
- **Guides your logic**: You still need understanding, but AI helps shape your thinking.
- **Bridges the gap**: Between a beginner and someone who can solve the issue on their own.
- **Empowers resourceful users**: You don’t need to be a professional. You need curiosity and logical thinking.

### It Resolves Painful Problems Simply

Without AI:  
- You need deep understanding and experience, which can take years to develop.  
- Finding direct answers often requires sifting through complex documentation and discussions.  

With AI:
- You can logically work through the issue.
- You learn the “why,” not just copy-paste the “what.”
- You fix real bugs without deep specialization.
- You can quickly understand complex discussion on forums, by querying the AI to teach you

### Final Thought

AI isn’t a shortcut for people who don’t want to learn. It’s a tool that accelerates understanding — if you’re willing to engage with it. Prompt well, follow the logic, and you’ll solve things that used to seem impossible.

This is a classic example, there is no way someone with no background in PHP can quickly understand all the above concepts (without AI), and fix the wordpress issue at a deep level.

But now, you can!
