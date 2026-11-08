---
id: na-fractions
pack: Numbers and Algebra · Parts of a whole
title: What a fraction is
minutes: 40
source: OpenStax · Prealgebra 2e · Section 4.1
url: https://openstax.org/books/prealgebra-2e/pages/4-1-visualize-fractions
courses: The base of all later maths and statistics
format: 2
teaches: fraction-meaning; numerator-denominator; fractions-on-a-line; improper-fractions; mixed-numbers
uses: long-division; remainders; division-by-zero; number-line
---
# Goal
Say what a fraction means, place one on a number line, and move between improper fractions and mixed numbers.

# Why
Whole numbers can't describe half a loaf or three quarters of a term. Fractions can, and they're also a way of writing division, which is why they appear in almost every formula from here on. Probability is built from fractions, so are percentages and ratios, and algebra often has them on every line. People who fear maths usually started fearing it here, so we'll go slowly and make it solid.

# Warm-up
?? What is 17 ÷ 5, as a quotient and remainder?
=> 3 remainder 2, since 3 × 5 + 2 = 17.

?? What is $8 \div 0$?
=> It has no answer. Nothing times 0 can give 8.

# Lesson
## Equal parts of a whole
A **fraction** describes some equal parts of a whole. It has two numbers, one over the other.

$$\frac{3}{4}$$

The bottom number, the **denominator**, says how many equal parts the whole is cut into. The top number, the **numerator**, says how many of those parts you have. So $\frac{3}{4}$ means: cut the whole into 4 equal parts, and take 3.

Picture a bar cut into four equal parts, with three of them shaded:

| ■ | ■ | ■ | □ |
| --- | --- | --- | --- |
| $\frac{1}{4}$ | $\frac{1}{4}$ | $\frac{1}{4}$ | $\frac{1}{4}$ |

The parts must be equal. A loaf cut into a big piece and a small piece isn't in halves, even though there are two pieces.

### Bigger denominator, smaller parts
This surprises many people. $\frac{1}{8}$ is smaller than $\frac{1}{4}$, even though 8 is bigger than 4. Sharing a loaf among 8 people gives each person less than sharing it among 4.

?? Which is larger, $\frac{1}{5}$ or $\frac{1}{3}$?
=> $\frac{1}{3}$. Cutting into 3 parts gives bigger pieces than cutting into 5.

## A fraction is also a division
The bar in a fraction means "divided by". So $\frac{3}{4}$ is the same as $3 \div 4$, which is why sharing 3 loaves among 4 people gives each person $\frac{3}{4}$ of a loaf.

That explains some special cases.

| Fraction | Means | Equals | Why |
| --- | --- | --- | --- |
| $\frac{7}{7}$ | $7 \div 7$ | 1 | All the parts make one whole |
| $\frac{7}{1}$ | $7 \div 1$ | 7 | Any whole number can be written over 1 |
| $\frac{0}{7}$ | $0 \div 7$ | 0 | You have none of the parts |
| $\frac{7}{0}$ | $7 \div 0$ | No answer | You can't cut into zero parts |

> Mistake: Mixing up $\frac{0}{7}$ and $\frac{7}{0}$. Zero on top is fine and equals 0. Zero on the bottom has no answer.

## Fractions on the number line
Fractions are numbers, and they have places on the number line between the whole numbers. To place $\frac{3}{4}$, cut the distance from 0 to 1 into 4 equal steps, and go along 3 of them.

```diagram
{"kind":"numberline","alt":"A number line from 0 to 2 in steps of a quarter, written as decimals: 0, 0.25, 0.5, 0.75, 1, and on to 2. The position 0.75, which equals three quarters, is marked.","min":0,"max":2,"step":0.25,"marks":[0.75]}
```

The line labels these as decimals, which you'll meet soon: 0.25 is $\frac{1}{4}$, 0.5 is $\frac{2}{4}$, and 0.75 is $\frac{3}{4}$. The fractions keep going past 1. The next step after $\frac{4}{4}$ is $\frac{5}{4}$.

