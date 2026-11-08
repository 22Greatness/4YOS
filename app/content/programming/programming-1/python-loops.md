---
id: python-loops
pack: Programming 1 · Loops
title: Repeat work with loops
minutes: 40
source: Python for Everybody · Chapter 5
url: https://www.py4e.com/html3/05-iterations
courses: Supports any first programming course
format: 2
python: yes
teaches: while-loop; loop-condition; loop-update; infinite-loop; break-statement
uses: if-statement; comparison-operators; variables; trace-table; indentation-blocks
---
# Goal
Repeat steps with a `while` loop, make sure every loop moves towards its end, trace a loop by hand, and stop a loop early with `break`.

# Why
Repetition is the third structure, and it's what makes computers worth using. A person gets bored adding a hundred numbers. A computer adds a million without complaint, as long as you tell it exactly when to keep going and when to stop. Loops are behind nearly every useful program: processing every student in a register, every line of a log file, every row of a dataset.

# Warm-up
?? What does `x = x + 1` do?
=> Takes the current x, adds 1, and stores the result back in x.

?? Why does a loop need to change something?
=> If the condition starts True and nothing changes it, the loop never ends.

# Lesson
## The while loop
A `while` loop repeats its block for as long as its condition stays True. Python checks the condition, runs the block if it's True, then goes back and checks again.

```python
count = 1
while count <= 3:
    print("Round", count)
    count = count + 1
print("Finished")
```

```output
Round 1
Round 2
Round 3
Finished
```

Like `if`, the `while` line ends with a colon, and the block is indented. Each run through the block is called an **iteration**. When the condition becomes False, Python skips the block and carries on with the next unindented line.

## Every loop needs three parts
A loop that works has three parts, and forgetting any one causes a bug.

| Part | In the example | What goes wrong without it |
| --- | --- | --- |
| **Start**: set up the variable | `count = 1` | NameError, or the loop starts in the wrong place |
| **Condition**: when to keep going | `count <= 3` | It runs the wrong number of times |
| **Update**: move towards the end | `count = count + 1` | It never ends |

### Tracing a loop
Trace a loop exactly as you trace any code: one row each time the condition is checked.

| Check | count | `count <= 3`? | Prints |
| --- | --- | --- | --- |
| 1 | 1 | True | Round 1 |
| 2 | 2 | True | Round 2 |
| 3 | 3 | True | Round 3 |
| 4 | 4 | False | (loop ends) |

The condition is checked **four** times for **three** iterations. The last check is the one that's False and ends the loop.

## Infinite loops
If the condition never becomes False, the loop runs forever. That's an **infinite loop**.

```text
count = 1
while count <= 3:
    print("Round", count)
```

This forgets the update, so `count` stays 1, and `1 <= 3` is always True. The program prints "Round 1" forever. In a lesson box, it would eventually be stopped. In a real program, you'd need to force it to stop, usually with Ctrl and C.

> Mistake: Updating the wrong variable, or in the wrong direction. Starting with a positive balance, `while balance > 0:` with `balance = balance + 100` inside never ends, because the balance only grows. Ask: does every iteration move closer to making the condition False?

## Loops that run until something happens
A `while` loop is the natural choice when you don't know in advance how many times to repeat: you keep going until something happens.

### Worked example: saving towards a target
You have ₦2,000 and save ₦1,500 a week. How many weeks until you have ₦10,000? The amounts are invented.

```python
savings = 2000
weeks = 0
while savings < 10000:
    savings = savings + 1500
    weeks = weeks + 1
print(f"{weeks} weeks, with ₦{savings:,}")
```

```output
6 weeks, with ₦11,000
```

You didn't need to work out the number of weeks beforehand. The loop found it by repeating until the target was reached. This is something a single calculation can't easily do when the rule each week is more complicated, such as interest or a fee that changes.

## Stopping early with break
`break` ends a loop straight away, even if its condition is still True. It's useful when you find what you were looking for partway through.

```python
n = 50
while n < 100:
    if n % 7 == 0:
        print("First multiple of 7 from 50 is", n)
        break
    n = n + 1
```

```output
First multiple of 7 from 50 is 56
```

The loop would normally run until `n` reached 100, but as soon as it finds 56, `break` stops it.

### while True
Sometimes the clearest loop is one that runs "forever" and stops with `break` when something happens. This pattern, `while True:` with a `break` inside, is common for menus and for asking until a valid answer is given. Make sure the `break` can really be reached, or it's an infinite loop.

# Exercises
?? How many times does this print? `n = 10`, then `while n > 0:` with `print(n)` and `n = n - 3` inside.
=> Four times: 10, 7, 4 and 1. Then n becomes -2, and the condition is False.

?? What's wrong with `i = 0`, then `while i < 5:` with only `print(i)` inside?
=> No update. `i` stays 0 forever, so it's an infinite loop.

?? How do you make a loop stop as soon as it finds something?
=> Use `break` inside an `if`, when the thing is found.

# Practice
Work out how long a real goal takes, with a loop.

