---
id: na-simplifying
pack: Numbers and Algebra · First algebra
title: Simplifying expressions
minutes: 35
source: OpenStax · Prealgebra 2e · Section 2.2
url: https://openstax.org/books/prealgebra-2e/pages/2-2-evaluate-simplify-and-translate-expressions
courses: The base of all later maths and statistics
format: 2
teaches: like-terms; collect-terms; distribute-brackets; simplify-with-powers
uses: variables; expressions; algebra-notation; evaluate-expressions; multiply-powers; add-subtract-negatives; multiply-divide-negatives
---
# Goal
Combine like terms, multiply out a bracket, handle minus signs in front of brackets, and test your result by substituting a number.

# Why
You can't solve an equation until you've tidied it. Simplifying is what makes messy expressions manageable, and you'll do it on almost every line of algebra for the rest of your degree. It also teaches a habit used in programming and proof: rewriting something so that it looks simpler, while keeping its value exactly the same.

# Warm-up
?? Work out $7 - 12 + 2$.
=> −3.

?? Find the value of $2x + 3$ when $x = -4$.
=> −5.

# Lesson
## Like terms
**Like terms** have exactly the same letters raised to exactly the same powers. Only the coefficients can differ.

| Terms | Like? | Why |
| --- | --- | --- |
| $3x$ and $5x$ | Yes | Both are $x$ |
| $2x^2$ and $-7x^2$ | Yes | Both are $x^2$ |
| $4xy$ and $yx$ | Yes | $xy$ and $yx$ are the same |
| $3x$ and $3y$ | No | Different letters |
| $x$ and $x^2$ | No | Different powers |
| $5$ and $5x$ | No | One has no letter |

You can add or subtract only like terms. Add the coefficients, and keep the letter part.

$$3x + 5x = 8x \qquad 2x^2 - 7x^2 = -5x^2 \qquad x + x = 2x$$

Why does it work? Because $3x + 5x$ means three lots of a number, plus five lots of the same number, which is eight lots.

> Mistake: Combining unlike terms. $3x + 2y$ isn't $5xy$, and $x + x^2$ isn't $x^3$. They stay as they are. Test it: when $x = 2$, $x + x^2 = 6$, but $x^3 = 8$.

## Collecting terms
In a longer expression, gather each kind. Each term keeps the sign in front of it.

### Worked example: $5x + 3y - 2x + 7 - y - 4$
| Kind | Terms | Result |
| --- | --- | --- |
| $x$ terms | $5x - 2x$ | $3x$ |
| $y$ terms | $3y - y$ | $2y$ |
| Numbers | $7 - 4$ | $3$ |

The answer is $3x + 2y + 3$.

It's usual to write the highest power first, then alphabetical order, then the constant, as in $2x^2 + 3x - 5$.

?? Simplify $4a - 7b + a + 2b$.
=> $5a - 5b$.

## Multiplying terms
Multiplying isn't the same as collecting. Terms needn't be alike. Multiply the numbers and use the rules of powers.

$$3x \times 4y = 12xy \qquad 2x \times 5x = 10x^2 \qquad x^2 \times x^3 = x^5 \qquad \frac{12x^3}{4x} = 3x^2$$

Compare the two:

| Operation | Example | Result |
| --- | --- | --- |
| Adding | $x + x$ | $2x$ |
| Multiplying | $x \times x$ | $x^2$ |

These are two of the most often confused results in all of algebra. If you're not sure, try $x = 3$: $3 + 3 = 6$ and $3 \times 3 = 9$.

## Multiplying out a bracket
The distributive law, which you've already used in long multiplication, says that a number outside multiplies everything inside:

$$a(b + c) = ab + ac$$

$$3(x + 4) = 3x + 12 \qquad 2x(x - 5) = 2x^2 - 10x$$

It's easy to see with numbers: $3(10 + 4) = 3 \times 14 = 42$, and $3 \times 10 + 3 \times 4 = 42$.

> Mistake: Multiplying just the first term. $3(x + 4)$ isn't $3x + 4$. The 3 multiplies both terms.

### A minus sign in front
This is where most sign errors happen. A minus outside means multiply everything inside by −1, so every sign flips.

$$-(x - 5) = -x + 5$$

$$-2(3x - 4) = -6x + 8$$

### Worked example: $3(2x + 1) - 2(x - 4)$
| Step | Result |
| --- | --- |
| Multiply out the first | $6x + 3 - 2(x - 4)$ |
| Multiply out the second, flipping signs | $6x + 3 - 2x + 8$ |
| Collect | $4x + 11$ |

> Mistake: Flipping only the first sign. $5 - (x - 3)$ is $5 - x + 3 = 8 - x$. It isn't $5 - x - 3$.

## Testing your answer
You can test any simplification. Pick a number for each letter, and try it in the original and in your answer. They must match. Avoid 0 and 1, which hide many errors.

For $3(2x + 1) - 2(x - 4) = 4x + 11$, try $x = 5$:

| Version | Calculation | Result |
| --- | --- | --- |
| Original | $3(11) - 2(1)$ | 31 |
| Simplified | $4(5) + 11$ | 31 |

They match, so the simplification is almost certainly right. It takes seconds, and it catches the sign errors that lose marks. Programmers use the same idea when they test code on sample inputs.

If they don't match, you've got an error somewhere. A match on one number isn't a full proof, though. In rare cases, a wrong answer can agree on a single value. Testing a second number makes that very unlikely.

### Real use
Income from a shop that sells $x$ items at ₦500 and $y$ at ₦800, minus costs of ₦200 for each $x$ item, ₦300 for each $y$ item, and a fixed ₦5,000, can be simplified:

