---
id: p1-read-files
pack: Programming 1 · Files and errors
title: Reading files
minutes: 40
source: Python for Everybody · Chapter 7
url: https://www.py4e.com/html3/07-files
courses: Supports any first programming course
format: 2
python: yes
teaches: open-file; with-statement; read-lines; strip-newlines; file-path-basics
uses: for-loop; string-methods; split-join; list-literal; accumulator-pattern; files
---
# Goal
Open a text file, read it all at once or line by line, remove the line endings, and turn each line into data your program can use.

# Why
Every program so far has lost its data when it finished. Real data lives in files: marks exported from a portal, readings from a sensor, lines in a server log. Reading files lets one program work through thousands of records that nobody would type in by hand. It's also how almost every statistics and security task begins: open the data, and read it.

# Warm-up
?? What does `"Ada,72".split(",")` give?
=> `['Ada', '72']`.

?? What is a file path?
=> The location of a file, written as the folders that lead to it, ending in the file's name.

# Lesson
## Opening a file
`open` connects your program to a file and gives you a **file object** to read from. The safest way to use it is inside a `with` block, which closes the file automatically when the block ends, even if something goes wrong part-way.

The lesson boxes in 4YOS have their own small, private file area, separate from your real files. So each example first writes a small file, then reads it. Writing is the next lesson. For now, read the first few lines of each box as "set up a file to read".

```python
with open("marks.txt", "w") as f:
    f.write("72\n65\n80\n")

with open("marks.txt") as f:
    text = f.read()
print(text)
```

```output
72
65
80

```

`f.read()` gives the whole file as one string. The `\n` characters are the line endings, which is why each number appears on its own line. The extra blank line at the end comes from the final `\n` plus the line `print` adds.

The filename `"marks.txt"` here is a **relative path**: Python looks for it in the program's current folder. A full path such as `C:/Users/Ada/Documents/marks.txt` names the exact location. Forward slashes work in Python on Windows too, and avoid the trouble backslashes cause inside strings.

## Reading line by line
For most data, you want one line at a time. Looping over a file object gives each line in turn, including its line ending:

```python
with open("marks.txt", "w") as f:
    f.write("72\n65\n80\n")

total = 0
with open("marks.txt") as f:
    for line in f:
        total += int(line.strip())
print("Total:", total)
```

```output
Total: 217
```

`line.strip()` removes the `\n` at the end, and any stray spaces. Then `int` converts the text to a number. This loop is the accumulator pattern from the Loops unit, with a file as the source of items instead of a list.

Reading line by line also matters for large files. A log file can be bigger than the computer's memory. Looping reads one line, processes it, and moves on, so it can work through a file of any size.

> Mistake: Forgetting the `\n` at the end of each line. `int("72\n")` happens to work, because `int` ignores spaces and line endings, but comparing text doesn't: `"Ada\n" == "Ada"` is False. Strip each line before using it.

## Lines into data
Most data files have one record per line, with fields separated by a character such as a comma. Strip, split, and convert:

```python
with open("results.txt", "w") as f:
    f.write("Ada,72\nTunde,58\nNgozi,81\n")

with open("results.txt") as f:
    for line in f:
        name, mark = line.strip().split(",")
        mark = int(mark)
        if mark >= 70:
            print(name, mark)
```

```output
Ada 72
Ngozi 81
```

Each line becomes two strings, which are unpacked into `name` and `mark`, and then the mark is converted to a number. The threshold of 70 is just an example.

### Blank lines and headers
Real files often have a header line naming the columns, and blank lines at the end. Skip them on purpose:

```python
with open("results.txt", "w") as f:
    f.write("name,mark\nAda,72\n\nTunde,58\n")

with open("results.txt") as f:
    next(f)
    for line in f:
        line = line.strip()
        if not line:
            continue
        print(line.split(","))
```

```output
['Ada', '72']
['Tunde', '58']
```

`next(f)` reads and throws away one line, the header. `continue` skips straight to the next round of the loop, so the blank line is ignored. The `if not line` check uses truthiness: an empty string is falsy.

## Other ways to read
| Code | Gives |
| --- | --- |
| `f.read()` | The whole file as one string |
| `for line in f:` | One line at a time, with its `\n` |
| `f.readlines()` | A list of every line, each with its `\n` |
| `f.read().splitlines()` | A list of every line, without line endings |

`f.read().splitlines()` is convenient for small files. For large files, prefer the loop.

### Text encoding
Text files store characters as bytes, using an **encoding**. The common one today is UTF-8, which can store ₦, accented letters and any language. If a file shows strange characters when read, it may use a different encoding. You can say which with `open("file.txt", encoding="utf-8")`. Writing the encoding explicitly is a good habit, because the default can differ between computers.

# Exercises
?? Why use `with open(...) as f:` instead of plain `open`?
=> The `with` block closes the file automatically when it ends, even after an error.

?? A line is read as `"Tunde,58\n"`. How do you get the number 58?
=> `int(line.strip().split(",")[1])`.

?? How do you skip a header line before a loop over a file?
=> Call `next(f)` once before the loop.

# Practice
Read a real-shaped data file and summarise it.

1. In the box, the first lines create `fares.txt`, with a header and one fare per line. Change the fares to real or likely ones.
2. Read the file, skip the header, and ignore blank lines.
3. Set `fares` to a list of the fares as whole numbers, and `total` to their sum.
4. Set `count` to the number of fares, and `average` to the average rounded to 1 place.
5. Predict, run, and press **Test my code**.

Write your four results.

# Starter
```python
with open("fares.txt", "w") as f:
    f.write("fare\n300\n500\n\n200\n350\n")

fares = []
# Read fares.txt here: skip the header, ignore blank lines, convert each fare

total = 0
count = 0
average = 0

print(fares, total, count, average)
```

# Tests
```python
with open("fares.txt") as check:
    rows = [int(x) for x in check.read().splitlines()[1:] if x.strip()]
assert fares == rows, "fares should be every number in the file, in order, as ints"
assert total == sum(rows), "total should be the sum of the fares"
assert count == len(rows), "count should be how many fares there are"
assert average == round(sum(rows) / len(rows), 1), "average should be rounded to 1 place"
```

# Solution
```python
with open("fares.txt", "w") as f:
    f.write("fare\n300\n500\n\n200\n350\n")

fares = []
with open("fares.txt") as f:
    next(f)
    for line in f:
        line = line.strip()
        if not line:
            continue
        fares.append(int(line))

total = sum(fares)
count = len(fares)
average = round(total / count, 1)

print(fares, total, count, average)
```

# Rubric
- I opened the file with `with`, and stripped each line before using it.
- I skipped the header and the blank line on purpose.
- My code passes the test.

# Summary
- `with open(name) as f:` opens a file, and closes it when the block ends.
- `f.read()` gives the whole file. `for line in f:` gives one line at a time.
- Each line ends with `\n`. Strip it before comparing or splitting.
- Strip, split, convert: that turns each line into data.
- Skip headers with `next(f)` and blank lines with `continue`. Say the encoding.

# Check
Q: What does a `with open(...) as f:` block do when it ends?
P: Opening a file
* It closes the file automatically
- It deletes the file from the folder
- It reads the whole file again from the start
= with closes the file, even if an error happened.

Q: A file holds the lines 4, 9 and 2. A loop adds `int(line.strip())` for each. What's the total?
P: Reading line by line
A: 15
= 4 + 9 + 2 = 15.

Q: What does `"Ada\n" == "Ada"` give?
P: Reading line by line
- True
* False
- An error
= The line ending makes them different. Strip first.

Q: Why read a very large log file line by line?
P: Reading line by line
* It processes one line at a time, so the file never has to fit in memory
- Because `f.read()` refuses to open any file larger than one megabyte
- Because looping over a file sorts its lines alphabetically first
= Looping works for files of any size.

Q: A line reads `"Ngozi,81\n"`. Which code gives the number 81?
P: Lines into data
- `int(line[1])`
* `int(line.strip().split(",")[1])`
- `line.split(",")[1] + 0`
= Strip, split, take the second piece, convert.

Q: What does `next(f)` do before a loop over a file?
P: Lines into data
* Reads and skips one line, such as a header
- Jumps to the last line of the file
- Closes the file and opens the next one
= The loop then starts from the second line.

Q: What does `continue` do inside a loop?
P: Lines into data
- Ends the loop straight away
* Skips to the next round of the loop
- Restarts the loop from the first item
= The rest of the block is skipped for this item only.

Q: Which gives a list of lines without their line endings?
P: Other ways to read
- `f.readlines()`
* `f.read().splitlines()`
- `f.read()`
= splitlines removes the endings. readlines keeps them.

Q[transfer]: A security analyst must count lines containing "FAILED" in a 2 GB log. Which approach fits?
P: Reading line by line
* Loop over the file line by line, adding 1 when "FAILED" is in the line
- Read the whole file into one string, then count the word
- Open the file in a word processor, and search by hand
= Line by line handles a file larger than memory.

Q[transfer]: A statistics file's first line is "town,population". A program crashes converting "population" to an int. What's the fix?
P: Lines into data
* Skip the header line before converting
- Delete the whole file and type the numbers in again
- Use `float` instead of `int` for every line
= The header isn't data, so skip it.

Q[transfer]: A data file shows "â‚¦" where ₦ should be. What's the likely cause?
P: Other ways to read
* The file was read with a different encoding from the one it was written in
- The naira sign can't be stored in any kind of file
- The file is too large for Python to read correctly
= Say the encoding, usually `encoding="utf-8"`.

# Cards
How do you open a file safely? :: `with open(name) as f:`, which closes it when the block ends.
How do you read a file line by line? :: `for line in f:`.
Why strip each line? :: It ends with `\n`, which breaks comparisons and splitting.
How do you skip a header line? :: `next(f)` before the loop.
What does `continue` do? :: Skips to the next round of the loop.

# Further
- Python for Everybody, Chapter 7 :: https://www.py4e.com/html3/07-files
- The Python Tutorial, reading and writing files :: https://docs.python.org/3/tutorial/inputoutput.html