1. In the box, set `start_balance` to what you have now, `weekly` to what you could save each week, and `target` to a real goal. Use whole-naira amounts, with `weekly` more than 0.
2. Write a `while` loop that adds `weekly` to `balance` and counts the weeks, until `balance` reaches `target`.
3. Trace up to the first three iterations on paper before running.
4. Run it, and press **Test my code**.

Write your trace, your number of weeks, and what happens if `weekly` is 0. Don't run that case: explain it instead.

# Starter
```python
start_balance = 3000
weekly = 2000
target = 15000

balance = start_balance
weeks = 0
# Write your while loop here

print(weeks, "weeks")
print("Balance:", balance)
```

# Tests
```python
expected_weeks = max(0, (target - start_balance + weekly - 1) // weekly)
assert weeks == expected_weeks, f"weeks should be {expected_weeks} for these amounts"
assert balance == start_balance + weeks * weekly, "balance should be the start plus weekly for each week"
```

# Solution
```python
start_balance = 3000
weekly = 2000
target = 15000

balance = start_balance
weeks = 0
while balance < target:
    balance = balance + weekly
    weeks = weeks + 1

print(weeks, "weeks")
print("Balance:", balance)
```

# Rubric
- My loop has a start, a condition and an update.
- I traced the first iterations on paper before running.
- My code passes the test, and I explained what happens when `weekly` is 0.

# Summary
- A `while` loop repeats its indented block as long as its condition is True.
- Every loop needs a start, a condition and an update.
- The condition is checked once more than the number of iterations.
- A loop whose condition never becomes False is an infinite loop.
- `break` stops a loop straight away. `while True:` with a `break` runs until something happens.

# Check
Q: How many times does `n = 0`, then `while n < {k}:` with `n = n + 1` inside, run its block?
P: The while loop
Vars: k=2..12
F: k
= It runs for n = 0 up to {k-1}, which is {k} times.

Q: What's printed last? `n = 1`, then `while n < 20:` with `n = n * 2` inside, then `print(n)` after the loop.
P: The while loop
A: 32
= n goes 1, 2, 4, 8, 16, 32. At 32 the condition is False.

Q: Which part of a loop stops it from running forever?
P: Every loop needs three parts
- The start
- The colon at the end of the while line
* The update, which moves towards making the condition False
= Without an update, the condition never changes.

Q: For a loop that runs 3 times, how many times is the condition checked?
P: Every loop needs three parts
A: 4 | four
= Three True checks, then one False check ends it.

Q: Why is `balance = 500`, then `while balance > 0:` with `balance = balance + 100` inside, an infinite loop?
P: Infinite loops
* The balance only grows, so it never reaches 0
- Because 500 is too large a starting value for a loop
- Because a while loop can't use the variable name balance
= The update moves away from the end, not towards it.

Q: When is a while loop the natural choice?
P: Loops that run until something happens
- When you know exactly how many times to repeat, before starting
* When you repeat until something happens, without knowing how many times
- When you need to print one single line of text, exactly once, and then stop
= while keeps going until its condition changes.

Q: What does `break` do?
P: Stopping early with break
* It ends the loop straight away
- It pauses the loop for one second
- It skips back to the start of the program
= The loop stops, and the program carries on after it.

Q: What's the risk with `while True:`?
P: Stopping early with break
- Python doesn't allow the value True to be used as the condition of any loop
* If the break can never be reached, the loop never ends
- It always runs exactly once, and then stops
= while True relies on a break being reached.

Q[transfer]: A program asks for a password until it's correct, with no limit on attempts. What's the security problem?
P: Loops that run until something happens
* An attacker can try unlimited passwords, so the loop needs an attempt limit
- The loop will stop after three tries even without a limit
- Python will crash after a hundred tries by itself
= Add a counter and stop, or slow down, after a few failures.

Q[transfer]: A debt starts at ₦50,000, grows by ₦5,000 a month, and you pay ₦4,000 a month. A loop runs `while debt > 0`. What happens?
P: Infinite loops
- The debt is paid off after a few months
* It never ends, because the debt grows each month
- The loop stops when the debt reaches exactly ₦5,000
= Each iteration moves away from 0. Spot it before running.

Q[transfer]: You need to find the first year when a population passes 1 million, growing 3% a year. Which loop fits?
P: Loops that run until something happens
* A while loop that grows the population each year until it passes 1 million
- A loop that repeats exactly ten times, once for each year
- No loop at all, because one multiplication can't work it out
= You don't know the number of years in advance, so repeat until it happens.

# Cards
What does a while loop do? :: Repeats its block as long as its condition is True.
What three parts does a loop need? :: A start, a condition, and an update that moves towards the end.
What is an infinite loop? :: A loop whose condition never becomes False.
What does break do? :: Ends the loop straight away.
When is while the natural choice? :: When you repeat until something happens, without knowing how many times.

# Further
- Python for Everybody, Chapter 5 :: https://www.py4e.com/html3/05-iterations
- The Python Tutorial, control flow :: https://docs.python.org/3/tutorial/controlflow.html
