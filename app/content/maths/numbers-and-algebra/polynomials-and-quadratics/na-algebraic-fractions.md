---
id: na-algebraic-fractions
pack: Numbers and Algebra · Polynomials and quadratics
title: Algebraic fractions
minutes: 45
source: OpenStax · Elementary Algebra 2e · Sections 8.1 and 8.2
url: https://openstax.org/books/elementary-algebra-2e/pages/8-1-simplify-rational-expressions
courses: The base of all later maths and statistics
format: 2
teaches: simplify-algebraic-fractions; multiply-divide-algebraic-fractions; add-algebraic-fractions; solve-algebraic-fraction-equations; excluded-values
uses: simplify-fractions; add-fractions; multiply-fractions; divide-fractions; factor-trinomial; common-factor; factor-difference-of-squares; solve-by-factorising
---
# Goal
Simplify, multiply, divide and add fractions with letters in them, using the same rules as number fractions, and solve equations that contain them.

# Why
Algebraic fractions combine everything you've learned about fractions and factorising. They appear in rates, in averages, in probability formulas and in calculus. People find them hard because they forget one thing: **they follow exactly the same rules as ordinary fractions**. If you can do $\frac{1}{2} + \frac{1}{3}$, you can do this.

# Warm-up
?? Work out $\frac{1}{2} + \frac{1}{3}$.
=> $\frac{5}{6}$.

?? Factorise $x^2 - 4$.
=> $(x + 2)(x - 2)$.

# Lesson
## Same rules, new letters
An **algebraic fraction** has letters on the top, the bottom or both, like $\frac{x + 1}{x - 2}$. Since it's still a division, one new caution applies: **the bottom can't be zero**.

So $\frac{x + 1}{x - 2}$ has no value at $x = 2$. Those are called **excluded values**. Note them when they matter.

| With numbers | With letters |
| --- | --- |
| Simplify: $\frac{6}{8} = \frac{3 \times 2}{4 \times 2} = \frac{3}{4}$ | Simplify: $\frac{3(x+1)}{4(x+1)} = \frac{3}{4}$ |
| Multiply: $\frac{1}{2} \times \frac{3}{5} = \frac{3}{10}$ | Multiply: $\frac{a}{b} \times \frac{c}{d} = \frac{ac}{bd}$ |
| Divide: flip and multiply | Divide: flip and multiply |
| Add: common denominator | Add: common denominator |

## Simplifying
You simplify by cancelling common **factors**. So factorise everything first, then cancel whole brackets.

### Worked example: $\dfrac{x^2 + 5x + 6}{x^2 - 4}$
| Step | Result |
| --- | --- |
| Factorise top | $(x + 2)(x + 3)$ |
| Factorise bottom | $(x + 2)(x - 2)$ |
| Cancel the common bracket | $\dfrac{x + 3}{x - 2}$ |

### Worked example: $\dfrac{4x + 8}{6}$
Top: $4(x + 2)$. Then $\frac{4(x + 2)}{6} = \frac{2(x + 2)}{3}$.

> Mistake: Cancelling terms. In $\frac{x + 3}{x + 5}$, you can't cross out the $x$s to get $\frac{3}{5}$. Test with $x = 1$: $\frac{4}{6}$ isn't $\frac{3}{5}$. You can only cancel what multiplies the entire top and the entire bottom. If there's a $+$ or $-$ outside a bracket, you can't cancel yet.

A useful special case: $\frac{x - 3}{3 - x} = -1$, since $3 - x = -(x - 3)$.

?? Simplify $\dfrac{x^2 - 9}{x + 3}$.
=> $\frac{(x + 3)(x - 3)}{x + 3} = x - 3$.

## Multiplying and dividing
Factorise first, cancel across, then multiply.

### Worked example
$$\frac{x^2 - 1}{x + 2} \times \frac{x + 2}{x + 1} = \frac{(x + 1)(x - 1)}{x + 2} \times \frac{x + 2}{x + 1} = x - 1$$

### Worked example: dividing
Flip the second fraction, and multiply.

$$\frac{x}{x + 3} \div \frac{2x}{x^2 - 9} = \frac{x}{x + 3} \times \frac{(x + 3)(x - 3)}{2x} = \frac{x - 3}{2}$$

## Adding and subtracting
You need a common denominator, just as with numbers. Use the LCM of the bottoms. Factorise the bottoms first, to find it.

### Worked example: simple bottoms
$$\frac{x}{3} + \frac{x}{5} = \frac{5x}{15} + \frac{3x}{15} = \frac{8x}{15}$$

