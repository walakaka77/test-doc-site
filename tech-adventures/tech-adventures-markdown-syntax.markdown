---
layout: page
title: Markdown Syntax
permalink: /tech-adventures/jekyll-blog/markdown-syntax
parent: Jekyll Blog
grand_parent: Tech Adventures
---

# Introduction

Hello! Here, we list out all the markdown syntax that would be used to create the Jekyll Powered blog.

## Markdown Syntax Summary

### Headers
The headers in markdown syntax are specified using the number of hashes `#`. For example, the `Introduction` heading in this page is a H1 Heading and the `Markdown Syntax Summary` is a H2 Heading. See screenshot below for reference:

![markdown syntax for headings](../../img/h1-h2-heading-syntax.png){:width="100%"}

The full list of headings are available below:
``` markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```


### Emphasis
Emphasis can be *italic*, **bold** or ***both (italic and bold)***. See the screenshot below for reference:

![markdown syntax for italics and bold](../../img/emphasis-image.png){:width="100%"}

- Italics can be specified using an asterix or underscore on each side `*italic*` or `_italic_`
- Bolds can be specified using two asterix or underscores on each side `**bold**` or `__bold__`
- Bold Italics can be specified using 3 asterix on each side `***bold and italic***`



### Lists

#### Unordered Lists

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

#### Ordered Lists

1. Item 1
2. Item 2
   1. Subitem 2.1
   2. Subitem 2.2

### Links

[Link Text](URL)
[Link with Title](URL "Title")

### Images

![Alt Text](ImageURL)

### Blockquotes

> This is a blockquote.

### Code

Inline `code` or multiline code blocks:

```python
def example_function():
    print("Hello, World!")
