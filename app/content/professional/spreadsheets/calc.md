---
id: calc
pack: Stage 0 · Spreadsheets
title: Build a working spreadsheet in Calc
minutes: 50
source: LibreOffice Help · Referencing a cell in another sheet
url: https://help.libreoffice.org/latest/en-US/text/scalc/guide/cellreferences.html
courses: UNIPORT (expected) CSC 182.2, GES 101.2 · NOUN GST103
---
# Goal
Build a small spreadsheet from real data in LibreOffice Calc, using formulas, relative and absolute references, the main summary functions, and a link between two sheets.

# Why
Spreadsheets are the most directly useful skill in this first stage. They're what you will use to track your two degrees and your money, and data-assistant and virtual-assistant work uses them constantly, which is one of your earliest ways to earn. The thinking also transfers: cells and references prepare you for variables, and a clean table is exactly how data is organised in statistics and databases.

# Lesson
## Cells, addresses and values
> Note: This uses LibreOffice Calc, which is free. Almost everything here works the same in Excel and Google Sheets, with one difference, shown below, in how you refer to another sheet.

A sheet is a grid. Columns are lettered and rows are numbered, so **B2** means column B, row 2. A cell holds one of three things.

| A cell holds | Example | Notes |
| --- | --- | --- |
| Text | `Transport` | Aligns left by default |
| A number | `1500` | Aligns right by default. Dates are numbers too |
| A formula | `=B2+B3` | Starts with `=`, and the cell shows the result |

The alignment gives you a useful check. If a number sits on the left, Calc may be treating it as text, so sums will quietly ignore it.

> Mistake: Typing `N1,500` or `1500 naira` into a cell makes it text, so it won't add up. Type `1500`, and use the cell's number format to show a currency symbol if you want one.

## Formulas calculate from other cells
Every formula starts with an equals sign. The standard operators are `+`, `-`, `*` for multiply, `/` for divide and `^` for power. Calc follows the normal order of operations, so use brackets to make your meaning clear: `=(B2+B3)*0.1`.

The whole point is to refer to cells, not to retype values. If B2 holds 1500 and B3 holds 800, then `=B2+B3` gives 2300. Change B2 to 2000, and the answer becomes 2800 straight away. Never type `=1500+800`, because then nothing updates, and nobody can see where the number came from.

## Functions summarise a range
A **range** is a block of cells, written with a colon. `B2:B6` means B2 through B6. Functions take a range and return a result.

| Function | What it gives | Example |
| --- | --- | --- |
| `SUM` | The total | `=SUM(B2:B6)` |
| `AVERAGE` | The mean | `=AVERAGE(B2:B6)` |
| `MIN` and `MAX` | The smallest and largest | `=MAX(B2:B6)` |
| `COUNT` | How many cells hold numbers | `=COUNT(B2:B6)` |
| `COUNTA` | How many cells aren't empty | `=COUNTA(A2:A6)` |
| `COUNTIF` | How many meet a condition | `=COUNTIF(C2:C6;"Food")` |
| `SUMIF` | The total for rows meeting a condition | `=SUMIF(C2:C6;"Food";B2:B6)` |
| `IF` | One of two results | `=IF(B2>1000;"High";"OK")` |

> Note: Calc separates function arguments with a semicolon by default, and Excel in many regions uses a comma. If a formula copied from elsewhere fails, try switching.

Blank cells are skipped by `AVERAGE`, so an empty cell isn't treated as zero. Decide on purpose what a missing value means, because it changes the average.

## Copying formulas: relative and absolute references
This is the most important idea in spreadsheets. When you copy a formula, its references shift. `=B2*C2` copied one row down becomes `=B3*C3`. This is a **relative reference**, and it's what lets one formula fill a thousand rows. To copy it, drag the small square at the corner of the selected cell.

Sometimes one reference must not move. Put `$` before the part to lock. `$F$1` is an **absolute reference**.

### Worked example: share of total
You want each expense as a percentage of the total, with the total in B7.

| | A | B | C |
| --- | --- | --- | --- |
| 1 | Item | Cost | Share |
| 2 | Food | 12000 | `=B2/$B$7` |
| 3 | Transport | 6000 | `=B3/$B$7` |
| 4 | Data | 4000 | `=B4/$B$7` |
| 5 | Printing | 2000 | `=B5/$B$7` |
| 6 | Books | 6000 | `=B6/$B$7` |
| 7 | Total | `=SUM(B2:B6)` | |

