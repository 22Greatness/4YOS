---
id: na-discriminant
pack: Numbers and Algebra · Polynomials and quadratics
title: Roots and the discriminant
minutes: 30
source: OpenStax · Elementary Algebra 2e · Section 10.3
url: https://openstax.org/books/elementary-algebra-2e/pages/10-3-solve-quadratic-equations-using-the-quadratic-formula
courses: The base of all later maths and statistics
format: 2
teaches: discriminant; number-of-roots; sum-product-of-roots; build-quadratic-from-roots
uses: quadratic-formula; quadratic-graph; turning-point; factor-trinomial; expand-two-brackets
---
# Goal
Use the part inside the root to say how many solutions a quadratic has without solving it, link that to the graph, and build a quadratic from its roots.

# Why
Sometimes the key question isn't "what are the solutions?" but "are there any?". Can this price ever make a profit? Will this ball reach that height? Will my program crash on this input? The discriminant answers these in one short calculation. It's also the first time you'll see a part of a formula carry real meaning on its own.

# Warm-up
?? Work out $b^2 - 4ac$ for $x^2 + 5x + 6 = 0$.
=> $25 - 24 = 1$.

?? Where does a quadratic's curve meet the $x$ axis?
=> At the roots, where $y = 0$.

# Lesson
## The part under the root
In the quadratic formula, the part inside the square root is called the **discriminant**. It's often given the Greek letter delta, $\Delta$, or just $D$.

$$\Delta = b^2 - 4ac$$

$$x = \frac{-b \pm \sqrt{\Delta}}{2a}$$

The word means "that which tells apart". Its sign tells apart the three possible cases.

## Three cases
| $\Delta$ | The root | Solutions | Example |
| --- | --- | --- | --- |
| Positive | A real number, and $\pm$ gives two values | Two different roots | $x^2 - 5x + 6 = 0$, $\Delta = 1$ |
| Zero | $\sqrt{0} = 0$, so $\pm$ changes nothing | One repeated root | $x^2 - 6x + 9 = 0$, $\Delta = 0$ |
| Negative | No ordinary root | No ordinary roots | $x^2 + 2x + 5 = 0$, $\Delta = -16$ |

### Worked examples
For $x^2 - 6x + 9 = 0$: $\Delta = 36 - 36 = 0$. There's one repeated root. In fact, $(x - 3)^2 = 0$, so $x = 3$.

For $x^2 + 2x + 5 = 0$: $\Delta = 4 - 20 = -16$. There are no ordinary solutions.

For $2x^2 - 3x - 4 = 0$: $\Delta = 9 + 32 = 41$. There are two different roots. Since 41 isn't a perfect square, they're surds.

If $\Delta$ is a **perfect square**, such as 1, 4, 9 or 49, the roots are simple fractions or whole numbers, and the quadratic factorises neatly. So $\Delta$ also tells you if factorising is worth trying.

> Mistake: Using the wrong signs in $b^2 - 4ac$. If $a$ and $c$ have opposite signs, then $-4ac$ is positive, and $\Delta$ is sure to be positive too. Use brackets: for $a = 2$, $b = -3$, $c = -4$, it's $(-3)^2 - 4(2)(-4) = 9 + 32$.

?? How many roots does $x^2 + 4x + 7 = 0$ have?
=> $\Delta = 16 - 28 = -12$. Negative, so there are no ordinary roots.

## What it looks like
The three cases are the three ways a U shape can sit against the $x$ axis.

```diagram
{"kind":"graph","alt":"A U-shaped curve y equals x squared plus 2x plus c. A slider changes c. With c below 1 the curve crosses the x axis twice. With c equal to 1 it just touches. With c above 1 it stays above the axis.","x":[-6,4],"y":[-4,10],"curves":[{"fn":"x*x+2*x+c","label":"y = x² + 2x + c"}],"sliders":[{"name":"c","min":-3,"max":5,"step":1,"value":-3}],"points":[]}
```

Move the slider. Here, $a = 1$ and $b = 2$, so $\Delta = 4 - 4c$.

| $c$ | $\Delta$ | Curve |
| --- | --- | --- |
| −3 | 16 | Crosses the axis twice |
| 0 | 4 | Crosses the axis twice |
| 1 | 0 | Just touches the axis, at the turning point |
| 3 | −8 | Stays above the axis |

