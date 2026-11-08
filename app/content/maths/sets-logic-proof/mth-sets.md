---
id: mth-sets
pack: Mathematics from the beginning
title: Sets and Venn diagrams
minutes: 50
source: OpenStax · Contemporary Mathematics · Chapter 1: Sets
url: https://openstax.org/books/contemporary-mathematics/pages/1-introduction
courses: UNIPORT (expected) MTH 101 · NOUN MTH101
python: yes
format: 2
lecture: camp
credit: 4YOS Camp
start: 0
end: 75.292
teaches: set-notation; set-operations; venn-diagrams; union-counting-formula
uses: none
---
# Goal
Write sets in correct notation, find unions, intersections and complements, draw Venn diagrams, and use the counting formula to solve word problems.

# Why
This is the first topic in MTH 101 at both schools. It's also more useful than it may look: probability is built on sets, databases work by combining sets of rows, and access control asks whether a user is in a set. The union and intersection from this lesson are the "or" and "and" of Python and of probability. Exam word problems with Venn diagrams are common too.

# Lesson
 ## What a set is
> Clip: Count the overlap once, then use that reasoning to check whether a second set of counts is possible.

## What a set is
A **set** is a well-defined collection of distinct objects, called its **elements** or **members**. "Well-defined" means you can always say whether something is in or out. "Tall students" isn't well-defined, as it depends who you ask. "Students taller than 180 cm" is.

Sets are named with capital letters, and written in curly brackets.

| Way of writing | Example | Meaning |
| --- | --- | --- |
| Listing | A = {2, 4, 6, 8} | Named one by one |
| Description (set-builder) | A = {x : x is an even number, 0 < x < 10} | All x that meet the rule. Read `:` as "such that" |

Two rules surprise people. **Order doesn't matter**, so {1, 2, 3} = {3, 1, 2}. And **repeats don't count**, so {1, 1, 2} = {1, 2}.

| Symbol | Meaning | Example, for A = {2, 4, 6} |
| --- | --- | --- |
| $\in$ | Is an element of | $4 \in A$ |
| $\notin$ | Isn't an element of | $5 \notin A$ |
| $n(A)$ | How many elements, the **cardinality** | $n(A) = 3$ |
| $\emptyset$ or $\{\,\}$ | The set with nothing in it | $\{x : x$ is a month with 40 days$\} = \emptyset$ |
| $U$ | The **universal set**: everything under discussion | $U$ = whole numbers from 1 to 10 |

## Subsets
A is a **subset** of B if every element of A is also in B. {1, 2} is a subset of {1, 2, 3}. If B also has something extra, A is a **proper subset**.

Two facts come up in exams: the empty set is a subset of every set, and every set is a subset of itself.

**How many subsets does a set have?** A set with $n$ elements has $2^n$ **subsets**. Each element is either in or out, a two-way choice, and you multiply those choices. That's the same idea as n bits making 2^n patterns.

### Worked example: all subsets of {a, b}
The subsets are { }, {a}, {b} and {a, b}. That's 4, and $2^2 = 4$. Of those, 3 are proper subsets, as {a, b} isn't a proper subset of itself.

?? How many subsets does {1, 2, 3, 4, 5} have? How many are proper?
=> $2^5 = 32$ subsets. All except the set itself are proper, so 31.

## Operations
Take U = {1, 2, 3, 4, 5, 6, 7, 8}, A = {1, 2, 3, 4}, and B = {3, 4, 5, 6}.

| Operation | Written | Meaning | Result |
| --- | --- | --- | --- |
| **Union** | $A \cup B$ | In A **or** B, or both | {1, 2, 3, 4, 5, 6} |
| **Intersection** | $A \cap B$ | In **both** A and B | {3, 4} |
| **Complement** | $A'$ | In U but **not** in A | {5, 6, 7, 8} |
| **Difference** | $A - B$ | In A but not in B | {1, 2} |

Two sets with no elements in common are **disjoint**, so their intersection is empty.

> Mistake: Writing union as {1, 2, 3, 4, 3, 4, 5, 6}. Repeats don't count, so 3 and 4 appear once. Mixing up union and intersection is common too. Remember that "union" joins, and "intersection" is where two roads cross.

## Venn diagrams
A **Venn diagram** draws U as a rectangle, with circles for the sets. Overlapping circles make regions.

```diagram
{"kind":"venn","alt":"Two overlapping circles, A and B, inside a rectangle. 1 and 2 are in A only, 3 and 4 in the overlap, 5 and 6 in B only, and 7 and 8 are outside both circles.","a":"A","b":"B","aOnly":["1","2"],"both":["3","4"],"bOnly":["5","6"],"neither":["7","8"]}
```

