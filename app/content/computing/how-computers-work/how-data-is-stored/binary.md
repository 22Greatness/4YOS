---
id: binary
pack: How computers work
title: How computers represent numbers
minutes: 45
source: Harvard CS50's Understanding Technology · Hardware · CC BY-NC-SA 4.0
url: https://cs50.harvard.edu/technology/notes/1/
courses: UNIPORT (expected) COS 101, CSC 101, IFT 211 · NOUN COS101
lecture: yes
credit: Harvard CS50 · David J. Malan
start: 9
end: 321
python: yes
---
# Goal
Convert whole numbers between binary and decimal by hand in both directions, work out how many values a number of bits can hold, and explain how the same bits can mean a number or a letter.

# Why
Binary questions appear in first-year computing exams, and the idea runs through everything afterwards. Bits explain why a file is the size it is, why your 500 GB drive shows less in Windows, how colours and text are stored, how IP addresses and subnet masks work, and why a program can overflow. In security and networking you will read bits for real, so this needs to be automatic and not just understood once.

# Lesson
## Place value, in the system you already know
> Clip: The video teaches place value and binary counting up to 6. It stops part way through counting to 7, so this lesson finishes that and adds conversion, bytes and text.

You read 305 without thinking, but look at what it means. Each position has a value, and each position is worth ten times the one to its right.

| Place value | 100 | 10 | 1 |
| --- | --- | --- | --- |
| Digit | 3 | 0 | 5 |
| Contribution | 300 | 0 | 5 |

Add the contributions and you get 305. This is base 10, or **decimal**. It has ten digits, 0 to 9, and the place values are powers of 10: 1, 10, 100, 1000.

Nothing about this needs ten. Humans probably chose it because of fingers. A computer's circuits work best with two clearly different states, on and off, so it uses two digits.

## Binary uses powers of two
In base 2, or **binary**, the only digits are 0 and 1. A single binary digit is a **bit**. Each position is worth twice the one to its right.

| Power | 2^7 | 2^6 | 2^5 | 2^4 | 2^3 | 2^2 | 2^1 | 2^0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Place value | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

Learn this row by heart, because you will use it for years. To read a binary number, write it under the place values and add those with a 1.

### Worked example: binary to decimal
Try it first. Press the bits below to turn them on and off, and watch the total change.

```diagram
{"kind":"bits","alt":"Eight binary digits you can switch on and off, with place values 128 down to 1 and the decimal total shown beneath.","bits":8,"value":"00101101"}
```

Now convert `101101` to decimal. It has six digits, so the places are 32, 16, 8, 4, 2, 1.

| Place value | 32 | 16 | 8 | 4 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- |
| Bit | 1 | 0 | 1 | 1 | 0 | 1 |
| Contribution | 32 | 0 | 8 | 4 | 0 | 1 |

32 + 8 + 4 + 1 = **45**.

Always line up from the right. The rightmost bit is always worth 1, however long the number is. Here is the count the video begins, carried further:

| Decimal | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Binary | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 | 1000 |

?? What is `1010` in decimal?
=> Places 8, 4, 2, 1. 8 + 2 = 10.

## Decimal to binary
Use repeated subtraction. Find the largest place value that fits, write a 1 there, subtract, and carry on with what remains. Every place you skip gets a 0.

### Worked example: decimal to binary
Convert 37.

| Place value | Does it fit in what remains? | Bit | Remaining |
| --- | --- | --- | --- |
| 32 | Yes, 37 is at least 32 | 1 | 5 |
| 16 | No | 0 | 5 |
| 8 | No | 0 | 5 |
| 4 | Yes | 1 | 1 |
| 2 | No | 0 | 1 |
| 1 | Yes | 1 | 0 |

Read the bits from top to bottom: **100101**. Now check by going back: 32 + 4 + 1 = 37. Always check, because it takes seconds and catches most slips.

> Mistake: Leaving out a 0 for a place you skipped. 37 is `100101`, not `1111`. Writing out all the place values first stops this happening.

Some textbooks, including course material you may be given, teach another way: divide by 2 repeatedly and read the remainders from bottom to top. It gives the same answer. For 37 the remainders are 1, 0, 1, 0, 0, 1 from first to last, and reading them backwards gives 100101. Use whichever your lecturer expects in an exam, and use the other to check.

