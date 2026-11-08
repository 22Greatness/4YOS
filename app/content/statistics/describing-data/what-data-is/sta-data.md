---
id: sta-data
pack: Describing Data · What data is
title: What statistics is, and the kinds of data
minutes: 40
source: OpenStax · Introductory Statistics 2e · Chapter 1
url: https://openstax.org/books/introductory-statistics-2e/pages/1-1-definitions-of-statistics-probability-and-key-terms
courses: Describing Data · STA 111
format: 2
teaches: statistical-purpose; observational-unit; variable-types; measurement-scales; data-origins
uses: none
---
# Goal
Say what statistics is, tell descriptive from inferential statistics, and classify any variable as categorical or numerical, discrete or continuous, and by its level of measurement.

# Why
This is where a statistics degree begins, and it's usually the first thing tested. The kind of data you have decides every later choice: which chart to draw, which average to use, and which test to run. Using the wrong method for the data type gives answers that look fine and mean nothing. If you get this right now, a lot of later statistics becomes a simple matter of following the type.

# Warm-up
?? What does a row in a simple record often stand for?
=> One thing observed, such as one journey. The question determines which thing.

?? If two buses each have a route number, does adding the route numbers measure anything?
=> No. They identify routes rather than measuring a quantity.

# Lesson
## What statistics is
**Statistics** is the science of collecting, organising, summarising and interpreting data, and of making decisions when you can't be certain. **Data** are recorded facts, such as ages, test scores or the state each student comes from. One recorded fact is a **data value**, or **observation**.

Why does it exist? Because things vary. Students in one class get different scores, and prices differ from market to market. If everything were the same, one measurement would tell you everything. Statistics is how you see the pattern through that variation.

The subject has two main branches.

| Branch | What it does | Example |
| --- | --- | --- |
| Descriptive statistics | Summarises the data you have | The average score in this class was 58 |
| Inferential statistics | Uses a sample to draw conclusions about a larger group, with stated uncertainty | Based on 200 students, about 40% of all students at the school work part-time |

STA 111 focuses on the first. Inference comes later, and needs the probability you'll build along the way.

?? "In last week's quiz, the highest mark was 18 out of 20." Is that descriptive or inferential?
=> Descriptive. It only summarises the marks that exist, and makes no claim about anyone else.

## Variables
A **variable** is a characteristic that can differ from one item to the next. Each item studied is a **unit** or **case**. Data usually sit in a table, with one row per case and one column per variable.

| Student | Level | State | Courses | Height (cm) |
| --- | --- | --- | --- | --- |
| 1 | 100 | Rivers | 9 | 172.5 |
| 2 | 200 | Lagos | 7 | 160.0 |
| 3 | 100 | Enugu | 8 | 181.2 |

Here the cases are students, and the variables are level, state, courses and height. These are invented values, for illustration.

## Categorical and numerical
The first question to ask of any variable is whether its values are categories or real quantities.

| Type | Values are | Examples | Does arithmetic make sense? |
| --- | --- | --- | --- |
| **Categorical** (qualitative) | Groups or labels | State, blood group, payment method | No |
| **Numerical** (quantitative) | Measured or counted amounts | Age, income, number of courses | Yes |

> Mistake: Treating anything written in digits as numerical. A matric number, phone number or postcode is digits used as a label. The average of your class's phone numbers means nothing. The test is whether adding or averaging the values would mean anything.

## Discrete and continuous
Numerical variables split again.

| Type | Values | Test | Examples |
| --- | --- | --- | --- |
| **Discrete** | Separate values, with gaps between them, usually from counting | "How many?" | Number of siblings, courses, or failed logins |
| **Continuous** | Any value in a range, usually from measuring | "How much?" | Height, weight, time taken |

You can't have 2.5 siblings, but a height can be 172.53 cm if your ruler is good enough. Measurements get rounded in practice, but the variable is still continuous. Money is an awkward case, since it comes in smallest units, yet it's often treated as continuous when the amounts are large.

?? Is the number of files in a folder discrete or continuous? And the size of one file in megabytes?
=> The number of files is discrete, since you count them. File size is usually treated as continuous, because it's measured over a wide range, although at the deepest level it's a count of bytes.

## Levels of measurement
Variables are also classified by what comparisons they support. Many Nigerian statistics courses teach this, so learn the four levels in order. Each level adds a property to the one before.

| Level | You can | Example | Average that fits |
| --- | --- | --- | --- |
| **Nominal** | Name categories, with no order | State, religion, course code | Mode |
| **Ordinal** | Also put them in order, but gaps aren't equal | Grade A to F, 100 to 400 level, "agree" to "disagree" | Median or mode |
| **Interval** | Also measure equal gaps, but zero isn't "none" | Temperature in Celsius, calendar years | Mean, median or mode |
| **Ratio** | Also compare by ratio, as zero means none | Height, income, age, counts | Mean, median or mode |

The tell for interval versus ratio is zero. 0 degrees Celsius doesn't mean no temperature, so 20 degrees isn't twice as hot as 10 degrees. But N0 really means no money, so N200 is truly twice N100.

The tell for ordinal is uneven gaps. The gap between "agree" and "strongly agree" isn't a measured quantity. An A isn't exactly as far from a B as a B is from a C.

### Worked example: classify everything
| Variable | Categorical or numerical | Discrete or continuous | Level |
| --- | --- | --- | --- |
| Blood group | Categorical | n/a | Nominal |
| Satisfaction, 1 to 5 stars | Categorical | n/a | Ordinal |
| Year of birth | Numerical | Discrete | Interval |
| Number of TMAs submitted | Numerical | Discrete | Ratio |
| Time to finish a test | Numerical | Continuous | Ratio |

> Note: Textbooks and lecturers can differ on borderline cases, such as whether star ratings may be treated as numbers. In an exam, follow your course material and lecturer.

## Where data come from
**Primary data** are collected by you for your purpose, through surveys, experiments or observation. **Secondary data** were collected by somebody else, such as the National Bureau of Statistics, and you reuse them. Secondary data are cheaper, but you need to check how they were collected and what they actually measure.

Data can also be **cross-sectional**, a snapshot at one time, or **time series**, the same thing tracked over time, such as monthly inflation.

# Exercises
?? Classify "marital status".
=> Categorical and nominal. Its values are labels with no natural order.

?? Classify "position in class: 1st, 2nd, 3rd".
=> Ordinal. There's an order, but the gap between 1st and 2nd isn't necessarily equal to that between 2nd and 3rd.

?? Is "the number of fraud cases per month" discrete or continuous? What's its level?
=> Discrete, because it's a count. Ratio, because zero means none, and 20 cases is twice 10.

?? "Temperature was 15 degrees yesterday and 30 degrees today, so today is twice as hot." What's wrong?
=> Celsius is interval, since zero isn't no temperature. You can say it's 15 degrees warmer, but not twice as hot.

# Practice
Use your own real information. Make a small data table on paper or in a spreadsheet.

1. Choose something you can record at least 8 times, such as your study sessions, your courses, or your spending. Each row is one case.
2. Record at least five variables per case. Try to include at least one categorical and one numerical variable. Example: for a study session, record the course, the date, the minutes, how focused you felt from 1 to 5, and how many questions you tried.
3. Classify every variable as categorical or numerical, then discrete or continuous if it's numerical, then its level.
4. For each, say whether averaging makes sense, and why.
5. Keep this table. You'll use it to make charts and averages in the next lessons.

Describe your variables and their classifications. Leave out private details.

# Rubric
- I recorded real data of my own, with at least five variables.
- I classified every variable, and gave a reason for at least the hard ones.
- I kept my table for the next lessons.

# Summary
- Descriptive statistics summarises what you have. Inferential statistics draws conclusions about more.
- A variable is a characteristic that differs. Each row is a case.
- Categorical values are labels. Numerical values are amounts. Digits can still be labels.
- Discrete values are counted, and continuous values are measured.
- Nominal, ordinal, interval and ratio each add a property. Only ratio has a true zero.

