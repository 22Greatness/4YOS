---
id: dd-fitted-line
pack: Describing Data · Two variables
title: A first fitted line
minutes: 45
source: OpenStax · The regression equation
url: https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation
courses: Describing Data · STA 111
format: 2
teaches: least-squares-line; slope-and-intercept; residual; extrapolation
uses: dd-correlation; dd-scatter; na-rearranging
---
# Goal
Fit a least-squares line to a short paired dataset, compute a prediction and residual, and identify extrapolation.

# Why
A fitted line turns a visible trend into an estimate. A responsible prediction names its units, its remaining error and the range where it was learned.

# Warm-up
?? Which axes carry the two variables in a scatter plot?
=> The explanatory variable chosen as x goes across and the response chosen as y goes up.

?? What did the cross-product sum measure?
=> The total of paired deviations multiplied within each row.

# Lesson
## Choose what to predict
A line for predicting y from x has the form $\hat y = a + bx$. The hat means predicted, so a predicted value need not equal the observed y. The slope b is the predicted change in y for each one-unit increase in x. The intercept a is the predicted y at x = 0. If zero falls far outside the observed x values, the intercept still helps position the line but may have no useful real-world interpretation.

Take the three invented pairs (1,2), (2,3) and (3,7). Imagine x is kilometres and y is minutes. We will predict minutes from kilometres. Predicting kilometres from minutes would be a different task. Even though correlation is symmetric, a fit for y from x minimises differences in y, whereas a fit for x from y minimises differences in x.

Draw the points before fitting. A visibly curved pattern, separate clusters or a distant observation could make one straight line a poor summary. A model is a simplified description. Check what it misses before using it for a decision. Here the three points are enough to show the method, but too few to make a reliable transport prediction.

## Compute the line by hand
Use the deviation table from the correlation lesson. The sum of x squared deviations is 2. The sum of paired cross-products is 5. The least-squares slope b is the cross-product sum divided by the x squared-deviation sum. Here $b=5/2=2.5$ minutes per kilometre. If the x deviations were all zero, there would be no unique slope for this formula.

The line goes through the pair of means (2,4). To find a, substitute x = 2 and predicted y = 4, then subtract $2.5\times2$ from 4. This gives −1, so the fitted rule is $\hat y=-1+2.5x$. At 2 kilometres it predicts 4 minutes. The negative intercept would predict −1 minute for a trip of zero kilometres. That is not a sensible physical prediction. Zero lies outside the training range of 1 to 3 kilometres, so don't use the intercept as a literal journey time.

A **residual** is observed y minus predicted y. For x = 2 the observed time is 3 and the predicted time is 4, giving a residual of −1 minute. The negative sign means the observed time was below the line. At x = 1 and x = 3 the residuals are both +0.5 minutes. The squared residuals add to 1.5 square minutes. This line is called least squares because it minimises that sum among all straight lines with an intercept fitted to these pairs.

## Decide where a prediction is usable
Use interpolation for a new x inside the observed range, such as 2.5 kilometres. The line predicts −1 + 2.5 × 2.5 = 5.25 minutes. This is an estimate, and the residuals show that the line did not fit every original point exactly. Do not report the estimate as a guarantee. For 20 kilometres, arithmetic gives a number but the estimate is outside the observed range. This is extrapolation. Different traffic, road types or route lengths can change the pattern beyond what was observed.

Plot residuals against x. A clear curve can mean a line misses structure. A widening spread can mean predictions at higher x are less precise. If an extreme observation changes the line substantially, report the dependence and investigate the record. Never choose a line solely by how attractive it looks.

In a report, state the fitted rule, define x and y with units, describe the observed range, and give one example residual. If you use the model on new pairs, compare their real outcomes with the predictions. That evidence is more useful than claiming that a strong fit to the original data proves a causal effect.

# Exercises
?? A line is 3 + 4x. What is the prediction at x = 2?
=> 3 + 4 × 2 = 11.

?? The observed value is 9 and the prediction is 11. What is the residual?
=> 9 − 11 = −2.

# Practice
Fit a first line to a small paired dataset with a roughly linear pattern. Show the means, slope, intercept and two residuals. Mark the observed x range and describe a requested prediction you would treat as extrapolation.

# Rubric
- I gave the slope and residuals in their correct units.
- I checked a plot and marked the observed range.

# Summary
- Fit y from x by minimising squared vertical residuals.
- The least-squares line with an intercept passes through the pair of means.
- Extrapolation is prediction outside the observed x range.

# Check
Q: What does y-hat denote?
P: Choose what to predict
* A predicted value of the response
- The observed value of the predictor
- The absolute value of the residual
= A prediction may differ from observation.

Q: For distance in kilometres and time in minutes, what are slope units?
P: Choose what to predict
* Minutes per kilometre
- Kilometres per minute
- Square minutes per trip
= Slope describes change in y per x.

Q: Why is fitting y from x different from fitting x from y?
P: Choose what to predict
* The residuals are measured in different variables
- Correlation changes sign when the variables swap
- A line cannot contain both x and y
= The least-squares target depends on the response.

Q: Cross-products sum to 5 and x squared deviations sum to 2. Find the slope.
P: Compute the line by hand
A: 2.5 | 2.50 | 5/2 | 5 / 2
= Divide 5 by 2.

Q: The pair of means is (2,4) and slope is 2.5. Find the intercept.
P: Compute the line by hand
A: -1 | −1
= 4 minus 2.5 times 2 gives −1.

Q: The observed y is 3 and the fitted y is 4. Find the residual.
P: Compute the line by hand
A: -1 | −1
= Observed minus fitted is −1.

Q: What does least squares minimise for y predicted from x?
P: Compute the line by hand
* The sum of squared vertical residuals
- The sum of raw x measurements
- The largest slope among all possible lines
= The response differences are squared and summed.

Q: Observed x values range from 1 to 3. Which request is interpolation?
P: Decide where a prediction is usable
* Predicting at x equal to 2.5
- Predicting at x equal to 10
- Predicting at x equal to 0
= 2.5 is inside the observed range.

Q[transfer]: A fitted line predicts 12 minutes and the trip takes 15. Find the residual in minutes.
P: Compute the line by hand
A: 3 | 3 minutes | three
= 15 − 12 = 3.

Q[transfer]: A residual plot follows a clear curve. What should you investigate?
P: Decide where a prediction is usable
* Whether a straight line misses a systematic pattern
- Whether all observed values should be rounded to zero
- Whether the intercept should always be removed
= A curve can show that the model form is inadequate.

Q[transfer]: A line trained on 1 to 3 km predicts a value for 50 km. How do you label it?
P: Decide where a prediction is usable
* Extrapolation, with weak support from these data
- Interpolation, since 50 is a positive number
- A guaranteed estimate because the formula returns a value
= The observed range matters to prediction.

# Cards
What is a residual? :: Observed y minus predicted y.
What are the units of a fitted slope? :: Units of y per unit of x.
What is extrapolation? :: Using the model beyond its observed predictor range.

# Further
- OpenStax · The regression equation :: https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation
