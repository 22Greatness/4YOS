---
id: p1-tuples
pack: Programming 1 · Collections
title: Tuples
minutes: 35
source: Python for Everybody · Chapter 10
url: https://www.py4e.com/html3/10-tuples
courses: Supports any first programming course
format: 2
python: yes
teaches: tuple-literal; tuple-immutable; tuple-unpacking; return-several-values; tuples-as-keys
uses: list-literal; indexing; strings-immutable; return-statement; dict-literal; loop-over-dict
---
# Goal
Group a few related values into a tuple, unpack them into separate names, return several values from one function, and know when a tuple suits better than a list.

# Why
Some values belong together and shouldn't change: a date's day, month and year, a point's x and y, a course code and its units. A **tuple** keeps such a group together and protects it from being changed by accident. You've already used tuples without noticing: `for course, mark in marks.items()` hands you a tuple each time round. Tuples also let a function give back more than one result, which you'll use often.

# Warm-up
?? Can you change one character of a string in place?
=> No. Strings are immutable, so you build a new string.

?? What does `.items()` give when you loop over a dictionary?
=> Each key and value as a pair.

# Lesson
## Making a tuple
A tuple is written as values separated by commas, usually inside round brackets:

```python
point = (3, 4)
date = (6, 11, 2026)
course = ("STA 111", 3)
print(date[0], date[2])
print(len(course))
```

```output
6 2026
2
```

Indexing, slicing, `len` and `in` work on tuples exactly as on lists. The difference is in what you can't do.

A tuple with one item needs a trailing comma: `(5,)`. Without the comma, `(5)` is just the number 5 in brackets, the same brackets you use in arithmetic.

## Tuples can't be changed
Like strings, tuples are **immutable**. Once made, their items can't be replaced, added or removed:

```python
date = (6, 11, 2026)
date[1] = 12
```

```output
Traceback (most recent call last):
  File "<string>", line 2, in <module>
TypeError: 'tuple' object does not support item assignment
```

That's a feature, not a limitation. When a group of values describes one fixed thing, such as a date or a coordinate, immutability means no part of your program can quietly change one piece and leave the group inconsistent. To "change" a tuple, you build a new one: `date = (date[0], 12, date[2])`.

| | List | Tuple |
| --- | --- | --- |
| Brackets | `[1, 2, 3]` | `(1, 2, 3)` |
| Change items | Yes | No |
| Usually holds | Many items of one kind | A few items that belong together |
| Example | Every mark in a course | One (course, units) pair |

## Unpacking
**Unpacking** puts each item of a tuple into its own name, in one line:

```python
course = ("STA 111", 3)
code, units = course
print(code, "has", units, "units")
```

```output
STA 111 has 3 units
```

The number of names on the left must match the number of items, or Python raises a ValueError. Unpacking is what's happening in `for course, mark in marks.items()`: each pair from `.items()` is unpacked into two names.

Unpacking gives a neat way to swap two variables, with no temporary variable needed:

```python
a = 5
b = 9
a, b = b, a
print(a, b)
```

```output
9 5
```

Python first builds the tuple `(b, a)` from the right side, which is `(9, 5)`, then unpacks it into `a` and `b`.

## Returning several values
A function can return only one value, but that value can be a tuple. So a function can hand back several results at once, and the caller unpacks them:

```python
def low_high(values):
    return min(values), max(values)

lowest, highest = low_high([65, 72, 58, 80])
print(lowest, highest)
```

```output
58 80
```

`return min(values), max(values)` builds a tuple of two values. The caller unpacks it into two names. This is far cleaner than writing two separate functions that each go through the same list, or storing results in global variables.

You've seen this already with the built-in `divmod`, which returns a whole quotient and a remainder together: `hours, minutes = divmod(135, 60)` gives 2 and 15 in one step, the same as `135 // 60` and `135 % 60`. Whenever a calculation naturally produces two or three linked answers, returning them as a tuple keeps them together, and the caller decides what to call each one.

> Mistake: Unpacking into the wrong number of names. `a, b = (1, 2, 3)` causes a ValueError: too many values to unpack. Count the items, and use the same number of names.

## Tuples as dictionary keys
Because tuples can't change, they can be used as dictionary keys, which lists can't. That lets you look things up by a combination of values:

```python
timetable = {("Mon", 8): "COS 102", ("Mon", 10): "STA 111", ("Tue", 8): "MTH 101"}
print(timetable[("Mon", 10)])
```

```output
STA 111
```

The key `("Mon", 10)` means "Monday at 10". A list such as `["Mon", 10]` can't be a key, because a list could be changed after it was stored, which would break the lookup. Python insists that dictionary keys never change.

# Exercises
?? What does `(10, 20, 30)[1]` give?
=> 20.

?? After `x, y = (7, 2)`, what's in `y`?
=> 2.

?? Why can't `[2026, 11]` be a dictionary key, while `(2026, 11)` can?
=> Lists can change, and dictionary keys must never change. Tuples can't change.

# Practice
Write a function that returns several results about a real list of marks.

