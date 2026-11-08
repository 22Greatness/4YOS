---
id: p1-strings
pack: Programming 1 · Values and names
title: Text and strings
minutes: 40
source: Python for Everybody · Chapter 6
url: https://www.py4e.com/html3/06-strings
courses: Supports any first programming course
format: 2
python: yes
teaches: string-values; concatenation; f-strings; string-methods; len-function; escape-characters
uses: variables; expressions; print-function; type-error
---
# Goal
Work with text in Python: join strings, build messages with f-strings, change case, tidy spaces, measure length and handle quotes inside text.

# Why
Most of what programs show people is text: names, messages, reports. A great deal of real data is text too: names in a register, lines in a log file, words in a password. Handling text well is a skill you'll use in every course, from writing a clear report in statistics to examining log files in security.

# Warm-up
?? What does `print("Marks: " + 70)` cause, and why?
=> A TypeError, because `+` can't join text and a whole number.

?? After `a = 5`, then `b = a + 2`, what's in `b`?
=> 7.

# Lesson
## Strings
A **string** is a piece of text: letters, digits, spaces and symbols, inside quotes. `"Ada"`, `'COS 102'` and `"123"` are all strings. The last one looks like a number, but in quotes it's text, and Python treats it as text.

### Joining strings
`+` joins two strings into one. This is called **concatenation**.

```python
first = "Ada"
last = "Okafor"
full = first + " " + last
print(full)
```

```output
Ada Okafor
```

Notice the `" "` in the middle. Python only joins exactly what you give it, so without it you'd get `AdaOkafor`.

You can repeat a string with `*`: `"-" * 10` gives `----------`. That's handy for drawing lines in a report.

> Mistake: Joining a string and a number with `+`. `"Age: " + 21` is a TypeError. Use an f-string instead, explained next.

## f-strings
The clearest way to build a message from text and values is an **f-string**. Put `f` before the opening quote, and write any variable or expression inside curly brackets.

```python
name = "Ada"
mark = 78
print(f"{name} scored {mark} out of 100")
print(f"That's {mark / 100 * 100:.0f} percent, or {100 - mark} below full marks")
```

```output
Ada scored 78 out of 100
That's 78 percent, or 22 below full marks
```

Inside the brackets, Python works out the expression and puts its value into the text. f-strings work with numbers too, so you don't need to convert anything.

f-strings are the modern way to build text in Python, and you'll see them in most code written today. They're easier to read than joining many pieces with `+`, because the message reads in one piece, just as it will appear. Use them whenever a message mixes fixed words with values that change.

### Formatting numbers
After a colon inside the brackets, you can control how a number appears:

| Code | Shows | Meaning |
| --- | --- | --- |
| `f"{2/3:.2f}"` | `0.67` | Two decimal places |
| `f"{1500000:,}"` | `1,500,000` | Commas between thousands |
| `f"{0.256:.1%}"` | `25.6%` | As a percentage, one decimal place |

```python
price = 1500000
share = 0.256
print(f"₦{price:,}")
print(f"{share:.1%}")
```

```output
₦1,500,000
25.6%
```

## String methods
A **method** is an action that belongs to a value. You write the value, a dot, then the method's name and brackets. Strings have many.

| Method | What it does | Example | Result |
| --- | --- | --- | --- |
| `.upper()` | All capitals | `"data".upper()` | `"DATA"` |
| `.lower()` | All lower case | `"PYTHON".lower()` | `"python"` |
| `.strip()` | Removes spaces at both ends | `"  Ada  ".strip()` | `"Ada"` |
| `.replace(a, b)` | Replaces every a with b | `"2024-11-06".replace("-", "/")` | `"2024/11/06"` |
| `.startswith(x)` | Checks the start | `"CSC101".startswith("CSC")` | `True` |

```python
typed = "  Okafor  "
clean = typed.strip().upper()
print(f"[{clean}]")
```

```output
[OKAFOR]
```

Methods don't change the original string. They give you a **new** one. `typed` still holds `"  Okafor  "` with its spaces. To keep the result, store it, as `clean` does here.

Methods can be chained: `typed.strip().upper()` strips first, then turns the result into capitals.

Tidying text like this matters more than it looks. Data typed by people is messy: extra spaces, random capitals, different spellings of the same thing. A program that compares "Ada" with " ada" finds them different, even though a person would say they're the same. Cleaning text before you compare, sort or store it is one of the most common jobs in real programs, from school registers to security logs. Strings have many more methods than the ones in the table, and the Python documentation lists them all.

## Length and special characters
`len` gives the number of characters in a string, including spaces:

```python
print(len("Ada"))
print(len("Ada Okafor"))
```

```output
3
10
```

### Quotes and new lines inside a string
If your text contains a quote, use the other kind outside: `"It's done"` or `'She said "yes"'`. A backslash begins an **escape sequence**, a code for something you can't type directly:

| Escape | Means |
| --- | --- |
| `\n` | New line |
| `\t` | Tab |
| `\"` | A double quote inside double quotes |

```python
print("Line one\nLine two")
```

```output
Line one
Line two
```

