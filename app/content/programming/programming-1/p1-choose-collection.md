---
id: p1-choose-collection
pack: Programming 1 · Collections
title: Choosing a collection
minutes: 45
source: The Python Tutorial · Data structures
url: https://docs.python.org/3/tutorial/datastructures.html
courses: Supports any first programming course
format: 2
python: yes
teaches: choose-collection; nested-collections; list-of-dicts; grouping-pattern; collection-tradeoffs
uses: list-literal; dict-literal; set-literal; tuple-literal; loop-over-dict; counting-with-dict; set-operations; tuple-unpacking
---
# Goal
Choose the right collection for a job by asking how the data will be used, combine collections, such as a list of dictionaries, and work through real-shaped data with loops.

# Why
You now know four collections: lists, dictionaries, sets and tuples. Choosing well makes a program short and clear. Choosing badly makes it long, slow or buggy: searching a list when a dictionary would look it up instantly, or using a set and losing repeated values you needed. Real data also comes combined, such as a list of records where each record has named fields, which is exactly the shape of a spreadsheet or a database table.

# Warm-up
?? Which collection removes duplicates?
=> A set.

?? Which collection can be a dictionary key: a list or a tuple?
=> A tuple.

# Lesson
## Ask how the data will be used
The right collection depends on what you'll do with the data, not on the data itself. Four questions decide it:

| Question | If yes |
| --- | --- |
| Will I look items up by a name or code? | Dictionary |
| Do I only care which different values there are, or whether something is present? | Set |
| Is it a small fixed group that belongs together, such as a date? | Tuple |
| Otherwise: items in order, perhaps with repeats? | List |

The same data can call for different collections depending on the question. Take the courses a student has passed:

| Question about the passed courses | Best collection |
| --- | --- |
| Print them in the order they were taken | List |
| What mark did I get in STA 111? | Dictionary of course to mark |
| Which required courses haven't I passed yet? | Set, for the difference |
| Each record of course code and units | Tuple |

## A summary of the four
| | List | Dictionary | Set | Tuple |
| --- | --- | --- | --- | --- |
| Written | `[1, 2]` | `{"a": 1}` | `{1, 2}` | `(1, 2)` |
| Ordered | Yes | Yes, by insertion | No | Yes |
| Repeats | Yes | Keys no, values yes | No | Yes |
| Changeable | Yes | Yes | Yes | No |
| Find an item | By position, or search | By key, instantly | `in`, instantly | By position |

The two "instantly" cells matter for large data. Checking `x in a_list` looks through items one by one. Looking up a key in a dictionary, or checking `x in a_set`, goes straight there, however large the collection is.

## Combining collections
Real data rarely fits one simple collection. Collections can hold other collections. The most common shape is a **list of dictionaries**: a list of records, each record a dictionary with the same keys. It's exactly how a table with named columns looks in code.

```python
students = [
    {"name": "Ada", "level": 100, "mark": 72},
    {"name": "Tunde", "level": 200, "mark": 58},
    {"name": "Ngozi", "level": 100, "mark": 81},
]
for s in students:
    if s["level"] == 100:
        print(s["name"], s["mark"])
```

```output
Ada 72
Ngozi 81
```

Each item in the list is one row, and each key is one column. Looping over the list gives one record at a time, and `s["mark"]` reads one field. You'll meet this exact shape again when you read CSV files in the next unit, and later when you work with databases and data analysis.

Other useful combinations:

| Shape | Example | Use |
| --- | --- | --- |
| Dictionary of lists | `{"COS 102": [72, 65, 80]}` | Every mark for each course |
| Dictionary of sets | `{"Mon": {"COS 102", "STA 111"}}` | Which courses fall on each day |
| List of tuples | `[("STA 111", 3), ("MTH 101", 2)]` | Course codes with their units |

### Worked example: grouping marks by course
A dictionary of lists collects many values under each key. Here's how to build one from a list of records:

```python
results = [("COS 102", 72), ("STA 111", 65), ("COS 102", 80), ("STA 111", 58)]
by_course = {}
for code, mark in results:
    if code not in by_course:
        by_course[code] = []
    by_course[code].append(mark)
for code, marks in by_course.items():
    print(code, marks, "average", sum(marks) / len(marks))
```

```output
COS 102 [72, 80] average 76.0
STA 111 [65, 58] average 61.5
```

The loop unpacks each tuple. The first time a course appears, it gets an empty list. Then each mark is appended to its course's list. This **grouping** pattern, a close cousin of counting, is behind almost every report that summarises data by category.

> Mistake: Searching a long list again and again for one item, such as looping through every student to find one by name each time. If you look things up by name often, build a dictionary keyed by name once, then look up instantly.

## When a choice is wrong
Signs that you've chosen the wrong collection:

- You keep writing loops just to find one item by its name: use a dictionary.
- Your totals or averages come out wrong after converting to a set: repeats were lost, so keep a list.
- You keep checking whether something is already in a list before adding it: you want a set.
- You get a TypeError when using a list as a dictionary key: use a tuple.

Changing collection is usually a small edit, and it often makes the rest of the code shorter.

# Exercises
?? You need each student's phone number, looked up by name. Which collection?
=> A dictionary, with names as keys and numbers as values.

?? You need every temperature reading in order, including repeats. Which collection?
=> A list.

?? How would you store a table of products, each with a name, price and stock count?
=> A list of dictionaries, one dictionary per product, each with the keys name, price and stock.

# Practice
Work with a real-shaped table: a list of dictionaries.

