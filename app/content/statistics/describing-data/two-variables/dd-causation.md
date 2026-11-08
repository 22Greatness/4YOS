---
id: dd-causation
pack: Describing Data · Two variables
title: Correlation is not cause
minutes: 45
source: OpenStax · Data collection and experiment design
url: https://openstax.org/books/introductory-statistics-2e/pages/1-4-experimental-design-and-ethics
courses: Describing Data · STA 111
format: 2
teaches: confounding; reverse-causation; causal-comparisons; pooled-reversal
uses: dd-two-way; dd-correlation; dd-fitted-line
---
# Goal
Separate a descriptive association from a causal claim, and explain how group mix can reverse a comparison.

# Why
A strong pattern can point to a useful question without answering what would happen if you intervened.

# Warm-up
?? Why might two rising annual series have high correlation?
=> Both can follow a time trend without either causing the other.

?? How do you compare proportions across groups fairly?
=> Use the relevant denominators and match definitions before comparing.

# Lesson
## Ask what the claim requires
An association says that two recorded characteristics occur together in a pattern. A causal claim says that changing one would change the outcome, with the other relevant circumstances held comparable. A scatter plot or a correlation coefficient describes the pairs you observed. It does not show what would have happened to those same units if their exposure had been different.

Imagine an invented study finds that students who use more practice quizzes earn higher scores. One explanation is that the quizzes improve learning. Another is that students with more time or prior knowledge take more quizzes and also score higher. A third is that strong early performance makes students more willing to attempt quizzes. In that third explanation the direction of influence runs partly from performance to quiz use. This is **reverse causation**. The same association can fit several explanations.

A **confounder** is a factor related to both the exposure and the outcome that can distort the comparison of their relationship. Prior knowledge could affect who chooses to use quizzes and how they score. Think about timing and plausible mechanisms before deciding what to compare. Measuring a third variable can help you check a candidate explanation, but it does not automatically remove all other differences.

## Compare within relevant groups
Consider two invented training methods, A and B. Some tasks are easy and some hard. For easy tasks, method A completes 9 of 10 and method B completes 24 of 30. For hard tasks, A completes 18 of 30 and B completes 5 of 10. A has the higher success share in each difficulty group: 90% compared with 80% for easy tasks and 60% compared with 50% for hard tasks.

| Task difficulty | Method A completed | Method B completed |
| --- | --- | --- |
| Easy | 9 of 10 | 24 of 30 |
| Hard | 18 of 30 | 5 of 10 |
| Overall | 27 of 40 | 29 of 40 |

Overall A completes 67.5% and B completes 72.5%. The direction reverses when the groups are combined. B handled more easy tasks, while A handled more hard tasks. The pooled result combines method performance and task mix. This kind of reversal is often called Simpson's paradox. Both calculations are correct for their questions. Neither proves that assigning method A would improve success for a new task unless the methods were compared in an appropriate design.

Report the difficulty-specific comparisons when difficulty is relevant to the decision. Also check whether the groups within each difficulty category are comparable. If A was used by experienced staff and B by new staff, even the stratified comparison may reflect experience as well as method.

## Look for stronger evidence
An experiment can assign the method at random to comparable units, then measure outcomes the same way. Random assignment helps balance other influences on average. It does not guarantee perfect balance in a small experiment. Allocation, missing outcomes, consistent measurement and whether the groups followed their assignments all matter. A random sample of people is a different idea: it can improve representation, but does not by itself randomly assign which treatment each person receives.

When an experiment is impractical or unethical, an observational study can still be valuable. Compare similar groups, check the order of events, examine alternative explanations and state which factors were unavailable. Strong designs and several kinds of evidence can support a causal argument, but a single plot cannot do all that work.

For your first report, use wording you can defend: “Among these recorded tasks, method B had a higher overall completion share. Method A had a higher share within each stated difficulty group. The methods were used on different mixes of tasks.” Keep prediction separate from explanation. A variable can predict an outcome in a similar setting even if changing it would have no effect. Ask what study or new data would distinguish those claims.

