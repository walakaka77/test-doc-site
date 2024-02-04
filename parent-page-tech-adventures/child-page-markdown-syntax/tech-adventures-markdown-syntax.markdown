---
layout: page
title: Markdown Syntax
permalink: /tech-adventures/markdown-syntax
parent: Tech Adventures
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

In markdown syntax, unordered lists are formed using a dash (-), while ordered lists use numbers. Both types of lists can be nested by indenting the child elements under their parent list.

![markdown syntax for lsits](../../img/lists-markdown-syntax.png){:width="100%"}

#### Unordered Lists

Sample snippet for generating unordered list:

```bash
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
```

The above snippet generated the following list in this template:

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

![markdown syntax for unordered lists](../../img/unordered-list-md-syntax.png){:width="100%"}

#### Ordered Lists

Sample snippet for generating ordered list:

```bash
1. Item 1
2. Item 2
   1. Subitem 2.1
   2. Subitem 2.2
```

The above snippet generated the following list in this template:

1. Item 1
2. Item 2
   1. Subitem 2.1
   2. Subitem 2.2

![markdown syntax for ordered lists](../../img/ordered-list-md-syntax.png){:width="100%"}

### Links

Links are created using the following syntax:

```bash
[Link to Shafik's Resume](https://shafikwalakaka.com) <br>
[Link to Shafik Resume Title](https://shafikwalakaka.com "Shafik's Resume!")
```

[Link to Shafik's Resume](https://shafikwalakaka.com) <br>
[Link to Shafik Resume Title](https://shafikwalakaka.com "Shafik's Resume!")

![markdown syntax for links](../../img/links-md-syntax.png){:width="100%"}

#### Relative Path for Links

Relative path for links will append the specfied path to the domain that you are currently on. For example, specifying `[Link to Keyboard Cleaning Article!](/new-home-experience/mechanical-keyboard-cleaning/)` will append `/new-home-experience/mechanical-keyboard-cleaning/)` to whatever domain that I am currently serving the site on.

This approach allows you to test your generated site locally (using the localhost domain), and no changes are required when you push your site to your hosting (github pages in this case).


See it in action here:
- [Link to Keyboard Cleaning Article!](/new-home-experience/mechanical-keyboard-cleaning/)

Without any changes to the code snippet, I can host and test it locally:
![relative path localhost](../../img/relative-path-locahost-domain.png){:width="100%"}

And without any changes, the same code snippet can be used online too:
![relative path online hosting](../../img/relative-path-githubpages-domain.png){:width="100%"}


> _Do note to use relative paths for internal linking. Else, you would have to update all your internal links if you change your domain name._

### Images

The syntax for images is as follows:
```bash
![Alt Text](ImageURL)
```

![Image syntax](../../img/sample-dog-image-md-syntax.png){:width="100%"}

The above code snippet generates this image:

![Sample image of a dog](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH5_eChjIhJIm99M5MDL4rN-XHY1TCBlrhJw&usqp=CAU)

> Similarly, images can also have absolute or relative URL's. The same principle applies -- if referencing local images, use relative path. If referencing images from external sites, use absolute URLs

### Blockquotes and Code Blocks

Blockquotes syntax is as follows: `> This is a blockquote.`

> This is a blockquote.

Inline `code` or multiline code blocks:

```python
def example_function():
    print("Hello, World!")
```

See image below for reference on how it looks behind the scenes:
![Block Quote and Inline Code Block Snippet](../../img/block-quote-inline-code-block-md-syntax.png)
