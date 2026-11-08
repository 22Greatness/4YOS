---
id: network-addresses
pack: Operating systems and networks
title: Follow a packet off your network
minutes: 50
source: David J. Malan · Harvard CS50's Understanding Technology · Week 2: Internet
url: https://cs50.harvard.edu/technology/weeks/2/
courses: UNIPORT (expected) ICT 305, COS 101 · NOUN NOU-CYB-222, GST103
lecture: yes
credit: Harvard CS50 · David J. Malan
start: 1612.65
end: 1764.69
---
# Goal
Read your network settings with `ipconfig`, use a subnet mask to decide if an address is local, and explain how a packet reaches a server through your default gateway and routers.

# Why
Nothing in cybersecurity makes sense without this. NOUN's networking course starts here, and packet captures, firewalls, and attack and defence all assume you can read addresses and follow a route. It's also how you diagnose real problems, such as whether a failure is your Wi-Fi, your router or the wider internet. You already have the binary to understand it.

# Lesson
## Addresses and packets
> Clip: The video starts as David Malan reads a Mac's network settings, then shows the Windows equivalent and explains routers and hops. Subnet calculation and tools like `ping` are added in this lesson.

Data crosses a network in small chunks called **packets**. A large download becomes many thousands of them. Each carries a header with its source and destination addresses, like the writing on an envelope.

An **IPv4 address** is 32 bits written as four numbers from 0 to 255, such as `192.168.1.10`. Each number is one byte, which you saw in the binary lesson. There are about 4.3 billion such addresses, which isn't enough for today's devices, so **IPv6** uses 128 bits, written like `2001:db8::1`. You will see both.

An address belongs to a **network interface**, such as Wi-Fi or Ethernet, and not really to the computer. A laptop on Wi-Fi and Ethernet has two.

### Private and public addresses
Certain ranges are reserved for private networks, under the standard RFC 1918.

| Range | Common use |
| --- | --- |
| `10.0.0.0` to `10.255.255.255` | Companies, universities |
| `172.16.0.0` to `172.31.255.255` | Companies |
| `192.168.0.0` to `192.168.255.255` | Homes, phone hotspots |

These addresses don't work on the public internet, and millions of networks reuse them. Your router uses **NAT**, or network address translation, to share one public address among your devices. So the address on your laptop isn't the address that websites see. Mobile networks in particular often share one public address among many customers.

> Note: `127.0.0.1` is **loopback**: it always means this computer itself. An address starting `169.254` usually means your computer tried to get an address automatically and failed, which is a useful clue that something's wrong with the network or the router.

### How you get an address
On most networks, **DHCP** automatically gives your device four things when it connects, and they're the four to know:

| Setting | Purpose |
| --- | --- |
| IP address | Identifies your interface on this network |
| Subnet mask | Says which addresses are local |
| Default gateway | The router to send everything else to |
| DNS server | Turns names into addresses, covered next lesson |

## Is the destination local?
Before sending, your computer must decide if the destination is on the same local network. The **subnet mask** answers this. Where the mask has 1 bits, the address must match for two devices to be on the same network.

The most common mask is `255.255.255.0`. In binary that's 24 ones followed by 8 zeros, which is why it's also written `/24`. For that mask, the first three numbers name the network, and the last names the device.

### Worked example: local or not?
Your address is `192.168.1.10`, and the mask is `255.255.255.0`.

| Destination | First three numbers | Same network? | Sent to |
| --- | --- | --- | --- |
| `192.168.1.25` | 192.168.1 | Yes | Directly to that device |
| `192.168.2.25` | 192.168.2 | No | The default gateway |
| `8.8.8.8` | 8.8.8 | No | The default gateway |

Masks don't have to fall on these neat boundaries. The computer actually does a bitwise AND of the address and the mask, and compares the results. With `/26`, for instance, the last byte is split, which you will calculate in the networking course. Python's standard library can check it for you:

```python
import ipaddress
network = ipaddress.ip_network("192.168.1.0/24")
print(ipaddress.ip_address("192.168.1.25") in network)
print(ipaddress.ip_address("192.168.2.25") in network)
print(network.netmask)
print(network.num_addresses)
```

