---
id: na-scientific-notation
pack: Numbers and Algebra · Powers and roots
title: Scientific notation
minutes: 30
source: OpenStax · Prealgebra 2e · Section 10.5
url: https://openstax.org/books/prealgebra-2e/pages/10-5-integer-exponents-and-scientific-notation
courses: The base of all later maths and statistics
format: 2
teaches: standard-form; standard-form-arithmetic; order-of-magnitude; calculator-e-notation
uses: multiply-powers; divide-powers; negative-exponent; powers-of-ten; decimal-arithmetic; significant-figures
---
# Goal
Write very large and very small numbers in scientific notation, calculate with them, read the "e" a calculator or computer shows, and compare sizes.

# Why
A computer's clock ticks billions of times a second, while one tick lasts less than a billionth of a second. These numbers are too long to write out or compare safely. Calculators, spreadsheets and Python switch to this notation without warning, so you need to read it. Comparing sizes this way is also how you'll judge which program, or which estimate, is reasonable.

# Warm-up
?? What is $10^3 \times 10^5$?
=> $10^8$.

?? What is $10^{-2}$ as a decimal?
=> 0.01.

# Lesson
## The form
**Scientific notation**, also called **standard form**, writes a number as:

$$a \times 10^n$$

For a positive number, $a$ is at least 1 and below 10, and $n$ is an integer: a whole number, positive, negative or zero. Exactly one digit that isn't zero sits before the point. For a negative number, write it without its minus sign, then put the minus in front. Zero is just written 0.

| Ordinary number | Scientific notation |
| --- | --- |
| 5,200 | $5.2 \times 10^3$ |
| 300,000,000 | $3 \times 10^8$ |
| 7.5 | $7.5 \times 10^0$ |
| 0.0046 | $4.6 \times 10^{-3}$ |
| 0.000000001 | $1 \times 10^{-9}$ |

### Converting
Move the point until one non-zero digit sits before it, and count the places moved. Moving the point left gives a positive exponent, moving it right gives a negative one, and not moving it gives 0.

**Big:** 5,200. The point moves 3 places left to give 5.2. So $5.2 \times 10^3$.

**Small:** 0.0046. The point moves 3 places right to give 4.6. So $4.6 \times 10^{-3}$.

To convert back, do the reverse. For $2.7 \times 10^4$, move the point 4 places right, to get 27,000. For $2.7 \times 10^{-4}$, move it 4 places left, to get 0.00027.

> Mistake: Writing $52 \times 10^2$. It's the right value, but it isn't standard form, because 52 isn't below 10. Likewise, $0.52 \times 10^4$ isn't standard form.

?? Write 86,000,000 in scientific notation.
=> $8.6 \times 10^7$.

?? Write $3.05 \times 10^{-2}$ as an ordinary number.
=> 0.0305.

## Calculating
### Multiplying and dividing
Handle the front numbers and the powers of ten separately, using the rules of powers.

$$(3 \times 10^4) \times (2 \times 10^5) = (3 \times 2) \times 10^{4+5} = 6 \times 10^9$$

$$\frac{8 \times 10^7}{2 \times 10^3} = 4 \times 10^{4}$$

If the front number leaves the range, fix it at the end:

$$(5 \times 10^3) \times (4 \times 10^2) = 20 \times 10^5 = 2 \times 10^6$$

The same applies when it falls below 1: $0.5 \times 10^4 = 5 \times 10^3$.

### Adding and subtracting
You must match the exponents first, or convert to ordinary numbers. It's like lining up the columns.

$$3 \times 10^5 + 4 \times 10^4 = 30 \times 10^4 + 4 \times 10^4 = 34 \times 10^4 = 3.4 \times 10^5$$

> Mistake: Adding the exponents when adding the numbers. $3 \times 10^5 + 4 \times 10^4$ isn't $7 \times 10^9$. That rule is for multiplying only.

## Reading a calculator and a computer
Calculators and programs often write the "times ten to the" part with a letter **e** or E.

| Shown as | Means | Ordinary number |
| --- | --- | --- |
| `3e8` | $3 \times 10^8$ | 300,000,000 |
| `2.5E-4` | $2.5 \times 10^{-4}$ | 0.00025 |
| `1.2E+06` | $1.2 \times 10^6$ | 1,200,000 |

A spreadsheet will do this to a long number in a cell it's too narrow for. This can also silently damage long phone numbers or account numbers, which should be stored as text.

> Mistake: Reading the e as the number e, or as a power of e. In this notation, `e` simply means "times ten to the power of".

Python is a programming language you'll learn in a later course, and it does this too. Just read it for now.

```python
print(3000000.0 * 2000000000.0)
print(0.00001 / 1000)
print(3e8)
```

```output
6000000000000000.0
1e-08
300000000.0
```

## Comparing sizes
An **order of magnitude** is a power of ten. When two sizes differ by $10^3$, one's about three orders of magnitude, a thousand times, bigger. You can compare by looking at the exponents first.

Is $4 \times 10^6$ or $9 \times 10^5$ bigger? The exponent says 6 beats 5, so $4 \times 10^6$ wins, even though 9 is bigger than 4.

### Computing sizes
These figures are rough but useful.

| Quantity | Roughly |
| --- | --- |
| One CPU cycle | $3 \times 10^{-10}$ seconds |
| Reading from fast memory | $1 \times 10^{-7}$ seconds |
| Reading from a solid-state drive | $1 \times 10^{-4}$ seconds |
| Seconds in a year | $3 \times 10^7$ |

A $\frac{1}{1000}$-second wait doesn't sound like much, but it's about three million CPU cycles.

### Estimating with powers
How many seconds are in a year? About $365 \times 24 \times 60 \times 60$. Round each: $400 \times 25 \times 60 \times 60 = 3.6 \times 10^7$. The true value is about $3.15 \times 10^7$, so that's the right order of magnitude. These rough estimates are often all you need to judge whether something is possible.

For example, if a computer tries $10^9$ passwords each second, how long would it take to try $10^{14}$ of them? $10^{14} \div 10^9 = 10^5$ seconds, a little over a day.

# Exercises
?? Write 0.00072 in scientific notation.
=> $7.2 \times 10^{-4}$.

?? Write $6.1 \times 10^5$ as an ordinary number.
=> 610,000.

?? Work out $(4 \times 10^6) \times (2 \times 10^{-2})$.
=> $8 \times 10^4$.

?? Work out $\dfrac{9 \times 10^3}{3 \times 10^{-2}}$.
=> $3 \times 10^{5}$.

?? Work out $(6 \times 10^4) \times (5 \times 10^3)$, leaving it in standard form.
=> $30 \times 10^7 = 3 \times 10^8$.

?? What does a calculator mean by `4.2E-05`?
=> $4.2 \times 10^{-5} = 0.000042$.

# Practice
1. Find three real big or small numbers: Nigeria's population, your phone's storage in bytes, the size of a bacterium. Look them up or use what's on your device. Write each in scientific notation, and note where each came from.
2. Get your calculator or a spreadsheet to display a number using E, by multiplying two large numbers. Write down what it showed, and what it means.
3. Estimate the number of seconds you've been alive, by rounding to one digit at each step. Write it in scientific notation.
4. How long would it take to count to a billion at one number per second? Use powers, and give the answer in years, with $3 \times 10^7$ seconds to a year.

Write your numbers, sources and estimates.

# Rubric
- I wrote real numbers from real sources in standard form.
- I read an E display from a real calculator or spreadsheet.
- I made an order-of-magnitude estimate and showed each step.

# Summary
- Scientific notation is $a \times 10^n$, with $a$ from 1 up to, but not including, 10.
- Numbers of 10 or more get a positive exponent, numbers from 1 to under 10 get 0, and numbers below 1 get a negative one.
- To multiply, multiply the fronts and add the exponents. To divide, divide and subtract.
- To add, match the exponents first.
- `3e8` means $3 \times 10^8$.
- Compare exponents first when comparing sizes.

