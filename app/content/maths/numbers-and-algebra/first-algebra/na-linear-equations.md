---
id: na-linear-equations
pack: Numbers and Algebra · First algebra
title: Solving linear equations
minutes: 45
source: OpenStax · Elementary Algebra 2e · Section 2.3
url: https://openstax.org/books/elementary-algebra-2e/pages/2-3-solve-equations-with-variables-and-constants-on-both-sides
courses: The base of all later maths and statistics
format: 2
teaches: equation-meaning; balance-method; solve-linear; equations-with-brackets; equations-with-fractions; check-solution
uses: variables; expressions; collect-terms; distribute-brackets; add-subtract-negatives; multiply-divide-negatives; lcm
---
# Goal
Solve any linear equation by keeping it balanced, including those with brackets, fractions and unknowns on both sides, and check the answer.

# Why
An equation turns a question into something you can work on: how many, how much, how long. Linear equations are the most common kind, and every later method rests on the balance idea you'll learn here. Spreadsheets' goal-seeking, the line of best fit in statistics and a lot of programming logic all rely on them.

# Warm-up
?? Simplify $5x - 2 + 3x + 7$.
=> $8x + 5$.

?? Multiply out $-3(x - 2)$.
=> $-3x + 6$.

# Lesson
## What an equation says
An **equation** states that two expressions are equal. $2x + 3 = 11$ claims that $2x + 3$ and 11 have the same value. That's true for only certain values of $x$. A value that makes it true is called a **solution**, and to **solve** means to find it.

Try $x = 4$: $2(4) + 3 = 11$. It's true, so 4 is a solution. Try $x = 3$: $2(3) + 3 = 9$. It's false.

It's called **linear** because $x$ appears with no power above 1. Its graph is a straight line. Linear equations have exactly one solution, with two rare exceptions we'll see below.

## Keep it balanced
Think of a balanced scale. Whatever you do to one side, you must do to the other, or it tips. This is the one rule behind everything.

**Whatever you do to one side, do to the other.**

The aim is to get $x$ alone. Undo whatever has been done to it, using the opposite operation.

### Worked example: $2x + 3 = 11$
| Step | Why | Result |
| --- | --- | --- |
| $2x + 3 = 11$ | Start | |
| Subtract 3 from both sides | Undoes $+3$ | $2x = 8$ |
| Divide both sides by 2 | Undoes $\times 2$ | $x = 4$ |

### Checking
Put the answer back into the **original** equation: $2(4) + 3 = 11$. Correct. This check is exact, and it's available every time, so you always know if you're right.

> Mistake: Thinking of "moving" terms across the equals sign and "changing their sign". It can work, but people who learn it only as a trick make errors, because they don't know why it's true. Doing the same thing to both sides is what's really happening.

### Worked example with a negative
$5 - 3x = 17$. Subtract 5 from both sides: $-3x = 12$. Divide both sides by $-3$: $x = -4$. Check: $5 - 3(-4) = 5 + 12 = 17$. Correct.

?? Solve $4x - 7 = 21$.
=> Add 7: $4x = 28$. Divide by 4: $x = 7$. Check: $28 - 7 = 21$.

## Unknowns on both sides
Gather all the $x$ terms on one side, and all the numbers on the other. It's usually easiest to remove the smaller $x$ term.

### Worked example: $5x + 2 = 3x + 10$
| Step | Result |
| --- | --- |
| Subtract $3x$ from both sides | $2x + 2 = 10$ |
| Subtract 2 from both sides | $2x = 8$ |
| Divide both sides by 2 | $x = 4$ |

Check: left side is $5(4) + 2 = 22$, and right side is $3(4) + 10 = 22$. They match.

## Brackets and fractions
### Brackets
Multiply out first, then solve.

$3(x - 2) = 2(x + 5)$ becomes $3x - 6 = 2x + 10$. Subtract $2x$: $x - 6 = 10$. Add 6: $x = 16$.

