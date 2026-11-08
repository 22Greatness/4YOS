---
id: p1-input-output
pack: Programming 1 · Values and names
title: Input and output
minutes: 35
source: The Python Tutorial · Input and output
url: https://docs.python.org/3/tutorial/inputoutput.html
courses: Supports any first programming course
format: 2
python: yes
teaches: input-function; input-is-text; print-options; program-dialogue
uses: variables; f-strings; string-methods; print-function
---
# Goal
Get text from the person using your program with `input`, know that it always arrives as text, and control exactly how `print` shows results.

# Why
A program that always uses the same numbers can only ever give one answer. Input lets the same program answer a new question each time it runs: your marks this term, your budget this month. Almost every useful program takes input of some kind, from what a user types to what's in a file. And the most common beginner bug in Python, adding together two typed numbers and getting them joined as text, comes from this lesson.

# Warm-up
?? What does `f"Total: {4500:,}"` give?
=> `Total: 4,500`.

?? What does `"  ada ".strip().title()` give?
=> `"Ada"`.

# Lesson
## Asking for input
`input` shows a message, called a **prompt**, waits for the person to type something and press Enter, and gives you what they typed.

```text
name = input("What is your name? ")
print(f"Hello, {name}")
```

When this runs, the screen shows `What is your name? `, the person types `Ada` and presses Enter, and the program prints `Hello, Ada`. End the prompt with a space, so the typed answer doesn't touch the question.

> Note: The Python boxes in 4YOS lessons can't pause for you to type, so `input` examples here are shown as text, not run. In the practice boxes, we put what the person would have typed into a variable instead. In a full Python program on a computer, `input` works as described.

## Input always arrives as text
This is the key fact of this lesson. **Whatever the person types, `input` gives you a string**, even if they type a number. If they type `25`, you get `"25"`, the text, not the number 25.

That causes a classic bug:

```python
first = "20"    # what input would give if the person typed 20
second = "30"   # and 30
print(first + second)
```

```output
2030
```

`+` joins the two strings instead of adding the numbers. To do arithmetic, you must turn the text into a number first, with `int` for whole numbers or `float` for decimals:

```python
first = "20"
second = "30"
print(int(first) + int(second))
```

```output
50
```

So the usual pattern for reading a number is:

```text
age = int(input("How old are you? "))
price = float(input("Price in naira: "))
```

You'll learn more about converting between types, and what happens when the text isn't a number, in the next lesson.

> Mistake: Forgetting the conversion. Your program runs with no error, and gives `2030` instead of `50`. It's a logic error, so nothing warns you. When a program reads numbers, convert them straight away, on the same line as `input`.

## Controlling print
`print` has two useful options, written inside its brackets after the values.

| Option | Default | What it changes | Example |
| --- | --- | --- | --- |
| `sep` | `" "` (a space) | What goes between items | `print("a", "b", sep="-")` shows `a-b` |
| `end` | `"\n"` (a new line) | What comes after the last item | `print("a", end="")` doesn't start a new line |

```python
print("2026", "11", "06", sep="-")
print("Loading", end="")
print("...done")
```

```output
2026-11-06
Loading...done
```

## A program that talks to people
A good interactive program does three things. It asks clearly, it checks what it got, and it answers in a way the person understands.

- **Ask clearly**: say what you want and in what form. "Amount in naira, numbers only: " is better than "Enter: ".
- **Tidy the input**: people add spaces and use odd capitals. Use `.strip()` and `.lower()` before using text answers.
- **Answer clearly**: use an f-string with units, such as `f"You have ₦{left:,} left"`, not just a bare number.

### Worked example: a budget check
```text
money = float(input("How much do you have, in naira? "))
cost = float(input("How much does it cost, in naira? "))
left = money - cost
print(f"After buying it, you'd have ₦{left:,.2f} left.")
```

Notice that both inputs are converted to `float` straight away, and the answer is formatted with commas and two decimal places. If the person types `5000` and `1250.50`, the program prints `After buying it, you'd have ₦3,749.50 left.`

Reading the program from top to bottom, you can see the input, processing and output stages you met in How Computers Work: two inputs, one calculation, one output.

What if they type `five thousand`? `float` can't convert that, and the program stops with an error. You'll learn to handle that politely in the Files and errors unit.

# Exercises
?? `a = input()` and the person types `7`. What is in `a`, and what type is it?
=> The text `"7"`, a string.

?? Why does `print("5" + "5")` show `55`?
=> Both are strings, so `+` joins them.

?? Write one line that reads a whole number of hours into `hours`.
=> `hours = int(input("How many hours? "))`.