### Worked example: letters on the bottom
$$\frac{2}{x} + \frac{3}{x + 1} = \frac{2(x + 1)}{x(x + 1)} + \frac{3x}{x(x + 1)} = \frac{2x + 2 + 3x}{x(x + 1)} = \frac{5x + 2}{x(x + 1)}$$

### Worked example: subtraction
Watch the sign. Keep the second top in a bracket.

$$\frac{x + 1}{2} - \frac{x - 3}{4} = \frac{2(x + 1)}{4} - \frac{x - 3}{4} = \frac{2x + 2 - x + 3}{4} = \frac{x + 5}{4}$$

> Mistake: Writing $-x - 3$ here. The minus applies to the whole second top, so $-(x - 3) = -x + 3$. Always bracket the top you're subtracting.

### Worked example: factorise first
$$\frac{1}{x + 2} + \frac{3}{x^2 - 4}$$

Since $x^2 - 4 = (x + 2)(x - 2)$, the common denominator is $(x + 2)(x - 2)$.

$$\frac{x - 2}{(x + 2)(x - 2)} + \frac{3}{(x + 2)(x - 2)} = \frac{x + 1}{(x + 2)(x - 2)}$$

> Mistake: Adding across, as in $\frac{1}{x} + \frac{1}{y} = \frac{2}{x + y}$. It's wrong for the same reason it's wrong with numbers. It's really $\frac{x + y}{xy}$. Test with $x = 1$ and $y = 1$: $1 + 1 = 2$, and not $1$.

## Solving equations
Multiply every term by the common denominator. This clears the fractions, as you did with number fractions in equations. Then solve as usual.

### Worked example
$$\frac{3}{x} + \frac{1}{2} = 2$$

Multiply every term by $2x$:

$$6 + x = 4x \quad\Rightarrow\quad 6 = 3x \quad\Rightarrow\quad x = 2$$

Check: $\frac{3}{2} + \frac{1}{2} = 2$. Correct.

### Worked example: a false solution
$$\frac{x}{x - 2} = \frac{2}{x - 2} + 3$$

Multiply by $x - 2$: $x = 2 + 3(x - 2) = 3x - 4$. So $4 = 2x$, and $x = 2$.

But $x = 2$ makes the bottom zero, and there's no value there. So this equation has **no solution**. Multiplying by an expression that can be zero can create false answers. Always check in the original equation, particularly here.

### Worked example: a real problem
Working alone, you take 6 hours, and a friend takes $x$ hours. Together, you take 4 hours. Each hour you do $\frac{1}{6}$ of the job, and your friend does $\frac{1}{x}$.

$$\frac{4}{6} + \frac{4}{x} = 1 \quad\Rightarrow\quad \frac{4}{x} = \frac{1}{3} \quad\Rightarrow\quad x = 12$$

Your friend would take 12 hours alone.

### Where they lead
Averages of rates are a classic use. If you go somewhere at 40 km/h and return at 60 km/h, the average speed isn't 50 km/h. For a distance $d$ each way, the total time is $\frac{d}{40} + \frac{d}{60} = \frac{5d}{120} = \frac{d}{24}$. The total distance is $2d$. So the average speed is $2d \div \frac{d}{24} = 48$ km/h. Algebraic fractions gave an answer you wouldn't have guessed, and the $d$ cancelled, so it's true for any distance.

# Exercises
?? Simplify $\dfrac{6x + 12}{9}$.
=> $\frac{6(x + 2)}{9} = \frac{2(x + 2)}{3}$.

?? Simplify $\dfrac{x^2 + 3x}{x^2 + 5x + 6}$.
=> $\frac{x(x + 3)}{(x + 2)(x + 3)} = \frac{x}{x + 2}$.

?? Multiply $\dfrac{3x}{x + 1} \times \dfrac{x + 1}{6}$.
=> $\frac{x}{2}$.

?? Work out $\dfrac{x}{4} + \dfrac{x + 1}{6}$.
=> LCM 12: $\frac{3x + 2x + 2}{12} = \frac{5x + 2}{12}$.

?? Work out $\dfrac{1}{x} - \dfrac{1}{x + 1}$.
=> $\frac{x + 1 - x}{x(x + 1)} = \frac{1}{x(x + 1)}$.

?? Solve $\dfrac{5}{x} = \dfrac{2}{3}$.
=> Multiply by $3x$: $15 = 2x$, so $x = 7.5$.

# Practice
1. Pick three number fractions, and do one add, one multiply and one divide. Then repeat each one with a letter in place of a number. See that the steps are the same.
2. Test the two common mistakes with numbers: cancel the $x$ in $\frac{x + 3}{x + 5}$, and add across in $\frac{1}{x} + \frac{1}{y}$. Use real values to show that each one is wrong.
3. Choose a real journey you do both ways, with different speeds or times. Work out the true average speed using this method. Is it what you would've guessed?
4. Take two real people or machines doing a job at different speeds. Set up an equation for how long they'd take together, and solve it.

