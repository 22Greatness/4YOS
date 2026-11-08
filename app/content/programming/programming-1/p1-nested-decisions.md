---
id: p1-nested-decisions
pack: Programming 1 · Decisions
title: Nested decisions (practice)
minutes: 45
source: Python for Everybody · Chapter 3
url: https://www.py4e.com/html3/03-conditional
courses: Supports any first programming course
format: 2
python: yes
teaches: nested-if; flatten-decisions; decision-practice
uses: if-statement; elif-else; and-or-not; boundary-values; invalid-input-check; indentation-blocks
---
# Goal
Put one decision inside another when a rule needs it, flatten nesting with `and` when it doesn't, and practise writing and testing full decision rules from start to finish.

# Why
Some rules have layers: first you check one thing, and only then does a second question make sense. Nesting decisions handles these. But deep nesting makes code hard to read and easy to get wrong, so knowing when to flatten it matters as much. This practice lesson also brings together everything in this unit: comparisons, chains, combined conditions, edges and guards.

# Warm-up
?? Which three values test the edge of `mark >= 40`?
=> 39, 40 and 41.

?? Where should a check for impossible input go in a chain?
=> First, before the normal rule.

# Lesson
## A decision inside a decision
A **nested decision** is an `if` inside another `if`'s block. The inner question is only asked when the outer one was True.

```python
registered = True
mark = 55
if registered:
    if mark >= 40:
        print("Passed")
    else:
        print("Not yet")
else:
    print("Not registered for this course")
```

```output
Passed
```

Indentation shows the layers. The inner `if` and `else` are indented once more than the outer `if`, so they belong inside it. The outer `else` lines up with the outer `if`.

Nesting fits when the inner question only makes sense after the outer one. Asking about a mark only makes sense for a registered student, so the mark check sits inside.

Trace it as Python does. The outer condition, `registered`, is True, so Python enters the outer block and meets the inner `if`. The mark, 55, is at least 40, so it prints "Passed" and skips the inner `else`. Since the outer condition was True, the outer `else` is skipped too. If `registered` had been False, Python would have jumped straight to the outer `else`, without ever looking at the mark.

## Flattening with and
Nesting is often used when it isn't needed. These two versions do the same thing:

```text
if age >= 18:
    if has_id:
        print("Allowed")
```

```text
if age >= 18 and has_id:
    print("Allowed")
```

The flat one is shorter and easier to read. Use `and` when both conditions simply need to be True together, and there's nothing different to do when only one of them is.

| Use nesting when | Flatten with and when |
| --- | --- |
| Each layer has its own else | Both conditions just need to be True |
| The inner check only makes sense after the outer one | Neither condition depends on the other |
| Different messages for different failures | One outcome for "all true" |

> Mistake: Nesting four or five levels deep. Each level adds indentation and makes it harder to see which else belongs to which if. If you're nesting deeply, try a flat elif chain with guards first.

## Turning a layered rule into code
Use the same steps as before, with one more question: does this check depend on another?

### Worked example: a hostel allocation rule
The rule: "Only registered students can apply. Final-year students get priority. Others get a room if their fees are paid, and go on the waiting list if not." This is an invented example.

```python
registered = True
final_year = False
fees_paid = True

if not registered:
    status = "Cannot apply"
elif final_year:
    status = "Priority room"
elif fees_paid:
    status = "Room"
else:
    status = "Waiting list"
print(status)
```

```output
Room
```

This rule could have been nested, but a flat chain with a guard first is easier to read. The guard, `if not registered`, handles the case where nothing else matters. Then the remaining checks run in order of priority.

### Test it like any decision
| registered | final_year | fees_paid | Expected |
| --- | --- | --- | --- |
| False | anything | anything | Cannot apply |
| True | True | False | Priority room |
| True | False | True | Room |
| True | False | False | Waiting list |

Notice how the guard row says "anything" for the other two facts. Once a student isn't registered, nothing else changes the answer, so one test covers all four of those combinations. That's another benefit of putting guards first: they make the test table smaller.

Every row of the rule needs at least one test. With three true or false facts, there are eight combinations in total. You don't always need all eight, but you need one for each different outcome, and any combination you're unsure about.

## Practice method
For each rule in today's practice:

1. Write the outcomes.
2. Decide which checks depend on others.
3. Write a guard for impossible input.
4. Write the chain, flat where you can.
5. Write a test table with expected results before running.

# Exercises
?? Flatten: `if paid:` then, inside, `if not suspended:` then `print("OK")`, with no elses.
=> `if paid and not suspended:` then `print("OK")`.

?? When should you keep a decision nested?
=> When each layer has its own else, or the inner check only makes sense after the outer one.

?? How many combinations do three true or false facts have?
=> Eight, since 2 × 2 × 2 = 8.

# Practice
Write a full scholarship rule as a decision: "Students with a CGPA below 0 or above 5 are invalid. Students with a CGPA of 4.5 or more get a full award. Students with 3.5 or more get a half award if their family income is under ₦500,000, and no award otherwise. Everyone else gets no award." The thresholds are invented for practice.

1. Write a test table with at least six rows, including the edges 3.5 and 4.5 and an invalid CGPA, with expected results.
2. In the box, write the decision setting `award` to `"Invalid"`, `"Full"`, `"Half"` or `"None"`.
3. Run it for each row by changing the values, and compare with your table.
4. Press **Test my code** for each combination you test.

Write your test table, and any row where your first version was wrong.

# Starter
```python
cgpa = 3.8
income = 400000

# Replace with your decision
award = ""

print(award)
```

# Tests
```python
if cgpa < 0 or cgpa > 5:
    expected = "Invalid"
elif cgpa >= 4.5:
    expected = "Full"
elif cgpa >= 3.5 and income < 500000:
    expected = "Half"
else:
    expected = "None"
assert award == expected, f"For cgpa {cgpa} and income {income}, award should be {expected!r}"
```

# Solution
```python
cgpa = 3.8
income = 400000

if cgpa < 0 or cgpa > 5:
    award = "Invalid"
elif cgpa >= 4.5:
    award = "Full"
elif cgpa >= 3.5 and income < 500000:
    award = "Half"
else:
    award = "None"

print(award)
```

# Rubric
- I wrote a test table with edges and invalid input before coding.
- My decision has a guard first and is as flat as the rule allows.
- My code passes the test for every row of my table.

# Summary
- A nested decision is an if inside another if's block.
- Nest when each layer has its own else, or the inner check depends on the outer.
- Flatten with `and` when conditions just need to be True together.
- Prefer a flat chain with a guard first over deep nesting.
- Test one row for each outcome, plus every edge.

# Check
Q: In a nested decision, when is the inner question asked?
P: A decision inside a decision
* Only when the outer condition was True
- Always, before the outer condition is checked
- Only when the outer condition was False
= The inner if sits inside the outer block.

Q: How does Python show that an if is nested inside another?
P: A decision inside a decision
- With brackets around the inner if statement
* By indenting the inner if one level further
- By writing the word nested before the inner if
= Indentation shows the layers.

Q: Which flat version matches `if a:` then, inside, `if b:` then `print("yes")`?
P: Flattening with and
- `if a or b: print("yes")`
* `if a and b: print("yes")`
- `if not a and b: print("yes")`
= Both must be True, so it's `and`.

Q: When should you keep nesting instead of flattening?
P: Flattening with and
* When each layer needs its own else
- Whenever there are two or more conditions to check
- Never, because nested code always runs more slowly
= Different failures need different branches.

Q: In the hostel example, why does `if not registered` come first?
P: Turning a layered rule into code
- Because Python requires `not` to be at the start
* It's a guard: if it's True, nothing else matters
- Because registered is the longest variable name
= Guards handle the case that ends the decision early.

Q: `registered = True`, `final_year = False`, `fees_paid = False`. What status does the hostel rule give?
P: Turning a layered rule into code
A: Waiting list
= Registered, not final year, fees not paid: the else branch.

Q: How many combinations do three true or false facts have?
P: Turning a layered rule into code
A: 8 | eight
= 2 × 2 × 2 = 8.

Q: What's the risk of nesting five levels deep?
P: Flattening with and
- Python refuses to run code nested more than four levels
* It's hard to see which else belongs to which if
- Every nested level makes the program use more memory
= Deep nesting is hard to read, which makes mistakes likely.

Q[transfer]: A bank app checks "the account exists", then "the PIN is correct", then "the balance covers the withdrawal", with a different message for each failure. How should it be written?
P: A decision inside a decision
* A chain or nesting with a separate branch for each failure, checked in that order
- One combined condition, with a single "Failed" message for everything
- Three separate ifs that can all run, each printing a message
= Different failures need different branches, in order of dependency.

Q[transfer]: In a security tool, a rule reads "block if the IP is on the blocklist, or if it's not on the allowlist and has failed 5 logins". What should the code use?
P: Flattening with and
- Deep nesting, with one level for each word in the rule
* `on_blocklist or (not on_allowlist and failures >= 5)`, with brackets
- `on_blocklist and not on_allowlist or failures >= 5`, with no brackets
= Brackets make the grouping match the rule.

Q[transfer]: A student fee rule has 4 true or false facts. How many combinations are there?
P: Turning a layered rule into code
A: 16 | sixteen
= 2 × 2 × 2 × 2 = 16. Test one for each outcome and every edge.

# Cards
What is a nested decision? :: An if inside another if's block.
When should a decision be nested? :: When each layer has its own else, or the inner check depends on the outer.
How do you flatten two nested ifs with no elses? :: Join their conditions with and.
What comes first in a chain? :: A guard for the case that ends the decision early.
How many combinations do n true or false facts have? :: 2 to the power n.

# Further
- Python for Everybody, Chapter 3 :: https://www.py4e.com/html3/03-conditional
- The Python Tutorial, control flow :: https://docs.python.org/3/tutorial/controlflow.html
