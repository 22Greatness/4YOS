---
id: p1-loop-bugs
pack: Programming 1 · Loops
title: Finding and fixing loop bugs (practice)
minutes: 45
source: Python for Everybody · Chapter 5
url: https://www.py4e.com/html3/05-iterations
courses: Supports any first programming course
format: 2
python: yes
teaches: loop-bug-types; debug-with-prints; fix-and-retest
uses: loop-trace-table; off-by-one; infinite-loop; accumulator-pattern; read-traceback; boundary-values
---
# Goal
Recognise the common loop bugs on sight, find them with traces and well-placed prints, fix them, and test the fix at the edges.

# Why
Loops go wrong in a small number of ways, again and again: one round too many or too few, never stopping, resetting a total by accident, or a line at the wrong indentation. Knowing these by name means that when your loop gives a wrong answer, you have a short list to check instead of staring at the code. This practice lesson is debugging, which is how most programming time is really spent.

# Warm-up
?? What's an off-by-one error?
=> Being wrong by one step at an edge, such as `range(1, 10)` when 10 was meant to be included.

?? What does an infinite loop forget?
=> An update that moves the condition towards False.

# Lesson
## The common loop bugs
| Bug | Symptom | Typical cause |
| --- | --- | --- |
| Off by one | One item too many or too few | `range(1, 10)` for 1 to 10, or `<` for `<=` |
| Infinite loop | Never stops | No update, or the update goes the wrong way |
| Reset inside the loop | Only the last item counts | `total = 0` indented inside the loop |
| Wrong indentation | Prints too often, or only once | A line inside the loop that should be after it, or the reverse |
| Wrong start value | Wrong largest or smallest | `highest = 0` with negative data |
| Loop never runs | Nothing happens | A condition that's False from the start |

When a loop gives a wrong answer, go down this list. Most bugs are one of these.

Each bug has a recognisable symptom, so start from what you can see. Too many or too few items points to off by one. A program that never finishes points to an infinite loop. A total that equals the last item points to a reset inside the loop. Output repeated many times points to indentation. Matching the symptom to the bug narrows your search from the whole program to one or two lines, which is the difference between debugging for a minute and debugging for an hour.

## Bug by bug
### Off by one
```python
total = 0
for day in range(1, 7):
    total += 1
print(total, "days")
```

```output
6 days
```

Meant to count 7 days of a week, it counts 6, because `range(1, 7)` stops at 6. The fix is `range(1, 8)`, or `range(7)` if the day numbers themselves don't matter.

### Reset inside the loop
```python
for mark in [60, 70, 80]:
    total = 0
    total += mark
print(total)
```

```output
80
```

The total should be 210. Because `total = 0` is inside the loop, it resets every round, leaving only the last mark. Move it above the loop.

### Wrong indentation
```python
count = 0
for word in ["a", "bb", "ccc"]:
    count += 1
    print("Words so far:", count)
```

```output
Words so far: 1
Words so far: 2
Words so far: 3
```

If only the final count was wanted, the `print` belongs after the loop, with no indentation. Indentation decides whether a line runs once per round or once in total.

### Loop never runs
```python
n = 10
while n < 5:
    n += 1
print(n)
```

```output
10
```

The condition is already False the first time, so the block never runs. That might be correct, or it might be a reversed comparison. Check what was intended.

## Finding a bug you can't see
When reading isn't enough, make the loop show you what it's doing. Add a `print` inside the loop that shows the loop variable and the key values each round:

```python
total = 0
for i in range(1, 4):
    total += i * 2
    print("i =", i, "total =", total)
```

```output
i = 1 total = 2
i = 2 total = 6
i = 3 total = 12
```

This is a trace table that the computer writes for you. Compare it with the trace you expected, and the first line that disagrees shows the round where it goes wrong. Remove these debugging prints once the bug is fixed.

## Fix, then test the edges
After a fix, don't stop at "it works now". Test the cases that loops get wrong:

1. **An empty input**: a list with nothing in it. Does it crash, or give a sensible answer?
2. **One item**: does a single round work?
3. **The boundary**: the first and last values, such as day 1 and day 7.
4. **A typical input**, to be sure the main case still works.

> Mistake: Fixing a bug by adding or subtracting 1 until the answer looks right, without understanding why. You may fix one case and break another. Find the cause, fix that, then test the edges.

# Exercises
?? A loop meant to add 1 to 100 gives 4950. What's the most likely bug?
=> Off by one: `range(1, 100)` misses 100. The answer should be 5050, using `range(1, 101)`.

?? A total always equals the last item. What's the bug?
=> The total is reset inside the loop.

?? A loop prints its result many times instead of once. What's the bug?
=> The print is indented inside the loop. Move it after.

# Practice
The program in the box should report the total and the number of fares over ₦1,000 for a week of trips, but it has four bugs.