## How much can bits hold?
Each extra bit doubles the number of patterns, so **n bits give 2^n different values**. With 3 bits there are 8 patterns, 000 to 111, which count from 0 to 7. The largest value is always one less than the number of patterns, because one pattern is used for 0.

Eight bits make a **byte**, the basic unit of size in computing.

| Bits | Patterns | Unsigned range | Where you meet it |
| --- | --- | --- | --- |
| 1 | 2 | 0 to 1 | Yes or no |
| 4 | 16 | 0 to 15 | One hexadecimal digit |
| 8 | 256 | 0 to 255 | One byte, each part of an IPv4 address |
| 16 | 65,536 | 0 to 65,535 | Network port numbers |
| 32 | 4,294,967,296 | 0 to 4,294,967,295 | An IPv4 address |

So when a later lesson shows an address like 192.168.1.10, you will know why no part is above 255. Each part is one byte.

**Unsigned** means every pattern counts as zero or above. Computers can also store negative numbers using an agreed pattern, called two's complement, which you will meet in a later course. A fixed number of bits can run out, too. In 8 unsigned bits, 255 is `11111111`, and adding 1 needs a ninth bit. If there is nowhere to put it, the value wraps to 0. This is **overflow**, and it has caused real software failures.

### File sizes
A kilobyte is about a thousand bytes, a megabyte about a million, a gigabyte about a billion. Drive makers count in exact powers of 1000, while Windows measures in powers of 1024 and still writes GB. A "500 GB" drive holds 500,000,000,000 bytes. Divide by 1024 three times and you get about 465.7, so Windows reports roughly 465 GB. No space is missing. Two different units are sharing a name.

Network speeds are normally in bits, and file sizes in bytes. A 10 megabit per second line moves at most 1.25 megabytes per second, because you divide by 8. That is worth remembering when you plan a download on paid data.

## The same bits can mean different things
Bits have no meaning of their own. Meaning comes from how a program agrees to read them. The byte `01000001` is the number 65, and under the ASCII and Unicode text standards, 65 is also the capital letter A.

| Pattern | As a number | As a character |
| --- | --- | --- |
| `01000001` | 65 | A |
| `01000010` | 66 | B |
| `01100001` | 97 | a |

Colours work the same way. A screen colour is commonly three bytes, for red, green and blue, each from 0 to 255. Images, sound and programs are all just long runs of bits, read according to an agreed format.

This is why a file with the wrong extension opens as nonsense. The bits are fine, but the program is reading them under the wrong agreement.

You can check all of this in Python, which you will use soon:

```python
print(bin(37))
print(int("101101", 2))
print(ord("A"))
print(2 ** 8)
```

```output
0b100101
45
65
256
```

The `0b` at the front is just Python's way of marking a binary number.

# Exercises
?? Convert `110010` to decimal.
=> Places 32, 16, 8, 4, 2, 1. 32 + 16 + 2 = 50.

?? Convert 90 to binary.
=> 64 fits, leaving 26. 32 does not fit. 16 fits, leaving 10. 8 fits, leaving 2. 4 does not fit. 2 fits, leaving 0. 1 does not fit. That gives `1011010`. Check: 64 + 16 + 8 + 2 = 90.

?? What is the largest unsigned value in 6 bits?
=> 2^6 is 64 patterns, so the largest is 63, which is `111111`.

?? Add a 0 to the right of binary `101`. What happens to its value?
=> `101` is 5 and `1010` is 10. Adding a 0 on the right doubles it, the same way adding a 0 on the right of a decimal number multiplies by 10.

?? A download is 300 MB, and your line manages 2 megabits per second. Roughly how long will it take?
=> 2 megabits per second is 0.25 megabytes per second. 300 divided by 0.25 is 1200 seconds, which is 20 minutes.

# Practice
Use real numbers from your own life, on paper, with no calculator or Python until the last step.

1. Pick three real numbers below 256: for example your age, the number of courses you are taking this semester, and how many files are in a folder.
2. Convert each to binary using the repeated subtraction table.
3. Check each one by adding the place values back up.
4. Write your first name's first letter's ASCII code by counting from A = 65 or a = 97, then convert that to binary.
5. Now check all of it in the Python box below. Change the numbers in brackets to yours, and press **Run Python**. It is fine if you made a slip, as long as you find where.

