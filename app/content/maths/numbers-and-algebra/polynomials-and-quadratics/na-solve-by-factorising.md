---
id: na-solve-by-factorising
pack: Numbers and Algebra · Polynomials and quadratics
title: Solving quadratics by factorising
minutes: 40
source: OpenStax · Elementary Algebra 2e · Section 7.6
url: https://openstax.org/books/elementary-algebra-2e/pages/7-6-quadratic-equations
courses: The base of all later maths and statistics
format: 2
teaches: quadratic-equation; zero-product-rule; solve-by-factorising; quadratic-graph; quadratic-word-problems
uses: factor-trinomial; common-factor; factor-difference-of-squares; factor-non-monic; solve-linear; set-up-equations; check-solution
---
# Goal
Rearrange a quadratic equation so one side is zero, solve it by factorising, and see what its solutions look like on a graph.

# Why
Whenever one unknown is multiplied by itself, a quadratic appears: areas, objects thrown in the air, profit that rises then falls. Unlike a linear equation, a quadratic usually has two solutions. Knowing why, and what to do with them, is core algebra. Much of optimisation in statistics and machine learning rests on curves of this shape.

# Warm-up
?? Factorise $x^2 + 5x + 6$.
=> $(x + 2)(x + 3)$.

?? Factorise $x^2 - 4x$.
=> $x(x - 4)$.

# Lesson
## What a quadratic equation is
A **quadratic equation** has $x^2$ as its highest power. Its standard form is:

$$ax^2 + bx + c = 0$$

Here, $a$, $b$ and $c$ are numbers, and $a$ isn't 0. So $x^2 - 5x + 6 = 0$ has $a = 1$, $b = -5$ and $c = 6$.

You can't solve it by the balance method alone. If you try, the $x^2$ and the $x$ stand in each other's way. We need a new idea.

## If a product is zero
Here's the key fact.

**If two numbers multiply to zero, at least one of them must be zero.**

If $A \times B = 0$, then $A = 0$ or $B = 0$. No other way of multiplying gives zero. It's true only for zero. If $A \times B = 6$, you can't conclude anything about either one, as there are too many ways to make 6.

That's why we factorise.

### Worked example: $x^2 - 5x + 6 = 0$
| Step | Result |
| --- | --- |
| Factorise | $(x - 2)(x - 3) = 0$ |
| One bracket must be zero | $x - 2 = 0$ or $x - 3 = 0$ |
| Solve each | $x = 2$ or $x = 3$ |

Check each one in the original:

$x = 2$: $4 - 10 + 6 = 0$. Correct.

$x = 3$: $9 - 15 + 6 = 0$. Correct.

Both are real solutions. A quadratic usually has two, which we call its **roots**.

## Getting it ready
The product must equal **zero**. So first, bring everything to one side.

### Worked example: $x^2 = 3x + 10$
| Step | Result |
| --- | --- |
| Subtract $3x$ and 10 from both sides | $x^2 - 3x - 10 = 0$ |
| Factorise | $(x - 5)(x + 2) = 0$ |
| Solve | $x = 5$ or $x = -2$ |

> Mistake: Using the zero rule without a zero. From $(x - 2)(x - 3) = 6$, you can't say $x - 2 = 6$ or $x - 3 = 6$. Expand it, bring the 6 over, and factorise again. The rule works only with zero.

### A common factor
$x^2 = 4x$. Bring it over: $x^2 - 4x = 0$. Factorise: $x(x - 4) = 0$. So $x = 0$ or $x = 4$.

> Mistake: Dividing both sides by $x$. That gives $x = 4$ and loses the solution $x = 0$. You've divided by something that might be zero, and that's never allowed. Factorise instead.

### A difference of two squares
$x^2 - 49 = 0$ becomes $(x + 7)(x - 7) = 0$, so $x = -7$ or $x = 7$. It's also written $x = \pm 7$, read "plus or minus 7". Taking a root works here too, as long as you keep both signs.

### A coefficient on $x^2$
$2x^2 + 7x + 3 = 0$ becomes $(2x + 1)(x + 3) = 0$. So $2x + 1 = 0$, which gives $x = -\frac{1}{2}$, or $x = -3$.

