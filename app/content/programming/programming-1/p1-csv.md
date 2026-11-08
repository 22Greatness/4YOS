---
id: p1-csv
pack: Programming 1 · Files and errors
title: CSV data
minutes: 45
source: Python documentation · csv module
url: https://docs.python.org/3/library/csv.html
courses: Supports any first programming course
format: 2
python: yes
teaches: csv-format; csv-reader; csv-dictreader; csv-writer; quoted-fields
uses: open-file; with-statement; write-mode; list-of-dicts; type-function; grouping-pattern
---
# Goal
Read and write CSV files with Python's `csv` module, get each row as a list or a dictionary, handle fields that contain commas, and convert the text values into numbers.

# Why
CSV, short for comma-separated values, is the most common way tables are shared: exports from school portals, data from the National Bureau of Statistics, downloads from a bank, a spreadsheet saved for another program. You've already split lines on commas by hand, which works until a field contains a comma itself. The `csv` module handles every awkward case correctly, and gives you rows in exactly the list-of-dictionaries shape from the Collections unit.

# Warm-up
?? What shape is a table in code, with named columns?
=> A list of dictionaries: each dictionary a row, each key a column.

?? What goes wrong if a field such as "Port Harcourt, Rivers" is split on commas?
=> The comma inside it splits it into two fields.

# Lesson
## What a CSV file looks like
A CSV file is plain text. Each line is one row, and commas separate the fields. The first line is usually a header naming the columns:

```text
town,state,population
Aba,Abia,534265
"Port Harcourt, city",Rivers,1865000
```

The second data row has a comma inside its first field, so that field is wrapped in double quotes. The quotes tell a CSV reader "this comma is part of the value, not a separator". Splitting on commas by hand would break this row into four pieces. The `csv` module reads it correctly as three. The population figures here are illustrative only.

## Reading rows as lists
`csv.reader` turns each line into a list of strings, dealing with quotes for you. Pass it an open file, and open CSV files with `newline=""`, which the module's documentation recommends so that line endings inside quoted fields are handled correctly.

```python
import csv

with open("towns.csv", "w", newline="") as f:
    f.write('town,state,population\nAba,Abia,534265\n"Port Harcourt, city",Rivers,1865000\n')

with open("towns.csv", newline="") as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        print(row)
print(header)
```

```output
['Aba', 'Abia', '534265']
['Port Harcourt, city', 'Rivers', '1865000']
['town', 'state', 'population']
```

`import csv` loads the module, which you'll learn about properly in the Modules lesson. `next(reader)` takes the header row, just as `next(f)` skipped a line in a plain file. Notice that every value is a **string**, including the populations. CSV has no types: it's all text.

## Reading rows as dictionaries
`csv.DictReader` uses the header line as keys, and gives each row as a dictionary. This is usually clearer, because you read fields by name instead of by position:

```python
import csv

with open("towns.csv", "w", newline="") as f:
    f.write('town,state,population\nAba,Abia,534265\n"Port Harcourt, city",Rivers,1865000\n')

total = 0
with open("towns.csv", newline="") as f:
    for row in csv.DictReader(f):
        total += int(row["population"])
        print(row["town"], "in", row["state"])
print("Total:", total)
```

```output
Aba in Abia
Port Harcourt, city in Rivers
Total: 2399265
```

`row["population"]` is still text, so `int` converts it before adding. Reading by name also means your code keeps working if someone adds a column or changes the column order, which positions can't survive.

> Mistake: Forgetting that CSV values are strings. `row["mark"] > 50` compares text with a number, which is a TypeError. And `"9" > "50"` is True, because text compares character by character. Convert with `int` or `float` before comparing or calculating.

## Writing CSV
`csv.writer` writes rows from lists, adding quotes wherever a field needs them:

```python
import csv

rows = [["town", "state"], ["Aba", "Abia"], ["Port Harcourt, city", "Rivers"]]
with open("out.csv", "w", newline="") as f:
    csv.writer(f).writerows(rows)

with open("out.csv") as f:
    print(f.read())
```

