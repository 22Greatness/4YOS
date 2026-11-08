---
id: na-power-rules
pack: Numbers and Algebra · Powers and roots
title: Rules of powers
minutes: 40
source: OpenStax · Elementary Algebra 2e · Section 6.2
url: https://openstax.org/books/elementary-algebra-2e/pages/6-2-use-multiplication-properties-of-exponents
courses: The base of all later maths and statistics
format: 2
teaches: multiply-powers; divide-powers; power-of-power; zero-exponent; negative-exponent; fraction-exponent
uses: power-meaning; base-and-exponent; multiply-fractions; divide-fractions; reciprocal
---
# Goal
Use the rules of powers to multiply, divide and raise powers, and say what zero, negative and fractional exponents mean.

# Why
These rules let you simplify huge calculations without doing them, and they appear all through algebra and science. Logarithms, which come soon, are these same rules read backwards. Computing sizes rely on them too, such as $2^{10} \times 2^{10} = 2^{20}$, which is how you go from a kilobyte to a megabyte.

# Warm-up
?? What is $2^4$?
=> 16.

?? What's the reciprocal of $\frac{2}{3}$?
=> $\frac{3}{2}$.

# Lesson
## Multiplying and dividing
You don't need to memorise the rules, as you can see where they come from by writing the powers out.

### Multiplying with the same base
$$2^3 \times 2^4 = (2 \times 2 \times 2) \times (2 \times 2 \times 2 \times 2) = 2^7$$

Three 2s and four 2s make seven 2s. So **add the exponents**.

$$a^m \times a^n = a^{m+n}$$

### Dividing with the same base
$$\frac{2^5}{2^2} = \frac{2 \times 2 \times 2 \times 2 \times 2}{2 \times 2} = 2^3$$

Two of the 2s cancel, leaving three. So **subtract the exponents**.

$$\frac{a^m}{a^n} = a^{m-n}$$

> Mistake: Using these rules with different bases. $2^3 \times 5^4$ can't be combined this way, since the things being multiplied differ. Also, $2^3 \times 2^4$ isn't $4^7$. The base stays as 2.

> Mistake: Using them for adding. $2^3 + 2^4$ isn't $2^7$. It's $8 + 16 = 24$. The rules are only for multiplying and dividing.

## Power of a power, and of a product
### A power of a power
$$(2^3)^2 = 2^3 \times 2^3 = 2^6$$

Two lots of three 2s make six 2s. So **multiply the exponents**.

$$(a^m)^n = a^{m \times n}$$

### A power of a product or fraction
The power goes to everything being multiplied inside the bracket.

$$(2 \times 3)^2 = 2^2 \times 3^2 = 4 \times 9 = 36 \qquad \left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}$$

> Mistake: Spreading a power over a sum. $(2 + 3)^2$ isn't $2^2 + 3^2$. The left side is 25, and the right side is 13. Powers spread over multiplying, never over adding. This is one of the most common errors in algebra.

?? Simplify $(x^4)^3$, and $x^4 \times x^3$.
=> $(x^4)^3 = x^{12}$, and $x^4 \times x^3 = x^7$.

## Zero and negative exponents
What can $2^0$ mean? Zero 2s multiplied makes no obvious sense, so let the rule decide:

$$\frac{2^3}{2^3} = 2^{3-3} = 2^0$$

Anything divided by itself is 1. So $2^0 = 1$. The same holds for any base except 0: $a^0 = 1$.

Now use the subtraction rule to go below zero:

$$\frac{2^2}{2^5} = 2^{2-5} = 2^{-3} \qquad \text{and also} \qquad \frac{2 \times 2}{2 \times 2 \times 2 \times 2 \times 2} = \frac{1}{2^3}$$

So a **negative exponent means the reciprocal**.

$$a^{-n} = \frac{1}{a^n}$$

The pattern shows this clearly. Each step down divides by 2.

