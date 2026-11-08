---
id: variables
pack: Programming 1 · Values and names
title: Values, names and expressions
minutes: 40
source: Python for Everybody · Chapter 2
url: https://www.py4e.com/html3/02-variables
courses: Supports any first programming course
format: 2
python: yes
teaches: values; variables; assignment; expressions; naming-rules
uses: print-function; python-as-calculator; read-traceback; name-error; trace-table
---
# Goal
Store values under names, update them, build expressions from them, and predict exactly what a short program holds at each line.

# Why
A program that only prints fixed numbers can't do much. Variables let a program remember values, work with them, and change them as it goes, which is how every real program keeps track of a total, a score or a balance. Tracing what each variable holds, line by line, is the single most useful skill for understanding and fixing code.

# Warm-up
?? What does `print(6 * 4)` show?
=> 24.

?? What does `NameError` usually mean?
=> A misspelled name, or a name used before it was given a value.

# Lesson
## Values
A **value** is a piece of data: a number such as `70`, a decimal such as `3.75`, or text such as `"Ada"`. You've already printed values. On its own, though, a value disappears as soon as the line finishes. To use it again, you need to give it a name.

## Variables and assignment
A **variable** is a name that refers to a value. You create one with an **assignment**: a name, an equals sign, and a value.

```python
mark = 70
name = "Ada"
print(name, mark)
```

```output
Ada 70
```

Read `mark = 70` as "**mark gets 70**", not "mark equals 70". The `=` sign in Python doesn't state that two things are equal, as it does in maths. It's an instruction: work out the right side, then store it under the name on the left.

### Changing a variable
A variable can be given a new value. The old one is replaced.

```python
balance = 5000
balance = balance - 1200
print(balance)
```

```output
3800
```

The second line looks impossible as maths, but as an instruction it's clear. Work out the right side first, `5000 - 1200`, which is 3800. Then store that as the new `balance`.

> Mistake: Reading `=` as "equals". `x = x + 1` isn't a false equation. It means "take the current x, add 1, and store the result back in x".

## Expressions
An **expression** is anything Python can work out to a single value: `70`, `mark + 5`, `(a + b) / 2`. You can use variables inside expressions, and Python uses whatever value each one holds at that moment.

```python
mark1 = 60
mark2 = 80
average = (mark1 + mark2) / 2
print(average)
```

```output
70.0
```

### A variable holds a value, not a formula
Python works out an expression once, when the line runs. Changing a variable later doesn't update anything worked out earlier.

```python
price = 500
total = price * 3
price = 800
print(total)
```

```output
1500
```

`total` was calculated as 1500 when `price` was 500. Changing `price` afterwards doesn't change `total`. This surprises people who've used spreadsheets, where a formula recalculates by itself.

## Tracing variables
To understand a program, trace what each variable holds after each line, just like a trace table on paper.

```python
count = 0
count = count + 1
count = count + 1
total = count * 10
```

| Line | count | total |
| --- | --- | --- |
| 1 | 0 | |
| 2 | 1 | |
| 3 | 2 | |
| 4 | 2 | 20 |

If a program gives the wrong answer, tracing like this almost always shows where.

Tracing feels slow at first, but it gets quicker with practice, and it's how experienced programmers read unfamiliar code. When you meet a program you didn't write, don't try to understand it all at once. Go line by line, keeping a note of what each variable holds, exactly as the computer does. You'll often spot a mistake the moment a value in your table differs from what you expected. In exams, questions that ask "what does this program print?" are testing exactly this skill, and a neat trace table is the surest way to get them right.

## Naming rules
Variable names must follow Python's rules:

- Letters, digits and underscores only: `total_marks`, `mark2`.
- They can't start with a digit: `2mark` is an error.
- No spaces: `total marks` is an error.
- Upper and lower case are different: `Mark` and `mark` are two different variables.
- Some words are reserved by Python, such as `if`, `for` and `print`'s friends like `True`. Don't use them as names.

Good names say what the value means. `weekly_cost` is clear. `x` or `wc` makes the reader guess. Python programmers usually write names in lower case, with underscores between words.

# Exercises
?? After `a = 5`, then `a = a * 2`, then `a = a + 1`, what's in `a`?
=> 11. It goes 5, then 10, then 11.

?? After `x = 4`, then `y = x + 1`, then `x = 10`, what's in `y`?
=> 5. `y` was worked out when `x` was 4. Changing `x` later doesn't change `y`.

?? Which of these names are allowed: `mark_2`, `2nd_mark`, `my mark`, `Mark`?
=> `mark_2` and `Mark` are allowed. `2nd_mark` starts with a digit, and `my mark` has a space.

# Practice
Use your real money for one week, or invent likely numbers.

