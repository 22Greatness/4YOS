---
id: os-processes
pack: Operating systems and networks
title: How Windows runs an app
minutes: 45
source: Chris Terman · MIT OpenCourseWare · Computation Structures, Processes
url: https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/resources/processes-8-36-/
courses: UNIPORT (expected) CSC 308, COS 101 · NOUN COS101
lecture: yes
credit: MIT OpenCourseWare · Chris Terman
start: 0
end: 260.04
---
# Goal
Explain what an operating system and its kernel do, tell a program from a process, and use Task Manager and a command to inspect real processes on this laptop.

# Why
Operating systems is a core 300-level course, and processes are its first big idea. In security it's everyday work: malware is a process, and analysts spend their days asking what's running, who started it, and what it's touching. Knowing how to look also solves plain problems, like finding what's slowing your laptop.

# Lesson
## What the operating system does
> Clip: Watch how the operating system tracks a running program, saves its place, and lets another process use the same processor. The video uses registers and the memory management unit to explain the mechanism. Focus on what needs saving and why a timer helps. The reading walks through Windows Task Manager.

An **operating system** (OS) is the software that manages the hardware and gives programs a simpler way to use it. Two of its jobs are abstraction and arbitration.

**Abstraction** means hiding messy details behind a simple interface. A program doesn't need to know which brand of mouse or drive you have. It asks for "the next mouse movement" or "the file called notes.txt", and the OS and its **device drivers** deal with the specifics. A driver is software that lets the OS talk to one kind of device.

**Arbitration** means sharing limited hardware fairly among many programs. Several programs want the processor, memory and network at once, and the OS decides who gets what and keeps them from interfering with each other.

### Kernel and operating environment
The **kernel** is the core of the OS. It runs with full authority over the hardware, while ordinary programs run with restricted rights in what's called **user mode**. To do anything sensitive, like reading a file, a program must ask the kernel using a **system call**, and the kernel can say no. This is the foundation of computer security.

| Kernel | Used by |
| --- | --- |
| Windows NT kernel | Windows |
| Linux | Android and most Linux distributions |
| XNU | macOS and iOS |

In the strict sense the video uses, "operating system" means just the kernel. In everyday use, "Windows" includes the kernel plus all the tools and interfaces around it, which the video calls the **operating environment**. Both uses are common, so check which your lecturer means.

## Program versus process
This distinction appears in every operating systems exam.

| | Program | Process |
| --- | --- | --- |
| What | Instructions stored in a file | A program while it's running |
| Where | On storage | In memory, with the processor's help |
| State | Passive, doing nothing | Active, with its own state |
| Lifetime | Until deleted | Until it ends |
| How many | One installed copy | Can have many running at once |

A good analogy: a recipe is a program, and cooking is the process. One recipe can be cooked by many people at the same time, each at a different step.

When you open Notepad, Windows reads `notepad.exe` from storage, sets up memory, and starts a process. Each process has:

- A **PID**, or process ID, a number identifying it. PIDs can be reused after a process ends.
- Its own **address space**, the memory it can see.
- An identity, the **user** it runs as, which decides what it may access.
- Open resources, such as files and network connections.
- One or more **threads**, the separate paths of execution inside it.

Open a program twice and you may see two processes from one program file. Many modern apps, such as browsers, deliberately run as several processes, so that one crashed tab doesn't take down the rest.

> Mistake: Closing a window does not always end the process, and ending a process does not uninstall anything. An app may keep running in the background after you close it, and the program file stays on the drive after the process ends.

?? You delete a program's desktop shortcut. Does this uninstall the program, or end its running process?
=> Neither. A shortcut is just a small file pointing to the program. The program file and any running process are unaffected.

## How one processor runs many things
A laptop might have hundreds of processes and only a handful of cores. The **scheduler** is the part of the kernel that gives each thread short turns on a core, switching so rapidly that everything seems to run at once. The switch itself is called a **context switch**.

A process is mostly in one of three states.

| State | Meaning |
| --- | --- |
| Running | On a core right now |
| Ready | Able to run, waiting for a turn |
| Blocked (waiting) | Waiting for something, such as a key press, or a disk or network read |

This is why Notepad can sit open using almost no CPU. It's blocked until you press a key. It still occupies memory, though. High CPU use means it's doing work, and high memory use means it's holding a lot.

## Why separation matters
Processes are isolated, because each has its own address space. One program can't simply read another's memory, unless it uses an approved mechanism with enough rights. A crash in one usually doesn't take down the others. And each process runs as a user, so its access to files is limited by that user's rights.

That's why **running as an ordinary user rather than as an administrator** matters. A malicious program you run accidentally gets your rights. If those are administrator rights, it can do far more damage.

> Safety: A process's name proves nothing. Malware can name itself `svchost.exe` or something similar. Name alone isn't evidence, and high CPU alone isn't evidence either, since it could be a legitimate update. An analyst checks further: where the file is located, who signed it and what it's connected to. And don't end processes you don't recognise, because some are essential to Windows and ending them can crash it.

## Looking at processes yourself
**Task Manager**, opened with Ctrl + Shift + Esc, has a **Processes** view that groups by app and a **Details** view with one row per process, which shows the PID and user. In Details, you can right-click a column header and choose **Select columns** to add more.

From the command line, `tasklist` lists processes. Filter for one:

```text
tasklist /FI "IMAGENAME eq notepad.exe"
```

Later, on Linux, you will use `ps` and `top` for the same job.

# Exercises
?? Chrome is one program, and Task Manager shows many Chrome rows in Details. Why?
=> Chrome deliberately runs several processes, for tabs and tasks, so that one crash or compromise is contained. It's one program and many processes.

