---
id: p1-numbers
pack: Programming 1 · Values and names
title: Numbers and arithmetic
minutes: 35
source: The Python Tutorial · Numbers
url: https://docs.python.org/3/tutorial/introduction.html
courses: Supports any first programming course
format: 2
python: yes
teaches: int-and-float; floor-division; modulo; rounding-in-python; float-precision
uses: variables; expressions; python-as-calculator; assignment
---
# Goal
Use whole numbers and decimals in Python, divide in three different ways, use the remainder operator, round results for display, and know why decimals in a computer can be slightly off.

# Why
Most programs calculate something: marks, money, times, sizes. Python has two kinds of number and three kinds of division, and choosing the wrong one gives quietly wrong answers. The remainder operator is surprisingly useful, from telling even numbers from odd to converting minutes into hours. And knowing that decimals can be slightly inexact will save you from a classic bug in money and statistics code.

# Warm-up
?? After `x = 4`, then `x = x * 3`, what's in `x`?
=> 12.

?? What's the remainder when 17 is divided by 5?
=> 2, since 3 × 5 = 15 and 17 − 15 = 2.

# Lesson
## Two kinds of number
Python has two main kinds of number:

| Kind | Python name | Examples | Used for |
| --- | --- | --- | --- |
| Whole numbers | `int` (integer) | `7`, `-3`, `2000` | Counts, ages, number of students |
| Decimals | `float` (floating point) | `3.75`, `0.5`, `-2.0` | Measurements, averages, prices with kobo |

Python decides which kind from how you write it: `7` is an int, and `7.0` is a float. You can check with `type`:

```python
print(type(7))
print(type(7.0))
```

```output
<class 'int'>
<class 'float'>
```

When you mix the two in a calculation, the result is a float: `3 + 0.5` is `3.5`.

Why have two kinds at all? Because they suit different jobs. A count of students is always whole, and an int stores it exactly. A measurement or an average often isn't whole, and a float can hold the decimal part. Choose by what the number means: a number of items is an int, and an amount that can be split, such as a height in metres, is a float.

## Three ways to divide
| Operator | Name | Example | Result |
| --- | --- | --- | --- |
| `/` | Division | `17 / 5` | `3.4` |
| `//` | Floor division | `17 // 5` | `3` |
| `%` | Remainder (modulo) | `17 % 5` | `2` |

`/` always gives a float, which may be very slightly approximate, even when it divides exactly: `10 / 2` is `5.0`. `//` floors the result, rounding down towards minus infinity, so `-7 // 2` is `-4`. `%` gives what's left over. Together, `//` and `%` are the long division you learned by hand: 17 divided by 5 is 3, remainder 2.

```python
print(10 / 2)
print(17 // 5)
print(17 % 5)
```

```output
5.0
3
2
```

### Uses of `//` and `%`
These come up constantly.

```python
minutes = 135
print(minutes // 60, "hours and", minutes % 60, "minutes")
print(14 % 2)
print(15 % 2)
```

```output
2 hours and 15 minutes
0
1
```

A number is **even** if `n % 2` is 0, and odd if it's 1. Turning 135 minutes into hours and minutes uses `//` for the hours and `%` for the minutes left over.

> Mistake: Using `//` with negative numbers and expecting it to cut off the decimal. It rounds **down**: `-7 // 2` is `-4`, not `-3`. For counts and lengths, which are rarely negative, this seldom matters.

## Rounding for display
A calculation often gives more decimal places than you want to show. `round(value, places)` rounds to that many places:

```python
average = 200 / 3
print(average)
print(round(average, 2))
```

```output
66.66666666666667
66.67
```

Python's `round` uses a rule called banker's rounding for numbers exactly halfway: it rounds them to the nearest even number, so `round(2.5)` gives 2 and `round(3.5)` gives 4. This avoids a small upward bias when you round many values. It rarely matters in practice, but it explains a result that otherwise looks wrong.

Round only when you **show** a result. Keep the full value for further calculations, exactly as with a calculator, or small rounding errors build up.

## Decimals aren't always exact
Computers store floats in binary, and many decimals, such as 0.1, can't be stored exactly in binary, just as 1/3 can't be written exactly in decimals. The difference is tiny, but it can show up:

```python
print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)
```

```output
0.30000000000000004
False
```

This isn't a bug in Python. Every language that uses standard floats behaves this way. Two habits deal with it:

1. **Round for display**: `round(0.1 + 0.2, 2)` shows `0.3`.
2. **Count money in the smallest unit**: store amounts as whole kobo, using ints, so ₦12.50 is `1250`. Ints are always exact.

For most work, such as averages of marks or sizes of files, the tiny float error never matters, as long as you round what you show. It matters when you compare floats for exact equality, and when you add up many money amounts, where tiny errors can add up to a kobo or more. In those cases, use the two habits above.

### Large numbers
Python ints can be as large as you like, so `2 ** 100` is worked out exactly. You can write large numbers with underscores to make them readable: `1_000_000` is one million. Python ignores the underscores.

# Exercises
?? What do `20 / 4`, `20 // 6` and `20 % 6` give?
=> `5.0`, `3` and `2`.

?? How do you tell if `n` is odd?
=> `n % 2` is 1.

?? Convert 250 seconds into minutes and seconds in Python.
=> `250 // 60` gives 4 minutes, and `250 % 60` gives 10 seconds.

# Practice
1. In the box, set `total_minutes` to the real number of minutes you studied last week, or a likely number.
2. Work out `hours` and `minutes` from it, using `//` and `%`.
3. Set `per_day` to the average minutes per day over 7 days, rounded to 1 decimal place.
4. Predict each printed line before running.
5. Press **Test my code**.

Write your total, your hours and minutes, and your average.

# Starter
```python
total_minutes = 400

# Replace the 0s using //, % and round
hours = 0
minutes = 0
per_day = 0

print(hours, "hours and", minutes, "minutes")
print("Per day:", per_day)
```

# Tests
```python
assert hours == total_minutes // 60, "hours should use // 60"
assert minutes == total_minutes % 60, "minutes should use % 60"
assert per_day == round(total_minutes / 7, 1), "per_day should be total_minutes / 7, rounded to 1 place"
assert hours * 60 + minutes == total_minutes, "hours and minutes should add back up to the total"
```

# Solution
```python
total_minutes = 400

hours = total_minutes // 60
minutes = total_minutes % 60
per_day = round(total_minutes / 7, 1)

print(hours, "hours and", minutes, "minutes")
print("Per day:", per_day)
```

# Rubric
- I used `//` and `%` correctly to split minutes into hours and minutes.
- I rounded only for display.
- My code passes the test, and my hours and minutes add back up to the total.

# Summary
- `int` is a whole number, and `float` is a decimal. Mixing them gives a float.
- `/` gives a float. `//` floors, rounding down. `%` gives the remainder.
- `n % 2` is 0 for even numbers.
- Round with `round(value, places)` for display only.
- Floats can be very slightly off. Round for display, and count money in whole kobo.

# Check
Q: What does `print(17 // 5)` show?
P: Three ways to divide
A: 3
= Floor division gives the whole part.

Q: What does `print({a} % {b})` show?
P: Three ways to divide
Vars: a=20..99, b=3..9
F: a%b
= `%` gives the remainder of {a} ÷ {b}, which is {a%b}.

Q: What does `print(10 / 2)` show?
P: Three ways to divide
- 5
* 5.0
- 5.00
= `/` always gives a float, even when it divides exactly.

Q: What's the type of `3 + 0.5`?
P: Two kinds of number
- int
* float
- It's an error
= Mixing an int and a float gives a float.

Q: How do you test whether `n` is even?
P: Three ways to divide
* Check whether `n % 2` is 0
- Check whether `n / 2` is 0
- Check whether `n // 2` is 1
= Even numbers leave no remainder when divided by 2.

Q: What does `print(round(2.71828, 2))` show?
P: Rounding for display
A: 2.72
= It rounds to two decimal places.

Q: Why does `0.1 + 0.2 == 0.3` give False?
P: Decimals aren't always exact
- Python has a bug in its addition, which it hasn't fixed
* 0.1 and 0.2 can't be stored exactly in binary, so the sum is slightly off
- Because `==` is never allowed to be used with decimal numbers
= Floats are binary approximations of decimals.

Q: What's the safest way to store ₦12.50 in a program that adds up money?
P: Decimals aren't always exact
* As 1250 kobo, using an int
- As 12.5, using a float
- As the text "₦12.50"
= Whole kobo in ints is always exact.

Q[transfer]: A timer shows 3725 seconds. How many whole hours is that, in Python?
P: Three ways to divide
* `3725 // 3600`, which is 1
- `3725 / 3600`, which is 1
- `3725 % 3600`, which is 1
= `//` gives the whole number of hours. The remainder, 125, is what's left over.

Q[transfer]: A statistics program shows an average of 66.66666666666667. What should you do before showing it?
P: Rounding for display
- Change the data, so that the average comes out as a whole number
* Round it for display, to one or two places, and keep the full value for calculations
- Use `//` instead of `/`, so the average is always a whole number
= Round only for display. Rounding the data or using `//` would change the result.

Q[transfer]: In security, a program checks whether a number of login attempts has reached a multiple of 5. Which test works?
P: Three ways to divide
- `attempts / 5 == 0`
* `attempts % 5 == 0`
- `attempts // 5 == 5`
= A multiple of 5 leaves remainder 0.

# Cards
What are Python's two main kinds of number? :: `int` for whole numbers, and `float` for decimals.
What do `/`, `//` and `%` do? :: Exact division, floor division, and remainder.
How do you test if `n` is even? :: `n % 2 == 0`.
When should you round? :: Only for display. Keep the full value for calculations.
Why store money as whole kobo? :: Ints are exact, while floats can be very slightly off.

# Further
- The Python Tutorial, numbers :: https://docs.python.org/3/tutorial/introduction.html
- Python for Everybody, Chapter 2 :: https://www.py4e.com/html3/02-variables
