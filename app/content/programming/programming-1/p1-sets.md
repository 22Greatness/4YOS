---
id: p1-sets
pack: Programming 1 · Collections
title: Sets
minutes: 35
source: The Python Tutorial · Sets
url: https://docs.python.org/3/tutorial/datastructures.html
courses: Supports any first programming course
format: 2
python: yes
teaches: set-literal; remove-duplicates; set-membership; set-operations
uses: list-literal; in-operator-lists; for-loop; len-function; dict-literal
---
# Goal
Use a set to keep only unique values, remove duplicates from a list, check membership quickly, and combine sets with union, intersection and difference.

# Why
Many real questions are about which different things there are, not how many times each appears: which courses has any student registered for, which addresses appeared in a log, which words are used in a text. A **set** holds each value once, and answers "is this in it?" very quickly. Sets also bring the union and intersection from the sets you met in maths straight into code.

# Warm-up
?? What does `"a" in ["a", "b"]` give?
=> True.

?? In maths, what's the intersection of two sets?
=> The elements that are in both.

# Lesson
## A set holds each value once
A set is written with curly brackets, like a dictionary, but with single values instead of key: value pairs. Any repeated value is kept only once.

```python
courses = {"COS 102", "STA 111", "COS 102", "MTH 101"}
print(len(courses))
print("STA 111" in courses)
```

```output
3
True
```

"COS 102" was written twice, but the set holds it once, so it has three items. Sets have **no order** and no positions, so you can't index them: `courses[0]` is an error. When printed, their items may appear in any order.

An empty set must be written `set()`. Writing `{}` makes an empty dictionary, not a set.

## Removing duplicates
The most common use of a set is removing duplicates from a list. Convert the list to a set, and back if you need a list again:

```python
visits = ["10.0.0.5", "10.0.0.9", "10.0.0.5", "10.0.0.5", "10.0.0.2"]
unique = set(visits)
print(len(visits), "visits from", len(unique), "addresses")
print(sorted(unique))
```

```output
5 visits from 3 addresses
['10.0.0.2', '10.0.0.5', '10.0.0.9']
```

`sorted` turns the set into an ordered list, which is the usual way to show a set's contents tidily. If the original order matters, sets aren't the right tool, since they forget it.

## Adding and checking
`.add(x)` puts a value into a set. Adding a value that's already there does nothing, with no error. `.discard(x)` removes a value if it's there.

```python
seen = set()
for word in "the cat and the dog and the bird".split():
    seen.add(word)
print(len(seen), "different words")
```

```output
5 different words
```

Checking `x in some_set` is very fast, even for a set of millions of items, because Python doesn't search through them one by one. Checking `x in some_list` has to look at each item in turn. For a big collection that you check many times, such as a blocklist, a set is much quicker. For a list of ten items, you'll never notice the difference. For a list of a million items checked thousands of times, it can be the difference between an instant answer and a long wait.

## Union, intersection and difference
These work exactly as in maths, with symbols:

| Operation | Symbol | Gives | Maths |
| --- | --- | --- | --- |
| Union | `a` pipe `b`, written with the vertical bar key | Everything in either | A ∪ B |
| Intersection | `a & b` | Only what's in both | A ∩ B |
| Difference | `a - b` | In a but not in b | A − B |

```python
required = {"MTH 101", "STA 111", "COS 102", "PHY 101"}
done = {"MTH 101", "COS 102"}
print(sorted(required - done))
print(sorted(required & done))
```

```output
['PHY 101', 'STA 111']
['COS 102', 'MTH 101']
```

`required - done` gives the courses still to do. `required & done` gives the ones finished. Questions like "what's left?", "what do these two have in common?" and "what's in either?" become one line each.

The union symbol is the vertical bar, the key usually found above Enter. All three operations give a new set and leave the originals unchanged. They're the same operations you met in Sets and Logic, now on real data. Order matters for difference: `required - done` is the courses still to do, while `done - required` would be any finished courses that weren't required, which is a different question. Union and intersection give the same answer either way round, just as A ∪ B equals B ∪ A in maths.

> Mistake: Using a set when order or repeats matter. A set of exam marks loses repeated marks, so two students with 65 count once, and the average comes out wrong. Use a set for "which different values", and a list for the actual data.

### Which collection so far?
| Need | Use |
| --- | --- |
| Items in order, repeats allowed | List |
| Look up by name | Dictionary |
| Unique values, quick membership checks | Set |

# Exercises
?? What's `len({1, 2, 2, 3, 3, 3})`?
=> 3.

?? How do you remove duplicates from a list `names`?
=> `set(names)`, or `sorted(set(names))` for an ordered list.

