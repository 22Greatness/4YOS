---
id: na-logarithms
pack: Numbers and Algebra · Powers and roots
title: What a logarithm is
minutes: 40
source: OpenStax · College Algebra 2e · Section 6.3
url: https://openstax.org/books/college-algebra-2e/pages/6-3-logarithmic-functions
courses: The base of all later maths and statistics
format: 2
teaches: logarithm-meaning; log-exponent-conversion; common-and-natural-log; log-base-two; log-scales
uses: power-meaning; negative-exponent; fraction-exponent; powers-of-two; standard-form; exponential-growth
---
# Goal
Say what a logarithm asks, move between powers and logarithms, work out simple logs by hand, and see why they're used in computing and on scales.

# Why
A logarithm is the question "what power?", the opposite of a power. It answers things like "how many doublings until it reaches a million?". Search algorithms that handle billions of records in about thirty steps are fast because of logarithms. So are decibels, earthquake scales, and many charts in statistics, and information itself is measured with them.

# Warm-up
?? What power of 2 gives 32?
=> $2^5 = 32$, so the 5th power.

?? What is $10^{-2}$?
=> 0.01.

# Lesson
## The question a logarithm asks
You know that $2^5 = 32$. Suppose instead you knew the 2 and the 32, and wanted the 5. "2 to what power gives 32?" A **logarithm** gives that power. We write:

$$\log_2 32 = 5$$

It's read "log base 2 of 32 is 5". The answer to a logarithm is always an **exponent**.

These two statements say exactly the same thing:

$$2^5 = 32 \qquad\Longleftrightarrow\qquad \log_2 32 = 5$$

In general:

$$b^y = x \qquad\Longleftrightarrow\qquad \log_b x = y$$

For this to work with ordinary numbers, the base $b$ is positive and isn't 1, and $x$ is positive.

The base stays the base. The log equals the exponent.

### Converting back and forth
| Power form | Log form |
| --- | --- |
| $10^3 = 1{,}000$ | $\log_{10} 1{,}000 = 3$ |
| $3^4 = 81$ | $\log_3 81 = 4$ |
| $5^2 = 25$ | $\log_5 25 = 2$ |
| $2^{-1} = \frac{1}{2}$ | $\log_2 \frac{1}{2} = -1$ |
| $9^{1/2} = 3$ | $\log_9 3 = \frac{1}{2}$ |

> Mistake: Treating log as a number multiplied by something. $\log_2 32$ doesn't mean "log times 32". It's one operation, like $\sqrt{32}$ is. It's a question being asked of 32.

## Working out logs by hand
Ask the question in words. For $\log_3 27$: 3 to what power gives 27? $3^3 = 27$, so the answer is 3.

| Log | Question | Answer |
| --- | --- | --- |
| $\log_2 16$ | 2 to what gives 16? | 4 |
| $\log_{10} 100{,}000$ | 10 to what gives 100,000? | 5 |
| $\log_5 1$ | 5 to what gives 1? | 0, as $5^0 = 1$ |
| $\log_7 7$ | 7 to what gives 7? | 1 |
| $\log_2 \frac{1}{8}$ | 2 to what gives $\frac{1}{8}$? | −3 |
| $\log_4 2$ | 4 to what gives 2? | $\frac{1}{2}$, as $4^{1/2} = 2$ |

From these, two facts follow for any valid base: $\log_b 1 = 0$, and $\log_b b = 1$.

### What can't be done
You can't take the log of 0 or of a negative number. Any positive base raised to any power stays positive, so nothing could give 0 or −8. A calculator gives an error, and so does a program. That's important when your data has zeros in it.

### Between whole answers
$\log_{10} 500$ must be between 2 and 3, since $10^2 = 100$ and $10^3 = 1{,}000$. A calculator gives 2.699. So $10^{2.699}$ is about 500.

?? Work out $\log_2 64$ and $\log_{10} 0.01$.
=> $2^6 = 64$, so 6. $10^{-2} = 0.01$, so −2.

## The bases you'll meet
| Base | Written | Where it's used |
| --- | --- | --- |
| 10 | $\log$ or $\log_{10}$ | Science, scales, calculators' LOG key |
| 2 | $\log_2$ | Computing and information |
| $e \approx 2.718$ | $\ln$ | Growth, calculus, statistics |

The number $e$ is a special constant, like $\pi$, that appears naturally in continuous growth. You'll meet it fully in later courses. For now, know that **ln** is the "natural" log, with base $e$, and it's the LN key on your calculator.

Books differ. In computing, a plain $\log$ often means base 2. In maths, it often means base $e$. Check which one is meant.

## Why computing cares
Suppose you've got a sorted list of a million names, and you want to find one. You can check the middle and throw away half, then repeat. How many steps? How many times can you halve a million before reaching 1? That's the question $\log_2$ answers: $\log_2 1{,}000{,}000 \approx 20$.

| List size | Halving steps | Roughly $\log_2$ |
| --- | --- | --- |
| 1,000 | 10 | $2^{10} = 1{,}024$ |
| 1,000,000 | 20 | $2^{20} \approx 1{,}000{,}000$ |
| 1,000,000,000 | 30 | $2^{30} \approx 1{,}000{,}000{,}000$ |

A thousand times more data costs only 10 more steps. This is binary search, and you'll write it in Data Structures and Algorithms.

The same holds for storage. How many bits do you need to give every one of 1,000 people a different number? $\log_2 1{,}000 \approx 10$, so 10 bits. Information is measured this way.

## Log scales
Some real quantities range across huge sizes, and an ordinary scale can't show them. A **log scale** gives each power of ten the same space.

| Value | $\log_{10}$ of the value | Place on the log scale |
| --- | --- | --- |
| 10 | 1 | 1 |
| 100 | 2 | 2 |
| 1,000 | 3 | 3 |
| 1,000,000 | 6 | 6 |

Here's the pattern as a curve. Each time $x$ is multiplied by 10, the height goes up by just 1, so a logarithm climbs very slowly.

```chart
{"kind":"function","fn":"log(x)","domain":[1,1000],"alt":"A curve of log base 10 of x, for x from 1 to 1000. It rises quickly at first, then flattens: 0 at x=1, 1 at x=10, 2 at x=100, 3 at x=1000.","note":"Worked out from the formula, not measured data.","xLabel":"x","yLabel":"log base 10 of x"}
```

Earthquake magnitude is on a log scale, where one step up in magnitude means ten times the measured shaking. Decibels for sound work similarly. And when income data is plotted in statistics, a log scale often makes it readable, because a few very high incomes would squash everyone else.

> Mistake: Reading a log chart as if it were ordinary. Equal distances mean equal multiples, not equal amounts. A line that looks gently straight on a log chart may be exploding in real terms.

# Exercises
?? Write $4^3 = 64$ in log form.
=> $\log_4 64 = 3$.

?? Write $\log_5 125 = 3$ in power form.
=> $5^3 = 125$.

?? Work out $\log_3 81$.
=> 4.

?? Work out $\log_{10} 1$.
=> 0.

?? Work out $\log_2 \frac{1}{4}$.
=> −2, since $2^{-2} = \frac{1}{4}$.

?? How many halvings take 1,024 down to 1?
=> $\log_2 1{,}024 = 10$.

# Practice
1. Take the phone contacts on your phone, or a real list of any size. Estimate how many steps it'd take to find one by halving, using $\log_2$.
2. Play the guessing game on paper with someone, or on your own: think of a number from 1 to 1,000, and find it by asking "higher or lower?", always guessing the middle. Count your steps. Does it take about 10?
3. Using your calculator's LOG key, find the log of 5, 50, 500 and 5,000. What pattern do you see, and why?
4. Search for a real chart with a logarithmic scale, such as in a news article on a pandemic or wealth. Note how the axis labels go up.

Write down your step counts, your pattern and what you found.

# Rubric
- I worked out logs by asking the power question.
- I tested halving for real, and compared it with $\log_2$.
- I found and explained a pattern in logs of 5, 50, 500 and 5,000.

# Summary
- A logarithm asks: what power? $\log_2 32 = 5$, as $2^5 = 32$.
- $b^y = x$ and $\log_b x = y$ say the same thing.
- $\log_b 1 = 0$ and $\log_b b = 1$.
- You can't take the log of 0 or a negative number.
- Bases: 10 in science, 2 in computing, $e$ for $\ln$.
- $\log_2 n$ counts how many times $n$ can be halved, which is why binary search is fast.

# Check
Q: What is $\log_2 8$?
P: The question a logarithm asks
A: 3 | three
= $2^3 = 8$.

Q: Which is the log form of $6^2 = 36$?
P: The question a logarithm asks
* $\log_6 36 = 2$
- $\log_2 36 = 6$
- $\log_{36} 6 = 2$
= The base stays the base, and the log equals the exponent.

Q: What is $\log_{10} 10^{{n}}$?
P: Working out logs by hand
Vars: n=2..12
F: n
= 10 to what gives $10^{{n}}$? The power is {n}.

Q: What is $\log_{10} 10{,}000$?
P: Working out logs by hand
A: 4 | four
= $10^4 = 10{,}000$.

Q: What is $\log_9 1$?
P: Working out logs by hand
A: 0 | zero
= Anything to the power 0 is 1.

Q: What is $\log_3 \frac{1}{9}$?
P: Working out logs by hand
A: -2 | −2
= $3^{-2} = \frac{1}{9}$.

Q: What is $\log_{10}(-5)$?
P: Working out logs by hand
- −0.7, the same as the log of 5 with a minus sign on it
- −5, because a log leaves any negative number the way it is
* It has no real answer, because powers of 10 are always positive
= No power of a positive base is negative.

Q: What base does $\ln$ use?
P: The bases you'll meet
- 2
- 10
* $e$
= ln is the natural log, with base $e \approx 2.718$.

Q[transfer]: A sorted list has about a billion entries. Halving each time, about how many steps does a search need?
P: Why computing cares
- About 500 million steps
- About 1,000 steps
* About 30 steps
= $2^{30}$ is about a billion, so $\log_2$ of a billion is about 30.

Q[transfer]: Earthquake A has magnitude 7, and B has magnitude 5. One step means ten times the measured shaking. How many times stronger is A's shaking?
P: Log scales
A: 100 | 100 times | a hundred
= 2 steps up: $10 \times 10 = 100$. It isn't "2 more" in real terms.

Q[transfer]: How many bits do you need for 256 different values?
P: Why computing cares
A: 8 | eight | 8 bits
= $\log_2 256 = 8$, since $2^8 = 256$.

# Cards
What does a logarithm ask? :: What power? $\log_b x$ is the power of $b$ that gives $x$.
Write $2^5 = 32$ in log form. :: $\log_2 32 = 5$.
What are $\log_b 1$ and $\log_b b$? :: 0 and 1.
What can't you take the log of? :: Zero or a negative number.
What does $\log_2 n$ count in computing? :: How many times $n$ can be halved, which is the number of steps in a binary search.
What does ln mean? :: Log with base $e$, about 2.718.

# Further
- OpenStax College Algebra 2e, Logarithmic functions :: https://openstax.org/books/college-algebra-2e/pages/6-3-logarithmic-functions
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
