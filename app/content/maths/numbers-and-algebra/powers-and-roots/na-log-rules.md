---
id: na-log-rules
pack: Numbers and Algebra · Powers and roots
title: Rules of logarithms
minutes: 40
source: OpenStax · College Algebra 2e · Section 6.5
url: https://openstax.org/books/college-algebra-2e/pages/6-5-logarithmic-properties
courses: The base of all later maths and statistics
format: 2
teaches: log-product-rule; log-quotient-rule; log-power-rule; change-of-base; solve-for-exponent
uses: logarithm-meaning; log-exponent-conversion; multiply-powers; divide-powers; power-of-power; percent-change
---
# Goal
Use the three log rules to simplify and calculate, change the base, and use logs to solve for an unknown power, such as how long a debt takes to double.

# Why
Logs turn multiplying into adding, which is why they're used so often: statistics adds logs of probabilities instead of multiplying tiny numbers that a computer can't hold. They're also the only way to get at an unknown exponent. How many months until a loan doubles? How long until a population reaches a figure? These are questions about exponents, and only logs can answer them.

# Warm-up
?? What is $\log_2 8$?
=> 3.

?? Simplify $x^3 \times x^4$.
=> $x^7$.

# Lesson
## Three rules
All the rules come from the rules of powers, since a log is an exponent. Exponents add when you multiply, so logs do too. Throughout, the base is positive and isn't 1, and $x$ and $y$ are positive.

| Rule | Log rule | Where it comes from |
| --- | --- | --- |
| Product | $\log_b(xy) = \log_b x + \log_b y$ | $b^m \times b^n = b^{m+n}$ |
| Quotient | $\log_b\left(\frac{x}{y}\right) = \log_b x - \log_b y$ | $b^m \div b^n = b^{m-n}$ |
| Power | $\log_b(x^n) = n \log_b x$ | $(b^m)^n = b^{mn}$ |

### Why the product rule works
Let $\log_2 8 = 3$ and $\log_2 16 = 4$. That means $8 = 2^3$ and $16 = 2^4$. Multiply them:

$$8 \times 16 = 2^3 \times 2^4 = 2^{3+4} = 2^7 = 128$$

So $\log_2 128 = 7 = 3 + 4$. The log of the product is the sum of the logs.

### Trying them out
| Calculation | Using a rule | Answer |
| --- | --- | --- |
| $\log_2 4 + \log_2 8$ | $\log_2(4 \times 8) = \log_2 32$ | 5 |
| $\log_3 54 - \log_3 2$ | $\log_3(54 \div 2) = \log_3 27$ | 3 |
| $\log_{10} 1{,}000^5$ | $5 \log_{10} 1{,}000 = 5 \times 3$ | 15 |
| $\log_2 \sqrt{8}$ | $\log_2 8^{1/2} = \frac{1}{2} \times 3$ | 1.5 |

Reading the rules right to left is often the useful way.

> Mistake: Inventing a rule for a sum. $\log(x + y)$ isn't $\log x + \log y$. There's no simple rule for the log of a sum. Likewise, $\log x \times \log y$ isn't $\log(xy)$, and $\frac{\log x}{\log y}$ isn't $\log\left(\frac{x}{y}\right)$.

?? Write $\log_{10} 2 + \log_{10} 5$ as one log, and work it out.
=> $\log_{10}(2 \times 5) = \log_{10} 10 = 1$.

## Expanding and combining
Expanding breaks a log into pieces, using the rules.

$$\log_b\left(\frac{x^2 y}{z}\right) = 2\log_b x + \log_b y - \log_b z$$

Combining goes the other way. Handle the multipliers first.

$$3\log_2 x - \log_2 y = \log_2 x^3 - \log_2 y = \log_2\left(\frac{x^3}{y}\right)$$

This will return in statistics. A model that multiplies many probabilities is usually rewritten as adding their logs.

## Changing the base
Most calculators only have LOG (base 10) and LN (base $e$). To find a log in any other base, divide two logs:

