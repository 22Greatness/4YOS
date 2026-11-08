---
id: na-word-problems
pack: Numbers and Algebra · First algebra
title: Word problems into equations
minutes: 45
source: OpenStax · Elementary Algebra 2e · Section 3.1
url: https://openstax.org/books/elementary-algebra-2e/pages/3-1-use-a-problem-solving-strategy
courses: The base of all later maths and statistics
format: 2
teaches: problem-solving-steps; set-up-equations; define-unknown; distance-rate-time; mixture-problems
uses: words-to-expressions; solve-linear; percent-of-amount; rates; check-solution; equations-with-fractions
---
# Goal
Turn a real problem written in words into an equation, solve it, and check whether the answer makes sense.

# Why
No real problem arrives as $2x + 3 = 11$. It arrives in words: how much to charge, how long it'll take, how to share something fairly. Turning words into equations is what makes algebra useful, and it's what exam word problems really test. In programming, the same skill is called turning a requirement into logic, so it's the most valuable thing in this unit.

# Warm-up
?? Write "3 less than twice $n$" as an expression.
=> $2n - 3$.

?? Solve $3x + 4 = 19$.
=> $x = 5$.

# Lesson
## A five-step method
Most people struggle with word problems because they try to write the equation immediately. Follow these steps instead.

1. **Read** the whole problem, and write what's being asked.
2. **Name** the unknown: "Let $x$ be ...", saying exactly what number it stands for, with units.
3. **Translate** the words into an equation, using $x$ for the other quantities too.
4. **Solve** the equation.
5. **Check** in the original words, not your equation, and answer in a full sentence.

### Worked example: consecutive numbers
Three consecutive whole numbers add up to 72. What are they?

| Step | Work |
| --- | --- |
| Asked for | The three numbers |
| Name | Let $n$ be the smallest number. The others are $n + 1$ and $n + 2$ |
| Equation | $n + (n + 1) + (n + 2) = 72$ |
| Solve | $3n + 3 = 72$, so $3n = 69$, and $n = 23$ |
| Check | $23 + 24 + 25 = 72$. Correct |

The numbers are 23, 24 and 25.

Notice that you describe every quantity using one letter. The checking must use the words, because if your equation is wrong, a check against your equation would pass anyway.

## Choosing what to name
Usually, name what's being asked for. If two quantities are related, name the one the other is described by. "Ada has twice as many as Bola": let Bola's amount be $x$, then Ada's is $2x$. That avoids fractions.

Common translations:

| Words | Maths |
| --- | --- |
| Is, was, gives, comes to | $=$ |
| Sum, total, more than, increased by | $+$ |
| Difference, less than, reduced by | $-$ |
| Of, times, product, twice | $\times$ |
| Per, shared, ratio, each | $\div$ |

### Worked example: fair shares
₦26,000 is shared between Ada and Bola, so that Ada gets ₦4,000 more than Bola. How much does each get?

Let Bola's share be $x$ naira. Ada's share is $x + 4{,}000$.

$$x + (x + 4{,}000) = 26{,}000 \quad\Rightarrow\quad 2x = 22{,}000 \quad\Rightarrow\quad x = 11{,}000$$

Bola gets ₦11,000, and Ada gets ₦15,000. Check: they add to ₦26,000, and the difference is ₦4,000.

> Mistake: Adding numbers together without a reason, because they're in the question. Try saying out loud what each part of your equation means in real life. If you can't say it, it's probably wrong.

## Rates and journeys
Use distance = speed × time, and a table to keep things clear.

### Worked example: meeting
Two buses leave towns 330 km apart at the same time, and drive towards each other. One goes at 60 km/h, and the other at 50 km/h. When do they meet?

Let $t$ be the time in hours until they meet.

| Bus | Speed | Time | Distance |
| --- | --- | --- | --- |
| First | 60 | $t$ | $60t$ |
| Second | 50 | $t$ | $50t$ |

Together, they cover the whole 330 km:

$$60t + 50t = 330 \quad\Rightarrow\quad 110t = 330 \quad\Rightarrow\quad t = 3$$

They meet after 3 hours. Check: $180 + 150 = 330$ km.

