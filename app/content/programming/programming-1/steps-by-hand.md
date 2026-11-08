---
id: steps-by-hand
pack: Programming 1 · Solving before coding
title: Write and test a procedure by hand
minutes: 35
source: Harvard CS50x · Week 0 notes
url: https://cs50.harvard.edu/x/notes/0/
courses: Supports any first programming course
format: 2
teaches: algorithm-meaning; three-structures; trace-table; test-cases
uses: program-meaning; bug-meaning
---
# Goal
Write an algorithm precise enough to follow without judgment, including decisions and loops, trace it by hand with a table, and find its failures by testing normal, boundary and missing cases.

# Why
Most beginners find programming hard, not because of the language, but because they have not worked out what the steps are. This skill comes first. It is the core of COS 102 at both schools, which often asks for algorithms, pseudocode and flowcharts on paper. It's also what you do in security, when you ask what a system does in a case nobody planned for, and what you do at work when you document a process.

# Warm-up
?? What is a program?
=> A sequence of exact instructions that a computer follows literally.

?? Which kind of bug runs without warning but gives a wrong answer?
=> A logic error.

# Lesson
## What makes something an algorithm
An **algorithm** is a finite sequence of precise steps that solves a problem. "Precise" means that two different people, or a machine, would do the same thing with the same input. A good algorithm has:

- **Inputs**: what it starts with.
- **Outputs**: what it produces, including what to report if there is no answer.
- **Definite steps**: no step needs a guess.
- **An end**: it always stops.

Compare these instructions for finding a file:

| Vague | Precise |
| --- | --- |
| Look for the right file | Open the folder. For each file in the list, check if its name contains the search word |
| Check it's the good one | If the name contains the word, write down its full path |
| Open it | When the list ends, report how many paths you wrote down. If none, report "not found" |

The word "right" hides all the hard work. Whenever a step uses words like "the right one", "properly" or "if needed", you still have thinking to do.

## Only three building blocks
Every algorithm, however large, is built from three structures. Almost all of programming is just these.

| Structure | Meaning | Plain example |
| --- | --- | --- |
| Sequence | Do steps in order | Add water, then add rice |
| Selection | Choose based on a condition | If the water is boiling, add rice. Otherwise wait |
| Repetition | Repeat while a condition holds | While the rice is hard, cook for two more minutes |

Exam papers often want this in **pseudocode**, structured English that isn't tied to one language. Here is finding the largest number in a list.

```text
INPUT a list of numbers
SET largest to the first number
FOR each number in the list
    IF number > largest THEN
        SET largest to number
    END IF
END FOR
OUTPUT largest
```

A **flowchart** draws the same logic. Ovals mark start and end, rectangles are actions, diamonds are decisions with yes and no branches, and parallelograms are input and output. Use your lecturer's conventions in an exam.

> Mistake: Forgetting that a loop has to change something. "While the rice is hard, wait" works because cooking changes the rice. But "while the file isn't found, look in the same place" never ends, because nothing changes.

## Trace it by hand
A **trace table** has a column for each value that changes and a row for each step. It lets you run an algorithm like a computer, and see exactly where it goes wrong.

### Worked example: trace the algorithm above
Input: 4, 9, 2, 7.

| Step | number | number > largest? | largest |
| --- | --- | --- | --- |
| Start | | | 4 |
| 1 | 4 | No | 4 |
| 2 | 9 | Yes | 9 |
| 3 | 2 | No | 9 |
| 4 | 7 | No | 9 |

The output is 9, which is correct. Tracing takes a minute, and in that minute you can catch errors that would take much longer to find in running code.

?? Trace the same algorithm with -5, -2, -8. What does it output?
=> It starts with largest = -5. Then -2 is larger, so largest = -2. -8 isn't larger. The output is -2, which is correct, and it would have failed if we had started largest at 0 instead of the first number.

## Finding what breaks
A procedure that works once isn't finished. Test it with cases chosen to break it.

| Kind of test | What to try | Why |
| --- | --- | --- |
| Normal | A typical input | Confirms the basic idea |
| Boundary | Values at the edge of a rule: first, last, exactly on a limit | Most mistakes are right at the edge |
| Empty | Nothing at all | A list with no items, a folder with no files |
| Duplicates and ties | Two of the same | Which do you pick? |
| Unexpected | The wrong kind of input | What about a word where you expected a number? |

Write down the **expected** result before you run the test. Otherwise you tend to accept whatever you get.

### Worked example: a grading rule
Rule as first written: "Below 40 is F. 40 to 70 is a pass. Above 70 is A."

| Test | Expected | What the rule gives | Finding |
| --- | --- | --- | --- |
| 25 | F | F | Fine |
| 40 | Pass | Pass | Boundary fine |
| 70 | ? | Pass | Did you mean 70 to be an A? If the official bands make 70 an A, the rule is wrong |
| 105 | Error | A | Scores can't be above 100, so it needs a check |
| "absent" | ? | No rule applies | A missing case |

One rule, five tests and three problems. Nothing here needed a computer. These are exactly the kinds of errors that cause real bugs and real security holes: an edge nobody tested, or an input nobody expected.

> Note: Your school's real grade bands come from its own handbook. This table is only an example of testing a rule.

## Efficiency, in one idea
Different correct algorithms can take very different amounts of work. To find a name in a sorted list of 1,000 names, you could check each from the start, which can take 1,000 checks. Or you could open the middle, discard the half it can't be in, and repeat. That takes about 10 checks, since each one halves what remains. This is **binary search**, shown in CS50's famous phone book demonstration. You'll study this in depth later. For now, the thing to notice is that the design of the steps matters as well as whether they work.

