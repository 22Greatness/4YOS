---
id: na-roots-surds
pack: Numbers and Algebra · Powers and roots
title: Square roots and surds
minutes: 40
source: OpenStax · Elementary Algebra 2e · Section 9.1
url: https://openstax.org/books/elementary-algebra-2e/pages/9-1-simplify-and-use-square-roots
courses: The base of all later maths and statistics
format: 2
teaches: square-roots; surds; simplify-surds; surd-arithmetic; rationalise-denominator
uses: power-meaning; fraction-exponent; prime-factorisation; simplify-fractions; multiply-divide-negatives
---
# Goal
Find square roots, simplify surds, calculate with them, and remove a surd from the bottom of a fraction.

# Why
Square roots undo squaring, and you'll need them to solve quadratic equations and for the distance between two points. Standard deviation, the main measure of spread in statistics, has a square root at its heart. Surds let you keep an answer exact instead of a rounded decimal, which matters in exams and in further maths.

# Warm-up
?? What is $12^2$?
=> 144.

?? What is $25^{1/2}$?
=> 5.

# Lesson
## What a square root is
The **square root** of a number that isn't negative is the value, also not negative, which multiplied by itself gives that number. So $\sqrt{0} = 0$. Since $6 \times 6 = 36$, the square root of 36 is 6. It's written with the root sign: $\sqrt{36} = 6$.

Squaring and then square-rooting gives back the number you started with, as long as it wasn't negative. For a negative number, you get it without its minus sign: $\sqrt{(-6)^2} = 6$.

| Number | Square | Back again |
| --- | --- | --- |
| 3 | $3^2 = 9$ | $\sqrt{9} = 3$ |
| 7 | $7^2 = 49$ | $\sqrt{49} = 7$ |
| 0.5 | $0.5^2 = 0.25$ | $\sqrt{0.25} = 0.5$ |
| $\frac{2}{3}$ | $\frac{4}{9}$ | $\sqrt{\frac{4}{9}} = \frac{2}{3}$ |

### Positive and negative
Both $6^2$ and $(-6)^2$ give 36, so 36 has two square roots, 6 and −6. The sign $\sqrt{\phantom{x}}$ means only the positive one, by agreement. So $\sqrt{36} = 6$. When solving $x^2 = 36$, we write both: $x = 6$ or $x = -6$.

### Square roots of negatives
What's $\sqrt{-9}$? Nothing you've met multiplies by itself to give −9, because positive × positive and negative × negative are both positive. So among ordinary numbers, it has no answer.

### Estimating
Between which whole numbers is $\sqrt{50}$? $7^2 = 49$ and $8^2 = 64$, so it's just above 7. A calculator says 7.07.

?? Between which two whole numbers is $\sqrt{90}$?
=> $9^2 = 81$ and $10^2 = 100$, so between 9 and 10, nearer to 9.

## What a surd is
$\sqrt{2} = 1.41421356\ldots$, and its digits never end or settle into a repeating pattern. No fraction equals it exactly. A root like this one, left in root form, is called a **surd**.

So $\sqrt{2}$, $\sqrt{5}$ and $\sqrt{12}$ are surds, while $\sqrt{9}$ isn't, since it's exactly 3.

Keeping $\sqrt{2}$ as it is keeps it exact. The moment you write 1.41, you've introduced an error, which grows when you multiply. Exams often ask for an "exact answer" or "answer in surd form", and that's what they mean.

## Simplifying surds
Two facts do all the work:

$$\sqrt{a \times b} = \sqrt{a} \times \sqrt{b} \qquad\qquad \sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}$$

To simplify, find the largest perfect square that's a factor.

$$\sqrt{12} = \sqrt{4 \times 3} = \sqrt{4} \times \sqrt{3} = 2\sqrt{3}$$

$$\sqrt{72} = \sqrt{36 \times 2} = 6\sqrt{2}$$

If you don't spot the largest straight away, take it in steps: $\sqrt{72} = \sqrt{9 \times 8} = 3\sqrt{8} = 3\sqrt{4 \times 2} = 3 \times 2\sqrt{2} = 6\sqrt{2}$. Prime factorisation also works: any pair of equal primes comes out as one.

Writing $2\sqrt{3}$ means $2 \times \sqrt{3}$.

> Mistake: Splitting a root over a sum. $\sqrt{9 + 16}$ isn't $3 + 4 = 7$. It's $\sqrt{25} = 5$. Roots split over multiplying, not over adding, just like powers.

## Calculating with surds
### Adding and subtracting
Treat a surd like a thing being counted. You can only collect the same surd.

$$3\sqrt{2} + 5\sqrt{2} = 8\sqrt{2}$$

$\sqrt{2} + \sqrt{3}$ can't be combined. Simplify first, though, as a match may appear:

$$\sqrt{12} + \sqrt{27} = 2\sqrt{3} + 3\sqrt{3} = 5\sqrt{3}$$

### Multiplying and dividing
Multiply the numbers outside and the roots inside separately.

$$2\sqrt{3} \times 5\sqrt{2} = 10\sqrt{6} \qquad \sqrt{5} \times \sqrt{5} = 5 \qquad \frac{\sqrt{50}}{\sqrt{2}} = \sqrt{25} = 5$$

## Removing a root from the bottom
It's standard to avoid a surd on the bottom of a fraction. Getting rid of it is called **rationalising the denominator**. It comes from equivalent fractions: multiply the top and bottom by the same thing, and the value doesn't change. Since $\sqrt{a} \times \sqrt{a} = a$, the root will disappear.

$$\frac{6}{\sqrt{3}} = \frac{6 \times \sqrt{3}}{\sqrt{3} \times \sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}$$

$$\frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}$$

Check it on a calculator: $1 \div \sqrt{2}$ and $\sqrt{2} \div 2$ both give 0.7071.

### Where you'll use this
The length of the longest side of a right triangle is $\sqrt{a^2 + b^2}$, where $a$ and $b$ are the other two sides. For sides of 1 and 1, it's $\sqrt{2}$. For sides 3 and 4, it's $\sqrt{9 + 16} = 5$. The same formula gives the distance between two points on a graph, and it's what comparing data in machine learning often relies on.

# Exercises
?? Work out $\sqrt{121}$ and $\sqrt{0.09}$.
=> 11 and 0.3.

?? Simplify $\sqrt{48}$.
=> $\sqrt{16 \times 3} = 4\sqrt{3}$.

?? Simplify $\sqrt{200}$.
=> $\sqrt{100 \times 2} = 10\sqrt{2}$.

?? Simplify $\sqrt{18} + \sqrt{50}$.
=> $3\sqrt{2} + 5\sqrt{2} = 8\sqrt{2}$.

?? Work out $3\sqrt{2} \times 2\sqrt{8}$.
=> $6\sqrt{16} = 6 \times 4 = 24$.

?? Rationalise $\dfrac{10}{\sqrt{5}}$.
=> $\frac{10\sqrt{5}}{5} = 2\sqrt{5}$.

# Practice
1. Without a calculator, estimate $\sqrt{30}$, $\sqrt{70}$ and $\sqrt{150}$ between two whole numbers, and guess one decimal place. Check each with your calculator.
2. Measure a real rectangle: a book, a phone or a door. Work out its diagonal using $\sqrt{a^2 + b^2}$. Now measure the diagonal for real. How close is it?
3. Simplify $\sqrt{8}$, $\sqrt{45}$, $\sqrt{75}$ and $\sqrt{98}$ by hand. Check each one on your calculator by comparing decimals.
4. Work out $\sqrt{2}$ on your calculator, round it to 2 decimal places, and square it. What do you get? What does this show about rounded surds?

Write your rectangle, your two lengths, and your answer about rounding.

# Rubric
- I estimated roots by hand, then checked them.
- I compared a real measured diagonal against the formula.
- I simplified surds by hand, and checked with decimals.