Check: $3(14) = 42$, and $2(21) = 42$.

### Fractions
Get rid of them straight away. Multiply every term on both sides by the LCM of the bottoms.

$$\frac{x}{3} + \frac{x}{4} = 7$$

The LCM of 3 and 4 is 12. Multiply every term by 12:

$$4x + 3x = 84 \quad\Rightarrow\quad 7x = 84 \quad\Rightarrow\quad x = 12$$

Check: $\frac{12}{3} + \frac{12}{4} = 4 + 3 = 7$.

> Mistake: Multiplying only some terms. In $\frac{x}{2} + 3 = 7$, multiplying by 2 must give $x + 6 = 14$, and not $x + 3 = 14$. Every term gets multiplied.

When the top of a fraction has more than one term, keep it in a bracket:

$$\frac{x - 1}{2} = \frac{x + 2}{3} \quad\Rightarrow\quad 3(x - 1) = 2(x + 2) \quad\Rightarrow\quad 3x - 3 = 2x + 4 \quad\Rightarrow\quad x = 7$$

## When there's no single answer
Sometimes the $x$ terms vanish. Then you learn something different.

| Equation | After simplifying | Meaning |
| --- | --- | --- |
| $2x + 3 = 2x + 5$ | $3 = 5$ | Never true: no solution |
| $2(x + 3) = 2x + 6$ | $6 = 6$ | Always true: every number works |

The second type, true for all values, is called an **identity**.

You must also never divide both sides by something that could be zero. Later on, this matters when dividing by a letter.

## A plan for any linear equation
1. Clear fractions by multiplying everything by the LCM.
2. Multiply out brackets.
3. Collect like terms on each side.
4. Bring the unknowns to one side, and numbers to the other.
5. Divide by the coefficient.
6. Check in the original equation.

### Real use
You've got ₦15,000, and a course pack costs ₦4,000. Each bundle costs ₦1,500. How many bundles can you buy?

$$4{,}000 + 1{,}500n = 15{,}000$$

Subtract 4,000: $1{,}500n = 11{,}000$. Divide: $n = 7.33$. You can't buy a part of a bundle, so it's 7. Always ask what the answer means in real life. The numbers here are invented.

# Exercises
?? Solve $3x + 5 = 20$.
=> $3x = 15$, so $x = 5$.

?? Solve $9 - 2x = 3$.
=> $-2x = -6$, so $x = 3$.

?? Solve $7x - 4 = 3x + 12$.
=> $4x = 16$, so $x = 4$.

?? Solve $2(x + 3) = 5(x - 3)$.
=> $2x + 6 = 5x - 15$, so $21 = 3x$, and $x = 7$.

?? Solve $\frac{x}{2} - \frac{x}{5} = 3$.
=> Multiply by 10: $5x - 2x = 30$. So $3x = 30$, and $x = 10$.

?? Solve $4(x + 1) = 4x + 9$.
=> $4x + 4 = 4x + 9$, so $4 = 9$. There's no solution.

# Practice
1. Set up one real equation from your own money or time. For example, you need a target sum by a date, you have some of it now, and you can save a fixed amount each week. How many weeks do you need? Use your real numbers, or likely ones.
2. Solve it by hand, writing down what you did to both sides at each step.
3. Check it in the original equation. Then say what the answer means, and round it the sensible way.
4. Write and solve three equations of your own, one with brackets, one with fractions and one with unknowns on both sides. Check each of them.

Write your real equation, your steps and what the answer means.

# Rubric
- I solved a real equation from my own life, with each step shown.
- I checked every answer in the original equation.
- I said what the answer means, and rounded it sensibly.

# Summary
- A solution is a value that makes the equation true.
- Whatever you do to one side, do to the other.
- Undo operations with their opposites, until the unknown stands alone.
- Clear fractions by multiplying every term by the LCM.
- Always check in the original equation.
- An equation can have no solution, or be true for every number.

