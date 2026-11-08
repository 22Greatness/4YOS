---
id: dd-collect
pack: Describing Data · What data is
title: Collecting data honestly
minutes: 45
source: Statistics Canada · Questions to ask about surveys
url: https://www.statcan.gc.ca/en/customized-products-services/custom-surveys/questions-to-ask
courses: Describing Data · STA 111
format: 2
teaches: operational-definitions; neutral-question-design; missing-data-codes; reproducible-data-log
uses: sta-data; counts; sample
---
# Goal
Turn a question into a repeatable collection plan. Record missing results and corrections without hiding what happened.

# Why
A precise calculation cannot repair an unclear question or a missing part of the record. A collection plan makes it possible to find the problem while there is still time to fix it.

# Warm-up
?? A neighbourhood survey is answered only by people who see an online post. What may be missing?
=> Residents without access to the post, and residents who see it but do not reply.

?? What do you need beside a reported proportion?
=> The numerator, eligible denominator and the rule used to count each.

# Lesson
## Define the observation
Start with the decision your data should help you make. Suppose you want to know whether morning or afternoon practice sessions are easier to start on time. “Did I have a good week?” will not tell you that. A question you can actually record is “Of the practice sessions I scheduled this week, what proportion began within ten minutes of the planned start, by time of day?” The comparison is about that particular week and those sessions.

The observation unit is one scheduled session, including sessions you did not start. Give each session one row. Record the scheduled time, actual start if it happened, and status. Decide whether exactly ten minutes late counts before you see any results. Here it counts. A scheduled session you deliberately cancelled should stay in the log with the status cancelled. Decide ahead of time whether you will include it in the primary denominator and explain that decision in the result. You can also report cancellations separately. A session that was never scheduled is outside the scope.

A **measurement protocol** tells you how to collect each value. Write both times to the nearest minute using the same clock. Define morning using the scheduled time rather than the actual start so a delayed morning session cannot move itself into the afternoon group. If someone else could read your rules and record the same session the same way, the definition is doing its job.

## Ask and record consistently
If you collect other people's answers, ask one neutral thing at a time. “How convenient and affordable was the trip?” asks two different things. Someone can find it convenient but expensive. “How many minutes did your most recent trip take, from leaving your starting point to arriving?” asks for one measure and gives a time reference. Offer a way to say “don't know” if someone cannot remember. Collect only what you need, tell people how you will use it, and let them decline. Anonymous summaries are enough for this course. Names, account numbers and precise home addresses are unnecessary.

Before a full collection, try the plan on a few cases. This small trial is a **pilot**. Ask a participant to explain what the question meant to them. If two people use different starting points, revise the question. Label pilot rows and do not silently merge them with final rows when a definition changed. A repeated measurement can also reveal a measurement problem. If two readings differ, check the tool and write which reading you kept and why.

For an illustration from real data collection, the National Bureau of Statistics publishes a catalogue entry for the Nigeria Labour Force Survey. It describes what the survey measures and links to reports and documentation. That record makes it possible to inspect definitions and data collection decisions rather than guessing from the headline. For a home study log, a short note above your table serves the same purpose.

## Keep an audit trail
Use distinct codes for distinct events. Zero delay means a start at the planned time. No start means the event did not happen. An unrecorded start means you do not know the time. These three situations answer different questions. Keep blanks or a clearly documented code for missing values, and record the reason where known. Replacing missing times with zero makes the average delay appear smaller without any evidence.

### Worked example: one week's log
These eight scheduled sessions are invented. An arrival ten minutes late still counts as on time.

| Session | Scheduled | Actual start | Status |
| --- | --- | --- | --- |
| Mon 1 | 09:00 | 09:02 | On time |
| Mon 2 | 14:00 | 14:10 | On time |
| Tue | 09:00 | 09:04 | On time |
| Wed | 14:00 | 14:19 | Late |
| Thu | 09:00 | 09:00 | On time |
| Fri | 14:00 | 14:05 | On time |
| Sat | 09:00 | No start | Cancelled |
| Sun | 14:00 | Unknown | Start not recorded |

| Question | Numerator and denominator | Result |
| --- | --- | --- |
| Of sessions with a known start, how many started on time? | 5 on time out of 6 known starts | 5 of 6 |
| Of all scheduled sessions, how many are confirmed on time? | 5 confirmed out of 8 scheduled | 5 of 8, with 1 unknown and 1 cancelled |

The second row does not claim the unknown start was late. Both counts use the same record and answer different questions.

