---
id: describing-data
subject: Statistics
title: Describing Data
examMinutes: 60
project: A statistical report on real Nigerian data
level: 0
needs: numbers-and-algebra
---
# Goal
Learn to collect, organise and describe data, check what a number actually measures, and write a reproducible statistical report on Nigerian public data.

# Units
## dd-u1 :: What data is :: Variables, proportions, samples, honest collection and official sources.
- sta-data
- counts
- sample
- dd-collect
- dd-official

## dd-u2 :: Tables and charts :: Read and construct tables and charts that match the data.
- sta-charts
- dd-grouped
- dd-bar-pie
- dd-histograms
- dd-ogive
- dd-stem-leaf
- dd-chart-audit

## dd-u3 :: Centre and spread :: Summarise a distribution with centre and spread.
- sta-centre-spread
- dd-quartiles
- dd-variance
- dd-grouped-summaries
- dd-boxplots
- dd-shape

## dd-u4 :: Two variables :: Cross-tabulations, paired plots, linear association, prediction and causal limits.
- dd-two-way
- dd-scatter
- dd-correlation
- dd-fitted-line
- dd-causation

## dd-u5 :: Society and economy :: Index numbers, inflation, vital rates and an audit of a published statistical claim.
- dd-indices
- dd-inflation
- dd-vital-rates
- dd-audit-release

# Project
Write a two-page statistical report on a public Nigerian dataset. You can use the offline extract below or choose another public Nigerian series with at least ten comparable observations and published metadata. Use a spreadsheet, paper or the in-app Python tool. Keep any original extracts separate from your working table.

## Source and question
Use a question the observations can answer. For the offline extract, ask “How did Nigeria's estimated infant mortality rate vary from 2014 through 2023, and how sensitive is the endpoint comparison to the start year?” Each row is one national calendar-year estimate, not one child or an estimate for one clinic. The unit is per 1,000 live births.

Source: World Development Indicators, Nigeria, indicator SP.DYN.IMRT.IN, from the UN Inter-agency Group for Child Mortality Estimation. Snapshot retrieved 6 November 2026, API metadata last updated 8 October 2026. Retrieve the same range by searching the indicator code and selecting Nigeria and 2014–2023, or use this dated extract if the online series has since changed.

```text
year,estimated_infant_mortality_per_1000_live_births
2014,68.1
2015,68.0
2016,68.1
2017,68.3
2018,68.7
2019,69.1
2020,69.5
2021,69.9
2022,70.2
2023,70.1
```

Source page: https://data.worldbank.org/indicator/SP.DYN.IMRT.IN?locations=NG

## What to submit
1. State the question, unit of observation, population or geography, reference period and the source version. Include the original table or a dated extract that can be reproduced.
2. Audit the data. Check duplicate dates, missing values, units and comparability. Record any changes or exclusions with reasons. For the provided extract, retain all ten values.
3. Calculate a measure of centre and a measure of spread with units. For the provided series, compute the median and IQR under the median-of-halves rule. Explain what variability across years measures, and why it does not give the uncertainty of each annual estimate.
4. Draw a chart that fits the question. For annual estimates, put years in order and label the rate scale. Use a caption that someone can read without the surrounding prose. Report absolute and relative endpoint changes with their distinct units.
5. Repeat one reasonable choice as a sensitivity check. For the provided series, compare 2014–2023 with 2018–2023. Show whether the size or direction of the endpoint change differs.
6. Conclude with one supported finding, one limit and one follow-up question. Do not use an aggregate time series to infer an individual outcome or a cause. Where uncertainty bounds are unavailable in the extract, say you used point estimates.

# Project rubric
- I named the exact source, release or snapshot, population, period and measurement units.
- My working table preserves original observations and records any exclusions or corrections.
- Another reader can reproduce my centre, spread and endpoint comparisons from my calculations.
- My chart has a meaningful scale, labelled axes and a caption with the source and scope.
- I reported a sensitivity check and distinguished variation over time from uncertainty about individual estimates.
- My conclusion stays within the evidence and proposes a useful follow-up.

# Exam
Q: A table lists one row per delivery and records the driver's shift as A, B or C. What kind of variable is shift?
* A categorical label
- A continuous measurement
- A discrete count of deliveries
= The shift names identify categories. Adding the labels would not measure anything.

Q: A form records satisfaction as low, medium or high. Which measurement scale fits?
* Ordinal, with a meaningful order
- Nominal, with no meaningful order
- Ratio, with equal distances and a true zero
= The categories can be ordered, but their gaps have not been measured.

Q: A public audit finds 21 late deliveries out of 84. Give the percentage.
A: 25 | 25% | 25 percent
= 21 divided by 84 is one quarter.

Q: You want all weekend waits at a terminal but record only Saturday mornings. What is the main concern?
* The times sampled may leave out systematically different periods
- A small sample automatically gives equal coverage of every period
- Adding rows from Saturday morning guarantees coverage of Sunday
= Coverage of the target population matters as much as sample size.

Q: Which entry records an observed value of zero?
* A counter worked for the full hour and recorded no entries
- The counter was offline for the hour and kept no observations
- The counter's file was lost before anyone read the result
= Only the first situation establishes a measured zero.

Q: A release in December describes April to June. What is its reference period?
* April to June, the period described
- December, when the release appeared
- The day the figures were downloaded
= A reference period is distinct from a release date.