### Finding a fraction of an amount
To find $\frac{3}{4}$ of ₦2,000, follow the meaning. Divide by the bottom to get one part, then multiply by the top to get the parts you want.

$$2{,}000 \div 4 = 500 \qquad 500 \times 3 = 1{,}500$$

So $\frac{3}{4}$ of ₦2,000 is ₦1,500.

?? What is $\frac{2}{5}$ of 45?
=> $45 \div 5 = 9$, then $9 \times 2 = 18$.

## Improper fractions and mixed numbers
When the top is smaller than the bottom, the fraction is less than 1, and it's called a **proper fraction**. When the top is equal to or bigger than the bottom, it's 1 or more, and it's an **improper fraction**, such as $\frac{7}{4}$. Despite the name, there's nothing wrong with it. Algebra usually prefers it.

A **mixed number** writes the same amount as a whole number plus a fraction, such as $1\frac{3}{4}$, read "one and three quarters".

### Improper to mixed
Divide. The quotient is the whole number, and the remainder is the new top.

$$\frac{17}{5}: \quad 17 \div 5 = 3 \text{ remainder } 2, \quad \text{so } \frac{17}{5} = 3\frac{2}{5}$$

### Mixed to improper
Multiply the whole number by the bottom, then add the top. Keep the same bottom.

$$3\frac{2}{5}: \quad 3 \times 5 + 2 = 17, \quad \text{so } 3\frac{2}{5} = \frac{17}{5}$$

It makes sense in terms of parts. Each whole holds 5 fifths, so 3 wholes hold 15 fifths, and 2 more makes 17.

> Mistake: Reading $3\frac{2}{5}$ as 3 times $\frac{2}{5}$. It means $3 + \frac{2}{5}$. In algebra, writing things side by side does mean multiplying, so this is the one exception to watch for.

# Exercises
?? A course has 12 weeks, and 5 have passed. What fraction has passed? What fraction remains?
=> $\frac{5}{12}$ has passed, and $\frac{7}{12}$ remains.

?? What is $\frac{5}{8}$ of 240?
=> $240 \div 8 = 30$, then $30 \times 5 = 150$.

?? Write $\frac{23}{6}$ as a mixed number.
=> $23 \div 6 = 3$ remainder 5, so $3\frac{5}{6}$.

?? Write $4\frac{3}{7}$ as an improper fraction.
=> $4 \times 7 + 3 = 31$, so $\frac{31}{7}$.

?? Put these in order from smallest to largest: $\frac{1}{2}$, $\frac{1}{10}$, $\frac{1}{3}$.
=> $\frac{1}{10}$, $\frac{1}{3}$, $\frac{1}{2}$. The bigger the bottom, the smaller the parts.

# Practice
1. Draw a bar on paper for a real thing: for example, the weeks in your school term or the hours in your study day. Cut it into equal parts and shade what's already done. Write the fraction done, and the fraction left.
2. Find three fractions of a real amount, such as $\frac{1}{4}$, $\frac{2}{5}$ and $\frac{3}{10}$ of a sum you really spend or save each month.
3. Draw a number line from 0 to 2, and mark $\frac{1}{4}$, $\frac{3}{4}$, $\frac{5}{4}$ and $1\frac{1}{2}$ by cutting each whole into four.
4. Write two improper fractions of your own, turn them into mixed numbers, and turn them back to check.

Write your fractions, and what each one means in your example.

# Rubric
- I drew a real thing as equal parts, and wrote the fractions.
- I found fractions of a real amount by dividing, then multiplying.
- I converted improper fractions to mixed numbers and back.

# Summary
- A fraction is some equal parts of a whole: the bottom says how many parts, and the top says how many you have.
- The bar means divide, so $\frac{3}{4} = 3 \div 4$.
- A bigger bottom means smaller parts.
- To find a fraction of an amount, divide by the bottom, then multiply by the top.
- $\frac{0}{7} = 0$, but $\frac{7}{0}$ has no answer.
- Improper to mixed: divide. Mixed to improper: multiply and add.

