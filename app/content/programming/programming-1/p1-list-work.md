---
id: p1-list-work
pack: Programming 1 · Collections
title: Working through lists
minutes: 40
source: Python for Everybody · Chapter 8
url: https://www.py4e.com/html3/08-lists
courses: Supports any first programming course
format: 2
python: yes
teaches: list-builtins; slicing; enumerate-loop; sorting; in-operator-lists; filter-into-list
uses: list-literal; indexing; list-mutation; for-loop; accumulator-pattern; counter-pattern; max-min-pattern
---
# Goal
Use Python's built-in tools on lists, take a slice of a list, loop with positions, sort, check whether a value is present, and build new lists from old ones.

# Why
Once your data is in a list, most questions about it are the same few: how many, how much in total, which is biggest, is this one there, what are they in order. Python has quick, reliable tools for each. Knowing them lets you answer real questions in one line, while knowing the loop patterns from the Loops unit means you understand what those tools are doing underneath.

# Warm-up
?? What does `[5, 8, 2][0]` give?
=> 5.

?? How do you find the largest value with a loop?
=> Start with the first item, and replace it whenever you find a larger one.

# Lesson
## Built-in tools for lists
Python has functions that do the common loop patterns for you:

| Function | Gives | Example with `[65, 72, 58, 80]` |
| --- | --- | --- |
| `len(x)` | How many items | `4` |
| `sum(x)` | The total | `275` |
| `max(x)` | The largest | `80` |
| `min(x)` | The smallest | `58` |
| `sorted(x)` | A new list, in order | `[58, 65, 72, 80]` |

```python
marks = [65, 72, 58, 80]
print(sum(marks) / len(marks))
print(max(marks) - min(marks))
```

```output
68.75
22
```

The first line is the average: the total divided by the count. The second is the **range**, the gap between the largest and smallest, a simple measure of spread you'll use in statistics. Each is one line, where a loop would take four or five. Use these functions when they fit. Write the loop yourself when you need something they don't do, such as counting only the marks above a limit, or finding the longest name.

Be careful with an empty list. `sum([])` is 0, which is fine, but `max([])` causes an error, and `sum([]) / len([])` divides by zero. If a list might be empty, check `if marks:` first.

## Slicing
A **slice** takes part of a list. Write the start and stop indexes with a colon between them. As with `range`, the stop is left out.

```python
weeks = ["w1", "w2", "w3", "w4", "w5", "w6"]
print(weeks[0:3])
print(weeks[2:])
print(weeks[-2:])
```

```output
['w1', 'w2', 'w3']
['w3', 'w4', 'w5', 'w6']
['w5', 'w6']
```

Leaving out the start means "from the beginning", and leaving out the stop means "to the end". So `weeks[-2:]` is the last two items. A slice gives a new list, and leaves the original unchanged. Slices work on strings too: `"Programming"[0:3]` is `"Pro"`.

## Loops with positions
A plain for loop gives you each item, but not its position. When you need both, use `enumerate`, which gives the index and the item together:

```python
courses = ["COS 102", "STA 111", "MTH 101"]
for number, course in enumerate(courses, start=1):
    print(f"{number}. {course}")
```

```output
1. COS 102
2. STA 111
3. MTH 101
```

`start=1` makes the numbering begin at 1, which suits a list shown to people. Without it, `enumerate` starts at 0, matching the list's indexes. Each time round, the loop puts the position in `number` and the item in `course`.

## Sorting
There are two ways to sort, and the difference matters.

| | `sorted(x)` | `x.sort()` |
| --- | --- | --- |
| What it does | Gives a new sorted list | Sorts the list itself |
| The original | Unchanged | Changed |
| Gives back | The new list | None |

```python
marks = [65, 72, 58, 80]
top = sorted(marks, reverse=True)
print(top)
print(marks)
```

```output
[80, 72, 65, 58]
[65, 72, 58, 80]
```

`reverse=True` sorts from largest to smallest. `sorted` left `marks` in its original order. Use `sorted` when you still need the original order, and `.sort()` when you don't. Strings sort alphabetically, but capitals come before lower case, so tidy the case first if that matters.

## Is it there?
`in` checks whether a value is in a list, giving True or False. It's the search pattern in one word:

```python
registered = ["COS 102", "STA 111"]
print("STA 111" in registered)
print("PHY 101" not in registered)
```

```output
True
True
```

`.count(x)` gives how many times x appears, and `.index(x)` gives the position of its first appearance, which causes an error if it isn't there. So check with `in` before using `.index`.

## Building a new list from an old one
Often you want a new list made from some or all of an old one: the marks that passed, or every price with tax added. The pattern is an empty list and `append` inside a loop:

```python
prices = [1000, 2500, 400]
with_tax = []
for price in prices:
    with_tax.append(price * 1.075)
print(with_tax)
```

```output
[1075.0, 2687.5, 430.0]
```

The 7.5% here is only an example rate. Python also has a short way to write exactly this pattern, called a **list comprehension**: `[price * 1.075 for price in prices]`. It means "make a list of `price * 1.075` for each price in prices". You can add a condition: `[m for m in marks if m >= 50]` keeps only the passing marks. Comprehensions are neat, but the loop version is easier to read when you're starting out, and it does exactly the same thing.

> Mistake: Changing a list while looping over it, such as removing items inside a `for` loop over the same list. Items get skipped, because the positions shift under the loop. Build a new list instead.

