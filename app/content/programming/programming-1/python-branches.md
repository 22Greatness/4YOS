---
id: python-branches
pack: Programming 1 · Decisions
title: Turn a rule into a decision
minutes: 40
source: Python for Everybody · Chapter 3
url: https://www.py4e.com/html3/03-conditional
courses: Supports any first programming course
format: 2
python: yes
teaches: comparison-operators; if-statement; elif-else; indentation-blocks; branch-order
uses: bool-type; variables; three-structures; trace-table; f-strings
---
# Goal
Turn a rule written in words into an `if`, `elif` and `else` decision in Python, put the branches in the right order, and trace which branch runs for any value.

# Why
Decisions are what make programs useful. Without them, a program does the same thing every time. With them, it can tell a pass from a fail, a valid password from a weak one, or a cheap delivery from a free one. This is selection, the second of the three structures, now in real code. Writing the decision is easy. Getting its order and conditions exactly right is the skill, and the place where most real bugs hide.

# Warm-up
?? What does `print(70 >= 40)` show?
=> True.

?? What are the three structures every algorithm is built from?
=> Sequence, selection and repetition.

# Lesson
## Comparisons give True or False
A decision needs a question with a yes or no answer. In Python, you ask it with a **comparison**, which gives a bool: `True` or `False`.

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `5 != 3` | `True` |
| `<` | Less than | `3 < 5` | `True` |
| `>` | Greater than | `3 > 5` | `False` |
| `<=` | Less than or equal to | `5 <= 5` | `True` |
| `>=` | Greater than or equal to | `4 >= 5` | `False` |

Comparisons work on strings too. `"ada" == "ada"` is True, while `"Ada" == "ada"` is False, because case matters.

> Mistake: Using `=` to compare. `=` stores a value, and `==` compares. Writing `if mark = 40:` is a SyntaxError.

## if, elif and else
An `if` statement runs a block of code only when its condition is True.

```python
mark = 72
if mark >= 40:
    print("Passed")
print("Done")
```

```output
Passed
Done
```

Two details matter here. The `if` line ends with a **colon**. And the lines that belong to the `if` are **indented**, usually by four spaces. Indentation isn't decoration in Python: it's how Python knows which lines are inside the decision. `print("Done")` isn't indented, so it runs whatever the mark.

### else
`else` gives a block to run when the condition is False:

```python
mark = 35
if mark >= 40:
    print("Passed")
else:
    print("Not yet")
```

```output
Not yet
```

### elif
When there are more than two outcomes, add `elif`, short for "else if". Python checks each condition from the top, runs the **first** block whose condition is True, and skips all the rest.

```python
mark = 64
if mark >= 70:
    grade = "A"
elif mark >= 60:
    grade = "B"
elif mark >= 50:
    grade = "C"
else:
    grade = "below C"
print(grade)
```

```output
B
```

These grade bands are an example. Your school's real bands come from its own handbook.

Trace it for a mark of 64. Is 64 at least 70? No, so Python skips that block. Is it at least 60? Yes, so `grade` becomes "B", and Python skips every remaining branch, including the `else`. Notice that the second condition doesn't need to say "and less than 70": by the time Python reaches it, it already knows the mark wasn't 70 or more, or the first branch would have run. That's why a well-ordered chain stays short and readable.

You can have as many `elif` branches as you need, and the `else` is optional. Without an `else`, if no condition is True, nothing in the chain runs at all, and the program carries on after it.

## Order matters
Because Python stops at the first True condition, the order of the branches can change the answer. Compare these two:

| Version | Code | A mark of 85 gives |
| --- | --- | --- |
| Highest first | `if mark >= 70` then `elif mark >= 40` | "A" |
| Lowest first | `if mark >= 40` then `elif mark >= 70` | "Pass", and "A" can never happen |

In the second version, any mark of 70 or more is also 40 or more, so the first branch catches it, and the `elif` never runs. When ranges overlap like this, **check the most specific or highest one first**.

> Mistake: Writing separate `if` statements when you meant one chain. Each separate `if` is checked on its own, so more than one can run. Use `elif` when only one outcome should happen.

## From words to code
A reliable way to turn a written rule into a decision:

1. **List every outcome** the rule can have.
2. **Write the condition** for each, using exact comparisons.
3. **Order them** so that no branch hides another.
4. **Decide the else**: what happens if nothing else matched?
5. **Trace** some values through it before running.

### Worked example: a delivery fee
The rule: "Delivery is free for orders of ₦10,000 or more. Orders of ₦5,000 or more pay ₦500. Smaller orders pay ₦1,000." The prices are invented.

```python
order = 7500
if order >= 10000:
    fee = 0
elif order >= 5000:
    fee = 500
else:
    fee = 1000
print(f"Delivery: ₦{fee}")
```

```output
Delivery: ₦500
```

Trace it for three values before trusting it:

| order | First true condition | fee |
| --- | --- | --- |
| 12000 | `order >= 10000` | 0 |
| 7500 | `order >= 5000` | 500 |
| 3000 | none, so else | 1000 |

# Exercises
?? Write a decision that prints "even" or "odd" for a whole number `n`.
=> `if n % 2 == 0:` then `print("even")`, `else:` then `print("odd")`, with the prints indented.

