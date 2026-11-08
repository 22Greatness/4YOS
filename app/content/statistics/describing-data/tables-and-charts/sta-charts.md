---
id: sta-charts
pack: Describing Data · Tables and charts
title: Frequency tables and charts
minutes: 45
source: OpenStax · Introductory Statistics 2e · Section 2.1 and 2.2
url: https://openstax.org/books/introductory-statistics-2e/pages/2-1-stem-and-leaf-graphs-stemplots-line-graphs-and-bar-graphs
courses: Describing Data · STA 111
format: 2
teaches: frequency-table; relative-frequency; chart-selection
uses: sta-data; counts; dd-collect
python: yes
---
# Goal
Build a frequency table with relative and cumulative frequencies, group numerical data into classes, choose the right chart for a variable, and spot a chart that misleads.

# Why
A column of raw numbers can make patterns hard to spot. A good table or chart lets you see how often different values occur. Practise making both by hand so you can check the result when a tool makes one for you. For example, a fraud analyst can use a chart of transaction amounts to decide which unusual records deserve a closer look.

# Warm-up
?? What is the proportion for 4 in a group of 20?
=> 4/20 = 0.20, or 20%.

?? What is the difference between zero and missing?
=> Zero is a known observed value. Missing means a value was not recorded or cannot be used.

# Lesson
## From raw data to a frequency table
A **frequency** is how many times a value occurs. A **frequency distribution** lists each value, or group of values, and its frequency.

### Worked example: a categorical variable
20 students (invented data) give their favourite way to pay.

| Payment | Frequency | Relative frequency | Percentage |
| --- | --- | --- | --- |
| Transfer | 10 | 10/20 = 0.50 | 50% |
| Cash | 6 | 6/20 = 0.30 | 30% |
| Card | 3 | 3/20 = 0.15 | 15% |
| USSD | 1 | 1/20 = 0.05 | 5% |
| Total | 20 | 1.00 | 100% |

**Relative frequency** is a frequency divided by the total. Always check your totals: frequencies must add up to the number of cases, and relative frequencies to 1, apart from small rounding.

By hand, people often use **tally marks**: a stroke for each value, with every fifth stroke crossing the previous four, so that they can be counted in fives.

## Grouping numerical data
If a variable has many different values, listing each is no use. Group them into **classes**, which are intervals.

### Worked example: test scores
Scores of 20 students (invented):

```text
34 45 47 52 53 55 56 58 60 61 62 63 65 67 70 72 74 78 85 91
```

**Step 1: choose classes.** The range is 91 - 34 = 57. About 5 to 10 classes usually works. Take a width of 10, starting at 30.

**Step 2: count into classes.** Each value must fall in exactly one class, so classes can't overlap.

| Class | Tally count | Frequency | Relative | Cumulative frequency |
| --- | --- | --- | --- | --- |
| 30 to 39 | 34 | 1 | 0.05 | 1 |
| 40 to 49 | 45, 47 | 2 | 0.10 | 3 |
| 50 to 59 | 52, 53, 55, 56, 58 | 5 | 0.25 | 8 |
| 60 to 69 | 60, 61, 62, 63, 65, 67 | 6 | 0.30 | 14 |
| 70 to 79 | 70, 72, 74, 78 | 4 | 0.20 | 18 |
| 80 to 89 | 85 | 1 | 0.05 | 19 |
| 90 to 99 | 91 | 1 | 0.05 | 20 |
| Total | | 20 | 1.00 | |

**Cumulative frequency** is a running total. It answers questions such as "how many scored under 70?" That's 14, read straight from the table.

Python can count this for you, once you've done it by hand:

```python
scores = [34, 45, 47, 52, 53, 55, 56, 58, 60, 61, 62, 63, 65, 67, 70, 72, 74, 78, 85, 91]
for start in range(30, 100, 10):
    count = 0
    for s in scores:
        if start <= s <= start + 9:
            count = count + 1
    print(start, start + 9, count)
```

```output
30 39 1
40 49 2
50 59 5
60 69 6
70 79 4
80 89 1
90 99 1
```

> Note: Terms you'll see in textbooks. **Class limits** are the stated ends, such as 30 and 39. **Class boundaries** close the gaps between classes, as in 29.5 to 39.5. The **class mark** or midpoint is (30 + 39) / 2 = 34.5, and the **class width** is 10. You'll need these for calculating with grouped data, so learn the form your course uses.

?? From the table, how many students scored 60 or more?
=> 6 + 4 + 1 + 1 = 12. Or use the cumulative column: 20 total minus the 8 below 60 gives 12.

## Which chart for which data
| Variable | Chart | How to read it |
| --- | --- | --- |
| Categorical | **Bar chart** | One bar for each category. Bars don't touch |
| Categorical, parts of a whole | **Pie chart** | Slices add up to 100% |
| Numerical | **Histogram** | Bars show class frequencies, and they touch since the scale is continuous |
| Numerical | **Frequency polygon** | Points at class midpoints, joined with lines |
| Numerical, cumulative | **Ogive** | Plots cumulative frequency, and it only rises |
| Numerical, small data | **Stem-and-leaf plot** | Keeps the actual values visible |
| Change over time | **Line chart** | Time along the bottom |
| Two numerical variables | **Scatter plot** | One dot per case, showing any relationship |

Here's a histogram of the 20 scores from earlier in this lesson. Most students sit in the middle, in the 50s and 60s, with a few lower and higher.

```chart
{"kind":"hist","title":"Scores of 20 students","alt":"A histogram of 20 test scores. The tallest bars are in the 50s and 60s, with fewer scores below 50 and above 80.","note":"These scores are invented for this lesson.","xLabel":"Score","yLabel":"Students","thresholds":7,"values":[34,45,47,52,53,55,56,58,60,61,62,63,65,67,70,72,74,78,85,91]}
```

> Mistake: Confusing a bar chart with a histogram. A bar chart has separate categories, so you could reorder its bars. A histogram has a number scale, so the order is fixed, and the bars touch.

### Stem-and-leaf
Split each value into a **stem**, the leading digits, and a **leaf**, the last digit. The first three rows of the scores above are:

```text
3 | 4
4 | 5 7
5 | 2 3 5 6 8
```

Row 5 means 52, 53, 55, 56, 58. It's like a histogram lying on its side, and no values are lost.

## Reading the shape
Look at a histogram for four things: the **centre**, the **spread**, the **shape** and any **outliers**, which are values far from the rest.

| Shape | What it looks like | Example |
| --- | --- | --- |
| Symmetric | Both sides similar | Many exam scores, heights |
| Right-skewed | Long tail to the right | Incomes: most moderate, and a few huge |
| Left-skewed | Long tail to the left | Scores on a very easy test |
| Bimodal | Two peaks | Often means two different groups are mixed |

An **outlier** needs investigating. It could be a data entry error, or it could be the most important point in the data, such as one fraudulent transaction.

## Charts that mislead
Honest charts have labels and sensible scales. Look out for these.

| Trick | Effect |
| --- | --- |
| A bar chart's axis that doesn't start at zero | Small differences look huge |
| Unequal time gaps | Changes look smoother or sharper |
| Pictures scaled by height and width | Twice as tall looks four times bigger |
| Pie slices that don't sum to 100% | The parts aren't really a whole |
| Hidden group sizes | 50% could be 1 of 2 |

Every chart needs a title, labelled axes with units, and a source.

# Exercises
?? In a class of 50, 20 students are in the 60 to 69 class. What's its relative frequency?
=> 20/50 = 0.40, or 40%.

?? A class is 40 to 49. What's its midpoint?
=> (40 + 49) / 2 = 44.5.

?? Which chart would you use for the number of students from each state?
=> A bar chart, as state is categorical. A pie chart could work with only a few states.

?? A bar chart shows two schools' pass rates of 62% and 65%, with an axis from 60 to 66. What's misleading?
=> The cut axis makes a 3-point gap look like a huge difference.

# Practice
Use the data table you made in the last lesson. If it's empty, record at least 10 real values now, such as minutes studied per day.

1. By hand, make a frequency table for a categorical variable, including relative frequencies. Check that your totals add up.
2. By hand, group a numerical variable into classes, and include cumulative frequency. Each value must land in exactly one class.
3. On paper, draw a bar chart for the first and a histogram for the second, with a title and labelled axes.
4. Describe the shape, and note any outlier. Can you explain it?
5. In the Python box, change the list to your numbers and the class ranges to fit, then press **Run Python**, and compare with your hand count. If you don't know Python yet, only change the numbers.

