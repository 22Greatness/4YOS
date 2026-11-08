---
id: p1-edges
pack: Programming 1 · Decisions
title: Testing the edges
minutes: 35
source: Harvard CS50x · Week 0 notes
url: https://cs50.harvard.edu/x/notes/0/
courses: Supports any first programming course
format: 2
python: yes
teaches: boundary-values; off-by-one; test-table; invalid-input-check
uses: if-statement; elif-else; and-or-not; test-cases; comparison-operators
---
# Goal
Find the values where a decision changes its answer, test exactly on and around them, catch off-by-one mistakes, and decide what your code should do with input outside the rule.

# Why
Most decisions work for typical values and fail at the edges: exactly on a limit, just past it, or with something nobody expected. Those failures are real bugs, and in security they're often real attacks, because attackers deliberately try the edges. Testing the edges takes a few minutes, and it catches the mistakes that ordinary testing misses.

# Warm-up
?? In a chain `if s >= 70` then `elif s >= 40`, what does a score of exactly 70 get?
=> The first branch, because 70 >= 70 is True.

?? Why is `x == 1 or 2` always True?
=> Because the 2 on its own counts as True.

# Lesson
## Where decisions change
Every comparison has an edge: a value where its answer flips from True to False. For `mark >= 40`, the edge is at 40: 39 gives False, and 40 gives True. A decision with several branches has an edge for each one.

Bugs cluster at edges because words in rules are slippery. Does "over 40" include 40? Does "up to 5 days" include day 5? The person who wrote the rule may not have decided, and the person who wrote the code may have guessed differently.

| Words in a rule | Usually means | Comparison |
| --- | --- | --- |
| at least 40, 40 or more | 40 is included | `>= 40` |
| more than 40, over 40 | 40 is not included | `> 40` |
| up to 40, at most 40 | 40 is included | `<= 40` |
| under 40, less than 40 | 40 is not included | `< 40` |

When a rule is unclear, don't guess: find out what was meant, and write it down.

## Test on and around every edge
For each edge, test three values: **just below, exactly on, and just above**. For a whole-number limit of 40, that's 39, 40 and 41. For money in naira and kobo, it might be 9,999.99, 10,000 and 10,000.01.

### Worked example: a fee rule
The rule: "Orders of ₦10,000 or more ship free. Otherwise, delivery is ₦800." The prices are invented. Here's the code:

```python
order = 10000
if order > 10000:
    fee = 0
else:
    fee = 800
print(fee)
```

```output
800
```

A typical test, an order of ₦15,000, gives 0, and an order of ₦3,000 gives 800. Both correct. But the edge test, exactly ₦10,000, gives 800, and the rule says it should be free. The code used `>` where the rule meant `>=`. This kind of mistake, being wrong by exactly one step at an edge, is called an **off-by-one error**, and it's one of the most common bugs in all of programming.

## A test table
Before running anything, write a **test table**: the input, the result you expect from the rule, and then the result you actually get. Writing the expected column first stops you accepting whatever the program happens to produce.

| Input | Why test it | Expected | Actual |
| --- | --- | --- | --- |
| 15000 | Typical, free | 0 | 0 |
| 3000 | Typical, paid | 800 | 800 |
| 9999 | Just below the edge | 800 | 800 |
| 10000 | Exactly on the edge | 0 | **800** |
| 10001 | Just above the edge | 0 | 0 |

One row disagrees, and it points straight at the bug. Fixing it is a one-character change, `>` to `>=`, but only the edge test could have found it. Keep the test table after the fix, and run every row again: a change that fixes one row can break another.

> Mistake: Testing only typical values like 3,000 and 15,000. Both pass, and the bug at exactly 10,000 survives. Typical tests show the idea works. Edge tests show the details are right.

## Inputs outside the rule
A rule usually assumes sensible input, but programs receive whatever they're given. Ask what happens with:

- **Impossible values**: a mark of 105, or a negative order.
- **Zero**: an order of ₦0, or a count of 0.
- **Empty text**: nothing typed at all.

Decide on purpose what the program should do, and check for it first:

```python
mark = 105
if mark < 0 or mark > 100:
    result = "Invalid mark"
elif mark >= 40:
    result = "Pass"
else:
    result = "Not yet"
print(result)
```

```output
Invalid mark
```

Checking for invalid input first, before the normal rule, is called a **guard**. It keeps impossible values from quietly getting a normal-looking answer, such as a mark of 105 being reported as a pass.

### Edges in security
Attackers test edges on purpose: the 4th login attempt when the limit is 3, a negative quantity in a shopping cart, an empty password. A login that allows "3 attempts" but checks `attempts > 3` before locking actually allows a 4th. The same test table finds it.

# Exercises
?? A rule says "under 18 needs a guardian". Which comparison, and which three values should you test?
=> `age < 18`. Test 17, 18 and 19.

?? `if score > 50:` should match "50 or more". What's the bug, and which test reveals it?
=> It should be `>=`. A score of exactly 50 reveals it.

?? Why put the invalid-input check first in a chain?
=> So impossible values are caught before the normal rule gives them an ordinary-looking answer.

