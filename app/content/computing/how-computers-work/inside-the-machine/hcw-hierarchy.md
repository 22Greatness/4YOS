---
id: hcw-hierarchy
pack: How Computers Work · Inside the machine
title: Why computers keep copies close by
minutes: 40
source: David J. Malan · Harvard CS50's Understanding Technology · Hardware
url: https://cs50.harvard.edu/technology/weeks/1/
courses: Helps with COS 101, CSC 101, IFT 212
video: https://cdn.cs50.net/cscie1a/2017/fall/lectures/hardware/hardware-360p.mp4
credit: Harvard CS50 · David J. Malan
start: 2145.9
end: 2544
python: yes
---
# Goal
Order the levels of memory by speed and size, explain what a cache is and why it works, and calculate how much a cache speeds things up.

# Why
Caching is one of the most important ideas in all of computing. It explains why a laptop feels faster on the second try, why a page loads quicker when you return to it, and how the internet copes with billions of people. As a programmer, it will explain why two programs doing the same work can differ hugely in speed. And caches can leak information, which matters in security.

# Lesson
## The funnel
> Clip: David Malan pictures memory as a funnel from disk down to the CPU, then uses a candy store's nearby stock to explain a cache. He also reads real cache sizes from Task Manager.

Fast memory is expensive, and cheap memory is slow. So computers use a little very fast memory and a lot of slow memory, arranged in levels. This is the **memory hierarchy**.

| Level | Rough size | Rough access time | Survives power off? |
| --- | --- | --- | --- |
| Registers | Bytes | Under 1 nanosecond | No |
| L1 cache | Tens of KB | About 1 nanosecond | No |
| L2 cache | Hundreds of KB to a few MB | A few nanoseconds | No |
| L3 cache | Several MB | Tens of nanoseconds | No |
| RAM | Gigabytes | About 100 nanoseconds | No |
| SSD | Hundreds of GB | About 100 microseconds | Yes |
| Hard disk | Terabytes | About 10 milliseconds | Yes |

Those times are rough, commonly quoted figures, and they vary by machine. But the pattern is what matters. A nanosecond is a billionth of a second, and a microsecond is 1,000 nanoseconds. A millisecond is a million nanoseconds. So if an L1 access took 1 second, a hard disk access would take about 4 months.

```python
l1 = 1
disk = 10_000_000
print(disk / l1)
print(round(disk / 60 / 60 / 24, 1))
```

```output
10000000.0
115.7
```

## What a cache is
A **cache** is a small, fast store holding copies of things that were recently used or are likely to be needed soon. The word is pronounced like "cash".

In the video's example, a shop keeps a little stock right on the counter, so that it needn't walk to the store room for each customer. Note that the store room still has the real stock. A cache holds **copies**.

- A **cache hit** means that what you wanted was in the cache. It's fast.
- A **cache miss** means it wasn't. You fetch it from the slower level, usually keeping a copy for next time.

When a cache is full, something must be removed. A common rule is to throw out what was **least recently used**.

## Why caches work
A small cache helps because programs don't use memory at random. They show **locality**:

| Kind | Meaning | Example |
| --- | --- | --- |
| **Temporal locality** | Something used now will probably be used again soon | A loop's counter |
| **Spatial locality** | Things near what you used will probably be used soon | The next item in a list |

So caches fetch nearby data too, in chunks. A program that goes through a list in order runs much faster than one that jumps around memory, even though both do the same arithmetic.

### Worked example: how much does it help?
Say a cache takes 1 ns, RAM takes 100 ns, and 95% of accesses are hits.

```text
average time = hit rate x cache time + miss rate x miss time
             = 0.95 x 1 + 0.05 x 100
             = 0.95 + 5
             = 5.95 ns
```

Without the cache, each access takes 100 ns. So a small cache makes access about 17 times faster on average. Notice too that the 5% of misses take up most of the time. Improving a hit rate from 95% to 99% gives 0.99 + 1 = 1.99 ns, about three times faster again.

