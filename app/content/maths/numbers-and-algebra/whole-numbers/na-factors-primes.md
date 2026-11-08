---
id: na-factors-primes
pack: Numbers and Algebra · Whole numbers
title: Factors, multiples and primes
minutes: 45
source: OpenStax · Prealgebra 2e · Section 2.5
url: https://openstax.org/books/prealgebra-2e/pages/2-5-prime-factorization-and-the-least-common-multiple
courses: The base of all later maths and statistics
format: 2
teaches: factors; multiples; primes; prime-factorisation; hcf; lcm; divisibility-tests
uses: long-division; remainders; long-multiplication
---
# Goal
Find factors and multiples, tell whether a number is prime, break a number into primes, and find the highest common factor and lowest common multiple.

# Why
Next you'll simplify and add fractions, and those use exactly these skills. Later, factorising in algebra is the same idea with letters. And primes aren't just a school topic: the encryption that protects your bank app and web browsing depends on how hard it is to split very large numbers into primes. You'll see that in the Cryptography course.

# Warm-up
?? What is the remainder of 29 ÷ 4?
=> 1, since 7 × 4 = 28.

?? Is 72 ÷ 6 exact? How do you know?
=> Yes. 6 × 12 = 72, so the remainder is 0.

# Lesson
## Factors and multiples
A **factor** of a number divides into it exactly, with no remainder. A **multiple** of a number is what you get by multiplying it by a whole number.

The factors of 12 are 1, 2, 3, 4, 6 and 12. The multiples of 12 are 12, 24, 36, 48, and so on forever.

These are two views of the same fact. Because $3 \times 4 = 12$, we can say that 3 is a factor of 12, and that 12 is a multiple of 3.

| | Factors | Multiples |
| --- | --- | --- |
| How many? | Limited | Endless |
| Size | Up to the number itself | The number itself and bigger |
| Of 6 | 1, 2, 3, 6 | 6, 12, 18, 24, ... |

### Finding all the factors
Factors come in pairs. Work up from 1, and write each pair as you find it. Stop when the pairs meet.

For 36: $1 \times 36$, $2 \times 18$, $3 \times 12$, $4 \times 9$, $6 \times 6$. Check 5: it doesn't divide 36. After 6 the pairs would repeat, so you're done. The factors are 1, 2, 3, 4, 6, 9, 12, 18 and 36.

?? Find all the factors of 28.
=> $1 \times 28$, $2 \times 14$, $4 \times 7$. So: 1, 2, 4, 7, 14, 28.

## Quick divisibility tests
You can often spot a factor without dividing.

| Divides exactly by | When | Example |
| --- | --- | --- |
| 2 | The last digit is even | 3,578 |
| 3 | The digit sum divides by 3 | 471, as 4 + 7 + 1 = 12 |
| 4 | The last two digits divide by 4 | 1,716, as 16 ÷ 4 = 4 |
| 5 | The last digit is 0 or 5 | 2,345 |
| 6 | It passes the tests for 2 and 3 | 174 |
| 9 | The digit sum divides by 9 | 738, as 7 + 3 + 8 = 18 |
| 10 | The last digit is 0 | 560 |

## Prime numbers
A **prime number** has exactly two factors: 1 and itself. The primes begin: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.

A whole number above 1 that isn't prime is **composite**. It can be split further.

Two points catch people out:
- **1 isn't prime.** It has only one factor, itself.
- **2 is the only even prime.** Every other even number has 2 as a factor as well.

### Testing a number
To test whether a number is prime, try dividing it by the primes in order. Once the prime you're trying, multiplied by itself, is bigger than your number, you can stop. Factors come in pairs, so one of each pair has to be that small or smaller.

Is 91 prime? 2 no, 3 no (digit sum 10), 5 no, 7: $91 \div 7 = 13$. So it's not prime, even though it looks like one. Is 97 prime? Try 2, 3, 5, 7. None works, and $11 \times 11 = 121$ is above 97. So 97 is prime.

