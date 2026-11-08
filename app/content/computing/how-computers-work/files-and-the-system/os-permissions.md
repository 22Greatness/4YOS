---
id: os-permissions
pack: Operating systems and networks
title: See who can use a file
minutes: 45
source: Mike Murphy · Coastal Carolina University · Filesystems
url: https://ww2.coastal.edu/mmurphy2/materials/forensics/evidence/filesystems/
courses: UNIPORT (expected) CSC 308 · NOUN NOU-CYB-111, CYB305
lecture: yes
credit: Coastal Carolina University · Mike Murphy
licence: CC BY-SA 4.0
start: 39.78
end: 197.94
---
# Goal
Explain what a filesystem stores besides your data, read a file's Windows permissions, and pick the least access that lets a task be done.

# Why
Access control is the most common security control in the world, and getting it wrong causes many real breaches. Wrong sharing settings expose private data with no hacking at all. In forensics at NOUN, file metadata such as timestamps becomes evidence. And when you run a web server or database later, the first question is always who can read and write what.

# Lesson
## What a filesystem is
> Clip: The video is about filesystems: how they organise a drive, and the metadata they keep, including owners and permissions. It mentions permissions only briefly, so the rules for reading and choosing them come from this lesson.

A storage device on its own is a huge run of numbered blocks with no structure. Before use, it's divided into **partitions**, and each is given a **filesystem**. The filesystem is the data structure that turns those blocks into named files in folders, so that data can be found and stored. Windows normally uses **NTFS** on its main drive. USB sticks often use **FAT32** or **exFAT**, and Linux commonly uses **ext4**.

## Metadata: data about your data
Along with a file's contents, the filesystem keeps **metadata**.

| Metadata | Tells you | Why it matters |
| --- | --- | --- |
| Name and location | How to find it | Paths |
| Size | How many bytes | Storage |
| Owner | Who is responsible for it | Who can change its rules |
| Permissions | Who can do what | Security |
| Created time | When it first appeared there | Forensics |
| Modified time | When its contents were last written | Forensics |
| Accessed time | When it was last read, if recorded | Forensics, with care |

So a file's name isn't inside the file. It's in the filesystem's records. That's why renaming a file leaves its bytes unchanged, and why it doesn't change a SHA-256 hash, which you'll see in another lesson.

> Note: Timestamps are evidence, but imperfect. Copying a file typically gives the copy a new created time, while keeping the modified time. So a file can appear to have been modified before it was created. An investigator needs to know these rules before relying on them. They can also be altered deliberately.

Permissions are only possible if the filesystem stores them. NTFS and ext4 do. FAT32 and exFAT don't, so anyone who plugs in that USB stick can read everything on it, regardless of what your PC's accounts are.

?? You copy a confidential file from your NTFS drive onto an exFAT USB stick. What happens to its permissions?
=> They're lost, because exFAT can't store them. Anyone with the stick can open it. Encrypt it if it matters.

## How Windows decides
A path tells Windows **where** a file is. Permissions decide **whether** you may use it. Knowing a file's location gives you no access to it.

When a process tries to open a file, Windows compares two things:

1. The process's **identity**: the user it runs as, and all that user's groups.
2. The file's **access control list**, or ACL: a list of entries, each saying a user or group is allowed or denied certain actions.

So access mainly depends on who is asking, and not on which program is asking. If you run a malicious program, it can read anything you can.

### The standard NTFS permissions
| Permission | Lets you | Includes |
| --- | --- | --- |
| Read | View contents and attributes | |
| Read and execute | Also run it, if it's a program | Read |
| Write | Change contents, add data | |
| Modify | Read, write and delete | Read, write |
| Full control | Everything, including changing permissions and taking ownership | Modify |

A few rules explain most of what you'll see.

