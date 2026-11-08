---
id: hcw-boot
pack: How Computers Work · Files and the system
title: What happens when you press the power button
minutes: 35
source: Microsoft Learn · Secure the Windows boot process
url: https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/secure-the-windows-10-boot-process
courses: Helps with COS 101, CSC 308
---
# Goal
Trace a computer from the power button to your desktop, name what each stage does, and use what you know to diagnose a laptop that won't start.

# Why
This pulls the unit together: firmware, memory, storage and the operating system, working in order. When a laptop won't start, knowing the stages tells you where it failed, and that often saves money on repairs. Boot security matters as well, because malware that gets in before the operating system is very hard to remove.

# Lesson
## A chicken-and-egg problem
> Note: This lesson has no lecture, because I didn't find a free segment that I've confirmed teaches this well. The writing covers it fully.

The operating system is stored on the drive. Programs run from memory. But when the power comes on, memory is empty, so what loads the operating system? Starting a computer solves this in small steps, each loading something bigger. It's called **booting**, from the old phrase "pulling yourself up by your bootstraps".

## The stages
| Stage | What runs | What it does | Stored in |
| --- | --- | --- | --- |
| 1. Power on | Power circuits | Supplies stable power, and starts the processor | Hardware |
| 2. Firmware | UEFI or older BIOS | Starts at a fixed address, tests hardware, finds a boot drive | A chip on the motherboard |
| 3. Boot loader | Windows Boot Manager | Finds and loads the operating system | The drive |
| 4. Kernel | Windows kernel | Takes control of memory and the processor, and loads drivers | The drive, then RAM |
| 5. Services | System services | Start networking, security and others | The drive, then RAM |
| 6. Sign-in | Sign-in screen | Asks who you are | The drive, then RAM |
| 7. Desktop | Your startup apps | You can start work | The drive, then RAM |

### Firmware
When the power stabilises, the processor begins at one fixed address. This points to **firmware** on a chip, which keeps its contents without power. Older computers used **BIOS**, and modern ones use **UEFI**.

The firmware first runs a **power-on self-test** (POST), checking that key parts such as the memory work. Then it follows its **boot order**, the list of drives to try, looking for a boot loader. You reach its settings by pressing a key such as F2, F10, F12 or Del at startup, and it varies by maker.

### Boot loader and kernel
The **boot loader** is a small program whose only job is to load the operating system. It copies the **kernel** into RAM, and hands over control. The kernel then takes charge of memory and the processor, and loads the drivers it needs to reach devices. Now the system can use the hardware through its layers.

### Services and you
The kernel starts background programs, called **services** on Windows, for networking, updates, printing and security. Then comes the sign-in screen. After you sign in, **startup apps** run.

> Mistake: Thinking that a laptop gets slow to start because it's old. Often it's too many startup apps. Task Manager's **Startup apps** tab shows them, and you can disable ones you don't need. Don't disable what you don't recognise before checking what it does.

?? Your laptop shows the maker's logo, then a message "No bootable device". Which stage failed?
=> The firmware ran, but it couldn't find a boot loader. So the drive may have failed, or the boot order may be wrong.

## Restart and shut down
Windows has a feature called **Fast Startup**, on by default on many laptops. A **shut down** saves part of the system's state to the drive, in order to start faster next time. So the kernel isn't fully reloaded. A **Restart** does start fresh.

So, if IT support tells you to restart to fix a problem, choose **Restart** and not Shut down.

**Sleep** keeps RAM powered, so it wakes in seconds and uses a little battery. **Hibernate** copies memory to the drive and powers off, so it survives a flat battery, and takes longer. That's the memory lesson in action: RAM needs power, and storage doesn't.

## Diagnosing a laptop that won't start
Use the stages to narrow it down. Work from the first stage to the last.

| What you see | Stage reached | What to try first |
| --- | --- | --- |
| Nothing at all, no lights | Power | Charger, battery, a different socket |
| Lights or fan, with a blank screen | Power or firmware | Hold the power button 15 seconds, then try again. Check memory or the screen, which may need a technician |
| Maker's logo, then "No bootable device" | Firmware | Boot order, the drive itself |
| Windows logo, then a repeated failure | Kernel or drivers | Windows' automatic repair, Safe Mode |
| Blue screen with an error code | Kernel or a driver | Note the code. Undo a recent driver or update |
| Signs in, then very slow | Services, startup apps | Task Manager's Startup apps |

**Safe Mode** starts Windows with only the minimum set of drivers and services. If a problem disappears there, something you've added is the likely cause. It's a good test of which layer is to blame.

> Note: Before attempting repairs on a laptop that holds your only copies, remember your backups. A failing drive can get worse with every attempt, so copying your data comes first.

## Boot security
Malware that loads before the operating system can hide from everything that runs after it. A **rootkit** at this level is a serious problem. Modern computers defend themselves with a chain of checks.

| Protection | What it does |
| --- | --- |
| **Secure Boot** | Firmware only runs boot loaders signed by a trusted key |
| **Trusted Boot** | Windows checks each of its parts before loading it |
| **TPM** | A security chip that holds keys, and records what was loaded |
| **BitLocker** | Encrypts the drive, using a key that the TPM can release only if the boot looks untampered |

Each stage checks the next before handing over. That's called a **chain of trust**. A **digital signature** here is a maker's mark that software can check, and that can't be forged without the maker's secret key.

