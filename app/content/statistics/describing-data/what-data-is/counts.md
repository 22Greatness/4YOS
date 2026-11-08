---
id: counts
pack: Describing Data · What data is
title: Turn counts into a proportion
minutes: 35
source: OpenStax · Prealgebra 2e · Understand Percent
url: https://openstax.org/books/prealgebra-2e/pages/6-1-understand-percent
courses: Describing Data · STA 111
format: 2
teaches: eligible-denominator; part-whole-proportion; percentage-points
uses: sta-data; na-percentages
python: yes
---
# Goal
Define what you are counting, calculate fractions, proportions and percentages correctly, and spot when a percentage on its own is misleading.

# Why
Statistics is built on this one idea: a number only means something next to what it was counted out of. It is also your best defence against misleading claims, which you will meet constantly in the news, in adverts, and later in fraud work. "90% of customers agreed" sounds strong until you learn that ten people were asked. This lesson also underpins your whole statistics degree.

# Warm-up
?? What makes a numeric code a category rather than a measurement?
=> Its meaning is a label. Arithmetic on it has no useful interpretation.

?? What fraction is 25%?
=> 25/100, or 1/4.

# Lesson
## Define the count first
Before you count, say exactly what one item is and which items qualify. "How many of my files are PDFs?" sounds clear, but raises questions. Do files inside subfolders count? Do shortcuts count? A count is only useful if someone else could follow your rule and get the same number. Statisticians call each counted item a **unit** or **observation**, and the group of all eligible items the **reference group** or the **base**.

### Worked example: writing a counting rule
Vague: "the number of my courses that are hard".

Clear: "the number of courses I am registered for this semester in which I scored below 50 in my last test".

The clear version names the group, the time and the test for qualifying. If you can't write a rule like that, you aren't ready to count.

## Part over whole
A **proportion** is a part divided by its whole. The **numerator** on top is the number that qualify. The **denominator** on the bottom is the size of the whole reference group, including those that qualify.

```text
proportion = number that qualify / number in the whole group
percentage = proportion x 100
```

### Worked example
A folder has 40 files, of which 10 are PDFs.

| Form | Value | How you read it |
| --- | --- | --- |
| Count | 10 | How many |
| Fraction | 10/40, which simplifies to 1/4 | 1 out of every 4 |
| Proportion | 0.25 | The decimal form |
| Percentage | 25% | 25 per hundred |

**Percent** just means "per hundred". To convert a fraction, divide and multiply by 100. To go from a percentage back to a decimal, divide by 100, so 7% is 0.07, not 0.7.

> Mistake: Using the wrong denominator. The denominator is the whole group, not "the others". With 10 PDFs and 30 other files, the proportion of PDFs is 10/40, not 10/30.

?? 18 of the 60 students in a class are absent. What percentage is absent?
=> 18 divided by 60 is 0.30, so 30%.

## Using a percentage
Three calculations cover nearly everything you will meet.

| You want | Do this | Example |
| --- | --- | --- |
| A percentage of an amount | Multiply by the decimal | 15% of N20,000 is 0.15 x 20,000 = N3,000 |
| What percentage A is of B | A divided by B, times 100 | 12 of 48 is 25% |
| The original amount | Divide by the decimal | N3,000 is 15% of 3,000 / 0.15 = N20,000 |

### Percentage change
Percentage change compares a change with the **starting** value.

```text
change % = (new - old) / old x 100
```

Bread goes from N800 to N1,000. The change is 200, and 200 / 800 is 25%, so it rose 25%. Now suppose it falls back from N1,000 to N800. The change is the same N200, but 200 / 1000 is only 20%. The base is different, so the percentage is different. A rise of 25% is undone by a fall of 20%, not 25%.

### Percentage points
If a pass rate goes from 40% to 50%, it rose by **10 percentage points**, but by **25 percent**, since 10 / 40 is 0.25. Both are correct statements about the same change, and the difference is often used to make a change sound bigger or smaller than it is.

?? An exam fee rises from ₦5,000 to ₦6,000, then the next year falls by 20%. What is it now?
=> ₦6,000 is a 20% rise. Falling 20% from ₦6,000 removes ₦1,200, leaving ₦4,800. It doesn't return to ₦5,000, since each percentage applies to a different base.

## Always keep the counts
A percentage hides the size of its group, so always report both. Compare:

| Claim | Counts behind it | How much it should convince you |
| --- | --- | --- |
| 100% of users were happy | 2 of 2 | Very little |
| 80% of users were happy | 800 of 1,000 | Much more |

With a small group, one case swings the result wildly. Moving one person in a group of 5 shifts the percentage by 20 points, whereas in a group of 1,000 it moves 0.1 points. So a change from 2 of 5 to 3 of 5 is a 20-point jump, caused by one person.

## Questions that catch problems
Before you trust a percentage, yours or someone else's, ask these.

- **Of what?** What is the denominator? "60% of graduates" means something different from "60% of those who responded".
- **How many?** What are the counts behind it?
- **Does it make sense?** A part of a group can't be above 100%. If nothing qualifies, it's 0%.
- **Is it defined?** If the group is empty, you would divide by zero. There is no answer, not even zero. Say the group was empty.

> Note: Percentages can go above 100% when they compare with a starting value rather than a part of a whole. A price that goes from N100 to N300 has risen by 200%, and that's a correct statement.

# Exercises
?? A bank says 3 in every 200 transfers it checked were fraudulent. Express this as a percentage.
=> 3 divided by 200 is 0.015, which is 1.5%.

