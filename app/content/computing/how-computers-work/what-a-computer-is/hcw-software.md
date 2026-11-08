---
id: hcw-software
pack: How Computers Work · What a computer is
title: The layers of software
minutes: 40
source: David J. Malan · Harvard CS50's Understanding Technology · Hardware
url: https://cs50.harvard.edu/technology/weeks/1/
courses: Helps with COS 101, CSC 101, GST103
video: https://cdn.cs50.net/cscie1a/2017/fall/lectures/hardware/hardware-360p.mp4
credit: Harvard CS50 · David J. Malan
start: 2831.8
end: 2973
---
# Goal
Explain how software sits in layers between you and the hardware, tell apart firmware, the operating system, drivers and applications, and say why updates and licences matter.

# Why
When something breaks, the first useful question is which layer failed. It's the difference between reinstalling an app and replacing a part. The layers also explain security: an attacker who reaches a lower layer controls everything above it. And your later operating systems and security courses all build on this picture.

# Lesson
## Software is instructions in layers
> Clip: This short clip shows the operating system starting from storage, loading into memory, and letting programs use devices. The lesson adds firmware, licences and updates.

**Software** is instructions stored as bits. Most programs don't talk to hardware directly. They ask the layer beneath them, so that each layer only has to understand the one next to it.

```text
You
  Applications        Word, Chrome, a game
  Operating system    Windows, its services and tools
  Kernel and drivers  The core, and device-specific code
  Firmware            Built-in startup and device code
  Hardware            Processor, memory, storage
```

### Worked example: pressing Save
1. In the **application**, you press Ctrl + S. The app asks the operating system to write a file.
2. The **operating system** checks that you're allowed to, and works out where it goes.
3. A **driver** turns that into commands that this particular drive understands.
4. The **firmware** inside the drive places the bits onto its storage.

The app doesn't need to know what brand of drive you have. So one app works on millions of different computers. This idea, hiding details behind a simple interface, is called **abstraction**, and you will see it everywhere in computing.

## The layers one by one
| Layer | What it is | Examples | Where it's kept |
| --- | --- | --- | --- |
| **Firmware** | Low-level code built into a device | UEFI on the motherboard, code inside a drive or printer | Chips on the device |
| **Driver** | Code that lets the operating system use one kind of device | Graphics driver, printer driver | Storage |
| **Operating system** | Manages hardware and runs programs | Windows, Linux, macOS, Android | Storage, loaded into memory when it starts |
| **Utility** | A small tool that maintains the system | Disk cleanup, antivirus | Storage |
| **Application** | Does a job for you | Word, Chrome, Calc | Storage |

**System software** means firmware, drivers, operating systems and utilities: software that runs the machine. **Application software** does things for the user.

An **operating system** does several jobs:

| Job | What it means |
| --- | --- |
| Manages programs | Starts them, and shares the processor among them |
| Manages memory | Gives each program its own space |
| Manages files | Organises storage into files and folders |
| Manages devices | Uses drivers to talk to hardware |
| Provides an interface | Windows, icons, or commands to type |
| Protects | Decides who may do what |

> Mistake: Thinking "the app doesn't work" means the computer is broken. Test another app. If only one app fails, look at that app. If a device fails in every app, suspect its driver or hardware. If everything fails, look lower down.

?? A printer prints fine from one laptop, and not from yours. Which layer should you check first?
=> The driver on your laptop, or the app's settings. The printer's hardware clearly works, because it prints from another laptop.

## Interfaces
You reach an operating system through an interface. A **graphical user interface** (GUI) uses windows and icons. A **command-line interface** (CLI) uses typed commands. They reach the same system: opening a folder by clicking and by typing a command gets you to the same place. Servers often have no GUI at all, and that's why you'll learn the command line later.

An **application programming interface** (API) is how programs ask other software for something. When an app "asks the operating system to write a file", it's using an API.

## Where software comes from
| Term | Meaning | Examples |
| --- | --- | --- |
| **Proprietary** | Owned by a company, and the code is usually private | Windows, Microsoft Office |
| **Open source** | The code is public, and you may study and change it under its licence | Linux, Python, LibreOffice |
| **Freeware** | Free to use, but the code is usually private | Many small tools |
| **Subscription** | Paid regularly | Microsoft 365 |

Free in price isn't the same as open. When you "buy" software, you usually buy a **licence**, which is permission to use it under certain conditions, and you don't own the program.

## Why updates matter
Software has bugs, and some bugs are security holes. A **patch** or update fixes them. When a fix is published, attackers can study what was fixed, so devices that stay unpatched become easy targets. This is why updating is one of the most effective protections you have.

> Safety: Update from the system's own update settings or the maker's official site. Never from a pop-up on a website saying your computer is infected or needs an update. That's a common way to deliver malware. And avoid "cracked" paid software, since it's often used to spread malware and it can't safely be updated. Free legal options exist for nearly everything in this course.

