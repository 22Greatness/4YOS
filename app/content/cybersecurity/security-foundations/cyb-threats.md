---
id: cyb-threats
pack: Cybersecurity from the beginning
title: Threats, vulnerabilities and how attacks work
minutes: 50
source: NIST Computer Security Resource Center · Glossary, Vulnerability
url: https://csrc.nist.gov/glossary/term/vulnerability
courses: UNIPORT (expected) CYB 201 · NOUN NOU-CYB-111, CYB201
---
# Goal
Tell apart assets, threats, vulnerabilities and risk, recognise the main kinds of malware and attacks, and match each to the control that reduces it.

# Why
This is the core vocabulary of NOUN's Fundamentals of Cyber Security, and of nearly every security certification. Employers expect you to use these words precisely. It's the knowledge a defender needs, and it also feeds directly into your channel, which is about helping ordinary people avoid being tricked.

# Lesson
## Four words that are often confused
Security people use these words exactly, and it's worth doing the same.

| Term | Meaning | House example | Computer example |
| --- | --- | --- | --- |
| **Asset** | Something of value | Your TV | Your student records |
| **Vulnerability** | A weakness that could be exploited | A broken window lock | Software that hasn't been updated |
| **Threat** | Anything that could cause harm | A burglar, or a flood | A criminal, malware or a power failure |
| **Risk** | The chance and size of a harm | How likely the burglary is, and what you'd lose | How likely a breach is, and what it would cost |
| **Control** | Something that reduces risk | A new lock | An update, a backup, two-factor sign-in |
| **Exploit** | A way of using a vulnerability | Reaching through the window | Code that abuses a software bug |

The key thing to see: a **threat** needs a **vulnerability** to cause harm. A burglar can't use a broken lock if there's no burglar around, and a locked house is safer even if burglars exist. Risk requires both, and how much it matters depends on the asset.

```text
Risk is roughly: likelihood x impact
```

Who are the threat actors? They have different motives.

| Actor | Motive |
| --- | --- |
| Criminals | Money |
| Insiders | Revenge, money or simple mistakes |
| Hacktivists | Political or social causes |
| Nation states | Spying and strategic advantage |
| Script kiddies | Curiosity or status, using others' tools |

Not all threats are people: fire, floods and failed hardware count too.

?? A school's server has software that hasn't been updated for two years. Is this a threat or a vulnerability?
=> A vulnerability, a weakness. The threat is whoever or whatever might take advantage of it.

## Malware
**Malware** is software designed to cause harm. These types are in every exam.

| Type | What makes it this type | How it spreads or acts |
| --- | --- | --- |
| **Virus** | Attaches to a file or program | Runs when that host is opened |
| **Worm** | Spreads by itself | Across networks, with no user action |
| **Trojan** | Looks useful, and hides harm | You install it yourself |
| **Ransomware** | Locks your files for payment | Encrypts data and demands money |
| **Spyware** | Watches you secretly | Steals activity and details |
| **Keylogger** | Records what you type | Captures passwords |
| **Rootkit** | Hides deep in the system | Conceals itself and other malware |
| **Botnet** | Many infected machines under one controller | Used for spam and overload attacks |

> Mistake: Calling all malware a virus. The difference that matters on exam day: a virus needs a host file, and a worm doesn't. A Trojan relies on tricking you into running it.

## Social engineering
Most successful attacks start by tricking a person, not by breaking technology. **Social engineering** means manipulating people into giving up information or access.

| Attack | How it works | Nigerian example |
| --- | --- | --- |
| **Phishing** | A fake message, usually email, with a link or attachment | A fake portal email about your results |
| **Spear phishing** | Phishing aimed at one person, using real details | A message using your name, course and lecturer |
| **Smishing** | Phishing by SMS | "Your BVN has been suspended, click here" |
| **Vishing** | Phishing by voice call | A caller claiming to be from your bank's fraud desk |
| **Pretexting** | A made-up story to get trust | Someone posing as IT support |
| **Baiting** | An attractive offer as a trap | A free flash drive, or "free data" link |

