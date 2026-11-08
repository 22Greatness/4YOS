---
id: dd-official
pack: Describing Data · What data is
title: Where official data comes from
minutes: 45
source: National Bureau of Statistics · Nigeria Labour Force Survey catalogue
url: https://microdata.nigerianstat.gov.ng/index.php/catalog/152
courses: Describing Data · STA 111
format: 2
teaches: official-data-sources; statistical-metadata; reference-period; data-revisions
uses: sta-data; sample; dd-collect
---
# Goal
Trace an official number to its table, population and reference period. Tell a census, sample survey and administrative record apart.

# Why
Two numbers can both be published by trustworthy organisations and still describe different things. Knowing where they came from tells you what they can answer.

# Warm-up
?? What is a population in a study?
=> The complete set of eligible units that the study asks about.

?? What should you keep when you correct a data entry?
=> The original value, corrected value and reason for the change.

# Lesson
## How data are produced
A **census** attempts to observe every eligible unit in a defined population. A population census tries to cover people or households according to its census rules. A census can still miss some units or contain errors. “Everyone was intended to be covered” and “everyone was counted correctly” are different claims. A **sample survey** observes a selected part of the population. Official releases use a documented design and may weight observations so that sampled units contribute different amounts to the estimate. A simple count of rows in the survey file need not match a published national percentage.

An **administrative record** is created while providing a service or carrying out a rule. Birth registrations, examination records and clinic visits are examples. These records can measure activity among people reached by that system. They may miss events outside it. A record of births registered in April is not automatically a count of babies born in April. Registration may occur after a birth, and some births may never appear in the register. Check which date and which people the table counts before drawing a conclusion.

Sources can be combined. A population estimate can start from a census and use estimates of births, deaths and migration to estimate later years. An annual figure in the World Bank's Nigeria population series does not imply an annual head count. Read the indicator's source information and identify the observation as a count or an estimate in your notes.

## Read the release beside the number
Open the National Bureau of Statistics catalogue entry for the Nigeria Labour Force Survey. Follow its documentation or related materials to the release you want. The catalogue describes an actual survey series. A quarterly labour statistic refers to a particular reference period, even when its report was released much later. In a spreadsheet record the data period separately from the publication date. If you downloaded the file this morning, that is a third date and belongs in your source log.

**Metadata** are the details that make values interpretable. For each column write the measure, population, geography, units, time period, producer and release version. A published rate also needs a denominator. For example, an unemployment rate concerns the labour force as defined by the survey, rather than everyone living in the country. A percentage for the whole country and a percentage for one state also answer different questions. Their labels are part of the data.

The catalogue for the Nigeria Multidimensional Poverty Index links to the 2022 report and survey materials. A multidimensional measure uses specified indicators and rules about deprivation. A share classified by those rules cannot be treated as the share below an income threshold just because both have “poverty” in their name. Read the method section for the actual construction, and quote the report title rather than copying an unattributed screenshot.

### Worked example: logging one official number
Look up Nigeria's annual infant mortality indicator in World Development Indicators. Select the 2023 row. The World Bank API snapshot retrieved on 6 November 2026 lists 70.1. Save the number beside its definition rather than as a bare figure.

| Source-log field | What to record |
| --- | --- |
| Measure and code | Estimated probability of death before age one, SP.DYN.IMRT.IN |
| Population and scale | Per 1,000 live births |
| Geography | Nigeria, national estimate |
| Reference period | Calendar year 2023 |
| Version and retrieval | API metadata last updated 8 October 2026; retrieved 6 November 2026 |
| Producer and publisher | UN Inter-agency Group for Child Mortality Estimation; World Bank WDI |
| Source | World Bank indicator page linked below |

Read the final entry as “70.1 per 1,000 live births for Nigeria in 2023, in this dated estimate series.” It does not mean 70.1 individual deaths were counted, and it does not describe one clinic.

## Keep the series comparable
When you find two numbers, ask whether the concepts, dates, units and coverage match. An invented example makes the point. A register lists 240 certificates processed in April. A household survey estimates 300 births that occurred in April. It would be tempting to divide 240 by 300 and report 80% registration coverage. You cannot do that without knowing that the 240 certificates refer to births from the same eligible group and birth period. The numerator may include children born in March. Use a matched numerator or report the two figures separately.

Official series may be revised when more records arrive, coding is corrected, survey weights are updated or a method changes. Save the date and release identifier for the table you used. If a later release changes a value, document the replacement rather than averaging the two figures. Where a method changes, check whether the producer supplies a revised historical series or a warning against direct comparison. Use one comparable release if you can. If not, mark the break and limit the claim.

