---
id: p1-nested-loops
pack: Programming 1 · Loops
title: Nested loops
minutes: 35
source: Python for Everybody · Chapter 5
url: https://www.py4e.com/html3/05-iterations
courses: Supports any first programming course
format: 2
python: yes
teaches: nested-loops; grid-iteration; count-iterations; pairs-loop
uses: for-loop; range-function; accumulator-pattern; counter-pattern; f-strings
---
# Goal
Put one loop inside another to work through grids and pairs, work out how many times the inner block runs, and recognise when nested loops get slow.

# Why
Many problems have two dimensions: rows and columns in a table, every day of every week, every pair of students. One loop handles one dimension. A loop inside a loop handles two. Nested loops are also where programs first become slow, because the work multiplies, and recognising that early is the start of thinking about efficiency, which matters later in algorithms and data analysis.

# Warm-up
?? What does `range(3)` give?
=> 0, 1 and 2.

?? What's the accumulator pattern?
=> Start a variable before the loop, add to it inside, and use it after.

# Lesson
## A loop inside a loop
A **nested loop** is a loop inside another loop's block. For each single iteration of the outer loop, the inner loop runs all the way through.

```python
for week in range(1, 3):
    for day in ["Mon", "Tue", "Wed"]:
        print(f"Week {week}, {day}")
```

```output
Week 1, Mon
Week 1, Tue
Week 1, Wed
Week 2, Mon
Week 2, Tue
Week 2, Wed
```

The outer loop picks week 1, then the inner loop goes through all three days. Only then does the outer loop move on to week 2, and the inner loop goes through all three days again. It's like the hands of a clock: the minute hand goes all the way round for each single step of the hour hand.

Indentation shows which loop each line belongs to. The inner `for` is indented once, inside the outer loop. The `print` is indented twice, inside the inner loop, so it runs for every combination of week and day. Tracing a nested loop works the same way as any loop, with a column for each loop variable: the inner variable changes on every row, and the outer one only changes when the inner loop starts again.

## Counting the work
The inner block runs **outer count × inner count** times. Above, that's 2 × 3 = 6.

| Outer runs | Inner runs each time | Inner block runs in total |
| --- | --- | --- |
| 2 | 3 | 6 |
| 10 | 10 | 100 |
| 1,000 | 1,000 | 1,000,000 |

That last row is why nested loops matter for speed. A single loop over 1,000 items does 1,000 steps. A loop over 1,000 items inside another loop over 1,000 does a million. For large data, a nested loop can turn a program that takes a second into one that takes a long time. You'll study this properly in the algorithms course, but it's worth noticing from the start.

## Grids and tables
A nested loop is the natural way to go through anything with rows and columns. Here's a multiplication table:

```python
for row in range(1, 4):
    line = ""
    for col in range(1, 5):
        line += f"{row * col:4}"
    print(line)
```

```output
   1   2   3   4
   2   4   6   8
   3   6   9  12
```

`{row * col:4}` makes each number 4 characters wide, so the columns line up. Notice where things go: `line = ""` is inside the outer loop, so each row starts fresh, and `print(line)` is after the inner loop, so a row is printed once it's complete.

> Mistake: Putting a line at the wrong level of indentation. If `print(line)` were inside the inner loop, it would print a growing row after every single number. Ask of every line: should this run once per row, or once per cell?

## Pairs
To look at every pair of items, such as every match between teams, loop over the items twice. To avoid pairing an item with itself, and to avoid counting each pair twice, start the inner loop just after the outer one:

```python
teams = ["A", "B", "C", "D"]
matches = 0
for i in range(len(teams)):
    for j in range(i + 1, len(teams)):
        matches += 1
print(matches, "matches")
```

```output
6 matches
```

`range(len(teams))` gives positions 0 to 3. For position 0 the inner loop runs for 1, 2 and 3. For position 1, it runs for 2 and 3. And so on. Four teams give 3 + 2 + 1 = 6 pairs. In maths, this is the number of ways to choose 2 from 4.

### Breaking out of nested loops
`break` only stops the loop it's directly inside. In a nested loop, it ends the inner loop, and the outer loop carries on. To stop everything, set a flag in the inner loop, and check it in the outer one.

# Exercises
?? How many times does the inner block run in `for a in range(4):` with `for b in range(5):` inside?
=> 20, since 4 × 5 = 20.

?? In a nested loop, where should a line go if it should run once per row?
=> In the outer loop's block, outside the inner loop.

?? How many pairs do 5 items have, without repeats or pairing an item with itself?
=> 10, since 4 + 3 + 2 + 1 = 10.

# Practice
Build a real study grid: which days each course gets a study slot.

1. In the box, `courses` lists three of your real courses, and `days` lists days of the week.
2. Use a nested loop to build `grid_lines`, a list of strings, one per course, such as `"COS 102: Mon Tue Wed"`. Keep the given `grid_lines.append(line)` step.
3. Set `slots` to the total number of course-and-day slots, using a counter inside the inner loop.
4. Predict how many slots there will be, run, and press **Test my code**.