# Check
Q: Which is in standard form?
P: The form
- $45 \times 10^3$
* $4.5 \times 10^4$
- $0.45 \times 10^5$
= The front number must be from 1 up to, but not including, 10.

Q: Write 340,000 in the form a x 10^n.
P: The form
A: 3.4 x 10^5 | 3.4 × 10^5 | 3.4x10^5 | 3.4×10^5 | 3.4e5 | 3.4 x 10⁵ | 3.4 × 10⁵
= The point moves 5 places left.

Q: Write 0.0009 in the form a x 10^n.
P: The form
A: 9 x 10^-4 | 9 × 10^-4 | 9x10^-4 | 9×10^-4 | 9e-4 | 9 x 10^−4 | 9 × 10^−4
= The point moves 4 places right, so the exponent is −4.

Q: Work out $({a} \times 10^{{b}}) \times (2 \times 10^{{c}})$. What's the exponent of 10 in the answer?
P: Calculating
Vars: a=1..4, b=2..9, c=2..9
F: b+c
= Multiplying adds the exponents: {b} + {c} = {b+c}.

Q: What is $(6 \times 10^8) \div (2 \times 10^3)$? What's the exponent of 10 in the answer?
P: Calculating
A: 5 | five
= $3 \times 10^{8-3} = 3 \times 10^5$.

Q: What is $(5 \times 10^4) \times (6 \times 10^3)$ in the form a x 10^n?
P: Calculating
A: 3 x 10^8 | 3 × 10^8 | 3x10^8 | 3×10^8 | 3e8 | 3 x 10⁸ | 3 × 10⁸
= $30 \times 10^7$ moves to $3 \times 10^8$, as 30 is out of range.

Q: What does `5e3` mean, as an ordinary number?
P: Reading a calculator and a computer
A: 5000 | 5,000
= $5 \times 10^3$.

Q: Which is bigger?
P: Comparing sizes
- $9.9 \times 10^3$
* $1.1 \times 10^4$
- They're equal
= The exponent decides first: 11,000 beats 9,900.

Q[transfer]: A spreadsheet shows a long phone number as `2.35E+09`. What's the best response?
P: Reading a calculator and a computer
- Keep it this way, since the value and all of its digits are still stored safely
* Store phone numbers as text, as the number format has rounded or hidden digits
- Add up the digits of the number shown, to check that the value hasn't changed
= A phone number isn't a quantity. Text keeps every digit safe.

Q[transfer]: A tool can try $10^{10}$ passwords per second, on a system you've got written permission to test. There are $10^{16}$ possibilities. About how long is that, in seconds, in the form 10^n?
P: Comparing sizes
A: 10^6 | 10⁶ | 1000000 | 1,000,000 | 1e6
= $10^{16} \div 10^{10} = 10^6$ seconds, roughly 12 days. Adding length to the password raises this enormously.

Q[transfer]: A student adds $2 \times 10^3$ and $3 \times 10^3$ and writes $5 \times 10^6$. What did they do wrong?
P: Calculating
* They added the exponents, which applies only to multiplying
- They should have multiplied the two front numbers to get 6
- Nothing, as adding two numbers always adds their exponents
= With matching exponents, just add the fronts: $5 \times 10^3$.

# Cards
What's the form of scientific notation? :: $a \times 10^n$, with $a$ at least 1 and less than 10.
How do you write 0.0046 in standard form? :: $4.6 \times 10^{-3}$.
How do you multiply in standard form? :: Multiply the fronts, and add the exponents. Then fix the front if it's out of range.
How do you add in standard form? :: Match the exponents first.
What does `3e8` mean? :: $3 \times 10^8$, or 300,000,000.
What's an order of magnitude? :: A power of ten: one order of magnitude is ten times bigger.

# Further
- OpenStax Prealgebra 2e, Integer exponents and scientific notation :: https://openstax.org/books/prealgebra-2e/pages/10-5-integer-exponents-and-scientific-notation
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