### Worked example: working together
A person can do a job in 6 hours, and another in 3. How long will they take together? Use rates: the first does $\frac{1}{6}$ of a job each hour, and the second does $\frac{1}{3}$. Together, in $t$ hours:

$$\frac{t}{6} + \frac{t}{3} = 1$$

Multiply by 6: $t + 2t = 6$, so $t = 2$ hours. It makes sense. It has to be less than the faster person's 3 hours.

## Percentages and mixtures
### Worked example: finding an original
After a 15% rise, a fee is ₦46,000. What was it before?

Let the old fee be $f$ naira. Then $1.15f = 46{,}000$, so $f = 40{,}000$.

Check: 15% of ₦40,000 is ₦6,000. And ₦40,000 + ₦6,000 = ₦46,000.

### Worked example: two prices
A shop sold 40 items in total, some at ₦500 and some at ₦800. It took ₦26,000. How many of each?

Let $x$ be the number sold at ₦800. So $40 - x$ were sold at ₦500.

$$800x + 500(40 - x) = 26{,}000$$

$$800x + 20{,}000 - 500x = 26{,}000 \quad\Rightarrow\quad 300x = 6{,}000 \quad\Rightarrow\quad x = 20$$

So 20 at ₦800, and 20 at ₦500. Check: $16{,}000 + 10{,}000 = 26{,}000$. These figures are invented.

### Same idea, for marks
A test has 40 questions. A right answer gains 3 marks, and a wrong one loses 1. You did all of them, and scored 80. How many were right? Let $r$ be the number right:

$$3r - (40 - r) = 80 \quad\Rightarrow\quad 4r = 120 \quad\Rightarrow\quad r = 30$$

## Does the answer make sense?
Solving correctly doesn't mean you're done. Ask:

- Is it the right size? A meeting time of 300 hours for two buses is impossible.
- Is it the right type? 3.5 people doesn't make sense, which may mean you made an error, or you may need to round.
- Is it the right direction? Should it be rounded up or down, given the real situation?
- Did you answer what was asked? If asked for Ada's share, don't stop at Bola's.

An equation is a **model** of the situation. It can't tell you what it left out, like fees, delays, or whether the people can actually work together that efficiently. You still have to judge that.

### When to stop and think
If you get stuck, try the problem with a guessed number first. Guess that Bola gets ₦10,000, and see what calculations you do to test that. Those same calculations, with $x$ in place of the guess, are your equation. This trick works remarkably often.

# Exercises
?? The sum of two numbers is 50, and one is 8 more than the other. What are they?
=> Let the smaller be $x$. $x + x + 8 = 50$, so $x = 21$. The numbers are 21 and 29.

?? A rectangle's length is 3 m more than its width, and its perimeter is 26 m. What's the width?
=> Let the width be $w$. $2w + 2(w + 3) = 26$, so $4w + 6 = 26$, and $w = 5$ m.

?? A phone plan costs ₦1,000 a month plus ₦5 per minute. A bill is ₦2,750. How many minutes?
=> $1{,}000 + 5m = 2{,}750$, so $m = 350$ minutes.

?? A car travels at 80 km/h. How long does it take to go 200 km?
=> $80t = 200$, so $t = 2.5$ hours.

?? Tolu is 4 times as old as Sade. In 6 years, Tolu will be 3 times as old. How old are they now?
=> Let Sade be $x$. $4x + 6 = 3(x + 6)$, so $4x + 6 = 3x + 18$, and $x = 12$. Sade is 12, and Tolu is 48. Check: in 6 years, 18 and 54, and $54 = 3 \times 18$.

# Practice
1. Write a word problem of your own from your real life: a fair split with someone, a bill with a fixed part and a varying part, or a study target with a deadline. Write it in sentences, as if for a stranger.
2. Solve it using all five steps, writing each one out.
3. Check the answer against your sentences, not your equation.
4. Say one thing your equation leaves out, compared with real life.
5. Find a word problem from an old exam paper or a textbook, and solve it in the same way.

Write your problem, your five steps, and what your model leaves out.

# Rubric
- I wrote a real word problem in my own sentences.
- I named the unknown exactly, and used all five steps.
- I checked against the words, and I said what the model leaves out.

