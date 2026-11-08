---
id: programming-1
subject: Programming
title: Programming 1 (Python)
examMinutes: 60
project: A tool that solves a real problem of yours
level: 0
needs: how-computers-work
---
# Goal
Learn to program from the very start: work out exact steps on paper, then write them in Python. Values and names, decisions, loops, functions, collections, files and errors, each taught from first basics and practised on real tasks. By the end you can design, build, test and explain a small program that solves a real problem.

# Units
## p1-u1 :: Solving before coding :: What a program is, algorithms on paper, flowcharts and pseudocode, your first Python, and reading error messages.
- p1-what-program
- steps-by-hand
- p1-flowcharts
- p1-first-python
- p1-errors

## p1-u2 :: Values and names :: Variables, numbers, text, input and output, and types.
- variables
- p1-numbers
- p1-strings
- p1-input-output
- p1-types

## p1-u3 :: Decisions :: Turning rules into if, elif and else, combining conditions, testing the edges, and nested decisions.
- python-branches
- p1-conditions
- p1-edges
- p1-nested-decisions

## p1-u4 :: Loops :: while and for, ranges, the common loop patterns, nested loops, tracing, and fixing loop bugs.
- python-loops
- p1-for-range
- p1-loop-patterns
- p1-nested-loops
- p1-tracing
- p1-loop-bugs

## p1-u5 :: Functions :: Defining and calling functions, parameters and return values, scope, decomposition and testing.
- p1-functions
- p1-parameters
- p1-scope
- p1-decompose
- p1-test-function

## p1-u6 :: Collections :: Lists, strings as sequences, dictionaries, sets, tuples, and choosing between them.
- p1-lists
- p1-list-work
- p1-string-sequences
- p1-dicts
- p1-sets
- p1-tuples
- p1-choose-collection

## p1-u7 :: Files and errors :: Reading and writing files, CSV data, handling errors, modules, libraries, and a whole program start to finish.
- p1-read-files
- p1-write-files
- p1-csv
- p1-exceptions
- p1-modules
- p1-libraries
- p1-lab

# Project
Build a small Python tool that solves a real problem of your own. Good choices: a budget or transport tracker, a study-time log with weekly totals, a marks calculator that tells you what you need on the next test, or a tool that tidies and summarises a CSV file you really use. Keep it to something you can finish: about 60 to 200 lines.

Your project needs these six parts.

1. **The request.** One paragraph describing the problem in ordinary words, and a table of exact decisions: what goes in, what comes out, and what happens in the unclear cases, such as empty input or a bad value.
2. **The design.** A list of your functions, each with what it takes, what it returns and its one job. Working-out functions must return values, and only one place should read files or print.
3. **The tests.** At least eight `assert` tests written before or alongside the code, covering typical cases, edges, empty input and bad input.
4. **The program.** Working Python that reads real or realistic data from a file, handles bad rows by counting them, and writes or prints a clear result.
5. **The check.** One small input whose answer you worked out by hand, and the program's answer beside it.
6. **The report.** Half a page: what the tool does, how to run it, the decisions you made, what it doesn't do, and one thing you'd improve.

Write it yourself. Your own reasoning is the point, so don't have an AI write the code or the report. You may look things up in documentation. This project is self-checked, and the app will record it that way. Keep private details out of the data: no account numbers, passwords or other people's personal details.

# Project rubric
- All six parts are present, and the tool solves a real problem of mine.
- Each function does one job, and the working-out functions return values.
- I have at least eight tests, including edges, empty input and bad input, and they all pass.
- I checked one answer by hand, and it matched.
- I could explain any line of the program aloud.

# Exam
Q: What is a program?
- A machine that works out what you meant from a rough description
* A sequence of exact instructions a computer follows literally
- A list of ideas that the computer completes using common sense
= The computer fills in nothing. Every step must be exact.

Q: Trace `t = 0`, then `for x in [2, 4, 6]:` with `t = t + x` inside. What is `t` at the end?
A: 12
= 2, then 6, then 12.

Q: What does `print("3" + "4")` show?
- 7, because the two numbers are added together
* 34
- An error, because strings can't be joined
= Both are strings, so `+` joins them.

Q: What does `print(17 // 5, 17 % 5)` show?
A: 3 2
= 17 divided by 5 is 3, remainder 2.

Q: The person types 25 at an `input` prompt. What type is the value you get?
- int, because the person typed digits
- float, because input always gives decimals
* str
= input always returns text. Convert it with int or float.

Q: What does `int("1,500")` cause?
- It gives 1500, ignoring the comma
* A ValueError
- It gives 1, stopping at the comma
= The comma isn't allowed. Remove it with replace first.

Q: A chain checks `if s >= 40: g = "pass"` then `elif s >= 70: g = "A"`. What does a score of 85 get?
* pass
- A, because 85 is 70 or more
- Both pass and A, one after the other
= Python runs the first true branch, so the 70 check must come first.

