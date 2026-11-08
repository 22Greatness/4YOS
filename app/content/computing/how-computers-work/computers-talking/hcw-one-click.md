---
id: hcw-one-click
pack: How Computers Work · Computers talking
title: Everything that happens in one click
minutes: 50
source: Harvard CS50's Understanding Technology
url: https://cs50.harvard.edu/technology/
courses: Helps with COS 101, CSC 101, ICT 305
---
# Goal
Trace everything that happens from clicking a link to seeing the page, naming the hardware, software and network steps, and use that trace to find where a real problem lies.

# Why
This lesson joins up the entire course. "What happens when you open a web page?" is a classic job interview question, because a good answer proves that you understand the whole machine. You'll also use this skill constantly, because any real fault, from a slow site to a security incident, is found by knowing the chain and testing it link by link.

# Lesson
## The whole journey
> Note: This is a practice lesson. It teaches nothing new, and has no lecture. It connects what you've already learned, so go back to earlier lessons if a step is unclear.

You click a link to `https://www.example.com/fees`. Here's what happens, with the unit where you learned it.

| Step | What happens | Learned in |
| --- | --- | --- |
| 1 | The touchpad sends a signal, and a driver passes it to Windows | The layers of software |
| 2 | Windows tells the browser, a process with its own memory, that you clicked | How Windows runs an app |
| 3 | The processor runs the browser's instructions, loop after loop of fetch, decode, execute | How a processor runs a program |
| 4 | The browser reads the URL, and checks its cache for this page | Why computers keep copies close by |
| 5 | It needs an address, so it checks caches, then asks a DNS resolver | From a website name to a secure connection |
| 6 | Your laptop compares the address with its subnet mask, and sees that it isn't local | Follow a packet off your network |
| 7 | The network interface sends the packet over Wi-Fi to the default gateway | Follow a packet off your network |
| 8 | Routers pass packets hop by hop, across cables | What a network is |
| 9 | TCP connects, then TLS checks the certificate and sets up encryption | From a website name to a secure connection |
| 10 | The browser sends an HTTP request. The server replies with text, in many packets | What a network is |
| 11 | The bytes are decoded as UTF-8 text | How letters become numbers |
| 12 | Images arrive compressed, and they're decompressed to pixels in RAM | How files get smaller, How pictures become numbers |
| 13 | The page is held in RAM, and some of it is cached on the drive | Memory and persistent storage |
| 14 | The graphics hardware sets each pixel's red, green and blue values | How pictures become numbers |
| 15 | Gates and transistors, billions of them, did all of the above | From switches to logic gates |

All of this usually happens in under a few seconds.

?? At which steps could someone on the same public Wi-Fi see something, if the site used plain HTTP and not HTTPS?
=> At the network steps, 7 to 10, they could read the request and reply. With HTTPS they'd still see the address and usually the hostname, but not the contents.

## Tracing a problem
When something fails, don't guess. Work out which link in the chain broke. Each test should split the possibilities roughly in half.

### Worked example: "the internet isn't working"
| Test | If it works | If it fails |
| --- | --- | --- |
| Does another site load? | The fault is with that site | It's probably something of yours |
| Does another device work on this Wi-Fi? | It's this laptop | It's the Wi-Fi or the provider |
| Does `ping` to the gateway work? | The local network is fine | It's between the laptop and the router |
| Does `ping 8.8.8.8` work? | The internet connection is fine | It's the router, or beyond it |
| Does `nslookup example.com` work? | DNS is fine | Suspect DNS |

### Worked example: a slow laptop
| Clue from Task Manager | What it points to |
| --- | --- |
| CPU near 100%, and one app at the top | The processor, and that app |
| Memory near full, with the disk busy too | RAM, and the page file being used |
| Disk at 100% and an old hard disk | Storage |
| All low, but the page is slow | The network, or the server |
| Everything fine until a recent change | That change |

Always ask what changed recently, and write down what you tried. Change one thing at a time. These are the same habits you use in debugging code.

## Practising your explanation
You should now be able to explain each of the following in about a minute, closed book, without jargon that you can't explain yourself. Say them aloud, or write them down.

| Question | Check that you mention |
| --- | --- |
| How does a computer add two numbers? | Bits, gates, the ALU, registers |
| How does a letter get saved in a file? | Encoding, bytes, RAM, then storage |
| Why does a laptop lose unsaved work in a power cut? | RAM is volatile |
| How does a computer start? | Firmware, boot loader, kernel |
| What does the padlock prove? | Encryption and the hostname, not honesty |
| Why is a second app open slower than expected? | RAM, cache, or the page file |

> Mistake: Thinking that you know this because the table looks familiar. That's the illusion of knowing. Cover it up, explain it from memory, and only then check yourself.

> Safety: This trace is also how defenders think. Each step is somewhere an attack could happen: a fake link at step 1, malware at step 2, a false DNS answer at step 5, a dishonest Wi-Fi at step 7. Learning the chain is how you learn to defend it. Only test systems you own or have written permission to test.

# Exercises
?? A page loads, but its images are missing. Which part of the chain would you suspect, and why not DNS for the main site?
=> The main site's DNS, connection and HTML worked, since the page came. The images may come from another server or may have failed separately. Check the browser's message, or try opening one directly.

?? You open a spreadsheet you just closed, and it opens faster. Which idea explains this?
=> Caching. Windows kept recently read parts of the file, and of the program, in RAM.

