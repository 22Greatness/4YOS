---
id: na-factorising
pack: Numbers and Algebra · Polynomials and quadratics
title: Factorising
minutes: 45
source: OpenStax · Elementary Algebra 2e · Section 7.1
url: https://openstax.org/books/elementary-algebra-2e/pages/7-1-greatest-common-factor-and-factor-by-grouping
courses: The base of all later maths and statistics
format: 2
teaches: common-factor; factor-trinomial; factor-difference-of-squares; factor-non-monic; factor-by-grouping
uses: expand-two-brackets; perfect-squares; difference-of-squares; hcf; factors; multiply-powers
---
# Goal
Write an expression as a product of brackets, by taking out a common factor, by splitting a quadratic, or by spotting a special form.

# Why
Factorising is expanding in reverse. It's the main route to solving quadratic equations, which is the next lesson. It simplifies algebraic fractions the way cancelling simplifies ordinary ones. It's also the algebra version of writing a number as primes, so you'll see the same idea again with your HCF skills.

# Warm-up
?? Expand $(x + 3)(x + 4)$.
=> $x^2 + 7x + 12$.

?? What's the HCF of 12 and 18?
=> 6.

# Lesson
## The reverse of expanding
Expanding turns a product into a sum. **Factorising** turns a sum back into a product.

$$(x + 3)(x + 4) \;\;\xrightarrow{\text{expand}}\;\; x^2 + 7x + 12 \;\;\xrightarrow{\text{factorise}}\;\; (x + 3)(x + 4)$$

You've done the same thing with numbers: $12 = 3 \times 4$.

Why does a product help? Later, if you know $(x + 3)(x + 4) = 0$, then one of the brackets has to be zero. You can't say anything like that about $x^2 + 7x + 12 = 0$.

## Taking out a common factor
Always look for this first. Find the HCF of all the terms, including any letters, and put it outside a bracket.

### Worked example: $6x^2 + 9x$
The HCF of $6x^2$ and $9x$ is $3x$. Divide each term by it:

$$6x^2 + 9x = 3x(2x + 3)$$

Check by expanding: $3x \times 2x + 3x \times 3 = 6x^2 + 9x$.

| Expression | Common factor | Factorised |
| --- | --- | --- |
| $5x + 15$ | 5 | $5(x + 3)$ |
| $x^2 - 4x$ | $x$ | $x(x - 4)$ |
| $8a^3 - 12a^2$ | $4a^2$ | $4a^2(2a - 3)$ |
| $ab + ac$ | $a$ | $a(b + c)$ |

> Mistake: Taking out only part of the factor. $6x^2 + 9x = 3(2x^2 + 3x)$ is true, but it isn't finished, because $x$ is still common inside.

?? Factorise $10x^2 - 15x$.
=> $5x(2x - 3)$.

## Quadratics of the form $x^2 + bx + c$
When you expand $(x + p)(x + q)$, you get $x^2 + (p + q)x + pq$. So to factorise, you need two numbers that:

- **multiply** to $c$, the constant, and
- **add** to $b$, the coefficient of $x$.

### Worked example: $x^2 + 7x + 12$
List pairs that multiply to 12, and look for the pair that adds to 7.

| Pair | Multiplies to | Adds to |
| --- | --- | --- |
| 1 and 12 | 12 | 13 |
| 2 and 6 | 12 | 8 |
| 3 and 4 | 12 | **7** |

So $x^2 + 7x + 12 = (x + 3)(x + 4)$.

### Worked example: signs
Signs tell you what to look for.

| Quadratic | Numbers | Result |
| --- | --- | --- |
| $x^2 - 7x + 12$ | Multiply to $+12$, add to $-7$: both negative: −3 and −4 | $(x - 3)(x - 4)$ |
| $x^2 + x - 12$ | Multiply to $-12$, add to $+1$: opposite signs: +4 and −3 | $(x + 4)(x - 3)$ |
| $x^2 - x - 12$ | Multiply to $-12$, add to $-1$: opposite signs: −4 and +3 | $(x - 4)(x + 3)$ |

If $c$ is positive, the numbers have the same sign as $b$. If $c$ is negative, they have opposite signs.

> Mistake: Only checking the product. $(x + 2)(x + 6)$ multiplies to 12, but it adds to 8. Check both by expanding, as it takes just a moment.

