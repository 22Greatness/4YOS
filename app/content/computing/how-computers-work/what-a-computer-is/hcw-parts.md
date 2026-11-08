---
id: hcw-parts
pack: How Computers Work · What a computer is
title: The parts inside a computer
minutes: 45
source: David J. Malan and Colton Ogden · Harvard CS50's Understanding Technology · Hardware
url: https://cs50.harvard.edu/technology/weeks/1/
courses: Helps with COS 101, CSC 101, GST103
video: https://cdn.cs50.net/cscie1a/2017/fall/lectures/hardware/hardware-360p.mp4
credit: Harvard CS50 · David J. Malan, Colton Ogden
start: 2973
end: 3537
---
# Goal
Name the main parts inside a computer, say what each one does and how they connect, and read a laptop's real specification without being misled.

# Why
Once you know the parts, a computer stops being a magic box. You can buy the right laptop, tell what's worth repairing, and follow later lessons about how the processor and memory work. Security work needs this too: an investigator has to know where data can physically sit. You'll look at your own laptop's real parts in this lesson.

# Lesson
## A computer is a team of parts
> Clip: David Malan and Colton Ogden look around a laptop's ports, then open up a desktop to show the real parts inside. It's a 2017 video, so some ports it shows, like the phone and DVD connectors, are rare today.

From the outside a laptop looks like one object. Inside, it's a team of separate parts, each with one job. Everything else in this course explains these parts in more depth.

| Part | Its job | A simple comparison |
| --- | --- | --- |
| **Motherboard** | The large circuit board that connects everything | The roads of a town |
| **Processor (CPU)** | Carries out instructions | The worker |
| **Memory (RAM)** | Holds what's in use right now | The worker's desk |
| **Storage (SSD or hard disk)** | Keeps files with the power off | The filing cabinet |
| **Graphics processor (GPU)** | Draws what's on the screen | A worker who only does pictures |
| **Power supply or battery** | Provides electricity | The power station |
| **Cooling** | Removes heat, using a heat sink and often a fan | The ventilation |
| **Ports and wireless** | Connect to the outside world | The doors |

## The motherboard and how parts talk
A **circuit board** is a sheet carrying thin metal tracks that connect its components. The **motherboard** is the main one. The processor sits in or on it, memory plugs into it or is soldered to it, and storage connects to it. The tracks that carry data between parts are called a **bus**.

### Worked example: opening a document
Follow one action across the parts:

1. You double-click. The **touchpad** sends a signal along the motherboard.
2. The **processor** runs instructions that work out what you clicked.
3. The document is read from **storage** and copied into **memory**.
4. The **processor** prepares it for display, often with the **graphics processor**.
5. The **screen** shows it.

Nothing happens in one place. Information moves between parts all the time.

## Why computers get hot
Every part turns electricity into heat, and the processor produces the most. A **heat sink** is a block of metal with thin fins that spreads heat into the air, and a **fan** moves that air away. If the processor gets too hot, it slows itself down to protect itself. This is called **thermal throttling**. Don't block a laptop's vents with a pillow or bed, because it can make the laptop slower.

## Laptops and desktops
| | Desktop | Laptop |
| --- | --- | --- |
| Power | Mains only, so a power cut stops it at once | Battery lets it continue |
| Upgrades | Most parts can be replaced | Often limited, as memory may be soldered |
| Same price buys | More performance | Portability |
| Cooling | Lots of room | Tight, so it gets hot more easily |

Phones and many thin laptops use a **system on a chip** (SoC), which puts the processor, the graphics and more on one chip. That saves space and power, but you can't upgrade those parts separately.

## Ports and wireless
**Ports** are the sockets where you connect things. **Peripherals** are the devices you attach.

| Connection | Used for |
| --- | --- |
| **USB-A** | The classic rectangular port, for flash drives, mice and printers |
| **USB-C** | The small oval port, often also used for charging and screens |
| **HDMI** | Screens and projectors |
| **Ethernet** | Wired network, the "fat" cable shown in the clip |
| **Audio jack** | Headphones and microphones |
| **Wi-Fi** | Wireless network connection |
| **Bluetooth** | Short-range wireless for headphones and mice |

> Safety: A USB port carries data as well as power. An unknown flash drive can carry malware, and some charging points or cables can attempt data connections. Don't plug in a flash drive you found, and be careful with public charging points when you can use your own charger instead.

## Reading a specification
A **specification** lists what a computer has. Here's an example, and how to read it.

| Listing says | It means | What to think |
| --- | --- | --- |
| Intel Core i5, 4 cores | The processor and how many tasks it can truly do at once | Generation matters too, so a new i5 can beat an old i7 |
| 16 GB RAM | Working memory | Enough for several programs at once. 8 GB is a sensible minimum today |
| 512 GB SSD | Fast storage | An SSD matters more for how fast it feels than a higher clock speed |
| Integrated graphics | Graphics built into the processor | Fine for study, weak for heavy 3D or AI work |
| 1920 x 1080 | The number of screen dots | Width by height |

