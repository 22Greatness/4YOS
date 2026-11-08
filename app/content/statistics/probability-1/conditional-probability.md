---
id: conditional-probability
pack: Conditional probability
title: Find the right denominator
minutes: 50
source: John Tsitsiklis · MIT OpenCourseWare · 6.041SC · Lecture 2: Conditioning and Bayes' Rule
url: https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/resources/lecture-2-video-2/
courses: UNIPORT (expected) STA 112, STA 211 · NOUN STA111
lecture: yes
credit: MIT OpenCourseWare · John Tsitsiklis
start: 780.58
end: 1113.67
python: yes
---
# Goal
Calculate conditional probabilities from counts and tables, explain why P(A given B) differs from P(B given A), and work out what a positive result really means when the thing being tested for is rare.

# Why
This is the single most useful idea connecting your two degrees, because fraud detection, spam filters and intrusion alerts are all conditional probability. If a fraud alert is right 99% of the time, what's the chance a flagged transaction is really fraud? Most people answer 99%, and it can be below 10%. Professionals get this wrong, and getting it right is the sort of thing that makes you valuable in the risk and fraud work you're aiming for.

# Lesson
## Probability as a fraction of cases
Here's the starting point. A **sample space** is the set of all possible outcomes. An **event** is a set of outcomes you care about. When outcomes are equally likely:

```text
P(A) = number of outcomes in A / number of outcomes in the sample space
```

Probabilities run from 0 to 1. `P(A and B)` means both happen, and it's also written with the symbol for intersection.

## New information shrinks the group
> Clip: Professor Tsitsiklis uses a diagram with areas of probability 3/6, 2/6 and 1/6. He's told B occurred, so outcomes outside B are ruled out. His 2-to-1 reasoning leads to the formula below. The lesson then applies it to counts.

**Conditional probability** answers: given that I know B happened, how likely is A? It's written **P(A | B)**, and it's read as "the probability of A given B".

Once you know B happened, everything outside B is ruled out. B becomes your new sample space. The lecture's example: B has total probability 3/6, and the part of B where A also happens has 2/6. So within B, A takes up 2/6 out of 3/6, which is 2/3.

```text
P(A | B) = P(A and B) / P(B),   as long as P(B) > 0
```

With counts of equally likely cases, this becomes much simpler:

```text
P(A | B) = cases with both A and B / all cases with B
```

**The condition goes in the denominator.** That's the rule to remember. The word after "given", "among" or "of those" tells you which group you're now in.

If P(B) is 0, then P(A | B) isn't defined, as the lecture says. There's no such group to look within.

### Worked example: reading a table
Here are 200 transfers a bank reviewed, sorted by whether they were flagged and whether they were truly fraud. These numbers are invented for teaching.

| | Fraud | Not fraud | Total |
| --- | --- | --- | --- |
| Flagged | 8 | 32 | 40 |
| Not flagged | 2 | 158 | 160 |
| Total | 10 | 190 | 200 |

| Question | Group you're in | Calculation | Answer |
| --- | --- | --- | --- |
| P(fraud) | All | 10/200 | 5% |
| P(flagged) | All | 40/200 | 20% |
| P(fraud and flagged) | All | 8/200 | 4% |
| P(fraud given flagged) | Flagged only | 8/40 | 20% |
| P(flagged given fraud) | Fraud only | 8/10 | 80% |

Look at the last two. They use the same numerator, 8, with different denominators, and give very different answers.

?? From the table, among transfers not flagged, what's the probability of fraud?
=> The group is the 160 not flagged, of which 2 were fraud. 2/160 is 1.25%.

## The reversal mistake
**P(A | B) and P(B | A) are different questions.** Confusing them is so common that it has a name in law, the prosecutor's fallacy.

| Statement | Means |
| --- | --- |
| P(flagged given fraud) = 80% | The system catches 80% of fraud |
| P(fraud given flagged) = 20% | Only 20% of alerts are real fraud |

Here's an extreme example. Nearly all scam messages include a link, so P(link given scam) is high. But most messages with links aren't scams, so P(scam given link) is much lower. "Most scams have links" doesn't mean "most links are scams".

> Mistake: Saying "the test is 99% accurate, so a positive result means 99% chance". That swaps the condition. The next section shows how far off this can be.

### Multiplying
Rearranging the definition gives the **multiplication rule**, as the lecture shows:

```text
P(A and B) = P(B) x P(A | B)
```

In frequency terms: of all the times B occurs, a further fraction also have A. So if 20% of transfers are flagged, and 20% of those are fraud, then 0.2 x 0.2 = 4% are both, which matches the table.