- **Inheritance.** Files normally take their permissions from their parent folder. Greyed-out ticks in the Security tab show inherited entries.
- **Groups add up.** Your effective access combines entries for you and for all your groups.
- **Deny beats allow**, in general, when entries conflict at the same level.
- **Administrators can take ownership**, so permissions don't protect you against an administrator of that machine.
- **Permissions only apply while the OS is enforcing them.** Someone who removes your drive and reads it from another system is not bound by Windows' checks. This is why stolen laptops need **encryption**, such as BitLocker.

## Least privilege
The **principle of least privilege** says that a person or process should get only the access needed for its task, for only as long as it's needed.

### Worked example: choose the permission
| Task | Least access | Why not more |
| --- | --- | --- |
| A reviewer reads your report | Read | Modify would let them change or delete it, by accident or otherwise |
| A teammate edits a shared document | Modify, on that one file | Full control would let them change who else has access |
| A backup tool saves copies | Read on the sources, Write on its destination | It doesn't need to change the originals |
| A daily-use account on your laptop | Standard user | Administrator rights would be given to anything you run |

Least privilege doesn't stop an attack. It limits how much harm one can do, so malware running under a limited account can reach far less than under an administrator's.

> Mistake: Solving "access denied" by giving **Everyone** Full control. It works instantly, and it removes the protection for all accounts. Find which identity needs which right, and give only that.

The same idea applies to shared links. "Anyone with the link can edit" on a cloud document is a permission decision, and a common source of real data leaks.

## Reading permissions
**In File Explorer:** right-click a file, then **Properties**, then the **Security** tab. Select a group or user above to see their permissions below.

**At the command line:** `icacls` shows the ACL.

```text
icacls "C:\Users\Ada\Documents\notes.txt"
```

```text
C:\Users\Ada\Documents\notes.txt NT AUTHORITY\SYSTEM:(I)(F)
                                 BUILTIN\Administrators:(I)(F)
                                 DESKTOP-1\Ada:(I)(F)
```

| Code | Meaning |
| --- | --- |
| `(I)` | Inherited from the parent folder |
| `(F)` | Full control |
| `(M)` | Modify |
| `(RX)` | Read and execute |
| `(R)` | Read |
| `(W)` | Write |

So the above says SYSTEM, Administrators and Ada each have inherited Full control. This is the normal layout for a file in your own documents. `SYSTEM` is the account Windows itself runs as.

> Safety: Used with no options other than a path, `icacls` only reads. Options like `/grant` and `/reset` change permissions, and a wrong one can lock you out, so leave those for later and for test files.

# Exercises
?? In `icacls` output, you see `BUILTIN\Users:(RX)`. What can the Users group do?
=> Read the file and run it if it's a program. It can't change it.

?? You know the full path of a file holding someone else's exam script. Does knowing the path let you read it?
=> No. The path says where it is. Whether you can read it depends on the permissions and your identity.

?? Someone with your stolen laptop boots it from a USB stick running Linux. Do your NTFS permissions stop them reading your files?
=> No. Permissions are enforced by the running OS, and they're now running a different one. Drive encryption is what protects you here.

# Practice
Read, but don't change. Use a non-sensitive file you own, in a local folder.

1. Right-click the file, open **Properties**, then the **Security** tab. If there's no Security tab, it's probably on exFAT or FAT32, so pick a file on drive C.
2. Click each listed group or user, and note the permissions they hold. Are they inherited?
3. Open Command Prompt: press the Windows key, type `cmd` and press Enter. Type or paste the command, then press Enter. In File Explorer, click the file and press Ctrl + Shift + C to copy its path with its quotes. Then replace all of `"PASTE THE FILE PATH HERE"` with it, including those quotes, so that the path has only one pair. Match what you see to what the Security tab showed.
4. Decode one line using the table in the lesson.
5. Now imagine a reviewer who needs only to read this file. What would you give them, and what would you avoid giving?

Describe the entries by role, such as "my account" or "a system group". Keep your account name and path out of your answer. Leave the rules as you found them.

# Command
```text
icacls "PASTE THE FILE PATH HERE"
```

