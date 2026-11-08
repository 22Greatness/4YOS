---
id: na-simultaneous
pack: Numbers and Algebra · First algebra
title: Simultaneous equations
minutes: 50
source: OpenStax · Elementary Algebra 2e · Sections 5.1 to 5.3
url: https://openstax.org/books/elementary-algebra-2e/pages/5-3-solve-systems-of-equations-by-elimination
courses: The base of all later maths and statistics
format: 2
teaches: simultaneous-meaning; elimination; substitution-method; graph-intersection; simultaneous-word-problems
uses: solve-linear; balance-method; distribute-brackets; change-subject; define-unknown; set-up-equations; check-solution
---
# Goal
Solve two equations with two unknowns by elimination, by substitution and by reading a graph, and use them to solve real problems.

# Why
Many problems have more than one unknown, with several facts linking them. What did each item cost, if you only know two different totals? Break-even points, mixing problems and supply and demand all work this way. Later courses scale this up to thousands of equations, which is the heart of Linear Algebra and of much of machine learning.

# Warm-up
?? Make $y$ the subject of $2x + y = 10$.
=> $y = 10 - 2x$.

?? Solve $3x + 2(5 - x) = 14$.
=> $3x + 10 - 2x = 14$, so $x = 4$.

# Lesson
## Two unknowns need two facts
Suppose two pens and a notebook cost ₦900. That's one fact, $2p + n = 900$, and it's not enough. Many pairs work: $p = 100$ with $n = 700$, or $p = 200$ with $n = 500$.

Add a second fact: a pen and a notebook cost ₦600, so $p + n = 600$. Only one pair fits both: $p = 300$ and $n = 300$. Check: $2(300) + 300 = 900$, and $300 + 300 = 600$.

**Simultaneous equations** are equations that must all be true at the same time. To solve them is to find values that satisfy every one. In general, you need as many independent facts as you have unknowns.

## Elimination
Add or subtract the equations, to make one letter vanish. You can do that because both sides of an equation are equal, so adding the same amount to each side of another equation keeps it balanced.

### Worked example: matching numbers
$$x + y = 10$$
$$x - y = 4$$

Add the two equations. The $y$ terms cancel: $2x = 14$, so $x = 7$. Put that into the first: $7 + y = 10$, so $y = 3$.

Check in both: $7 + 3 = 10$ and $7 - 3 = 4$. Correct.

### Worked example: subtracting
$$3x + 2y = 16$$
$$x + 2y = 8$$

Both have $2y$, so subtract the second from the first: $2x = 8$, so $x = 4$. Then $4 + 2y = 8$, so $y = 2$.

### Worked example: scaling first
If nothing matches, multiply an equation to make a match.

$$2x + 3y = 13$$
$$3x - y = 3$$

Multiply the second by 3: $9x - 3y = 9$. Now add this to the first, and the $y$ terms cancel: $11x = 22$, so $x = 2$. Then $3(2) - y = 3$, so $y = 3$.

Check: $2(2) + 3(3) = 13$, and $3(2) - 3 = 3$. Correct.

When the signs of the matching terms are the same, subtract. When they're different, add.

> Mistake: Multiplying only one term. If you multiply an equation by 3, every term on both sides must be multiplied, including the constant.

> Mistake: Stopping at one letter. You must find both, then check in both of the original equations.

?? Solve $2x + y = 11$ and $x - y = 1$.
=> Add: $3x = 12$, so $x = 4$. Then $4 - y = 1$, so $y = 3$.

## Substitution
Make one letter the subject, then replace it in the other equation. This is best when one letter is already on its own or has a coefficient of 1.

### Worked example
$$y = 2x - 1$$
$$3x + 2y = 12$$

Replace $y$ with $2x - 1$ in the second equation, using brackets:

$$3x + 2(2x - 1) = 12 \quad\Rightarrow\quad 3x + 4x - 2 = 12 \quad\Rightarrow\quad 7x = 14 \quad\Rightarrow\quad x = 2$$

Then $y = 2(2) - 1 = 3$.

Check: $3(2) + 2(3) = 12$. Correct.

> Mistake: Leaving out the brackets. $2(2x - 1)$ must multiply both terms. Without the brackets, the sign error is almost certain.

## Seeing it on a graph
An equation with $x$ and $y$ can be drawn. Each point $(x, y)$ on the line is a pair of values that makes the equation true. A linear equation always gives a straight line. Points on a graph are written as $(x, y)$: the first number is how far along, and the second is how far up.

