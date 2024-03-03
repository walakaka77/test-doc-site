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

To cut it short, it's not much! I'm not the most active member of the community but I do join them every Tuesday and Thursdays (as long as life does not get in the way). Leech off some tips from other veteran dog owners, to see how we can improve the relationship between stormo and myself ^^.

Recently, they've shared a list of members in their community - `paws of 2024`!. Thought this was an interesting idea, and since I'm on my journey to explore different tools that will deepend my understanding of both technology and dog behaviour.
I thought it'd be a great idea to explore the feasibility of building a simple site for the Kallang Dog Community People.

## Feeling Responsive Tempalte

So I went ahead and researched for a template, and found an amazing template `Feeling Responsive`. This template is extremely user friendly, and has been designed so that you can easily modify the template to suit your needs, whatever it is:
- A portfolio
- A blog
- A professional website

If you're interested, you can view the [demo of the template here!](https://phlow.github.io/feeling-responsive/index.html). <br>
The source code of the template can be forked from [here!](https://github.com/Phlow/feeling-responsive)

## Planned Site Structure (Raw notes)

Now that I have explored the feeling responsive template, I've noted down the features that I'm planning to use, if we do decide the create a `Kallang Dog Community` website.

Even if we don't, I have fiddled around with the `Feeling Responsive` template, and familiarized with the functionalities -- I'm certain that this will come in handy, given the ease of use of the template, and the dynamicity of it.

As always, my notes are stored in an unstructured manner in notepad:
![image showing my notepad that comprise of notes on how the kallang dog community website is intended to be structured](../../new-home-kallang/child-page-2-dog-community/image-of-notes-on-how-kallang-dog-community-website-structured-1.png)
![image showing the second portion of my notepad that shows how the kallang dog community website is intended to be structured](../../new-home-kallang/child-page-2-dog-community/image-of-notes-on-how-kallang-dog-community-site-structured-2.png)

The next few sections, will aim to structure the raw notes into readable documentation, just to show off my understanding LOL. 
But really - just so that I don't forget, if I do need to use these powerful features in the future.

Please note that I am only going to note down the features that I am planning to use -- `Feeling Responsive` template supports much more advanced features that what I am planning to list down.
So do visit their official documentation if you are intending to checkout the full suite of functionalities provided by this template.

### Navigation Menu Configuration

The first thing that jumped up at me was the ease of managing the navigation menu bar:
![image showing the high-level functionality of the feeling response navigation config file](../../new-home-kallang/child-page-2-dog-community/image-showing-the-high-level-functionlity-of-navigation.png)
1. Access the `_data` directory
2. Find the `navigation.yml` file
3. Open the `navigation.yml` file and cross check the configuration against the `Feeling Responsive` template, to get an understanding of how it works

To demonstrate, kindly see the version that I have [hosted](https://dogcommunity.shafikwalakaka.com). In the updated template, I have removed most of the navigation menu that links to pages irrelevant to the Kallang Dog Community Sample Site.
I have also included additionl menu that points to sample pages for the Kallang Dog Community Sample Site!

Each main menu label, will have it's own YAML block (a collection of key-value pairs). Within the YAML block:
![image of the sample kallang dog community site, to demonstrate functionalities of the navigation configuration](../../new-home-kallang/child-page-2-dog-community/image-of-sample-kallang-dog-comm-site.png)
- The label of the navigation menu is configured in the `title` property, within the YAML block. <br> In the example above, we have indicated `Paws of 2024` as the label for one of the main navigation menus.
- The path of the site would be configured in the `url` property, within the same YAML block.<br> In the example above, we have indicated `/paws-of-2024` as the path that users will be directed to when clicking the `Paws of 2024` navigation menu
- The location of the menu (e.g., left or right), will be configured in the `side` property, within the same YAML block.<br> In the example above, the menus are located on the left hand side of the screen.
- If there are child menus, these will be configured in the `dropdown` property of the same YAML block.<br> In the example above, there are no child menus!

___
## Unfortunately, everything below here is again -WIP

### Includes 

- Includes folder, contains files that has re-usable html
- These reusable html are reused across different layouers
    - e.g., footer, header, side bar etc.
- Data can be dynamically retrieved by using the liquid syntax, this is a functionality that is supported by the jekyll framework
    - link back to the jekyll official documentation for these details



### Layouts her
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