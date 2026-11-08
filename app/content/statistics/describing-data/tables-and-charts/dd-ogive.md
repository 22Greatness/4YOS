---
id: dd-ogive
pack: Describing Data · Tables and charts
title: Cumulative frequency and ogives
minutes: 45
source: OpenStax · Histograms, frequency polygons and time series graphs
url: https://openstax.org/books/introductory-statistics-2e/pages/2-2-histograms-frequency-polygons-and-time-series-graphs
courses: Describing Data · STA 111
format: 2
teaches: cumulative-frequency; ogive; threshold-interpolation
uses: dd-grouped; dd-histograms; counts
---
# Goal
Add running totals, draw an ogive and distinguish known threshold counts from interpolated estimates.

# Why
A queue manager often needs to know how many people waited less than a target time. Cumulative totals answer threshold questions directly.

# Warm-up
?? What is the total of class counts 3, 4 and 5?
=> 12.

?? With intervals starting at 0, 5 and 10, does a recorded 10 count as under 10?
=> No.

# Lesson
## Accumulate the class counts
A frequency table answers how many observations fell inside each class. A **cumulative frequency** answers how many fell below a class's upper boundary when the upper endpoint is excluded. Start with zero and add each class count in order. The first running total equals the first class count. The last equals the total number of valid measurements. A smaller cumulative count later in the list signals a mistake, since adding observations cannot reduce the count.

Use an invented service-time table in minutes. The intervals 0 to under 5, 5 to under 10, 10 to under 15 and 15 to under 20 have counts 3, 4, 2 and 3. The cumulative counts are 3, 7, 9 and 12. Seven services took less than ten minutes and nine took less than fifteen minutes. The difference 9 minus 7 gives two services at least ten and below fifteen minutes. Because our convention excludes upper boundaries, a service taking exactly ten minutes belongs to the difference, not the first seven.

To get cumulative percentages, divide each total by 12 and multiply by 100. The exact fractions are 3/12, 7/12, 9/12 and 12/12. Display them as 25%, about 58.3%, 75% and 100%. Calculate with the counts or unrounded fractions if you need a later difference. Small rounding changes do not mean the underlying count changed.

## Draw a cumulative curve
An **ogive** displays cumulative count or percentage against the upper class boundary. Mark the starting point (0, 0) because no valid service time was below the starting boundary in this table. Then plot (5, 3), (10, 7), (15, 9) and (20, 12). Connect successive points by straight segments for a grouped-data ogive. The segments do not assert that observations actually occurred uniformly within each interval. They show a simple way to estimate what might be between known points.

The axes should say “Upper time boundary in minutes” and “Services with time below boundary.” If you plot percentages, replace the count label and finish at 100%. A horizontal segment means there were no observations in that class. A steeper segment means the count accumulated faster over that range. Do not compare slopes from two ogives if one uses counts and the other percentages without checking the denominators.

There is also an exact display when raw values are available. An empirical cumulative distribution can jump at each recorded value. One common version reports the share at or below each value. That inclusive rule differs from our grouped points at an exclusive upper boundary. State which rule you are using, particularly when many observations land exactly on a threshold.

```chart
{"kind":"line","title":"Cumulative service count","alt":"The cumulative count increases from zero to twelve through three, seven and nine","note":"Invented practice counts; straight segments interpolate between class boundaries","xLabel":"Upper boundary in minutes","yLabel":"Cumulative count","x":"boundary","y":"count","data":[{"boundary":0,"count":0},{"boundary":5,"count":3},{"boundary":10,"count":7},{"boundary":15,"count":9},{"boundary":20,"count":12}]}
```

## Estimate between known points
At 12.5 minutes you are halfway from 10 to 15. The line rises from 7 to 9 over that span, so linear interpolation gives 8 below 12.5. This is an estimate. The two observations in the class might both be below 12.5, both above it, or one on either side. All of those raw lists produce the same grouped table. The exact count below 12.5 is bounded between 7 and 9. The chart cannot recover the individual times.

