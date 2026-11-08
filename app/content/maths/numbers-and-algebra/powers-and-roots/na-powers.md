---
id: na-powers
pack: Numbers and Algebra · Powers and roots
title: What a power is
minutes: 35
source: OpenStax · Elementary Algebra 2e · Section 6.2
url: https://openstax.org/books/elementary-algebra-2e/pages/6-2-use-multiplication-properties-of-exponents
courses: The base of all later maths and statistics
format: 2
teaches: power-meaning; base-and-exponent; powers-of-ten; powers-of-two; exponential-growth
uses: long-multiplication; multiply-divide-negatives; bodmas; expanded-form
---
# Goal
Say what a power means, work out powers of whole numbers, fractions and negatives, and see why repeated multiplying grows so fast.

# Why
Powers are short for repeated multiplying, and they appear wherever things grow or shrink by a fixed factor: compound interest, population, viruses and computing speed. Every computer's memory is measured in powers of two, and a password's strength is a power too. Statistics needs squares for spread, and algebra is full of them.

# Warm-up
?? What is $7 \times 7 \times 7$?
=> $49 \times 7 = 343$.

?? What is $(-2) \times (-2) \times (-2)$?
=> $4 \times (-2) = -8$.

# Lesson
## A short way to write repeated multiplying
Writing $2 \times 2 \times 2 \times 2 \times 2$ takes time, so we write $2^5$. It's read as "two to the power of five".

$$2^5 = \underbrace{2 \times 2 \times 2 \times 2 \times 2}_{5 \text{ twos}} = 32$$

The big number is the **base**, and it's what gets multiplied. The small raised number is the **exponent** or **power**, and it says how many times the base appears.

| Written | Read as | Means | Value |
| --- | --- | --- | --- |
| $3^2$ | 3 squared | $3 \times 3$ | 9 |
| $3^3$ | 3 cubed | $3 \times 3 \times 3$ | 27 |
| $10^4$ | 10 to the power 4 | $10 \times 10 \times 10 \times 10$ | 10,000 |
| $5^1$ | 5 to the power 1 | Just one 5 | 5 |

"Squared" comes from the area of a square with side 3, and "cubed" from the volume of a cube.

> Mistake: Multiplying the base by the exponent. $2^5$ isn't $2 \times 5 = 10$. It's five 2s multiplied, which is 32.

### Squares and cubes worth knowing
The squares up to $12^2$ should become automatic, as you'll use them constantly: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144. The first few cubes are 1, 8, 27, 64, 125.

?? Work out $4^3$ and $3^4$. Are they the same?
=> $4^3 = 64$ and $3^4 = 81$. They aren't. Unlike multiplication, swapping the base and exponent changes the answer.

## Negative numbers and fractions as bases
Powers of negative numbers follow the sign rules. Count the minus signs being multiplied.

$$(-2)^2 = 4 \qquad (-2)^3 = -8 \qquad (-2)^4 = 16 \qquad (-2)^5 = -32$$

An even power gives a positive answer, and an odd power gives a negative one. As you saw before, $-2^2$ is different: it means $-(2^2) = -4$, as the power goes first.

Fractions as bases: multiply top and bottom separately.

$$\left(\frac{2}{3}\right)^2 = \frac{2}{3} \times \frac{2}{3} = \frac{4}{9}$$

Note that squaring a fraction between 0 and 1 makes it **smaller**: $\frac{4}{9}$ is less than $\frac{2}{3}$. The same goes for decimals: $0.5^2 = 0.25$. In probability, this is why the chance of several things all happening shrinks quickly.

## Powers of ten
Our number system is built on powers of ten. They are the place values.

| Power | Value | Name |
| --- | --- | --- |
| $10^1$ | 10 | Ten |
| $10^2$ | 100 | Hundred |
| $10^3$ | 1,000 | Thousand |
| $10^6$ | 1,000,000 | Million |
| $10^9$ | 1,000,000,000 | Billion |

The exponent counts the zeros. So expanded form can be written with powers: $4{,}725 = 4 \times 10^3 + 7 \times 10^2 + 2 \times 10^1 + 5$.

## Powers of two
Computers work in binary, so powers of two are everywhere in computing.

| Power | Value | Where you'll see it |
| --- | --- | --- |
| $2^8$ | 256 | Values a byte can hold |
| $2^{10}$ | 1,024 | Roughly a thousand |
| $2^{16}$ | 65,536 | Number of network ports |
| $2^{32}$ | 4,294,967,296 | IPv4 addresses, about 4 billion |

A password made from 26 lowercase letters with 8 places has $26^8$ possibilities, about 200 billion. Add more places, and the count multiplies each time. That's why length beats cleverness in passwords.

## Fast growth
Adding the same amount each step gives steady growth. Multiplying by the same factor each step gives **exponential growth**, and it's much faster than people expect.

| Step | Add 2 each step | Multiply by 2 each step |
| --- | --- | --- |
| 1 | 2 | 2 |
| 5 | 10 | 32 |
| 10 | 20 | 1,024 |
| 20 | 40 | 1,048,576 |
| 30 | 60 | 1,073,741,824 |

```chart
{"kind":"line","alt":"A line over steps 1 to 10 showing doubling. It stays low for the first few steps, then curves sharply up to 1,024 at step 10.","note":"Worked out from the doubling rule, not measured data.","x":"step","y":"value","xLabel":"Step","yLabel":"Value after that step","data":[{"step":1,"value":2},{"step":2,"value":4},{"step":3,"value":8},{"step":4,"value":16},{"step":5,"value":32},{"step":6,"value":64},{"step":7,"value":128},{"step":8,"value":256},{"step":9,"value":512},{"step":10,"value":1024}]}
```

The chart shows doubling. Adding 2 each step would reach only 20 by step 10, so on this chart it would barely lift off the bottom. Notice too how the doubling line looks almost flat for the first few steps. That's what makes this kind of growth so easy to underestimate: early on, it looks like nothing much is happening.

Python, which you'll learn in a later course, writes powers with `**`. Just read this for now.

```python
print(2 ** 10)
print(2 ** 30)
print(26 ** 8)
```

```output
1024
1073741824
208827064576
```

# Exercises
?? Work out $6^2$, $2^6$ and $1^6$.
=> 36, 64 and 1.

?? Write 100,000 as a power of 10.
=> $10^5$, as it has five zeros.

?? Work out $(-3)^3$ and $-3^2$.
=> $(-3)^3 = -27$, and $-3^2 = -9$.

?? Work out $\left(\frac{3}{4}\right)^2$.
=> $\frac{9}{16}$.

?? A rumour is passed on by doubling the number of people who know it every day, starting with 1 person on day 0. How many know it on day 10?
=> $2^{10} = 1{,}024$.

# Practice
1. Fold a sheet of paper in half, again and again, and count the layers after each fold. Write the layer counts as powers of 2. How many folds can you really do?
2. Use a calculator to work out how many layers 42 folds would be, using $2^{42}$. If each layer is 0.1 mm thick, how thick would that be, in km? Compare it with the distance to the Moon, about 384,000 km.
3. Work out how many 6-digit PINs exist, using a power of 10, and how many 8-character lowercase passwords, using a power of 26. How many times more is the second?
4. Find one real thing around you that grows by a factor instead of an amount.

Write your layer counts, your thickness answer and your comparison.

# Rubric
- I worked out powers by hand, and with a calculator.
- I saw for myself how fast doubling grows.
- I compared two real password counts using powers.

# Summary
- A power is repeated multiplying: base and exponent. $2^5$ means five 2s multiplied.
- It's not base × exponent.
- For negative bases, even powers are positive, and odd ones are negative.
- Powers of ten are the place values, and the exponent counts zeros.
- Multiplying by a factor each step grows far faster than adding.

# Check
Q: What is {a}² ?
P: A short way to write repeated multiplying
Vars: a=2..15
F: a*a
= {a} × {a} = {a*a}.

Q: What is $5^3$?
P: A short way to write repeated multiplying
A: 125
= $5 \times 5 \times 5 = 125$, not $5 \times 3$.

Q: In $7^4$, what does the 4 tell you?
P: A short way to write repeated multiplying
- That you should multiply 7 by the number 4 once
* How many 7s are multiplied together
- That the answer is going to have four digits in it
= It's $7 \times 7 \times 7 \times 7$.

Q: What is $(-3)^4$?
P: Negative numbers and fractions as bases
A: 81
= An even power gives a positive answer.

Q: What is $(-2)^3$?
P: Negative numbers and fractions as bases
A: -8 | −8
= An odd power gives a negative answer.

Q: What is $\left(\frac{1}{2}\right)^3$, in the form a/b?
P: Negative numbers and fractions as bases
A: 1/8
= $\frac{1}{2} \times \frac{1}{2} \times \frac{1}{2} = \frac{1}{8}$.

Q: How do you write one million as a power of 10?
P: Powers of ten
A: 10^6 | 10⁶
= One million has six zeros.

Q: What is $2^8$?
P: Powers of two
A: 256
= It's the number of values a byte can hold.

Q[transfer]: A password uses 10 digits in 4 places, and another uses 10 digits in 8 places. How many times more possibilities has the second?
P: Powers of two
A: 10000 | 10,000
= $10^8 \div 10^4 = 10^4 = 10{,}000$. Each extra place multiplies the count by 10.

Q[transfer]: An offer doubles your savings each month: ₦1,000 now becoming ₦2,000 next month, and so on. Why should this make you suspicious?
P: Fast growth
- Doubling each month gives only slightly more than a bank's usual interest
* After a year it would be ₦4,096,000, far beyond what real investments return
- Offers of this kind are never allowed to use numbers that are powers of two
= $2^{12} = 4{,}096$ times the start. Real investments can't sustain that, so it's a typical scam promise.

Q[transfer]: A bacteria count doubles every hour, and the dish is full after 24 hours. When was it half full?
P: Fast growth
- After 12 hours, halfway through the time
* After 23 hours, an hour before the end
- After 6 hours, a quarter of the way through
= One doubling from half full fills it. Exponential growth stays small, then runs away right at the end.

# Cards
What do base and exponent mean? :: The base is what's multiplied. The exponent says how many times it appears.
What is $2^5$? :: 32. It's five 2s multiplied, not $2 \times 5$.
What's the sign of $(-2)^{\text{even}}$ and $(-2)^{\text{odd}}$? :: Even powers are positive, and odd powers are negative.
What is $2^{10}$? :: 1,024, roughly a thousand.
How do adding and multiplying growth differ? :: Adding grows steadily. Multiplying by a factor is exponential, and it soon runs far ahead.

# Further
- OpenStax Elementary Algebra 2e, Use multiplication properties of exponents :: https://openstax.org/books/elementary-algebra-2e/pages/6-2-use-multiplication-properties-of-exponents
- Khan Academy, Algebra basics :: https://www.khanacademy.org/math/algebra-basics
