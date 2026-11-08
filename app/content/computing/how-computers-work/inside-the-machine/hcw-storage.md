---
id: hcw-storage
pack: How Computers Work · Inside the machine
title: How drives keep your data
minutes: 45
source: David J. Malan · Harvard CS50's Understanding Technology · Hardware
url: https://cs50.harvard.edu/technology/weeks/1/
courses: Helps with COS 101, CSC 101, CYB305
video: https://cdn.cs50.net/cscie1a/2017/fall/lectures/hardware/hardware-360p.mp4
credit: Harvard CS50 · David J. Malan
start: 1531.8
end: 2043
---
# Goal
Explain how hard disks and SSDs physically store bits, compare them, say what deleting really does, and set up a backup that would survive a failure.

# Why
Every drive eventually fails, and when yours does, your preparation decides whether you lose four years of work or nothing. How drives store data also explains why deleted files can often be recovered, which is the basis of digital forensics, and why you should wipe a laptop properly before selling it.

# Lesson
## Non-volatile storage
> Clip: David Malan shows a real hard disk, an animation of how bits are written magnetically, then solid-state and hybrid drives. Deleting and backups come from this lesson.

RAM forgets without power, so computers need **non-volatile storage**. There are two main kinds today.

### Hard disk drives
A **hard disk drive** (HDD) stores bits on spinning metal or glass **platters** coated with a magnetic material. An **arm** with a tiny **read/write head** floats just above the surface.

- **To write:** the head magnetises a tiny region one way or the other, standing for 0 or 1.
- **To read:** the head senses which way each region is magnetised.

Platters spin thousands of times a minute, and 5,400 or 7,200 revolutions per minute (rpm) are common speeds. To reach data, the arm must move to the right ring, and then wait for the disk to spin round. This physical movement is why hard disks are so slow compared with chips, and why a drop while running can destroy one.

### Solid-state drives
A **solid-state drive** (SSD) stores bits as electric charge in **flash memory** chips. With no moving parts, it reads any location almost instantly, and survives knocks far better. A USB flash drive and a phone's storage use similar technology.

Flash cells wear out, as the video says: each cell survives only a limited number of writes. Drives spread writes evenly to last longer, which is called **wear levelling**. For ordinary use, a good SSD lasts many years, but an SSD can fail suddenly and without warning.

| | Hard disk | SSD |
| --- | --- | --- |
| How it stores | Magnetism on spinning platters | Charge in flash chips |
| Speed | Slow, especially for scattered files | Much faster |
| Moving parts | Yes | No |
| Survives knocks | Poorly | Well |
| Cost per GB | Lower | Higher |
| Best for | Cheap bulk storage, backups | Your main drive |

The clip also mentions hybrid drives, which combine both. They are less common now that SSDs have got cheaper.

?? You're buying an external drive just to keep backups cheaply. Which type suits you better, and what's the risk?
=> A hard disk is usually cheaper per GB. It's fragile, so handle it carefully and don't move it while it's running.

## How data is organised on a drive
A drive stores data in fixed-size blocks, called **sectors**, usually 512 or 4,096 bytes. A file larger than that takes many blocks, and they may not even be next to each other. The filesystem keeps track of which blocks belong to which file. You'll meet paths and folders in the next unit, and look deeper at this in the permissions lesson.

## What deleting really does
This surprises most people. When you delete a file:

1. **Recycle Bin:** it's just moved. Nothing is removed.
2. **Emptying the bin:** the filesystem marks the file's blocks as free to reuse. The bits themselves usually stay on the drive for now.
3. **Later:** new files may overwrite these blocks.

Think of removing a chapter from a book's contents page, without tearing out the pages. Until someone reuses those pages, the words are still there. That's why forensic tools and recovery software can often bring back deleted files, particularly on hard disks.

SSDs complicate this. A command called **TRIM** tells an SSD which blocks are free, and the drive may erase them soon after. So recovery from an SSD is often much harder, and it's not something you can rely on.

> Mistake: Believing that deleting or formatting wipes your data. A quick format mainly rewrites the filesystem's records. Before you sell or give away a laptop, use Windows' **Reset this PC** with its option to clean the drive, or rely on drive encryption from the beginning. Encrypted data is unreadable without the key, so it's safe even if deleted blocks remain.

## How to not lose everything
Drives fail, laptops get stolen, and ransomware locks files. A popular rule is **3-2-1**:

| Number | Meaning | Example |
| --- | --- | --- |
| **3** copies | Your original, plus two more | The laptop and two others |
| **2** types of storage | So that one fault can't get them all | The laptop's SSD and an external drive |
| **1** somewhere else | So that fire or theft can't take them all | A cloud copy, or a drive kept elsewhere |

Two rules matter more than any product.

- **Test restoring.** A backup you've never restored is only a hope. Bring one file back, and open it.
- **Disconnect it.** Ransomware can encrypt a drive that's plugged in. Unplug your backup drive between uses.

> Note: Syncing isn't quite the same as backing up. If you delete or damage a file in a synced folder, the change can copy across too. Version history helps, so check whether your service keeps it, and for how long.

Cloud storage needs a strong password and two-factor sign-in, and costs data. And with your 4YOS records, make a backup from Settings on your own schedule.

