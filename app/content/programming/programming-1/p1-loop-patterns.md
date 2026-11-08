---
id: p1-loop-patterns
pack: Programming 1 · Loops
title: Loop patterns
minutes: 40
source: Python for Everybody · Chapter 5
url: https://www.py4e.com/html3/05-iterations
courses: Supports any first programming course
format: 2
python: yes
teaches: accumulator-pattern; counter-pattern; max-min-pattern; search-pattern; flag-variable
uses: for-loop; while-loop; break-statement; if-statement; and-or-not
---
# Goal
Recognise and write the five loop patterns that most programs use: totals, counts, the largest or smallest, searching, and checking whether every item passes.

# Why
Most loops you'll ever write follow a handful of patterns. Once you can recognise them, a new problem stops being a blank page: you ask which pattern fits, and you already know its shape. These patterns are the backbone of data processing in statistics, of log analysis in security, and of everyday programs that summarise lists of anything.

# Warm-up
?? What does `range(1, 6)` give?
=> 1, 2, 3, 4 and 5.

?? What does `break` do?
=> Ends the loop straight away.

# Lesson
## The accumulator: building a total
An **accumulator** is a variable that collects a result as the loop goes. It starts at a neutral value, and each iteration adds to it.

```python
marks = [65, 72, 58, 80]
total = 0
for mark in marks:
    total = total + mark
print("Total:", total)
print("Average:", total / len(marks))
```

```output
Total: 275
Average: 68.75
```

The shape is always the same: **start before the loop, update inside it, use it after it**. Here, `len(marks)` gives how many marks there are, just as `len` gave the length of a string.

`total = total + mark` can also be written `total += mark`. The two mean exactly the same.

> Mistake: Setting the accumulator inside the loop. If `total = 0` is indented inside the `for`, it resets on every iteration, and you're left with only the last mark.

## The counter: how many match
A **counter** is an accumulator that adds 1 each time an item matches a condition.

```python
marks = [65, 72, 38, 80, 45]
passed = 0
for mark in marks:
    if mark >= 50:
        passed += 1
print(passed, "of", len(marks), "passed")
```

```output
3 of 5 passed
```

## Largest and smallest
To find the largest value, keep the largest seen so far, and replace it whenever you find a larger one.

```python
marks = [65, 72, 58, 80, 77]
highest = marks[0]
for mark in marks:
    if mark > highest:
        highest = mark
print("Highest:", highest)
```

```output
Highest: 80
```

`marks[0]` means the first item in the list. Start with an actual item, not 0. If you start at 0 and every value is negative, such as temperatures below freezing, the answer would wrongly be 0. Python also has built-in `max` and `min` that do this for you, but knowing the pattern lets you find the largest by any rule you need, such as the longest name.

## Searching: is it there?
To find whether any item matches, loop until you find one, then stop with `break`.

```python
courses = ["COS 102", "STA 111", "CSC 183"]
wanted = "STA 111"
found = False
for course in courses:
    if course == wanted:
        found = True
        break
print("Found" if found else "Not found")
```

```output
Found
```

`found` is a **flag**: a bool that starts False and becomes True when something happens. `break` stops the loop as soon as the answer is known, since there's no point checking the rest.

The last line uses a short form of if and else, written on one line: `"Found" if found else "Not found"` gives one value or the other.

## Checking all: does every item pass?
The opposite question is whether **every** item passes. Start by assuming yes, and look for one that fails.

```python
marks = [65, 72, 58, 80]
all_passed = True
for mark in marks:
    if mark < 50:
        all_passed = False
        break
print(all_passed)
```

```output
True
```

One failure is enough to make the answer False, so the loop can stop there. Only when the loop finishes without finding a failure is the answer True.

Search and check-all are mirror images. Search asks "is there at least one?" and starts by assuming no. Check-all asks "are they all?" and starts by assuming yes. In each case, a single item can settle the answer, which is why both can use `break`. You can often combine several patterns in one loop, as long as each has its own variable, set up before the loop starts.

| Pattern | Starts at | Inside the loop | Question it answers |
| --- | --- | --- | --- |
| Accumulator | 0 | Add each item | What's the total? |
| Counter | 0 | Add 1 when an item matches | How many match? |
| Largest | The first item | Replace when larger | What's the largest? |
| Search | False | Set True and break when found | Is any item a match? |
| Check all | True | Set False and break when one fails | Do all items pass? |

# Exercises
?? Which pattern answers "how many students scored over 70"?
=> The counter: start at 0, add 1 when a score is over 70.

?? Why should the largest-value pattern start with the first item, not 0?
=> If every value is negative, starting at 0 would wrongly give 0.

?? Which pattern answers "did any transaction exceed ₦100,000"?
=> The search: start a flag at False, set it True and break when one does.

# Practice
Summarise a real-looking week of transport spending, using the patterns.