# Exercises
?? What does `"ab" + "cd" + "ab"` give?
=> `"abcdab"`.

?? Write an f-string that shows "Total: ₦4,500" from `total = 4500`.
=> `f"Total: ₦{total:,}"`.

?? After `s = "  hi  "`, then `s.strip()`, what's in `s`?
=> Still `"  hi  "`. The method returned a new string, which wasn't stored.

# Practice
Tidy real-looking data: a name typed carelessly into a form.

1. In the box, `first` and `last` hold the parts of a name typed with extra spaces and mixed case. Set `clean_first` and `clean_last` to each part with the spaces removed and the first letter a capital. Strings have a `.title()` method for that.
2. Set `full` to the two clean parts joined with one space.
3. Set `message` to an f-string such as `"Welcome, Ada Okafor (10 characters)"`, using `len`.
4. Predict the output, run, and press **Test my code**.

Write what each variable holds.

# Starter
```python
first = "   ada "
last = " OKAFOR  "

# Replace the "" with your code
clean_first = ""
clean_last = ""
full = ""
message = ""

print(message)
```

# Tests
```python
assert clean_first == "Ada", "clean_first should be 'Ada'"
assert clean_last == "Okafor", "clean_last should be 'Okafor'"
assert full == "Ada Okafor", "full should be 'Ada Okafor'"
assert message == "Welcome, Ada Okafor (10 characters)", "message should be 'Welcome, Ada Okafor (10 characters)'"
```

# Solution
```python
first = "   ada "
last = " OKAFOR  "

clean_first = first.strip().title()
clean_last = last.strip().title()
full = clean_first + " " + clean_last
message = f"Welcome, {full} ({len(full)} characters)"

print(message)
```

# Rubric
- I cleaned the text with string methods, and stored each result.
- I built the message with an f-string.
- My code passes the test.

# Summary
- A string is text in quotes. `"123"` is text, not a number.
- `+` joins strings. Add spaces yourself.
- f-strings put values into text: `f"{name} scored {mark}"`.
- Methods such as `.strip()` and `.upper()` return a new string. Store it to keep it.
- `len` counts the characters, and `\n` makes a new line.

# Check
Q: What does `print("Ada" + "Okafor")` show?
P: Strings
* AdaOkafor
- Ada Okafor
- An error
= `+` joins exactly what it's given, with no space.

Q: What does `print("ab" * 3)` show?
P: Strings
A: ababab
= `*` repeats a string.

Q: Which line prints `Age: 21` without an error?
P: f-strings
- `print("Age: " + 21)`
* `print(f"Age: {21}")`
- `print("Age: {21}")`
= f-strings put values into text. Without the f, the brackets are printed as they are.

Q: What does `f"{2/3:.2f}"` give?
P: f-strings
A: 0.67
= `.2f` shows two decimal places.

Q: After `name = " Ada "`, then `name.strip()`, what's in `name`?
P: String methods
* `" Ada "`, still with its spaces
- `"Ada"`, with the spaces removed
- An empty string, with nothing in it
= Methods return a new string. The original is unchanged unless you store the result.

Q: What does `"stats".upper()` give?
P: String methods
- "Stats", with a capital first letter
* "STATS", with every letter a capital
- "stats", unchanged
= `.upper()` turns every letter into a capital.

Q: What does `len("Hi there")` give?
P: Length and special characters
A: 8
= It counts every character, including the space.

Q: What does `\n` do inside a string?
P: Length and special characters
- It prints the letter n after a backslash
* It starts a new line
- It removes the next character in the string
= `\n` is the escape code for a new line.

Q[transfer]: A form's rule is to ignore case and surrounding spaces. It receives "Ada@Mail.com " and "ada@mail.com". How should the program compare them?
P: String methods
* Strip the spaces and turn both into lower case before comparing
- Compare them exactly as they were typed, character by character
- Count their lengths, and treat equal lengths as a match
= Tidying with `.strip().lower()` lets the same address match.

Q[transfer]: A security log line reads "FAILED login from 10.0.0.5". How could a program check whether it's a failure?
P: String methods
- Check whether the line's length is more than 20 characters
* Check whether the line starts with "FAILED"
- Turn the whole line into capitals, then print it
= `.startswith("FAILED")` tests exactly that.

Q[transfer]: A report needs to show ₦1500000 as ₦1,500,000. Which code does it?
P: f-strings
- `f"₦{1500000:.2f}"`
* `f"₦{1500000:,}"`
- `"₦" + 1500000`
= `,` adds thousands separators. The last one is a TypeError.

# Cards
What is a string? :: A piece of text, inside quotes.
How do you put a variable into text? :: With an f-string: `f"Hello {name}"`.
Does `.strip()` change the original string? :: No. It returns a new string, which you must store.
What does `len` give for a string? :: The number of characters, including spaces.
How do you show a number with commas? :: `f"{n:,}"`.

# Further
- Python for Everybody, Chapter 6 :: https://www.py4e.com/html3/06-strings
- The Python Tutorial, text :: https://docs.python.org/3/tutorial/introduction.html
