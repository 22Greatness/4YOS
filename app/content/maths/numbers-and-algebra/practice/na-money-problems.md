---
id: na-money-problems
pack: Numbers and Algebra · Practice
title: Algebra on real money problems
minutes: 60
source: OpenStax · Prealgebra 2e · Section 6.1
url: https://openstax.org/books/prealgebra-2e/pages/6-1-understand-percent
courses: The base of all later maths and statistics
format: 2
teaches: budget-formula; simple-and-compound-interest; total-cost-of-a-loan; break-even-model; real-value
uses: percent-of-amount; percent-change; set-up-equations; solve-linear; solve-inequalities; solve-for-exponent; elimination; evaluate-expressions; change-subject
---
# Goal
Write a real budget as formulas, work out what a loan really costs, compare offers, and find a break-even point, all with the algebra you've already learned.

# Why
Money is where algebra pays for itself straight away. An offer that looks cheap can cost twice as much once you calculate it. A budget written as a formula can be tested and changed in seconds. This lesson also prepares you for the course project. Every number below that isn't yours is invented, and these are maths exercises, not financial advice.

# Warm-up
?? What is 5% of ₦40,000?
=> ₦2,000.

?? What's $10{,}000 \times 1.1^2$?
=> 12,100.

# Lesson
## A budget as formulas
A budget is a formula with named quantities. Separate what's fixed from what varies.

Let $w$ be the number of weeks, $t$ the weekly transport cost, $d$ the monthly data cost, $f$ the weekly food cost and $I$ the income for the period. Over a month of about 4 weeks:

$$\text{Left over} = I - (4t + 4f + d)$$

With $I = 80{,}000$, $t = 5{,}000$, $f = 10{,}000$ and $d = 6{,}000$:

$$80{,}000 - (20{,}000 + 40{,}000 + 6{,}000) = 14{,}000$$

So ₦14,000 is left over. Now questions become easy algebra.

**How high can food go before you run out?** Set left over to at least 0, and solve:

$$80{,}000 - 20{,}000 - 4f - 6{,}000 \ge 0 \quad\Rightarrow\quad 54{,}000 \ge 4f \quad\Rightarrow\quad f \le 13{,}500$$

**How long to save ₦70,000 at this rate?** $14{,}000m = 70{,}000$, so $m = 5$ months.

If you use a spreadsheet, put each letter in its own cell, and write the formula with cell names. Then changing one number updates everything.

## Simple and compound interest
**Simple interest** is charged on the starting amount only. With a starting amount $P$, a rate $r$ per period, and $n$ periods:

$$A = P(1 + rn)$$

**Compound interest** is charged on the growing amount, including earlier interest:

$$A = P(1 + r)^n$$

For ₦100,000 at 10% per period:

| Periods | Simple | Compound |
| --- | --- | --- |
| 1 | ₦110,000 | ₦110,000 |
| 2 | ₦120,000 | ₦121,000 |
| 5 | ₦150,000 | ₦161,051 |
| 10 | ₦200,000 | ₦259,374 |
| 20 | ₦300,000 | ₦672,750 |

```chart
{"kind":"line","alt":"Compound growth of 100,000 at 10 percent per period over 20 periods. It rises gently at first, and reaches about 672,750 at period 20, curving ever more steeply.","note":"Worked out from the compound interest formula, using invented amounts.","x":"period","y":"amount","xLabel":"Periods","yLabel":"Amount in naira","data":[{"period":0,"amount":100000},{"period":2,"amount":121000},{"period":4,"amount":146410},{"period":6,"amount":177156},{"period":8,"amount":214359},{"period":10,"amount":259374},{"period":12,"amount":313843},{"period":14,"amount":379750},{"period":16,"amount":459497},{"period":18,"amount":555992},{"period":20,"amount":672750}]}
```

The same curve works for you when you save, and against you when you borrow.

> Mistake: Comparing a monthly rate with a yearly rate. 5% per month isn't 60% per year when compounded. It's $1.05^{12} \approx 1.80$, so about 80% per year. Always get both rates onto the same period.

?? ₦50,000 grows at 8% per year, compounded. How much is there after 2 years?
=> $50{,}000 \times 1.08^2 = 58{,}320$, so ₦58,320.

## What a loan really costs
To compare offers, work out the **total you pay back**, then subtract what you borrowed. Ignore how friendly the small numbers look.

### Worked example: three offers
You need ₦100,000, and three lenders make these invented offers. All of them take 6 months.

