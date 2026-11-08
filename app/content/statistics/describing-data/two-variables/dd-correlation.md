---
id: dd-correlation
pack: Describing Data · Two variables
title: Correlation
minutes: 45
source: OpenStax · The regression equation
url: https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation
courses: Describing Data · STA 111
format: 2
teaches: pearson-correlation; cross-products; correlation-limits
uses: dd-scatter; dd-variance; na-roots-surds
---
# Goal
Calculate Pearson's correlation for a short paired list and interpret its sign, strength and limits.

# Why
A scatter plot shows the pattern first. Correlation adds one number that describes how closely the pairs follow a straight trend.

# Warm-up
?? What does a positive scatter pattern look like?
=> Larger x values tend to pair with larger y values.

?? What is a deviation?
=> A value minus its mean.

# Lesson
## Turn paired movement into products
Pearson's correlation, written r, measures the direction and strength of linear association. Start with a scatter plot so you know what kind of pattern you are trying to summarise. If a curve describes the data better than a line, correlation can miss the main feature. It is also sensitive to unusual pairs.

Take three invented paired observations (1,2), (2,3), (3,7). The x mean is 2 and the y mean is 4. Write the signed deviations on each row. For x they are −1, 0 and 1. For y they are −2, −1 and 3. Multiply the two deviations within each row. The products are 2, 0 and 3. Positive products occur when both deviations share a sign, as when both measurements are below their means or both above. Negative products occur when one is above its mean and one below. Adding the products gives 5, called the sum of cross-products here.

Changing kilometres to metres would multiply all x deviations and hence the sum of cross-products by a thousand. That would change the raw cross-product number without changing the shape of the scatter. To make a unit-free measure, we divide by a corresponding measure of the two spreads.

## Divide by the combined spread
Square and add the x deviations: 1 + 0 + 1 = 2. Square and add the y deviations: 4 + 1 + 9 = 14. Multiply those totals and take the square root, giving $\sqrt{28}$. Now divide the cross-product total by that result. Here $r=5/\sqrt{28}\approx0.945$. This is a strong positive linear association for these three recorded pairs. Three points do not establish that this relationship is equally strong in a wider population.

| Pair | x deviation | y deviation | Product | x square | y square |
| --- | --- | --- | --- | --- | --- |
| (1,2) | −1 | −2 | 2 | 1 | 4 |
| (2,3) | 0 | −1 | 0 | 0 | 1 |
| (3,7) | 1 | 3 | 3 | 1 | 9 |
| Totals | 0 | 0 | 5 | 2 | 14 |

The value of r is between −1 and 1. Exactly 1 or −1 means the points lie exactly on a nonhorizontal, nonvertical straight line, with direction given by the sign. If either variable is constant, its squared deviation total is zero. Correlation is then undefined, not zero. Swapping x and y changes neither the cross-products nor the denominator. Correlation is symmetric and has no physical unit.

## Read the number with its picture
A value near zero indicates little linear association. For example, the invented points (−2,4), (−1,1), (0,0), (1,1), (2,4) form a clear U. Their correlation is zero because the positive and negative cross-products balance. The plot still reveals a strong curved relationship. A single distant observation can also push r toward or away from zero. Verify the observation and show how much the result depends on it without quietly deleting it.

Try a sensitivity calculation with the three worked pairs. Add the invented pair (6,1), which lies to the right and below the earlier pattern. The new means are 3 and 3.25. Recalculate every deviation from these new means. The sum of cross-products is now −4, and the squared-deviation sums are 14 and 20.75. The correlation becomes about −0.235, reversing sign. In a real study, report the result with that observation included and explain its influence. Show the calculation without it as a sensitivity comparison only, unless there is evidence that it should be excluded.

Do not use fixed cutoffs for “weak” or “strong” without context. A relationship that is useful for a rough operational prediction may be inadequate for a decision requiring high precision. Report the number of complete pairs, units of the original variables, the scatter pattern and the value of r. If the data are annual observations, trends over time can drive correlations between unrelated series. An association is a description of the pairs. It cannot by itself prove that changing one variable will change the other.

# Exercises
?? If every y increases by 10, what happens to r?
=> Nothing. Every y deviation remains the same because the mean also increases by 10.

?? If all y values are 4, what is r?
=> Undefined. The squared y deviations sum to zero.

# Practice
Choose at least five complete numeric pairs. Draw the scatter plot and make a deviation table. Compute Pearson's r, keeping the unrounded totals. Describe one reason its magnitude might be misleading.

# Rubric
- I kept pairs intact and showed each cross-product total.
- I interpreted r alongside the scatter pattern and sample size.

# Summary
- Pearson's r is a unit-free linear association measure.
- Compute it from cross-products and both squared deviation totals.
- An undefined or zero coefficient has a specific meaning; check the plot.

# Check
Q: What is multiplied in each row?
P: Turn paired movement into products
* The paired deviations from the two means
- The two column means for every row
- The ranks after sorting columns independently
= Cross-products preserve the pairing.

Q: What sign does a cross-product have when both deviations are negative?
P: Turn paired movement into products
* Positive, since both signs match
- Negative, because both points are low
- Zero, because their signs cancel
= A negative times a negative is positive.

Q: What does Pearson's r describe?
P: Turn paired movement into products
* Direction and strength of linear association
- The slope in the original physical units
- The causal impact of changing x by one
= Correlation describes association on a unit-free scale.

Q: Cross-products sum to 5 and squared deviations sum to 2 and 14. What is r?
P: Divide by the combined spread
* 5 divided by the square root of 28
- 5 divided by the square root of 16
- 28 divided by the square root of 5
= Multiply the two squared totals under the root.

Q: What is r if all x values are equal?
P: Divide by the combined spread
* Undefined because the x spread is zero
- Zero because no x difference was observed
- One because all x values agree exactly
= The denominator would be zero.

Q: If x and y are swapped, what happens to r?
P: Divide by the combined spread
* It remains unchanged because r is symmetric
- It becomes the negative of the original r
- It becomes the reciprocal of the original r
= Products and combined spread are symmetric.

Q: A clear U-shaped pattern has r near zero. What does that mean?
P: Read the number with its picture
* There is little linear association despite the curve
- The variables are definitely unrelated in any way
- The plot must have the wrong measurement units
= Pearson r may miss nonlinear patterns.

Q: How should an unusual pair be handled?
P: Read the number with its picture
* Investigate and report how much the result depends on it
- Drop it automatically before reporting a correlation
- Move it nearer the trend line to improve accuracy
= A rare value can be genuine and influential.

Q[transfer]: A colleague reports r = 1.6. What should you check?
P: Divide by the combined spread
* The calculation, because r cannot exceed 1
- The original units, because r is measured in them
- Whether the larger variable always comes first
= Pearson r stays between −1 and 1 when defined.

Q[transfer]: Distances are converted from kilometres to metres. What happens to r?
P: Turn paired movement into products
* It stays the same under this positive rescaling
- It increases by one thousand like the cross-products
- It reverses sign because the unit changed
= The rescaling cancels between numerator and denominator.

Q[transfer]: Both annual series rise steadily, producing a strong r. What should the caption avoid?
P: Read the number with its picture
* Claiming that one rise caused the other
- Stating the number of annual pairs used
- Reporting the sign of the calculated r
= A shared time trend can generate association.

# Cards
What does a negative r indicate? :: A downward linear tendency.
Can r be zero with a strong curved relationship? :: Yes.
When is r undefined? :: When there are too few pairs or either variable has no variation.

# Further
- OpenStax · The regression equation :: https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation
