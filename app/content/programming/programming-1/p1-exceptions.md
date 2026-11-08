---
id: p1-exceptions
pack: Programming 1 · Files and errors
title: Handling errors
minutes: 45
source: The Python Tutorial · Errors and exceptions
url: https://docs.python.org/3/tutorial/errors.html
courses: Supports any first programming course
format: 2
python: yes
teaches: try-except; specific-exceptions; else-finally; raise-errors; validate-input
uses: read-traceback; value-error; zero-division; open-file; input-is-text; invalid-input-check
---
# Goal
Catch errors you expect with `try` and `except`, choose exactly which errors to catch, keep going or report clearly, and raise your own errors when a function gets bad input.

# Why
Some errors aren't bugs in your code: they come from the outside world. A person types "twenty" where a number belongs, a file is missing, a value in a CSV is blank. A program that crashes on the first one is fragile. A program that handles them, by asking again, skipping a bad row, or explaining what went wrong, is one people can rely on. Handled carelessly, though, errors get hidden, and hidden errors are worse than crashes.

# Warm-up
?? What's the difference between a TypeError and a ValueError?
=> TypeError: the wrong type. ValueError: the right type, but an unusable value.

?? What does `int("twenty")` cause?
=> A ValueError.

# Lesson
## Exceptions
When Python meets an error while running, it **raises an exception**: it stops what it's doing and looks for code that handles that kind of error. If nothing handles it, the program stops and shows the traceback you learned to read. The error names you've met, ValueError, ZeroDivisionError, KeyError and FileNotFoundError, are all kinds of exception.

## try and except
`try` marks code that might fail. `except` says what to do if a particular exception happens inside it.

```python
typed = "twenty"
try:
    age = int(typed)
    print("Next year you'll be", age + 1)
except ValueError:
    print("Please type your age in digits, such as 20.")
print("Carrying on")
```

```output
Please type your age in digits, such as 20.
Carrying on
```

Python runs the `try` block. `int("twenty")` raises a ValueError, so Python stops the `try` block at that line, skips the rest of it, and runs the matching `except` block. Then the program carries on normally after the whole statement. If nothing had gone wrong, the `except` block would have been skipped.

### Catching the right error
Name the exception you expect. Each `except` can handle a different one:

```python
def average(text_marks):
    try:
        marks = [int(m) for m in text_marks]
        return sum(marks) / len(marks)
    except ValueError:
        return "A mark isn't a whole number."
    except ZeroDivisionError:
        return "There are no marks."

print(average(["70", "80"]))
print(average(["70", "eighty"]))
print(average([]))
```

```output
75.0
A mark isn't a whole number.
There are no marks.
```

> Mistake: Catching everything with a bare `except:` or `except Exception:`. It hides bugs you didn't expect, such as a misspelled variable name, behind your friendly message, so you never find out what really went wrong. Catch only the errors you expect and know how to handle.

## Errors from files
Opening a file that isn't there raises a FileNotFoundError. Handling it lets your program explain the problem clearly, instead of showing a traceback:

```python
try:
    with open("missing.csv") as f:
        data = f.read()
except FileNotFoundError:
    print("Couldn't find missing.csv. Check the name and folder.")
```

```output
Couldn't find missing.csv. Check the name and folder.
```

### Skipping bad rows
In real data, one bad row shouldn't stop the whole analysis. Catch the error for that row, count it, and carry on:

```python
rows = ["72", "65", "", "80", "abc"]
marks = []
skipped = 0
for value in rows:
    try:
        marks.append(int(value))
    except ValueError:
        skipped += 1
print(marks, "skipped:", skipped)
```

```output
[72, 65, 80] skipped: 2
```

Always report how many rows were skipped. Silently dropping data is how wrong results get published.

## else and finally
Two optional parts make the flow clearer:

| Part | Runs when |
| --- | --- |
| `try` | Always, first |
| `except` | Only if a matching error happened |
| `else` | Only if no error happened |
| `finally` | Always, last, error or not |

```python
for typed in ["5", "x"]:
    try:
        n = int(typed)
    except ValueError:
        print(typed, "isn't a number")
    else:
        print(typed, "squared is", n * n)
    finally:
        print("checked", typed)
```

```output
5 squared is 25
checked 5
x isn't a number
checked x
```

Keep the `try` block small, holding only the line that might fail. Put what happens next in `else`. That way, an unexpected error in the follow-up code isn't mistaken for the one you meant to catch.

## Raising your own errors
A function can refuse bad input by raising an exception itself, with `raise`:

```python
def percentage(part, whole):
    if whole <= 0:
        raise ValueError("whole must be more than 0")
    return part / whole * 100

print(percentage(30, 120))
try:
    percentage(5, 0)
except ValueError as error:
    print("Problem:", error)
```

```output
25.0
Problem: whole must be more than 0
```

`except ValueError as error` stores the exception, so you can show its message. Raising an error is better than quietly returning a wrong or made-up value, such as 0, because the caller finds out straight away that something is wrong, and can decide what to do.

# Exercises
?? What happens to the rest of a `try` block after the line that raised an error?
=> It's skipped. Python jumps to the matching except block.

?? Why is a bare `except:` a bad idea?
=> It hides unexpected bugs behind the same message, so you never find them.

?? When does a `finally` block run?
=> Always, whether or not an error happened.

# Practice
Make a fragile program robust.

