---
id: dd-scatter
pack: Describing Data · Two variables
title: Scatter plots
minutes: 45
source: OpenStax · The regression equation
url: https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation
courses: Describing Data · STA 111
format: 2
teaches: paired-observations; scatter-plot; direction-form-strength; paired-missingness
uses: sta-data; dd-chart-audit; dd-boxplots
---
# Goal
Plot paired numeric observations and describe direction, form, spread and unusual points.

# Why
Averages of two columns cannot tell you how their values go together. A scatter plot preserves the pairing so you can see a relationship or its absence.

# Warm-up
?? What makes a variable numerical?
=> Its values measure or count a quantity.

?? Why do you investigate a point before deleting it?
=> It may represent a real unusual event rather than an error.

# Lesson
## Keep each pair together
A scatter plot uses two numeric measurements from the same observation. If each row is a journey, its distance and its duration form a pair. Put the first quantity on the horizontal x-axis and the second on the vertical y-axis. For a journey of 3 kilometres that took 19 minutes, go across to 3, then up to 19, and mark one point. Label both axes with units and say what a point represents.

Use six invented journeys. The pairs of distance in kilometres and duration in minutes are (1, 8), (2, 13), (3, 19), (4, 19), (5, 28) and (6, 33). Mark all six without connecting them. Two points have a duration of 19 but different distances. If both values were identical for two journeys, the two dots would overlap. A table, a count label, or slightly shifted dots clearly marked as such can help reveal duplicates.

Never sort the two columns separately. Doing so pairs the smallest distance with the smallest duration even if they came from different journeys. That can create a strong pattern artificially. You may sort entire rows by distance, because every pair stays together. If a row lacks either value, it cannot make an ordinary scatter point. Record the number of incomplete pairs and check whether they are concentrated in a meaningful group.

## Describe what you see
Start with direction. When larger x values tend to occur with larger y values, the association is positive. If y tends to fall as x rises, it is negative. If there is no clear movement, say that rather than forcing a direction. Direction is not the same as strength. A positive pattern can be tight or widely scattered.

Next describe form. These journey points have a roughly straight upward pattern, although they are not exactly on one line. A curve is another form. A relationship can rise then fall, giving no simple overall upward or downward trend while still showing a strong pattern. Separate clusters can also appear if the observations come from different routes or modes of travel. Check group labels before describing all journeys as one population.

Finally look for unusual points. If another journey took 55 minutes at 2 kilometres, plot it and examine the record. Congestion, a long stop or a recording error are all plausible. The point has a typical distance but an unusual time for that distance. A scatter plot shows unusual combinations, even if neither value looks extreme alone in the original data. Report any correction with evidence.

## Pick the display for the question
A scatter plot shows pairs without implying a sequence. If the x-axis is time and your question concerns change across dates, a time series line can be appropriate. For example, plotting a daily reading against its date and connecting successive days describes an ordered history. Connecting unrelated journeys in collection order would draw arbitrary lines across the plot. Keep the display tied to the question.

Read the axes carefully. Distances can be kilometres or metres, and duration can be minutes or seconds. Different axis ranges can make the same relationship appear steep or flat. Describe numerical changes in their units rather than by the angle of a line on the screen. A scatter plot can use nonzero axis limits when clearly labelled, since points show positions rather than lengths measured from a baseline.

Write a cautious caption: “In these six recorded journeys, longer distances generally went with longer durations, with some variation at the same or nearby distances.” State whether examples are invented or from a named source. If someone wants to know what happens on a different route or under different traffic conditions, get comparable data. A pattern in these pairs does not guarantee the same pattern for a new group.

```chart
{"kind":"dot","title":"Journey duration and distance","alt":"Six points generally rise from 8 minutes at one kilometre to 33 minutes at six kilometres","note":"Invented practice data","xLabel":"Distance in kilometres","yLabel":"Duration in minutes","x":"km","y":"minutes","data":[{"km":1,"minutes":8},{"km":2,"minutes":13},{"km":3,"minutes":19},{"km":4,"minutes":19},{"km":5,"minutes":28},{"km":6,"minutes":33}]}
```

# Exercises
?? Where does (4,19) go?
=> At 4 kilometres on the x-axis and 19 minutes on the y-axis.

?? What happens if a journey has distance but no time?
=> It cannot be plotted as a complete pair; report the missing value.

# Practice
Choose six or more paired numerical records with a clear row identity. Plot them by hand or using a chart tool. Describe direction, form and spread in one paragraph, and note any unusual pairs and missing records.

# Rubric
- Every point joins the two measurements from the same row.
- Axes carry units and my description distinguishes direction from form.
- I did not infer cause from the picture.

# Summary
- A scatter point represents a complete pair.
- Describe direction, form, spread and unusual points.
- Keep pairs together and label missing observations.

# Check
Q: What goes on a scatter plot for one complete row?
P: Keep each pair together
* One point at that row's two coordinates
- A separate bar for each of its values
- A line joining each value to the origin
= The pair supplies x and y.

Q: Where is (3,19) if distance is x?
P: Keep each pair together
* Three along x and nineteen along y
- Nineteen along x and three along y
- Twenty-two on both coordinate scales
= The first coordinate is x.

Q: What happens when columns are independently sorted?
P: Keep each pair together
* The original pairing is lost
- Each observation becomes more accurate
- Only the units of measurement change
= Separate sorting can manufacture association.

Q: What does an upward pattern usually indicate?
P: Describe what you see
* A positive association between x and y
- A negative association between x and y
- Identical values for all of the points
= Larger x tends to pair with larger y.

Q: Which feature describes form?
P: Describe what you see
* The points roughly follow a curve
- The x-axis is measured in kilometres
- The chart was made from ten rows
= Form describes the shape of the relationship.

Q: Two observations share both coordinates. What might happen?
P: Describe what you see
* Their dots overlap and look like one
- Their x coordinates cancel each other
- The plot automatically adds their y values
= A count or label can reveal overlap.

Q: Why usually avoid connecting unrelated journeys?
P: Pick the display for the question
* The connection would imply an order without meaning
- Straight lines cannot appear on any numerical chart
- Each journey must be plotted on different axes
= A scatter plot shows pairs rather than a timeline.

Q: What should a caption include?
P: Pick the display for the question
* Units, the observed pattern and the scope
- Only a claim about why the result happened
- A guarantee about the next unobserved journey
= A caption describes evidence and its scope.

Q[transfer]: A point has a normal distance but an unusually long time. What should you do?
P: Describe what you see
* Inspect the paired record and its context
- Delete it because it breaks the expected pattern
- Treat it as the only representative journey
= An unusual pair can be genuine.

Q[transfer]: A dataset lacks duration for several trips. How should you handle those rows in the chart?
P: Keep each pair together
* Plot complete pairs and report incomplete counts
- Give every missing duration a value of zero
- Combine the two columns into one long list
= A missing duration cannot form a point.

Q[transfer]: Two graphs use different axis scales and slopes look different. What supports a fair comparison?
P: Pick the display for the question
* Describe changes in their common physical units
- Compare the screen angle of the pattern only
- Ignore scale labels if both show upward trends
= Visual steepness depends on the selected scales.

# Cards
What does one scatter point represent? :: Two numeric values observed on the same unit.
What is a positive association? :: Larger values of one variable tend to go with larger values of the other.
Why not sort columns independently? :: It destroys the original pairings.

# Further
- OpenStax · The regression equation :: https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation
