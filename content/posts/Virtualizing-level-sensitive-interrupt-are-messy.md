---
title: Virtualizing level sensitive interrupt are messy
description: To determine what can be lost, and can not
date: 2026-1-27
type: Post
cate: Virtulization, interrupt handling
cover: "/paste_images/Pasted%20image%2020260127205148.png"
---
The state of a GPIO  pin ,active high level triggered
	GPIO 
```mermaid 
stateDiagram-v2
	low --> high 
```
GIC 
```mermaid 
stateDiagram-v2
	inactive --> pending:high
	pending-->active:read cpu ack
	active-->active_and_pending:high 
	active_and_pending-->pending :read cpu eoi 
	active_and_pending-->active :low
	pending-->inactive:low 
```
VGIC 
```mermaid
stateDiagram-v2
	inactive-->pending:writing LR
	pending-->active:read vcpu ack
	active-->active_and_pending: write LR again,
	active-->inactive : wring vcpu eoi
	active_and_pending --> active : write vcpu eoi
		
```
GPIO 
```mermaid
stateDiagram-v2
high -->  active: unmask
high -->inactive :mask
low --> test
hello --> what


```

i have to use a way to throttle it ,the cpu goes to isr, it then polls 
it, in this situation we should unmask it, if it goes isr, we set it to pending,
then
```mermaid
stateDiagram-v2
    [*] --> Guest
    Guest --> VMExit: Level Interrupt
    VMExit --> Hypervisor: Trap
    Hypervisor --> CheckLevel: Evaluate
    CheckLevel --> Inject: Level High
    CheckLevel --> Ignore: Level Low
    Inject --> Guest: Resume
    Ignore --> Guest: Resume
    Guest --> [*]
```