If all the terms have a common factor, divide it out first. $3x^2 - 12x + 9 = 0$ becomes $x^2 - 4x + 3 = 0$. This is safe because you're dividing by a number that isn't zero.

?? Solve $x^2 + x - 12 = 0$.
=> $(x + 4)(x - 3) = 0$, so $x = -4$ or $x = 3$.

## What it looks like
The graph of $y = x^2 - 5x + 6$ is a curve called a **parabola**. The solutions of $x^2 - 5x + 6 = 0$ are where $y = 0$, which is where the curve crosses the $x$ axis.

```diagram
{"kind":"graph","alt":"A U-shaped curve, y equals x squared minus 5x plus 6. It crosses the x axis at x equals 2 and x equals 3, and its lowest point is between them.","x":[-1,6],"y":[-2,8],"curves":[{"fn":"x*x-5*x+6","label":"y = x² − 5x + 6"}],"points":[{"x":2,"y":0,"label":"x = 2"},{"x":3,"y":0,"label":"x = 3"}]}
```

Now you can see why there are usually two solutions. A U shape usually crosses a line twice. There can be one if it just touches, or none if it stays above the axis, which we'll return to shortly.

## Real problems
Set up the equation, solve it, then ask which solutions make sense.

### Worked example: a plot of land
A rectangular plot is 3 m longer than it's wide, and its area is 40 square metres. Find the width.

Let the width be $w$ metres. The length is $w + 3$.

$$w(w + 3) = 40 \quad\Rightarrow\quad w^2 + 3w - 40 = 0 \quad\Rightarrow\quad (w + 8)(w - 5) = 0$$

So $w = -8$ or $w = 5$. A width can't be negative, so we **reject** −8, and the width is 5 m. Check: $5 \times 8 = 40$.

### Worked example: a thrown ball
A ball is thrown up, and its height in metres after $t$ seconds is about $h = 20t - 5t^2$. When does it land?

It lands when $h = 0$:

$$20t - 5t^2 = 0 \quad\Rightarrow\quad 5t(4 - t) = 0$$

So $t = 0$, which is when it's thrown, or $t = 4$, when it lands. Both are true, and each means something different. Always think about what each solution means.

### Worked example: consecutive numbers
Two consecutive whole numbers multiply to 56. Let them be $n$ and $n + 1$. Then $n^2 + n - 56 = 0$, so $(n + 8)(n - 7) = 0$. So $n = 7$, which gives 7 and 8. Or $n = -8$, which gives −8 and −7. Both pairs work, unless the problem says positive.

# Exercises
?? Solve $x^2 - 8x + 15 = 0$.
=> $(x - 3)(x - 5) = 0$, so $x = 3$ or $x = 5$.

?? Solve $x^2 + 2x = 15$.
=> $x^2 + 2x - 15 = 0$, so $(x + 5)(x - 3) = 0$, and $x = -5$ or $x = 3$.

?? Solve $x^2 = 6x$.
=> $x(x - 6) = 0$, so $x = 0$ or $x = 6$.

?? Solve $x^2 - 100 = 0$.
=> $x = \pm 10$.

?? Solve $3x^2 + 5x - 2 = 0$.
=> $a \times c = -6$, and the numbers are 6 and −1. $(3x - 1)(x + 2) = 0$, so $x = \frac{1}{3}$ or $x = -2$.

?? A square's side is increased by 2 m, which makes the area 49 square metres. What was the side?
=> $(s + 2)^2 = 49$, so $s + 2 = \pm 7$, so $s = 5$ or $s = -9$. A length can't be negative, so $s = 5$ m.

# Practice
1. Make up a real problem where one length is linked to another and the area is known: a farm plot, a room or a board. Write it in words, and use real measurements if you can.
2. Solve it by factorising, checking both roots in the original equation.
3. Say which root makes sense, and why.
4. Sketch a U-shaped curve for one of your equations on graph paper by working out $y$ for six values of $x$. Mark where it crosses the $x$ axis, and compare that with your solutions.
5. Try dividing $x^2 = 7x$ by $x$. Then solve it by factorising. What did the first way lose?

Write your problem, your roots, your sketch's numbers, and what the division lost.

# Rubric
- I set up a real quadratic problem in words and solved it.
- I checked both roots and rejected one for a real reason.
- I saw the roots on a sketch I drew myself.

