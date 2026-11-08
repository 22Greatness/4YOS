---
id: dd-bar-pie
pack: Describing Data · Tables and charts
title: Bar charts and pie charts
minutes: 45
source: Statistics Canada · Statistics: Power from Data
url: https://www150.statcan.gc.ca/n1/edu/power-pouvoir/toc-tdm/5214718-eng.pdf
courses: Describing Data · STA 111
format: 2
teaches: bar-chart; pie-chart; pie-angles; comparable-chart-scales
uses: sta-data; sta-charts; counts
---
# Goal
Choose a category display, draw bar lengths or sector angles and make group comparisons honestly.

# Why
A chart is a visual argument. When the display fits the question, readers can see the comparison without guessing which whole the numbers refer to.

# Warm-up
?? What distinguishes an unordered category from a number?
=> Its values are labels and arithmetic on the labels has no useful meaning.

?? What percentage does 6 out of 24 represent?
=> 25%.

# Lesson
## Compare categories with bars
For a bar chart, make one bar for each category. A bar's length represents its count or proportion. Use a common zero baseline when comparing lengths. Leave space between the bars to mark the separate categories. Put ordered categories such as low, medium and high in their meaningful order. For unordered categories, choose alphabetical order or sort by count if the question is which categories occur most often. Label the scale, the measure and the time window.

Consider an invented tally of 40 help requests classified by their main topic. The frequency table has 16 account requests, 12 connection requests, 8 payment requests and 4 other requests. A bar chart with counts on the vertical axis shows account as the longest bar and other as the shortest. Account is four times other because the lengths both begin at zero. If the vertical axis started at 3, the visible lengths would be 13 and 1. That would draw a far larger ratio than the counts support.

When you chart proportions, use a percentage scale and state the denominator. Four out of forty is 10 percent. A second week with six other requests could have a smaller percentage if the week had many more total requests. Counts describe work volume. Percentages describe the mix. Choose by the question and show both if readers need both answers.

```chart
{"kind":"bar","title":"Help requests by main topic","alt":"Account has 16 requests, connection 12, payment 8 and other 4","note":"Invented practice counts; 40 requests","xLabel":"Main topic","yLabel":"Requests","x":"topic","y":"count","data":[{"topic":"Account","count":16},{"topic":"Connection","count":12},{"topic":"Payment","count":8},{"topic":"Other","count":4}]}
```

## Show parts of one whole
A pie chart divides a circle into sectors. A sector's angle is its share of the total times 360 degrees. The four request categories account for 40%, 30%, 20% and 10%. Multiply each share as a decimal by 360. The angles are 144°, 108°, 72° and 36°. They add to 360°, which checks that the sectors can form one circle. To draw the pie by hand, use a protractor and start each sector where the previous one ends. Label with the category and its percentage, keeping the counts available in a table.

A pie chart requires nonnegative parts of one meaningful whole. Suppose each request can have several topics. One may count under account and payment. If the percentages are based on all requests, their sum can exceed 100%. This is a valid statement about topic prevalence, but it cannot be represented as parts of a single pie. Use bars for each topic's share and explain that a request can contribute to more than one bar.

Small sectors and close values are hard to compare by angle. When two shares are 24% and 26%, a reader often sees the difference more readily in bars sharing a baseline. A pie can work for a simple split when the question is whether a large share belongs to one or two categories. Show the date and whole group in either display.

## Compare two groups fairly
Suppose a second invented week had 80 requests, of which 24 were account requests. The count rose from 16 to 24, a rise of eight requests. The share fell from 40% to 30%, a fall of ten percentage points. There is no contradiction. The denominator doubled, so account requests became a smaller part of the workload even as their number rose. Use two tables or adjacent bars for the comparison, with a shared scale. Say whether the group labels refer to weeks, teams or places.

When some categories are absent from a group, keep their positions if they are meaningful to the comparison. A measured zero deserves a zero-height bar or a labelled zero. A missing count deserves a missing marker, not a zero-height bar. Use readable labels rather than colour alone. Direct labels or a table below the chart make it possible to recover the important values without estimating heights.

