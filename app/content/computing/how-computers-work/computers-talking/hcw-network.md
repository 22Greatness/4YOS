---
id: hcw-network
pack: How Computers Work · Computers talking
title: What a network is
minutes: 40
source: Harvard CS50's Understanding Technology · Internet
url: https://cs50.harvard.edu/technology/weeks/2/
courses: Helps with COS 101, ICT 305, NOU-CYB-222
---
# Goal
Say what a network and the internet are, explain why data travels in packets, name the main protocols and layers, and identify the devices that connect your laptop to the world.

# Why
A computer on its own is only part of the story. Nearly everything you do now crosses a network, and every later security topic assumes you understand how. This lesson gives you the big picture that the next two lessons fill in with addresses, routers, names and encryption.

# Lesson
## From one computer to many
> Note: This lesson has no lecture of its own. The next two lessons have clips from the Internet and Securing Systems lectures, and the full Internet lecture is linked below.

A **network** is two or more computers connected so that they can exchange data. Sizes vary.

| Type | Stands for | Covers | Example |
| --- | --- | --- | --- |
| **PAN** | Personal area network | A few metres | Your phone and earbuds, over Bluetooth |
| **LAN** | Local area network | A home or building | Your hostel Wi-Fi |
| **WAN** | Wide area network | Cities or countries | A bank's links between branches |

The **internet** is a worldwide network of networks. No single company owns it. Thousands of networks, run by **internet service providers** (ISPs), universities and companies, agree to connect and to carry each other's traffic. The **web** is just one service that runs on it, alongside email, video calls and more.

Physically, it's mostly cables. Much international traffic travels through fibre-optic cables on the sea floor, and several land in Lagos. That's why a cable fault can slow the internet across a whole region. Your phone's "wireless" connection only goes wirelessly as far as the nearest mast, and from there it's mostly cable.

## The devices
| Device | Job |
| --- | --- |
| **Network interface** | The part of your laptop that connects it to a network |
| **Switch** | Connects devices within one LAN |
| **Wi-Fi access point** | Connects wireless devices to the LAN |
| **Router** | Connects different networks, and passes traffic toward its destination |
| **Modem** | Connects to your provider's line |

A home "router" box usually does all of these jobs at once. A phone's hotspot does too, and it reaches the internet through mobile data.

### Client and server
Most internet services work on the **client-server** model. A **client** asks, and a **server** answers. Your browser is a client. A **server** is simply a computer, or a program on it, that waits for requests. Other systems are **peer-to-peer**, where machines exchange directly with each other.

## Why packets
Data doesn't travel as one long stream. It's cut into small pieces called **packets**, each carrying a header with where it's from and where it's going. Think of sending a book by post, one page per envelope, with the page numbers marked.

| Benefit | Why |
| --- | --- |
| Sharing | Many people's packets can share one line, taking turns |
| Reliability | If a route fails, later packets can take another |
| Repair | Only lost packets need resending, not the whole file |

This is called **packet switching**. It's a big part of why the internet was able to grow so large. Packets from one file may travel different routes and arrive out of order, and the receiver puts them back together.

### Speed: bandwidth and latency
| Word | Meaning | Comparison |
| --- | --- | --- |
| **Bandwidth** | How much data per second, in bits per second | How wide a road is |
| **Latency** | How long one packet takes, in milliseconds | How long the drive takes |

They are different. A connection can have high bandwidth and high latency: a big download finishes fine, and a video call still lags.

> Mistake: Thinking "slow internet" always means low bandwidth. If web pages take time to start loading and calls lag, but big downloads are fast once started, latency is the likelier problem. More bandwidth won't fix that.

## Protocols
A **protocol** is an agreed set of rules for communicating, just as a phone call has rules: you say hello, take turns, and say goodbye. Computers from different makers can only talk because they follow the same protocols.

| Protocol | Job |
| --- | --- |
| **IP** | Addresses packets, and gets them across networks. It doesn't promise delivery |
| **TCP** | Makes a reliable connection: numbers packets, resends lost ones, puts them in order |
| **UDP** | Sends quickly with no guarantees, and suits live calls and games |
| **DNS** | Turns names into addresses |
| **HTTP and HTTPS** | Web pages. HTTPS is encrypted |
| **DHCP** | Gives devices their network settings |

### Layers
Networking is organised in layers, as software is. Each one only deals with its own job, and relies on the layer below.

| TCP/IP layer | Job | Examples |
| --- | --- | --- |
| Application | What the program wants | HTTP, DNS, email |
| Transport | Reliable or quick delivery between programs | TCP, UDP |
| Internet | Addressing and routing between networks | IP |
| Link | Moving data over one physical connection | Wi-Fi, Ethernet |

Exams and courses also use the seven-layer **OSI model**. It splits these up more finely, and it's mainly used as a teaching and reference model. Learn it when your networking course reaches it.

### Worked example: layers as envelopes
You request a web page. Each layer wraps the data with its own header, as with envelopes inside envelopes.

```text
[ Link header [ IP header [ TCP header [ HTTP request ] ] ] ]
```

Routers read the IP header to choose the next hop. Only the destination's TCP and HTTP layers deal with what's inside. With HTTPS, the part inside is encrypted, which is how a router can forward a packet without being able to read it.

