---
id: dd-two-way
pack: Describing Data · Two variables
title: Two-way tables
minutes: 45
source: OpenStax · The regression equation
url: https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation
courses: Describing Data · STA 111
format: 2
teaches: two-way-frequency; joint-and-marginal-counts; conditional-proportions
uses: counts; sta-charts; dd-collect
---
# Goal
Build a two-way frequency table and choose the denominator that matches a comparison.

# Why
An overall percentage can conceal different group sizes and patterns. A two-way table shows which observations overlap and which group a percentage describes.

# Warm-up
?? What does the denominator of a proportion describe?
=> The eligible group for the calculation.

?? Why keep missing values separate?
=> They are not measured zeros or automatically a valid category.

# Lesson
## Give each record a row and a column
A two-way table counts observations by two categorical variables at once. One variable determines the table row and another determines the column. For a question about service delays, use one visit as the observation unit. Record its booking channel and whether it began late under a fixed definition. A single visit has one channel and one delay status. Put one tally in the cell where those categories meet. If the categories overlap or a visit can appear more than once, clarify your unit and coding rule first.

Take an invented clinic log of 100 visits. Sixty were booked online and forty by phone. Twelve online visits were late and eight phone visits were late. Complete the table by subtraction: 48 online and 32 phone visits were on time.

| Booking channel | Late | On time | Total |
| --- | --- | --- | --- |
| Online | 12 | 48 | 60 |
| Phone | 8 | 32 | 40 |
| Total | 20 | 80 | 100 |

An interior value is a joint count, because it requires both properties. The row and column totals are marginal counts. You can check the grand total both ways: row totals 60 + 40 and column totals 20 + 80 each give 100. A missing booking channel is not the same as phone or online. Record exclusions and report how many visits had both variables observed.

## Answer the question's denominator
Start a conditional question by circling the group named after “among” or “of.” Among online bookings, the late share is 12 divided by 60, or 20%. Among phone bookings, it is 8 divided by 40, also 20%. The raw count 12 is larger than 8, but the shares are equal. That is because the online group is larger. This table describes the recorded visits. It does not prove that all future visits will have equal chances.

The joint proportion of online and late among all visits is 12 divided by 100, or 12%. The proportion booked online among late visits is 12 divided by 20, or 60%. The same interior count appears in all three calculations: 12/60, 12/100 and 12/20. The denominator changes because the question changes. Keep the comparison's wording beside each number.

When comparing late shares by booking channel, calculate within rows. When comparing the channel mix among late and on-time visits, calculate within columns. Either analysis is legitimate, but switching midway mixes questions. Each full row of row percentages sums to 100% apart from rounding. The same holds for column percentages computed within a column. If a row has zero eligible visits, its share is undefined and should be marked that way.

## Compare before pooling
Suppose the clinic adds another site with different volumes and rules. First build a table for each site. If one site is busier or has a different mix of bookings, combining the counts may change the apparent pattern. Check that “late” means the same thing at both sites. Then compare within each site as well as overall. You can pool counts only when the records refer to compatible groups, periods and units. Do not average two percentages without considering their denominators.

A two-way table does not automatically establish cause. Even if online bookings had a lower late share, online and phone patients could have booked different hours or services. A second table by hour or service might reveal why the aggregate differs. Describe the association, then identify what further evidence is needed.

To communicate results, write one sentence with the numerator and denominator for both groups: “12 of 60 online visits and 8 of 40 phone visits were late, or 20% in each group.” A reader can recompute the numbers. Include the date and rule that define late, and say if missing channels were excluded. The small amount of extra context is part of the result.

# Exercises
?? What share of all visits were booked online and late?
=> 12/100 = 12%.

?? What share of late visits were phone bookings?
=> 8/20 = 40%.

# Practice
Make a two-way table from an anonymous public cross-tabulation or your own non-sensitive records. Check both margins. Calculate one joint share and two within-group shares, and state exactly which question each answers.

# Rubric
- My margins agree with the total of complete records.
- My percentages name their denominators.
- My interpretation describes an association without implying cause.

# Summary
- Each valid record contributes one cell count.
- Marginal totals add rows or columns.
- The question decides whether to use a row, column or grand total.

# Check
Q: What does an interior cell count?
P: Give each record a row and a column
* Records in both its row and column categories
- All records with its row label alone
- All records in the entire table
= A cell is an intersection.

Q: What is a marginal count?
P: Give each record a row and a column
* A row or column total
- A percentage inside one cell
- A chart height chosen for presentation
= Margins sum across the other variable.

Q: If row totals are 18 and 22, what is the grand total?
P: Give each record a row and a column
A: 40 | forty
= Add the row totals.

Q: Six of 30 online visits are late. What is the within-row percentage?
P: Answer the question's denominator
A: 20 | 20% | 20 percent
= 6 ÷ 30 = 0.2.

Q: Six online visits are late, of 10 total late visits. What percentage of late visits is online?
P: Answer the question's denominator
A: 60 | 60% | 60 percent
= The denominator is 10 late visits.

Q: If 12 visits are both online and late out of 100 total, what is the joint percentage?
P: Answer the question's denominator
A: 12 | 12% | 12 percent
= Use the grand total of 100.

Q: A row has no eligible visits. What is its late proportion?
P: Answer the question's denominator
* Undefined because the row total is zero
- Zero percent because no late events were recorded
- One hundred percent because all zero events qualify
= A proportion requires a nonzero denominator.

Q: Why compare within each clinic before pooling?
P: Compare before pooling
* Clinics may have different sizes and booking mixes
- Each clinic must report the same number of visits
- Row labels cannot appear in more than one table
= Different mixes can alter the overall comparison.

Q[transfer]: Online has 15 of 50 late and phone 10 of 20. Which has the higher late share?
P: Answer the question's denominator
* Phone, with 50% compared with 30%
- Online, because 15 is greater than 10
- They have equal shares because totals differ
= Compare using each channel's own total.

Q[transfer]: Your margins disagree by one visit. What should you do?
P: Give each record a row and a column
* Retally the complete records and check exclusions
- Add one visit to the smallest group without checking
- Divide every cell by the larger total and report it
= The grand totals should agree.

Q[transfer]: A lower late share appears for online bookings. What can the table support by itself?
P: Compare before pooling
* A difference in recorded shares, with definitions stated
- Proof that booking online caused fewer delays
- A guaranteed prediction for the next online visit
= Association and causation are different claims.

# Cards
What is a joint count? :: The number satisfying both row and column categories.
How do you get a row share? :: Divide the cell count by its row total.
Can equal shares have different counts? :: Yes, when denominators differ.

# Further
- OpenStax · The regression equation :: https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation
