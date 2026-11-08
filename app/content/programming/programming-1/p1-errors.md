---
id: p1-errors
pack: Programming 1 · Solving before coding
title: Reading error messages
minutes: 35
source: The Python Tutorial · Errors and exceptions
url: https://docs.python.org/3/tutorial/errors.html
courses: Supports any first programming course
format: 2
python: yes
teaches: read-traceback; syntax-error; name-error; type-error; zero-division; fix-one-error
uses: print-function; bug-meaning; run-python; python-as-calculator
---
# Goal
Read a Python error message calmly: find the line, name the kind of error, understand what Python is telling you, and fix it.

# Why
Every programmer sees error messages all day. Beginners often panic or start changing things at random, while experienced programmers read the message, because it usually tells them exactly what's wrong and where. Learning to read errors early saves you hours. It's also the start of debugging, a skill that matters in every computing job, and in security too, where error messages can reveal how a system works.

# Warm-up
?? What are the three kinds of bug?
=> Syntax errors, runtime errors and logic errors.

?? What does `print(2 + 3 * 4)` show?
=> 14.

# Lesson
## An error is information
When Python can't continue, it stops and prints an **error message**, also called a **traceback**. It looks alarming, but it's Python being helpful. It tells you three things:

1. **Where**: the file and line number.
2. **What kind**: the error's name, such as `NameError`.
3. **Why**: a short explanation after the name.

Here's a program with a mistake, and what Python says:

```python
mark = 70
print(marks)
```

```output
Traceback (most recent call last):
  File "<string>", line 2, in <module>
NameError: name 'marks' is not defined. Did you mean: 'mark'?
```

Read it from the bottom up. The last line is the most important. `NameError` means Python met a name it doesn't know. It even suggests what you probably meant: `mark`. The line above says it happened on line 2.

> Mistake: Reading only the top of the message, "Traceback (most recent call last)", and giving up. The useful part is at the bottom.

## Common errors and what they mean
| Error | What it means | Typical cause |
| --- | --- | --- |
| `SyntaxError` | Python can't read the code at all | Missing bracket or quote, or a misspelled keyword |
| `NameError` | A name isn't defined | A typo, or using a name before giving it a value |
| `TypeError` | An operation got the wrong kind of value | Adding text to a number |
| `ZeroDivisionError` | Dividing by zero | A count that turned out to be 0 |
| `IndentationError` | The spacing at the start of a line is wrong | Mixed or missing indentation |

### TypeError
```python
print("Marks: " + 70)
```

```output
Traceback (most recent call last):
  File "<string>", line 1, in <module>
TypeError: can only concatenate str (not "int") to str
```

Python means: you used `+` to join text, but you gave it a whole number. "str" is text, and "int" is a whole number. You can fix it with a comma instead: `print("Marks:", 70)`. You'll learn other fixes in a later lesson.

### ZeroDivisionError
```python
print(150 / 0)
```

```output
Traceback (most recent call last):
  File "<string>", line 1, in <module>
ZeroDivisionError: division by zero
```

This is the empty-case problem from the paper lessons, now in real code.

## Syntax errors point near the mistake
A `SyntaxError` happens before anything runs, because Python can't understand the code. Its message points to where Python got confused, which is often just after the real mistake.

```python
print("Hello"
print("World")
```

The first line is missing its closing bracket. Python only realises something's wrong when it reaches the next line, so the error may point there. When a syntax error points to a line that looks fine, **look at the line before it** too.

Common causes:

- A bracket or quote opened and never closed.
- A word misspelled, such as `pritn`.
- A colon missing where one is needed, which you'll meet with decisions and loops.

## A method for fixing errors
1. **Read the last line.** Note the error name and the explanation.
2. **Find the line number**, and look at that line, and the one before it for syntax errors.
3. **Say in your own words** what Python is complaining about.
4. **Fix one thing**, then run again.
5. **If it's a new error, that's progress.** Repeat.

Fix one error at a time. Python stops at the first error it meets, so the message is always about the first problem, and fixing it may reveal the next.

### When there's no error, but the answer is wrong
That's a logic error, and Python can't help you. Use the tracing method from the paper lessons: work out by hand what each line should produce, and compare. Printing values partway through is the code version of a trace table:

```python
total = 50 + 70
print("after adding:", total)
average = total / 2
print("average:", average)
```

```output
after adding: 120
average: 60.0
```

# Exercises
?? What does `NameError: name 'totl' is not defined` most likely mean?
=> A typo. The name was probably meant to be `total`.

?? Python reports a SyntaxError on line 5, and line 5 looks correct. Where else should you look?
=> At line 4 and earlier, for a bracket or quote that was never closed.

?? `print("Age: " + 21)` gives a TypeError. What's one fix?
=> Use a comma, `print("Age:", 21)`, so Python prints them as two items.

# Practice
The program in the box has four separate errors. Fix them one at a time.

1. Press Run. Read the last line of the error, and write down its name and line.
2. Fix only that error, then run again.
3. Repeat until it runs, writing down each error name as you go.
4. Check the output is right: it should show the total and the average of the three marks.
5. Press **Test my code**.

Write the four error names in the order you met them, and the fix for each.

# Starter
```python
mark1 = 60
mark2 = 75
mark3 = 90

total = mark1 + mark2 + mrak3
print("Total:" , total

average = total / count
count = 3
print("Average: " + average)
```

# Tests
```python
assert total == 225, "total should be 225"
assert average == 75.0, "average should be 75.0"
```

# Solution
```python
mark1 = 60
mark2 = 75
mark3 = 90

total = mark1 + mark2 + mark3
print("Total:", total)

count = 3
average = total / count
print("Average:", average)
```

# Rubric
- I read the last line of each error before changing anything.
- I fixed one error at a time, and recorded each one.
- My final code passes the test, and I checked its answer by hand.

# Summary
- An error message tells you where, what kind and why. Read it from the bottom up.
- NameError is usually a typo, TypeError mixes kinds of value, ZeroDivisionError divides by zero.
- For a SyntaxError, check the line shown and the line before it.
- Fix one error at a time. A new error means progress.
- No error but a wrong answer is a logic error: trace or print the values.

# Check
Q: Which part of a traceback should you read first?
P: An error is information
- The first line, "Traceback (most recent call last)"
* The last line, with the error's name and explanation
- The middle lines, which list every line in the program
= The bottom line says what went wrong.

Q: What does `NameError: name 'totl' is not defined` most likely mean?
P: Common errors and what they mean
* There's a typo, and `total` was meant
- The computer's memory is too full to hold the value
- The program must be restarted before it will work
= NameErrors are usually misspelled or undefined names.

Q: What kind of error does `print("Marks: " + 70)` cause?
P: Common errors and what they mean
- SyntaxError
- NameError
* TypeError
= `+` can't join text and a whole number.

Q: What kind of error does `print(10 / 0)` cause?
P: Common errors and what they mean
- NameError
- TypeError
* ZeroDivisionError
= Dividing by zero has no answer, so Python stops.

Q: Match each error to its usual cause.
P: Common errors and what they mean
M: SyntaxError => A missing bracket or quote
M: NameError => A misspelled name
M: TypeError => Adding text to a number
M: ZeroDivisionError => Dividing by a count of zero
= Each name tells you which kind of problem to look for.

Q: A SyntaxError points to a line that looks fine. Where should you look?
P: Syntax errors point near the mistake
* At the line before it as well, for something unclosed
- Only at the very last line of the whole program
- Nowhere, because syntax errors are always on the line shown
= Python often notices the problem a line late.

Q: Put the error-fixing steps in order.
P: A method for fixing errors
O: Read the last line | Find the line number | Say what Python means | Fix one thing | Run again
= One error at a time, reading before changing.

Q: Your program runs without errors but gives the wrong answer. What helps most?
P: A method for fixing errors
- Reading the error message again, more carefully
* Printing values partway through, and comparing with a hand trace
- Running it several more times until the answer changes
= With a logic error, there's no message. You have to trace.

Q[transfer]: A website shows a long error message with file paths to every visitor. Why might a security professional worry?
P: An error is information
* Error messages can reveal how the system is built, which helps attackers
- Error messages slow the website down for visitors who see them
- Visitors can use the error message to fix the website themselves
= Errors carry information. Shown publicly, that information can help an attacker.

Q[transfer]: A friend sends you a screenshot of a Python error and asks what's wrong. What do you ask for first?
P: A method for fixing errors
- Their whole program, so that you can rewrite it from scratch
* The last line of the error and the line number it points to
- Which computer they're using, and how much memory it has
= Those two parts usually identify the problem.

Q[transfer]: You fix one error and a new, different error appears. What does that mean?
P: A method for fixing errors
- You made the program worse, so you should undo your change
* You've made progress, as Python now gets further before stopping
- Python is broken and should be reinstalled before continuing
= Python stops at the first error, so a new one means the old one is fixed.

# Cards
How should you read a Python traceback? :: From the bottom up: error name and explanation first, then the line number.
What does NameError usually mean? :: A misspelled name, or a name used before it was given a value.
What does TypeError mean? :: An operation got the wrong kind of value, such as text plus a number.
Where do you look for a SyntaxError? :: On the line shown, and the line before it.
How do you fix several errors? :: One at a time, running again after each fix.

# Further
- The Python Tutorial, errors and exceptions :: https://docs.python.org/3/tutorial/errors.html
- Python for Everybody, Chapter 1 :: https://www.py4e.com/html3/01-intro