> Mistake: Assuming every odd number is prime. 9, 15, 21, 27, 33, 35, 39, 49 and 91 are all odd, and none of them is prime.

## Prime factorisation
Every whole number above 1 can be written as a product of primes, in exactly one way, apart from the order. This is **prime factorisation**, and that it works for every number is called the fundamental theorem of arithmetic.

Use a factor tree, or divide repeatedly by the smallest prime that works.

### Worked example: 180
| Divide by | Leaves |
| --- | --- |
| 2 | 90 |
| 2 | 45 |
| 3 | 15 |
| 3 | 5 |
| 5 | 1 |

So $180 = 2 \times 2 \times 3 \times 3 \times 5$, which can be written $2^2 \times 3^2 \times 5$. Multiply them back to check.

## HCF and LCM
**The highest common factor (HCF)** of two numbers is the largest number that divides both exactly. **The lowest common multiple (LCM)** is the smallest number both divide into exactly. You'll use the HCF to simplify fractions, and the LCM to add them.

### Worked example: 24 and 60
Write each as primes:

$$24 = 2 \times 2 \times 2 \times 3 \qquad 60 = 2 \times 2 \times 3 \times 5$$

**HCF:** take what they share: $2 \times 2 \times 3 = 12$.

**LCM:** take what they share, plus whatever's left over from each: $2 \times 2 \times 3 \times 2 \times 5 = 120$.

Here's a useful check: HCF × LCM = the two numbers multiplied. $12 \times 120 = 1{,}440$, and $24 \times 60 = 1{,}440$.

For small numbers, listing also works. The multiples of 4 are 4, 8, 12, 16 and so on. The multiples of 6 are 6, 12, 18 and so on. The first shared one, 12, is the LCM.

### When to use which
| Real question | Use | Why |
| --- | --- | --- |
| What's the largest equal group size that fits 24 and 60 students? | HCF | Divides both |
| A task repeats every 4 days and another every 6. When do they fall together? | LCM | A common multiple |

# Exercises
?? List the first five positive multiples of 7.
=> 7, 14, 21, 28, 35.

?? Is 2,145 divisible by 3? By 5? By 2?
=> Digit sum 12, so yes by 3. Ends in 5, so yes by 5. It's odd, so not by 2.

?? Is 51 prime?
=> No. Its digit sum is 6, so it divides by 3: $51 = 3 \times 17$.

?? Write 84 as a product of primes.
=> $84 = 2 \times 42 = 2 \times 2 \times 21 = 2 \times 2 \times 3 \times 7$, or $2^2 \times 3 \times 7$.

?? Find the HCF and LCM of 18 and 30.
=> $18 = 2 \times 3 \times 3$, and $30 = 2 \times 3 \times 5$. HCF: $2 \times 3 = 6$. LCM: $2 \times 3 \times 3 \times 5 = 90$. Check: $6 \times 90 = 540 = 18 \times 30$.

# Practice
Do this on paper first.

1. Take today's date as a number, such as 15 for the 15th, plus your age. List all the factors of each.
2. Write a three-digit number of your own, such as your house number or part of a course code. Use the divisibility tests, then write it as a product of primes. If it's prime, show how you know.
3. Think of two things in your life that repeat, such as a class every 2 days and a payment every 7. Use the LCM to say how often they fall on the same day.
4. The program in the box below tests whether a number is prime by trying every smaller number, just as you did by hand. You don't need to know Python yet. Change the number, press Run, and check the answers you got on paper.

Write your numbers, your factor trees and your answer for the two repeating things.

# Starter
```python
def is_prime(n):
    if n < 2:
        return False
    for d in range(2, n):
        if n % d == 0:
            print(n, "divides by", d)
            return False
    return True

# Change the number here and press Run.
print(is_prime(91))
```

# Rubric
- I found factors and a prime factorisation by hand for real numbers.
- I used the LCM on a real repeating pair.
- I checked my prime test against the program.

