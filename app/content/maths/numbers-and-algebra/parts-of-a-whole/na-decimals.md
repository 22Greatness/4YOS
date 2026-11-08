---
id: na-decimals
pack: Numbers and Algebra · Parts of a whole
title: Decimals
minutes: 45
source: OpenStax · Prealgebra 2e · Section 5.1
url: https://openstax.org/books/prealgebra-2e/pages/5-1-decimals
courses: The base of all later maths and statistics
format: 2
teaches: decimal-place-value; decimal-arithmetic; fraction-to-decimal; recurring-decimals; significant-figures
uses: read-large-numbers; round-numbers; long-multiplication; long-division; fraction-meaning; simplify-fractions
---
# Goal
Read, compare, round and calculate with decimals, move between decimals and fractions, and round sensibly.

# Why
Money is written in decimals, and so is almost every measurement and statistic. Calculators and computers give results as decimals, so you have to read them correctly and decide how much to keep. In statistics, you report results to a suitable number of decimal places, and programs can show strange decimal results that you'll need to understand.

# Warm-up
?? What is the 7 worth in 4,725?
=> 700.

?? Round 3,960 to the nearest hundred.
=> 4,000.

# Lesson
## Places after the point
Place value doesn't stop at the ones. Each place is worth ten times the one to its right, so the place to the right of the ones must be worth one tenth. A **decimal point** marks where the ones end.

| Tens | Ones | . | Tenths | Hundredths | Thousandths |
| --- | --- | --- | --- | --- | --- |
| 4 | 7 | . | 3 | 0 | 5 |

So $47.305$ means 4 tens, 7 ones, 3 tenths, no hundredths and 5 thousandths.

$$47.305 = 40 + 7 + \frac{3}{10} + \frac{0}{100} + \frac{5}{1000}$$

Read it as "forty-seven point three zero five", saying each digit after the point on its own. For money, ₦47.50 is 47 naira and 50 kobo, since a kobo is one hundredth of a naira.

### Comparing decimals
Compare from the left, place by place, the same as with whole numbers. You can add zeros to the end of a decimal without changing its value, which makes lengths match.

Which is bigger, 0.7 or 0.65? Write 0.70 and 0.65. Then 70 hundredths beats 65 hundredths.

> Mistake: Thinking that longer means bigger. 0.65 has more digits than 0.7, but 0.7 is bigger. This rule was for whole numbers only.

## Adding, subtracting, multiplying, dividing
### Adding and subtracting
Line up the **decimal points**, which lines up each place. Fill gaps with zeros.

$$\begin{array}{r} 12.50 \\ +\ 3.75 \\ \hline 16.25 \end{array}$$

### Multiplying
Ignore the points and multiply as whole numbers. Then count the decimal places in both starting numbers, and give the answer that many.

For $0.3 \times 0.04$: $3 \times 4 = 12$. There's 1 decimal place plus 2, which is 3 in all. So the answer is $0.012$.

It makes sense as fractions: $\frac{3}{10} \times \frac{4}{100} = \frac{12}{1000}$.

### Multiplying and dividing by 10, 100, 1,000
Digits shift places. Times 10 moves each digit one place left, and divide by 10 moves it one place right: $4.72 \times 100 = 472$, and $4.72 \div 10 = 0.472$.

### Dividing
To divide by a decimal, multiply both numbers by 10 or 100 until the divisor is a whole number. This doesn't change the answer, for the same reason equivalent fractions work.

$$1.5 \div 0.25 = 150 \div 25 = 6$$

To divide into a decimal, use long division and keep the point in place. To continue after running out of digits, add zeros: $7 \div 4$ gives $1.75$, as $7.00 \div 4 = 1.75$.

?? Work out $2.4 \times 0.5$.
=> $24 \times 5 = 120$, with 2 decimal places: $1.20$, which is $1.2$.

## Fractions and decimals
### Decimal to fraction
Read the place value, then simplify. $0.35$ is 35 hundredths: $\frac{35}{100} = \frac{7}{20}$.

