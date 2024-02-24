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

## The fundamental unit of information storage
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

## Learnt Concepts

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


## Basal Functions

This section will compare the basal functions in humans and computers. These functions are low-level activity that are required before either humans or computers can perform any higher-level activity.

### Innate Cognitive Functions
Now that we have an understanding of neurons and neural connections, we can move on to the next level item -- innate cognitive functions. All humans are born with innate cognitive functions that is required for survival. These refers to primitive cognitive functions that are usually happening in our subconscious such as:
- Sensory perception (sense of touch)
- Knowing how to breath
- Sensing fear etc.

The innatve cognitive functions can also be treated as a "concept". The difference is that, these concepts are not learnt -- it's hardcoded into our brains when we were born. 

By default, when we are born, we already have neural patterns that would fire so that we know how to breathe and perform other basic cognitive functions. These can be thought of as low-level cognitive functions that would subsequently act as inputs for higher-level cognitive activites (elaborated in subsequent sections).

![image showing innate cognitive function with a hot kettle as an example](../../parent-page-tech-adventures/child-page-tech-for-the-layman/image-showing-innate-cognitive-function-hot-kettle-example.png)

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

___
Note: WIP until here -- expose for comments
## Higher-Level Cognitive Functions**
Next, humans are capable of higher-level cognitive functions such as decision making etc. These higher-level cognitive functions do not directly communicate with the low-level sensory senses. Instead it either
- Interacts with low-level innate cognitive functions, to receive inputs
- Or it integrates with other higher-level cognitive functions, to receive inputs.

In the example of decision making, the user may be dipping his hand into an ice cold water of 4 degrees celsius (above the comfort zone). However, this activity could have been intentional, trying to complete a challenge or a dare etc. -- these are active decision making capabilities that receives inputs from multiple locations:
- Innate cognitive functions, for senses
- Understanding of previously learnt concepts -- the challange, or dare
- Many more factors comes into play, when calculating whether to keep the hand in the ice cold water

These higher-level cognitive functions are the mechanism by which we can make complex discussions, constructs. We also use this on a daily basis to discuss culture, acceptable behaviour etc.
This also allows for us to discuss complicated concepts, such as the functionality of an application -- it basically allows us to talk about things that do not yet exist. Once we are able to talk and imagine things that did not exist, we can proceed to plan and build it.

Note: All these are learnt concepts that are stored in the form of neural patterns. When you need to retrieve information regarding a learnt concept, the same neural pattern would need to fire.

**Memory Retrieval**
Leading on from the learnt concepts, everytime we retrieve a learnt concepts -- a collection of neurons must fire simultaneously.
These retrieves the understanding of the previous concept.

These neurons can be strengthened, or removed -- depending on how frequent the neurons fire. Firing more frequently would result in a stronger connection, that fires consistently. Conversely, not utilizing that learnt concept, would then result in the neuron connection being weakened -- and may not fire, once you forget.

**Note taking**
When discussing a complex conversation, we notice that humans are normally forgetful. As such, we always take notes to ensure that we do not forget.
During the discussion, we take quick notes -- that are easy to change, and update.

These notes are rough, and unstructured. But they are easily accessible during the conversation itself, and it's an enabler to discuss complicated concepts.

**Documentation**
However, once the discussion is over -- it's common for us to need to process these notes. If left unprocessed, these notes would gradually be forgotten.
Even if it's archived correctly, someone else reading these notes would not be able to understand them.

Processing the notes into documents such as minutes of meetings and subsequently archiving them in an organized manner is crucial to ensure no information gets lost.

**Short-Term and Long Term Memory**
Some may argue that our memory is sufficient and that conversations are richer than pure documentation. Whilst this statement is accurate, it does not go against the requirement for documentation.

Reverting back to how our brain learns concepts -- storing information is essentially a learnt concept:
- Neural connections are formed
- These nerual connections are fired as a collective, to recall the concepts

Now, these neural connections can be strengthened or weakened. If we do not revisit a concept frequently, the connection will weaken. If we revisit it, the connection will be strengthened when it's fired.

It's common to inaccurately recall a discussion, but when we review accurate documentation -- the correct neurons will fire, hence strenghtening our memory recollection and allowing us to productively built on previous concepts that has already been agreed upon.

Sure -- some people may have stronger memory than others (akin to some PC having better RAM), some have stronger calculations (CPU). But this is not a reliable way to store information, and it is impossible to store the collective understanding of the world just in memory, or just keep calculations in  the CPU.
Hence, akin to optimized software -- we never  the hoverloadardward. Instead, we strive for efficient processes (a.k.a. code) that will allow us to achieve our objectives.

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