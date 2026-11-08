---
id: p1-lists
pack: Programming 1 · Collections
title: Lists
minutes: 40
source: Python for Everybody · Chapter 8
url: https://www.py4e.com/html3/08-lists
courses: Supports any first programming course
format: 2
python: yes
teaches: list-literal; indexing; negative-index; list-mutation; append-insert-remove; index-error
uses: variables; for-loop; len-function; string-methods; read-traceback
---
# Goal
Store many values in one list, reach any item by its position, change items, add and remove them, and avoid the error that comes from reaching past the end.

# Why
Until now, each variable held one value. Real data comes in groups: all the marks in a course, all the fares in a week, every line of a log. A **list** holds a whole group under one name, in order, and lets a loop go through it. Lists are the most used collection in Python, and almost every program you write from now on will use them.

# Warm-up
?? What does `len("Ada")` give?
=> 3.

?? What does a for loop over `[10, 20, 30]` do?
=> Runs its block three times, once for each item.

# Lesson
## Making a list
A list is written as values inside square brackets, separated by commas. It can hold any kind of value, and the order is kept exactly as written.

```python
marks = [65, 72, 58, 80]
courses = ["COS 102", "STA 111", "MTH 101"]
empty = []
print(marks)
print(len(courses))
```

```output
[65, 72, 58, 80]
3
```

`len` works on lists just as it does on strings: it gives the number of items. An empty list, `[]`, has length 0. You can mix types in one list, but in practice a list usually holds one kind of thing, such as all marks, or all names, which keeps it easy to work with.

## Positions start at zero
Each item in a list has a position, called its **index**. Python counts positions from **0**, not 1. So the first item is at index 0, the second at index 1, and the last at index `len - 1`.

| Item | 65 | 72 | 58 | 80 |
| --- | --- | --- | --- | --- |
| Index | 0 | 1 | 2 | 3 |
| Negative index | -4 | -3 | -2 | -1 |

You get an item by writing the list's name, then its index in square brackets:

```python
marks = [65, 72, 58, 80]
print(marks[0])
print(marks[2])
print(marks[-1])
```

```output
65
58
80
```

Negative indexes count from the end: `-1` is the last item, `-2` the one before it. That's handy when you want the last item and don't want to work out the length first.

Counting from 0 feels strange at first. One way to think of it: the index is how many steps you take from the start. The first item is zero steps from the start, so its index is 0. This is the same reason `range(4)` gives 0, 1, 2, 3: those are exactly the four indexes of a four-item list.

## Reaching past the end
Asking for an index that doesn't exist causes an **IndexError**:

```python
marks = [65, 72, 58, 80]
print(marks[4])
```

```output
Traceback (most recent call last):
  File "<string>", line 2, in <module>
IndexError: list index out of range
```

The list has four items, at indexes 0 to 3. Index 4 would be a fifth item, which doesn't exist. This is the off-by-one error again, now with lists. When you see an IndexError, check whether you've counted from 1 instead of 0, or used `len(list)` as an index instead of `len(list) - 1`.

> Mistake: Writing `marks[len(marks)]` to get the last item. The last index is `len(marks) - 1`, or simply `marks[-1]`.

## Changing a list
Unlike strings, lists can be changed after they're made. You can replace an item by assigning to its index:

```python
marks = [65, 72, 58, 80]
marks[2] = 61
print(marks)
```

```output
[65, 72, 61, 80]
```

Lists also have methods for adding and removing items:

| Method | What it does | Example |
| --- | --- | --- |
| `.append(x)` | Adds x to the end | `marks.append(90)` |
| `.insert(i, x)` | Puts x at index i, moving the rest along | `marks.insert(0, 50)` |
| `.remove(x)` | Removes the first item equal to x | `marks.remove(58)` |
| `.pop()` | Removes the last item, and gives it back | `last = marks.pop()` |

```python
fares = []
fares.append(500)
fares.append(1200)
fares.append(700)
fares.remove(1200)
print(fares)
```

```output
[500, 700]
```

Starting with an empty list and appending as you go is one of the most common patterns in programming. It's how you collect results inside a loop, such as every mark above a pass mark.

Notice a difference from strings here. String methods like `.upper()` give you a **new** string and leave the original alone. List methods like `.append()` **change the list itself**, and give back nothing. So you write `fares.append(500)` on its own line, not `fares = fares.append(500)`. That second version would store `None` in `fares`, losing the whole list.

## Lists and loops
A for loop goes through a list's items in order, which is how you use every item:

```python
marks = [65, 72, 38, 80]
passed = []
for mark in marks:
    if mark >= 50:
        passed.append(mark)
print(passed)
```

```output
[65, 72, 80]
```