# Summary
- Standard form is $ax^2 + bx + c = 0$.
- If a product is zero, one of its factors must be zero.
- Bring everything to one side first. The rule works only with zero.
- Never divide by $x$. That can lose a solution.
- A quadratic usually has two roots, which are where its curve crosses the $x$ axis.
- In real problems, check which roots make sense.

# Check
Q: Solve $(x - {a})(x - {b}) = 0$. What's the sum of the two solutions?
P: If a product is zero
Vars: a=1..12, b=1..12
Where: a != b
F: a+b
= The solutions are {a} and {b}. Their sum is {a+b}.

Q: Why does solving by factorising need one side to be zero?
P: If a product is zero
- Because quadratics are only ever allowed to be equal to zero
* Only a product of zero tells you that one factor must be zero
- Because zero makes the arithmetic a good deal shorter to do
= With a product of 6, for example, there are endless possibilities.

Q: What's the larger solution of $x^2 - 7x + 10 = 0$?
P: If a product is zero
A: 5 | x = 5 | x=5
= $(x - 2)(x - 5) = 0$.

Q: What's the negative solution of $x^2 + 2x - 8 = 0$?
P: If a product is zero
A: -4 | −4 | x = -4 | x=-4
= $(x + 4)(x - 2) = 0$.

Q: To solve $x^2 = 5x + 6$, what's the first step?
P: Getting it ready
- Divide both sides by $x$, to get a simpler equation
* Bring everything to one side, to get $x^2 - 5x - 6 = 0$
- Take the square root of both sides of the equation
= The zero rule needs one side to be zero.

Q: A student solves $x^2 = 9x$ by dividing by $x$, and gets $x = 9$. What's the other solution?
P: Getting it ready
A: 0 | zero | x = 0 | x=0
= $x(x - 9) = 0$. Dividing by $x$ lost $x = 0$.

Q: What are the solutions of $x^2 - 16 = 0$?
P: Getting it ready
- $x = 4$ only
- $x = 8$ or $x = -8$
* $x = 4$ or $x = -4$
= $(x + 4)(x - 4) = 0$.

Q: What do the solutions of $x^2 - 5x + 6 = 0$ show on the graph of $y = x^2 - 5x + 6$?
P: What it looks like
- The very lowest point on the curve that you can see
* Where the curve crosses the $x$ axis
- Where the curve crosses the $y$ axis on the left
= On the $x$ axis, $y = 0$, and that's what the equation asks.

Q[transfer]: A rectangular room is 2 m longer than it's wide, and its area is 24 square metres. What's its width, in metres?
P: Real problems
A: 4 | 4 m | 4 metres | four
= $w(w + 2) = 24$, so $(w + 6)(w - 4) = 0$. A width can't be −6.

Q[transfer]: A ball's height is $h = 30t - 5t^2$ metres after $t$ seconds. After how many seconds does it land?
P: Real problems
A: 6 | 6 seconds | six
= $5t(6 - t) = 0$. $t = 0$ is the throw, and $t = 6$ is the landing.

Q[transfer]: A shop's weekly profit in naira is modelled by $P = -n^2 + 50n - 400$, where $n$ is the price level. For which $n$ is the profit exactly zero?
P: Real problems
- $n = 20$ only
* $n = 10$ or $n = 40$
- $n = 50$ or $n = 400$
= $n^2 - 50n + 400 = 0$ gives $(n - 10)(n - 40) = 0$. The model is invented. Between those values, the profit is positive.

# Cards
What's the standard form of a quadratic? :: $ax^2 + bx + c = 0$, with $a$ not zero.
If $A \times B = 0$, what do you know? :: $A = 0$ or $B = 0$.
What's the first step when solving by factorising? :: Bring everything to one side, so that it equals zero.
Why not divide by $x$? :: You could lose the solution $x = 0$.
What do the roots show on a graph? :: Where the curve crosses the $x$ axis.
What do you do with a root that makes no sense? :: Say so, and reject it for that real reason.

# Further
- OpenStax Elementary Algebra 2e, Quadratic equations :: https://openstax.org/books/elementary-algebra-2e/pages/7-6-quadratic-equations
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
