---
id: na-negative-numbers
pack: Numbers and Algebra · Whole numbers
title: Negative numbers
minutes: 40
source: OpenStax · Prealgebra 2e · Chapter 3
url: https://openstax.org/books/prealgebra-2e/pages/3-1-introduction-to-integers
courses: The base of all later maths and statistics
format: 2
teaches: integers; number-line; add-subtract-negatives; multiply-divide-negatives; absolute-value
uses: column-addition; column-subtraction; long-multiplication; bodmas
---
# Goal
Place negative numbers on a number line, add, subtract, multiply and divide them, and use them correctly in real situations such as debts and changes.

# Why
Debts, losses, falling prices and temperatures below zero all need negative numbers. Algebra uses them on nearly every line, and a sign mistake is the most common way to lose marks in maths. In statistics, signed differences from an average are often negative. Computers store them too, and a wrong sign in a money calculation is a real and costly bug.

# Warm-up
?? Work out $20 - 3 \times 4$.
=> Multiply first: $20 - 12 = 8$.

?? What's 300 − 145?
=> 155.

# Lesson
## Numbers below zero
Whole numbers count things, but they can't describe owing someone ₦500, or a loss, or a temperature below freezing. For that we need numbers below zero, written with a minus sign: −1, −2, −3 and so on.

The whole numbers together with their negatives are called **integers**: ..., −3, −2, −1, 0, 1, 2, 3, ...

Picture them on a **number line**, with zero in the middle. Values get bigger to the right.

```diagram
{"kind":"numberline","alt":"A number line from minus 6 to 6, with 0 in the middle and larger numbers to the right. Minus 4 and 3 are marked.","min":-6,"max":6,"step":1,"marks":[-4,3]}
```

Since −4 is to the left of 3, $-4 < 3$. This also means $-7 < -2$, as −7 is further left. It may feel odd because 7 is larger than 2, but owing ₦7,000 is worse than owing ₦2,000.

The **absolute value** of a number is its distance from zero, ignoring direction. It's written with two bars: $\lvert -4 \rvert = 4$ and $\lvert 4 \rvert = 4$.

?? Which is greater, −15 or −3?
=> −3. It's further right on the number line, closer to zero.

## Adding and subtracting
Think of moving along the number line. Adding a positive moves you right. Subtracting a positive moves you left.

Subtraction is the same as adding the opposite. That's the rule that makes all the others simple.

| Rule | Example | Think of it as |
| --- | --- | --- |
| Adding a negative is subtracting | $5 + (-3) = 5 - 3 = 2$ | Having ₦5, then adding a ₦3 debt |
| Subtracting a negative is adding | $5 - (-3) = 5 + 3 = 8$ | Having a ₦3 debt cancelled |

Follow these rules with the sign of each number.

### Worked examples
| Calculation | Thinking | Answer |
| --- | --- | --- |
| $-3 + 8$ | Start at −3, move 8 right | 5 |
| $-3 - 8$ | Start at −3, move 8 left | −11 |
| $3 - 8$ | Start at 3, move 8 left | −5 |
| $-3 + (-8)$ | Adding a negative: move 8 left | −11 |
| $-3 - (-8)$ | Subtracting a negative: move 8 right | 5 |

> Mistake: Thinking that two minus signs always give a plus. That rule applies only when they're next to each other, as in $5 - (-3)$, or when multiplying. $-3 - 8$ has two minus signs, and it's −11, not 11.

## Multiplying and dividing
Work out the numbers as usual, then decide the sign.

| Signs | Result | Example |
| --- | --- | --- |
| Same signs | Positive | $(-2) \times (-3) = 6$ and $(-6) \div (-2) = 3$ |
| Different signs | Negative | $(-2) \times 3 = -6$ and $6 \div (-2) = -3$ |

Why would a negative times a negative be positive? Here's a pattern that shows why.

| Calculation | Result |
| --- | --- |
| $(-2) \times 2$ | −4 |
| $(-2) \times 1$ | −2 |
| $(-2) \times 0$ | 0 |
| $(-2) \times (-1)$ | 2 |
| $(-2) \times (-2)$ | 4 |

Each time, the answer goes up by 2. For the pattern to continue, the last two have to be positive. In real terms, taking away a debt is a gain.

With many numbers multiplied, count the negatives. An even number of them gives a positive result, and an odd number gives a negative one.

## Order of operations with negatives
BODMAS still applies. There's one classic trap: powers.

$$(-3)^2 = (-3) \times (-3) = 9 \qquad\qquad -3^2 = -(3 \times 3) = -9$$

In $-3^2$, the power goes first, and it applies only to the 3. If you mean the negative number squared, you need brackets.

> Mistake: Writing $-3^2 = 9$.

Python, a programming language you'll learn later, follows the same rules. You don't need to know it yet. Here `**` means "to the power of" and `*` means ×.

```python
print(-3 ** 2)
print((-3) ** 2)
print(5 - (-3))
print(-2 * -3)
```

```output
-9
9
8
6
```

## Negative numbers in real life
Choose what zero means, and what direction is positive. Then the signs do the work.

### Worked example: an account
You start with ₦4,000, pay ₦6,500 by overdraft, then receive ₦3,000. Your balance is

$$4{,}000 - 6{,}500 + 3{,}000 = 500$$

Partway through, the balance was −₦2,500.