To make a number findable, write down its exact table or indicator, row and column, geography, unit, reference period, release date if shown and URL. For a public exercise you can save the public extract locally. Avoid including private microdata in a report. Then put the number into one sentence that says what it measures and what it cannot establish. This is more useful than a citation floating beside an unlabelled chart.

# Exercises
?? A headline quotes the value 70.1 but leaves off “per 1,000 live births.” What should you restore?
=> The rate's denominator scale, population, geography and reference period. The bare number does not identify a count or percentage.

?? A report is released in November and describes July to September. Which quarter does the value belong to?
=> July to September, the third quarter. November is the release month.

?? An agency revises an old estimate. What should a report record?
=> The revision or release used, and how it differs from the previously cited value.

# Practice
Open one of the Nigerian public releases below. Copy one aggregate value with its table name, row, column and unit. Write the producer, reference period and release version, if available. Find the source method in the documentation. Explain in two sentences what the value counts or estimates and who or what it leaves out.

# Rubric
- I can return to the exact table or indicator.
- I separated the reference period from the publication date.
- My description uses the source's population and units.

# Summary
- A census attempts full coverage, a survey samples, and administrative data reflect a system's records.
- Metadata tell you which population, unit and period a number describes.
- Compare like with like and record versions or breaks.

# Check
Q: What distinguishes a census by design?
P: How data are produced
* It attempts to cover every eligible unit
- It selects an equal number in each district
- It records whoever visits a service office
= A census aims for complete coverage, although actual coverage can differ.

Q: Which is an administrative record?
P: How data are produced
* Birth registrations logged by a registry
- Interviews with a sampled set of households
- A count conducted by visiting every dwelling
= Registration records are produced through a service.

Q: Why might a survey's published share differ from its raw row share?
P: How data are produced
* The estimate can use sampling weights and eligibility rules
- A share is calculated without any denominator
- Each published share must equal the raw number of rows
= Published estimates follow the survey's documented method.

Q: A report released in May describes January to March. What is the reference period?
P: Read the release beside the number
* January to March, the period described
- May, the month the report appeared
- The date you downloaded the document
= Release and reference dates are separate fields.

Q: A percentage is reported without the eligible population. What should you find?
P: Read the release beside the number
* The denominator definition in the metadata
- The first date the web page was visited
- A second percentage of a different population
= The denominator tells you whom the proportion describes.

Q: What can you infer from the name 'poverty measure' alone?
P: Read the release beside the number
* Too little to know the rules used to classify people
- That the measure always uses a fixed income threshold
- That two releases using that word must have the same method
= Read the metadata for the definition.

Q: Why preserve the publication version?
P: Keep the series comparable
* Later releases may revise values or definitions
- The publication month sets the denominator size
- Every revision makes the earlier release fraudulent
= Versions let readers reconstruct the original comparison.

Q: What is the first check when combining two series?
P: Keep the series comparable
* The measures, units, dates and populations are comparable
- Both tables have the same number of columns
- Both reports have the same heading font
= Matching structure cannot substitute for comparable definitions.

Q[transfer]: Two releases report different estimates for the same period. How should you proceed?
P: Keep the series comparable
* Find the reason, select a version and document it
- Average the two numbers and discard their dates
- Use the higher estimate since it contains more information
= A revision can reflect a changed method or new information.

Q[transfer]: A registry processes 240 certificates in April. Can you treat that as the number of births in April?
P: How data are produced
* Only if the records identify the same birth period and coverage
- Yes, because both records are about births
- Yes, provided the certificates all have a processing date
= Processing dates can differ from dates of birth.

Q[transfer]: A screenshot shows an official number with no period or geography. What should you do before quoting it?
P: Read the release beside the number
* Locate the original table and copy the missing context
- Assume it refers to the most recent national quarter
- Estimate its period from the colour of the graph
= The value needs traceable context.

# Cards
What is the reference period? :: The time the observation describes.
Why may survey file counts differ from published estimates? :: The published estimate may use survey weights and eligibility rules.
Why keep the release version? :: A later release can revise a value or change its method.

# Further
- World Bank · Nigeria infant mortality series :: https://data.worldbank.org/indicator/SP.DYN.IMRT.IN?locations=NG
- National Bureau of Statistics · Nigeria Labour Force Survey catalogue :: https://microdata.nigerianstat.gov.ng/index.php/catalog/152
- National Bureau of Statistics · Multidimensional Poverty Index report and materials :: https://microdata.nigerianstat.gov.ng/index.php/catalog/71/related-materials
- World Bank · Population, total, Nigeria :: https://data.worldbank.org/indicator/SP.POP.TOTL?locations=NG
