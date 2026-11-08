---
id: p1-dicts
pack: Programming 1 · Collections
title: Dictionaries
minutes: 45
source: Python for Everybody · Chapter 9
url: https://www.py4e.com/html3/09-dictionaries
courses: Supports any first programming course
format: 2
python: yes
teaches: dict-literal; key-lookup; key-error; dict-get; loop-over-dict; counting-with-dict
uses: list-literal; for-loop; in-operator-lists; accumulator-pattern; counter-pattern; f-strings
---
# Goal
Store values under names instead of positions with a dictionary, look values up, add and change them, loop through them, and use a dictionary to count things.

# Why
A list finds things by position: the third mark, the last fare. But often you want to find things by name: the mark for COS 102, the phone number for Ada, the price of a data bundle. A **dictionary** stores pairs, a key and its value, so you can look a value up directly by its key. Dictionaries are everywhere in real programs: settings, records, counts, and data read from the web.

# Warm-up
?? What does `["a", "b", "c"][1]` give?
=> `"b"`.

?? What's the counter pattern?
=> Start at 0, and add 1 each time an item matches.

# Lesson
## Keys and values
A dictionary holds **key: value** pairs inside curly brackets. You look up a value by putting its key in square brackets.

```python
marks = {"COS 102": 72, "STA 111": 65, "MTH 101": 58}
print(marks["STA 111"])
print(len(marks))
```

```output
65
3
```

Each key appears only once, and leads to exactly one value. Keys are usually strings or numbers. Values can be anything: numbers, strings, even lists. `len` gives the number of pairs.

Think of a dictionary like a real one: you look up a word, the key, to find its meaning, the value. You don't need to know what page it's on, which is what a list's index would be. You only need the word.

When should you choose a dictionary over a list? Ask how you'll find things. If you'll go through the items in order, or ask for "the third one", a list fits. If you'll ask for something by its name, such as "the mark for STA 111", a dictionary fits, and saves you searching the whole list each time.

## Adding, changing and removing
Assigning to a key adds it if it's new, or replaces its value if it already exists:

```python
marks = {"COS 102": 72}
marks["STA 111"] = 65
marks["COS 102"] = 75
print(marks)
```

```output
{'COS 102': 75, 'STA 111': 65}
```

The first assignment added a new pair. The second replaced COS 102's value, because that key was already there. To remove a pair, use `del marks["STA 111"]` or `marks.pop("STA 111")`. Dictionaries keep their pairs in the order they were added.

## Looking up a key that isn't there
Asking for a key that doesn't exist causes a **KeyError**:

```python
marks = {"COS 102": 72}
print(marks["PHY 101"])
```

```output
Traceback (most recent call last):
  File "<string>", line 2, in <module>
KeyError: 'PHY 101'
```

There are two safe ways to look up a key that might be missing. Check first with `in`, which tests the keys:

```python
marks = {"COS 102": 72}
if "PHY 101" in marks:
    print(marks["PHY 101"])
else:
    print("No mark yet")
```

```output
No mark yet
```

Or use `.get`, which gives a default value instead of an error:

```python
marks = {"COS 102": 72}
print(marks.get("PHY 101", "No mark yet"))
print(marks.get("COS 102", "No mark yet"))
```

```output
No mark yet
72
```

> Mistake: Using `in` on a dictionary and expecting it to check the values. `72 in marks` is False, because `in` looks at the keys only. Use `72 in marks.values()` to search the values.

## Looping through a dictionary
A for loop over a dictionary gives its keys. To get keys and values together, loop over `.items()`:

```python
marks = {"COS 102": 72, "STA 111": 65, "MTH 101": 58}
for course, mark in marks.items():
    print(f"{course}: {mark}")
print("Average:", sum(marks.values()) / len(marks))
```

```output
COS 102: 72
STA 111: 65
MTH 101: 58
Average: 65.0
```

| Method | Gives |
| --- | --- |
| `.keys()` | All the keys |
| `.values()` | All the values |
| `.items()` | Each key and value as a pair |

`.values()` works with `sum`, `max` and `min`, so the average here is one line.

## Counting with a dictionary
The most useful pattern for dictionaries is counting how often each thing appears. Each new thing becomes a key, and its value is its count:

```python
votes = ["Ada", "Tunde", "Ada", "Ngozi", "Ada", "Tunde"]
counts = {}
for name in votes:
    counts[name] = counts.get(name, 0) + 1
print(counts)
```

```output
{'Ada': 3, 'Tunde': 2, 'Ngozi': 1}
```

`counts.get(name, 0)` gives the count so far, or 0 if this is the first time the name has appeared. Adding 1 and storing it back updates the count. This one pattern answers a huge range of questions: how many times each word appears in a text, how many failed logins came from each address, how many students took each course. In statistics, it builds a **frequency table**.

A dictionary can also hold a whole record, with each key naming one field:

```python
student = {"name": "Ada", "level": 100, "courses": ["COS 102", "STA 111"]}
print(student["name"], "takes", len(student["courses"]), "courses")
```

```output
Ada takes 2 courses
```

# Exercises
?? In `prices = {"data": 1000, "airtime": 500}`, what's `prices["data"]`?
=> 1000.

?? What happens with `prices["sms"]`?
=> A KeyError, because "sms" isn't a key. Use `prices.get("sms", 0)` to avoid it.

