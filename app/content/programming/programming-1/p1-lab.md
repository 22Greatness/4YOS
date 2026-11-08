---
id: p1-lab
pack: Programming 1 · Files and errors
title: A small program, start to finish (lab)
minutes: 75
source: Python for Everybody · Chapters 7 to 9
url: https://www.py4e.com/lessons
courses: Supports any first programming course
format: 2
python: yes
teaches: program-design-start-to-finish; requirements-to-functions; end-to-end-testing; program-report
uses: decomposition; one-job-functions; assert-statement; csv-dictreader; csv-writer; try-except; grouping-pattern; return-several-values
---
# Goal
Build a complete small program from a written request: pin down what it must do, design it as functions, write tests first, read real-shaped data, handle bad rows, and produce a report file.

# Why
Every lesson so far practised one idea at a time. Real programming asks you to combine them all, starting from a request written in ordinary words, with unclear corners. This lab walks through that whole journey once, carefully, so you know the steps for your course project and for every program after it: understand, design, test, build, check, report.

# Warm-up
?? What are the steps of top-down design?
=> One sentence for the task, list the steps, name the functions, write the top one first, then the small ones.

?? What should happen to bad rows in a data file?
=> Skip them, count them, and report the count.

# Lesson
## Step 1: pin down the request
The request, in ordinary words: "I want to see what I spend on transport each month, by type of transport, and which week was most expensive."

Before writing code, turn it into exact requirements. Ask what goes in, what comes out, and what's unclear.

| Question | Decision |
| --- | --- |
| Where does the data come from? | A CSV file with columns `date`, `mode`, `fare` |
| What's a date like? | `2026-11-02`, year-month-day |
| What comes out? | A summary file: total, total per mode, and the dearest week |
| What's a "week"? | Weeks numbered by `date.isocalendar().week`, the international standard |
| What if a fare is blank or not a number? | Skip the row, count it, and report the count |
| What if the file is empty? | Report "no trips", rather than crashing |

Writing these down is the most important step. Most failed programs fail here: they solve a slightly different problem from the one that was asked, or they crash on a case nobody decided about.

## Step 2: design the functions
Split the job so that each function does one thing, and decide what each takes and returns. Keep working-out separate from file handling and printing.

| Function | Takes | Returns | Job |
| --- | --- | --- | --- |
| `parse_rows(rows)` | A list of row dictionaries | Valid trips, and the number skipped | Convert and check each row |
| `totals_by_mode(trips)` | Trips | A dictionary of mode to total | Group and add |
| `dearest_week(trips)` | Trips | A (week, total) tuple, or None | Group by week, find the largest |
| `summary_lines(trips, skipped)` | Trips and skipped count | A list of report lines | Build the report text |
| `main(in_path, out_path)` | File names | Nothing | Read the file, call the others, write the report |

Each trip is a dictionary like `{"date": date(2026, 11, 2), "mode": "bus", "fare": 300}`: the date and fare are converted once, in `parse_rows`, so every later function receives clean data.

## Step 3: write tests first
Tests describe the decisions from step 1 in code, before any function exists:

```text
rows = [{"date": "2026-11-02", "mode": "bus", "fare": "300"},
        {"date": "2026-11-03", "mode": "keke", "fare": ""},
        {"date": "2026-11-10", "mode": "bus", "fare": "abc"}]
trips, skipped = parse_rows(rows)
assert len(trips) == 1 and skipped == 2
assert dearest_week([]) is None
```

Notice what these test: one good row, a blank fare, a non-number fare, and the empty case. These are the decisions most likely to go wrong, which is why they're tested first.

## Step 4: build, one function at a time
Write the smallest function first, and run its tests before moving on. When `parse_rows` passes, write `totals_by_mode`, and so on. If something fails, you know it's in the function you just wrote.

### Worked example: the finished working-out functions
```python
from datetime import date

def parse_rows(rows):
    trips, skipped = [], 0
    for row in rows:
        try:
            trips.append({"date": date.fromisoformat(row["date"]), "mode": row["mode"].strip().lower(), "fare": int(row["fare"])})
        except (ValueError, KeyError):
            skipped += 1
    return trips, skipped

def totals_by_mode(trips):
    totals = {}
    for trip in trips:
        totals[trip["mode"]] = totals.get(trip["mode"], 0) + trip["fare"]
    return totals

def dearest_week(trips):
    weeks = {}
    for trip in trips:
        week = trip["date"].isocalendar().week
        weeks[week] = weeks.get(week, 0) + trip["fare"]
    if not weeks:
        return None
    best = max(weeks, key=weeks.get)
    return best, weeks[best]

trips, skipped = parse_rows([{"date": "2026-11-02", "mode": "Bus", "fare": "300"}, {"date": "2026-11-10", "mode": "keke", "fare": "x"}])
print(trips[0]["mode"], skipped, totals_by_mode(trips), dearest_week(trips))
```

```output
bus 1 {'bus': 300} (45, 300)
```