The total is 30000, so Food is 12000 / 30000, or 40%. Copying down moves `B2` to `B3`, as you want, while `$B$7` stays pointing at the total. Without the dollar signs it would slide to B8, an empty cell, and you would get `#DIV/0!`.

| Written as | What stays fixed when copied |
| --- | --- |
| `B7` | Nothing |
| `$B$7` | Column and row |
| `$B7` | Column only |
| `B$7` | Row only |

In Calc, select a reference in the formula and press **Shift + F4** to cycle through these.

?? `=A1+$B$1` is in C1. You copy it to C2. What does it become?
=> `=A2+$B$1`. The relative A1 moves down a row, and the absolute `$B$1` stays.

## Linking between sheets
Keep raw data on one sheet and summaries on another. In Calc's default syntax you write the sheet name, a dot and the cell.

```text
=Costs.B7
```

Calc may display this as `=$Costs.B7`, which means the same thing. If a sheet's name has spaces, wrap it in single quotes: `='School Costs'.B7`. In Excel and Google Sheets, the same link is `=Costs!B7`. The easy way to write it in any of them is to type `=`, click the other sheet's tab, click the cell and press Enter. The linked cell then updates whenever the source changes.

## When formulas go wrong
| You see | It means | Check |
| --- | --- | --- |
| `#DIV/0!` | Dividing by zero or by an empty cell | The denominator, or a reference that slid when copied |
| `#NAME?` | Calc doesn't recognise a word | Spelling of the function or sheet name |
| `#REF!` | A referenced cell no longer exists | Whether you deleted a row or sheet |
| `#VALUE!` | The wrong type of value | Numbers stored as text |
| `###` | Column too narrow | Just widen the column |

## Keep your data clean
Good habits here are the same ones you will use in databases and statistics.

- One table, with a single header row, and one kind of thing per column.
- One row per item. Never leave blank rows inside the data.
- Don't merge cells in a data table, as it breaks sorting and formulas.
- Keep raw data separate from calculations.
- Dates in one consistent format, such as `2026-11-05`.

Press **Ctrl + S** often, and save as `.ods`, or `.xlsx` if you need to share with Excel users.

# Exercises
?? B2 holds 200 and B3 holds 50. What does `=B2/B3+1` give?
=> 5. The division happens first, 200 / 50 = 4, then adding 1 gives 5.

?? `=SUM(A1:A4)` returns less than you expect, and one number in the column sits on the left of its cell. What's the likely cause?
=> That number is stored as text, so SUM ignores it. Retype it as a plain number.

?? Column C holds categories. Write a Calc formula to count the cells in C2:C50 that say Data.
=> `=COUNTIF(C2:C50;"Data")`

?? A column of 5 cells holds 10, 20, 30, a blank and 40. What does AVERAGE return?
=> 25. The blank is skipped, so it's 100 / 4. If that blank should have been zero, the answer should be 20, so missing values need a decision.

# Practice
Build a real tracker using your own numbers. If you don't have LibreOffice yet, get it free from libreoffice.org. Keep this file in your own folders, because it doesn't need to go anywhere else.

1. Create a sheet called `Costs`. Enter at least six real monthly costs you actually have, with an item, an amount and a category in separate columns. If you don't know a real figure yet, leave that row out rather than making one up.
2. Add a total with `SUM`, and the largest cost with `MAX`.
3. Add a Share column using an absolute reference to your total, and format it as a percentage.
4. Use `SUMIF` to total one category.
5. Create a second sheet called `Summary` that links to your total with `=Costs.B8`, adjusted to your real cell.
6. Change one amount on `Costs` and confirm the `Summary` updates.

Describe what you built and what surprised you. You don't need to include your actual figures here.

# Rubric
- It uses my own real figures, with none made up.
- I used an absolute reference, and copied the formula down so that it worked in every row.
- I changed a source value and saw the linked result change.

