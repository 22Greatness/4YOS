---
id: dd-stem-leaf
pack: Describing Data · Tables and charts
title: Stem-and-leaf plots
minutes: 45
source: Statistics Canada · Statistics: Power from Data
url: https://www150.statcan.gc.ca/n1/edu/power-pouvoir/toc-tdm/5214718-eng.pdf
courses: Describing Data · STA 111
format: 2
teaches: stem-and-leaf; stem-key; reversible-displays
uses: sta-charts; dd-grouped; dd-histograms
---
# Goal
Build a stem-and-leaf plot, read its key and recover every recorded value.

# Why
For a small data set, a stem-and-leaf plot shows the distribution while preserving individual observations. You can check an unusual point without reopening the raw file.

# Warm-up
?? Which digit represents tens in 47?
=> 4.

?? What detail does a grouped frequency table usually discard?
=> The exact values inside each interval.

# Lesson
## Split a recorded value
In a stem-and-leaf plot, part of each value becomes the **stem** and the remaining digit becomes a **leaf**. Use the same split throughout. For whole minutes, let the tens digit be the stem and the ones digit be the leaf. Then 27 minutes becomes stem 2, leaf 7. The **key** shows how to read a pair. Write “2 | 7 means 27 minutes.” A stem and leaf without a key can be ambiguous. The same symbols might mean 2.7 seconds in a different display.

Use these invented journey times, in minutes: 12, 18, 21, 25, 25, 27, 31, 36, 42, 48 and 53. Start with stems 1 through 5, one per line. Read each observation and place its leaf on the right stem. Keep every repetition. Both observations of 25 have the same stem and leaf, so write two leaves of 5. Sorting the leaves within each row helps readers see the smallest and largest values. A finished row for the twenties is “2 | 1 5 5 7”.

Some datasets need more than one digit in the stem. For 124, a stem of 12 and leaf of 4 is possible. For measurements recorded to a tenth, a stem of 12 and leaf of 4 could instead mean 12.4. The key must specify both scale and units. Use a leaf digit of zero when the last place is zero. Omitting zero would remove an actual value.

## Recover values and inspect the shape
Read the stems in order, and the leaves in order within each row. The worked example is:

```text
1 | 2 8
2 | 1 5 5 7
3 | 1 6
4 | 2 8
5 | 3
Key: 2 | 7 means 27 minutes.
```

The number of leaves is 2 + 4 + 2 + 2 + 1, or eleven. That is a useful check against the original record. The shortest recorded journey is 12 minutes and the longest 53. Four trips were at least 20 and below 30 minutes. In the same row, three of those were at least 25, since the leaves are 5, 5 and 7. A grouped table would tell us there were four trips in their twenties without showing those details.

If the range skips a stem, include a blank row where the numeric scale needs it. A plot with times 12, 15, 41 and 42 should show the empty twenties and thirties. Otherwise a reader may think the two concentrations touch. Blank stems mean no included observations there. They do not represent unknown journey times. Record missing values outside the display.

A long row shows more observations in that span. Do not infer that all times in the row are equally likely. Inspect the leaves. Some can repeat while others are absent. A plot of one week shows what was recorded that week, and it takes a sound sampling plan to generalise beyond it.

## Choose a scale that suits the data
If a row is crowded, split each stem into two rows: leaves 0 to 4, then leaves 5 to 9. Label the convention so nobody thinks you repeated data. For the twenties, the first row contains leaf 1 and the second contains 5, 5 and 7. The measurement values have not changed, only the display. Splitting every stem consistently keeps rows comparable.

You can also make a back-to-back display for two small groups by placing one group's leaves left of the stems and the other group's leaves right of them. Both sides must share the same units and key. Count the records in each group before comparing row lengths. A group with twice as many records may produce longer rows even when its distribution has much the same shape. For a size-independent comparison use proportions or separate histograms on a common scale.

With thousands of rows a stem plot becomes hard to read, and with many digits you may have to round before drawing it. State any rounding because you can then recover only the rounded values. Where precision is important, keep the original table and use a plot for the broad pattern. Choose the least complicated display that still answers the question.

# Exercises
?? With key 3 | 8 = 38 minutes, what does 4 | 0 2 2 show?
=> 40, 42 and 42 minutes.

?? What if the original list contains 25 twice?
=> Write leaf 5 twice on stem 2.

# Practice
Choose ten non-sensitive whole-number observations. Draw a stem plot, add a key, and read it back into a sorted list. Match that list against the originals, including repeats and zero leaves.

# Rubric
- My key states the value and unit represented by a stem and leaf.
- Reading the plot back recovers every valid observation at the stated precision.

# Summary
- The same key applies throughout.
- Each observation contributes a leaf, including duplicates.
- A stem plot can preserve more detail than grouped counts.

# Check
Q: With key 2 vertical bar 7 = 27 minutes, what does stem 4 leaf 2 mean?
P: Split a recorded value
A: 42 | 42 minutes
= The stem gives tens and the leaf gives ones.

Q: Which stem and leaf represent 40 minutes under that key?
P: Split a recorded value
* Stem 4 and leaf 0
- Stem 0 and leaf 4
- Stem 4 with no leaf
= The zero is a recorded ones digit.

Q: Why include a key?
P: Split a recorded value
* To show the scale and units of a pair
- To show the total of all numeric values
- To mark which data point was recorded first
= A pair alone might stand for 27 or 2.7.

Q: How many values does the row with leaves 1 5 5 7 represent?
P: Recover values and inspect the shape
A: 4 | four
= Both copies of leaf 5 count.

Q: What does a blank stem between occupied rows indicate?
P: Recover values and inspect the shape
* No observations in that span
- One unknown value in that span
- An omitted stem of unknown size
= A blank row maintains the scale.

Q: Which has recoverable individual values at the stated precision?
P: Recover values and inspect the shape
* A stem-and-leaf plot with a key
- A histogram of broad grouped classes
- A table showing only the total frequency
= Reading leaves recovers the values.

Q: A stem is crowded. What is a consistent split?
P: Choose a scale that suits the data
* First leaves 0–4, then leaves 5–9
- First duplicates, then single occurrences
- First odd leaves, then all observed leaves
= The two ranges partition the possible digits.

Q: Why use the same key for two groups?
P: Choose a scale that suits the data
* So a given stem and leaf mean the same value
- So the groups must have the same sample size
- So every row will have the same number of leaves
= Comparisons require common units and scaling.

Q[transfer]: A plot of rainfall uses key 1 vertical bar 2 = 1.2 cm. What is 3 vertical bar 4?
P: Split a recorded value
A: 3.4 | 3.4 cm | 3.40
= The leaf represents tenths of a centimetre.

Q[transfer]: You read back 9 leaves from 10 valid records. What should you do?
P: Recover values and inspect the shape
* Retally and check that repeats were retained
- Delete the record that does not fit the plot
- Add a blank leaf beside the smallest stem
= The plot must preserve every valid record.

Q[transfer]: A plot was built after rounding to whole minutes. Can it recover 12.3 minutes exactly?
P: Choose a scale that suits the data
* No, it can recover only the displayed precision
- Yes, count the repeated leaves in the row
- Yes, as long as a key was included
= Rounding loses the fractional information.

# Cards
What does the key tell you? :: The numeric value and unit represented by a stem and leaf.
How do you show duplicates? :: Write the same leaf once for each occurrence.
What does an empty stem mean? :: No included observations in that span.

# Further
- Statistics Canada · Statistics: Power from Data :: https://www150.statcan.gc.ca/n1/edu/power-pouvoir/toc-tdm/5214718-eng.pdf