# Summary
- $\sqrt{a}$ means the number, not negative, that squares to $a$.
- Squares of negatives are positive, so $\sqrt{-9}$ has no ordinary answer.
- A surd is a root left exact. It keeps your answer exact.
- Simplify using the largest perfect-square factor.
- Roots split over multiplying, not adding.
- Only the same surds can be collected.
- To rationalise, multiply top and bottom by the root.

# Check
Q: What is $\sqrt{{a*a}}$ ?
P: What a square root is
Vars: a=2..20
F: a
= {a} × {a} = {a*a}, so its square root is {a}.

Q: Between which two whole numbers is $\sqrt{40}$?
P: What a square root is
- 4 and 5
* 6 and 7
- 19 and 21
= $6^2 = 36$ and $7^2 = 49$.

Q: What is $\sqrt{0.16}$?
P: What a square root is
A: 0.4 | .4
= $0.4 \times 0.4 = 0.16$.

Q: Which of these is a surd?
P: What a surd is
- $\sqrt{49}$
- $\sqrt{100}$
* $\sqrt{10}$
= $\sqrt{10}$ doesn't come out exactly. The others are 7 and 10.

Q: Simplify $\sqrt{50}$. Enter it as a√b, for example 2√5.
P: Simplifying surds
A: 5√2 | 5 √2 | 5sqrt2 | 5sqrt(2)
= $\sqrt{25 \times 2} = 5\sqrt{2}$.

Q: What is $\sqrt{36 + 64}$?
P: Simplifying surds
A: 10 | ten
= Add first: $\sqrt{100} = 10$. It isn't $6 + 8 = 14$.

Q: Simplify $2\sqrt{5} + 7\sqrt{5}$. Enter it as a√b, for example 2√5.
P: Calculating with surds
A: 9√5 | 9 √5 | 9sqrt5 | 9sqrt(5)
= Same surd, so collect them.

Q: What is $\sqrt{7} \times \sqrt{7}$?
P: Calculating with surds
A: 7 | seven
= A square root times itself gives the number under the root.

Q: Rationalise $\dfrac{4}{\sqrt{2}}$. Enter it as a√b, for example 2√5.
P: Removing a root from the bottom
A: 2√2 | 2 √2 | 2sqrt2 | 2sqrt(2)
= $\frac{4\sqrt{2}}{2} = 2\sqrt{2}$.

Q[transfer]: A rectangular field is 30 m by 40 m. How long is its diagonal, in metres?
P: Removing a root from the bottom
A: 50 | 50 m | 50 metres
= $\sqrt{30^2 + 40^2} = \sqrt{2{,}500} = 50$.

Q[transfer]: In statistics, a value called the variance is 49, and the standard deviation is its square root. What's the standard deviation?
P: What a square root is
A: 7 | seven
= $\sqrt{49} = 7$. You'll see why this root is used in Describing Data.

Q[transfer]: A student rounds $\sqrt{2}$ to 1.4 and works out $(\sqrt{2})^2$ as 1.96. What's the exact value?
P: What a surd is
* 2, which shows that the early rounding caused the error
- 1.96, which shows the rounded surd gives the true value here
- 1.4, since squaring a square root gives you the same root back
= A square root squared is exact. Rounding early is what caused the error.

# Cards
What does $\sqrt{36}$ mean? :: The positive number which, multiplied by itself, gives 36. It's 6.
What's a surd? :: A root that doesn't come out exactly, kept in root form so it stays exact.
How do you simplify $\sqrt{72}$? :: Use the largest perfect-square factor: $\sqrt{36 \times 2} = 6\sqrt{2}$.
Can you split $\sqrt{9 + 16}$? :: No. Roots split over multiplying only. It's $\sqrt{25} = 5$.
What is $\sqrt{a} \times \sqrt{a}$? :: $a$.
How do you rationalise $\frac{1}{\sqrt{2}}$? :: Multiply top and bottom by $\sqrt{2}$: $\frac{\sqrt{2}}{2}$.

# Further
- OpenStax Elementary Algebra 2e, Simplify and use square roots :: https://openstax.org/books/elementary-algebra-2e/pages/9-1-simplify-and-use-square-roots
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
