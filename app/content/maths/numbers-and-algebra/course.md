---
id: numbers-and-algebra
subject: Maths
title: Numbers and Algebra
examMinutes: 60
project: A budget model built from your own formulas
level: 0
needs:
---
# Goal
Work confidently with numbers, fractions, powers, logarithms and algebra, starting from what a digit means. Nothing is assumed. By the end you can set up and solve real problems with equations, and you have what later maths, statistics and programming courses rely on.

# Units
## na-u1 :: Whole numbers :: Place value, the four operations by hand, the order of operations, factors and primes, and negative numbers.
- na-place-value
- na-add-subtract
- na-multiply-divide
- na-order-of-operations
- na-factors-primes
- na-negative-numbers

## na-u2 :: Parts of a whole :: Fractions, decimals, percentages and ratio, with the meaning behind each rule.
- na-fractions
- na-equivalent-fractions
- na-add-fractions
- na-multiply-fractions
- na-decimals
- na-percentages
- na-ratio

## na-u3 :: Powers and roots :: What powers mean, their rules, roots, scientific notation and logarithms.
- na-powers
- na-power-rules
- na-roots-surds
- na-scientific-notation
- na-logarithms
- na-log-rules

## na-u4 :: First algebra :: Letters for numbers, simplifying, solving, rearranging, word problems, inequalities and simultaneous equations.
- na-variables
- na-simplifying
- na-linear-equations
- na-rearranging
- na-word-problems
- na-inequalities
- na-simultaneous

## na-u5 :: Polynomials and quadratics :: Expanding, factorising, three ways to solve a quadratic, the discriminant and algebraic fractions.
- na-expanding
- na-factorising
- na-solve-by-factorising
- na-completing-the-square
- na-quadratic-formula
- na-discriminant
- na-algebraic-fractions

## na-u6 :: Practice :: Mixed problems without a label, and algebra on real money.
- na-mixed-practice
- na-money-problems

# Project
Build a budget model for one real month of your own life, using formulas you wrote yourself. You can build it on paper, or in any spreadsheet. Use real numbers wherever you can, and likely ones where you can't. Keep your account details and other people's details out of it.

Your model needs these six parts.

1. **Your letters.** A list of every quantity you use, each with a letter or a named cell, saying exactly what number it stands for, with its units. Separate what's fixed from what varies.
2. **Your main formula.** One formula for what's left over at the end of the month, with its numbers worked out by hand step by step, and then checked.
3. **Two limits.** Solve two real inequalities. For example, the most you can spend on one thing before you run out, and the fewest weeks of work or study you can fit before a date.
4. **A goal.** A real target you're saving for or planning towards. Rearrange or solve to find how long it'd take at your current rate, and what would have to change to reach it sooner.
5. **A comparison.** Two real options you could choose between, such as two data plans or two ways of paying a fee. Write each as a formula, and find the usage where they cost the same, or show why there's no such usage in your realistic range. If one of them involves borrowing, work out what it would really cost in total. Say which you'd choose, and why.
6. **What the model leaves out.** At least three real things it doesn't capture, and how you could check your model against a real month. If you can, run it for a real month and write what was different.

Write it in your own words, showing your working. Your own reasoning is the point, so don't have an AI write it. This project is self-checked, and the app will record it that way. It's for learning, and it isn't financial advice.

# Project rubric
- All six parts are present, and they use my own numbers and my own formulas.
- Every letter says exactly what number it stands for, with its units.
- I worked the main formula by hand, and I checked each answer by substituting.
- I could explain any line of it aloud.
- It contains no account details or other people's private details.

# Exam
Q: What is the 7 worth in 3,750?
A: 700
= It sits in the hundreds place.

Q: What is {a} × {b}?
Vars: a=112..498, b=12..39
F: a*b
= Multiply by the ones, multiply by the tens with a placeholder zero, then add.

Q: What is $6 + 4 \times (9 - 2)$?
A: 34
= Bracket first: 7. Then $4 \times 7 = 28$. Then $6 + 28$.

Q: What is the HCF of 54 and 72?
A: 18
= $54 = 2 \times 3^3$, and $72 = 2^3 \times 3^2$. They share $2 \times 3^2$.

Q: What is $(-6) \times (-3) - 4$?
A: 14
= Same signs give a positive: $18 - 4$.

Q: What is $\frac{2}{3} + \frac{1}{4}$, in the form a/b?
A: 11/12
= $\frac{8}{12} + \frac{3}{12}$.

Q: What is $\frac{5}{6} \div \frac{10}{9}$, in the form a/b?
A: 3/4
= $\frac{5}{6} \times \frac{9}{10} = \frac{1}{2} \times \frac{3}{2}$.

Q: What is $0.3 \times 0.07$?
A: 0.021 | .021
= $3 \times 7 = 21$, with 3 decimal places.