1. In the box, `parse_marks(values)` should turn a list of text values into whole-number marks, skipping any that aren't whole numbers, and return a tuple: the list of marks and how many were skipped.
2. `safe_average(marks)` should return the average, but raise a ValueError with a clear message if the list is empty.
3. Below them, use both on the real-looking data, catching the ValueError from `safe_average` and printing its message.
4. Catch only ValueError. Don't use a bare except.
5. Predict, run, and press **Test my code**.

Write how many values were skipped, and why each one was.

# Starter
```python
def parse_marks(values):
    marks = []
    skipped = 0
    # Convert each value, skipping and counting any that fail
    return marks, skipped

def safe_average(marks):
    # Raise ValueError if marks is empty, otherwise return the average
    return 0

data = ["72", "65", "", "80", "n/a", "58"]
marks, skipped = parse_marks(data)
print(marks, skipped)
print(safe_average(marks))
```

# Tests
```python
assert parse_marks(["72", "x", "", "80"]) == ([72, 80], 2), "parse_marks should keep 72 and 80 and skip 2"
assert parse_marks([]) == ([], 0), "an empty list gives no marks and no skips"
assert safe_average([70, 80]) == 75, "safe_average([70, 80]) should be 75"
try:
    safe_average([])
    raise AssertionError("safe_average([]) should raise ValueError")
except ValueError:
    pass
```

# Solution
```python
def parse_marks(values):
    marks = []
    skipped = 0
    for value in values:
        try:
            marks.append(int(value))
        except ValueError:
            skipped += 1
    return marks, skipped

def safe_average(marks):
    if not marks:
        raise ValueError("There are no valid marks to average.")
    return sum(marks) / len(marks)

data = ["72", "65", "", "80", "n/a", "58"]
marks, skipped = parse_marks(data)
print(marks, skipped)
try:
    print(safe_average(marks))
except ValueError as error:
    print("Problem:", error)
```

# Rubric
- I caught only ValueError, with small try blocks.
- I reported how many values were skipped instead of dropping them silently.
- My function raises a clear error for empty input, and my code passes the test.

# Summary
- An exception stops the code and looks for a handler. With none, the program stops.
- `try` runs code that might fail. `except SomeError` handles that error only.
- Catch specific errors. A bare `except` hides bugs.
- `else` runs if nothing failed. `finally` always runs. Keep `try` blocks small.
- `raise ValueError("message")` refuses bad input clearly. Report skipped data.

# Check
Q: What does this print? `try: x = int("7")` then `except ValueError: x = 0`, then `print(x * 2)`.
P: try and except
A: 14
= "7" converts fine, so the except block is skipped.

Q: In a try block, an error happens on the second of four lines. What happens to lines 3 and 4?
P: try and except
* They're skipped, and the matching except block runs
- They run anyway, after the except block has finished
- They run first, and then the except block runs
= Python jumps out of the try block at the error.

Q: Which exception does opening a missing file raise?
P: Errors from files
- ValueError
* FileNotFoundError
- KeyError
= A missing file raises FileNotFoundError.

Q: Why is `except Exception:` around a whole program risky?
P: try and except
* It hides unexpected bugs behind one message
- It makes the whole program run noticeably slower, even when nothing goes wrong at all
- It only works with files, not with numbers
= Catch only the errors you expect.

Q: Five values are parsed, and two fail. What should the program do?
P: Errors from files
* Keep the three, and report that two were skipped
- Stop the whole program at the first bad value
- Replace the two bad values with zeros silently, so that the count still comes to five
= Silent changes to data lead to wrong results.

Q: When does an `else` block after try and except run?
P: else and finally
- Always, after every try block
* Only if no error happened
- Only if an error happened
= else is for the code that should follow a success.

Q: When does a `finally` block run?
P: else and finally
* Always, error or not
- Only if an error happened
- Only if no error happened
= finally always runs last.

Q: What does `raise ValueError("whole must be more than 0")` do?
P: Raising your own errors
* Stops the function and sends that error to the caller
- Prints the message and carries on as normal
- Returns 0 to the caller, together with a small warning printed on the screen
= The caller can catch it, or the program stops with the message.

Q[transfer]: A banking app reads a transfer amount typed by a user. What's the right handling?
P: try and except
* Catch ValueError, explain the expected format, and ask again
- Treat any amount that fails to convert as ₦0, and send it
- Let the program crash, so the user restarts the app
= Handle expected bad input clearly, without inventing values.

Q[transfer]: A log analyser hits a malformed line in a million-line file. What should it do?
P: Errors from files
* Skip the line, count it, and report the count at the end
- Stop the whole analysis on the first bad line
- Delete the malformed line from the original log
= One bad line shouldn't stop the analysis, but it must be reported.

Q[transfer]: A statistics function is given an empty dataset. What's better than returning 0 for the mean?
P: Raising your own errors
* Raise a ValueError, so the caller knows there's no data
- Return 0 anyway, since it's a reasonable guess
- Return the mean of whichever dataset was used the previous time the function ran
= A made-up value hides the problem. An error reveals it.

# Cards
What does try and except do? :: Runs code that might fail, and handles a named error if it happens.
Why catch specific exceptions? :: A bare except hides unexpected bugs.
When do else and finally run? :: else only if no error happened. finally always.
How do you refuse bad input in a function? :: `raise ValueError("clear message")`.
What should happen to bad data rows? :: Skip them, count them, and report the count.

# Further
- The Python Tutorial, errors and exceptions :: https://docs.python.org/3/tutorial/errors.html
- Python for Everybody, Chapter 3, catching exceptions :: https://www.py4e.com/html3/03-conditional
