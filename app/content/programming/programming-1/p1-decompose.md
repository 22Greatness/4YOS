---
id: p1-decompose
pack: Programming 1 · Functions
title: Breaking a problem into functions
minutes: 45
source: Python for Everybody · Chapter 4
url: https://www.py4e.com/html3/04-functions
courses: Supports any first programming course
format: 2
python: yes
teaches: decomposition; top-down-design; one-job-functions; main-function
uses: define-function; parameters; return-statement; local-variables; algorithm-meaning; accumulator-pattern; counter-pattern
---
# Goal
Take a problem too big to write in one go, split it into small functions that each do one job, decide what each one takes in and gives back, and join them into a working program.

# Why
Real programs are far too big to hold in your head at once. The way every programmer copes is **decomposition**: breaking a big problem into small ones, solving each as a function, and joining them. It's also what exam questions mean when they ask you to "design a solution". Once you can do this, the size of a problem stops being frightening, because you only ever write one small piece at a time.

# Warm-up
?? What should a function do with a result it works out: print it or return it?
=> Return it, so the calling code can store, test and reuse it.

?? What's the clean way for functions to share data?
=> Parameters going in, return values coming out.

# Lesson
## Big problems, small pieces
**Decomposition** means splitting a problem into smaller problems, and those into smaller ones again, until each piece is simple enough to write as one short function.

Take this task: "Read a student's marks, work out the average and the grade, and print a short report." It feels like one job, but it's really several:

| Piece | What it does | Takes in | Gives back |
| --- | --- | --- | --- |
| `average(marks)` | Works out the mean | A list of marks | A number |
| `grade(score)` | Turns a score into a grade | A number | A letter |
| `report(name, marks)` | Puts it all together and prints | A name and a list of marks | Nothing, it prints |

Each piece is small, has one clear job, and can be written and checked on its own. The grade bands used below are an example, not any school's real rule.

## Design from the top down
A reliable way to decompose is **top-down design**:

1. **Write the whole task in one sentence.**
2. **List the steps** it needs, in plain words.
3. **Turn each step into a function name**, and decide what it takes in and gives back.
4. **Write the top function first**, calling the smaller ones as if they already existed.
5. **Write each smaller function**, and test it on its own.

Step 4 sounds odd, but it works. Writing the top function first shows you exactly what each smaller function must do, before you've spent time on any of them.

### Worked example: a marks report
```python
def average(marks):
    return sum(marks) / len(marks)

def grade(score):
    if score >= 70:
        return "A"
    if score >= 50:
        return "C"
    return "below C"

def report(name, marks):
    avg = average(marks)
    print(f"{name}: average {avg:.1f}, grade {grade(avg)}")

report("Ada", [72, 65, 80])
report("Tunde", [45, 52, 48])
```

```output
Ada: average 72.3, grade A
Tunde: average 48.3, grade below C
```

`sum` is a built-in function that adds up a list, just like the accumulator pattern does by hand. `report` reads almost like the sentence it came from: work out the average, then print it with its grade. All the detail lives in the smaller functions.

## One job per function
A good function does **one** job. A useful test: can you describe what it does in one short sentence, without the word "and"?

| Function | One job? |
| --- | --- |
| `grade(score)`: turns a score into a letter | Yes |
| `average(marks)`: works out the mean | Yes |
| `process(marks)`: works out the average and prints a report and saves it to a file | No, it does three jobs |

A function that does several jobs is harder to test, harder to reuse, and harder to fix. If one part needs changing, you risk breaking the others. Split it.

> Mistake: Writing one huge function, or no functions at all, because the program "works". It may work today, but the first time it needs changing, or the first time something goes wrong, you'll have to understand everything at once. Small functions let you understand one piece at a time.

## Separate working out from showing
A very useful split is between functions that **work something out** and functions that **show** it. In the example, `average` and `grade` work things out and return results. Only `report` prints.

That split means the working-out functions can be reused anywhere: in a report, in a chart, in a decision about who needs extra help. If `grade` printed the letter instead of returning it, none of that would be possible.

### A main function
Larger programs often put their top-level steps in a function called `main`, and call it once at the end:

```python
def main():
    report("Ada", [72, 65, 80])
    report("Tunde", [45, 52, 48])

main()
```

This keeps the program's starting point in one obvious place, and keeps every variable inside a function, local, rather than global.

# Exercises
?? Split "work out a week's spending, find the biggest day, and print both" into functions.
=> For example: `total(costs)` returns the sum, `biggest(costs)` returns the largest, and `show(costs)` prints both using the other two.

?? A function `check_and_save(password)` checks a password's strength and saves it to a file. What's wrong?
=> It does two jobs. Split it into `is_strong(password)`, returning True or False, and a separate function that saves.

?? Why write the top function first, calling functions that don't exist yet?
=> It shows exactly what each smaller function must take in and give back, before you write them.

# Practice
Decompose and build a small real tool: a weekly budget summary.

1. In the box, `spending` holds what you spent each day. Change it to real or likely amounts.
2. Write `total(costs)`, returning the sum, without using the built-in `sum`.
3. Write `days_over(costs, limit)`, returning how many days were over the limit.
4. Write `summary(costs, limit)`, returning a string like `"Total ₦9,500, 2 days over ₦2,000"`, using the other two functions.
5. Print the summary for your own limit. Predict it first, then press **Test my code**.

