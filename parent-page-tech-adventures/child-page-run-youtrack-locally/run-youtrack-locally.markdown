---
layout: page
title: Run Youtrack Locally
permalink: /tech-adventures/run-youtrack-locally
parent: Tech Adventures
#has_children: true 
#nav_order: 6
---



# Youtrack

Youtrack is a project management tool. At the very basic level -- it allows you to create tasks with multiple statuses such as `in-progress`, `done` etc.
The aim is to help organize, and track these tasks to completion.
![image showing youtrack list of issues](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-showing-youtrack-list-of-issues.png)


More than just a task list, youtrack also has powerful features that allows for organizing these activities:
1. User Management: You are able to manage users and their access level
![Image showing different options to manage access for users](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-showing-different-options-to-manage-access.png)
2. Projects and Organizations: You can segregate different tasks based on their context
![Image showing demo projects for organization](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-showing-demo-project.png)
3. Workflows: The most powerful feature of all -- you can create and customize complex workflows that are specific to your needs
![image showing customizability for youtrack workflows](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-showing-customizability-youtrack-workflows.png)

This is a brief introduction for youtrack -- but for more details regarding youtrack functionalities, you guys should checkout the [official youtrack documentation](https://www.jetbrains.com/help/youtrack/server/introduction-to-youtrack-server.html)


## Motivation

So there's recently been a big push for documentation at work -- which also calls for increased effort for organizing workflows. Hence, I've been motivated to explore Youtrack more so that I can have the tool do the heavy lifting -- and then I can laze out <br>
![image of the word motivation to represent this section defines my motivation](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA74gL1j0YslWuc_rHDJGqMYK9wW-zGBxBTAO14J-KM_FeaKsDQhlYjJrHSpfZR2O4P5I&usqp=CAU)

But to test these functionality out, I can't really test on the production system that is used by my organization, so we had to solve for that shit.
And here we go, running youtrack locally on our own machine.

Before we dive into how to host youtrack locally, I think Workflows deserve a little more explanation. Because funnily, it wasn't intuitive for me -- when someone mentioned `workflows`.


### Workflows

So what is workflows -- it's a sequence of processes undertaken by a business to achieve a business objective. This is represented in Youtrack, to help organizations/companies track and complete tasks/processes.

In Youtrack (or any project management tool in general) Workflows here refers to how a task is created, and complete. For example - a simple workflow is as follows:
1. **Issue Raised** (Status: `Open`):   
   - Realizes an improvement (e.g., Need Coffee Table) and raises issue in Youtrack
     - Need probably arises from hungry colleagues

2. **Issue Routes to Senior** (Status: `Pending Review`):   
   - Issue needs to be reviewed by Superior
     - If changes required, issue goes back to me (e.g, need to specify coffee table with 3 legs)
       - Here, status: `Open`, and routes back to me
     - If approved, routes to boss for approval

3. **Issue Pending Approval** (Status: `Pending Approval`):   
   - Routes to boss for approval

4. **Issue Approved** (Status: `Pending Procurement`):   
   - Once approved -> Goes to Procurement Team

5. **Item Procured** (Status: `Pending Receipt`):   
   - Once procured -> Pending Receipt

6. **Item Received** (Status: `Pending Installation`):   
   - Once received -> Installation Team (Me), proceeds to setup coffee table

7. **Item Installed** (Status: `Pending Verification`):   
   - Checks with hungry colleagues
     - If Hungry colleagues isn't happy with the installation, they will route it back to me for verification
       - Here, status goes back to `Pending Installation`
     - Hungry colleagues okays the installation. We proceed to close the issue
       - Here, issue status: `Closed`


![image showing a swimlane diagram of the workflow specifid in the above sequence](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-tech-adventures-youtrack-workflow-2.drawio.png)


## How to Run Youtrack Locally

Now that we have an appreciation of the possibility of Youtrack, let's circle back to how we can spin up a youtrack instance in our own local machine.
Why -- so that we can fiddle around with it, without breaking the actual production system used by our organization.

So here are the steps taken by me on how to run Youtrack Locally. This instruction is specific for Windows:
1. Download the Youtrack zipped distribution from the [official youtrack website](https://www.jetbrains.com/youtrack/download/get_youtrack.html#section=server)
![image showing the youtrack zipped distribution download](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-showing-youtrack-zip-distribution-download.png)
2. If you are paranoid, cross check the checksum value -- to ensure integrity of the downloaded file
    - After downloading, you can access [this link](https://download.jetbrains.com/charisma/youtrack-2023.3.24329.zip.sha256?_gl=1*1yz46d1*_ga*NjQ2MDk4ODEyLjE2OTQ5MDk5Nzg.*_ga_9J976DJZ68*MTcwODE0NjIwNS4xOC4xLjE3MDgxNDYzMDEuNTkuMC4w&_ga=2.25917373.1013223072.1708072202-646098812.1694909978&_gac=1.222588521.1708131542.CjwKCAiArLyuBhA7EiwA-qo80BkeP7drpmHVI5p7QdKTYs1khgVVhZ3guD6GQl6E3cD-fsDBEFd9GhoCt-EQAvD_BwE) to check the HASH <br>
    Note: This link may change, as youtrack update their versions -- so be sure to use the official youtrack link instead
    ![image showing the page displayed by youtrack post-download](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-youtrack-post-download-page.png) 
    - Click on the SHA256 Checksum button to view the checksum
    ![image showing the youtrack checksum](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-of-youtrack-checksum.png)
    - Open Windows CMD in your downloads folder, and run the certuil command to check `certutil -hashfile <filename> SHA256`
    ![image showing successful certutil command](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-showing-the-successful-certutil-command.png)
3. Next, copy the youtrack zipped into a desired location, and extract the contents
![image showing extracted youtrack content](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-showing-extracted-youtrack-content.png)
4. As per the instructions in the [official youtrack documentation](https://www.jetbrains.com/help/youtrack/server/install-youtrack-zip-installation.html#be4e955f_47), enter the `Bin` folder and run the following command: `.\youtrack.bat run`
![image showing command to start running youtrack](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-showing-running-the-command-to-start-youtrack.png)
5. An installation wizard will start and you can simply follow through the wizard to complete setting up youtrack on your local. Details of the configuration wizard can be found [here!](https://www.jetbrains.com/help/youtrack/server/install-youtrack-zip-installation.html#installation-procedure)
    - Note: Based on the documentation, you should configure your youtrack on `http://localhost:8080`, as youtrack listens to this location by default
    - However, for my case -- the default URL used was my machine name. So I configured youtrack at `http://desktop-rg06vpp/`
6. Once you have configured the Wizard, you can access Youtrack on your own Local instance! <br>
![Image of my successful youtrack instance running](../../parent-page-tech-adventures/child-page-run-youtrack-locally/image-of-success-youtrack-instance-running.png)

For more details -- do refer to the [official documentation](https://www.jetbrains.com/help/youtrack/server/install-youtrack-zip-installation.html).
Ofcourse, if you guys have other inputs to add -- would be more than happy to take some KT (Knowledge Transfer) from you guys ^^

Now -- we have youtrack running locally on our machine. We can then perform test configurations based on the workflows or settings that are desired, and then propose them to management/IT Support/PM Team (whoever manages youtrack for your organization).

Hope this helps! Definitely helped me consolidated my understanding creating this piece.

Peace and Love <br>
Shafik Walakaka