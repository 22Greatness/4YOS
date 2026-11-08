---
id: hcw-cpu
pack: How Computers Work · Inside the machine
title: How a processor runs a program
minutes: 50
source: David J. Malan · Harvard CS50's Understanding Technology · Hardware
url: https://cs50.harvard.edu/technology/weeks/1/
courses: Helps with COS 101, CSC 101, IFT 212
video: https://cdn.cs50.net/cscie1a/2017/fall/lectures/hardware/hardware-360p.mp4
credit: Harvard CS50 · David J. Malan
start: 977.7
end: 1254
python: yes
---
# Goal
Name the parts of a processor, trace the fetch-decode-execute cycle through a small program by hand, and explain what clock speed and cores really do.

# Why
This is what "running a program" actually means. Once you can trace it, programming stops being mysterious, and so do many security bugs, which trick a processor into treating data as instructions. It's core exam material in computer architecture, and it tells you what a processor's specification really promises.

# Lesson
## What's inside
> Clip: David Malan shows what a CPU physically is, then explains cores, hyperthreading and systems on a chip. It doesn't cover the fetch-decode-execute cycle, which this lesson teaches.

A **processor** or **CPU** carries out instructions one small step at a time. Its main parts are:

| Part | Job |
| --- | --- |
| **Control unit** | Directs everything, deciding what happens next |
| **Arithmetic logic unit (ALU)** | Does arithmetic and comparisons, using the gates from the last lesson |
| **Registers** | A few tiny, very fast storage slots inside the processor |
| **Program counter** | A special register holding the address of the next instruction |
| **Clock** | A steady pulse that keeps everything in step |

**Memory** is like a long row of numbered boxes. Each box's number is its **address**. Both the program's instructions and its data sit in memory. This design, keeping instructions and data in the same memory, is called the **stored-program** or **von Neumann** model.

## The cycle
A processor repeats one loop, billions of times a second.

1. **Fetch:** read the instruction at the address in the program counter, and add 1 to the program counter.
2. **Decode:** work out what that instruction means.
3. **Execute:** do it, which may use the ALU or memory.

Then it goes again. That's it. Everything your laptop does is this loop, repeated.

Instructions are extremely simple. A real processor's instructions are of this kind: load a number from memory into a register, add two registers, store a register into memory, or jump to another address.

### Worked example: tracing a tiny program
Here's a made-up machine with one working register, called A. The program adds the values at addresses 10 and 11, and stores the result at address 12.

| Address | Contents | Meaning |
| --- | --- | --- |
| 0 | LOAD 10 | Copy memory 10 into A |
| 1 | ADD 11 | Add memory 11 to A |
| 2 | STORE 12 | Copy A into memory 12 |
| 3 | HALT | Stop |
| 10 | 7 | Data |
| 11 | 5 | Data |
| 12 | 0 | Will hold the result |

Trace it, one cycle at a time.

| Cycle | Program counter before | Fetched | What it does | A | Memory 12 |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | LOAD 10 | A = 7 | 7 | 0 |
| 2 | 1 | ADD 11 | A = 7 + 5 | 12 | 0 |
| 3 | 2 | STORE 12 | Memory 12 = 12 | 12 | 12 |
| 4 | 3 | HALT | Stop | 12 | 12 |

```python
memory = {0: ("LOAD", 10), 1: ("ADD", 11), 2: ("STORE", 12), 3: ("HALT", 0), 10: 7, 11: 5, 12: 0}
pc = 0
a = 0
while True:
    op, addr = memory[pc]
    pc = pc + 1
    if op == "LOAD":
        a = memory[addr]
    elif op == "ADD":
        a = a + memory[addr]
    elif op == "STORE":
        memory[addr] = a
    elif op == "HALT":
        break
print(memory[12])
```

```output
12
```

?? If memory 10 held 20 and memory 11 held 3, what would memory 12 hold at the end?
=> 23. The same instructions run on different data.

### Decisions and loops
A **jump** instruction sets the program counter to another address. A **conditional jump** does so only if something is true, such as a register being zero. Every `if` and every loop in any programming language becomes this in the end.