```output
True
False
255.255.255.0
256
```

?? Your address is `10.0.1.34`, with mask `255.255.255.0`. Is `10.0.1.1` local? What about `10.0.2.1`?
=> `10.0.1.1` is local, since the first three numbers match. `10.0.2.1` is not, so it goes via the gateway.

## The default gateway and routers
A **router** connects networks. Your **default gateway** is the router on your local network that takes everything not local. It's the exit door, and it must be on your local network, otherwise your computer couldn't reach it.

A router keeps a **routing table**, which is essentially a list of address prefixes and where to send them next. As the video says, it picks a direction and passes the packet to the **next hop**. No router knows the entire path. Each only knows a better next step, and that's enough. Each step is a **hop**.

### A packet's journey
Say your laptop at `192.168.1.10` sends a packet to a web server at a public address.

1. **Your laptop** sees the destination isn't local, so it sends the packet to the gateway.
2. **Your home router** applies NAT, replacing your private source address with its public one, and sends it to your provider.
3. **Your provider's routers** pass it on, following their tables.
4. **Routers across the internet** carry it hop by hop, possibly through several countries.
5. **The server** receives it and replies to the public address.
6. **Your router** recognises the reply and passes it back to your private address.

Each packet has a **time to live** value, reduced at every hop, and when it reaches zero, the packet is dropped. This stops packets from circling forever. Packets may also get lost, or arrive out of order, and higher-level protocols such as TCP deal with that.

## Tools for looking
| Command | What it tells you |
| --- | --- |
| `ipconfig` | Your address, mask and gateway |
| `ipconfig /all` | Also your DNS servers and whether DHCP is on |
| `ping 8.8.8.8` | Whether you can reach an address, and the round-trip time in milliseconds |
| `tracert 8.8.8.8` | The routers along the path |

`ping` makes a good troubleshooting ladder. Ping your gateway. If that fails, the problem's between you and your router. If it works but a public address fails, the problem's beyond your router. If an address works but a website's name doesn't, suspect DNS.

> Note: A failed ping doesn't prove a machine is off, because many systems block ping on purpose. Treat it as a clue, not proof.

## Address isn't identity
An IP address tells you where to send data, not who someone is or whether to trust them.

> Safety: Private addresses aren't protection in themselves. Other devices on the same Wi-Fi can often reach yours, depending on the firewall. On unfamiliar networks, such as a campus or café, choose the **Public network** profile in Windows, which is more restrictive. Your IP addresses are not secret, but they do identify your network, so keep them out of screenshots and notes you share. Only run `ping` and `tracert` as normal, and don't scan networks you don't own. Scanning without permission can break school rules, or the law.

# Exercises
?? Is `172.20.5.1` a private address? And is `172.40.5.1`?
=> `172.20.5.1` is, as it's within 172.16 to 172.31. `172.40.5.1` is not, so it's public.

?? Your computer shows `169.254.33.7`. What does that suggest?
=> It didn't get an address from DHCP. Check the Wi-Fi connection or the router.

?? Pinging your gateway works, but `ping 8.8.8.8` doesn't. Where is the problem likely to be?
=> Beyond your router: the router's link to your provider, your data, or the provider itself.

?? A `/24` network has 256 addresses. How many does a `/25` have, and why?
=> 128. One more network bit leaves 7 bits for devices, and 2^7 is 128. A `/24` has 2^8.

# Practice
Read your own settings. Change nothing, and keep actual addresses out of your answer, since they identify your network.

1. Open Command Prompt: press the Windows key, type `cmd` and press Enter. Type or paste the command, then press Enter. Use the command below. Find the adapter you're actually using, and ignore any marked Media disconnected.
2. Find its IPv4 Address, Subnet Mask and Default Gateway. If any is missing, record that.
3. Is your address private? Which range is it in? Use the mask to say which part names the network.
4. Run `ping` with your gateway's address, then `ping 8.8.8.8`. Note whether each worked and the rough times, and which was faster and why.
5. Run `tracert 8.8.8.8`. Count the hops.

Explain in your own words where a packet goes first when you open a website, and why. If you're offline, say what you saw and what you'd expect when connected.

