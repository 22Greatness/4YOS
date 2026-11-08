---
id: na-inequalities
pack: Numbers and Algebra · First algebra
title: Linear inequalities
minutes: 35
source: OpenStax · Elementary Algebra 2e · Section 2.7
url: https://openstax.org/books/elementary-algebra-2e/pages/2-7-solve-linear-inequalities
courses: The base of all later maths and statistics
format: 2
teaches: inequality-symbols; solve-inequalities; flip-rule; inequality-on-a-line; compound-inequalities
uses: solve-linear; balance-method; number-line; multiply-divide-negatives; set-up-equations
---
# Goal
Read inequality symbols, solve linear inequalities, know when the sign flips, and show the answer on a number line.

# Why
Real limits are rarely exact. You have at most ₦20,000, you need at least 80% to pass, and a password must have 12 characters or more. Those are inequalities. Programs test them constantly in their `if` statements, and optimisation courses later are built around them. The one new rule here, flipping the sign, is a classic source of lost marks.

# Warm-up
?? Solve $3x - 4 = 11$.
=> $x = 5$.

?? Which is greater, −7 or −2?
=> −2.

# Lesson
## The symbols
An **inequality** compares two values that may not be equal. The wide end of the sign faces the bigger value.

| Symbol | Means | Example that's true |
| --- | --- | --- |
| $<$ | Less than | $3 < 5$ |
| $>$ | Greater than | $5 > 3$ |
| $\le$ | Less than or equal to | $5 \le 5$ |
| $\ge$ | Greater than or equal to | $7 \ge 5$ |

Translating words needs care.

| Words | Inequality |
| --- | --- |
| At most 20, no more than 20 | $x \le 20$ |
| At least 80, no less than 80 | $x \ge 80$ |
| Under 18 | $x < 18$ |
| More than 5 | $x > 5$ |
| Between 2 and 9, including both | $2 \le x \le 9$ |

> Mistake: Mixing up "at least" and "at most". "At least 80" means 80 or more, so the sign is $\ge$, even though the word "least" sounds like "less".

## What the answer looks like
An equation usually has one solution. An inequality usually has **infinitely many**. $x > 3$ is true for 4, for 3.5, for 3.001 and for a million. So we show solutions on a number line.

The line below marks 3, where the solutions begin. For $x > 3$, everything to the right of 3 works, and 3 itself doesn't, as 3 isn't greater than 3. By hand, you'd draw an **open circle** at 3, then an arrow to the right. For $x \ge 3$, you'd draw a **filled circle**, since 3 is included.

```diagram
{"kind":"numberline","alt":"A number line from minus 2 to 8, with 3 marked. For x greater than 3, the solutions are everything to the right of 3.","min":-2,"max":8,"step":1,"marks":[3]}
```

| Inequality | Circle at the end | Direction |
| --- | --- | --- |
| $x > 3$ | Open | Right |
| $x \ge 3$ | Filled | Right |
| $x < 3$ | Open | Left |
| $x \le 3$ | Filled | Left |

## Solving
Solve as you would an equation, using the balance idea. Adding, subtracting, or multiplying or dividing by a positive number all keep the inequality true.

### Worked example: $3x - 4 < 11$
| Step | Result |
| --- | --- |
| Add 4 to both sides | $3x < 15$ |
| Divide both sides by 3 | $x < 5$ |

So any number below 5 works. Test one in the original: $x = 2$ gives $6 - 4 = 2$, and $2 < 11$. Good. Test one outside: $x = 6$ gives $14$, which isn't below 11. Good.

Unknowns on both sides work the same way. $5x + 2 \ge 3x + 10$ becomes $2x \ge 8$, so $x \ge 4$.

## The flip rule
There's one new rule. **When you multiply or divide both sides by a negative number, flip the sign.**

Why? Start with a true statement: $2 < 5$. Multiply both sides by −1. You get −2 and −5. But $-2 > -5$. The order reversed. Multiplying by a negative mirrors the number line around zero, and that reverses the order.

| Start | Multiply both sides by −1 | Sign |
| --- | --- | --- |
| $2 < 5$ | $-2$ and $-5$ | $-2 > -5$ |
| $1 < 4$ | $-1$ and $-4$ | $-1 > -4$ |

### Worked example: $7 - 2x \ge 1$
| Step | Result |
| --- | --- |
| Subtract 7 from both sides | $-2x \ge -6$ |
| Divide both sides by −2, and flip | $x \le 3$ |

Test: $x = 0$ gives $7 \ge 1$, which is true. $x = 5$ gives $-3 \ge 1$, which is false. So $x \le 3$ is right.

> Mistake: Forgetting to flip. It's easy to do, and the answer looks completely reasonable. Test one number from your answer against the original inequality, and you'll catch it every time.

You can avoid this entirely by moving the $x$ term to the side where it stays positive: $7 - 2x \ge 1$ gives $7 - 1 \ge 2x$, so $3 \ge x$, which is the same as $x \le 3$.

Also, never multiply both sides by a letter whose sign you don't know, because you won't know if a flip is needed.

## Double inequalities and real limits
A statement like $2 \le x < 9$ says that $x$ is between 2 and 9, including 2 but not 9. Solve by doing the same thing to all three parts.

$$-1 < 2x + 3 \le 9$$

Subtract 3 from each part: $-4 < 2x \le 6$. Divide each part by 2: $-2 < x \le 3$.

### Worked example: a budget
You have ₦20,000. A course pack costs ₦6,500, and each bundle costs ₦1,500. These prices are invented. What's the most bundles you can buy?

$$6{,}500 + 1{,}500n \le 20{,}000 \quad\Rightarrow\quad 1{,}500n \le 13{,}500 \quad\Rightarrow\quad n \le 9$$