Keep an untouched copy of your original observations. If a timestamp was entered as 09:20 instead of 09:02, record the old value, the new value, and the evidence for the correction. If a value merely looks unusual, check it rather than deleting it. At the end, count eligible rows and compare that count with the record you expected. Report the missing rows alongside your summary. A clean-looking table is useful only when someone can reconstruct how it became clean.

# Exercises
?? On Monday the second session started exactly ten minutes late. Which status does it get?
=> On time, because the stated rule includes exactly ten minutes.

?? A learner enters 0 where their timer stopped recording. What should change?
=> Use a missing code and record the reason. Keep 0 only for a measured zero.

?? Why group sessions by scheduled start rather than actual start?
=> Grouping by the actual start can move the latest morning sessions into the afternoon and hide a morning delay.

# Practice
Choose one harmless question about your own routine or a set of public records. Define the row, eligibility, unit, threshold and missing codes. Pilot three observations. Revise one unclear rule if needed. Collect at least five observations with the final definition and write a one-sentence summary that states how many values were missing.

# Rubric
- Another person could apply my rules to the same observation.
- I preserved missing and cancelled observations and stated how I counted them.
- I recorded any change between pilot and final collection.

# Summary
- Define the unit and eligibility before collecting.
- Pilot neutral questions and consistent measurements.
- Keep missing values distinct from zero and preserve the original record.

# Check
Q: You study the duration of each bus journey. What should one row represent?
P: Define the observation
* One journey with a defined start and end
- One passenger regardless of journey count
- One route regardless of journeys taken
= The question is about individual journeys.

Q: You set a threshold of at most ten minutes late. Which observation qualifies?
P: Define the observation
* An arrival exactly ten minutes late
- An arrival eleven minutes late
- An arrival twelve minutes late
= At most includes equality.

Q: Why fix eligibility before recording results?
P: Define the observation
* So inclusion does not depend on the result
- So the sample always includes everybody
- So every recorded value must be positive
= An outcome-dependent inclusion rule can distort the result.

Q: Which asks about one measurable thing?
P: Ask and record consistently
* How many minutes was your last trip?
- Was your last trip cheap and quick?
- How much better was the last trip?
= The first gives a unit and a time reference.

Q: What is a pilot for?
P: Ask and record consistently
* Finding unclear rules before full collection
- Quietly removing unusually slow observations
- Replacing the need to document the main survey
= Pilot cases test whether the collection works.

Q: An empty log cell means a time is unknown. What should you store?
P: Keep an audit trail
* A documented missing value, with reason if known
- A zero so all rows are easy to calculate
- The average time from the other rows
= Unknown is not an observed number.

Q: A receipt proves 540 was entered instead of 450. How do you fix it?
P: Keep an audit trail
* Keep the original and record the correction with its evidence
- Overwrite the entry and remove the old copy immediately
- Drop the row because a value once looked odd
= A traceable correction preserves the evidence.

Q: In an invented log, six sessions have known starts and five were on time. What is the proportion among known starts? Enter a simplified fraction like 2/3.
P: Keep an audit trail
A: 5/6 | 5 / 6
= Five qualifying starts out of six known starts.

Q[transfer]: A form asks if a service is fast and affordable. How would you improve it?
P: Ask and record consistently
* Use separate questions for speed and affordability
- Ask the same combined question twice for reliability
- Replace both questions with whether it was excellent
= Speed and cost can give different answers.

Q[transfer]: A traffic sensor is offline for one hour. What should that hour count as?
P: Keep an audit trail
* Missing, unless another source confirms the count
- Zero, since the sensor saved no cars
- The average of the previous two hours
= No recording does not mean no traffic.

Q[transfer]: You compare morning and afternoon starts. How should a 09:00 booking that began at 13:00 be grouped under the lesson's rule?
P: Define the observation
* Morning, with its actual start and delay recorded
- Afternoon, because that is when it began
- Neither, because scheduled and actual times differ
= The planned time defines the comparison groups.

# Cards
What is a pilot? :: A small trial to find and fix collection problems before the main round.
When is a blank different from zero? :: A blank records an unknown or inapplicable value. Zero is an observed value.
What belongs in a correction log? :: Original value, replacement value and evidence for the change.

# Further
- Statistics Canada · Questions to ask about surveys :: https://www.statcan.gc.ca/en/customized-products-services/custom-surveys/questions-to-ask
- National Bureau of Statistics · Nigeria Labour Force Survey catalogue :: https://microdata.nigerianstat.gov.ng/index.php/catalog/152