?? Factorise $x^2 - 9x + 20$.
=> Multiply to 20 and add to −9: −4 and −5. So $(x - 4)(x - 5)$.

## Special forms
Recognising these saves time.

### Difference of two squares
$$a^2 - b^2 = (a + b)(a - b)$$

$$x^2 - 25 = (x + 5)(x - 5) \qquad 9x^2 - 16 = (3x + 4)(3x - 4)$$

$x^2 + 25$ doesn't factorise, not with ordinary numbers. It's the **difference**, and not the sum, that works.

### Perfect squares
$$a^2 + 2ab + b^2 = (a + b)^2$$

$$x^2 + 10x + 25 = (x + 5)^2 \qquad x^2 - 6x + 9 = (x - 3)^2$$

Check that the first and last are squares, and that the middle is double their product.

## When $x^2$ has a coefficient
For $ax^2 + bx + c$ with $a$ other than 1, first look for a common factor. Then use grouping.

### Worked example: $2x^2 + 7x + 3$
1. Multiply $a \times c$: $2 \times 3 = 6$.
2. Find two numbers that multiply to 6 and add to 7: 6 and 1.
3. Split the middle term: $2x^2 + 6x + x + 3$.
4. Factorise each pair, which is called **factor by grouping**: $2x(x + 3) + 1(x + 3)$.
5. Take out the shared bracket: $(x + 3)(2x + 1)$.

Check: $(x + 3)(2x + 1) = 2x^2 + x + 6x + 3 = 2x^2 + 7x + 3$. Correct.

### Worked example: with signs
$3x^2 - 10x - 8$. Here, $a \times c = -24$, and we need numbers that add to −10. They're −12 and +2.

$$3x^2 - 12x + 2x - 8 = 3x(x - 4) + 2(x - 4) = (x - 4)(3x + 2)$$

### Grouping on its own
Grouping also works directly when there are four terms: $ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)$.

## A plan
1. Is there a common factor? Take it out first.
2. Two terms and a minus? Try the difference of two squares.
3. Three terms? Find the two numbers. If $a$ isn't 1, group.
4. Four terms? Try grouping.
5. Check by expanding. Can anything inside be factorised again?

For example, $2x^2 - 18 = 2(x^2 - 9) = 2(x + 3)(x - 3)$. It takes two stages, and it's only finished once nothing else can be factored.

Not every quadratic factorises neatly. $x^2 + x + 1$ doesn't, and neither does $x^2 + 3x + 1$. In those cases, later lessons give you other methods.

# Exercises
?? Factorise $12x + 18$.
=> $6(2x + 3)$.

?? Factorise $x^2 + 8x + 15$.
=> $(x + 3)(x + 5)$.

?? Factorise $x^2 - 2x - 15$.
=> Numbers: −5 and +3. So $(x - 5)(x + 3)$.

?? Factorise $x^2 - 49$.
=> $(x + 7)(x - 7)$.

?? Factorise $2x^2 + 5x + 2$.
=> $a \times c = 4$, and the numbers are 4 and 1. $2x^2 + 4x + x + 2 = 2x(x + 2) + 1(x + 2) = (x + 2)(2x + 1)$.

?? Factorise $3x^2 - 12$ fully.
=> $3(x^2 - 4) = 3(x + 2)(x - 2)$.

# Practice
1. Take a three-digit number of your own, and write it as primes, as you learned earlier. Then write in a sentence how that's like factorising an expression.
2. Write down three quadratics by expanding brackets you make up yourself. Swap paper with yourself after a break: try to factorise your own quadratics without looking at the brackets.
3. Try to factorise $x^2 + 4$, and $x^2 + 3x + 1$. What happens? How do you know you can't?
4. Use the plan on these, then check by expanding: $4x^2 - 36$, $x^2 + 11x + 30$, $6x^2 + 11x + 3$.

Write your results and the two things you learned that couldn't be factorised.

# Rubric
- I used the plan, starting with a common factor.
- I checked every answer by expanding.
- I can explain why some expressions can't be factorised neatly.

# Summary
- Factorising is expanding backwards. It turns a sum into a product.
- Always look for a common factor first.
- For $x^2 + bx + c$: two numbers that multiply to $c$ and add to $b$.
- $a^2 - b^2 = (a + b)(a - b)$. A sum of squares doesn't factorise this way.
- For $ax^2 + bx + c$: multiply $a \times c$, split the middle, and group.
- Check by expanding.

