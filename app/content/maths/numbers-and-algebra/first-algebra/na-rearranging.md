---
id: na-rearranging
pack: Numbers and Algebra · First algebra
title: Rearranging formulas
minutes: 35
source: OpenStax · Elementary Algebra 2e · Section 2.6
url: https://openstax.org/books/elementary-algebra-2e/pages/2-6-solve-a-formula-for-a-specific-variable
courses: The base of all later maths and statistics
format: 2
teaches: change-subject; rearrange-with-fractions; rearrange-with-powers; collect-subject
uses: solve-linear; balance-method; variables; distribute-brackets; square-roots; evaluate-expressions
---
# Goal
Make any letter the subject of a formula, including when it has fractions, powers or appears twice.

# Why
A formula is written one way, but you often want a different letter from it. If you know the distance and the time, you want speed. If you know the total and the rate, you want the amount you started with. Statistics rearranges formulas constantly, such as turning $z = \frac{x - m}{s}$ around to find $x$. You don't need to memorise three versions of each formula if you can rearrange one.

# Warm-up
?? Solve $3x + 2 = 14$.
=> $x = 4$.

?? What's $\sqrt{49}$?
=> 7.

# Lesson
## The same steps, with letters
Rearranging is solving an equation where the other quantities are letters. The letter you want is called the **subject**. A formula is "solved for" a letter when that letter stands alone on one side.

Compare these side by side. The steps are the same.

| Step | With numbers: $2x + 3 = 11$ | With letters: $ax + b = c$ |
| --- | --- | --- |
| Subtract from both sides | $2x = 8$ | $ax = c - b$ |
| Divide both sides | $x = \frac{8}{2}$ | $x = \frac{c - b}{a}$ |

### Worked example: make $u$ the subject of $v = u + at$
Subtract $at$ from both sides: $v - at = u$. That's the same as $u = v - at$.

### Worked example: make $r$ the subject of $C = 2\pi r$
Divide both sides by $2\pi$:

$$r = \frac{C}{2\pi}$$

The symbol $\pi$ is just a number, about 3.14159, so treat it like any other number.

> Mistake: Not treating the term as one thing. In $v = u + at$, $at$ is $a \times t$. To make $t$ the subject, first subtract $u$, and then divide by $a$. You can't "take away $a$" alone.

?? Make $h$ the subject of $A = bh$.
=> $h = \frac{A}{b}$.

## Think in reverse order
Think of what has been done to your letter, in order. Then undo those steps in reverse, like taking off your shoes after your socks.

### Worked example: make $x$ the subject of $y = 3x - 5$
What has happened to $x$? First times 3, then minus 5. So undo: first add 5, then divide by 3.

$$y + 5 = 3x \quad\Rightarrow\quad x = \frac{y + 5}{3}$$

### Worked example: a formula from statistics
The formula $z = \dfrac{x - m}{s}$ gives a standard score, which you'll meet in statistics. Make $x$ the subject.

What has happened to $x$? First minus $m$, then divided by $s$. Undo: first multiply by $s$, then add $m$.

$$zs = x - m \quad\Rightarrow\quad x = zs + m$$

## Fractions and powers
### When your letter is on the bottom
Multiply both sides by the bottom to bring it up. Make $t$ the subject of $s = \frac{d}{t}$:

$$st = d \quad\Rightarrow\quad t = \frac{d}{s}$$

### When your letter has a power
Undo a square with a square root. In $A = \pi r^2$, make $r$ the subject:

$$\frac{A}{\pi} = r^2 \quad\Rightarrow\quad r = \sqrt{\frac{A}{\pi}}$$

For a real length, only the positive root makes sense. In a general equation, you'd keep both signs.

### When your letter is under a root
Undo a root by squaring. Make $L$ the subject of $T = 2\sqrt{L}$:

$$\frac{T}{2} = \sqrt{L} \quad\Rightarrow\quad L = \left(\frac{T}{2}\right)^2 = \frac{T^2}{4}$$

> Mistake: Square-rooting just one term. From $y = x^2 + 3$, you can't write $\sqrt{y} = x + \sqrt{3}$. Roots don't spread over adding. First subtract 3, to get $x^2 = y - 3$. Then, when $y$ is 3 or more, $x = \pm\sqrt{y - 3}$. When $y$ is below 3, there's no real solution.

## When your letter appears twice
Collect the terms with your letter on one side, then **factor it out**, using the distributive law in reverse. Make $x$ the subject of $ax + b = cx + d$:

| Step | Result |
| --- | --- |
| Bring the $x$ terms to one side | $ax - cx = d - b$ |
| Take out the common factor $x$ | $x(a - c) = d - b$ |
| Divide | $x = \dfrac{d - b}{a - c}$ |

This doesn't work when $a = c$, since you'd be dividing by zero. That's the "no single answer" case from the last lesson.

### Another worked example
Make $x$ the subject of $y = \dfrac{x + 1}{x}$. Multiply by $x$: $xy = x + 1$. Collect: $xy - x = 1$. Factor: $x(y - 1) = 1$. Divide: $x = \dfrac{1}{y - 1}$.

## Checking and using it
Test a rearranged formula with numbers that you know work. For example, in $r = \frac{C}{2\pi}$, take $r = 2$. Then $C = 2\pi(2) = 4\pi$. Put it into the new formula: $\frac{4\pi}{2\pi} = 2$. It works.

### Real use
Compound growth is $A = P(1 + r)^n$, where $A$ is what you end with, $P$ is what you start with, $r$ is the rate and $n$ is the number of periods. How much do you need now, to reach a target? Divide:

$$P = \frac{A}{(1 + r)^n}$$

