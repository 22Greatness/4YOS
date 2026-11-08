---
id: dd-grouped
pack: Describing Data · Tables and charts
title: Grouped data
minutes: 45
source: Statistics Canada · Statistics: Power from Data
url: https://www150.statcan.gc.ca/n1/edu/power-pouvoir/toc-tdm/5214718-eng.pdf
courses: Describing Data · STA 111
format: 2
teaches: class-intervals; class-boundaries; class-midpoints
uses: sta-data; sta-charts; counts
---
# Goal
Build nonoverlapping classes, tally measurements and explain what grouping hides.

# Why
A list of individual times can be long. A grouped table shows where they gather, but a careless boundary can count a value twice.

# Warm-up
?? What is a frequency?
=> The number of observations in a value or category.

?? How do you find a relative frequency?
=> Divide the class count by the eligible total.

# Lesson
## Choose intervals before counting
A class is a range of values. First record the variable and its unit, and find the smallest and largest valid observations. Choose a starting boundary no higher than the smallest value. Decide a width that produces enough detail for the question. For journey times, five-minute classes might make sense when the recorder measures in minutes. For annual rainfall totals, five minutes would be the wrong unit altogether. Classes must cover every valid value you are including.

A convenient rule is to include the lower endpoint and exclude the upper endpoint. Write “5 to under 10” rather than “5 to 10” if you want to make that explicit. Ten then belongs in “10 to under 15”. The notation $[5,10)$ means the same thing. A square bracket includes its endpoint, and a round bracket excludes it. These classes touch at 10 without overlapping. If you use 0 to under 20 as a total span, a maximum of exactly 20 needs another class or a clearly documented different final boundary. Do not quietly put that record wherever it fits your story.

For integer-valued data, labels such as 5–9 and 10–14 can be exhaustive with no gap in possible recorded integers. For a measured value like 9.7 those labels no longer describe complete classes. Use explicit boundary notation. Check that a new reader could place values at the boundary without asking you.

## Build and check the table
Use these invented wait times in minutes: 3, 4, 5, 7, 7, 10, 11, 14, 15, 18. Start at zero and use five-minute classes. Read each value and put one tally into its class. Here 5 belongs in the second class, 10 in the third and 15 in the fourth. The repeated 7 represents two waits and needs two tallies.

| Wait in minutes | Frequency | Relative frequency |
| --- | --- | --- |
| 0 to under 5 | 2 | 0.20 |
| 5 to under 10 | 3 | 0.30 |
| 10 to under 15 | 3 | 0.30 |
| 15 to under 20 | 2 | 0.20 |
| Total | 10 | 1.00 |

Check that the frequencies add to ten and that the unrounded proportions sum to one. A class with no waits should be shown as frequency zero if it is part of the declared span. A wait with unknown duration does not go in the zero class. Record unknown durations separately. You may report the distribution among valid times as long as you name that denominator and report how many records were excluded.

You can answer some questions exactly from the grouped table. Six of ten waits were at least five and under fifteen minutes. You cannot recover how many were exactly seven from the grouped table alone. You also cannot tell how many were under twelve because twelve is inside a class.

## Read what the table can show
The **class width** is the difference between its boundaries. For 10 to under 15 the width is five minutes. The **midpoint** is the average of the boundaries, here 12.5. It is a representative position for the class, not the observed average of the three waits inside it. Their real average is $(10+11+14)/3$, or about 11.67 minutes. When a table later uses midpoint estimates, keep that distinction visible.

Changing class width changes the detail that survives. Regrouping these waits into 0 to under 10 and 10 to under 20 gives five in each class. This clearer summary for a broad comparison hides the concentrations in the middle. Very narrow classes can preserve detail but leave many empty rows. If two groups will be compared, use the same boundaries so a difference in display cannot masquerade as a difference in measurements.

Open-ended classes such as “20 minutes or more” can be useful when only the threshold matters. That class has no known finite width or midpoint. Do not invent one and report it as exact. Always keep the raw records when privacy permits, so someone can retally at different boundaries or check an unusually long wait. If only grouped data were published, describe the class boundary and report the limit honestly.

# Exercises
?? Where does 9.9 belong with boundaries 0, 5, 10, 15?
=> 5 to under 10.

?? Can you count exactly how many of the worked example waits were under 12 from the table?
=> No. The 10 to under 15 class does not split its records at 12.

# Practice
Take at least ten public or personal measurements in a common unit. Write two candidate sets of class boundaries and tally both. Check each total against your valid count. Write one question that both tables answer and one that requires the raw values.

# Rubric
- Each valid value goes in exactly one class.
- I documented which endpoints belong and kept missing values separate.
- I stated a question the grouped table cannot answer.

# Summary
- Classes must cover the valid observations without overlap.
- Class width is upper minus lower; midpoint is halfway between.
- Grouping preserves class counts and can hide the values inside.

# Check
Q: Where does 10 belong in [5,10) and [10,15)?
P: Choose intervals before counting
* [10,15), the class starting at 10
- [5,10), the class ending at 10
- Both classes, since both show 10
= The upper endpoint is excluded.

Q: What is the width of [12,18)?
P: Choose intervals before counting
A: 6 | six
= Subtract 12 from 18.

Q: What is wrong with [0,10) and [8,20)?
P: Choose intervals before counting
* Values from 8 to below 10 fit twice
- Values from 8 to below 10 fit nowhere
- Every value belongs to exactly one class
= The intervals overlap.

Q: The valid count is 20, and a class contains 6. Give its relative frequency as a decimal.
P: Build and check the table
A: 0.3 | .3 | 0.30 | .30
= Six divided by 20 is 0.30.

Q: What should the class frequencies sum to?
P: Build and check the table
* The number of valid included observations
- The sum of all recorded measurement values
- The midpoint of the longest observed wait
= Every eligible observation contributes one tally.

Q: Where does an unknown wait time belong?
P: Build and check the table
* In the separate missing count
- In the class that starts at zero
- In the middle of the fullest class
= Unknown is not a measurement of zero.

Q: What is the midpoint of [10,15)?
P: Read what the table can show
A: 12.5 | 12.50
= Add the boundaries and divide by two.

Q: What is lost when only a grouped table is saved?
P: Read what the table can show
* The exact values within each class
- The total number of valid records
- The count for each listed interval
= Class counts do not store individual measurements.

Q[transfer]: Two clinics use different wait-time boundaries. What improves their comparison?
P: Read what the table can show
* Retally both with the same class boundaries
- Compare the third row regardless of its limits
- Divide each class count by the other clinic's total
= Shared classes compare the same spans.

Q[transfer]: A dashboard lists 12 orders at 0 to under 5 days and 8 at 5 to under 10. How many took under 10 days?
P: Build and check the table
A: 20 | twenty
= Both whole classes lie under ten.

Q[transfer]: A table ends with a class called 30 or more. Can you get its midpoint from that label?
P: Read what the table can show
* No, because its upper boundary is unknown
- Yes, because 30 is its only possible value
- Yes, because the midpoint is always 30 plus 5
= An open class lacks a finite upper boundary.

# Cards
What does [5,10) include? :: 5 and values below 10, but not 10.
How wide is [10,15)? :: 5 units.
Is the class midpoint the observed mean? :: No. It is halfway between boundaries.

# Further
- Statistics Canada · Statistics: Power from Data :: https://www150.statcan.gc.ca/n1/edu/power-pouvoir/toc-tdm/5214718-eng.pdf
