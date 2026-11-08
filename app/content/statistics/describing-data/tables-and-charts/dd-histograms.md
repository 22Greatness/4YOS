---
id: dd-histograms
pack: Describing Data · Tables and charts
title: Histograms
minutes: 45
source: OpenStax · Histograms, frequency polygons and time series graphs
url: https://openstax.org/books/introductory-statistics-2e/pages/2-2-histograms-frequency-polygons-and-time-series-graphs
courses: Describing Data · STA 111
format: 2
teaches: histogram; frequency-density; distribution-shape
uses: dd-grouped; dd-bar-pie
---
# Goal
Draw a histogram and use rectangle area to compare equal and unequal class widths.

# Why
The most common range of measurements is not always represented by the tallest count bar. When widths vary, interpreting a histogram correctly depends on area.

# Warm-up
?? What is the width of [10,15)?
=> Five units.

?? Where does 15 belong in [10,15) and [15,20)?
=> The second interval.

# Lesson
## Build the rectangles
A histogram groups numerical values into intervals on a number line. Draw one rectangle over each interval. The width of the rectangle is the class width on the same continuous horizontal scale. Adjacent nonempty classes touch. An empty class has zero height and still occupies its horizontal span. This differs from a category bar chart, where the spaces and widths are mainly for layout. A histogram's interval order is fixed by the numerical values.

Use these invented waits in minutes: 1, 3, 4, 5, 7, 8, 9, 10, 12, 15, 17, 19. Mark boundaries at 0, 5, 10, 15 and 20. Tally the four half-open intervals: 3, 4, 2, 3. For equal widths, count heights work because each area is the same multiple of its count. A class with twice the count has twice the area. Label that vertical axis “Frequency”. Under 10 minutes covers the first two rectangles, so seven of the twelve waits qualify.

The horizontal axis should show minutes, not just class names. Tick marks indicate where the boundaries fall. Look at the table while drawing and check that a boundary value such as 5 appears in only one rectangle. Describe the histogram as a picture of these observations. It is not enough evidence to know the exact probability of the next wait.

```chart
{"kind":"hist","title":"Invented wait times","alt":"Four consecutive five-minute classes with counts 3, 4, 2 and 3","note":"Invented practice values","xLabel":"Wait in minutes","yLabel":"Frequency","values":[1,3,4,5,7,8,9,10,12,15,17,19],"thresholds":[0,5,10,15,20]}
```

## Use density when widths differ
Now combine the last two classes into 10 to under 20. The frequencies are 3, 4 and 5, with widths 5, 5 and 10. If you use the counts as heights, the areas become 15, 20 and 50. The last class occupies a much larger share of ink than its five observations warrant. To avoid this, divide frequency by width. The resulting heights are 0.6, 0.8 and 0.5 observations per minute of class width. These heights are called **frequency densities**. The areas are 3, 4 and 5 again.

| Interval in minutes | Frequency | Width | Frequency density |
| --- | --- | --- | --- |
| 0 to under 5 | 3 | 5 | 0.6 |
| 5 to under 10 | 4 | 5 | 0.8 |
| 10 to under 20 | 5 | 10 | 0.5 |

Notice that the widest class has the most observations but the smallest density. The middle interval has the greatest concentration per minute of class width. In the wide rectangle, the individual waits are not known to be evenly spread. The rectangle represents their count over a span. Multiply height by width to recover the count, and read the label carefully. If the vertical axis says relative frequency density instead, the area gives a proportion.

## Read shape without overclaiming
Scan from low to high. Ask where most observations lie, whether there are separated concentrations, and whether the values extend farther on one side. A **tail** is a thinner extension of the distribution beyond its main concentration. An isolated bin might represent a rare but valid event or a recording error. Look at the underlying values if you have them before deciding which. A histogram is a prompt for investigation.

Changing bins can smooth away a feature or make a small difference appear large. For a second view try shifting the starting boundary or using another reasonable width. If an apparent gap disappears, report that it depended on the grouping. For direct comparisons choose the same boundaries. When totals differ, draw relative frequency densities with the same scales, and state both valid counts. This compares shape rather than number of observations.

