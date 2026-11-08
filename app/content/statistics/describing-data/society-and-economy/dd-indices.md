---
id: dd-indices
pack: Describing Data · Society and economy
title: Index numbers
minutes: 45
source: IMF · Consumer Price Index Manual and data
url: https://data.imf.org/datasets/IMF.STA%3ACPI
courses: Describing Data · STA 111
format: 2
teaches: index-base; price-relative; fixed-basket-index; rebasing-index
uses: counts; dd-official; na-percentages
---
# Goal
Build a base-100 index, combine items with a fixed basket, and compare two periods without confusing index points and percent change.

# Why
An index lets you compare a quantity across periods even when the raw units or scales differ. Its meaning depends on the base and the construction.

# Warm-up
?? How do you find percentage change?
=> Subtract the old value from the new, divide by the old value and multiply by 100.

?? Why record the reference period?
=> It tells readers which time the number describes.

# Lesson
## Start from a base of 100
An index expresses a value relative to a reference. To make a base-100 index for a single positive series, divide each value by the base-period value and multiply by 100. The base period therefore has index 100. The index is unitless, but its label should say which period equals 100. A value of 115 means the series is 15% above that base. It does not mean the original quantity is 115 units.

Consider invented monthly transport costs of ₦400, ₦460 and ₦506 for an identical journey. With the first month as the base, the indices are 100, 115 and 126.5. The difference between the second and third is 11.5 index points. The percentage change from the second is 11.5/115 × 100 = 10%, matching the change from ₦460 to ₦506. The difference from 100 is a percentage relative to the base only. To compare two non-base periods, divide by the earlier index.

A base value of zero cannot be used in this ratio. Choose a meaningful positive reference and disclose it. A very unusual base, such as a short shutdown, can make later index values hard to interpret. Use the same index method across periods and keep the original values available.

## Build a fixed basket
To combine prices of unlike items, define a basket with fixed quantities. Prices can be in naira per kilogram and naira per trip, but price times quantity gives a common unit of naira. In an invented example, the basket holds 2 kg of grain and 3 trips. At base prices of ₦200 per kg and ₦100 per trip, the basket costs ₦400 + ₦300 = ₦700. At new prices of ₦250 per kg and ₦110 per trip it costs ₦500 + ₦330 = ₦830. The price index is 830/700 × 100, or about 118.57.

The grain price rose by 25% and trip price rose by 10%. Their simple average is 17.5%. It differs from the basket's 18.57% increase because the two items did not account for equal shares of base spending. Grain accounted for 400/700 and trips for 300/700. Weighting the individual price relatives, 125 and 110, by those base spending shares gives the same index as comparing the total basket costs.

Keep quantities fixed in this exercise. If the new basket contained fewer trips, the total would change partly because the quantities changed. You would no longer be comparing the cost of the same basket. Real indices may update weights or link different baskets. A simple fixed-basket calculation is a transparent starting point, not a complete description of every official index.

## Re-express a series safely
Sometimes a chart needs all series to start at 100 in the same period. You can re-reference an existing comparable series by dividing each old index value by the old value in the new reference period and multiplying by 100. In the transport example, taking month two as the new base gives about 86.96, 100 and 110. The percentage change between any two periods is preserved, apart from rounding. Absolute index point differences change because the scale changed.

Changing the reference value alone differs from changing the source basket, weights, coverage or method. When an official publisher says an index was rebased, read what changed. Do not attach a new base label and assume that old and new releases are automatically comparable. A revised or linked series from the producer may be needed.

A table of indices should name the original measure, the reference period, the comparison periods and the method. Keep one example calculation beside it. That is enough for a reader to distinguish “prices were 18.57% above the base” from “prices rose by 18.57% in the most recent month,” which can be very different statements.

# Exercises
?? A cost rises from ₦50 in the base period to ₦65. What is the index?
=> 65/50 × 100 = 130.

?? An index rises from 125 to 150. What is the percentage change?
=> (150−125)/125 × 100 = 20%, while the point change is 25.

# Practice
Select a public series with a clearly stated unit, or use receipts for the same item and quantity. Set one period to 100. Calculate at least three indices and two changes between periods. Write the base period and say whether you re-referenced a series or changed the data method.

# Rubric
- I reported the base and kept the comparable measure fixed.
- I used the earlier index as the denominator for a period-to-period change.

# Summary
- An index of 100 denotes its reference value.
- A fixed basket weights price movements by base spending shares.
- Index points and percentage changes differ outside the base.

# Check
Q: A cost is 40 at base and 50 now. Find the base-100 index.
P: Start from a base of 100
A: 125 | 125.0
= 50/40 × 100 = 125.

Q: What does index 90 mean?
P: Start from a base of 100
* The value is 10% below the base value
- The value is 90 units above the base
- The previous period fell by 90%
= Compare it with base 100.

Q: Can a zero base value be used in the simple ratio?
P: Start from a base of 100
* No, because it would divide by zero
- Yes, every index would then be zero
- Yes, every index would then be 100
= A nonzero reference is required.

Q: What stays fixed in the lesson's basket comparison?
P: Build a fixed basket
* The quantities of the items included
- The current prices of all the items
- The total costs in both periods
= Fixed quantities isolate price changes for the basket.

Q: Base basket cost 200 and new cost 240. What is the price index?
P: Build a fixed basket
A: 120 | 120.0
= 240/200 × 100 = 120.

Q: Why can the basket change differ from the unweighted average of price changes?
P: Build a fixed basket
* Items can account for different spending shares
- All price changes must be measured in kilograms
- The index is measured in the largest item's units
= The total reflects base spending weights.

Q: An index moves from 125 to 150. What is the change in index points?
P: Re-express a series safely
A: 25 | 25 points
= Subtract 125 from 150.

Q: An index moves from 125 to 150. What is the relative percentage increase?
P: Re-express a series safely
A: 20 | 20% | 20 percent
= 25/125 = 0.20.

Q[transfer]: A publisher changes the basket as well as the base label. What should you check?
P: Re-express a series safely
* Whether it provides a comparable linked or revised series
- Whether changing the label alone makes all values comparable
- Whether both charts have the same vertical title
= A changed method can break comparability.

Q[transfer]: A new basket has one fewer trip than the old basket. Can the cost ratio isolate price movement alone?
P: Build a fixed basket
* No, it also reflects the changed quantity
- Yes, if trip and grain prices both increased
- Yes, because both totals are expressed in naira
= Comparing the same basket holds quantities fixed.

Q[transfer]: You re-reference a comparable series to a later base. What stays the same apart from rounding?
P: Re-express a series safely
* The percentage change between two fixed periods
- All numerical index point differences
- The index value assigned to every old period
= Dividing both periods by the same factor preserves their ratio.

# Cards
What is a base-100 index? :: Current value divided by the reference value, times 100.
What does index 118 mean? :: 18% above the base, under the same method.
What does a fixed basket keep constant? :: The quantities of the included items.

# Further
- IMF · Consumer Price Index Manual and data :: https://data.imf.org/datasets/IMF.STA%3ACPI
