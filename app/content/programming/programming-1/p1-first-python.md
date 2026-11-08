---
id: p1-first-python
pack: Programming 1 · Solving before coding
title: Your first Python program
minutes: 35
source: The Python Tutorial · An informal introduction
url: https://docs.python.org/3/tutorial/introduction.html
courses: Supports any first programming course
format: 2
python: yes
teaches: print-function; run-python; comments; python-as-calculator
uses: program-meaning; source-code; interpreter; algorithm-meaning
---
# Goal
Write and run your first Python programs: print text and numbers, use Python as a calculator, add comments, and understand what happens when you press Run.

# Why
Everything until now was done on paper. Now you'll see a computer follow your instructions. Seeing your own code run, and seeing exactly what it does when you change one character, is how programming becomes real. The habits from this lesson, such as running small pieces and checking the output against what you expected, are the ones professional programmers use every day.

# Warm-up
?? What does the Python interpreter do?
=> It reads your source code and carries it out, line by line.

?? Why must an algorithm's steps be precise?
=> So that a computer, or another person, does exactly the same thing every time, with nothing to guess.

# Lesson
## Printing
The simplest program shows something on the screen. In Python, `print` does that. Whatever you put inside the brackets is shown.

```python
print("Hello, Ayo")
print("I study computing and statistics")
```

```output
Hello, Ayo
I study computing and statistics
```

Text in a program goes inside quotation marks. Python calls a piece of text a **string**. You can use double quotes `"like this"` or single quotes `'like this'`, as long as the opening and closing marks match.

Each `print` starts a new line. The lines run in order, from top to bottom: that's **sequence**, the first of the three structures.

### Printing several things
You can print several items in one `print`, separated by commas. Python puts a space between them.

```python
print("Total:", 25)
print("Marks", 70, 85, 90)
```

```output
Total: 25
Marks 70 85 90
```

## Python as a calculator
Numbers don't need quotes. Python works out a calculation and prints the answer.

```python
print(7 + 5)
print(20 - 8)
print(6 * 4)
print(15 / 4)
print(2 ** 10)
```

```output
12
12
24
3.75
1024
```

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` | Add | `7 + 5` | 12 |
| `-` | Subtract | `20 - 8` | 12 |
| `*` | Multiply | `6 * 4` | 24 |
| `/` | Divide | `15 / 4` | 3.75 |
| `**` | Power | `2 ** 10` | 1024 |

Python follows the same order of operations you learned in Numbers and Algebra: brackets first, then powers, then multiplication and division, then addition and subtraction. So `2 + 3 * 4` is 14, and `(2 + 3) * 4` is 20.

> Mistake: Putting a calculation in quotes. `print("7 + 5")` prints the text `7 + 5`, not 12. Quotes make the text a string, shown exactly as written. Without quotes, Python works out the expression. A bare word without quotes is treated as a name, and must have been given a value first.

## Comments
A **comment** is a note for people reading the code. Python ignores it. A comment starts with `#` and runs to the end of the line.

```python
# Work out this week's transport cost
print(5 * 800)   # 5 days at ₦800 a day
```

```output
4000
```

Good comments explain **why**, not what the code obviously does. "5 days at ₦800 a day" helps a reader. "Multiply 5 by 800" just repeats the code. The ₦800 here is an invented example.

## Running your code
When you press **Run** in a 4YOS lesson box, the Python interpreter in the app reads your code from the top, runs each line in turn, and shows what it prints. If a line has a mistake, Python stops there and shows an error message. You'll learn to read those in the next lesson.

A good working habit:

1. **Predict** what your code will print before you run it.
2. **Run** it.
3. **Compare** the output with your prediction.
4. If they differ, find out why before changing anything.

Changing code at random until it works teaches you nothing, and it often hides the real mistake. Predicting first turns every run into a small test.

### Small steps
Write a line or two, run, check, then add more. If you write fifty lines and then run them, and something's wrong, you don't know where. With two new lines, it's one of those two.

### Worked example: building up a calculation
Suppose you want the cost of data for a term. Don't write the whole thing at once. Start with the weekly cost, run it, and check it against your head: if a bundle costs ₦1,000 and you buy two a week, the weekly cost should be 2,000. Then add the next line, for 13 weeks, and run again. You expect 26,000. If the program says 2,013, you know the mistake is in the line you just added: you typed `+` instead of `*`. The prices here are invented examples.

This is the same predict, run and compare habit, used one line at a time. It's slower for the first minute and much faster overall, because mistakes are found the moment they appear, while the cause is still obvious.

# Exercises
?? What does `print("5 * 3")` show? And `print(5 * 3)`?
=> The first shows the text `5 * 3`. The second shows 15.

?? What does `print(10 - 2 * 3)` show?
=> 4, because multiplication comes first.

?? Write one line that prints your name and how many courses you take, separated by a space.
=> For example: `print("Ada", 12)`.

# Practice
Use the box below. Before each run, write down what you predict it will print.

1. Change the first line so it prints a greeting with your own name.
2. Set `weekly` to a real weekly cost of yours, such as transport, using a calculation: days times the daily cost.
3. Set `term` to that weekly cost times `term_weeks`, the number of weeks in your term. Change `term_weeks` if your term is a different length.
4. Add a comment on each calculation saying what the numbers mean.
5. Press **Test my code** to check that `weekly` and `term` are worked out from each other correctly.

Write down your predictions, and any that were wrong and why.

# Starter
```python
print("Hello")

# Your real numbers: days per week, and the cost per day
days = 5
cost_per_day = 800

term_weeks = 13

# Replace the 0s: work out the weekly cost, then the cost for the term
weekly = 0
term = 0

print("Weekly:", weekly)
print("Term:", term)
```

# Tests
```python
assert weekly == days * cost_per_day, "weekly should be days times cost_per_day"
assert term == weekly * term_weeks, "term should be weekly times term_weeks"
```

# Solution
```python
print("Hello, Ada")

days = 5
cost_per_day = 800
term_weeks = 13

weekly = days * cost_per_day   # 5 days at ₦800
term = weekly * term_weeks     # 13 weeks in the term

print("Weekly:", weekly)
print("Term:", term)
```

# Rubric
- I predicted each output before running, and noted where I was wrong.
- My calculations use real numbers from my life, with comments explaining them.
- My code passes the test.

# Summary
- `print(...)` shows text or the result of a calculation.
- Text goes in quotes, and numbers and calculations don't.
- Python follows the usual order of operations.
- `#` starts a comment, which Python ignores. Comments should explain why.
- Predict, run, compare. Add code in small steps.

# Check
Q: What does `print("Hello", "Ada")` show?
P: Printing
- HelloAda
* Hello Ada
- "Hello", "Ada"
= The comma separates two items, and Python puts a space between them.

Q: What does `print({a} * {b})` show?
P: Python as a calculator
Vars: a=2..12, b=2..12
F: a*b
= Python works out {a} × {b} = {a*b} and prints it.

Q: What does `print("4 + 4")` show?
P: Python as a calculator
- 8
* 4 + 4
- An error message
= The quotes make it text, so it's shown exactly as written.

Q: What does `print(2 + 3 * 4)` show?
P: Python as a calculator
A: 14
= Multiplication comes first: 3 × 4 = 12, then 2 + 12.

Q: What does `print(15 / 4)` show?
P: Python as a calculator
A: 3.75
= `/` gives an exact division, with a decimal point.

Q: What does Python do with a line starting with `#`?
P: Comments
* It ignores it, as it's a comment for people reading the code
- It prints it, so the user can see the note on the screen
- It stops the program, because `#` marks the end of the code
= Comments are notes for people. Python skips them.

Q: Which is the best comment for `print(5 * 800)`?
P: Comments
- `# multiply 5 by 800`
* `# 5 school days at ₦800 transport each`
- `# this line prints a number on the screen`
= Good comments explain why, not what the code already says.

Q: What should you do before pressing Run?
P: Running your code
- Delete any comments, so the code runs faster
* Predict what the code will print
- Add as many lines as you can, to save time
= Predicting turns each run into a test.

Q[transfer]: You need to work out how many seconds are in a week. Which line does it?
P: Python as a calculator
* `print(7 * 24 * 60 * 60)`
- `print("7 * 24 * 60 * 60")`
- `print(7 + 24 + 60 + 60)`
= Days times hours times minutes times seconds, with no quotes, so Python calculates it.

Q[transfer]: A classmate writes 40 lines, runs them, and gets a wrong answer. What would have helped?
P: Running your code
- Writing all 80 lines of the program before running anything
* Running and checking after every line or two
- Using a faster computer to run the program on
= Small steps make it obvious where a mistake came in.

Q[transfer]: In a spreadsheet, you type `="5+3"` and see 5+3 instead of 8. Which Python idea explains it?
P: Python as a calculator
- Spreadsheets can't add up numbers that are below 10
* Quotes turn a calculation into plain text
- The spreadsheet needs a comment before the formula
= In both, quotes mean text, shown exactly as written.

# Cards
What does `print(...)` do? :: Shows text or the result of a calculation on the screen.
What's the difference between `print("2+2")` and `print(2+2)`? :: The first shows the text 2+2. The second shows 4.
What is a comment? :: A note starting with #, which Python ignores.
What should a good comment explain? :: Why, not what the code obviously does.
What's the habit before each run? :: Predict the output, run, then compare.

# Further
- The Python Tutorial, an informal introduction :: https://docs.python.org/3/tutorial/introduction.html
- Python for Everybody, Chapter 1 :: https://www.py4e.com/html3/01-intro
