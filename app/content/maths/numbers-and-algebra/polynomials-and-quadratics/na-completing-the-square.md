---
id: na-completing-the-square
pack: Numbers and Algebra · Polynomials and quadratics
title: Completing the square
minutes: 40
source: OpenStax · Elementary Algebra 2e · Section 10.2
url: https://openstax.org/books/elementary-algebra-2e/pages/10-2-solve-quadratic-equations-by-completing-the-square
courses: The base of all later maths and statistics
format: 2
teaches: complete-the-square; vertex-form; solve-by-completing-square; turning-point
uses: perfect-squares; solve-by-factorising; square-roots; surds; rearrange-with-powers; quadratic-graph
---
# Goal
Rewrite any quadratic as a perfect square plus a number, use that to solve equations which won't factorise, and find the lowest or highest point of a curve.

# Why
Most quadratics don't factorise neatly, and this method works on all of them. It's also where the quadratic formula comes from, so this lesson shows why that formula is true. And it finds the turning point of a curve, which tells you the price with the greatest profit or the height a ball reaches. That's your first taste of optimisation.

# Warm-up
?? Expand $(x + 3)^2$.
=> $x^2 + 6x + 9$.

?? Simplify $\sqrt{12}$.
=> $2\sqrt{3}$.

# Lesson
## The idea
Some quadratic equations are easy, because $x$ only appears once. Solve $(x + 3)^2 = 16$ by taking the root of both sides, keeping both signs.

$$x + 3 = \pm 4 \quad\Rightarrow\quad x = 1 \text{ or } x = -7$$

So if we could rewrite any quadratic in the form $(x + p)^2 = q$, we could solve it. That's what **completing the square** does. It turns an expression into a perfect square, with a number left over.

Look at the pattern from expanding:

$$(x + p)^2 = x^2 + 2px + p^2$$

The coefficient of $x$ is $2p$. So $p$ is **half the coefficient of $x$**. That's the whole trick.

## How to complete the square
Take $x^2 + 6x$. Half of 6 is 3. Look at $(x + 3)^2$:

$$(x + 3)^2 = x^2 + 6x + 9$$

That has an extra 9. So take it away again:

$$x^2 + 6x = (x + 3)^2 - 9$$

As a picture, $x^2 + 6x$ is a square of side $x$ plus two strips of area $3x$. Arrange them around the square, and only a small 3-by-3 corner is missing. Adding that corner would **complete the square**, and that's where the name comes from.

### The steps
1. Halve the coefficient of $x$.
2. Write $(x + \text{half})^2$.
3. Subtract half squared.
4. Tidy up the numbers.

### Worked example: $x^2 + 8x + 5$
Half of 8 is 4, and $4^2 = 16$.

$$x^2 + 8x + 5 = (x + 4)^2 - 16 + 5 = (x + 4)^2 - 11$$

### Worked example: $x^2 - 10x + 3$
Half of −10 is −5, and $(-5)^2 = 25$.

$$x^2 - 10x + 3 = (x - 5)^2 - 25 + 3 = (x - 5)^2 - 22$$

### Worked example: an odd coefficient
For $x^2 + 3x$, half of 3 is $\frac{3}{2}$, and $\left(\frac{3}{2}\right)^2 = \frac{9}{4}$.

$$x^2 + 3x = \left(x + \frac{3}{2}\right)^2 - \frac{9}{4}$$

> Mistake: Adding half squared instead of subtracting. $(x + 3)^2$ already contains an extra 9, so you have to take it away. Expand your answer to check. It must give back what you started with.

?? Complete the square for $x^2 + 4x - 1$.
=> Half of 4 is 2. $(x + 2)^2 - 4 - 1 = (x + 2)^2 - 5$.

## Solving equations
Complete the square, then take the root of both sides.

### Worked example: $x^2 + 6x + 2 = 0$
This doesn't factorise, as no whole numbers multiply to 2 and add to 6.

| Step | Result |
| --- | --- |
| Complete the square | $(x + 3)^2 - 9 + 2 = 0$ |
| Tidy up | $(x + 3)^2 - 7 = 0$ |
| Move the number across | $(x + 3)^2 = 7$ |
| Take the root, keeping both signs | $x + 3 = \pm\sqrt{7}$ |
| Solve | $x = -3 \pm \sqrt{7}$ |

As decimals, these are about $x = -0.35$ and $x = -5.65$. The surd form is exact.

