---
id: p1-scope
pack: Programming 1 · Functions
title: Scope
minutes: 35
source: The Python Tutorial · Defining functions
url: https://docs.python.org/3/tutorial/controlflow.html
courses: Supports any first programming course
format: 2
python: yes
teaches: local-variables; global-variables; scope-rules; pass-and-return-data
uses: parameters; return-statement; define-function; name-error; variables
---
# Goal
Say where a variable can be used, know why a function's variables are private to it, and pass data in and out of functions through parameters and return values instead of sharing variables.

# Why
Once a program has several functions, the same name might be used in many places. Scope is the set of rules that decides which variable a name refers to at each point. Without these rules, a variable called `total` in one function could quietly overwrite one in another. Understanding scope explains confusing NameErrors, and it's the reason well-written functions only communicate through their parameters and return values.

# Warm-up
?? What's the difference between print and return?
=> Print shows a value to a person. Return gives it to the code.

?? What does NameError usually mean?
=> A misspelled name, or a name used before it was given a value.

# Lesson
## Local variables
A variable created inside a function is **local** to it. It exists only while the function runs, and only code inside that function can see it.

```python
def work_out():
    result = 6 * 7
    return result

answer = work_out()
print(answer)
```

```output
42
```

`result` is local to `work_out`. Once the function returns, `result` is gone. Trying to use it outside causes an error:

```python
def work_out():
    result = 6 * 7
    return result

work_out()
print(result)
```

```output
Traceback (most recent call last):
  File "<string>", line 6, in <module>
NameError: name 'result' is not defined
```

The value 42 was returned, but nobody stored it, and the name `result` only existed inside the function. To use a function's result outside, you must **return** it and **store** it, as in the first example.

Parameters are local too. In `def greet(name):`, the parameter `name` exists only inside `greet`.

Think of each call to a function as getting its own fresh, private workspace. Its parameters and the variables it creates live in that workspace. When the function returns, the workspace is cleared away, and only the returned value survives. The next call gets a new, empty workspace, so nothing is left over from the last time. This is why a local accumulator starts fresh on every call, and why one call can't accidentally see another's values.

## The same name in two places
Because local variables are private, two functions can use the same name without affecting each other.

```python
def weekly(daily):
    total = daily * 7
    return total

def monthly(daily):
    total = daily * 30
    return total

print(weekly(100), monthly(100))
```

```output
700 3000
```

Each function has its own `total`. Neither knows about the other's. This is exactly what you want: you can write each function without worrying about names used elsewhere.

## Global variables
A variable created outside any function, at the top level of the program, is **global**. Functions can read a global variable:

```python
pass_mark = 40

def passed(mark):
    return mark >= pass_mark

print(passed(55), passed(30))
```

```output
True False
```

But if a function **assigns** to a name, Python treats that name as local to the function, even if a global has the same name. The global isn't changed:

```python
count = 0

def add_one():
    count = 1
    return count

add_one()
print(count)
```

```output
0
```

Inside `add_one`, `count = 1` creates a new local `count`. The global `count` is untouched, so it's still 0.

> Mistake: Expecting a function to change a global variable by assigning to it. It creates a local one instead. Python does have a `global` keyword that allows it, but changing globals from inside functions makes programs hard to follow, so avoid it.

## Pass data in, return data out
The clean way for functions to work together is through parameters and return values. Data goes **in** through parameters, and comes **out** through `return`. The function doesn't reach out to change variables elsewhere.

| Instead of | Do this |
| --- | --- |
| A function that changes a global total | A function that takes the old total and returns the new one |
| A function that reads a global setting | A function that takes the setting as a parameter, perhaps with a default |

```python
def add_cost(total, cost):
    return total + cost

total = 0
total = add_cost(total, 1500)
total = add_cost(total, 800)
print(total)
```

```output
2300
```

Each call takes the current total in and gives a new total back, and the calling code stores it. Everything that affects the function is visible in its call, which makes it easy to read, test and reuse. A function like this, whose result depends only on its parameters, is predictable: the same arguments always give the same result.

# Exercises
?? Inside `def f(): x = 5`, then `f()`, then `print(x)` outside. What happens?
=> A NameError, because `x` was local to `f`.

?? Two functions each have a local `total`. Do they affect each other?
=> No. Each local variable belongs only to its own function.

?? A global `rate = 5` exists, and a function does `rate = 10` inside. What's the global `rate` afterwards?
=> Still 5. The assignment created a local `rate`.

# Practice
Rewrite a messy program so its functions pass data in and return data out.

1. In the box, `apply_discount` changes a global variable. Rewrite it so that it takes `price` and `percent` as parameters, and returns the discounted price.
2. Rewrite `add_tax` the same way, taking `price` and `rate`.
3. Below them, work out a real or likely price after a 10% discount, then 7.5% tax, storing each result.
4. Predict, run, and press **Test my code**. The test calls your functions with its own values.