# Exercises
?? Which method has the higher share for hard tasks?
=> A: 18/30 = 60%, versus B: 5/10 = 50%.

?? Does the higher share prove A works better?
=> No. We have not established comparable assignment, even within a difficulty group.

# Practice
Find a published association stated in a headline or report. Rewrite it as a descriptive claim. Name a plausible confounder or reverse explanation, and describe a practical study that would test the causal claim more directly.

# Rubric
- I separated the observed association from the intervention claim.
- My suggested study defines the outcome and explains how groups would be compared.

# Summary
- Association describes what moves together.
- Confounding or reversed direction can explain a pattern.
- Check subgroup denominators and study design before claiming cause.

# Check
Q: What extra claim does a causal statement make?
P: Ask what the claim requires
* Changing one variable would change the outcome under comparable conditions
- The two recorded values form a pattern in the current data
- The observations can be drawn on a shared chart
= Causation concerns what an intervention would do.

Q: Prior knowledge affects both quiz use and scores. What role could it play?
P: Ask what the claim requires
* A confounding influence on the comparison
- The outcome of taking the final exam
- The random assignment of quiz access
= A third factor can affect both variables.

Q: High early scores cause students to choose more quizzes. Which alternative explanation is this?
P: Ask what the claim requires
* Influence running in the reverse direction
- A constant variable with no variation
- An incorrectly calculated row percentage
= The presumed outcome may help drive the exposure.

Q: Which method has a higher easy-task share in the worked example?
P: Compare within relevant groups
* A, with 90% compared with 80%
- B, with 80% compared with 90%
- B, because 24 completions exceeds 9
= Compare each method's completed tasks with its own total.

Q: What is A's pooled completion percentage?
P: Compare within relevant groups
A: 67.5 | 67.5% | 67.5 percent
= 27 divided by 40 gives 0.675.

Q: Why can B lead overall while losing within both difficulty groups?
P: Compare within relevant groups
* B handled a larger share of easy tasks
- A completed more easy tasks than B did
- Both methods handled the same difficulty mix
= The overall shares depend on the mixture.

Q: What does random assignment choose?
P: Look for stronger evidence
* Which condition each study unit receives
- Which units represent every population perfectly
- Which score should count as the best result
= Assignment separates exposure from pre-existing choices on average.

Q: Can a variable help predict an outcome without causing it?
P: Look for stronger evidence
* Yes, if it carries information about related conditions
- No, accurate prediction always proves causation
- Only if the variable has the same units as the outcome
= Prediction and intervention answer different questions.

Q[transfer]: One clinic treats more complex cases and has a lower overall recovery share. What would help interpret the comparison?
P: Compare within relevant groups
* Compare similar case types using a consistent outcome
- Use the overall share alone as a quality score
- Remove every complex case without documenting exclusions
= Case mix can affect pooled comparisons.

Q[transfer]: A school report says app use correlates with marks. What is a supported claim?
P: Ask what the claim requires
* The recorded variables were associated in that study
- Making every learner use the app will raise marks
- The association rules out differences in prior knowledge
= The design must support a causal conclusion separately.

Q[transfer]: An observational study controls for age only. What can still matter?
P: Look for stronger evidence
* Other differences between the compared groups
- Only whether the plot used whole numbers
- Nothing, because any adjustment removes all confounding
= One recorded factor does not capture every influence.

# Cards
What is reverse causation? :: The outcome or earlier versions of it influence the proposed cause.
What is Simpson's paradox? :: An association can reverse when separate groups are pooled.
How do random sampling and random assignment differ? :: One chooses units to study; the other chooses which conditions they receive.

# Further
- OpenStax · Data collection and experiment design :: https://openstax.org/books/introductory-statistics-2e/pages/1-4-experimental-design-and-ethics
