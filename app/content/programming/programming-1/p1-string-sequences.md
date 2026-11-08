---
id: p1-string-sequences
pack: Programming 1 · Collections
title: Strings as sequences
minutes: 40
source: Python for Everybody · Chapter 6
url: https://www.py4e.com/html3/06-strings
courses: Supports any first programming course
format: 2
python: yes
teaches: string-indexing; string-slicing; strings-immutable; split-join; find-and-count
uses: indexing; slicing; negative-index; string-methods; for-loop; list-literal
---
# Goal
Treat a string as a sequence of characters: reach any character by its index, take slices, split text into a list of words and join words back into text, and know why a string can't be changed in place.

# Why
A great deal of real data arrives as text: a line from a file, a name typed into a form, a date like "2026-11-06", a line in a security log. To use it, you need to pull pieces out of it, split it into parts, and put parts back together. Because a string is a sequence, almost everything you learned about lists, indexes, slices, loops and `in`, works on text too.

# Warm-up
?? What does `[10, 20, 30, 40][1:3]` give?
=> `[20, 30]`.

?? What does `"  ada ".strip()` give?
=> `"ada"`.

# Lesson
## Characters have positions
A string is an ordered sequence of characters, so each character has an index, starting at 0, exactly as in a list.

```python
code = "STA 111"
print(code[0])
print(code[-1])
print(len(code))
```

```output
S
1
7
```

The space counts as a character too, at index 3. Negative indexes count from the end, as with lists, and asking for an index past the end causes an IndexError.

## Slices of text
Slicing works on strings exactly as on lists: `text[start:stop]`, with the stop left out.

```python
date = "2026-11-06"
year = date[0:4]
month = date[5:7]
day = date[8:]
print(year, month, day)
```

```output
2026 11 06
```

This is a common real task: pulling the parts out of text with a fixed layout. Every date written this way has the year in positions 0 to 3, the month in 5 and 6, and the day in 8 and 9, so the same slices work for any date in that form. The pieces are still strings. Convert them with `int` if you need to do arithmetic, as in `int(month)`.

## Strings can't be changed in place
Unlike lists, strings are **immutable**: once made, they can't be changed. Assigning to one character fails:

```python
name = "ada"
name[0] = "A"
```

```output
Traceback (most recent call last):
  File "<string>", line 2, in <module>
TypeError: 'str' object does not support item assignment
```

To "change" a string, you build a new one and store it, for example with a slice and `+`: `name = "A" + name[1:]` gives `"Ada"`. That's also why string methods such as `.upper()` and `.replace()` always return a **new** string rather than changing the old one. Lists, by contrast, are **mutable**, so list methods like `.append()` change the list itself.

| | Strings | Lists |
| --- | --- | --- |
| Index and slice | Yes | Yes |
| Loop over | Yes, by character | Yes, by item |
| `in`, `len` | Yes | Yes |
| Change in place | No: build a new one | Yes |

> Mistake: Calling a string method and expecting the original to change. `name.upper()` on its own does nothing lasting. Write `name = name.upper()` to keep the result.

## Splitting and joining
`split` breaks a string into a list of pieces. With no argument, it splits on any spaces, and ignores extra ones. With an argument, it splits on that exact text.

```python
sentence = "learn   python   step by step"
words = sentence.split()
print(words)
print(len(words), "words")

row = "Ada,72,COS 102"
parts = row.split(",")
print(parts)
```

```output
['learn', 'python', 'step', 'by', 'step']
5 words
['Ada', '72', 'COS 102']
```

Splitting on a comma is how you read one line of a CSV file, a format you'll meet in the next unit. Each piece is a string, so `parts[1]` is the text `"72"`, not the number 72.

`join` does the opposite: it glues a list of strings into one string, with the string you call it on placed between each piece.

```python
words = ["Computer", "with", "Statistics"]
print(" ".join(words))
print("-".join(["2026", "11", "06"]))
```

```output
Computer with Statistics
2026-11-06
```

The syntax looks backwards at first: the separator comes first, then `.join`, then the list. Read `" ".join(words)` as "join the words with a space between them". Every item in the list must be a string, or join fails.

## Searching inside text
Strings have methods for finding things inside them:

| Method | Gives | Example | Result |
| --- | --- | --- | --- |
| `x in text` | True or False | `"@" in "a@b.com"` | `True` |
| `.find(x)` | Index of the first x, or -1 | `"a@b.com".find("@")` | `1` |
| `.count(x)` | How many times x appears | `"banana".count("a")` | `3` |
| `.startswith(x)` | True or False | `"CSC183".startswith("CSC")` | `True` |

`.find` returns -1, rather than causing an error, when the text isn't there. That makes it safe for checking and then slicing:

```python
email = "ada@mail.com"
at = email.find("@")
print(email[:at])
print(email[at + 1:])
```

```output
ada
mail.com
```

This splits an email address into the part before the @ and the domain after it, by finding the @ and slicing either side of it.

### Looping over characters
A for loop over a string gives one character at a time, which is how you check every character:

```python
password = "Study2026"
digits = 0
for ch in password:
    if ch.isdigit():
        digits += 1
print(digits, "digits")
```