Write what each function now takes in, and what it gives back.

# Starter
```python
price = 20000

def apply_discount():
    discounted = price - price * 10 / 100
    print(discounted)

def add_tax():
    with_tax = price + price * 7.5 / 100
    print(with_tax)

apply_discount()
add_tax()
```

# Tests
```python
assert apply_discount(20000, 10) == 18000, "apply_discount(20000, 10) should return 18000"
assert apply_discount(5000, 0) == 5000, "apply_discount(5000, 0) should return 5000"
assert add_tax(18000, 7.5) == 19350, "add_tax(18000, 7.5) should return 19350"
assert add_tax(1000, 0) == 1000, "add_tax(1000, 0) should return 1000"
```

# Solution
```python
def apply_discount(price, percent):
    return price - price * percent / 100

def add_tax(price, rate):
    return price + price * rate / 100

price = 20000
after_discount = apply_discount(price, 10)
final = add_tax(after_discount, 7.5)
print(f"After discount: ₦{after_discount:,.2f}")
print(f"With tax: ₦{final:,.2f}")
```

# Rubric
- My functions take their data in as parameters, and return their results.
- Neither function reads or changes a global variable.
- My code passes the test.

# Summary
- A variable made inside a function is local: it exists only there, while it runs.
- Parameters are local too.
- Two functions can use the same local name without affecting each other.
- Functions can read globals, but assigning inside a function makes a new local.
- Pass data in through parameters, and out through return.

# Check
Q: Where can a variable created inside a function be used?
P: Local variables
- Anywhere in the whole program, once it exists
* Only inside that function, while it runs
- Only in the very next function that is called
= Local variables are private to their function.

Q: `def f(): y = 3`, then `f()`, then `print(y)`. What happens?
P: Local variables
* A NameError
- It prints 3
- It prints None
= `y` was local to `f`, and doesn't exist outside.

Q: How should you get a value out of a function?
P: Local variables
- Print it inside the function, then read it from the screen
* Return it, and store the result where you call the function
- Create a variable with the same name outside the function
= Return and store is the way out.

Q: Two functions each create `total = 0`. Does one affect the other?
P: The same name in two places
* No, each has its own local total
- Yes, the second one overwrites the first
- Only if both are called on the same line
= Local names are private to each function.

Q: `rate = 5`, then `def f(): rate = 10`, then `f()`, then `print(rate)`. What's printed?
P: Global variables
A: 5 | five
= The assignment inside f made a local rate.

Q: Can a function read a global variable?
P: Global variables
* Yes, as long as it doesn't assign to that name
- No, functions can never see any variable outside them
- Only if the global variable's name is written in capitals
= Reading is fine. Assigning creates a local.

Q: What's the clean way for functions to share data?
P: Pass data in, return data out
- Through global variables that every function changes
* Through parameters going in and return values coming out
- By printing values and reading them back from the screen
= Everything that affects the function is visible in its call.

Q: `def f(n): return n * 2`, then `n = 5`, then `print(f(3))`. What's printed?
P: Pass data in, return data out
A: 6 | six
= The parameter n inside f is 3. The global n doesn't matter here.

Q[transfer]: In a team project, someone's function changes a global variable that your function relies on, and your results go wrong. What design rule would have prevented this?
P: Pass data in, return data out
* Functions take data as parameters and return results, without changing globals
- Every function should use a completely different set of variable names
- Global variables should be printed after every single function call
= Hidden changes to shared variables cause bugs that are hard to trace.

Q[transfer]: A statistics function `mean(values)` gives different answers for the same list on different runs. What should you suspect?
P: Pass data in, return data out
- The list changes its order every time it is printed
* The function depends on something outside its parameters, such as a global
- Mean values naturally change a little on each run
= A function that depends only on its parameters gives the same answer every time.

Q[transfer]: A security script uses a global `logged_in = False`, and a function sets `logged_in = True` inside it. Afterwards, the global is still False. Why?
P: Global variables
* The assignment created a local variable, leaving the global unchanged
- Python doesn't allow True to be stored in a variable
- The global variable resets itself to False after every function
= Return the new state instead, and store it in the calling code.

# Cards
What is a local variable? :: A variable made inside a function, which exists only there, while it runs.
Are parameters local? :: Yes.
What happens when a function assigns to a global's name? :: It creates a new local variable. The global is unchanged.
How should functions share data? :: Parameters going in, return values coming out.
Why avoid changing globals inside functions? :: Hidden changes make programs hard to follow and test.

# Further
- The Python Tutorial, defining functions :: https://docs.python.org/3/tutorial/controlflow.html
- Python for Everybody, Chapter 4 :: https://www.py4e.com/html3/04-functions
