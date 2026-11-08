---
id: dd-grouped-summaries
pack: Describing Data · Centre and spread
title: Grouped data calculations
minutes: 45
source: OpenStax · Measures of spread
url: https://openstax.org/books/introductory-statistics-2e/pages/2-7-measures-of-the-spread-of-the-data
courses: Describing Data · STA 111
format: 2
teaches: midpoint-weighted-mean; grouped-variance; grouped-quantile-estimates
uses: dd-grouped; dd-ogive; dd-quartiles; dd-variance
---
# Goal
Estimate the mean, standard deviation and median from class counts, and say what the grouping cannot recover.

# Why
Public tables often show counts by interval instead of the original records. Estimates help describe them, provided you keep their assumptions visible.

# Warm-up
?? What is the midpoint of 10 to under 20?
=> 15.

?? Why is the ogive reading inside an interval approximate?
=> The original positions within the interval are unknown.

# Lesson
## Replace each class by its midpoint
Start with the class boundaries, counts and their total. In an invented list of eight service times, the classes 0 to under 10, 10 to under 20 and 20 to under 30 have counts 2, 4 and 2. Use 5, 15 and 25 minutes as representative values. Imagine making a new list with two copies of 5, four copies of 15 and two copies of 25. That is an approximation to the unknown raw list. You can do its arithmetic without writing every copy.

Multiply the midpoint by its frequency to get each estimated class total. The products are 10, 60 and 50 minutes. Add them to get 120 and divide by the sum of frequencies, 8, giving a midpoint estimate of 15 minutes. Notice what is being weighted: the second midpoint contributes four times, not once. Taking the simple mean of midpoints can be wrong if their frequencies differ. For counts of 1, 1 and 6, the same midpoints give (5 + 15 + 150)/8 = 21.25 minutes. The simple midpoint mean still gives 15.

You do not know that the first two service times averaged 5. They could have been 1 and 2, or 8 and 9. The midpoint calculation replaces the unknown class average with a plausible representative value. Record that assumption when you give the result.

## Approximate spread around that mean
Use the same midpoint replacement for variance. For each class, subtract the estimated mean from its midpoint, square the result and multiply by the class frequency. In the first example the differences are −10, 0 and 10 minutes. The squared differences are 100, 0 and 100 square minutes. Multiplying by 2, 4 and 2 gives 200, 0 and 200. Their sum is 400. If describing those eight records as the whole set, divide by 8 to get an estimated population variance of 50 square minutes. Its standard deviation is the square root, about 7.07 minutes.

If you need the usual sample version, use the denominator 7 and report an estimated sample variance of about 57.14 square minutes. The grouped result still approximates the raw sample's variance. The midpoint method discards any variation within classes. Depending on where actual values fall, it can give a higher or lower estimate than the actual variance. For example, replacing two values 9 and 10 by the adjacent midpoints 5 and 15 overstates their separation. Replacing 0 and 9 by two copies of 5 hides their separation completely.

A class without an upper boundary has no known midpoint. An estimate based on a chosen replacement needs a defensible external assumption and a sensitivity check. If you cannot make one, say why you cannot estimate the summary from the supplied table.

## Locate quantiles with running counts
For the eight waits, cumulative counts at the three upper boundaries are 2, 6 and 8. The halfway target of 4 falls in the middle class. That class starts at 10 minutes, with two observations below it and four observations inside it. A linear interpolation places the halfway threshold at $10 + (4-2)/4\times10 = 15$ minutes. This estimates a grouped median. It uses a different calculation than replacing every value by a midpoint. The two estimates happen to agree in this example because the counts are symmetric.

For a quarter threshold, start with one quarter of the total count. Here 2 lies exactly at the first upper boundary. That is a grouped threshold estimate, and it can differ from an exact median-of-halves calculation on raw observations. Do not use the word exact when reporting grouped percentiles. Name the interval boundaries and the interpolation rule.

To present a grouped summary, give the frequency table, the calculation method and the units. If raw data are available, compare the grouped mean with the raw mean to see how much detail was lost. If you need an exact answer, use the original measurements or a source that publishes the requested statistic directly.

# Exercises
?? The class [20,30) has 6 observations. What does it add to the estimated total?
=> Midpoint 25 × 6 = 150.

?? A median threshold is two counts into a class of four with width 20. How far into the class does linear interpolation put it?
=> Half the class width, or 10 units.

# Practice
Use a public or personal grouped table with finite class boundaries. Estimate the mean, a standard deviation and a halfway threshold. Report each as an estimate and explain what you would need to calculate it exactly.

# Rubric
- I weighted each midpoint by its frequency and showed the denominator.
- I identified the interpolation and midpoint assumptions separately.

# Summary
- Class midpoints replace unknown raw values in grouped mean and variance estimates.
- Weight calculations by frequency.
- Use cumulative totals for interpolated quantile estimates.

# Check
Q: What is the midpoint of 20 to under 30?
P: Replace each class by its midpoint
A: 25 | twenty-five
= Halfway between 20 and 30.

Q: Midpoint 15 has frequency 4. What is its contribution to the estimated total?
P: Replace each class by its midpoint
A: 60 | sixty
= Multiply midpoint by frequency.

Q: Which divisor belongs in the grouped mean?
P: Replace each class by its midpoint
* The sum of the class frequencies
- The number of different class intervals
- The sum of the class midpoints
= Each frequency counts observations.

Q: A midpoint is 5 below the grouped mean and represents 3 observations. What squared-deviation total does it contribute?
P: Approximate spread around that mean
A: 75 | seventy-five
= Three times the square of 5.

Q: Why can a grouped variance differ from the raw variance?
P: Approximate spread around that mean
* Midpoints replace individual values within classes
- The population formula never uses observations
- The standard deviation was measured in original units
= Midpoint replacement changes the squared distances.

Q: What prevents an ordinary midpoint calculation for a top class of 30 or more?
P: Approximate spread around that mean
* The upper class boundary is unknown
- The lowest value in the class is zero
- The sample size may be an odd number
= Two finite boundaries determine a midpoint.

Q: For total frequency 24, what is the halfway cumulative target?
P: Locate quantiles with running counts
A: 12 | twelve
= Half of 24 is 12.

Q: What assumption underlies interpolation inside a class?
P: Locate quantiles with running counts
* Count accumulates evenly across that class
- Every observation is at the lower boundary
- Every observation equals the exact median
= A straight segment allocates a fraction of the class count.

Q[transfer]: Midpoints 10 and 30 have frequencies 3 and 1. Find the grouped mean.
P: Replace each class by its midpoint
A: 15 | fifteen
= (3 × 10 + 30) ÷ 4 = 15.

Q[transfer]: A report uses a grouped median and a raw-data quartile. What should it disclose?
P: Locate quantiles with running counts
* Which is interpolated and which uses individual values
- That both were found from the same exact method
- That the grouped figure is necessarily more accurate
= The methods use different information.

Q[transfer]: An open-ended top class dominates a report. What is needed for a defensible mean estimate?
P: Approximate spread around that mean
* Additional information about the values in that class
- The midpoint of the second highest class only
- A zero added at the end of the frequency table
= The open class has no determined midpoint.

# Cards
What is an estimated class total? :: Midpoint multiplied by frequency.
What is the grouped mean denominator? :: The total frequency.
Does a midpoint estimate include within-class variation? :: No.

# Further
- OpenStax · Measures of spread :: https://openstax.org/books/introductory-statistics-2e/pages/2-7-measures-of-the-spread-of-the-data