```output
town,state
Aba,Abia
"Port Harcourt, city",Rivers

```

The writer added quotes around the field with a comma, and nowhere else. To look at a CSV file you've written, open it normally, without `newline=""`: the csv writer ends each line with the Windows-style `
`, and normal text mode turns that back into ordinary line endings. `writerow` writes one row, and `writerows` writes a list of rows. `csv.DictWriter` does the same from dictionaries, given the list of column names:

```python
import csv

records = [{"course": "COS 102", "mark": 72}, {"course": "STA 111", "mark": 65}]
with open("marks.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["course", "mark"])
    writer.writeheader()
    writer.writerows(records)

with open("marks.csv") as f:
    print(f.read())
```

```output
course,mark
COS 102,72
STA 111,65

```

## From CSV to answers
Real tasks combine everything: read the rows, convert the values, then use the patterns you already know.

### Worked example: average mark per course
```python
import csv

with open("results.csv", "w", newline="") as f:
    f.write("student,course,mark\nAda,COS 102,72\nTunde,COS 102,58\nAda,STA 111,65\nNgozi,STA 111,81\n")

by_course = {}
with open("results.csv", newline="") as f:
    for row in csv.DictReader(f):
        by_course.setdefault(row["course"], []).append(int(row["mark"]))

for course, marks in by_course.items():
    print(course, round(sum(marks) / len(marks), 1))
```

```output
COS 102 65.0
STA 111 73.0
```

`setdefault(key, [])` gives the list for that key, creating an empty one the first time. It's a short form of the grouping pattern from the last unit. Read, convert, group, summarise: that sequence is the start of almost every data analysis you'll do in statistics.

# Exercises
?? Why does `csv.reader` handle `"Port Harcourt, city"` correctly while `split(",")` doesn't?
=> The reader understands the quotes, which mark the comma as part of the value.

?? What type is every value read from a CSV file?
=> A string. Convert numbers with int or float.

?? Why is `DictReader` usually clearer than `reader`?
=> You read fields by column name, and the code survives added or reordered columns.

# Practice
Analyse a real-shaped CSV file.

1. In the box, the first lines create `trips.csv` with the columns `date`, `mode` and `fare`. Change the rows to real or likely trips.
2. Read it with `csv.DictReader`.
3. Set `total` to the sum of the fares, as a whole number.
4. Set `by_mode` to a dictionary of each mode's total fare.
5. Write `summary.csv` with a header `mode,total` and one row per mode, using `csv.writer`.
6. Predict, run, and press **Test my code**.

Write your totals per mode.

# Starter
```python
import csv

with open("trips.csv", "w", newline="") as f:
    f.write("date,mode,fare\n2026-11-02,bus,300\n2026-11-02,keke,200\n2026-11-03,bus,350\n2026-11-04,okada,500\n")

total = 0
by_mode = {}
# Read trips.csv with csv.DictReader here

# Write summary.csv here

print(total, by_mode)
```

# Tests
```python
import csv as _csv
with open("trips.csv", newline="") as check:
    rows = list(_csv.DictReader(check))
want = {}
for r in rows:
    want[r["mode"]] = want.get(r["mode"], 0) + int(r["fare"])
assert total == sum(int(r["fare"]) for r in rows), "total should be the sum of the fares, as a whole number"
assert by_mode == want, "by_mode should hold each mode's total fare"
with open("summary.csv", newline="") as check:
    out = list(_csv.reader(check))
assert out[0] == ["mode", "total"], "summary.csv should start with the header mode,total"
assert {m: int(t) for m, t in out[1:]} == want, "summary.csv should have one row per mode with its total"
```

# Solution
```python
import csv

with open("trips.csv", "w", newline="") as f:
    f.write("date,mode,fare\n2026-11-02,bus,300\n2026-11-02,keke,200\n2026-11-03,bus,350\n2026-11-04,okada,500\n")

total = 0
by_mode = {}
with open("trips.csv", newline="") as f:
    for row in csv.DictReader(f):
        fare = int(row["fare"])
        total += fare
        by_mode[row["mode"]] = by_mode.get(row["mode"], 0) + fare

with open("summary.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["mode", "total"])
    for mode, amount in by_mode.items():
        writer.writerow([mode, amount])

print(total, by_mode)
```

# Rubric
- I read the file with DictReader and converted fares to numbers.
- I grouped totals by mode, and wrote them with csv.writer.
- My code passes the test.

# Summary
- CSV is plain text: one row per line, commas between fields, a header first.
- Fields containing commas are quoted. The csv module handles this. Splitting by hand doesn't.
- `csv.reader` gives lists. `csv.DictReader` gives dictionaries keyed by the header.
- Every value is a string. Convert before comparing or calculating.
- `csv.writer` and `csv.DictWriter` write rows, quoting where needed. Open files with `newline=""`.

# Check
Q: In CSV, why is `"Port Harcourt, city"` wrapped in quotes?
P: What a CSV file looks like
* The comma inside is part of the value, not a separator
- Quotes mark the town as the most important field
- Every field in a CSV file must always be quoted
= Quotes protect commas inside values.

Q: What type is `row["population"]` from a DictReader?
P: Reading rows as dictionaries
- int
* str
- float
= Every CSV value is text until you convert it.

Q: What does `csv.reader` give for each line?
P: Reading rows as lists
* A list of strings
- A dictionary keyed by the header
- One single string with commas
= reader gives lists. DictReader gives dictionaries.

Q: How do you get the header row with `csv.reader`?
P: Reading rows as lists
* `next(reader)`
- `reader[0]`
- `reader.header()`
= next takes the first row.

Q: What does `"9" > "50"` give?
P: Reading rows as dictionaries
* True
- False
- An error
= Text compares character by character, and "9" comes after "5". Convert to numbers first.

Q: Why is reading by column name safer than by position?
P: Reading rows as dictionaries
* It keeps working if columns are added or reordered
- Column names make the file load much faster
- Positions can only be used with whole numbers
= Names don't shift when the layout changes.

Q: What does `csv.writer` do with a field that contains a comma?
P: Writing CSV
* Wraps it in quotes
- Removes the comma
- Raises an error
= The writer quotes only the fields that need it.

Q: Two rows read "COS 102,72" and "COS 102,58". Grouped by course, what's COS 102's average mark?
P: From CSV to answers
A: 65 | 65.0
= (72 + 58) / 2 = 65.

Q[transfer]: A bank statement downloads as CSV with amounts like "12500.00". A script sums them as text and gets "12500.003000.00". What's wrong?
P: Reading rows as dictionaries
* The amounts were joined as strings, not converted with float first
- The bank's file is damaged and must be downloaded again
- CSV files can't hold amounts with decimal points
= Convert each value before adding.

Q[transfer]: A security team exports login events to CSV, and the "user agent" field contains commas. How should a script read it?
P: Reading rows as lists
* With the csv module, which handles the quoted fields
- By splitting each line on commas by hand
- By deleting every comma in the file first
= Hand-splitting breaks on commas inside fields.

Q[transfer]: A statistics student downloads a CSV of states and populations and wants the total. What's the first step after reading each row?
P: From CSV to answers
* Convert the population text to a number
- Sort the rows by state name
- Print every row on the screen
= Every value is text until converted.

# Cards
What is CSV? :: Plain-text tables: one row per line, commas between fields, a header first.
Why are some CSV fields quoted? :: The quotes show that a comma inside is part of the value.
What does csv.DictReader give? :: Each row as a dictionary keyed by the header.
What type are CSV values? :: Strings. Convert numbers with int or float.
How should you open CSV files? :: With `newline=""`.

# Further
- Python documentation, csv module :: https://docs.python.org/3/library/csv.html
- Python for Everybody, Chapter 7 :: https://www.py4e.com/html3/07-files