You can also read the graph in reverse. To find an estimated middle threshold, find half the observations on the vertical axis, here 6. Six lies between the cumulative counts 3 and 7. It is three quarters of the way across that vertical rise. Three quarters of the five-minute class width is 3.75 minutes. The estimated halfway time is 8.75 minutes. The raw data could give a different median. You will work out exact medians from raw lists later.

Use the right tool for the decision. If a public target is defined as “less than 12.5 minutes,” ask for raw times or a table with a boundary at 12.5 when the decision hinges on a single case. If all you need is a broad picture, a labelled estimate may be sufficient. State the assumption and keep the observed boundary totals available.

# Exercises
?? Cumulative counts at 5 and 10 minutes are 3 and 7. How many waits are in [5,10)?
=> 7 − 3 = 4.

?? What if both class counts around a threshold could alter a decision?
=> Use individual measurements or request a table grouped at that threshold.

# Practice
Use your grouped table to add a cumulative count and share column. Plot one point per upper boundary plus the initial zero. Read one boundary exactly and estimate one interior threshold. Report what could vary inside the class.

# Rubric
- My running count ends at the valid sample size.
- Each point uses the correct upper boundary.
- I labelled interpolation as an estimate.

# Summary
- Add counts in order to get cumulative frequency.
- Plot the totals at upper class boundaries.
- Read interior thresholds as estimates unless the raw records are available.

# Check
Q: What is the running total after counts 3, 4 and 2?
P: Accumulate the class counts
A: 9 | nine
= Add all three class counts.

Q: What does the final cumulative count equal?
P: Accumulate the class counts
* The number of valid included observations
- The number of interval labels displayed
- The sum of the original measured values
= Every valid row has been counted once.

Q: If the counts are 3, 4, 2 and 3, how many are below the second upper boundary?
P: Accumulate the class counts
A: 7 | seven
= Add the first two counts.

Q: Where does each cumulative point go?
P: Draw a cumulative curve
* At the upper boundary of its class
- At the midpoint of the class
- At the smallest observed value in the class
= The running count includes the whole class up to its upper edge.

Q: What does a level segment between grouped points indicate?
P: Draw a cumulative curve
* Zero observations in that class
- A negative frequency in the class
- The highest observed value in the class
= The cumulative count did not increase.

Q: What is the final cumulative percentage with valid observations?
P: Draw a cumulative curve
A: 100 | 100% | 100 percent
= The entire included group has been counted.

Q: At a halfway point between totals 7 and 9, what does linear interpolation give?
P: Estimate between known points
A: 8 | eight
= Half the rise of two adds one to seven.

Q: Is the interpolated 8 necessarily the true count?
P: Estimate between known points
* No, values may cluster within the interval
- Yes, any cumulative chart gives all raw values
- Yes, if the endpoint counts are both odd
= The grouped table does not show positions inside a class.

Q[transfer]: The cumulative counts below 5 and below 10 are 12 and 26. How many are at least 5 but below 10?
P: Accumulate the class counts
A: 14 | fourteen
= Subtract 12 from 26.

Q[transfer]: Your target lies halfway through a busy class. What gives the exact number that met it?
P: Estimate between known points
* The raw records or a boundary at the target
- The linearly interpolated count rounded down
- The total count of the busiest class
= Only a matching boundary or raw values resolves it.

Q[transfer]: A cumulative chart drops from 20 to 18 at the next boundary. What should you check?
P: Draw a cumulative curve
* An error in accumulation or plotting
- A negative change in the dataset's sample size
- Whether the next interval was especially wide
= Running totals of nonnegative counts cannot decrease.

# Cards
What is an ogive? :: A plot of cumulative count or percentage against a boundary.
How do you get a class count from adjacent cumulative counts? :: Subtract the earlier total from the later total.
What does a straight segment between points assume for an estimate? :: The count accumulates evenly across that interval.

# Further
- OpenStax · Histograms, frequency polygons and time series graphs :: https://openstax.org/books/introductory-statistics-2e/pages/2-2-histograms-frequency-polygons-and-time-series-graphs