For a small list it may be easier to keep the raw values beside the histogram. A reader can then check that a wide interval contains several distinct waits. An open-ended class has no finite width. If a report only gives “20 or more,” keep that category in a table or recover a documented finite boundary before drawing a density rectangle.

# Exercises
?? A class width is 8 and its frequency is 12. Find the frequency density.
=> 12 ÷ 8 = 1.5 observations per unit of class width.

?? A rectangle has height 0.4 on a frequency-density scale and width 10. Find the count.
=> Area = 0.4 × 10 = 4.

# Practice
Take the grouped data from your previous practice. Draw a histogram for equal classes, then merge two classes and calculate every density. Use rectangle areas to recover the original counts. Say how the visual shape changes.

# Rubric
- My intervals have the correct horizontal widths.
- The unequal-width display uses frequency density and the right axis label.
- I checked the counts by multiplying width by density.

# Summary
- Histograms represent ordered numerical intervals.
- For unequal widths, count is represented by area, and height is frequency divided by width.
- Bin choices affect the apparent shape.

# Check
Q: What appears on a histogram's horizontal axis?
P: Build the rectangles
* Intervals on a numeric measurement scale
- Unordered names of the data categories
- The relative frequency of each observation
= The measurement determines the rectangle positions.

Q: Where do equal-width count rectangles touch?
P: Build the rectangles
* At their shared numeric class boundaries
- At the median value of the entire dataset
- Only when they contain the same frequency
= Adjacent classes meet at their shared endpoint.

Q: A class has frequency zero. What do you draw?
P: Build the rectangles
* A zero-height rectangle over its span
- A gap that removes its interval from the scale
- A rectangle the same height as its neighbour
= Zero counts still correspond to a real interval.

Q: A class has width 4 and frequency 10. Give its frequency density.
P: Use density when widths differ
A: 2.5 | 2.50
= Divide 10 by 4.

Q: On a frequency-density histogram, what gives the count?
P: Use density when widths differ
* Width multiplied by height
- Height divided by the full range
- Width plus the height of the rectangle
= The rectangle's area represents frequency.

Q: Two rectangles have equal areas but different widths. What is equal?
P: Use density when widths differ
* Their class frequencies
- Their vertical densities
- Their class midpoints
= Equal area means equal count.

Q: A width-10 class has count 5. Give its density.
P: Use density when widths differ
A: 0.5 | .5 | 0.50 | 1/2
= Five observations over ten units gives 0.5.

Q: What should two directly compared histograms share?
P: Read shape without overclaiming
* Class boundaries and compatible scales
- Only the colour and the title font
- A different unit for each dataset
= Shared boundaries support direct comparisons.

Q[transfer]: One class is twice as wide as another with the same count. What happens to density?
P: Use density when widths differ
* It is half as high in the wider class
- It is twice as high in the wider class
- It stays equal to the narrower density
= The same area is spread over twice the width.

Q[transfer]: A school report only has an open-ended highest class. What can you safely do?
P: Read shape without overclaiming
* Keep that count in a table and explain the open boundary
- Invent an upper endpoint from the previous class width
- Draw a density bar whose width has no numeric meaning
= The width and density cannot be recovered from an open class.

Q[transfer]: A gap appears with one bin scheme but vanishes with another. What should you report?
P: Read shape without overclaiming
* The apparent gap depends on grouping
- The data changed when the bins changed
- The second chart should be ignored automatically
= The same observations can look different under another grouping.

# Cards
What does area mean on a frequency-density histogram? :: Class frequency.
How do you compute frequency density? :: Class frequency divided by class width.
What remains for a class with frequency zero? :: Its horizontal span, with zero height.

# Further
- OpenStax · Histograms, frequency polygons and time series graphs :: https://openstax.org/books/introductory-statistics-2e/pages/2-2-histograms-frequency-polygons-and-time-series-graphs
