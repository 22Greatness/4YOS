---
id: na-add-subtract
pack: Numbers and Algebra · Whole numbers
title: Adding and subtracting by hand
minutes: 40
source: OpenStax · Prealgebra 2e · Sections 1.2 and 1.3
url: https://openstax.org/books/prealgebra-2e/pages/1-2-add-whole-numbers
courses: The base of all later maths and statistics
format: 2
teaches: column-addition; column-subtraction; inverse-check; addition-properties
uses: read-large-numbers; expanded-form; estimate
---
# Goal
Add and subtract numbers of any size by hand, including carrying and borrowing, and check your answer using the opposite operation.

# Why
You'll use a calculator most of the time, but exams may limit them, and knowing what carrying really means is what lets you spot a wrong result. Binary addition, which computers do billions of times a second, works by exactly the same carrying. Checking your work with the opposite operation is a habit that saves marks, and later it becomes how you test code.

# Warm-up
?? What is the 4 worth in 7,492?
=> 400. It's in the hundreds place.

?? Estimate 398 + 207.
=> About 400 + 200 = 600.

# Lesson
## What adding really is
**Adding** puts amounts together. The numbers you add are called **addends**, and the result is the **sum**. Because place value tells you what each digit is worth, you can only add like with like: ones with ones, tens with tens.

That's why we line numbers up on the right. Lining up makes each column hold just one kind of place.

$$\begin{array}{r} 324 \\ +\ 152 \\ \hline 476 \end{array}$$

Ones: 4 + 2 = 6. Tens: 2 + 5 = 7. Hundreds: 3 + 1 = 4. The sum is 476.

### Three useful facts
| Fact | Meaning | Example |
| --- | --- | --- |
| Order doesn't matter | $a + b = b + a$ | $7 + 5 = 5 + 7$ |
| Grouping doesn't matter | $(a + b) + c = a + (b + c)$ | $(8 + 2) + 5 = 8 + (2 + 5)$ |
| Zero changes nothing | $a + 0 = a$ | $9 + 0 = 9$ |

These let you add in whatever order is easiest. For 38 + 47 + 2, add 38 + 2 = 40 first, then 40 + 47 = 87.

## Carrying
What if a column adds up to 10 or more? You can only write one digit in a place, so ten of something must become one of the next place up. That's **carrying**.

### Worked example: 478 + 356
| Column | Sum | Write | Carry |
| --- | --- | --- | --- |
| Ones | 8 + 6 = 14 | 4 | 1 ten |
| Tens | 7 + 5 + 1 = 13 | 3 | 1 hundred |
| Hundreds | 4 + 3 + 1 = 8 | 8 | |

The sum is 834.

$$\begin{array}{r} {}^{1}\,{}^{1}\phantom{0} \\ 478 \\ +\ 356 \\ \hline 834 \end{array}$$

Estimate to check: 500 + 350 = 850, which is close.

> Mistake: Lining up on the left. To add 1,250 and 75, the 7 must sit under the 5 and the 5 under the 0. Right-align every time.

?? Add 2,687 + 549.
=> Ones: 7 + 9 = 16, write 6, carry 1. Tens: 8 + 4 + 1 = 13, write 3, carry 1. Hundreds: 6 + 5 + 1 = 12, write 2, carry 1. Thousands: 2 + 1 = 3. The sum is 3,236.

## What subtracting really is
**Subtracting** takes one amount away from another, or finds the gap between them. In 90 − 35 = 55, the result, 55, is called the **difference**. Unlike adding, order matters: 90 − 35 isn't the same as 35 − 90.

Line up on the right again, and always put the number you're taking away on the bottom.

## Borrowing
Sometimes a column has too few to subtract from, as in 3 − 8. So you **borrow**: take one from the next place up and turn it into ten of this place. This is carrying in reverse, and it doesn't change the number's value. One ten is ten ones.

