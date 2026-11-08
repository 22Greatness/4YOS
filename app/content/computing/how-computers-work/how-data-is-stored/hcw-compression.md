---
id: hcw-compression
pack: How Computers Work · How data is stored
title: How files get smaller
minutes: 40
source: David J. Malan · Harvard CS50's Understanding Technology · Multimedia
url: https://cs50.harvard.edu/technology/weeks/3/
courses: Helps with COS 101, CSC 101
video: https://cdn.cs50.net/cscie1a/2017/fall/lectures/multimedia/multimedia-360p.mp4
credit: Harvard CS50 · David J. Malan
start: 900
end: 1558
python: yes
---
# Goal
Explain lossless and lossy compression, run a simple compression method by hand and in code, and choose the right format for a real file.

# Why
Compression is why your phone can hold thousands of photos, and why a video can reach you over a mobile connection at all. Choosing the right format saves you data and storage, and stops you damaging important files. The idea of finding and removing patterns also connects to statistics and to how some security tools work.

# Lesson
## The idea: say it in fewer bits
> Clip: David Malan uses a blue sky to show that a file needn't store the same colour over and over, then compares lossless formats with lossy JPEG, including a badly over-compressed sunflower. This lesson adds run-length coding by hand and the limits of compression.

**Compression** means storing the same information, or close to it, in fewer bits. It works because real data has patterns and repetition. Instead of "blue, blue, blue, blue, blue", you can store "5 blue".

| Type | What it does | Can you get the exact original back? | Examples |
| --- | --- | --- | --- |
| **Lossless** | Removes repetition only | Yes, every bit | ZIP, PNG, FLAC, GIF |
| **Lossy** | Also throws away detail you may not notice | No, it's gone forever | JPEG, MP3, AAC, H.264 |

The **compression ratio** compares sizes. A file that goes from 10 MB to 2 MB has a ratio of 5 to 1.

## Run-length encoding
The simplest lossless method is **run-length encoding** (RLE). It replaces a run of the same value with a count and the value.

### Worked example
```text
Original:   BBBBBBWWWBBBBB    14 characters
Encoded:    6B3W5B             6 characters
Decoded:    BBBBBB WWW BBBBB  exactly the original
```

Decoding gives back exactly what you started with, so it's lossless. It's excellent for simple graphics with big flat areas. But watch what happens with varied data:

```text
Original:   BWBWBW   6 characters
Encoded:    1B1W1B1W1B1W   12 characters
```

It got **bigger**. No compression method can shrink everything, because there aren't enough shorter outputs to give every possible file a different one.

```python
def rle(text):
    out = ""
    i = 0
    while i < len(text):
        run = 1
        while i + run < len(text) and text[i + run] == text[i]:
            run = run + 1
        out = out + str(run) + text[i]
        i = i + run
    return out

print(rle("BBBBBBWWWBBBBB"))
print(rle("BWBWBW"))
```

```output
6B3W5B
1B1W1B1W1B1W
```

?? Encode `AAAABBC` using run-length encoding. Is it shorter?
=> `4A2B1C`, which is 6 characters instead of 7. It's only slightly shorter, because the runs are short.

## Lossy compression
A lossy format decides what you won't miss. A JPEG keeps brightness detail more carefully than colour detail, because human eyes notice brightness more. An MP3 removes sounds that louder sounds would hide from your ear. At mild settings, you can hardly tell. Push it too far, and you get blocky patches in pictures and watery-sounding audio, which are known as **artifacts**.

### Each lossy save loses more
> Mistake: Repeatedly editing and saving a JPEG. Each save throws away a little more. Compressing an already compressed image makes it worse, and it can't bring back what's gone. Keep an original, and export a copy.

## Choosing a format
| You have | Use | Why |
| --- | --- | --- |
| A photograph | JPEG | Small, and fine for gradual colour |
| A screenshot, diagram or text image | PNG | Lossless, so sharp edges stay sharp |
| A logo or icon | SVG if possible, or PNG | Scales, or stays crisp |
| A simple short animation | GIF | Widely supported, but limited to 256 colours |
| A document to share | PDF | Looks the same everywhere |
| Files you must recover exactly | ZIP | Lossless. Never use lossy compression on documents or data |

JPEG on text or diagrams leaves smudges around the edges. PNG on a photo gives a very large file. So match the format to the content.

GIF can hold several images, which is why it's used for short loops, like the cat in the lecture. Its limit of 256 colours comes from using 8 bits per pixel.

## ZIP and the limits of compression
A ZIP file compresses and packs together other files, losslessly.

| Compresses well | Hardly compresses |
| --- | --- |
| Plain text, code, spreadsheets, logs | JPEG, MP3, MP4, existing ZIP files |
| Why: lots of repetition | Why: repetition has already gone |

Zipping a video won't save you noticeable data, because it's already been compressed.

Encrypted data also doesn't compress, because good encryption makes data look random, with no patterns to remove. So compress first, then encrypt.

Here's the same principle measured with Python, comparing repetitive text with random bytes:

```python
import random
import zlib
random.seed(1)
repetitive = b"A" * 10000
random_bytes = random.randbytes(10000)
print(len(zlib.compress(repetitive)) < 100)
print(len(zlib.compress(random_bytes)) > 9900)
```

```output
True
True
```

Ten thousand repeated letters shrink to under 100 bytes, while ten thousand random bytes hardly shrink at all.

> Safety: Attackers often hide malware inside ZIP files, including ones with passwords, partly because some scanners can't look inside them. Don't open an unexpected ZIP from a message, even if the password comes with it. A **zip bomb** is a tiny archive that expands to enormous size, to crash the tools that open it.

# Exercises
?? Decode `3X2Y4Z`.
=> `XXXYYZZZZ`.

?? A 40 MB file compresses to 10 MB. What's the ratio?
=> 4 to 1.

?? Your project report as a Word file is going to your supervisor. Could you use lossy compression on it?
=> No. Losing any bits of a document would corrupt it. Use lossless, such as ZIP.

?? You zip a folder of MP4 videos, and it hardly shrinks. Why?
=> MP4 video is already compressed, so little repetition remains.

# Practice
1. Create a plain text file with a sentence repeated at least 500 times. A quick way: paste it repeatedly in Notepad. Note its size.
2. Right-click it, choose **Compress to**, then **ZIP File**, and note the new size. On older versions of Windows 11, the option is **Compress to ZIP file**. Work out the ratio.
3. Do the same with a real photo or video of yours. Compare the ratios, and explain the difference.
4. Take a real screenshot. If you have a tool that can save a JPEG at low quality, compare it with PNG. Otherwise, explain which you would choose and why.
5. Write the `decode` function in the editor, then press **Test my code**.

# Starter
```python
def decode(encoded):
    # encoded alternates a one-digit count and a character, like "3X2Y"
    out = ""
    # This loop looks at each pair in turn. encoded[i] is the count, and encoded[i + 1] is the character.
    for i in range(0, len(encoded), 2):
        count = int(encoded[i])
        character = encoded[i + 1]
        # Change the next line. In Python, "A" * 3 gives "AAA"
        out = out + ""
    return out

def ratio(original, compressed):
    # Return original divided by compressed
    return 0

print(decode("3X2Y4Z"))
print(ratio(40, 10))
```

# Tests
```python
assert decode("3X2Y4Z") == "XXXYYZZZZ", "3X2Y4Z should decode to XXXYYZZZZ"
assert decode("1A") == "A", "1A should decode to A"
assert decode("") == "", "empty input gives empty output"
assert ratio(40, 10) == 4, "40 down to 10 is a ratio of 4"
assert ratio(9, 3) == 3, "9 down to 3 is a ratio of 3"
```