# Check
Q: In $\frac{5}{9}$, what does the 9 tell you?
P: Equal parts of a whole
- How many of the parts you've got in total
* How many equal parts the whole is cut into
- How much bigger the whole is than the top number
= The bottom is the denominator, which counts the equal parts.

Q: Which is the largest?
P: Equal parts of a whole
- $\frac{1}{9}$
- $\frac{1}{6}$
* $\frac{1}{4}$
= With the same top, the smallest bottom gives the biggest parts.

Q: What does $\frac{9}{9}$ equal?
P: A fraction is also a division
A: 1 | one
= Having all nine of the nine parts makes one whole.

Q: What does $\frac{0}{5}$ equal?
P: A fraction is also a division
A: 0 | zero
= None of the parts is nothing. Zero on top is fine.

Q: {d*k} is shared into {d} equal parts. How much are 2 of those parts?
P: Fractions on the number line
Vars: d=3..9, k=2..20
F: 2*k
= One part is {k}, and two parts are {2*k}.

Q: What is $\frac{3}{4}$ of 60?
P: Fractions on the number line
A: 45
= $60 \div 4 = 15$, then $15 \times 3 = 45$.

Q: Write $\frac{19}{4}$ as a mixed number, in the form 4 3/4.
P: Improper fractions and mixed numbers
A: 4 3/4 | 4 and 3/4
= $19 \div 4 = 4$ remainder 3.

Q: Write $2\frac{5}{6}$ as an improper fraction, in the form a/b.
P: Improper fractions and mixed numbers
A: 17/6
= $2 \times 6 + 5 = 17$, keeping the bottom as 6.

Q[transfer]: 3 people share 2 loaves equally. How much does each one get?
P: A fraction is also a division
- $\frac{3}{2}$ of a loaf, since there are more people than loaves here
* $\frac{2}{3}$ of a loaf, since it's 2 divided by 3
- $\frac{1}{3}$ of a loaf, since there are three people in total
= The fraction bar means divide, and what's being shared goes on top.

Q[transfer]: A term has 15 weeks. You've studied for 6 of them. A friend says, "That's more than half gone." Is that right?
P: Equal parts of a whole
- Yes, because 6 weeks is already a long time to have spent
* No, because half of 15 is 7.5, and 6 is less than that
- Yes, because $\frac{6}{15}$ has a top and a bottom above 5
= Compare $\frac{6}{15}$ with half. Half of 15 is 7.5, so 6 weeks isn't yet half.

Q[transfer]: A coin has two equal sides, and probability says heads has a chance of $\frac{1}{2}$. What does the bottom number count?
P: Equal parts of a whole
- The number of times you've thrown the coin so far today
* The number of equally likely results
- The number of heads you're expected to get every throw
= This is the same "equal parts" idea. You'll build on it in Probability 1.

# Cards
What do the top and bottom of a fraction mean? :: The bottom says how many equal parts the whole is cut into. The top says how many you have.
What does the fraction bar mean? :: Divide. $\frac{3}{4} = 3 \div 4$.
How do you find $\frac{2}{5}$ of an amount? :: Divide by 5, then multiply by 2.
How do you turn $\frac{17}{5}$ into a mixed number? :: Divide: 3 remainder 2, so $3\frac{2}{5}$.
How do you turn $3\frac{2}{5}$ into an improper fraction? :: $3 \times 5 + 2 = 17$, so $\frac{17}{5}$.
What are $\frac{0}{7}$ and $\frac{7}{0}$? :: $\frac{0}{7} = 0$, and $\frac{7}{0}$ has no answer.

# Further
- OpenStax Prealgebra 2e, Visualize fractions :: https://openstax.org/books/prealgebra-2e/pages/4-1-visualize-fractions
- Khan Academy, Algebra basics :: https://www.khanacademy.org/math/algebra-basics
