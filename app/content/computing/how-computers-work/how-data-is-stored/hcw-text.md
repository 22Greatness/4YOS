---
id: hcw-text
pack: How Computers Work · How data is stored
title: How letters become numbers
minutes: 40
source: David J. Malan · Harvard CS50's Understanding Technology · Hardware
url: https://cs50.harvard.edu/technology/weeks/1/
courses: Helps with COS 101, CSC 101
video: https://cdn.cs50.net/cscie1a/2017/fall/lectures/hardware/hardware-360p.mp4
credit: Harvard CS50 · David J. Malan
start: 569
end: 975
python: yes
---
# Goal
Decode text from bytes using ASCII, explain why Unicode replaced it, work out how many bytes text takes in UTF-8, and recognise what goes wrong when encodings are mixed up.

# Why
All text in every program, email and database is stored as numbers. Knowing how explains garbled characters, why a file is the size it is, and why a tiny invisible difference can change a hash. In security, attackers abuse this: a web address can use a look-alike letter from another alphabet, so understanding encodings directly protects you.

# Lesson
## The problem
> Clip: David Malan shows that bits can stand for letters once everyone agrees on a mapping, then decodes bytes into the word HI using an ASCII chart. The details of Unicode and encoding problems come from this lesson.

A computer only stores bits, so to store a letter we must **agree** which number stands for it. That agreement is a **character encoding**. A **character** is one letter, digit, space or symbol. Nothing about the letter A says it should be 65. People simply decided, and everyone followed.

## ASCII
**ASCII** was published in the 1960s for American English. It uses 7 bits, so it has 128 possible values.

| Range | What's there |
| --- | --- |
| 0 to 31 | Invisible control characters, such as newline (10) and tab (9) |
| 32 | Space |
| 48 to 57 | Digits `0` to `9` |
| 65 to 90 | Capitals `A` to `Z` |
| 97 to 122 | Lower case `a` to `z` |

Some useful patterns are built in. Letters are in order, so B is 66 and C is 67. Each lower case letter is exactly 32 above its capital: A is 65, and a is 97.

> Mistake: Thinking the digit `7` has the value 7 when it's stored as text. The character `7` is stored as 55. That's why the text "12" and the number 12 are different in a program, and why you must convert between them.

### Worked example: decoding bytes
Decode `01001000 01001001`, as the video does.

| Byte | Add the place values | Number | ASCII |
| --- | --- | --- | --- |
| `01001000` | 64 + 8 | 72 | H |
| `01001001` | 64 + 8 + 1 | 73 | I |

So it spells **HI**. The same bytes could mean the numbers 72 and 73 in another program. The bits don't change, only how they're read.

```python
print(ord("H"))
print(chr(73))
print(bin(ord("H")))
print("HI".encode("ascii"))
print(list("HI".encode("ascii")))
```

```output
72
I
0b1001000
b'HI'
[72, 73]
```

?? Using A = 65, what does the sequence 67, 65, 66 spell?
=> C = 67, A = 65, B = 66. So CAB.

## The world needs more than 128 characters
ASCII has no room for `₦`, for Igbo letters like `ụ`, for Yoruba's `ẹ`, or for Arabic, Chinese or emoji. For years, different countries used different encodings, so the same bytes showed as different letters on different computers.

**Unicode** fixed this by giving every character in the world one number, called its **code point**, written like `U+20A6`. It covers well over 100,000 characters across the world's scripts, plus symbols and emoji. The first 128 are exactly the ASCII codes.

Unicode decides the numbers. An **encoding** decides how to store these numbers as bytes. The usual choice is **UTF-8**, which uses 1 to 4 bytes per character.

| Character | Code point | UTF-8 bytes | Count |
| --- | --- | --- | --- |
| `A` | U+0041 | 41 | 1 |
| `é` | U+00E9 | C3 A9 | 2 |
| `₦` | U+20A6 | E2 82 A6 | 3 |
| `😀` | U+1F600 | F0 9F 98 80 | 4 |

So old ASCII files are already valid UTF-8, and that's a big reason it won. It also means **characters and bytes aren't the same count**.

```python
for text in ["A", "é", "₦", "😀", "N500", "₦500"]:
    print(text, len(text), len(text.encode("utf-8")))
```

```output
A 1 1
é 1 2
₦ 1 3
😀 1 4
N500 4 4
₦500 4 6
```

## When encodings go wrong
If a file is written in one encoding and read as another, the bytes get read wrongly. This garbled text is called **mojibake**.

```python
original = "₦500"
stored = original.encode("utf-8")
print(stored.decode("latin-1").encode("latin-1") == stored)
print(stored.decode("cp1252", errors="replace"))
```

```output
True
â‚¦500
```

If you see `â‚¦` on a page where you expected `₦`, you've met this. The bytes are fine, and the reader used the wrong agreement. The fix is to read it with the right encoding, not to edit the text.

Line endings differ too. Windows usually ends a line with two characters, carriage return and line feed (13, 10), and Linux with just one (10). Two files can look identical and still have different bytes, and so different hashes.

## Text and security
Because Unicode has so many characters, some look identical to others. The Cyrillic `а` (U+0430) looks exactly like the Latin `a` (U+0061).

```python
print("a" == "а")
print(ord("a"), ord("а"))
```

```output
False
97 1072
```

> Safety: This allows **homograph attacks**, where a web address uses look-alike letters from another alphabet. Browsers try to show suspicious names in an encoded form starting `xn--`. If an address matters, type it yourself or use your own bookmark, rather than following a link.

# Exercises
?? Decode `01000011 01000001 01010100`.
=> 67, 65, 84, which spells CAT.

?? What is the ASCII code of lower case `d`, using a = 97?
=> 100, since a = 97, b = 98, c = 99 and d = 100.