# Starter
```python
# Change these to your real values
values = [20, 35, 40, 45, 60, 30, 25, 50, 55, 90]
width = 20
for start in range(0, 100, width):
    count = 0
    for v in values:
        if start <= v < start + width:
            count = count + 1
    print(start, "up to below", start + width, ":", "#" * count, count)
```

# Rubric
- I used real data, and I did the tables by hand first.
- My totals add up, and each value falls in exactly one class.
- My charts have titles and labelled axes, and I described the shape.

# Summary
- A frequency is a count. Relative frequency is the count divided by the total.
- Group numerical data into classes that don't overlap. Cumulative frequency is a running total.
- Categorical data takes a bar or pie chart. Numerical data takes a histogram.
- Look for centre, spread, shape and outliers.
- Check the axis, the labels and the group sizes before believing a chart.

# Check
Q: 12 of 60 students chose Card. What's the relative frequency?
P: From raw data to a frequency table
A: 0.2 | .2 | 0.20 | 20% | 1/5 | 12/60
= 12 divided by 60 is 0.2.

Q: Classes run 10 to 19, 20 to 29 and 30 to 39, with frequencies 4, 7 and 9. What's the cumulative frequency up to 29?
P: Grouping numerical data
A: 11
= 4 + 7 = 11.

Q: What's the midpoint of the class 20 to 29?
P: Grouping numerical data
A: 24.5
= (20 + 29) / 2 = 24.5.

Q: Which chart suits a numerical variable such as exam scores?
P: Which chart for which data
- A pie chart
* A histogram
- A bar chart of names
= A histogram shows how numerical values are distributed.

Q: What separates a histogram from a bar chart?
P: Which chart for which data
* A histogram has a number scale, and its bars touch
- A histogram can only ever be drawn by a computer
- A bar chart can only ever show a percentage value
= Bar charts have separate categories that could be reordered.

Q: Most incomes are moderate, and a few are huge. What shape is that?
P: Reading the shape
- Left-skewed
- Symmetric
* Right-skewed
= The long tail points toward the high values.

Q: Why can't classes overlap, as in 10 to 20 and 20 to 30?
P: Grouping numerical data
- Because the chart wouldn't look as good when drawn
* A value of 20 would fit in two classes
- Because classes must always be of an odd width
= Each value must fall in exactly one class.

Q: A histogram has two clear peaks. What might that suggest?
P: Reading the shape
* Two different groups may be mixed in the data
- The data must have been entered wrongly
- The average has been calculated wrongly
= Two peaks are often a sign of two groups, such as day and evening students.

Q[transfer]: Transaction amounts on an account are nearly all under N20,000, with one of N4,800,000. What should an analyst do?
P: Reading the shape
- Delete it, as it spoils the shape of the chart
* Investigate it, since it could be an error or actual fraud
- Ignore it, as one value can't make any real difference
= Outliers need explaining. In fraud work, they can be the whole point.

Q[transfer]: A politician's bar chart shows a rise from 40% to 42%, and the axis runs from 39% to 43%. The bars look very different. What's the honest description?
P: Charts that mislead
- A huge rise, as can be seen from the height of the bars
* A 2-point rise, made to look bigger by a cut axis
- No change at all, since charts can't show percentages
= Read the numbers and not the picture. Bars should normally start at zero.

Q[transfer]: You want to show how your monthly spending changed over a year. Which chart suits it best?
P: Which chart for which data
* A line chart with months along the bottom
- A pie chart with one slice for each month
- A histogram with a bar for each amount spent
= Change over time is what a line chart is for.

# Cards
What's relative frequency? :: A category's frequency divided by the total number of cases.
What's cumulative frequency? :: A running total of frequencies, up to and including that class.
Bar chart or histogram: what's the difference? :: Bar charts show separate categories. Histograms show a numerical scale, and their bars touch.
What four things do you look for in a distribution? :: Centre, spread, shape and outliers.
What does right-skewed mean? :: A long tail toward the high values, as with incomes.
What's a common way a bar chart misleads? :: Its axis doesn't start at zero, so small differences look huge.

# Further
- OpenStax Introductory Statistics 2e, Chapter 2 :: https://openstax.org/books/introductory-statistics-2e/pages/2-1-stem-and-leaf-graphs-stemplots-line-graphs-and-bar-graphs
- LibreOffice Calc function list, for building these in a sheet :: https://help.libreoffice.org/latest/en-US/text/scalc/01/04060100.html