So you can buy at most 9 bundles.

### Worked example: a pass mark
Your course's final grade is the average of 3 tests, and you need at least 70. You've got 62 and 74. What must you score on the last?

$$\frac{62 + 74 + x}{3} \ge 70 \quad\Rightarrow\quad 136 + x \ge 210 \quad\Rightarrow\quad x \ge 74$$

You need 74 or more.

### In code
Python's comparisons look just like these, with `<=` for $\le$, and `>=` for $\ge$. You'll learn the language in a later course, so just read the idea here:

```python
score = 74
print(score >= 70)
print(2 <= score < 100)
```

```output
True
True
```

# Exercises
?? Write "at most 15 people" as an inequality, using $p$.
=> $p \le 15$.

?? Solve $4x + 1 > 13$.
=> $4x > 12$, so $x > 3$.

?? Solve $-3x \le 12$.
=> Divide by −3, and flip: $x \ge -4$.

?? Solve $5 - x < 2$.
=> $-x < -3$, so $x > 3$.

?? Solve $1 \le 2x - 3 < 7$.
=> Add 3: $4 \le 2x < 10$. Divide by 2: $2 \le x < 5$.

?? You can spend at most ₦8,000, and each meal costs ₦1,200. What's the most meals you can buy?
=> $1{,}200m \le 8{,}000$, so $m \le 6.67$. At most 6 meals, as you can't buy a part of one.

# Practice
1. Write three real limits from your life as inequalities: a budget limit, a pass mark you must reach, and a time you can't go beyond. Say what your letter stands for, with its units.
2. For one of them, set up and solve the inequality to get a real answer: the most you can buy, or the lowest mark you can get.
3. Draw your answer on a number line, with the right kind of circle.
4. Test one value inside your answer and one value outside.
5. Show the flip rule to yourself with your own true statement, by multiplying both sides by −1.

Write your inequalities, your real answer and your tests.

# Rubric
- I wrote real limits as inequalities, using the correct symbols.
- I solved one to get a real answer, and rounded it sensibly.
- I tested values inside and outside my answer.

# Summary
- "At least" is $\ge$, and "at most" is $\le$.
- Solve like an equation, using the balance idea.
- Flip the sign when multiplying or dividing by a negative.
- Inequalities have many solutions, shown on a number line.
- An open circle excludes the end point, and a filled circle includes it.
- Test one value inside your answer, and one outside.

# Check
Q: Which means "at least 50"?
P: The symbols
- $x$ is below 50
- $x \le 50$
* $x \ge 50$
= At least 50 means 50 or more.

Q: Which means "no more than 12"?
P: The symbols
* $x \le 12$
- $x \ge 12$
- $x > 12$
= No more than 12 means 12 or less.

Q: On a number line, what's at 3 for $x \ge 3$?
P: What the answer looks like
- An open circle at 3, because the value 3 itself gets left out
* A filled circle at 3, as 3 is included
- No circle at all, because this type of sign needs none
= "Or equal to" means that the end point is included.

Q: Solve ${a}x > {a*k}$. What's the smallest whole number that works?
P: Solving
Vars: a=2..9, k=2..12
F: k+1
= Divide by {a} to get $x$ > {k}. The next whole number is {k+1}.

Q: Solve $2x + 5 \le 17$. What's the largest whole number that works?
P: Solving
A: 6 | six
= $2x \le 12$, so $x \le 6$.

Q: Solve $-4x > 20$.
P: The flip rule
- $x > -5$
* $x < -5$
- $x > 5$
= Dividing by −4 flips the sign.

Q: Why does multiplying by a negative flip the sign?
P: The flip rule
- Because it's a rule that was agreed on, and no reason exists for it
* It mirrors numbers around zero, which reverses their order
- Because negative numbers are always smaller than positive numbers
= $2 < 5$, but $-2 > -5$.

Q: For $3 \le 2x - 1 < 9$, what's the largest whole number that works?
P: Double inequalities and real limits
A: 4 | four
= Add 1: $4 \le 2x < 10$. So $2 \le x < 5$, and the largest whole number is 4.

Q[transfer]: You've got ₦15,000. You spend ₦3,000 on transport, and meals cost ₦1,500 each. What's the greatest number of meals you can buy?
P: Double inequalities and real limits
A: 8 | 8 meals | eight
= $3{,}000 + 1{,}500m \le 15{,}000$, so $m \le 8$.

Q[transfer]: The average of your 4 tests must be at least 80 to pass the module. So far, you've got 70, 85 and 90. What's the lowest mark you can get on the last?
P: Double inequalities and real limits
A: 75
= $\frac{245 + x}{4} \ge 80$, so $245 + x \ge 320$, and $x \ge 75$.

Q[transfer]: A sign-up form must reject passwords under 12 characters. Which test correctly accepts a length $n$?
P: The symbols
- $n > 12$, as exactly 12 is too short
* $n \ge 12$
- $n \le 12$
= A password of exactly 12 is fine. Off-by-one errors like using $>$ are common bugs.

# Cards
What does "at least 80" mean in symbols? :: $x \ge 80$.
What does "at most 20" mean in symbols? :: $x \le 20$.
When do you flip an inequality's sign? :: When multiplying or dividing both sides by a negative number.
Why does it flip? :: Multiplying by a negative mirrors numbers around zero, reversing their order.
What do open and filled circles mean? :: Open excludes the end point. Filled includes it.
How do you check your answer? :: Test one value inside and one value outside.

# Further
- OpenStax Elementary Algebra 2e, Solve linear inequalities :: https://openstax.org/books/elementary-algebra-2e/pages/2-7-solve-linear-inequalities
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