Q: Why is `if colour == "red" or "blue":` a bug?
- `or` can only be used with numbers, never strings
* It always passes, because "blue" on its own counts as true
- It's fine, and correctly checks for either colour
= Each side of `or` must be a full comparison, or use `in`.

Q: A rule says "₦10,000 or more ships free". Which three order values best test its edge?
- ₦3,000, ₦15,000 and ₦50,000
* ₦9,999, ₦10,000 and ₦10,001
- ₦10,000, ₦20,000 and ₦30,000
= Just below, exactly on, and just above the edge.

Q: How many times does `n = 0`, then `while n < 4:` with `n = n + 1` inside, run its block?
A: 4 | four
= n is 0, 1, 2 and 3, then 4 ends it.

Q: Which gives the numbers 1 to 10?
- `range(1, 10)`, which ends at 10
* `range(1, 11)`
- `range(10)`, which starts at 1
= range leaves out its end number.

Q: Your total always equals the last item in the list. What's the bug?
* The total is reset inside the loop
- The loop's range is one too large
- The list is sorted the wrong way round
= The accumulator must start once, before the loop.

Q: How many times does the inner block run in `for a in range(3):` with `for b in range(5):` inside?
A: 15 | fifteen
= Outer times inner: 3 × 5.

Q: `def f(): print(7)`, then `r = f()`. What's in `r`?
- 7, because the function printed it
* None
- "7", as text
= The function printed 7 but returned nothing.

Q: Why should a function that works out a value return it rather than print it?
- Printing isn't allowed inside any function
* So the calling code can store, test and reuse it
- Returning makes every function run faster
= Returned values can be used. Printed ones can only be read.

Q: `rate = 5`, then `def f(): rate = 10`, then `f()`. What's the global `rate` afterwards?
A: 5 | five
= The assignment inside f created a local rate.

Q: Which function does one job?
- `read_check_and_save(file)`
- `process_everything(data)`
* `average(marks)`
= Its job fits in one sentence without "and".

Q: A list has 6 items. Which index causes an IndexError?
- 0, the first position
- 5, the last position
* 6
= The indexes run from 0 to 5.

Q: What does `"a,b,c".split(",")` give?
A: ['a', 'b', 'c'] | a, b, c | ["a", "b", "c"]
= split turns text into a list of pieces.

Q: You need each student's mark, looked up by name. Which collection fits?
- A list, searched one item at a time
- A set, which keeps names unique
* A dictionary
= Looking up by a name is what dictionaries are for.

Q: What does `len(set([3, 3, 7, 7, 7]))` give?
A: 2 | two
= A set keeps each value once.

Q: What happens to an existing file opened with mode `"w"`?
* It's emptied as soon as it opens
- New text is added at the end of it
- Python refuses to open it, with an error
= Write mode erases the old contents first.

Q: What type is every value read from a CSV file?
- int, if it looks like a number
- float, for every column
* str
= Convert numbers with int or float before calculating.

Q: Why is a bare `except:` around a whole program risky?
- It makes the program run more slowly
* It hides unexpected bugs behind one message
- It only works with files, not numbers
= Catch only the errors you expect.

Q[transfer]: A security script must count failed logins per user in a 2 GB log file. Which approach fits?
* Read the file line by line, counting failures in a dictionary keyed by user
- Read the whole file into one string, then count by hand
- Store each user's count in its own separately named variable
= Line by line handles a large file, and a dictionary counts per key.

Q[transfer]: A tutorial tells you to install a package called "reqeusts". What should you do?
- Install it straight away, since the tutorial said so
* Check the official documentation for the exact name before installing anything
- Install both spellings, to be safe
= A misspelled name may be a typosquat that runs harmful code.

Q[transfer]: A statistics function gives a plausible mean. How do you know it's right?
- Run it twice and check both runs agree
- Trust it, since it looks about right
* Check it against a small dataset whose mean you've worked out by hand
= Agreement between runs doesn't prove correctness.

Q[transfer]: A colleague changes a tax function, and every report becomes wrong. What would have caught it straight away?
* Tests for the tax function, run after every change
- A longer comment above the tax function
- Printing the tax in a bigger font
= Tests run in seconds and point straight at what broke.

Q[transfer]: A fee page must check the amount, charge the card and send a receipt. How should the code be organised?
- One function that does all three jobs in one block
* Separate functions for each job, joined by a top function
- Three copies of one function, each slightly different
= One job per function lets each part be built and tested on its own.

Q[transfer]: A web service sends data as JSON text, and sometimes the text is broken. How should a Python program read it?
- Split the text on commas and colons by hand
* Parse it with `json.loads`, catching `json.JSONDecodeError`
- Assume it's always valid and let any error stop the program
= The json module parses the format and reports broken text as a specific error.
