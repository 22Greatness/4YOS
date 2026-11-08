---
id: dd-chart-audit
pack: Describing Data · Tables and charts
title: Charts that mislead
minutes: 45
source: Statistics Canada · Statistics: Power from Data
url: https://www150.statcan.gc.ca/n1/edu/power-pouvoir/toc-tdm/5214718-eng.pdf
courses: Describing Data · STA 111
format: 2
teaches: chart-audit; axis-distortion; scale-comparability; chart-denominators
uses: dd-bar-pie; dd-histograms; dd-ogive; dd-stem-leaf; dd-official
---
# Goal
Audit a chart's scale, categories, denominator and time window, then redraw it to support a checkable claim.

# Why
A chart can contain accurate numbers while leading readers toward a wrong comparison. You can diagnose the problem by reconstructing what its marks mean.

# Warm-up
?? Why start comparative bars at zero?
=> Visible lengths should represent the measured amounts in proportion.

?? What metadata tell you when a rate belongs?
=> Its reference period, separate from release date.

# Lesson
## Check the visual encoding
Start by reading what a mark represents. A bar represents magnitude by length. A line shows the movement of values along an ordered scale, often time. A histogram uses the area of rectangles to represent frequency when scaled by density. If you mistake one encoding for another, the same picture can suggest an entirely different result. Find the units and identify the start of each scale before interpreting it.

Suppose an invented report shows counts of 98 and 100 with the vertical axis starting at 97. The visible bar lengths are 1 and 3, so one appears three times the other. The actual ratio is 100/98, only about 1.02. Redraw the bars from zero, or show a table of the exact counts. A zoomed line chart can be useful for small movements when the axis is clearly labelled and the context explains their size. The problem is drawing a length comparison with an undisclosed or inappropriate baseline.

Pictures can mislead by area too. If a pictured parcel has twice the height and twice the width, it covers four times the area. Readers may perceive four times the quantity when the data only doubled. Use simple marks or direct numeric labels, and avoid perspective that makes the front of a chart look larger.

## Check the comparison itself
Consider an invented clinic example. Last year 20 of 100 eligible visits were late. This year 30 of 200 were late. The count increased by ten. The proportion fell from 20% to 15%. A caption that says “late visits rose by half” could be correct for counts, but it would mislead readers if the claim is that visits became more likely to be late. Compute both and state the denominator, eligibility and period.

Compare the definitions next. If one clinic calls a visit late after five minutes and another after ten, bars with matching axes do not repair the difference. Likewise, a figure that covers a full month cannot be compared directly to a week as if the exposure were identical. Find comparable definitions, calculate a rate when it answers the question, or keep the numbers separate with a warning about comparability.

Time windows can change the impression. A chart that begins just before an unusually low value may look like strong growth even if the longer series is flat. Look for omitted years and check whether gaps are equally spaced. Missing years should not be plotted as zero. If you connect observations across a gap, make clear that the values between the observations are unknown. If a report has been rebased or revised, check the producer's documentation before joining values into one line.

## Rebuild the claim
Write down the exact sentence the graphic appears to support. Then record its source table, dates, units, denominator and exclusions. If you cannot locate an original table, say what is unknown instead of guessing. Try reconstructing at least two points by hand from the numbers. If the figure uses percentages, verify whether a difference is in percentage points or a percentage change relative to a baseline.

Now choose a chart that matches the question. For counts across categories, use bars from zero. For a time series, keep the chronological scale honest, show the units and annotate a definition change. For grouped measurements, keep the interval widths meaningful. Whenever comparisons involve two charts, use compatible scales and units. Include a short caption with the measured difference and the populations it refers to.

Finally, ask what the chart still cannot establish. It may show that a drop happened near the launch of a new policy. A plot alone does not demonstrate that the policy caused it. It may also show an apparent change driven by a small number of cases. Keep the evidence and its limits together. A reader should be able to reproduce the reported comparison and see what would change the conclusion.

# Exercises
?? Why do bars at 98 and 100 look very different on an axis starting at 97?
=> The visible lengths are 1 and 3. Those are differences from 97, not the original amounts.

?? Late visits rose from 20 to 30 but the denominator doubled. Did the proportion rise?
=> No. It moved from 20% to 15%, a decrease of five percentage points.

# Practice
Choose a public chart with a source table. Recalculate two values, write the implied claim, and sketch a display that makes the denominator, unit and dates visible. Document one genuine limitation even if the original chart is sound.

# Rubric
- I checked at least two plotted values against the source.
- I kept like units and periods together.
- My caption distinguishes observed change from a causal claim.

# Summary
- Read what lengths, areas and positions represent.
- Check definitions and denominators before comparing.
- Make the numeric claim reproducible and state its limits.

# Check
Q: Bars for 98 and 100 start at 97. What is misleading?
P: Check the visual encoding
* The visible length ratio differs from the count ratio
- The total should have been divided by two first
- The bars should have used narrower categories
= Lengths 1 and 3 misrepresent amounts 98 and 100.

Q: If a square icon doubles in width and height, what happens to its area?
P: Check the visual encoding
A: 4 | four | 4 times | four times
= Two times two gives four times the area.

Q: What represents frequency in a density histogram?
P: Check the visual encoding
* Rectangle area over a class interval
- Horizontal position of its highest point
- The number printed below each interval
= Area is height times width.

Q: Twenty out of 100 to thirty out of 200 changes the share how?
P: Check the comparison itself
* From 20% down to 15%
- From 20% up to 30%
- It stays the same because both counts rose
= The totals are 100 and 200 respectively.

Q: Two clinics define “late” differently. What should you do?
P: Check the comparison itself
* Find a common rule or qualify the comparison
- Plot the bars in the same colour to standardise them
- Subtract the sample sizes from both counts
= A shared scale cannot make definitions comparable.

Q: How do you show a missing month?
P: Check the comparison itself
* Mark a gap or label the value as missing
- Enter zero for every unavailable observation
- Repeat the last observed value without comment
= Missing means unknown, not zero.

Q: Which details belong in a caption about a change?
P: Rebuild the claim
* Measure, unit, comparison period and population
- Colour palette, font size and page margins
- Only the names of the highest and lowest values
= The comparison needs a reference and a scale.

Q: Why check a chart against its original table?
P: Rebuild the claim
* To verify how its plotted values and claim were calculated
- To decide whether the font is appropriate for the topic
- To establish that any observed trend was caused by a policy
= The source makes the claim checkable.

Q[transfer]: A news graphic joins years before and after a major method change. What do you need?
P: Check the comparison itself
* A comparable revised series or a marked break
- A longer line to join the two farthest points
- The mean of values calculated under different methods
= A change in definition can create an artificial jump.

Q[transfer]: A line chart zooms in on a one-point change. What improves it?
P: Check the visual encoding
* Label the scale and state the actual amount of change
- Remove the scale so the shape is easier to read
- Convert the same numbers into unlabeled three-dimensional bars
= The size and context of the change should be clear.

Q[transfer]: Accidents fell after a safety campaign. What does that chart alone show?
P: Rebuild the claim
* The observed fall and its timing
- The exact number the campaign prevented
- The campaign was the only possible cause
= A time pattern alone cannot isolate a cause.

# Cards
How do you check a potentially misleading graph? :: Read the axes, then verify a claim against source numbers and metadata.
What is the difference between 20% and 15%? :: Five percentage points.
What should replace a plotted zero for an unavailable month? :: A missing marker or gap.

# Further
- Statistics Canada · Statistics: Power from Data :: https://www150.statcan.gc.ca/n1/edu/power-pouvoir/toc-tdm/5214718-eng.pdf
