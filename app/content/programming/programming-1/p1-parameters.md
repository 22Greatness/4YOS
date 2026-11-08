---
id: p1-parameters
pack: Programming 1 · Functions
title: Parameters and return values
minutes: 45
source: Python for Everybody · Chapter 4
url: https://www.py4e.com/html3/04-functions
courses: Supports any first programming course
format: 2
python: yes
teaches: parameters; arguments; return-statement; print-vs-return; default-parameters
uses: define-function; call-function; variables; if-statement; f-strings
---
# Goal
Give a function the values it needs through parameters, get a result back with `return`, know the difference between returning and printing, and give parameters sensible defaults.

# Why
A function that always does exactly the same thing is limited. Parameters let one function work on any values: one `average` function for any set of marks, one `fee` function for any order. Return values let a function hand its result back to the code that called it, so results can be stored, compared and passed on. This is what turns functions from shortcuts into the building blocks of real programs.

# Warm-up
?? What does `def` do?
=> Defines a function. Its steps run only when it's called.

?? Where does Python continue when a function finishes?
=> Just after the line that called it.

# Lesson
## Parameters: giving a function values
A **parameter** is a name in the brackets of a `def`. It's a variable that receives a value each time the function is called. The value you pass in the call is called an **argument**.

```python
def greet(name):
    print(f"Welcome, {name}")

greet("Ada")
greet("Tunde")
```

```output
Welcome, Ada
Welcome, Tunde
```

`name` is the parameter. `"Ada"` and `"Tunde"` are the arguments. Each call puts its argument into `name`, then runs the steps. One function now greets anyone.

A function can have several parameters, separated by commas. Arguments are matched to parameters **in order**: the first argument goes into the first parameter, and so on.

```python
def show_mark(name, mark):
    print(f"{name}: {mark}")

show_mark("Ada", 72)
```

```output
Ada: 72
```

> Mistake: Passing arguments in the wrong order. `show_mark(72, "Ada")` prints `72: Ada`. Python can't tell that you meant otherwise. You can make calls clearer by naming the arguments: `show_mark(name="Ada", mark=72)`.

## return: giving a value back
`return` ends the function and hands a value back to wherever it was called. That value can be stored, printed, or used in an expression, just like the result of `len` or `round`.

```python
def average(a, b, c):
    return (a + b + c) / 3

mine = average(60, 75, 90)
print(mine)
print(average(50, 50, 80) > 55)
```

```output
75.0
True
```

Trace the call `average(60, 75, 90)`. Python puts 60 into `a`, 75 into `b` and 90 into `c`. It works out `(60 + 75 + 90) / 3`, which is 75.0, and `return` hands that back. The whole call, `average(60, 75, 90)`, is replaced by its result, 75.0, which is then stored in `mine`. That's why a returned value can go anywhere a value can go: into a variable, into a comparison, or into another function's brackets.

When Python reaches `return`, the function stops at once, even if there are more lines below it. That's useful in decisions:

```python
def grade(mark):
    if mark >= 70:
        return "A"
    if mark >= 50:
        return "C"
    return "below C"

print(grade(85), grade(55), grade(30))
```

```output
A C below C
```

As before, these grade bands are only an example.

## Printing isn't returning
This is the most important distinction in this unit, and the most common confusion. `print` shows a value on the screen, for a person to read. `return` gives a value back to the program, for the code to use. A function that prints a result can't have that result stored or used in a calculation.

```python
def add_print(a, b):
    print(a + b)

def add_return(a, b):
    return a + b

x = add_print(2, 3)
y = add_return(2, 3)
print("x is", x)
print("y is", y)
```

```output
5
x is None
y is 5
```

`add_print` showed 5 on the screen, but gave nothing back, so `x` holds **None**, Python's special value meaning "nothing". `add_return` gave 5 back, so `y` holds 5.

| | `print` inside a function | `return` from a function |
| --- | --- | --- |
| Who gets the value | The person looking at the screen | The code that called the function |
| Can it be stored in a variable? | No, you get `None` | Yes |
| Can it be used in a calculation? | No | Yes |

As a rule, functions that work out a value should **return** it, and let the calling code decide whether to print it. That makes them reusable, and testable. A function that returns a grade can be used in a report, a chart, or a decision. A function that prints a grade can only ever show it on the screen, once.

## Default values
A parameter can have a **default**: a value used when the call doesn't give one.

```python
def delivery_fee(order, free_from=10000):
    if order >= free_from:
        return 0
    return 800

print(delivery_fee(12000))
print(delivery_fee(12000, free_from=15000))
```

```output
0
800
```

The fee and threshold are invented. Defaults let a function handle the usual case simply, while still allowing a different value when needed. Parameters with defaults go after the ones without.

# Exercises
?? In `def area(width, height):` called as `area(4, 7)`, what's in `height`?
=> 7. Arguments match parameters in order.

?? What's stored in `r` after `def f(): print(3)` and `r = f()`?
=> None. The function printed 3, but returned nothing.

?? Write a function `double(n)` that gives back twice n.
=> `def double(n):` then, indented, `return n * 2`.

