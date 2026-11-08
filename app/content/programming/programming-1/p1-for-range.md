---
id: p1-for-range
pack: Programming 1 · Loops
title: For loops and ranges
minutes: 40
source: The Python Tutorial · for statements and range
url: https://docs.python.org/3/tutorial/controlflow.html
courses: Supports any first programming course
format: 2
python: yes
teaches: for-loop; range-function; loop-over-string; loop-over-values; for-or-while
uses: while-loop; loop-update; off-by-one; f-strings; string-values
---
# Goal
Repeat something a set number of times with `for` and `range`, go through every character of a string or every item in a group, and choose between `for` and `while`.

# Why
Most loops in real programs go through a known set of things: every student, every day of the week, every line of a file. A `for` loop does that directly, with no counter to set up or update, so there's less to get wrong. `range` is the standard way to count, and its one surprise, that it stops before its end number, causes some of the most common bugs in Python.

# Warm-up
?? What three parts does a while loop need?
=> A start, a condition, and an update that moves towards the end.

?? What is an off-by-one error?
=> Being wrong by exactly one step at an edge.

# Lesson
## The for loop
A `for` loop takes each item from a group, one at a time, and runs its block once for each.

```python
for course in ["COS 102", "STA 111", "CSC 183"]:
    print("Registered:", course)
```

```output
Registered: COS 102
Registered: STA 111
Registered: CSC 183
```

The values in square brackets are a **list**, a group of values in order. You'll learn lists properly in the Collections unit. For now, it's enough to know that a `for` loop can go through them.

Each time round, the **loop variable**, here `course`, holds the next item. You choose its name. The loop ends by itself when there are no items left. There's no start, condition or update to write, which is why `for` loops are less likely to go wrong than `while` loops.

## range
`range` gives a sequence of integers. It's the usual way to repeat something a set number of times.

| Code | Numbers it gives | Rule |
| --- | --- | --- |
| `range(5)` | 0, 1, 2, 3, 4 | Starts at 0, stops **before** 5 |
| `range(2, 6)` | 2, 3, 4, 5 | Starts at 2, stops before 6 |
| `range(0, 10, 2)` | 0, 2, 4, 6, 8 | Steps of 2 |
| `range(5, 0, -1)` | 5, 4, 3, 2, 1 | Counts down |

```python
for week in range(1, 4):
    print("Week", week)
```

```output
Week 1
Week 2
Week 3
```

`range(5)` gives five numbers, from 0 to 4. That's convenient for counting how many times, but it means that to get 1 to 10, you write `range(1, 11)`.

> Mistake: Writing `range(1, 10)` and expecting 10 to be included. It stops at 9. The end number is always left out. This off-by-one error is one of the most common in Python.

### Repeating a set number of times
When you don't need the number itself, only the repeats, the loop variable can be named `_`, which tells readers "this isn't used":

```python
for _ in range(3):
    print("Practice!")
```

```output
Practice!
Practice!
Practice!
```

## Looping over text
A string is a sequence of characters, so a `for` loop can go through it one character at a time:

```python
vowels = 0
for letter in "Programming":
    if letter in "aeiou":
        vowels = vowels + 1
print(vowels, "vowels")
```

```output
3 vowels
```

This combines a loop with a decision inside it, which is how most real loops work. The loop goes through every item, and the decision picks out the ones that matter.

Trace the start of it. `vowels` starts at 0. The first letter is "P", which isn't in "aeiou", so nothing happens. Then "r", also not a vowel. Then "o", which is, so `vowels` becomes 1. The loop carries on through every letter, and only the three vowels, o, a and i, add to the count. Capital letters wouldn't count with this check, since "A" isn't in "aeiou". To count those too, you could loop through `"Programming".lower()` instead.

## for or while?
Both repeat, but they suit different situations.

| Use for when | Use while when |
| --- | --- |
| You go through a known group of items | You repeat until something happens |
| You repeat a set number of times | You don't know how many times in advance |
| Every student, every day, every character | Until the target is reached, or until a valid answer |

Any `for` loop over a range can be written as a `while` loop, but the `for` version is shorter and safer:

| `for` | Equivalent `while` |
| --- | --- |
| `for i in range(3):` | `i = 0`, then `while i < 3:` with `i = i + 1` at the end of the block |

The `while` version has three parts to get right. The `for` version has none. When a `for` loop fits, use it. Save `while` for the loops where you genuinely can't know the number of repeats before you start.

# Exercises
?? What numbers does `range(3, 7)` give?
=> 3, 4, 5 and 6.

?? How do you loop through the numbers 1 to 100?
=> `for n in range(1, 101):`.

?? Write a loop that prints each letter of "DATA" on its own line.
=> `for letter in "DATA":` then, indented, `print(letter)`.

# Practice
Add up a real week with a `for` loop.