# Command
```text
ipconfig
```

# Rubric
- I found my real interface and read its address, mask and gateway.
- I can say which part of my address is the network.
- I kept my real addresses out of my written answer.

# Summary
- IPv4 addresses are 32 bits, written as four bytes. Private ranges are reused behind NAT.
- DHCP gives you an address, mask, gateway and DNS server.
- The mask decides what's local. Local traffic goes direct, and everything else goes to the default gateway.
- Routers pass packets hop by hop. None knows the whole path.
- Ping your gateway, then a public address, then a name, to find where a problem is.

# Check
Q: Your laptop has a default gateway. A packet is headed outside the local network, and no more specific route applies. Where does the laptop send it first?
* To the default gateway
- To the DNS resolver, since the destination is remote
- To every device on the local network at the same time
= The gateway is the next hop for anything not local.

Q: With address `192.168.5.20` and mask `255.255.255.0`, which destination is local?
- `192.168.6.20`
* `192.168.5.200`
- `10.168.5.20`
= With this mask, the first three numbers must match.

Q: Which of these is a private address?
- `8.8.8.8`
- `172.32.0.1`
* `10.1.2.3`
= 10.x.x.x is private. 172 is private only from 16 to 31, so 172.32 is public.

Q: How many bits are in an IPv4 address?
A: 32 | 32 bits
= Four numbers of 8 bits each make 32 bits.

Q: What's the largest number allowed in one part of an IPv4 address?
A: 255
= Each part is one byte, and 8 bits hold 0 to 255.

Q: What does DHCP do?
- It turns website names into their addresses for you
* It gives your device its network settings automatically
- It encrypts your connection to the local router
= DHCP hands out an address, mask, gateway and DNS server. Turning names into addresses is DNS.

Q: What does NAT let a home router do?
* Share one public address among many private devices
- Encrypt all of the traffic that leaves the house
- Give each device its own permanent public address
= NAT rewrites private source addresses to the router's public one.

Q: Which command shows the routers along the path to an address on Windows?
- `ipconfig`
- `nslookup`
* `tracert`
= `tracert` lists the hops. `ipconfig` shows local settings, and `nslookup` does name lookups.

Q: Your device shows an address starting `169.254`. What does it most likely mean?
- You are connected to a very fast private network
* It tried to get an address automatically, and failed
- A website has blocked your computer's real address
= This self-assigned range is a clue that DHCP didn't work.

Q[transfer]: A website works by its address but not by its name, while your gateway pings fine. What should you suspect first?
- A broken network cable between you and the router
- The website's server has shut down for good
* DNS, the name lookup step
= The route clearly works, so what's failing is turning the name into an address.

Q[transfer]: A colleague says "the attacker's IP was 192.168.1.50, so we can find them on the internet." What's wrong?
* That's a private address, so it can't identify anyone on the public internet
- Attackers don't have IP addresses when they're online
- The address has too many numbers in it to be valid
= Private addresses are reused everywhere. It points to a device inside some local network.

Q[transfer]: You're on campus Wi-Fi with a file sharing service running on your laptop. Why does the network profile matter?
- It decides how fast the Wi-Fi can possibly run
* Others on the same network may be able to reach your services
- It changes which websites you're able to look at
= Being on a shared network exposes you to its other devices. The Public profile is more restrictive.

# Cards
What does a default gateway do? :: It's the next hop for traffic not on your local network.
What does the subnet mask decide? :: Which part of an address names the network, and so which addresses are local.
What are the private IPv4 ranges? :: 10.x.x.x, 172.16 to 172.31.x.x, and 192.168.x.x.
What four settings does DHCP give you? :: IP address, subnet mask, default gateway and DNS server.
What's the troubleshooting ladder with ping? :: Gateway, then a public address, then a name. Where it fails tells you where to look.
What does an address starting 169.254 suggest? :: The device failed to get an address from DHCP.

# Further
- Harvard CS50's Understanding Technology, Week 2: Internet :: https://cs50.harvard.edu/technology/weeks/2/
- RFC 1918, private address ranges :: https://www.rfc-editor.org/rfc/rfc1918
- Microsoft Learn, ipconfig command :: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig
