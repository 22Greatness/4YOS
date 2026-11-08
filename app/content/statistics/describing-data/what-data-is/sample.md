---
id: sample
pack: Describing Data · What data is
title: Population and sample
minutes: 35
source: OpenStax · Introductory Statistics 2e · Section 1.1
url: https://openstax.org/books/introductory-statistics-2e/pages/1-1-definitions-of-statistics-probability-and-key-terms
courses: Describing Data · STA 111
format: 2
teaches: target-population; sample-and-parameter; sampling-frame; selection-bias; sampling-variability
uses: sta-data; counts
python: yes
---
# Goal
Separate a population from a sample, tell a parameter from a statistic, and name the sampling bias in a real study, including why a bigger sample doesn't fix it.

# Why
Nearly every question in your statistics degree asks what a sample can tell you about something larger. Getting this wrong produces confident nonsense, which is why it's the first thing a good analyst checks. It is also directly useful: most misleading claims about money, health or scams fail at this exact point, and you will soon build a channel around checking such claims.

# Warm-up
?? Why should a percentage always name its denominator?
=> It tells you which group the numerator comes from.

?? Which unit would you record when comparing waiting time for individual trips?
=> One trip, with a defined start and end.

# Lesson
## The words you need
Statistics begins when you want to know something about a group too large to look at completely.

| Term | Meaning | Example |
| --- | --- | --- |
| Population | The whole group your question is about | All undergraduates at one university this session |
| Sample | The part you actually observe | 200 of those students you surveyed |
| Parameter | A number describing the population | The true average weekly study hours of all of them |
| Statistic | A number calculated from the sample | The average among your 200 |
| Variable | The thing that differs between units | Weekly study hours |
| Data | The values you recorded | 12, 7, 20, ... |

Here's an easy way to remember the pair: **p**arameter goes with **p**opulation, and **s**tatistic goes with **s**ample. You usually can't know a parameter, so you use a statistic to estimate it.

> Note: A population is not always people. It is whatever your conclusion covers: all transactions last year, every day of this term, all light bulbs from a factory.

## Start with the question
Be specific about who or what, where and when, because each choice changes the answer.

Vague: "Do students study a lot?"

Clear: "What is the average number of hours per week that 100-level students at your university study outside class during this semester?"

Now the population is clear, so you can judge whether any sample really represents it.

### Worked example: identify each part
A researcher wants to know the proportion of Port Harcourt small businesses that accept bank transfers. She visits 120 shops along one main road and finds that 90 do.

- **Population:** all small businesses in Port Harcourt.
- **Sample:** the 120 shops she visited.
- **Parameter:** the true proportion across all of them, which is unknown.
- **Statistic:** 90/120, or 75%.

?? What's the problem with her sample, given the question she asked?
=> Shops on one main road may differ from the rest, as they could be busier, better off, or more connected. So 75% may overstate the proportion for the whole city.

## Sampling bias
A sample is **biased** when the way it was collected makes some members of the population more likely to be included in a way that distorts the result. These are the common kinds.

| Type | What goes wrong | Example |
| --- | --- | --- |
| Convenience | You use whoever is easy to reach | Asking only your friends about a lecturer |
| Self-selection | People choose whether to take part | An online poll, answered mostly by those who feel strongly |
| Undercoverage | Part of the population can't be reached | An online survey of a town where many have no data |
| Non-response | Many who are chosen don't reply, and they differ | People with low results ignore a survey on results |
| Survivorship | You only see those who lasted | Studying only successful businesses to learn what works |

> Mistake: Believing a large sample cures bias. It does not. A million self-selected online voters still only represent people who chose to vote in that poll. A larger sample drawn the same biased way can narrow sampling variability while leaving the systematic error.

Survivorship is worth remembering if you plan to earn online. You mostly hear from people whose channels succeeded, and almost never from the many whose channels did not. Conclusions drawn from the winners alone will mislead you.

## Better ways to sample
In a **simple random sample**, every member of the population has the same chance of selection, and every possible group of that size is equally likely. Randomness protects you from your own preferences, and from unmeasured differences that you would never think to check.

To do this you need a **sampling frame**, a list of the population to draw from. Other designs you will meet in Sampling and Experiments are:

- **Stratified:** split the population into groups, such as levels of study, and sample randomly within each.
- **Systematic:** pick a random start, then take every kth item from a list.
- **Cluster:** randomly choose whole groups, such as hostels, then study everyone in them.

A computer can draw a random sample. Here is how it looks in Python, which you'll learn soon. A fixed seed makes the draw repeatable, which matters when you need to show your work:

```python
import random
random.seed(1)
days = list(range(1, 31))
print(random.sample(days, 5))
```

```output
[5, 19, 28, 26, 25]
```

## What a sample can and cannot tell you
Different samples give different statistics, even without any bias. This natural variation is called **sampling variability**, and larger samples from the same sound design usually reduce it. So size helps with chance error, while good selection deals with bias. You need both.

```text
Bias: errors from how the sample was chosen. Size doesn't fix it.
Sampling variability: errors from chance. A larger sample reduces it.
```

When you report a result, state who was sampled, how they were chosen, how many, and when. Then limit your claim to what that supports. "Among the 30 days I recorded" is honest. "I always study this much" may not be.

# Exercises
?? A company wants staff views on pay. It emails a survey to all staff, and 12% reply. Name the likely bias.
=> Non-response, and self-selection. Those who reply may feel more strongly than those who don't.

