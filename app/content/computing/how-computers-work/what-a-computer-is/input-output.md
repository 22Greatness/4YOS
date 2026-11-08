---
id: input-output
pack: What a computer does
title: Follow information through a computer
minutes: 30
source: GCFGlobal · Computer Basics
url: https://edu.gcfglobal.org/en/computerbasics/
courses: UNIPORT (expected) COS 101, CSC 101 · NOUN COS101, GST103
lecture: original
credit: Code.org · What Makes a Computer, a Computer?
licence: CC BY-NC-ND 4.0
lectureTranscript: https://studio.code.org/courses/csd-videos/units/1/lessons/1/levels/1
start: 0
end: 309.142
---
# Goal
Trace any task on a computer as input, processing, storage and output, and say which part of the machine does each job.

# Why
Every topic in both your degrees sits on this model. Programming is writing the processing step. Statistics is deciding what the input means. Cybersecurity is asking who can see or change the information at each stage. If you can trace information through a task, you always have somewhere to start, even on a machine or program you have never seen.

# Lesson
## The four things a computer does
> Clip: Follow the four jobs as the presenters move from a button press to a result. Watch for an output that is not a screen image, such as a signal to a robot. The lesson below adds a worked Windows task and separates temporary memory from saved files.

A computer is a machine that follows stored instructions to work on information. Whatever it looks like, a phone, a laptop or a bank's server, it does four things. It takes **input**, it **processes** it, it **stores** it, and it gives **output**.

| Stage | What happens | Examples |
| --- | --- | --- |
| Input | Information enters the task | Keys you press, a photo from the camera, a file being opened, data arriving from the internet |
| Processing | Instructions change or compare the information | Adding numbers, searching for a word, shrinking a photo |
| Storage | Information is kept for later | A saved document on the drive, a contact on your phone |
| Output | The result leaves the task | Text on the screen, sound, a printed page, a message sent to another computer |

Input does not have to come from a person, and output does not have to go to one. When your phone checks the time with a server, one computer's output is the other computer's input. This is how most of the world's computing happens.

### Worked example: a calculator app
Suppose you type 12 + 30 and press equals.

1. **Input:** the keys 1, 2, +, 3, 0 and =.
2. **Processing:** the app turns those key presses into two numbers and an instruction to add them. The processor does the addition.
3. **Output:** 42 appears on the screen.
4. **Storage:** usually none that lasts. Close the app and the sum may be gone, unless the app keeps a history. To find out which, you test it.

?? Sending a WhatsApp message is one task made of many steps. Name one input, one piece of processing, one storage and one output.
=> Input: the characters you type. Processing: the app encrypts the message and prepares it for sending. Storage: the chat history is written to your phone. Output: the encrypted message goes out over the network, and it appears on your screen. Other correct answers exist, so check yours by asking whether each one really fits its stage.

## Hardware and software
**Hardware** is the physical equipment you could touch: keyboard, screen, processor, memory, drive. **Software** is the instructions that tell the hardware what to do. A program is one set of instructions, such as a browser. The operating system, such as Windows, is the software that runs the machine and lets other programs share it.

Neither is useful alone. A processor with no instructions does nothing, and a program with no hardware cannot run. When something goes wrong, this split helps you think. If a key is physically broken, reinstalling a program will not fix it. If an app crashes on one file but others work, the screen is not the problem.

> Mistake: People often say "the computer" when they mean one program. If Chrome is frozen, Windows may be fine. Name the exact part you mean, because the fix depends on it.

## Tracing a real task
A **trace** follows information step by step. Tracing is how programmers find bugs, how analysts check where a number came from, and how security people find weak points. Here is a trace of searching for a file in File Explorer.

| Step | Stage | What actually happens |
| --- | --- | --- |
| You type `exam` in the search box | Input | The characters reach File Explorer through Windows |
| Explorer compares `exam` with file names | Processing | The processor runs the comparison |
| Explorer reads the list of names from the drive | Storage to memory | Saved information is copied into working memory |
| Matching files appear in the window | Output | The screen shows the result |
| You double-click one | Input again | The output of the search becomes your next input |

Notice that the last row starts the cycle again. Real tasks are chains, and the output of one step often becomes the input of the next.

### How to tell whether something was stored
Do not guess. Run a small test. Do the task, close the program fully, and reopen it. If the result is still there, it was stored somewhere that lasts. A later lesson explains where. This habit of testing instead of assuming is the main idea of this whole course.

## Your first security question
At each stage of a trace, ask three questions. Who should be able to **see** this? What happens if someone **changes** it? What happens if it is **lost or unavailable**? Those three questions come back later as confidentiality, integrity and availability.

Take paying someone by bank transfer. The account number you type is input, and someone watching your screen could read it. The bank's server processes the amount, and if that amount were changed, you would lose money. The bank stores the record, and if the server were down, you could not pay. One simple task raises all three questions, at different stages.

> Safety: When you practise tracing, use your own tasks and your own devices. Tracing what your own computer does is always fine. Probing someone else's system is not, even out of curiosity.

# Exercises
?? A voice note is recorded, sent, and played by a friend. On your phone, what is the input and what is the output?
=> The input is the sound through the microphone. The output is the data sent over the network. On your friend's phone, that data is the input and the sound from the speaker is the output. The same data can be output for one device and input for another.

?? You edit a photo to make it brighter but do not save it, then close the app. Which of the four stages did not happen for the brighter version?
=> Storage. It was input, processed and shown on the screen as output, but never kept. If the app autosaved, a copy was stored, and the way to know is to reopen it and look.

?? A printer prints the wrong page, yet the same document looks right on screen. Is this more likely a problem with the input or further along? Why?
=> Further along. The screen shows the document was read and processed correctly, so the fault is later in the chain, such as the page settings or the printer. Tracing narrows down where to look.

# Practice
Choose one task you really do on this laptop, such as opening a PDF, renaming a file, or searching for something.

1. Do the task once, slowly, and watch what happens.
2. Write one line for each stage: what was the input, what was processed, what was stored, what was the output.
3. Close the program fully and reopen it. Record what was still there and what was gone.
4. Pick one stage and answer the three security questions for it: see, change, lost.

Write in your own words. Keep private names out of your answer.

# Rubric
- I traced a task I actually did, not an example from the lesson.
- I tested what was stored by closing and reopening instead of guessing.
- I answered the three security questions for at least one stage.

# Summary
- A computer takes input, processes it, stores it, and gives output.
- Hardware is the physical equipment. Software is the instructions.
- One step's output is often the next step's input, including between computers.
- Test whether something was stored. Do not assume.
- At each stage ask who can see it, what if it changes, and what if it is lost.

# Check
Q: You type a search term into File Explorer. What is the text you typed?
* Input
- Output
- Storage
= The term goes into the task. The list of matching files that comes back is the output.

Q: A spreadsheet adds up a column of numbers. Which stage is the adding?
- Input
* Processing
- Output
= Adding is work done on the information, so it is processing. The total shown on screen is the output.

Q: Which of these is software?
- The keyboard you type on every day
- The processor inside the laptop's case
* The Windows operating system
= Software is instructions. Keyboards and processors are physical equipment.

Q: You edit a document, then close the program without saving, and the edits are gone. Which stage never happened for those edits?
- Input
- Processing
* Storage
= The edits were input and processed, and you saw them on screen. They were never kept anywhere lasting.

Q: Your laptop sends a request to a website's server. What is that request from the server's point of view?
* Input
- Output
- Hardware
= One computer's output is another computer's input.

Q: One app crashes every time you open a certain file, but other apps run normally. Where should you look first?
- The screen, because it shows the crash
- The keyboard, because it gives the input
* That app or that file
= Other apps work, so the hardware and operating system are probably fine. The failure points at this app or this file.

Q: How can you find out whether a calculator app keeps your history?
- Assume it does, since most calculator apps keep a history
* Do a sum, close the app fully, reopen it and look
- Look at how big the app's window is compared with others
= Test instead of assuming. Closing and reopening shows what was stored.

Q: What is a trace?
- A copy of a file kept in a second place as a backup
* Following information step by step through a task
- A written list of all the hardware inside a computer
= Tracing follows the information through each step, which is how you find where something went wrong.

Q[transfer]: A shop's card machine prints a receipt showing the wrong amount, but the shop's own screen showed the right amount. What does this tell you first?
- The customer's card must be faulty, because the card is the input to the whole payment and receipts always follow from it
* The amount was right at one stage and went wrong later, so look between the screen and the receipt
- The input must have been wrong, since a wrong output always means the very first step was wrong
= The screen shows the amount was right at that point. A trace narrows the fault to the steps after it.

Q[transfer]: Exam results are typed into a school's system. Someone changes one score afterwards without permission. Which question from this lesson does that raise?
- Who should be able to see this?
* What happens if someone changes this?
- What happens if it is lost or unavailable?
= The score was improperly changed. Being seen or being lost would be different harms.

Q[transfer]: A weather app shows today's forecast. Where did the forecast most likely begin as input to your phone?
- From the phone's keyboard, as typed by the user
- From the phone's screen, which displays the forecast
* From data arriving over the network
= Input does not have to come from a person. The forecast is another computer's output arriving as your phone's input.

# Cards
What are the four things every computer does? :: Input, processing, storage, output.
What is the difference between hardware and software? :: Hardware is the physical equipment. Software is the instructions that tell it what to do.
How do you find out whether a result was stored? :: Close the program fully, reopen it and look. Test instead of assuming.
What three questions do you ask at each stage of a trace? :: Who should see it, what if it changes, and what if it is lost or unavailable.

# Further
- GCFGlobal Computer Basics, free beginner course :: https://edu.gcfglobal.org/en/computerbasics/
- Harvard CS50's Understanding Technology, Hardware notes :: https://cs50.harvard.edu/technology/notes/1/