# Rubric
- I read real permissions in both the Security tab and `icacls`, and matched them.
- I decoded a real line, including the inherited marker.
- I changed nothing, and I chose the least access for the imagined reviewer.

# Summary
- A filesystem turns raw blocks into named files, and stores metadata beside them.
- Permissions depend on the identity of the requesting process, not on the path or the program.
- NTFS stores permissions. FAT32 and exFAT don't.
- Least privilege means giving only the access a task needs. Never fix errors by giving Everyone Full control.
- Permissions don't protect against a stolen drive. That takes encryption.

# Check
Q: A reviewer only needs to read a file. Which permission best follows least privilege?
* Read
- Modify, so they can correct any errors
- Full control, so that they never get blocked
= Read is enough. Modify and Full control allow changes that the reviewer doesn't need.

Q: Where is a file's name normally stored?
- At the start of the file's own contents
* In the filesystem's records, as metadata
- In the computer's RAM, for as long as it's on
= The name lives in the filesystem's metadata, so renaming leaves the bytes untouched.

Q: Which permission allows someone to change who else can access a file?
- Read and execute
- Modify
* Full control
= Full control includes changing permissions. Modify allows reading, writing and deleting.

Q: In `icacls` output, what does `(I)` mean?
- The file is important to the system
* The entry is inherited from the parent folder
- The file can't be opened by this user
= `(I)` marks an inherited entry.

Q: In `icacls` output, what does `(F)` mean?
A: Full control | full | full access
= `(F)` is Full control. `(M)` is Modify, `(R)` is Read, and `(W)` is Write.

Q: What decides whether a program you run can open a file?
- The name of the program, and when it was installed
* The identity it runs as, compared with the file's ACL
- The file's size, compared with the amount of free memory
= Access depends on the identity behind the process, checked against the file's list of entries.

Q: Which filesystem can't store Windows file permissions?
- NTFS
* exFAT
- It doesn't vary, since all filesystems store them
= exFAT and FAT32 don't store permissions, so anyone with the drive can read it.

Q: What does least privilege do when an account is compromised?
- It stops the attack from happening in any case
* It limits how much harm the attacker can do
- It makes the attack visible to everyone at once
= It doesn't prevent compromise. It limits what a compromised account can reach.

Q[transfer]: A web server program needs to read its page files. Which is the best setup?
- Run it as administrator, so that nothing can ever block it
* Run it as a limited account that can only read those files
- Give Everyone Full control on the folder with those files
= If the server is compromised, a limited account limits the damage.

Q[transfer]: You share a cloud folder with "Anyone with the link can edit" so a classmate can read a file. What's the problem?
* Anyone holding the link can change or delete it
- Cloud folders are not able to hold more than one classmate
- Links stop working as soon as a file is edited by someone
= That's more access, for more people, than the task needs. "Specific people can view" fits better.

Q[transfer]: In an investigation, a file's modified time is earlier than its created time. What's the most likely innocent explanation?
- The clock on the computer has stopped working completely
* The file was copied, so the copy got a new created time
- This is impossible, so the file must have been forged
= Knowing how a filesystem sets timestamps stops you from jumping to a false conclusion.

# Cards
What is metadata? :: Data about data, such as a file's name, size, owner, permissions and timestamps.
What is least privilege? :: Give a person or process only the access needed for its task, and only for as long as needed.
What two things does Windows compare when a process opens a file? :: The process's identity and groups, and the file's access control list.
Why doesn't NTFS protect a stolen laptop's files? :: Permissions are enforced by the running OS, and another OS can ignore them. That takes encryption.
What do (I), (F), (M), (R) mean in icacls output? :: Inherited, Full control, Modify, Read.

# Further
- Microsoft Learn, icacls command :: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/icacls
- Microsoft Learn, access control overview :: https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/access-control
- Mike Murphy, Filesystems, full lecture and notes :: https://ww2.coastal.edu/mmurphy2/materials/forensics/evidence/filesystems/
