---
layout: page
title: Dog Community - wip
permalink: /new-home-kallang/dog-community/
parent: New Home Kallang
nav_order: 2
---

# Kallang Dog Community

Shortly after shifting into the Kallang region, and also welcoming our doggo Stormy with open arms -- we prompty stumbled into a welcoming dog community!

This is a tight knit community, gathering daily at 2130 hours SGT to catch up and ensure that that their dogs receive sufficient social interactions.
During these catch up sessions, knowledge such as reliable vets, commons issues faced by other dog owners are discussed.
This creates a collective knowledge of dog owners, that maximizes the chances of an owner and his furry pal living in harmony!

## My Contribution

Now we come to my contribution to this community - it's not much! I'm not the most active member of the community but I do join them every Tuesday and Thursdays (as long as life does not get in the way). Leech off some tips from other veteran dog owners, to see how we can improve the relationship between stormo and myself ^^.

Recently, they've shared a list of members in their community - `paws of 2024`! I personally thought this was an interesting idea. Since I'm on a journey to explore different tools that will deepen my understanding of both technology and dog behaviour, seems apt to explore the feasibility of building a simple site for the Kallang Dog Community People.

## Feeling Responsive Tempalte

So I went ahead and researched for a template, and found an amazing template called `Feeling Responsive`. This template is extremely user friendly, and has been designed so that you can easily modify the template to suit your needs, whatever it is:
- A portfolio
- A blog
- A professional website