| Power | $2^3$ | $2^2$ | $2^1$ | $2^0$ | $2^{-1}$ | $2^{-2}$ | $2^{-3}$ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Value | 8 | 4 | 2 | 1 | $\frac{1}{2}$ | $\frac{1}{4}$ | $\frac{1}{8}$ |

> Mistake: Thinking a negative exponent makes the answer negative. $2^{-3}$ is $\frac{1}{8}$, a small positive number, not −8.

A fraction with a negative exponent flips: $\left(\frac{2}{3}\right)^{-2} = \left(\frac{3}{2}\right)^2 = \frac{9}{4}$.

## Fractional exponents
What number times itself gives 9? The answer is 3, the **square root** of 9, written $\sqrt{9}$. Exponents can write that too. Use the rule: $(9^{1/2})^2 = 9^{1/2 \times 2} = 9^1 = 9$. So $9^{1/2}$ times itself is 9, and that means:

$$a^{1/2} = \sqrt{a} \qquad a^{1/3} = \sqrt[3]{a} \qquad a^{m/n} = (\sqrt[n]{a})^m$$

The bottom of the fraction is the root, and the top is the power. Do the root first, to keep the numbers small.

$$8^{2/3} = (\sqrt[3]{8})^2 = 2^2 = 4 \qquad 16^{3/4} = (\sqrt[4]{16})^3 = 2^3 = 8$$

## All the rules at once
These rules hold with whole-number exponents, as long as every power exists and you never divide by zero. With fractional exponents, use them only for positive bases. For example, $((-2)^2)^{1/2} = 2$, while $(-2)^{1}$ is −2.

| Rule | Formula | Example |
| --- | --- | --- |
| Multiply: add exponents | $a^m \times a^n = a^{m+n}$ | $x^2 \times x^5 = x^7$ |
| Divide: subtract exponents | $a^m \div a^n = a^{m-n}$ | $x^7 \div x^3 = x^4$ |
| Power of a power: multiply | $(a^m)^n = a^{mn}$ | $(x^3)^4 = x^{12}$ |
| Zero exponent | $a^0 = 1$ | $5^0 = 1$ |
| Negative exponent | $a^{-n} = \frac{1}{a^n}$ | $x^{-2} = \frac{1}{x^2}$ |
| Fractional exponent | $a^{1/n} = \sqrt[n]{a}$ | $27^{1/3} = 3$ |

### Worked example
Simplify $\dfrac{x^5 \times x^{-2}}{x}$. Remember that $x$ means $x^1$.

$$\frac{x^{5 + (-2)}}{x^1} = \frac{x^3}{x^1} = x^2$$

# Exercises
?? Simplify $3^4 \times 3^5$.
=> $3^9$.

?? Simplify $\dfrac{y^9}{y^4}$.
=> $y^5$.

?? Work out $5^{-2}$.
=> $\frac{1}{25}$.

?? Work out $\left(\frac{1}{4}\right)^{-2}$.
=> $4^2 = 16$.

?? Work out $25^{3/2}$.
=> $(\sqrt{25})^3 = 5^3 = 125$.

?? Simplify $(2x^3)^2$.
=> $2^2 \times (x^3)^2 = 4x^6$. The power applies to both the 2 and the $x^3$.

# Practice
1. Write down the three main rules from memory, and prove each by writing out the powers in full with small numbers of your own. Don't look until you've tried.
2. Build your own table for powers of 3, from $3^4$ down to $3^{-3}$. Check that each step divides by 3.
3. A kilobyte is roughly $2^{10}$ bytes, a megabyte is $2^{20}$, and a gigabyte is $2^{30}$. Using the rules only, how many megabytes are in a gigabyte? How many 2 MB photos would fit in a 16 GB phone? Write 16 as a power of 2 first.
4. Use a calculator to test one mistake from this lesson with your own numbers, and show that $(a + b)^2$ isn't $a^2 + b^2$.

Write your table, your phone answer, and your test.

# Rubric
- I proved the rules by writing powers in full, from memory.
- I used the rules on a real computing size.
- I tested a common mistake with my own numbers.

