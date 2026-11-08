---
id: p1-what-program
pack: Programming 1 · Solving before coding
title: What a program is
minutes: 30
source: Python for Everybody · Chapter 1
url: https://www.py4e.com/html3/01-intro
courses: Supports any first programming course
format: 2
teaches: program-meaning; source-code; interpreter; bug-meaning
uses: input-output; hcw-languages; hcw-software
---
# Goal
Say what a program is, what source code and an interpreter are, why a computer needs instructions with no room for guessing, and what a bug is.

# Why
Programming is the core skill of a computing degree, and it starts with an idea, not a language. A program is a set of instructions so exact that a machine with no common sense can follow them. Once that idea is clear, every later lesson is about how to write those instructions in Python. It's also the habit that makes you useful at work: describing a process so precisely that nothing is left to guess.

# Warm-up
?? What are the three stages every computer task goes through?
=> Input, processing and output.

?? Why can't a processor run Python directly?
=> A processor only runs machine code, so Python has to be translated or interpreted first.

# Lesson
## Instructions without common sense
A **program** is a sequence of instructions that tells a computer exactly what to do. The computer follows them literally, one after another, extremely fast, and without any understanding of what you meant.

Imagine giving directions to a friend: "Go to the market and get some tomatoes." Your friend fills in a hundred details: which market, how many, what to do if there are none. A computer fills in nothing. It needs to be told which market, how many, what to pay, and what to do if they're sold out.

| Human instruction | What a computer needs |
| --- | --- |
| Add up my marks | Which marks, where they are stored, and where to put the total |
| Tell me if I passed | The pass mark, which score to compare, and what to show either way |
| Remind me later | When "later" is, in minutes or as a date and time |

This is the main skill of programming. Typing code is the easy part. Working out exactly what you mean, with every case covered, is the real work.

## Source code and the interpreter
You write a program as **source code**: text in a programming language that people can read and write. Here's a whole program in Python:

```python
print("Welcome to 4YOS")
print(2 + 3)
```

```output
Welcome to 4YOS
5
```

As you learned in How Computers Work, a processor can only run machine code. So something has to turn your source code into actions. Python uses an **interpreter**: a program that reads your source code and carries it out, line by line. Other languages, such as C, use a **compiler**, which translates the whole program into machine code first, and then runs it.

| | Interpreter | Compiler |
| --- | --- | --- |
| How it works | Reads and runs the program, line by line | Translates the whole program first, then it runs |
| Example language | Python | C |
| When errors appear | When the interpreter reaches the bad line | Usually before the program runs at all |

You'll write Python in the boxes inside 4YOS lessons. The app has its own copy of the Python interpreter, so your code runs on your laptop, without the internet.

## Programs are made of a few kinds of step
Most programs, however large, are built from the same small set of actions:

| Kind | What it does | Example |
| --- | --- | --- |
| Input | Gets data in | Read what the user typed, or open a file |
| Output | Shows or saves a result | Print to the screen, or write a file |
| Calculation | Works out values | Add marks, find an average |
| Decision | Chooses what to do | If the mark is 40 or more, say "pass" |
| Repetition | Does something again | For every student, print their mark |

These match the input, processing and output you met before, with decisions and repetition giving the processing its power. You'll learn each of them in this course, one at a time.

## Bugs
A **bug** is a mistake in a program that makes it behave differently from what you intended. Every programmer writes bugs. The skill is finding and fixing them. There are three main kinds:

| Kind | What happens | Example |
| --- | --- | --- |
| Syntax error | Python can't understand the code, so it won't run | A missing bracket: `print("hi"` |
| Runtime error | It starts, then stops with an error | Dividing by zero |
| Logic error | It runs, but gives the wrong answer | Using `+` where you meant `*` |

Syntax errors are the easiest to fix, because Python tells you where it got confused. Runtime errors come with a message too. Logic errors are the most dangerous, because nothing warns you. The program runs and confidently gives the wrong answer. That's why you'll always test your programs with cases where you already know the right answer.

> Mistake: Thinking the computer "knows what you meant". It never does. If your program gives a wrong answer, the instructions you wrote produce that answer. The fix is in your instructions.

# Exercises
?? Rewrite "check if I passed" as instructions a computer could follow.
=> For example: take the mark. If the mark is 40 or more, show "passed". Otherwise, show "not passed". The pass mark here is an example. Use your course's real one.

?? A program that should calculate an average gives 150 for marks of 50, 60 and 40. What kind of bug is this?
=> A logic error. It runs, but the answer is wrong, probably because it added the marks and forgot to divide by 3.

?? What is the difference between source code and machine code?
=> Source code is text in a language people write, like Python. Machine code is the processor's own instructions, in binary.

# Practice
Pick a small real task you do often, such as working out what you'll spend on transport this week.

1. Write it as instructions for someone with no common sense, numbered, with nothing left to guess.
2. Label each step as input, output, calculation, decision or repetition.
3. Give your instructions to a friend or family member, and ask them to follow them exactly as written, even when that seems silly. Note every place they got stuck or did something unexpected.
4. Rewrite those steps so that they're exact.

Write your final instructions and the places where the first version needed a guess.

# Rubric
- My instructions leave nothing to guess, including what to do in unusual cases.
- I labelled each step with its kind.
- I tested them on a real person and fixed the steps where they got stuck.

# Summary
- A program is a sequence of exact instructions, followed literally.
- Source code is the text you write. The Python interpreter reads and runs it, line by line.
- Programs are built from input, output, calculation, decision and repetition.
- Bugs are syntax errors, runtime errors or logic errors.
- Logic errors don't warn you, so always test with known answers.

# Check
Q: What is a program?
P: Instructions without common sense
- A machine that solves problems by thinking carefully about each of them, as a person does
* A sequence of exact instructions a computer follows literally
- A list of rough ideas that the computer completes for you
= The computer follows each instruction exactly, and fills in nothing.

Q: What is the hard part of programming?
P: Instructions without common sense
- Typing the code quickly and without spelling mistakes
* Working out exactly what you mean, with every case covered
- Remembering every single command and symbol in the programming language you use
= Typing is easy. Thinking precisely is the real work.

Q: What does the Python interpreter do?
P: Source code and the interpreter
* It reads your source code and carries it out, line by line
- It translates English sentences into Python source code
- It checks your spelling and grammar carefully before you submit any written work
= The interpreter turns your code into actions.

Q: How does a compiled language such as C differ?
P: Source code and the interpreter
- It doesn't need any translation to run on the processor
* It translates the whole program into machine code first, then it runs
- It can only be used on computers that are connected to the internet
= Compilers translate first. Interpreters read and run as they go.

Q: What does `print(2 + 3)` show?
P: Source code and the interpreter
A: 5
= Python works out 2 + 3, then prints the result.

Q: Which kind of step is "for every student, print their mark"?
P: Programs are made of a few kinds of step
- Decision
* Repetition
- Input
= It does the same thing again, once for each student.

Q: A program runs, but gives the wrong total. What kind of bug is it?
P: Bugs
- Syntax error
- Runtime error
* Logic error
= It runs, so the syntax is fine, and it didn't crash. The logic is wrong.

Q: Why are logic errors the most dangerous?
P: Bugs
* Nothing warns you, and the wrong answer looks confident
- They always delete files on the computer when they happen
- They stop every other program on the computer from running
= A crash is obvious. A wrong answer can go unnoticed.

Q[transfer]: A shop's program charges ₦0 delivery for every order, when only orders over ₦10,000 should be free. What's the most likely cause?
P: Bugs
- The computer decided that free delivery would be kinder
* A logic error in how the delivery rule was written
- A syntax error that stops the program from running at all
= The program runs, and does exactly what the code says. The rule in the code is wrong.

Q[transfer]: You're asked to automate a process at work. What should you do before writing any code?
P: Instructions without common sense
* Write down every step exactly, including the unusual cases
- Choose the fastest programming language for the job
- Start typing code straight away, then fix what goes wrong
= Clear steps first. The code only expresses them.

Q[transfer]: A friend says, "The computer got it wrong, even though I told it what I wanted." What's the best reply?
P: Instructions without common sense
- Computers sometimes choose to ignore what they're told
* The computer did exactly what the code said, so the fix is in the code
- The computer simply needs more memory installed before it can understand what you want
= Computers follow instructions literally. Wrong results come from the instructions.

# Cards
What is a program? :: A sequence of exact instructions that a computer follows literally.
What is source code? :: The text of a program, written in a language like Python.
What does an interpreter do? :: Reads source code and carries it out, line by line.
What are the three kinds of bug? :: Syntax errors, runtime errors and logic errors.
Why test with known answers? :: Logic errors give wrong answers without any warning.

# Further
- Python for Everybody, Chapter 1 :: https://www.py4e.com/html3/01-intro
- The Python Tutorial, whetting your appetite :: https://docs.python.org/3/tutorial/appetite.html