## Instructions are just numbers
Instructions are stored as bits, like everything else. The processor treats the bits at the program counter as an instruction, whatever they really are.

> Safety: This is the root of many serious attacks. If an attacker can get their own data into memory and make the processor jump to it, the data is run as instructions. This is the idea behind many **memory corruption** attacks, such as buffer overflows. Modern systems defend against this by marking memory as data-only, and you'll study this in security courses.

## Clock speed
The **clock speed** is the number of pulses per second. 3 GHz means 3 billion cycles a second. Instructions may take several cycles, or modern designs may finish several per cycle, so cycles aren't quite the same as instructions.

| Claim | Reality |
| --- | --- |
| "Higher GHz is always faster" | No. Design matters, so compare within a similar generation |
| "A chip runs at one speed" | It speeds up when busy (turbo) and slows when idle or hot |

A clip in a later lesson says a gigahertz means a billion "things" per second. That's a good first idea, and the truth is the rule above.

## Cores and threads
A **core** is a complete processing unit: its own control unit, ALU and registers. Two cores can truly run two things at the same moment. **Hyperthreading** lets one core keep two threads ready, so it looks like two **logical processors** to Windows, although it isn't as fast as two full cores.

A program only gains from many cores if it was written to split its work. So 8 cores won't help a program that only uses one, and this is why a higher core count doesn't always feel faster.

> Mistake: Thinking that 2 cores make everything twice as fast. Many tasks can't be split evenly, and the parts that must run in order limit the gain.

## Instruction sets
Each processor family understands its own **instruction set**. Most Windows laptops use **x86-64**, and most phones use **ARM**. A program compiled for one won't run directly on the other. That's why software downloads often ask about your system type, and the next lesson explains how programs get turned into these instructions.

# Exercises
?? In the tiny machine, what does the program counter hold after fetching the instruction at address 2?
=> 3, because it's added to straight after the fetch.

?? What are the three steps of the cycle?
=> Fetch, decode, execute.

?? A 4-core chip with hyperthreading shows how many logical processors, assuming two threads per core?
=> 8.

?? Write a tiny-machine program to subtract memory 11 from memory 10, assuming a SUB instruction, and store it in 12.
=> LOAD 10, SUB 11, STORE 12, HALT.

# Practice
1. By hand, trace this program with memory 10 = 4 and memory 11 = 9: LOAD 11, ADD 10, ADD 10, STORE 12, HALT. Use a table like the lesson's. What ends up in memory 12?
2. Open Task Manager with **Ctrl + Shift + Esc**, and go to **Performance**, then **CPU**. Note the speed, cores and logical processors of this laptop. Watch the speed for a minute, while the laptop is idle and then while opening apps. Does it change?
3. Complete the `run` function in the editor. It's the tiny machine, with the ADD instruction missing and SUB to add. Press **Test my code**.
4. In your words, say what's happening inside when you run any program.

# Starter
```python
def run(memory):
    # Runs the tiny machine, and returns the memory at the end.
    pc = 0
    a = 0
    while True:
        op, addr = memory[pc]
        pc = pc + 1
        if op == "LOAD":
            a = memory[addr]
        elif op == "STORE":
            memory[addr] = a
        elif op == "HALT":
            return memory
        # Add the "ADD" and "SUB" instructions here

program = {0: ("LOAD", 10), 1: ("ADD", 11), 2: ("STORE", 12), 3: ("HALT", 0), 10: 7, 11: 5, 12: 0}
print(run(program)[12])
```

# Tests
```python
p = run({0: ("LOAD", 10), 1: ("ADD", 11), 2: ("STORE", 12), 3: ("HALT", 0), 10: 7, 11: 5, 12: 0})
assert p[12] == 12, "7 + 5 should store 12"
q = run({0: ("LOAD", 10), 1: ("SUB", 11), 2: ("STORE", 12), 3: ("HALT", 0), 10: 9, 11: 4, 12: 0})
assert q[12] == 5, "9 - 4 should store 5"
r = run({0: ("LOAD", 10), 1: ("ADD", 10), 2: ("ADD", 10), 3: ("STORE", 11), 4: ("HALT", 0), 10: 3, 11: 0})
assert r[11] == 9, "3 + 3 + 3 should store 9"
```