?? 35% of a class of 80 passed. How many students passed?
=> 0.35 x 80 = 28.

?? A channel's views go from 400 to 500, and then 500 to 400. Calculate each percentage change.
=> Up 25% (100 / 400), then down 20% (100 / 500). The base changed.

?? A survey claims 100% satisfaction. What is the first thing you should ask?
=> How many people responded, and how they were chosen. It could be very few, and only people likely to be happy.

# Practice
Use real counts from your own life. Don't use anyone else's private information.

1. Choose a real group you can count now, such as the files in one study folder, your courses this semester, or the days this month you studied.
2. Write a counting rule that someone else could follow. Say what one item is, which items are in the group and which qualify.
3. Count the qualifying items and the whole group.
4. Write the two counts, the simplified fraction, the proportion and the percentage. Do the arithmetic by hand, then check it in the Python box below. In the Python box below, each `print` line shows a result when you press **Run Python**. You don't need to know Python yet. Just change the numbers.
5. Change one item, for example add a file. Recalculate and write down how much one item moved the percentage.

If your group is empty, write that the proportion is undefined and why.

# Starter
```python
# Put your own counts here: qualifying items, then the whole group
print(10 / 40)
print(10 / 40 * 100)
```

# Rubric
- My counting rule is specific enough for another person to follow.
- I reported both counts next to the percentage.
- I worked out how much one item moves the percentage.

# Summary
- Define the group and the rule before you count.
- A proportion is the part divided by the whole, and the whole includes the part.
- Percent means per hundred, so divide by 100 to get the decimal. 7% is 0.07.
- Percentage change divides by the starting value, so up 25% is undone by down 20%.
- Report counts alongside percentages. A small group makes percentages jumpy. An empty group has no proportion.

# Check
Q: You want the proportion of files in a folder that are PDFs. Which count goes in the denominator?
P: Define the count first
* All files in the group you counted
- Only the PDFs in the group you counted
- Only the files that are not PDFs in the group
= The denominator is the whole group, including those that qualify.

Q: 14 of 56 students submitted early. What percentage is that? Answer with a number.
P: Part over whole
A: 25 | 25%
= 14 divided by 56 is 0.25, which is 25%.

Q: What is 15% of 2,000? Answer with a number.
P: Using a percentage
A: 300
= 0.15 x 2,000 = 300.

Q: As a decimal, what is 8%?
P: Using a percentage
A: 0.08 | .08
= Divide by 100. 8% is 0.08, not 0.8.

Q: A price rises from 500 to 650. What is the percentage rise? Answer with a number.
P: Using a percentage
A: 30 | 30%
= The change is 150, and 150 / 500 is 0.30. Divide by the starting value.

Q: A pass rate goes from 20% to 30%. Which statement is correct?
P: Using a percentage
- It rose by 10 percent, and by 50 percentage points
* It rose by 10 percentage points, and by 50 percent
- It rose by 10 percent, and that's the only correct way to put it
= The gap is 10 points. Relative to the start, 10 / 20 is a 50% rise.

Q: What is the proportion when a group has zero items?
P: Part over whole
- It's 0, since nothing qualified in the group
* It is undefined, because you would divide by zero
- It's 100%, since nothing failed to qualify
= With an empty denominator there is no proportion at all.

Q: A price falls 20% and then rises 20%. Compared with the start, where is it?
P: Using a percentage
- Back at exactly the starting price
* Below the starting price
- Above the starting price
= The rise applies to a smaller base. From 100, it falls to 80 and rises to 96.

Q[transfer]: An advert says "9 out of 10 users recommend us", and you learn 10 people were asked, all chosen by the company. What's the strongest criticism?
P: Always keep the counts
- The arithmetic is wrong, as 9 of 10 isn't 90%
* The group is tiny and was picked by the company, so it says little about users in general
- A percentage can't ever be used in an advert
= The arithmetic is fine. The problem is how few were asked and how they were chosen.

Q[transfer]: School A had 2 fraud cases out of 50 accounts. School B had 20 cases out of 1,000. Assume each case involves a different account in the same period. Which has the higher proportion of affected accounts?
P: Part over whole
* School A, with 4%, against School B's 2%
- School B, because it has more cases in total
- They're the same, because both have fraud cases
= Counts alone mislead. Divide by each school's own base before comparing.

Q[transfer]: A report says "complaints rose 100%". Before you are alarmed, what do you most need to know?
P: Always keep the counts
- The colour of the chart in the report
* The actual counts, since going from 1 to 2 is also a 100% rise
- Whether complaints can ever rise above 100%
= A percentage hides its base. The size of the counts changes what the claim means.

# Cards
What goes in the denominator of a proportion? :: The whole reference group, including the items that qualify.
How do you calculate percentage change? :: (new - old) divided by old, times 100. Always use the starting value as the base.
What's the difference between percent and percentage points? :: Points are the plain gap between two percentages. Percent compares that gap with the starting value. 20% to 30% is 10 points, or 50 percent.
Why report counts with a percentage? :: A percentage hides the group size. 100% can mean 2 of 2.
What is the proportion of an empty group? :: Undefined, because you would divide by zero.

# Further
- OpenStax Prealgebra 2e, Understand Percent :: https://openstax.org/books/prealgebra-2e/pages/6-1-understand-percent
- OpenStax Introductory Statistics 2e, definitions and key terms :: https://openstax.org/books/introductory-statistics-2e/pages/1-1-definitions-of-statistics-probability-and-key-terms
