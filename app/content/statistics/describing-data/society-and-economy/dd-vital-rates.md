---
id: dd-vital-rates
pack: Describing Data · Society and economy
title: Rates and vital statistics
minutes: 45
source: World Bank · Nigeria infant mortality
url: https://data.worldbank.org/indicator/SP.DYN.IMRT.IN?locations=NG
courses: Describing Data · STA 111
format: 2
teaches: rates-and-exposure; crude-birth-rate; crude-death-rate; infant-mortality-rate
uses: counts; dd-official; dd-two-way; dd-chart-audit
---
# Goal
Calculate rates with the correct exposure, and distinguish crude birth, crude death and infant mortality measures.

# Why
The same event count can mean very different things in a small and a large population. Rates are comparable only when their denominators and reference periods match.

# Warm-up
?? Why can more cases mean a smaller proportion?
=> The total eligible population may have grown by more than the cases.

?? What must a chart axis name beside a reported number?
=> Its unit and, where relevant, the denominator scale.

# Lesson
## Define exposure and scale
A rate relates an event count to a defined population or amount of exposure in a stated period. It is often multiplied by a scale such as 1,000 to make the number easier to read. An invented service records 18 events over 3,000 person-days of exposure. Its rate is 18/3,000 × 1,000 = 6 events per 1,000 person-days. Person-days accumulate time: 30 people each observed for 100 days contribute 3,000 person-days if all are observed for the full period. Check the unit before comparing a number per person with a number per day.

A proportion counts qualifying units once among eligible units. Some event rates allow the same person to contribute several events. For example, a person can make more than one clinic visit during a year. The number of visits per 1,000 residents is not the percentage of residents who visited. If the decision is about people reached, count distinct people under a defined eligibility rule.

Always put numerator, denominator and scale into a complete sentence. “Six per 1,000” is ambiguous without the event and exposure. Keep the count and denominator as well as the rate, particularly for small groups where a single event can substantially move the figure.

## Distinguish three vital measures
Vital statistics describe events such as births and deaths. A **crude birth rate** uses live births during a year over the estimated midyear population, multiplied by 1,000. A **crude death rate** uses deaths during the year over that midyear population, also scaled per 1,000. In an invented district of 50,000 midyear residents with 1,500 live births and 400 deaths, these rates are 30 and 8 per 1,000 residents. Those are two different events with the same population scale.

An **infant mortality rate** describes the probability of dying before age one, expressed per 1,000 live births. Its denominator scale is live births, rather than all residents. Published national estimates can use demographic methods and multiple sources. Do not treat a published value as a raw count of same-year infant deaths divided by same-year births unless the release explicitly uses and labels that calculation. Children who die in one calendar year may have been born in the previous one.

Crude population rates can differ because of age structure. For example, a place with a higher proportion of older residents can have a higher crude death rate even when age-specific rates are similar. Compare age-specific figures when the question concerns risk at a given age. More advanced standardisation combines such rates with common weights.

## Read a real Nigerian series
The World Bank's World Development Indicators publish Nigeria's infant mortality series SP.DYN.IMRT.IN using estimates from the UN Inter-agency Group for Child Mortality Estimation. In the snapshot retrieved on 6 November 2026, Nigeria's values for 2020 and 2023 were 69.5 and 70.1 per 1,000 live births. Their difference is 0.6 per 1,000 live births. It is not 0.6 percentage points. A difference of 0.6 per 1,000 corresponds to 0.06 percentage points on a per-100 scale.

The chart below uses ten calendar-year estimates from that snapshot. These are national estimates, not ten raw samples of births and not figures for a particular clinic. The values do not rise every year. A change this small cannot be used alone to identify a cause or settle whether an underlying risk changed. Inspect the producer's uncertainty and estimation documentation before making a stronger claim.

For a transparent comparison, report the years, geography, indicator code, unit, snapshot date and arithmetic. If a later download differs, treat it as a separate version and check the source notes. If a reporter changes from a per-1,000 scale to a percentage, divide the displayed value by ten and label the new scale. The observed difference has not changed simply because its written number is smaller.

```chart
{"kind":"line","title":"Nigeria infant mortality estimates, 2014–2023","alt":"Values vary between 68 and 70.2 per 1,000 live births and end at 70.1","note":"World Bank WDI SP.DYN.IMRT.IN, UN IGME estimates, API snapshot 6 November 2026","xLabel":"Year","yLabel":"Per 1,000 live births","x":"year","y":"rate","data":[{"year":2014,"rate":68.1},{"year":2015,"rate":68},{"year":2016,"rate":68.1},{"year":2017,"rate":68.3},{"year":2018,"rate":68.7},{"year":2019,"rate":69.1},{"year":2020,"rate":69.5},{"year":2021,"rate":69.9},{"year":2022,"rate":70.2},{"year":2023,"rate":70.1}]}
```

