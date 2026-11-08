---
id: how-computers-work
subject: Computing
title: How Computers Work
examMinutes: 45
project: Explain your own laptop
---
# Goal
Understand a computer from the transistor to the web page: what's inside it, how it stores anything, how it runs a program, how it starts, and how it talks to the world. No earlier knowledge is assumed.

# Units
## hcw-u1 :: What a computer is
- input-output
- cos-history
- hcw-parts
- hcw-software
## hcw-u2 :: How data is stored
- binary
- hcw-hex
- hcw-text
- hcw-images
- hcw-sound-video
- hcw-compression
## hcw-u3 :: Inside the machine
- hcw-logic
- hcw-cpu
- hcw-languages
- memory
- hcw-storage
- hcw-hierarchy
## hcw-u4 :: Files and the system
- files
- os-processes
- os-permissions
- hcw-boot
## hcw-u5 :: Computers talking
- hcw-network
- network-addresses
- dns-https
- hcw-one-click

# Project
Write a clear report about your own laptop, so that someone with no computing background could follow it. Use real readings. Keep private details out: no account name, addresses, passwords or file names.

Your report needs these five parts.

1. **What's inside.** A specification table from real readings, covering the processor, cores, RAM, drive type and capacity, graphics and ports. Say what each part does.
2. **How your data is stored.** Choose one real file of each kind: text, a picture, and audio or video. Give its size. Calculate its uncompressed size, where you can. Say whether it's compressed, and whether that compression is lossy.
3. **What happens in one click.** Your own trace of opening a web page, from the touchpad to the pixels, from `hcw-one-click`, including what you really observed in the browser's developer tools.
4. **What could go wrong.** Pick three real risks to this laptop. For each, say which part of the machine it involves, and whether it harms confidentiality, integrity or availability. Say what protects you now, and what you'd change.
5. **What you changed.** Describe at least one real improvement you made because of this course, such as a tested backup, a startup app you removed, or drive encryption you checked. Say how you confirmed that it worked.

Write it in your own words. Your own explanation is the point, so don't paste it from anywhere, and don't have an AI write it. This project is self-checked, and the app will record it that way.

# Project rubric
- All five parts are present, and they use real readings from this laptop.
- I wrote it in my own words, and I could explain any sentence of it aloud.
- It contains no private details.
- I really made the improvement that I describe, and I checked that it worked.

# Exam
Q: A student types numbers into a spreadsheet, and it shows the total. Which stage is showing the total?
- Input
- Processing
* Output
= The result leaving the task is output. Adding is the processing.

Q: Which generation of computers first used microprocessors?
- Second
- Third
* Fourth
= Vacuum tubes, transistors, integrated circuits, then microprocessors.

Q: Which part directs the other parts of the CPU?
* The control unit
- The arithmetic logic unit
- The registers
= The ALU calculates, and registers hold values.

Q: What is 1101 0110 in hex?
- 0xB6
* 0xD6
- 0x6D
= 1101 is D, and 0110 is 6.

Q: What is 0x40 in decimal?
A: 64
= 4 x 16 = 64.

Q: What is the decimal value of binary 100101?
A: 37
= 32 + 4 + 1 = 37.

Q: How many different values can 10 bits represent?
A: 1024 | 1,024 | 1024 values | 2^10
= 2^10 = 1,024.

Q: Using a = 97, what is the code for lower case c?
A: 99
= a is 97, b is 98, and c is 99.

Q: Why can the text "12" not simply be added to the number 12 in a program?
- Text can't ever be stored on a computer's drive
* The text is stored as character codes, and it must be converted first
- Numbers are stored in RAM, and text is stored in the cache
= The characters 1 and 2 are codes 49 and 50, not the value twelve.

Q: A 2000 x 1000 picture uses 3 bytes per pixel. What's its uncompressed size in bytes?
A: 6000000 | 6,000,000 | 6000000 bytes | 6,000,000 bytes | 6 mb
= 2000 x 1000 x 3.

Q: Which suits a screenshot of small text?
- JPEG at low quality, as it makes the file smaller
* PNG, since lossless compression keeps the edges sharp
- MP3, as it was designed for very small files
= JPEG smudges sharp edges, and PNG keeps every bit.

Q: A 16-bit stereo recording at 48,000 Hz. How many raw bytes per second?
A: 192000 | 192,000 | 192000 bytes | 192,000 bytes
= 48,000 x 2 bytes x 2 channels.

Q: What's the result of NOT (1 AND 1)?
A: 0
= 1 AND 1 is 1, and NOT 1 is 0.

Q: In the fetch-decode-execute cycle, when does the program counter normally move on?
* Just after the instruction has been fetched
- Only when the laptop has been restarted
- Only after every program has been closed
= It then points at the next instruction, unless a jump changes it.

Q: Which is usually compiled before it runs?
- Python source code, one line at a time
* C source code, into a `.exe` file
- A web page's text, inside of a browser
= C is usually compiled ahead of time, and Python is usually interpreted.