# Solution
```python
def decode(encoded):
    out = ""
    for i in range(0, len(encoded), 2):
        out = out + encoded[i + 1] * int(encoded[i])
    return out

def ratio(original, compressed):
    return original / compressed
```

# Rubric
- I measured real files before and after compressing them.
- I can explain why some files shrink a lot, and others hardly at all.
- My code passes the tests.

# Summary
- Lossless gets every bit back. Lossy throws away detail, permanently.
- Run-length encoding stores runs as a count and a value.
- No method can shrink everything, and data with no patterns may even grow.
- Use JPEG for photos, PNG for screenshots and diagrams, ZIP for files you must recover exactly.
- Already compressed files and encrypted data barely compress further.

# Check
Q: What makes compression lossless?
* The exact original can be rebuilt, bit for bit
- The file looks the same to most people who see it
- The file ends up at less than half of its size
= Looking the same describes good lossy compression. Lossless is exact.

Q: Which of these is lossy?
- ZIP
- PNG
* JPEG
= JPEG throws away detail. ZIP and PNG keep every bit.

Q: What's the run-length encoding of `AAABBBBC`?
A: 3A4B1C | 3a4b1c
= Three As, four Bs and one C.

Q: What does `2M3N` decode to?
A: MMNNN | mmnnn
= Two Ms and three Ns.

Q: Why does `ABABAB` get bigger under run-length encoding?
- The letters A and B are too far apart in the alphabet
* It has no runs, so each letter needs an added count
- Run-length encoding can only be used on pictures
= No method shrinks everything. It depends on patterns in the data.

Q: Which format best suits a screenshot with small text?
- JPEG at low quality
* PNG
- MP3
= Lossless PNG keeps sharp edges. JPEG smudges them.

Q: Why do JPEGs get worse if edited and saved many times?
* Each save throws away a bit more detail
- The file slowly fills up with hidden viruses
- JPEG files can only be opened a set number of times
= Lossy loss adds up, and it can't be undone. Keep an original.

Q: Why does zipping an MP4 hardly save anything?
- ZIP doesn't work on any file bigger than 1 MB
- Video files are protected by law from zipping
* It's already compressed, so little repetition remains
= Compression removes repetition, and that's already gone.

Q: What's an artifact in a compressed image?
- A valuable old photograph that's stored in a museum
* A visible flaw caused by compression
- A hidden copy of an image that's stored in a file
= Blocky patches are a typical artifact.

Q[transfer]: A forensic examiner must copy evidence photos. Why must they not re-save them as lossy JPEGs?
* It changes the bytes, so it damages the evidence and its hash
- JPEG files aren't allowed to be stored on any external drive
- It would make the evidence photos much too large to store
= Evidence must stay exact. Lossy saving destroys information permanently.

Q[transfer]: You must send a 300 MB folder of plain-text log files over a costly connection. What's the best first step?
- Change the extension of every log file to `.jpg`
- Send them one by one, as it uses less data overall
* Zip them, as text compresses very well
= Logs have lots of repetition, so ZIP often saves a large share of their size.

Q[transfer]: Someone proposes encrypting a large file first and compressing it afterward. What's the problem?
* Encrypted data looks random, so it barely compresses
- Compression would make the encryption completely useless
- Encryption can't be used on any kind of large files
= Compress first, and then encrypt.

# Cards
What's the difference between lossless and lossy? :: Lossless rebuilds every bit. Lossy throws detail away for good.
How does run-length encoding work? :: It replaces a run of one value with a count and the value.
Why can't compression shrink every file? :: There aren't enough shorter outputs, and data with no patterns has nothing to remove.
When should you use JPEG or PNG? :: JPEG for photos, PNG for screenshots, diagrams and text.
Why compress before encrypting? :: Encrypted data looks random, and so won't compress.

# Further
- Harvard CS50's Understanding Technology, Multimedia :: https://cs50.harvard.edu/technology/weeks/3/
- Python documentation, zlib module :: https://docs.python.org/3/library/zlib.html
