---
id: na-variables
pack: Numbers and Algebra · First algebra
title: Letters that stand for numbers
minutes: 35
source: OpenStax · Prealgebra 2e · Section 2.1
url: https://openstax.org/books/prealgebra-2e/pages/2-1-use-the-language-of-algebra
courses: The base of all later maths and statistics
format: 2
teaches: variables; expressions; evaluate-expressions; algebra-notation; words-to-expressions
uses: bodmas; add-subtract-negatives; multiply-divide-negatives; power-meaning
---
# Goal
Say what a letter means in algebra, read and write expressions, substitute numbers into them, and turn words into symbols.

# Why
Algebra is a language for saying what's true of every number, not just one. A formula such as cost = price × quantity works for any purchase. Every spreadsheet formula, every line of code and every statistical model is written this way. A cell reference and a program variable are both letters standing for numbers, so what you learn here you'll use for the rest of your degree.

# Warm-up
?? Work out $3 + 4 \times 5$.
=> 23. Multiply first.

?? Work out $(-2)^2$.
=> 4.

# Lesson
## A letter is a number we haven't named yet
A **variable** is a letter that stands for a number. The number may be unknown, or it may change. If a data bundle costs ₦500, then $n$ bundles cost $500n$ naira. The letter $n$ can be any number of bundles.

| Bundles $n$ | Cost $500n$ |
| --- | --- |
| 1 | ₦500 |
| 3 | ₦1,500 |
| 10 | ₦5,000 |

One short line handles every case. That's the point of algebra.

A letter isn't an object. $n$ isn't "bundles" or "naira". It's "the number of bundles". The mistake of thinking of $a$ as "apples" causes trouble later, so be careful about this from the start.

An **expression** is a mix of numbers, letters and operations, such as $500n + 200$. It has no equals sign, and it doesn't claim anything. It's just a value, depending on $n$.

## How algebra is written
Algebra has a few shorthand habits you need to read.

| Written | Means | Note |
| --- | --- | --- |
| $3x$ | $3 \times x$ | Side by side means multiply |
| $xy$ | $x \times y$ | No sign at all |
| $x$ | $1x$ | The 1 isn't written |
| $-x$ | $-1 \times x$ | The opposite of $x$ |
| $\frac{x}{2}$ | $x \div 2$ | The bar means divide |
| $x^2$ | $x \times x$ | Power |
| $2(x + 3)$ | $2 \times (x + 3)$ | A number next to a bracket |

The number multiplying a letter is called its **coefficient**: in $5x$, it's 5. A number on its own, such as the 7 in $5x + 7$, is a **constant**.

Pieces joined by $+$ or $-$ are **terms**. In $5x + 7 - 2y$, the terms are $5x$, $7$ and $-2y$. A minus sign belongs to the term that follows it.

> Mistake: Reading $3x$ with $x = 4$ as 34. Side by side means multiply when a letter is involved, so it's $3 \times 4 = 12$.

?? In $4a - 9b + 2$, what's the coefficient of $b$? What's the constant?
=> The coefficient of $b$ is −9. The constant is 2.

## Substituting
To **substitute** means to replace each letter with its number, then calculate using BODMAS. Use brackets whenever you put in a negative number. That prevents most sign errors.

### Worked example: $2x^2 - 3y$ with $x = -3$ and $y = 4$
| Step | Result |
| --- | --- |
| Put in brackets | $2(-3)^2 - 3(4)$ |
| Power first | $2(9) - 3(4)$ |
| Multiply | $18 - 12$ |
| Subtract | $6$ |

> Mistake: Skipping the brackets. Typing $-3^2$ gives −9, but what's needed is $(-3)^2 = 9$.

### Using a formula
A **formula** connects quantities with an equals sign. The formula for the average of two values is $m = \frac{a + b}{2}$. If $a = 40$ and $b = 70$, then $m = \frac{110}{2} = 55$.

Compound interest, which you've met already, has the formula $A = P(1 + r)^n$. For $P = 10{,}000$, $r = 0.1$ and $n = 2$:

$$A = 10{,}000 \times 1.1^2 = 12{,}100$$

?? If $p = 3$ and $q = -2$, work out $p - q$ and $pq$.
=> $p - q = 3 - (-2) = 5$. $pq = 3 \times (-2) = -6$.

## From words to symbols
Turning words into algebra is a skill you can practise. Work out what the unknown is, name it, and then follow the words.

| Words | Expression |
| --- | --- |
| 5 more than $x$ | $x + 5$ |
| 5 less than $x$ | $x - 5$ |
| Twice $x$ | $2x$ |
| Half of $x$ | $\frac{x}{2}$ |
| $x$ squared, plus 1 | $x^2 + 1$ |
| 3 times the sum of $x$ and 4 | $3(x + 4)$ |
| The sum of 3 times $x$ and 4 | $3x + 4$ |

> Mistake: Reversing "less than". 5 less than $x$ is $x - 5$, not $5 - x$. Try it: 5 less than 20 is 15, which is $20 - 5$.

### Worked example: a real cost
A taxi costs ₦300 to enter, plus ₦150 per km. These prices are invented. Let $d$ be the distance in km. The cost in naira is:

$$C = 300 + 150d$$

For 8 km, $C = 300 + 150 \times 8 = 1{,}500$, so ₦1,500. If you're unsure about a formula, test it on an easy number. At 0 km, you should pay just the entry fee, and $C = 300$. That's right.

