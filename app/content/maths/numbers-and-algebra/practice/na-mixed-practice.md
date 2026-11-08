---
id: na-mixed-practice
pack: Numbers and Algebra · Practice
title: Mixed algebra practice
minutes: 60
source: OpenStax · Elementary Algebra 2e · Section 3.1
url: https://openstax.org/books/elementary-algebra-2e/pages/3-1-use-a-problem-solving-strategy
courses: The base of all later maths and statistics
format: 2
teaches: choose-technique; find-own-errors; mixed-problem-solving
uses: solve-linear; change-subject; solve-inequalities; elimination; solve-by-factorising; quadratic-formula; discriminant; simplify-algebraic-fractions; multiply-powers; negative-exponent; log-power-rule; percent-change; check-solution
---
# Goal
Look at a problem you haven't been told how to solve, decide which method it needs, carry it out, and find your own mistakes.

# Why
So far, each lesson told you the topic before you began, and exams and real work don't. The hard part isn't doing the steps, it's knowing which steps to use. Research on learning shows that mixing problem types feels harder, and it leads to better results later, because you practise choosing. This lesson also shows you how to diagnose your own errors, which is useful for the rest of your degree.

# Warm-up
?? Solve $2x - 5 = 9$.
=> $x = 7$.

?? Factorise $x^2 - x - 6$.
=> $(x - 3)(x + 2)$.

# Lesson
## Ask what kind of problem it is
Before you write anything, look at the shape of the problem. These questions usually identify it.

| What you see | What it is | First move |
| --- | --- | --- |
| One letter, no powers, an equals sign | Linear equation | Clear fractions, then balance |
| A sign like $<$ or $\ge$ | Inequality | Balance, and flip if you divide by a negative |
| Two letters, two equations | Simultaneous equations | Eliminate or substitute |
| An $x^2$ and an equals sign | Quadratic equation | Bring it to zero, then factorise or use the formula |
| The letter is in a power | Exponential equation | Take logs |
| A letter on the bottom | Fraction equation | Multiply by the common denominator, and check |
| "Make $y$ the subject" | Rearranging | Undo in reverse order |
| No equals sign, "simplify" | Expression | Collect or factorise. Don't solve |

> Mistake: Solving when you've been asked to simplify. $x^2 + 2x$ has no equals sign, so there's nothing to solve. You can only rewrite it, as $x(x + 2)$.

### Sorting practice
Don't solve these yet. Just decide the first move for each one.

| Problem | Kind | First move |
| --- | --- | --- |
| $3(x - 1) = 2x + 4$ | Linear | Multiply out |
| $x^2 = 5x - 6$ | Quadratic | Bring to zero |
| $2^x = 40$ | Exponential | Take logs |
| $x + y = 7$ and $2x - y = 2$ | Simultaneous | Add the two equations |
| $5 - 2x > 1$ | Inequality | Subtract 5, then flip when dividing |
| $\frac{3}{x} = \frac{1}{4}$ | Fraction | Multiply by $4x$ |

## Worked problems, mixed
Here are a few that combine skills.

### Problem: fractions then a quadratic
Solve $\dfrac{6}{x} = x - 1$.

This has a letter on the bottom. Multiply by $x$: $6 = x^2 - x$. Now it's quadratic. Bring it to zero: $x^2 - x - 6 = 0$. Factorise: $(x - 3)(x + 2) = 0$. So $x = 3$ or $x = -2$.

Check both in the original. $\frac{6}{3} = 2$, and $3 - 1 = 2$. Then $\frac{6}{-2} = -3$, and $-2 - 1 = -3$. Both work.

### Problem: powers then linear
Solve $4^{x + 1} = 2^{3x}$.

Both are powers of 2, as $4 = 2^2$. So $(2^2)^{x + 1} = 2^{3x}$, which means $2^{2x + 2} = 2^{3x}$. With the same base, the exponents must match: $2x + 2 = 3x$, so $x = 2$.

Check: $4^3 = 64$, and $2^6 = 64$.

### Problem: simultaneous with a quadratic
Solve $y = x + 1$ and $y = x^2 - 1$.

Both equal $y$, so set them equal: $x + 1 = x^2 - 1$. So $x^2 - x - 2 = 0$, which means $(x - 2)(x + 1) = 0$. If $x = 2$, then $y = 3$. If $x = -1$, then $y = 0$. On a graph, this line crosses this curve at two points.

### Problem: words to a quadratic
A group shares ₦60,000 equally. If there were 2 fewer people, each person would get ₦5,000 more. How many people are there?

Let there be $n$ people. Each share is $\frac{60{,}000}{n}$. With 2 fewer, it's $\frac{60{,}000}{n - 2}$.

$$\frac{60{,}000}{n - 2} - \frac{60{,}000}{n} = 5{,}000$$

Divide by 5,000: $\frac{12}{n - 2} - \frac{12}{n} = 1$. Multiply by $n(n - 2)$: $12n - 12(n - 2) = n(n - 2)$. So $24 = n^2 - 2n$, and $n^2 - 2n - 24 = 0$. This gives $(n - 6)(n + 4) = 0$. Since a group can't have −4 people, $n = 6$.

Check: ₦10,000 each with 6 people, and ₦15,000 each with 4, a difference of ₦5,000.

## Finding your own errors
When an answer is wrong, the useful question is why. Most errors fall into a few groups. Keep a record of yours, because you'll notice that you tend to repeat the same one or two.

| Type of error | Example | How to stop it |
| --- | --- | --- |
| Sign | $-(x - 3) = -x - 3$ | Use brackets, and go slowly at minus signs |
| False rule | $(x + 3)^2 = x^2 + 9$ | Test with a number |
| Order of operations | $2 + 3 \times 4 = 20$ | Work one step per line |
| Not doing both sides | Multiplying one term only | Say "every term" out loud |
| Stopping too soon | Finding $x$, but not $y$ | Re-read what's asked |
| Copying | Writing 21 for 12 | Write clearly, and check against the question |
| No check | Any of the above | Substitute at the end |

### Spot the error
Each of these has an error. Try to find it before looking.

?? $2(x + 3) = 10$, so $2x + 3 = 10$, so $x = 3.5$.
=> The 2 must multiply both terms. It should be $2x + 6 = 10$, so $x = 2$.

?? $x^2 = 25$, so $x = 5$.
=> Both signs are needed: $x = \pm 5$.

?? $-2x > 6$, so $x > -3$.
=> Dividing by a negative flips the sign: $x < -3$.

?? $\frac{x + 2}{2} = x$, cancelling the 2s.
=> The 2 isn't a factor of the whole top. Actually, $\frac{x + 2}{2} = \frac{x}{2} + 1$.

## How to practise
- **Mix it up.** Do problems in a random order, not in blocks of the same kind.
- **Try first.** Stay with a problem for a few minutes before looking at the answer. The struggle is part of the learning.
- **Explain it.** Say what you're doing and why, out loud.
- **Check it.** Substitute at the end, every time, until it's a habit.
- **Space it out.** Coming back to it on a later day works better than doing more of it today.

# Exercises
?? Solve $\frac{x}{3} + 2 = 5$.
=> $x = 9$.

?? Solve $x^2 - 3x = 10$.
=> $(x - 5)(x + 2) = 0$, so $x = 5$ or $x = -2$.

?? Solve $3x + 2y = 12$ and $x - 2y = 4$.
=> Add: $4x = 16$, so $x = 4$ and $y = 0$.

?? Solve $3 - 2x \le 9$.
=> $-2x \le 6$, so $x \ge -3$.

?? Make $n$ the subject of $S = \frac{n}{2}(a + l)$.
=> $n = \frac{2S}{a + l}$.

?? Simplify $\frac{x^2 - 5x}{x^2 - 25}$.
=> $\frac{x(x - 5)}{(x + 5)(x - 5)} = \frac{x}{x + 5}$.

?? Solve $5^x = 200$, to 2 decimal places.
=> $x = \frac{\log 200}{\log 5} \approx 3.29$.

?? Solve $x^2 + 4x + 1 = 0$, in surd form.
=> $x = -2 \pm \sqrt{3}$.

# Practice
1. Set a timer for 30 minutes. From the exercises in any earlier lessons in this course, take ten problems from different lessons, and work through them in a mixed order. Don't look at any notes unless you're stuck for several minutes.
2. Mark your own work. For each one you got wrong, write the type of error from the table.
3. Count up the types. Which is your most common?
4. Write one sentence saying what you'll do about it.
5. Go back in a few days, and redo the ones you missed.

Write your score, your error types, your most common error and your sentence.

# Rubric
- I worked through ten mixed problems without looking at notes first.
- I named the type of each error I made.
- I found my most common error, and chose a way to stop it.

# Summary
- Decide what kind of problem it is before writing anything.
- No equals sign means simplify, not solve.
- Mixed practice feels harder, and it works better.
- Most errors fall into a few types, so keep a record of yours.
- Check by substituting every time.

# Check
Q: Solve {a}$x$ − {b} = {a*k-b}. Enter only the value of $x$, for example 7.
P: Worked problems, mixed
Vars: a=2..9, b=2..15, k=2..12
F: k
= Add {b}, then divide by {a}. The answer is {k}.

Q: Which is the first move for $x^2 = 7x - 12$?
P: Ask what kind of problem it is
- Divide both sides by $x$, to make it linear
* Bring everything to one side, so that it equals zero
- Take the square root of both sides straight away
= It's a quadratic, so it must equal zero before factorising.

Q: Which is the first move for $3^x = 50$?
P: Ask what kind of problem it is
- Divide both sides by 3, to remove the power
* Take logs of both sides
- Take the cube root of both sides of the equation
= The unknown is in the power, so logs are needed.

Q: You're asked to simplify $x^2 + 3x$. What do you do?
P: Ask what kind of problem it is
- Set it equal to zero, and solve it for $x$
* Write it as $x(x + 3)$, without solving anything
- Move the $3x$ to the other side of the expression
= There's no equals sign, so there's nothing to solve.

Q: Solve $\frac{12}{x} = x + 1$. What's the positive solution?
P: Worked problems, mixed
A: 3 | x = 3 | x=3 | three
= $12 = x^2 + x$, so $(x + 4)(x - 3) = 0$.

Q: Solve $9^x = 27$. Give $x$ as a decimal or a fraction.
P: Worked problems, mixed
A: 1.5 | 3/2 | x = 1.5 | x = 3/2
= $3^{2x} = 3^3$, so $2x = 3$.

Q: Solve $x + y = 5$ and $y = x^2 - 1$ for positive $x$. What's $x$?
P: Worked problems, mixed
A: 2 | x = 2 | x=2 | two
= $x + x^2 - 1 = 5$, so $x^2 + x - 6 = 0$, and $(x + 3)(x - 2) = 0$.

Q: A student writes $-(2x - 5) = -2x - 5$. What type of error is this?
P: Finding your own errors
- An order of operations error
* A sign error
- An error of stopping too soon
= The minus flips both signs. It should be $-2x + 5$.

Q: A student writes $(x + 4)^2 = x^2 + 16$. What's the fastest way to catch that?
P: Finding your own errors
- Reading through their notes on the subject again
* Testing it with a number, such as $x = 2$
- Writing the same line out again more clearly
= $36$ isn't $20$, so the rule is false.

Q: Which way of practising works better later?
P: How to practise
- Doing many of one kind in a block until it feels easy
* Mixing kinds, and coming back on a later day
- Reading worked answers until you feel you know them
= Feeling easy isn't the same as learning. Choosing the method is what you need to practise.

Q[transfer]: 8 friends share a bill equally. If 2 more people joined, each would pay ₦1,000 less. What's the total bill, in naira?
P: Worked problems, mixed
A: 40000 | 40,000 | ₦40,000 | ₦40000
= $\frac{B}{8} - \frac{B}{10} = 1{,}000$, so $\frac{B}{40} = 1{,}000$.

Q[transfer]: You find that most of your mistakes are sign errors. Which is the best response?
P: Finding your own errors
- Do more of whichever topic felt the hardest to you
* Use brackets when substituting, and check each minus step
- Stop working on the problems that involve a minus sign
= A specific habit targets a specific error.

Q[transfer]: A program gives a wrong result. Which approach from this lesson carries over best?
P: Finding your own errors
- Rewrite the whole program from the start, without looking at it
* Test it on a small example with a known answer, and find the step that breaks
- Assume the computer is at fault, and run the same program again
= Testing with known values is exactly how you check algebra too.

# Cards
What should you do before writing anything? :: Decide what kind of problem it is.
No equals sign means what? :: Simplify. There's nothing to solve.
What's the first move when the unknown is in a power? :: Take logs.
Why does mixed practice work? :: It makes you practise choosing the method, which real problems require.
What's the most reliable final step? :: Substitute your answer into the original.

# Further
- OpenStax Elementary Algebra 2e, Use a problem-solving strategy :: https://openstax.org/books/elementary-algebra-2e/pages/3-1-use-a-problem-solving-strategy
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