The solution of two equations is the point on **both** lines, where they cross. Here's $y = 10 - x$ and $y = x - 4$, which are the equations $x + y = 10$ and $x - y = 4$ from before, rearranged.

```diagram
{"kind":"graph","alt":"Two straight lines on a grid. One slopes down, y equals 10 minus x. The other slopes up, y equals x minus 4. They cross at the point x equals 7, y equals 3.","x":[-1,12],"y":[-4,11],"curves":[{"fn":"10-x","label":"x + y = 10"},{"fn":"x-4","label":"x - y = 4"}],"points":[{"x":7,"y":3,"label":"(7, 3)"}]}
```

They cross at $(7, 3)$, the same answer as by elimination.

### Special cases
The picture explains what can go wrong.

| Lines | Result | Algebra shows |
| --- | --- | --- |
| Cross once | One solution | $x$ and $y$ values |
| Parallel, never meet | No solution | Something false, like $0 = 5$ |
| The same line | Infinitely many solutions | Something always true, like $0 = 0$ |

For example, $x + y = 3$ and $x + y = 5$ can't both be true, and subtracting gives $0 = 2$. Meanwhile, $x + y = 3$ and $2x + 2y = 6$ are the same fact said twice.

## Real problems
Name two unknowns, and find two facts.

### Worked example: two prices
3 pens and 2 notebooks cost ₦1,300. 1 pen and 4 notebooks cost ₦1,600. Find each price.

Let a pen cost $p$ naira, and a notebook $n$ naira.

$$3p + 2n = 1{,}300$$
$$p + 4n = 1{,}600$$

Multiply the second by 3: $3p + 12n = 4{,}800$. Subtract the first: $10n = 3{,}500$, so $n = 350$. Then $p + 1{,}400 = 1{,}600$, so $p = 200$.

A pen costs ₦200, and a notebook costs ₦350. Check: $600 + 700 = 1{,}300$, and $200 + 1{,}400 = 1{,}600$. These prices are invented.

### Worked example: break-even
A shop's costs are ₦20,000 fixed, plus ₦300 per item. It sells items at ₦500. When does the money coming in equal the money going out?

Let $c$ be the money and $n$ the number of items. The two lines are $c = 20{,}000 + 300n$ and $c = 500n$. Setting them equal:

$$500n = 20{,}000 + 300n \quad\Rightarrow\quad 200n = 20{,}000 \quad\Rightarrow\quad n = 100$$

The shop breaks even at 100 items. Below that, it makes a loss. Above that, it makes a profit. This example's numbers are invented.

### Worked example: two speeds
A boat takes 2 hours to go 24 km downstream, and 3 hours to come back upstream. Let $b$ be the boat's speed in still water, and $s$ be the stream's speed, both in km/h.

$$2(b + s) = 24 \quad\Rightarrow\quad b + s = 12$$
$$3(b - s) = 24 \quad\Rightarrow\quad b - s = 8$$

Add them: $2b = 20$, so $b = 10$ and $s = 2$.

# Exercises
?? Solve $x + y = 9$ and $x - y = 3$.
=> Add: $2x = 12$, so $x = 6$ and $y = 3$.

?? Solve $4x + y = 14$ and $2x + y = 8$.
=> Subtract: $2x = 6$, so $x = 3$. Then $y = 2$.

?? Solve $y = x + 2$ and $2x + y = 11$.
=> $2x + x + 2 = 11$, so $3x = 9$, $x = 3$ and $y = 5$.

?? Solve $3x + 2y = 7$ and $5x - y = 3$.
=> Multiply the second by 2: $10x - 2y = 6$. Add: $13x = 13$, so $x = 1$. Then $y = 2$.

?? 2 adult tickets and 3 child tickets cost ₦1,900. 1 adult and 2 child tickets cost ₦1,100. Find each price.
=> Double the second: $2a + 4c = 2{,}200$. Subtract the first: $c = 300$. Then $a = 1{,}100 - 600 = 500$. Adult ₦500, and child ₦300.

# Practice
1. Find two real receipts or shopping trips that share two items in different amounts, or make up a realistic pair. Write the two equations, and find each price.
2. Check by substituting into both of the original equations, then compare with the real prices if you know them.
3. Choose a real small business idea, and write the costs and income as two equations. Work out its break-even point. These can be likely numbers.
4. Draw the two lines for one pair of equations on graph paper. Check that they cross at your answer.

Write your equations, your solutions, and your break-even answer. It's practice with a model, and not business advice.

