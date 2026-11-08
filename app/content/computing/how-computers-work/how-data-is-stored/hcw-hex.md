---
id: hcw-hex
pack: How Computers Work · How data is stored
title: Hexadecimal and how sizes work
minutes: 45
source: David J. Malan · Harvard CS50's Understanding Technology · Multimedia
url: https://cs50.harvard.edu/technology/weeks/3/
courses: Helps with COS 101, IFT 211, CSC 101
video: https://cdn.cs50.net/cscie1a/2017/fall/lectures/multimedia/multimedia-360p.mp4
credit: Harvard CS50 · David J. Malan
start: 610.5
end: 767
python: yes
---
# Goal
Convert between binary, hexadecimal and decimal by hand, explain why programmers use hexadecimal, and work out real file sizes and download times.

# Why
Long binary numbers are nearly impossible for a person to read. Hexadecimal is how you'll actually see bits: in colour codes, memory addresses, IPv6 addresses, hashes and security tools. It's on first-year exams, and you'll meet it for the rest of your career. Sizes are just as practical, because they tell you what a download will cost in data, and whether it fits.

# Lesson
## The problem with binary
> Clip: David Malan introduces hexadecimal's 16 digits and how one hex digit stands for four bits, using colours as the example. Sizes and conversion practice come from this lesson.

Humans misread long strings of 0s and 1s. Is `1011011011100011` the same as `1011011011100111`? You had to look hard. Decimal would be shorter, but it doesn't line up neatly with bits. **Hexadecimal**, or **hex**, solves both problems.

## Sixteen digits
Hex is base 16. It needs sixteen digits, so after 9 it borrows letters.

| Decimal | Binary | Hex | | Decimal | Binary | Hex |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0000 | 0 | | 8 | 1000 | 8 |
| 1 | 0001 | 1 | | 9 | 1001 | 9 |
| 2 | 0010 | 2 | | 10 | 1010 | A |
| 3 | 0011 | 3 | | 11 | 1011 | B |
| 4 | 0100 | 4 | | 12 | 1100 | C |
| 5 | 0101 | 5 | | 13 | 1101 | D |
| 6 | 0110 | 6 | | 14 | 1110 | E |
| 7 | 0111 | 7 | | 15 | 1111 | F |

The key fact: **one hex digit is exactly four bits**, because 2^4 = 16. So a byte, which is 8 bits, is always exactly two hex digits. That's why hex is so convenient.

To show that a number is hex and not decimal, people write `0x` in front (`0x2F`), or `#` for colours. Otherwise `10` could mean ten or sixteen. Upper and lower case letters mean the same.

## Converting
### Binary to hex
Split into groups of four from the **right**, then replace each group.

```text
1011 0110  ->  B 6  ->  0xB6
```

If the leftmost group is short, add zeros on the left: `101101` becomes `0010 1101`, which is `0x2D`.

### Hex to binary
Replace each hex digit with its four bits.

```text
0x3F  ->  0011 1111
```

### Hex to decimal
Place values are powers of 16: 1, 16, 256.

```text
0x2F = (2 x 16) + (15 x 1) = 32 + 15 = 47
0xFF = (15 x 16) + 15 = 240 + 15 = 255
```

### Decimal to hex
Divide by 16. The result is the left digit, and the remainder is the right digit, for numbers under 256.

```text
200 / 16 = 12 remainder 8  ->  C and 8  ->  0xC8
```

Check by going back: (12 x 16) + 8 = 200. Python confirms:

```python
print(hex(200))
print(int("2F", 16))
print(bin(0xB6))
print(f"{255:02X}")
```

```output
0xc8
47
0b10110110
FF
```

> Mistake: Reading a letter as its own value. In `0x1A`, the A means 10, so it's 16 + 10 = 26. And `0x10` isn't ten. It's sixteen.

?? What's `0xA3` in decimal? And in binary?
=> (10 x 16) + 3 = 163. In binary, A is 1010 and 3 is 0011, so it's 1010 0011.

## Where you'll see hex
| Place | Example | Meaning |
| --- | --- | --- |
| Colours | `#FF0000` | Three bytes: red FF, green 00, blue 00. So pure red |
| Hashes | `3a7bd3e2...` | A hash is a short fingerprint calculated from a file. This one is 32 bytes, shown as 64 hex digits |
| IPv6 addresses | `2001:db8::1` | Written in hex |
| Network cards | `3C:52:82:1F:9A:07` | A MAC address, 6 bytes |
| Memory | `0x7FFE1234` | A location in memory |
| File contents | `25 50 44 46` | The first bytes of a PDF, which spell %PDF |

Those last bytes are how forensic tools recognise a file's true type, whatever its extension says.

## Sizes
A **byte** is 8 bits. Larger sizes use prefixes.

| Name | Written | Decimal meaning | Rough idea |
| --- | --- | --- | --- |
| Kilobyte | KB | 1,000 bytes | A short text file |
| Megabyte | MB | 1,000,000 bytes | A photo or a minute of music |
| Gigabyte | GB | 1,000,000,000 bytes | A long film in decent quality |
| Terabyte | TB | 1,000,000,000,000 bytes | A large drive |

Computers count naturally in powers of 2, so there's also a binary set: a **kibibyte (KiB)** is 1,024 bytes, a **mebibyte (MiB)** is 1,024 KiB, and a **gibibyte (GiB)** is 1,024 MiB.

| Who uses it | Counts in | Example |
| --- | --- | --- |
| Drive makers | Powers of 1000 | "500 GB" = 500,000,000,000 bytes |
| Windows | Powers of 1024, but writes "GB" | The same drive shows about 465 GB |
| Memory makers | Powers of 1024 | "16 GB RAM" is 16 GiB |

> Note: **B** means bytes and **b** means bits. A 20 Mbps connection means 20 mega**bits** per second, which is 2.5 mega**bytes** per second at best, as you divide by 8.

### Worked example: how long will it take?
A 1.5 GB download on a 10 Mbps connection:

1. Convert the file to megabits: 1.5 GB = 1,500 MB, and 1,500 x 8 = 12,000 megabits.
2. Divide by the speed: 12,000 / 10 = 1,200 seconds.
3. Convert: 1,200 / 60 = 20 minutes.

That's a best case, because real connections are often slower.

# Exercises
?? Convert `1111 0000` to hex.
=> F and 0, so `0xF0`.

?? Convert `0x7C` to decimal.
=> (7 x 16) + 12 = 112 + 12 = 124.

?? Convert 90 to hex.
=> 90 / 16 = 5 remainder 10. So 5 and A, which is `0x5A`.

?? What colour is `#00FF00`?
=> Red 00, green FF, blue 00, so bright green.

?? A 700 MB file on a 5 Mbps connection. How many minutes at best?
=> 700 x 8 = 5,600 megabits. 5,600 / 5 = 1,120 seconds, about 18.7 minutes.

# Practice
1. By hand, convert your age, your birth day and the number of courses you take into both binary and hex. Check each by converting back.
2. Choose a colour you like. Find its hex code in any drawing program or by searching, split it into its three bytes, and convert each to decimal. Say which colour is strongest.
3. Find the largest file in your Downloads folder. Right-click it and open **Properties**, and note its size in bytes. Work out how many MB and how many GiB that is.
4. Work out how long it would take to download on a real connection you use. If you don't know your speed, use 5 Mbps and say so.
5. Complete the functions in the editor, press **Test my code**, then try them with your own numbers.

### If you've never used the Python box
You don't need to know Python yet. This is what you need for these first exercises. `def` starts a small named machine called a **function**. The name in brackets is what it's given, and `return` is the answer it hands back. Only change the line that says `return`, keeping its four spaces at the start. For example, this function doubles a number:

```python
def double(number):
    return number * 2

print(double(4))
```

```output
8
```

`*` means multiply and `/` means divide. **Run Python** shows what `print` prints. **Test my code** tries your function on hidden numbers. A failed test isn't a mark against you, so read the last line, fix it, and try again as often as you like.

# Starter
```python
def to_megabits(megabytes):
    # There are 8 bits in a byte
    return 0

def download_minutes(megabytes, speed_mbps):
    # Convert the file to megabits, divide by the speed to get seconds,
    # then divide by 60 to get minutes
    return 0

def hex_byte(number):
    # Return a number from 0 to 255 as two upper case hex digits.
    # Hint: f"{number:02X}" does this
    return ""

print(download_minutes(1500, 10))
print(hex_byte(200))
```

# Tests
```python
assert to_megabits(10) == 80, "10 megabytes is 80 megabits"
assert download_minutes(1500, 10) == 20, "1500 MB at 10 Mbps should take 20 minutes"
assert download_minutes(300, 2) == 20, "300 MB at 2 Mbps should take 20 minutes"
assert hex_byte(255) == "FF", "255 should be FF"
assert hex_byte(0) == "00", "0 should be 00, with two digits"
assert hex_byte(10) == "0A", "10 should be 0A, with two digits"
```

# Solution
```python
def to_megabits(megabytes):
    return megabytes * 8

def download_minutes(megabytes, speed_mbps):
    return to_megabits(megabytes) / speed_mbps / 60

def hex_byte(number):
    return f"{number:02X}"
```

# Rubric
- I converted real numbers by hand first, and checked them.
- I worked out a real file's size and download time.
- My code passes the tests.

# Summary
- Hex has sixteen digits, 0 to 9 and A to F. One hex digit is exactly four bits, so a byte is two hex digits.
- Group binary in fours from the right to convert it to hex.
- `0x` marks a hex number. `0x10` is sixteen.
- Drive makers use powers of 1000, and Windows measures in powers of 1024.
- B is bytes and b is bits. Divide network speeds by 8 to get bytes.

# Check
Q: What's `1100 1010` in hex?
- 0xAC
* 0xCA
- 0xC9
= 1100 is C, and 1010 is A.

Q: What's `0x1F` in decimal?
A: 31
= (1 x 16) + 15 = 31.

Q: What's `0xFF` in decimal?
A: 255
= (15 x 16) + 15 = 255, which is the largest value in one byte.

Q: How many hex digits are in one byte?
A: 2 | two
= One hex digit is four bits, and a byte is eight.

Q: What does the hex digit D stand for in decimal?
A: 13
= A is 10, B is 11, C is 12 and D is 13.

Q: What's 26 in hex?
- 0x26
* 0x1A
- 0x2A
= 26 / 16 = 1 remainder 10, so 1 and A. `0x26` would be 38.

Q: What colour does `#0000FF` give?
- Red
- Green
* Blue
= The bytes are red, green, blue in that order, and only blue is full.

Q: A connection is 40 Mbps. What's the best rate in megabytes per second?
A: 5 | 5 mb | 5 mb/s | 5 megabytes | 5 megabytes per second | 5 mb per second
= Divide megabits by 8.

Q: Why does a "1 TB" drive show about 931 GB in Windows?
* The maker counts in powers of 1000, and Windows in powers of 1024
- About 69 GB is always used up by viruses that came with it
- A 1 TB drive really only ever holds 931 billion bytes of data
= It's 1,000,000,000,000 bytes both ways. Two units share one name.

Q[transfer]: A forensic tool shows that a file named `holiday.jpg` starts with the bytes `25 50 44 46`, which are the first bytes of a PDF. What does this suggest?
- The picture was simply taken with an old type of camera
* The extension is misleading, and the contents are probably a PDF
- Hex can't be used on files that are pictures or photographs
= Extensions are just names. The bytes show what's really inside.

Q[transfer]: A 5 GB file on a 50 Mbps line. About how many minutes at best?
- About 1 minute
* About 13 minutes
- About 100 minutes
= 5,000 MB x 8 = 40,000 megabits. 40,000 / 50 = 800 seconds, about 13 minutes.

Q[transfer]: A SHA-256 digest is 256 bits. Why is it shown with 64 characters?
* Each hex digit carries 4 bits, and 256 / 4 = 64
- A hash can never be any longer than 64 bytes
- Each hex digit carries 8 bits, and that gives 64
= Hex is a compact way of writing bits. You'll see this constantly in security.

# Cards
How many bits is one hex digit? :: Four. So a byte is exactly two hex digits.
How do you convert binary to hex? :: Group in fours from the right, and replace each group with a hex digit.
What's 0xFF in decimal? :: 255.
What do B and b mean? :: B is bytes and b is bits. There are 8 bits in a byte.
How do you work out a download time? :: Megabytes x 8, divided by megabits per second, gives seconds.
Why does Windows show a smaller drive size? :: Makers count in powers of 1000, and Windows in powers of 1024.

# Further
- Harvard CS50's Understanding Technology, Multimedia :: https://cs50.harvard.edu/technology/weeks/3/
- Python documentation, built-in functions :: https://docs.python.org/3/library/functions.html