### Worked example: change
Temperature goes from −4 °C to 9 °C. The change is the final value minus the starting one: $9 - (-4) = 13$ degrees. Always use **final minus start**. A negative result then means a fall.

# Exercises
?? Work out $-7 + 12$.
=> 5.

?? Work out $-7 - 12$.
=> −19.

?? Work out $6 - (-9)$.
=> $6 + 9 = 15$.

?? Work out $(-4) \times (-5) + (-3)$.
=> $20 + (-3) = 17$.

?? Work out $(-24) \div 6 \times (-2)$.
=> Left to right: $(-24) \div 6 = -4$, then $(-4) \times (-2) = 8$.

?? A share falls by ₦120 on each of 3 days, then rises ₦200. What's the total change?
=> $3 \times (-120) + 200 = -360 + 200 = -160$. It fell by ₦160.

# Practice
Use a real money trail from your life, or from your memory of a recent month. You don't need to record real amounts here.

1. Pick a starting amount and list at least six real events: money in as positive, money out as negative.
2. Draw a rough number line and mark the balance after each event.
3. Write the whole thing as one calculation, and work it out by hand.
4. Find the lowest point. If it went below zero, what did that negative number really mean?
5. Check your total with the program in the box below. You don't need to know Python: just change the numbers in the list to yours, keep the commas, and press Run.

Write what you found about your lowest point, leaving out private amounts if you prefer.

# Starter
```python
# Money in is positive, and money out is negative. Change these to yours.
changes = [4000, -6500, 3000, -1200, 800, -300]
balance = 0
for change in changes:
    balance = balance + change
    print(change, "gives a balance of", balance)
```

# Rubric
- I modelled a real trail of money in and out using signs.
- I worked out the balance by hand, and then checked it.
- I can say what a negative balance really meant in my example.

# Summary
- Negative numbers sit left of zero, and $-7 < -2$.
- Subtracting a number is the same as adding its opposite, so $5 - (-3) = 8$.
- When multiplying or dividing, same signs give a positive, and different signs give a negative.
- $(-3)^2 = 9$, but $-3^2 = -9$.
- Change is always final minus start.

# Check
Q: What is {a} − {b}?
P: Adding and subtracting
Vars: a=2..12, b=13..30
F: a-b
= Start at {a} and move {b} left. You land on {a-b}.

Q: What is −{a} + {b}?
P: Adding and subtracting
Vars: a=2..20, b=2..20
Where: a != b
F: -a+b
= Start at −{a} and move {b} right. You land on {-a+b}.

Q: What is −{a} − {b}?
P: Adding and subtracting
Vars: a=2..20, b=2..20
F: -a-b
= Start at −{a} and move {b} left. Going further into the negatives gives {-a-b}.

Q: What is $7 - (-5)$?
P: Adding and subtracting
A: 12
= Subtracting a negative is adding: $7 + 5 = 12$.

Q: What is $(-6) \times (-7)$?
P: Multiplying and dividing
A: 42
= Same signs give a positive.

Q: What is $(-48) \div 6$?
P: Multiplying and dividing
A: -8 | −8
= Different signs give a negative.

Q: What is $-5^2$?
P: Order of operations with negatives
A: -25 | −25
= The power goes first, on the 5 only. So it's $-(5 \times 5)$.

Q: Which is the greatest?
P: Numbers below zero
- −12
* −3
- −7
= −3 is furthest right on the number line.

Q: Find −2 on this number line, and click it.
P: Numbers below zero
D: {"kind":"numberline","alt":"A number line from minus 5 to 5. Click the position of minus 2.","min":-5,"max":5,"step":1}
A: -2
= Negative numbers are to the left of zero, and −2 is two places left.

Q[transfer]: A town goes from −6 °C at night to 11 °C by day. By how many degrees did it rise?
P: Negative numbers in real life
A: 17 | 17 degrees
= Final minus start: $11 - (-6) = 17$.

Q[transfer]: Your account holds ₦2,000. You spend ₦5,500, then get ₦1,500. What is the balance, in naira?
P: Negative numbers in real life
A: -2000 | −2000 | -2,000 | −2,000 | -₦2,000 | −₦2,000
= $2{,}000 - 5{,}500 + 1{,}500 = -2{,}000$. You're ₦2,000 overdrawn.

Q[transfer]: In a statistics table, a score is 5 points below the average, so its score minus the average is −5. What is that difference squared?
P: Order of operations with negatives
A: 25
= $(-5)^2 = 25$. Squaring stops differences below and above the average from cancelling each other out, which you'll use in standard deviation.

# Cards
Which is bigger, −7 or −2? :: −2. It's further right on the number line.
What's subtracting a negative the same as? :: Adding. $5 - (-3) = 5 + 3$.
What's the sign rule for multiplying? :: Same signs give a positive. Different signs give a negative.
What's the difference between $(-3)^2$ and $-3^2$? :: $(-3)^2 = 9$. $-3^2 = -9$, because the power goes first.
How do you work out a change? :: Final minus start. A negative result means a fall.

# Further
- OpenStax Prealgebra 2e, Introduction to integers :: https://openstax.org/books/prealgebra-2e/pages/3-1-introduction-to-integers
- OpenStax Prealgebra 2e, Multiply and divide integers :: https://openstax.org/books/prealgebra-2e/pages/3-4-multiply-and-divide-integers