### Fraction to decimal
The bar means divide, so divide top by bottom: $\frac{3}{8} = 3 \div 8 = 0.375$.

Some useful ones to know:

| Fraction | Decimal |
| --- | --- |
| $\frac{1}{2}$ | 0.5 |
| $\frac{1}{4}$ | 0.25 |
| $\frac{3}{4}$ | 0.75 |
| $\frac{1}{5}$ | 0.2 |
| $\frac{1}{8}$ | 0.125 |
| $\frac{1}{10}$ | 0.1 |

### Decimals that never end
Try $1 \div 3$. The long division keeps giving a remainder of 1, so the 3s go on forever: $0.333\ldots$ This is a **recurring decimal**, and we write it with a dot, $0.\dot{3}$, or a bar. Likewise, $\frac{2}{3} = 0.666\ldots$, and $\frac{1}{7} = 0.142857142857\ldots$

A fraction gives a recurring decimal when its simplest bottom has a prime factor other than 2 or 5. That's why $\frac{1}{3}$ never ends, while $\frac{1}{8}$ does. When you need an exact value, keep the fraction. $\frac{1}{3}$ is exact, and 0.33 isn't.

## Rounding decimals
It's the same rule as for whole numbers. Look at the next digit in the original number: 5 or more rounds up.

| Round 3.14159 to | Look at | Result |
| --- | --- | --- |
| 1 decimal place | 4, keep | 3.1 |
| 2 decimal places | 1, keep | 3.14 |
| 3 decimal places | 5, round up | 3.142 |

### Significant figures
Sometimes what matters is how many digits carry meaning, wherever the point is. **Significant figures** count from the first digit that isn't zero.

| Number | To 2 significant figures | Why |
| --- | --- | --- |
| 4,782 | 4,800 | Keep the 4 and the 7, and round up |
| 0.04782 | 0.048 | The leading zeros don't count |
| 306.5 | 310 | The zero inside counts: 3, 0, then round up |

Round only at the end of a calculation. Rounding early makes errors that build up. Don't report more digits than your data can support, either: an average of whole-number scores given as 67.482913 suggests a precision nobody has. Two or three decimal places is usually plenty.

> Mistake: Keeping a rounded value and calculating further with it. Keep the full value on your calculator until the last step.

## Decimals in a computer
Computers store most decimals in binary, and many values, like 0.1, can't be stored exactly, just as $\frac{1}{3}$ can't be written exactly in decimals. It's why a program can show a tiny error. You'll learn Python in a later course, so just read the result here.

```python
print(0.1 + 0.2)
print(round(0.1 + 0.2, 2))
```

```output
0.30000000000000004
0.3
```

This isn't a bug in the program. It's why you should round for display, and why serious money systems store amounts as whole kobo instead.

# Exercises
?? Write 5.06 in words, and say what the 6 is worth.
=> "Five point zero six". The 6 is worth six hundredths.

?? Work out $14.2 - 3.75$.
=> Write $14.20 - 3.75 = 10.45$.

?? Work out $0.6 \times 0.07$.
=> $6 \times 7 = 42$, with 3 decimal places: $0.042$.

?? Work out $3.6 \div 0.4$.
=> $36 \div 4 = 9$.

?? Write $\frac{7}{20}$ as a decimal, and $0.125$ as a fraction.
=> $7 \div 20 = 0.35$. $0.125 = \frac{125}{1000} = \frac{1}{8}$.

?? Round 0.08649 to 2 significant figures, and to 2 decimal places.
=> 0.086, and 0.09.

# Practice
1. Find three real prices or measurements with decimals: a fuel price, a data rate, your height in metres. Write each in words, and say what its last digit is worth.
2. Work out one real total that needs decimal multiplying, such as the cost of 2.5 litres at a real price per litre. Do it by hand, and check by calculator.
3. Use your calculator to find $\frac{2}{3}$ of something real. Round it to 2 decimal places, and write it as money.
4. Work out the same value in two ways: rounding at the end, then rounding early. Do you get a different result?

Write your calculations, and what you found about early rounding.

# Rubric
- I read real decimals and said what each digit is worth.
- I multiplied decimals by hand and counted the places correctly.
- I rounded at the end, and saw what early rounding does.

# Summary
- Places after the point are tenths, hundredths, thousandths.
- Longer doesn't mean bigger: $0.7 > 0.65$.
- To add or subtract, line up the points. To multiply, count the places in total.
- To divide by a decimal, scale until the divisor is whole.
- The bar means divide, so that's how you turn a fraction into a decimal. Some never end.
- Round at the last step only.

# Check
Q: What is the 3 worth in 12.039?
P: Places after the point
- Three tenths
* Three hundredths
- Three thousandths
= The first place after the point is tenths, and the second is hundredths.

Q: Which is the largest?
P: Places after the point
- 0.099
* 0.5
- 0.45
= Compare from the left: 5 tenths beats 4 tenths and 0 tenths.

Q: What is {a}.5 + {b}.25?
P: Adding, subtracting, multiplying, dividing
Vars: a=1..40, b=1..40
F: a+b+0.75
= Line up the points. 0.5 + 0.25 = 0.75, so the answer is {a+b+0.75}.

Q: What is $0.4 \times 0.2$?
P: Adding, subtracting, multiplying, dividing
A: 0.08 | .08
= $4 \times 2 = 8$, with 2 decimal places in all.

Q: What is $2.1 \div 0.3$?
P: Adding, subtracting, multiplying, dividing
A: 7 | seven
= Scale up to $21 \div 3$.

Q: Write 0.45 as a fraction in simplest form a/b.
P: Fractions and decimals
A: 9/20
= $\frac{45}{100} = \frac{9}{20}$.

Q: Write $\frac{5}{8}$ as a decimal.
P: Fractions and decimals
A: 0.625 | .625
= $5 \div 8 = 0.625$.

Q: Round 27.8461 to 2 decimal places.
P: Rounding decimals
A: 27.85
= The next digit is 6, so round up.

Q: Round 0.003071 to 2 significant figures.
P: Rounding decimals
A: 0.0031 | .0031
= Leading zeros don't count. Keep the 3 and the 0, and the next digit, 7, rounds the 0 up.

Q[transfer]: A calculator shows $0.333333$ for $\frac{1}{3}$. You multiply that by 3 and get $0.999999$. What happened?
P: Fractions and decimals
- The calculator is broken, and it should be replaced before the exam
* The display cut a recurring decimal short, so a small error remains
- $\frac{1}{3}$ times 3 really does come to less than one whole
= $\frac{1}{3}$ is exact, and 0.333333 isn't. This is why you keep fractions when you can, and round last.

Q[transfer]: A report gives an average score as 67.482913, where the scores were whole numbers out of 100. What's a better way to report it?
P: Rounding decimals
* 67.5, because more digits than that claim precision that isn't there
- 67.482913, because a report should always include all the digits it has
- 60, because scores need rounding to the nearest ten to be useful
= One or two decimal places are enough. Extra digits give a false impression of accuracy.

Q[transfer]: Fuel costs ₦850 per litre and you buy 2.5 litres. What do you pay, in naira?
P: Adding, subtracting, multiplying, dividing
A: 2125 | 2,125 | ₦2,125 | ₦2125
= $850 \times 2.5 = 850 \times 2 + 850 \times 0.5 = 1{,}700 + 425$. The price here is invented for the question.

# Cards
What are the first three places after the point? :: Tenths, hundredths and thousandths.
Which is bigger, 0.7 or 0.65? :: 0.7, as it's 70 hundredths against 65.
How do you place the point when multiplying decimals? :: Count the decimal places in both numbers. The answer has that many in total.
How do you divide by a decimal? :: Multiply both numbers by 10 or 100 until the divisor is whole.
How do you turn a fraction into a decimal? :: Divide the top by the bottom.
What do significant figures count from? :: The first digit that isn't zero.

# Further
- OpenStax Prealgebra 2e, Decimals :: https://openstax.org/books/prealgebra-2e/pages/5-1-decimals
- Khan Academy, Algebra basics :: https://www.khanacademy.org/math/algebra-basics
