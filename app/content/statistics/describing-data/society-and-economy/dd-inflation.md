---
id: dd-inflation
pack: Describing Data · Society and economy
title: Price indices and inflation
minutes: 45
source: IMF · Consumer Price Index Manual and data
url: https://data.imf.org/datasets/IMF.STA%3ACPI
courses: Describing Data · STA 111
format: 2
teaches: cpi-interpretation; year-on-year; month-on-month; disinflation; price-series-comparability
uses: dd-indices; dd-official; counts
---
# Goal
Calculate month-on-month and year-on-year inflation, and explain why slower inflation is compatible with rising prices.

# Why
The price level, its rate of change and the change in that rate answer different questions. Confusing them can turn a correct release into a misleading headline.

# Warm-up
?? How do you compare index 120 with index 100?
=> The index is 20% above 100.

?? How are release date and reference period different?
=> The first is when publication happened; the second is the period the value describes.

# Lesson
## Use the index for the right comparison
A consumer price index, or CPI, summarises price movements for a defined set of household consumption goods and services. Items do not generally have equal importance. Weights reflect the spending patterns and scope used in the index. The national index is not the exact cost change of your own purchases. A household that spends more on items with fast-rising prices can experience a different change.

Month-on-month inflation compares this month's index to the previous month's index. Year-on-year inflation compares this month's index to the same month a year earlier. For an invented series, last January was 100, last December was 120, and this January is 126. This January's month-on-month change is (126−120)/120 × 100 = 5%. Its year-on-year change is (126−100)/100 × 100 = 26%. The same current price index gives two different rates because their comparison points differ.

Use comparable figures from the same index series for both endpoints. Do not subtract a monthly rate from an annual rate and call the result the month's price change. To calculate cumulative change over consecutive months, multiply their growth factors. A 10% increase followed by a 10% decrease produces $1.10\times0.90=0.99$, a net fall of 1%. The second change applies to a new base.

## Separate price level and rate
Suppose a second invented series begins at 100, rises to 120 in one year and to 132 the next year. The first annual increase is 20%. The second is 10%. Prices represented by the index still rose in the second year, but they rose more slowly. That slowdown is **disinflation**. A fall in the price level over a stated comparison period is **deflation** for that comparison. A positive annual rate and a negative monthly rate can occur together if prices recently fell but remain above the same month last year.

The annual rate also depends on the earlier comparison point. When a high earlier index becomes the denominator, a later annual increase may look smaller even if the current month continues to increase. Inspect the level series and both dates before explaining a change in the annual rate. A rate on its own does not tell you which categories drove it.

If one annual inflation rate changes from 20% to 10%, it falls by ten percentage points. It falls by 50% relative to the earlier rate. Neither sentence means prices fell by half. Say whether you are comparing rates, price indices or actual prices.

## Read a Nigerian release
The National Bureau of Statistics CPI catalogue provides reports and materials on rebasing. A CBN publication on its February 2025 meeting reports 24.48% as the January 2025 headline year-on-year figure after the rebasing then reported. This is a historical published figure, not a claim about the latest revision or today's inflation. To reproduce an analysis, record which release you used, its reference periods and the particular series, such as headline or food.

When methods, reference periods or weights change, check whether the producer supplies a comparable historical series. A sudden numerical difference across two incompatible releases cannot safely be interpreted as a change in household prices of the same size. Distinguish re-referencing, which changes the index scale, from methodological revisions that can change calculated movements. Read the producer's footnotes before drawing a line across a break.

For a trustworthy report, record both endpoints and the denominator calculation. Quote the series name, geography, month, year and release. State whether the result is monthly or annual. If the question is what happened to a particular household's costs, collect its own comparable quantities and prices instead of treating the aggregate CPI as its personal bill.

# Exercises
?? The index is 120 last month and 123 this month. Find the monthly inflation rate.
=> 3/120 × 100 = 2.5%.

