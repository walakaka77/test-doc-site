---
layout: page
title: Sev 1 Troubleshooting
permalink: /tech-adventures/wordpress/sev-1-troubleshooting
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 10
index: 'yes'
follow: 'yes'
description: Sev 1 issue taking the site completely down. See our troubleshooting steps!
image: ../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-4-heic-images-incompatible-browser/heic-image-incompatible-browser.png
---

# Sev 1 -- Complete Downtime for our Site

{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

In this article, we'll take you through the painful steps of troubleshooting -- when there are multiple components and parties involved.

When that happens, it's important to think through logically, follow the traffic flow -- and understand the root cause.
Without understanding the root cause of the problem -- we will not be able to fix it.

{: .note}
But funnily -- we still do not know the root cause of the problem, and the issue is still under internal investigation. It's highly possible that it was our fault -- outdated plugins etc., but unlikely -- for reasons we would elaborate further in this article.

## Issue Discovered -- Sat, 12 Apr at 6:36 PM

We realised that our site was loading incorrectly. On further inspection -- all of the assets such as JS scripts etc., were returning 404.

![Assets returning 404](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/assets-returning-404.png)

The first thought would be
- Was there a wordpress update
- Was there a plugin update (we use elementor)

So we tried to access our `wp-admin` page, but even that page was failing to load:
![WP admin page failing to load](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/wp-admin-failing-to-load.png)

{: .note}
This is a clear indication that it's not a plugin breaking the issue -- at least not the elementor pluging or caching plugin. Because we don't cache the `wp-admin` page and the `wp-admin` page is also not built using Elementor

## Troubleshooting Incorrectly

So when troubleshoot, we first need to know
1. The expected behaviour
2. The current behaviour
3. Then we can start tracing the user flow, traffic flow and check logs to see what happens

Without this logical thinking -- you're bound to incorrectly infer a fault. And then the fix will also be incorrect!

### Incorrect assessment -- Apr 12, 2025, 9:08 PM

As you can see, the support team proceeded to check the logs without first understanding what was breaking:
![support team incorrect assessment](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/incorrect-assessment-from-support-team.png)

The error message indicated the following:
```bash
==
2025-04-12 20:43:27.501458 [NOTICE] [1523396] [T0] [127.0.0.1:42226>203.142.4.28#APVH_petcoach.sg] [STDERR] WP-Optimize: No caching took place, because the plugin location could not be found\n
==
```

So the support team inferred that this was the cause, and disabled the Elementor plugin. There is many things wrong with this step:
1. Firstly, `WP-Optimize` is a caching plugin. A simple google search would be able to find that
2. If the error is due to the `WP-Optimize` plugin, then why disable the `Elementor` plugin? This step makes zero sense
3. Furthermore, the `WP-Optimize` plugin was actually already deleted from this wordpress site. So the error message although valid -- is probably not the cause of error, because it's expected for the plugin not to be found
  - Sure, there is no caching that took place
  - But why would that result in the site loading incorrectly?
  - It should result in the site loading slower
4. Lastly, they proceeded to disable the `Elementor` plugin, in the production site itself, without consulting us
  - Sure, the site is already broken -- what is there to lose. But what if they did this to a working site, their fix would actually break the site
  - Next, they highlighted to us that the site is now loading correctly. But obviously -- the site was not loading correctly because the site was build on elementor. Now that you have disabled the page builder, the wrong set of information is being served to the user

{: .warning}
Mind you, all these were happening directly in Production environment, without any consideration of how it would further impact the site.


## Back and forth on troubleshooting

As the support team was handling the matter incorrectly, we had to further highlight specific findings on our end -- so that they are aware that they need to thoroughly investigate:

1. We highlighted that the `wp-admin` page is still broken, even after they disabled the elementor plugin. Which means they did not fix the correct issue
  - We also shared screenshots with assets returning 404
  ![assets still returning 404](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/assets-still-returning-404.png)
2. We had to highlight to them that it's not a valid finding -- the logs on `WP-Optimize`. This is unacceptable, as they should have been able to clone the site and test and check on their own
![Incorrect troubleshooting steps highlithed](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/email-specifying-incorrect-troubleshooting-steps.png)
3. On top of that, we actually cannot even log into our `wp-admin` dashboard. This indicates a deeper issue, probably at the infrastructure or server level
![Unable to log into wp-admin dashboard](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/unable-to-login-wp-admin-dashboard.png)
  - Access petcoach.sg/wp-admin --> site is loaded with broken styles
  -  Enter password, username --> hit the error


## Further incorrect troubleshooting

Subsequently, there is further back on forth on incorrect troubleshooting and we had to highlight to them why their approach was not correct.

### Proposed to restore the site -- Apr 12, 2025, 9:29 PM

Their support team was not focussed on trying to find the root cause. Instead, they are trying the approach we term `deploy and pray` lol. 

If this was at my workplace, I'll get F**king wrecked by my boss lol. But whatever, right -- the support team just wants the latest working backup, so that they can restore it (and I'm guessing hoping for it to work?). See the screenshot below:

