---
layout: page
title: Tech for the layman - WIP
permalink: /tech-adventures/tech-for-the-layman
parent: Tech Adventures
#has_children: true 
#nav_order: 6
---



# Tech for the Layman

Dear Friends and Family, been taking some time recently to consolidate my understanding of how technology works. Personally, I found that the best for me to test my understanding is to break down my understanding and explain these concepts so that the layman can understand.

Note: No issues there -- I'm a layman myself, so will self-check this article when done lol

So, as a revision to all that I've picked up regarding tech, we're gonna paint a picture of how I view the tech world from my lenses. 

In the spirit of breaking down these complex concepts for the layman, I've decided to draw parallels between how humans and computers processes information:
- **Human information processing:** A little bit of neuroscience
- **Computer information processing:** Standard Information Technology (IT)

Since most people would be familiar with how humans process information, the idea is that this would bridge the gap and help convey the technical concepts in a more relatable manner.

Huge disclaimer, so that we don't anger the scientific community with any of the metaphors in this article! The sole purpose of this article is to convey the concepts of how information is processed within computers, and we use a little bit of neuroscience to bridge the gap. The information regarding neuroscience are not meant to be technically accurate. Instead, it's a tool to describe the flow of information.

That being said, if there is anything radically wrong in my understanding - please do reach out to me, and it's our pleasure to improve the article to be more precise.
But until those feedback are received, here goes ^^!

## The Fundamental Unit of Information Storage
All information is stored in a standardized manner. This is definitely true for computers, and we would assume for it to be true for humans (for the sake of this article).

In humans, we store these as neural connections.
Whereas in computers, these are stored as binary bits.

Confused? Don't worry, the explanation is in the following paragraphs.

### Neurons, Neural Connections in our brains

In humans, we assume that the lowest level information can be stored as a neural connection. When you learn a concept or a skill, new neurons can be created. These neurons can be thought of as special cells that can transmit electrical signals within your brain. 

![image of two neurons connecting to each other via a synapse](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-two-neurons-connected-over-a-synapse.png)

When recalling any learnt concept, electrical signals would need to be transmitted. The ability to transmit electrical signals from one neuron to another neuron is considered a neural connection. This connection is the fundamental unit of how information is stored in humans.

We'll stop here for neurons and neural connection and build on it more in the next section.

### Bits in Computers

In computers, the lowest level of information would be a `bit`. A bit stands for binary digit and it can only be represented as a 0 or 1. All information in computers are represented in this format at the lowest level, including this article that you are reading.

For example, numerical values in computers is dependent on their architecture. Hypothetically, a 4-bit architecture would be able to store 16 values:
- The number `zero` is represented as `0000`
- The number `one` is represented as `0001`
- The number `two` is represented as `0010`

As there are 4 digits, we have 16 permutations (2^4) that can be used to represent a numerical value (0 - 15). 

