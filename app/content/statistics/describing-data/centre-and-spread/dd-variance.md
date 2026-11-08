---
id: dd-variance
pack: Describing Data · Centre and spread
title: Variance and standard deviation
minutes: 45
source: OpenStax · Measures of the spread of the data
url: https://openstax.org/books/introductory-statistics-2e/pages/2-7-measures-of-the-spread-of-the-data
courses: Describing Data · STA 111
format: 2
teaches: deviation; population-variance; sample-variance; standard-deviation
uses: sta-centre-spread; dd-quartiles; na-roots-surds
---
# Goal
Calculate deviations, population and sample variance, and standard deviation. Explain their units and denominators.

# Why
Two groups can have the same mean but different consistency. Standard deviation describes spread around the mean and makes that difference visible.

# Warm-up
?? What is the mean of 2, 4 and 6?
=> 4.

?? What is the nonnegative square root of 9?
=> 3.

# Lesson
## Measure deviations from the mean
A deviation is a recorded value minus its mean. It is a signed difference, so values below the mean have negative deviations. Take three invented waiting times of 2, 4 and 6 minutes. Their mean is 4 and their deviations are −2, 0 and 2 minutes. Those deviations sum to zero. This is true for any list if you subtract its own exact arithmetic mean, because the total of all values equals the mean times their count. Simply averaging the signed differences will always give zero, even for widely spread data.

Squaring the deviations prevents negative and positive differences from cancelling. Here their squares are 4, 0 and 4 square minutes, giving a sum of squares of 8. Squaring also puts more weight on distant observations: a deviation of 4 contributes four times as much as a deviation of 2. Keep this sensitivity in mind when the data include unusually large values.

Work in a small table with a value, its deviation and its squared deviation on each row. Use the unrounded mean for the deviation calculation. Round only after the final step. If your signed deviations do not add to zero apart from small rounding error, check the arithmetic before continuing.

## Choose the denominator
When the list is the whole population of interest, divide the sum of squared deviations by the number of values. The result is the **population variance**. For the three waits that is 8/3 square minutes. The **population standard deviation** is the nonnegative square root, about 1.63 minutes. The square root returns the unit to minutes. A variance does not have the original unit, which is why “a variance of 2.67 minutes” is incorrect.

For a sample used to estimate the population variance, the usual **sample variance** divides by one fewer than the sample size. Here 8/(3−1) = 4 square minutes, so the sample standard deviation is 2 minutes. State which calculation you used. When the population mean is unknown and you fit the sample mean, it sits as close as possible to those sampled points in the squared sense. Under ordinary independent, identically distributed sampling with finite variance, dividing by n−1 corrects the downward bias of the variance estimator. The sample standard deviation itself is not in general unbiased. A sample with one observation does not support this sample variance rule.

For a census of all three waits that matter to a question, the population formula is suitable. If those are three randomly drawn waits used to estimate variability across a larger system, the sample formula may be suitable. A label such as “sample” should follow the study question and design, not just the number of rows.

## Check the meaning and units
Compare the invented lists 3, 4, 5 and 1, 4, 7. Both have mean 4. In the first, deviations are −1, 0 and 1. In the second they are −3, 0 and 3. The second set's standard deviation is three times the first under either denominator, while the variance is nine times as large. Adding the same constant to every value would shift the mean and each value together, leaving their deviations unchanged. Converting minutes to seconds multiplies each deviation and the standard deviation by 60, and variance by 3600.

A standard deviation of zero means all included values are equal. A large standard deviation can arise from broad variation or a few extremes. Use a chart and compare with the IQR before claiming that most values are widely spread. A universal rule such as “about two thirds are within one standard deviation” does not follow from the definition. That familiar rule is an approximation for a particular distribution shape, not a guarantee for arbitrary data.

Python's standard library can check your hand calculation. The two functions here differ by the denominator just described.

```python
from statistics import pstdev, stdev
waits = [2, 4, 6]
print(round(pstdev(waits), 2))
print(round(stdev(waits), 2))
```

```output
1.63
2.0
```

Explain what each number means before using it in a report.

# Exercises
?? What is the population variance of 3, 3 and 3?
=> All deviations are zero, so the variance is zero.

?? What is the sample standard deviation of 1, 3 and 5?
=> Mean 3, squared deviations 4, 0, 4. Divide 8 by 2 and take the square root of 4 to get 2.

# Practice
Choose at least five non-sensitive measurements in a shared unit. Make a deviation table. Calculate both versions of standard deviation and say which your question calls for. Change one extreme value and explain what happens to standard deviation and IQR.

# Rubric
- I checked the signed deviations and squared deviations separately.
- I used and named the appropriate denominator and units.

# Summary
- Deviations are signed; squares measure their magnitude without cancellation.
- Population variance uses N; the usual sample variance uses n−1.
- Standard deviation has the original measurement unit.

# Check
Q: An observation is 5 and the mean is 8. What is its deviation?
P: Measure deviations from the mean
A: -3 | −3
= Subtract 8 from 5.

Q: What do deviations from their exact arithmetic mean sum to?
P: Measure deviations from the mean
A: 0 | zero
= The sum of values equals the mean times the count.

Q: Why square deviations?
P: Measure deviations from the mean
* To keep opposite signs from cancelling
- To make their measurement units disappear
- To reduce the influence of large deviations
= Both positive and negative deviations produce positive squares.

Q: Three values are the entire population and their squared deviations sum to 12. Find the variance.
P: Choose the denominator
A: 4 | four
= Divide by the population count of three.

Q: Three sampled values have squared deviations summing to 8. Find the sample variance.
P: Choose the denominator
A: 4 | four
= Divide 8 by 3−1.

Q: What is the sample variance of a one-value sample under the usual formula?
P: Choose the denominator
* Undefined because the divisor is zero
- Zero because a single observation has no spread
- One because one observation was collected
= The usual sample variance requires at least two observations.

Q: What are standard deviation units for times recorded in minutes?
P: Check the meaning and units
* Minutes, the original measurement unit
- Square minutes, like the variance
- No unit, because it is a ratio
= Taking the square root restores minutes.

Q: What happens to standard deviation if all values increase by five?
P: Check the meaning and units
* It remains unchanged as the mean also rises
- It increases by five along with the mean
- It changes by a factor equal to five
= Differences from the mean stay the same.

Q[transfer]: Times are converted from minutes to seconds. What happens to variance?
P: Check the meaning and units
* It is multiplied by 3600
- It is multiplied by 60
- It remains the same number
= Variance uses squared units.

Q[transfer]: You report the variation of every value from the only shift you wish to describe. Which divisor fits?
P: Choose the denominator
* The count of measurements in that shift
- One fewer than the number of measurements
- The number of minutes in the shift
= Those values form the whole group of interest.

Q[transfer]: An extreme transaction inflates the standard deviation. What should you add?
P: Check the meaning and units
* A plot and a more resistant summary such as IQR
- A claim that every transaction is unusually large
- A new sample variance rounded to a whole number
= A plot and IQR help distinguish an extreme from widespread variation.

# Cards
What does a deviation measure? :: An observation minus its mean.
What divisor does sample variance use? :: n−1, for the usual sample variance.
What are the units of standard deviation? :: The same units as the observations.

# Further
- OpenStax · Measures of the spread of the data :: https://openstax.org/books/introductory-statistics-2e/pages/2-7-measures-of-the-spread-of-the-data