Q: A ₦{a}0,000 fee rises by 15%. What's the new fee? Enter the number only, without the ₦ sign.
Vars: a=1..9
F: a*10000*1.15
= Multiply by 1.15.

Q: A price falls from ₦2,000 to ₦1,500. What's the percentage fall?
A: 25 | 25%
= $\frac{500}{2{,}000} \times 100$. Divide by the old value.

Q: Share ₦{k}0,000 in the ratio $3 : 7$. What's the smaller share? Enter the number only, without the ₦ sign.
Vars: k=1..9
F: k*3000
= 10 parts, so one part is {k*1000}. The smaller share is 3 parts.

Q: What is $2^{-3}$, in the form a/b?
A: 1/8
= A negative exponent gives a reciprocal.

Q: Simplify $x^5 \times x^{{n}}$. What's the exponent of $x$?
Vars: n=2..15
F: 5+n
= Same base, so add the exponents.

Q: Simplify $\sqrt{75}$. Enter it as a√b, for example 2√5.
A: 5√3 | 5 √3 | 5sqrt3 | 5sqrt(3)
= $\sqrt{25 \times 3} = 5\sqrt{3}$.

Q: What is $\log_2 64$?
A: 6 | six
= $2^6 = 64$.

Q: For a valid base $b$ and positive $x$ and $y$, which is equal to $\log_b x + \log_b y$?
- $\log_b(x + y)$
* $\log_b(xy)$
- $\log_b x \times \log_b y$
= Logs turn multiplying into adding.

Q: Simplify $3(x + 4) - 2(x - 1)$, in the form x + b.
A: x + 14 | x+14
= $3x + 12 - 2x + 2$.

Q: Solve {a}$x$ + {b} = {a*k+b}. Enter only the value of $x$, for example 7.
Vars: a=2..9, b=2..20, k=2..12
F: k
= Subtract {b}, then divide by {a}.

Q: Solve $\frac{x}{2} + \frac{x}{3} = 10$. Enter only the value of $x$, for example 7.
A: 12 | x = 12 | x=12
= Multiply by 6: $3x + 2x = 60$.

Q: Solve $5 - 3x > 14$.
- $x > -3$
* $x < -3$
- $x < 3$
= $-3x > 9$. Dividing by −3 flips the sign.

Q: Solve $2x + y = 13$ and $x - y = 2$. What is $x$?
A: 5 | x = 5 | x=5 | five
= Add: $3x = 15$.

Q: Expand $(x - 6)^2$.
- $x^2 + 36$
- $x^2 - 36$
* $x^2 - 12x + 36$
= Square the first, double the product, square the last.

Q: What's the larger root of $x^2 - 3x - 10 = 0$?
A: 5 | x = 5 | x=5
= $(x - 5)(x + 2) = 0$.

Q: How many real roots does $x^2 + 3x + 5 = 0$ have?
A: 0 | none | zero | no roots | no real roots
= $\Delta = 9 - 20 = -11$. It's negative.

Q[transfer]: An app has 500 users, and it doubles each month. Using logs or powers, after how many whole months does it first pass 100,000?
A: 8 | 8 months | eight
= $500 \times 2^n > 100{,}000$, so $2^n > 200$. $2^7 = 128$ and $2^8 = 256$.

Q[transfer]: You have ₦50,000. A hall costs ₦20,000 and meals cost ₦1,200 each. What's the greatest number of meals you can pay for?
A: 25 | 25 meals
= $20{,}000 + 1{,}200m \le 50{,}000$, so $m \le 25$.

Q[transfer]: A plot is 5 m longer than it's wide, and its area is 84 square metres. What's its width, in metres?
A: 7 | 7 m | 7 metres | seven
= $w(w + 5) = 84$, so $(w + 12)(w - 7) = 0$. A width can't be −12.

Q[transfer]: A loan of ₦60,000 charges 4% a month, compounded, for 3 months. What do you owe at the end, to the nearest naira?
A: 67492 | 67,492 | ₦67,492 | ₦67492
= $60{,}000 \times 1.04^3 = 67{,}491.84$.

Q[transfer]: A spreadsheet shows the average of A1 and B1 using `=A1+B1/2`, and the result looks too big. What's the correct formula?
- `=A1+(B1/2)`
* `=(A1+B1)/2`
- `=A1/2+B1`
= Division comes before adding, so you need brackets around the sum.

Q[transfer]: A ball's height in metres is $h = 40t - 5t^2$. Does it ever reach 100 m?
- Yes, as $t = 4$ gives a height of 100 m exactly
* No, as $5t^2 - 40t + 100 = 0$ has a negative discriminant
- Yes, as every height is reached sooner or later
= $\Delta = 1{,}600 - 2{,}000 = -400$. The highest it gets is 80 m.
