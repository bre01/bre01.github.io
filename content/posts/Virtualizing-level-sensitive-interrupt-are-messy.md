---
title: Virtualizing-level-sensitive-interrupt-are-messy
description: To determine what can be lost, and can not
date: 2026-1-27
type: Post
cate: Virtulization, interrupt handling
cover: "/paste_images/Pasted%20image%2020260127205148.png"
---

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
