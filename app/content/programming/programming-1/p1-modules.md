---
id: p1-modules
pack: Programming 1 · Files and errors
title: Modules
minutes: 40
source: The Python Tutorial · Modules
url: https://docs.python.org/3/tutorial/modules.html
courses: Supports any first programming course
format: 2
python: yes
teaches: import-module; from-import; import-as; standard-library; own-module; main-guard
uses: define-function; call-function; built-in-functions; csv-reader; decomposition
---
# Goal
Use code from other files with `import`, pick out just what you need, explore what a module offers, and split your own program into modules.

# Why
Nobody writes everything from scratch. Python comes with hundreds of ready-made **modules** for maths, random numbers, dates, statistics, files and much more, written and tested by others. Importing them saves you days of work and many bugs. And once your own programs grow, splitting them into modules keeps each file small and focused, which is decomposition at the level of whole files.

# Warm-up
?? What does `import csv` let you use?
=> The csv module's tools, such as `csv.reader` and `csv.DictReader`.

?? What's decomposition?
=> Splitting a big problem into smaller ones, each solved separately.

# Lesson
## import
A **module** is a file of Python code: functions, values and other tools, under one name. `import` loads a module, and you use its contents with the module's name and a dot:

```python
import math

print(math.sqrt(49))
print(math.pi)
print(math.ceil(4.2))
```

```output
7.0
3.141592653589793
5
```

`math.sqrt` is the square root function inside the `math` module. `math.pi` is a value stored in it. `math.ceil` rounds up to the next whole number, the opposite of floor division. The dot means "the thing called sqrt that belongs to math". Writing the module's name each time makes it clear where every tool comes from.

Imports go at the top of a file, so a reader sees at once what the program depends on.

## Choosing what to import
There are three common forms:

| Form | Then you write | Use when |
| --- | --- | --- |
| `import math` | `math.sqrt(9)` | Usually: clearest about where things come from |
| `from math import sqrt` | `sqrt(9)` | You use one or two tools from it very often |
| `import statistics as st` | `st.mean(data)` | The module's name is long |

```python
from random import choice
import statistics as st

marks = [65, 72, 58, 80, 72]
print(st.mean(marks))
print(st.median(marks))
print(st.mode(marks))
```

```output
69.4
72
72
```

The `statistics` module works out the mean, median and mode for you: the averages you'll study properly in Describing Data. `choice` from the `random` module picks a random item from a list, so its result changes from run to run, which is why it isn't printed here.

> Mistake: Using `from module import *`, which imports everything under its bare name. Names can silently clash: a module's `open` or `sum` could replace the built-in one, and nobody reading the code can tell where a name came from. Import names explicitly.

## The standard library
The modules that come with Python are called the **standard library**. They're always available, including inside 4YOS lessons, with no download.

| Module | Some of what it does |
| --- | --- |
| `math` | Square roots, powers, rounding up and down, π |
| `random` | Random numbers, shuffling, random choices |
| `statistics` | Mean, median, mode, standard deviation |
| `datetime` | Dates, times and the gaps between them |
| `csv` | Reading and writing CSV files |
| `json` | Reading and writing JSON, a common data format |
| `os` and `pathlib` | Files, folders and paths |

When you need something common, check the standard library first. Someone has probably solved it already, carefully.

### Finding out what a module offers
`dir(module)` lists the names inside a module, and `help(something)` shows its documentation. The online Python documentation describes every module in full, with examples. Reading documentation is a core programming skill: experienced programmers look things up constantly.

```python
import math

print("sqrt" in dir(math))
```

```output
True
```

## Your own modules
Any `.py` file you write is a module, and other files can import it. Suppose a file named `money.py` holds:

```text
def with_tax(price, rate=7.5):
    return price + price * rate / 100
```

Then another file in the same folder can write:

```text
import money
print(money.with_tax(1000))
```

Splitting a program into files by job, such as one for reading data, one for calculations and one for the report, keeps each file short, and lets you reuse a module in several programs. It's decomposition again, with whole files as the pieces. The 7.5% here is only an example rate. The lesson boxes in 4YOS run one file at a time, so these two snippets are shown as text rather than run.

### Code that runs only when the file is run
When a file is imported, all its code runs, including any test prints at the bottom. To keep some code for when the file is run directly, put it under this check:

```text
if __name__ == "__main__":
    print(with_tax(1000))
```

`__name__` is `"__main__"` when the file is run directly, and the module's name when it's imported. So the test print runs when you run `money.py` yourself, and stays quiet when another file imports it.

# Exercises
?? After `import math`, how do you get the square root of 81?
=> `math.sqrt(81)`, which gives 9.0.

?? What's the difference between `import random` and `from random import choice`?
=> The first needs `random.choice(...)`. The second lets you write `choice(...)` directly.

?? Why put test code under `if __name__ == "__main__":`?
=> So it runs only when the file is run directly, not when it's imported.

# Practice
Use standard-library modules on real-looking data.

