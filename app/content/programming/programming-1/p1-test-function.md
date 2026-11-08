---
id: p1-test-function
pack: Programming 1 · Functions
title: Testing a function
minutes: 40
source: The Python Tutorial · Errors and exceptions
url: https://docs.python.org/3/tutorial/errors.html
courses: Supports any first programming course
format: 2
lecture: camp
credit: 4YOS Camp
start: 0
end: 77.209
python: yes
teaches: assert-statement; test-cases-for-functions; edge-tests-in-code; test-first
uses: return-statement; parameters; boundary-values; test-cases; one-job-functions
---
# Goal
Check that a function really works by writing tests in code with `assert`, choosing typical, edge and unusual cases, and running them every time the function changes.

# Why
A function that looks right isn't the same as a function that is right. Testing by hand, once, catches some mistakes, but a change next week can quietly break it again. Tests written in code can be run in a second, every time anything changes, so mistakes are caught the moment they appear. This is how professional software is kept working, and it's exactly what the **Test my code** button in these lessons has been doing for you all along.

# Warm-up
?? Which three values test the edge of `mark >= 40`?
=> 39, 40 and 41.

?? Why should a function that works out a value return it?
=> So the calling code can store, test and reuse it.

# Lesson
 ## assert
> Clip: See how the equality case catches an off-by-one condition. Then try the parcel-weight rule yourself.

## assert
`assert` checks that something is True. If it is, nothing happens and the program carries on. If it's False, the program stops with an **AssertionError**, showing the message you wrote.

```python
def double(n):
    return n * 2

assert double(4) == 8, "double(4) should be 8"
assert double(0) == 0, "double(0) should be 0"
print("All tests passed")
```

```output
All tests passed
```

Each `assert` line is one **test**: call the function with chosen values, and compare the result with what you know it should be. The message after the comma explains what went wrong if the test fails.

Here's what a failing test looks like:

```text
assert double(4) == 9, "double(4) should be 9"
```

```text
AssertionError: double(4) should be 9
```

Here the test itself was wrong: 9 is the wrong expectation. Tests can have mistakes too, which is one reason to work out each expected value carefully, by hand, before you write it down.

## Choosing test cases
The tests you choose matter more than how many you write. For each function, aim for:

| Kind of test | Why | For `grade(score)` |
| --- | --- | --- |
| Typical | Shows the main idea works | 85, 60, 30 |
| Edges | Most bugs live at limits | 69, 70, 49, 50 |
| Unusual | Zero, empty, negative, very large | 0, 100 |
| Invalid | What should happen with bad input? | -5, 105 |

The edge tests are the ones that catch off-by-one errors. A grade function written with `score > 70` instead of `score >= 70` passes every typical test and fails only on exactly 70.

### Worked example: testing a fee function
The rule: orders of ₦10,000 or more ship free, and others pay ₦800. The amounts are invented.

```python
def delivery_fee(order):
    if order >= 10000:
        return 0
    return 800

assert delivery_fee(15000) == 0, "a large order ships free"
assert delivery_fee(3000) == 800, "a small order pays 800"
assert delivery_fee(10000) == 0, "exactly 10,000 ships free"
assert delivery_fee(9999) == 800, "just under 10,000 pays 800"
assert delivery_fee(0) == 800, "an empty order still pays"
print("All delivery tests passed")
```

```output
All delivery tests passed
```

Five tests, each with a reason. If anyone later changes `>=` to `>`, the third test fails at once and says exactly which case broke.

> Mistake: Testing only the case you were thinking about while writing the function. That's the case most likely to work. Write the edge and unusual tests too, because those are the ones you didn't think about.

## Testing pieces separately
In a decomposed program, test each small function on its own before testing the whole. If `average` and `grade` each pass their tests, and `report` still goes wrong, you know the problem is in `report`, the only untested piece.

This is another reason to keep working-out separate from printing. A function that returns a value is easy to test with `assert`. A function that only prints is much harder, because there's no result to compare.

## Writing tests first
A useful habit is to write the tests **before** the function:

1. Write a few `assert` lines describing what the function should do, including the edges.
2. Run them. They fail, because the function isn't written yet.
3. Write the function until every test passes.
4. Keep the tests, and run them again after every change.

Writing tests first forces you to decide exactly what the function should do, edges and all, before you start. It turns a vague rule into a precise one. Larger courses later call this **test-driven development**.

### What tests can't do
Tests show that a function works for the cases you tested. They can't prove it works for every possible input. That's why choosing good cases matters, and why the edges and unusual inputs are worth the extra lines.

# Exercises
?? Write two tests for `def square(n): return n * n`.
=> For example: `assert square(3) == 9` and `assert square(-4) == 16`.

?? What happens when an assert's condition is False?
=> The program stops with an AssertionError, showing the message.

?? Which test would catch `score > 70` written instead of `score >= 70`?
=> A score of exactly 70.

# Practice
Write the tests first, then the function.

The rule: `ticket_price(age)` returns 0 for children under 5, 500 for ages 5 to 17, 1000 for ages 18 to 64, and 600 for 65 and over. The prices are invented.

