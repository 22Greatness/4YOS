---
id: na-quadratic-formula
pack: Numbers and Algebra · Polynomials and quadratics
title: The quadratic formula
minutes: 40
source: OpenStax · Elementary Algebra 2e · Section 10.3
url: https://openstax.org/books/elementary-algebra-2e/pages/10-3-solve-quadratic-equations-using-the-quadratic-formula
courses: The base of all later maths and statistics
format: 2
teaches: quadratic-formula; derive-quadratic-formula; choose-method
uses: complete-the-square; solve-by-completing-square; quadratic-equation; simplify-surds; solve-by-factorising; evaluate-expressions; round-numbers
---
# Goal
Use the quadratic formula on any quadratic equation, see where it comes from, and choose the quickest method for each equation.

# Why
The formula solves every quadratic in one step, with no need to spot factors. It's what calculators and programs use. You'll need it in physics, finance, statistics and programming. And since you've seen completing the square, you'll be able to follow exactly why it works, rather than taking it on trust.

# Warm-up
?? Solve $(x + 2)^2 = 7$.
=> $x = -2 \pm \sqrt{7}$.

?? For $3x^2 - 5x + 1 = 0$, what are $a$, $b$ and $c$?
=> $a = 3$, $b = -5$ and $c = 1$.

# Lesson
## The formula
For any quadratic equation $ax^2 + bx + c = 0$, the solutions are:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

The $\pm$ gives two solutions: one using plus, and one using minus. Everything below the fraction line and inside the root is simply worked out from $a$, $b$ and $c$. The whole top is divided by $2a$.

## Using it
Write down $a$, $b$ and $c$, including their signs, then substitute, using brackets for negatives.

### Worked example: $2x^2 + 3x - 5 = 0$
Here, $a = 2$, $b = 3$ and $c = -5$.

| Step | Result |
| --- | --- |
| Substitute | $x = \dfrac{-3 \pm \sqrt{3^2 - 4(2)(-5)}}{2(2)}$ |
| Inside the root | $9 + 40 = 49$ |
| Take the root | $x = \dfrac{-3 \pm 7}{4}$ |
| Plus | $x = \dfrac{4}{4} = 1$ |
| Minus | $x = \dfrac{-10}{4} = -\dfrac{5}{2}$ |

Check $x = 1$: $2 + 3 - 5 = 0$. Correct.

### Worked example: with a surd
For $x^2 + 6x + 2 = 0$: $a = 1$, $b = 6$ and $c = 2$.

$$x = \frac{-6 \pm \sqrt{36 - 8}}{2} = \frac{-6 \pm \sqrt{28}}{2} = \frac{-6 \pm 2\sqrt{7}}{2} = -3 \pm \sqrt{7}$$

It's the same answer we got by completing the square in the last lesson. As decimals, they're about −0.35 and −5.65.

### Worked example: a negative $b$
For $x^2 - 4x + 1 = 0$: $a = 1$, $b = -4$ and $c = 1$.

$$x = \frac{-(-4) \pm \sqrt{(-4)^2 - 4(1)(1)}}{2} = \frac{4 \pm \sqrt{12}}{2} = 2 \pm \sqrt{3}$$

> Mistake: Getting the sign of $b$ wrong. If $b = -4$, then $-b = +4$, and $b^2 = 16$, not −16. Always use brackets when substituting.

> Mistake: Dividing only part of the top. The bar covers the whole top, $-b \pm \sqrt{\ldots}$, so both parts get divided by $2a$.

> Mistake: Forgetting to bring everything to one side first. For $x^2 = 3x + 1$, write $x^2 - 3x - 1 = 0$, so that $b = -3$ and $c = -1$.

?? Solve $x^2 - 3x - 1 = 0$ using the formula, and give the answers to 2 decimal places.
=> $x = \frac{3 \pm \sqrt{9 + 4}}{2} = \frac{3 \pm \sqrt{13}}{2}$, so $x \approx 3.30$ or $x \approx -0.30$.

## Where it comes from
The formula is just completing the square, using letters in place of numbers. Here it is, step by step.