?? With `if t >= 30: print("hot")`, then `elif t >= 20: print("warm")`, then `else: print("cool")`, what prints for t = 30, 25 and 10?
=> hot, warm and cool.

?? Why does `if mark >= 40` before `elif mark >= 70` never give an A?
=> Every mark of 70 or more is also 40 or more, so the first branch always catches it first.

# Practice
Turn a real rule from your life into a decision. For example, how long to study tonight depending on how many days are left before a test.

1. In the box, set `days_left` to a real number.
2. Write a decision setting `plan`: `"2 hours"` if the test is 2 days away or less, `"1 hour"` if it's 7 days away or less, and `"30 minutes"` otherwise.
3. Trace it on paper for 1, 2, 3, 7, 8 and 20 days before running.
4. Run it, and press **Test my code**. Then change `days_left` to each of your traced values, and test again each time.

Write your trace table, and any value where your first version gave the wrong plan.

# Starter
```python
days_left = 5

# Replace this with an if, elif and else that sets plan
plan = ""

print(plan)
```

# Tests
```python
expected = "2 hours" if days_left <= 2 else "1 hour" if days_left <= 7 else "30 minutes"
assert plan == expected, f"For {days_left} days left, plan should be {expected!r}. Try other values of days_left too."
```

# Solution
```python
days_left = 5

if days_left <= 2:
    plan = "2 hours"
elif days_left <= 7:
    plan = "1 hour"
else:
    plan = "30 minutes"

print(plan)
```

# Rubric
- I turned a real rule into an if, elif and else chain in a sensible order.
- I traced it on paper for values on both sides of each limit.
- My code passes the test.

# Summary
- Comparisons give True or False. `==` compares, and `=` stores.
- `if` runs its indented block when the condition is True. Don't forget the colon.
- `elif` adds more outcomes. Python runs only the first True branch.
- Put the highest or most specific condition first when ranges overlap.
- List outcomes, write exact conditions, order them, decide the else, then trace.

# Check
Q: What does `print(12 >= 12)` show?
P: Comparisons give True or False
* True
- False
- It's an error
= `>=` includes equal values, and 12 equals 12.

Q: Which line checks whether `x` equals 10?
P: Comparisons give True or False
- `if x = 10:`
* `if x == 10:`
- `if x := 10`
= `==` compares. `=` stores, and is a SyntaxError here.

Q: What decides which lines belong to an `if`?
P: if, elif and else
- The order of the lines in the file
* Their indentation
- A blank line after the block
= Python uses indentation to group the lines inside a decision.

Q: `mark = 55`, then `if mark >= 70: g = "A"`, `elif mark >= 50: g = "C"`, `else: g = "F"`. What's `g`?
P: if, elif and else
A: C
= 55 isn't 70 or more, but it is 50 or more.

Q: In an if, elif and else chain, how many branches run?
P: if, elif and else
* Exactly one: the first whose condition is True, or else
- Every branch whose condition is True, from top to bottom
- None of them, unless the else branch is reached at the end
= Python stops at the first True branch.

Q: A chain checks `if s >= 40: "pass"` then `elif s >= 70: "A"`. What can a score of 85 get?
P: Order matters
- A
* pass
- Both pass and A
= 85 is 40 or more, so the first branch catches it. Put the 70 check first.

Q: `n = 5`, then `if n > 3: print("a")`, then a separate `if n > 4: print("b")`. What prints?
P: Order matters
- Only a
- Only b
* a and then b
= Separate ifs are each checked, so both can run.

Q: What's the first step when turning a rule into a decision?
P: From words to code
* List every outcome the rule can have
- Start typing the if statement straight away
- Choose a name for the variable you'll use
= Knowing the outcomes tells you how many branches you need.

Q[transfer]: A web app checks `if role == "admin":` to allow access, and has `else: allow()`. What's the risk?
P: From words to code
* Anyone who isn't an admin also gets in, through the else
- Admins are blocked, because else always runs first
- There's no risk, as long as the role is spelt correctly
= The else should deny, not allow. Decide the else on purpose.

Q[transfer]: A pricing rule says "orders of ₦10,000 or more ship free". Which comparison matches the rule exactly?
P: Comparisons give True or False
- `order > 10000`
* `order >= 10000`
- `order == 10000`
= "Or more" includes 10,000 itself, so it's `>=`.

Q[transfer]: A thermostat program prints "heat on" and "heat off" for the same temperature. What's the most likely cause?
P: Order matters
- The temperature value is too large for an int
* It uses two separate ifs where one if and else was meant
- Python always runs both branches of an if and else
= Separate ifs can both run. if and else runs exactly one.

# Cards
What's the difference between `=` and `==`? :: `=` stores a value. `==` compares two values.
How does Python know which lines are inside an if? :: By their indentation.
In an if, elif and else chain, which branch runs? :: Only the first one whose condition is True, or else.
Which condition goes first when ranges overlap? :: The highest or most specific one.
What do you check with separate ifs? :: Each one is checked on its own, so several can run.

# Further
- Python for Everybody, Chapter 3 :: https://www.py4e.com/html3/03-conditional
- The Python Tutorial, control flow :: https://docs.python.org/3/tutorial/controlflow.html