Write your tests, your real average speed, and your joint-work answer.

# Rubric
- I showed that letter fractions follow the same steps as number fractions.
- I proved two common mistakes wrong with numbers.
- I worked out a real average speed using an algebraic fraction.

# Summary
- Algebraic fractions follow the same rules as number fractions.
- The bottom can't be zero.
- Factorise first, then cancel whole factors only, never terms.
- To add, find a common denominator. Bracket any top you're subtracting.
- To solve, multiply every term by the common denominator.
- Check in the original equation, since false solutions can appear.

# Check
Q: For which value of $x$ does $\frac{x + 1}{x - {a}}$ have no value?
P: Same rules, new letters
Vars: a=2..20
F: a
= The bottom is zero when $x$ is {a}.

Q: Simplify $\frac{x^2 - 16}{x - 4}$.
P: Simplifying
A: x + 4 | x+4
= $\frac{(x + 4)(x - 4)}{x - 4} = x + 4$.

Q: A student cancels the $x$s in $\frac{x + 3}{x + 5}$ to get $\frac{3}{5}$. What's wrong?
P: Simplifying
- Nothing, as long as $x$ isn't equal to zero in the fraction
* $x$ is a term here, not a factor, so it can't be cancelled
- Only the numbers can be cancelled, and never any letters at all
= You can only cancel what multiplies the entire top and bottom.

Q: What is $\frac{x - 5}{5 - x}$?
P: Simplifying
A: -1 | −1
= $5 - x = -(x - 5)$.

Q: Multiply $\frac{x}{3} \times \frac{6}{x^2}$.
P: Multiplying and dividing
A: 2/x
= Cancel 3 into 6, and one $x$: $\frac{2}{x}$.

Q: Divide $\frac{x}{4} \div \frac{x}{8}$.
P: Multiplying and dividing
A: 2 | two
= $\frac{x}{4} \times \frac{8}{x} = 2$.

Q: Which is $\frac{1}{x} + \frac{1}{y}$?
P: Adding and subtracting
- $\frac{2}{x + y}$
* $\frac{x + y}{xy}$
- $\frac{1}{xy}$
= Use a common denominator of $xy$.

Q: What is $\frac{x}{2} + \frac{x}{3}$, in the form ax/b?
P: Adding and subtracting
A: 5x/6
= $\frac{3x}{6} + \frac{2x}{6}$.

Q: Solve $\frac{8}{x} = 2$.
P: Solving equations
A: 4 | x = 4 | x=4 | four
= Multiply by $x$: $8 = 2x$.

Q: A solution makes the bottom of the original equation zero. What should you do?
P: Solving equations
- Accept it, as it came from correctly following the steps
* Reject it, as the equation has no value there
- Add one to it, so that the bottom stops being zero
= Multiplying by an expression that can be zero may create false answers.

Q[transfer]: You go somewhere at 30 km/h, and return at 60 km/h. What's your average speed, in km/h?
P: Solving equations
A: 40 | 40 km/h
= Total time is $\frac{d}{30} + \frac{d}{60} = \frac{d}{20}$. So $2d \div \frac{d}{20} = 40$.

Q[transfer]: You complete a job in 3 hours, and a friend does it in 6. How long does it take you together, in hours?
P: Solving equations
A: 2 | 2 hours | two
= $\frac{t}{3} + \frac{t}{6} = 1$, so $2t + t = 6$.

Q[transfer]: In a program, `average = total / count` runs for every class, including an empty one. Which idea from this lesson warns you about that?
P: Same rules, new letters
* The bottom of a fraction can't be zero
- Terms can't be cancelled from a fraction
- Fractions need a common denominator
= Excluded values are real bugs. Test for a count of 0 first.

# Cards
What's the one rule for algebraic fractions? :: They follow the same rules as number fractions.
What's an excluded value? :: A value that makes the bottom zero.
What can you cancel in a fraction? :: Only whole factors, after factorising. Never terms.
How do you add algebraic fractions? :: Use a common denominator, the LCM of the bottoms.
What's $\frac{1}{x} + \frac{1}{y}$? :: $\frac{x + y}{xy}$.
Why check solutions to fraction equations? :: Multiplying by an expression that can be zero can create false answers.

# Further
- OpenStax Elementary Algebra 2e, Simplify rational expressions :: https://openstax.org/books/elementary-algebra-2e/pages/8-1-simplify-rational-expressions
- OpenStax Elementary Algebra 2e, Multiply and divide rational expressions :: https://openstax.org/books/elementary-algebra-2e/pages/8-2-multiply-and-divide-rational-expressions
