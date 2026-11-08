---
id: file-integrity
pack: Verify file integrity
title: Check a file with SHA-256
minutes: 45
source: David J. Malan · Harvard CS50's Introduction to Cybersecurity · Week 1: Securing Data
url: https://cs50.harvard.edu/cybersecurity/weeks/1/
courses: UNIPORT (expected) CYB 201 · NOUN NOU-CYB-226, CYB301, CYB305
lecture: yes
credit: Harvard CS50 · David J. Malan
start: 230.4
end: 470.55
python: yes
---
# Goal
Explain what a cryptographic hash does, compute SHA-256 hashes yourself, and decide what a match really proves, including why the source of the reference matters.

# Why
Hashes are everywhere in security. You will use them to check that downloads are genuine, to prove in forensics that evidence wasn't altered, and to identify known malware. They also underpin digital signatures and password storage. NOUN's cryptography and forensics courses build straight on this lesson. Knowing what a match does and doesn't prove is the difference between checking something and only feeling that you've checked.

# Lesson
## What a hash function is
> Clip: The video introduces hash functions through password storage, using a toy rule based on the first letter of a word, and then a better, older hash. It stops before SHA-256 and file checks, which this lesson covers. Don't use the toy rule, or that older hash, for anything real.

A **hash function** takes an input of any size and gives a fixed-size output, called a **hash** or **digest**. In the video, it's a black box with an input and an output, which is also just a mathematical function, f(x).

A **cryptographic hash function** such as **SHA-256** has extra properties, which make it useful for security.

| Property | What it means | Why it matters |
| --- | --- | --- |
| Deterministic | The same input always gives the same output | So you can compare |
| Fixed size | Always 256 bits, for any input size | Written as 64 hexadecimal characters |
| Avalanche effect | A tiny change gives a totally different output | Small changes can't hide |
| One-way | You can't work back from the digest to the input | Except by guessing inputs |
| Collision resistant | Finding two inputs with the same digest isn't practical | So a match is strong evidence |

Those 64 characters are **hexadecimal**, base 16, using 0 to 9 and a to f. One hex digit is exactly 4 bits, which is why 256 bits gives 64 characters.

See the avalanche effect in Python:

```python
import hashlib
print(hashlib.sha256(b"apple").hexdigest())
print(hashlib.sha256(b"Apple").hexdigest())
print(len(hashlib.sha256(b"apple").hexdigest()))
```

```output
3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b
f223faa96f22916294922b171a2696d868fd1f9129302eb41a45b2a2ea2ebbfd
64
```

One letter changed, and the two digests share no visible pattern.

## Collisions
A **collision** is two different inputs with the same output. The video's toy hash collides easily, as apple and avocado both give 1. Collisions must exist for any hash, because there are limitless possible files and only a fixed number of digests. So a digest isn't mathematically unique. For SHA-256, though, nobody has ever found a collision, and with today's technology searching for one is impractical.

Older hash functions have fallen. **MD5** and **SHA-1** have practical collision attacks, so don't rely on them for security, even though you will still see them in old systems. If someone gives you an MD5 for a download, it may detect accidental damage, but it won't reliably stop an attacker.

> Note: Hashing isn't encryption. Encryption is reversible with a key, and it's used to keep things secret. Hashing has no key and no way back, and a hash doesn't hide the file, it only fingerprints it.

## Checking a file
SHA-256 reads a file's bytes. The filename and location are metadata, stored elsewhere, so they play no part.

| What you do to a file | Does the SHA-256 change? |
| --- | --- |
| Rename it | No |
| Move or copy it | No |
| Change one letter inside | Yes, completely |
| Open it and save without changes | Sometimes, as some apps rewrite the file |
| Change the line endings or text encoding | Yes, since the bytes change |

Python and Windows both compute this. On Windows:

```text
certutil.exe -hashfile "C:\path\to\file.iso" SHA256
```

A SHA-256 line in hexadecimal appears in the output. Compare it with the publisher's digest, character by character, or better yet, with a program.

### Worked example: is this download genuine?
You download Python's installer from `python.org`. The site lists a checksum for each release. You compute the digest of your file and compare.

| Result | Meaning |
| --- | --- |
| Digests match | You have the exact bytes that digest describes |
| Digests differ | The bytes differ. It could be corruption, the wrong version or tampering. Don't use it |

Different releases have different digests, so make sure the reference is for the exact version and platform you downloaded.