?? A process uses 0% CPU and 400 MB of memory. Is it broken?
=> Not necessarily. It's probably waiting for something. It holds memory without using the processor.

?? Your friend sees a process named `svchost.exe` using lots of CPU and wants to delete it. What should they do instead?
=> Not delete or end it based on name and CPU alone. `svchost.exe` is a normal Windows host for services. Find out which service it's running and where the file is located first.

# Practice
Look at processes on this laptop, and don't end anything you didn't start yourself.

1. Save your work, then open Task Manager with Ctrl + Shift + Esc, and go to **Details**.
2. Open Notepad from Start, and find `Notepad.exe`. Note that you found its PID, and note its CPU and memory.
3. Type some text, and watch CPU for a few seconds. Then stop typing and watch again.
4. Open a second Notepad window. See whether a new process appears, or the same one grows. Modern Notepad may reuse a process, so report what you actually see.
5. Open Command Prompt: press the Windows key, type `cmd` and press Enter. Type or paste the command, then press Enter. Use the command below, and compare the result with Task Manager.
6. Close Notepad normally, and check again. Then explain why you can still open it from Start.

Keep your account name out of your answer.

# Command
```text
tasklist /FI "IMAGENAME eq notepad.exe"
```

# Rubric
- I found a real process and its PID on this laptop, and reported what I saw.
- I compared CPU use while typing with CPU use while idle.
- I can explain why the program remains after the process ends.

# Summary
- The OS provides abstraction, and arbitrates access to shared hardware.
- The kernel has full authority. Programs ask it through system calls.
- A program is a stored file, and a process is that program running, with its own PID, memory and identity.
- The scheduler gives threads turns on the cores. A waiting process uses memory but almost no CPU.
- A process's name proves nothing. Don't end what you don't understand.

# Check
Q: You close Notepad, and its process disappears from Task Manager. What happened?
* The running instance ended, and Notepad stays installed
- Windows deleted the installed program from the drive
- Windows gave Notepad's process administrator access
= Ending a process stops that instance. The program file remains for next time.

Q: What is a process?
- A file containing a program's stored instructions
* A program while it is running
- A hardware part that runs a program's instructions
= The stored file is the program, and the processor is hardware. A process is the running instance.

Q: Which part of the OS has full authority over the hardware?
- The file manager that lists your folders
* The kernel
- The desktop background service
= The kernel runs with full rights, and programs must go through it.

Q: What is a PID?
- A password that protects a process from others
* A number that identifies a running process
- The folder that a program is installed in
= PID stands for process ID. It identifies a process and can be reused later.

Q: A process is waiting for you to press a key. What is its likely state?
- Running
- Ready
* Blocked
= It's waiting for an event, so it doesn't need the processor. Ready means waiting only for a turn on a core.

Q: What does the scheduler do?
- It decides which files get saved first when the laptop shuts down
* It decides which thread gets a turn on a core
- It sets the times at which the apps update themselves
= It gives threads short turns so that many can share a few cores.

Q: Why can a program not normally read another program's memory?
* Each process has its own address space
- Each program is stored on a different drive
- Memory is wiped each time a program switches
= The OS isolates address spaces, unless a program uses an approved mechanism with enough rights.

Q: What does a device driver do?
* It lets the OS talk to one kind of device
- It lets a user log in to another person's account
- It moves programs from one drive to another drive
= Drivers hide a device's details from the rest of the system.

Q: You see two running instances of one app. How many programs and processes is that?
- Two programs and one process
* One program and two processes
- Two programs and two processes
= One stored program can run as many processes.

Q[transfer]: A security analyst sees a process named `chrome.exe` running from a temporary downloads folder. Why should they look closer?
- Because Chrome isn't able to run as more than one process
* Because the name proves nothing, and the location is unusual
- Because any process that uses memory is a sign of an attack
= Names can be copied. Location, signature and behaviour are better evidence.

Q[transfer]: You open an email attachment that turns out to be malware, while logged in as an administrator. Why is this worse than as a standard user?
- Malware only ever runs on administrator accounts
* The malicious process gets your rights, which are far wider
- Standard accounts are unable to open any attachments at all
= A process runs with the rights of its user. This is why you use a standard account daily.

Q[transfer]: Your laptop feels slow. Task Manager shows one app at 95% CPU, and memory is at 40%. What's the sensible first step?
* See what that app is doing, then save and close it normally
- Delete some large files to free up more of the drive
- End every process you don't recognise in the Details list
= CPU is the bottleneck, and it's your app. Deleting files frees storage, and ending unknown processes can crash Windows.

# Cards
How does a process differ from a program? :: A program is stored instructions. A process is that program running, with its own PID, memory and identity.
What two main jobs does an operating system do? :: Abstraction, which hides hardware details, and arbitration, which shares hardware among programs.
What's a system call? :: A program's request to the kernel to do something it can't do itself, such as reading a file.
What are the three main process states? :: Running, ready (waiting for a turn), and blocked (waiting for an event).
Why does a process's name not prove what it is? :: Any program can use any name. Check its location, signature and behaviour.
Why use a standard account rather than an administrator one daily? :: A process gets the rights of its user, so malware you run does less harm.

# Further
- Operating Systems: Three Easy Pieces, chapter on the process :: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf
- Microsoft Learn, tasklist command :: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tasklist
- Mike Murphy, Abstraction, full lecture and notes :: https://ww2.coastal.edu/mmurphy2/materials/architecture/foundations/abstraction/index.html