## The same idea in other tools
In a spreadsheet, `=300+150*B2` is the same expression, with cell B2 standing in for $d$. In Python, a language you'll learn in a later course, it looks like this. You don't need to know it yet, so just read it.

```python
d = 8
cost = 300 + 150 * d
print(cost)
```

```output
1500
```

One difference matters. In a program, `=` means "store this value". In maths, `=` says that two things are equal. So in code, `d = d + 1` is normal, and in maths it would be false.

# Exercises
?? Write an expression for the total cost of $x$ notebooks at ₦350 each and one pen at ₦100.
=> $350x + 100$.

?? Find the value of $4a - b$ when $a = 2$ and $b = -3$.
=> $8 - (-3) = 11$.

?? Find the value of $x^2 + 2x + 1$ when $x = -4$.
=> $16 - 8 + 1 = 9$.

?? Write "7 less than twice $y$" as an expression.
=> $2y - 7$.

?? If $A = lw$ is the area of a rectangle, what's the area when $l = 12$ and $w = 5$?
=> 60.

# Practice
1. Choose something real you pay for with a fixed part and a part that varies: a phone plan, transport, or rent plus electricity. Name your letter, saying exactly what it stands for, with its units.
2. Write the expression for the total cost.
3. Test it with an easy value, such as 0 or 1, and see that it makes sense.
4. Substitute three real values, and make a small table.
5. Make the same formula in a spreadsheet, if you have one, using a cell for your letter. Change the cell and see the answer change.

Write your letter's meaning, your formula and your table.

# Rubric
- I defined my letter as a number, with its units, not as an object.
- I wrote a real formula and tested it on an easy value.
- I substituted real values and made a table.

# Summary
- A variable is a letter that stands for a number.
- An expression has no equals sign. A formula connects quantities with one.
- $3x$ means $3 \times x$, and $x$ means $1x$.
- Substitute with brackets around negatives, then use BODMAS.
- 5 less than $x$ is $x - 5$.
- Test a formula on an easy number.

# Check
Q: What does $4y$ mean?
P: How algebra is written
- 4 added to $y$
* 4 multiplied by $y$
- A number with a 4 in the tens place
= Side by side means multiply.

Q: In $7x - 3y + 5$, what's the coefficient of $y$?
P: How algebra is written
A: -3 | −3
= The minus sign belongs to the term that follows it.

Q: If $x = {a}$, what is $3x + 2$?
P: Substituting
Vars: a=2..20
F: 3*a+2
= 3 × {a} + 2 = {3*a+2}.

Q: If $x = -{a}$, what is $x^2$?
P: Substituting
Vars: a=2..12
F: a*a
= Squaring a negative gives a positive: {a} × {a} = {a*a}.

Q: If $a = 5$ and $b = -2$, what is $a - 3b$?
P: Substituting
A: 11
= $5 - 3(-2) = 5 + 6 = 11$.

Q: Which is "4 less than three times $n$"?
P: From words to symbols
- $4 - 3n$
* $3n - 4$
- $3(n - 4)$
= Start with $3n$, then take 4 away.

Q: Which is "twice the sum of $x$ and 6"?
P: From words to symbols
- $2x + 6$
* $2(x + 6)$
- $x + 12x$
= "The sum" happens first, so it goes in a bracket.

Q: Match each expression to its meaning.
P: How algebra is written
M: $2x$ => twice $x$
M: $x^2$ => $x$ times $x$
M: $x + 2$ => 2 more than $x$
M: $\frac{x}{2}$ => half of $x$
= The notation has to be read exactly.

Q[transfer]: A program has the line `total = total + 500`. A student says this is impossible because no number equals itself plus 500. What's the right explanation?
P: The same idea in other tools
- The student is right, and the line will always cause an error when it runs
* In code, `=` stores a new value, and doesn't state that two things are equal
- In code, numbers are treated as text, so adding 500 only joins the characters
= In code, `=` means store. The new total replaces the old one.

Q[transfer]: In a spreadsheet, B2 holds the km, and you type `=300+150*B2`. If B2 is 4, what does the cell show?
P: The same idea in other tools
A: 900
= $300 + 150 \times 4 = 900$. A cell is just a named number, like a variable.

Q[transfer]: A student defines "let $a$ = apples" and writes $3a + 2a = 5a$ to mean 5 apples. Why is it better to say "let $a$ be the price of an apple in naira"?
P: A letter is a number we haven't named yet
- Because letters can only ever be used for prices and never for any objects
* Because a letter stands for a number, so it needs to say what number it is
- Because the expression $3a + 2a$ gives a different result when the letter is a price
= Clear definitions prevent errors. A letter is a number with a meaning.

# Cards
What is a variable? :: A letter that stands for a number that may be unknown or may change.
What's the difference between an expression and a formula? :: An expression has no equals sign. A formula connects quantities using one.
What does $3x$ mean? :: $3 \times x$.
What's a coefficient? :: The number multiplying a letter.
Why use brackets when substituting a negative? :: To avoid sign errors, such as $(-3)^2 = 9$ against $-3^2 = -9$.
How do you write "5 less than $x$"? :: $x - 5$.

# Further
- OpenStax Prealgebra 2e, Use the language of algebra :: https://openstax.org/books/prealgebra-2e/pages/2-1-use-the-language-of-algebra
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