### Independence
A and B are **independent** if knowing B doesn't change the chance of A. That is, P(A | B) = P(A). In the table, P(fraud) is 5%, while P(fraud given flagged) is 20%, so these are not independent, which is good news for the flagging system. A flag that told you nothing would leave the rate at 5%.

## Rare events and base rates
A **base rate** is how common something is before you know anything else. Ignoring it is one of the most damaging errors in reasoning.

### Worked example: the 99% fraud detector
Suppose 1 in 1,000 transactions is fraud. A detector catches 99% of fraud, and it wrongly flags 1% of genuine transactions. If it flags a transaction, what's the chance it's really fraud? Think about 100,000 transactions, as counts make this easy.

| | Fraud | Genuine | Total |
| --- | --- | --- | --- |
| Flagged | 99 | 999 | 1,098 |
| Not flagged | 1 | 98,901 | 98,902 |
| Total | 100 | 99,900 | 100,000 |

```python
transactions = 100_000
fraud = transactions // 1000
genuine = transactions - fraud
caught = fraud * 99 // 100
false_alarms = genuine * 1 // 100
flagged = caught + false_alarms
print(caught, false_alarms, flagged)
print(round(caught / flagged * 100, 1))
```

```output
99 999 1098
9.0
```

So a flagged transaction has only about a **9%** chance of being fraud, even with this good detector. Because genuine transactions vastly outnumber fraud, its small error rate produces far more false alarms than real catches. This is why security teams are swamped by false alerts, and it's a central problem in real fraud and intrusion detection.

This calculation is **Bayes' rule** in practice, which you'll meet properly in probability courses. With formulas, it reads P(A | B) = P(B | A) x P(A) / P(B). Building the table of counts gets you the same answer, and it's harder to get wrong.

> Note: Three words you'll see in this kind of work. **Sensitivity** or recall is P(flagged given fraud). **Precision** is P(fraud given flagged). A **false positive** is a flagged genuine case. Here the sensitivity is 99% and the precision is only 9%.

## Limits of what you calculated
A fraction from your own counts describes **those cases, at that time**. It's a probability only for picking one case at random from that same group. To claim anything about the future, or about other groups, needs a good sampling design, as you learned in the population and sample lesson. A rate based on a few cases can swing wildly as well, so report the counts.

# Exercises
?? In a class of 50, 30 passed Maths, 20 passed Physics, and 15 passed both. Among those who passed Maths, what fraction passed Physics?
=> The group is the 30 who passed Maths, and 15 of those also passed Physics. 15/30 is 1/2.

?? Using the same class, among those who passed Physics, what fraction passed Maths?
=> 15/20, which is 3/4. Same numerator and different group.

?? A fair die is rolled. Given that the result is even, what's the probability it's a 2?
=> The even results are 2, 4 and 6. One of those three is 2, so 1/3.

?? 40% of emails are promotions. Among promotions, 25% get opened. What percentage of all emails are promotions that get opened?
=> 0.40 x 0.25 = 0.10, so 10%, using the multiplication rule.

?? A disease affects 1 in 200 people. A test catches every case, but it wrongly flags 5% of healthy people. Out of 2,000 people, what fraction of the positives are real?
=> 10 have the disease, and all are flagged. Of 1,990 healthy people, 99.5 are flagged, about 100. So 10 of about 110 positives are real, about 9%.

# Practice
Use one real study folder with files directly in it, and exclude subfolders. Keep your file names private. Use the same seven-day cutoff for every file.

1. Count all the files, the PDFs, the files modified in the last seven days, and the PDFs modified in the last seven days. The last count can't be more than either of the two before it.
2. Build a 2 by 2 table with totals, using your counts.
3. Work out both conditional fractions. Write the question in words beside each: "among recent files, what fraction are PDFs?" and "among PDFs, what fraction are recent?"
4. Complete the function in the editor, and press **Test my code**. It works these out for any counts, and handles an empty group properly. Then run it on your own counts.
5. If a denominator was zero, write which group was empty.

# Starter
```python
def given(both, condition):
    # Return both / condition, as P(A given B).
    # If the condition group is empty, return None, because it's undefined.
    return 0

# Your real counts go here
pdfs = 0
recent = 0
recent_pdfs = 0
print("Among recent, fraction PDF:", given(recent_pdfs, recent))
print("Among PDFs, fraction recent:", given(recent_pdfs, pdfs))
```

# Tests
```python
assert given(8, 40) == 0.2, "given(8, 40) should be 0.2"
assert given(8, 10) == 0.8, "given(8, 10) should be 0.8"
assert given(0, 5) == 0, "given(0, 5) should be 0"
assert given(0, 0) is None, "an empty condition group is undefined, so return None"
assert given(3, 3) == 1, "given(3, 3) should be 1"
```

# Solution
```python
def given(both, condition):
    if condition == 0:
        return None
    return both / condition
```

# Rubric
- I built a real table from real counts, and it adds up across and down.
- I wrote each fraction's question in words, and the two used different denominators.
- My code passes the tests, including the empty group.

# Summary
- P(A given B) is the cases with both, divided by all cases with B. The condition goes in the denominator.
- P(A | B) and P(B | A) are different questions, usually with different answers.
- P(A and B) = P(B) x P(A | B). If B has zero probability, P(A | B) is undefined.
- A and B are independent if knowing B doesn't change the chance of A.
- With rare events, even an accurate detector mostly produces false alarms. Build a table of counts to see it.

# Check
Q: Among the files modified this week, what fraction are PDFs? Which calculation answers that?
* Recently modified PDFs ÷ all recently modified files
- Recently modified PDFs ÷ all of the PDFs in the folder
- Recently modified PDFs ÷ all of the files in the folder
= "Among the files modified this week" sets the group, so recently modified files go in the denominator.

Q: Using the bank table, flagged and fraud 8, flagged 40, fraud 10, total 200: what's P(fraud given flagged)? Give a decimal.
A: 0.2 | .2 | 0.20 | 20% | 1/5 | 8/40
= The group is the 40 flagged, and 8 of those are fraud.

Q: In the same table, what's P(flagged given fraud)? Give a decimal.
A: 0.8 | .8 | 0.80 | 80% | 4/5 | 8/10
= The group is the 10 fraud cases, and 8 of those were flagged.

Q: P(B) = 0.5 and P(A and B) = 0.2. What's P(A | B)? Give a decimal.
A: 0.4 | .4 | 0.40 | 40% | 2/5
= 0.2 divided by 0.5 is 0.4.

Q: P(B) = 0.3 and P(A | B) = 0.5. What's P(A and B)? Give a decimal.
A: 0.15 | .15 | 15%
= The multiplication rule gives 0.3 x 0.5.

Q: If P(B) = 0, what is P(A | B)?
- It equals 0, since B never happens anywhere
- It equals 1, since nothing else can happen
* It isn't defined
= You can't look inside an empty group, and you'd be dividing by zero.

Q: A and B are independent. What does this mean?
- A and B can never both happen in the same case
* Knowing B happened doesn't change the chance of A
- A happens in every case in which B happens
= Independence means P(A | B) = P(A). Events that can't happen together are called mutually exclusive.

Q: A fair die shows an odd number. What's the probability that it's a 3? Give a fraction.
A: 1/3 | 0.33 | 0.333 | .33 | one third
= The odd results are 1, 3 and 5, so one out of three.

Q[transfer]: "95% of scam messages use urgent language." A friend concludes that an urgent message is 95% likely to be a scam. What's wrong?
- 95% is too high a figure for any real-world pattern
* It swaps the condition. Many genuine messages are urgent too
- Urgent language has nothing to do with scams at all
= P(urgent given scam) isn't P(scam given urgent). You need the base rate of genuine urgent messages too.

Q[transfer]: 1 in 500 logins is malicious. An alert catches all of them, and it wrongly flags 2% of normal logins. Out of 50,000 logins, about how many alerts are real? Choose the closest.
- About 90% of the alerts
- About 50% of the alerts
* About 9% of the alerts
= 100 are malicious, and all are flagged. 2% of 49,900 is 998 false alarms. 100 out of about 1,098 is about 9%.

Q[transfer]: A security manager wants fewer false alarms from a detector without changing how it behaves. Which fact about the setting most affects the alerts' precision?
* How rare the real attacks are
- The colour used to display the alerts
- How many staff read each of the alerts
= With a rare event, even small error rates swamp true detections. The base rate matters a great deal.

# Cards
When working out P(A given B) from counts, what goes in the denominator? :: All cases satisfying B, the condition. The numerator counts cases with both A and B.
Are P(A given B) and P(B given A) the same? :: No. They share a numerator and have different denominators, and they can be very different.
What's the multiplication rule? :: P(A and B) = P(B) x P(A given B).
What does independence mean? :: Knowing B doesn't change the chance of A. So P(A given B) = P(A).
Why do accurate detectors for rare events give many false alarms? :: Genuine cases vastly outnumber real ones, so even a small error rate gives more false alarms than catches.
What's the difference between precision and sensitivity? :: Precision is P(real given flagged). Sensitivity is P(flagged given real).

# Further
- MIT OpenCourseWare 6.041SC, full Lecture 2 on conditioning and Bayes' rule :: https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/resources/lecture-2-video-2/
- OpenStax Introductory Statistics 2e, probability terminology :: https://openstax.org/books/introductory-statistics-2e/pages/3-1-terminology