# Summary
- Formulas start with `=` and should refer to cells, not retype values.
- A left-aligned number may be text, which sums will ignore.
- Relative references move when copied, while `$` locks them. Use `$B$7` for a fixed total.
- `SUM`, `AVERAGE`, `MAX`, `MIN`, `COUNT`, `COUNTIF`, `SUMIF` and `IF` cover most everyday work.
- In Calc, link another sheet with `=Sheet.B2`. In Excel, it's `=Sheet!B2`.
- One table, one header row, one kind of thing per column.

# Check
Q: In Calc's default formula syntax, which formula links to B2 on the sheet named Costs?
* `=Costs.B2`
- `Costs.B2`
- `=B2.Costs`
= The equals sign starts the formula, and the sheet name comes before the dot and the cell.

Q: `=B2*C2` is in D2 and you copy it down to D3. What does it become?
- `=B2*C2`
* `=B3*C3`
- `=B3*C2`
= Relative references shift with the copy.

Q: `=B2/$B$10` is in C2 and you copy it to C5. What does it become?
- `=B2/$B$10`
* `=B5/$B$10`
- `=B5/$B$13`
= The relative B2 moves down three rows. `$B$10` is locked.

Q: A cell shows `#DIV/0!` after you copy a formula down. Which is the most likely cause?
- The column is too narrow to display the whole number
* The denominator slid to an empty cell
- The function name is misspelled somewhere in the formula
= An unlocked reference moves when copied and can land on a blank. Use an absolute reference.

Q: You type `N1,500` into a cell. What's the problem?
* It's text, so sums ignore it
- The cell will be deleted the next time you save
- It will be multiplied by a hidden exchange rate
= Type a plain number, and use number formatting to display a currency.

Q: Which formula counts how many cells in C2:C20 say Food?
- `=COUNT(C2:C20)`
- `=SUM(C2:C20;"Food")`
* `=COUNTIF(C2:C20;"Food")`
= COUNT only counts numbers, and COUNTIF counts cells that meet a condition.

Q: A column holds 10, 20 and an empty cell. What does AVERAGE return?
A: 15
= The blank is skipped, so it's 30 / 2. It isn't treated as zero.

Q: A cell shows `###`. What should you do?
- Delete the row, since the data in it is corrupt
- Rewrite the formula using absolute references
* Widen the column
= `###` only means the value doesn't fit in the column's width.

Q[transfer]: You're asked to clean a client's sheet. Amounts in one column sit on the left, and the total at the bottom looks too low. What do you suspect first?
- The total formula is using too large a range of cells
* Some amounts are stored as text
- The sheet needs more colours so that the errors stand out
= Left alignment is the clue. Text doesn't get summed, and no error appears, which makes this dangerous.

Q[transfer]: Your budget has rates in column B and one VAT rate in cell F1. You write `=B2*F1` and copy it down. Row 2 is right, and every other row is wrong. What's the fix?
* Change it to `=B2*$F$1`
- Change it to `=$B$2*F1` in every row
- Type the VAT rate as a number in each formula
= The reference to the single rate must stay fixed while the row reference moves.

Q[transfer]: You analyse a table in which monthly totals are typed by hand in the middle of the data rows. What will go wrong when you sum or sort the column?
* Totals get counted as data, and sorting scatters them
- Nothing, because Calc can always recognise a total row by itself
- Calc will refuse to open a file that is laid out in this way
= Keep raw data apart from calculations. Otherwise summaries get double counted.

# Cards
What's the difference between B7 and $B$7 when copied? :: B7 moves with the copy. $B$7 stays pointing at the same cell.
How do you link to B2 on a sheet named Costs in Calc, and in Excel? :: Calc: =Costs.B2. Excel: =Costs!B2.
What does a left-aligned number usually warn you about? :: It may be stored as text, so sums will ignore it, with no error shown.
What does AVERAGE do with an empty cell? :: It skips it. It doesn't treat it as zero.
What does #DIV/0! usually mean after copying a formula? :: A denominator is zero or empty, often because a reference slid when copied.

# Further
- LibreOffice Help, referencing a cell in another sheet :: https://help.libreoffice.org/latest/en-US/text/scalc/guide/cellreferences.html
- LibreOffice Calc function list :: https://help.libreoffice.org/latest/en-US/text/scalc/01/04060100.html
- LibreOffice free download :: https://www.libreoffice.org/download/download-libreoffice/