1. In the box, `daily_costs` holds a list of what you spent each day this week. Change them to real or likely amounts.
2. Use a `for` loop to add them up into `total`.
3. In the same loop, count the days where you spent more than ₦2,000, in `big_days`.
4. Use a second `for` loop with `range` to set `squares_total` to the sum of the squares of 1 to 10, that is 1 + 4 + 9 + ... + 100.
5. Predict the results, run, and press **Test my code**.

Write your totals.

# Starter
```python
daily_costs = [1500, 800, 2500, 1200, 3000, 0, 1000]

total = 0
big_days = 0
# Your for loop over daily_costs here

squares_total = 0
# Your for loop with range here

print("Total:", total)
print("Days over 2000:", big_days)
print("Squares total:", squares_total)
```

# Tests
```python
want_total = 0
want_big = 0
for c in daily_costs:
    want_total = want_total + c
    if c > 2000:
        want_big = want_big + 1
assert total == want_total, "total should be the sum of daily_costs"
assert big_days == want_big, "big_days should count the costs above 2000"
assert squares_total == 385, "squares_total should be 385: check that your range includes 10"
```

# Solution
```python
daily_costs = [1500, 800, 2500, 1200, 3000, 0, 1000]

total = 0
big_days = 0
for cost in daily_costs:
    total = total + cost
    if cost > 2000:
        big_days = big_days + 1

squares_total = 0
for n in range(1, 11):
    squares_total = squares_total + n * n

print("Total:", total)
print("Days over 2000:", big_days)
print("Squares total:", squares_total)
```

# Rubric
- I used for loops, with a decision inside one of them.
- My range includes the right end number.
- My code passes the test.

# Summary
- A `for` loop runs its block once for each item, and ends by itself.
- `range(a, b)` gives a, a + 1, up to b − 1. The end is left out.
- A `for` loop can go through a string, character by character.
- Use `for` for known groups and set counts, and `while` for "until something happens".
- When a `for` loop fits, it's shorter and safer than `while`.

# Check
Q: What numbers does `range(4)` give?
P: range
- 1, 2, 3, 4
* 0, 1, 2, 3
- 0, 1, 2, 3, 4
= It starts at 0 and stops before 4.

Q: How many numbers does `range({a}, {b})` give?
P: range
Vars: a=1..10, b=11..30
F: b-a
= From {a} up to {b} − 1, which is {b} − {a} = {b-a} numbers.

Q: Which gives the numbers 1 to 10?
P: range
- `range(1, 10)`
* `range(1, 11)`
- `range(10)`
= The end number is left out, so you need 11.

Q: What does `range(10, 0, -2)` give?
P: range
A: 10, 8, 6, 4, 2 | 10 8 6 4 2 | 10,8,6,4,2 | [10, 8, 6, 4, 2] | [10,8,6,4,2]
= It counts down in steps of 2, stopping before 0.

Q: How many times does `for letter in "data":` run its block?
P: Looping over text
A: 4 | four
= Once for each character.

Q: When does a for loop end?
P: The for loop
* When there are no items left
- When its condition becomes False
- When it reaches a break statement only
= A for loop goes through every item, then stops by itself.

Q: Which situation suits a while loop better than a for loop?
P: for or while?
- Printing every course in a list of courses
* Asking for an answer until a valid one is typed
- Repeating a greeting exactly five times in a row
= You don't know in advance how many tries it will take.

Q: Why is a for loop over a range safer than the equivalent while loop?
P: for or while?
* There's no start, condition or update to get wrong
- It always runs faster than any equivalent while loop
- It can't contain any decisions inside its block
= Fewer parts means fewer places for a bug.

Q[transfer]: A security tool must check ports 1 to 1024 on a machine you're authorised to test. Which loop fits?
P: range
* `for port in range(1, 1025):`
- `for port in range(1, 1024):`
- `while port < 1024:` with no starting value
= The end is left out, so 1025 includes port 1024.

Q[transfer]: A statistics script needs the total of a column of 500 values. What's the clearest approach?
P: The for loop
- A while loop with a counter that runs exactly 500 times
* A for loop that goes through every value, adding it to a total
- Typing all 500 values into one long addition
= A for loop goes through the group directly, with nothing to count.

Q[transfer]: A loop should print weeks 1 to 13 of a term, but the last one printed is week 12. What's the most likely bug?
P: range
- The loop has a break statement hidden inside it
* It uses `range(1, 13)`, which stops before 13
- There are only twelve weeks in a real school term
= An off-by-one error: use `range(1, 14)`.

# Cards
What does a for loop do? :: Runs its block once for each item in a group, then stops by itself.
What does `range(a, b)` give? :: a, a + 1, up to b − 1. The end is left out.
How do you loop through 1 to 10? :: `for n in range(1, 11):`.
When do you use while instead of for? :: When you repeat until something happens, without knowing how many times.
Can a for loop go through a string? :: Yes, one character at a time.

# Further
- The Python Tutorial, for statements and range :: https://docs.python.org/3/tutorial/controlflow.html
- Python for Everybody, Chapter 5 :: https://www.py4e.com/html3/05-iterations