# Practice
Write the calculation part of a program that asks for two real costs and shows the total. Here, the typed answers are already in `typed_a` and `typed_b`, as `input` would give them.

1. Convert both to numbers and store them in `a` and `b`.
2. Set `total` to their sum.
3. Set `message` to an f-string like `"Total: ₦4,250.00"`, with commas and two decimal places.
4. Predict the output, run, and press **Test my code**.

Write down what went wrong if you forgot to convert, and why.

# Starter
```python
typed_a = "3000"     # as input would give it
typed_b = "1250"

# Replace these with your code
a = typed_a
b = typed_b
total = a + b
message = ""

print(message)
```

# Tests
```python
assert a == 3000 and b == 1250, "a and b should be numbers, converted from the typed text"
assert total == 4250, "total should be 4250"
assert message == "Total: ₦4,250.00", "message should be 'Total: ₦4,250.00'"
```

# Solution
```python
typed_a = "3000"
typed_b = "1250"

a = float(typed_a)
b = float(typed_b)
total = a + b
message = f"Total: ₦{total:,.2f}"

print(message)
```

# Rubric
- I converted the typed text to numbers before adding.
- The message shows units, commas and two decimal places.
- My code passes the test.

# Summary
- `input("prompt ")` waits for typing, and returns what was typed.
- Input is always a string, even when the person types a number.
- Convert straight away: `int(input(...))` or `float(input(...))`.
- `sep` sets what goes between printed items, and `end` what comes after.
- Ask clearly, tidy text input, and answer with units.

# Check
Q: The person types `42` at an `input` prompt. What do you get?
P: Input always arrives as text
- The whole number 42, ready for arithmetic straight away
* The string "42"
- The decimal number 42.0
= `input` always returns text.

Q: What does `print("20" + "30")` show?
P: Input always arrives as text
A: 2030
= Both are strings, so `+` joins them.

Q: What does `print(int("20") + int("30"))` show?
P: Input always arrives as text
A: 50
= Converted to numbers, they add.

Q: Which line reads a decimal price correctly?
P: Input always arrives as text
- `price = input("Price: ")`
* `price = float(input("Price: "))`
- `price = int("Price: ")`
= Convert the typed text straight away.

Q: What does `print("a", "b", "c", sep="/")` show?
P: Controlling print
A: a/b/c
= `sep` replaces the space between items.

Q: What does `end=""` do in `print("Loading", end="")`?
P: Controlling print
* It stops print from starting a new line afterwards
- It ends the whole program straight after printing the word, without running anything else
- It removes the last letter from the printed word
= The next print continues on the same line.

Q: Which prompt is clearest?
P: A program that talks to people
- `"Enter: "`
- `"Input value"`
* `"Amount in naira, numbers only: "`
= It says what's wanted and in what form.

Q: Why use `.strip()` on a typed answer?
P: A program that talks to people
- Because typed answers can never have more than one word in them, so spaces must go
* To remove spaces people add by accident
- Because `input` always adds three spaces at the end
= People type stray spaces. Tidy before using.

Q[transfer]: A sign-up program asks for an age and checks `if age > 17`. It always crashes with a TypeError. What's the most likely cause?
P: Input always arrives as text
* The age was never converted from text with `int`
- The number 17 in the check is too small for Python to compare with any age
- Python can't compare ages, only other numbers
= Comparing text with a number fails. Convert first.

Q[transfer]: A form asks "yes or no?", and a person types " Yes ". How should the program check the answer?
P: A program that talks to people
- Check whether the answer is exactly equal to "yes"
* Tidy it with `.strip().lower()`, then compare with "yes"
- Count the letters in the answer, and treat any three-letter answer as a yes
= Tidying makes " Yes " match "yes".

Q[transfer]: A shop program shows totals as `4250.0`. How could it show them better for customers?
P: A program that talks to people
- Leave it, because customers understand the decimal point
* Format it with units and separators, such as `f"₦{total:,.2f}"`
- Use `int` on every total, so that the decimal part is removed from it for good
= Clear units and formatting make output easy to read.

# Cards
What does `input` return? :: What was typed, always as a string.
Why does `"20" + "30"` give `"2030"`? :: Both are strings, so `+` joins them.
How do you read a whole number? :: `int(input("prompt "))`.
What do `sep` and `end` do in print? :: `sep` goes between items. `end` comes after the last one.
What makes a good prompt? :: It says what's wanted and in what form.

# Further
- The Python Tutorial, input and output :: https://docs.python.org/3/tutorial/inputoutput.html
- Python for Everybody, Chapter 2 :: https://www.py4e.com/html3/02-variables