# Summary
- With the same base, multiplying adds exponents, and dividing subtracts them.
- A power of a power multiplies exponents.
- $a^0 = 1$, $a^{-n} = \frac{1}{a^n}$, and $a^{1/n}$ is the $n$th root.
- Powers spread over multiplying, never over adding.
- A negative exponent gives a reciprocal, not a negative number.

# Check
Q: Simplify $2^{{a}} \times 2^{{b}}$. What's the exponent of 2?
P: Multiplying and dividing
Vars: a=2..9, b=2..9
F: a+b
= Same base, so add the exponents: {a} + {b} = {a+b}.

Q: Simplify $5^{{a}} \div 5^{{b}}$. What's the exponent of 5?
P: Multiplying and dividing
Vars: a=10..15, b=2..9
F: a-b
= Same base, so subtract: {a} − {b} = {a-b}.

Q: Simplify $(x^{{a}})^{{b}}$. What's the exponent of $x$?
P: Power of a power, and of a product
Vars: a=2..6, b=2..6
F: a*b
= A power of a power multiplies the exponents.

Q: What is $(3 \times 2)^2$?
P: Power of a power, and of a product
A: 36
= $6^2 = 36$. Or $9 \times 4 = 36$.

Q: What is $7^0$?
P: Zero and negative exponents
A: 1 | one
= Any base except 0, to the power 0, is 1.

Q: What is $2^{-4}$, in the form a/b?
P: Zero and negative exponents
A: 1/16
= $\frac{1}{2^4} = \frac{1}{16}$. A negative exponent gives a reciprocal, not a negative number.

Q: What is $27^{2/3}$?
P: Fractional exponents
A: 9 | nine
= $(\sqrt[3]{27})^2 = 3^2 = 9$.

Q: Which is true?
P: Power of a power, and of a product
- $(a + b)^2 = a^2 + b^2$ for all numbers
* $(ab)^2 = a^2 b^2$ for all numbers
- $a^2 \times a^3 = a^6$ for all numbers
= Powers spread over multiplying, not adding. And $a^2 \times a^3 = a^5$.

Q[transfer]: Using powers of 2 only, how many kilobytes (each $2^{10}$ bytes) are in a megabyte ($2^{20}$ bytes)? Give the answer as a number.
P: Multiplying and dividing
A: 1024 | 1,024 | 2^10
= $2^{20} \div 2^{10} = 2^{10} = 1{,}024$.

Q[transfer]: A student writes $(x + 3)^2 = x^2 + 9$. Try $x = 1$. What's the true value of the left side?
P: Power of a power, and of a product
A: 16
= $(1 + 3)^2 = 16$, while $1 + 9 = 10$. Testing a number exposes a wrong rule.

Q[transfer]: A signal halves in strength with every kilometre. Which expression gives its share of the starting strength after 5 km?
P: Zero and negative exponents
* $2^{-5}$
- $-2^{5}$
- $2 \times (-5)$
= Halving 5 times is $\frac{1}{2^5} = 2^{-5}$. A negative exponent means shrinking, not a negative amount.

# Cards
What do you do with exponents when multiplying powers of the same base? :: Add them. $a^m \times a^n = a^{m+n}$.
What do you do when dividing? :: Subtract them. $a^m \div a^n = a^{m-n}$.
What's a power of a power? :: Multiply the exponents. $(a^m)^n = a^{mn}$.
What is $a^0$? :: 1, for any base except 0.
What does $a^{-n}$ mean? :: The reciprocal: $\frac{1}{a^n}$. It isn't negative.
What does $a^{1/2}$ mean? :: The square root of $a$.
Is $(a + b)^2 = a^2 + b^2$? :: No. Powers don't spread over adding.

# Further
- OpenStax Elementary Algebra 2e, Use multiplication properties of exponents :: https://openstax.org/books/elementary-algebra-2e/pages/6-2-use-multiplication-properties-of-exponents
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
