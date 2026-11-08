---
id: cos-history
pack: Computing from the beginning
title: Where computers came from, and what the field is
minutes: 40
source: Harvard CS50's Understanding Technology · Course page
url: https://cs50.harvard.edu/technology/
courses: UNIPORT (expected) COS 101, CSC 101 · NOUN COS101
---
# Goal
Tell the story of computing through its generations, describe a computer in terms of hardware, software and humanware, classify kinds of computers and software, and name the main areas and jobs in the field.

# Why
This is how COS 101 begins at both schools, and these topics are direct exam questions: generations of computers, who built what, types of computer and software. It also gives you a map. Over the coming years you'll study many separate topics, and it helps to see how they fit, and where your own direction, fraud, risk and security work, sits within the field.

# Lesson
## What a computer is
A **computer** is an electronic machine that accepts data, processes it according to stored instructions, stores the results and produces output. The key word is **stored**: its instructions, called a **program**, are held inside the machine, so changing what it does only takes changing the program. That's what makes one machine able to do millions of different jobs.

**Data** are raw facts. **Information** is data processed into something meaningful. The scores 45, 72 and 60 are data. "The class average is 59" is information.

## Before electronics
| When | What | Why it matters |
| --- | --- | --- |
| Ancient times | Abacus | Beads for doing arithmetic by hand |
| 1642 | Pascal's calculator (Blaise Pascal) | A mechanical adding machine |
| 1801 | Jacquard loom | Punched cards controlling a weaving pattern, an early form of instructions |
| 1830s | Analytical Engine (Charles Babbage) | Designed with memory and a processing unit, though never completed. Babbage is often called the father of the computer |
| 1840s | Ada Lovelace's notes | She published what's widely regarded as the first computer program, for that engine |
| 1890 | Herman Hollerith's tabulator | Punched cards processed the US census. His firm later became part of IBM |
| 1936 | Turing machine (Alan Turing) | A mathematical model of what can be computed at all |

> Note: Early dates and "firsts" are argued over, and exam answers depend on your course material. Learn the version in your school's text.

## The five generations
Exams love this table. Each generation is named after the electronic technology it used.

| Generation | Rough dates | Technology | Examples and features |
| --- | --- | --- | --- |
| First | 1940s to 1950s | Vacuum tubes | ENIAC, UNIVAC. Room-sized, hot and unreliable. Programmed in machine language |
| Second | 1950s to 1960s | Transistors | Smaller, cooler and more reliable. Assembly language and early high-level languages such as FORTRAN and COBOL |
| Third | 1960s to 1970s | Integrated circuits | Many transistors on one chip. Operating systems, keyboards and screens. IBM System/360 |
| Fourth | 1970s to now | Microprocessors | A whole processor on one chip. Personal computers, then laptops and phones |
| Fifth | Now and developing | AI, parallel processing and more | Systems that learn from data, and handle language and images |

The trend throughout is smaller, faster, cheaper and more reliable. **Moore's law**, Gordon Moore's observation, says the number of transistors on a chip roughly doubled every two years for decades. It's an observed trend and not a law of nature, and it has slowed.

?? What was the key technology of the second generation, and what did it replace?
=> The transistor, which replaced the vacuum tube, and which was smaller, cooler and more reliable.

## Hardware, software and humanware
A complete computer system has three parts, and COS 101 names all of them.

| Part | What it is | Examples |
| --- | --- | --- |
| **Hardware** | The physical equipment | Processor, memory, keyboard, screen |
| **Software** | The programs | Windows, Excel, Chrome |
| **Humanware** | The people who build, run and use it | Programmers, analysts, users |

### Basic parts of hardware
| Unit | Job | Examples |
| --- | --- | --- |
| Input devices | Bring data in | Keyboard, mouse, scanner, microphone |
| Central processing unit (CPU) | Carries out instructions. Its **control unit** directs, and its **arithmetic logic unit (ALU)** calculates | The processor |
| Main memory | Holds what's running | RAM, ROM |
| Secondary storage | Keeps data long-term | SSD, hard disk, flash drive |
| Output devices | Bring results out | Screen, printer, speaker |
| Peripherals | Anything attached outside the core | Printer, scanner, projector |

**RAM** loses its contents without power, as a later lesson explains. **ROM**, read-only memory, keeps its contents, and holds startup instructions.

### Kinds of software
| Type | Purpose | Examples |
| --- | --- | --- |
| **System software** | Runs the machine | Operating systems, drivers, utilities |
| **Application software** | Does a job for the user | Word processors, spreadsheets, browsers |
| **Programming software** | Used to write programs | Compilers, editors |

### Kinds of computer
| By size | Use |
| --- | --- |
| Supercomputer | Huge calculations, such as weather forecasting |
| Mainframe | Many users, large organisations, such as banks |
| Minicomputer or server | Serving a department or a website |
| Microcomputer | Personal use: desktops, laptops, tablets, phones |

By data handling, a computer can be **analog** (continuous values), **digital** (discrete values), or **hybrid** (both). Nearly everything you use is digital.

## The areas of the field
"Computing" is really a family of disciplines. Nigeria's national standards group them, and your degrees touch several.

