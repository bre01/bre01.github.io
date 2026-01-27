---
title: Which message goes to which tty
description: find out why kernel message only show up in virtual console
date: 2023-12-1
---

Today I run into a problem, my ubuntu console in VMware show messages about 
usb connecting constantly, after checking it, i'm sure it's from the (dmesg -w ) 
kernel buffer, but i can not see this message from my ssh connection. I
go down the rabbit hell to find out which message goes to which terminal, psedo terminal, etc...

I found this blog 
https://www.linusakesson.net/programming/tty/


so when a user logs in on a particular TTY, that user must become the owner of the device file. 
This is traditionally done by the login(1) program, which runs with root privileges.

let's summarize the tty model

the old way
```
---hardware ----------------------   ---------software--------------------------------------------
(real teletype)                                                                               -> user process
terminal <=>physcial line<-> uart <-> uart driver<-> discipline line <-> tty driver  -> user process 
                                     parity check    handle things 
                                    control flow      (like backspace)

the point get me confused is the tty driver, i have clue about tty driver


desktop system


hardware-  ---------------software------------------------------------------------------------

display<- vga driver 
                        <-> terminal emulator<->line displine<-> tty driver ->user processes
keyboard<-keyboard driver


terminal emulator : complex state machine(with frambuffer(this get pushes to display))


now move terminal emulation into userland. 
we invented pty( pseudo terminal) to facilite 


-------------------------software---------------------------------------

                <-> tty driver        -> user processes
                    (pty slave side)
line displine 
                    (master side)
                <-> pty driver       <->   <-
                                            |
                    keyboard driver  -> xterm process
                    display driver   <- 
```



so in this structure, our user process(in this case bash)
when opened(need stdin,stdout,stderr),
and it takes tty as stdin,and stdout

another xterm process, needs stdin,stdout(i think its
another side is (stdout,stderr ), stdin) 

of course it needs to draw the data it receives from stdin
using some graphics api, which underlying use some gpu driver to 
put data into frambuffer, so it shows up in display,
it also listen to keyboard device, when device drivers pushs data
it pushes input to frambuffer to display it, and when pressed enter 
it sends the data as stdout


but how can we verify it ??
we do this in ubuntu vm first 
i connect via ssh 
```
bre@bre:~$ ps -o pid,tty,command
    PID TT       COMMAND
   3631 pts/1    -bash
   3844 pts/1    ps -o pid,tty,command
```
this bash is attached to pts/1


since


```
-------------------------software---------------------------------------

                <-> tty driver        -> user processes
                    (pty slave side)
line displine 
                    (master side)
                <-> pty driver     <->     <- 
                    network driver  <->   shhd
                        |                    
-------------------     |   -----------------------------------------------
                        |
                    network driver  -> 
remote machine      display     .   <- user process (iterm2)
                    keyboard       -> 
```

so in this part, the sshd should allocate a pty slave 
for our session (login )
(tty Print the file name of the terminal connected to standard input.)(of the bash)
```shell
bre@bre:~$ tty
/dev/pts/1
bre@bre:~$ ls -l /dev/pts/1
crw--w---- 1 bre tty 136, 1 Nov 15 16:40 /dev/pts/


now lets check the pty master is hold by sshd

bre@bre:~$ ps -ef | grep sshd
bre         3630    3532  0 16:22 ?        00:00:00 sshd: bre@pts/1
bre@bre:~$ sudo ls -l /proc/3630/fd
[sudo] password for bre:
total 0
lrwx------ 1 root root 64 Nov 15 16:43 0 -> /dev/null
lrwx------ 1 root root 64 Nov 15 16:43 1 -> /dev/null
lrwx------ 1 root root 64 Nov 15 16:43 10 -> /dev/ptmx
lrwx------ 1 root root 64 Nov 15 16:43 11 -> /dev/ptmx
lrwx------ 1 root root 64 Nov 15 16:43 2 -> /dev/null
lrwx------ 1 root root 64 Nov 15 16:43 3 -> 'socket:[48254]'
lrwx------ 1 root root 64 Nov 15 16:43 4 -> 'socket:[55711]'
lrwx------ 1 root root 64 Nov 15 16:43 5 -> 'socket:[48262]'
lrwx------ 1 root root 64 Nov 15 16:43 6 -> 'socket:[48241]'
lrwx------ 1 root root 64 Nov 15 16:43 7 -> /dev/ptmx
l-wx------ 1 root root 64 Nov 15 16:43 8 -> /run/systemd/sessions/6.ref
```

now this stops and we can only see the `sshd` use `/dev/ptmx`
but seeing through the ptmx man page 
we can see a lot of infos

The file /dev/ptmx is a character file with major number 5 and minor number 2, usually of mode 0666 and owner.group of root.root. It is used to create a pseudoterminal master and slave pair.
When a process opens /dev/ptmx, it gets a file descriptor for a pseudoterminal master (PTM), and a pseudoterminal slave (PTS) device is created in the /dev/pts directory. Each file descriptor obtained by opening /dev/ptmx is an independent PTM with its own associated PTS, whose path can be found by passing the descriptor to ptsname(3).

Before opening the pseudoterminal slave, you must pass the master's file descriptor to grantpt(3) and unlockpt(3).

Once both the pseudoterminal master and slave are open, the slave provides processes with an interface that is identical to that of a real terminal.

Data written to the slave is presented on the master descriptor as input. Data written to the master is presented to the slave as input.

In practice, pseudoterminals are used for implementing terminal emulators such as xterm(1), in which data read from the pseudoterminal master is interpreted by the application in the same way a real terminal would interpret the data, and for implementing remote-login programs such as sshd(8), in which data read from the pseudoterminal master is sent across the network to a client program that is connected to a terminal or terminal emulator.

you can also run pseudo terminal like ssh and screen in xterm(alread a pseudo terminal)

the docs has already give enought infos , but we can found some code of
xterm or sshd that further proves it will use this device

The TTY driver keeps track of the foreground process group id, but only in a passive way. 
The session leader has to update this information explicitly when necessary.
the TTY driver keeps track of the size of the connected terminal


we can use ioctl to control tty Device file
Still, ioctl requests have to be initiated from processes, so they can't be used 
when the kernel needs to communicate asynchronously with an application.