$$\log_b x = \frac{\log x}{\log b}$$

The top and bottom can be in any one base, so use the same key for both.

$$\log_2 100 = \frac{\log 100}{\log 2} = \frac{2}{0.30103} \approx 6.64$$

Check it: $2^{6.64}$ is about 100. It's reasonable, as $2^6 = 64$ and $2^7 = 128$.

Many calculators do this with a special key today. It's still good to know why it works.

> Mistake: Writing it upside down. The base goes on the bottom. A check helps: $\log_2 100$ must be between 6 and 7, not below 1.

## Solving for a power
Here's what logs are really for. When the unknown is in the exponent, take the log of both sides, and the power rule brings it down.

### Worked example: when does it double?
You borrow ₦100,000 at 5% interest each month, and the interest is added each month. When does the debt reach ₦200,000?

After $n$ months, it's $100{,}000 \times 1.05^n$. We need:

$$100{,}000 \times 1.05^n = 200{,}000$$

Dividing both sides of an equation by the same number, as long as it isn't zero, keeps them equal. So divide both sides by 100,000: $1.05^n = 2$. Take logs of both sides, and use the power rule:

$$n \log 1.05 = \log 2$$

Now divide both sides by $\log 1.05$:

$$n = \frac{\log 2}{\log 1.05} = \frac{0.30103}{0.02119} \approx 14.2$$

So it takes about 14.2 periods. Since interest is added once a month, the debt first passes ₦200,000 at the end of month 15. The numbers here are invented, but you can run this on any real offer.

### A quick estimate for doubling
Divide 72 by the percentage rate to estimate the doubling time. For 5%, it gives $72 \div 5 = 14.4$ periods, which is close. This is the "rule of 72", and it's quick to use on any offer.

### Worked example: a plain equation
Solve $3^x = 20$. Take logs: $x \log 3 = \log 20$. So $x = \frac{\log 20}{\log 3} = \frac{1.30103}{0.47712} \approx 2.73$. Check: $3^{2.73}$ is about 20.

### Why this is worth it
Here's why logs help a computer. The chance of 5,000 independent events all happening might be $(\frac{1}{2})^{5000}$, which is too small for a computer to hold in the usual way, so it comes out as 0. Adding logs avoids that:

```python
import math
print(0.5 ** 5000)
print(5000 * math.log10(0.5))
```

```output
0.0
-1505.149978319906
```

You'll learn Python in a later course, so just read the results. The first says 0, which is wrong. The second tells us the true answer is about $10^{-1505}$, using just one multiplication.

# Exercises
?? Work out $\log_6 4 + \log_6 9$.
=> $\log_6 36 = 2$.

?? Work out $\log_2 40 - \log_2 5$.
=> $\log_2 8 = 3$.

?? Work out $\log_5 25^3$.
=> $3 \log_5 25 = 3 \times 2 = 6$.

?? Expand $\log_b(x^3 y^2)$.
=> $3\log_b x + 2\log_b y$.

?? Solve $2^x = 50$, to 2 decimal places.
=> $x = \frac{\log 50}{\log 2} = \frac{1.69897}{0.30103} \approx 5.64$.

?? At 8% per year, about how long does money take to double, using the rule of 72?
=> $72 \div 8 = 9$ years.

# Practice
1. Prove the product rule in your own words on paper, using your own two powers of 3.
2. Take a real interest rate or a rate from a real offer. Use the rule of 72, then solve it exactly with logs on your calculator. How close are they?
3. Pick a real target: for example, how many years until a sum you'd save at a real savings rate reaches some goal. Write the equation, and solve it for the time.
4. Test the mistake: use your calculator to compare $\log(2 + 3)$ with $\log 2 + \log 3$. Then compare $\log(2 \times 3)$ with $\log 2 + \log 3$.

Write your rate, your two doubling answers and your target equation with its result. These are estimates to learn from, and aren't financial advice.