| Area | Main question | Typical jobs |
| --- | --- | --- |
| Computer science | How do computation and algorithms work? | Software developer, researcher |
| Software engineering | How do we build reliable software? | Software engineer, tester |
| Information systems | How does technology serve an organisation? | Systems or business analyst |
| Information technology | How do we run technology for people? | Support, network or system administrator |
| Cybersecurity | How do we protect systems and data? | Security analyst, forensic examiner |
| Data science | What can we learn from data? | Data analyst, data scientist |

Computing also shapes society. It changes how we bank, learn and vote, and it brings problems: fraud, privacy loss, automation of jobs and bias in automated decisions. Professionals are responsible for thinking about those.

## The future
Predictions tend to age badly, so hold these lightly. Current active areas include AI, cloud computing, the Internet of Things, and quantum computing, which is still early for most practical uses. The thing that lasts is the fundamentals, which is why your degrees spend four years on them.

# Exercises
?? What's the difference between data and information? Give an example from school.
=> Data are raw facts, such as each student's score. Information is the processed result, such as "60% passed".

?? Classify: Windows 11, Microsoft Word, a printer driver, a compiler.
=> Windows 11 is system software. Word is application software. A driver is system software. A compiler is programming software.

?? Why did the transistor make such a difference over the vacuum tube?
=> Transistors are much smaller, use less power, produce less heat and fail far less often.

?? Name the parts of a CPU, and what each does.
=> The control unit directs the operations, and the arithmetic logic unit does calculations and comparisons.

# Practice
Make your own study sheet, from memory first. Close this lesson for the first three steps.

1. Draw a timeline of the five generations, with the technology for each and one example. Then open the lesson, and correct it.
2. List the hardware units, with one example of each from this laptop. Find out this laptop's processor and amount of RAM: press Ctrl + Shift + Esc, and open Performance.
3. List six programs installed on your laptop, and classify each as system or application software.
4. From the table of areas, choose the two jobs that interest you most. Write one sentence on why, and which of your courses leads toward each.
5. Check your school's own COS101 or CSC 101 material, if you have it. Note anything that differs from this lesson. For the exam, your school's version wins.

# Rubric
- I wrote the timeline from memory first, then corrected it.
- I used real hardware and software from this laptop.
- I connected two jobs to my own courses.

# Summary
- A computer accepts, processes, stores and outputs data, following a stored program.
- Generations follow technology: vacuum tubes, transistors, integrated circuits, microprocessors, and AI.
- A system is hardware, software and humanware.
- Software is system, application or programming software.
- Computing includes computer science, software engineering, information systems, IT, cybersecurity and data science.

# Check
Q: Which technology defined the first generation of computers?
* Vacuum tubes
- Transistors
- Microprocessors
= First generation machines such as ENIAC used vacuum tubes.

Q: Which generation is associated with integrated circuits?
- First
- Second
* Third
= Third generation machines put many transistors on one chip.

Q: Who designed the Analytical Engine?
- Alan Turing
* Charles Babbage
- Blaise Pascal
= Babbage designed it in the 1830s. Ada Lovelace wrote about it.

Q: What's humanware?
- Software that is written specially for human use
* The people who build, run and use computer systems
- Hardware that a person can pick up and carry
= A computer system is hardware, software and people.

Q: Which part of the CPU does calculations and comparisons?
* The arithmetic logic unit
- The control unit
- The clipboard
= The ALU calculates, and the control unit directs.

Q: Which is application software?
- A printer driver
- An operating system
* A spreadsheet program
= Applications do a job for the user. Drivers and operating systems run the machine.

Q: A bank's central system serves thousands of users at the same time. What kind of computer is it traditionally?
- A microcomputer
* A mainframe
- An analog computer
= Mainframes serve many users in large organisations.

Q: "The class average is 59." What is that?
* Information
- Raw data
- Hardware
= It's data that's been processed into something meaningful.

Q: What's Moore's law?
- A law of physics that says chips can never fail
* An observation that transistors on a chip doubled about every two years
- A legal rule on who is allowed to manufacture computer chips
= It's an observed trend, and it has slowed.

Q[transfer]: A company wants someone to keep its network running and its staff's laptops working. Which area best fits?
- Data science
* Information technology
- Computer science research
= IT is about running technology for people. Researchers study computation itself.

Q[transfer]: A phone and a 1950s room-sized computer both run stored programs. What's the biggest difference that explains the phone's power?
- The phone doesn't use any programs at all
* It has billions of tiny transistors on microprocessor chips
- The 1950s machine could only work with analog data
= The same basic idea runs on far denser technology.

Q[transfer]: Your school's COS101 text gives a different date for an early machine from this lesson. What should you write in the exam?
* The date in your school's material
- The date in this lesson, since it was written later
- Both dates, so that one of them will be right
= Sources do differ on early history. For what's examined, the school's material wins.

# Cards
What are the five generations' technologies? :: Vacuum tubes, transistors, integrated circuits, microprocessors, and AI and parallel processing.
What are the three parts of a computer system? :: Hardware, software and humanware.
What are the three kinds of software? :: System, application and programming software.
What are the two parts of a CPU? :: The control unit and the arithmetic logic unit.
What's the difference between data and information? :: Data are raw facts. Information is processed data with meaning.
Who designed the Analytical Engine, and who wrote its first program? :: Charles Babbage designed it. Ada Lovelace wrote the first published program for it.

# Further
- Harvard CS50's Understanding Technology :: https://cs50.harvard.edu/technology/
- GCFGlobal Computer Basics :: https://edu.gcfglobal.org/en/computerbasics/