# Exercises
?? What do `sum`, `max` and `min` give for `[4, 9, 2]`?
=> 15, 9 and 2.

?? What's `[10, 20, 30, 40][1:3]`?
=> `[20, 30]`. The stop index, 3, is left out.

?? After `x = [3, 1, 2]`, then `y = sorted(x)`, what's in `x`?
=> Still `[3, 1, 2]`. `sorted` gives a new list.

# Practice
Analyse a real-looking set of marks with the tools from this lesson.

1. In the box, `marks` holds a set of marks. Change them to real or likely ones, at least six.
2. Set `average`, rounded to 1 decimal place, and `spread`, the largest minus the smallest.
3. Set `top_three` to the three highest marks, largest first, without changing `marks`.
4. Set `passed` to a new list of the marks that are 50 or more, in their original order.
5. Predict, run, and press **Test my code**.

Write your four results.

# Starter
```python
marks = [65, 72, 38, 80, 55, 49, 91]

average = 0
spread = 0
top_three = []
passed = []

print(average, spread)
print(top_three)
print(passed)
```

# Tests
```python
original = [65, 72, 38, 80, 55, 49, 91]
assert average == round(sum(marks) / len(marks), 1), "average should be the total divided by the count, rounded to 1 place"
assert spread == max(marks) - min(marks), "spread should be the largest minus the smallest"
assert top_three == sorted(marks, reverse=True)[:3], "top_three should be the three highest, largest first"
assert passed == [m for m in marks if m >= 50], "passed should keep the marks of 50 or more, in order"
assert len(marks) >= 6, "use at least six marks"
```

# Solution
```python
marks = [65, 72, 38, 80, 55, 49, 91]

average = round(sum(marks) / len(marks), 1)
spread = max(marks) - min(marks)
top_three = sorted(marks, reverse=True)[:3]
passed = []
for mark in marks:
    if mark >= 50:
        passed.append(mark)

print(average, spread)
print(top_three)
print(passed)
```

# Rubric
- I used sum, len, max, min and sorted where they fit.
- I took the top three with a slice, without changing the original list.
- My code passes the test.

# Summary
- `len`, `sum`, `max`, `min` and `sorted` do the common list jobs in one line.
- A slice `x[a:b]` takes items a up to b − 1, as a new list.
- `enumerate` gives each item's position along with the item.
- `sorted(x)` gives a new list. `x.sort()` changes x and gives None.
- `in` checks whether a value is present. Build new lists with append, or a comprehension.

# Check
Q: What does `sum([{a}, {b}, {c}])` give?
P: Built-in tools for lists
Vars: a=1..40, b=1..40, c=1..40
F: a+b+c
= {a} + {b} + {c} = {a+b+c}.

Q: What does `max([4, 11, 7])` give?
P: Built-in tools for lists
A: 11
= max gives the largest item.

Q: What does `[1, 2, 3, 4, 5][1:4]` give?
P: Slicing
A: [2, 3, 4] | 2, 3, 4
= Indexes 1, 2 and 3. The stop, 4, is left out.

Q: Which gives the last two items of a list `x`?
P: Slicing
- `x[2:]`
* `x[-2:]`
- `x[:2]`
= From the second-to-last item to the end.

Q: After `x = [3, 1, 2]`, then `x.sort()`, what's in `x`?
P: Sorting
A: [1, 2, 3] | 1, 2, 3
= `.sort()` changes the list itself.

Q: What does `sorted(x)` do to `x`?
P: Sorting
* Nothing, as it gives a new sorted list
- It sorts x in place and returns None
- It removes any repeated values from x
= sorted leaves the original unchanged.

Q: What does `"PHY 101" in ["COS 102", "STA 111"]` give?
P: Is it there?
* False
- True
- An error
= The value isn't in the list.

Q: Why is removing items from a list while looping over it risky?
P: Building a new list from an old one
- Python doesn't allow remove to be used inside a loop
* Positions shift under the loop, so items get skipped
- Because the list becomes a string after the first removal
= Build a new list instead.

Q[transfer]: A statistics student needs the range of a dataset. Which line gives it?
P: Built-in tools for lists
* `max(data) - min(data)`
- `len(data) - 1`
- `sum(data) / len(data)`
= The range is the largest minus the smallest. The last one is the mean.

Q[transfer]: A security analyst has a list of blocked IP addresses and must check a new connection. Which is the clearest?
P: Is it there?
* `if address in blocked:`
- A while loop that compares each address by its index
- `if blocked.index(address):`
= `in` is the search pattern in one word. `.index` errors when it isn't there.

Q[transfer]: A results page must show students ranked by score, but the original register order is needed for another page. What should it use?
P: Sorting
* `sorted(scores, reverse=True)`, which leaves the original list alone
- `scores.sort(reverse=True)`, which changes the original list
- `scores[::-1]`, which reverses the register order
= sorted gives a new ranked list, keeping the register order. Reversing isn't ranking.

# Cards
Which built-ins summarise a list? :: len, sum, max, min and sorted.
What does `x[a:b]` give? :: Items from index a up to b − 1, as a new list.
What does enumerate give? :: Each item's position along with the item.
What's the difference between sorted(x) and x.sort()? :: sorted gives a new list. sort changes x and returns None.
How do you check whether a value is in a list? :: `value in my_list`.

# Further
- Python for Everybody, Chapter 8 :: https://www.py4e.com/html3/08-lists
- The Python Tutorial, data structures :: https://docs.python.org/3/tutorial/datastructures.html
