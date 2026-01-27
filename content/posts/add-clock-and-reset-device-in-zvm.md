---
title: add Clock and Reset virtual device in Zephyr Virtual Machine
description: Read shapefile only using python's built in libraray
date: 2023-12-1
type: Post
---

what this device is used for 

1.what mmio region it takes up  
2.what writing to it's register will influence  

ex: writing to the register to let a device stop working
(let it sleep, in simple case?)

so the device should go to sleep,(if virtualized, into some 
status, which means this will change the behavior, when we 
later try to access the mmio region of the device )

so i guess, this means, we will write some logic 
in our handler code,
1. determine whether a legal action
2. to let the virtual device act like 
the real hardware will behave as we write to
the real clock and reset unit.


so, how to write the logic to check whether it's legal request?

i need to find out what the legal request the hardware permit 