## Lower layers are more powerful
A program can normally only do what the layers below let it do. So malware that gets into a driver or the firmware can hide from everything above it, and it's much harder to detect and remove. That's why operating systems restrict who can install drivers, and why you should be cautious when something asks for administrator permission.

# Exercises
?? Classify each: a printer driver, Google Chrome, Windows, the code inside an SSD.
=> System software (driver), application, system software (operating system), firmware.

?? You install a new graphics driver and the screen then flickers in every program. Which layer is the suspect?
=> The driver, because the problem is in every application and it started just after the change. Roll it back.

?? "It's free, so it's open source." Is this correct?
=> No. Free in price doesn't mean that the code is public or that you may change it. Check the licence.

# Practice
Look at the layers on this laptop, without changing or installing anything.

1. Press the Windows key, type `about`, and open **About your PC**. Note your Windows edition and version, which identify your operating system.
2. Press the Windows key, type `device manager`, and open it. Expand **Display adapters**. Double-click one, and look at the **Driver** tab. Note its provider and date. Then close it, and change nothing.
3. Press the Windows key, type `windows update`, and open it. Note the date of the last check. If updates are waiting and it's a good time, you may install them.
4. List three applications you use. For each, say whether it's proprietary or open source, and how you know.
5. Pick one real problem you've had on a computer. Say which layer you now think it was in, and why.

# Rubric
- I found my real operating system version and one real driver.
- I classified three of my own applications.
- I placed a real problem in a layer, and gave a reason.

# Summary
- Software comes in layers: applications, operating system, kernel and drivers, firmware, then hardware.
- Each layer hides details from the one above. This is abstraction.
- A driver lets the operating system use one kind of device.
- A licence is permission to use software. Free in price doesn't mean open source.
- Update through official routes. Lower layers are more powerful, so they're more dangerous if compromised.

# Check
Q: What is a driver?
* Software that lets the operating system use one kind of device
- A person who is paid to fix your computer's hardware for you
- The main chip that carries out a program's instructions
= Drivers translate between the operating system and specific devices.

Q: What's firmware?
- Software you buy on a subscription through your company
* Low-level code built into a device
- Any program that runs inside of a web browser
= It sits on chips in the device itself, such as a motherboard or drive.

Q: Which of these is an application?
- A graphics driver
- UEFI firmware
* A spreadsheet program
= Applications do a job for the user. Drivers and firmware run the machine.

Q: What does abstraction mean in this lesson?
- Making software look more artistic on the screen
* Hiding details behind a simple interface
- Compressing a program so that it takes less space
= An app can ask to save a file without knowing about your particular drive.

Q: One app crashes, and all the others work fine. Where should you look first?
* At that app
- At the motherboard
- At the laptop's firmware
= If lower layers were failing, other apps would probably fail too.

Q: Which statement about open source software is right?
- Its code is secret, but it doesn't cost anything to download
* Its code is public, and you may study and change it under its licence
- It's always unsafe, because anyone is able to read its code
= Open means the code is available. Free in price is a separate idea.

Q: Why are updates important for security?
- They make a computer's fan run more quietly
- They remove all of the viruses already on the computer
* They fix holes that attackers could otherwise use
= Patches close known holes. Unpatched devices become easy targets.

Q: What's an API?
- A kind of port on the side of a laptop
* A way for programs to ask other software for something
- A chip that stores a computer's settings
= An app uses an API to ask the operating system to write a file, for example.

Q[transfer]: A website pop-up says "Your PC is infected. Download this update now." What should you do?
- Download it quickly, before the infection can spread
* Close the page, and use Windows' own update settings
- Enter your email address so that the site can send help
= Real updates don't come from random pop-ups. This is a common trick.

Q[transfer]: Malware is found hiding inside a laptop's firmware, and reinstalling Windows doesn't remove it. Why not?
* Firmware is on a chip, a lower layer than the operating system
- Windows can't be reinstalled once a laptop has any malware
- Firmware is stored in the same folder as your documents
= Reinstalling replaces what's on the drive, not code on a chip. Lower layers are more dangerous.

Q[transfer]: A server has no screen or icons, and an administrator runs it remotely. How do they most likely give it instructions?
- Using a mouse, and the desktop icons on its screen
- By replacing its motherboard for each new task it has
* Through a command-line interface
= Servers often have no graphical interface, which is why the command line matters.

# Cards
What are the software layers, top to bottom? :: Applications, operating system, kernel and drivers, firmware, then hardware.
What does a driver do? :: Lets the operating system use one kind of device.
What's firmware? :: Low-level code built into a device.
What's abstraction? :: Hiding details behind a simple interface.
What's the difference between free software and open source? :: Free is about price. Open source means the code is public under a licence.
Why are lower software layers more dangerous when compromised? :: They control everything above them, and can hide from it.

# Further
- Harvard CS50's Understanding Technology, Hardware notes :: https://cs50.harvard.edu/technology/notes/1/
- Operating Systems: Three Easy Pieces, free book :: https://pages.cs.wisc.edu/~remzi/OSTEP/