Check $x = -0.354$: $0.125 - 2.124 + 2 \approx 0$. Close enough, with the rounding.

### When $x^2$ has a coefficient
Divide the whole equation by it first. For $2x^2 - 8x + 3 = 0$:

$$x^2 - 4x + \frac{3}{2} = 0$$

$$(x - 2)^2 - 4 + \frac{3}{2} = 0 \quad\Rightarrow\quad (x - 2)^2 = \frac{5}{2} \quad\Rightarrow\quad x = 2 \pm \sqrt{\frac{5}{2}}$$

### When there's no solution
For $x^2 + 2x + 5 = 0$: $(x + 1)^2 + 4 = 0$, so $(x + 1)^2 = -4$. A square can't be negative, so there's no ordinary solution. The method tells you so plainly.

> Mistake: Forgetting $\pm$. Both the positive and negative roots square to the same number, so both must be kept.

## The turning point
The written form $(x + p)^2 + q$ shows the graph's **turning point**, also called the **vertex**, where the curve turns around.

A square is never negative, and its smallest value is 0. So $y = (x - 3)^2 + 2$ is smallest when $x - 3 = 0$, which is at $x = 3$. There, $y = 0 + 2 = 2$. So the lowest point is at $(3, 2)$.

```diagram
{"kind":"graph","alt":"A U-shaped curve with its lowest point at x equals 3, y equals 2. Sliders named p and q move the turning point: the curve is y equals x minus p squared plus q.","x":[-4,8],"y":[-6,12],"curves":[{"fn":"(x-p)*(x-p)+q","label":"y = (x − p)² + q"}],"sliders":[{"name":"p","min":-3,"max":6,"step":1,"value":3},{"name":"q","min":-5,"max":6,"step":1,"value":2}],"points":[]}
```

Move the sliders. Changing $p$ moves the curve left and right, and changing $q$ moves it up and down. Note the sign: $(x - 3)^2$ has its turning point at $x = +3$.

| Form | Turning point | Lowest $y$ |
| --- | --- | --- |
| $(x - 3)^2 + 2$ | $(3, 2)$ | 2 |
| $(x + 4)^2 - 7$ | $(-4, -7)$ | −7 |
| $(x - 1)^2$ | $(1, 0)$ | 0 |

### Highest points
With a minus in front, $y = -(x - 3)^2 + 2$, the U flips over into a hill. The largest value of a negative square is 0, so now the turning point $(3, 2)$ is the **highest** point. That's what you want for maximum height or profit.

### Worked example: the best price
A shop's profit in naira is $P = -x^2 + 20x + 100$, where $x$ is the price level. This model is invented. What price gives the most profit?

Take out the minus, and complete the square inside:

$$P = -(x^2 - 20x) + 100 = -[(x - 10)^2 - 100] + 100 = -(x - 10)^2 + 200$$

The most profit is 200, when $x = 10$. No trial and error is needed.

# Exercises
?? Complete the square for $x^2 + 10x + 7$.
=> $(x + 5)^2 - 25 + 7 = (x + 5)^2 - 18$.

?? Complete the square for $x^2 - 6x + 1$.
=> $(x - 3)^2 - 9 + 1 = (x - 3)^2 - 8$.

?? Solve $(x - 2)^2 = 9$.
=> $x - 2 = \pm 3$, so $x = 5$ or $x = -1$.

?? Solve $x^2 + 4x - 3 = 0$, in surd form.
=> $(x + 2)^2 - 7 = 0$, so $x = -2 \pm \sqrt{7}$.

?? Find the lowest point of $y = x^2 - 8x + 20$.
=> $y = (x - 4)^2 + 4$, so the lowest point is $(4, 4)$.

# Practice
1. Draw the picture: on paper, draw a square of side $x$ (use any real length) with two strips of width 3. Show the missing corner, and write down its area. This is the picture behind the method.
2. Solve one quadratic that factorises, such as $x^2 + 6x + 8 = 0$, both by factorising and by completing the square. Do you get the same answers?
3. Solve one quadratic that doesn't factorise, such as $x^2 + 2x - 5 = 0$. Check it on your calculator by putting your rounded answers back in.
4. Rewrite a real-looking profit formula of your own in the turning point form, and say what price gives the most profit. Then test the prices just below and above to confirm it.

Write your drawing's numbers, your two solutions and your best price.