?? A positive annual rate falls from 18% to 12%. Did the annual price level fall?
=> No. The second level is still 12% above its year-earlier comparison. The reported annual rate fell by six points.

# Practice
Find one public Nigerian CPI release. Record two comparable index values or the reported monthly and annual rates. Name each comparison period. If you have the comparable index levels, reproduce one rate and compare it with the reported rate after rounding.

# Rubric
- I named the series and release and kept like endpoints together.
- I interpreted a slower rate separately from a falling index.

# Summary
- CPI describes price movements for a defined basket and scope.
- Monthly and annual rates use different earlier periods.
- Positive inflation can slow while the price level keeps rising.

# Check
Q: What does a year-on-year CPI change compare?
P: Use the index for the right comparison
* This month with the same month last year
- This month with the previous calendar month
- This month with next year's same month
= The comparison is twelve months apart.

Q: The index is 120 last month and 126 now. Find monthly inflation.
P: Use the index for the right comparison
A: 5 | 5% | 5 percent
= 6/120 × 100 = 5%.

Q: The index is 100 last January and 126 this January. Find annual inflation.
P: Use the index for the right comparison
A: 26 | 26% | 26 percent
= 26/100 × 100 = 26%.

Q: The annual rate slows from 20% to 10%. What happens relative to the latter year's base?
P: Separate price level and rate
* The price level is 10% above its earlier comparison
- The price level falls by ten percentage points
- The price level is the same in both years
= A positive rate still denotes an increase over its base.

Q: How many percentage points did the rate fall from 20% to 10%?
P: Separate price level and rate
A: 10 | 10 points | 10 percentage points
= Subtract the rates to get a point difference.

Q: Can the monthly rate be negative and the annual rate positive?
P: Separate price level and rate
* Yes, the comparisons start at different dates
- No, both rates must use the same denominator
- No, prices can move in only one direction
= A recent fall can coexist with an annual rise.

Q: Which details make a CPI figure traceable?
P: Read a Nigerian release
* Series, place, reference period and release
- Only the publisher's name and chart colour
- Only the latest headline without its dates
= Metadata identify which figure was used.

Q: What should you check before combining old and rebased index data?
P: Read a Nigerian release
* A documented comparable series or link
- Whether the newer index is numerically larger
- Whether both charts use the same label font
= Changes in method can make endpoints incompatible.

Q[transfer]: An index rises 10% then falls 10%. What is the net movement?
P: Use the index for the right comparison
* A fall of 1% from the starting level
- No change from the starting level
- An increase of 1% above the starting level
= The factors multiply to 0.99.

Q[transfer]: Your personal groceries rose faster than headline CPI. What is a plausible reason?
P: Read a Nigerian release
* Your spending weights and prices differ from the index
- The national headline index must always equal your receipt
- A weighted index cannot include grocery prices
= The household can have a different spending mix.

Q[transfer]: A caption says “prices fell” because annual inflation was lower but positive. What should it say?
P: Separate price level and rate
* The annual pace slowed, with the level still above its year-earlier comparison
- The index fell by the same number of percentage points
- Prices returned to their original base period exactly
= A lower positive rate is still a positive change.

# Cards
What is the annual comparison month? :: The same month one year earlier.
What is disinflation? :: A slowing inflation rate while the price level can still rise.
How do you report a change from 20% to 10% inflation? :: A fall of ten percentage points in the rate.

# Further
- IMF · Consumer Price Index Manual and data :: https://data.imf.org/datasets/IMF.STA%3ACPI
- National Bureau of Statistics · Consumer Price Index and Inflation catalogue :: https://microdata.nigerianstat.gov.ng/index.php/catalog/154
- Central Bank of Nigeria · February 2025 MPC publication :: https://www.cbn.gov.ng/Out/2025/CCD/PERSONAL%20STATEMENTS%20OF%20MPC%20MEMBERS%20FEBRUARY%202025%20MEETING%20AND%20COMMUNIQUE.pdf