> Mistake: Comparing laptops by clock speed alone. A 2.8 GHz chip isn't always faster than a 2.4 GHz chip. Design, generation and core count matter as much. Compare models by their real tests, not one number.

?? A listing says "1 TB memory". Is that RAM?
=> Almost certainly not. It nearly always means storage. RAM on an ordinary laptop is far smaller, often 8 to 32 GB.

# Exercises
?? Your laptop works but is getting very hot and slowing down. Which part's job should you think about first?
=> Cooling. Check that the vents aren't blocked. A processor slows itself down when it's too hot.

?? Which part keeps your files when the laptop is off, and which holds what you're using now?
=> Storage keeps them with the power off. Memory (RAM) holds what's in use.

?? Why can't you normally replace the processor in a phone?
=> It's usually a system on a chip, fixed to the board, combined with other parts.

# Practice
Find the real parts of this laptop. Change nothing.

1. Press **Ctrl + Shift + Esc** to open Task Manager, and choose **Performance**.
2. Click **CPU**, and note the processor's name, its cores and its logical processors.
3. Click **Memory**, and note the total RAM. Note also whether it says how many slots are used.
4. Click **Disk**, and note its type (SSD or HDD) and its capacity.
5. Click **GPU** if you see it, and note its name.
6. Now look at the outside of the laptop. List every port, and what each one is for.
7. Write this laptop's specification as a small table. Then say which part you'd upgrade first for your degree work, and why, if it were possible.

Keep this list, as you'll use it in your course project.

# Rubric
- I wrote a specification from real readings on this laptop.
- I identified every port on it.
- I gave a reason for which part I'd upgrade first.

# Summary
- The motherboard connects the processor, memory, storage, graphics and everything else.
- The processor works, memory holds what's in use, and storage keeps data with the power off.
- Heat matters: a hot processor slows itself down.
- A system on a chip combines parts and saves power, but it can't be upgraded.
- Read a specification part by part. No single number decides how fast a computer is.

# Check
Q: Which part connects the processor, memory and storage together?
* The motherboard
- The heat sink attached to the processor
- The graphics processor on the board
= The motherboard carries the connections between all the parts.

Q: Which part removes heat by spreading it into the air?
- The power supply
* The heat sink
- The motherboard
= A heat sink's fins spread heat into the air, often helped by a fan.

Q: What does a processor do when it gets too hot?
- It shuts off your storage so that it can cool down
* It slows itself down to protect itself
- It deletes temporary files to reduce its work
= This is thermal throttling, which is why blocked vents can make a laptop slow.

Q: What is a system on a chip?
* One chip combining the processor, graphics and more
- A chip that holds the whole of your operating system
- A storage chip that is used in place of a hard disk
= It saves space and power, which is why phones use it.

Q: You want to connect a laptop to a projector. Which port is most likely?
- Ethernet
* HDMI
- Audio jack
= HDMI carries picture and sound to screens and projectors.

Q: Which connection is designed for short-range devices such as wireless headphones?
- Ethernet
- HDMI
* Bluetooth
= Bluetooth connects nearby personal devices, while Wi-Fi connects to a network.

Q: In the listing "16 GB RAM, 512 GB SSD", which number is the working memory?
* 16 GB
- 512 GB
- 528 GB, the two together
= RAM is working memory. The SSD is storage.

Q: Which statement about clock speed is true?
- A higher number always means a faster computer overall
* It alone doesn't decide speed, as design and core count matter too
- It only matters for computers that use a hard disk
= Compare whole systems. A newer chip with a lower clock can be faster.

Q[transfer]: You find a flash drive in a university car park. What's the safest thing to do?
- Plug it in to see whose it is, then return it to them
- Plug it into a friend's laptop, to protect your own
* Hand it in without plugging it into any computer
= Unknown drives can carry malware. Curiosity is exactly what that trick relies on.

Q[transfer]: A student needs a laptop mostly for programming and statistics, with several programs open. Two cost the same. Which is the better buy?
* 16 GB RAM and an SSD, with a slightly lower clock speed
- 4 GB RAM and a hard disk, with a slightly higher clock speed
- 4 GB RAM and a hard disk, with more screen brightness
= Memory and an SSD make the biggest difference to this kind of work.

Q[transfer]: A repair shop says your laptop's RAM can't be upgraded. Why might that be true?
- RAM can never be replaced in any kind of computer
* The RAM may be soldered directly to the motherboard
- RAM has to match the colour of the laptop's case
= Many thin laptops solder memory to the board, to save space.

# Cards
What does the motherboard do? :: It connects the processor, memory, storage and all the other parts.
What's thermal throttling? :: A hot processor slowing itself down to protect itself.
What's a system on a chip? :: One chip combining the processor, graphics and more. It saves power, and it can't be upgraded separately.
What's a peripheral? :: A device attached to a computer from outside, such as a printer.
Why don't you plug in a flash drive you found? :: It may carry malware.

# Further
- Harvard CS50's Understanding Technology, Hardware notes :: https://cs50.harvard.edu/technology/notes/1/
- OpenStax Introduction to Computer Science :: https://openstax.org/details/books/introduction-computer-science
