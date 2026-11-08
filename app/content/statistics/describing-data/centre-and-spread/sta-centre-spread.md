---
id: sta-centre-spread
pack: Describing Data · Centre and spread
title: Averages and spread, worked by hand
minutes: 60
source: OpenStax · Introductory Statistics 2e · Sections 2.5 to 2.7
url: https://openstax.org/books/introductory-statistics-2e/pages/2-5-measures-of-the-center-of-the-data
courses: Describing Data · STA 111
format: 2
teaches: mean-and-median; mode; data-range; centre-and-spread-overview
uses: sta-charts; dd-grouped; na-roots-surds
python: yes
---
# Goal
Calculate the mean, median, mode, range, quartiles, variance and standard deviation by hand, choose the right average for the data, and say what each number means in words.

# Why
An average describes where values sit. It can hide how widely they vary. A measure of spread helps you compare groups with the same average and spot values worth checking.

# Warm-up
?? Which position would you read first when finding the smallest value from an ordered list?
=> The first position.

?? What is the class midpoint of 20 to under 30?
=> 25, halfway between the boundaries.

# Lesson
## Measures of centre
An average is one number that represents a typical value. There are three main ones, and they answer different questions. We'll use this invented data: the weekly study hours of 7 students.

```text
4  6  6  8  9  11  26
```

### The mean
The **mean** adds everything up, and divides by how many there are. In symbols, the sample mean is written x-bar, and the number of values is n.

```text
mean = sum of values / n
     = (4 + 6 + 6 + 8 + 9 + 11 + 26) / 7
     = 70 / 7
     = 10
```

### The median
The **median** is the middle value once the data are **in order**. With n values, its position is (n + 1) / 2. Here (7 + 1) / 2 = 4, so it's the 4th value: **8**.

With an even number of values, take the mean of the middle two. For 4, 6, 8, 10, the median is (6 + 8) / 2 = 7.

> Mistake: Taking the middle value without ordering the data first. For 9, 2, 7 the median is 7, not 2.

### The mode
The **mode** is the most common value. Here it's **6**. Data can have no mode, or several. The mode is the only average that works for nominal data such as "most common state".

### Which to use
The mean is 10, the median is 8 and the mode is 6. They differ because one student's 26 hours pulls the mean up. Six of seven students are below 12, and the mean is above most of them.

| Situation | Best average | Why |
| --- | --- | --- |
| Roughly symmetric, with no extreme values | Mean | Uses all the data |
| Skewed, or with outliers, such as incomes | Median | One extreme value barely affects it |
| Nominal categories | Mode | The only one that makes sense |
| Ordinal, such as grades | Median or mode | The gaps aren't measured |

A useful guide: in right-skewed data, the mean is usually above the median. That's why "average salary" often sounds higher than what a typical person earns.

?? 5 workers earn N50k, N60k, N60k, N70k and N1,000k per month. What are the mean and median, and which describes a typical worker better?
=> The mean is 1,240 / 5 = N248k. The median is N60k. The median is the better description, as the mean is above four of the five workers.

## Why spread matters
Two classes can have the same mean and be nothing alike.

| Class | Scores | Mean |
| --- | --- | --- |
| A | 49, 50, 50, 51 | 50 |
| B | 10, 30, 70, 90 | 50 |

**Spread**, also called **dispersion**, measures how far values vary.

### Range
The **range** is the largest minus the smallest. Class A's is 2, and Class B's is 80. It's simple, but it depends on just two values, so one outlier changes it completely.

### Quartiles and the interquartile range
**Quartiles** mark positions about a quarter, halfway and three quarters through ordered data. The halfway value Q2 is the median. The **interquartile range** is IQR = Q3 - Q1. It describes central spread and is usually less sensitive to extreme values than the overall range.

For 4, 6, 6, 8, 9, 11, 26: the median is 8, so the lower half is 4, 6, 6 and the upper half is 9, 11, 26. Q1 = 6, Q3 = 11, and IQR = 5. Textbooks have slightly different rules for finding quartiles, so use your course's. A common rule for spotting outliers flags anything above Q3 + 1.5 x IQR, here 11 + 7.5 = 18.5, so 26 counts as an outlier.

### Variance and standard deviation
These measure how far values typically are from the mean. They use all the data.

The **variance** averages the squared distances from the mean. For a sample, you divide by n - 1. The **standard deviation** (SD) is its square root, which puts it back in the original units.

```text
sample variance  s^2 = sum of (value - mean)^2 / (n - 1)
standard deviation s = square root of s^2
```

### Worked example: standard deviation by hand
Data: 2, 4, 4, 6, 9. Here n = 5, and the mean is 25 / 5 = 5.

| Value | Value - mean | Squared |
| --- | --- | --- |
| 2 | -3 | 9 |
| 4 | -1 | 1 |
| 4 | -1 | 1 |
| 6 | 1 | 1 |
| 9 | 4 | 16 |
| Sum | 0 | 28 |

Variance = 28 / (5 - 1) = 7. Standard deviation = square root of 7, which is about **2.65**.

Notice that the middle column sums to 0, and it always does. That's why you square: otherwise the positives and negatives would cancel out, and that sum is also a handy check on your arithmetic.

> Note: Divide by n - 1 for a **sample**, and by n when you truly have the whole **population**. Dividing by n - 1 corrects for the tendency of a sample to underestimate the population's spread. Check which your question wants, as exam questions and calculators both have both forms.

Python's `statistics` module confirms the work:

```python
import statistics
data = [2, 4, 4, 6, 9]
print(statistics.mean(data))
print(statistics.median(data))
print(statistics.mode(data))
print(statistics.variance(data))
print(round(statistics.stdev(data), 2))
```

```output
5
4
4
7
2.65
```

## What a standard deviation tells you
A larger SD means larger squared deviations from the mean on average, under the same calculation. In a normal distribution, the **empirical rule** gives about 68% within 1 SD of the mean, 95% within 2 SD and 99.7% within 3 SD. For data with a roughly normal shape these are guides. Check actual counts if you need an observed share.

Move the sliders to see it. The mean moves the bell left and right, and the standard deviation makes it wider or narrower.

```diagram
{"kind":"graph","alt":"A bell-shaped curve. A slider for the mean moves it left and right, and a slider for the standard deviation makes it wider and flatter, or narrower and taller.","x":[-10,10],"y":[-0.05,0.8],"sliders":[{"name":"mean","min":-5,"max":5,"value":0},{"name":"sd","min":0.5,"max":4,"value":1,"step":0.5}],"curves":[{"fn":"exp(-((x-mean)^2)/(2*sd^2))/(sd*sqrt(2*pi))"}]}
```

So if scores have a mean of 60 and an SD of 10, a score of 62 is ordinary, while 95 is very unusual. A **z-score** says how many SDs a value is from the mean: z = (value - mean) / SD. So 95 has a z-score of (95 - 60) / 10 = 3.5.

This is basically how simple fraud rules work. If an account usually spends a mean of N10,000 with an SD of N3,000, then a N70,000 transaction has z = 20, which is worth a closer look. Real systems are more complicated, partly since spending data is often strongly skewed, and the rule above only applies to bell-shaped data.

## Grouped data
Exams often give a frequency table, not raw values. You can't know the exact values, so use each class's midpoint as an estimate.

### Worked example: mean of grouped data
| Class | Midpoint x | Frequency f | f x x |
| --- | --- | --- | --- |
| 10 to 19 | 14.5 | 2 | 29 |
| 20 to 29 | 24.5 | 5 | 122.5 |
| 30 to 39 | 34.5 | 3 | 103.5 |
| Total | | 10 | 255 |

Mean = sum of (f x x) / sum of f = 255 / 10 = **25.5**. The result is an estimate, since we're assuming that values sit at the midpoints. Your course will also show formulas for the median and SD of grouped data.

# Exercises
?? Find the mean, median and mode of 3, 7, 7, 2, 11.
=> Ordered: 2, 3, 7, 7, 11. Mean: 30 / 5 = 6. Median: 7. Mode: 7.

?? Find the median of 12, 5, 9, 20.
=> Ordered: 5, 9, 12, 20. The middle two are 9 and 12, so (9 + 12) / 2 = 10.5.

?? Find the sample variance and SD of 1, 3, 5.
=> The mean is 3. Squared distances: 4, 0, 4, which sum to 8. Variance = 8 / 2 = 4. SD = 2.

?? What happens to the mean and SD if you add 10 to every value? And if you double every value?
=> Adding 10: the mean rises by 10, and the SD stays the same. Doubling: both the mean and SD double.

?? A score has mean 50 and SD 5. What's the z-score of 65?
=> (65 - 50) / 5 = 3.

# Practice
Use a real numerical variable from your own data table. If you can, have at least 8 values.

1. By hand, find the mean, median and mode, and the range.
2. By hand, make the table of distances from the mean, and find the sample variance and SD. Check that the distances sum to about 0.
3. Say what your mean and SD describe. For example: "Across these recorded days the mean was 40 minutes and the sample SD was 15 minutes." If you want to say how many days fell within 15 minutes of the mean, count them.
4. Which average describes your data best, and why? Are there any outliers?
5. Complete the two functions in the editor, and press **Test my code**. Then run them on your values, and compare with your hand results. The solution needs tools from later lessons, so hints are given. If you get stuck, ask Ayo.

# Starter
```python
def mean(values):
    # sum(values) adds them up, and len(values) counts them
    return 0

def sample_variance(values):
    # Hint: the line below builds a list of squared distances from the mean
    m = mean(values)
    squared = [(v - m) ** 2 for v in values]
    # Now return the sum of squared, divided by (how many values minus 1)
    return 0

my_values = [2, 4, 4, 6, 9]
print(mean(my_values))
print(sample_variance(my_values))
print(sample_variance(my_values) ** 0.5)
```

