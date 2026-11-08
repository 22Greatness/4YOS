---
id: dd-audit-release
pack: Describing Data · Society and economy
title: Reading official statistics critically
minutes: 45
source: Statistics Canada · Data Quality Guidelines
url: https://www150.statcan.gc.ca/n1/pub/12-539-x/4147797-eng.htm
courses: Describing Data · STA 111
format: 2
teaches: official-statistics-audit; comparable-series; sensitivity-analysis; reproducible-report
uses: dd-official; dd-chart-audit; dd-causation; dd-inflation; dd-vital-rates
---
# Goal
Reconstruct an official statistical claim from a source, test comparability, and write a short reproducible report.

# Why
A public figure can be genuine and still fail to answer the question attached to it. An audit records what the evidence supports and what further information would be needed.

# Warm-up
?? What are metadata?
=> Details such as the population, unit, period, producer and release method that explain what a value means.

?? Can a difference between point estimates alone tell you why it happened?
=> No. Study design and evidence about alternative explanations are needed.

# Lesson
## Translate the headline into a testable claim
Start with a complete sentence. Suppose a post says “the rate rose sharply.” Ask: which rate, which population, which period, and compared with what? Rewrite it as a statement you can test: “In the stated national release, the estimated rate in year B was higher than in year A by this amount on this scale.” The rewrite separates what you must look up from adjectives such as “sharply,” which need context.

Find the original release and its table or indicator. Save a copy of the public extract or record a link and download date. Add the publisher, source organisation if different, indicator code, geography, reference periods, units and eligible denominator. Check whether the values are direct counts, survey estimates or modelled estimates. A release can contain more than one kind of number. An official publisher is a reason to check the documentation carefully, rather than a substitute for doing so.

For example, the World Bank's Nigeria infant mortality page identifies a national indicator per 1,000 live births and names the UN inter-agency source. Ten annual values are ten estimates for ten years, not ten observations on individual babies. A claim about how many babies were observed in that dataset would use the wrong unit of analysis. First decide what a row means.

## Check comparability and arithmetic
Put the two values beside each other with their units. Convert units only when the underlying measure is the same. A difference of 0.6 per thousand is 0.06 percentage points when both values are expressed per hundred. It does not become 0.6 percentage points merely because a headline calls it a rate. To report relative change, divide the difference by the earlier value. With the dated 2020 and 2023 values in the prior lesson, the change is about 0.86% relative to 69.5. This is separate from the absolute change of 0.6 per 1,000.

Compare the definitions and coverage. The Nigerian CPI catalogue illustrates why metadata matter: reports include discussion of rebasing. If weights or series construction changed, use an explicitly comparable release. If you cannot confirm a link, show the change as a break or omit the cross-break calculation. State what you did in the methods note. A spreadsheet cannot repair inconsistent meanings.

Look for missing dates, revisions, rounding and uncertainty. A small numerical change may not be precise enough to interpret strongly. If the source publishes uncertainty, report it using the producer's guidance. If it does not, state that you have point estimates only. Do not invent an interval from the spread of the ten published annual values. That spread describes variation between estimates over time, not uncertainty of each estimate.

## Write so someone can repeat it
Use a short report structure. Begin with a question and answer tied to its population and period. Include a compact source table with raw values or a pointer to the archived extract. Show the calculation steps and labels. Add one chart that matches the measure, with dates in order and scale clearly visible. Keep missing observations visible and explain any transformation.

Check sensitivity by changing one reasonable decision at a time. If your conclusion depends on choosing a particular start year, compare with a nearby year or show the full sequence. If one valid observation dominates a mean, add a median or plot rather than quietly removing it. State what changed and why. Choose the conclusion you can support across the checks, or explain that it depends on the specified decision.

Finish by identifying a limit and a useful follow-up. For a national time series, an aggregate may hide state differences, and a shift over time does not identify the cause. A follow-up might request comparable state series or estimates with uncertainty. Write the strongest accurate sentence you can, leaving a reader with enough detail to reproduce it from the same source.

# Exercises
?? A country-level series has ten yearly values. What does n = 10 describe?
=> Ten years represented in that extract, not the number of people in the country or the size of a survey.

?? You cannot confirm comparability across a method change. How should the chart show it?
=> Mark a break, use separate series, or find a documented comparable revision before joining them.

# Practice
Audit one statistical claim using a public Nigerian source. Save the exact values, check the denominator and release version, and reproduce the comparison. Redraw one chart and test a second reasonable start period or summary. Write the result and a limitation.

# Rubric
- Another reader can reproduce my numbers from the named release.
- I recorded at least one comparability or sensitivity check.
- My conclusion distinguishes data, uncertainty and interpretation.

# Summary
- Make the headline precise enough to test.
- Read the source definitions before comparing values.
- Report the calculation, sensitivity and limits alongside the result.

# Check
Q: What should you establish before checking whether a rate rose?
P: Translate the headline into a testable claim
* Its measure, population, periods and comparison
- The typeface and colour of the release
- The most dramatic number on the chart
= The claim needs a defined outcome and reference.

Q: What is one row of a national annual series?
P: Translate the headline into a testable claim
* One year's value for the defined geography
- One individual person observed by the author
- One representative household from each district
= The row unit follows the source table.

Q: What details make a revised figure traceable?
P: Translate the headline into a testable claim
* Indicator, geography, reference period and release version
- Only the date a social media post was shared
- Only the rounded percentage in a headline
= The source and version identify the value.

Q: An increase is 0.6 per 1,000. What is it in percentage points?
P: Check comparability and arithmetic
A: 0.06 | 0.06 points | 0.06 percentage points
= Dividing the per-thousand scale by ten gives per hundred.

Q: What can the spread of annual point estimates describe?
P: Check comparability and arithmetic
* Variation between those annual estimates
- Each year's uncertainty interval by itself
- The exact number of events in each year
= Spread across years is different from uncertainty within one estimate.

Q: A method changes and you find no comparable series. What is defensible?
P: Check comparability and arithmetic
* Show the break and qualify or omit the comparison
- Join both series and assume the change is real
- Round both values until their difference disappears
= A definition change can alter the numbers.

Q: What is a sensitivity check for a trend report?
P: Write so someone can repeat it
* Repeat the comparison using a reasonable nearby start period
- Replace a missing year with the desired conclusion
- Remove every point that weakens the reported trend
= Changing one reasonable decision tests dependence on it.

Q: What should a reader be able to do with your methods note?
P: Write so someone can repeat it
* Find the same source values and repeat your steps
- Guess how an unlabelled value was measured
- Infer the policy cause from the chart design
= The report needs reproducible steps.

Q[transfer]: You discover that a figure uses live births and another uses all residents. What should you do?
P: Check comparability and arithmetic
* Treat them as different measures and clarify the comparison
- Multiply both rates by ten and treat them as equivalent
- Choose the smaller rate because it is more conservative
= Different denominators are a difference in meaning.

Q[transfer]: An apparent rise exists only when one unusually low start year is selected. What should you report?
P: Write so someone can repeat it
* Show that the result depends on the starting year
- Keep only that year because it produces a clearer headline
- Declare the entire source unreliable without checking it
= Make the sensitivity visible.

Q[transfer]: A national estimate changes after a programme starts. What evidence is missing from the timeline alone?
P: Translate the headline into a testable claim
* Evidence separating the programme from other changes
- The ability to label the year on the x-axis
- The units for reading a descriptive difference
= Timing does not isolate the cause.

# Cards
What is a reproducible comparison? :: A reader can recover the same values and apply the stated calculation.
How do you handle an unconfirmed method break? :: Mark it or keep the series separate until comparability is verified.
What does sensitivity analysis show? :: How a result changes under another reasonable choice.

# Further
- Statistics Canada · Data Quality Guidelines :: https://www150.statcan.gc.ca/n1/pub/12-539-x/4147797-eng.htm