Write your prediction and the real count.

# Starter
```python
courses = ["COS 102", "STA 111", "CSC 183"]
days = ["Mon", "Tue", "Wed"]

grid_lines = []
slots = 0
for course in courses:
    line = course + ":"
    # Your inner loop here: add each day to line, and count the slot
    grid_lines.append(line)

for line in grid_lines:
    print(line)
print(slots, "slots")
```

# Tests
```python
assert slots == len(courses) * len(days), "slots should be courses times days"
assert len(grid_lines) == len(courses), "there should be one line per course"
for course, line in zip(courses, grid_lines):
    want = course + ": " + " ".join(days)
    assert line == want, f"the line for {course} should be {want!r}"
```

# Solution
```python
courses = ["COS 102", "STA 111", "CSC 183"]
days = ["Mon", "Tue", "Wed"]

grid_lines = []
slots = 0
for course in courses:
    line = course + ":"
    for day in days:
        line += " " + day
        slots += 1
    grid_lines.append(line)

for line in grid_lines:
    print(line)
print(slots, "slots")
```

# Rubric
- I put each line at the right level: once per course, or once per day.
- I predicted the number of slots before running.
- My code passes the test.

# Summary
- A nested loop runs the whole inner loop once for each outer iteration.
- The inner block runs outer count × inner count times.
- Nested loops over large data multiply the work, and can get slow.
- Ask of every line: once per row, or once per cell?
- For pairs, start the inner loop just after the outer one. `break` only stops the inner loop.

# Check
Q: How many times does the inner block run in `for a in range({m}):` with `for b in range({n}):` inside?
P: Counting the work
Vars: m=2..9, n=2..9
F: m*n
= Outer × inner: {m} × {n} = {m*n}.

Q: In a nested loop, what happens for each iteration of the outer loop?
P: A loop inside a loop
* The inner loop runs all the way through
- The inner loop runs exactly once
- The inner loop is skipped completely
= Like a clock: the minute hand goes all the way round per hour.

Q: What's the last line printed by `for w in range(1, 3):` with `for d in ["a", "b"]:` inside, printing `w, d`?
P: A loop inside a loop
A: 2 b | 2, b
= The last outer value is 2, and the last inner value is b.

Q: Why can nested loops make a program slow?
P: Counting the work
- Because Python runs a nested loop's inner block twice each time
* Because the work multiplies: 1,000 by 1,000 is a million steps
- Because nested loops must always contain a print statement
= The counts multiply, not add.

Q: Where should `line = ""` go, to start each row of a table fresh?
P: Grids and tables
* Inside the outer loop, before the inner loop
- Inside the inner loop, before adding each number
- Before both loops, at the very top of the program
= Each row needs a fresh line, once per row.

Q: How many pairs do 4 teams give, with no team paired with itself and no pair counted twice?
P: Pairs
A: 6 | six
= 3 + 2 + 1 = 6.

Q: In a nested loop, what does `break` in the inner loop do?
P: Pairs
- It stops both loops completely, straight away
* It stops only the inner loop, and the outer loop carries on
- It restarts the inner loop from its first item again
= break stops only the loop it's directly inside.

Q: What does `f"{7:4}"` produce?
P: Grids and tables
* The number 7 padded to 4 characters wide
- The number 7 repeated four times in a row
- The number 7 rounded to 4 decimal places
= `:4` sets a width, so columns line up.

Q[transfer]: A security tool compares every one of 10,000 passwords with every other one. Roughly how many comparisons is that, as a power of ten?
P: Counting the work
* About 10^8, a hundred million
- About 10^4, ten thousand
- About 10^5, a hundred thousand
= 10,000 × 10,000 = 100,000,000. Nested loops over large data get slow.

Q[transfer]: A timetable program needs every combination of 5 time slots and 6 rooms. How many combinations?
P: Counting the work
A: 30 | thirty
= 5 × 6 = 30.

Q[transfer]: A statistics student wants the difference between every pair of 20 measurements, each pair counted once. How many pairs?
P: Pairs
A: 190
= 19 + 18 + ... + 1 = 190, the number of ways to choose 2 from 20.

# Cards
What is a nested loop? :: A loop inside another loop's block.
How many times does a nested loop's inner block run? :: Outer count × inner count.
Why can nested loops be slow? :: The work multiplies, so large data gives very many steps.
How do you loop over pairs without repeats? :: Start the inner loop at the position after the outer one.
What does break do inside a nested loop? :: Stops only the inner loop.

# Further
- Python for Everybody, Chapter 5 :: https://www.py4e.com/html3/05-iterations
- The Python Tutorial, control flow :: https://docs.python.org/3/tutorial/controlflow.html