| Step | Result |
| --- | --- |
| Start | $ax^2 + bx + c = 0$ |
| Divide by $a$ | $x^2 + \frac{b}{a}x + \frac{c}{a} = 0$ |
| Halve the coefficient of $x$: it's $\frac{b}{2a}$ | $\left(x + \frac{b}{2a}\right)^2 - \frac{b^2}{4a^2} + \frac{c}{a} = 0$ |
| Move the numbers across | $\left(x + \frac{b}{2a}\right)^2 = \frac{b^2}{4a^2} - \frac{c}{a}$ |
| Common denominator | $\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}$ |
| Take the root | $x + \frac{b}{2a} = \pm\frac{\sqrt{b^2 - 4ac}}{2a}$ |
| Subtract $\frac{b}{2a}$ | $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ |

Nothing here is magic. Once you've followed it, the formula's parts make sense: $-\frac{b}{2a}$ is the line down the middle of the curve, and the root is how far each solution lies on either side of it.

So the two solutions are equally spaced around $x = -\frac{b}{2a}$. For $x^2 - 5x + 6 = 0$, that's $x = 2.5$, and the roots 2 and 3 sit 0.5 on either side.

## Choosing a method
You've now got four ways. Use the fastest that fits.

| Equation looks like | Best method | Example |
| --- | --- | --- |
| No $x$ term | Take the root | $x^2 = 36$ |
| No constant | Common factor | $x^2 - 5x = 0$ |
| Small whole numbers that factorise | Factorise | $x^2 + 5x + 6 = 0$ |
| Hard numbers, or no factors | Formula | $3x^2 + 7x - 2 = 0$ |
| Need the turning point | Complete the square | $x^2 + 6x + 2$ |

If you can't see the factors within a few moments, go for the formula. It always works.

## Using a program
A program applies the same formula. You'll learn Python in a later course, and you don't need to know it yet, so just read this and see how close it is to what you did by hand:

```python
import math
a, b, c = 1, -3, -1
root = math.sqrt(b * b - 4 * a * c)
print((-b + root) / (2 * a))
print((-b - root) / (2 * a))
```

```output
3.302775637731995
-0.30277563773199456
```

That's the same answer we got above. The next lesson looks at what happens when the part inside the root is negative, which would crash this program.

### Worked example: a real problem
A rectangular garden has an area of 30 square metres, and its length is 4 m more than its width. Find the width.

$w(w + 4) = 30$, so $w^2 + 4w - 30 = 0$. No whole numbers work, so use the formula:

$$w = \frac{-4 \pm \sqrt{16 + 120}}{2} = \frac{-4 \pm \sqrt{136}}{2}$$

So $w \approx 3.83$ or $w \approx -7.83$. A width can't be negative, so the width is about 3.83 m. Check: $3.83 \times 7.83 \approx 30.0$.

# Exercises
?? Solve $x^2 + 5x + 6 = 0$ using the formula.
=> $x = \frac{-5 \pm \sqrt{25 - 24}}{2} = \frac{-5 \pm 1}{2}$, so $x = -2$ or $x = -3$.

?? Solve $2x^2 - 7x + 3 = 0$.
=> $x = \frac{7 \pm \sqrt{49 - 24}}{4} = \frac{7 \pm 5}{4}$, so $x = 3$ or $x = \frac{1}{2}$.

?? Solve $x^2 + 2x - 5 = 0$, in surd form.
=> $x = \frac{-2 \pm \sqrt{24}}{2} = -1 \pm \sqrt{6}$.

?? Solve $3x^2 = 5x + 1$, to 2 decimal places.
=> $3x^2 - 5x - 1 = 0$. $x = \frac{5 \pm \sqrt{37}}{6}$, so $x \approx 1.85$ or $x \approx -0.18$.

?? Which method would you choose for $x^2 - 81 = 0$?
=> Take the root, or use the difference of two squares: $x = \pm 9$.

# Practice
1. Write out the derivation by yourself, without looking, line by line. When you get stuck, look at only that line, and carry on. Do this until you can do it alone.
2. Solve $x^2 + 7x + 12 = 0$ in three ways: factorising, completing the square and the formula. Did they agree?
3. Take a real area problem: a table or a room whose length is more than its width by a fixed amount. Write the quadratic with real numbers, use the formula, and check the answer by measuring.
4. Use your calculator's stored values, or a spreadsheet, to compute the formula once. In a spreadsheet, `=(-B1+SQRT(B1^2-4*A1*C1))/(2*A1)` gives one root if A1, B1 and C1 hold $a$, $b$ and $c$. Then change it to get the other.

