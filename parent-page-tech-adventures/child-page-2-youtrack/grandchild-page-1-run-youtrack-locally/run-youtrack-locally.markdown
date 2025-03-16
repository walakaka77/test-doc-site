---
layout: page
title: Run Youtrack Locally
permalink: /tech-adventures/run-youtrack-locally
parent: Youtrack
grand_parent: Tech Adventures
#has_children: true 
nav_order: 1
index: 'yes'
follow: 'yes'
description: This section shows the steps that I have taken to be able to run youtrack locally on my machine.
image: ../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-youtrack-run-youtrack-locally.png
---


# How to Run Youtrack Locally

Now that we have an appreciation of the possibility of Youtrack, let's circle back to how we can spin up a youtrack instance in our own local machine.
Why -- so that we can fiddle around with it, without breaking the actual production system used by our organization.

So here are the steps taken by me on how to run Youtrack Locally. This instruction is specific for Windows:
1. Download the Youtrack zipped distribution from the [official youtrack website](https://www.jetbrains.com/youtrack/download/get_youtrack.html#section=server)
![image showing the youtrack zipped distribution download](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-showing-youtrack-zip-distribution-download.png)
2. If you are paranoid, cross check the checksum value -- to ensure integrity of the downloaded file
    - After downloading, you can access [this link](https://download.jetbrains.com/charisma/youtrack-2023.3.24329.zip.sha256?_gl=1*1yz46d1*_ga*NjQ2MDk4ODEyLjE2OTQ5MDk5Nzg.*_ga_9J976DJZ68*MTcwODE0NjIwNS4xOC4xLjE3MDgxNDYzMDEuNTkuMC4w&_ga=2.25917373.1013223072.1708072202-646098812.1694909978&_gac=1.222588521.1708131542.CjwKCAiArLyuBhA7EiwA-qo80BkeP7drpmHVI5p7QdKTYs1khgVVhZ3guD6GQl6E3cD-fsDBEFd9GhoCt-EQAvD_BwE) to check the HASH <br>
    Note: This link may change, as youtrack update their versions -- so be sure to use the official youtrack link instead
    ![image showing the page displayed by youtrack post-download](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-youtrack-post-download-page.png) 
    - Click on the SHA256 Checksum button to view the checksum
    ![image showing the youtrack checksum](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-of-youtrack-checksum.png)
    - Open Windows CMD in your downloads folder, and run the certuil command to check `certutil -hashfile <filename> SHA256`
    ![image showing successful certutil command](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-showing-the-successful-certutil-command.png)
3. Next, copy the youtrack zipped into a desired location, and extract the contents
![image showing extracted youtrack content](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-showing-extracted-youtrack-content.png)
4. As per the instructions in the [official youtrack documentation](https://www.jetbrains.com/help/youtrack/server/install-youtrack-zip-installation.html#be4e955f_47), enter the `Bin` folder and run the following command: `.\youtrack.bat run`
![image showing command to start running youtrack](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-showing-running-the-command-to-start-youtrack.png)
5. An installation wizard will start and you can simply follow through the wizard to complete setting up youtrack on your local. Details of the configuration wizard can be found [here!](https://www.jetbrains.com/help/youtrack/server/install-youtrack-zip-installation.html#installation-procedure)
    - Note: Based on the documentation, you should configure your youtrack on `http://localhost:8080`, as youtrack listens to this location by default
    - However, for my case -- the default URL used was my machine name. So I configured youtrack at `http://desktop-rg06vpp/`
6. Once you have configured the Wizard, you can access Youtrack on your own Local instance! <br>
![Image of my successful youtrack instance running](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-of-success-youtrack-instance-running.png)

For more details -- do refer to the [official documentation](https://www.jetbrains.com/help/youtrack/server/install-youtrack-zip-installation.html).
Ofcourse, if you guys have other inputs to add -- would be more than happy to take some KT (Knowledge Transfer) from you guys ^^

Now -- we have youtrack running locally on our machine. We can then perform test configurations based on the workflows or settings that are desired, and then propose them to management/IT Support/PM Team (whoever manages youtrack for your organization).

Hope this helps! Definitely helped me consolidated my understanding creating this piece.

Peace and Love <br>
Shafik Walakaka