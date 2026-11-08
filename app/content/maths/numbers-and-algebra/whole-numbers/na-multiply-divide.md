---
id: na-multiply-divide
pack: Numbers and Algebra · Whole numbers
title: Multiplying and dividing by hand
minutes: 50
source: OpenStax · Prealgebra 2e · Sections 1.4 and 1.5
url: https://openstax.org/books/prealgebra-2e/pages/1-4-multiply-whole-numbers
courses: The base of all later maths and statistics
format: 2
teaches: long-multiplication; long-division; remainders; multiplication-properties; division-by-zero
uses: column-addition; column-subtraction; estimate; inverse-check
---
# Goal
Multiply and divide whole numbers by hand, say what a remainder means in a real situation, and explain why nothing can be divided by zero.

# Why
Multiplication and division are behind percentages, averages, rates and almost every formula you'll meet. Fractions, the next unit, are division written differently. Knowing why dividing by zero has no answer also explains why real programs crash. Remainders matter in computing too, as they're how a program tells even from odd.

# Warm-up
?? What is 4,508 − 1,699? Check it by adding back.
=> 2,809. Check: 2,809 + 1,699 = 4,508.

?? Estimate 62 × 29 using rounded numbers.
=> 60 × 30 = 1,800.

# Lesson
## What multiplying really is
**Multiplying** is repeated adding. $4 \times 3$ means 3 + 3 + 3 + 3 = 12: four groups of three. The numbers are called **factors**, and the result is the **product**.

| Fact | Meaning | Example |
| --- | --- | --- |
| Order doesn't matter | $a \times b = b \times a$ | $4 \times 3 = 3 \times 4$ |
| Grouping doesn't matter | $(a \times b) \times c = a \times (b \times c)$ | $(2 \times 5) \times 7 = 2 \times (5 \times 7)$ |
| Times one | $a \times 1 = a$ | $9 \times 1 = 9$ |
| Times zero | $a \times 0 = 0$ | $9 \times 0 = 0$ |
| Splitting over a sum | $a \times (b + c) = a \times b + a \times c$ | $6 \times 13 = 6 \times 10 + 6 \times 3$ |

The last one is called the **distributive law**. It's the reason long multiplication works, and it comes back in algebra.

You need your times tables up to 12 × 12 quick. If they're slow, spend a little time on them now, because every later step depends on them.

### Multiplying by 10, 100 and 1,000
Multiplying by 10 moves every digit one place left, which is why we add a zero: $47 \times 10 = 470$. Likewise, $47 \times 100 = 4{,}700$.

## Long multiplication
To multiply by a two-digit number, split it and use the distributive law. Multiply by the ones, multiply by the tens, then add.

### Worked example: 347 × 26
Since 26 = 20 + 6, we need $347 \times 6$ plus $347 \times 20$.

| Step | Working | Result |
| --- | --- | --- |
| 347 × 6 | 7 × 6 = 42, write 2 carry 4. 4 × 6 + 4 = 28, write 8 carry 2. 3 × 6 + 2 = 20 | 2,082 |
| 347 × 20 | Put a 0 down for the tens, then 347 × 2 = 694 | 6,940 |
| Add | 2,082 + 6,940 | 9,022 |

Estimate to check: $350 \times 25 = 8{,}750$, which is close.

> Mistake: Forgetting the placeholder zero on the second row. That's multiplying by 2 when you meant 20, and the answer comes out far too small.

?? What is 58 × 34?
=> 58 × 4 = 232. 58 × 30 = 1,740. Sum: 1,972.

## What dividing really is
**Dividing** asks either of two questions. Split 12 into 3 equal groups: how many in each? Or how many 3s fit into 12? Either way, $12 \div 3 = 4$. The number being split, 12, is the **dividend**, 3 is the **divisor**, and 4 is the **quotient**.

Division undoes multiplication. If $12 \div 3 = 4$, then $4 \times 3 = 12$. So any division can be checked by multiplying.

