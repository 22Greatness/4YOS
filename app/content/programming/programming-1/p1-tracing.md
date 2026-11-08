---
id: p1-tracing
pack: Programming 1 · Loops
title: Tracing loops by hand (practice)
minutes: 45
source: Harvard CS50x · Week 0 notes
url: https://cs50.harvard.edu/x/notes/0/
courses: Supports any first programming course
format: 2
python: yes
teaches: loop-trace-table; predict-output; trace-nested-loops; exam-trace-questions
uses: trace-table; while-loop; for-loop; nested-loops; accumulator-pattern; counter-pattern
---
# Goal
Trace any loop by hand with a table, predict its exact output before running it, and answer exam questions that ask what a loop prints.

# Why
"What does this code print?" is one of the most common exam questions in first-year programming, nearly everywhere, and it's done on paper. It's also the skill that lets you read code someone else wrote, and find the line where your own code goes wrong. Loops are where tracing matters most, because the same lines run many times with different values.

# Warm-up
?? How many times is a while loop's condition checked for 3 iterations?
=> Four times. The last check is False and ends the loop.

?? How many times does the inner block run in a 3 by 4 nested loop?
=> 12.

# Lesson
## The trace table for loops
A trace table has a column for each variable that changes, and a column for the condition or the loop variable. Add one row each time a variable changes, or each time the loop goes round. Add an output column for anything printed.

### Worked example: a while loop
```python
n = 1
total = 0
while n <= 4:
    total += n * n
    n += 1
print(total)
```

```output
30
```

| Step | n | `n <= 4`? | total | Output |
| --- | --- | --- | --- | --- |
| Start | 1 | | 0 | |
| 1 | 1 | True | 1 | |
| 2 | 2 | True | 5 | |
| 3 | 3 | True | 14 | |
| 4 | 4 | True | 30 | |
| End | 5 | False | 30 | 30 |

The rules that make it reliable:

1. **Write the starting values first**, before the loop.
2. **Do the lines in order**, exactly as written, even when you think you know the pattern.
3. **Use the new value** of a variable as soon as it changes. In step 1, `total` uses `n = 1`, and only then does `n` become 2.
4. **Check the condition** at the top of every round, including the last one that's False.

Look closely at the last row of the worked example. After the fourth round, `n` becomes 5, and Python goes back to the top to check the condition once more. `5 <= 4` is False, so the loop ends, and only then does the `print` after the loop run. That final check is easy to forget, and forgetting it is how people end up one round out.

> Mistake: Guessing the pattern after two rows and skipping ahead. Loops often change behaviour near the end, at a boundary. Trace every row, at least until you've practised enough to be sure.

## Tracing for loops
For a `for` loop, the loop variable takes each value in turn, so it gets its own column.

```python
count = 0
for word in ["data", "is", "useful", "to", "me"]:
    if len(word) > 2:
        count += 1
print(count)
```

```output
2
```

| word | `len(word) > 2`? | count |
| --- | --- | --- |
| data | True | 1 |
| is | False | 1 |
| useful | True | 2 |
| to | False | 2 |
| me | False | 2 |

## Tracing nested loops
For a nested loop, give each loop variable a column. The inner variable changes on every row. The outer one changes only when the inner loop starts again.

```python
for i in range(1, 3):
    for j in range(i):
        print(i, j)
```

```output
1 0
2 0
2 1
```

| i | `range(i)` gives | j | Output |
| --- | --- | --- | --- |
| 1 | 0 | 0 | 1 0 |
| 2 | 0, 1 | 0 | 2 0 |
| 2 | | 1 | 2 1 |

Read the table row by row. When `i` is 1, `range(1)` gives just 0, so the inner loop runs once and prints `1 0`. Then the outer loop moves on, `i` becomes 2, and the inner loop starts again from the beginning, this time with `range(2)`, giving 0 and then 1.

Notice that the inner loop's range depends on `i`, so it runs once when `i` is 1, and twice when `i` is 2. Questions like this test whether you really follow the inner loop starting again each time.

## Exam technique
When a question asks what code prints:

1. **Find every variable**, and make a column for each, plus Output.
2. **Write the starting values**.
3. **Trace line by line**. Write each printed value in the Output column as it happens.
4. **Check the edges**: the first iteration, the last, and the moment the loop ends.
5. **Write the final output exactly**, on separate lines if there were separate prints.

Most marks are lost by stopping one iteration too early or too late, and by printing inside the loop when the print is really after it. Watch the indentation of every `print`.

Tracing gets faster with practice. At first, write every row in full. As you become confident, you'll be able to track simple loops in your head and only write rows for the tricky parts, such as the first round, the last round and the exit. But in an exam, a neat table is worth the extra minute: it's easier to check, and it shows the examiner your reasoning.

# Exercises
?? Trace `x = 10`, then `while x > 1:` with `x = x // 2` inside. What values does x take?
=> 10, 5, 2, 1. At 1, the condition is False.

?? What does `t = 0`, then `for k in range(3):` with `t += k` inside, then `print(t)` after the loop, print?
=> 3, since 0 + 1 + 2 = 3.

?? If the `print(t)` were indented inside that loop, what would it print?
=> 0, then 1, then 3, on three lines.

# Practice
Trace three loops on paper first, then check yourself in the box.