When $\Delta = 0$, the turning point sits exactly on the axis. That's why the two roots become one.

### What about negative discriminants?
Later courses introduce **complex numbers**, which do include square roots of negatives. For this course, and for the graph, "no ordinary root" means that the curve doesn't reach the axis.

## Finding an unknown
Sometimes the discriminant is used to find a value. For what value of $k$ does $x^2 + 6x + k = 0$ have exactly one root?

We need $\Delta = 0$:

$$36 - 4k = 0 \quad\Rightarrow\quad k = 9$$

Check: $x^2 + 6x + 9 = (x + 3)^2$. Yes, that has one repeated root.

For which $k$ does it have two different roots? We need $\Delta > 0$, so $36 - 4k > 0$, and $k < 9$. Here, you need the inequality skills from before.

### Worked example: can it reach that height?
A ball's height in metres is $h = 20t - 5t^2$. Does it ever reach 25 m? Set $h = 25$:

$$5t^2 - 20t + 25 = 0 \quad\Rightarrow\quad t^2 - 4t + 5 = 0$$

$\Delta = 16 - 20 = -4$. It's negative, so the ball never reaches 25 m. No time works. We didn't have to do any trial and error. The highest it reaches is where $\Delta = 0$, which works out to be 20 m.

## Roots and coefficients
There's a neat link between a quadratic's roots and its coefficients. If $x^2 + bx + c = 0$ has roots $p$ and $q$, then it factorises as $(x - p)(x - q) = 0$. Expand:

$$x^2 - (p + q)x + pq = 0$$

So for an equation of this form:

$$\text{Sum of roots} = -b \qquad \text{Product of roots} = c$$

Check with $x^2 - 5x + 6 = 0$: the roots are 2 and 3. Their sum is $5 = -(-5)$, and their product is 6.

### Building a quadratic from its roots
Want an equation with roots 4 and −1? Write $(x - 4)(x + 1) = 0$, which is $x^2 - 3x - 4 = 0$.

> Mistake: Writing $(x + 4)$ for a root of 4. The root is where the bracket is zero, so for a root of 4, you need $(x - 4)$.

### Protecting a program
A program solving a quadratic has to test $\Delta$ first, or the square root of a negative number will crash it. You'll learn Python in a later course, and you don't need to know it yet. Just read the idea:

```python
import math
a, b, c = 1, 2, 5
d = b * b - 4 * a * c
if d < 0:
    print("no real roots")
elif d == 0:
    print("one root:", -b / (2 * a))
else:
    print("two roots:", (-b + math.sqrt(d)) / (2 * a), (-b - math.sqrt(d)) / (2 * a))
```

```output
no real roots
```

Cases like this, the ones that break the usual path, are called **edge cases**. Thinking through them is what separates careful programmers from careless ones.

# Exercises
?? Find $\Delta$ for $3x^2 + 2x - 1 = 0$. How many roots are there?
=> $4 + 12 = 16$. Positive, so two roots, and since 16 is a perfect square, it factorises.

?? How many roots does $4x^2 - 4x + 1 = 0$ have?
=> $16 - 16 = 0$, so one repeated root: $x = \frac{1}{2}$.

?? How many roots does $2x^2 + x + 3 = 0$ have?
=> $1 - 24 = -23$, so no ordinary roots.

?? Find $k$ so that $x^2 - 8x + k = 0$ has one repeated root.
=> $64 - 4k = 0$, so $k = 16$.

?? What's the sum and product of the roots of $x^2 - 9x + 14 = 0$?
=> Sum 9, product 14. The roots are 2 and 7.

?? Write a quadratic with roots 3 and −5.
=> $(x - 3)(x + 5) = x^2 + 2x - 15 = 0$.

# Practice
1. Write three quadratics of your own, one for each case: two roots, one root and no roots. Use $\Delta$ to prove which is which.
2. For each one, work out $y$ for six values of $x$, and sketch the curve. Does the picture agree with $\Delta$?
3. Set up a real "can it ever reach?" question. For example, a profit model like $P = -x^2 + 10x - 30$ asks whether profit can ever reach zero. Use your own likely numbers. Use $\Delta$ to answer it.
4. Choose any two numbers as the roots, and build the quadratic. Solve it using the formula to confirm you get them back.

Write your three equations, what your sketches showed, and your answer to the real question.

# Rubric
- I made and proved one quadratic for each of the three cases.
- My sketches agreed with what $\Delta$ said.
- I answered a real "can it reach?" question using $\Delta$.

# Summary
- The discriminant is $\Delta = b^2 - 4ac$.
- Positive: two roots. Zero: one repeated root. Negative: no ordinary roots.
- On a graph: crosses twice, touches once, or doesn't reach the axis.
- A perfect square $\Delta$ means that it factorises neatly.
- For $x^2 + bx + c = 0$, the roots sum to $-b$ and multiply to $c$.
- Roots $p$ and $q$ give $(x - p)(x - q) = 0$.

# Check
Q: For $x^2 + {b}x + {c} = 0$, what's $\Delta$?
P: The part under the root
Vars: b=2..12, c=1..12
F: b*b-4*c
= {b} squared, minus 4 × {c}, is {b*b-4*c}.

Q: $\Delta$ is 0. How many different roots are there?
P: Three cases
A: 1 | one
= $\pm\sqrt{0}$ changes nothing, so there's one repeated root.

Q: $\Delta$ is negative. What does the curve do?
P: What it looks like
- It crosses the $x$ axis in two different places
- It only just touches the $x$ axis at its lowest point
* It doesn't reach the $x$ axis at all
= There are no ordinary roots, so the curve stays on one side.

Q: How many roots does $x^2 - 4x + 4 = 0$ have?
P: Three cases
A: 1 | one
= $\Delta = 16 - 16 = 0$. It's $(x - 2)^2$.

Q: How many roots does $x^2 + x + 1 = 0$ have?
P: Three cases
A: 0 | none | zero | no roots
= $\Delta = 1 - 4 = -3$.

Q: Find $k$ so that $x^2 + 4x + k = 0$ has exactly one root.
P: Finding an unknown
A: 4 | k = 4 | k=4 | four
= $16 - 4k = 0$.

Q: What's the sum of the roots of $x^2 - 11x + 24 = 0$?
P: Roots and coefficients
A: 11 | eleven
= Sum of roots is $-b = 11$. They're 3 and 8.

Q: A quadratic has roots 2 and −7. Which is its equation?
P: Roots and coefficients
- $(x + 2)(x - 7) = 0$
* $(x - 2)(x + 7) = 0$
- $(x + 2)(x + 7) = 0$
= A root is where the bracket is zero.

Q[transfer]: A ball's height is $h = 30t - 5t^2$. A student asks whether it reaches 50 m. For $5t^2 - 30t + 50 = 0$, $\Delta$ is negative. What does this mean?
P: Finding an unknown
* No time gives a height of 50 m, so the ball never gets there
- The ball reaches 50 m at some moment before its time starts
- The model is broken, as a discriminant is never negative
= $\Delta = 900 - 1{,}000 = -100$. No time works.

Q[transfer]: A program solves quadratics and crashes on $x^2 + 2x + 5 = 0$. What's the most likely cause?
P: Roots and coefficients
- The program can't do $x^2$ when the coefficient $a$ equals 1
* $\Delta$ is negative, and the program takes its square root without testing
- The program doesn't accept any equations in which $c$ is odd
= Testing $\Delta$ first handles this edge case.

Q[transfer]: For which values of $k$ does $x^2 + 2x + k = 0$ have two different roots?
P: Finding an unknown
- $k > 1$
* $k < 1$
- $k = 1$
= $\Delta = 4 - 4k > 0$, so $k < 1$.

# Cards
What's the discriminant? :: $\Delta = b^2 - 4ac$, the part under the root in the formula.
What does a positive discriminant mean? :: Two different roots. The curve crosses the axis twice.
What does a zero discriminant mean? :: One repeated root. The curve touches the axis.
What does a negative discriminant mean? :: No ordinary roots. The curve doesn't reach the axis.
What does a perfect-square discriminant tell you? :: The quadratic factorises neatly.
What's the sum and product of roots of $x^2 + bx + c = 0$? :: The sum is $-b$, and the product is $c$.

# Further
- OpenStax Elementary Algebra 2e, Solve quadratic equations using the quadratic formula :: https://openstax.org/books/elementary-algebra-2e/pages/10-3-solve-quadratic-equations-using-the-quadratic-formula
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