# Summary
- A factor divides a number exactly. A multiple is the number times a whole number.
- A prime has exactly two factors. 1 isn't prime, and 2 is the only even prime.
- Every whole number above 1 splits into primes in exactly one way.
- HCF takes what two numbers share. LCM takes that plus the rest.
- HCF × LCM = the two numbers multiplied.

# Check
Q: Which number is a factor of 45?
P: Factors and multiples
- 7
* 9
- 90
= $9 \times 5 = 45$. 90 is a multiple of 45, not a factor.

Q: Which is a multiple of 8?
P: Factors and multiples
- 4
- 18
* 56
= $8 \times 7 = 56$. 4 is a factor of 8.

Q: How many factors does 16 have?
P: Factors and multiples
A: 5 | five
= 1, 2, 4, 8, 16.

Q: Using the digit sum, does 7,146 divide exactly by 3?
P: Quick divisibility tests
* Yes, because its digit sum is 18
- No, because its last digit is 6
- No, because its digit sum is an even number
= 7 + 1 + 4 + 6 = 18, and 18 divides by 3.

Q: Which is prime?
P: Prime numbers
- 1
- 51
* 53
= 1 has only one factor, and $51 = 3 \times 17$. 53 has no factors other than 1 and itself.

Q: Which statement is true?
P: Prime numbers
- Every odd number is a prime number
* 2 is the only even prime number
- 1 is the smallest prime number
= 9 is odd and not prime, and 1 has just one factor.

Q: Write 60 as a product of primes in increasing order, using × between them.
P: Prime factorisation
A: 2 × 2 × 3 × 5 | 2x2x3x5 | 2 x 2 x 3 x 5 | 2*2*3*5 | 2×2×3×5 | 2^2 × 3 × 5 | 2^2 x 3 x 5
= $60 = 2 \times 30 = 2 \times 2 \times 15 = 2 \times 2 \times 3 \times 5$.

Q: What is the HCF of 36 and 48?
P: HCF and LCM
A: 12
= $36 = 2^2 \times 3^2$ and $48 = 2^4 \times 3$. They share $2 \times 2 \times 3 = 12$.

Q: What is the LCM of 8 and 12?
P: HCF and LCM
A: 24
= Multiples of 12: 12, 24. 24 is the first that 8 also divides.

Q[transfer]: One backup runs every 6 days and another every 10 days. They both ran today. In how many days do they next run together?
P: HCF and LCM
A: 30 | 30 days
= It's the LCM of 6 and 10, which is 30.

Q[transfer]: You have 48 exercise books and 72 pens to share into identical packs, using everything. What's the largest number of packs you can make?
P: HCF and LCM
A: 24 | 24 packs
= It's the HCF of 48 and 72, which is 24. Each pack gets 2 books and 3 pens.

Q[transfer]: Encryption often relies on multiplying two huge primes. Which fact makes that useful for security?
P: Prime factorisation
- Multiplying large numbers together is impossible for most computers
* Multiplying is easy, while recovering the two primes from the product is very hard
- Prime numbers can't ever be stored on a computer in binary form
= Splitting a huge number back into its primes takes impractically long, even though multiplying them is fast.

# Cards
What's the difference between a factor and a multiple? :: A factor divides a number exactly. A multiple is the number times a whole number.
What makes a number prime? :: It has exactly two factors: 1 and itself.
Is 1 prime? :: No. It has only one factor.
How do you test for divisibility by 3? :: Add the digits. If the sum divides by 3, so does the number.
How do HCF and LCM differ? :: The HCF is the largest number dividing both. The LCM is the smallest number both divide into.
What's the shortcut linking HCF and LCM? :: HCF × LCM = the two numbers multiplied.

# Further
- OpenStax Prealgebra 2e, Prime factorization and the least common multiple :: https://openstax.org/books/prealgebra-2e/pages/2-5-prime-factorization-and-the-least-common-multiple
- Khan Academy, Algebra basics :: https://www.khanacademy.org/math/algebra-basics