# Rubric
- I set up two equations from a real situation, naming each unknown.
- I solved by elimination or substitution, and checked in both equations.
- I drew two lines and saw that they cross at my answer.

# Summary
- Two unknowns need two independent facts.
- Elimination: add or subtract the equations, scaling first if needed.
- Substitution: make one letter the subject, and replace it using brackets.
- On a graph, the solution is where the lines cross.
- Parallel lines give no solution, and the same line gives infinitely many.
- Find both values, and check in both equations.

# Check
Q: Solve $x + y = {a+b}$ and $x - y = {a-b}$. What is $x$?
P: Elimination
Vars: a=10..30, b=1..9
F: a
= Add the equations: 2$x$ = {2*a}, so $x$ is {a}, and $y$ is {b}.

Q: For the same kind of pair, $x + y = 14$ and $x - y = 6$, what is $y$?
P: Elimination
A: 4 | four
= Add: $2x = 20$, so $x = 10$. Then $y = 4$.

Q: Solve $3x + y = 11$ and $x + y = 5$. What is $x$?
P: Elimination
A: 3 | three
= Subtract: $2x = 6$.

Q: To eliminate $y$ from $2x + 3y = 13$ and $3x - y = 3$, what's the first step?
P: Elimination
- Add the two equations together exactly as they stand
* Multiply the second equation by 3, then add
- Multiply only the $y$ term of the second equation by 3
= Every term must be multiplied, so that $-3y$ then cancels $+3y$.

Q: Solve $y = 2x$ and $x + y = 9$. What is $y$?
P: Substitution
A: 6 | six
= $x + 2x = 9$, so $x = 3$, and $y = 6$.

Q: Solve $y = x - 1$ and $2x + 3y = 12$. What is $x$?
P: Substitution
A: 3 | three
= $2x + 3(x - 1) = 12$, so $5x = 15$.

Q: Two lines are parallel, and never meet. How many solutions do the equations have?
P: Seeing it on a graph
- One, at the place where they would be closest
* None, because no point is on both lines
- Infinitely many, because both are straight lines
= The solution has to be on both lines, and none is.

Q: Subtracting two equations gives you $0 = 0$. What does this mean?
P: Seeing it on a graph
- The solution is $x = 0$ and $y = 0$ for both
* They're the same line, so there are infinitely many solutions
- There's no solution, since all of the letters have vanished
= Something always true means that it's the same fact said twice.

Q[transfer]: 2 kg of rice and 1 kg of beans cost ₦4,000. 1 kg of rice and 2 kg of beans cost ₦4,400. What does 1 kg of rice cost, in naira?
P: Real problems
A: 1200 | 1,200 | ₦1,200 | ₦1200
= Double the first: $4r + 2b = 8{,}000$. Subtract the second: $3r = 3{,}600$.

Q[transfer]: A business has fixed costs of ₦30,000, and each item costs ₦200 to make. It sells at ₦500 each. How many items does it need to sell to break even?
P: Real problems
A: 100 | 100 items
= $500n = 30{,}000 + 200n$, so $300n = 30{,}000$.

Q[transfer]: You check your solution $x = 3$, $y = 2$ in the first equation only, and it works. Why check the second too?
P: Elimination
- It's not needed, as one working equation shows the pair is right
* Many pairs fit one equation, while only the solution fits both
- Because the second equation is usually the more difficult one
= One equation has many solutions. The answer must satisfy every equation.

# Cards
What are simultaneous equations? :: Equations that must all be true at the same time.
How many facts do you need for two unknowns? :: Two independent ones.
What does elimination do? :: It adds or subtracts equations to make one letter vanish.
What does substitution do? :: It makes one letter the subject, and replaces it in the other equation.
What does the solution look like on a graph? :: The point where the two lines cross.
What does $0 = 5$ mean when solving a pair? :: No solution. The lines are parallel.
What does $0 = 0$ mean? :: Infinitely many solutions. They're the same line.

# Further
- OpenStax Elementary Algebra 2e, Solve systems of equations by graphing :: https://openstax.org/books/elementary-algebra-2e/pages/5-1-solve-systems-of-equations-by-graphing
- OpenStax Elementary Algebra 2e, Solve systems of equations by substitution :: https://openstax.org/books/elementary-algebra-2e/pages/5-2-solving-systems-of-equations-by-substitution
- OpenStax Elementary Algebra 2e, Solve systems of equations by elimination :: https://openstax.org/books/elementary-algebra-2e/pages/5-3-solve-systems-of-equations-by-elimination
