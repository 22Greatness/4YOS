---
id: dd-shape
pack: Describing Data · Centre and spread
title: Skewness and kurtosis
minutes: 45
source: NIST · Measures of skewness and kurtosis
url: https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm
courses: Describing Data · STA 111
format: 2
teaches: skewness; moment-shape; kurtosis; excess-kurtosis
uses: dd-variance; dd-boxplots; dd-histograms
---
# Goal
Describe distribution shape and calculate unadjusted moment skewness and kurtosis for a short list.

# Why
Mean and standard deviation can agree while a dataset has a long tail or more extreme observations. Shape measures make that difference easier to discuss.

# Warm-up
?? What is a deviation?
=> A value minus its mean.

?? What happens to a negative deviation when squared?
=> It becomes positive unless it is zero.

# Lesson
## Find the tail
A symmetric distribution has matching shapes to the left and right of its centre. A right-skewed distribution extends farther or more thinly toward higher values; a left-skewed distribution extends toward lower values. Name the skew for the tail, rather than the side on which most observations are packed. For example, most invented delivery times might lie near 20 minutes with a few at 70 or 90. The tail extends toward the long waits, so the observed shape is right-skewed.

A long right tail often pulls the mean above the median, because the mean gives weight to the size of each wait. But the relationship between those two summaries is a clue, not a universal rule. A mixture of groups or several peaks can make the signs harder to interpret. Inspect the histogram, show the sample size and note isolated observations. A right-skewed result based on six cases can be less stable than a similar result from a well-collected larger list.

For two groups with similar central waits, ask whether the tail matters for the decision. If a service must meet a maximum wait, a few very long times may deserve separate reporting. Include a threshold count rather than relying on one shape number.

## Calculate shape from standardised distances
For a small example use invented values 1, 1 and 4. Their mean is 2 and deviations are −1, −1 and 2. The population-form mean squared deviation is (1+1+4)/3 = 2. Standard deviation is the square root of 2. Divide each deviation by that standard deviation. The resulting numbers say how many standard deviations a value lies above or below the mean. They have no units.

For the unadjusted moment skewness, cube these standardised distances and average the cubes. An equivalent hand calculation averages the original cubed deviations and divides by the cube of the standard deviation. The cubed deviations are −1, −1 and 8, giving an average of 2. Divide by the cube of the square root of 2 to get about 0.707. The positive sign records the larger positive tail contribution. A symmetric list such as 1, 2 and 3 has cubed deviations that cancel, so its skewness is zero. The converse does not hold: cancellation can occur in a list without mirror symmetry.

Use the population form of standard deviation for this unadjusted descriptive calculation, with divisor N. Some software reports a sample-adjusted coefficient. Record which formula you used and compare numbers only when the conventions match. If all observations are equal, the standard deviation is zero and neither standardised coefficient in this lesson is defined.

## Interpret the fourth power
For **kurtosis**, raise the standardised distances to the fourth power and average. This weights far-away observations strongly, whichever side they occur on. For our list 1, 1 and 4, the fourth powers of the original deviations are 1, 1 and 16. Their average is 6. Divide by the fourth power of the standard deviation. Because the variance is 2, that denominator is 4. The kurtosis is 1.5. **Excess kurtosis** subtracts 3, so the excess is −1.5 under this convention.

The familiar symmetric bell-shaped normal distribution has moment kurtosis 3, or excess 0. A fourth-power summary is useful for comparing how strongly extreme distances contribute relative to standard deviation. It is not a measure of the height of the peak alone. A positive skew does not require positive excess kurtosis. Our short example shows both signs can differ. Small datasets are a poor basis for broad claims about a population's tails.

When presenting the numbers, say “unadjusted moment” and “kurtosis” or “excess kurtosis” explicitly. Keep a plot beside them. A single extreme value can change both measures markedly, and none of these summaries can tell you whether the value is a recording mistake or a genuine rare event. Check it in context.

# Exercises
?? Which side names the skew of a list with most values high and a few much lower?
=> Left, because the tail extends toward smaller values.

?? A program reports excess kurtosis 2. What is ordinary kurtosis under the same calculation?
=> 2 + 3 = 5.

# Practice
Sketch two distributions with the same approximate centre but different tails. Then calculate skewness and kurtosis for a short numerical list using the unadjusted formula, and compare after changing the most extreme value. Label any invented trial values.

# Rubric
- I named the tail rather than the side with most observations.
- I stated the formula convention and treated extreme values as findings to investigate.

# Summary
- Skew describes asymmetry and is named for the tail.
- Moment skewness uses cubes of standardised deviations; kurtosis uses fourth powers.
- Excess kurtosis subtracts three, and both coefficients need nonzero spread.

# Check
Q: Where does the tail extend in a right-skewed distribution?
P: Find the tail
* Toward the higher recorded values
- Toward the lower recorded values
- Only around the centre of the distribution
= The sign names the tail.

Q: Most waits are short, with a few very long. Which shape fits?
P: Find the tail
* Right skew because the larger waits extend the tail
- Left skew because most waits are toward the low end
- Symmetry because every wait has the same unit
= The high tail drives the description.

Q: Is mean greater than median a universal test of right skew?
P: Find the tail
* No, it is one clue alongside a plot
- Yes, it proves the tail direction in every dataset
- Yes, but only when sample size is even
= The two summaries alone cannot determine shape.

Q: What power is used in moment skewness?
P: Calculate shape from standardised distances
A: 3 | three | third
= Cubing keeps the sign of deviations.

Q: What is the skewness of an exactly symmetric list with nonzero spread?
P: Calculate shape from standardised distances
A: 0 | zero
= Matching positive and negative cubes cancel.

Q: All values equal 4. What is moment skewness?
P: Calculate shape from standardised distances
* Undefined because standard deviation is zero
- Zero because the third power always vanishes
- Four because all observations have that value
= Standardising would divide by zero.

Q: Which power is used in ordinary moment kurtosis?
P: Interpret the fourth power
A: 4 | four | fourth
= Fourth powers weight extreme deviations strongly.

Q: Ordinary kurtosis is 4.5. What is excess kurtosis?
P: Interpret the fourth power
A: 1.5 | 1.50
= Subtract 3.

Q[transfer]: One extreme event raises kurtosis. What can you conclude?
P: Interpret the fourth power
* The standardised extreme distances contribute more
- The central peak must be higher in every plot
- The extreme event was certainly recorded incorrectly
= Kurtosis alone cannot diagnose the cause of the result.

Q[transfer]: Two tools disagree on skewness for the same short list. What should you check?
P: Calculate shape from standardised distances
* Whether one tool adjusts for sample size
- Whether the original values should all be deleted
- Whether skewness must always be measured in minutes
= Different formula conventions can give different numbers.

Q[transfer]: Two groups have similar medians but one has a much longer high tail. What helps compare target breaches?
P: Find the tail
* The count and share beyond the stated target
- Only the larger value of the two medians
- The names of the two measurement instruments
= A threshold share directly answers the question.

# Cards
Which direction is right skew? :: A tail extending toward high values.
What does ordinary moment kurtosis use? :: The mean of standardised deviations raised to the fourth power.
How does excess differ from ordinary kurtosis? :: Subtract 3.

# Further
- NIST · Measures of skewness and kurtosis :: https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm
