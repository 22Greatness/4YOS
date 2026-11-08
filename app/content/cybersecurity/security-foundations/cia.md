---
id: cia
pack: What security protects
title: Confidentiality, integrity and availability
minutes: 35
source: NIST Computer Security Resource Center · Glossary, Confidentiality
url: https://csrc.nist.gov/glossary/term/confidentiality
courses: UNIPORT (expected) CYB 201 · NOUN NOU-CYB-111, NOU-CYB-122, CYB201
---
# Goal
Describe what an incident actually harmed using confidentiality, integrity and availability, choose a protection that fits that harm, and state the rule on what you may and may not test.

# Why
This is the first idea in almost every cybersecurity course, certification and job interview. It gives you a precise way to describe a problem, so you stop saying "the system was hacked" and can say exactly what was harmed. Fraud and risk work, the direction your degrees point to, depends on this clarity. The legal rule at the end of this lesson protects your degree and your career, from today.

# Lesson
## Security starts with what you are protecting
An **asset** is anything worth protecting: your NOUN portal account, your bank app, your project files, your laptop. Security begins by naming the asset and saying what would go wrong, not by buying a tool. Three properties cover nearly every harm. They are often called the **CIA triad**, which has nothing to do with the American agency.

| Property | The question | Harm when it fails | Everyday example |
| --- | --- | --- | --- |
| Confidentiality | Can only the right people see it? | Disclosure | Someone reads your private messages |
| Integrity | Is it correct, and changed only properly? | Modification or destruction | A grade changed in a database |
| Availability | Can the right people use it when needed? | Disruption | The portal is down on registration day |

US standards body NIST defines them formally in its glossary. Confidentiality preserves authorised restrictions on access and disclosure. Integrity guards against improper modification or destruction of information, and includes authenticity. Availability ensures timely and reliable access. Those definitions are what exam answers should be built on.

## Telling them apart
Ask what actually happened to the information, not how the attacker did it.

### Worked example: classify the harm
| Incident | Harm | Why |
| --- | --- | --- |
| A stolen password is used to read a student's results | Confidentiality | Information was seen by someone unauthorised, and nothing changed |
| The same intruder edits a result | Integrity | The record is now wrong |
| A power failure stops the exam portal for a day | Availability | Authorised people cannot get in. No attacker is needed |
| Ransomware encrypts a school's files and demands payment | Availability, and possibly others | Files can't be used. If the gang also copied them, confidentiality too |
| You accidentally overwrite your only copy of a project | Integrity and availability | Correct data is destroyed, with no way back |

Two things to notice. First, one incident can harm several properties. Name each one the evidence supports, and only those. Second, security failures do not need an attacker at all. Accidents and power cuts count. A flood harms availability as surely as a hacker does.

> Mistake: Saying a file was "copied" means it was "lost". A stolen copy leaves your original perfectly intact and available. That is a confidentiality harm, and it's harder to notice precisely because nothing looks different.

?? Your phone is stolen. It was locked with a strong PIN and encrypted, and you have a backup. Which property was mainly harmed?
=> Availability, because you can't use that phone. Encryption protects confidentiality here, and the backup limits the harm to your data.

## Match the protection to the harm
Different harms need different controls. Picking the wrong one leaves the real risk open.

| Goal | Common protections |
| --- | --- |
| Confidentiality | Access control, strong passwords and two-factor sign-in, encryption |
| Integrity | Permissions on who can change things, hashes to detect changes, version history, digital signatures |
| Availability | Backups you have actually restored, spare power and equipment, updates, protection against overload |

Controls can pull against each other. Encrypting a file protects confidentiality, but if you lose the key, you have destroyed its availability. Your 4YOS workspace is exactly this trade: no one can read it without your passphrase or recovery code, and if you lose both, you can't either. Good security means choosing that trade on purpose.

> Mistake: Treating a backup as protection from everything. A backup helps availability, but does nothing if someone has already read your data. And a backup you have never tested may not restore, so test it.

## Think in terms of risk
You can't protect everything equally, so people use a simple idea: **risk** combines how likely something is with how bad it would be. A lost phone is likely and moderately bad. A government targeting your laptop is very unlikely for most people. Spend effort on what is both likely and serious. For you right now, that means a phishing message stealing your passwords, a stolen laptop, and a dead drive. It's not a Hollywood hacker.

## The rule that protects your career
You will learn techniques in this degree that are crimes if used without permission. In Nigeria, the Cybercrimes (Prohibition, Prevention, etc.) Act makes unlawful access to a computer an offence, and other countries have similar laws. So the rule is simple and has no exceptions:

> Safety: Only test systems you own, or that you have clear written permission to test. Curiosity is not permission. "I only looked" and "I was going to tell them" are not defences. A school portal, a friend's account or a public website are all off limits, unless the owner has given written permission or runs an official test programme whose rules you follow. Practise in your own isolated labs and on platforms built for this.

Ethics and law are examined at NOUN, in courses such as NOU-CYB-122, and you will study the Act itself. Treat this summary as a guide, not legal advice, and check your course material for the exact provisions.

# Exercises
?? A fake site tricks you into typing your password. Which property is harmed first?
=> Confidentiality: someone unauthorised now knows your password. If they then change your details or lock you out, integrity and availability follow.

?? Someone floods a shop's website with traffic until customers can't load it. No data is read or changed. Which property?
=> Availability only. This is a denial-of-service attack.

?? You want to know if a downloaded file was altered. Would encrypting it help?
=> No. Encryption is for confidentiality. To detect a change you need an integrity check, such as comparing a hash, which is a later lesson.

# Practice
Do this for a real account or file of yours, without entering any private details here.

1. Choose one asset you actually depend on, such as your school email, your bank app, or your project folder.
2. Write what confidentiality, integrity and availability mean for that asset, in one sentence each.
3. For each one, write the most likely way it could fail for you.
4. Name one protection you already have, and one you should add this week. Then add it, if it's something you can do now, like a long unique password or a second copy of a file.

# Rubric
- I used an asset I really depend on.
- I wrote a specific failure for each of the three properties.
- I chose a protection that matches the harm it is meant to stop.

# Summary
- Confidentiality is about who can see information. Integrity is about whether it's correct and changed properly. Availability is about whether it's there when needed.
- Classify by what happened to the information, not how it was done.
- One incident can harm several properties, and many incidents have no attacker.
- Match the protection to the harm. Encryption doesn't detect changes, and backups don't stop leaks.
- Only test systems you own, or have clear written permission to test.

# Check
Q: An unauthorised edit changes a number in your record. Which property is directly harmed?
- Availability
* Integrity
- Confidentiality
= The record is now wrong. Reading it would be confidentiality, and being unable to reach it would be availability.

Q: Someone reads your private messages but changes nothing. Which property is harmed?
* Confidentiality
- Integrity
- Availability
= Information was seen by someone who should not see it. Nothing was altered or made unusable.

Q: A registration portal crashes under heavy use and students cannot log in, with no attacker involved. Which is harmed?
- Confidentiality
- Integrity
* Availability
= Authorised users can't reach the service. Harm doesn't require an attacker.

Q: Which protection mainly addresses confidentiality?
* Encrypting the file
- Keeping a spare copy of the file
- Comparing the file against a known hash
= Encryption stops others reading it. A spare copy helps availability and a hash detects changes.

Q: Which protection mainly helps you recover availability after a drive failure?
- A longer passphrase on the account
* A backup you have tested by restoring it
- A note in the file saying it's private
= A tested backup gets you working again. A passphrase protects access, not the data on a dead drive.

Q: A criminal copies your files but leaves them untouched. What is true?
- Integrity is harmed because a copy now exists elsewhere
* Confidentiality is harmed, and your files remain correct and usable
- Availability is harmed because the files were accessed
= A copy leaves the original intact. The harm is that someone can now read it.

Q: In this lesson, what does risk combine?
* How likely something is and how bad it would be
- How old a system is and how much it costs to replace
- How many users a system has and how long it runs
= You focus on what is both likely and serious, since you cannot protect everything equally.

Q: A friend asks you to test the login of a public site "just to see if it's weak". What is the correct response?
- Try it gently, as long as you don't change anything
- Try it, then tell the site's owner what you found
* Don't, unless the site's owner has given clear written permission
= Permission must come from the owner, and it must be clear and written. Good intentions are no defence.

Q[transfer]: You encrypt your project and forget the passphrase. No other copy exists. Which property did you lose, even though encryption worked correctly?
- Confidentiality
- Authenticity
* Availability
= Nobody, including you, can now use the file. Controls can pull against each other.

Q[transfer]: A fraudster alters the account number on an invoice before the customer pays it. Which property of the invoice failed?
* Integrity
- Availability
- Confidentiality
= The invoice was changed improperly. It's still readable and reachable, but no longer correct.

Q[transfer]: A hospital's records are encrypted by ransomware, and the criminals also publish some of them. Which properties were harmed?
- Only availability, because the files were encrypted
- Only confidentiality, because the files were published
* At least availability and confidentiality
= Staff could not use the records, and private records were disclosed. Name each harm the evidence supports.

# Cards
What do confidentiality, integrity and availability each ask? :: Can only the right people see it? Is it correct and changed only properly? Can the right people use it when needed?
Someone copies your file but leaves it unchanged. What was harmed? :: Confidentiality. The original stays correct and available.
Why isn't encryption the right tool for detecting changes? :: Encryption protects confidentiality. Detecting changes is integrity, which uses hashes or signatures.
Does a security failure need an attacker? :: No. Accidents, failures and power cuts count too.
What is the rule for testing systems? :: Only systems you own, or have clear written permission to test.

# Further
- NIST glossary, confidentiality, with links to integrity and availability :: https://csrc.nist.gov/glossary/term/confidentiality
- Harvard CS50's Introduction to Cybersecurity :: https://cs50.harvard.edu/cybersecurity/
