---
id: memory
pack: How computers work
title: Memory and persistent storage
minutes: 40
source: Harvard CS50's Understanding Technology · Hardware · CC BY-NC-SA 4.0
url: https://cs50.harvard.edu/technology/notes/1/
courses: UNIPORT (expected) COS 101, CSC 101 · NOUN COS101, GST103
lecture: yes
credit: Harvard CS50 · David J. Malan
start: 1265
end: 1558
---
# Goal
Explain what the processor, RAM and storage each do, follow a document from opening to saving, and use Task Manager to tell which resource is really running short.

# Why
This explains everyday problems you can fix yourself: why unsaved work vanishes in a power cut, and why deleting files does not make a slow laptop faster. It also comes up in first-year exams, and it is the base for operating systems at 300 level. In security, what sits in memory and what stays on the drive decides what a forensic investigator can recover.

# Lesson
## Three parts with different jobs
> Clip: The video starts mid-sentence, on RAM, then spends some time on processor speed and cores. It ends as it introduces hard disks, so it never reaches SSDs. This lesson covers the rest, and it matters more than the clip for the check.

| Part | Job | Speed | Keeps data without power? |
| --- | --- | --- | --- |
| Processor (CPU) | Carries out instructions | Fastest | No |
| RAM | Working memory for what is running now | Very fast | No |
| Storage (SSD or hard disk) | Keeps files and programs for later | Much slower | Yes |

**The processor** does the work: arithmetic, comparisons, deciding which instruction comes next. Its speed is given in gigahertz, where 1 GHz means a billion cycles a second. A **core** is an independent processing unit inside the chip, so a four-core processor can truly do four things at once. Clock speed alone does not decide how fast a computer feels, because the chip design and the amount of memory matter too.

**RAM**, or random access memory, is where programs and their data sit while in use. It is **volatile**: its contents depend on power, and when power goes, they go.

**Storage** is **non-volatile**, so it keeps its contents with the power off. A hard disk drive stores data on spinning magnetic platters with a moving arm. A solid-state drive, or SSD, stores it in flash memory chips with no moving parts, which is why it is so much faster and survives being knocked better.

> Note: "Memory" and "storage" are often mixed up in shops and adverts. "A laptop with 512 GB of memory" nearly always means storage. In this course and in exams, memory means RAM.

## Why have both?
If RAM is so fast, why not use only RAM? Because it costs far more per gigabyte and forgets everything without power. And if storage keeps data, why not use only storage? Because it is far too slow for the processor to work from directly. The gap is huge: by rough, commonly quoted figures, reading from RAM takes around 100 nanoseconds, from an SSD around 100 microseconds, and from a hard disk around 10 milliseconds. So an SSD can be about a thousand times slower than RAM, and a hard disk about a hundred thousand times.

This is called the **memory hierarchy**: small and fast near the processor, large and slow further away. Inside the processor there are even smaller, faster stores called registers and cache. The computer constantly copies what it needs into the faster levels.

## Follow a document
Here is what happens when you work on an assignment.

1. **Open.** The app reads the file from storage and copies it into RAM. The copy on the drive is untouched.
2. **Edit.** Your typing changes the copy in RAM. The processor does the work. The file on the drive is still the old version.
3. **Save.** The app writes the current version from RAM back to storage. Only now does the file on the drive change.
4. **Close or shut down.** RAM is released. The saved file remains.

So in a power cut, you lose everything since your last save, because only RAM held it. A laptop battery protects you from that for a while, and a desktop on mains power gets no such protection, unless it has a backup power unit.

> Mistake: Thinking autosave means your work is always safe. Autosave protects you only if it has actually written your changes to storage, and it runs at intervals or only under certain conditions. For Word, it may depend on the settings and on whether the file is in OneDrive. Press Ctrl + S yourself, and do it often.

?? You open a document, delete half of it and have not saved. The power fails. What is in the file on the drive?
=> The full old version. Your deletion only happened to the copy in RAM, so losing power loses the deletion. This can actually rescue you.

## Two different shortages
Slow computers and full computers are different problems.

| You see | Likely resource | What helps | What doesn't |
| --- | --- | --- | --- |
| Everything slows when many apps or tabs are open | RAM | Close apps and tabs, or add RAM | Deleting files |
| Windows warns that the disk is full, or a download fails for lack of space | Storage | Delete or move files | Closing apps |
| A single heavy task is slow while memory is fine | Processor | Wait, or use fewer heavy apps at once | Deleting files |

When RAM runs out, Windows moves some of what is in memory to a **page file** on the drive. This keeps programs running but is far slower, so the whole machine drags, with the disk very busy. That is why low memory can show up as high disk activity.

### Reading Task Manager
Press **Ctrl + Shift + Esc**, and choose **Performance**.

- **Memory** shows how much RAM the machine has in total, and how much is in use right now.
- **Disk** shows how busy each drive is as **Active time**, not how full it is. To see how full a drive is, right-click it in File Explorer and open Properties.
- **CPU** shows how busy the processor is, and its speed and number of cores.

Live usage readings change second by second. Capacity, such as the total RAM, stays the same. Do not mix them up.

> Note: Windows 11's Notepad can bring back unsaved tabs, because it writes its session to disk in the background. That is a feature of that one app. Most programs will not save you this way, so do not rely on it.