![deploy and pray](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/deploy-and-pray.png)

### Highlighted that a deploy and pray approach is poor

So, we had to inform them further, why restoring a backup is unlikely to work -- hoping to point them in the correct direction ofcourse:
- Why would restoring a backup help?
- What was the root cause of the assets returning 404?
- Why can't we login to the `wp-admin` site?
- Are you planning to restore the backup to a separate server and test it? If not, what are you planning to do with the backup -- just restore and hope?

These were all communicated to the support team, in the screenshot below:
![request for root cause analysis](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/request-root-cause-analysis.png)

{: .warning}
Nagging a little bit, but from a software delivery background -- it pisses me off, the deploy and pray strategy. Because it's been drilled into us, that you MUST know for a fact -- how to resolve the issue. At least in most cases.

Funny thing is that, we have more incorrect assessment being throwned at us! It's like they are randomly inferring what logs say and blaming the error in the logs for the page being incorrectly served!

### Further incorrect assessment -- Apr 12, 2025, 10:51 PM

As previously, mentioned -- more incorrect logs being referenced. Sure there are errors, but not all error would cause the site to be down. It's a terrible approach to randomly find errors in logs, and say that it's the cause of the issue.

![incorrect assessment of elementor logs](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/incorrect-assessment-elementor-logs.png)

So they found these set of errors, are are damn convinced that elementor somehow has brought my site down:
```bash
==
2025-04-12 22:45:24.764015 [NOTICE] [1644055] [T0] [127.0.0.1:52932>2001:4860:7:50d::fd#APVH_petcoach.sg] [STDERR] PHP Warning:  Trying to access array offset on false in /home/petcoach.sg/httpdocs/wp-content/plugins/elementor/includes/base/widget-base.php on line 223\n
2025-04-12 22:45:24.764107 [NOTICE] [1644055] [T0] [127.0.0.1:52932>2001:4860:7:50d::fd#APVH_petcoach.sg] [STDERR] PHP Warning:  Undefined array key -1 in /home/petcoach.sg/httpdocs/wp-content/plugins/elementor/includes/base/controls-stack.php on line 695\n
==
```

Ahh, another set of advise -- for main providers such as `Elementor` or `Stripe` etc. -- if there is an issue, the issue most likely lies with you.
Because if the issue is with them, all other sites with the same configuration as you would be facing it.

If they are -- then you can easily find the results in the forums.


### Remind them that their assessment did not make sense

So -- we had to remind them that the assessment did not make sense:
1. Elementor is not used to build the `wp-admin`
2. The `wp-admin` is broken, so what caused this. The fundamental question is not even answered

To which -- they replied that they will be restoring the site, and inform us once done:
![deploy and pray in action](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/deploy-and-pray-in-action.png)

Firstly, I already disagree with the appraoch -- but since we don't have access to their servers, and had no one better to communicate with, we'll wait out and see.

The least they can do is to provide a plan to update us periodically -- especially given that this is a severity 1 issue.

## Lack of Customer Updates

This is where they literally failed lol -- no updates, no ETA.
Just a vague plan to restore the backup with no clear understanding of the problem.

There isn't much to say here -- because we were simply waiting for their team to get back to us. But they didn't

![lack of customer management](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/lack-customer-management.png)

### Drastic Measures Taken

We had to engage a separate hosting provider, to spin up the resources. This costed us approximately SGD 3000!