Using the sets above, 1 and 2 are in A only, 3 and 4 are in the overlap, 5 and 6 are in B only, and 7 and 8 are outside both.

## The counting formula
If you just add n(A) and n(B), the overlap gets counted twice, so take it off once.

$$n(A \cup B) = n(A) + n(B) - n(A \cap B)$$

### Worked example: a word problem
In a class of 50 students, 30 take Maths, 25 take Physics, and 10 take both. How many take at least one, and how many take neither?

**Always fill in the middle of the Venn diagram first.**

| Region | Calculation | Count |
| --- | --- | --- |
| Both | Given | 10 |
| Maths only | 30 - 10 | 20 |
| Physics only | 25 - 10 | 15 |
| At least one | 20 + 10 + 15, or 30 + 25 - 10 | 45 |
| Neither | 50 - 45 | 5 |

Check: 20 + 10 + 15 + 5 = 50, which is the whole class.

> Mistake: Using "30 take Maths" as "30 take only Maths". The 30 includes those who take both. Word problems turn on this distinction, so read "only" carefully.

## De Morgan's laws
Two rules connect complements with union and intersection.

$$(A \cup B)' = A' \cap B'$$

$$(A \cap B)' = A' \cup B'$$

In words: "not in (A or B)" is the same as "not in A, and not in B". You'll meet the same laws in logic and in Python conditions, where `not (a or b)` equals `not a and not b`.

## Sets in Python
Python has sets built in, which is a good way to check your work.

```python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(sorted(A | B))
print(sorted(A & B))
print(sorted(A - B))
print(3 in A)
print(len(A))
```

```output
[1, 2, 3, 4, 5, 6]
[3, 4]
[1, 2]
True
4
```

`|` is union, `&` is intersection, and `-` is difference. `sorted` just puts them in order to display.

# Exercises
?? List the elements of {x : x is a whole number, 2 < x <= 6}.
=> {3, 4, 5, 6}. 2 is excluded, and 6 is included.

?? With U = {1, ..., 10}, P = {2, 4, 6, 8, 10} and Q = {1, 2, 3, 4}: find the union, the intersection, P' and Q - P.
=> Union: {1, 2, 3, 4, 6, 8, 10}. Intersection: {2, 4}. P' = {1, 3, 5, 7, 9}. Q - P = {1, 3}.

?? $n(A) = 12$, $n(B) = 9$, and $n(A \cup B) = 17$. Find $n(A \cap B)$.
=> 17 = 12 + 9 - x, and so x = 4.

?? In a survey of 100 people, 60 use WhatsApp, 45 use Telegram, and 30 use both. How many use only Telegram? How many use neither?
=> Only Telegram: 45 - 30 = 15. Only WhatsApp: 30. At least one: 30 + 30 + 15 = 75. Neither: 100 - 75 = 25.

# Practice
Use real sets from your own life, and don't use anyone's private information.

1. Choose U as something real, such as your courses this semester or the files in one folder.
2. Define two sets with clear rules. For courses, this could be A = courses with a practical, and B = courses you find hard.
3. List A, B, their union, intersection, and A'.
4. Draw the Venn diagram on paper, and write the elements in each region. Check that the regions add up to n(U).
5. Use the formula to confirm n(A union B).
6. Complete the function in the editor, press **Test my code**, then try it with your own counts.

# Starter
```python
def neither(total, in_a, in_b, in_both):
    # Return how many are in neither set.
    # First find how many are in at least one, using the formula.
    return 0

print(neither(50, 30, 25, 10))
```

# Tests
```python
assert neither(50, 30, 25, 10) == 5, "neither(50, 30, 25, 10) should be 5"
assert neither(100, 60, 45, 30) == 25, "neither(100, 60, 45, 30) should be 25"
assert neither(10, 10, 10, 10) == 0, "when everyone is in both, neither should be 0"
assert neither(20, 0, 0, 0) == 20, "when both sets are empty, everyone is in neither"
```

# Solution
```python
def neither(total, in_a, in_b, in_both):
    at_least_one = in_a + in_b - in_both
    return total - at_least_one
```

# Rubric
- I worked with two real sets that have clear rules.
- I drew the Venn diagram, and my regions add up to the total.
- I worked the question by hand before using Python.

# Summary
- A set has distinct elements. Order and repeats don't matter.
- A set of $n$ elements has $2^n$ subsets.
- Union is or. Intersection is and. Complement is not.
- $n(A \cup B) = n(A) + n(B) - n(A \cap B)$.
- In word problems, fill in the middle of the Venn diagram first.