If you're interested, you can view the [demo of the template here!](https://phlow.github.io/feeling-responsive/index.html). <br>
The source code of the template can be forked from [here!](https://github.com/Phlow/feeling-responsive)

## Planned Site Structure (Raw notes)

After exploring the template, I have noted down the main features of the template that I plan to use. Ideally, this would be used to create the `Kallang Dog Community` website. But even if that plan did not manifest, would still have gained some insights by fiddling around and familiarizing with the `Feeling Responsive` template. Given how powerful this template is, it's definitely going to come in handy sometime in the future.

For those whom are interested, this is the plan:
![image showing my notepad that comprise of notes on how the kallang dog community website is intended to be structured](../../new-home-kallang/child-page-2-dog-community/image-of-notes-on-how-kallang-dog-community-website-structured-1.png)
![image showing the second portion of my notepad that shows how the kallang dog community website is intended to be structured](../../new-home-kallang/child-page-2-dog-community/image-of-notes-on-how-kallang-dog-community-site-structured-2.png)

The next few sections, will aim to organize my notes into a more readable structure -- that way, I can show off what I've learnt ^^ 
But more importantly, I'd have a reference on how we can utilize the `Feeling Responsive` features for any future sites that I'm planning to create!  

This artile will only list down the features that I've personally explord and plan to use -- doesn't cover the full suite of functionalities provided by this template. For a comprehensive view of what the `Feeling Responsive` template is capable of, please visit their [official documentation](https://phlow.github.io/feeling-responsive/documentation/).

### Navigation Menu Configuration

The first thing that jumped up at me was the ease of managing the navigation menu bar:
![image showing the high-level functionality of the feeling response navigation config file](../../new-home-kallang/child-page-2-dog-community/image-showing-the-high-level-functionlity-of-navigation.png)
1. Access the `_data` directory
2. Find the `navigation.yml` file
3. Open the `navigation.yml` file and cross check the configuration against the `Feeling Responsive` template, to get an understanding of how it works

I've [hosted](https://dogcommunity.shafikwalakaka.com) the version I modified so that everyone can see the end product of modifying the `Feeling Responsive` template. 


The breakdown of how navigation is configured is as follows:
- Each main menu label, will have it's own YAML block (a collection of key-value pairs). 
![image showing the navigation panel is controlled by different YAML Blocks](../../new-home-kallang/child-page-2-dog-community/image-showing-the-navigation-yaml-block.png)
- The label of the navigation menu is configured in the `title` property. <br> In the example above, we have indicated `Paws of 2024` as the label for one of the main navigation menus.
![image showing the label for YAML block 2](../../new-home-kallang/child-page-2-dog-community/image-showing-label-for-yaml-block-2.png)
- The path of the site would be configured in the `url` property.<br> In the example above, we have indicated `/paws-of-2024` as the path that users will be directed to when clicking the `Paws of 2024` navigation menu
![image showing the path for yaml block 2](../../new-home-kallang/child-page-2-dog-community/image-showing-the-path-for-yaml-block-2.png)
- The location of the menu (e.g., left or right), will be configured in the `side` property.<br> In the example above, the menus are located on the left hand side of the screen.
![image showing that we can shift the menu to the right hand side](../../new-home-kallang/child-page-2-dog-community/image-showing-that-we-can-shift-menu-to-right-hand-side.png)
- If there are child menus, these will be configured in the `dropdown` property of the same YAML block.<br> 
![image showing child menu configured in the dropdown property](../../new-home-kallang/child-page-2-dog-community/image-showing-child-menu-configured-in-dropdown-property.png)



### Layouts (Page, Page-Fullwidth)

Now, we move onto the layouts that I'm planning on using. There are three main layouts I've planned to use:
- Page
- Page-Fullwidth
- Blog

The `Page` and `Page-Fullwidth` layouts come in ready out of the box, for you to use. There is no intention or need to make any modifications to these layouts for the site that we're planning for.

To use the layouts, simply specify the layout in your Jekyll Front Matter, using the `layout` property.
- Specifying `page` will load the page template:
![image showing the page template being used](../../new-home-kallang/child-page-2-dog-community/image-showing-page-template.png)
- Specifying the `page-fullwidth` value will load the fullwidth page template! It's that easy
![image showing the fullwidth page template](../../new-home-kallang/child-page-2-dog-community/image-showing-fullwidth-page-template.png)

### Layouts (Blog)

We will be making some modifications to the blog template to make sure the blog list page suits our style. The fact that we can modify the layout is a testatement to how user friendly the `Feeling Responsive` template is:
- The blog template, comes with sidebar that we don't really like. See the screenshot below for the [original version](https://phlow.github.io/feeling-responsive/blog/) of the page (with sidebar)
![image showing the blog layout template with the sidebar](../../new-home-kallang/child-page-2-dog-community/image-showing-original-blog-layout-w-sidebar.png)
- As you can see in our source code above, we have modified and commented out the sider element. On top of that, we have also added 2 columns to each side of the main content to ensure that it's nicely centered in the webpage 
![image showing the blog layout udpated to remove sidebar](../../new-home-kallang/child-page-2-dog-community/image-showing-the-blog-layout-updated.png)


### Layouts (Blog), Design Decisions
The reason why we have those 2 additional columns was because:
- Utilizing the fullwidth of the page makes the site looks too fluid:
![image showing the content of the blog spanning the full width of the browser](../../new-home-kallang/child-page-2-dog-community/image-utilizing-full-width-of-the-page.png)
- Leaving out the spacer columns will leave an awkward gap on the right hand-side. The gap was previously filled by the sidebar that we have recently removed:
![image showing the site skewed to the left because it's missing the spacer columns](../../new-home-kallang/child-page-2-dog-community/image-of-site-skewed-to-the-left.png)

Hence, why we'll be removing the sidebar, and adding two spacer columns for the blog template!


### Includes 

The last template modification that we would be making would be done in the `_includes` folder. This folder normally contains files that contains the html content that are referenced by layouts to generate template. Let's take the generation of the `Home` page for example:
- The `Home` page is using the `page-fullwidth` layout
![image showing that home page is using the page full width layout](../../new-home-kallang/child-page-2-dog-community/image-showing-that-the-home-page-using-page-fullwidth.png)
- The page fullwidth layout is made of two rows. Each row has a column utilizing the full 12 grids (hence utilizing the fullwidth). The content of the blog is inserted after the first two rows.
![image showing the page fullwidth template in detail](../../new-home-kallang/child-page-2-dog-community/image-showing-the-page-full-width-template-in-detail.png)
For more details regarding the grid layouts used by `Feeling Responsive`, please check the [Foundation Oficial Documentation](https://get.foundation/sites/docs-v5/components/grid.html)


## More WIP content below here!
___
- Includes folder, contains files that has re-usable html
- These reusable html are reused across different layouers
    - e.g., footer, header, side bar etc.
- Data can be dynamically retrieved by using the liquid syntax, this is a functionality that is supported by the jekyll framework
    - link back to the jekyll official documentation for these details





### Images
- These are in the `img` folder in the root directory
- Different images for different feature
    - Header image. Aspect ratio 3:1. Else, theme automatically vertically centers
    - Thumbnail image. Aspect ratio 1:1
        - Need to suffix using `-thumb`
- For Pages
    - No thumbnail required
    - Simply the header image is sufficient
- For Posts
    - Should specify thumbnail image
    - This would be the feature image, that is displayed during the blog list view

### Gallery Feature

- Gallery
    - The gallery syntax is in the front matter. Check front matter and the list down the gallery syntax
    - Afterwhcih, image needs to be uploaded
        - full size image, into the `img` folder in the root directory
        - thumbnail image, into the `img` folder in the root directory 
            - Same `-thumb` suffix applies
    - Once done, can use the `{% raw %}{% include gallery %}{% endraw %}`  to include the gallery




### Permalink

- Permalink
    - By default, will use `/category/title`
    - Can manually overwrite, using the `permalink` property in the front matter

### Colour Scheme

- _SASS
    - Can control the colour scheme here


Until then, peace and love <br>
Shafik Walakaka