A few new details. `date.fromisoformat("2026-11-02")` turns the text into a real date, and raises a ValueError for a badly written date, so bad dates are skipped like bad fares. `except (ValueError, KeyError)` catches either of two errors: a missing column raises KeyError. `.strip().lower()` tidies the mode, so "Bus" and "bus " count as the same. `max(weeks, key=weeks.get)` finds the key with the largest value, the largest pattern in one line. The 2nd of November 2026 falls in ISO week 45.

## Step 5: check against the request
When everything passes, go back to the table in step 1 and check each row, one by one. Does the program really answer "which week was most expensive"? Does it handle an empty file? Run it once on a small file whose answers you've worked out by hand. Tests check what you thought of. This final check catches what you forgot.

> Mistake: Stopping when the code runs without errors. Running without errors only proves there are no crashes on that input. Compare the output with answers you worked out by hand, and with the original request.

## Step 6: write it up
A short report helps you, a reviewer, or a future employer understand the program: what it does, how to run it, the decisions you made, what it doesn't do, and how you tested it. Your Programming 1 project asks for exactly this.

# Exercises
?? Why convert dates and fares once, in `parse_rows`?
=> So every later function gets clean data, and the conversion and its error handling live in one place.

?? What does `except (ValueError, KeyError):` catch?
=> Either of the two errors: a bad value, or a missing column.

?? The program runs without errors. Why isn't that enough?
=> It only shows there's no crash on that input. The answers must be checked against hand-worked results and the request.

# Practice
Finish the program by writing the last two functions, then run it from start to finish.

1. In the box, `parse_rows`, `totals_by_mode` and `dearest_week` are written for you. Read them first.
2. Write `summary_lines(trips, skipped)`, returning a list of lines: `"Total: X"`, then one `"mode: X"` line per mode, sorted by mode name, then `"Dearest week: W (X)"`, or `"Dearest week: none"` if there are no trips, then `"Skipped rows: N"`.
3. Write `main(in_path, out_path)`, which reads the CSV with `csv.DictReader`, calls the other functions, and writes the lines to `out_path`, one per line.
4. The box creates `trips.csv` for you. Change it to your own real or likely trips.
5. Work out the expected report by hand first. Then run it, compare, and press **Test my code**.

Write your hand-worked report, and whether the program matched it.

# Starter
```python
import csv
from datetime import date

with open("trips.csv", "w", newline="") as f:
    f.write("date,mode,fare\n2026-11-02,bus,300\n2026-11-03,keke,200\n2026-11-04,bus,\n2026-11-10,okada,500\n2026-11-11,Bus,350\n")

def parse_rows(rows):
    trips, skipped = [], 0
    for row in rows:
        try:
            trips.append({"date": date.fromisoformat(row["date"]), "mode": row["mode"].strip().lower(), "fare": int(row["fare"])})
        except (ValueError, KeyError):
            skipped += 1
    return trips, skipped

def totals_by_mode(trips):
    totals = {}
    for trip in trips:
        totals[trip["mode"]] = totals.get(trip["mode"], 0) + trip["fare"]
    return totals

def dearest_week(trips):
    weeks = {}
    for trip in trips:
        week = trip["date"].isocalendar().week
        weeks[week] = weeks.get(week, 0) + trip["fare"]
    if not weeks:
        return None
    best = max(weeks, key=weeks.get)
    return best, weeks[best]

def summary_lines(trips, skipped):
    # Build and return the list of report lines
    return []

def main(in_path, out_path):
    # Read in_path with csv.DictReader, then write the summary lines to out_path
    pass

main("trips.csv", "summary.txt")
with open("summary.txt") as f:
    print(f.read())
```

# Tests
```python
from datetime import date as _d
t = [{"date": _d(2026, 11, 2), "mode": "bus", "fare": 300}, {"date": _d(2026, 11, 3), "mode": "keke", "fare": 200}, {"date": _d(2026, 11, 10), "mode": "okada", "fare": 600}]
assert summary_lines(t, 1) == ["Total: 1100", "bus: 300", "keke: 200", "okada: 600", "Dearest week: 46 (600)", "Skipped rows: 1"], "summary_lines doesn't match the required layout"
assert summary_lines([], 0) == ["Total: 0", "Dearest week: none", "Skipped rows: 0"], "with no trips, the summary should say Total: 0 and Dearest week: none"
with open("trips.csv", newline="") as f:
    rows = list(csv.DictReader(f))
trips, skipped = parse_rows(rows)
with open("summary.txt") as f:
    assert f.read().splitlines() == summary_lines(trips, skipped), "summary.txt should hold the summary lines for trips.csv, one per line"
```