Write the line where you got stuck, your three answers and your real result.

# Rubric
- I wrote out the derivation from memory.
- I solved one equation by three methods, and they agreed.
- I used the formula on a real measurement.

# Summary
- $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ solves every quadratic.
- Bring everything to one side first, and read off $a$, $b$ and $c$, including signs.
- Use brackets for negatives. $b^2$ is never negative.
- The bar covers the whole top.
- It comes from completing the square with letters.
- Use the fastest method that fits. The formula always works.

# Check
Q: What's $a$, $b$ and $c$ for $x^2 - 6x + 2 = 0$? Give $b$.
P: Using it
A: -6 | −6
= The sign belongs to the term. $a = 1$, $b = -6$ and $c = 2$.

Q: What goes inside the root for $x^2 + {b}x + {c} = 0$?
P: Using it
Vars: b=6..14, c=1..8
F: b*b-4*c
= {b} squared minus 4 × 1 × {c} is {b*b-4*c}.

Q: For $x^2 - 4x + 1 = 0$, what's $b^2$?
P: Using it
A: 16
= $(-4)^2 = 16$. A square isn't negative.

Q: What's the positive solution of $x^2 + 2x - 8 = 0$, using the formula?
P: Using it
A: 2 | two | x = 2 | x=2
= $\frac{-2 \pm \sqrt{4 + 32}}{2} = \frac{-2 \pm 6}{2}$.

Q: What's the larger solution of $x^2 - 2x - 1 = 0$, to 2 decimal places?
P: Using it
A: 2.41
= $\frac{2 \pm \sqrt{8}}{2} = 1 \pm \sqrt{2}$, so $1 + 1.414 = 2.41$.

Q: Which is wrong about the formula?
P: The formula
- The $\pm$ gives two values to work out
* Only the root part gets divided by $2a$
- It applies once everything is on one side
= The bar covers the whole top, including $-b$.

Q: The formula comes from which method?
P: Where it comes from
- Factorising, using the numbers that multiply to $ac$
* Completing the square, with letters for the numbers
- Taking the square root of each term in the equation
= It's the completing-the-square steps, on $ax^2 + bx + c = 0$.

Q: What's the quickest way to solve $x^2 - 7x = 0$?
P: Choosing a method
* Take out the common factor $x$
- Use the formula, with $c = 0$
- Complete the square first
= $x(x - 7) = 0$ gives $x = 0$ or $x = 7$ straight away.

Q[transfer]: A garden's length is 3 m more than its width, and its area is 20 square metres. What's its width, to 2 decimal places?
P: Using a program
A: 3.22 | 3.22 m
= $w^2 + 3w - 20 = 0$, so $w = \frac{-3 + \sqrt{89}}{2} \approx 3.22$.

Q[transfer]: In a spreadsheet, A1, B1 and C1 hold $a$, $b$ and $c$. A student types `=-B1+SQRT(B1^2-4*A1*C1)/2*A1`. What's wrong?
P: Using a program
- `SQRT` isn't a function that spreadsheets can use
* The order: it needs brackets around the top and around $2a$
- The value of $b$ has to be typed as a positive number
= Without brackets, the division and the multiplication happen too early. It's the order of operations again.

Q[transfer]: A student gets roots of 2 and 8 for a quadratic. Where's the curve's turning point, on the $x$ axis?
P: Where it comes from
A: 5 | x = 5 | x=5
= The roots are spaced equally around the middle, so it's halfway between them.

# Cards
What's the quadratic formula? :: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.
What must you do before using it? :: Bring everything to one side, so that it equals zero.
If $b = -4$, what's $-b$? :: $+4$. And $b^2 = 16$.
Where does the formula come from? :: Completing the square on $ax^2 + bx + c = 0$.
What does the bar in the formula cover? :: The whole top, $-b \pm \sqrt{b^2 - 4ac}$.
When should you use the formula? :: When factors aren't obvious. It always works.

# Further
- OpenStax Elementary Algebra 2e, Solve quadratic equations using the quadratic formula :: https://openstax.org/books/elementary-algebra-2e/pages/10-3-solve-quadratic-equations-using-the-quadratic-formula
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