## The reference is what you're trusting
A hash check compares two things, and it's only as good as the reference.

Suppose you download a file and its digest from the same untrusted mirror. An attacker who controls that mirror swaps in a malicious file and posts its matching digest. Your check passes, because the digest truly does describe that file. You've proved that you have what the mirror served, and not that it's what the publisher released.

So get the reference through a separate and more trustworthy route, such as the publisher's own HTTPS site. A stronger method is a **digital signature**: the publisher signs the release with a private key, and you verify it with a public key that you already trust. Signatures prove who released it, and hashes alone can't.

## What a match doesn't tell you
> Mistake: Thinking a matching hash means a file is safe. It means only that the bytes are the ones the reference described. A publisher can release buggy or malicious software, and its digest will match perfectly.

| A match can show | A match can't show |
| --- | --- |
| The bytes equal what the reference describes | That the file is free of malware |
| The file wasn't damaged in transit | That the file is confidential |
| Nothing changed since the reference was made | Who made the file, unless signed |

In forensics, investigators hash evidence when they collect it, and again later. Matching digests show that it wasn't altered in between, which helps it to stand up in a dispute. This is **integrity**, from the earlier lesson.

## Passwords need something different
The video introduces hashes through password storage. The idea is right: store a hash, and not the password. But a fast hash like SHA-256 is the wrong tool for this. Being fast means attackers can try billions of guesses a second, and identical passwords give identical hashes.

Real systems use a purpose-built password hashing scheme, such as Argon2, scrypt or bcrypt. These are deliberately slow, and they add a random unique **salt** to each password, so that identical passwords don't look the same. 4YOS itself uses scrypt to protect your workspace key.

> Safety: Use only your own harmless files for this practice. Keep real passwords out of it, and never paste a password into an online "hash checker". You would be giving it away.

# Exercises
?? You rename `notes.txt` to `final.txt`. Does its SHA-256 change?
=> No. The name is metadata, and the hash reads only the contents.

?? A site gives an MD5 and an SHA-256 for a download. Which should you check, and why?
=> The SHA-256. MD5 has practical collision attacks, so it can't be relied on against an attacker.

?? A file's digest matches the one on the publisher's real site. Can you conclude it has no malware?
=> No. You only know that it's what the publisher released. Whether that's safe depends on trust in the publisher, and other checks.

?? How many hexadecimal characters does a 512-bit hash need?
=> 128, since each hex digit carries 4 bits.

# Practice
Use your own harmless files. Nothing here should contain private data.

1. Make a small text file in Notepad, and make a copy of it in the same folder.
2. Open Command Prompt: press the Windows key, type `cmd` and press Enter. Type or paste the command, then press Enter. Hash both files with the command below. In File Explorer, click a file and press Ctrl + Shift + C to copy its path with its quotes. Then replace all of `"PASTE THE FILE PATH HERE"` with it, including those quotes, so that the path has only one pair. Compare them. They should match.
3. Rename the copy and hash it again. Predict the result first.
4. Open the copy, add one character, save it, and hash it again. Predict first. Compare how much of the digest changed.
5. Complete the function in the editor, then press **Test my code**. It uses SHA-256 on text, and compares to a reference. Press **Run Python** to try it on your own words.

Record which pairs matched and which differed, and what a trusted reference would add to this.

# Command
```text
certutil.exe -hashfile "PASTE THE FILE PATH HERE" SHA256
```

# Starter
```python
import hashlib

def digest(text):
    # Return the SHA-256 hexadecimal digest of this text.
    # Hint: hashlib.sha256(text.encode()).hexdigest()
    return ""

def matches(text, reference):
    # Return True if the text's digest equals the reference.
    # Treat upper and lower case digests as the same.
    return False

print(digest("hello"))
```

# Tests
```python
assert digest("apple") == "3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b", "digest('apple') is not right"
assert len(digest("anything at all")) == 64, "a SHA-256 digest should have 64 characters"
assert digest("a") != digest("A"), "a tiny change should change the digest"
assert matches("apple", "3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b") is True, "the right text should match"
assert matches("apple", "3A7BD3E2360A3D29EEA436FCFB7E44C735D117C42D1C1835420B6B9942DD4F1B") is True, "upper case references should still match"
assert matches("Apple", "3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b") is False, "changed text should not match"
```

# Solution
```python
import hashlib

def digest(text):
    return hashlib.sha256(text.encode()).hexdigest()

def matches(text, reference):
    return digest(text) == reference.lower()
```

