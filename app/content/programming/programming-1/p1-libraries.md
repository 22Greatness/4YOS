---
id: p1-libraries
pack: Programming 1 · Files and errors
title: Using libraries
minutes: 40
source: Python documentation · Installing Python modules
url: https://docs.python.org/3/installing/index.html
courses: Supports any first programming course
format: 2
python: yes
teaches: third-party-packages; pip-install; read-documentation; choose-library; json-module
uses: import-module; standard-library; from-import; csv-dictreader; try-except
---
# Goal
Know the difference between the standard library and packages other people publish, install a package with pip, judge whether a package is safe and worth using, and learn a new library from its documentation.

# Why
Beyond the standard library, hundreds of thousands of Python packages solve almost any problem: data analysis, charts, web requests, machine learning. In statistics you'll use pandas and matplotlib. In security you'll use tools built on these packages. Knowing how to find, install and judge a library is as important as knowing the language, and so is knowing the risks, because installing a package means running someone else's code on your computer.

# Warm-up
?? What is the standard library?
=> The modules that come with Python, always available with no download.

?? Which import form is usually clearest?
=> `import module`, then `module.tool`.

# Lesson
## Packages beyond the standard library
A **package** is a module, or a group of modules, that someone has published for others to use. Most Python packages are published on the **Python Package Index**, called PyPI, at pypi.org. They aren't part of Python, so you install the ones you need.

| | Standard library | Third-party packages |
| --- | --- | --- |
| Comes with Python | Yes | No, install each one |
| Who maintains it | The Python core developers | Its own authors, from big teams to one person |
| Examples | math, csv, json, statistics | pandas, numpy, matplotlib, requests |
| Available in 4YOS lesson boxes | Yes | No, the boxes run offline with the standard library |

## Installing with pip
**pip** is Python's package installer. On your own computer, in a terminal, not inside Python, you type:

```text
python -m pip install requests
```

That downloads the package and its dependencies, and installs them, after which `import requests` works in your programs. Writing `python -m pip` instead of plain `pip` makes sure the package goes into the same Python you'll run.

For a real project, programmers usually make a **virtual environment** first: a separate folder of packages for that one project, so two projects needing different versions of a package don't break each other. You'll set one up properly in Programming 2. For now, the idea is enough: each project gets its own packages.

The lesson boxes in 4YOS run Python inside the app, offline, with only the standard library. So this lesson uses standard modules for its runnable examples, and shows pip as text.

## Judge a package before you install it
Installing a package runs code written by strangers, with the same access to your files as you have. Attackers know this, and publish fake packages with names close to popular ones, such as "reqeusts" instead of "requests", hoping for a typing mistake. This trick is called **typosquatting**. Before installing, check:

| Check | What to look for |
| --- | --- |
| The exact name | Copy it from the official documentation, don't type it from memory |
| Who maintains it | A known project or organisation, with a link to its source code |
| Is it alive? | Recent releases, and issues that get answered |
| Do others use it? | Widely used in tutorials, courses and well-known projects |
| The licence | That it allows what you plan to do, especially if you'll sell your work |
| Do you need it? | If the standard library does the job, use that instead |

> Mistake: Installing a package because a random forum post or video says so, without checking its exact name and source. In security courses you'll see real attacks that started exactly this way.

## Learning a library from its documentation
Every good library has **documentation**: a guide to what it does and how to use it. A reliable way to learn a new one:

1. **Read the quick-start** or tutorial page first, which shows the most common use.
2. **Run the smallest example** exactly as written, and check you get the same result.
3. **Change one thing** at a time, and predict what will happen.
4. **Look up each function** you use in the reference pages: what it takes, what it returns, and what errors it can raise.

### Worked example: learning json from its documentation
The `json` module is in the standard library, so you can try it right here. JSON is a text format for data, used by almost every web service. Its documentation shows two main functions: `json.dumps` turns Python data into JSON text, and `json.loads` turns JSON text back into Python data.

```python
import json

record = {"name": "Ada", "courses": ["COS 102", "STA 111"], "level": 100}
text = json.dumps(record)
print(text)
back = json.loads(text)
print(back["courses"][1])
```

```output
{"name": "Ada", "courses": ["COS 102", "STA 111"], "level": 100}
STA 111
```

Dictionaries, lists, strings and numbers map directly onto JSON, which is why it's so widely used. The documentation also says `json.loads` raises an error if the text isn't valid JSON. That's the step people skip, and it tells you what to catch.

```python
import json

try:
    json.loads("{not valid}")
except json.JSONDecodeError:
    print("That text isn't valid JSON.")
```

```output
That text isn't valid JSON.
```

`json.JSONDecodeError` is a kind of ValueError defined in the module. You found it by reading the reference page for `loads`.

# Exercises
?? What is PyPI?
=> The Python Package Index, where most third-party Python packages are published.

?? Why write `python -m pip install` rather than `pip install`?
=> It installs into the same Python that you'll run your program with.

?? What is typosquatting?
=> Publishing a harmful package with a name close to a popular one, hoping people mistype it.