# Rubric
- I proved the product rule with my own numbers.
- I solved for an unknown power on a real rate, using logs.
- I tested a common mistake with my calculator.

# Summary
- The log of a product is a sum, and the log of a quotient is a difference.
- $\log(x^n) = n\log x$. It brings a power down.
- There's no rule for the log of a sum.
- To change the base, $\log_b x = \frac{\log x}{\log b}$.
- To solve for an unknown power, take logs of both sides.
- Doubling time is about $72 \div$ the percentage rate.

# Check
Q: Write $\log_2 4 + \log_2 8$ as one number.
P: Three rules
A: 5 | five
= $\log_2 32 = 5$. Or $2 + 3 = 5$.

Q: What is $\log_{10} 500 + \log_{10} 2$?
P: Three rules
A: 3 | three
= $\log_{10} 1{,}000 = 3$.

Q: What is $\log_3 45 - \log_3 5$?
P: Three rules
A: 2 | two
= $\log_3 9 = 2$.

Q: What is $\log_2 8^{{n}}$?
P: Three rules
Vars: n=2..12
F: 3*n
= The power comes down: {n} × $\log_2 8$ = {n} × 3 = {3*n}.

Q: Which is equal to $\log(x + y)$ for all positive $x$ and $y$?
P: Three rules
- $\log x + \log y$
- $\log x \times \log y$
* Neither, as no simple rule exists for this
= The rules cover products, quotients and powers. A sum has no rule.

Q: Which expands $\log_b(x^2 / y)$ correctly?
P: Expanding and combining
* $2 \log_b x - \log_b y$
- $2 \log_b x + \log_b y$
- $\log_b 2x - \log_b y$
= The power comes down, and division becomes subtraction.

Q: Using $\log 2 \approx 0.301$ and $\log 8 \approx 0.903$, what's $\log_2 8$ from the change of base?
P: Changing the base
A: 3 | three
= $0.903 \div 0.301 = 3$.

Q: To solve $5^x = 40$, what's the correct next step?
P: Solving for a power
- Divide both sides by 5 to remove the 5
* Take logs of both sides, to bring $x$ down
- Take the square root of both sides of the equation
= With the unknown in the exponent, logs bring it down: $x = \frac{\log 40}{\log 5}$.

Q[transfer]: A savings offer pays 6% each year, compounded. Using the rule of 72, about how many years does it take to double?
P: Solving for a power
A: 12 | 12 years
= $72 \div 6 = 12$. Check any offer this way.

Q[transfer]: A loan offer charges 10% a month, compounded. Using the rule of 72, about how long until what you owe doubles?
P: Solving for a power
A: 7 | 7.2 | 7 months | 7.2 months | about 7 months
= $72 \div 10 = 7.2$ months. The exact answer, $\frac{\log 2}{\log 1.1}$, is about 7.27 periods, so with interest added monthly, the debt first doubles at month 8. That's fast.

Q[transfer]: Why do statistical programs usually add logs of probabilities instead of multiplying the probabilities?
P: Solving for a power
- Because adding always produces a bigger and more useful number than multiplying
* Because multiplying many tiny probabilities can come out as 0 on a computer
- Because logs turn all of the probabilities into exact whole numbers
= The product can be too small to store. Logs keep the value in a safe range.

# Cards
What's $\log_b(xy)$? :: $\log_b x + \log_b y$. Logs turn multiplying into adding.
What's $\log_b(x / y)$? :: $\log_b x - \log_b y$.
What's $\log_b(x^n)$? :: $n \log_b x$. The power comes down.
Is there a rule for $\log(x + y)$? :: No.
How do you change the base? :: $\log_b x = \frac{\log x}{\log b}$.
How do you solve $3^x = 20$? :: Take logs: $x = \frac{\log 20}{\log 3}$.
What's the rule of 72? :: Doubling time is about 72 ÷ the percentage rate.

# Further
- OpenStax College Algebra 2e, Logarithmic properties :: https://openstax.org/books/college-algebra-2e/pages/6-5-logarithmic-properties
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