![image showing the binary representation of 0 - 15](https://content.instructables.com/FSM/GFJW/IKYG9OLC/FSMGFJWIKYG9OLC.png?auto=webp&frame=1&fit=bounds&md=319f7cdfd3af91962f90665331095e6b)

The above example is not unique to numerical values. It applies to all information stored in a computer from the alphabets that you are reading to complex applications such as microsoft word or your browser.

We will circle more to elaborate on my personal mental model on how binary information (a.k.a. bits) are translated into running applications. But this is a sufficient starting point for now.

## How Humans and Computers recall learnt concepts

For this article, `Learnt Concepts` refers to any capabilities that either our human body/mind or computers can perform. Further details to follow:

### Neural Patters for humans

When a behaviour or a concept is learnt, these actually create new neural connections (connections between different neurons) in the brain. These collection of neural connections are then fired everytime the learnt behaviour needs to be recalled.

The coordinated firing of neural connections is referred to as a `neural pattern`. The concepts that we learn such as:
- How to breathe (these are innate, will explain in the next section)
- What a flower smells like
- What hot water feels like etc.

![image showing a single neuron and a representation of neural pattern in a brain imaging activity](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-single-neuron-and-neural-pattern.png)

All these concepts are stored in our brain a collection of neurons that would be fired together, `neural pattern`. This is an extremely simplified take on this, but it is sufficient for us to build a mental model on how computers store information.

For example, when we smell a flower, you can assume that a specific set of neurons are being fired, `neural pattern`.
This neural pattern corresponds to brain activity that helps us interpret the sense of smell, and identify the pleasant smell of a rose etc.

### Software installation for PC

Drawing parallels to `Learnt Concepts` in humans, computers `learn` when you install a new software. A new software is any installation that you are performing:
- Your chrome browser
- Microsoft word installation

We previously discussed that all information in computers are stored as binary 1's and 0's, analagous to neurons. 
A software installation, is represented as a complex string of 1's and 0's. For example, when you install a microsoft word application, the information that is stored in your PC is stored as a complex string of 1's and 0's.

![image showing the comparison of a binary string vs neural pattern activation](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-showing-complex-binary-string-and-neural-pattern-activation.png)

Suppose you want to run the microsoft word application to do some work, the computer would need to decipher these set of 1's and 0's.
Recall how the activation of neural patterns (a set of neurons firing in a coordinated manner) allows us to recall and remember the concept of the smell of a rose flower? 
Deciphering a complex string of binary digits allows for the computer to "recall" and be able to run the microsoft word application.

To reiterate, this applices to all computer processes and we will build on this in the subsequent sections.


## Innate Cognitive Functions vs Computer Operating Systems

This section will compare the basal functions in humans and computers. These functions are low-level activity that are required before either humans or computers can perform any higher-level activity.

### Innate Cognitive Functions
Now that we have an understanding of neurons and neural connections, we can move on to the next level item -- innate cognitive functions. All humans are born with innate cognitive functions that is required for survival. These refers to primitive cognitive functions that are usually happening in our subconscious such as:
- Sensory perception (sense of touch)
- Knowing how to breath
- Sensing fear etc.

The innatve cognitive functions can also be treated as a "concept". The difference is that, these concepts are not learnt -- it's hardcoded into our brains when we were born. 

By default, when we are born, we already have neural patterns that would fire so that we know how to breathe and perform other basic cognitive functions. These can be thought of as low-level cognitive functions that would subsequently act as inputs for higher-level cognitive activites (elaborated in subsequent sections).

![image showing innate cognitive function with a hot kettle as an example](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-showing-innate-cognitive-function-hot-kettle-example-2.png)

Take the above flow as an example, when someone accidentally touches a hot kettle:
1. User accidentally touches a hot kettle. The hot kettle is the environment factor of interest
2. The heat is received by the nerve cells in his/her skin. This represents sensory perception.
3. Electrical signals are transmitted to the brain, the neural pattern is activated, and we recognize extreme heat
    - Neural patterns are also configured in our brains to trigger our reflexes to have our hand pull away from the hot kettle to prevent injury



### Operating Systems and Human Senses

The innate cognitive functions of the human brain operate much like the operating system (OS) and its associated runtime in a computer. They communicate directly with our five senses to retrieve information from the world around us. For instance, when touching a hot object, sensory receptors in our skin cells transmit signals to our brain. Our innate cognitive functions, comprised of a network of neurons, interpret these signals and infer the temperature of the object—whether it's hot or cold. This ability to interpret sensory stimuli is hardwired as neural patterns that fire coordinately. The inputs of heat and cold are received from the skin cells and nerves, facilitating a low-level communication between our innate cognitive functions and our senses, allowing us to construct our understanding of the world.

![image showing analgous comparison between computers and human](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-showing-analagous comparison-PC-Human.png)

1. **Primitive Level Functionality**: The OS and its runtime handle low-level functions such as memory management, CPU utilization, and data storage, much like innate cognitive functions handle basic bodily functions and sensory perception.

2. **Stored as Binaries**: Operating systems and runtimes are stored as collections of binaries, containing instructions necessary for executing fundamental tasks, akin to how neural patterns are stored in the brain.

3. **Foundational Functions**: Just as the OS manages processes and resources for applications, our innate cognitive functions manage sensory inputs and facilitate responses to stimuli, ensuring smooth operation and interaction with the environment.

4. **Essential for Execution**: Operating systems and runtimes provide the foundational environment required for running applications on computers, analogous to how innate cognitive functions provide the foundation for human behavior and perception.

5. **Abstraction for Higher-Level Tasks**: Operating systems abstract hardware details, allowing developers to focus on building applications. Similarly, our cognitive functions abstract sensory inputs, enabling higher-level cognitive processes such as reasoning and decision-making.


## Higher-Level Cognitive Functions vs Higher-Level Applications

Now that we have sufficient information regarding the following:
- Fundamental unit of storage
- How `Learnt Concepts` are recalled for humans and computers
- Primitive-Level Functions (Innate Cognitive Functions vs Operatings Systems)

We are ready to move on to the next layer - higher-level functions. The higher-level functions would require inputs from the lower-level functions.
We will dive deeper into these for both humans and computers in the subsequent sections

![image showing the hierarchy of sensory perception, cognitive functions etc. and focuses on higher level cognitive functions](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-showing-hierarchy-of-cogntitive-function-focus-higher-level.png)

### Higher-Level Cognitive Functions

Next, humans are capable of higher-level cognitive functions such as decision making etc. These higher-level cognitive functions do not directly communicate with the low-level sensory senses. Instead it either
- Interacts with low-level innate cognitive functions, to receive inputs
- Or it integrates with other higher-level cognitive functions, to receive inputs.

In the example of decision making, the user may be dipping his hand into an ice cold water of 4 degrees celsius (above the comfort zone). However, this activity could have been intentional, trying to complete a challenge or a dare etc. -- these are active decision making capabilities that receives inputs from multiple locations:
- Innate cognitive functions, for senses
- Understanding of previously learnt concepts -- the challange, or dare
- Many more factors comes into play, when calculating whether to keep the hand in the ice cold water

An important concept to note is that the decision making process does not directly interact with the nerve cells on the skin (sensory perception). 
Instead, the decision making process interacts with the interpretation of the information that was provided by the low-level innate cognitive functions.

![image showing the flow of env stimulus to sensory perception to innate cognitive functions to decision making, and then closing the loop when user decides to keep the hand in](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-showing-the-flow-of-env-stimulus-to-decision-making.png)

The flow is as follows:
1. **Environment:** You dip your hand in an ice-cold water 
2. **Sensory Perception:** Nerve cells in your hands pick this up and transmit electrical signals to your brain 
3. **Innate Cognitive Functions:** Neural patterns are activated in your brain, and assesses the temperature of the cold water. It assesses the pain level, threat etc.
4. **Decision Making Process:** Additional neural patterns are activated in your brain, that assesses whether we should remove our hand from the cold water. It takes in environment inputs such as:
    - The temperature of the water, that was interpreted in step #3
    - The context, in this scenario - we are playing a game, of whom can hold their hand in the cold water longest
    - After processing all these information, you decide whether to keep your hand in the cold water, or pull out

So hammering on the emhpasis for this section, higher-level cogntive functions (decision making in this scenario) takes inputs from low-level cognitive functions as well as inputs from other high-level cognitive functions (e.g., context of the scenario etc). This complex process happens within the split second and allows you to make a decision whether to stay cool and keep your hand in, or pull your hand out and lose.


These higher-level cognitive functions serve as the mechanism through which we engage in complex discussions and construct abstract concepts. They are integral to our daily interactions, allowing us to navigate cultural norms, discuss intricate ideas, and understand acceptable behavior. 

Moreover, these functions enable us to conceive of and discuss concepts that do not yet exist, such as the functionality of an application or the blueprint of a novel invention. This capacity for imagination and creation empowers us to plan, innovate, and build upon existing knowledge. It's worth noting that all these learned concepts are stored in the form of neural patterns, which are activated when we need to retrieve information or engage in higher-level cognitive processes.

### Higher-Level Applications

Now that we understand the higher-level cognitive functions in humans, we can draw parallels to higher-level applications within the computer.

To re-iterate, the operating system is analogous to the low-level cognitive functions. The operating system deals with memory management, and other tasks that communicated with the hardware. This is similar to how low-level cognitive neural patters deal directly with the five senses (input/output hardware).

![image showing the flow of env stimulus such as keyboard strokes, interpreted by the keyboard I/O, PCB, Computer OS, and then subsequently inputs passed to browser (high-level app), that would perform the relevatn actions](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-showing-the-flow-of-env-stimulus-to-higher-level-application.png)

In the computer world, a high-level application can be anything like microsoft excel or your chrome browser. Taking the chrome browser as an example, the flow would be as follows:
1. **Environment:** User switches on chrome browser and enters `google.com` on they keyboard and hit `Enter`
2. **Input/Output Devices:** The keyboard detects the keystrokes that are being depressed based on electrical signals being triggered, and these information are processed in the keyboard's circuit board. This is akin to heat being sensed by the skin and subsequently transmitting electrical signals to the brain
3. **Operating System (Low)-Level:** The information processed in the keyboard's circuit board is deciphered, and decoded into the relevant characters that they represent. In this scenario `google.com` and `Enter`. The interpretation of keystrokes and converting it to the respective characters are handled by the operating system of your computer and the keyboards circuit board. This is equivalent to the low-level innate cognitive functions.
4. **High-Level Applications (e.g., Chrome):** The high-level application, your browser, takes this inputs and then transforms it into the relevant actions required
    - Populating the word `google.com`in the address bar
    - Recognizing that hitting the `Enter` button means wanting to submit the request to go to `google.com`
    - Subsequently, forwarding the request over the internet to reach `google.com`


Notice the key point here where the browser does not interact directly with the keyboard. The process of deciphering information in the keyboard is completely abstracted away by the keyboard's circuit board and the operating system. Your chrome browser simply takes the inputs `google.com` or `Enter` and performs higher-level processing to decide what to do with this information.

![image showing that lower level inputs are abstracted away from higher level functions](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-emphasizing-lower-level-inputs-abstracted-away-from-higher-level-functions.png)

This is equivalent to the high-level decision making process that we discussed earlier, where inputs come from low-level innate cognitive functions. 

The browser can also take perform actions based on different context (e.g., opened in incognito, logged in as a particular user etc.). Hence, these are all higher-level functions similar to advanced human cognitive functions.

This comparison is amazing to me, because it just shows that both humans and computers are simply machines that processes information.
But yes, besides my geeky fascination, hope this was useful and we should move on to the next topic.

## Higher-Level Information Storage

Now we have covered the following layers:
- Fundamental Unit of Information Storage
- How Learnt Concepts are recalled
- How Low-Level Functions (Cognitive, OS) helps interpret external information
- How Higher-Level Function processes these information and generates an output (e.g., Decision etc.)


![image consolidating all the concepts learnt, just a duplicate of all main images that has been listed above](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-consolidating-all-the-concepts-learnt.png)

Now that we generally know how information flow, and can be recalled - we can dive a litle further into our innovative methods to organize information so that we can build on pre-existing information and create cooler things.

### Human Information Storage

If we rely on our brains alone, it is impossible to store all the information required to create the world that we live in at the moment. What does that mean?
It just means that no one person can remember all the processes, or information required to effectively run this civilisation:
- Laws and regulations
- Information to build cars, airplanes or transportations
- Currency and how to transact

Because we cannot remember all these information, we have derived creative ways to organize these information and it all starts with `writing`. Yes -- documentation or writing was first discovered sometime between 3400 BCE and 3300 BCE. With this discovery, we are able to store information in an organized manner that can be easily retrieved. This invention allows us to free up our heads so that we can spend our brain resources on creating and building creative stuff, as compared to memorizing mundane processes.

Before we digress too much, we want to highlight two main concepts that are relatable to how computers organize their information:
- Note Taking
- Documentation and Filing Systems

![image comparing note taking and documentation](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-comparing-note-taking-and-documentation.png)
_If you wanted to compare the difference, you can actually check the above image out [here!](/jekyll-blog/jekyll-blog-structure)_

In the context of this article, note taking refers to taking raw notes that are quick and dirty. These notes are normally used solely to aid the conversation - especially for information heavy conversation.

Documentation and filing systems refers to the process of generating a tidy document and storing these documents in an organized manner. Think meeting minutes, and subsequently archiving them so that you can retrieve them in the future if required.

Putting this into a flow. Suppose you are a business analyst, meeting the client for the first time and trying to assess their business problem:
1. You set up a meeting to discuss the problem
2. During the meeting, you take notes -- so that you can clarify your understanding
    - These notes are short-term and normally lasts only for the span of the meeting
    - The notes are useful because it allows you to proceed to the next topic, without losing the information that was previously already shared
    - In the scenario where you do need to retrieve previous information, a quick glance at your notes will remind you of the previous conversation, and you can build from there
    - It's common to clarify understanding, and then amend your notes as you dive deeper into the problem statement
    - The benefits of notes are easy to access, inexpensive to change and easy to create
    - However, these notes are unstructured. Meaning, others may have difficulty understanding, or even finding them
3. After the meeting, you'd take the notes and generate a neat document - `meeting minutes` or equivalent which is subsequently circulated to the client and archived for future reference:
    - These meeting minutes are highly structured
    - Anyone referring to these meeting minutes would be able to understand the gist of the meeting and next steps
    - The benefits of meeting minutes is the organized structure, and accessibility to anyone
    - However, it is more expensive to create and organize. Making amendments to meeting minutes also takes time because you need to capture the context on why the minutes were updated etc.

Another cool thing to note! At the fundamental level, when you review your notes or meeting minutes, the activity that allows you to recall the discussion are activation of neural patterns. The basic fundamental unit for information storage does not change, but we have invented creative concepts (which are essentially stored as neural patterns) to abstract away these processes and store information in a neat and nice way for our reference. The same applies to computers, which we will go through in the next section.

![image showing that all high-level functions are stored as neural patterns](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-reminding-us-that-all-high-level-functions-is-stored-as-neural-patterns.png)

### Computer Information Storage

Now that we have an understanding of the high-level information storage system for humans, we can draw comparisons to that of computers.

For humans, we have:
- Note taking
- Documentation, Filing

For computers, our comparisons would be:
- Cache
- Database

![Image showing representation of cache vs DB](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-showing-representation-of-cache-vs-db.png)

Building on our browser example earlier, we would now take on the perspective of an application server that is being reached from a browser. For more details on how browsers connect to application servers, you can check out [how computer communicates over the internet!](/tech-adventures/custom-domain)

Suppose that we are a computer hosting a business website for an animal behaviour consultancy, hosted on wordpress. When a user comes to visit the website, we need to generate all the content that would be served to the user. For this example, let's assume we will serve the following:
1. Html Template
2. Several Images
3. Several Scripts and CSS files

When generating the material to serve, we can look into either our cache or our database.
For materials that do not change often (e.g., images, scripts), we can store it in cache where it is inexpensive to retrieve, and send. This is a temporary storage, and we would have to periodically update the cache based on the true source - the database.

For materials that may change (e.g., the html template itself), we store the information in the database. Although it is slightly more expensive to retrieve and generate, it's a more reliable source of information, and it's the one true source that our application goes to when generating the html page.

Drawing parallels, the cache is similar to note taking. Where, the information is inexpensive to access, or change. However, as the information stopred here is not as reliable and might be lost, this is normally a temporary storage with the database as the true source.

The other form of storage, database, stores information which requires high data integrity. These information are stored in a structured manner. Any application administrator can review the information in the database and review the relationships between the datasets.
These information are more expensive to access, but more reliable and structured -- similar to documentation and filing in the human information processing system.

The cool thing to note! At the fundamental layer, all of these are stored as binaries - 1's or 0's. We simply have created abstract inventions such as cache and databases (which are also "application software" stored as 1's and 0's), that can store information in a reliable way - so that higher-level operations do not have to bother regarding the low-level functionality of how data is stored.

![image showing that high-level applications, when broken down are all stored as complex strings of binaries](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-showing-that-high-level-applications-are-stored-as-complex-binaries.png)

Sounds familiar? That's because this is analagous to the human processing example provided earlier - where all information are stored as neural connections. We've simply created concepts (neural patterns) of note taking, documentation and filing to help abstract away the low-level functionality of information storage.

This layer of abstraction is key to information technology, or our civilization as a whole, because we will not be here if not for it. It's also the key to how we've been able to advance so far -- because we are able to transfer and build upon ideas and information that were already there before we were born.

**Language** --  Protocol
- Everything is neurons
- But need to abstract, higher-level cognitive functions --> Language
- All language, breaks down into neural connections in the brain
- Different language, different format. Korea is hierarchical, etc. but the information transferred is the same
    - And when broken down, stored in the same way in our brains


**Request and Response** -- conversation
- Initiator (Client)
- Responder (Server)

When communicating there is a need to have an initiator of the conversation and then a responder of the conversation.
Take this scenario for an example:
1. Person_A says `Hello! Is this Sam?`
2. Person_B (Sam) responds `Hello! Yes it's Sam`
3. Person_A the proceeds to ask the relevant question `Hey Sam, thanks for taking my call. I wanted to discuss with you regarding bla bla bla...`

In traditional communication, there is always an initator and a receiver.
The initiator would normally confirm the identifiy of the receiver -- and depending on the confidentiality of the discussion, different levels of verification is required.

The responder will then respond, with details that verifies his/her identity. Once the identity is verified, contextualized - the relevant discussion and information flow is transacted.

This is akin to two computers communicating. There is always an initiator (client) and then a responder (server). 
Different levels of verification can be done, to verify -- but this is outside the scope of the current topic.

**Internet**
- Akin to telephone lines, allowing you to communicate with others
- Initiator, you dial
- Responder, they respond
- Initiator, you start the conversation

**Internet Service Provider**
- Telephone provider
- Gateway where all your calls are routed to, and then subsequently to the responder phone

## Putting the human information flow together
1. Talk about requirements gathering
2. sensory inputs, understanding, notes, communication, documentation etc. --> Spell these out

Thanks a bunch guys! <br>
Peace and Love <br>
Shafik Walakaka