# Check
Q: How many elements does {1, 2, 2, 3, 3, 3} have?
P: What a set is
A: 3
= Repeats don't count, so it's {1, 2, 3}.

Q: How many subsets does a set of 4 elements have?
P: Subsets
A: 16
= $2^4 = 16$.

Q: A = {1, 2, 3} and B = {2, 3, 4}. How many elements are in $A \cup B$?
P: Operations
A: 4
= {1, 2, 3, 4}. 2 and 3 count once.

Q: A = {1, 2, 3} and B = {2, 3, 4}. How many elements are in $A \cap B$?
P: Operations
A: 2
= The shared elements are 2 and 3.

Q: With U = {1, 2, 3, 4, 5} and A = {1, 2}, what's $A'$?
P: Operations
- {1, 2}
* {3, 4, 5}
- {1, 2, 3, 4, 5}
= The complement is what's in U and not in A.

Q: $n(A) = 20$, $n(B) = 15$ and $n(A \cap B) = 5$. What's $n(A \cup B)$?
P: The counting formula
A: 30
= 20 + 15 - 5 = 30.

Q: Which is true of the empty set?
P: Subsets
* It's a subset of every set
- It has exactly one element in it, namely zero
- It isn't a subset of any set at all
= It has no elements, so all of its elements are trivially in any set.

Q: Which is equal to $(A \cup B)'$?
P: De Morgan's laws
- $A' \cup B'$
* $A' \cap B'$
- $A \cup B'$
= De Morgan's law: not in either means not in A and not in B.

Q: Which collection is not a well-defined set?
P: What a set is
- Even numbers less than 10
- States of Nigeria
* Very clever students
= "Very clever" depends on who you ask.

Q: $n(A) = {a}$, $n(B) = {b}$ and $n(A \cap B) = {c}$. What is $n(A \cup B)$?
P: The counting formula
Vars: a=10..30, b=10..30, c=1..9
F: a+b-c
= Add the two sizes, then take off the overlap once: {a} + {b} - {c} = {a+b-c}.

Q: A set has {n} elements. How many subsets does it have?
P: Subsets
Vars: n=2..8
F: 2^n
= Each element is either in or out, so that's $2^{n} = {2^n}$.

Q: You're solving a Venn word problem. Put these steps in the right order.
P: The counting formula
O: Fill in the overlap | Work out each "only" region | Add up everyone in at least one set | Take that from the total to get "neither"
= Start in the middle. The "only" counts depend on the overlap, and "neither" depends on all of them.

Q: Match each operation to what it means.
P: Operations
M: Union => In A or B, or both
M: Intersection => In both A and B
M: Complement => Not in A
M: Difference => In A but not in B
= Union joins. Intersection is where the two sets cross. Complement is everything else in U. Difference takes B away from A.

Q: An element is in set A and not in set B. Choose its region on the diagram.
P: Venn diagrams
D: {"kind":"venn","alt":"Two overlapping circles, A and B, inside a rectangle. Choose a region.","a":"A","b":"B"}
A: A only
= It's in A and outside B, so it's in the part of A that doesn't overlap B.

Q[transfer]: 80 students: 50 passed STA, 40 passed COS, and 25 passed both. How many passed neither?
P: The counting formula
A: 15
= At least one: 50 + 40 - 25 = 65. Neither: 80 - 65 = 15.

Q[transfer]: In Python, `A & B` gives elements common to A and B. Which operation is it?
P: Sets in Python
- Union
* Intersection
- Complement
= `&` means in both, and it's the same "and" that you met in logic.

Q[transfer]: A fraud team has a set of accounts flagged by rule 1, and another by rule 2. They want accounts flagged by either. Which do they need?
P: Operations
* The union of the two sets
- The intersection of the two sets
- The complement of the first set
= Either one means or, which is the union. Both would be the intersection.

# Cards
What are the two surprising rules about sets? :: Order doesn't matter, and repeats don't count.
How many subsets does a set of $n$ elements have? :: $2^n$.
What's the difference between union and intersection? :: Union is in A or B or both. Intersection is in both.
What's the counting formula for a union? :: $n(A \cup B) = n(A) + n(B) - n(A \cap B)$.
What are De Morgan's laws? :: $(A \cup B)' = A' \cap B'$, and $(A \cap B)' = A' \cup B'$.
What's the first step in a Venn word problem? :: Fill in the overlap first, then work outward.

# Further
- OpenStax Contemporary Mathematics, Chapter 1: Sets :: https://openstax.org/books/contemporary-mathematics/pages/1-introduction
- Python tutorial, sets :: https://docs.python.org/3/tutorial/datastructures.html#sets