1. In the box, write `summary(marks)` that returns a tuple of three values: the lowest mark, the highest mark, and the average rounded to 1 decimal place.
2. Below it, call `summary` on your own marks, and unpack the result into `low`, `high` and `avg`.
3. Use a tuple to store one of your courses as `(code, units)`, and unpack it into `code` and `units`.
4. Predict, run, and press **Test my code**. The test calls `summary` with its own lists.

Write the three values you got, and why a tuple suits `(code, units)`.

# Starter
```python
def summary(marks):
    # Return lowest, highest and average (rounded to 1 place) as a tuple
    return 0, 0, 0

my_marks = [65, 72, 58, 80]
low, high, avg = summary(my_marks)

course = ("STA 111", 3)
code = ""
units = 0

print(low, high, avg)
print(code, units)
```

# Tests
```python
assert summary([65, 72, 58, 80]) == (58, 80, 68.8), "summary([65, 72, 58, 80]) should be (58, 80, 68.8)"
assert summary([50]) == (50, 50, 50.0), "summary([50]) should be (50, 50, 50.0)"
assert (low, high, avg) == summary(my_marks), "low, high and avg should come from unpacking summary(my_marks)"
assert (code, units) == course, "code and units should come from unpacking course"
```

# Solution
```python
def summary(marks):
    return min(marks), max(marks), round(sum(marks) / len(marks), 1)

my_marks = [65, 72, 58, 80]
low, high, avg = summary(my_marks)

course = ("STA 111", 3)
code, units = course

print(low, high, avg)
print(code, units)
```

# Rubric
- My function returns three values as one tuple.
- I unpacked results into separate names instead of indexing.
- My code passes the test.

# Summary
- A tuple groups a few related values: `(3, 4)`. One item needs a comma: `(5,)`.
- Tuples are immutable, so a fixed group can't be changed by accident.
- Unpacking puts each item into its own name: `code, units = course`.
- A function can return several values as a tuple, which the caller unpacks.
- Tuples can be dictionary keys. Lists can't.

# Check
Q: What does `(4, 8, 15)[2]` give?
P: Making a tuple
A: 15
= Index 2 is the third item.

Q: What is `(5)` in Python?
P: Making a tuple
- A tuple holding the number 5
* The number 5, in arithmetic brackets
- An error, because every tuple must always hold at least two items
= A one-item tuple needs a comma: `(5,)`.

Q: What happens with `t = (1, 2)`, then `t[0] = 9`?
P: Tuples can't be changed
* A TypeError, because tuples can't be changed
- t becomes (9, 2)
- t becomes (1, 2, 9), with the 9 added at the end of the tuple
= Tuples are immutable.

Q: After `a, b = (3, 8)`, what's in `a`?
P: Unpacking
A: 3 | three
= The first item goes into the first name.

Q: After `a = 1`, `b = 2`, then `a, b = b, a`, what's in `a`?
P: Unpacking
A: 2 | two
= The values are swapped.

Q: What does `a, b = (1, 2, 3)` cause?
P: Returning several values
- a is 1, and b is (2, 3)
* A ValueError: too many values to unpack
- a is 1, b is 2, and the 3 is ignored
= The number of names must match the number of items.

Q: How can a function give back two results?
P: Returning several values
* Return them as a tuple, which the caller unpacks
- Use two return lines, one after the other
- Store both of the results in global variables that the caller can read afterwards
= A second return line would never run.

Q: Which can be a dictionary key?
P: Tuples as dictionary keys
- `[2026, 11]`
* `(2026, 11)`
- `{2026, 11}`
= Keys must never change. Tuples can't change; lists and sets can.

Q[transfer]: A mapping app stores each place's latitude and longitude, which never change for that place. What should hold each pair?
P: Tuples can't be changed
* A tuple, because the pair belongs together and shouldn't change
- A list, so that the two numbers can be updated later
- Two separate dictionaries, one for each number
= A fixed pair of related values is what tuples are for.

Q[transfer]: A security tool counts connections for each (address, port) pair. What fits best?
P: Tuples as dictionary keys
* A dictionary with `(address, port)` tuples as keys
- A list of every address, with the ports in another list
- A set of ports, ignoring the addresses
= A tuple key combines both values in one lookup.

Q[transfer]: A statistics function must give the mean and the standard deviation of a dataset. How should it return them?
P: Returning several values
* `return mean, sd`, unpacked by the caller
- Print both values, and let the caller read them
- Return only the mean, and calculate the other elsewhere
= Returning a tuple gives the caller both values.

# Cards
What is a tuple? :: A group of related values in round brackets, which can't be changed.
How do you write a one-item tuple? :: With a trailing comma: `(5,)`.
What is unpacking? :: Putting each item of a tuple into its own name: `a, b = pair`.
How does a function return several values? :: As a tuple, which the caller unpacks.
Why can a tuple be a dictionary key but not a list? :: Keys must never change, and tuples can't change.

# Further
- Python for Everybody, Chapter 10 :: https://www.py4e.com/html3/10-tuples
- The Python Tutorial, tuples and sequences :: https://docs.python.org/3/tutorial/datastructures.html
