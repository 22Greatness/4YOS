---
id: hcw-logic
pack: How Computers Work · Inside the machine
title: From switches to logic gates
minutes: 50
source: OpenStax · Introduction to Computer Science
url: https://openstax.org/details/books/introduction-computer-science
courses: Helps with IFT 211, COS 101, CSC 101
python: yes
---
# Goal
Explain how transistors become logic gates, work out truth tables for AND, OR, NOT, XOR and NAND, and trace how gates add two binary digits.

# Why
This is where bits become thinking. Every calculation a computer makes comes down to these few simple gates, and that's a wonderful thing to understand. Digital logic is a full course in your degree path, and the same AND, OR and NOT come back in programming, in sets and in search queries. It also explains how a computer can possibly add numbers at all.

# Lesson
## From switches to transistors
> Note: This lesson has no lecture, because I didn't find a free segment that fits well enough and whose transcript I've checked. The writing covers it fully. Nand2Tetris, listed below, is an excellent free course if you want to go much further.

A bit needs something physical to hold it. A **transistor** is a tiny electronic switch with no moving parts: a small signal on one connection controls whether current flows through the other two. On means 1 and off means 0.

A modern processor holds billions of them on a chip about the size of a fingernail. One transistor does almost nothing, but connected in the right patterns they can make decisions.

## Logic gates
A **logic gate** takes one or more input bits, and produces an output bit by a fixed rule. A **truth table** lists the output for every possible input. With two inputs there are always four rows.

### NOT
NOT flips its one input.

| A | NOT A |
| --- | --- |
| 0 | 1 |
| 1 | 0 |

### AND
AND gives 1 only if **both** inputs are 1. Think: a door that needs two keys.

| A | B | A AND B |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

### OR
OR gives 1 if **at least one** input is 1. Think: a room light with two switches, either of which turns it on.

| A | B | A OR B |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

> Mistake: In everyday speech "or" often means one or the other but not both. In logic, OR includes both. The gate for "one but not both" is XOR.

### XOR and NAND
**XOR** (exclusive or) gives 1 only if the inputs **differ**. **NAND** is NOT AND: it gives 0 only if both inputs are 1.

| A | B | A XOR B | A NAND B |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 |

NAND has a remarkable property: **every other gate can be built from NAND gates alone**. So in principle a whole computer can be built from one type of gate, and this is what the Nand2Tetris course does.

?? What's the output of (1 AND 0) OR (NOT 0)?
=> 1 AND 0 is 0. NOT 0 is 1. 0 OR 1 is 1.

## Combining gates
The output of one gate can feed another. To work out a circuit, go step by step and add a column for each stage. For X = (A AND B) OR (NOT A):

| A | B | A AND B | NOT A | X |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 0 | 1 |

With n inputs a truth table needs 2^n rows, the same doubling as in binary.

Python's `&`, `|` and `^` work on bits, so you can check any of these:

```python
for a in [0, 1]:
    for b in [0, 1]:
        print(a, b, "AND", a & b, "OR", a | b, "XOR", a ^ b)
```

```output
0 0 AND 0 OR 0 XOR 0
0 1 AND 0 OR 1 XOR 1
1 0 AND 0 OR 1 XOR 1
1 1 AND 1 OR 1 XOR 0
```

## Gates can add
Here's the moment it all comes together. Add two single bits by hand:

| A | B | A + B in binary | Carry | Sum |
| --- | --- | --- | --- | --- |
| 0 | 0 | 00 | 0 | 0 |
| 0 | 1 | 01 | 0 | 1 |
| 1 | 0 | 01 | 0 | 1 |
| 1 | 1 | 10 | 1 | 0 |

Look at the Sum column: it matches XOR. Look at the Carry column: it matches AND. So one XOR gate and one AND gate add two bits. This circuit is called a **half adder**.

To add longer numbers, you also need to handle the carry coming in from the column to the right. A **full adder** takes three inputs, and chaining 64 of them adds two 64-bit numbers. That's inside the processor's **arithmetic logic unit**.

### Worked example: full adder step
Add A = 1, B = 1, with a carry in of 1.

1. A XOR B = 0.
2. That XOR carry-in = 0 XOR 1 = **1**, which is the sum.
3. Carry out: (A AND B) OR (carry-in AND (A XOR B)) = 1 OR 0 = **1**.

1 + 1 + 1 is 3, which is binary 11: sum 1, carry 1. It works.

## Why this matters elsewhere
| Here | Elsewhere |
| --- | --- |
| AND, OR, NOT | Python's `and`, `or`, `not` |
| AND, OR | Intersection and union of sets |
| AND of two conditions | Search filters, such as `site:` plus a word |
| XOR | Encryption: a bit XOR a key bit, and XOR again gets it back |

XOR's reversibility is at the heart of many ciphers. You'll meet it again in cryptography.

Gates that hold a value, rather than only computing one, can be built too, by feeding outputs back into inputs. That's how memory cells work, which you'll study in Computer Organisation.

# Exercises
?? Complete: 1 XOR 1, 0 NAND 1, NOT (1 OR 0).
=> 0, 1 and 0.

?? How many rows does a truth table for 4 inputs need?
=> 2^4 = 16.

?? Using a half adder, what are the sum and carry for A = 1, B = 0?
=> Sum = 1 XOR 0 = 1. Carry = 1 AND 0 = 0.

