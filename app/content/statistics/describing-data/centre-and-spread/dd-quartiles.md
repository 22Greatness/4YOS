---
id: dd-quartiles
pack: Describing Data · Centre and spread
title: The median and quartiles
minutes: 45
source: OpenStax · Measures of the spread of the data
url: https://openstax.org/books/introductory-statistics-2e/pages/2-7-measures-of-the-spread-of-the-data
courses: Describing Data · STA 111
format: 2
lecture: camp
credit: 4YOS Camp
start: 0
end: 87.375
teaches: median; quartile-convention; interquartile-range
uses: sta-centre-spread; dd-stem-leaf; dd-ogive
---
# Goal
Find the median and quartiles from ordered data and report the convention behind the interquartile range.

# Why
A single typical value can hide how tightly values cluster. Quartiles locate the middle of the ordered observations without relying on the largest values.

# Warm-up
?? How do you recover ordered values from a stem plot?
=> Read stems and leaves in numeric order using the key.

?? How is the overall range found?
=> Subtract the minimum from the maximum.

# Lesson
 ## Find the middle in order
> Clip: Follow one long wait through the mean, median and quartiles. Pause to predict what each summary will do.

## Find the middle in order
The median is a centre based on position. Sort observations from smallest to largest before calculating it. Preserve repeats. Each observation has its own position, even if several share a value. For an odd number of values, the median is the observation with equal numbers of positions on either side. For an even number of numeric values, use the arithmetic mean of the middle two. These rules describe positions in the ordered list. A median is not required to appear as an observed value.

Take these invented wait times in minutes, in arrival order: 22, 8, 14, 7, 35, 14, 10. The sorted list is 7, 8, 10, 14, 14, 22, 35. There are seven observations, so the fourth is the median: 14 minutes. If the final value were 135 instead of 35, the median would remain 14 because the middle position would still hold the same value. The mean and range would change. This is why medians are often useful when a few recorded values are very large.

For eight ordered waits 4, 6, 7, 9, 13, 14, 18, 20, the fourth and fifth values are 9 and 13. Their mean is 11. No observation has to equal 11. Read the result in minutes and keep the sample size next to it. If the observations are only ordinal labels such as “slow, medium, fast”, report the middle categories as appropriate. Do not average the codes for two labels as if the steps between them were equal.

## Use one stated quartile rule
The median divides the ordered list in half. Quartiles give positions about a quarter and three quarters through. Several established algorithms give slightly different quartiles, especially on small datasets. In this course we use the **median of halves excluding the overall median**. With an odd list, set aside the middle observation before taking the lower and upper halves. With an even list, split the list into two equal halves. Find each half's median by the same middle rule. Call them Q1 and Q3. The overall median is Q2.

For the seven sorted waits, remove position four from the halves but leave its equal-valued neighbour in the upper half. The lower half is 7, 8, 10. Its median is 8. The upper half is 14, 22, 35. Its median is 22. Q1 is 8 and Q3 is 22. For the eight waits, the lower half is 4, 6, 7, 9, so Q1 is 6.5. The upper half is 13, 14, 18, 20, so Q3 is 16. Ties and interpolation mean the cut points need not divide the data into four piles with exactly the same numbers of distinct values.

When a spreadsheet gives a different result, check its algorithm before changing your answer. A tool might interpolate using positions based on the full list. That is another definition, not evidence of a broken calculator. Use the same method across groups and state it alongside the result.

## Interpret the middle spread
The **interquartile range**, or IQR, is Q3 minus Q1. It measures the width of the middle part of the distribution in the original units. The seven waits have IQR 22 − 8 = 14 minutes. Their overall range is 35 − 7 = 28 minutes. When the maximum changes to 135, the overall range becomes 128 minutes, while this IQR stays 14. Quartiles are less sensitive to extreme values, but moving observations through their positions can still change them.

An IQR of zero does not prove all observations are equal. For 1, 5, 5, 5, 5, 5, 9, both half medians are 5, while the endpoints differ. Report the median and quartiles together, or use a five-number summary if the ends matter. Do not claim that exactly half the observations lie strictly between Q1 and Q3; ties can put several on the boundaries.

If you only have grouped counts, the ogive can suggest quartile positions by reading near 25% and 75%. Those readings use interpolation and should be labelled estimates. Use raw ordered observations when an exact answer under your chosen rule matters.

# Exercises
?? Find the median of 3, 7, 1, 9.
=> Sort to 1, 3, 7, 9. Average 3 and 7 to get 5.

?? For 1, 2, 3, 4, 5, 6, 9, find Q1, Q3 and IQR.
=> The halves are 1, 2, 3 and 5, 6, 9. Q1 = 2, Q3 = 6, IQR = 4.

# Practice
Use at least seven non-sensitive numeric observations. Sort them and mark the median positions and each half. Compute Q1, Q3, IQR and range. Replace only the maximum with a larger trial value and record which summaries change.

# Rubric
- I retained repeated observations and showed the ordered list.
- I stated which quartile convention I used.
- I reported the centre and spread with units.

# Summary
- Sort values to calculate the median.
- Use the stated rule consistently for quartiles.
- IQR is Q3 minus Q1 and describes central spread.

# Check
Q: Find the median of 8, 4, 6.
P: Find the middle in order
A: 6 | six
= The sorted middle value is 6.

Q: Find the median of 2, 4, 10, 20.
P: Find the middle in order
A: 7 | seven
= The middle pair is 4 and 10.

Q: How should repeated observations be handled?
P: Find the middle in order
* Keep each one in the ordered list
- Keep only the first value in each group
- Replace all repeats with the group mean
= Every observation has its own position.

Q: For 2, 3, 4, 7, 8, 11, 19, what is Q1 under our rule?
P: Use one stated quartile rule
A: 3 | three
= The lower half is 2, 3, 4.

Q: For 2, 3, 4, 7, 8, 11, 19, what is Q3 under our rule?
P: Use one stated quartile rule
A: 11 | eleven
= The upper half is 8, 11, 19.

Q: Why name a quartile convention?
P: Use one stated quartile rule
* Established algorithms can give different cut points
- Quartiles are unrelated to the order of observations
- Every method requires a different measurement unit
= The algorithm matters on small lists.

Q: Q1 is 5 and Q3 is 13. What is IQR?
P: Interpret the middle spread
A: 8 | eight
= Subtract 5 from 13.

Q: What does an IQR of zero establish?
P: Interpret the middle spread
* The two quartiles have the same value
- Every observation equals the mean
- The minimum and maximum are equal
= Values outside the quartiles can still differ.

Q[transfer]: A quoted Q3 was read from an ogive inside a class. How do you report it?
P: Interpret the middle spread
* As a grouped-data estimate
- As an exact individual measurement
- As the only possible cut point
= Interpolation does not recover the original values.

Q[transfer]: One very high rent is added to a small table. Why might the median be useful?
P: Find the middle in order
* It responds to middle positions rather than the highest magnitude
- It uses only the maximum to estimate the typical rent
- It stays exactly the same whenever a new value is added
= The median is less sensitive to extreme values, not immutable.

Q[transfer]: Two clinics use different quartile methods. What makes a comparison fairer?
P: Use one stated quartile rule
* Recalculate with the same stated method
- Average their quartiles and remove the clinic names
- Choose the larger answer for every quartile
= Use one convention for both groups.

# Cards
What is the median of an even numeric list? :: The mean of the two middle observations after sorting.
What is IQR? :: Q3 minus Q1.
Why can two tools disagree on Q1? :: They may use different quartile conventions.

# Further
- OpenStax · Measures of the spread of the data :: https://openstax.org/books/introductory-statistics-2e/pages/2-7-measures-of-the-spread-of-the-data