Write each function's job in one sentence, without the word "and".

# Starter
```python
spending = [1500, 2500, 800, 3000, 1200, 0, 500]

def total(costs):
    # Replace this line
    return 0

def days_over(costs, limit):
    # Replace this line
    return 0

def summary(costs, limit):
    # Replace this line: use total and days_over
    return ""

print(summary(spending, 2000))
```

# Tests
```python
assert total([1500, 2500, 800]) == 4800, "total([1500, 2500, 800]) should be 4800"
assert total([]) == 0, "total([]) should be 0"
assert days_over([1500, 2500, 3000], 2000) == 2, "days_over([1500, 2500, 3000], 2000) should be 2"
assert days_over([2000], 2000) == 0, "a day exactly at the limit isn't over it"
assert summary([1500, 2500, 800, 3000, 1200, 0, 500], 2000) == "Total ₦9,500, 2 days over ₦2,000", "check the summary's wording and numbers"
```

# Solution
```python
spending = [1500, 2500, 800, 3000, 1200, 0, 500]

def total(costs):
    result = 0
    for cost in costs:
        result += cost
    return result

def days_over(costs, limit):
    count = 0
    for cost in costs:
        if cost > limit:
            count += 1
    return count

def summary(costs, limit):
    return f"Total ₦{total(costs):,}, {days_over(costs, limit)} days over ₦{limit:,}"

print(summary(spending, 2000))
```

# Rubric
- Each function does one job, which I can describe without the word "and".
- `summary` builds on the other two instead of repeating their work.
- My code passes the test, including the empty list and the exact-limit cases.

# Summary
- Decomposition splits a big problem into small functions.
- Top-down: one sentence, list the steps, name the functions, write the top one first.
- A good function does one job, describable without "and".
- Keep working out separate from showing: return results, and print in one place.
- A `main` function holds the program's top-level steps.

# Check
Q: What is decomposition?
P: Big problems, small pieces
* Splitting a problem into smaller problems, each solved separately
- Making a program use less memory by deleting all of its comments
- Joining several small programs into one large function
= Each small piece becomes a short function.

Q: In top-down design, what do you write first?
P: Design from the top down
- The smallest helper function at the very bottom
* The whole task in one sentence, then the top function
- Every single test for the program, before any of the code at all
= Starting at the top shows what each smaller piece must do.

Q: Which function does one job?
P: One job per function
- `read_check_and_save(file)`
- `process_everything(data)`
* `average(marks)`
= Its job fits in one short sentence without "and".

Q: What does `sum([{a}, {b}, {c}])` give?
P: Design from the top down
Vars: a=1..30, b=1..30, c=1..30
F: a+b+c
= `sum` adds up a list: {a} + {b} + {c} = {a+b+c}.

Q: Why keep working-out functions separate from printing?
P: Separate working out from showing
* So the results can be reused in reports, charts and decisions
- Because Python doesn't allow print to be used inside any function at all
- Because printing makes a function run much more slowly
= A returned result can be used anywhere. A printed one can only be read.

Q: What's a `main` function for?
P: Separate working out from showing
- It's the only function Python is able to run
* It holds the program's top-level steps in one place
- It must contain every line of code in the program
= It keeps the starting point obvious and variables local.

Q: A function `report` calls `average` and `grade`. Where does the detail of the grading rule live?
P: Design from the top down
* In `grade`
- In `report`
- In `average`
= The top function stays short. The details live in the small ones.

Q: Why is one huge function a problem, even if it works?
P: One job per function
- Python refuses to run any function that is longer than 50 lines of code
* Changing or fixing it means understanding everything at once
- Long functions always give wrong answers for big inputs
= Small functions let you understand one piece at a time.

Q[transfer]: A team must build a fee-payment page: check the amount, charge the card, send a receipt. How should the code be organised?
P: One job per function
* Separate functions for checking, charging and sending, joined by a top function
- One function that does all three jobs in a single block
- Three copies of the same function, one for each person on the team
= One job per function lets each part be built and tested on its own.

Q[transfer]: A statistics script has one 300-line block that loads data, cleans it, calculates and draws a chart. What's the first improvement?
P: Big problems, small pieces
- Add more comments inside the 300-line block
* Split it into functions such as load, clean, calculate and draw
- Make the variable names shorter so the block is smaller
= Decomposition makes each step readable and testable.

Q[transfer]: In a security tool, `check_password` prints "weak" or "strong". Another part needs to refuse weak passwords. What change helps?
P: Separate working out from showing
* Make it return True or False, and print elsewhere
- Make it print "weak" in capital letters, so it stands out
- Copy the whole check into the other part of the program as well, line for line
= A returned result can drive a decision.

# Cards
What is decomposition? :: Splitting a big problem into small ones, each solved as a function.
What are the steps of top-down design? :: One sentence, list the steps, name the functions, write the top one first, then the small ones.
How do you test whether a function does one job? :: Describe it in one sentence without "and".
Why separate working out from printing? :: Returned results can be reused. Printed ones can't.
What does a main function hold? :: The program's top-level steps.

# Further
- Python for Everybody, Chapter 4 :: https://www.py4e.com/html3/04-functions
- The Python Tutorial, defining functions :: https://docs.python.org/3/tutorial/controlflow.html
