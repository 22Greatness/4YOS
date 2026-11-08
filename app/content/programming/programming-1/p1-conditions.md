---
id: p1-conditions
pack: Programming 1 · Decisions
title: Combining conditions
minutes: 35
source: Python for Everybody · Chapter 3
url: https://www.py4e.com/html3/03-conditional
courses: Supports any first programming course
format: 2
python: yes
teaches: and-or-not; chained-comparisons; truthiness-in-if; membership-in
uses: if-statement; elif-else; comparison-operators; bool-type; string-methods
---
# Goal
Combine conditions with `and`, `or` and `not`, write ranges neatly, use `in` to check for one of several values, and avoid the classic mistakes when combining conditions.

# Why
Real rules rarely depend on one thing. "You can register if you've paid and you're not suspended." "The session ends if time is up or the user logs out." Combining conditions lets one decision express rules like these. It's also where some of the most common and most dangerous bugs live, especially in security checks, where one wrong `or` can let everyone in.

# Warm-up
?? In an if, elif and else chain, how many branches run?
=> Exactly one: the first whose condition is True, or else.

?? What does `"Ada" == "ada"` give?
=> False, because case matters.

# Lesson
## and, or, not
Three words combine bools into one answer.

| Operator | True when | Example | Result |
| --- | --- | --- | --- |
| `and` | Both sides are True | `paid and not suspended` | True only if both hold |
| `or` | At least one side is True | `time_up or logged_out` | True if either holds |
| `not` | The value is False | `not suspended` | Flips True and False |

This table shows every combination:

| a | b | `a and b` | `a or b` | `not a` |
| --- | --- | --- | --- | --- |
| True | True | True | True | False |
| True | False | False | True | False |
| False | True | False | True | True |
| False | False | False | False | True |

This is the same logic you met with logic gates in How Computers Work, where AND, OR and NOT are built in hardware.

```python
paid = True
suspended = False
if paid and not suspended:
    print("You can register")
```

```output
You can register
```

### Worked example: tracing a combined condition
Take the rule "free entry for students, or for anyone under 12", with `student = False` and `age = 9`. The condition is `student or age < 12`. Work it out piece by piece, as Python does. `student` is False. `age < 12` is `9 < 12`, which is True. `False or True` is True, so entry is free. Now try `student = False` and `age = 30`: `False or False` is False, so they pay.

Python also takes a shortcut called **short-circuiting**. For `or`, if the left side is already True, the answer must be True, so Python doesn't even look at the right side. For `and`, if the left side is False, the answer must be False. This matters later, when the right side does something that could fail, such as dividing: `count > 0 and total / count > 50` never divides by zero, because when `count` is 0, Python stops at the left side.

### Order of evaluation
`not` is worked out first, then `and`, then `or`. So `a or b and c` means `a or (b and c)`. When you combine `and` with `or`, add brackets to make your meaning clear, even when they aren't strictly needed.

## Ranges
To check that a value is between two limits, you can join two comparisons with `and`:

```python
mark = 64
if mark >= 60 and mark < 70:
    print("B")
```

```output
B
```

Python also lets you write the range the way it's written in maths. `60 <= mark < 70` means exactly the same thing, and reads more clearly:

```python
mark = 64
print(60 <= mark < 70)
```

```output
True
```

## Checking for one of several values
To check whether a value is one of a list of options, `or` gets long:

```text
if day == "Saturday" or day == "Sunday":
```

`in` is shorter and clearer. It checks whether the value appears among the ones in brackets:

```python
day = "Sunday"
if day in ("Saturday", "Sunday"):
    print("Weekend")
```

```output
Weekend
```

`in` also checks whether one string appears inside another: `"@" in email` is True if the email contains an @.

## The classic mistake
This looks right, and it's wrong:

```python
colour = "green"
if colour == "red" or "blue":
    print("Warm colour")
```

```output
Warm colour
```

It printed "Warm colour" for green! Python reads it as `(colour == "red") or ("blue")`. The first part is False. The second part is just the string `"blue"`, and a non-empty string counts as True. So the whole condition is always True.

Each side of `or` must be a full comparison: `colour == "red" or colour == "blue"`. Or, better: `colour in ("red", "blue")`.

> Mistake: `if x == 1 or 2:` always passes. When the comparison is False, `or` gives 2, and `if` treats a nonzero 2 as true. Write `x == 1 or x == 2`, or `x in (1, 2)`.

### Truthiness in conditions
You learned that empty and zero values count as False, and others as True. An `if` uses that directly. `if name:` runs when `name` isn't empty. It's a short way to check that something was typed, but be careful with numbers: `if count:` is False when the count is 0, even though 0 can be a real, correct count.

# Exercises
?? With `a = True` and `b = False`, what are `a and b`, `a or b` and `not b`?
=> False, True and True.

?? Rewrite `if age >= 18 and age <= 65:` as a chained comparison.
=> `if 18 <= age <= 65:`.

?? Why is `if answer == "yes" or "y":` always True, and how do you fix it?
=> `"y"` on its own is a non-empty string, so it counts as True. Fix: `if answer in ("yes", "y"):`.

# Practice
Write a registration check from a real-style rule: "A student can register for a course if fees are paid, they aren't suspended, and the course is one of their department's courses."

1. In the box, the facts are in variables. Set `can_register` to True or False with one combined condition.
2. Set `reason` to `"OK"` if they can register. Otherwise, set it to the first problem found, in this order: `"Fees not paid"`, `"Suspended"`, `"Not a department course"`.
3. Trace it on paper for a few combinations of the facts, then run.
4. Press **Test my code**. Then change the facts and test again.

Write down the combinations you traced.

# Starter
```python
fees_paid = True
suspended = False
course = "CSC 183"
department_courses = ("CSC 183", "COS 102", "STA 111")

# Replace with one combined condition
can_register = False

# Replace with an if, elif and else chain
reason = ""

print(can_register, reason)
```

# Tests
```python
want = fees_paid and not suspended and course in department_courses
assert can_register == want, "can_register doesn't match the rule for these facts"
expected = "OK" if want else "Fees not paid" if not fees_paid else "Suspended" if suspended else "Not a department course"
assert reason == expected, f"reason should be {expected!r} for these facts"
```

# Solution
```python
fees_paid = True
suspended = False
course = "CSC 183"
department_courses = ("CSC 183", "COS 102", "STA 111")

can_register = fees_paid and not suspended and course in department_courses

if not fees_paid:
    reason = "Fees not paid"
elif suspended:
    reason = "Suspended"
elif course not in department_courses:
    reason = "Not a department course"
else:
    reason = "OK"

print(can_register, reason)
```

# Rubric
- I combined the conditions with and, not and in correctly.
- My reasons come out in the right order for each problem.
- My code passes the test with several combinations of facts.

# Summary
- `and` needs both sides True, `or` needs either, and `not` flips.
- `not` is worked out first, then `and`, then `or`. Use brackets to be clear.
- Ranges can be written as `60 <= mark < 70`.
- `x in (a, b, c)` checks for one of several values.
- Each side of `or` must be a full comparison. `x == 1 or 2` is always True.

# Check
Q: What is `True and False`?
P: and, or, not
- True
* False
- It's an error
= `and` needs both sides to be True.

Q: What is `False or not False`?
P: and, or, not
* True
- False
- It's an error
= `not False` is True, and `or` needs only one True side.

Q: What does `print(10 <= 25 < 20)` show?
P: Ranges
- True
* False
- It's an error
= 25 is at least 10, but it isn't less than 20, so the whole range check is False.

Q: What's wrong with `if colour == "red" or "blue":`?
P: The classic mistake
- Nothing, it correctly checks for red or blue
* It's always True, because "blue" on its own counts as True
- It causes a SyntaxError because of the second string
= Each side of `or` must be a full comparison, or use `in`.

Q: Which is the clearest way to check if `day` is a weekend day?
P: Checking for one of several values
- `day == "Saturday" or "Sunday"`
* `day in ("Saturday", "Sunday")`
- `day == ("Saturday" and "Sunday")`
= `in` checks for one of several values clearly and correctly.

Q: What does `"@" in "ada@mail.com"` give?
P: Checking for one of several values
* The bool True
- The string "True"
- The position of the @
= `in` checks whether one string appears inside another, and gives a bool.

Q: How is `a or b and c` worked out?
P: and, or, not
- As `(a or b) and c`
* As `a or (b and c)`
- From left to right, one word at a time
= `and` is worked out before `or`. Brackets make it clear.

Q: Why can `if count:` be a bug?
P: The classic mistake
- Because `if` only works with strings, not numbers
* Because a real count of 0 counts as False
- Because count is a word reserved by Python
= Zero is falsy, even when it's a correct value. Compare with `count > 0` or `count is not None` instead.

Q[transfer]: An access check reads `if user == "admin" or "editor":`. What's the security problem?
P: The classic mistake
* It lets everyone in, because the condition is always True
- It blocks admins, because "editor" is checked first
- There's no problem, as long as the names are spelt right
= A non-empty string is True, so the check always passes.

Q[transfer]: A loan rule says "approve if income is at least ₦100,000 and no current loan, or if a guarantor signs". How should it be written?
P: and, or, not
- `income >= 100000 and no_loan or guarantor`, with no brackets
* `(income >= 100000 and not has_loan) or guarantor`, with brackets
- `income >= 100000 or not has_loan or guarantor`
= Brackets make the grouping match the rule exactly.

Q[transfer]: A form checks a typed email with `if "@" in email:`. What's one case this still accepts wrongly?
P: Checking for one of several values
* `"@"` on its own, with nothing before or after it
- `"ada@mail.com"`, which is a normal address
- `"ADA@MAIL.COM"`, written all in capitals
= Containing an @ is a weak check. Real validation needs more.

# Cards
When is `a and b` True? :: Only when both a and b are True.
When is `a or b` True? :: When at least one of them is True.
Why is `x == 1 or 2` always True? :: The `2` on its own is truthy. Write `x in (1, 2)`.
How can you write a range in Python? :: `low <= x < high`.
In what order are not, and, or worked out? :: not first, then and, then or.

# Further
- Python for Everybody, Chapter 3 :: https://www.py4e.com/html3/03-conditional
- The Python Tutorial, control flow :: https://docs.python.org/3/tutorial/controlflow.html
