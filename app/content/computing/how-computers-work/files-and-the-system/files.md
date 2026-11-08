---
id: files
pack: Using your computer
title: Find a file and read its location
minutes: 30
source: Microsoft Support · File Explorer in Windows
url: https://support.microsoft.com/en-us/windows/experience/fileexplorer/file-explorer-in-windows
courses: UNIPORT (expected) COS 101, GES 101.2 · NOUN GST103
---
# Goal
Read and write a full Windows file path, recognise a file by its extension, and set up one folder system for both schools that you can always find your way around.

# Why
You will hold course material from two universities, assignments, datasets and code for years. Losing a file before a NOUN deadline costs real marks. Paths also come straight back in programming, where a program opens files by path, and in security, where a fake extension is a classic trick. This skill looks small, and it is used every day of the degree.

# Lesson
## Files, folders and paths
A **file** is one named item of stored information: a PDF, a photo, a program. A **folder** (also called a directory) holds files and other folders. Folders inside folders form a tree.

A **path** is the exact address of an item in that tree. Read this one from left to right:

```text
C:\Users\Ada\Documents\NOUN\COS101\tma1.docx
```

| Part | Meaning |
| --- | --- |
| `C:` | The drive |
| `\` | A separator between levels |
| `Users\Ada` | The account's home folder |
| `Documents\NOUN\COS101` | Folders going deeper |
| `tma1.docx` | The file: its name, then its extension |

Two files can share a name as long as they sit in different folders, because their full paths differ. So `tma1.docx` in `NOUN\COS101` and `tma1.docx` in `NOUN\STA111` are completely separate. This is why the name alone never tells you which file you have.

> Mistake: Working on a copy by accident. You download `notes.pdf` twice, get `notes (1).pdf`, edit one and submit the other. Before you submit anything, check the full path of the exact file you are uploading.

?? What is the folder directly containing this file: `C:\Users\Ada\Documents\UNIPORT\STA112\week3.xlsx`?
=> `STA112`. The last part is the file itself, and the part just before it is its parent folder.

## Moving around File Explorer
Press **Windows key + E** to open File Explorer. The address bar at the top shows where you are. Each part is a button that jumps back to that level. Click the empty space in the address bar and it shows the full path as text, ready to copy.

Useful shortcuts:

| Do this | To get this |
| --- | --- |
| Windows key + E | Open File Explorer |
| Click empty space in the address bar | See the full path as text |
| Alt + Up arrow | Go up one folder |
| Ctrl + Shift + C on a selected file | Copy its full path |
| F2 on a selected file | Rename it |
| Type in the search box | Search this folder and the ones inside it |

## Extensions tell Windows what a file is
The letters after the last dot are the **extension**. `.pdf` is a PDF, `.xlsx` an Excel workbook, `.py` Python code, `.exe` a program Windows can run. The extension tells Windows which app to open it with. It does not change what is inside. Renaming `photo.jpg` to `photo.pdf` does not make it a PDF, it just confuses Windows.

Windows hides common extensions by default. Turn them on, because it protects you. In File Explorer choose **View**, then **Show**, then **File name extensions**.

> Safety: Attackers name a program `results.pdf.exe`. With extensions hidden, you may see only `results.pdf`, with the look of a document. It is a program, and opening it runs it. Keep extensions visible, and treat any `.exe`, `.bat`, `.scr` or `.js` file from a message or unknown site as dangerous until proven otherwise.

?? With extensions showing, you see `Course Outline.pdf.exe`. What kind of file is it really?
=> A program. Only the last extension counts, and here it is `.exe`. The `.pdf` is just part of the name, probably there to fool you.

## A folder system for two schools
Decide your system once and use it for years. Keep it simple enough that you never need to think about where a file goes.

```text
Documents
  UNIPORT
    100 level
      STA111
        notes
        assignments
  NOUN
    100 level
      COS101
        material
        TMAs
```

Three rules make this work:

- **One place per course.** Each course code gets one folder under its school.
- **Names that sort and explain.** `2026-11-05 TMA1 draft.docx` tells you what it is and sorts by date, unlike `final final new.docx`.
- **Keep UNIPORT and NOUN apart.** Credits and rules differ, and you must never submit one school's work to the other.

Plain names are safest. Letters, numbers, spaces, hyphens and dots all work, while Windows forbids `\ / : * ? " < > |` in file names. Later, when you write code, names without spaces will save you trouble.

> Note: A folder system is not a backup. If this laptop is stolen or its drive fails, every file in it goes too. Keep a second copy of anything you cannot replace on a separate drive. 4YOS backs up its own records, but not your other files.

# Exercises
?? Write the path of a file `lab2.py` inside a folder `CSC183`, inside `UNIPORT`, inside `Documents`, for an account called `Ada` on drive C.
=> `C:\Users\Ada\Documents\UNIPORT\CSC183\lab2.py`

