---
id: p1-types
pack: Programming 1 · Values and names
title: Types and conversion
minutes: 35
source: Python for Everybody · Chapter 2
url: https://www.py4e.com/html3/02-variables
courses: Supports any first programming course
format: 2
python: yes
teaches: type-function; bool-type; convert-types; value-error; truthiness-basics
uses: int-and-float; string-values; input-is-text; read-traceback; type-error
---
# Goal
Say what type any value has, convert between strings, ints, floats and booleans, and know what happens when a conversion can't work.

# Why
Every value in Python has a type, and the type decides what you can do with it. Adding two ints gives a sum. Adding two strings joins them. Most confusing bugs in beginners' programs come from a value having a different type from the one you thought. This lesson gives you the tools to check a type, change it on purpose, and recognise the errors when something can't be converted.

# Warm-up
?? What type does `input` always return?
=> A string.

?? What's the difference between `7` and `7.0` in Python?
=> `7` is an int, and `7.0` is a float.

# Lesson
## The basic types
You've met three types. Here's the fourth, and a summary of all of them.

| Type | Python name | Examples | Meaning |
| --- | --- | --- | --- |
| Whole number | `int` | `25`, `-3`, `0` | Counts |
| Decimal | `float` | `3.75`, `0.5`, `2.0` | Measurements |
| Text | `str` | `"Ada"`, `"25"`, `""` | Words and characters |
| True or false | `bool` | `True`, `False` | Answers to yes or no questions |

`""` is the **empty string**: text with nothing in it. It's still a string.

A **bool** (short for Boolean, after the mathematician George Boole) has only two values, `True` and `False`, with capital letters. Comparisons give bools:

```python
print(70 >= 40)
print("Ada" == "ada")
print(type(70 >= 40))
```

```output
True
False
<class 'bool'>
```

Bools are what decisions run on, as you'll see in the next unit.

Why does the type matter so much? Because the same symbol can mean different things for different types. For ints and floats, `+` adds. For strings, it joins. For a string and an int together, it fails. Python looks at the types of the values on each side and decides what to do. So when an operation surprises you, the first question to ask is: what types are these values, really? Very often, one of them is a string that only looks like a number.

### Checking a type
`type` tells you what type a value has. When a program behaves strangely, printing the type of a value is often the quickest way to find out why.

```python
mark = "70"
print(type(mark))
```

```output
<class 'str'>
```

## Converting between types
Each type has a function with its name that converts other values into it.

| Conversion | Example | Result |
| --- | --- | --- |
| Text to whole number | `int("25")` | `25` |
| Text to decimal | `float("3.75")` | `3.75` |
| Number to text | `str(25)` | `"25"` |
| Decimal to whole number | `int(3.99)` | `3` |
| Whole number to decimal | `float(7)` | `7.0` |

Notice `int(3.99)` gives `3`. Converting a float to an int cuts off the decimal part. It doesn't round. If you want rounding, use `round(3.99)`, which gives `4`.

`str` is useful for joining numbers into text with `+`, though an f-string is usually clearer:

```python
port = 443
print("Port " + str(port))
print(f"Port {port}")
```

```output
Port 443
Port 443
```

> Mistake: Expecting `int("3.5")` to work. `int` can turn `"3"` into 3, and `3.5` into 3, but not the text `"3.5"`. Use `float("3.5")` first, and then `int` if you really want a whole number.

## When conversion fails
If the text isn't a valid number, conversion fails with a `ValueError`:

```python
print(int("twenty"))
```

```output
Traceback (most recent call last):
  File "<string>", line 1, in <module>
ValueError: invalid literal for int() with base 10: 'twenty'
```

The message says that `'twenty'` isn't a whole number written in ordinary base ten digits. A `ValueError` means the type was right, a string, but the value couldn't be used. That's different from a `TypeError`, where the type itself was wrong.

| Error | Meaning | Example |
| --- | --- | --- |
| `TypeError` | The wrong type for this operation | `"Age: " + 21` |
| `ValueError` | The right type, but an unusable value | `int("twenty")` |

This distinction helps you fix problems faster. A TypeError tells you to look at what kind of value you have, and perhaps convert it. A ValueError tells you the kind is right, but the content is wrong, so look at exactly what was typed or read from the file.

Spaces at the ends are allowed, as `int(" 25 ")` gives 25. But a comma isn't: `int("1,500")` is a ValueError. Real typed numbers often contain commas, so tidy them first with `.replace(",", "")`.

## True, false and conversion
`bool` converts values into `True` or `False`. The rule is simple: **empty or zero is False, and almost everything else is True**.

| Value | `bool(value)` |
| --- | --- |
| `0`, `0.0` | `False` |
| `""` (empty string) | `False` |
| Any other number | `True` |
| Any non-empty string, even `"False"` or `"0"` | `True` |

That last row catches people: `bool("False")` is `True`, because the string isn't empty. To turn typed yes or no answers into a bool, compare the text instead: `answer.strip().lower() == "yes"`.