?? `ping 8.8.8.8` works, and `ping www.example.com` says it could not find the host. What's wrong?
=> DNS. The route works, and the name lookup is failing.

?? Task Manager shows memory at 98%, disk activity high, and CPU at 20%. What's the most likely bottleneck?
=> RAM. Windows is moving memory to the page file on the drive, which makes the disk busy.

?? Name a step in the journey that only exists because of an agreement rather than physics.
=> Many do: UTF-8, HTTP, IP addresses and RGB are all agreed formats and protocols.

?? Why can your browser show a page without ever knowing the route that it took?
=> Layers. The browser uses HTTP and TCP, and each router only knows the next hop.

# Practice
Follow a real click, and write up what you can actually observe.

1. Open a browser, and press **F12**, which opens its developer tools. Click the **Network** tab. Then type `https://www.iana.org/` in the address bar and press Enter.
2. In the list, click the first row. Find the status code, the remote address, and the content type. Note the size and time of the largest item in the list.
3. Reload with **Ctrl + R**. Which items now say they came from a cache? Compare the time and the amount transferred.
4. Click the padlock or site icon, and find who issued the certificate.
5. Open Task Manager, and find the browser's memory and CPU while the page loads.
6. Now write your own 15-step trace of that click, in your own words, closed book, including what you saw. Use the table to check it only after finishing.
7. Think of a real computer problem you've had. Write the tests that you'd run, in order, to find the broken link.

Keep your trace, as you'll use it in the course project.

# Rubric
- I observed a real page load in the developer tools.
- I wrote the trace from memory, before I checked it against the table.
- I wrote an ordered set of tests for a real problem.

# Summary
- One click uses the whole machine: input, drivers, a process, the processor, cache, DNS, routing, TLS, HTTP, encoding, decompression, RAM and the screen.
- To find a fault, test link by link, and choose tests that split the possibilities.
- Ask what changed recently, and change one thing at a time.
- Each step is also a possible point of attack, and a point to defend.
- If you can explain it with the source closed, you know it.

# Check
Q: You click a link. What usually happens before the browser asks a DNS resolver?
* The browser checks its own caches for the answer
- The router encrypts the page that you are asking for
- The server sends the page's pictures to your laptop
= Caches are checked first, because they're faster.

Q: Your laptop finds that a destination isn't local. Where does the packet go first?
- To the website's server, directly
* To the default gateway
- To the DNS resolver
= The gateway is the next hop for anything not local.

Q: In which step are the bytes of a web page turned into characters?
- When TLS checks the certificate
- When the router chooses the next hop
* When they're decoded as text, usually UTF-8
= Text is stored as numbers by agreement, and the browser must decode it.

Q: A web page's images arrive as JPEG. What must happen before they can be shown?
* They're decompressed into pixels in RAM
- They're encrypted with the browser's key
- They're converted into HTML text first
= JPEG stores compressed data, and the screen needs a value for each pixel.

Q: `ping 8.8.8.8` works, but no names resolve. Which link is broken?
- The Wi-Fi connection
* DNS
- The laptop's RAM
= The route works, so the name lookup is what's failing.

Q: Which test best shows whether a fault is your laptop or your Wi-Fi?
- Restarting the website's own server
* Trying another device on the same Wi-Fi
- Buying a larger plan for mobile data
= A good test splits the possibilities in half.

Q: Task Manager shows CPU near 100% from one app. Memory and disk are low. What's the bottleneck?
* The processor, because of that app
- The network connection
- The drive's free space
= Look at the resource that's actually full.

Q: Which is the best debugging habit?
- Changing many settings at once to save some time
* Changing one thing at a time, and noting the result
- Reinstalling Windows as soon as a problem appears
= Otherwise you can't tell which change mattered.

Q: What makes it possible for the browser to work without knowing the route its data takes?
- Each browser stores a complete map of the internet
* Layers: each only deals with its own job
- All data on the internet goes through one main router
= Each router knows only the next hop, and the browser doesn't need to know any of it.

Q[transfer]: A user gets a fake bank page after clicking an emailed link. The padlock shows. At which point in the chain did this go wrong?
* At the start: the link's hostname was never the bank's
- At step 14, when the screen set the colour of the pixels
- At step 3, when the processor fetched an instruction
= The chain worked correctly, to the wrong place. HTTPS only proves the hostname.

Q[transfer]: A site loads slowly from your laptop, and quickly on your friend's phone on another network. Both use the same browser type. What's a good next test?
- Replace your laptop's memory right away
* Try your laptop on the friend's network, or their phone on yours
- Ask the website's owner to make the site smaller
= This changes one thing at a time, and it separates device from network.

Q[transfer]: In an interview you're asked how a computer shows a web page. What makes an answer strong?
- Using as many technical words as you can possibly fit in
* Tracing the steps in order, and saying why each is needed
- Saying that it depends on which browser you're using
= A clear chain shows real understanding.

# Cards
What are the main stages when you open a web page? :: Input and process, cache, DNS, routing, TCP and TLS, HTTP, decoding and decompressing, then display.
How should you test a fault? :: Test link by link, choosing tests that split the possibilities, changing one thing at a time.
What's the first question to ask about a sudden problem? :: What changed recently?
Why does a browser not need to know the route? :: Layers: each deals only with its own job, and routers know only the next hop.
How do you know you really understand this? :: You can explain it from memory, with the source closed.

# Further
- Harvard CS50's Understanding Technology :: https://cs50.harvard.edu/technology/
- MDN, how the web works :: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works