?? A live video call uses UDP for its sound. Why not TCP?
=> TCP would stop to resend lost packets, and the delay would be worse than a tiny gap in the sound. Late data is useless in a live call.

> Safety: Anyone between you and the destination could potentially see unencrypted traffic, including whoever runs a public Wi-Fi. Prefer HTTPS sites, and avoid banking on public Wi-Fi if you can use your mobile data. A tool such as Wireshark can capture traffic, and you should only use it on networks you own or have permission to monitor. Capturing other people's traffic without permission can be a crime.

# Exercises
?? Is your hostel's Wi-Fi a LAN or a WAN?
=> A LAN. It covers one building or site.

?? What's the difference between the internet and the web?
=> The internet is the worldwide network of networks. The web is pages carried on it, one service among many.

?? A 1 GB file is split into packets, and a few get lost. What happens under TCP?
=> TCP notices that they're missing, and those packets alone get resent.

?? Your download speed test is excellent, but video calls lag badly. What should you suspect?
=> High latency, not low bandwidth.

# Practice
1. Draw your own network on paper: this laptop, the Wi-Fi or hotspot it connects to, and everything else you know of on it. Mark where it joins your provider, and label each link wired or wireless.
2. Press the Windows key, type `cmd`, and press Enter. Run the command below. It sends a small test to a public address. Note the time values, in milliseconds. That's your latency.
3. Try it on two different connections if you can, or at two different times of day. Compare them.
4. Use your data app, or a speed test you trust, to find your bandwidth, if data allows. Say which you'd improve first for video calls, and for big downloads.
5. List three things you did online today, and name which protocol or service each one used, such as HTTPS or DNS.

If you're offline, note what happens, and explain which step failed.

# Command
```text
ping 8.8.8.8
```

# Rubric
- I drew my real network, and marked what's wired and wireless.
- I measured real latency.
- I can explain the difference between bandwidth and latency in my own words.

# Summary
- A network connects computers. The internet is a worldwide network of networks.
- Data travels in packets, each with a header showing where it's going.
- Bandwidth is how much per second. Latency is how long one packet takes.
- A protocol is an agreed set of rules. TCP is reliable, and UDP is quick.
- Networking works in layers, with each wrapping the one above.

# Check
Q: What is the internet?
* A worldwide network of networks
- A single huge computer owned by one company
- Another name for the pages shown in a browser
= Thousands of networks agree to connect. The web is one service on it.

Q: Why is data split into packets?
- To make each file look smaller than it really is
* So lines can be shared, and only lost pieces get resent
- Because bits can't travel further than a few metres
= Packet switching shares lines and recovers from failures.

Q: Which protocol makes a connection reliable by resending lost packets?
- IP
* TCP
- UDP
= IP doesn't promise delivery. UDP has no guarantees.

Q: What is a protocol?
- A person who runs a large computer network
- The cable that connects a laptop to a router
* An agreed set of rules for communicating
= It's what lets machines from different makers talk.

Q: What does a router do?
* Connects networks, and passes traffic toward its destination
- Stores all of the web pages for an entire country
- Turns the website names you type into pictures
= It chooses the next hop for each packet.

Q: What's latency?
- How much data can arrive per second
* How long one packet takes to arrive
- How many devices can share one network
= Bandwidth is the amount per second.

Q: In the client-server model, what's the browser?
* The client
- The server
- The router
= A client asks, and a server answers.

Q: Which layer does IP belong to in the TCP/IP model?
- Application
- Transport
* Internet
= IP handles addressing and routing between networks.

Q[transfer]: You're sending exam-result files to a lecturer. Which is the better choice of transport?
* TCP, because every byte has to arrive correctly
- UDP, because it's quicker and speed matters most
- Neither, because files can't travel in packets
= Files need reliability. UDP suits live media, where late data is useless.

Q[transfer]: A fibre cable under the sea is damaged, and the internet slows across West Africa, though it doesn't fully stop. Why doesn't it stop?
- All the region's websites are stored on people's phones
* Traffic can be sent over other routes, at reduced capacity
- Radio signals carry all of the traffic that's left over
= Packets can take other routes, and fewer routes means slowdowns.

Q[transfer]: A café's Wi-Fi owner could capture your traffic. What protects your bank password there?
- Being far away from the Wi-Fi access point
* HTTPS encryption, though mobile data is a better choice
- Closing all of your other tabs before you sign in
= HTTPS hides the contents from whoever runs the Wi-Fi.

# Cards
What's the difference between a LAN and a WAN? :: A LAN covers one building or site. A WAN covers cities or countries.
Why does the internet use packets? :: Lines can be shared, routes can change, and only lost pieces need resending.
What's the difference between bandwidth and latency? :: Bandwidth is how much data per second. Latency is how long one packet takes.
What's the difference between TCP and UDP? :: TCP is reliable, and resends lost packets. UDP is quick with no guarantees.
What are the four TCP/IP layers? :: Application, transport, internet and link.

# Further
- Harvard CS50's Understanding Technology, Internet :: https://cs50.harvard.edu/technology/weeks/2/
- Computer Networks: A Systems Approach, free book :: https://book.systemsapproach.org/