# Practice
Learn from documentation, and handle data from outside.

1. In the box, `incoming` holds JSON text, such as a web service might send, listing courses and marks.
2. Parse it with `json.loads` into `data`, catching `json.JSONDecodeError`. If parsing fails, set `data` to an empty dictionary.
3. Set `best` to the course with the highest mark.
4. Set `saved` to the data turned back into JSON text with `json.dumps`, sorted by key using the `sort_keys=True` option. You'll find that option in the documentation for `dumps`.
5. Predict, run, and press **Test my code**. Then break the JSON on purpose, and check your program handles it.

Write what `saved` looked like.

# Starter
```python
import json

incoming = '{"STA 111": 65, "COS 102": 72, "MTH 101": 58}'

data = {}
best = ""
saved = ""

print(data)
print(best)
print(saved)
```

# Tests
```python
import json as _j
want = _j.loads(incoming)
assert data == want, "data should be the parsed JSON"
assert best == max(want, key=want.get), "best should be the course with the highest mark"
assert saved == _j.dumps(want, sort_keys=True), "saved should be json.dumps of the data with sort_keys=True"
```

# Solution
```python
import json

incoming = '{"STA 111": 65, "COS 102": 72, "MTH 101": 58}'

try:
    data = json.loads(incoming)
except json.JSONDecodeError:
    data = {}

best = ""
top = None
for course, mark in data.items():
    if top is None or mark > top:
        top = mark
        best = course

saved = json.dumps(data, sort_keys=True)

print(data)
print(best)
print(saved)
```

# Rubric
- I parsed the JSON and caught the decode error specifically.
- I found an option from the documentation and used it correctly.
- My code passes the test, and handles broken JSON without crashing.

# Summary
- The standard library comes with Python. Other packages are published on PyPI and installed with pip.
- Use `python -m pip install name` in a terminal, ideally inside a virtual environment.
- Installing a package runs strangers' code. Check the exact name, maintainer, activity, use and licence.
- Learn a library from its documentation: quick-start, smallest example, change one thing, look up each function.
- `json.dumps` and `json.loads` convert between Python data and JSON text.

# Check
Q: Where are most third-party Python packages published?
P: Packages beyond the standard library
* PyPI, the Python Package Index
- Inside the standard library itself
- On the computer's desktop
= PyPI is the central index.

Q: Which is a third-party package, not part of the standard library?
P: Packages beyond the standard library
- csv
- json
* pandas
= pandas is installed separately.

Q: Where do you run `python -m pip install requests`?
P: Installing with pip
* In a terminal, on your own computer
- Inside a Python program, as the first line
- Inside the json module's documentation page
= pip is run from a terminal, not from inside Python code.

Q: What's a virtual environment for?
P: Installing with pip
* Giving each project its own separate set of packages
- Running Python without any operating system
- Making packages download faster from the internet
= Separate environments stop projects breaking each other.

Q: What is typosquatting?
P: Judge a package before you install it
* A harmful package named almost like a popular one
- A package that fixes spelling mistakes in your code
- A typing speed test written in Python
= It relies on people mistyping a name.

Q: What's the safest way to get a package's exact name?
P: Judge a package before you install it
* Copy it from the package's official documentation
- Type it from memory, as quickly as you can
- Take it from the first comment under a video
= A copied official name avoids typosquats.

Q: What does `json.loads('{"a": 1}')["a"]` give?
P: Learning a library from its documentation
A: 1
= loads turns JSON text into a dictionary.

Q: What's the first step in learning a new library?
P: Learning a library from its documentation
* Read its quick-start, and run the smallest example
- Read every page of its source code first
- Install every package it mentions
= Start small, then build up.

Q[transfer]: A tutorial video tells you to install "pandaas". What should you do?
P: Judge a package before you install it
* Check the official pandas documentation for the exact name before installing anything
- Install it straight away, since the video said so
- Install both "pandaas" and "pandas", to be safe
= A misspelled name may be a typosquat.

Q[transfer]: You're building an app to sell, and want to use a package. What must you check?
P: Judge a package before you install it
* That its licence allows commercial use
- That its name is short and easy to remember
- That it has a colourful logo on its website
= Licences decide what you may do with the code.

Q[transfer]: A web service returns data as JSON text. How should a Python program read it?
P: Learning a library from its documentation
* Parse it with `json.loads`, catching `json.JSONDecodeError`
- Split the text on commas and colons by hand
- Use `int()` on the whole text
= The json module handles the format, and reports invalid text as an error.

# Cards
What is PyPI? :: The Python Package Index, where third-party packages are published.
How do you install a package? :: `python -m pip install name`, in a terminal.
What is typosquatting? :: A harmful package named almost like a popular one.
What should you check before installing a package? :: Exact name, maintainer, activity, how widely it's used, and its licence.
What do json.dumps and json.loads do? :: Convert Python data to JSON text, and JSON text back to Python data.

# Further
- Python documentation, installing Python modules :: https://docs.python.org/3/installing/index.html
- Python documentation, json module :: https://docs.python.org/3/library/json.html
