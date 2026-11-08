---
id: p1-write-files
pack: Programming 1 · Files and errors
title: Writing files
minutes: 40
source: The Python Tutorial · Reading and writing files
url: https://docs.python.org/3/tutorial/inputoutput.html
courses: Supports any first programming course
format: 2
python: yes
teaches: write-mode; append-mode; write-method; save-results; file-modes
uses: open-file; with-statement; read-lines; f-strings; for-loop; list-literal
---
# Goal
Save your program's results to a text file, choose between replacing a file and adding to it, and write data in a layout that you or another program can read back later.

# Why
A program that only prints loses its results the moment the window closes. Writing to a file keeps them: a report you can hand in, a log of what happened, results another program will read. It's also how programs talk to each other: one writes a file, and another reads it. Writing carelessly can destroy data, though, so knowing exactly what each file mode does matters.

# Warm-up
?? What does a `with open(...) as f:` block do when it ends?
=> It closes the file automatically.

?? What does `f"{2/3:.2f}"` give?
=> `"0.67"`.

# Lesson
## Write mode
To write, open the file with a **mode**. Mode `"w"` means write: it creates the file if it doesn't exist, and **empties it first** if it does. Then `f.write(text)` adds text.

```python
with open("report.txt", "w") as f:
    f.write("Weekly report\n")
    f.write("Total: 4500\n")

with open("report.txt") as f:
    print(f.read())
```

```output
Weekly report
Total: 4500

```

Two things to notice. `write` doesn't add a line ending, unlike `print`, so you add `\n` yourself. And `write` only takes a string: `f.write(4500)` is a TypeError. Convert numbers first, which an f-string does neatly: `f.write(f"Total: {total}\n")`.

> Mistake: Opening an important file with `"w"` by accident. Mode `"w"` empties the file the moment it opens, before you write anything, and there's no undo. Double-check the mode and filename before running code that writes.

## Append mode
Mode `"a"` means append: it adds to the end of the file, and keeps what's already there. It also creates the file if it doesn't exist.

```python
with open("log.txt", "w") as f:
    f.write("Monday: 2 hours\n")

with open("log.txt", "a") as f:
    f.write("Tuesday: 1 hour\n")

with open("log.txt") as f:
    print(f.read())
```

```output
Monday: 2 hours
Tuesday: 1 hour

```

| Mode | Meaning | If the file exists | If it doesn't |
| --- | --- | --- | --- |
| `"r"` | Read (the default) | Reads it | FileNotFoundError |
| `"w"` | Write | Empties it first | Creates it |
| `"a"` | Append | Adds to the end | Creates it |
| `"x"` | Create | FileExistsError | Creates it |

Data written to a file isn't always saved to the disk the instant you call `write`. Python collects it and saves it in larger pieces, which is faster. Closing the file makes sure everything is saved, which is one more reason to use `with`: when the block ends, the file is closed, and every line you wrote is really in it.

Choose by what should happen to old contents. A report you rebuild each time suits `"w"`. A log that grows over time suits `"a"`. Mode `"x"` is the safe choice when you must never overwrite something by accident: it refuses if the file already exists.

## Writing many lines
To save a list of results, loop and write one line each:

```python
marks = {"COS 102": 72, "STA 111": 65, "MTH 101": 58}
with open("marks.csv", "w") as f:
    f.write("course,mark\n")
    for course, mark in marks.items():
        f.write(f"{course},{mark}\n")

with open("marks.csv") as f:
    print(f.read())
```

```output
course,mark
COS 102,72
STA 111,65
MTH 101,58

```

This writes a header line and then one record per line, with a comma between fields. That's a CSV file, the most common format for sharing tables. You'll learn the proper tools for CSV in the next lesson. A file written this way can be opened in a spreadsheet, or read back by your own program with the methods from the last lesson.

`"\n".join(lines)` is another way to write many lines at once, when you already have a list of strings: `f.write("\n".join(lines) + "\n")`.

### print to a file
`print` can also write to a file, using its `file` option. It adds the spaces and line ending for you:

```python
with open("summary.txt", "w") as f:
    print("Total:", 4500, file=f)
    print("Days:", 7, file=f)

with open("summary.txt") as f:
    print(f.read())
```

```output
Total: 4500
Days: 7

```

## Write so it can be read back
A file is only useful if it can be read back correctly. Some habits help:

- **One record per line**, with the same fields in the same order every time.
- **A header line** naming the fields.
- **A separator that doesn't appear in the data.** A comma is a problem if a field can contain a comma, such as "Port Harcourt, Rivers". The next lesson's `csv` module handles that safely.
- **Plain numbers**, without currency signs or thousand separators, so they convert back easily. Format for people only in reports, not in data files.
- **UTF-8 encoding**, written explicitly with `encoding="utf-8"`.

The test of a good data file is simple: can your reading code from the last lesson turn it back into exactly the data you started with?

# Exercises
?? What happens to a file's old contents when you open it with `"w"`?
=> They're erased immediately, even before you write anything.

?? Why does `f.write(42)` fail, and how do you fix it?
=> `write` only takes strings. Use `f.write(str(42))` or an f-string.