1. In the box, `fares` holds what you paid on each trip this week. Change them to real or likely amounts.
2. Set `total` with the accumulator pattern.
3. Set `expensive` to the number of trips over ₦1,000, with the counter pattern.
4. Set `dearest` to the highest fare, with the largest pattern, without using `max`.
5. Set `any_free` to True if any fare was 0, with the search pattern.
6. Predict, run, and press **Test my code**.

Write your four results.

# Starter
```python
fares = [500, 1200, 700, 0, 1500, 800]

total = 0
expensive = 0
dearest = fares[0]
any_free = False

# Your loops here

print(total, expensive, dearest, any_free)
```

# Tests
```python
assert total == sum(fares), "total should add up every fare"
assert expensive == len([f for f in fares if f > 1000]), "expensive should count fares over 1000"
assert dearest == max(fares), "dearest should be the highest fare"
assert any_free == (0 in fares), "any_free should be True only if some fare is 0"
```

# Solution
```python
fares = [500, 1200, 700, 0, 1500, 800]

total = 0
expensive = 0
dearest = fares[0]
any_free = False

for fare in fares:
    total += fare
    if fare > 1000:
        expensive += 1
    if fare > dearest:
        dearest = fare
    if fare == 0:
        any_free = True

print(total, expensive, dearest, any_free)
```

# Rubric
- I used the right pattern for each question.
- Each accumulator starts before the loop, not inside it.
- My code passes the test.

# Summary
- Accumulator: start at 0, add each item, use it after the loop.
- Counter: add 1 only when an item matches.
- Largest: start with the first item, replace when larger.
- Search: a flag starts False, becomes True, then break.
- Check all: start True, set False and break on the first failure.

# Check
Q: After `t = 0`, then `for x in [{a}, {b}, {c}]:` with `t += x`, what's in `t`?
P: The accumulator: building a total
Vars: a=1..20, b=1..20, c=1..20
F: a+b+c
= The accumulator adds each item: {a} + {b} + {c} = {a+b+c}.

Q: What goes wrong if `total = 0` is inside the loop?
P: The accumulator: building a total
* It resets on every iteration, leaving only the last item
- Nothing changes, because Python moves it outside automatically
- It causes a NameError the first time the loop runs
= The accumulator must start once, before the loop.

Q: Which pattern counts how many items match a condition?
P: The counter: how many match
- The accumulator, adding each item's value
* The counter, adding 1 for each match
- The search, stopping at the first match
= A counter adds 1, not the item's value.

Q: Why start the largest-value pattern with the first item?
P: Largest and smallest
- Because Python only allows lists that start with a large number
* Because starting at 0 fails when every value is negative
- Because the first item is always the largest one in a list
= An actual item works for any values.

Q: In the search pattern, what does the flag start as?
P: Searching: is it there?
* False
- True
- 0
= It starts False, and becomes True when a match is found.

Q: Why use `break` in the search pattern?
P: Searching: is it there?
* Once a match is found, the answer is known, so there's no need to check the rest
- Because a for loop can't end unless it reaches a break statement
- Because break resets the flag back to False for the next search
= Stopping early saves work.

Q: In the check-all pattern, what does the result start as?
P: Checking all: does every item pass?
- False
* True
- 0
= Assume all pass, and look for one that fails.

Q: Which pattern answers "is every mark at least 40"?
P: Checking all: does every item pass?
- The counter
- The search
* The check all
= One failure makes it False.

Q[transfer]: A security analyst needs to know whether any login came from a blocked address. Which pattern fits?
P: Searching: is it there?
* Search: a flag set True on the first blocked address, then break
- Accumulator: add up every login address in the log
- Largest: find the biggest address in the log
= "Is there any" is the search pattern.

Q[transfer]: A statistics script finds the lowest temperature in a list, starting `lowest = 0`. The temperatures are all above 20. What does it report?
P: Largest and smallest
- The correct lowest temperature
* 0, which is wrong, because no reading was that low
- An error, because 0 isn't allowed as a temperature
= Start with the first item instead.

Q[transfer]: A bank wants the number of transactions over ₦50,000 in a month. Which pattern?
P: The counter: how many match
* The counter
- The accumulator
- The check all
= "How many" means a counter, adding 1 for each match.

# Cards
What is an accumulator? :: A variable that starts before a loop and collects a result inside it.
How does a counter differ from a total? :: It adds 1 for each match, not the item's value.
How do you find the largest value? :: Start with the first item, and replace it whenever you find a larger one.
What is a flag? :: A bool that starts False and becomes True when something happens.
How do you check that every item passes? :: Start True, and set False and break at the first failure.

# Further
- Python for Everybody, Chapter 5 :: https://www.py4e.com/html3/05-iterations
- The Python Tutorial, control flow :: https://docs.python.org/3/tutorial/controlflow.html
