---
id: na-order-of-operations
pack: Numbers and Algebra · Whole numbers
title: Order of operations
minutes: 35
source: OpenStax · Prealgebra 2e · Section 2.2
url: https://openstax.org/books/prealgebra-2e/pages/2-2-evaluate-simplify-and-translate-expressions
courses: The base of all later maths and statistics
format: 2
teaches: bodmas; brackets; left-to-right-rule
uses: long-multiplication; long-division; column-addition; column-subtraction
---
# Goal
Work out any calculation with several operations in the correct order, and use brackets to say exactly what you mean.

# Why
A calculation like 2 + 3 × 4 has only one right answer, but only if everyone follows the same rule. That rule runs through all of maths, and spreadsheets and programs follow it exactly too. Getting the order wrong gives a confident, wrong answer with no warning, which is one of the commonest reasons for lost exam marks and for bugs in formulas.

# Warm-up
?? What is 36 × 4?
=> 144.

?? What is 96 ÷ 8?
=> 12.

# Lesson
## Why we need a rule
What is $2 + 3 \times 4$? Working from left to right gives $5 \times 4 = 20$. Multiplying first gives $2 + 12 = 14$. They can't both be right, and in maths we can't leave it to chance.

Mathematicians agreed on a fixed order, so a written calculation means the same thing to everybody. The right answer here is **14**, and here's why.

## BODMAS
Work through the calculation in this order.

| Order | Letter | Meaning | Example |
| --- | --- | --- | --- |
| 1 | **B** | Brackets | $(2 + 3)$ |
| 2 | **O** | Orders, meaning powers and roots | $3^2$ |
| 3 | **DM** | Division and Multiplication, left to right | $8 \div 2 \times 3$ |
| 4 | **AS** | Addition and Subtraction, left to right | $9 - 4 + 2$ |

You'll meet powers properly in a later unit. For now, $3^2$ means $3 \times 3$.

Some books call this BIDMAS or PEMDAS. They're the same rule, with other names for the same steps.

### Worked example: 20 − 2 × (3 + 4)
| Step | Why | Result |
| --- | --- | --- |
| $20 - 2 \times (3 + 4)$ | Start | |
| $3 + 4 = 7$ | Brackets first | $20 - 2 \times 7$ |
| $2 \times 7 = 14$ | Multiplication next | $20 - 14$ |
| $20 - 14 = 6$ | Subtraction last | $6$ |

Work one step at a time, and copy the rest of the line down each time. Most mistakes happen when people try to do two things in one line.

## Left to right, for equals
The D and M have **equal rank**, and so do the A and S. The name BODMAS makes it look as though division comes before multiplication, and that addition comes before subtraction. It doesn't. Between equals, go from left to right.

| Calculation | Right | Wrong |
| --- | --- | --- |
| $12 \div 3 \times 2$ | $4 \times 2 = 8$ | $12 \div 6 = 2$ |
| $10 - 4 + 3$ | $6 + 3 = 9$ | $10 - 7 = 3$ |

> Mistake: Doing all the additions before all the subtractions because A comes before S. In $10 - 4 + 3$, going strictly left to right gives 9, not 3.

?? Work out $18 \div 3 \times 2 + 1$.
=> Left to right for the division and multiplication: $18 \div 3 = 6$, then $6 \times 2 = 12$. Then add: $12 + 1 = 13$.

## Using brackets
Brackets let you change the order, and say exactly what you mean.

$$2 + 3 \times 4 = 14 \qquad\qquad (2 + 3) \times 4 = 20$$

Inside a bracket, BODMAS applies as usual. With brackets inside brackets, start with the innermost.

### Worked example: 3 × (2 + (5 − 1) × 2)
| Step | Result |
| --- | --- |
| Innermost: $5 - 1 = 4$ | $3 \times (2 + 4 \times 2)$ |
| Inside the bracket, multiply: $4 \times 2 = 8$ | $3 \times (2 + 8)$ |
| Finish the bracket: $2 + 8 = 10$ | $3 \times 10$ |
| Multiply | $30$ |

A fraction bar acts like a bracket too: everything on the top is worked out first, and everything on the bottom too, before you divide. So $\dfrac{4 + 8}{2 + 1} = \dfrac{12}{3} = 4$.

### Turning words into a calculation
"Add 5 to 3, then multiply by 2" must be written $(3 + 5) \times 2$, since without brackets multiplication would happen first. When you turn words into a calculation, ask what happens first, and bracket it.

Extra brackets never hurt. If a reader might be unsure, add them. In code, spreadsheets and exams, clearness is worth more than saving a few characters.

## Calculators and code
Scientific calculators, spreadsheets and programming languages all follow this order. A very simple calculator may not: it may work strictly left to right as you press keys. Test yours by entering $2 + 3 \times 4$. If it says 20, it doesn't follow the rule, so you'll have to enter things in the right order yourself.

Here's the same idea in Python, a programming language you'll learn in a later course. You don't need to know it yet. Just read it: `print` means show the result, `*` means ×, and `/` means ÷. Python shows division results with a decimal point, so 8 appears as 8.0.

```python
print(2 + 3 * 4)
print((2 + 3) * 4)
print(12 / 3 * 2)
print(10 - 4 + 3)
```

```output
14
20
8.0
9
```

In a spreadsheet, a wrong order is a silent error. For an average of two cells, `=A1+B1/2` adds A1 to half of B1. What you need is `=(A1+B1)/2`.

