---
id: p1-flowcharts
pack: Programming 1 · Solving before coding
title: Flowcharts and pseudocode
minutes: 35
source: Harvard CS50x · Week 0 notes
url: https://cs50.harvard.edu/x/notes/0/
courses: Supports any first programming course
format: 2
teaches: flowchart-symbols; pseudocode-conventions; translate-between-forms
uses: algorithm-meaning; three-structures; trace-table; test-cases
---
# Goal
Draw a correct flowchart and write clear pseudocode for any algorithm, translate between the two, and check both by tracing.

# Why
Many first-year computing exams ask for an algorithm as a flowchart or in pseudocode, on paper, with no computer. Both are ways of showing the logic without the details of one language. They also force you to make every decision and loop visible, which is where most mistakes hide. Later, at work, flowcharts are how teams agree on a process before anyone builds it.

# Warm-up
?? What are the three structures every algorithm is built from?
=> Sequence, selection and repetition.

?? What is a trace table?
=> A table with a column for each changing value and a row for each step, used to run an algorithm by hand.

# Lesson
## The flowchart symbols
A **flowchart** draws an algorithm as shapes joined by arrows. The arrows show the order. These are the common shapes, though your lecturer may use slightly different conventions, so follow theirs in an exam.

| Shape | Name | Used for | Example |
| --- | --- | --- | --- |
| Rounded rectangle (oval) | Terminator | Start and end | START, STOP |
| Parallelogram | Input or output | Getting or showing data | INPUT mark, OUTPUT "Pass" |
| Rectangle | Process | A calculation or action | total = total + mark |
| Diamond | Decision | A yes or no question | Is mark ≥ 40? |
| Arrow | Flow line | Which step comes next | |

Rules that keep a flowchart correct:

1. Exactly **one start**, and every path must reach an **end**.
2. A **decision has two exits**, labelled Yes and No (or True and False).
3. Every shape except the end has an arrow **leaving** it.
4. A **loop** is an arrow going back up to an earlier step, usually from a decision.

### Worked example: pass or fail
```text
        ( START )
            |
     / INPUT mark /
            |
     < mark >= 40 ? >
       Yes /     \ No
          /       \
 / OUTPUT "Pass" /  / OUTPUT "Not yet" /
          \       /
           ( STOP )
```

The pass mark of 40 is an example. Use your own course's.

## Pseudocode conventions
**Pseudocode** writes the same logic as structured English. It isn't a real language, so there's no single correct way to write it. But exams expect it to be clear and consistent, and these keywords are common:

| Structure | Pseudocode |
| --- | --- |
| Input and output | `INPUT mark`, `OUTPUT total` |
| Assignment | `SET total TO 0` or `total ← 0` |
| Selection | `IF ... THEN ... ELSE ... END IF` |
| Repetition, a count | `FOR i FROM 1 TO 10 ... END FOR` |
| Repetition, a condition | `WHILE ... DO ... END WHILE` |

Indent whatever is inside an IF or a loop. It shows clearly which steps belong to which structure.

### Worked example: the average of marks
```text
INPUT n                      // how many marks
IF n = 0 THEN
    OUTPUT "No marks entered"
ELSE
    SET total TO 0
    FOR i FROM 1 TO n
        INPUT mark
        SET total TO total + mark
    END FOR
    OUTPUT total / n
END IF
```

Notice the check for `n = 0` at the start. Without it, the last line would divide by zero. A good algorithm handles the empty case on purpose.

> Mistake: Writing pseudocode that's really just vague English, such as "work out the average". Pseudocode must still be precise: each line is one clear action, decision or loop.

## Translating between the two
Each structure has a matching shape pattern, so translating is mechanical once you know them.

| Pseudocode | Flowchart |
| --- | --- |
| A line of action | A rectangle |
| INPUT or OUTPUT | A parallelogram |
| IF ... ELSE ... END IF | A diamond, two branches, which join again below |
| WHILE condition ... END WHILE | A diamond. Yes leads into the body, which loops back to the diamond. No leads on |
| FOR i FROM 1 TO n | Set i to 1, a diamond asking "i ≤ n?", the body, then add 1 to i and loop back |

A FOR loop has no shape of its own in a flowchart. You draw it as its parts: start a counter, test it, do the body, step the counter.

## Checking your design
A diagram can look neat and still be wrong. Check it the same way as any algorithm: with a trace table and chosen test cases.

| Check | What to look for |
| --- | --- |
| Every path ends | Follow each branch. Does it reach STOP? |
| Loops finish | Does something in the loop move it towards ending? |
| Boundaries | Trace the exact edge values, such as a mark of exactly 40 |
| Empty case | What if there are no items? |

### Worked example: tracing the average with n = 3
Marks: 50, 70, 30.

| Step | i | mark | total |
| --- | --- | --- | --- |
| Start | | | 0 |
| 1 | 1 | 50 | 50 |
| 2 | 2 | 70 | 120 |
| 3 | 3 | 30 | 150 |
| Output | | | 150 / 3 = 50 |

The answer is 50, which is correct. Now trace with n = 0: it outputs "No marks entered" and never divides. That's the empty case handled.

