---
id: dd-boxplots
pack: Describing Data · Centre and spread
title: Box plots and outliers
minutes: 45
source: OpenStax · Measures of spread
url: https://openstax.org/books/introductory-statistics-2e/pages/2-7-measures-of-the-spread-of-the-data
courses: Describing Data · STA 111
format: 2
teaches: five-number-summary; box-plot; tukey-fences; outlier-investigation
uses: dd-quartiles; dd-histograms
---
# Goal
Draw a box plot, calculate outlier fences and investigate flagged observations.

# Why
A box plot lets you compare several distributions on one scale. Knowing the whisker convention prevents you from confusing an unusual observation with an error.

# Warm-up
?? What is IQR when Q1 is 8 and Q3 is 12?
=> 4.

?? Do quartile algorithms always agree?
=> No. Name the method and use it consistently.

# Lesson
## Draw the centre and the box
A five-number summary gives the minimum, first quartile, median, third quartile and maximum. On a number line draw a rectangle from Q1 to Q3 and mark the median inside it. The box length is the interquartile range. It does not show that there are more observations near the wider end. It shows the distance between two cut points. Use the same quartile convention from the previous lesson.

Take these invented response times in minutes: 4, 5, 6, 7, 8, 9, 10, 11, 24. The median is 8. The lower four values have a median of 5.5; the upper four have a median of 10.5. The five-number summary is 4, 5.5, 8, 10.5 and 24. Draw the box from 5.5 to 10.5 with its median line at 8. In a simple min-max box plot the whiskers would extend to 4 and 24. Another common convention uses fences and draws unusual observations separately. Check which convention the reader is expecting.

Write the group label and measurement unit next to the scale. A box plot compares position and spread efficiently, but it cannot recover the original data. The same five numbers can describe different patterns, including two clusters and a single cluster.

## Find the fences and whiskers
In the Tukey-style display used here, compute the IQR, then subtract 1.5 times the IQR from Q1 and add it to Q3. These numbers are the **inner fences**. A recorded value strictly outside a fence is flagged. A value exactly on a fence is within it under this convention. The whiskers end at the smallest and largest observed values that are within the fences. The whiskers do not stop at the calculated fence unless an observed value actually lies there.

Here the IQR is 10.5 − 5.5 = 5 minutes. The fences are 5.5 − 7.5 = −2 and 10.5 + 7.5 = 18 minutes. The lowest observation within the fences is 4 and the highest is 11. Draw whiskers to 4 and 11, and place a separate point at 24. A negative lower fence for a nonnegative measurement is just a calculated boundary. It does not imply negative service time was measured.

For a list with IQR zero, both fences equal the quartile value, so the rule may flag all observations that differ from it. Read such flags with care, particularly for rounded or highly repetitive data. Use a table or dot plot alongside the box so readers see what is going on.

## Use flags as questions
A statistical outlier is an observation that looks unusual under a chosen rule. It may be a legitimate long wait, a duplicate, a misread clock or a different kind of visit. Check the original record, collection rules and units. If you establish an error, correct it with a note. If the observation is valid, keep it and consider reporting a sensitivity comparison. Never remove it solely because it makes a result less tidy.

When comparing groups, look at medians and box lengths on the same scale. A group with a longer box has greater central spread under the chosen quartile rule. A long whisker or several separated points can draw attention to a tail. It does not prove a particular distribution shape. Use a histogram or raw plot to investigate clusters, especially in small datasets.

Also report sample sizes. A narrow box based on six observations is not equally informative as a narrow box from six hundred well-collected observations. If groups use different units or different eligibility rules, reconcile them before comparing. A chart can make two groups look comparable when their metadata say otherwise.

# Exercises
?? Q1 is 10 and Q3 is 18. Find the upper fence.
=> IQR is 8; the upper fence is 18 + 12 = 30.

?? The upper fence is 30 and the largest observations are 27 and 33. Where does the upper whisker end?
=> At 27, the greatest observed value within the fence. Plot 33 separately.

# Practice
Draw a box plot by hand for a numeric public or personal list. State your quartile rule, show both fences, and list flagged values. Verify one unusual record or describe the checks you would need before deciding its status.

# Rubric
- I drew the whiskers to observed in-fence values.
- I checked an unusual value before proposing any change.

# Summary
- The box extends from Q1 to Q3 and marks the median.
- The 1.5 IQR fences flag points, while whiskers stop at observed values.
- A flag prompts investigation.

# Check
Q: What five quantities form a five-number summary?
P: Draw the centre and the box
* Minimum, Q1, median, Q3 and maximum
- Mean, mode, median, range and maximum
- Minimum, sample size, mean, IQR and mode
= The five numbers describe ordered positions.

Q: What is the length of the box along the measurement axis?
P: Draw the centre and the box
* The interquartile range
- The overall range of all values
- The distance from zero to the median
= The box spans Q1 to Q3.

Q: What can two identical boxes still hide?
P: Draw the centre and the box
* Different clusters or individual values
- A difference in the displayed quartiles
- A different position for the displayed median
= Many distributions share the same summaries.

Q: Q1 is 4 and Q3 is 10. Find the upper fence.
P: Find the fences and whiskers
A: 19 | nineteen
= IQR 6, then 10 + 1.5 × 6 = 19.

Q: Q1 is 4 and Q3 is 10. Find the lower fence.
P: Find the fences and whiskers
A: -5 | −5
= 4 − 1.5 × 6 = −5.

Q: Which value is flagged when the upper fence is 19?
P: Find the fences and whiskers
* 20, which lies outside the fence
- 19, which sits exactly on the fence
- 18, which lies just inside the fence
= The rule flags strictly outside values.

Q: A fence is at 19, with observed values 17 and 23 at the high end. Where is the whisker?
P: Find the fences and whiskers
A: 17 | seventeen
= It stops at the largest observation inside the fence.

Q: What should you do first with a flagged long wait?
P: Use flags as questions
* Check the measurement and its context
- Delete it before reporting the data
- Replace it with the nearest fence value
= A flagged value may be genuine.

Q[transfer]: Two clinics use different time units. What comes first?
P: Use flags as questions
* Convert to a common unit and verify definitions
- Compare their boxes on the original numbers
- Use different axes and compare visual widths
= Shared units and definitions support comparison.

Q[transfer]: A chart draws its whisker to the maximum despite an observation outside a Tukey fence. What should you check?
P: Find the fences and whiskers
* Whether it uses a min-max convention
- Whether the median was rounded to two places
- Whether the chart should hide the maximum entirely
= Whisker definitions differ across displays.

Q[transfer]: A sensor reading of 1000 is flagged. Its source confirms the unit is milliseconds while the column uses seconds. What is the fix?
P: Use flags as questions
* Convert the value with a documented correction
- Remove every sensor reading from that group
- Keep the mixed units since the sensor is correct
= Correct the mismatch and preserve its audit trail.

# Cards
Where does the box begin and end? :: Q1 and Q3.
How do you calculate the upper fence? :: Q3 plus 1.5 times the IQR.
What does a point beyond a fence prove? :: It is unusual under that rule; it does not prove an error.

# Further
- OpenStax · Measures of spread :: https://openstax.org/books/introductory-statistics-2e/pages/2-7-measures-of-the-spread-of-the-data