Before sharing a display, ask another reader to identify the unit, denominator, largest category and claim. If they cannot tell whether 24 means requests or percent, revise the title and labels. If the graphic looks impressive because it uses perspective, three-dimensional slices or an unusual baseline, strip those away and see whether the evidence still supports the same sentence. The graphic should help readers check your claim.

# Exercises
?? A category has 12 of 40 requests. What sector angle should it have?
=> 12/40 = 0.30, so 0.30 × 360° = 108°.

?? A questionnaire lets people choose several reasons. Which display fits?
=> Bars labelled as the percentage of respondents selecting each reason, with a note that multiple reasons were allowed.

# Practice
Choose a public table of categories with a clear denominator. Draw a bar chart and calculate the sectors you would need for a pie. If the categories overlap or do not cover one whole, explain why you chose bars and did not draw the pie.

# Rubric
- I labelled the category, unit, period and denominator.
- My bar lengths share a zero baseline.
- My pie sectors either form one whole or I explained why a pie would mislead.

# Summary
- Bars show category magnitudes using a common scale.
- A pie represents parts of one whole, with angle equal to share times 360°.
- Count and share can move in opposite directions when the total changes.

# Check
Q: What is the usual starting point for bars that compare amounts?
P: Compare categories with bars
* Zero on the common magnitude scale
- The smallest observed amount in each group
- A different baseline chosen for each bar
= A zero baseline preserves the meaning of lengths.

Q: How should low, medium and high usually appear?
P: Compare categories with bars
* In their meaningful low-to-high order
- Sorted alphabetically as unrelated labels
- In a random order for each group
= They are ordered categories.

Q: What does a bar labelled 20% need beside it?
P: Compare categories with bars
* The group or denominator it describes
- A different colour for every screen
- The mean of the category labels
= The share only makes sense relative to a whole.

Q: What angle represents 25% of a pie? Enter degrees as a number.
P: Show parts of one whole
A: 90 | 90°
= One quarter of 360° is 90°.

Q: What should the angles of all slices sum to? Enter degrees as a number.
P: Show parts of one whole
A: 360 | 360°
= The slices complete one circle.

Q: What does a 36° sector represent? Give a percentage.
P: Show parts of one whole
A: 10% | 10 | 10 percent
= 36 divided by 360 is 0.10.

Q: A count rises while its share falls. How can this happen?
P: Compare two groups fairly
* The overall total grows faster than the count
- The overall total must stay the same
- The category must have been removed from the total
= A growing denominator can shrink a share.

Q: What should a missing group count look like?
P: Compare two groups fairly
* A missing marker rather than a measured zero
- A zero bar to keep the chart orderly
- A bar equal to the median of other groups
= Missing and zero convey different information.

Q[transfer]: Residents choose every transport mode they used. What is an appropriate display?
P: Show parts of one whole
* Separate bars with a note that multiple responses are allowed
- A pie treating the shares as mutually exclusive
- A pie dropping any response that makes the total too large
= Overlapping categories need not sum to one whole.

Q[transfer]: Two charts of clinic visits are intended for direct comparison. What matters most?
P: Compare two groups fairly
* A common scale and matching definitions
- Different scale ranges chosen for visual balance
- The same background colour on each chart
= Shared units and scales make the comparison meaningful.

Q[transfer]: A shop wants to know which of two product shares, 24% or 26%, is larger. Which display helps compare them?
P: Compare categories with bars
* Bars using one shared scale
- Three-dimensional slices viewed from above
- Two circles with unrelated sizes
= Lengths along a shared baseline are easy to compare.

# Cards
Why start bars at zero? :: Their visible lengths should be proportional to the magnitudes.
How do you find a sector angle? :: Multiply the category's fraction of the whole by 360 degrees.
When do overlapping categories rule out a pie? :: When an observation can be counted in multiple shares of the same denominator.

# Further
- Statistics Canada · Statistics: Power from Data :: https://www150.statcan.gc.ca/n1/edu/power-pouvoir/toc-tdm/5214718-eng.pdf