# Exercises
?? Write pseudocode to count how many numbers in a list are above 50.
=> SET count to 0. FOR each number: IF number > 50 THEN add 1 to count. After the loop, OUTPUT count.

?? Trace your answer with 60, 50, 70, 10. What should it output?
=> 60 yes (count 1), 50 no, since it's not above 50, 70 yes (count 2), 10 no. Output 2. The value 50 is the boundary test.

?? What's wrong with this procedure? "Repeat: take a number from the pile. Until the pile is empty, add it to the total."
=> It's ambiguous, and it fails on an empty pile by trying to take a number first. Better: "While the pile isn't empty: take a number and add it to the total."

?? A rule says "free delivery for orders over ₦10,000". Which three order values should you test?
=> ₦9,999, ₦10,000 and ₦10,001. Exactly ₦10,000 is the case that reveals whether "over" was meant strictly.

# Practice
Write a real procedure from your own life, on paper. A good choice is deciding what to study tonight, or finding a file for a course.

1. Write the inputs and outputs. Say what's reported if there's no answer.
2. Write the steps in pseudocode using at least one decision and one loop. Avoid vague words like "the right one".
3. Make a trace table and trace it with a normal input.
4. Test three more cases: a boundary, an empty case and a tie. Write the expected result before tracing each.
5. Fix anything that failed, and write what you changed.

If you can, ask someone to follow your steps exactly as written. Whatever they get stuck on is a step that isn't yet precise.

# Rubric
- My steps need no guessing, and every path has an end.
- I traced it with a table, and wrote expected results before testing.
- I tested a boundary, an empty case and a tie, and fixed what I found.

# Summary
- An algorithm has inputs, outputs, definite steps and an end.
- Everything is built from sequence, selection and repetition.
- A loop must change something, or it never ends.
- A trace table runs an algorithm by hand, one step at a time.
- Test normal, boundary, empty, duplicate and unexpected cases, and write what you expect first.

# Check
Q: A procedure says to open the matching file. What rule is still needed if two files have the same name?
P: What makes something an algorithm
* Compare their locations and pick the intended folder
- Open whichever file happens to appear first in the list
- Repeat the same search until only one result remains
= Choosing whichever comes first is a guess, and repeating an identical search changes nothing. The location tells them apart.

Q: Which of these is not one of the three basic structures?
P: Only three building blocks
- Selection
- Repetition
* Compilation
= The three structures are sequence, selection and repetition.

Q: `SET total to 0. FOR each number in 3, 4, 5: add number to total.` What's the output of total?
P: Trace it by hand
A: 12
= It goes 3, then 7, then 12.

Q: `SET n to 5. WHILE n > 1: SET n to n - 2.` What's n when the loop ends?
P: Trace it by hand
A: 1
= n goes 5, 3, 1. At 1 the condition is false, so the loop stops.

Q: `SET n to 5. WHILE n > 0: add 1 to n.` What happens?
P: Only three building blocks
- It ends when n reaches 0
* It never ends, because n only grows
- It runs exactly five times
= The condition stays true forever. A loop has to move toward its end.

Q: A rule applies "for values under 18". Which set best tests the boundary?
P: Finding what breaks
- 5, 10 and 15
* 17, 18 and 19
- 18, 180 and 1800
= Boundary tests sit on either side of the limit and exactly on it.

Q: Why write the expected result before running a test?
P: Finding what breaks
- It makes the program run noticeably faster when tested
* So you don't simply accept whatever you get
- Because the computer needs it in order to run the test
= Without a prediction, a wrong result can look fine. The prediction is what makes it a test.

Q: In a flowchart, which shape normally shows a decision?
P: Only three building blocks
- A rectangle
* A diamond
- An oval
= Decisions use diamonds with yes and no branches. Rectangles are actions and ovals are start and end.

Q[transfer]: A login allows 3 attempts, then locks the account. A tester tries 3 wrong passwords, and the 4th, correct, password gets in. What kind of error is this most likely?
P: Finding what breaks
* A boundary error in how the attempts are counted
- A problem with the user's keyboard during the test
- A proof that the password is stored too safely
= The rule breaks exactly at its limit, which is why you test around boundaries. In security, this matters.

Q[transfer]: You're writing a procedure to find the average of a student's test scores. Which case most needs its own rule?
P: Finding what breaks
- A student with four tests
- A student with very high scores
* A student with no tests at all
= With no tests you would divide by zero. Empty input is a classic failure.

Q[transfer]: An online shop gives a discount for orders "over ₦5,000". A customer ordering exactly ₦5,000 complains they got no discount. What should have been done when the rule was written?
P: Finding what breaks
- Remove discounts from the shop
- Test only much larger orders, such as ₦50,000
* Test the exact boundary, and state whether ₦5,000 qualifies
= Words like "over" hide a boundary decision. A boundary test forces you to make that decision on purpose.

# Cards
What four things does a good algorithm have? :: Inputs, outputs, definite steps, and an end.
What are the three basic structures of all algorithms? :: Sequence, selection and repetition.
What is a trace table? :: A table with a column per changing value and a row per step, for running an algorithm by hand.
What kinds of cases should you test? :: Normal, boundary, empty, duplicates or ties, and unexpected input.
Why does a loop need to change something? :: Otherwise its condition never changes and it never ends.

# Further
- Harvard CS50x, Week 0 notes on algorithms and pseudocode :: https://cs50.harvard.edu/x/notes/0/
- OpenStax Introduction to Python Programming :: https://openstax.org/books/introduction-python-programming/pages/1-introduction