# Exercises
?? Work out $7 + 6 \times 2$.
=> Multiply first: $6 \times 2 = 12$. Then $7 + 12 = 19$.

?? Work out $(7 + 6) \times 2$.
=> Bracket first: $13 \times 2 = 26$.

?? Work out $40 \div 5 \times 2 - 3^2$.
=> Power first: $3^2 = 9$. Left to right: $40 \div 5 = 8$, $8 \times 2 = 16$. Then $16 - 9 = 7$.

?? Work out $\dfrac{6 + 9}{8 - 3}$.
=> Top: 15. Bottom: 5. So $15 \div 5 = 3$.

?? You buy 3 books at ₦1,200 each and pay with ₦5,000. Write one calculation for your change, then work it out.
=> $5{,}000 - 3 \times 1{,}200 = 5{,}000 - 3{,}600 = 1{,}400$. Multiplication happens first, so no brackets are needed.

# Practice
1. Test your calculator. Enter $2 + 3 \times 4$. Does it say 14? Write down what it does.
2. Write one calculation, in a single line, for something real: for example, this month's data cost plus transport cost for all the weeks in the month, minus what you already have.
3. Work it out by hand in steps, copying the line down each time.
4. Enter it in your calculator exactly as written, and compare.
5. Move the brackets so it means something different, and say in words what the new version would mean.

Write down your calculation, your steps, and what the moved brackets would mean.

# Rubric
- I tested how my own calculator handles the order.
- I wrote a real calculation on one line, and worked it step by step.
- I can say in words what moving a bracket changes.

# Summary
- Brackets first, then powers, then division and multiplication, then addition and subtraction.
- Division and multiplication rank equally, so go left to right. The same goes for addition and subtraction.
- Innermost brackets go first, and a fraction bar acts like a bracket.
- Work one step per line, and copy the rest down.
- Spreadsheets and programs follow this order exactly, so a wrong order is a silent error.

# Check
Q: What is {a} + {b} × {c}?
P: BODMAS
Vars: a=2..9, b=2..9, c=2..9
F: a+b*c
= Multiply first: {b} × {c} = {b*c}. Then {a} + {b*c} = {a+b*c}.

Q: What is ({a} + {b}) × {c}?
P: Using brackets
Vars: a=2..9, b=2..9, c=2..9
F: (a+b)*c
= Bracket first: {a+b}. Then {a+b} × {c} = {(a+b)*c}.

Q: What is $24 \div 4 \times 2$?
P: Left to right, for equals
A: 12
= They rank equally, so go left to right: $24 \div 4 = 6$, then $6 \times 2 = 12$.

Q: What is $15 - 6 + 2$?
P: Left to right, for equals
A: 11
= Left to right: $15 - 6 = 9$, then $9 + 2 = 11$.

Q: Put these steps for $5 + 2 \times (8 - 3)^2$ in the right order.
P: BODMAS
O: Work out $8 - 3$ | Square the 5 | Multiply by 2 | Add 5
= Brackets, then powers, then multiplication, then addition. The answer is 55.

Q: What is $\dfrac{10 + 8}{9 - 3}$?
P: Using brackets
A: 3
= A fraction bar acts like a bracket. $18 \div 6 = 3$.

Q: What is $2 \times (3 + (6 - 2) \times 2)$?
P: Using brackets
A: 22
= Innermost first: $6 - 2 = 4$. Inside: $3 + 8 = 11$. Then $2 \times 11 = 22$.

Q: Which calculation means "add 4 to 6, then multiply by 3"?
P: Using brackets
- $4 + 6 \times 3$
* $(4 + 6) \times 3$
- $4 + (6 \times 3)$
= Without the bracket, the multiplication would happen first.

Q[transfer]: In a spreadsheet, you want the average of two scores in A1 and B1. You type `=A1+B1/2`. What goes wrong?
P: Calculators and code
- The sheet rejects it, so you see an error message in the cell
* It adds A1 to half of B1, and shows a wrong number with no warning
- It works correctly, since a spreadsheet always adds before it divides
= Division goes first. You need `=(A1+B1)/2`. Silent errors like this are the most dangerous kind.

Q[transfer]: In Python, `*` means ×. What does `print(10 - 2 * 3)` show?
P: Calculators and code
A: 4
= Python multiplies first: $2 \times 3 = 6$, then $10 - 6 = 4$.

Q[transfer]: A shop gives you 2 items at ₦1,500 each and takes off ₦500 from the total. A friend writes $2 \times 1500 - 500$, and another writes $2 \times (1500 - 500)$. Which one means ₦500 off the total?
P: Using brackets
* The first one, because the multiplication happens before the subtraction
- The second one, because brackets always make a calculation the correct one
- Both of them, because the two calculations always give the same answer
= The first gives ₦2,500. The second takes ₦500 off each item, giving ₦2,000.

# Cards
What does BODMAS stand for? :: Brackets, Orders, Division and Multiplication, Addition and Subtraction.
What order do division and multiplication go in? :: They rank equally, so go left to right. The same goes for addition and subtraction.
What's $2 + 3 \times 4$? :: 14. Multiplication comes first.
How does a fraction bar behave? :: Like a bracket. Work out the top and the bottom before you divide.
Which brackets go first when they're nested? :: The innermost.

# Further
- OpenStax Prealgebra 2e, Evaluate, simplify and translate expressions :: https://openstax.org/books/prealgebra-2e/pages/2-2-evaluate-simplify-and-translate-expressions
- Khan Academy, Algebra basics :: https://www.khanacademy.org/math/algebra-basics
