---
id: p1-functions
pack: Programming 1 · Functions
title: What a function is
minutes: 40
source: Python for Everybody · Chapter 4
url: https://www.py4e.com/html3/04-functions
courses: Supports any first programming course
format: 2
python: yes
teaches: function-meaning; define-function; call-function; built-in-functions; why-functions
uses: print-function; variables; for-loop; indentation-blocks; len-function
---
# Goal
Say what a function is, use Python's built-in functions, define your own with `def`, and call it as many times as you need.

# Why
As programs grow, the same steps appear in many places. A function packages those steps under a name, so you write them once and use them anywhere. That makes programs shorter, easier to read, and easier to fix: a bug in a function is fixed in one place, and every use benefits. Functions are how every large program is organised, and you've already been using them: `print`, `len` and `round` are all functions.

# Warm-up
?? What does `len("DATA")` give?
=> 4.

?? What does a for loop over a list do?
=> Runs its block once for each item in the list.

# Lesson
## Functions you already know
A **function** is a named piece of code that does a job. You **call** it by writing its name followed by brackets, with any values it needs inside them.

| Function | Job | Example | Result |
| --- | --- | --- | --- |
| `print` | Show values | `print("Hi")` | Shows Hi |
| `len` | Count items or characters | `len("Ada")` | `3` |
| `round` | Round a number | `round(3.7)` | `4` |
| `int` | Convert to a whole number | `int("25")` | `25` |
| `max` | Find the largest | `max(4, 9, 2)` | `9` |
| `abs` | Distance from zero | `abs(-7)` | `7` |

These are **built-in functions**, which come with Python. You don't need to know how `len` counts the characters. You only need to know what to give it and what it gives back. That's the power of a function: it hides the details behind a name.

## Defining your own
You make a function with `def`, short for define. Give it a name, brackets and a colon, then indent the steps that belong to it.

```python
def greet():
    print("Welcome to 4YOS")
    print("Let's study.")

greet()
greet()
```

```output
Welcome to 4YOS
Let's study.
Welcome to 4YOS
Let's study.
```

The `def` block on its own does nothing visible. It only **defines** the function, telling Python what `greet` means. The steps run when the function is **called**, with `greet()`. Here it's called twice, so the steps run twice.

> Mistake: Forgetting the brackets. `greet` on its own just refers to the function and does nothing. `greet()` with brackets calls it.

### Order matters
A function must be defined before the line that calls it. Python reads from the top, so a call above the `def` causes a NameError, because Python hasn't met the name yet. That's why programs usually put all their `def` blocks first, and the code that uses them after.

## What happens during a call
When Python reaches `greet()`:

1. It **jumps** to the first line inside the `def` block.
2. It **runs** the indented steps, in order.
3. When it reaches the end of the block, it **jumps back** to just after the call, and carries on.

This jump and return is what lets one block of code be used from many places. Trace it like any other code, keeping a note of where you jumped from, so you know where to return.

In the `greet` example, Python first reads the `def` block and remembers it, without running it. Then it reaches the first `greet()`, jumps into the block, prints the two lines, and comes back. It reaches the second `greet()`, and does exactly the same again. Finally, there are no more lines, so the program ends. Four lines are printed, from a function that contains only two `print` lines, because it ran twice.

A function can be called from inside another function, and that one can call another. Python keeps track of each place it has to return to, in order, so however deep the calls go, each one comes back to exactly where it was called from.

## Why use functions?
| Reason | What it means |
| --- | --- |
| Avoid repetition | Write the steps once, call them many times |
| Give steps a name | `print_report()` says what it does better than ten lines of code |
| Fix in one place | A bug fixed in the function is fixed everywhere it's used |
| Test in pieces | You can check each function on its own |
| Break big problems down | Each function solves one small part |

A good function does **one clear job**, and its name says what that job is, usually starting with a verb: `print_receipt`, `count_passes`, `check_password`.

## Functions that use loops
A function can contain anything: decisions, loops, even calls to other functions.

```python
def print_line():
    print("-" * 20)

def print_week():
    print_line()
    for day in ["Mon", "Tue", "Wed", "Thu", "Fri"]:
        print(day)
    print_line()

print_week()
```

```output
--------------------
Mon
Tue
Wed
Thu
Fri
--------------------
```

`print_week` calls `print_line` twice. Changing the line's style, say from `-` to `=`, needs one change, inside `print_line`, and both lines update.

# Exercises
?? What does `max(3, 11, 7)` give?
=> 11.

?? What's printed by `def hi():` with `print("hi")` inside, then `hi()` three times?
=> hi, on three lines.

?? Why does calling a function above its `def` cause an error?
=> Python reads from the top, so it hasn't met the function's name yet.

# Practice
Make a small report function for your own week.

1. In the box, finish `print_divider` so it prints a line of 30 `=` characters.
2. Finish `print_header` so it prints a divider, then `"MY WEEK"`, then another divider, using `print_divider`.
3. Call `print_header` once, then print three real things you have to do this week, then call `print_divider` once more.
4. Predict the output, run, and press **Test my code**.

Write down how many lines your program prints, and how many times `print_divider` runs.

# Starter
```python
def print_divider():
    # Replace this line: print 30 "=" characters
    pass

def print_header():
    # Replace this line: divider, "MY WEEK", divider
    pass

# Call print_header, print three real tasks, then print_divider
```

# Tests
```python
import io, contextlib
buffer = io.StringIO()
with contextlib.redirect_stdout(buffer):
    print_divider()
assert buffer.getvalue() == "=" * 30 + "\n", "print_divider should print exactly 30 = characters"
buffer = io.StringIO()
with contextlib.redirect_stdout(buffer):
    print_header()
assert buffer.getvalue() == "=" * 30 + "\nMY WEEK\n" + "=" * 30 + "\n", "print_header should print a divider, MY WEEK, then a divider"
```

# Solution
```python
def print_divider():
    print("=" * 30)

def print_header():
    print_divider()
    print("MY WEEK")
    print_divider()

print_header()
print("Finish the STA 111 assignment")
print("Revise COS 102 unit 3")
print("Submit the programming assignment")
print_divider()
```

# Rubric
- I defined both functions, and one calls the other.
- I called them in the right order, with real tasks in between.
- My code passes the test.

# Summary
- A function is a named piece of code that does a job.
- Call a function with its name and brackets: `greet()`.
- `def name():` defines a function. Its steps run only when it's called.
- During a call, Python jumps to the function, runs it, then jumps back.
- A good function does one clear job, and its name says what.

# Check
Q: What does `abs(-{a})` give?
P: Functions you already know
Vars: a=2..50
F: a
= `abs` gives the distance from zero, so −{a} becomes {a}.

Q: What does `len("data")` give?
P: Functions you already know
A: 4 | four
= `len` counts the characters.

Q: What does a `def` block do when Python first reads it?
P: Defining your own
* It defines the function, without running its steps
- It runs the function's steps once straight away
- It prints the name of the function on the screen
= The steps run only when the function is called.

Q: Which line calls a function named `report`?
P: Defining your own
- `report`
* `report()`
- `def report():`
= The brackets are what call the function.

Q: What happens if you call a function on a line above its `def`?
P: Defining your own
- Python finds the def further down and runs it anyway
* A NameError, because Python hasn't met the name yet
- The function runs, but it prints nothing at all
= Define functions before you call them.

Q: When a function finishes, where does Python continue?
P: What happens during a call
* Just after the line that called it
- At the very first line of the program again
- At the next def block further down the file
= It jumps back to where it was called from.

Q: Which is the best name for a function that counts passing marks?
P: Why use functions?
- `x`
- `function1`
* `count_passes`
= A good name says what the function does.

Q: A function that prints a line is called from 5 places. You change the line's style. How many places must change?
P: Why use functions?
A: 1 | one
= Only the function itself. That's a key benefit.

Q[transfer]: A report program prints the same header in 12 places, and the header must change. What would have made this easy?
P: Why use functions?
* A function that prints the header, called from all 12 places
- Copying and pasting the new header into all 12 places by hand
- A comment above each of the 12 places, describing the header
= With a function, one change updates every use.

Q[transfer]: A security tool checks a password's strength in three different places. How should the check be written?
P: Why use functions?
- Copy the full check into each of the three places
* As one function, called from all three places
- As three slightly different checks, one for each place
= One function means one rule, fixed and tested in one place.

Q[transfer]: In a spreadsheet, you use `=SUM(B2:B20)` without knowing how SUM works inside. Which idea does this show?
P: Functions you already know
* A function hides the details behind a name
- Spreadsheets can only add numbers, not do other jobs
- A function always has to be written by the person using it
= You only need to know what to give a function and what it gives back.

# Cards
What is a function? :: A named piece of code that does a job.
How do you call a function? :: Its name, followed by brackets: `greet()`.
What does `def` do? :: Defines a function. Its steps run only when it's called.
Where must a function be defined? :: Above the line that first calls it.
What makes a good function? :: It does one clear job, and its name says what.

# Further
- Python for Everybody, Chapter 4 :: https://www.py4e.com/html3/04-functions
- The Python Tutorial, defining functions :: https://docs.python.org/3/tutorial/controlflow.html