```output
4 digits
```

`.isdigit()` is True for the characters 0 to 9. Strings also have `.isalpha()` for letters and `.isupper()` for capitals, which are useful when checking passwords or typed codes.

# Exercises
?? In `s = "Python"`, what are `s[0]`, `s[-1]` and `s[1:4]`?
=> `"P"`, `"n"` and `"yth"`.

?? What does `"a,b,,c".split(",")` give?
=> `['a', 'b', '', 'c']`. The empty piece between the two commas is kept.

?? How do you turn `["Ada", "Okafor"]` into `"Ada Okafor"`?
=> `" ".join(["Ada", "Okafor"])`.

# Practice
Pull apart real-looking text records.

1. In the box, `record` holds one line in the form `name,course,mark`. Split it into its three parts.
2. Set `name` to the name, `course` to the course code, and `mark` to the mark as an int.
3. Set `dept` to the letters at the start of the course code, before the space, using `.find` or `.split`.
4. Set `label` to the three parts joined with `" | "`, such as `"Ada | COS 102 | 72"`.
5. Predict, run, and press **Test my code**. Then try another record in the same layout.

Write which method you used for `dept`, and why.

# Starter
```python
record = "Ada,COS 102,72"

name = ""
course = ""
mark = 0
dept = ""
label = ""

print(name, course, mark, dept)
print(label)
```

# Tests
```python
p = record.split(",")
assert name == p[0] and course == p[1], "name and course should come from splitting the record on commas"
assert mark == int(p[2]) and isinstance(mark, int), "mark should be the third part, converted to an int"
assert dept == p[1].split()[0], "dept should be the letters before the space in the course code"
assert label == " | ".join(p), "label should be the three parts joined with ' | '"
```

# Solution
```python
record = "Ada,COS 102,72"

parts = record.split(",")
name = parts[0]
course = parts[1]
mark = int(parts[2])
dept = course.split()[0]
label = " | ".join(parts)

print(name, course, mark, dept)
print(label)
```

# Rubric
- I split the record, and converted the mark to a number.
- I took the department from the course code without typing it in by hand.
- My code passes the test with more than one record.

# Summary
- A string is a sequence: index it from 0, slice it, loop over it.
- Strings are immutable. Build a new string and store it to "change" one.
- `split` turns text into a list of pieces. `sep.join(list)` glues them back.
- `.find` gives an index or -1. `in`, `.count` and `.startswith` search too.
- Pieces from split are strings. Convert them before doing arithmetic.

# Check
Q: What does `"COMPUTER"[3]` give?
P: Characters have positions
A: P
= Counting from 0: C is 0, O is 1, M is 2, and P is 3.

Q: What does `"Python"[-1]` give?
P: Characters have positions
A: n
= -1 is the last character.

Q: What does `"2026-11-06"[5:7]` give?
P: Slices of text
A: 11
= Positions 5 and 6 hold the month.

Q: What happens with `name = "ada"`, then `name[0] = "A"`?
P: Strings can't be changed in place
* A TypeError, because strings can't be changed in place
- name becomes "Ada", with a capital letter
- Nothing happens, and name stays exactly the same
= Strings are immutable. Build a new string instead.

Q: What does `"a b  c".split()` give?
P: Splitting and joining
A: ['a', 'b', 'c'] | a, b, c
= With no argument, split ignores extra spaces.

Q: What does `"-".join(["x", "y", "z"])` give?
P: Splitting and joining
A: x-y-z
= The separator goes between each piece.

Q: What does `"hello".find("z")` give?
P: Searching inside text
A: -1
= find gives -1 when the text isn't there.

Q: What's the type of `"Ada,72".split(",")[1]`?
P: Splitting and joining
- int
* str
- list
= Every piece from split is a string.

Q[transfer]: A log line reads `"2026-11-06 10:42 FAILED admin"`. How do you get the username?
P: Splitting and joining
* `line.split()[-1]`
- `line[0:4]`
- `line.find("admin")`
= Split on spaces, and the username is the last piece. find gives a position, not the name.

Q[transfer]: A form receives emails, and you need the domain after the @. Which is safest?
P: Searching inside text
* Find the @, check it's not -1, then slice after it
- Always take the last eight characters of the address
- Split on full stops, and take the first piece
= Finding the @ works for any length of address.

Q[transfer]: A statistics file has lines like `"Lagos,15388000"`. How do you get the population as a number?
P: Splitting and joining
* `int(line.split(",")[1])`
- `line.split(",")[1] + 0`
- `int(line)`
= Split, take the second piece, and convert it.

# Cards
Can you index and slice a string? :: Yes, exactly as a list, from index 0.
What does immutable mean for strings? :: They can't be changed in place. You build a new one.
What does split do? :: Turns a string into a list of pieces.
How do you join a list of strings with spaces? :: `" ".join(words)`.
What does find give when the text isn't there? :: -1.

# Further
- Python for Everybody, Chapter 6 :: https://www.py4e.com/html3/06-strings
- The Python Tutorial, text :: https://docs.python.org/3/tutorial/introduction.html