Q: You save a document. Where does it get written?
- From storage into RAM
* From RAM to storage
- From the screen into RAM
= Editing happens in RAM. Saving writes to storage.

Q: Which memory is non-volatile?
- RAM
- L1 cache
* An SSD
= Only the SSD keeps its contents without power.

Q: What does emptying the Recycle Bin usually do at once on a hard disk?
* It marks the space as free, leaving the bits for now
- It overwrites the file several times with zeros
- It moves the file up to the cloud for safe keeping
= That's why deleted files can often be recovered.

Q: A cache hit rate is 90%, the cache takes 1 ns, and a miss takes 50 ns. What's the average in ns?
A: 5.9 | 5.9 ns | 5.9ns
= 0.9 x 1 + 0.1 x 50 = 5.9.

Q: In `C:\Users\Ada\Documents\report.pdf.exe`, what kind of file is it?
- A PDF document, as the name says that it's a report
* A program
- A folder
= Only the last extension counts, and `.exe` is a program.

Q: Which is a process?
- The `notepad.exe` file sitting on your drive
* Notepad while it's running
- The folder in which Notepad is installed
= A process is a program that's running.

Q: Which is the least access for someone who only needs to read a file?
- Modify
- Full control
* Read
= Least privilege gives only what the task needs.

Q: What runs first when a computer starts?
- The kernel
* The firmware
- The boot loader
= Firmware is on a chip, and it finds the boot loader.

Q: What does a subnet mask decide?
* Which addresses are on your local network
- Which websites your laptop is allowed to visit
- How much data your laptop can download a month
= Anything outside goes to the default gateway.

Q: What does DNS do?
- It encrypts the pages that travel between you and a site
* It turns a name into an address
- It checks that a website's owner is honest
= Encryption is TLS, and nothing automatic proves honesty.

Q: What does a valid padlock prove?
- That the business behind the site is honest
- That the site contains no malware at all
* That the connection is encrypted to that hostname
= Criminals can get valid certificates too.

Q: Which protocol is better for a live voice call?
- TCP, since every lost packet must always be resent
* UDP, since late data is useless in a live call
- HTTP, since it's used for all kinds of web pages
= Resending would add delay that's worse than a tiny gap.

Q: A process is at 0% CPU, using 300 MB of memory. What's the most likely explanation?
* It's waiting for something, and holding memory meanwhile
- It has crashed, and it should be ended straight away
- It's stored on the hard disk, and isn't running at all
= Blocked processes use memory, and almost no processor time.

Q[transfer]: A laptop's fan is loud, it feels hot, and programs are slower than usual, with memory and disk looking normal. What's the most likely thing to check?
* Whether its vents are blocked, as a hot processor slows itself
- Whether the hard disk has run out of free space
- Whether its password has been changed by somebody
= Thermal throttling fits these clues. Storage wouldn't cause heat like this.

Q[transfer]: A colleague says the backup is fine, as "the drive is plugged in and syncing". Ransomware hits. What was wrong with the plan?
- Backups have to be stored in a compressed format
* A connected, synced copy can be encrypted too
- Backups can't be made using an external drive
= Keep a disconnected or versioned copy, and test restoring it.

Q[transfer]: You see `is not recognized as an internal or external command` after typing `ipconfg`. What's the first thing to check?
- Whether the laptop's network cable is plugged in
* The spelling of the command
- Whether Windows has been properly activated
= Windows doesn't know that command, and here it's a typo.

Q[transfer]: A photo posted online reveals where the owner lives. Which fact from this course explains how?
- Pixels are stored using red, green and blue values
* Images can carry metadata, including GPS location
- JPEG compression works by removing some of the detail
= Check location metadata before posting.

Q[transfer]: A fraud analyst receives a file called `statement.pdf`, and its first bytes aren't those of a PDF. What should they conclude?
* The name can't be trusted, so treat the file with caution
- The file must be an ordinary PDF with a small error
- Hex can't be used to examine a file like this one
= Extensions are labels, and bytes show what's really inside.

Q[transfer]: Two programs do the same calculation on the same data. One reads a list in order, and the other jumps around it at random. The first is much faster. Why?
- Lists can only be read in order on Windows laptops
* Spatial locality means that the cache already holds nearby items
- The second one is using a different kind of arithmetic
= Same work, and different use of the cache.

Q[transfer]: You can reach your default gateway, and `ping 8.8.8.8` fails. Where should you look next?
- At your laptop's screen and graphics driver
* At the router's connection to your provider, or the provider itself
- At your laptop's DNS settings for that website
= The local link works. The break is beyond your router.

Q[transfer]: A site you use now shows `â‚¦` where prices should show the naira sign. What's the most likely cause?
* The UTF-8 bytes are being read under the wrong encoding
- The prices in the site's database have all been hacked
- Your laptop's RAM has been damaged and needs replacing
= This is mojibake. The bytes are probably fine.