### Worked example: 523 − 178
| Column | What happens | Result |
| --- | --- | --- |
| Ones | 3 − 8 won't work. Borrow from the tens: the 2 tens become 1, and the ones become 13. 13 − 8 = 5 | 5 |
| Tens | 1 − 7 won't work. Borrow from the hundreds: the 5 becomes 4, and the tens become 11. 11 − 7 = 4 | 4 |
| Hundreds | 4 − 1 = 3 | 3 |

The difference is 345.

### Borrowing across zeros
What about 700 − 268? There are no tens to borrow from, so go further left.

1. The ones need a borrow, but the tens digit is 0.
2. Borrow from the hundreds: 700 is the same as 6 hundreds, 9 tens and 10 ones.
3. Now subtract: 10 − 8 = 2, 9 − 6 = 3, 6 − 2 = 4.

The answer is 432.

> Mistake: Subtracting the smaller digit from the larger in each column, whichever is on top. For 52 − 38, doing 8 − 2 = 6 and 5 − 3 = 2 gives 26, which is wrong. The answer is 14. The bottom number is always the one taken away.

## Checking with the opposite
Adding and subtracting undo each other. They're called **inverse operations**. This gives you an exact check.

If $a - b = c$, then $c + b$ must equal $a$.

Check 523 − 178 = 345: add 345 + 178. Ones: 5 + 8 = 13. Tens: 4 + 7 + 1 = 12. Hundreds: 3 + 1 + 1 = 5. That gives 523, so it's right.

To check an addition, subtract one addend from the sum. You should get the other. This takes seconds, and it catches nearly every slip.

### Word problems
Decide what the words are asking before you calculate. "Total", "altogether" and "in all" usually mean add. "How much more", "left" and "difference" usually mean subtract. Always read the whole question first, because these words are only clues.

# Exercises
?? Add 3,908 + 1,475.
=> Ones: 8 + 5 = 13, write 3, carry 1. Tens: 0 + 7 + 1 = 8. Hundreds: 9 + 4 = 13, write 3, carry 1. Thousands: 3 + 1 + 1 = 5. The sum is 5,383.

?? Subtract 6,004 − 2,357.
=> 6,004 becomes 5 thousands, 9 hundreds, 9 tens and 14 ones. 14 − 7 = 7, 9 − 5 = 4, 9 − 3 = 6, 5 − 2 = 3. The answer is 3,647. Check: 3,647 + 2,357 = 6,004.

?? You have ₦12,500 and spend ₦4,750 on data and ₦3,200 on transport. How much is left?
=> Spent: 4,750 + 3,200 = ₦7,950. Left: 12,500 − 7,950 = ₦4,550.

?? Use the easy order to add 46 + 27 + 54.
=> 46 + 54 = 100, then 100 + 27 = 127.

# Practice
Use your own numbers, on paper, with no calculator until the last step.

1. List five real costs from your last week or month, and add them by hand.
2. Take a real amount of money you had, or a budget you set. Subtract your total. Include at least one subtraction that needs borrowing, and if none does, add a real cost that creates one.
3. Check each subtraction by adding back.
4. Estimate the total first, using rounded numbers, and compare with your exact answer.
5. Now check it all with a calculator. If anything differs, find the column where it went wrong.

Write down any column you got wrong, and why.

# Rubric
- I carried and borrowed by hand on real numbers.
- I checked my subtractions by adding back.
- If I got something wrong, I found the exact column.

# Summary
- Line up on the right, so each column holds one kind of place.
- Carrying turns ten of one place into one of the next place up.
- Borrowing does the reverse. It doesn't change the number's value.
- The number you're taking away goes on the bottom, and order matters in subtraction.
- Check with the opposite: if $a - b = c$, then $c + b = a$.

# Check
Q: What is {a} + {b}?
P: Carrying
Vars: a=1200..4999, b=1200..4999
F: a+b
= Add column by column from the right, carrying whenever a column reaches 10. The sum is {a+b}.