?? With a hit rate of 90%, a 2 ns cache and 100 ns memory, what's the average access time?
=> 0.9 x 2 + 0.1 x 100 = 1.8 + 10 = 11.8 ns.

> Mistake: Thinking that a cache is where your data is kept. It's a copy for speed. Clearing a cache doesn't delete the original, though things may be slower until the cache fills again.

## Caches everywhere
This same idea appears at every level of computing.

| Cache | Copy of | Saves |
| --- | --- | --- |
| Processor cache | Parts of RAM | Waiting for RAM |
| RAM used by Windows | Recently used parts of the drive | Waiting for the drive |
| Browser cache | Pages and pictures you've seen | Data and time |
| DNS cache | Name lookups | A trip to a server |
| Content delivery network | Popular videos, kept in nearby cities | Long-distance traffic |

This is why a program opens faster the second time, and why a site you've visited loads more quickly. It's also why Windows may seem to use a lot of memory when idle: unused RAM is put to work as a cache, and is released when programs need it.

### Stale data
A cache's great problem is the copy going out of date, which is called being **stale**. If a site's page changes and your browser still shows the old one, reloading with **Ctrl + F5** usually fetches it fresh. Deciding when a copy is out of date is famously hard.

> Safety: Caches keep traces of what you did. A browser cache and history may reveal sites you've visited, which is why you use a private window on a shared computer, and sign out. Investigators look in these places too. In deeper security work, attackers can sometimes learn secrets by timing whether something was in a processor cache, and those are called **side-channel attacks**.

# Exercises
?? Put in order, fastest first: RAM, SSD, L1 cache, register, hard disk.
=> Register, L1 cache, RAM, SSD, hard disk.

?? A website loads faster the second time you visit it. Name the likely reason.
=> Your browser cache kept copies of its files, so they weren't downloaded again.

?? Why does going through a list in order tend to be faster than visiting its items in a random order?
=> Spatial locality. The cache brings in nearby items, so the next one is likely already there.

?? What's the average access time if the hit rate is 99%, the cache is 1 ns, and misses take 100 ns?
=> 0.99 + 1 = 1.99 ns.

# Practice
1. Open Task Manager with **Ctrl + Shift + Esc**, go to **Performance**, then **CPU**, and note the L1, L2 and L3 cache sizes shown for this laptop. Then click **Memory**, and note the amount shown as cached.
2. Time it yourself: close a large program completely, then open it and count the seconds until it's ready. Close it, and open it again straight away. Compare the two, and explain the difference. Your result may vary with what else is running.
3. Open a website with lots of pictures, and note how long it takes. Close the tab, then open it again. Which cache helped?
4. Complete the functions in the editor, and press **Test my code**.
5. Use your function to find the hit rate that gives an average of under 5 ns, when the cache takes 1 ns and a miss takes 100 ns.

# Starter
```python
def average_time(hit_rate, cache_time, miss_time):
    # hit rate x cache time + (1 - hit rate) x miss time
    return 0

def run_cache(requests, size):
    # Simulate a cache that holds "size" items. Throw out the oldest used item when full.
    # Return the number of hits.
    # The cache is a list, with the oldest used item at the front.
    cache = []
    hits = 0
    for item in requests:
        if item in cache:
            # A hit. Change the next line, so that hits goes up by 1
            hits = hits
            cache.remove(item)
            cache.append(item)
        else:
            # A miss: add the item at the end
            cache.append(item)
            # Too full? Remove the oldest. Finish this: if len(cache) > size: cache.pop(0)
    return hits

print(average_time(0.95, 1, 100))
print(run_cache(["a", "b", "a", "c", "a", "b"], 2))
```

# Tests
```python
assert round(average_time(0.95, 1, 100), 2) == 5.95, "95% hits, 1 ns and 100 ns gives 5.95"
assert average_time(1, 1, 100) == 1, "all hits gives just the cache time"
assert average_time(0, 1, 100) == 100, "no hits gives just the miss time"
assert run_cache([], 2) == 0, "no requests means no hits"
assert run_cache(["a", "a", "a"], 1) == 2, "the first a misses, and the next two hit"
assert run_cache(["a", "b", "c", "a"], 2) == 0, "a is thrown out before it is asked for again"
assert run_cache(["a", "b", "a", "c", "a"], 2) == 2, "using a keeps it in the cache"
```