# Practice
Write two functions that work out real money values, returning them instead of printing.

1. `weekly_cost(daily, days)` returns daily times days.
2. `can_afford(money, cost)` returns True if money is at least cost, and False otherwise.
3. Below them, use both with real or likely amounts: work out your weekly transport cost, then check whether you can afford it with what you have, and print a clear message.
4. Predict the results, run, and press **Test my code**. The test calls your functions with its own values.

Write your amounts, and what each function returned.

# Starter
```python
def weekly_cost(daily, days):
    # Replace this line
    return 0

def can_afford(money, cost):
    # Replace this line
    return False

# Use them with your real or likely amounts
cost = weekly_cost(800, 5)
print(f"Weekly transport: ₦{cost:,}")
print("Can afford:", can_afford(5000, cost))
```

# Tests
```python
assert weekly_cost(800, 5) == 4000, "weekly_cost(800, 5) should be 4000"
assert weekly_cost(0, 7) == 0, "weekly_cost(0, 7) should be 0"
assert weekly_cost(1500, 3) == 4500, "weekly_cost(1500, 3) should be 4500"
assert can_afford(5000, 4000) is True, "can_afford(5000, 4000) should be True"
assert can_afford(4000, 4000) is True, "can_afford(4000, 4000) should be True: exactly enough is enough"
assert can_afford(3999, 4000) is False, "can_afford(3999, 4000) should be False"
```

# Solution
```python
def weekly_cost(daily, days):
    return daily * days

def can_afford(money, cost):
    return money >= cost

cost = weekly_cost(800, 5)
print(f"Weekly transport: ₦{cost:,}")
print("Can afford:", can_afford(5000, cost))
```

# Rubric
- My functions return their results instead of printing them.
- I used them with real or likely amounts, and printed the results outside the functions.
- My code passes the test, including the exact-amount edge.

# Summary
- A parameter is a name in the def. An argument is the value passed in the call.
- Arguments match parameters in order, unless you name them.
- `return` hands a value back and ends the function straight away.
- Printing shows a value to a person. Returning gives it to the code. A function with no return gives `None`.
- Defaults give a parameter a value when the call leaves it out.

# Check
Q: What does `def add(a, b): return a + b`, then `print(add({x}, {y}))`, show?
P: return: giving a value back
Vars: x=1..50, y=1..50
F: x+y
= The function returns {x} + {y} = {y+x}, and print shows it.

Q: In `def f(a, b):` called as `f(10, 20)`, what's in `b`?
P: Parameters: giving a function values
A: 20
= Arguments match parameters in order.

Q: What's the argument in `greet("Ada")`?
P: Parameters: giving a function values
- `greet`
- `name`
* `"Ada"`
= The argument is the value passed in the call.

Q: What does a function return if it has no `return` line?
P: Printing isn't returning
* None
- 0
- The last value it printed
= Without return, the function gives back None.

Q: `def f(): print(7)`, then `r = f()`. What's in `r`?
P: Printing isn't returning
- 7
* None
- "7"
= It printed 7, but returned nothing.

Q: What happens to the lines below a `return` that runs?
P: return: giving a value back
* They don't run, because return ends the function
- They run first, and then the value is returned
- They are saved, and they run the next time the same function is called again
= return stops the function straight away.

Q: Why should a function that calculates a value return it, rather than print it?
P: Printing isn't returning
- Because printing is not allowed inside any function
* So the calling code can store, test and reuse it
- Because returning a value always makes the function run noticeably faster than printing it
= Returned values can be used. Printed ones can only be read.

Q: `def fee(order, free_from=10000):` is called as `fee(5000)`. What's in `free_from`?
P: Default values
A: 10000 | 10,000
= The default is used when the call leaves it out.

Q[transfer]: A colleague's `calculate_tax` prints the tax, and another part of the program needs to add it to a total. What's the problem?
P: Printing isn't returning
* Printing gives the program nothing to add, so it should return the tax
- The other part should read the number from the screen
- Tax can't be calculated inside a function at all
= Return the value, and print it where it's needed.

Q[transfer]: A security function `is_strong(password)` checks a password. What should it give back?
P: return: giving a value back
- It should print "strong" or "weak" and return nothing
* It should return True or False, so other code can decide what to do
- It should change the password itself to make it stronger
= A bool result can be used in decisions, such as refusing a weak password.

Q[transfer]: In a statistics module, `mean(values)` is called with a list of 1,000 values. What does its parameter allow?
P: Parameters: giving a function values
* The same function works on any list of values
- The function only ever works on exactly 1,000 values
- The list is copied into the function's code permanently
= Parameters let one function work on any data.

# Cards
What is a parameter? :: A name in a def's brackets that receives a value when the function is called.
What is an argument? :: The value passed to a function in a call.
What does return do? :: Hands a value back to the caller, and ends the function.
What's the difference between print and return? :: Print shows a value to a person. Return gives it to the code.
What does a function with no return give back? :: None.

# Further
- Python for Everybody, Chapter 4 :: https://www.py4e.com/html3/04-functions
- The Python Tutorial, defining functions :: https://docs.python.org/3/tutorial/controlflow.html