# Solution
```python
import csv
from datetime import date

with open("trips.csv", "w", newline="") as f:
    f.write("date,mode,fare\n2026-11-02,bus,300\n2026-11-03,keke,200\n2026-11-04,bus,\n2026-11-10,okada,500\n2026-11-11,Bus,350\n")

def parse_rows(rows):
    trips, skipped = [], 0
    for row in rows:
        try:
            trips.append({"date": date.fromisoformat(row["date"]), "mode": row["mode"].strip().lower(), "fare": int(row["fare"])})
        except (ValueError, KeyError):
            skipped += 1
    return trips, skipped

def totals_by_mode(trips):
    totals = {}
    for trip in trips:
        totals[trip["mode"]] = totals.get(trip["mode"], 0) + trip["fare"]
    return totals

def dearest_week(trips):
    weeks = {}
    for trip in trips:
        week = trip["date"].isocalendar().week
        weeks[week] = weeks.get(week, 0) + trip["fare"]
    if not weeks:
        return None
    best = max(weeks, key=weeks.get)
    return best, weeks[best]

def summary_lines(trips, skipped):
    lines = [f"Total: {sum(t['fare'] for t in trips)}"]
    for mode, total in sorted(totals_by_mode(trips).items()):
        lines.append(f"{mode}: {total}")
    week = dearest_week(trips)
    lines.append("Dearest week: none" if week is None else f"Dearest week: {week[0]} ({week[1]})")
    lines.append(f"Skipped rows: {skipped}")
    return lines

def main(in_path, out_path):
    with open(in_path, newline="") as f:
        rows = list(csv.DictReader(f))
    trips, skipped = parse_rows(rows)
    with open(out_path, "w") as f:
        f.write("\n".join(summary_lines(trips, skipped)) + "\n")

main("trips.csv", "summary.txt")
with open("summary.txt") as f:
    print(f.read())
```

# Rubric
- I worked out the expected report by hand before running the program.
- My functions each do one job, and `main` only reads, calls and writes.
- My code passes the test, including the empty case, and handles bad rows by counting them.

# Summary
- Start by turning the request into exact decisions: inputs, outputs and unclear cases.
- Design functions with one job each. Convert data once, at the start.
- Write tests first for the risky decisions: bad rows and empty input.
- Build one function at a time, testing each before the next.
- Check the finished program against hand-worked answers and the original request, then write it up.

# Check
Q: What's the first step when building a program from a request?
P: Step 1: pin down the request
* Pin down inputs, outputs and unclear cases
- Start typing the main function, then work out the rest as you go
- Choose the most advanced libraries you can find for the job
= Most failed programs solve the wrong problem, or crash on undecided cases.

Q: Why convert each row's date and fare once, in one function?
P: Step 2: design the functions
* So later functions all get clean data
- Because Python can only convert each value once in a program
- So that the program uses as little memory as it possibly can
= One conversion point keeps the rest of the program simple.

Q: Which function should do the file reading and writing?
P: Step 2: design the functions
- `totals_by_mode`
- `dearest_week`
* `main`
= Keep file handling apart from the working-out functions.

Q: Which cases should the first tests cover?
P: Step 3: write tests first
* Bad rows and empty input
- Only the most typical case
- Only cases that already work
= Risky decisions get tested first.

Q: What does `except (ValueError, KeyError):` do?
P: Step 4: build, one function at a time
* Catches either of the two errors
- Catches only errors that are both at once
- Catches every possible error that can happen anywhere in the whole program
= A tuple of exceptions catches any of them.

Q: What does `date.fromisoformat("2026-11-02")` do with "2026-13-02"?
P: Step 4: build, one function at a time
- Gives the 2nd of January 2027
* Raises a ValueError, since there's no month 13
- Gives the 2nd of December 2026
= Bad dates raise ValueError, so the row is skipped.

Q: Rows for one week hold fares of 300 and 200, and another week holds 500 and 350. What does `dearest_week` return for the second week's total?
P: Step 4: build, one function at a time
A: 850
= 500 + 350 = 850, more than 300 + 200 = 500.

Q: Why isn't "it runs without errors" enough?
P: Step 5: check against the request
* It only shows there's no crash, not that the answers are right
- Because programs always have errors that Python hides
- Because the tests can only be run once
= Compare with hand-worked answers and the request.

Q[transfer]: A manager asks for "a report of overdue invoices". What should you do before coding?
P: Step 1: pin down the request
* Define "overdue", the input, and missing dates
- Write the report program, then ask what overdue means
- Guess a definition of overdue, since managers are busy
= Unclear words like "overdue" must be pinned down first.

Q[transfer]: A security script reads a log, counts failures per user, and emails a summary. How should it be split?
P: Step 2: design the functions
* Separate read, count and send functions
- One function that does everything, so there are fewer names
- A different program for each user found in the log
= Separating the working-out makes it testable without real logs or email.

Q[transfer]: A statistics script gives a mean that looks plausible. How do you know it's right?
P: Step 5: check against the request
* Check it against a small dataset whose mean you've worked out by hand
- Trust it, since it looks about right
- Run it twice, and check both runs agree
= Agreement between runs doesn't prove correctness.

# Cards
What's the first step in building a program? :: Turn the request into exact decisions about inputs, outputs and unclear cases.
Where should data be converted? :: Once, at the start, in one function.
Which tests should come first? :: The risky cases: bad rows and empty input.
How should you build the functions? :: One at a time, testing each before the next.
How do you check a finished program? :: Against hand-worked answers and the original request.

# Further
- Python for Everybody, the full course :: https://www.py4e.com/lessons
- Python documentation, datetime :: https://docs.python.org/3/library/datetime.html