Q: What is {a} − {b}?
P: Borrowing
Vars: a=5000..9999, b=1000..4999
F: a-b
= Subtract column by column from the right, borrowing where the top digit is too small. The answer is {a-b}. You can check that {a-b} + {b} = {a}.

Q: What is 800 − 356?
P: Borrowing
A: 444
= 800 is 7 hundreds, 9 tens and 10 ones. 10 − 6 = 4, 9 − 5 = 4, 7 − 3 = 4.

Q: When you carry in 478 + 356, what does the small 1 written over the tens column stand for?
P: Carrying
- A mistake that you correct later in the working
* The 10 ones that have been changed into 1 ten
- One extra unit added to make the answer come out right
= 8 + 6 = 14 ones, which is 1 ten and 4 ones. Nothing is added or lost.

Q: Which of these is true for all numbers?
P: What adding really is
* $a + b = b + a$
- $a - b = b - a$
- $a + 0 = 0$
= Order doesn't matter in adding, but it does in subtracting, and adding zero leaves a number as it is.

Q: Someone says 92 − 47 = 55. Which calculation checks this?
P: Checking with the opposite
- 92 + 47, which should give 55 if the answer is right
* 55 + 47, which should give 92 if the answer is right
- 55 − 47, which should give 92 if the answer is right
= Add the answer to the number taken away. Here 55 + 47 = 102, so 55 is wrong. The right answer is 45.

Q: In 703 − 268, why can't you borrow from the tens straight away?
P: Borrowing
- Because subtraction is only allowed on numbers that don't have a zero digit
* The tens digit is 0, so you have to borrow from the hundreds first
- Because 268 is larger than 703, so the subtraction has no real answer
= With nothing in the tens, take one hundred and split it: 9 tens and 10 ones.

Q: What's the easiest order for 25 + 39 + 75?
P: What adding really is
- 25 + 39 first, because you have to work from left to right
* 25 + 75 first, because that makes a round 100
- 39 + 75 first, because the largest numbers always go first
= Order and grouping don't change a sum, so make the sum easy.

Q[transfer]: A student adds 1,250 and 75 and gets 2,000. What's the most likely cause?
P: Carrying
- The student forgot to carry from the thousands column at the end
* The 75 was placed one column too far left, so it counted as 750
- The two numbers can't be added since they've different lengths
= 1,250 + 750 = 2,000. Right-aligned, the sum is 1,325. An estimate would have caught it, because 75 is far too small to add 750.

Q[transfer]: In binary, 1 + 1 can't be written with one digit, so it's written as 10, with a 1 carried. Which idea here is that the same as?
P: Carrying
- Borrowing from the next column along
* Carrying when a column gets too full
- Rounding up when the next digit is big
= In base ten a column overflows at 10, and in binary it overflows at 2. The idea is the same.

Q[transfer]: You had ₦20,000 and spent ₦7,400 and ₦6,850. How much is left, in naira?
P: Checking with the opposite
A: 5750 | 5,750 | N5750 | ₦5,750 | ₦5750
= Spent 7,400 + 6,850 = 14,250. Left: 20,000 − 14,250 = 5,750. Check: 5,750 + 14,250 = 20,000.

# Cards
Why do we line numbers up on the right? :: So that each column holds just one kind of place: ones with ones, tens with tens.
What does carrying really mean? :: Ten of one place becomes one of the next place up.
What does borrowing really mean? :: One of the next place up becomes ten of this place. The number's value doesn't change.
How do you check a subtraction? :: Add the answer to the number taken away. You should get the number you started with.
What do "inverse operations" do? :: They undo each other, as adding and subtracting do.

# Further
- OpenStax Prealgebra 2e, Add whole numbers :: https://openstax.org/books/prealgebra-2e/pages/1-2-add-whole-numbers
- OpenStax Prealgebra 2e, Subtract whole numbers :: https://openstax.org/books/prealgebra-2e/pages/1-3-subtract-whole-numbers
