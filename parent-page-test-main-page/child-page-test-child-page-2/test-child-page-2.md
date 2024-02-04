---
#title: Test child Page 2
title: "{{ page.name | remove: '.md' | replace: '-', ' ' | capitalize }}"
parent: Test Main Page
layout: default
---

# Test Front Matter

This page servers to test whether front matter load the variables 


## Testing the front matter variables:

Title shows the following: <br>
{{ page.dir | split: '/' | last | remove: '-' | capitalize }} <br>
{{ page.dir | split: '/' | last | remove_first: page.level }} <br>
{{ page.name | remove: '.md' | replace: '-', ' ' | capitalize }}


---
title: "{{ page.name | remove: '.md' | remove_first: page.level | replace: '-', ' ' | capitalize }}"
---


