---
layout: page
title: Keyboard Cleaning
permalink: /new-home-experience/mechanical-keyboard-cleaning/
parent: Kallang
---

# Introduction

After shifting into my new home, we enjoyed the honeymoon period for about 4 - 6 weeks. After that, we needed to settle in and figure out the proper workflows on how we can actually get things done within our house (no longer feel like a holiday home ><).

Predominantly working from home, setting up my home workspace was one of the most important things. So I got started on it, which includes setting up my Desk, Monitors, Keyboards and other necessary peripherals.

Whilst giving my Mechanical Keyboard a wipe, I noticed that the Mechanical keyboard was not at it's most hygienic state haha. 

![mechanical-keyboard-dirty](../../img/keychron-c2-dirty.jpeg){:width="30%"}

So this calls for some heavy duty cleaning. These were the steps done:
1. Remove all keycaps and wash them in warm water
2. Brush off the dirt with a soft bristle tooth brush
3. Blow off the remaining dust with compressed air
4. Wipe the topboard and switches with a damn cloth
5. Remove the side skirt
6. Remove the switches
7. Remove the topboard
8. Wipe down the topboard, side skirt with warm water
9. Re-assemble the keyboard

## Removal of Key Caps

The removal of keycaps should ideally be performed using a key cap puller. This would save you time, and minimize any potential damage.

But I was not well equipped, so I pinched off each keycaps manually using my fingers -- not the most productive.

The keycaps were then soaked in warm soapy water, to wash off any grime. Afterwhich, they were left to dry to ensure no moisture remains when we attach them back to the switches.

My wife was kind enough to lend out her chopping board to be used as a platform to dry my key caps!
![mechanical-keyboard-dirty](../../img/keyboard-keycaps-clean.jpeg){:width="30%"}

## Sweep, Vacuum and Mop

After this exercise, it was clear to me that any cleaning protocol would follow these 3 steps:
1. Sweep away the big chunk of particles
2. Vacuum up the small chunk of particules
3. Mop to ensure final polish

For those whom are diligent house chore do-ers, this would be a familiar workflow. For me -- it was a revelation lol.

![Image of a broom, mop and Dyson Vaccum to represent the sweep, mop and vacuum protocol](../../img/img-about-page/sweep-mop-vacuum.png)

### Sweep

The keyboard was completely filthy -- full of dust, and bunny fur. A simple google search advised me to first brush off away all the dust with a soft-bristle tooth brush. 

I diligently performed the abovementioned activity ^^ -- swept away the big particles in the keyboard as much as I could.

![image of a toothbrush used to sweep the keyboard](https://www.colgate.com/content/dam/cp-sites/oral-care/oral-care-center/en-in/occ/basics/selecting-dental-products/finger-touching-feeling-soft-slim-tapered.jpg)

### Vacuum

Now that all the large particules are gone, we proceed to the vacuum phase. Here, the google search was telling me to blow of any remaining particles with compressed air.

Failing to obtain compressed air cans, I decided to use the Dyson V12 vacuum to suck out the particules. Although not as efficient as a compressed air can, it got the job done.

![image of the compressed air used to blow off dust particles, akin to the vacuuming phase](../new-home-experiences/new-home-exp-img/air-compressor-blowing-dust-particles-off-keyboard.png)

### Mop

Lastly, google informed me that I should wipe the keyboard with a warm damp cloth (but ensure the cloth is not too damp). Apparently electronics and moisture do not go well together.

So, I mopped the keyboard using a damp cloth that was wrung dry!

![Image of a damp cloth used to wipe down the keyboard, akin to the mopping phase](../new-home-experiences/new-home-exp-img/damp-cloth-wiping-dust-particles-off-keyboard.png)

## Wipe down remaining components

Next, I want to proceed to wipe down the remaining components such as the top board, side skirt etc. But I realized that we have to remove the switches before removing the top board.

### Removing Switches

Removing switches should utilize a switch remover -- looks like a keycap puller. Again, this saves time, and minimize chance of damange.

But being unprepared, we proceed with the old schoool screwdriver:

![Scredriver Peel Switch](../../img/keyboard-screwdriver-remove-switch.jpeg){:width="30%"}

### Dismantled Components

Only after removing all the switches (which took ages without the key cap puller), we managed to dismantle all the other components -- and proceed with a good wipe down.

![Keyboard components dismantled](../../img/keyboard-components-apart.jpeg){:width="30%"}

### PCB Wipe Down

Note that we did not wipe down the PCB with a damp cloth. Google advised to only use compressed air or soft bristle tooth brush to clean the PCB.

We only used a soft-bristle tooth brush, to sweep away large particles.

We did not use a vacuum to suck up the smaller particles from the PCB, as the static generated from the vacuum could potentially damage the PCB. Not sure how true -- but did not take the risk.

## Re-assemble Keyboard

Now that everything is sparkling clean, we need to re-assemble the keyboard. But similar to software development, we should test and ensure that the PCB is working before re-assembling (because if something fails, you would have to disassemble everything to fix it).

### Testing the PCB

And as murphy's law holds true, the `Enter` key was not working when we tested it.

The test was performed by connecting the two electrods behind the PCB using an aluminium foil:
- If the LED light switches on, connectivity works
- If the LED light does not switch on, connectivity breaks

Example of a successful connectivity check:

![Connectivity check success](../../img/keyboard-check-connectivity-success.jpeg){:width="30%"}

Example of a failed connectivity check (The `Enter` Key):

![Connectivity check failed](../../img/keyboard-check-connectivity-fail.jpeg){:width="30%"}


#### Assessment of Issues 
We also noticed that the connectivity check is successful, when we bend the PCB. Screenshot below shows the PCB bent by applying pressure in the middle, and hitting down on the switch to see if the `Enter` button LED lights up:

![PCB Bent Fix Connectivty](../../img/keyboard-pcb-bent.jpeg){:width="30%"}

This suggest that either there is a poor soldering job, or a broken trace (connectivity). Probably due to my handling of the keyboard lol.

So, do the above activities at your own risk haha!

#### Workaround

As I don't have any soldering equipment or expertise, bending the PCB was a good workaround for me. This was what I did:
1. Created a wedge from a piece of paper (folded multiple times)
2. Put pressure on the PCB with the wedge in between the PCB and the bottom case

See the wedge placed at the bottom case:

![Wedge between bottom case and PCB](../../img/wedge-to-bend-keyboard-pcb.jpeg){:width="30%"}

Putting pressure between the PCB and the bottom case (with the wedge inbetween), we tested the `Enter` key once more. Fortunately, the LED lighted up when we hit the switch

![Test Enter Switch after putting pressure on PCB into bottom case with wedge in between](../../img/pcb-screwed-into-bottom-case-w-wedge-test-switch.jpeg){:width="30%"}

### Complete re-assembly

Now that we can be relatively confident that all the switches are working, we proceed to:
1. Attach the top board
2. Attach all the switches
3. Verify all the switches once more -- and yes! The `Enter` key works this time round
4. Attach the side skirt and the key caps

The complete set-up looks as follows:

![Full keyboard setup on my workspace](../../img/home-desk-setup-complete.jpeg){:width="30%"}

## Thank you!

Thanks all for taking your time to read. Enjoyed creating this piece, and definintely not an expert in mechanical keyboards.

As I go along exploring more on this front, might update this article to include further details.

Until then, peace and love <br>
Shafik Walakaka