# Rubric
- I predicted before hashing, and compared real digests from my own files.
- I saw that renaming doesn't change the digest, and that an edit does.
- I can say what a trusted reference adds, and what a match doesn't prove.

# Summary
- A hash gives a fixed-size fingerprint of a file's bytes. SHA-256 gives 64 hex characters.
- Any small change gives a totally different digest. Renaming changes nothing.
- A match proves the bytes equal the reference, so the reference must come from a route you trust.
- A match doesn't prove safety, secrecy or authorship. Signatures prove authorship.
- Don't use MD5 or SHA-1 for security. Passwords need slow, salted schemes such as Argon2.

# Check
Q: A file and its posted SHA-256 digest match, and both came from the same untrusted mirror. What can you conclude?
- The publisher definitely released this file, as the digests match perfectly here
* The bytes match the mirror's digest, but who released them is unverified
- The file is encrypted and free of malware, since its digest could be verified
= The mirror could replace both. Use a reference from a trusted route, or verify a signature.

Q: You rename a file. What happens to its SHA-256?
* It stays the same
- It changes completely
- It changes in a few characters
= Hashing reads the contents. The name is metadata.

Q: You add one space to a text file and save it. What happens to its SHA-256?
- It stays the same
- It changes in a few characters
* It changes completely
= This is the avalanche effect. Any change gives a totally different digest.

Q: How many hexadecimal characters is a SHA-256 digest?
A: 64
= 256 bits at 4 bits per hex digit gives 64.

Q: What's a collision?
- A digest that's too long to fit in the database
* Two different inputs that give the same digest
- One input that gives two different digests
= Collisions must exist, but finding one for SHA-256 isn't practical. A hash always gives one digest per input.

Q: Which is true of hashing and encryption?
- Both of them use a secret key and can be undone with it
- Hashing keeps a file secret, and encryption checks for changes
* Encryption can be reversed with a key, and hashing has no way back
= Hashing is a one-way fingerprint with no key.

Q: Why shouldn't MD5 be relied on against an attacker?
- It takes far too long to compute on a normal computer
* Practical collision attacks exist
- It can only be used on very small text files
= Attackers can create two files with the same MD5.

Q: Why is plain SHA-256 a poor choice for storing passwords?
- Its digests are too short to be stored in a database
* It's fast, so guessing is fast, and identical passwords look the same
- It can be reversed to reveal the password in a few minutes
= Password storage needs slow, salted schemes such as Argon2, scrypt or bcrypt.

Q[transfer]: An investigator hashes a seized drive's image on Monday, and gets the same digest in court months later. What does this support?
* The image hasn't changed since Monday
- The suspect who owned the drive is guilty of the crime
- The drive's contents have been kept confidential throughout
= Matching digests show integrity. They don't prove guilt or secrecy.

Q[transfer]: A download's digest differs from the one on the publisher's site. Which is the sensible response?
- Run it anyway, as long as your antivirus is switched on
* Don't use it. Download it again from the official source and recheck it
- Edit the file until the two digests happen to match
= The bytes differ, whether from damage, the wrong version or tampering.

Q[transfer]: A security tool flags a file because its SHA-256 matches a known malware sample. An attacker changes one byte of the malware. What happens?
- The tool still flags it, as the two digests are almost the same
* The digest changes completely, so that exact check no longer matches
- The malware stops working, since hashes protect the code
= The avalanche effect is why hash lists alone are easy to dodge, and why defenders use other detection too.

# Cards
What does a hash function do? :: It turns an input of any size into a fixed-size digest. Same input, same digest.
What's the avalanche effect? :: A tiny change in the input gives a completely different digest.
Why must the reference digest come from a trusted route? :: Someone who can replace both the file and its digest can make the check pass.
What doesn't a matching hash prove? :: That the file is safe, secret, or who made it.
How's hashing different from encryption? :: Hashing is a one-way fingerprint with no key. Encryption is reversible with a key.
Why are Argon2 and bcrypt used for passwords instead of SHA-256? :: They're deliberately slow and salted, so guessing is expensive and identical passwords differ.

# Further
- Harvard CS50's Introduction to Cybersecurity, Week 1 :: https://cs50.harvard.edu/cybersecurity/weeks/1/
- NIST FIPS 180-4, the SHA-256 standard :: https://csrc.nist.gov/pubs/fips/180-4/upd1/final
- Microsoft Learn, certutil command :: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/certutil