# Solution
```python
def average_time(hit_rate, cache_time, miss_time):
    return hit_rate * cache_time + (1 - hit_rate) * miss_time

def run_cache(requests, size):
    cache = []
    hits = 0
    for item in requests:
        if item in cache:
            hits = hits + 1
            cache.remove(item)
            cache.append(item)
        else:
            cache.append(item)
            if len(cache) > size:
                cache.pop(0)
    return hits
```

# Rubric
- I read real cache sizes from this laptop.
- I timed a real program opening twice, and explained the result.
- My code passes the tests.

# Summary
- Fast memory is small and costly, so computers use levels: registers, caches, RAM, then storage.
- A cache holds copies of what's likely to be needed. A hit is fast, and a miss goes further away.
- Caches work because of locality: things used now, and things nearby, get used again soon.
- Average time = hit rate x cache time + miss rate x miss time.
- Copies can go stale, and caches leave traces.

# Check
Q: Which is the fastest?
* A processor register
- RAM
- An SSD
= Registers are inside the processor itself.

Q: Which is the largest?
- L3 cache
- RAM
* A typical hard disk
= Size grows as speed falls.

Q: What is a cache?
- The only place where your files are actually kept
* A small, fast store of copies
- A part of the screen that's used for pictures
= The original lives elsewhere. A cache holds copies.

Q: What's a cache miss?
- Finding what you wanted in the cache
* Not finding it, so going to a slower level
- A cache that has been broken by a power cut
= A hit is fast, and a miss has to fetch from further away.

Q: With a hit rate of 80%, a 1 ns cache and 100 ns memory, what's the average in ns?
A: 20.8 | 20.8 ns
= 0.8 x 1 + 0.2 x 100 = 20.8.

Q: A loop keeps using the same variable. Which kind of locality is that?
* Temporal
- Spatial
- Physical
= The same thing is used again soon. Spatial means things nearby.

Q: When a full cache needs room, what is a common rule for what to remove?
- The item that was added to the cache the most recently
- The item whose name comes first in the alphabet
* The item that was used the longest time ago
= Least recently used bets on locality.

Q: What does stale mean for a cached copy?
- The copy has taken up far too much space in the cache
* The original changed, and the copy is out of date
- The copy has been damaged by a heat problem
= Ctrl + F5 usually fetches a fresh web page.

Q[transfer]: Windows shows 70% of RAM in use while idle, including a large cached amount. Should you worry?
- Yes, it's a sure sign that malware is on this laptop
* Not from this alone, as cached memory is released when needed
- Yes, because RAM can be damaged if it's more than half full
= Unused RAM is put to work as a cache. Look at real slowness before worrying.

Q[transfer]: A popular video reaches millions of people in Nigeria quickly and without crossing an ocean each time. What explains this?
* Copies are cached on servers closer to viewers
- Each viewer's phone stores all videos ahead of time
- Videos travel faster than other data across cables
= A content delivery network is a cache on a large scale.

Q[transfer]: You use a shared computer at a business centre. Why use a private window?
- It makes the pages load much faster than normal
- It stops the internet provider from seeing your traffic
* It avoids leaving your browsing behind in history and cache there
= Caches leave traces. A private window doesn't hide you from the network, though.

# Cards
What's the memory hierarchy, fastest first? :: Registers, cache, RAM, SSD, hard disk.
What is a cache? :: A small, fast store holding copies of things likely to be needed soon.
What's the difference between a hit and a miss? :: A hit finds it in the cache. A miss must fetch from a slower level.
What's locality? :: Programs tend to reuse what they just used (temporal), and what's near it (spatial).
How do you calculate average access time? :: Hit rate x cache time + miss rate x miss time.

# Further
- Harvard CS50's Understanding Technology, Hardware notes :: https://cs50.harvard.edu/technology/notes/1/
- Dive into Systems, the memory hierarchy :: https://diveintosystems.org/