# Exercises
?? Which flowchart shape would show "total = total + mark"?
=> A rectangle, because it's a process.

?? Write pseudocode that outputs the larger of two numbers, a and b.
=> INPUT a, b. IF a > b THEN OUTPUT a ELSE OUTPUT b END IF. (If they're equal, either is fine, but say so.)

?? How do you draw `WHILE total < 100 DO ... END WHILE` as a flowchart?
=> A diamond asking "total < 100?". Yes goes to the body, which arrows back to the diamond. No goes on to the next step.

# Practice
Do this on paper.

1. Choose a small real algorithm: for example, working out whether you can afford a list of items with the money you have.
2. Write it in pseudocode, with at least one IF and one loop, and a check for the empty case.
3. Draw the same algorithm as a flowchart, using the correct shapes.
4. Trace it with a normal case, a boundary case and an empty case. Write the expected result before each trace.
5. Fix anything that failed, in both forms.

Write your pseudocode, describe your flowchart's shapes in order, and list your three tests with their results.

# Rubric
- My pseudocode is precise, with one action per line and consistent indentation.
- My flowchart uses the correct shapes, with one start, labelled decisions and every path ending.
- I traced it with normal, boundary and empty cases.

# Summary
- Ovals for start and end, parallelograms for input and output, rectangles for actions, diamonds for decisions.
- A decision has two labelled exits. A loop is an arrow going back up.
- Pseudocode is precise structured English: INPUT, OUTPUT, SET, IF, FOR, WHILE.
- Each pseudocode structure maps to a shape pattern.
- Check designs by tracing, including boundary and empty cases.

# Check
Q: Which shape shows a decision?
P: The flowchart symbols
- A rectangle
- A parallelogram
* A diamond
= Decisions are diamonds, with Yes and No exits.

Q: Which shape shows "INPUT mark"?
P: The flowchart symbols
* A parallelogram
- A diamond
- An oval
= Input and output use parallelograms.

Q: How many exits does a decision have?
P: The flowchart symbols
A: 2 | two
= Yes and No, each labelled.

Q: Match each shape to its use.
P: The flowchart symbols
M: Oval => Start or end
M: Rectangle => A calculation or action
M: Diamond => A yes or no question
M: Parallelogram => Input or output
= These four shapes, plus arrows, draw almost any algorithm.

Q: What does `IF ... THEN ... ELSE ... END IF` become in a flowchart?
P: Translating between the two
- A single large rectangle that contains both of the choices, written out side by side
* A diamond with two branches that join again below
- Two completely separate flowcharts, one drawn for each of the choices
= The two branches rejoin, so the algorithm carries on.

Q: How is a FOR loop drawn in a flowchart?
P: Translating between the two
- With a special loop-shaped symbol of its own
* As its parts: start a counter, test it, the body, then step it and loop back
- It can't be drawn in a flowchart at all, so you write it out in words beside the chart
= Flowcharts show loops with a decision and an arrow back.

Q: Why should the average algorithm check `n = 0` first?
P: Pseudocode conventions
* Otherwise it would divide by zero when there are no marks
- Because pseudocode always has to start with a decision before any other step can come
- Because zero is never a valid number in any algorithm
= Handling the empty case on purpose prevents a crash.

Q: Trace `SET t TO 0. FOR i FROM 1 TO 4: SET t TO t + i.` What is t at the end?
P: Checking your design
A: 10
= 1 + 2 + 3 + 4 = 10.

Q[transfer]: An exam asks for an algorithm that prints whether a number is even or odd. Which pseudocode fits best?
P: Pseudocode conventions
- Work out if the number is even, and then print the result
* INPUT n. IF n MOD 2 = 0 THEN OUTPUT "even" ELSE OUTPUT "odd" END IF
- Print "even", because most numbers that people use are even
= It's precise: one input, one decision and two outputs. MOD gives the remainder.

Q[transfer]: A team at work disagrees on how refunds should be handled. How could a flowchart help?
P: The flowchart symbols
* It shows every decision and path, so the team can agree before anyone builds it
- It replaces the need to ever discuss the refund process again
- It makes the refund process faster without changing any steps
= Drawing the decisions makes disagreements visible early.

Q[transfer]: Your flowchart has a branch that never reaches STOP. What does that mean when the algorithm runs?
P: Checking your design
- Nothing, because the computer will finish that path by itself
* Following that path, the algorithm never finishes or never gives a result
- The flowchart is fine, as long as most of the paths do reach STOP
= Every path must reach an end, or that case is never finished.

# Cards
What shape is a decision in a flowchart? :: A diamond, with two labelled exits.
What shape is input or output? :: A parallelogram.
What are the rules for a correct flowchart? :: One start, every path reaches an end, decisions have two labelled exits.
How is a loop shown in a flowchart? :: An arrow going back up to an earlier step, usually from a decision.
How do you check a design? :: Trace it with normal, boundary and empty cases.

# Further
- Harvard CS50x, Week 0 notes :: https://cs50.harvard.edu/x/notes/0/
- Python for Everybody, Chapter 1 :: https://www.py4e.com/html3/01-intro