# Exercises
?? A district of 20,000 residents records 500 live births in the year. Find its crude birth rate.
=> 500/20,000 × 1,000 = 25 live births per 1,000 midyear residents, if 20,000 is its estimated midyear population.

?? What does 70 per 1,000 live births correspond to as a percentage?
=> 7%.

# Practice
Read one Nigerian vital indicator's metadata and copy two comparable observations. Record the denominator, scale and source. Calculate the difference and write a caption that says what it measures without attributing a cause.

# Rubric
- I kept per-1,000 residents distinct from per-1,000 live births.
- I distinguished estimates from directly recorded events.
- I used compatible periods and units.

# Summary
- Every rate needs an event, eligible exposure, period and scale.
- Crude birth and death rates use midyear population; infant mortality is expressed per live births.
- A difference per thousand is different from a difference per hundred.

# Check
Q: What does an event rate need besides a numerator?
P: Define exposure and scale
* The eligible population or amount of exposure
- The arithmetic mean of the case labels
- The publication date alone without the period
= A rate relates events to a defined exposure.

Q: There are 18 events in 3,000 person-days. Find the rate per 1,000 person-days.
P: Define exposure and scale
A: 6 | 6 per 1000 person-days | 6 per 1,000 person-days
= 18/3000 × 1000 = 6.

Q: Why are clinic visits per resident not a percentage of residents served?
P: Define exposure and scale
* A person can contribute multiple visits
- Visit counts are always below the resident count
- The denominator cannot be expressed in residents
= An event and a unique person are different units.

Q: What denominator does the crude birth rate use?
P: Distinguish three vital measures
* Estimated midyear population
- Live births during the same year
- Number of births registered last month
= The crude rate is births per population.

Q: What denominator scale does infant mortality use?
P: Distinguish three vital measures
* Per 1,000 live births
- Per 1,000 midyear residents
- Per 1,000 clinic appointments
= It describes death before age one per live births.

Q: In 50,000 residents there are 400 deaths in a year. Find the crude rate per 1,000.
P: Distinguish three vital measures
A: 8 | 8 per 1000 | 8 per 1,000
= 400/50,000 × 1000 = 8.

Q: What is 70 per 1,000 as a percentage?
P: Read a real Nigerian series
A: 7% | 7 | 7 percent
= 70/1000 = 7/100.

Q: What does a rise from 69.5 to 70.1 per 1,000 equal on that scale?
P: Read a real Nigerian series
A: 0.6 | .6 | 0.60 | 0.6 per 1000 | 0.6 per 1,000
= Subtract to get 0.6 per 1,000 live births.

Q[transfer]: One place has a higher crude death rate and an older population. What improves the comparison?
P: Distinguish three vital measures
* Compare age-specific rates in comparable groups
- Assume its care quality must be worse
- Ignore population age and compare counts only
= The age mix can influence crude rates.

Q[transfer]: A report finds a small change in estimated infant mortality. What can you say from the two point estimates alone?
P: Read a real Nigerian series
* State the difference and note that uncertainty still matters
- Say exactly how many deaths an intervention caused
- Treat the estimates as complete counts of births
= A difference in estimates does not settle its cause or precision.

Q[transfer]: Two workplaces report incidents per worker and per worker-hour. Can their displayed rates be directly compared?
P: Define exposure and scale
* No, first use comparable exposure units
- Yes, the larger printed number always means higher risk
- Yes, provided each organisation uses the same font
= Per worker and per worker-hour are different measures.

# Cards
What is the denominator scale of infant mortality? :: Per 1,000 live births.
What population is used for a crude annual birth rate? :: Estimated midyear population.
What does person-time measure? :: The sum of exposure times contributed by observed people.

# Further
- World Bank · Nigeria infant mortality :: https://data.worldbank.org/indicator/SP.DYN.IMRT.IN?locations=NG
- World Bank · Nigeria series API :: https://api.worldbank.org/v2/country/NGA/indicator/SP.DYN.IMRT.IN?date=2014%3A2023&format=json
- World Bank · Crude birth rate definition :: https://databank.worldbank.org/metadataglossary/world-development-indicators/series/SP.DYN.CBRT.IN