## Why this matters for security
Because RAM holds what programs are using right now, it can hold things that are never written to a file in plain form, such as an open document or a password you have just typed. That is why forensic investigators may try to capture memory before powering a machine down, since turning it off destroys that evidence. And data on a drive stays until overwritten, so a deleted file may be recoverable. Encrypting a drive is what protects you if the laptop is stolen. You will study this properly in digital forensics at NOUN.

# Exercises
?? Your laptop has plenty of free drive space, but it slows badly with 40 browser tabs open. Will deleting old videos help?
=> No. That frees storage, while this looks like a RAM shortage. Closing tabs will help.

?? A friend says their computer has "16 GB of memory and 512 GB of memory". What do they most likely mean?
=> 16 GB of RAM and 512 GB of storage.

?? Why does restarting a computer often fix a slow machine, without deleting any files?
=> It empties RAM and stops whatever was running, so memory and processor become free again. Storage is unchanged.

# Practice
Investigate this laptop, using real readings.

1. Open Task Manager with Ctrl + Shift + Esc and choose Performance.
2. Under Memory, write the total RAM and the amount in use. Under CPU, write the number of cores.
3. Open three apps you normally use, wait ten seconds and read Memory again. Close them, wait and read it again.
4. Open File Explorer, right-click drive C and choose Properties. Write the drive's capacity and free space.
5. Write which of these numbers are capacities and which are live readings. Based on what you found, which is the tighter resource on this laptop right now, and what would you do about it?

# Rubric
- I took real readings from this laptop, before and after opening apps.
- I told capacities apart from live usage readings.
- I can say what would and would not help with the resource that is tightest.

# Summary
- The processor carries out instructions, RAM holds what is running now, and storage keeps data for later.
- RAM is volatile and loses everything without power. Storage is non-volatile.
- Opening copies a file into RAM, editing changes that copy, and only saving changes the drive.
- Low RAM and a full drive are different problems with different fixes.
- Disk Active time means how busy a drive is, not how full it is.

# Check
Q: Where should a document be written so it survives a normal shutdown?
- Ordinary RAM, which is what programs use
- A register inside the processor chip
* Storage such as an SSD
= Storage is non-volatile. RAM and processor registers lose their contents without power.

Q: You are editing a document and have not saved. Where are your latest changes?
* In RAM
- On the SSD, as a separate saved copy
- In the screen, which holds what it shows
= Editing changes the working copy in RAM. Only saving writes them to the drive.

Q: Which part carries out a program's instructions?
- RAM, which holds running programs
* The processor
- The SSD, which holds saved files
= RAM and storage hold information, and the processor does the work on it.

Q: What does volatile mean, when describing RAM?
- It's likely to overheat when it has been used for a long time
- It's easy to remove and steal from a desktop computer
* It loses its contents without power
= Volatile memory depends on power to keep what it holds.

Q: Why can an SSD survive being knocked better than a hard disk?
- It has more capacity than any hard disk ever made
* It has no moving parts
- It stays cooler, because it's used far less often
= A hard disk has spinning platters and a moving arm. An SSD stores data in chips.

Q: Windows warns your drive is almost full. What helps?
- Closing all of your browser tabs and other apps
* Deleting or moving large files
- Restarting the computer a few times over
= Storage holds saved files, so only removing or moving files frees it. Closing tabs frees RAM.

Q: In Task Manager, Disk shows Active time at 100%. What does this mean?
- The drive is completely full and has no space left
* The drive is very busy right now
- The drive has failed, and must now be replaced
= Active time measures how busy a drive is. Free space is shown in the drive's Properties.

Q: When RAM runs out, what does Windows do to keep programs running?
- It deletes your least used files
* It moves some memory contents to a page file on the drive
- It closes every program
= The page file keeps things running at a much slower speed, which is why low memory can show up as disk activity.

Q[transfer]: You lose power while writing a NOUN assignment. You last pressed save 25 minutes ago. Assuming no autosave ran, what do you still have?
- Everything, because it was on the screen
* The version from 25 minutes ago
- Nothing, because the file was open
= The file on the drive is the last saved version. Changes since then were only in RAM.

Q[transfer]: An investigator arrives at a running computer that may hold evidence. Why might they capture memory before switching it off?
- Switching it off would erase everything on the hard drive
* What's only in RAM is lost when the power goes
- RAM is the only place files are ever saved
= RAM is volatile, so turning the machine off destroys what it held. Drive contents would remain.

Q[transfer]: You are choosing between two laptops at the same price for running several programs at once. One has more RAM and the other has more storage. All your files already fit on both. Which suits this need better?
* The one with more RAM
- The one with more storage
- There is no difference for this need
= Running many programs at once uses RAM. Extra storage does not help when your files already fit.

# Cards
What is the difference between RAM and storage? :: RAM is fast working memory that loses its contents without power. Storage keeps data with the power off.
What does saving a file actually do? :: Writes the current version from RAM to storage. Before that, the file on the drive is unchanged.
Your laptop is slow with many apps open. Will deleting files help? :: No. That is usually a RAM shortage. Close apps instead. Deleting files only frees storage.
What does Disk Active time in Task Manager measure? :: How busy the drive is, not how full it is.
Why is a computer with a little RAM slow and its disk busy? :: Windows moves memory contents to a page file on the drive, which is far slower.

# Further
- Harvard CS50's Understanding Technology, Hardware notes :: https://cs50.harvard.edu/technology/notes/1/
- Operating Systems: Three Easy Pieces, free book on how memory is managed :: https://pages.cs.wisc.edu/~remzi/OSTEP/