# Exercises
?? What are the types of `"3"`, `3`, `3.0` and `3 > 2`?
=> `str`, `int`, `float` and `bool`.

?? What do `int(7.9)` and `round(7.9)` give?
=> `7` and `8`. `int` cuts off the decimal, and `round` rounds.

?? Why does `int("1,200")` fail, and how do you fix it?
=> The comma isn't allowed. Use `int("1,200".replace(",", ""))`, which gives 1200.

# Practice
Clean and convert real-looking data that was typed into a form. The typed values are already in variables, as text.

1. `typed_price` holds `"1,500"`. Set `price` to the whole number 1500.
2. `typed_rate` holds `" 7.5 "`. Set `rate` to the decimal 7.5.
3. `typed_agree` holds `"Yes"`. Set `agree` to the bool `True` if it says yes, ignoring case and spaces.
4. Set `label` to an f-string, `"1500 at 7.5%"`.
5. Print the type of each value, and predict them first. Then press **Test my code**.

Write which conversions failed on your first try, and why.

# Starter
```python
typed_price = "1,500"
typed_rate = " 7.5 "
typed_agree = "Yes"

# Replace these with your code
price = typed_price
rate = typed_rate
agree = typed_agree
label = ""

print(type(price), type(rate), type(agree))
print(label)
```

# Tests
```python
assert price == 1500 and type(price) == int, "price should be the int 1500"
assert rate == 7.5 and type(rate) == float, "rate should be the float 7.5"
assert agree is True, "agree should be True"
assert label == "1500 at 7.5%", "label should be '1500 at 7.5%'"
```

# Solution
```python
typed_price = "1,500"
typed_rate = " 7.5 "
typed_agree = "Yes"

price = int(typed_price.replace(",", ""))
rate = float(typed_rate)
agree = typed_agree.strip().lower() == "yes"
label = f"{price} at {rate}%"

print(type(price), type(rate), type(agree))
print(label)
```

# Rubric
- I checked types with `type` and predicted them first.
- I tidied the text before converting, and converted to the right type.
- My code passes the test.

# Summary
- The basic types are int, float, str and bool.
- `type(value)` tells you a value's type.
- Convert with `int`, `float`, `str` and `bool`. `int(3.99)` cuts off to 3.
- A ValueError means the right type but an unusable value, such as `int("twenty")`.
- Empty or zero is False. Any non-empty string, even `"False"`, is True.

# Check
Q: What's the type of `"25"`?
P: The basic types
- int
- float
* str
= It's in quotes, so it's text.

Q: What does `10 > 3` give?
P: The basic types
* The bool True
- The string "True"
- The number 1
= A comparison gives a bool.

Q: What does `int(7.8)` give?
P: Converting between types
A: 7
= Converting a float to an int cuts off the decimal part.

Q: What does `str({a}) + str({b})` give?
P: Converting between types
Vars: a=2..9, b=2..9
F: a*10+b
= Both become strings, so they join: "{a}" then "{b}".

Q: What does `int("twenty")` cause?
P: When conversion fails
- A TypeError
* A ValueError
- It gives 20
= The type, text, is fine. The value can't be read as a number.

Q: Why does `int("1,500")` fail?
P: When conversion fails
* The comma isn't allowed in the text
- 1,500 is far too large to be an int
- Text can never be turned into a number
= Remove the comma first with `.replace(",", "")`.

Q: What does `bool("False")` give?
P: True, false and conversion
* True
- False
- It's an error
= Any non-empty string is True, whatever it says.

Q: What does `bool(0)` give?
P: True, false and conversion
* False
- True
- It's an error
= Zero is False.

Q[transfer]: A spreadsheet export gives amounts like "12,400.50" as text. How should a Python script turn them into numbers?
P: When conversion fails
- `int("12,400.50")`
* `float("12,400.50".replace(",", ""))`
- `bool("12,400.50")`
= Remove the commas, then convert to a float.

Q[transfer]: A settings file stores `debug = "False"`, and code does `if bool(debug):`. Debug mode turns on. Why?
P: True, false and conversion
* `bool("False")` is True, because the string isn't empty
- Python always ignores settings written in a file
- The word False must be written in capitals to work
= Compare the text instead: `debug == "True"`.

Q[transfer]: A program reads an exam mark and gets `ValueError: invalid literal for int()`. What should you check first?
P: When conversion fails
- Whether the computer has enough memory available
* What exactly was typed, such as letters, commas or a decimal point
- Whether the mark was higher than 100
= A ValueError means the text couldn't be read as a whole number.

# Cards
What are Python's four basic types? :: int, float, str and bool.
How do you check a value's type? :: `type(value)`.
What does `int(3.99)` give? :: 3. It cuts off the decimal, without rounding.
What's the difference between TypeError and ValueError? :: TypeError: wrong type. ValueError: right type, unusable value.
What does `bool("False")` give? :: True, because the string isn't empty.

# Further
- Python for Everybody, Chapter 2 :: https://www.py4e.com/html3/02-variables
- The Python Tutorial, input and output :: https://docs.python.org/3/tutorial/inputoutput.html