# Tests
```python
assert mean([2, 4, 4, 6, 9]) == 5, "the mean of 2, 4, 4, 6, 9 should be 5"
assert mean([1, 2]) == 1.5, "the mean of 1 and 2 should be 1.5"
assert sample_variance([2, 4, 4, 6, 9]) == 7, "this sample variance should be 7"
assert sample_variance([1, 3, 5]) == 4, "the sample variance of 1, 3, 5 should be 4"
assert sample_variance([5, 5, 5]) == 0, "identical values have zero variance"
```

# Solution
```python
def mean(values):
    return sum(values) / len(values)

def sample_variance(values):
    m = mean(values)
    squared = [(v - m) ** 2 for v in values]
    return sum(squared) / (len(values) - 1)
```

# Rubric
- I calculated everything by hand first, using my own real values.
- I said what my mean and SD mean in plain words.
- I chose an average for my data, and gave a reason.

# Summary
- Mean: add and divide. Median: the middle of ordered data. Mode: the most common.
- With outliers or skew, prefer the median. The mean gets pulled toward the tail.
- Range is largest minus smallest. IQR is Q3 - Q1, the spread of the middle half.
- Sample variance is the sum of squared distances divided by n - 1. SD is its square root.
- A z-score counts how many SDs a value is from the mean.

# Check
Q: What's the mean of 3, 5, 10?
P: Measures of centre
A: 6
= 18 / 3 = 6.

Q: What's the median of 8, 1, 6, 3, 9?
P: Measures of centre
A: 6
= Ordered: 1, 3, 6, 8, 9. The middle value is 6.

Q: What's the median of 2, 4, 6, 10?
P: Measures of centre
A: 5
= The middle two are 4 and 6, and their mean is 5.

Q: What's the mode of 2, 3, 3, 5, 7?
P: Measures of centre
A: 3
= 3 appears most often.

Q: What's the range of 12, 40, 7, 19?
P: Why spread matters
A: 33
= 40 - 7 = 33.

Q: What's the sample variance of 2, 4, 6?
P: Why spread matters
A: 4
= The mean is 4. Squared distances are 4, 0, 4, and they sum to 8. 8 / (3 - 1) = 4.

Q: What's the mean of grouped data with midpoints 10 and 20, and frequencies 3 and 1? Give a number.
P: Grouped data
A: 12.5
= (10 x 3 + 20 x 1) / 4 = 50 / 4 = 12.5.

Q: Why do we square the distances from the mean, instead of just adding them?
P: Why spread matters
- Because squaring always makes the arithmetic easier by hand
* Because the signed deviations from the mean sum to zero
- Because the mean of the data would be wrong otherwise
= Positives and negatives cancel out exactly, so squaring is needed.

Q: House prices in a town have a few huge values. Which average best describes a typical house?
P: Measures of centre
* The median
- The mean
- The range
= Extreme values pull the mean up, and they barely affect the median.

Q: Which average works for "most common state of origin"?
P: Measures of centre
- The mean
- The median
* The mode
= State is nominal, so only the mode makes sense.

Q[transfer]: A company says "our average employee earns N900,000 a month". Most staff earn about N150,000, and three directors earn millions. What's the problem?
P: Measures of centre
- The mean can't be calculated from salaries in naira
* The mean is pulled up by a few high earners, so it's not typical
- Three directors are too few to affect any kind of average
= Ask for the median. It describes a typical employee far better here.

Q[transfer]: Exam scores have a mean of 55 and an SD of 8. A student scores 79. What's the z-score?
P: What a standard deviation tells you
A: 3
= (79 - 55) / 8 = 3. That's unusually high.

Q[transfer]: Two machines fill 500 ml bottles. Both have a mean of 500 ml. Machine A's SD is 1 ml, and machine B's is 20 ml. Which machine has less variation in fill volumes?
P: What a standard deviation tells you
* Machine A, as its bottles are far more consistent
- Machine B, as a bigger SD means it's a more powerful machine
- Neither, as they have the same mean and are thus equal
= The mean alone hides this. Spread is what tells them apart.

# Cards
How do you find a median? :: Put the data in order and take the middle value, or the mean of the middle two.
When is the median better than the mean? :: When the data are skewed or have outliers.
What's the sample variance formula? :: The sum of (value - mean) squared, divided by n - 1.
How's standard deviation related to variance? :: It's the square root of the variance, so it's in the original units.
What's a z-score? :: (value - mean) / SD. It's how many standard deviations a value is from the mean.
What does the empirical rule say? :: In bell-shaped data, about 68%, 95% and 99.7% lie within 1, 2 and 3 SDs of the mean.

# Further
- OpenStax Introductory Statistics 2e, measures of the center :: https://openstax.org/books/introductory-statistics-2e/pages/2-5-measures-of-the-center-of-the-data
- OpenStax Introductory Statistics 2e, measures of the spread :: https://openstax.org/books/introductory-statistics-2e/pages/2-7-measures-of-the-spread-of-the-data
- Python documentation, statistics module :: https://docs.python.org/3/library/statistics.html
