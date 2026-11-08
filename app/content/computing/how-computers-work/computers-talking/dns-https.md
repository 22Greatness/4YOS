---
id: dns-https
pack: Operating systems and networks
title: From a website name to a secure connection
minutes: 50
source: Eric Twark · Harvard CS50's Computer Science for Business · Week 5, Implementing the Internet
url: https://cs50.harvard.edu/business/weeks/5/
courses: UNIPORT (expected) ICT 305 · NOUN NOU-CYB-222, CYB201
lecture: yes
credit: Harvard CS50 · Eric Twark
start: 2411.25
end: 2826.8
---
# Goal
Break a URL into its parts, follow a request through DNS, TCP, TLS and HTTP, and say exactly what the padlock proves and what it doesn't.

# Why
Most scams you'll ever study rest on people misreading a web address, or believing the padlock means a site is honest. Your planned channel is built around this. It's also core networking, and it's everyday work for a security analyst. Being able to read a hostname correctly protects your own money and accounts today.

# Lesson
## The parts of a URL
> Clip: Follow a browser request from the address bar through DNS, an encrypted HTTPS connection and the server's response. The written lesson explains how TLS verifies the site's identity and what the padlock can tell you.

```text
https://portal.example.edu.ng:443/results/view?session=2026#top
```

| Part | Example | Meaning |
| --- | --- | --- |
| Scheme | `https` | How to talk to the server |
| Hostname | `portal.example.edu.ng` | Which server, the part to check |
| Port | `443` | Which service on that server, usually hidden |
| Path | `/results/view` | Which page or resource |
| Query | `?session=2026` | Extra values for the server |
| Fragment | `#top` | A place in the page, not sent to the server |

Hostnames read **from the right**. In `portal.example.edu.ng`, `ng` is the top-level domain, `edu.ng` is a level under it, `example.edu.ng` is the registered domain, and `portal` is a subdomain the owner created. The owner of `example.edu.ng` can create any subdomain they want. That's the key to reading scam links.

### Worked example: who controls this?
| Link | Registered domain | Who really controls it |
| --- | --- | --- |
| `https://www.mybank.com/login` | `mybank.com` | The bank |
| `https://mybank.com.secure-login.net/` | `secure-login.net` | Whoever registered `secure-login.net` |
| `https://secure-login.net/mybank.com/` | `secure-login.net` | The same. The bank's name is just in the path |
| `https://mybank.co/login` | `mybank.co` | Possibly anyone. `.co` isn't `.com` |
| `https://rnybank.com` | `rnybank.com` | Someone else. `rn` looks like `m` |

> Mistake: Looking for the bank's name somewhere in the link. Its presence means nothing. Look only at what sits immediately before the end of the hostname, the first `/` closes it.

?? Who controls `https://login.nou.edu.ng.account-verify.com/start`?
=> Whoever registered `account-verify.com`. Reading from the right, that's the registered domain, and everything before it is a subdomain they chose.

## DNS: from name to address
Computers route by IP address, not by name. The **Domain Name System** is a huge distributed database that maps names to addresses. It's often compared to a phone book, but no single place holds all of it.

1. Your browser checks its cache, and Windows checks its own.
2. If it isn't there, your computer asks its **DNS resolver**, usually run by your provider or router, or chosen by you.
3. If the resolver doesn't have it cached, it asks a **root server**, which refers it to the servers for `.ng` or `.com`.
4. Those refer it to the domain's **authoritative** server, which gives the actual answer.
5. The resolver returns the address, and everyone caches it for a time.

The two most common record types are **A** for an IPv4 address, and **AAAA** for an IPv6 address. There are also others, such as MX, for mail servers.

Standard DNS is sent unencrypted, so your provider and others on the path can see which names you look up, and traditionally its answers aren't verified. Newer options include DNS over HTTPS, which encrypts the lookups. Either way, a DNS answer only tells you **where to connect**, and nothing about whether to trust what's there.

## From connection to page
Once your browser has an address:

1. **TCP** sets up a reliable connection to the server, normally on port 443 for HTTPS, or 80 for plain HTTP. A **port** identifies which service on the machine you want.
2. **TLS** sets up encryption, and checks the server's certificate.
3. **HTTP** carries the actual request and response. The browser asks for a path, as in `GET /results/view`, and the server returns a **status code** and the content.

| Status code | Meaning |
| --- | --- |
| 200 | OK |
| 301 or 302 | Moved, go to another address |
| 403 | Forbidden |
| 404 | Not found |
| 500 | The server hit an error |

**HTTPS** is simply HTTP running inside TLS.

## What TLS does
TLS provides three things.

| Property | What it means | CIA link |
| --- | --- | --- |
| Encryption | People on the path can't read the contents | Confidentiality |
| Integrity | People on the path can't alter the contents unnoticed | Integrity |
| Authentication | The server proves it holds the certificate for that hostname | Identity of the name |

Encryption here uses a pair of matching keys: a **public key** anyone may have, and a **private key** its owner keeps secret. A **digital signature** is a mark made with a private key, which anyone can check with the public key, and which can't be forged without it. As the video explains, the server has a **certificate**: a public key, for a hostname, signed by a **certificate authority** (CA). Your browser and operating system ship with a list of CAs they trust. Your browser checks that the certificate chain leads to a trusted CA, that it covers the exact hostname, and that it's within its dates. Only then does it use it.

Note what stays visible, as the video's envelope analogy shows. The source and destination IP addresses are on the outside, and observers can usually also see the hostname being connected to. They can't see the path, the page contents or what you type.

## What the padlock doesn't prove
This is the most important part of this lesson. A valid certificate means **"this connection is encrypted, and you're talking to this hostname"**. It doesn't mean the site is honest.

| The padlock proves | The padlock doesn't prove |
| --- | --- |
| The connection is encrypted | That the site is safe |
| The server controls that hostname | That the site belongs to who it says |
| Nobody on the path can read or alter it | That the people running it are honest |

Certificates for ordinary domains are issued automatically, often for free, to anybody who can show they control a domain. Criminals get them routinely for lookalike sites. So `https://mybank-secure-login.net` can have a perfectly valid certificate. The encryption works perfectly, and it protects your password all the way to the thief.

> Safety: For anything that matters, such as your bank, your school portal or your email, don't follow links from messages. Type the address yourself or use a bookmark you've made. If your browser shows a certificate warning, stop. Don't click through, and don't change security settings to make it go away. Check the address by another route. On public Wi-Fi, a warning can mean someone is interfering with your connection.

# Exercises
?? In `https://www.uniport.edu.ng.fees-pay.org/portal`, what's the registered domain?
=> `fees-pay.org`. Everything before it is a subdomain, and `uniport.edu.ng` here means nothing.

?? A site shows a valid padlock, and asks for your BVN and card details to "unlock a grant". Does the padlock make it safe?
=> No. It proves the connection is encrypted to that hostname. Anyone can get a certificate. The request itself is a warning sign.

?? `ping` by address works, but `ping` by name fails. Which step is broken?
=> DNS. The network route is fine, but the name isn't being turned into an address.

?? Someone on the same Wi-Fi watches your HTTPS traffic. Can they see your password? Can they see which site you visited?
=> Not the password or the page contents. They can see the server's address and usually the hostname.

# Practice
This needs no sign-in and no changes to any settings. If you're offline, do what you can, and say which steps you couldn't observe.

1. Open Command Prompt: press the Windows key, type `cmd` and press Enter. Type or paste the command, then press Enter. Use the command below. Identify the resolver's section and the answer's section. Note whether any addresses came back, and whether they were IPv4, IPv6 or both. Leave the resolver's address out of your notes.
2. Type `https://www.iana.org/` directly into your browser. Check the final hostname in the address bar, since it may have redirected you.
3. Click the icon to the left of the address, and find the connection and certificate information. Note who issued the certificate and when it expires.
4. Take any three links from messages or emails you've received, without opening them, and write the registered domain of each one. Don't include any private details.
5. Write one sentence on what the DNS lookup told you, and one on what the browser verified. Then write one thing that neither of them proved.

# Command
```text
nslookup www.iana.org
```

# Rubric
- I ran a real lookup, and I can point to the resolver and the answer.
- I found who issued a real certificate.
- I worked out the registered domain of three real links, without opening them.

# Summary
- Read hostnames from the right. The registered domain is the name just before the public ending (`.com`, `.com.ng`, `.edu.ng`), together with that ending.
- DNS turns a name into an address. It says where to connect, not whether to trust.
- TCP connects, TLS secures, and HTTP carries the request. HTTPS is HTTP inside TLS.
- TLS gives encryption, integrity and proof of the hostname.
- The padlock doesn't mean a site is honest. Criminals have valid certificates too.

# Check
Q: A link opens with valid HTTPS on a lookalike domain. What does the secure connection tell you?
* It's protected to that hostname, and you must still check that it's the site you meant
- The site belongs to the organization that you intended to visit, because certificates verify ownership
- The DNS result proves that the site is safe to use, because a name that resolves has been checked
= TLS authenticates the hostname. Whether that hostname is the one you wanted is for you to check.

Q: In `https://portal.nou.edu.ng/results`, what's the hostname?
- `https://portal.nou.edu.ng`
* `portal.nou.edu.ng`
- `portal.nou.edu.ng/results`
= The hostname excludes the scheme and the path.

Q: What does DNS do?
- It encrypts a website's traffic between the browser and server
* It turns a name into an address
- It checks that a website's owner is honest and is registered
= DNS finds where to connect. Encryption is TLS, and nothing automatic checks honesty.

Q: What's the normal port for HTTPS?
A: 443
= HTTPS normally uses port 443, and plain HTTP uses port 80.

Q: Which record type gives an IPv4 address?
- MX
* A
- AAAA
= A gives IPv4 and AAAA gives IPv6. MX identifies mail servers.

Q: A web page returns status code 404. What does it mean?
- The server is switched off
- You don't have permission
* The page was not found
= 404 means not found. 403 is forbidden and 500 is a server error.

Q: What does a certificate authority do?
- It runs the DNS servers for each and every country
* It signs certificates that browsers are set up to trust
- It scans all of a site's content to confirm that it's honest
= CAs vouch for control of a hostname, not for good behaviour.

Q: Someone on your Wi-Fi watches your HTTPS session. What can they normally read?
- Your password, but not the name of the site
- All of the contents of the page you're on
* The server's address, but not the page contents
= TLS hides the contents. The address, and usually the hostname, stay visible.

Q: Your browser shows a certificate warning for your bank's site. What should you do?
- Click through it, as the warnings are usually harmless
* Stop, and check the address by another route
- Change your browser's settings to hide such warnings
= A warning means the identity check failed. It could be an attack.

Q[transfer]: You receive `https://nou.edu.ng.scholarship-apply.info/form`. Who controls it?
- NOUN, since `nou.edu.ng` appears at the start of the link
* Whoever registered `scholarship-apply.info`
- Nobody, since links with a form in them have no owner
= Read from the right. Everything before the registered domain is a subdomain that the owner chose.

Q[transfer]: A scam victim says: "I checked it had the padlock, so I thought it was real." What's the most accurate reply?
* The padlock shows encryption to that hostname, not honesty
- The padlock must have been faked by the people running the site
- The padlock only works when it's used on a government website
= The certificate was probably real. Criminals can get them. That's what makes this so effective.

Q[transfer]: Your data provider can't read your HTTPS banking pages, yet it knows you visit your bank. How?
- It has a copy of each bank's private encryption keys
* DNS lookups and connection details reveal the destination
- TLS only encrypts the first page that you visit on a site
= Contents are protected, but destination information can still be seen. So encrypted doesn't mean invisible.

# Cards
How do you find who controls a link? :: Read the hostname from the right. The registered domain is the name just before the public ending (`.com`, `.edu.ng`), together with that ending. Ignore what's before it and the path.
What does DNS do, and not do? :: It turns a name into an address. It doesn't tell you if the destination can be trusted.
What three things does TLS provide? :: Encryption, integrity, and proof that the server holds a certificate for that hostname.
What does the padlock not prove? :: That the site is honest or belongs to who it claims. Criminals get valid certificates too.
What can someone watching your HTTPS traffic still see? :: The server's address and usually the hostname, but not the contents.
What should you do at a certificate warning? :: Stop, and check the address by another route. Don't click through.

# Further
- Harvard CS50's Introduction to Cybersecurity, Week 2 :: https://cs50.harvard.edu/cybersecurity/weeks/2/
- Microsoft Learn, nslookup command :: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup
- MDN, Transport Layer Security :: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security
- RFC 8446, the TLS 1.3 standard, for reference :: https://www.rfc-editor.org/rfc/rfc8446