?? Show that NOT can be made from NAND. What's A NAND A?
=> When both inputs are A: if A is 0, the result is 1, and if A is 1, it's 0. So A NAND A = NOT A.

?? Add binary 11 and 01 by column, with carries.
=> Right column: 1 + 1 = sum 0, carry 1. Left column: 1 + 0 + carry 1 = sum 0, carry 1. The result is 100, which is 4. Check: 3 + 1 = 4.

# Practice
1. On paper, write out truth tables for AND, OR, NOT, XOR and NAND from memory. Then check them against the lesson.
2. On paper, build the truth table for X = (A OR B) AND (NOT B).
3. Think of a real rule from your own life with two conditions, such as whether you can study tonight: "I have power AND I have time". Write its truth table, and say whether it's AND or OR.
4. Complete the functions in the editor, using only `&`, `|`, `^`, and `1 - a` for NOT. Press **Test my code**.
5. Run `add_bits` on some values of your own, and check them by hand.

# Starter
```python
def half_adder(a, b):
    # Return (sum, carry) for two bits
    return (0, 0)

def full_adder(a, b, carry_in):
    # Return (sum, carry_out) for two bits and a carry in.
    # sum = a XOR b XOR carry_in
    # carry_out = (a AND b) OR (carry_in AND (a XOR b))
    return (0, 0)

print(half_adder(1, 1))
print(full_adder(1, 1, 1))
```

# Tests
```python
assert half_adder(0, 0) == (0, 0), "0 + 0 is sum 0, carry 0"
assert half_adder(1, 0) == (1, 0), "1 + 0 is sum 1, carry 0"
assert half_adder(0, 1) == (1, 0), "0 + 1 is sum 1, carry 0"
assert half_adder(1, 1) == (0, 1), "1 + 1 is sum 0, carry 1"
assert full_adder(0, 0, 0) == (0, 0), "0 + 0 + 0 is sum 0, carry 0"
assert full_adder(1, 0, 1) == (0, 1), "1 + 0 + 1 is sum 0, carry 1"
assert full_adder(1, 1, 1) == (1, 1), "1 + 1 + 1 is sum 1, carry 1"
```

# Solution
```python
def half_adder(a, b):
    return (a ^ b, a & b)

def full_adder(a, b, carry_in):
    return (a ^ b ^ carry_in, (a & b) | (carry_in & (a ^ b)))
```

# Rubric
- I wrote the truth tables from memory, then checked them.
- I built one combined truth table by hand.
- My adder passes the tests, and I can say why XOR gives the sum.

# Summary
- A transistor is a tiny switch, and gates are made from transistors.
- AND needs both, OR needs at least one, NOT flips, XOR needs a difference, and NAND is NOT AND.
- n inputs need 2^n rows in a truth table.
- A half adder is XOR for the sum and AND for the carry.
- Chained adders are how the processor adds numbers.

# Check
Q: What's 1 AND 0?
A: 0
= AND needs both inputs to be 1.

Q: What's 1 OR 0?
A: 1
= OR needs at least one input to be 1.

Q: What's 1 XOR 1?
A: 0
= XOR gives 1 only if the inputs differ.

Q: What's 1 NAND 1?
A: 0
= NAND is NOT AND. 1 AND 1 is 1, and NOT 1 is 0.

Q: What's NOT (0 OR 0)?
A: 1
= 0 OR 0 is 0, and NOT 0 is 1.

Q: How many rows does a truth table need for 3 inputs?
A: 8 | eight
= 2^3 = 8.

Q: Which gate gives the sum bit in a half adder?
- AND
* XOR
- NOT
= Adding two bits gives a sum of 1 only when they differ.

Q: Which gate gives the carry bit in a half adder?
* AND
- OR
- NOT
= A carry only happens when both bits are 1.

Q: What is special about NAND?
- It's the only gate that can use more than one input
* Every other gate can be built from it
- It's the only gate that doesn't need any transistors
= One type of gate is enough, in principle, for a whole computer.

Q[transfer]: A door opens only if a card is valid and the time is within office hours. Which gate describes this?
* AND
- OR
- XOR
= Both conditions must be true.

Q[transfer]: A bit is XORed with a key bit, and then XORed with the same key bit again. What comes out?
- Always 0, whatever the bit was to begin with
- Always 1, whatever the bit was to begin with
* The original bit
= XOR twice with one key undoes itself, which is why encryption uses it.

Q[transfer]: An alert should fire if an account is new or the amount is large, including when both are true. Which gate fits?
- XOR
* OR
- NAND
= OR includes the case where both are true. XOR would miss it.

# Cards
What does each gate do: AND, OR, NOT, XOR? :: AND needs both. OR needs at least one. NOT flips. XOR needs the inputs to differ.
What is a transistor? :: A tiny electronic switch with no moving parts.
How do gates add two bits? :: XOR gives the sum, and AND gives the carry. That's a half adder.
What's special about NAND? :: All other gates can be built from it.
How many rows has a truth table for n inputs? :: 2^n.

# Further
- Nand2Tetris, build a computer from NAND gates, free :: https://www.nand2tetris.org/
- OpenStax Introduction to Computer Science :: https://openstax.org/details/books/introduction-computer-science
