---
id: na-expanding
pack: Numbers and Algebra · Polynomials and quadratics
title: Expanding brackets
minutes: 40
source: OpenStax · Elementary Algebra 2e · Section 6.3
url: https://openstax.org/books/elementary-algebra-2e/pages/6-3-multiply-polynomials
courses: The base of all later maths and statistics
format: 2
teaches: polynomial-terms; expand-two-brackets; perfect-squares; difference-of-squares
uses: distribute-brackets; collect-terms; multiply-powers; like-terms; multiply-divide-negatives
---
# Goal
Multiply two brackets, know the special results by heart, and avoid the most common algebra error of all.

# Why
Expanding is how complicated expressions become ones you can work with. Quadratics, which come next, are mostly expanding run backwards. The result $(a + b)^2 = a^2 + 2ab + b^2$ is everywhere from statistics to machine learning, and people who think it's $a^2 + b^2$ lose marks for years. By the end of this lesson, you won't be one of them.

# Warm-up
?? Multiply out $3(x - 4)$.
=> $3x - 12$.

?? Simplify $x^2 + 3x + 2x + 6$.
=> $x^2 + 5x + 6$.

# Lesson
## Polynomials
A **polynomial** is an expression made of terms with whole-number powers of a letter, added together: $3x^2 - 5x + 7$. The highest power is its **degree**.

| Expression | Name | Degree |
| --- | --- | --- |
| $5x + 2$ | Linear | 1 |
| $x^2 - 3x + 1$ | Quadratic | 2 |
| $2x^3 + x$ | Cubic | 3 |
| $\frac{1}{x}$ or $\sqrt{x}$ | Not a polynomial | |

To **expand** means to multiply out the brackets.

## Two brackets
What is $(x + 3)(x + 2)$? The distributive law still applies. Everything in the first bracket multiplies everything in the second.

$$(x + 3)(x + 2) = x(x + 2) + 3(x + 2) = x^2 + 2x + 3x + 6 = x^2 + 5x + 6$$

### As an area
Picture a rectangle with sides $x + 3$ and $x + 2$. Its area is the sum of four pieces:

| | $x$ | $+3$ |
| --- | --- | --- |
| $x$ | $x^2$ | $3x$ |
| $+2$ | $2x$ | $6$ |

Adding the pieces gives $x^2 + 5x + 6$. This grid method works for any brackets, and it's a safe way to keep track of every term.

### The four products
Every pair must be multiplied. Some books call it FOIL: First, Outer, Inner, Last.

| Pair | $(x + 3)(x + 2)$ |
| --- | --- |
| First | $x \times x = x^2$ |
| Outer | $x \times 2 = 2x$ |
| Inner | $3 \times x = 3x$ |
| Last | $3 \times 2 = 6$ |

### With minus signs
Each term takes the sign in front of it. Then the sign rules apply.

$$(x - 4)(x + 5) = x^2 + 5x - 4x - 20 = x^2 + x - 20$$

$$(x - 3)(x - 2) = x^2 - 2x - 3x + 6 = x^2 - 5x + 6$$

$$(2x + 1)(3x - 4) = 6x^2 - 8x + 3x - 4 = 6x^2 - 5x - 4$$

?? Expand $(x + 7)(x - 2)$.
=> $x^2 - 2x + 7x - 14 = x^2 + 5x - 14$.

### More terms
The rule stays the same. Each term in one bracket multiplies each term in the other.

$$(x + 2)(x^2 + 3x + 1) = x^3 + 3x^2 + x + 2x^2 + 6x + 2 = x^3 + 5x^2 + 7x + 2$$

## The two special results
### A perfect square
$$(a + b)^2 = (a + b)(a + b) = a^2 + ab + ab + b^2 = a^2 + 2ab + b^2$$

$$(a - b)^2 = a^2 - 2ab + b^2$$

In words: square the first, double the product, square the last.

$$(x + 5)^2 = x^2 + 10x + 25 \qquad (2x - 3)^2 = 4x^2 - 12x + 9$$

> Mistake: This is the big one. $(x + 5)^2$ is **not** $x^2 + 25$. You've already seen that powers don't spread over adding. Test with $x = 1$: $(1 + 5)^2 = 36$, but $1 + 25 = 26$. The middle term, $10x$, is what's missing.

On the area grid, you can see the missing pieces. A square of side $a + b$ has an $a^2$ corner and a $b^2$ corner, plus two rectangles of area $ab$. Leaving those two rectangles out leaves holes.

### The difference of two squares
$$(a + b)(a - b) = a^2 - ab + ab - b^2 = a^2 - b^2$$

The middle terms cancel. So $(x + 4)(x - 4) = x^2 - 16$, and $(3x + 1)(3x - 1) = 9x^2 - 1$.

It also gives a good trick with numbers: $51 \times 49 = (50 + 1)(50 - 1) = 2{,}500 - 1 = 2{,}499$.

## Testing and using it
Test with a number that isn't 0 or 1, as before. For $(x - 4)(x + 5) = x^2 + x - 20$, try $x = 3$:

| Version | Calculation | Result |
| --- | --- | --- |
| Original | $(-1)(8)$ | −8 |
| Expanded | $9 + 3 - 20$ | −8 |

### Where it's used
A rectangular field is 10 m longer than it's wide. If its width is $x$ m, its area in square metres is $x(x + 10) = x^2 + 10x$. A square of side $x$ extended by 3 m on each side has an area of $(x + 3)^2 = x^2 + 6x + 9$, which is much more than $x^2 + 9$.

In statistics, expanding $(x - m)^2$, the squared distance from an average, gives $x^2 - 2xm + m^2$. It's one step in showing how variance is calculated, as you'll see later.

In compound interest over two years, $P(1 + r)^2 = P(1 + 2r + r^2)$. The $r^2$ term is the "interest on the interest". That's the part simple adding leaves out.

### With three factors
Expand two brackets first, then multiply by the third. $(x + 1)(x + 2)(x + 3) = (x^2 + 3x + 2)(x + 3) = x^3 + 6x^2 + 11x + 6$. Test with $x = 2$: $3 \times 4 \times 5 = 60$, and $8 + 24 + 22 + 6 = 60$. It works.

# Exercises
?? Expand $(x + 4)(x + 6)$.
=> $x^2 + 10x + 24$.

?? Expand $(x - 5)(x + 2)$.
=> $x^2 - 3x - 10$.

?? Expand $(3x - 2)(x - 4)$.
=> $3x^2 - 12x - 2x + 8 = 3x^2 - 14x + 8$.

?? Expand $(x + 6)^2$.
=> $x^2 + 12x + 36$.

?? Expand $(x - 9)(x + 9)$.
=> $x^2 - 81$.

?? Work out $102 \times 98$ using a special result.
=> $(100 + 2)(100 - 2) = 10{,}000 - 4 = 9{,}996$.

# Practice
1. Draw the area grid on paper for $(x + 4)(x + 3)$. Choose a real length for $x$, such as 5 cm, then draw the rectangle to scale. Check that the four pieces add up to the whole.
2. Show with a real picture why $(x + 3)^2$ isn't $x^2 + 9$. Draw the square and shade the pieces that would be missing.
3. Expand three pairs of your own, one with minus signs, and test each with $x = 3$.
4. Use the difference of two squares to do $29 \times 31$ and $48 \times 52$ in your head.

Write your drawing's numbers, your three expansions and your tests.

# Rubric
- I drew an area grid to scale, and checked the pieces add up.
- I showed what's missing from $x^2 + 9$ with a real picture.
- I expanded three pairs, and tested each with a number.

# Summary
- Everything in one bracket multiplies everything in the other.
- The area grid keeps track of every product.
- $(a + b)^2 = a^2 + 2ab + b^2$. Don't forget the middle term.
- $(a + b)(a - b) = a^2 - b^2$. The middle terms cancel.
- Test with a number that isn't 0 or 1.

# Check
Q: Expand $(x + {a})(x + {b})$. What's the coefficient of $x$?
P: Two brackets
Vars: a=2..12, b=2..12
F: a+b
= The middle terms add up: {a} + {b} = {a+b}.

Q: Expand $(x + {a})(x + {b})$. What's the constant term?
P: Two brackets
Vars: a=2..12, b=2..12
F: a*b
= The last two terms multiply: {a} × {b} = {a*b}.

Q: Expand $(x - 3)(x + 7)$, in the form x^2 + ax + b.
P: Two brackets
A: x^2 + 4x - 21 | x² + 4x - 21 | x^2+4x-21 | x²+4x-21 | x^2 + 4x − 21 | x² + 4x − 21
= $x^2 + 7x - 3x - 21$.

Q: Which is $(x + 5)^2$?
P: The two special results
- $x^2 + 25$
* $x^2 + 10x + 25$
- $x^2 + 5x + 25$
= Square the first, double the product, square the last.

Q: Which is $(x - 4)^2$?
P: The two special results
- $x^2 - 16$
- $x^2 + 8x - 16$
* $x^2 - 8x + 16$
= The last term is positive, as $(-4)^2 = 16$, and the middle one is $-8x$.

Q: Expand $(x + 8)(x - 8)$, in the form x^2 - b.
P: The two special results
A: x^2 - 64 | x² - 64 | x^2-64 | x²-64 | x^2 − 64 | x² − 64
= It's the difference of two squares. The middle terms cancel.

Q: What is $61 \times 59$, using the difference of two squares?
P: The two special results
A: 3599 | 3,599
= $(60 + 1)(60 - 1) = 3{,}600 - 1$.

Q: What's the degree of $4x^3 - x + 2$?
P: Polynomials
A: 3 | three
= The highest power is 3, so it's a cubic.

Q[transfer]: A student writes $(x + 2)^2 = x^2 + 4$. What does $x = 3$ show?
P: Testing and using it
* The left side is 25 and the right side is 13, so it's false
- Both sides come to 13, so that's a true statement here
- Both sides come to 25, so it's true for every value of $x$
= Test it, and the missing term $4x$ shows itself.

Q[transfer]: A square plot of side $x$ m has each side increased by 2 m. How much does the area grow by?
P: Testing and using it
- 4 square metres, always
* $4x + 4$ square metres
- $2x + 4$ square metres
= $(x + 2)^2 - x^2 = 4x + 4$. It depends on the size of the plot.

Q[transfer]: For 2 years of compound interest, $P(1 + r)^2$ expands to $P + 2Pr + Pr^2$. What does $Pr^2$ represent?
P: Testing and using it
- The fee that banks charge on each of the two years
* The extra earned as interest on the first year's interest
- The money that you started with, before any interest
= Simple interest would stop at $P + 2Pr$. The last term is interest on interest.

# Cards
What is a polynomial? :: Terms with whole-number powers of a letter, added together.
What does expanding two brackets involve? :: Every term in one multiplies every term in the other.
What is $(a + b)^2$? :: $a^2 + 2ab + b^2$.
What is $(a - b)^2$? :: $a^2 - 2ab + b^2$.
What is $(a + b)(a - b)$? :: $a^2 - b^2$.
Is $(x + 5)^2 = x^2 + 25$? :: No. The middle term $10x$ is missing.

# Further
- OpenStax Elementary Algebra 2e, Add and subtract polynomials :: https://openstax.org/books/elementary-algebra-2e/pages/6-1-add-and-subtract-polynomials
- OpenStax Elementary Algebra 2e, Multiply polynomials :: https://openstax.org/books/elementary-algebra-2e/pages/6-3-multiply-polynomials