$$500x + 800y - 200x - 300y - 5{,}000 = 300x + 500y - 5{,}000$$

Now you can read the profit per item directly: ₦300 on each $x$ and ₦500 on each $y$. These numbers are invented, to show the method. Simplifying isn't only exercises. It's how you see what a formula is really saying.

# Exercises
?? Simplify $6x - 2 + 3x + 9$.
=> $9x + 7$.

?? Simplify $2a^2 + 5a - a^2 + a$.
=> $a^2 + 6a$.

?? Simplify $3x \times 5x^2$.
=> $15x^3$.

?? Multiply out $4(2x - 3)$.
=> $8x - 12$.

?? Simplify $5(x + 2) - 3(x - 1)$.
=> $5x + 10 - 3x + 3 = 2x + 13$.

?? Simplify $x - (4 - x)$.
=> $x - 4 + x = 2x - 4$.

# Practice
1. Write out two real costs that apply to the same thing with different numbers: for example, the cost of $d$ days of transport at two different fares, plus a bundle. Write it as one expression, and simplify it.
2. Test your simplified version with a real number, and check it against the long version.
3. Make up an expression of your own that needs one bracket with a minus in front. Simplify it, then test it with $x = 3$ and $x = -2$.
4. Spot the error in each: $2x + 3x = 5x^2$, $3(x + 2) = 3x + 2$, and $4 - (x - 1) = 3 - x$. Correct them, and show a number that proves each is wrong.

Write your real expression, your tests, and your corrections.

# Rubric
- I simplified an expression from my real costs and tested it.
- I handled a minus in front of a bracket, flipping every sign.
- I used a number to prove three wrong answers wrong.

# Summary
- Like terms have the same letters at the same powers. Only like terms can be added.
- $x + x = 2x$, but $x \times x = x^2$.
- A number outside a bracket multiplies everything inside.
- A minus in front of a bracket flips every sign inside.
- Test your answer by substituting a number that isn't 0 or 1.

# Check
Q: Simplify ${a}x + {b}x$. What's the coefficient of $x$?
P: Like terms
Vars: a=2..15, b=2..15
F: a+b
= Like terms: add the coefficients. {a} + {b} = {a+b}.

Q: Which pair are like terms?
P: Like terms
- $3x$ and $3x^2$
* $5ab$ and $-2ba$
- $4y$ and $4$
= $ab$ and $ba$ are the same, as order doesn't matter when multiplying.

Q: Simplify $3a + 2b - a + 4b$, in the form 2a + 6b.
P: Collecting terms
A: 2a + 6b | 2a+6b
= $3a - a = 2a$, and $2b + 4b = 6b$.

Q: Simplify $2x \times 3x$.
P: Multiplying terms
A: 6x^2 | 6x² | 6 x^2
= $2 \times 3 = 6$, and $x \times x = x^2$.

Q: Which is $x + x$?
P: Multiplying terms
* $2x$
- $x^2$
- $2x^2$
= Two lots of $x$. $x^2$ is what $x \times x$ gives.

Q: Multiply out $5(x - 2)$.
P: Multiplying out a bracket
A: 5x - 10 | 5x-10 | 5x − 10 | 5x−10
= The 5 multiplies both terms.

Q: Simplify $-(2x - 7)$.
P: Multiplying out a bracket
A: -2x + 7 | -2x+7 | −2x + 7 | −2x+7 | 7 - 2x | 7-2x | 7 − 2x
= The minus sign flips every sign inside.

Q: Simplify $4(x + 3) - 2(x + 1)$, in the form ax + b.
P: Multiplying out a bracket
A: 2x + 10 | 2x+10
= $4x + 12 - 2x - 2 = 2x + 10$.

Q: To test a simplification, which value is the worst one to pick?
P: Testing your answer
- $x = 3$
- $x = 5$
* $x = 1$
= With $x = 1$, $x$, $x^2$ and $x^3$ all equal 1, so many errors stay hidden.

Q[transfer]: A student claims $(x + 1)(x + 1) = x^2 + 1$. Test with $x = 2$. What does the left side give?
P: Testing your answer
A: 9 | nine
= $3 \times 3 = 9$, while $4 + 1 = 5$. So the claim is false, and you'll see the correct version soon.

Q[transfer]: A shop's profit is $700x - 400x - 2{,}000$, where $x$ is the number of items sold. How much profit does each extra item add, in naira?
P: Testing your answer
A: 300 | ₦300
= It simplifies to $300x - 2{,}000$, so each item adds ₦300.

Q[transfer]: A spreadsheet has `=A1+A1+A1` in one cell, and `=A1*3` in another. What can you say about them?
P: Like terms
* They always give the same value, as $x + x + x = 3x$
- The first one is larger, because adding gives more than multiplying
- They only match when the number stored in A1 is exactly 3
= Like terms collect the same way in a sheet. The second is just tidier.

# Cards
What are like terms? :: Terms with the same letters at the same powers.
What's the difference between $x + x$ and $x \times x$? :: $x + x = 2x$, and $x \times x = x^2$.
What does a number outside a bracket do? :: It multiplies every term inside.
What does a minus sign in front of a bracket do? :: It flips every sign inside.
How do you test a simplification? :: Put the same number in both versions. Avoid 0 and 1.

# Further
- OpenStax Prealgebra 2e, Evaluate, simplify and translate expressions :: https://openstax.org/books/prealgebra-2e/pages/2-2-evaluate-simplify-and-translate-expressions
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