# Check
Q: "The average age of the 40 students in this class is 21." What kind of statistics is that?
P: What statistics is
* Descriptive
- Inferential
- Neither, as an average isn't part of statistics
= It only summarises the data at hand. No claim is made about a larger group.

Q: A poll of 1,000 voters is used to predict how a whole state will vote. What kind of statistics is that?
P: What statistics is
- Descriptive, as it counts up the people in the poll
* Inferential
- Neither, as polls aren't part of statistics
= It uses a sample to draw a conclusion about a larger group.

Q: Which is a categorical variable?
P: Categorical and numerical
- The number of courses you are taking
* The state you come from
- Your height in centimetres
= States are labels. The others are amounts.

Q: A student's matric number is made of digits. What kind of variable is it?
P: Variables
* Categorical, because the digits only act as a label
- Numerical and continuous, because it's made of digits
- Numerical and discrete, because you can count its digits
= Averaging matric numbers means nothing, so these digits are labels.

Q: Which variable is continuous?
P: Discrete and continuous
- The number of phone calls per day
- The number of students in a hall
* The time it takes to finish an exam
= Time is measured and can take any value in a range. The others are counted.

Q: Exam grades A, B, C, D, E, F are at which level of measurement?
P: Levels of measurement
- Nominal
* Ordinal
- Ratio
= They have an order, but the gaps between them aren't measured amounts.

Q: Which is at the ratio level?
P: Levels of measurement
- Temperature in Celsius
- Calendar year
* Monthly income in naira
= Zero income truly means none, so ratios make sense. Zero Celsius doesn't mean no temperature.

Q: What's the difference between primary and secondary data?
P: Where data come from
* Primary you collect yourself, and secondary were collected by others
- Primary are more accurate than any other data, and secondary never are
- Primary are numerical in every case, and secondary are categorical
= It's about who collected them, and for what purpose. Neither is automatically better.

Q: Which scale uses unordered category labels?
P: Levels of measurement
A: nominal
= The order is nominal, ordinal, interval and ratio.

Q[transfer]: A bank's fraud table records each transaction's amount, its channel (card, transfer or USSD) and its risk band (low, medium or high). What are the levels of channel and risk band?
P: Levels of measurement
- Both of them are ratio
* Channel is nominal, and risk band is ordinal
- Channel is ordinal, and risk band is nominal
= Channels have no order. Risk bands do, but without measured gaps.

Q[transfer]: A report gives the "average" of people's favourite colour, coded 1 for red, 2 for blue and 3 for green. What's wrong?
P: Levels of measurement
* Colour is nominal, so an average of the codes means nothing
- The report should have used codes starting from zero instead
- The average should only be rounded to the nearest whole number
= Codes are labels. Changing the coding would change the "average", which shows it's meaningless.

Q[transfer]: You're planning to study monthly data from the National Bureau of Statistics on inflation, across ten years. How would you describe this data?
P: Where data come from
- Primary and cross-sectional
* Secondary and time series
- Primary and time series
= Someone else collected it, and it tracks one thing across time.

# Cards
What's the difference between descriptive and inferential statistics? :: Descriptive summarises the data you have. Inferential uses a sample to draw conclusions about a larger group.
How do you test if a variable is really numerical? :: Ask if adding or averaging the values would mean anything. Digits can just be labels.
What's the difference between discrete and continuous? :: Discrete values are counted, with gaps. Continuous values are measured, and can be any value in a range.
What are the four levels of measurement, in order? :: Nominal, ordinal, interval, ratio.
What separates interval from ratio? :: Ratio has a true zero meaning none. Interval doesn't, so ratios don't make sense.

# Further
- OpenStax Introductory Statistics 2e, Section 1.1 :: https://openstax.org/books/introductory-statistics-2e/pages/1-1-definitions-of-statistics-probability-and-key-terms
- OpenStax Introductory Statistics 2e, Section 1.2, data and sampling :: https://openstax.org/books/introductory-statistics-2e/pages/1-2-data-sampling-and-variation-in-data-and-sampling