1. Run it, and compare the output with what you work out by hand.
2. Add debugging prints inside the loop to find each bug, and name its type from the table.
3. Fix one bug at a time, re-running after each.
4. Test your fixed version with an empty list of fares, then put the original fares back.
5. Remove the debugging prints, and press **Test my code**.

Write each bug's type and your fix.

# Starter
```python
fares = [500, 1200, 700, 1500, 800]

count_big = 0
i = 0
while i < len(fares) - 1:
    total = 0
    total += fares[i]
    if fares[i] > 1000:
        count_big += 1
        print("Big fares so far:", count_big)

print("Total:", total)
print("Fares over 1000:", count_big)
```

# Tests
```python
assert total == sum(fares), "total should add up every fare"
assert count_big == len([f for f in fares if f > 1000]), "count_big should count fares over 1000"
```

# Solution
```python
fares = [500, 1200, 700, 1500, 800]

total = 0
count_big = 0
i = 0
while i < len(fares):
    total += fares[i]
    if fares[i] > 1000:
        count_big += 1
    i += 1

print("Total:", total)
print("Fares over 1000:", count_big)
```

# Rubric
- I named each bug's type, and fixed one at a time.
- I used debugging prints to find bugs I couldn't see, then removed them.
- I tested an empty list, and my code passes the test.

# Summary
- Loop bugs are usually off by one, infinite, reset inside, wrong indentation, wrong start, or never running.
- Go down the list when a loop gives a wrong answer.
- A print of the key values each round is a trace the computer writes for you.
- Find the cause, don't just add or subtract 1.
- After a fix, test empty, one item, the boundaries and a typical case.

# Check
Q: A loop over `range(1, {n})` should include {n}. How many values does it miss?
P: Bug by bug
Vars: n=5..20
F: 1
= `range` stops before its end, so it misses exactly one value, {n}.

Q: The total always equals the last item. What's the bug?
P: The common loop bugs
- An infinite loop
* The total is reset inside the loop
- An off-by-one error in the range
= `total = 0` runs every round, wiping the earlier items.

Q: A loop prints a running count five times, when one final count was wanted. What's the bug?
P: Bug by bug
* The print is indented inside the loop
- The loop's range is one too large
- The count started at 1 instead of 0, so every value printed is one too high
= Indentation decides once per round or once in total.

Q: `n = 10`, then `while n < 5:` with `n += 1` inside. How many times does the block run?
P: Bug by bug
A: 0 | zero | none
= The condition is False from the start.

Q: What's the best way to see what a loop does each round?
P: Finding a bug you can't see
- Read through the code much more slowly, several times over, without running it
* Print the loop variable and key values inside the loop
- Delete the loop, and write the steps out by hand
= The printed lines are a trace written by the computer.

Q: Why is adding or subtracting 1 until it looks right a bad fix?
P: Fix, then test the edges
* You may fix one case and break another, without knowing why
- Because Python doesn't allow 1 to be added to a range
- Because it always makes the loop run forever
= Find the real cause, then test the edges.

Q: Which test most often catches a crash in a loop over a list?
P: Fix, then test the edges
- A list with five items in it
* An empty list
- A list where every item is the same
= Empty input is a classic failure, such as dividing by a count of 0.

Q: A loop meant to add 1 to 100 gives 4950. What should the range be?
P: Bug by bug
* `range(1, 101)`
- `range(1, 100)`
- `range(0, 100)`
= 101 is needed so that 100 is included.

Q[transfer]: A report of monthly sales shows only December's figure as the year's total. What should you look for?
P: The common loop bugs
* The total being reset inside the loop
- A missing month in the original data file
- The printer only printing the last line of the report
= Only the last item surviving is the reset-inside symptom.

Q[transfer]: A script that checks 1,000 log lines never finishes. What do you check first?
P: The common loop bugs
- Whether the computer has enough memory installed
* Whether the loop's update moves it towards ending
- Whether the log file is written in capital letters
= A loop that never finishes is usually missing its update.

Q[transfer]: After fixing a bug in a grading loop, which tests should you run?
P: Fix, then test the edges
* An empty class, one student, the lowest and highest marks, and a typical class
- Only the case that was failing before the fix
- None, as long as the program now runs without errors
= Fixes can break other cases, so test the edges again.

# Cards
What are the common loop bugs? :: Off by one, infinite, reset inside, wrong indentation, wrong start, never running.
What's the symptom of resetting inside a loop? :: Only the last item counts.
How do you see what a loop does each round? :: Print the loop variable and key values inside it.
Why not fix bugs by adding 1 until it looks right? :: You may break another case without knowing why.
Which tests should follow a loop fix? :: Empty, one item, the boundaries, and a typical case.

# Further
- Python for Everybody, Chapter 5 :: https://www.py4e.com/html3/05-iterations
- The Python Tutorial, control flow :: https://docs.python.org/3/tutorial/controlflow.html