# Solution
```python
def run(memory):
    pc = 0
    a = 0
    while True:
        op, addr = memory[pc]
        pc = pc + 1
        if op == "LOAD":
            a = memory[addr]
        elif op == "ADD":
            a = a + memory[addr]
        elif op == "SUB":
            a = a - memory[addr]
        elif op == "STORE":
            memory[addr] = a
        elif op == "HALT":
            return memory
```

# Rubric
- I traced a program by hand, with a table, before using the code.
- I took real readings from this laptop's processor.
- My machine passes the tests.

# Summary
- A processor has a control unit, an ALU, registers, a program counter and a clock.
- It loops: fetch, decode, execute, billions of times a second.
- Instructions and data both sit in memory, as bits.
- Conditional jumps are what every `if` and loop become.
- GHz alone doesn't settle speed. Cores only help when work can be split.

# Check
Q: What are the three steps of the processor's cycle?
- Open, save and close
* Fetch, decode and execute
- Input, output and storage
= The processor repeats these billions of times a second.

Q: What does the program counter hold?
* The address of the next instruction
- The total number of programs that have run
- The result of the most recent addition
= It's added to after each fetch, and jumps change it.

Q: Which part does arithmetic and comparisons?
- The control unit
* The ALU
- The clock
= The arithmetic logic unit is built from gates.

Q: What are registers?
- The list of everyone who's allowed to use the laptop
- Slots on the motherboard for sticks of RAM
* Tiny, very fast storage slots inside the processor
= They hold the values the processor is working on right now.

Q: A tiny machine runs: LOAD 10, ADD 11, ADD 11, STORE 12, HALT. Memory 10 is 2, and memory 11 is 3. What's in memory 12?
A: 8
= 2 + 3 + 3 = 8.

Q: Which instruction makes loops and `if` statements possible?
* A conditional jump
- A store into memory
- A load from memory
= It changes the program counter only when a condition holds.

Q: What does a core do?
- Stores your files when the power is off
* Runs instructions as a complete processing unit
- Provides the steady pulse for the whole laptop
= Two cores can truly run two things at the same moment.

Q: A chip has 6 cores and shows 12 logical processors. What explains that?
- Half of the cores are spares, in case some of them fail
* Hyperthreading lets each core keep two threads ready
- Windows always counts each core twice, by mistake
= It helps, but it's not the same as having 12 full cores.

Q[transfer]: An attacker sends far more data than a program expected, and the extra bytes end up where the processor then jumps to them. Why is that dangerous?
- The extra data slows down the laptop for a few minutes
* The processor may run those bytes as instructions
- The extra data will use up all of the laptop's storage
= Instructions are just bits. This is the idea behind memory corruption attacks.

Q[transfer]: You download a program made for ARM phones to an x86-64 Windows laptop. Why won't it run directly?
* The laptop's processor has a different instruction set
- The file is too small to be run on any kind of laptop
- Phones and laptops can't use the same type of electricity
= Each processor family understands its own instructions.

Q[transfer]: Your statistics script uses only one core, and it's slow. You move to a chip with more cores, each no faster. What happens?
- The script runs in proportion to the number of cores
* It barely speeds up, unless it's rewritten to split its work
- The script stops working, as it has too many cores
= Extra cores only help programs written to use them.

# Cards
What's the processor's basic cycle? :: Fetch, decode, execute, repeated billions of times a second.
What does the program counter do? :: It holds the address of the next instruction.
What's the stored-program model? :: Instructions and data are kept together in the same memory.
What's the difference between a core and a logical processor? :: A core is a full processing unit. Hyperthreading makes one core appear as two logical processors.
Why do more cores not always help? :: A program must be written to split its work.

# Further
- Harvard CS50's Understanding Technology, Hardware notes :: https://cs50.harvard.edu/technology/notes/1/
- Nand2Tetris :: https://www.nand2tetris.org/
- Dive into Systems, free book :: https://diveintosystems.org/
