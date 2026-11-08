---
id: na-equivalent-fractions
pack: Numbers and Algebra · Parts of a whole
title: Equivalent fractions
minutes: 35
source: OpenStax · Prealgebra 2e · Section 4.1
url: https://openstax.org/books/prealgebra-2e/pages/4-1-visualize-fractions
courses: The base of all later maths and statistics
format: 2
teaches: equivalent-fractions; simplify-fractions; compare-fractions
uses: fraction-meaning; numerator-denominator; hcf; lcm; factors
---
# Goal
Tell when two fractions are the same amount, simplify any fraction fully, and compare fractions with different bottoms.

# Why
The same amount can be written in endless ways, and $\frac{2}{4}$ and $\frac{1}{2}$ are the same number. You can't add fractions until you can rewrite them with matching bottoms, and most answers in exams are expected in simplest form. It's also the first time you meet a key idea of algebra: changing how something looks without changing its value.

# Warm-up
?? What is the HCF of 18 and 24?
=> 6. $18 = 2 \times 3 \times 3$ and $24 = 2 \times 2 \times 2 \times 3$, which share $2 \times 3$.

?? What is the LCM of 4 and 6?
=> 12.

# Lesson
## Same amount, different names
Cut a bar into 2 parts, and shade 1. Cut the same bar into 4 parts, and shade 2. Cut it into 8, and shade 4. The shaded amount never changed.

| Cut into | Shaded | Fraction |
| --- | --- | --- |
| 2 | ■ □ | $\frac{1}{2}$ |
| 4 | ■ ■ □ □ | $\frac{2}{4}$ |
| 8 | ■ ■ ■ ■ □ □ □ □ | $\frac{4}{8}$ |

Fractions that name the same amount are called **equivalent fractions**.

$$\frac{1}{2} = \frac{2}{4} = \frac{4}{8} = \frac{50}{100}$$

## The rule that makes them
Multiply or divide the top and bottom by the same number (not zero), and the value doesn't change.

$$\frac{3}{4} = \frac{3 \times 5}{4 \times 5} = \frac{15}{20}$$

Why does it work? Because $\frac{5}{5} = 1$, and multiplying by 1 changes nothing. Cutting each part into 5 smaller parts gives five times as many parts, and you've got five times as many shaded. The amount stays the same.

### Finding a missing number
What top makes $\frac{2}{3} = \frac{?}{12}$? The bottom went from 3 to 12, which is times 4. Do the same to the top: $2 \times 4 = 8$. So $\frac{2}{3} = \frac{8}{12}$.

> Mistake: Adding instead of multiplying. Adding 2 to top and bottom of $\frac{1}{2}$ gives $\frac{3}{4}$, which is a different amount. Only multiplying or dividing keeps a fraction's value.

?? Fill in the gap: $\frac{5}{6} = \frac{?}{42}$.
=> 6 × 7 = 42, so the top is 5 × 7 = 35.

## Simplifying
A fraction is in **simplest form**, or lowest terms, when no whole number above 1 divides both its top and bottom. To simplify, divide both by their common factors.

### Worked example: simplify 36/48
You can do it in steps, dividing by whatever you spot:

$$\frac{36}{48} = \frac{18}{24} = \frac{9}{12} = \frac{3}{4}$$

Or you can do it all at once using the HCF. The HCF of 36 and 48 is 12:

$$\frac{36 \div 12}{48 \div 12} = \frac{3}{4}$$

Both give the same answer. Use whichever you find easier, and check nothing else divides both. Use the divisibility tests to help you spot common factors.

> Mistake: Cancelling digits. In $\frac{16}{64}$, crossing out the 6s gives $\frac{1}{4}$, which is right by pure luck. Try $\frac{12}{23}$: crossing out the 2s gives $\frac{1}{3}$, which is wrong. Only whole factors can be divided out, never digits.

## Comparing fractions
With the same bottom, the bigger top wins: $\frac{5}{9} > \frac{2}{9}$.

With different bottoms, you can't tell by looking, because the parts are different sizes. So rewrite them with a **common denominator**, a bottom that both share. The best choice is usually the LCM of the two bottoms.

### Worked example: which is bigger, 5/6 or 7/9?
The LCM of 6 and 9 is 18.

$$\frac{5}{6} = \frac{15}{18} \qquad\qquad \frac{7}{9} = \frac{14}{18}$$

So $\frac{5}{6} > \frac{7}{9}$, by just $\frac{1}{18}$.

Often, comparing with $\frac{1}{2}$ is enough to decide. For $\frac{3}{7}$ and $\frac{5}{9}$: half of 7 is 3.5, so $\frac{3}{7}$ is below half. Half of 9 is 4.5, so $\frac{5}{9}$ is above half. No more work is needed.

### Why this matters with real choices
If one bundle gives you 2 hours out of 5 for free and another gives you 3 out of 8, which is more generous? $\frac{2}{5} = \frac{16}{40}$ and $\frac{3}{8} = \frac{15}{40}$. The first one, by a little. Your eye can't reliably judge that, but this method can.

## Equal value in a program
Python can keep exact fractions, so here's a look at what simplifying does. Python is a programming language you'll learn in a later course, and you don't need to know it yet. Just read the results.

```python
from fractions import Fraction
print(Fraction(36, 48))
print(Fraction(1, 2) == Fraction(50, 100))
print(Fraction(5, 6) > Fraction(7, 9))
```

```output
3/4
True
True
```

# Exercises
?? Fill in the gap: $\frac{7}{8} = \frac{?}{56}$.
=> 8 × 7 = 56, so the top is 7 × 7 = 49.

?? Simplify $\frac{42}{70}$ fully.
=> The HCF is 14: $\frac{42 \div 14}{70 \div 14} = \frac{3}{5}$.

?? Simplify $\frac{45}{60}$ fully.
=> The HCF is 15, which gives $\frac{3}{4}$.

?? Is $\frac{4}{6}$ equivalent to $\frac{10}{15}$?
=> Yes. Both simplify to $\frac{2}{3}$.

?? Which is bigger, $\frac{3}{4}$ or $\frac{5}{7}$?
=> With a common bottom of 28: $\frac{21}{28}$ and $\frac{20}{28}$. So $\frac{3}{4}$ is bigger.

# Practice
1. Take a real score of yours, or one you can imagine: for example, marks out of 50 on a test. Write it as a fraction, then simplify it.
2. Take a second score on a different total, such as marks out of 40. Compare the two using a common denominator. Which was really better?
3. Write the fraction $\frac{3}{5}$ in five other ways.
4. Find three deals, bundles or discounts around you where the sizes differ. Write each one as a fraction and compare two of them.

Write your two scores, your common denominator, and which one was really better.

# Rubric
- I simplified a real fraction fully, and checked nothing else divides both.
- I compared two fractions using a common denominator.
- I didn't add to top and bottom, or cancel digits.

# Summary
- Equivalent fractions name the same amount.
- Multiplying or dividing top and bottom by the same number keeps the value.
- Adding to top and bottom changes the value.
- Simplest form means no whole number above 1 divides both.
- To compare fractions, use a common denominator, usually the LCM of the bottoms.

# Check
Q: {a} out of {b} is equivalent to how many out of {b*k}?
P: The rule that makes them
Vars: a=1..6, b=7..9, k=2..6
F: a*k
= The bottom was multiplied by {k}, so multiply the top by {k}: {a*k}.

Q: Which fraction equals $\frac{2}{3}$?
P: The rule that makes them
- $\frac{4}{5}$
* $\frac{10}{15}$
- $\frac{12}{13}$
= Multiply top and bottom by 5. Adding the same amount doesn't keep the value.

Q: Why does multiplying top and bottom by 5 keep a fraction's value?
P: The rule that makes them
- Because 5 is a prime number, and primes don't change values
* It's the same as multiplying by $\frac{5}{5}$, which is 1
- Because making the two numbers bigger always leaves them equal
= Multiplying by 1 changes nothing.

Q: Simplify $\frac{24}{36}$ fully, in the form a/b.
P: Simplifying
A: 2/3
= The HCF of 24 and 36 is 12.

Q: Simplify $\frac{18}{45}$ fully, in the form a/b.
P: Simplifying
A: 2/5
= The HCF of 18 and 45 is 9.

Q: Which is in simplest form?
P: Simplifying
- $\frac{9}{15}$
- $\frac{14}{21}$
* $\frac{8}{15}$
= Nothing above 1 divides both 8 and 15. The others share 3 and 7.

Q: Which is bigger?
P: Comparing fractions
* $\frac{2}{3}$
- $\frac{5}{8}$
- They're equal
= $\frac{2}{3} = \frac{16}{24}$, and $\frac{5}{8} = \frac{15}{24}$.

Q: Which bottom is the best common denominator for $\frac{1}{4}$ and $\frac{5}{6}$?
P: Comparing fractions
- 10, by adding the two bottoms
* 12, the LCM of the two bottoms
- 24, the largest number you can find
= 24 works too, but 12 is the smallest and keeps the numbers easier.

Q[transfer]: You score 34 out of 40 on one test, and 41 out of 50 on another. Which is the better result?
P: Comparing fractions
* The 34 out of 40, because it's $\frac{170}{200}$ against $\frac{164}{200}$
- The 41 out of 50, because 41 is a bigger number of marks than 34
- They're the same, because each one lost a similar number of marks
= The raw marks mislead you when totals differ. A common bottom is fair.

Q[transfer]: A student "simplifies" $\frac{19}{95}$ by crossing out the 9s to get $\frac{1}{5}$. The answer is right. Is the method right?
P: Simplifying
* No, only whole factors can be divided out, and it just worked by luck
- Yes, because crossing out any digit that repeats is always allowed
- Yes, because the answer it gave here is the right one
= A method isn't proven by one lucky result. Try it on $\frac{12}{23}$, and it fails.

Q[transfer]: 30 out of 50 students passed one exam, and 42 out of 70 passed another. Were the two pass rates the same?
P: Same amount, different names
* Yes, because both simplify to $\frac{3}{5}$
- No, because 42 students passed one and 30 passed the other
- No, because 70 is larger than 50, so its rate has to be smaller
= Both are $\frac{3}{5}$. Rates compare fairly only when the totals are taken into account.

# Cards
What are equivalent fractions? :: Different ways of writing the same amount, such as $\frac{1}{2}$ and $\frac{2}{4}$.
What keeps a fraction's value? :: Multiplying or dividing top and bottom by the same number that isn't zero.
What does simplest form mean? :: No whole number above 1 divides both the top and the bottom.
What's the fastest way to simplify? :: Divide the top and bottom by their HCF.
How do you compare fractions with different bottoms? :: Rewrite them over a common denominator, usually the LCM, and compare the tops.

# Further
- OpenStax Prealgebra 2e, Visualize fractions :: https://openstax.org/books/prealgebra-2e/pages/4-1-visualize-fractions
- Khan Academy, Algebra basics :: https://www.khanacademy.org/math/algebra-basics
