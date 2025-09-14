---
layout: page
title: Hash Map Generation
permalink: /tech-adventures/general-tech/hash-ham-generation
parent: General Tech
grand_parent: Tech Adventures
nav_order: 2
index: 'yes'
follow: 'yes'
description: Automating Hash Map Generation
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-1-Adyen-Online-Payments/adyen-online-payments.png
---

# Hash Map Generation Guide

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>



## Introduction

This article is designed to streamline the process of mapping and documenting hiking locations using [uMap](https://umap.openstreetmap.fr/), a browser-based mapping application. With uMap, you can upload GPS locations, add detailed descriptions, and visually organize your hikes. This project automates repetitive tasks, making it easier to update and maintain your hiking maps.

---

### Example Map

Below is an example map generated using the workflow described in this guide:

<iframe width="100%" height="300px" frameborder="0" allowfullscreen allow="geolocation" src="//umap.openstreetmap.fr/en/map/seletar-test-map_1240819?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true"></iframe>

<p><a href="//umap.openstreetmap.fr/en/map/seletar-test-map_1240819?scaleControl=false&miniMap=false&scrollWheelZoom=true&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true">See full screen</a></p>


## Route Tracking with MapsMe and KML Files

1. **Track Your Hike with MapsMe**  
  We use the MapsMe app to track our hikes because it provides the most detailed information about hidden routes and trails.

2. **Export the Route as a KML File**  
  After completing your hike, export the route from MapsMe as a KML file.  
  - A KML (Keyhole Markup Language) file is a standard format for storing geographic data, including routes, waypoints, and markers.  
  - MapsMe exports the KML file as a ZIP archive (e.g., `Bukit brown hike.zip`).

3. **Import the Route into uMap**  
  - Extract the KML file from the ZIP archive.
  - Import the KML file into uMap to visualize and interact with your hiking route.
  - uMap offers better interactivity for sharing, annotating, and customizing your map.



## Features & Scripts


### calculate-long-lat.js

This script automates the extraction and conversion of GPS coordinates from image files (using EXIF data), so you don’t have to do it manually for each image:
- Because we want exact coordinates based on where the pictures are taken
- But Umaps only accept coordinates in decimals

![alt text](image.png)


#### What each part does (with code snippets):

- **EXIF Extraction:**
  Uses the `exiftool-vendored` library to read GPS metadata from image files in a directory.
  ```js
  const { exiftool } = require('exiftool-vendored');
  const tags = await exiftool.read(fullPath);
  const latRaw = tags.GPSLatitude;
  const lonRaw = tags.GPSLongitude;
  ```

- **DMS to Decimal Conversion:**
  If the GPS data is in Degrees/Minutes/Seconds (DMS) format, it converts it to decimal degrees, which is the format required by most mapping tools.
  ```js
  function dmsToDecimal(degrees, minutes, seconds, direction) {
    let dd = degrees + minutes / 60 + seconds / 3600;
    if (direction === 'S' || direction === 'W') dd *= -1;
    return +dd.toFixed(5);
  }
  ```

- **File Processing:**
  Loops through all files in the specified directory, processes only image files, and extracts their GPS coordinates.
  ```js
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (!fs.lstatSync(fullPath).isFile()) continue;
    // ...process file...
  }
  ```

- **Output:**
  For each image, writes the filename, latitude, and longitude (in decimal format) to `output.txt`.
  ```js
  output.push(`${file}\n${latDec}\n${lonDec}\n`);
  fs.writeFileSync('output.txt', output.join('\n'), 'utf8');
  ```
  This makes it easy to copy and paste the coordinates into uMap.

#### Example Workflow:

1. Place your images in the target directory.
2. Run the script (`node calculate-long-lat.js`).
3. Open `output.txt` to find a list of filenames and their corresponding coordinates, ready to use in uMap.


### retrieve-imgur.js

This script helps you quickly extract image links and their descriptions from an Imgur album page, making it easy to copy them into uMap. This is especially useful if your images are taken on a Mac/iPhone and uploaded to Imgur for sharing.

#### What each part does (with code snippets):

- **Select All Posts:**  
  The script selects all image posts on the Imgur album page.
  ```js
  document.querySelectorAll('.PostContent').forEach(post => {
    // ...process each post...
  });
  ```

- **Extract Image and Description:**  
  For each post, it finds the image and its description (if available).
  ```js
  const img = post.querySelector('img');
  const desc = post.querySelector('.ImageDescription-editable');
  ```

- **Store Results:**  
  If an image is found, it stores the image URL and description in an array.
  ```js
  if (img) {
    results.push({
      src: img.src,
      description: desc ? desc.textContent.trim() : '(No description)'
    });
  }
  ```

- **Output for Easy Copying:**  
  Finally, it prints out all descriptions and image URLs in a format that’s easy to copy and paste into uMap.
  ```js
  results.forEach(item => {
    console.log(`${item.description}\n${item.src}\n`);
  });
  ```

#### Example Workflow:

1. Upload your images (from Mac/iPhone) to Imgur.
2. Open the Imgur album page in your browser.
3. Paste this script into the browser console and run it.
4. Copy the output and paste the image links and descriptions into uMap.

---

## Workflow Example
1. Track your hike on Maps Me
2. Export your hike from Maps Me into Umaps
3. Use `calculate-long-lat.js` to generate GPS coordinates for your images.
4. Use `retrieve-imgur.js` to extract image links from Imgur.
5. Upload the coordinates and image links to uMap for a complete, interactive hiking map.

---

## About uMap
- **uMap** is a free, browser-based mapping tool that allows you to create custom maps with GPS locations, images, and detailed descriptions. It is ideal for documenting hikes and sharing them with others.

---

Feel free to update this guide as your workflow evolves!

---

## Thank You & Further Resources

Thank you for reading this guide! If you found it helpful or have suggestions, feel free to contribute or reach out.

You can also check out the project repository for scripts, updates, and more details:

[GitHub: walakaka77/hash-hunting-optimisation](https://github.com/walakaka77/hash-hunting-optimisation)