Q: A frequency table records 10, 15 and 25 observations in three categories. Give the relative frequency of the second category as a decimal.
A: 0.3 | .3 | 0.30 | .30
= Divide 15 by 50.

Q: Which class contains 12 if the classes are [6,12) and [12,18)?
* The interval starting at 12
- The interval ending at 12
- Both intervals share the value 12
= The square bracket includes 12 and the round bracket excludes it.

Q: A mutually exclusive category is 30% of a whole. Give its pie angle in degrees.
A: 108 | 108° | 108 degrees
= 0.30 times 360 degrees is 108 degrees.

Q: A histogram class has frequency 18 and width 6. Find the frequency density.
A: 3 | 3.0 | three
= Density equals frequency divided by width.

Q: The running counts below 8 and below 12 are 14 and 23. How many observations are in [8,12)?
A: 9 | nine
= Subtract 14 from 23.

Q: A stem plot's key says stem 2 and leaf 5 mean 2.5 cm. What does stem 4 and leaf 0 mean, in centimetres?
A: 4 | 4.0 | 4 cm | 4.0 cm
= The leaf represents tenths and the zero is part of the recorded value.

Q: Find the arithmetic mean of 4, 6, 7 and 11.
A: 7 | 7.0 | seven
= The total is 28 and there are four values.

Q: Under the course's median-of-halves rule, find the IQR of 1, 2, 4, 6, 9, 11 and 15.
A: 9 | nine
= Exclude 6. The lower and upper half medians are 2 and 11.

Q: A sample of five values has a sum of squared deviations of 36. What is its sample standard deviation?
A: 3 | 3.0 | three
= Divide by 4 to get 9, then take its square root.

Q: Two classes have midpoints of 10 and 20, with counts of 2 and 6. What is the midpoint estimate of the mean?
A: 17.5 | 17.50
= The weighted sum is 20 + 120 = 140. Divide by eight.

Q: A box plot has Q1 of 12 and Q3 of 20. Find the upper inner fence.
A: 32 | thirty-two
= IQR is 8, so add 12 to Q3.

Q: What does negative skew usually indicate?
* A longer or heavier tail toward the lower values
- A larger spread on the high side of the distribution
- Equal frequencies on either side of the centre
= Skew direction is named for the tail.

Q: A two-way table shows 9 late and 21 on-time phone bookings. Give the percentage late among phone bookings.
A: 30 | 30% | 30 percent
= The denominator is all 30 phone bookings.

Q: Which feature can be strong while Pearson's r is near zero?
* A curved relationship that is roughly U-shaped
- Points lying on a rising straight line with varying x
- Points lying on a falling straight line with varying y
= Pearson's r measures linear association and can miss curves.

Q: A fitted line predicts 17 and the observed value is 21. Find the residual.
A: 4 | +4 | four
= Residual means observed minus fitted.

Q: A comparable index moves from 80 to 100. What is the relative percentage rise?
A: 25 | 25% | 25 percent
= The rise of 20 is divided by the earlier value, 80.

Q: The index is 110 last April, 125 this March and 132 this April. What is this April's year-on-year inflation?
A: 20 | 20% | 20 percent
= Compare April with April. The increase is 22 divided by 110.

Q: A district has an estimated midyear population of 40,000 and records 800 live births during the year. Give the crude birth rate per 1,000.
A: 20 | 20 per 1000 | 20 per 1,000
= 800 divided by 40,000, multiplied by 1,000.

Q[transfer]: One clinic has a bar for 98 visits and another for 101. Both bars start at 97. What should change to support a comparison of counts?
* Redraw the bars from zero and label the visit totals
- Keep the bars and remove the scale to make them easier to read
- Convert the two bar heights to a percentage of the visible area
= A truncated baseline distorts the ratio of bar lengths.

Q[transfer]: A delivery target of under 13 minutes lies within the class [10,15). What evidence gives an exact count at that target?
* Raw delivery times or a table with a boundary at 13
- The midpoint of the 10-to-under-15 class and its width
- The linearly interpolated value rounded to a whole number
= The existing class count cannot locate values on either side of 13.

Q[transfer]: One department handles mostly easy jobs and has a higher overall success share. What comparison helps assess the effect of the case mix?
* Compare the departments within each difficulty level
- Count easy jobs only in the department with more of them
- Combine all jobs without recording which are hard
= The mix of easy and hard jobs can drive a pooled difference.

Q[transfer]: A model trained on trips from 1 to 5 km predicts duration for a 30 km trip. How should this result be labelled?
* Extrapolation outside the observed distance range
- Interpolation because every distance is greater than zero
- A reliable observation because the formula returns a number
= The observed range ends at 5 km.

Q[transfer]: A CPI release changes its basket and reference year, with no comparable historical series identified. How should a chart handle the old and new releases?
* Show a documented break or keep the series separate
- Join the values directly and label the jump as inflation
- Average the nearest two old and new values before plotting
= A method break can create differences unrelated to measured price movement.

Q[transfer]: Two annual infant mortality estimates differ by 0.8 per 1,000 live births. What is that absolute difference on a per-100 scale?
A: 0.08 | .08 | 0.08 points | 0.08 percentage points
= Divide the per-thousand difference by 10. This is an absolute change, not a relative percentage change.