?? You move `tma1.docx` from `Downloads` to `Documents\NOUN\COS101`. Which part of its path changes and which stays the same?
=> The folders change. The file name and its contents stay the same.

?? A friend sends `timetable.xlsx` and you rename it `timetable.pdf`. What happens when you double-click it?
=> Windows tries to open it with your PDF reader, which will fail or complain, because the contents are still a spreadsheet. Renaming it back fixes it.

# Practice
Set up the real system you will use.

1. Press Windows key + E and turn on **File name extensions** under View, then Show.
2. In Documents, create `UNIPORT` and `NOUN`. Inside each, create a folder for at least one course you expect to take. Use your real course codes when you have them.
3. Move one real study file into the right folder. If you have none yet, create an empty text file named with today's date.
4. Click the address bar to see the full path, and press Ctrl + Shift + C on the file to copy it.
5. Close File Explorer, open it again and get back to the file using only the address bar.

Describe what you did and the rule you will follow for naming files. You do not need to paste your real path.

# Rubric
- File extensions are now visible on this laptop.
- I have a folder for each school, and at least one real course folder inside.
- I got back to a file using the path, not by searching.

# Summary
- A path is a file's exact address: drive, folders, name, extension.
- Two files can share a name in different folders. Check the full path before you submit.
- The extension tells Windows how to open a file, and renaming does not change what is inside.
- Keep extensions visible. `something.pdf.exe` is a program.
- One folder per course, names that explain themselves, and keep the two schools apart.

# Check
Q: You see two files named `tma1.docx`. What tells you which is in your COS101 folder?
- The name, since each file has its own
* The full path
- The file's icon and how big it is
= Same names can exist in different folders. Only the full path identifies the file.

Q: What does the extension `.xlsx` tell Windows?
* Which kind of file it is, and so which app to use
- How many times the file has been edited and saved
- Which folder on the drive the file belongs in
= The extension marks the file type. The folder is part of the path.

Q: In `C:\Users\Ada\Documents\NOUN\COS101\tma1.docx`, which is the parent folder of the file?
- `NOUN`
* `COS101`
- `Documents`
= The parent is the folder directly containing the file, the last part before its name.

Q: You rename `photo.jpg` to `photo.txt`. What changes?
* Only the name, and so the app Windows tries to use
- The picture's contents are converted into readable text
- The picture is deleted and a new empty file is created
= Renaming changes the label, not the bytes inside.

Q: Which keyboard shortcut opens File Explorer?
- Ctrl + E
- Alt + F4
* Windows key + E
= Windows key + E opens File Explorer. Alt + F4 closes a window.

Q: You move a file to another folder. What happens to its path?
* It changes, because the folders in it differ
- It stays the same, because the file name did not change
- The file now has two paths, one for each location
= A path includes the folders, so moving a file changes its path.

Q: Which file name will help you most six months from now?
- `final new 2 use this one really final.docx`
* `2026-11-05 COS101 TMA1 draft.docx`
- `document.docx`
= It says what the file is and when, and date-first names sort in order.

Q: Which of these characters is not allowed in a Windows file name?
- A hyphen
- A dot
* A question mark
= Windows forbids `\ / : * ? " < > |` in file names.

Q[transfer]: A message from an unknown number says "see your scholarship letter" and attaches `Letter.pdf.scr`. What should you do?
- Open it, since the name says pdf and you were expecting a letter
- Rename it to `Letter.pdf` first and then open that
* Treat it as a program and leave it unopened
= Only the last extension counts. `.scr` files run as programs, and renaming would not make it safe.

Q[transfer]: Your Python program says it cannot find `data.csv`, but you can see the file in File Explorer. Which is the most likely cause?
- Python cannot read csv files unless a paid add-on is installed
* The program is looking in a different folder
- The file is too new
= A file is found by its location. The name existing somewhere is not enough, and this is the same idea as a path.

Q[transfer]: You submit a NOUN assignment and later find you uploaded last week's draft from Downloads. Which habit from this lesson would have prevented it?
- Hiding file extensions so that the names look cleaner
* Checking the full path of the exact file first
- Giving every file the same name so they stay together
= Copies with the same or similar names are easy to mix up. The path tells you which one you picked.

# Cards
What is a file path? :: The exact address of a file: drive, then the folders, then the name and extension.
Why might `results.pdf.exe` be dangerous? :: Only the last extension counts, so it is a program made to look like a document.
Does renaming a file's extension change its contents? :: No. It only changes the label and which app Windows tries to use.
What is a parent folder? :: The folder directly containing an item.

# Further
- Microsoft Support, File Explorer in Windows :: https://support.microsoft.com/en-us/windows/experience/fileexplorer/file-explorer-in-windows
- Microsoft Learn, file naming rules and paths :: https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file