## Long division
Long division works from the left, one place at a time, repeating four steps: divide, multiply, subtract, bring down.

### Worked example: 1,736 ÷ 7
| Step | Question | Working | Write |
| --- | --- | --- | --- |
| 1 | How many 7s in 17? | 2, since 2 × 7 = 14. 17 − 14 = 3 | 2 |
| 2 | Bring down the 3, making 33. How many 7s? | 4, since 4 × 7 = 28. 33 − 28 = 5 | 4 |
| 3 | Bring down the 6, making 56. How many 7s? | 8, since 8 × 7 = 56. 56 − 56 = 0 | 8 |

So $1{,}736 \div 7 = 248$. Check: $248 \times 7 = 1{,}736$.

## Remainders
Not every division comes out exact. $17 \div 5$ gives 3 with 2 left over. That leftover is the **remainder**, and it's written $17 \div 5 = 3$ remainder 2. The check becomes: quotient × divisor + remainder = dividend, so $3 \times 5 + 2 = 17$. The remainder must always be smaller than the divisor.

What the remainder means depends on the situation. Read the question.

| Situation | $50 \div 12$ gives 4 remainder 2 | Answer |
| --- | --- | --- |
| How many full boxes of 12 can you fill from 50 items? | Ignore the rest | 4 boxes |
| How many taxis of 12 do 50 people need? | The extra 2 people still need a seat | 5 taxis |
| How many items are left unboxed? | Use the remainder | 2 items |

## Why you can't divide by zero
Division undoes multiplication. So what would $6 \div 0$ be? It'd have to be a number which, multiplied by 0, gives 6. But anything times 0 is 0. No such number exists, so $6 \div 0$ has **no answer**. We call it **undefined**. It isn't 0, and it isn't infinity.

$0 \div 6$ is fine, though. Zero divided by a number that isn't zero is 0, since $0 \times 6 = 0$. Sharing nothing among six people gives each of them nothing. But $0 \div 0$ is undefined too: every number times 0 gives 0, so there's no single answer.

In a program, dividing by zero usually causes an error unless the program checks for it first, and an average of an empty list hits exactly this.

> Mistake: Writing $5 \div 0 = 0$. Zero on top is fine, and zero on the bottom has no answer.

# Exercises
?? What is 405 × 37?
=> 405 × 7 = 2,835. 405 × 30 = 12,150. Sum: 14,985.

?? Work out 2,958 ÷ 6.
=> 6 into 29 goes 4 times, leaving 5. 6 into 55 goes 9 times, leaving 1. 6 into 18 goes 3 times, leaving 0. The answer is 493. Check: 493 × 6 = 2,958.

?? What are the quotient and remainder of 100 ÷ 7?
=> 14 remainder 2, since 14 × 7 = 98, and 98 + 2 = 100.

?? 145 students need buses that hold 40 each. How many buses?
=> 145 ÷ 40 = 3 remainder 25. The 25 students still need a bus, so 4 buses.

# Practice
Use real quantities from your life, by hand, then check by multiplying back.

1. Work out a real weekly cost for a whole term: for example, your weekly transport cost × the number of weeks. Use long multiplication, and estimate first.
2. Divide a real amount into equal parts: a data bundle's cost per day, or your study hours per course. Use long division.
3. Find a real case where a division leaves a remainder, such as how many full weeks are in the days left until an exam. Say what the remainder means there.
4. Check each answer the opposite way, then with a calculator.

Write your working for one multiplication and one division, including your checks.

# Rubric
- I did a long multiplication and a long division by hand on real numbers.
- I checked each one the opposite way.
- I said what a real remainder means in its situation.

# Summary
- Multiplying is repeated adding. Long multiplication splits one number using the distributive law.
- Keep the placeholder zero when multiplying by the tens.
- Long division repeats divide, multiply, subtract, bring down.
- Check: quotient × divisor + remainder = dividend.
- What to do with a remainder depends on the situation.
- Dividing by zero has no answer. It's undefined, not 0.

