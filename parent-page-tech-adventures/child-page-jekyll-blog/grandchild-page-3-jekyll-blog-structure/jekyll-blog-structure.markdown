---
layout: page
title: Jekyll Blog Structure
permalink: /tech-adventures/jekyll-blog/jekyll-blog-structure
parent: Jekyll Blog
grand_parent: Tech Adventures
nav_order: 3
---

# Jekyll Blog Structure

Hello, this page aims to specify how my Jekyll blog is structured. After just having several pages, the organization of my Jekyll repository was getting out of  -- to be frank, there wasn't much organization.

Next step was to sit back and revise the way that it is structured, so that the blog is more manageable.

## Issues

The issues faced were as follows:
1. Images were all stored in one location and inferred based on their filenames: ![Image showing the structure and organization of my images in my Jekyll repository](/parent-page-tech-adventures/child-page-jekyll-blog/grandchild-page-3-jekyll-blog-structure/image-showing-img-organization-in-repo.png)
2. Pages were stored in a flat structure in their category directory. There no indication `parent`, `child` or `grandchild` pages <br>![Image showing that pages are stored in a flat structure in my Jekyll repository](/parent-page-tech-adventures/child-page-jekyll-blog/grandchild-page-3-jekyll-blog-structure/image-pages-flat-structure.png)
3. The current flow is:
    - Create a markdown file in the category folder
    - Write some content using the [markdown syntax](/tech-adventures/markdown-syntax)
    - Drag files into the img folder and then reference it accordingly with the [markdown syntax](/tech-adventures/markdown-syntax)
        - This step is actually congnitively complicated, because I have to keep switching to my folder directory, and then search for the exact filename that was dropped there

This basically makes it very difficult to update pages, reference images and slows down the entire process of creating any content. For more details on how to reference images, you can refer [here](/tech-adventures/markdown-syntax).

To manage the blog better, we'll need to solve this issue.


## Resolution

1. Each page will have their own directory
2. Each directory will have the following naming convention `<nesting-level>-page-<nav-order>-<page-title>`<br> ![Alt text](/parent-page-tech-adventures/child-page-jekyll-blog/grandchild-page-3-jekyll-blog-structure/image-revised-directory-structure-naming-convention.png)
    - Nexting levels can be either `parent`, `child` or `grandchild`
    - Nav order is the the order in which you want your child or grand child pages to be listed in
    - Please note that these features are unique to [Just the Docs](https://just-the-docs.com/docs/navigation-structure/) template
3. Each directory will have a maximum of 1 markdown file -- the page file
4. All markdown file will have the `page-title` as the filename and title specified in front  <br> ![image showing the standardization of filenames, titles in front matter and directory name](/parent-page-tech-adventures/child-page-jekyll-blog/grandchild-page-3-jekyll-blog-structure/image-filename-standardize-with-site-title.png)
    - Firstly, this reduces cognitive complexity, because we can manually ensure that the title, filename and directory name are now standardized
    - Secondly, since this is standardized and structured -- we can automate this by utilizing variables based on the directory name (failed to this -- hit a bug, but a future project for sure)
5. All images pertaining to that page will be stored in the same page directory and will be pre-fixed with the `image-` tag <br> ![List of image files in the jekyll blog structure directory](/parent-page-tech-adventures/child-page-jekyll-blog/grandchild-page-3-jekyll-blog-structure/image-all-image-in-same-directory-w-img-prefix.png)
    - This streamlines the process to add images because [visual studio code](https://code.visualstudio.com/) allows you to copy and paste images from the clipboard into your text editor
    - The image will automatically be uploaded into the directory of the edited file
    - Since all images are planned to be in the page directory, there is no further action required after copy and pasting the images into visual studio code ^^

## Thank You

That's all for today. Actually this page was more for my own documentation, to resolve my own pain points. I was previously storing it in my notepad:
![Image of my notepad storing notes for my filestructure](/parent-page-tech-adventures/child-page-jekyll-blog/grandchild-page-3-jekyll-blog-structure/iamge-notepad-notes-for-file-structure.png)

But since it's automatically nicely formatted once you put it in Jekyll Blog -- thought I'll transfer it here for my future reference as well when I get confused.

Still -- hope it's useful for you guys too, and thanks for reading.


Peace and Love <br>
Shafik Walakaka