1. In the box, `trips` is a list of records, each with a `mode` and a `fare`. Change them to real or likely trips.
2. Set `total` to the sum of every fare.
3. Set `by_mode` to a dictionary of lists, grouping the fares by mode, using the grouping pattern.
4. Set `modes` to the set of different modes used.
5. Set `cheapest` to the record (the whole dictionary) with the lowest fare, using a loop.
6. Predict, run, and press **Test my code**.

Write which collection you used for each result, and why.

# Starter
```python
trips = [
    {"mode": "bus", "fare": 300},
    {"mode": "keke", "fare": 200},
    {"mode": "bus", "fare": 350},
    {"mode": "okada", "fare": 500},
    {"mode": "keke", "fare": 150},
]

total = 0
by_mode = {}
modes = set()
cheapest = trips[0]

print(total)
print(by_mode)
print(sorted(modes))
print(cheapest)
```

# Tests
```python
assert total == sum(t["fare"] for t in trips), "total should add up every fare"
want = {}
for t in trips:
    want.setdefault(t["mode"], []).append(t["fare"])
assert by_mode == want, "by_mode should group the fares by mode, in their original order"
assert modes == {t["mode"] for t in trips}, "modes should be the set of different modes"
assert cheapest["fare"] == min(t["fare"] for t in trips) and cheapest in trips, "cheapest should be the whole record with the lowest fare"
```

# Solution
```python
trips = [
    {"mode": "bus", "fare": 300},
    {"mode": "keke", "fare": 200},
    {"mode": "bus", "fare": 350},
    {"mode": "okada", "fare": 500},
    {"mode": "keke", "fare": 150},
]

total = 0
by_mode = {}
modes = set()
cheapest = trips[0]
for trip in trips:
    total += trip["fare"]
    if trip["mode"] not in by_mode:
        by_mode[trip["mode"]] = []
    by_mode[trip["mode"]].append(trip["fare"])
    modes.add(trip["mode"])
    if trip["fare"] < cheapest["fare"]:
        cheapest = trip

print(total)
print(by_mode)
print(sorted(modes))
print(cheapest)
```

# Rubric
- I chose a fitting collection for each result, and can say why.
- I used the grouping pattern for the dictionary of lists.
- My code passes the test.

# Summary
- Choose a collection by how you'll use the data, not by the data itself.
- Look up by name: dictionary. Unique or present: set. Small fixed group: tuple. Otherwise: list.
- Dictionary lookups and set membership are instant. Searching a list isn't.
- A list of dictionaries is a table: each dictionary a row, each key a column.
- Grouping: give each new key an empty list, then append.

# Check
Q: You need each course's mark, looked up by course code. Which collection?
P: Ask how the data will be used
- List
* Dictionary
- Set
= Look up by a code means a dictionary.

Q: You need the different towns in a survey, without repeats. Which collection?
P: Ask how the data will be used
- List
- Tuple
* Set
= A set keeps each value once.

Q: Which collection can't be changed after it's made?
P: A summary of the four
- List
- Dictionary
* Tuple
= Tuples are immutable.

Q: Which check is slowest for a very large collection?
P: A summary of the four
* `x in a_list`
- `x in a_set`
- `key in a_dict`
= A list is searched item by item.

Q: In a list of dictionaries holding a table, what does each dictionary represent?
P: Combining collections
* One row, or record
- One column
- The whole table
= Each dictionary is a row, and each key is a column.

Q: In `students = [{"name": "Ada", "mark": 72}]`, how do you get Ada's mark?
P: Combining collections
A: students[0]["mark"] | students[0]['mark']
= Index the list, then look up the key.

Q: What's the grouping pattern?
P: Combining collections
* Give each new key an empty list, then append each value to its key's list
- Sort the list, then count how many items there are
- Turn the list into a set, then back into a list
= It builds a dictionary of lists.

Q: Your average comes out wrong after converting marks to a set. Why?
P: When a choice is wrong
- Sets can't hold numbers, only text
* Repeated marks were lost
- Sets always sort their items backwards
= Use a list when repeats matter.

Q[transfer]: An inventory app keeps looping through every product to find one by its code. What change would help most?
P: When a choice is wrong
* Build a dictionary keyed by product code, then look up directly
- Sort the product list, so that the loop is shorter
- Store the products as a single long string
= Looking up by a code is what dictionaries are for.

Q[transfer]: A security report must group failed logins by username, keeping every failure time. What structure fits?
P: Combining collections
* A dictionary of lists: username to a list of times
- A set of usernames, ignoring the times
- One list holding every time, with no usernames
= Grouping by a key, keeping repeats, is a dictionary of lists.

Q[transfer]: A statistics student loads a survey where each respondent has an age, town and income. What shape fits the data?
P: Combining collections
* A list of dictionaries, one per respondent
- A set of ages
- A tuple of towns
= Each respondent is a row with named fields.

# Cards
How do you choose a collection? :: By how you'll use the data: lookup by name, uniqueness, fixed group, or ordered items.
Which collection looks items up by key instantly? :: A dictionary.
What is a list of dictionaries? :: A table: each dictionary is a row, each key a column.
What's the grouping pattern? :: Give each new key an empty list, then append each value.
What's a sign you should use a dictionary instead of a list? :: You keep looping to find one item by its name.

# Further
- The Python Tutorial, data structures :: https://docs.python.org/3/tutorial/datastructures.html
- Python for Everybody, Chapter 9 :: https://www.py4e.com/html3/09-dictionaries