# Check
Q: Solve $x + {a} = {b}$. Enter only the value of $x$, for example 7.
P: Keep it balanced
Vars: a=2..30, b=31..60
F: b-a
= Subtract {a} from both sides. The answer is {b-a}.

Q: Solve ${a}x = {a*k}$. Enter only the value of $x$, for example 7.
P: Keep it balanced
Vars: a=2..12, k=2..12
F: k
= Divide both sides by {a}. The answer is {k}.

Q: Solve ${a}x + {b} = {a*k+b}$. Enter only the value of $x$, for example 7.
P: Keep it balanced
Vars: a=2..9, b=2..20, k=2..12
F: k
= Subtract {b}, then divide by {a}. The answer is {k}.

Q: Solve $6x - 5 = 4x + 9$.
P: Unknowns on both sides
A: 7 | x = 7 | x=7
= $2x = 14$.

Q: Solve $3(x - 4) = 15$.
P: Brackets and fractions
A: 9 | x = 9 | x=9
= $3x - 12 = 15$, so $3x = 27$.

Q: Solve $\frac{x}{4} + 2 = 5$. Enter only the value of $x$, for example 7.
P: Brackets and fractions
A: 12 | x = 12 | x=12
= Multiply every term by 4: $x + 8 = 20$.

Q: Put the steps for solving $2(x + 1) = 10$ in order.
P: A plan for any linear equation
O: Multiply out to get $2x + 2 = 10$ | Subtract 2 from both sides | Divide both sides by 2 | Check $x = 4$ in the original
= Brackets first, then undo, and check at the end.

Q: What does $3x + 1 = 3x + 4$ tell you?
P: When there's no single answer
- $x$ must be zero, as that's the only way to make the two sides match
* There's no solution, as it reduces to $1 = 4$
- Every number is a solution, as both sides have the same $3x$ term
= The $x$ terms vanish, leaving something false.

Q[transfer]: You need ₦60,000 for a laptop repair. You've got ₦12,000 and can save ₦6,000 a week. After how many weeks can you pay?
P: A plan for any linear equation
A: 8 | 8 weeks | eight
= $12{,}000 + 6{,}000w = 60{,}000$, so $w = 8$.

Q[transfer]: You solve an equation and get $n = 7.33$ for the number of bundles you can afford. What should you report?
P: A plan for any linear equation
* 7 bundles, as you can't buy a part of a bundle and can't afford 8
- 8 bundles, as anything with a decimal is rounded up
- 7.33 bundles, because an exact answer is the only right one
= Read the answer in context. Here, it has to round down.

Q[transfer]: A student "solves" $2x = 6$ by subtracting 2 from both sides, to get $x = 4$. What check reveals the error?
P: Keep it balanced
* Substituting: $2 \times 4 = 8$, and that isn't 6
- Looking at whether the answer's an even number or an odd one
- Adding 2 to both sides, as that brings you back to where you began
= Substituting back is exact. To undo $\times 2$, you divide.

# Cards
What is a solution to an equation? :: A value that makes the equation true.
What's the one rule of solving equations? :: Whatever you do to one side, do to the other.
How do you clear fractions from an equation? :: Multiply every term by the LCM of the bottoms.
How do you check your answer? :: Substitute it into the original equation.
What does it mean if the $x$ terms vanish, leaving $3 = 5$? :: There's no solution.
What does it mean if they vanish, leaving $6 = 6$? :: Every number is a solution. It's an identity.

# Further
- OpenStax Elementary Algebra 2e, Solve equations with variables and constants on both sides :: https://openstax.org/books/elementary-algebra-2e/pages/2-3-solve-equations-with-variables-and-constants-on-both-sides
- OpenStax Prealgebra 2e, Solving equations using the subtraction and addition properties :: https://openstax.org/books/prealgebra-2e/pages/2-3-solving-equations-using-the-subtraction-and-addition-properties-of-equality