> Safety: Someone with physical access can try to boot your laptop from a USB stick and read an unencrypted drive, without needing your Windows password. That's why drive encryption matters. Don't turn off Secure Boot or change firmware settings because a website or stranger tells you to. Keep your BitLocker recovery key stored somewhere safe and separate, because without it, you can be locked out of your own data.

# Exercises
?? Put in order: kernel loads, POST runs, boot loader runs, you sign in.
=> POST runs, boot loader runs, kernel loads, you sign in.

?? Why is firmware stored on a chip, and not on the drive?
=> Something has to run first, before any drive can be read, and memory is empty at power on.

?? A problem disappears when you start in Safe Mode. What does this suggest?
=> Something beyond the minimum set, such as an added driver, service or startup app, is the likely cause.

?? Your laptop has a flat battery while hibernated. Have you lost your open work?
=> Usually not, because hibernate saved memory to the drive. Sleep would be riskier, as it relies on RAM staying powered.

# Practice
Look only, and change nothing in the firmware.

1. Open Task Manager with **Ctrl + Shift + Esc**, and go to **Performance**, then **CPU**. Note the **Up time**. Does it surprise you? If you normally use Shut down, Fast Startup may explain a long uptime.
2. In Task Manager, open **Startup apps**. List the apps set to Enabled, and their startup impact. Choose one you might disable, and say why. You may disable it only if you're sure what it does.
3. Press the Windows key, type `system information`, and open it. Find **BIOS Mode** (UEFI or Legacy) and **Secure Boot State**.
4. Choose **Restart** from the Start menu after saving your work. Time how long it takes to reach the sign-in screen, and watch the stages go by.
5. In your own words, write the stages from power on to desktop. Then write where you'd look first if this laptop showed "No bootable device".

# Rubric
- I found my real uptime, startup apps, BIOS mode and Secure Boot state.
- I wrote the stages in order, from memory.
- I can use the stages to say where to start looking for a fault.

# Summary
- Booting goes: power, firmware, boot loader, kernel, services, sign-in, desktop.
- Firmware sits on a chip, because memory is empty at power on.
- Windows' Shut down may not fully reload the system, while Restart does.
- Use the stage that a fault reaches to decide what to check first.
- Secure Boot, the TPM and BitLocker build a chain of trust. Keep your recovery key safe.

# Check
Q: What runs first when you press the power button?
* Firmware on a motherboard chip
- The Windows kernel from the drive
- Your startup apps from the drive
= Memory is empty and the drive isn't yet being read, so firmware starts things.

Q: What's the boot loader's job?
- To test every part of the laptop's hardware
* To find and load the operating system
- To ask for the password of the person signing in
= Firmware tests hardware. The boot loader loads the kernel.

Q: What is POST?
- A way of sending files between two laptops
- The stage where your documents are saved
* A self-test the firmware runs on key hardware
= Power-on self-test checks parts such as memory.

Q: Which is true of Restart on a Windows laptop with Fast Startup on?
* Restart starts fresh, while Shut down may save some of the system's state
- Restart and Shut down always do exactly the same thing
- Shut down starts fresh, while Restart may save some state
= That's why support staff ask you to choose Restart.

Q: What does Sleep rely on?
- Your work being saved to the cloud automatically
* RAM staying powered
- The drive being kept spinning at top speed
= Hibernate copies memory to the drive instead.

Q: What does Safe Mode do?
- Encrypts the whole drive so that it can't be read
- Backs up all of your files to the desktop
* Starts Windows with only the minimum drivers and services
= If the fault goes, something you added is likely to blame.

Q: Your laptop has lights and a fan, and the screen stays blank. Which stage is the problem nearest?
* Power or firmware
- Your startup apps
- The sign-in screen
= It hasn't got as far as the operating system.

Q: What does Secure Boot check?
- That your password is long enough to be safe
* That boot software is signed by a trusted key
- That the laptop's battery is fully charged
= It stops unsigned code running before the operating system.

Q[transfer]: A thief boots your stolen laptop from a USB stick. What stops them from reading your files?
- Your Windows sign-in password
* Drive encryption such as BitLocker
- The fact that Windows has Fast Startup on
= Windows' password only applies once Windows is running.

Q[transfer]: After installing a new graphics driver, Windows crashes with a blue screen at every start. What's a sensible next step?
* Start in Safe Mode, and roll back that driver
- Replace the motherboard right away with a new one
- Delete your documents, as they may be causing it
= The timing points to the driver, and Safe Mode avoids loading it.

Q[transfer]: A laptop takes four minutes to become usable after sign-in, and it reaches sign-in quickly. Where should you look first?
- At the firmware's boot order
- At the power supply and charger
* At the startup apps
= Everything before sign-in is fine, so look at what runs after it.

# Cards
What are the boot stages in order? :: Power, firmware, boot loader, kernel, services, sign-in, desktop.
Why is firmware on a chip? :: Something must run first, when memory is empty and no drive has been read.
What's the difference between Sleep and Hibernate? :: Sleep keeps RAM powered. Hibernate saves memory to the drive and powers off.
What does Safe Mode tell you? :: If a problem goes away there, something added is the likely cause.
What's a chain of trust? :: Each boot stage checks the next before handing over.

# Further
- Microsoft Learn, securing the Windows boot process :: https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/secure-the-windows-10-boot-process
- Operating Systems: Three Easy Pieces, free book :: https://pages.cs.wisc.edu/~remzi/OSTEP/