# Check
Q: Factorise $6x + 21$.
P: Taking out a common factor
A: 3(2x + 7) | 3(2x+7)
= The HCF of 6 and 21 is 3.

Q: Factorise $x^2 - 7x$.
P: Taking out a common factor
A: x(x - 7) | x(x-7) | x(x − 7) | x(x−7)
= $x$ is common to both terms.

Q: Which two numbers should you find to factorise $x^2 + {p+q}x + {p*q}$? Give their product.
P: Quadratics of the form $x^2 + bx + c$
Vars: p=2..9, q=2..9
F: p*q
= They multiply to the constant, {p*q}, and add to {p+q}. They're {p} and {q}.

Q: Factorise $x^2 + 9x + 20$.
P: Quadratics of the form $x^2 + bx + c$
- $(x + 2)(x + 10)$
* $(x + 4)(x + 5)$
- $(x + 1)(x + 20)$
= 4 and 5 multiply to 20 and add to 9.

Q: Factorise $x^2 + 3x - 10$.
P: Quadratics of the form $x^2 + bx + c$
- $(x - 5)(x + 2)$
* $(x + 5)(x - 2)$
- $(x + 10)(x - 1)$
= +5 and −2 multiply to −10 and add to +3.

Q: Factorise $x^2 - 36$.
P: Special forms
- $(x - 6)(x - 6)$
* $(x + 6)(x - 6)$
- $x(x - 36)$
= It's a difference of two squares.

Q: Which can't be factorised using ordinary numbers?
P: Special forms
- $x^2 - 16$
* $x^2 + 16$
- $x^2 - 8x + 16$
= The sum of two squares doesn't factorise. Check that the others do.

Q: In factorising $2x^2 + 7x + 3$ by grouping, what do you split $7x$ into?
P: When $x^2$ has a coefficient
- $3x + 4x$
- $5x + 2x$
* $6x + x$
= $a \times c = 6$. The numbers that multiply to 6 and add to 7 are 6 and 1.

Q: Factorise $5x^2 - 20$ fully.
P: A plan
- $5(x^2 - 20)$
- $5(x^2 - 4)$
* $5(x + 2)(x - 2)$
= Take out the 5, then factorise the difference of two squares.

Q[transfer]: A rectangle's area is $x^2 + 8x + 15$ square metres. Which could be its length and width, in terms of $x$?
P: Quadratics of the form $x^2 + bx + c$
- $x + 1$ and $x + 15$
* $x + 3$ and $x + 5$
- $x + 8$ and $x + 15$
= Area is length × width, and these brackets multiply to give the area.

Q[transfer]: How does factorising $x^2 - 9$ into $(x + 3)(x - 3)$ help you with $51^2 - 49^2$, without squaring either number?
P: Special forms
A: 200
= $(51 + 49)(51 - 49) = 100 \times 2 = 200$.

Q[transfer]: A student factorises $x^2 + 6x + 8$ as $(x + 1)(x + 8)$. What's the fastest check?
P: A plan
* Expand it: this gives $x^2 + 9x + 8$, so the middle term is wrong
- Ask whether $x$ appears in both of the student's two brackets
- Check that 1 and 8 are factors of the last number in the quadratic
= Expanding catches this straight away. It should be $(x + 2)(x + 4)$.

# Cards
What does factorising mean? :: Writing a sum as a product of brackets. It's expanding in reverse.
What should you always look for first? :: A common factor.
How do you factorise $x^2 + bx + c$? :: Find two numbers that multiply to $c$ and add to $b$.
What's the factorised form of $a^2 - b^2$? :: $(a + b)(a - b)$.
Does $x^2 + 25$ factorise? :: Not with ordinary numbers. Only differences of squares do.
How do you factorise $ax^2 + bx + c$? :: Multiply $a \times c$, split the middle term, then group.
How do you check a factorisation? :: Expand it.

# Further
- OpenStax Elementary Algebra 2e, Greatest common factor and factor by grouping :: https://openstax.org/books/elementary-algebra-2e/pages/7-1-greatest-common-factor-and-factor-by-grouping
- Khan Academy, Algebra :: https://www.khanacademy.org/math/algebra