1. In the box, write at least eight `assert` tests: typical ages and every edge (4, 5, 17, 18, 64, 65).
2. Run them, and see them fail.
3. Write `ticket_price` until every test passes.
4. Press **Test my code**, which runs its own tests too.

Write down which edge your first version got wrong, if any.

# Starter
```python
def ticket_price(age):
    # Write this after your tests
    return 0

# Write your assert tests here, at least eight, including every edge

print("All my tests passed")
```

# Tests
```python
for age, want in [(0, 0), (4, 0), (5, 500), (12, 500), (17, 500), (18, 1000), (40, 1000), (64, 1000), (65, 600), (90, 600)]:
    assert ticket_price(age) == want, f"ticket_price({age}) should be {want}"
```

# Solution
```python
def ticket_price(age):
    if age < 5:
        return 0
    if age < 18:
        return 500
    if age < 65:
        return 1000
    return 600

assert ticket_price(2) == 0
assert ticket_price(4) == 0
assert ticket_price(5) == 500
assert ticket_price(17) == 500
assert ticket_price(18) == 1000
assert ticket_price(30) == 1000
assert ticket_price(64) == 1000
assert ticket_price(65) == 600
assert ticket_price(80) == 600

print("All my tests passed")
```

# Rubric
- I wrote my tests before the function, with every edge included.
- Each test checks a returned value with a clear expected result.
- My code passes my tests and the lesson's tests.

# Summary
- `assert condition, "message"` does nothing if True, and stops with an AssertionError if False.
- Each test calls a function with chosen values and compares the result.
- Choose typical, edge, unusual and invalid cases. Edges catch off-by-one errors.
- Test small functions on their own first. Returned values are easy to test.
- Writing tests first makes the rule precise. Tests can't prove a function works for every input.

# Check
Q: What does `assert 2 + 2 == 4, "maths"` do?
P: assert
* Nothing visible, because the condition is True
- It prints the word maths on the screen, as a label for the check that ran
- It stops the program with an AssertionError
= A True assert passes silently.

Q: What does `assert 5 * 2 == 5, "wrong"` cause?
P: assert
- It passes silently
* An AssertionError with the message "wrong"
- A SyntaxError, because a comparison can't be written after the word assert
= 5 × 2 is 10, not 5, so the condition is False.

Q: Which test best catches an off-by-one error in `if order >= 10000`?
P: Choosing test cases
- `delivery_fee(15000)`
* `delivery_fee(10000)`
- `delivery_fee(3000)`
= Exactly on the edge is where `>=` and `>` differ.

Q: Why test unusual values like 0 and empty lists?
P: Choosing test cases
* They often break code that works for typical values
- Because Python requires every single function to be tested with zero before it will run
- Because unusual values make the tests run faster
= Empty and zero cases are classic failures.

Q: Why is a function that only prints hard to test with assert?
P: Testing pieces separately
- Because assert can't be used anywhere in a program that also prints
* There's no returned value to compare with the expected result
- Because printing functions always contain errors
= Return values make testing easy.

Q: A program's small functions all pass their tests, but the whole program goes wrong. Where should you look?
P: Testing pieces separately
* In the top function that joins them, the untested piece
- In every small function, since their tests must be wrong
- Nowhere, because passing tests on the small functions prove the whole program works
= The untested piece is the likeliest suspect.

Q: What's the first step of writing tests first?
P: Writing tests first
* Write assert lines describing what the function should do
- Write the whole function first, run it once, and only then think about testing it
- Run the program once, to see what it prints
= The tests describe the rule before the code exists.

Q: Can tests prove a function works for every possible input?
P: Writing tests first
- Yes, if there are at least ten tests
* No, they only show it works for the cases tested
- Yes, as long as every single one of the tests passes when it runs
= That's why choosing edge and unusual cases matters.

Q[transfer]: A colleague changes a tax function, and every report is now wrong. What would have caught this the moment it happened?
P: Writing tests first
* Tests for the tax function, run after every change
- A longer, more detailed comment written above the tax function
- Printing the tax in a bigger font
= Tests run in seconds and point straight at what broke.

Q[transfer]: A password rule says "at least 8 characters". Which tests matter most?
P: Choosing test cases
- Passwords of 3 and 20 characters only
* Passwords of 7, 8 and 9 characters, plus an empty one
- Only one long, very strong password
= The edge at 8, and the empty case, are where bugs hide.

Q[transfer]: In a statistics module, `mean(values)` crashes on an empty list. Which test would have found it before users did?
P: Choosing test cases
* A test that calls `mean([])` and checks what should happen
- A test with a list of a thousand values
- A test that checks the function's name is spelled correctly in every file
= Empty input is the unusual case worth testing.

# Cards
What does assert do? :: Nothing if its condition is True. Stops with an AssertionError if False.
What makes a test? :: Calling a function with chosen values and comparing the result with the expected one.
Which kinds of test case should you choose? :: Typical, edges, unusual, and invalid.
Why write tests first? :: It forces you to make the rule precise, edges and all.
What can't tests prove? :: That a function works for every possible input.

# Further
- The Python Tutorial, errors and exceptions :: https://docs.python.org/3/tutorial/errors.html
- Python for Everybody, Chapter 4 :: https://www.py4e.com/html3/04-functions