This builds a new list containing only the marks that passed. The pass mark of 50 here is only an example. You'll see more ways of working through lists in the next lesson.

# Exercises
?? In `names = ["Ada", "Tunde", "Ngozi"]`, what are `names[1]` and `names[-1]`?
=> `"Tunde"` and `"Ngozi"`.

?? Why does `names[3]` cause an error?
=> The list has three items, at indexes 0 to 2. Index 3 doesn't exist.

?? After `x = [1, 2]`, then `x.append(3)`, then `x[0] = 9`, what's in `x`?
=> `[9, 2, 3]`.

# Practice
Build and change a real list.

1. In the box, `courses` starts empty. Append three of your real courses, one at a time.
2. Insert a fourth course at the very start of the list.
3. Replace the last course with a different one, using a negative index.
4. Set `first` to the first course, and `count` to how many there are.
5. Predict the final list, run, and press **Test my code**.

Write your predicted list, and what it really was.

# Starter
```python
courses = []

# Append three courses, insert one at the start, then replace the last one

first = ""
count = 0

print(courses)
print(first, count)
```

# Tests
```python
assert isinstance(courses, list), "courses should still be a list"
assert len(courses) == 4, "courses should have four items: three appended and one inserted"
assert first == courses[0], "first should be the item at index 0"
assert count == len(courses), "count should be the length of courses"
```

# Solution
```python
courses = []

courses.append("STA 111")
courses.append("MTH 101")
courses.append("CSC 183")
courses.insert(0, "COS 102")
courses[-1] = "GST 111"

first = courses[0]
count = len(courses)

print(courses)
print(first, count)
```

# Rubric
- I built the list with append and insert, and changed an item by its index.
- I used index 0 for the first item and a negative index for the last.
- My code passes the test.

# Summary
- A list holds many values in order, inside square brackets.
- Indexes start at 0. The last item is at `len - 1`, or `-1`.
- An index past the end causes an IndexError.
- Lists can be changed: assign to an index, or use append, insert, remove and pop.
- List methods change the list itself, so don't assign their result back.

# Check
Q: What does `[{a}, {b}, {c}][1]` give?
P: Positions start at zero
Vars: a=1..50, b=1..50, c=1..50
F: b
= Index 1 is the second item, {b}.

Q: What's the index of the first item in a list?
P: Positions start at zero
* 0
- 1
- -1
= Python counts positions from 0.

Q: In `x = [5, 8, 2, 9]`, what is `x[-1]`?
P: Positions start at zero
A: 9
= -1 is the last item.

Q: What does `len([4, 7, 1])` give?
P: Making a list
A: 3 | three
= There are three items.

Q: A list has 5 items. Which index causes an IndexError?
P: Reaching past the end
- 0
- 4
* 5
= The indexes are 0 to 4.

Q: After `x = [1, 2, 3]`, then `x[1] = 7`, what's in `x`?
P: Changing a list
A: [1, 7, 3] | 1, 7, 3
= Index 1 is replaced by 7.

Q: What does `fares = fares.append(500)` leave in `fares`?
P: Changing a list
- The list with 500 added at the end
* None, so the list is lost
- The number 500 on its own
= append changes the list and returns None.

Q: Which method adds an item to the end of a list?
P: Changing a list
* append
- insert
- pop
= append adds to the end.

Q[transfer]: A script collects every failed login from a log into a list. Which pattern fits?
P: Lists and loops
* Start with an empty list, and append each failure inside the loop
- Make a new list on every line of the log, and keep the last one
- Store each failure in its own separately named variable
= Appending inside a loop collects results.

Q[transfer]: A report shows the top student using `students[1]`, but it should show the first one. What's wrong?
P: Positions start at zero
* The first item is at index 0, not 1
- Lists can't hold the names of students
- The report should use `students[-2]` instead
= Counting from 1 instead of 0 is a classic mistake.

Q[transfer]: A statistics script reads 12 monthly values into a list and then looks up `values[12]`. What happens?
P: Reaching past the end
* An IndexError, because the indexes are 0 to 11
- It gives the twelfth month's value
- It gives 0, because that month is empty
= Twelve items have indexes 0 to 11.

# Cards
What is a list? :: Many values in order, inside square brackets, under one name.
What index is the first item? :: 0.
How do you get the last item? :: `my_list[-1]`, or `my_list[len(my_list) - 1]`.
What causes an IndexError? :: Asking for a position that doesn't exist.
What does append return? :: None. It changes the list itself.

# Further
- Python for Everybody, Chapter 8 :: https://www.py4e.com/html3/08-lists
- The Python Tutorial, lists :: https://docs.python.org/3/tutorial/introduction.html