1. In the box, `marks` holds a list of marks. Change them to real or likely ones.
2. Import `statistics` as `st`, and set `mean`, `median` and `spread` (the standard deviation, `st.stdev`), each rounded to 2 places.
3. Import `ceil` from `math`, and set `pages` to the number of pages needed to print the marks at 4 per page.
4. Import `date` from `datetime`, and set `days_left` to the number of days from 6 November 2026 to 15 December 2026, using `(later - earlier).days`.
5. Predict, run, and press **Test my code**.

Write your five results.

# Starter
```python
# Your imports here

marks = [65, 72, 58, 80, 72, 49]

mean = 0
median = 0
spread = 0
pages = 0
days_left = 0

print(mean, median, spread, pages, days_left)
```

# Tests
```python
import statistics as _st, math as _m, datetime as _dt
assert mean == round(_st.mean(marks), 2), "mean should be statistics' mean, rounded to 2 places"
assert median == round(_st.median(marks), 2), "median should be statistics' median, rounded to 2 places"
assert spread == round(_st.stdev(marks), 2), "spread should be statistics' stdev, rounded to 2 places"
assert pages == _m.ceil(len(marks) / 4), "pages should round the number of pages up"
assert days_left == (_dt.date(2026, 12, 15) - _dt.date(2026, 11, 6)).days, "days_left should be the days from 6 November to 15 December 2026"
```

# Solution
```python
import statistics as st
from math import ceil
from datetime import date

marks = [65, 72, 58, 80, 72, 49]

mean = round(st.mean(marks), 2)
median = round(st.median(marks), 2)
spread = round(st.stdev(marks), 2)
pages = ceil(len(marks) / 4)
days_left = (date(2026, 12, 15) - date(2026, 11, 6)).days

print(mean, median, spread, pages, days_left)
```

# Rubric
- I put my imports at the top, and used each module's tools by name.
- I chose a sensible import form for each module.
- My code passes the test.

# Summary
- A module is a file of code. `import name` loads it, and `name.tool` uses it.
- `from module import tool` and `import module as short` are the other two forms. Avoid `import *`.
- The standard library comes with Python: math, random, statistics, datetime, csv, json and more.
- `dir` and `help`, and the online documentation, show what a module offers.
- Your own `.py` files are modules. Keep test code under `if __name__ == "__main__":`.

# Check
Q: After `import math`, what does `math.sqrt(64)` give?
P: import
A: 8.0 | 8
= The square root of 64 is 8. math.sqrt gives a float, 8.0.

Q: After `import math`, what does `math.ceil(4.2)` give?
P: import
A: 5
= ceil rounds up to the next whole number.

Q: Which form lets you write `sqrt(9)` without a module name?
P: Choosing what to import
- `import math`
* `from math import sqrt`
- `import math as sqrt`, which renames the whole module
= from ... import brings that name in directly.

Q: What does `st.median([3, 9, 5])` give, after `import statistics as st`?
P: Choosing what to import
A: 5
= Sorted, the values are 3, 5, 9, and the middle one is 5.

Q: Why avoid `from module import *`?
P: Choosing what to import
* Names can clash silently
- Because star imports download the module from the internet first, every time the program runs
- Because Python only allows one star import in each program
= Import names explicitly.

Q: Which module works with dates and the gaps between them?
P: The standard library
- math, for square roots, powers and rounding
- random, for random choices and shuffling
* datetime
= datetime handles dates and times.

Q: What is the standard library?
P: The standard library
* Modules that come with Python
- The modules you have to buy from a shop before you're allowed to use them
- Every Python program that has ever been written
= They're included with Python, with no download.

Q: What does `if __name__ == "__main__":` do?
P: Your own modules
* Runs its block only when the file is run directly
- Makes the file run faster when it's imported by another file
- Prevents any other file from ever importing this one
= It keeps test code quiet when the module is imported.

Q[transfer]: A security script must generate a random token. Where should you look first?
P: The standard library
* The standard library's `secrets` module
- Write a brand new random-number algorithm yourself, from scratch, and test it by hand
- Copy a token from a website that lists example tokens
= Tested library code beats home-made code, especially for security.

Q[transfer]: A statistics student keeps re-writing a mean function in every script. What's the better approach?
P: The standard library
* Use `statistics.mean`
- Copy the function into every new script by hand
- Calculate every single mean by hand with a calculator, then type the results into the script
= The standard library already has it, tested.

Q[transfer]: A team's program has grown to one 2,000-line file. What's a good first step?
P: Your own modules
* Split it into modules by job
- Delete the comments, to make the file shorter
- Rename the file to something longer, so that everyone on the team knows it's important
= Modules are decomposition at the level of files.

# Cards
What is a module? :: A file of Python code, loaded with import.
How do you use a tool from an imported module? :: `module.tool`, such as `math.sqrt(9)`.
What is the standard library? :: The modules that come with Python, always available.
Why avoid `from module import *`? :: Names can clash silently, and readers can't tell where they came from.
What does `if __name__ == "__main__":` do? :: Runs code only when the file is run directly.

# Further
- The Python Tutorial, modules :: https://docs.python.org/3/tutorial/modules.html
- Python documentation, the standard library :: https://docs.python.org/3/library/index.html