1. Copy the three snippets in the box onto paper. For each, make a trace table, and write down exactly what you predict it prints.
2. Only after all three predictions are written, run the box and compare.
3. For any you got wrong, find the exact row where your trace went off.
4. Then set `answer1`, `answer2` and `answer3` to the final values of `a`, `b` and `c`, from your traces, and press **Test my code**.

Write your three predictions, and the row where any went wrong.

# Starter
```python
# Snippet 1
a = 0
for i in range(1, 6):
    if i % 2 == 1:
        a += i

# Snippet 2
b = 100
while b > 10:
    b = b - 30

# Snippet 3
c = 0
for x in range(3):
    for y in range(x, 3):
        c += 1

print(a, b, c)

# Your answers from your traces
answer1 = 0
answer2 = 0
answer3 = 0
```

# Tests
```python
assert answer1 == a, "answer1 should match the final value of a: 1 + 3 + 5"
assert answer2 == b, "answer2 should match the final value of b"
assert answer3 == c, "answer3 should match the final value of c"
```

# Solution
```python
# Snippet 1
a = 0
for i in range(1, 6):
    if i % 2 == 1:
        a += i

# Snippet 2
b = 100
while b > 10:
    b = b - 30

# Snippet 3
c = 0
for x in range(3):
    for y in range(x, 3):
        c += 1

print(a, b, c)

answer1 = 9
answer2 = 10
answer3 = 6
```

# Rubric
- I wrote all three predictions before running anything.
- I traced each with a table, including the last check that ends each loop.
- I found the exact row where any wrong prediction went off.

# Summary
- A loop trace table has a column per variable, plus the condition or loop variable and the output.
- Start values first, then lines in order, using new values straight away.
- Check the condition at the top of every round, including the final False one.
- In nested loops, the inner variable changes every row, and the inner loop restarts.
- Watch the indentation of every print: inside the loop, or after it.

# Check
Q: What does `n = 0`, then `for i in range({k}):` with `n += 2` inside, leave in `n`?
P: Tracing for loops
Vars: k=2..12
F: 2*k
= The loop runs {k} times, adding 2 each time: {2*k}.

Q: Trace `x = 1`, then `while x < 50:` with `x = x * 3` inside. What's x at the end?
P: The trace table for loops
A: 81
= 1, 3, 9, 27, 81. At 81 the condition is False.

Q: What does `t = 0`, then `for k in range(4):` with `t += k` inside, then `print(t)` after the loop, print?
P: The trace table for loops
A: 6
= 0 + 1 + 2 + 3 = 6.

Q: How many lines does `for i in range(3):` with `print(i)` inside print?
P: Tracing for loops
A: 3 | three
= One line for each of 0, 1 and 2.

Q: In `for i in range(1, 3):` with `for j in range(i):` inside, how many times does the inner block run?
P: Tracing nested loops
A: 3 | three
= Once when i is 1, twice when i is 2.

Q: When tracing, when should you use a variable's new value?
P: The trace table for loops
* As soon as the line that changes it has run
- Only after the whole loop has completely finished running, never during it
- At the start of the next run of the program
= Lines run in order, so later lines see the new value.

Q: Where are most marks lost on "what does this print" questions?
P: Exam technique
- Writing the numbers too small and too close together for the examiner to read them clearly
* Stopping an iteration too early or late, and misreading print indentation
- Using a pencil instead of a pen in the exam
= Edges and indentation are the usual traps.

Q: Why shouldn't you skip ahead after spotting a pattern?
P: The trace table for loops
* Loops often change behaviour near the end, at a boundary
- Because the examiner always checks that every row is written
- Because patterns in loops are always misleading at the start
= The last iterations are where bugs and trick questions live.

Q[transfer]: A colleague's loop is meant to total 12 monthly values, but the total is too small. What's the quickest way to find out why?
P: The trace table for loops
* Trace it, or print the loop variable and total each round, and find where it differs
- Rewrite the whole program from scratch in a different way
- Run it many more times, hoping the answer will change
= Tracing finds the exact iteration that goes wrong, such as a range that misses a month.

Q[transfer]: In a security exam, you're shown a loop that checks login attempts and asked how many attempts it allows. What's the best method?
P: Exam technique
- Guess from the variable names what the loop is meant to do
* Trace it row by row, especially the last few attempts and the exit
- Count the lines of code in the loop's block
= Tracing the boundary shows what the code really allows, not what it was meant to.

Q[transfer]: A statistics script prints a running total inside a loop, when only the final total was wanted. What's the fix?
P: Exam technique
* Move the print out of the loop, by removing its indentation
- Delete the loop completely, and add the numbers by hand
- Add a break after the print, to stop the loop early
= A print inside the loop runs every iteration. After the loop, it runs once.

# Cards
What columns does a loop trace table need? :: One per variable, the condition or loop variable, and the output.
When do you use a variable's new value? :: As soon as the line that changes it has run.
What should you check at the top of every round? :: The condition, including the final False one.
In a nested loop trace, which variable changes every row? :: The inner loop's variable.
What two traps cost the most marks? :: Iteration count at the edges, and print indentation.

# Further
- Harvard CS50x, Week 0 notes :: https://cs50.harvard.edu/x/notes/0/
- Python for Everybody, Chapter 5 :: https://www.py4e.com/html3/05-iterations
