---
id: hcw-languages
pack: How Computers Work · Inside the machine
title: From code you write to code the machine runs
minutes: 40
source: David J. Malan · Harvard CS50's Understanding Technology · Programming
url: https://cs50.harvard.edu/technology/weeks/6/
courses: Helps with COS 101, COS 102, CSC 101
video: https://cdn.cs50.net/cscie1a/2017/fall/lectures/programming/programming-360p.mp4
credit: Harvard CS50 · David J. Malan
start: 891.7
end: 1195
python: yes
---
# Goal
Explain the levels of programming language, tell compiling from interpreting, follow how source code becomes machine code, and say why a program runs on one system but not another.

# Why
You'll write Python, C, SQL and more during your studies. Knowing what happens to your code makes error messages make sense, and explains why some languages are faster than others. It also matters for security: running a program you can't read means trusting it, and reverse engineering in your final year is this process run backward.

# Lesson
## The gap
> Clip: David Malan asks how human-readable code can run on a machine that only understands 0s and 1s, then explains compilers and interpreters. Language levels and assembly are added in this lesson.

The last lesson showed that a processor only understands machine instructions, as bits. People can't comfortably write in bits. So we write in languages closer to human thinking, and let a program translate them. The text you write is called **source code**.

## Levels of language
| Level | Example | What it's like |
| --- | --- | --- |
| **Machine code** | `10110000 01100001` | Bits the processor runs directly |
| **Assembly language** | `MOV AL, 97` | Short names, one for each machine instruction |
| **High-level language** | `total = price * quantity` | Close to human thinking. One line can become many instructions |

Machine code and assembly are **low-level**, because they're tied to one processor family. High-level languages such as Python, C and Java can usually be used on many kinds of computers.

### Worked example: one line, many steps
The Python line `total = price * quantity` could become steps like these.

```text
LOAD   price into a register
LOAD   quantity into another register
MULTIPLY the two registers
STORE  the result into total
```

That's the same style of instructions you traced by hand in the last lesson.

## Compilers
A **compiler** translates all of your source code into machine code **before** the program runs. The result is a separate file, on Windows usually a `.exe`. You can give that file to someone who doesn't have your source code or the compiler.

```text
hello.c  -->  compiler  -->  hello.exe  -->  runs on the processor
```

C, C++, Rust and Go are usually compiled. If the source has a grammar mistake, the compiler refuses to produce anything, and tells you. You get a **syntax error**. The steps of a full build include checking the code, translating it, and joining it with other code it needs, called **linking**.

## Interpreters
An **interpreter** reads your source code and carries it out as the program runs. You need the interpreter on the machine, and you keep the source code.

```text
hello.py  -->  interpreter  -->  actions happen as it goes
```

| | Compiled | Interpreted |
| --- | --- | --- |
| When translated | Before running | While running |
| Speed | Usually faster | Usually slower |
| What you share | A program file | Source code, and the person needs the interpreter |
| Errors in grammar | All found before running | May appear only when that line is reached |
| Examples | C, C++, Rust | Python, JavaScript in many forms |

Real life is less tidy. Python first compiles your code to an in-between form called **bytecode**, and the Python interpreter runs that. Java does something similar. Many browsers compile JavaScript as it runs. So "compiled" or "interpreted" describes how a language is usually run, more than the language itself.

You can actually look at Python's bytecode:

```python
import dis
def total(price, quantity):
    return price * quantity
names = [i.opname for i in dis.get_instructions(total)]
print("BINARY_OP" in names)
print("RETURN_VALUE" in names)
```

```output
True
True
```

Those names are bytecode instructions, which the Python interpreter steps through much as a processor steps through machine code.

?? You send a friend `report.py`, and they've never installed Python. What happens when they try to run it?
=> It won't run as a program, because they need the interpreter. A compiled `.exe` for Windows wouldn't need it.

## Three kinds of error
| Kind | When | Example |
| --- | --- | --- |
| **Syntax error** | Translation can't read it | A missing bracket |
| **Runtime error** | It crashes while running | Dividing by zero |
| **Logic error** | It runs, and gives the wrong answer | Using `+` where you meant `*` |

> Mistake: Believing a program without errors is correct. Logic errors give no message at all. Only testing against what you expected can find them, and that's why you predict before running.

## Why programs don't run everywhere
A compiled program depends on two things: the **processor's instruction set**, as last lesson explained, and the **operating system**, which it asks for files, memory and more. So a Windows `.exe` built for x86-64 won't run directly on an Android phone, as both differ. An interpreted program can run on any system that has its interpreter, which is a big reason Python is so portable.

## Source code and trust
You can read source code. You can't easily read a compiled program. **Decompiling** and **reverse engineering** try to work backward, but names and comments are gone, so it's slow, skilled work.

> Safety: Running a program means trusting it, with all your rights. Open source lets people inspect the code, but that doesn't guarantee that anyone did, or that the file you downloaded was built from that code. Get programs from official sources, and check the digest when one's offered, as you'll learn in the file integrity lesson. Reverse engineering is legal only within the limits of the law and any licence, so only do it on software you're allowed to examine, in a lab.