# Rubric
- I drew the picture that gives the method its name.
- I got the same answers by two different methods.
- I found and tested a real turning point.

# Summary
- Half the coefficient of $x$ goes in the bracket, and you subtract half squared.
- Expand your answer to check it.
- Take the root and keep $\pm$ to solve.
- $(x + p)^2 + q$ has its turning point at $(-p, q)$.
- A minus in front makes it a hill, with a highest point.
- If a square equals a negative number, there's no ordinary solution.

# Check
Q: Complete the square: $x^2 + {2*a}x = (x + {a})^2 - c$. What's $c$?
P: How to complete the square
Vars: a=2..12
F: a*a
= Half of {2*a} is {a}, and {a} squared is {a*a}.

Q: In $x^2 + 14x$, what number goes in the bracket $(x + \;?)^2$?
P: The idea
A: 7 | seven
= Half the coefficient of $x$.

Q: Which is $x^2 + 6x + 1$ in completed form?
P: How to complete the square
- $(x + 6)^2 + 1$
* $(x + 3)^2 - 8$
- $(x + 3)^2 + 10$
= $(x + 3)^2 - 9 + 1 = (x + 3)^2 - 8$.

Q: Which is $x^2 - 4x + 9$ in completed form?
P: How to complete the square
* $(x - 2)^2 + 5$
- $(x + 2)^2 + 5$
- $(x - 4)^2 + 9$
= Half of −4 is −2. $(x - 2)^2 - 4 + 9$.

Q: Solve $(x + 1)^2 = 25$. What's the larger solution?
P: Solving equations
A: 4 | four
= $x + 1 = \pm 5$, so $x = 4$ or $x = -6$.

Q: What are the solutions of $(x - 3)^2 = 5$?
P: Solving equations
- $x = 3 + \sqrt{5}$ only
- $x = 8$ or $x = -2$
* $x = 3 \pm \sqrt{5}$
= Take the root, keeping both signs.

Q: What does $(x + 2)^2 = -9$ tell you?
P: Solving equations
- $x = 1$ or $x = -5$ are both good solutions
- $x = -11$ is the one and only good solution
* There's no ordinary solution, as a square can't be negative
= Real squares are never negative.

Q: What's the turning point of $y = (x - 5)^2 + 3$? Give the $x$ value.
P: The turning point
A: 5 | x = 5 | x=5
= The square is smallest when $x - 5 = 0$.

Q: What's the lowest $y$ value of $y = (x + 2)^2 - 6$?
P: The turning point
A: -6 | −6
= The square's smallest value is 0, leaving −6.

Q[transfer]: A ball's height in metres is $h = -(t - 2)^2 + 20$ after $t$ seconds. What's the greatest height it reaches, in metres?
P: The turning point
A: 20 | 20 m | 20 metres
= The hill's top is at $t = 2$, where the square is 0.

Q[transfer]: Profit is modelled by $P = -(x - 6)^2 + 90$, where $x$ is a price in thousands of naira. Which price gives the greatest profit, in thousands of naira?
P: The turning point
A: 6 | ₦6,000 | 6,000 | 6000 | six
= The profit is greatest when $x = 6$. The model is invented.

Q[transfer]: A student solves $x^2 + 2x - 5 = 0$ and rounds the answer to $x = 1.45$. How can they check it without redoing the work?
P: Solving equations
* Put 1.45 back into $x^2 + 2x - 5$, to see if it's close to 0
- Square 1.45, and then see if the result comes out equal to 5
- Ask a friend to work out the same equation another way
= $2.1025 + 2.9 - 5 = 0.0025$, which is close to 0. Substituting always works.

# Cards
What goes in the bracket when completing the square? :: Half the coefficient of $x$.
What's subtracted when completing the square? :: Half the coefficient, squared.
What's $x^2 + 6x$ in completed form? :: $(x + 3)^2 - 9$.
Why keep $\pm$ when taking a root? :: Both a positive and a negative number square to the same value.
What's the turning point of $(x + p)^2 + q$? :: $(-p, q)$.
What does a minus sign in front of the square mean? :: The curve is a hill, so the turning point is the highest point.

# Further
- OpenStax Elementary Algebra 2e, Solve quadratic equations by completing the square :: https://openstax.org/books/elementary-algebra-2e/pages/10-2-solve-quadratic-equations-by-completing-the-square
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