| Offer | Terms | You pay in total | Cost of borrowing |
| --- | --- | --- | --- |
| A | ₦20,000 a month for 6 months | ₦120,000 | ₦20,000 |
| B | 5% interest per month, compounded, paid all at the end | $100{,}000 \times 1.05^6 \approx$ ₦134,010 | ₦34,010 |
| C | "Only ₦5,000 fee", plus ₦19,000 a month | $5{,}000 + 6 \times 19{,}000 =$ ₦119,000 | ₦19,000 |

C looks like it has an extra fee, and it's the cheapest. B has a small-looking rate, and it's the most expensive by far.

### The cost of a late payment
Suppose the same loan charges ₦2,000 per late week. Then late cost is $C = 2{,}000w$, a straight line. Whether that's acceptable depends on your income, and you can test it with your budget formula.

### Solving for the time
At what point does a compounded debt double? It's the same log method you've learned. For 5% per month: $n = \frac{\log 2}{\log 1.05} \approx 14.2$ months. Or use the rule of 72: $72 \div 5 = 14.4$.

## Break-even and comparing plans
### Two plans
Phone plan X costs ₦1,500 a month plus ₦10 per minute. Plan Y costs ₦500 a month plus ₦20 per minute. These plans are invented. Let $m$ be the minutes per month. When do they cost the same?

$$1{,}500 + 10m = 500 + 20m \quad\Rightarrow\quad 1{,}000 = 10m \quad\Rightarrow\quad m = 100$$

Below 100 minutes, Y is cheaper. Above 100 minutes, X is. Your real use decides it. This is simultaneous equations again, with the lines crossing at the break-even point.

### A small business
You make items for ₦800 each, sell at ₦1,500 and have fixed costs of ₦35,000 a month.

$$\text{Profit} = 1{,}500n - 800n - 35{,}000 = 700n - 35{,}000$$

Break-even is at $700n = 35{,}000$, so $n = 50$ items. To earn ₦50,000 profit, you need $700n - 35{,}000 = 50{,}000$, so $n \approx 122$ items, rounded up. The formula can't tell you whether you can sell that many. That's the real question it leaves for you.

## Real value and bad claims
### Inflation
If prices rise 20% a year and your savings grow 10%, then you're losing buying power, even though the naira figure goes up. Your real change is:

$$\frac{1.10}{1.20} \approx 0.917$$

So your money buys about 8.3% less after a year. This matters when comparing any savings offer with rising prices.

### Spotting impossible offers
You now have the tools to test a claim quickly.

"Invest ₦10,000, and get ₦20,000 in a month." That's 100% a month. After 12 months at that rate, ₦10,000 would have become $10{,}000 \times 2^{12} = 40{,}960{,}000$. No normal business can grow that fast, and it's how many scams are described. Paying early people from later people's money is a typical way of keeping them going until they collapse.

> Safety: This course can show you what a promise implies, and it can't tell you whether an offer is safe. Before putting money anywhere, check that the company is licensed by the proper regulator, and never send money because a calculation looks good.

# Exercises
?? ₦30,000 at 5% simple interest per year, for 4 years. What's the total?
=> $30{,}000(1 + 0.05 \times 4) = 36{,}000$, so ₦36,000.

?? The same ₦30,000 at 5% compound interest, for 4 years. What's the total?
=> $30{,}000 \times 1.05^4 \approx 36{,}465$, so ₦36,465.

?? A ₦50,000 loan needs 10 payments of ₦6,500. What's the cost of borrowing?
=> ₦65,000 − ₦50,000 = ₦15,000.

?? A plan costs ₦2,000 plus ₦50 per GB, and another costs ₦800 plus ₦90 per GB. At what use do they cost the same?
=> $2{,}000 + 50g = 800 + 90g$, so $1{,}200 = 40g$, and $g = 30$ GB.

?? Your income is ₦60,000, and your fixed costs are ₦42,000. You want to save at least ₦6,000. What's the most you can spend on everything else?
=> $60{,}000 - 42{,}000 - e \ge 6{,}000$, so $e \le 12{,}000$. So ₦12,000.

# Practice
Use your real numbers, or likely ones. You don't need to write any private amounts here.

1. Write your real month as a formula. Use a letter for each cost, and separate what's fixed from what varies.
2. Ask two questions of it, and solve them with algebra: what's the most you can spend on one thing, and how long will it take to reach a real goal?
3. Find one real offer or price plan, or two you could choose between: a data plan, a loan or a savings account. Work out the true total for each one, and when they cost the same.
4. Test one promise you've really heard or seen, using a power of 2 or compound growth. Write what it would imply after a year.

Write your formula's letters and meaning, your two answers, your comparison and what the promise implied.

# Rubric
- I wrote my real month as a formula and used it to answer two questions.
- I worked out the true total of real offers, and not just their small numbers.
- I tested a real promise by working out what it implies.