?? After `d = {}`, then `d["a"] = 1`, then `d["a"] = 2`, what's in `d`?
=> `{'a': 2}`. The second assignment replaced the value.

# Practice
Build a real frequency table.

1. In the box, `trips` lists how you travelled on each trip this week. Change them to real ones.
2. Use a dictionary and the counting pattern to set `counts`, how many trips used each kind of transport.
3. Set `most_used` to the kind of transport with the highest count. Loop over `.items()`, keeping the largest count so far.
4. Set `cost` to the total cost of all your trips, using the `fares` dictionary to look up each trip's fare.
5. Predict, run, and press **Test my code**.

Write your frequency table, and what you spent.

# Starter
```python
trips = ["bus", "keke", "bus", "walk", "bus", "keke"]
fares = {"bus": 300, "keke": 200, "walk": 0}

counts = {}
most_used = ""
cost = 0

print(counts)
print(most_used, cost)
```

# Tests
```python
want = {}
for t in trips:
    want[t] = want.get(t, 0) + 1
assert counts == want, "counts should hold how many times each kind of transport appears"
assert counts[most_used] == max(want.values()), "most_used should have the highest count"
assert cost == sum(fares[t] for t in trips), "cost should add up the fare for every trip"
```

# Solution
```python
trips = ["bus", "keke", "bus", "walk", "bus", "keke"]
fares = {"bus": 300, "keke": 200, "walk": 0}

counts = {}
for trip in trips:
    counts[trip] = counts.get(trip, 0) + 1

most_used = ""
best = 0
for kind, count in counts.items():
    if count > best:
        best = count
        most_used = kind

cost = 0
for trip in trips:
    cost += fares[trip]

print(counts)
print(most_used, cost)
```

# Rubric
- I counted with a dictionary and `.get`, not with separate variables.
- I looked up each fare by its key.
- My code passes the test.

# Summary
- A dictionary stores key: value pairs. Look up a value by its key: `d[key]`.
- Assigning to a key adds it, or replaces its value.
- A missing key causes a KeyError. Check with `in`, or use `.get(key, default)`.
- `in` checks keys only. Loop with `.items()` for keys and values together.
- Counting: `counts[x] = counts.get(x, 0) + 1`.

# Check
Q: What does `{"a": 3, "b": 8}["b"]` give?
P: Keys and values
A: 8
= The key "b" leads to 8.

Q: What causes a KeyError?
P: Looking up a key that isn't there
* Asking for a key that isn't in the dictionary
- Giving a key a value that is a list
- Adding a new key to a dictionary that already has keys
= Missing keys cause a KeyError.

Q: What does `{"x": 5}.get("y", 0)` give?
P: Looking up a key that isn't there
A: 0
= The key is missing, so the default is given.

Q: After `d = {"a": 1}`, then `d["a"] = 9`, what's `d["a"]`?
P: Adding, changing and removing
A: 9
= Assigning to an existing key replaces its value.

Q: What does `72 in {"COS 102": 72}` give?
P: Looking up a key that isn't there
- True
* False
- An error
= `in` checks keys, and 72 isn't a key.

Q: Which gives each key and value together in a loop?
P: Looping through a dictionary
- `.keys()`
- `.values()`
* `.items()`
= items gives the pairs.

Q: After counting `["a", "b", "a"]` with the counting pattern, what's `counts["a"]`?
P: Counting with a dictionary
A: 2 | two
= "a" appears twice.

Q: Why use `counts.get(name, 0) + 1` instead of `counts[name] + 1`?
P: Counting with a dictionary
* The first time a name appears, it isn't a key yet, so `counts[name]` would fail
- Because `+ 1` only works on values that come from `.get`
- Because dictionaries can't store whole numbers as values
= get gives 0 for a new name.

Q[transfer]: A security analyst wants to know how many failed logins came from each IP address in a log. What fits best?
P: Counting with a dictionary
* A dictionary counting failures per address
- A separate variable for each possible address
- A single counter for all the failures together
= Each address is a key, and its count is the value.

Q[transfer]: A shop stores prices in a dictionary, and a customer asks for an item that isn't sold. What should the program use?
P: Looking up a key that isn't there
* `prices.get(item)`, or a check with `in`, and a polite message
- `prices[item]`, and let the KeyError crash the program
- A loop that compares the item with each price
= Check or use get, so a missing item doesn't crash it.

Q[transfer]: A statistics student wants a frequency table of grades from a list. What's the clearest code?
P: Counting with a dictionary
* The counting pattern, with each grade as a key
- Sorting the list, then printing it
- `max(grades)`, to find the most common grade
= A dictionary of counts is a frequency table.

# Cards
What is a dictionary? :: A set of key: value pairs, where you look up a value by its key.
What causes a KeyError? :: Asking for a key that isn't there.
How do you look up a key safely? :: Check with `in`, or use `d.get(key, default)`.
What does `in` check on a dictionary? :: The keys only.
What's the counting pattern? :: `counts[x] = counts.get(x, 0) + 1`.

# Further
- Python for Everybody, Chapter 9 :: https://www.py4e.com/html3/09-dictionaries
- The Python Tutorial, dictionaries :: https://docs.python.org/3/tutorial/datastructures.html