# Check
Q: What is {a} × {b}?
P: Long multiplication
Vars: a=112..498, b=12..39
F: a*b
= Multiply by the ones, multiply by the tens with a placeholder zero, then add. The product is {a*b}.

Q: What is {a} ÷ {b}?
P: Long division
Vars: a=112..999, b=3..9
Where: a % b == 0
F: a/b
= Long division gives {a/b}, with nothing left over. Check: {a/b} × {b} = {a}.

Q: What is the remainder when {a} is divided by {b}?
P: Remainders
Vars: a=50..200, b=6..12
F: a%b
= {a} is {floor(a/b)} × {b} + {a%b}, so the remainder is {a%b}.

Q: Which is true of the distributive law?
P: What multiplying really is
- It says that $a \times b$ always gives the same result as $a + b$
* It says that $6 \times 13 = 6 \times 10 + 6 \times 3$
- It says that any number multiplied by one equals zero
= Multiplying over a sum splits into two products. Long multiplication relies on it.

Q: Why do you write a placeholder zero when multiplying by the 2 in 26?
P: Long multiplication
- Because the rules of writing numbers don't allow a row to start with a digit
* That 2 really means 20, so the row has to be worth ten times more
- Because the zero keeps the two rows of working the same length as each other
= You're multiplying by 20. Leaving out the zero multiplies by 2 instead.

Q: What is $0 \div 8$?
P: Why you can't divide by zero
A: 0 | zero
= Zero on top is fine. Since $0 \times 8 = 0$, the answer is 0.

Q: What is $8 \div 0$?
P: Why you can't divide by zero
- 0, because anything involving zero is zero
- 8, because dividing by zero leaves a number unchanged
* It has no answer, because no number times 0 gives 8
= Division undoes multiplication, and nothing times 0 can make 8.

Q: A division gives 9 remainder 4, and the divisor is 6. What was the dividend?
P: Remainders
A: 58
= Quotient × divisor + remainder: $9 \times 6 + 4 = 58$.

Q[transfer]: 230 people are travelling in buses of 18. How many buses must you hire?
P: Remainders
A: 13 | 13 buses
= 230 ÷ 18 = 12 remainder 14. Those 14 people still need a seat, so that's 13 buses.

Q[transfer]: A computer program calculates an average by dividing a total by a count, and it crashes when a list is empty. Why?
P: Why you can't divide by zero
- Python can't add numbers up unless the list has at least ten items
* The count is 0, and dividing by zero has no answer
- Empty lists hold hidden text, and text can't be divided by a number
= An empty list has a count of 0. A good program checks for that first.

Q[transfer]: In most programming languages, `n % 2` means the remainder of n ÷ 2. A programmer uses it to test if a number is even. Which idea does this rely on?
P: Remainders
- That multiplying any number by 2 always makes the number even
* An even number leaves a remainder of 0 when divided by 2
- That a number is even when it's bigger than its own half
= `%` gives the remainder. Even numbers leave 0, and odd numbers leave 1.

# Cards
What does the distributive law say? :: $a \times (b + c) = a \times b + a \times c$.
What are the four repeating steps of long division? :: Divide, multiply, subtract, bring down.
How do you check a division with a remainder? :: Quotient × divisor + remainder should equal the dividend.
Why can't you divide by zero? :: No number times 0 gives anything other than 0, so there's no answer. It's undefined.
What's $0 \div 6$? :: 0. Zero on top is fine. Zero on the bottom isn't.

# Further
- OpenStax Prealgebra 2e, Multiply whole numbers :: https://openstax.org/books/prealgebra-2e/pages/1-4-multiply-whole-numbers
- OpenStax Prealgebra 2e, Divide whole numbers :: https://openstax.org/books/prealgebra-2e/pages/1-5-divide-whole-numbers