?? You add one line per day to a study log. Which mode?
=> Append, `"a"`, so earlier days are kept.

# Practice
Save a real weekly summary to a file, then check it by reading it back.

1. In the box, `spending` holds a dictionary of day to amount. Change it to real or likely amounts.
2. Write `week.csv` with a header line `day,amount`, then one line per day, using plain numbers.
3. Append one more line, `total,` followed by the week's total, using append mode.
4. Read the file back into `lines`, a list of lines without line endings.
5. Predict the file's contents, run, and press **Test my code**.

Write what your file contained.

# Starter
```python
spending = {"Mon": 1500, "Tue": 800, "Wed": 2500}

# Write week.csv here, then append the total line

lines = []
# Read week.csv back into lines, without line endings

print(lines)
```

# Tests
```python
want = ["day,amount"] + [f"{d},{a}" for d, a in spending.items()] + [f"total,{sum(spending.values())}"]
with open("week.csv") as check:
    assert check.read().splitlines() == want, "week.csv should have the header, one line per day, then the total line"
assert lines == want, "lines should be the file's lines, without line endings"
```

# Solution
```python
spending = {"Mon": 1500, "Tue": 800, "Wed": 2500}

with open("week.csv", "w", encoding="utf-8") as f:
    f.write("day,amount\n")
    for day, amount in spending.items():
        f.write(f"{day},{amount}\n")

with open("week.csv", "a", encoding="utf-8") as f:
    f.write(f"total,{sum(spending.values())}\n")

with open("week.csv", encoding="utf-8") as f:
    lines = f.read().splitlines()

print(lines)
```

# Rubric
- I used write mode for the data and append mode for the total.
- My file has a header and plain numbers, one record per line.
- I read the file back to check it, and my code passes the test.

# Summary
- Mode `"w"` creates or empties a file, then writes. There's no undo.
- Mode `"a"` adds to the end. Mode `"x"` refuses to overwrite.
- `write` takes strings only and adds no line ending.
- `print(..., file=f)` writes with spaces and a line ending.
- Write one record per line, with a header, plain numbers and UTF-8, so it reads back exactly.

# Check
Q: What does mode `"w"` do to an existing file?
P: Write mode
* Empties it as soon as it opens
- Adds new text at the end of it
- Refuses to open it, with an error
= Write mode erases the old contents first.

Q: What does mode `"a"` do?
P: Append mode
- Erases the file, then writes at the start
* Adds to the end, keeping what's there
- Reads the file without changing it
= Append keeps the old contents.

Q: Which mode refuses to overwrite an existing file?
P: Append mode
- `"w"`
- `"a"`
* `"x"`
= x raises FileExistsError if the file exists.

Q: What does `f.write("a")` followed by `f.write("b")` put in the file?
P: Write mode
A: ab
= write adds no line ending.

Q: Why does `f.write(100)` fail?
P: Write mode
* write only accepts strings
- 100 is too large to store in a file
- Numbers must be written in append mode
= Convert numbers to text first.

Q: What does `print("x", 5, file=f)` write?
P: Writing many lines
A: x 5
= print adds a space between items and a line ending.

Q: Why avoid writing "₦4,500" in a data file?
P: Write so it can be read back
* The sign and comma make it hard to convert back to a number
- Files can't store the naira sign in any encoding
- Spreadsheets refuse to open files with commas
= Keep data plain. Format for people only in reports.

Q: How do you test whether a data file is well written?
P: Write so it can be read back
* Read it back and check you get exactly the starting data
- Check that the file is as small as possible
- Open it and check that it looks neat to a person
= A data file is good if it reads back correctly.

Q[transfer]: A program must keep a running record of every login, never losing earlier entries. Which mode?
P: Append mode
* Append, `"a"`
- Write, `"w"`
- Read, `"r"`
= Append adds to the end without erasing.

Q[transfer]: A script rebuilds a daily report file from scratch each morning. Which mode fits?
P: Write mode
* Write, `"w"`, since the old report should be replaced
- Append, `"a"`, so that every old report is kept in one file
- Create, `"x"`, which will fail from the second morning onwards
= w replaces the report each time.

Q[transfer]: A statistics file stores towns with commas, such as "Port Harcourt, Rivers", in comma-separated lines. What goes wrong when reading it back?
P: Write so it can be read back
* The comma inside the town splits it into two fields
- The file can't be opened by any program at all
- The numbers in the file all become zero
= Use the csv module, which quotes such fields.

# Cards
What does mode "w" do? :: Creates the file, or empties it first, then writes.
What does mode "a" do? :: Adds to the end of the file, keeping its contents.
What does write accept? :: Strings only, with no line ending added.
How can print write to a file? :: `print(..., file=f)`.
What makes a good data file? :: One record per line, a header, plain numbers, UTF-8, and it reads back exactly.

# Further
- The Python Tutorial, reading and writing files :: https://docs.python.org/3/tutorial/inputoutput.html
- Python for Everybody, Chapter 7 :: https://www.py4e.com/html3/07-files