> Safety: Some warning signs that a hard disk is failing are clicking sounds, freezing, and very slow file access. If you see these, copy your most important files off at once, and don't run heavy repair tools first. An SSD may give no warning, and that's why you back up before anything goes wrong.

# Exercises
?? A friend deleted their file and emptied the bin an hour ago. Which is more likely to allow recovery, a hard disk or an SSD with TRIM, and what should they do at once?
=> A hard disk. They should stop using the drive, because new writes can overwrite those blocks.

?? Your laptop and your backup drive are both in one bag that gets stolen. Which part of 3-2-1 did you miss?
=> The 1: a copy somewhere else.

?? Why can't you trust a backup you've never restored?
=> It may be incomplete, corrupted or missing key files. Only a real restore proves that it works.

# Practice
Work out where your real risks are, without moving or deleting anything you can't get back.

1. Press **Windows key + E**, right-click drive C, and open **Properties**. Note its capacity and free space. Open Task Manager's **Performance** tab, click **Disk**, and note whether it's an SSD or HDD.
2. List your three most important folders. For each, write how many copies exist, on how many types of storage, and whether one is elsewhere.
3. Pick your most important unbacked-up folder, and copy it to a second place now: an external drive, a flash drive or a cloud service you trust.
4. Test it: open one file from the copy, to confirm that it works.
5. Write what still needs doing to reach 3-2-1, and by what date.
6. Make a 4YOS backup from Settings, if you haven't.

# Rubric
- I found the real type and capacity of my drive.
- I made a real second copy of something important, and opened a file from it.
- I wrote down what's still missing, with a date.

# Summary
- Hard disks store bits magnetically on spinning platters. SSDs store them as charge in chips.
- SSDs are faster and tougher, and hard disks are cheaper per GB.
- Deleting usually only marks space as free, so data often remains until overwritten.
- To dispose of a laptop, use a proper reset with cleaning, or rely on encryption.
- Follow 3-2-1. Test your restores, and keep backups disconnected.

# Check
Q: How does a hard disk store a bit?
- As a tiny electric charge inside a flash chip
* As a magnetised region on a spinning platter
- As a dot of ink on a small rotating cylinder
= The head magnetises the surface. Charge in chips is how an SSD works.

Q: Why are hard disks slower than SSDs?
* The arm and platters have to physically move
- Hard disks use a different kind of alphabet
- Hard disks hold fewer files than SSDs do
= Physical movement takes far longer than reading a chip.

Q: Why does an SSD use wear levelling?
- To keep the drive from heating up in a small laptop
- To make the drive spin at a much more even speed
* Flash cells survive only a limited number of writes
= Spreading writes evenly helps the drive last longer.

Q: You empty the Recycle Bin. What usually happens right away on a hard disk?
- The file's bits are all overwritten with zeros
* The file's space is marked free, and the bits remain for now
- The file is moved to a hidden folder on the desktop
= That's why recovery tools can often work, until the space is reused.

Q: What does TRIM do?
- It shortens long file names to save space
* It tells an SSD which blocks are free to erase
- It cuts the end off a video to make it smaller
= It makes recovering deleted files from an SSD much harder.

Q: What does the 1 in the 3-2-1 rule mean?
* One copy kept somewhere else
- One backup made each day
- One password for all of your files
= So that fire or theft can't take all your copies.

Q: Why should a backup drive be disconnected between uses?
- It saves on the laptop's electricity bill for the month
* Ransomware can encrypt a drive that's plugged in
- A connected drive stops the laptop from starting up
= A disconnected drive can't be reached by malware.

Q: What really proves that a backup works?
- The backup program says that it has finished
- The backup drive has plenty of free space on it
* Restoring a file from it, and opening it
= A backup you've never restored is only a hope.

Q[transfer]: You're selling your old laptop. What's the right step?
- Delete your files, and empty the Recycle Bin
- Just sign out of your account before handing it over
* Use Reset this PC and clean the drive, or rely on drive encryption
= Plain deleting leaves data recoverable.

Q[transfer]: An investigator finds a deleted file on a suspect's hard disk. How is that possible?
* The blocks were marked free, but hadn't been overwritten yet
- Hard disks keep a hidden second copy of every file forever
- The file was never really on the disk in the first place
= This is the basis of much digital forensics.

Q[transfer]: Your files sync to the cloud automatically, and ransomware encrypts them. What may happen?
- The cloud copies stay unchanged, because they are in the cloud
* The encrypted versions may sync over the good copies
- The ransomware stops working when it sees a cloud folder
= Syncing copies changes. You need version history or a separate backup.

# Cards
How do hard disks and SSDs store bits? :: Hard disks use magnetism on spinning platters. SSDs use electric charge in flash chips.
What happens to a file's bits when you delete it and empty the bin? :: The space is marked free, and the bits usually remain until overwritten.
What's the 3-2-1 backup rule? :: Three copies, on two types of storage, with one kept elsewhere.
Why test a backup? :: Only restoring a file proves that it works.
What's wear levelling? :: Spreading writes evenly, because flash cells wear out.

# Further
- Harvard CS50's Understanding Technology, Hardware notes :: https://cs50.harvard.edu/technology/notes/1/
- Microsoft Support, recovery options in Windows :: https://support.microsoft.com/en-us/windows/reset-your-pc-0ef73740-b927-549b-b7c9-e6f2b48d275e