?? With `a = {1, 2, 3}` and `b = {2, 3, 4}`, what are `a & b` and `a - b`?
=> `{2, 3}` and `{1}`.

# Practice
Compare two real course lists.

1. In the box, `required` holds the courses you must take this level, and `registered` holds the ones you've registered for. Change them to real or likely ones.
2. Set `missing` to the required courses you haven't registered for.
3. Set `extra` to the registered courses that aren't required.
4. Set `all_courses` to every course in either list, as a sorted list.
5. Predict, run, and press **Test my code**.

Write your missing and extra courses.

# Starter
```python
required = {"MTH 101", "STA 111", "COS 102", "PHY 101", "GST 111"}
registered = {"MTH 101", "COS 102", "GST 111", "CSC 183"}

missing = set()
extra = set()
all_courses = []

print(sorted(missing), sorted(extra))
print(all_courses)
```

# Tests
```python
assert missing == required - registered, "missing should be required courses you haven't registered for"
assert extra == registered - required, "extra should be registered courses that aren't required"
assert all_courses == sorted(required | registered), "all_courses should be every course in either, sorted"
```

# Solution
```python
required = {"MTH 101", "STA 111", "COS 102", "PHY 101", "GST 111"}
registered = {"MTH 101", "COS 102", "GST 111", "CSC 183"}

missing = required - registered
extra = registered - required
all_courses = sorted(required | registered)

print(sorted(missing), sorted(extra))
print(all_courses)
```

# Rubric
- I used set difference and union instead of loops.
- I showed the results as sorted lists.
- My code passes the test.

# Summary
- A set holds each value once, with no order and no indexes.
- `set(list)` removes duplicates. An empty set is `set()`, not `{}`.
- `in` on a set is very fast. `.add` and `.discard` change it.
- `|` is union, `&` is intersection, and `-` is difference.
- Use a set for unique values, a list for ordered data with repeats.

# Check
Q: What's `len({4, 4, 7})`?
P: A set holds each value once
A: 2 | two
= The repeated 4 is kept once, so the set has 2 items.

Q: What does `{}` create?
P: A set holds each value once
- An empty set
* An empty dictionary
- An error
= An empty set must be written `set()`.

Q: Why can't you write `my_set[0]`?
P: A set holds each value once
* Sets have no order and no positions
- Sets can only hold strings, not numbers
- Index 0 is always reserved for the empty value
= Sets aren't indexed.

Q: What's the quickest way to remove duplicates from a list?
P: Removing duplicates
* Convert it to a set
- Sort it twice
- Reverse it with a slice
= A set keeps each value once.

Q: What does adding a value already in a set do?
P: Adding and checking
* Nothing, and no error
- It causes a KeyError
- It adds a second copy of the value
= Sets hold each value once.

Q: With `a = {1, 2, 3}` and `b = {3, 4}`, what's `a | b`?
P: Union, intersection and difference
A: {1, 2, 3, 4} | 1, 2, 3, 4
= Union gives everything in either.

Q: With `a = {1, 2, 3}` and `b = {3, 4}`, what's `a - b`?
P: Union, intersection and difference
A: {1, 2} | 1, 2
= Difference gives what's in a but not in b.

Q: Why is a set of exam marks wrong for working out the average?
P: Union, intersection and difference
* Repeated marks are lost, so the average is wrong
- Sets can't hold numbers, only words
- The average of a set is always 0
= Use a list for the actual data.

Q[transfer]: A security tool checks every incoming connection against a blocklist of 50,000 addresses. Which collection should hold the blocklist?
P: Adding and checking
* A set, because membership checks are very fast
- A list, because it keeps the addresses in order
- A string, with the addresses separated by commas
= Checking `in` a set doesn't search item by item.

Q[transfer]: Two lecturers each have a list of students who attended. Which students attended both?
P: Union, intersection and difference
* The intersection of the two sets
- The union of the two sets
- The first list minus the second
= Intersection gives what's in both.

Q[transfer]: A statistics student needs the number of different towns in a survey of 2,000 people. What's the quickest way?
P: Removing duplicates
* `len(set(towns))`
- `len(towns)`
- `max(towns)`
= The set keeps each town once, so its length is the number of different towns.

# Cards
What is a set? :: A collection that holds each value once, with no order.
How do you write an empty set? :: `set()`. `{}` is an empty dictionary.
How do you remove duplicates from a list? :: Convert it to a set.
What do `|`, `&` and `-` do with sets? :: Union, intersection, and difference.
When should you use a set instead of a list? :: For unique values and fast membership checks, when order and repeats don't matter.

# Further
- The Python Tutorial, sets :: https://docs.python.org/3/tutorial/datastructures.html
- Python for Everybody, Chapter 10 :: https://www.py4e.com/html3/10-tuples
