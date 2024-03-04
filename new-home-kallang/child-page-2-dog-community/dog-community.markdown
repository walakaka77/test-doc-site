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

After exploring the template, I have noted down the main features of the template that I plan to use. Ideally, this would be used to create the `Kallang Dog Community` website. But even if that plan did not manifest, I would have gained insights by fiddling around and familiarizing with the `Feeling Responsive` template. Given how powerful this template is, I'm certain that this knowledge will come in handy sometime in the near future.

For those whom are interested, my raw notes are as follows:
![image showing my notepad that comprise of notes on how the kallang dog community website is intended to be structured](../../new-home-kallang/child-page-2-dog-community/image-of-notes-on-how-kallang-dog-community-website-structured-1.png)
![image showing the second portion of my notepad that shows how the kallang dog community website is intended to be structured](../../new-home-kallang/child-page-2-dog-community/image-of-notes-on-how-kallang-dog-community-site-structured-2.png)

The next few sections, will aim to structure the raw notes into readable documentation, just to show off my understanding LOL. 
But really - just so that I don't forget, when I do circle back and try to recall the amazing features from this template.

I'm only gonna list down features that I actually have explored and plan to use. For a comprehensive view of what `Feeling Responsive` is capable of, please visit their [official documentation](https://phlow.github.io/feeling-responsive/documentation/).

### Navigation Menu Configuration

The first thing that jumped up at me was the ease of managing the navigation menu bar:
![image showing the high-level functionality of the feeling response navigation config file](../../new-home-kallang/child-page-2-dog-community/image-showing-the-high-level-functionlity-of-navigation.png)
1. Access the `_data` directory
2. Find the `navigation.yml` file
3. Open the `navigation.yml` file and cross check the configuration against the `Feeling Responsive` template, to get an understanding of how it works

I've [hosted](https://dogcommunity.shafikwalakaka.com) the version I modified so that everyone can see the end product of modifying the `Feeling Responsive` template. 

![image of the sample kallang dog community site, to demonstrate functionalities of the navigation configuration](../../new-home-kallang/child-page-2-dog-community/image-of-sample-kallang-dog-comm-site.png)
The breakdown of how navigation is configured is as follows:
- Each main menu label, will have it's own YAML block (a collection of key-value pairs). 
- The label of the navigation menu is configured in the `title` property. <br> In the example above, we have indicated `Paws of 2024` as the label for one of the main navigation menus.
- The path of the site would be configured in the `url` property.<br> In the example above, we have indicated `/paws-of-2024` as the path that users will be directed to when clicking the `Paws of 2024` navigation menu
- The location of the menu (e.g., left or right), will be configured in the `side` property.<br> In the example above, the menus are located on the left hand side of the screen.
- If there are child menus, these will be configured in the `dropdown` property of the same YAML block.<br> In the example above, there are no child menus!



### Layouts (Page, Page-Fullwidth)

Now, we move onto the layouts that I am thinking of using. There are three main layouts that I think I'd use for the simple site:
- Page
- Page-Fullwidth
- Blog

These layouts come in ready out of the box, for you to use. I'm not intending to make any changes to the layouts for either `Page` or `Page-Fullwidth`.

When you want to use the layouts, simply specify the layout in your Jekyll Front Matter, using the `layout` property.
- Specifying `page` will load the page template:
![image showing the page template being used](../../new-home-kallang/child-page-2-dog-community/image-showing-page-template.png)
- Specifying the `page-fullwidth` value will load the fulwidth page template! It's that easy
![image showing the fullwidth page template](../../new-home-kallang/child-page-2-dog-community/image-showing-fullwidth-page-template.png)

### Layouts (Blog)

We will be making some modifications to the blog template to make sure the blog list page, suits our style. This will show how user friendly the `Feeling Responsive` template is:
- The blog template, comes with sidebar that we don't really like. See the screenshot below for the [original version](https://phlow.github.io/feeling-responsive/blog/) of the page (with sidebar)
![image showing the blog layout template with the sidebar](../../new-home-kallang/child-page-2-dog-community/image-showing-original-blog-layout-w-sidebar.png)
- As you can see in our source code above, we have modified and commented out the sider element. On top of that, we have also added 2 columns to each side of the main content to ensure that it's nicely centered in the webpage 
![image showing the blog layout udpated to remove sidebar](../../new-home-kallang/child-page-2-dog-community/image-showing-the-blog-layout-updated.png)


### Layouts (Blog), Design Decisions
The reason why we have those 2 additional columns was because:
- Utilizing the fullwidth of the page makes the site looks too fluid:
![image showing the content of the blog spanning the full width of the browser](../../new-home-kallang/child-page-2-dog-community/image-utilizing-full-width-of-the-page.png)
- The theme seems to start content on the left. So if we don't add the spacer columns, the side will be skewed to the left:
![image showing the site skewed to the left because it's missing the spacer columns](../../new-home-kallang/child-page-2-dog-community/image-of-site-skewed-to-the-left.png)


___
## Unfortunately, everything below here is again -WIP
- These are templates that are referenced for each page or post
- We will mainly utilize 3
    - blog
    - page
    - page full width
- Modifications
    - Blog
        - Blog, we remove the sidebar
        - Centralize also, by adding 2 columns. Left and right with no content
        - Add a point, how amazing it is, simple to customize
        - Reference the foundation framework. Points to the page with the grid format
    - Page Fullwidth, Page --> No change, we use their default template. Already very nicely set up

### Includes 

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