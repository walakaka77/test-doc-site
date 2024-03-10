---
layout: page
title: Domain, DNS Concepts
permalink: /tech-adventures/custom-domain
parent: Tech Adventures
index: 'yes'
follow: 'yes'
---

# Custom Domains, DNS

In this section, we plan to provide our understanding of custom domains and DNS. Specifically how these concepts help us access the sites across the internet. To understand these, we'll go through the following:

1. Example Flow of Computers Communicating
2. Basic Understanding of IP Address
3. Custom Domains and DNS


![Image showing the 3 pillards -- computer communication, IP address and custom domain, dns](../../img/tech-adventure-img/tech-adventures-comms-ipaddress-domaindns.png)

## Example Flow of Computers Communicating

In my mind, computers are thought of as machines that has the ability to perform processes. These processes generate desired such as:
- Displaying the computer screen that you are viewing now
- Performing mathematical computations
- Running complicated algorithms etc., you guys get the point

![An image showing interconnectivity between computers over the internet](https://nsfgradfellows.org/wp-content/uploads/2021/07/AdobeStock_67901546-2-750x400.jpg){:width="50%"}


Computers do not work in Silo's to generate the desired outputs. Computers need to communicate with other computers. An example flow is as follows:
1. Log into a computer, let's call it `computer_client` and access the browser
2. Next, you'd want to visit a website -- say `blog.shafikwalakaka.com`. This is done by entering the domain of the computer in the browser and hitting enter
3. On hitting enter, `computer_client` needs to retrieve the relevant details from another computer that contains all the information for displaying `blog.shafikwalakaka.com`. 
  - Let's call this `computer_server`
4. For `computer_client` to be able to connect to `computer_server`, `computer_client` would need to know the IP address of `computer_server`.
  - IP addresses are how all computers communicate in this world
  - IP addresses are a bunch of string that is unique to identifying a computer. For example, `185.199.111.153`
5. Once the request has been received by `computer_server`. `computer_server` must reply with a response to `computer_client`. And yes -- `computer_server` will need to specify the IP address of `computer_client` to return the relevant details.

![Image showing the basic flow of client server communication](../../img/tech-adventure-img/client-server-basic-2.drawio.png)

Hold the 5 step process above, and we will tie it all together at the end of this article.
The next section will discuss on the mechanism on how computers communicate.

## Client and Server

This is the fundamental mode of communication for computers. Similar to humans, when computers communicate, there is always an initator and a recipient.
In technical jargon terms:
  - The initator of the conversation is referred to as the `client`
  - The recipient of the conversation is referred to as the `server`

![Image showing a client reaching a server over the internet](https://www.shutterstock.com/image-vector/client-server-communication-vector-illustration-600nw-2280967531.jpg)

So the client initiates the request, and the server provides the response.

The above concept is fundamental to understand, before we proceed to the next sections.

Disclaimer -- you can also deep dive into what is the content of a request and a response etc. But for now, you can imagine that the client is asking a question and the server is responding with an answer. And both the client and the server are just computers in different locations.

Now we know what clients and servers are, we need to know how they can communicate. 
There are thousands of computers out there connected to the internet, how does the client specify which server to send the request to?

## IP Addresses

IP addresses are unique to each server that is accessible over the internet. IP addresses are how clients specify which server it should reach out to.

IP addresses are a rabbit hole -- you can go deep into details such as:
  - Who manages the IP addresses
  - How are IP addresses assigned 
  - What are the IP addresses that can be assigned etc.

But for this article, we just need to know that IP addresses are unique strings that are associated with a server. These IP addresses are what clients use when sending a request to a server.

![Image showing two computers communicating using IP addresses](https://www.homenethowto.com/wp-content/uploads/two-computers-on-same-ip-network.jpg)

There are two types of IP addresses -- IPV4, IPV6
  - IPV4 looks like this `185.199.111.153`
  - IPV6 looks like this `2606:50c0:8000::153`

They serve the same purpose - to allow the client to reference a server when they need to communicate, just that there are more IPV6 available (as there are more permutations available due to additional characters).

So taking the earlier example, suppose `computer_client` wants to retrieve information from `computer_server`. `computer client` would need to send a request to an IP address that is associated with `computer_server`. `computer server` will reply with a response to the `computer_client` IP address -- the response will contain all the data required to display the `blog.shafikwalakaka.com` site.

Now that the communication loop is complete, we can further ask -- why the need for custom domain name? Since the communication between computers can be completed solely, with IP addresses?

### Your IP Address

If you are thinking, it seems that the server needs to know my computer's IP address. This is technically true. As you are loading this screen, you are `computer_client` sending request to `computer_server` for details to show `blog.shafikwalakaka.com`.

Any outgoing request will include your IP address, so that the server can respond to your accordingly. If you are curious to what is your IP address, you can check it out at the following website -- [What is my IP?](https://whatismyipaddress.com/).

You can see your IP addresses displayed below:
![Image showing how to find your public IP address by accessing whatismyipaddress.com](../../img/tech-adventure-img/tech-adventure-whatismyip.png)

## Custom Domains and DNS

Customa Domain names are user friendly strings of text that are actually mapped to IP addresses. This way, users such as you and I do not need to remember the IP addresses of the `computer_server`.

Taking the above example, suppose `blog.shafikwalakaka.com` data is stored in `computer_server`. `computer_server` has an IP address of `185.199.111.153`. It would be very difficult for users to remember `185.199.111.153` everytime they want to visit this blog.

Note: There are multiple sites that users visit and not just the blog. Each site is hosted in a server. Which means each site has an associated IP address. Remembering all these IP addresses would be unbearable and not feasible.

To solve this problem -- come custom domain names. In our example, `blog.shafikwalakaka.com` are custom domain name and can be mapped to IP addresses such as `185.199.111.153`. 

![Image showing domain names mapped to IP. Records maintained by DNS provider](../../img/tech-adventure-img/tech-adventurse-domain-ip-mapping.png)

This is handled by the Domain Resolution Service (DNS). These are providers who's job is to maintain a mapping between the domain name an IP address. Everytime a client is going to make a request to a server, it first reaches out to the DNS service to find the IP address. Once the IP address is ascertained, the client will send the relevant reqeust to the server.

So instead of entering `185.199.111.153`, you and I can just simply access the website at `blog.shafikwalakaka.com`.
`computer_client` will know the IP address `185.199.111.153` based on the domain DNS service, and then send the necessary request to the `computer_server`.

## Putting it Together

Now we go back to the original user requirements -- to be able to reach `blog.shafikwalakaka.com`.

1. Log into `computer_client`
2. Access the browser, search for `blog.shafikwalakaka.com` and hit enter
3. The `computer_client` now checks against the DNS for the IP address of `blog.shafikwalakaka.com`
  - Sends a request to the DNS service for `blog.shafikwalakaka.com`
  - Receives a response that states `185.199.111.153`
4. Now that `computer_client` knows the IP address, it will send a request to `185.199.111.153` for the website details
  - Request for website details sent to `185.199.111.153`
  - Response for website details received from `185.199.111.153`
6. `computer_server` receives the request and also the `computer_client` IP address. `computer_server` processes the requuest and returns the response (which includes all the details to show the site) to `computer_client` IP address
5. `computer_client` now has all the details to show the site that you are on. It takes the data in the response received, formats it nicely and shows you this nice piece of text for your consumption

![Image showing traffic flow for client server interaction with dns resolution](../../img/tech-adventure-img/client-server-basic-w-dns.drawio.png)

And that's all folks -- just note that there are technical nuances that were skipped and oversimplified above. But the idea is to have a good understanding of how computers communicate. 

With this understanding, we'd be able to go one level lower and scrutinize the actual process that actually runs to send, receive and parse this information. But that's irrelevant for the scope of this article.

## Thank you

Thanks for those who reached the end -- hope it was useful. 

I come from a non-technical background, and was really overwhelmed by the technical jargons. But I realized that once you understand the flow of how it works -- they're really just industry specific jargons that is used to communicate concepts efficiently. 

When broken down, the concepts are actually very logical and step-by-step -- anyone who is interested in how it works would be able to understand it. But need that geek in you to come out yah

Thank you! <br>
Peace and Love<br>
Shafik Walakaka