# Exercises
?? Which is lowest level: Python, assembly or machine code?
=> Machine code. Assembly is one step above it, and Python is high level.

?? A program runs, but it always reports totals that are too small. What kind of error is this?
=> A logic error. It runs without a message, and gives the wrong answer.

?? Why might a C program run faster than the same program in Python?
=> C is translated to machine code ahead of time. Python's bytecode is stepped through by an interpreter, which adds work.

?? You see `SyntaxError` before any of your Python lines have printed. Why did nothing run?
=> Python compiles the file to bytecode first, and the grammar error stops it before it starts.

# Practice
1. Press the Windows key, type `cmd`, and press Enter. Type `where python` and press Enter. Note whether Windows found an interpreter on this laptop. A path ending `WindowsApps\python.exe` is usually only a shortcut to the Microsoft Store. It's fine if Python isn't installed, as this app has its own.
2. In File Explorer, find a program file (`.exe`) in `C:\Windows`, such as `notepad.exe`. Note its size. Don't run or change anything. You can't read this file as text, because it's machine code.
3. In the editor, create all three kinds of error in turn: a syntax error, a runtime error, and a logic error in the function. Run each, and record what you saw. Which one gave no message?
4. Fix the function, and press **Test my code**.

# Starter
```python
def average(a, b):
    # This has a logic error. It runs, and it gives the wrong answer.
    return a + b / 2

print(average(10, 20))
```

# Tests
```python
assert average(10, 20) == 15, "the average of 10 and 20 is 15"
assert average(0, 0) == 0, "the average of 0 and 0 is 0"
assert average(1, 2) == 1.5, "the average of 1 and 2 is 1.5"
```

# Solution
```python
def average(a, b):
    return (a + b) / 2
```

# Rubric
- I caused all three kinds of error on purpose, and recorded them.
- I can explain which one gave no message, and why that's the most dangerous.
- My fixed function passes the tests.

# Summary
- Machine code is what runs. Assembly names its instructions. High-level languages are for people.
- A compiler translates before running, and produces a separate program.
- An interpreter carries out code while it runs. Python uses bytecode in between.
- Syntax errors stop translation, runtime errors crash, and logic errors stay silent.
- A compiled program depends on its processor type and operating system.

# Check
Q: What does a compiler do?
- Carries out your code one line at a time as it runs
* Translates source code into machine code before it runs
- Deletes any unused files from the laptop's storage
= The result is a separate program file.

Q: What does an interpreter need that a compiled program doesn't?
* The interpreter has to be on the machine that runs it
- An internet connection each time that it runs
- A more powerful processor than any compiled program
= This is why someone without Python can't simply run a `.py` file.

Q: Which is a high-level language?
- Machine code
- Assembly
* Python
= High-level languages are close to human thinking.

Q: What is source code?
- The bits that the processor runs directly
* The text that a programmer writes
- The place from which you download a program
= It's what compilers and interpreters translate.

Q: A program gives a wrong answer, with no message. What kind of error is it?
- A syntax error
* A logic error
- A runtime error
= Only testing against an expected result can find logic errors.

Q: `print(10 / 0)` stops the program while running. What kind of error is it?
- A syntax error
- A logic error
* A runtime error
= The grammar is fine, and it fails when that line is carried out.

Q: What's Python bytecode?
* An in-between form that the Python interpreter runs
- The machine code of the very first computers
- A compressed copy of a Python programmer's notes
= Python compiles source to bytecode, and then steps through it.

Q: How does assembly language relate to machine code?
- It has nothing to do with machine code at all
* It gives short names to individual machine instructions
- It's the higher-level language that Python compiles from
= Each assembly line usually matches one instruction.

Q[transfer]: A Windows `.exe` won't run on an Android phone. What's the fullest explanation?
- Android phones aren't actually computers in any real sense
* The processor type and the operating system both differ
- The file's name is too long for Android phones to read
= A compiled program depends on both.

Q[transfer]: A security analyst receives a suspicious `.exe` with no source code. How can they learn what it does?
* Reverse engineer it, in an isolated lab
- Rename it to `.txt`, then read it as plain English
- Run it on their own daily laptop, then watch what happens
= Compiled programs can't be read directly, and suspicious ones must stay isolated.

Q[transfer]: Your grade calculator runs perfectly, but gives 90 where 80 was correct. Which habit finds this?
- Rereading the error message that Python gave you
* Predicting the answer by hand, and comparing it
- Making the program print its answer in capital letters
= Logic errors give no message. A prediction is what reveals them.

# Cards
What's the difference between machine code, assembly and high-level languages? :: Machine code is bits. Assembly gives instructions short names. High-level languages are close to human thinking.
What's the difference between a compiler and an interpreter? :: A compiler translates before running. An interpreter carries out code while it runs.
What are the three kinds of error? :: Syntax errors, runtime errors and logic errors.
Which error gives no message? :: A logic error.
Why doesn't a compiled program run on every computer? :: It depends on the processor's instruction set and the operating system.

# Further
- Harvard CS50's Understanding Technology, Programming :: https://cs50.harvard.edu/technology/weeks/6/
- Dive into Systems, free book :: https://diveintosystems.org/
