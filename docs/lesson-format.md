# Lesson format

The fixed format every new lesson uses. New lessons set `format: 2`, and the checker enforces it. This file is reference, not a plan.

**Files:** `app/content/<subject>/<course>/<unit>/<lesson-id>.md`. The folder name after the subject is the course ID. A course is defined by its `course.md`.

**Check your work:** from `app/`, run `node scripts/lessons.mjs --verify --urls`.

## Front matter

```
---
id: place-value
pack: Numbers and Algebra · Whole numbers
title: Place value
minutes: 50
source: OpenStax · Prealgebra 2e
url: https://...
courses: Helps with MTH101 at NOUN (reference only)
format: 2
teaches: place-value; expanded-form
uses: none
---
```

Optional: `python: yes` for the Python box. `lecture: yes`, `credit`, `start`, `end`, `licence` for a stored clip. `video` for an online one.

- `teaches`: named skills. A lesson's own ID also counts as a skill.
- `uses`: skills or lesson IDs it relies on, or `none`. The build fails if no earlier lesson in the course, or in a course it needs, teaches them. **This is how "assume nothing" is enforced, so list honestly.**

## Sections, in order

| Section | Needed | Notes |
|---|---|---|
| `# Goal` | Yes | What you'll be able to do |
| `# Why` | Yes | Why it matters |
| `# Warm-up` | If `uses` isn't `none` | At least 2 `??` questions from earlier lessons |
| `# Lesson` | Yes | At least 3 `## parts`, at least 600 words |
| `# Exercises` | Yes | `??` questions with worked answers |
| `# Practice` | Yes | Something real to do |
| `# Rubric` | Yes | A list of at least 2 honest yes-or-no points |
| `# Summary` | Yes | A list of at least 3 |
| `# Check` | Yes | At least 8 core and 3 `Q[transfer]` questions |
| `# Cards` | Yes | At least 3, as `front :: back` |
| `# Further` | Yes | `- title :: https://...` |
| `# Starter`, `# Tests`, `# Solution` | With code tests | The checker proves the solution passes and the starter fails |
| `# Command` | Optional | A command to show in Practice |

## What can go in text

| Write | Get |
|---|---|
| `**bold**`, `` `code` `` | Bold, code |
| `$x^2 + 1$` | Maths inside a line. A plain price like $100 is left alone |
| A line starting `$$`, ending `$$` | A displayed formula |
| `### Heading` | Small heading |
| `- item`, `1. item` | Lists |
| `\| a \| b \|` | A table. Inside a table use `\lvert x \rvert`, not a bar |
| `> Note:`, `> Mistake:`, `> Safety:`, `> Clip:` | A callout. A lesson with a video must have a `Clip:` saying what it covers |
| `?? question` then `=> answer` | Stop and think |
| ` ```python ` then ` ```output ` | Code, run by the checker to prove its output |

Every formula is rendered during the checks, so a broken one fails the build.

## Charts

Numbers must say where they came from, and invented ones must say so.

````
```chart
{"kind":"bar","title":"...","alt":"what it shows, in words","note":"Source of these numbers","xLabel":"...","yLabel":"...","x":"state","y":"count","data":[{"state":"Rivers","count":3}]}
```
````

Kinds: `bar`, `line`, `dot` (with `data`, `x`, `y`), `hist` (`values`, optional `thresholds`), `function` (`fn` such as `x^2 - 1`, `domain`).

## Diagrams

Each needs `alt`.

| Kind | Fields | Use |
|---|---|---|
| `venn` | `a`, `b`, `aOnly`, `both`, `bOnly`, `neither` | Sets, and in questions |
| `bits` | `bits`, `value`, `showTotal` | Binary, and in questions |
| `numberline` | `min`, `max`, `step`, `marks` | Numbers, and in questions |
| `graph` | `x`, `y`, `curves: [{fn}]`, `sliders: [{name,min,max,value}]`, `points` | Teaching only |

## Questions

Every question needs `= feedback`, and with `format: 2`, `P: <part title>` naming the lesson part it tests.

| Kind | Write |
|---|---|
| Choice | `Q: stem`, `- wrong`, `* right` |
| Typed | `Q: stem`, `A: answer \| also accepted` |
| Order | `Q: stem`, `O: first \| second \| third` |
| Match | `Q: stem`, then `M: left => right` for each pair, at least 3 |
| Generated numbers | `Q: What is {a} x {b}?`, `Vars: a=2..9, b=2..9`, `F: a*b`. Optional `Where: a != b`, `Tol: 0.01`. `{a*b}` works in text. Typed answers also accept 1,500 or 3/4 |
| Diagram | `Q: stem`, `D: {json}`, `A: <region or value>` |
| New situation | Start with `Q[transfer]:` |

Generated questions are tried with 50 sets of numbers during the checks.

Inside a formula, use double braces around a generated number, because a number can have two digits: `$\frac{{a}}{{b}}$` and `$2^{{n}}$`, not `$2^{n}$`.

Keep wrong choices as long as the right one, or the checker will reject the pattern.

## A course

`course.md` front matter: `id`, `subject`, `title`, `examMinutes`, `project`, plus `level` (0 to 3), `needs` (course IDs, comma separated), and `status: partial` while it's being written. Sections: `# Goal`, `# Units`, `# Project`, `# Project rubric`, `# Exam`.

Units: `## unit-id :: Title :: One line on what it covers`, then `- lesson-id` lines in order. The app builds the course's place in Learn and Today from this file, so a new course needs no code.

A finished course's exam needs 24 core and 6 transfer questions of its own. A `partial` course has no exam or project yet.
