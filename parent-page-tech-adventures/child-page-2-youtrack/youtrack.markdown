---
layout: page
title: Youtrack
permalink: /tech-adventures/youtrack
parent: Tech Adventures
#has_children: true 
nav_order: 2
# index: 'yes'
# follow: 'yes'
has_children: true 
index: 'yes'
follow: 'yes'
description: The Jekyll Blog section will detail the different features of Youtrack that has been utilized or explored by myself when implementing Youtrack at my work. More details are available in the individual articles!
image: ../../parent-page-tech-adventures/child-page-2-youtrack/image-tech-adventure-youtrack.png
---



# What is Youtrack?

Youtrack is a project management tool. At the very basic level -- it allows you to create tasks with multiple statuses such as `in-progress`, `done` etc.
The aim is to help organize, and track these tasks to completion.
![image showing youtrack list of issues](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-showing-youtrack-list-of-issues.png)


More than just a task list, youtrack also has powerful features that allows for organizing these activities:
1. User Management: You are able to manage users and their access level
![Image showing different options to manage access for users](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-showing-different-options-to-manage-access.png)
2. Projects and Organizations: You can segregate different tasks based on their context
![Image showing demo projects for organization](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-showing-demo-project.png)
3. Workflows: The most powerful feature of all -- you can create and customize complex workflows that are specific to your needs
![image showing customizability for youtrack workflows](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-showing-customizability-youtrack-workflows.png)

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


![image showing a swimlane diagram of the workflow specifid in the above sequence](../../parent-page-tech-adventures/child-page-2-youtrack/grandchild-page-1-run-youtrack-locally/image-tech-adventures-youtrack-workflow-2.drawio.png)


## Conclusion

The conclusion here is that Youtrack has powerful features that allows your to organize the workflows that you have specific to your project team or company.
I've personally been a little more involved in administering youtrack at my workplace, and have learnt to enjoy the benefits of standardizing the development team's flow.

In this section, we'll aim to share my learnings so that you guys can comment on what can be improved. It's also a big bonus if I'm able to share some new insights regarding how we can configure youtrack so that it's optimized for our use case.

Peace and Love <br>
Shafik Walakaka