# Summary
- A budget is a formula. Name each quantity, and separate fixed from varying.
- Simple interest is $P(1 + rn)$. Compound is $P(1 + r)^n$.
- Compare offers by the total you pay back, over the same period.
- Break-even is where two formulas are equal.
- If savings grow more slowly than prices, you're losing buying power.
- Use algebra to test a promise. It can show what's impossible, but it can't prove what's safe.

# Check
Q: ₦{a}0,000 earns 10% simple interest per year for {n} years. What's the total interest? Enter the number only, without the ₦ sign.
P: Simple and compound interest
Vars: a=1..9, n=2..6
F: a*10000*0.1*n
= The interest is $P \times r \times n$: {a*10000} × 0.1 × {n} = {a*10000*0.1*n}.

Q: Which formula gives compound growth?
P: Simple and compound interest
- $A = P(1 + rn)$
* $A = P(1 + r)^n$
- $A = P + r + n$
= The power is what makes interest earn interest.

Q: ₦20,000 grows at 10% per period, compounded, for 2 periods. What's the total, in naira?
P: Simple and compound interest
A: 24200 | 24,200 | ₦24,200 | ₦24200
= $20{,}000 \times 1.1^2 = 24{,}200$.

Q: A ₦40,000 loan is repaid in 8 payments of ₦6,000. What's the cost of borrowing, in naira?
P: What a loan really costs
A: 8000 | 8,000 | ₦8,000 | ₦8000
= ₦48,000 − ₦40,000.

Q: What's the fairest way to compare two loan offers?
P: What a loan really costs
- Choose the offer with the smallest interest rate written on it
* Work out the total you'd pay back on each, over the same period
- Choose the offer with the smallest payment required each month
= Rates and small payments can both mislead you. Total cost is what counts.

Q: Plan X is ₦1,000 plus ₦5 per unit. Plan Y is ₦400 plus ₦8 per unit. At how many units do they cost the same?
P: Break-even and comparing plans
A: 200 | 200 units
= $1{,}000 + 5u = 400 + 8u$, so $600 = 3u$.

Q: Items cost ₦300 to make and sell at ₦500, with fixed costs of ₦20,000. What's the break-even number of items?
P: Break-even and comparing plans
A: 100 | 100 items
= $200n = 20{,}000$.

Q: Your income is $I$, and your costs are $c$. Which says you've got at least ₦5,000 left?
P: A budget as formulas
* $I - c \ge 5{,}000$
- $I - c \le 5{,}000$
- $c - I \ge 5{,}000$
= At least means $\ge$, and what's left is income minus costs.

Q: Savings grow 10% in a year, and prices rise 20%. What happens to your buying power?
P: Real value and bad claims
- It goes up, because your naira amount has gone up
* It goes down, because prices rose faster than your savings
- It stays the same, because the two changes cancel out
= $1.10 \div 1.20 \approx 0.917$, so you can buy about 8% less.

Q[transfer]: Someone offers to double your money every month. Starting with ₦5,000, what would that imply after 10 months, in naira?
P: Real value and bad claims
A: 5120000 | 5,120,000 | ₦5,120,000 | ₦5120000
= $5{,}000 \times 2^{10} = 5{,}120{,}000$. That's far beyond what a normal investment returns, so be very suspicious.

Q[transfer]: A loan charges 4% a month, compounded. Using the rule of 72, about how many months until the debt doubles?
P: What a loan really costs
A: 18 | 18 months
= $72 \div 4 = 18$. The exact value, $\frac{\log 2}{\log 1.04}$, is about 17.7.

Q[transfer]: A lender quotes "only 5% per month", and a bank quotes "30% per year". Which statement is correct?
P: Simple and compound interest
* 5% per month compounds to about 80% per year, so it's far more
- They're about the same, as 5% times 12 is 60%, and that's near enough
- The monthly rate is smaller, so the monthly offer is sure to be cheaper
= $1.05^{12} \approx 1.80$. Always compare over the same period.

# Cards
What's the simple interest formula? :: $A = P(1 + rn)$.
What's the compound interest formula? :: $A = P(1 + r)^n$.
How should you compare loan offers? :: By the total paid back, over the same period.
What's a break-even point? :: The value at which two formulas are equal.
What does it mean if prices rise faster than your savings? :: You're losing buying power.
What's a quick test of a big promise? :: Work out what it implies after a year.

# Further
- OpenStax Prealgebra 2e, Understand percent :: https://openstax.org/books/prealgebra-2e/pages/6-1-understand-percent
- OpenStax Elementary Algebra 2e, Solve systems of equations by elimination :: https://openstax.org/books/elementary-algebra-2e/pages/5-3-solve-systems-of-equations-by-elimination