?? How many bytes does "₦1000" take in UTF-8?
=> ₦ takes 3, and each of the 4 digits takes 1, so 7 bytes.

?? A classmate's document shows `Ã©` wherever `é` should be. What happened, and is the file damaged?
=> The UTF-8 bytes were read under another encoding. It isn't necessarily damaged. Opening it with the right encoding fixes it.

# Practice
1. Write your first name by hand as ASCII numbers, and then in binary. If it needs characters outside ASCII, note that, and say why.
2. Write a short sentence in Notepad with a `₦` sign in it, and save it. Look at its size in **Properties**, in bytes. Count the characters. Explain why those two numbers differ. If you can't type `₦`, copy it from this lesson.
3. Complete the functions in the editor, and press **Test my code**. They let you decode a message from a list of numbers. Then try them on your own name.

# Starter
```python
def to_codes(text):
    # Return a list of the code numbers for each character.
    # Hint: [ord(c) for c in text]
    return []

def from_codes(codes):
    # Return the text for a list of numbers.
    # Hint: "".join(chr(n) for n in codes)
    return ""

def utf8_size(text):
    # Return how many bytes this text takes in UTF-8
    return 0

print(to_codes("HI"))
print(from_codes([72, 73]))
print(utf8_size("₦500"))
```

# Tests
```python
assert to_codes("HI") == [72, 73], "HI should be [72, 73]"
assert to_codes("") == [], "empty text has no codes"
assert from_codes([67, 65, 84]) == "CAT", "those numbers spell CAT"
assert from_codes([]) == "", "no codes give empty text"
assert utf8_size("A") == 1, "A takes 1 byte"
assert utf8_size("₦500") == 6, "this text takes 6 bytes"
```

# Solution
```python
def to_codes(text):
    return [ord(c) for c in text]

def from_codes(codes):
    return "".join(chr(n) for n in codes)

def utf8_size(text):
    return len(text.encode("utf-8"))
```

# Rubric
- I wrote my own name as numbers by hand.
- I compared a real file's size with its number of characters, and explained the gap.
- My code passes the tests.

# Summary
- Text is stored as numbers, by agreement. That agreement is an encoding.
- ASCII has 128 values: A is 65 and a is 97. The character `7` is stored as 55.
- Unicode gives every character a code point. UTF-8 stores these in 1 to 4 bytes.
- Characters and bytes aren't the same count. Wrong encodings give garbled text.
- Look-alike letters from other alphabets are used to fake web addresses.

# Check
Q: Using A = 65, what number is `E`?
A: 69
= B is 66, C is 67, D is 68 and E is 69.

Q: What does the sequence 72, 69 spell?
A: HE | he
= 72 is H, and 69 is E.

Q: What is the ASCII code for lower case `a`?
A: 97
= Lower case letters are 32 above their capitals.

Q: The character `5` is stored in a text file. What's stored?
- The number 5, as 00000101
* The code for the character, which is 53
- Nothing, because only letters are stored as text
= Digit characters have their own codes, starting at 48 for `0`.

Q: Why was Unicode created?
* ASCII couldn't cover the world's scripts and symbols
- ASCII took up too much space on the first hard disks
- Computers stopped being able to read binary numbers
= 128 values can't hold Yoruba letters, the naira sign or Chinese.

Q: How many bytes does `A` take in UTF-8?
A: 1 | one
= ASCII characters take one byte in UTF-8.

Q: How many bytes does `₦` take in UTF-8?
A: 3 | three
= It needs three bytes: E2 82 A6.

Q: A page shows `â‚¦` where `₦` should be. What's the most likely cause?
- The website has been hacked by somebody
- The naira sign has been removed from Unicode
* The bytes are being read under the wrong encoding
= This is mojibake. The bytes are fine, and the reader used the wrong agreement.

Q: Two text files look identical, but their hashes differ. What might explain it?
* Different line endings or encodings
- One of them has been opened on a Tuesday
- Files with text can't really have a hash
= The bytes differ even when the text looks the same.

Q[transfer]: A link appears to go to `paypaI.com`, with a capital I in place of the small L. What does this show?
- Web addresses have to contain a capital letter to be secure
* Look-alike characters can fake an address, so type it yourself
- All web addresses that use capitals are guaranteed to be safe
= Similar characters can fool you, and in Unicode even identical-looking letters exist.

Q[transfer]: A database field allows 10 bytes, and a name with several non-English letters gets cut off, although it has only 8 characters. Why?
* In UTF-8 some of those characters take more than one byte
- Names in Nigeria aren't allowed to have more than 7 letters
- Databases count each of the letters of a name twice over
= Characters and bytes aren't the same count. This causes real bugs.

Q[transfer]: You sort names in a program, and "Zainab" comes before "ada". Why?
- The program must be broken, and it needs to be reinstalled
- Z is a more important letter than a, in all of the alphabets
* Capitals have lower codes than lower case letters
= Z is 90, and a is 97. Plain sorting uses codes, unless you tell it to ignore case.

# Cards
What's a character encoding? :: An agreement about which numbers stand for which characters.
What are the ASCII codes for A, a and the digit 0? :: 65, 97 and 48.
What's the difference between Unicode and UTF-8? :: Unicode gives each character a number. UTF-8 stores these numbers as 1 to 4 bytes.
Why do `â‚¦` symbols appear in text? :: The bytes are being read under the wrong encoding.
What's a homograph attack? :: A fake web address using look-alike letters from another alphabet.

# Further
- Harvard CS50's Understanding Technology, Hardware notes :: https://cs50.harvard.edu/technology/notes/1/
- Python documentation, Unicode HOWTO :: https://docs.python.org/3/howto/unicode.html