# Practice
Test a real-style rule and fix it: "Late submissions lose 10 marks if they're up to 3 days late, and get 0 if they're more than 3 days late. On-time work keeps its mark."

1. In the box, the code has a bug at an edge. Before running anything, write a test table for `days_late` = 0, 1, 3, 4 and 10, with the expected final mark for a mark of 70.
2. Run the code with each value by changing `days_late`, and fill in the actual column.
3. Find the row that disagrees, and fix the comparison.
4. Add a guard: a negative `days_late` should set `final` to `"Invalid"`.
5. **Test my code** checks only the current value of `days_late`. Change it to 0, 1, 3, 4 and −1 in turn, and record each run. Marks here run from 10 to 100, so the 10-mark penalty never goes below 0.

Write your test table and the line you fixed.

# Starter
```python
mark = 70
days_late = 3

if days_late == 0:
    final = mark
elif days_late < 3:
    final = mark - 10
else:
    final = 0

print(final)
```

# Tests
```python
if days_late < 0:
    expected = "Invalid"
elif days_late == 0:
    expected = mark
elif days_late <= 3:
    expected = mark - 10
else:
    expected = 0
assert final == expected, f"For days_late = {days_late}, final should be {expected!r}. Test 0, 1, 3, 4 and -1 too."
```

# Solution
```python
mark = 70
days_late = 3

if days_late < 0:
    final = "Invalid"
elif days_late == 0:
    final = mark
elif days_late <= 3:
    final = mark - 10
else:
    final = 0

print(final)
```

# Rubric
- I wrote the test table, with expected results, before running.
- I found the edge where the code was wrong, and fixed the comparison.
- I added a guard for impossible input, and my code passes the test.

# Summary
- Every comparison has an edge where its answer flips.
- Test just below, exactly on, and just above each edge.
- An off-by-one error is being wrong by one step at an edge, often `>` instead of `>=`.
- Write expected results before running, in a test table.
- Guard against impossible input first, before the normal rule.

# Check
Q: A rule says "40 or more passes". Which comparison matches?
P: Where decisions change
- `mark > 40`
* `mark >= 40`
- `mark == 40`
= "Or more" includes 40.

Q: Which three values best test the edge of `age < 18`?
P: Test on and around every edge
- 5, 10 and 15
* 17, 18 and 19
- 18, 180 and 1800
= Just below, exactly on, and just above.

Q: What is an off-by-one error?
P: Test on and around every edge
* Being wrong by exactly one step at an edge, such as using `>` for `>=`
- A program that runs exactly one time more than it should do
- An error that only ever happens on the first line of code
= These errors live at the boundary.

Q: Why write the expected result before running a test?
P: A test table
- Because the computer needs it in order to run the test
* So you don't simply accept whatever the program gives
- It makes the program itself run noticeably faster
= A prediction is what turns a run into a test.

Q: `fee = 0 if order > 10000 else 800`, and the rule is "₦10,000 or more is free". Which order reveals the bug?
P: A test table
A: 10000 | 10,000 | ₦10,000 | ₦10000
= Exactly on the edge, the code charges 800 when it should be free.

Q: Where should a check for impossible input go in a chain?
P: Inputs outside the rule
* First, before the normal rule
- Last, after every other branch has been checked
- Nowhere, because users never type impossible values
= A guard stops impossible values getting a normal-looking answer.

Q: Without a guard, what does `if mark >= 40: "Pass"` say about a mark of 105?
P: Inputs outside the rule
- Invalid mark
* Pass
- Not yet
= 105 is 40 or more, so it's reported as a pass, with no warning.

Q: Which input is a typical test, not an edge test, for "₦10,000 or more"?
P: Test on and around every edge
- 9999
- 10000
* 15000
= Typical values show the idea works, but miss edge bugs.

Q[transfer]: A login locks after 3 failed attempts. It checks `if attempts > 3:` before locking. What can an attacker do?
P: Inputs outside the rule
* Try a 4th password before the account locks
- Nothing, because three attempts are always enough
- Unlock every account on the system at the same time
= The edge is off by one. Testing exactly 3 failed attempts finds it.

Q[transfer]: A shop lets customers set a quantity. Which test is most important for security?
P: Inputs outside the rule
- A quantity of 2
* A negative quantity
- A quantity of 5
= A negative quantity might produce a negative price, or a refund.

Q[transfer]: A statistics script groups ages as "18 to 25". You're writing the test table. Which ages must you include?
P: Test on and around every edge
- Only 20 and 22, as typical values
* 17, 18, 25 and 26
- Only 18 and 25, the two limits
= Each end has an edge. Test on and outside both.

# Cards
What three values test an edge at 40? :: 39, 40 and 41.
What is an off-by-one error? :: Being wrong by one step at an edge, such as `>` instead of `>=`.
What goes in a test table? :: Input, why it's tested, the expected result, and the actual result.
What is a guard? :: A check for impossible input, placed before the normal rule.
Why do attackers test edges? :: Edge bugs are common, and they can break rules like attempt limits.

# Further
- Harvard CS50x, Week 0 notes :: https://cs50.harvard.edu/x/notes/0/
- Python for Everybody, Chapter 3 :: https://www.py4e.com/html3/03-conditional