These work by exploiting urgency, authority, fear and greed. The defence is the habit of stopping, and checking through a route you already trust.

## Technical attacks
At this stage you need to know what these are and how to defend against them. You'll study them in depth, in labs, in later courses.

| Attack | What happens | Main harm |
| --- | --- | --- |
| **Password guessing** | Trying many passwords | Confidentiality, integrity |
| **Credential stuffing** | Trying passwords leaked from another site | Confidentiality, integrity |
| **Denial of service (DoS, DDoS)** | Flooding a service so that real users can't reach it | Availability |
| **Man-in-the-middle** | Secretly sitting between two parties | Confidentiality, integrity |
| **SQL injection** | Sneaking database commands through an input box | Confidentiality, integrity |
| **Cross-site scripting (XSS)** | Getting a site to run an attacker's code in visitors' browsers | Confidentiality, integrity |
| **Zero-day** | Using a flaw that has no fix yet | Varies |

Credential stuffing is why you shouldn't reuse passwords: one leak opens every account that shares that password.

## Controls
Controls are grouped in two ways, and both come up in NOUN's exam.

| By type | Meaning | Examples |
| --- | --- | --- |
| Technical | Done by technology | Firewalls, encryption, updates |
| Administrative | Done by policy and people | Training, security policies, background checks |
| Physical | Done in the physical world | Locks, guards, cameras |

| By purpose | Meaning | Example |
| --- | --- | --- |
| Preventive | Stops it happening | Two-factor sign-in, a firewall |
| Detective | Notices it happening | Logs, alarms, an intrusion detection system |
| Corrective | Fixes the damage afterwards | Restoring a backup |

No single control is enough, so professionals layer them. This is **defence in depth**: if one fails, another still stands.

### Matching controls to attacks
| Threat | Strongest everyday controls |
| --- | --- |
| Phishing | Stop and verify, two-factor sign-in, a password manager |
| Malware | Updates, not running unknown files, a standard user account |
| Ransomware | Tested backups kept separate, and updates |
| Password guessing and stuffing | Long, unique passwords, and two-factor sign-in |
| Lost or stolen laptop | Drive encryption, and a screen lock |

> Safety: You're learning these to defend. Don't try any attack on a system you don't own or have clear written permission to test, and that includes a school portal or a friend's phone. Sending fake messages "as a test", even as a joke, can be a crime. Practise only in isolated labs, and on platforms built for practice.

# Exercises
?? A worker's laptop has no drive encryption, and it's left in a taxi. Name the asset, the vulnerability, the threat, and one control.
=> Asset: the data on it. Vulnerability: no encryption. Threat: whoever finds it, or theft. Control: drive encryption, plus a screen lock.

?? A free game you download turns out to steal passwords. What type of malware is that?
=> A Trojan, as it pretended to be useful. If it records your typing, it also acts as a keylogger.

?? Malware spreads across a company's network overnight, without anyone clicking on anything. Virus or worm?
=> A worm, since it spreads by itself.

?? Is a security camera preventive or detective? And a door lock? And restoring a backup?
=> A camera is mainly detective, though it may also deter. A lock is preventive. Restoring a backup is corrective.

# Practice
Do a small risk assessment of your own digital life, with no private details written here.

1. List three assets you truly depend on, such as your email, your bank app, and your degree files.
2. For each, name one realistic threat and one real vulnerability you have right now. Are you reusing a password? Is there no backup?
3. Rate each risk as low, medium or high for both likelihood and impact.
4. For the highest risk, pick one control, and say whether it's preventive, detective or corrective.
5. Put that control in place today, if you can. Good first choices are two-factor sign-in on your email, and a long, unique password for it.
6. Find a real phishing or scam message you've received, or look in your spam folder. Without clicking anything, say which type of social engineering it is, and what emotion it was exploiting.

# Rubric
- I assessed my own real assets and my real weaknesses.
- I rated likelihood and impact separately.
- I chose a control that matches my highest risk, and said when I'll do it.