?? A statistic or a parameter? "Of the 500 voters polled, 52% support the plan."
=> A statistic, because it was calculated from the sample of 500.

?? A study of 2 million people finds a result, but everyone in it volunteered through one app. Does the size make it reliable about everybody?
=> No. It's still biased toward users of that app who chose to take part. Size reduces chance error, not selection error.

?? You want to estimate your average daily study time this term. You record only days you feel you worked hard. What happens to your estimate?
=> It will be too high. The rule for including days favours larger values.

# Practice
Choose a real question about your own life or your own files that needs no one else's private information. For example: "What's my average sleep on school nights this term?" or "What proportion of my study files have been opened this month?"

1. Write the question, specific in who or what, where and when.
2. Name your population, your sample, the parameter you want, and the statistic you will calculate.
3. Name two ways your sample could differ from the population, using the bias types above.
4. In the Python box below, change 30 to the size of your population and 5 to your sample size, then press **Run Python**. It draws a simple random sample of item numbers. You don't need to know Python yet. Write what you would change to reduce the bias.

# Starter
```python
import random
# Change 30 to your population size and 5 to your sample size
items = list(range(1, 31))
print(random.sample(items, 5))
```

# Rubric
- I named the population and sample for a real question of my own.
- I named specific bias risks, and why they would push the result.
- I described a change that deals with bias, and not only a larger sample.

# Summary
- The population is the whole group you want to know about, and the sample is what you observe.
- A parameter describes a population. A statistic describes a sample.
- Bias comes from how a sample is chosen. A larger biased sample is still biased.
- Random selection gives every member the same chance and protects against unseen differences.
- Report who, how, how many and when, then limit your claim to that.

# Check
Q: You want to understand your study time across every day this term. You measured only the past week. Which days form your sample?
P: The words you need
- Every day this term, since that's what you want
* The days you measured in the past week
- Only the days you studied the longest of all
= The observed days are the sample. The full term is the population.

Q: Which is a parameter?
P: The words you need
* The true average age of all students at a university
- The average age of 50 students who were surveyed
- The list of 50 students who were surveyed
= A parameter describes the entire population, and is usually unknown.

Q: "Of 300 customers sampled, 40% paid late." What is 40% here?
P: The words you need
- A parameter of all the customers
* A statistic
- A population of late payers
= It was calculated from a sample, so it's a statistic that estimates the parameter.

Q: What is the equal-chance property of a simple random sample?
P: Better ways to sample
- The sample will be large enough to trust
* Each member has the same individual selection probability
- The sample will match the population exactly
= Randomness guards against favouring anyone. It doesn't guarantee a perfect match.

Q: Doubling the size of a biased sample does what to its bias?
P: Sampling bias
- Removes the bias, given enough data
- Cuts the bias in half, as you'd expect
* Leaves the bias in place
= More of the same kind of data keeps the same distortion. It only reduces chance error.

Q: A radio station asks listeners to text in their view. What kind of sample is this?
P: Sampling bias
- Simple random
* Self-selected
- Stratified
= The listeners decide whether to respond. People who feel strongly are more likely to.

Q: You split students by level, and then randomly sample within each level. What's this design called?
P: Better ways to sample
* Stratified sampling
- Convenience sampling
- Survivorship sampling
= Stratified sampling divides the population into groups and samples randomly within each.

Q: Why do different random samples from the same population give different statistics?
P: What a sample can and cannot tell you
- Because at least one of them must be biased
- Because the population changes every time
* Because of natural sampling variability
= Chance alone makes samples differ. A larger sample reduces this.

Q[transfer]: A course on making money online shows 10 students who now earn well. What should you ask first?
P: Sampling bias
- Whether those 10 people look trustworthy on camera
* How many took the course in total, and what happened to the rest
- Whether the course has a good website and logo
= This is survivorship. You're shown winners. The base, including those who failed, is what you need.

Q[transfer]: A fraud model is trained only on transactions already flagged by human reviewers. What's the sampling risk?
P: Sampling bias
* It only learns from what reviewers noticed, so fraud they missed stays invisible
- The model can't work because it uses numbers from a real bank
- There's no risk, since humans reviewed every one of the transactions
= The sample misses cases nobody flagged, which is undercoverage. It matters a great deal in real fraud work.

Q[transfer]: A university asks graduates to report their salaries. Those with good jobs reply far more often. How will the average reported salary compare with the true average?
P: Sampling bias
- It will be about the same, thanks to a large mailing list
* It will probably be too high
- It will probably be too low
= This is non-response bias. Those with low pay are underrepresented, which pushes the average up.

# Cards
What's the difference between a population and a sample? :: The population is the whole group of interest. The sample is the part actually observed.
What's the difference between a parameter and a statistic? :: A parameter describes the population. A statistic is calculated from the sample and estimates it.
Does a larger sample remove bias? :: No. It reduces chance error, but not errors from how the sample was chosen.
What's survivorship bias? :: Drawing conclusions only from those who lasted or succeeded, while those who failed are invisible.
What's a simple random sample? :: Every member has the same chance, and every group of that size is equally likely.

# Further
- OpenStax Introductory Statistics 2e, Section 1.1 :: https://openstax.org/books/introductory-statistics-2e/pages/1-1-definitions-of-statistics-probability-and-key-terms
- OpenStax Introductory Statistics 2e, Section 1.2, data, sampling and variation :: https://openstax.org/books/introductory-statistics-2e/pages/1-2-data-sampling-and-variation-in-data-and-sampling