1. In the box, set `money` to what you start the week with.
2. Set `transport` and `data` to real costs, 0 if you had none, and subtract each from `money` in turn.
3. Set `spent` to your starting amount minus what's left, using variables, not typed numbers.
4. Before running, trace what `money` holds after each line, on paper.
5. Run it, and compare with your trace. Then press **Test my code**.

Write your trace table, and whether it matched.

# Starter
```python
start = 10000
transport = 3000
data = 1500
money = start

# Subtract transport, then data, by updating money
money = money - 0
money = money - 0

# Replace the 0: work out how much was spent, using start and money
spent = 0

print("Left:", money)
print("Spent:", spent)
```

# Tests
```python
assert money == start - transport - data, "money should be start minus transport minus data"
assert spent == transport + data, "spent should equal transport plus data"
```

# Solution
```python
start = 10000
transport = 3000
data = 1500
money = start

money = money - transport
money = money - data

spent = start - money

print("Left:", money)
print("Spent:", spent)
```

# Rubric
- I traced each variable on paper before running.
- I updated a variable step by step, using real or likely numbers.
- My code passes the test, and `spent` is worked out from variables.

# Summary
- A variable is a name that refers to a value.
- `=` means "gets": work out the right side, then store it under the name.
- An expression works out to one value, using what each variable holds right then.
- Changing a variable later doesn't update values worked out earlier.
- Names: letters, digits and underscores, not starting with a digit, case matters.

# Check
Q: What does `mark = 70` do?
P: Variables and assignment
- It checks whether mark is equal to 70, and says yes or no
* It stores 70 under the name mark
- It prints the number 70 on the screen for the user
= `=` is an instruction to store a value.

Q: After `n = {a}`, then `n = n + {b}`, what's in `n`?
P: Variables and assignment
Vars: a=2..30, b=2..30
F: a+b
= The right side, {a} + {b}, is worked out first, then stored back in n: {a+b}.

Q: After `x = 5`, then `y = x * 2`, then `x = 100`, what's in `y`?
P: Expressions
A: 10
= `y` was worked out when `x` was 5. It doesn't recalculate.

Q: What does this print? `a = 3`, then `b = 4`, then `print(a * b + a)`.
P: Expressions
A: 15
= 3 × 4 = 12, then 12 + 3 = 15.

Q: Which name is allowed in Python?
P: Naming rules
- `2nd_place`
- `total marks`
* `total_marks`
= Names can't start with a digit or contain spaces.

Q: Are `Score` and `score` the same variable?
P: Naming rules
- Yes, because Python ignores the difference between capitals
* No, because Python treats upper and lower case as different
- Only when both of them are holding the very same number
= Case matters in Python names.

Q: Trace `t = 0`, then `t = t + 5`, then `t = t * 2`, then `t = t - 1`. What's in `t`?
P: Tracing variables
A: 9
= 0, then 5, then 10, then 9.

Q: How should you read `x = x + 1`?
P: Variables and assignment
- As an equation that can never be true for any number
* As "take x, add 1, and store the result back in x"
- As a mistake, because x appears on both of the sides
= It's an instruction, not an equation.

Q[transfer]: In a spreadsheet, B1 holds `=A1*3`, and changing A1 changes B1. In Python, `b = a * 3` then changing `a` doesn't change `b`. Why?
P: Expressions
* Python works out `b` once, when the line runs, and stores the value
- Python is broken and should recalculate b automatically
- Python only recalculates when the numbers involved are small
= Python stores values. A spreadsheet stores formulas.

Q[transfer]: A banking script does `balance = balance - withdrawal` twice by mistake. What happens?
P: Variables and assignment
- Nothing, because Python ignores a line that is repeated
* The withdrawal is taken off twice
- Python shows an error, because a line can't be repeated
= Each line runs and updates the balance again. Tracing catches this.

Q[transfer]: A colleague's script uses names like `a`, `b2` and `xx`. What's the best improvement?
P: Naming rules
* Rename them to say what each value means, such as `total_cost`
- Make the names shorter still, so the code takes less space
- Add the letter x to every name, to keep the names consistent
= Clear names make code readable and mistakes easier to see.

# Cards
What is a variable? :: A name that refers to a value.
How do you read `mark = 70`? :: "mark gets 70": store 70 under the name mark.
What does `x = x + 1` do? :: Takes the current x, adds 1, and stores the result back in x.
Does changing a variable update values worked out from it earlier? :: No. Python stores values, not formulas.
What are Python's naming rules? :: Letters, digits and underscores, not starting with a digit, no spaces, and case matters.

# Further
- Python for Everybody, Chapter 2 :: https://www.py4e.com/html3/02-variables
- The Python Tutorial, an informal introduction :: https://docs.python.org/3/tutorial/introduction.html