Record your numbers, your binary answers and any mistake you caught.

# Starter
```python
# Change 37 to your own number, then press Run Python
print(bin(37))
# Change 65 to the code for your letter
print(bin(65))
```

# Rubric
- I converted three real numbers by hand before checking with Python.
- I checked each answer by converting it back.
- I can write the place values from 128 down to 1 from memory.

# Summary
- Binary is place value with powers of two: 128, 64, 32, 16, 8, 4, 2, 1.
- Read binary by adding the places holding a 1. Convert to binary by repeated subtraction, then check.
- n bits give 2^n patterns, so the largest unsigned value is 2^n minus 1. 8 bits give 0 to 255.
- Eight bits are a byte. File sizes use bytes and network speeds use bits, so divide by 8.
- Bits only mean something under an agreed format: 65 and the letter A can be the same byte.

# Check
Q: What is the decimal value of unsigned binary `10110`?
A: 22
= The places holding a 1 are 16, 4 and 2, which add to 22.

Q: What is the decimal value of unsigned binary `11001`?
A: 25
= The places holding a 1 are 16, 8 and 1, which add to 25.

Q: What is 29 in binary? Answer with no leading zeros.
A: 11101
= 16 + 8 + 4 + 1 = 29. The 2 place is skipped, so it holds a 0.

Q: What is 44 in binary? Answer with no leading zeros.
A: 101100
= 32 + 8 + 4 = 44. The 16, 2 and 1 places hold 0.

Q: How many different patterns can 5 bits make?
A: 32
= Each bit doubles the patterns, so 5 bits give 2^5 = 32.

Q: What is the largest unsigned number that fits in 7 bits?
A: 127
= 7 bits give 128 patterns, and one is used for 0, so the largest value is 127.

Q: How many bits are in a byte?
A: 8 | eight
= A byte is 8 bits, which is why one byte can hold 0 to 255.

Q: You put a 0 on the right end of a binary number. What happens to its value?
- It stays the same
- It gets one larger
* It doubles
= Every bit moves to a place worth twice as much. A 0 on the left would leave the value unchanged.

Q: An unsigned 8-bit counter holds 255 and 1 is added. With nowhere to store a ninth bit, what does it hold now?
A: 0 | zero
= `11111111` plus 1 needs nine bits. The ninth is lost and the eight kept are all 0. This is overflow.

Q[transfer]: Your internet plan advertises 8 megabits per second. At best, how many megabytes could arrive each second?
A: 1 | 1 mb | 1 megabyte | one | 1 mb/s | 1 megabyte per second | 1 mb per second | 1 mbps
= Network speeds are in bits and file sizes in bytes. 8 bits make a byte, so divide by 8.

Q[transfer]: A subnet mask uses a part written as 255. Why is 256 impossible in that part of an IPv4 address?
- Network engineers chose 255 as a lucky number
* Each part is one byte, and 8 bits only reach 255
- Routers cannot count above 100
= Each part of an IPv4 address is 8 bits, so its values run from 0 to 255.

Q[transfer]: A program reads the byte `01000001` and shows the letter A. Another program reads the same byte and shows 65. Which is true?
- One of the programs must be broken
- The byte changed between the two programs
* Both can be right, because meaning depends on the format the program uses
= Bits have no meaning on their own. The same byte is 65 as a number and A as text.

# Cards
What are the place values of an 8-bit binary number, left to right? :: 128, 64, 32, 16, 8, 4, 2, 1.
How many patterns do n bits make, and what is the largest unsigned value? :: 2^n patterns. The largest value is 2^n minus 1.
How do you convert decimal to binary by subtraction? :: Take the largest place that fits, write a 1, subtract, repeat, and write 0 in every skipped place. Then check by adding back.
Why does a 500 GB drive show about 465 GB in Windows? :: The maker counts in powers of 1000, and Windows measures in powers of 1024.
How do you turn megabits per second into megabytes per second? :: Divide by 8.
Why can one byte be both 65 and the letter A? :: Bits have no meaning alone. It depends on the format a program reads them under.

# Further
- Harvard CS50's Understanding Technology, Hardware notes :: https://cs50.harvard.edu/technology/notes/1/
- Python documentation, built-in functions bin, int and ord :: https://docs.python.org/3/library/functions.html