# Summary
- Read, name, translate, solve, check.
- Name your unknown exactly, with units.
- Describe every quantity using one letter.
- Check against the original words, and answer in a sentence.
- Ask if the answer makes sense: its size, its type, its direction.
- If stuck, test a guessed number, and turn those steps into an equation.

# Check
Q: Two numbers add to {a*2+b}, and one is {b} more than the other. What's the smaller one?
P: A five-step method
Vars: a=10..40, b=2..18
F: a
= Let the smaller be $x$. Then 2$x$ + {b} = {a*2+b}, so 2$x$ = {a*2}, and $x$ is {a}.

Q: Put the five steps in order.
P: A five-step method
O: Read what's asked | Name the unknown | Translate into an equation | Solve | Check against the words
= Naming comes before writing any equation.

Q: Why should you check against the original words, and not your equation?
P: A five-step method
- Because checking against an equation is against the rules of algebra
* If the equation is wrong, a check against it would still pass
- Because the words of a problem usually contain the answer already
= Only the words can reveal a wrong equation.

Q: "Ada has three times as much as Bola." What's the best way to name the amounts?
P: Choosing what to name
- Let Ada's amount be $x$, and Bola's amount be $\frac{x}{3}$
* Let Bola's amount be $x$, and Ada's amount be $3x$
- Let Ada's amount be $x$, and Bola's amount be $y$, unrelated
= Naming the amount the other is described by avoids fractions.

Q: A bus goes at 70 km/h, and another at 50 km/h. They leave towns 360 km apart at the same time and drive towards each other. After how many hours do they meet?
P: Rates and journeys
A: 3 | 3 hours | three
= $70t + 50t = 360$, so $t = 3$.

Q: A worker does a job in 4 hours, and another in 12. How many hours do they take together?
P: Rates and journeys
A: 3 | 3 hours | three
= $\frac{t}{4} + \frac{t}{12} = 1$, so $3t + t = 12$.

Q: After a 20% rise, a price is ₦6,000. What was it before, in naira?
P: Percentages and mixtures
A: 5000 | 5,000 | ₦5,000 | ₦5000
= $1.2p = 6{,}000$, so $p = 5{,}000$.

Q: 30 tickets were sold at ₦200 and ₦500. They took ₦9,000 in total. How many ₦500 tickets were sold?
P: Percentages and mixtures
A: 10 | ten
= $500x + 200(30 - x) = 9{,}000$, so $300x = 3{,}000$.

Q[transfer]: A loan has a fixed ₦2,000 fee plus ₦500 per week. You can pay ₦10,000 in all. For how many weeks can you keep it?
P: Does the answer make sense?
A: 16 | 16 weeks
= $2{,}000 + 500w = 10{,}000$, so $w = 16$.

Q[transfer]: Solving a problem about how many people can share a task, you get 4.5 people. What should you do next?
P: Does the answer make sense?
* Check the working, then decide if it's an error or if it needs rounding up
- Report 4.5 people, as a correctly solved equation is always the final answer
- Throw away the decimal part, as you're supposed to always round down
= People come in whole numbers. Think about what the situation really needs.

Q[transfer]: A school needs to work out how many desks fit in a room, and writes an equation using the room's area and each desk's area. What does the equation leave out?
P: Does the answer make sense?
* Walking space, doors and desk shape, so the real number will be smaller
- Nothing, because area calculations always give exact real-life results
- The room's height, as that's the only thing affecting the number of desks
= An equation is a model. Always ask what it hasn't counted.

# Cards
What are the five steps for a word problem? :: Read, name, translate, solve, check.
How should you name an unknown? :: "Let $x$ be ..." saying exactly what number it is, with its units.
Why check against the words? :: A wrong equation would still pass a check against itself.
How do you handle "A has twice as much as B"? :: Let B be $x$, then A is $2x$.
What can you do if you're stuck? :: Test a guessed number, then repeat those steps with $x$.

# Further
- OpenStax Elementary Algebra 2e, Use a problem-solving strategy :: https://openstax.org/books/elementary-algebra-2e/pages/3-1-use-a-problem-solving-strategy
- OpenStax Prealgebra 2e, Use a problem-solving strategy :: https://openstax.org/books/prealgebra-2e/pages/9-1-use-a-problem-solving-strategy