# Summary
- A threat exploits a vulnerability to harm an asset. Risk combines likelihood and impact.
- A virus needs a host, a worm spreads itself, and a Trojan tricks you into running it.
- Most attacks start with social engineering, which exploits urgency, authority, fear and greed.
- Controls are technical, administrative or physical, and preventive, detective or corrective.
- Layer controls. Only ever practise on systems you own or have written permission to test.

# Check
Q: Which is a vulnerability?
- A criminal gang operating in your city
* A website that has never been updated
- The customer database that a website holds
= It's a weakness. The gang is a threat, and the database is an asset.

Q: What makes a worm different from a virus?
* A worm spreads by itself, and a virus needs a host file
- A worm only ever affects phones, and a virus affects laptops
- A worm is harmless, but a virus always destroys your data
= Worms move across networks with no action from the user.

Q: Which malware disguises itself as something useful?
- A worm
* A Trojan
- A rootkit
= Like the wooden horse, it gets you to bring it in yourself.

Q: Your files are encrypted, and a note demands payment. What is this?
- A keylogger
- A botnet
* Ransomware
= It locks data for a ransom. Tested separate backups are the main defence.

Q: A text message says "Your bank account is blocked, tap here." What is this?
- Vishing, as a bank is involved
* Smishing
- Baiting
= It's phishing by SMS. Vishing is done by voice call.

Q: A flood of traffic takes a site offline, and no data is read. Which property is harmed?
* Availability
- Confidentiality
- Integrity
= This is denial of service. Nothing was seen or changed.

Q: Why is password reuse so dangerous?
- Sites can see each other's passwords and compare them
* One leak lets attackers into other accounts, by credential stuffing
- Using one password for long makes it wear out and fail
= Attackers try leaked passwords on other sites automatically.

Q: Which is a detective control?
- A firewall that blocks traffic
- Restoring a backup afterwards
* Reviewing logs for unusual activity
= Detective controls notice problems. Firewalls prevent, and restoring corrects.

Q: What does defence in depth mean?
- Buying the single most expensive security product available
* Layering controls, so that if one fails another still stands
- Keeping all of your servers in an underground building
= No single control is enough.

Q[transfer]: A caller knows your name and course, says they're from the NOUN IT desk, and asks for your portal password "to fix your TMA". Which is the best response?
- Give it, since they knew your course and your name
* Refuse, end the call and contact the school yourself
- Give only part of it, and change it right after the call
= This is pretexting. Real details don't prove who they are, and nobody genuine needs your password.

Q[transfer]: Risk is likelihood times impact. A student's only copy of a final project is on one old laptop. What most reduces this risk at low cost?
* A second copy, kept on another drive and tested
- A faster processor, so that the work finishes sooner
- A new wallpaper, so that the laptop is easy to spot
= It's a likely failure with a high impact. A tested backup greatly reduces the impact.

Q[transfer]: A classmate wants to "test" the school portal's login with a script, and says it's harmless. What should you say?
- It's fine, as long as no data gets changed by the script
- It's fine, as long as the results are reported to the school later
* It's not allowed without written permission, and it could be a crime
= Good intentions aren't permission. Use your own lab or an authorised practice platform.

# Cards
How do asset, threat, vulnerability and risk relate? :: A threat exploits a vulnerability to harm an asset. Risk combines likelihood and impact.
How do a virus, a worm and a Trojan differ? :: A virus needs a host file. A worm spreads itself. A Trojan tricks you into running it.
What's the difference between phishing, smishing and vishing? :: Email, SMS and voice call.
What are the three kinds of control by purpose? :: Preventive, detective and corrective.
What is defence in depth? :: Layering controls, so that one failure doesn't mean total failure.
Why does password reuse matter? :: Credential stuffing tries leaked passwords on other sites.

# Further
- NIST glossary, vulnerability :: https://csrc.nist.gov/glossary/term/vulnerability
- Harvard CS50's Introduction to Cybersecurity :: https://cs50.harvard.edu/cybersecurity/
- OWASP Top Ten, common web application risks :: https://owasp.org/www-project-top-ten/