{: .note}
Sure -- the price of the resource were relatively affordable. But finding someone with the skillset to restore a full production site, with minimal issues -- was tough. And we wanted the site up fast, so we were happy to pay a premium for it!

Steps to restore the site can actually be found in previous articles:
  - First, we need to [spin up a wordpress installation](/tech-adventures/wordpress/wordpress-server-from-scratch)
  - After that, we need to [restore our production site](/tech-adventures/wordpress/restore-my-wordpress-site)


### Additionally -- Rubbish Error Logs Referenced

The error logs mentioned above were rubbish -- because once we restored our site, it was working well!

Furthermore, we can see that the site functions well with the error logs!<br>
And even when the site does not function well, it results in layout issues for the site -- not Full Downtime of the whole site -.-! See the screenshot below to see what the error should look like:
![elementor error results in minor layout issue](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/minor-layout-issue.png)

- Firstly, this is a simple fix. Background simply cannot be null -- just add a classic overlay but leave it transparent?
- Secondly, it does NOT block the function of the site. This is a minor inconvenience compared to an incomplete use of the site

{: .note}
The error was picked up by our automated testing tool -- playwright. You can checkout how we use [playwright to automate our tests here!](/tech-adventures/wordpress/automated-testing-plugin-updates)


### Root Cause was incorrect

Furthermore, the root cause was obviously incorrect -- because we restored the exact same codebase and database from our production site `petcoach.sg` into a different server, and it worked just fine with a few minor tweaks:
- No updates of plugins
- No updates of elementor
- The error messages still shows, but no major issues
- `wp-admin` page was loading correctly

This is key evidnece that the root cause analysis was improperly done, before they proceeded with changes in the production environment -- unacceptable negligence.


## Escalation to a separate Team

The support team escalated the issue to a separate engineer. The engineer was more competent and have a structured way of resolving the issue:
1. First, he cloned the site -- so that he can investigate and test on a test site
![clone the site so that he does not further mess up production](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/clone-site.png)
2. Next, he checked forums to see if the issues were previously surfaced
![sought community help to check pre-existing issues](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/check-pre-existing-forums.png)
These steps provided assurance that the team is now capable of taking little steps to figuring out the issue.
3. His fix was to update the php version, based on the forum findings, and it fixed the page being served incorrectly (or so it seems...). I'm not fully sure yet -- but I can't say otherwise, because the results shows for itself
![page loaded correctly after php update](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/page-loaded-correctly.png)
4. I verified it and we close the issue
![Issue closed after verification](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/issue-closed.png)

### Why not convinced of php update

I'm not convinced of the php update (especially the error message), pointing to the correct root cause. I believe that the team has incorrectly attributed the error logs to the page loading incorrectly.

In the forum that was shared by the support team [here](https://wordpress.org/support/topic/error-on-elementor/), the issue was with errors being printed even when `WP_DEBUG` was set to `false`.
![forum issue w error message on FE](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/error-message-fe.png)

Now, we faced this ourselves in our playwright tests -- see the screenshot again here:
![elementor error results in minor layout issue](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/minor-layout-issue.png)


So this error exists sure, and the forum addresses this error.<br>
But nowhere in the forum did I see issues where:
- assets are returning 404
- `wp-admin` login page is failing etc.


These are issues that are critical, compared to layout issues. 

{: .note}
I am not saying that updating php did not fix the issue. It might have fixed the issue -- but we do not know the underlying root cause for now.

## Next Steps

Without knowing the root cause, the issue could very well appear again so the team has launched an internal investigation and will update me on the issue:
![internal investigation](../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-10-sev-1-troubleshooting/internal-investigation.png)


Now, whilst the case has finally been resolved -- it has significant implications on our business revenue, and downstream impact on our SEO efforts.

See how our [favicon was lost](/tech-adventures/wordpress/favicon-missing) due to the downtime. It was good learning for us -- but costly for the business.


And more importantly, the support team should be taking (I believe they are) steps to strengthen their processes. <br>
You cannot simply guess a root cause, and make changes in production in an attempt to fix it. This is completely unacceptable.

That lapse, was below industry standard for sure -- and I'm certain that they would fix it!

Learning points for me too -- considering I'm in the same industry

## Thank you!

That's all -- sounds like a rant.
But almost like a productive rant :)

Much learnings, to both myself and the support team. Hope we come out of this better and stronger.