To have ₦100,000 in 2 years at 10% a year, you need $\frac{100{,}000}{1.21} \approx 82{,}645$, so about ₦82,645 today. That's called present value, and it's an invented example here. It's the same formula, used backwards.

### In a spreadsheet
If column A has distance and column B has time, `=A2/B2` gives the speed. Knowing how to rearrange means you can write the right cell formula directly, instead of hunting for a new one.

# Exercises
?? Make $x$ the subject of $y = 5x + 2$.
=> $x = \frac{y - 2}{5}$.

?? Make $b$ the subject of $A = \frac{1}{2}bh$.
=> $2A = bh$, so $b = \frac{2A}{h}$.

?? Make $m$ the subject of $E = mc^2$.
=> $m = \frac{E}{c^2}$.

?? Make $c$ the subject of $E = mc^2$, for positive values.
=> $c = \sqrt{\frac{E}{m}}$.

?? Make $r$ the subject of $A = P(1 + r)$.
=> $\frac{A}{P} = 1 + r$, so $r = \frac{A}{P} - 1$.

?? Make $x$ the subject of $ax = bx + c$.
=> $x(a - b) = c$, so $x = \frac{c}{a - b}$.

# Practice
1. Choose a formula you actually use or will use. Average of two scores works: $m = \frac{a + b}{2}$. If your second test needs to bring your average to a target, make $b$ the subject. Use your real or likely scores.
2. Use the formula Speed = Distance ÷ Time on a real journey you make. Rearrange it for time, and for distance. Use real figures to test each one.
3. Take the percentage increase, $n = o \times (1 + r)$, where $o$ is the old price and $n$ is the new one. Make $o$ the subject, then use it on a real price.
4. Check each rearranged version with real numbers.

Write your rearranged formulas and what your numbers showed.

# Rubric
- I rearranged a real formula for a letter I actually needed.
- I tested each rearranged formula with numbers.
- I used a rearranged formula to answer a real question.

# Summary
- Rearranging is solving, with letters instead of numbers.
- Undo what's been done to your letter, in reverse order.
- A letter on the bottom: multiply both sides by it.
- Undo a square with a root, and a root with a square.
- If your letter appears twice, collect and factor it out.
- Test with numbers you know work.

# Check
Q: Make $x$ the subject of $y = x + 7$.
P: The same steps, with letters
* $x = y - 7$
- $x = \frac{y}{7} + 7$
- $x = 7y$
= Subtract 7 from both sides.

Q: Make $t$ the subject of $d = st$.
P: The same steps, with letters
- $t = ds$
* $t = \frac{d}{s}$
- $t = \frac{d - s}{s}$
= Divide both sides by $s$.

Q: Make $x$ the subject of $y = 2x - 6$.
P: Think in reverse order
- $x = 2y + 6$
* $x = \frac{y + 6}{2}$
- $x = \frac{y - 6}{2} + 6$
= Undo in reverse: add 6, then divide by 2.

Q: In the formula $z = (x - m) \div s$, what's $x$ if $z = {a}$, $m = {b}$ and $s = {c}$?
P: Think in reverse order
Vars: a=1..3, b=20..80, c=2..10
F: a*c+b
= $x = zs + m$, which is {a} × {c} + {b} = {a*c+b}.

Q: Make $r$ the subject of $V = kr^2$, for positive values.
P: Fractions and powers
- $r = \frac{V}{2k}$
* $r = \sqrt{\frac{V}{k}}$
- $r = \sqrt{V} - k$
= Divide by $k$, then take the root.

Q: Make $x$ the subject of $y = x^2 - 4$, for positive $x$.
P: Fractions and powers
* $x = \sqrt{y + 4}$
- $x = \sqrt{y} + 2$
- $x = y + 2$
= Add 4 first. Roots don't spread over adding.

Q: Put the steps in order to make $x$ the subject of $ax + 3 = bx$.
P: When your letter appears twice
O: Collect to get $ax - bx = -3$ | Factor to get $x(a - b) = -3$ | Divide by $a - b$
= Collect, factor out, then divide.

Q: Using $C = 2\pi r$, if $C = 10\pi$, what's $r$?
P: Checking and using it
A: 5 | five
= $r = \frac{10\pi}{2\pi} = 5$.

Q[transfer]: A price rises 8%, and the new price is ₦5,400. What's the old price, in naira?
P: Checking and using it
A: 5000 | 5,000 | ₦5,000 | ₦5000
= $n = 1.08 \times o$, so $o = 5{,}400 \div 1.08 = 5{,}000$.

Q[transfer]: Your two test scores must average 70, and you got 58 on the first. What do you need on the second?
P: Think in reverse order
A: 82
= $m = \frac{a + b}{2}$ gives $b = 2m - a = 140 - 58$.

Q[transfer]: A spreadsheet has distance in A2 and speed in B2. What formula gives the time?
P: Fractions and powers
* `=A2/B2`
- `=A2*B2`
- `=B2/A2`
= Time = Distance ÷ Speed, by rearranging Speed = Distance ÷ Time.

# Cards
What does "make $x$ the subject" mean? :: Rearrange so that $x$ stands alone on one side.
How is rearranging related to solving? :: It uses the same steps, with letters.
In what order do you undo operations? :: In reverse order of what was done to the letter.
How do you bring a letter up from the bottom? :: Multiply both sides by the bottom.
What do you do when your letter appears twice? :: Collect its terms on one side, factor it out, then divide.
How do you undo $x^2$? :: Take the square root.

# Further
- OpenStax Elementary Algebra 2e, Solve a formula for a specific variable :: https://openstax.org/books/elementary-algebra-2e/pages/2-6-solve-a-formula-for-a-specific-variable
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
