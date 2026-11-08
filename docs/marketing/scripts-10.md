# 4YOS · 10 High-Impact Social Scripts (TikTok, IG Reels, WhatsApp Status)

> **IMPORTANT NOTICE:** Draft for Owner Approval only. Every script is strictly grounded in genuine 4YOS lesson material, real Nigerian academic contexts, and authentic Ayo character cues. Nothing is recorded, voiced, or published without the owner's explicit written approval.

---

## Overview & Production Guidelines
- **Duration:** 30–45 seconds per script.
- **Pacing:** High information density, plain Nigerian English/Pidgin blend, zero filler.
- **Visuals:** On-screen screen recording of 4YOS app (clean dark mode, interactive diagrams, KaTeX formulas, or live Python execution) paired with animated Ayo mascot reactions (rendered WebP poses from `art/clips/`).
- **Call to Action (CTA):** "Study the full lesson offline on 4YOS — link in bio. Pass MTH 101 from first basics."
- **Mandatory Notice:** Any shown result cards carry the badge *"Practice estimate, not an official result"*.

---

### Script 1: The ₦500 Error in Python — Why 0.1 + 0.2 isn't 0.3
- **Course:** COS 102 (Programming 1)
- **Visual:** Ayo looking confused at a laptop screen. Python REPL typing `0.1 + 0.2 == 0.3` which outputs `False`.
- **Ayo Pose:** `think` -> `teach` -> `celebrate`.
- **Audio / Voiceover:**
  > "You write code to calculate change at a campus kiosk: 10 kobo plus 20 kobo.  
  > You type `0.1 + 0.2 == 0.3` in Python... and Python tells you **False**!  
  > Why? Are computers mad?  
  > No! Computers don't use base 10; they use binary bits. In base 2, fractions like 1/10 and 2/10 repeat forever, just like 1/3 repeats as 0.3333 in decimal!  
  > Python rounds it off at 53 bits, giving you `0.30000000000000004`.  
  > If you don't know this before your 100L practical test, your code will fail test cases you swore were correct.  
  > We teach you how IEEE-754 binary floating points work from hand calculation up. Open COS 102 on 4YOS. Zero data needed once installed."

---

### Script 2: UNIPORT 8:00 AM Registration Crash — How Distributed Systems Fix It
- **Course:** System Design & Systems Lab
- **Visual:** 4YOS Systems Lab interactive component diagram. 50,000 students bombarding a single SQL server vs. an edge rate limiter and Redis queue.
- **Ayo Pose:** `point` -> `waddle` -> `teach`.
- **Audio / Voiceover:**
  > "It's 8:00 AM on UNIPORT portal registration day. 50,000 students tap 'Register Course' at the exact same second.  
  > What happens? *Error 504 Gateway Timeout!* The portal dies.  
  > Why? A standard relational database connection pool only handles about 200 concurrent connections before thread starvation crashes the server.  
  > In our 4YOS Systems Lab, you don't just complain about school portals — you build the solution!  
  > You place an Edge Rate Limiter at the CDN, drop incoming writes into an atomic Redis stream, and buffer updates to D1 at a steady 3,000 QPS.  
  > Learn real system design from 100L. Try the interactive lab on 4YOS."

---

### Script 3: Surds Without Tears — The Conjugate Trick Every Lecturer Tests
- **Course:** MTH 101 (Elementary Mathematics I)
- **Visual:** Smooth KaTeX rendering on 4YOS showing $\frac{2}{3 - \sqrt{5}}$, zooming in on multiplying top and bottom by $(3 + \sqrt{5})$.
- **Ayo Pose:** `greeting` -> `teach` -> `celebrate`.
- **Audio / Voiceover:**
  > "Your lecturer drops this in MTH 101 continuous assessment: 'Simplify 2 divided by (3 minus root 5)'.  
  > Half the hall starts panicking because you cannot divide by an irrational square root.  
  > Here is the secret: difference of two squares!  
  > Multiply top and bottom by its conjugate: 3 PLUS root 5.  
  > Look at the bottom: $3^2 - (\sqrt{5})^2 = 9 - 5 = 4$.  
  > The square root vanishes completely! Now 2 over 4 cancels to 1/2, leaving $(3 + \sqrt{5})/2$. Done in 15 seconds!  
  > In 4YOS, we break every single algebra formula down step-by-step with zero skipped steps. Install 4YOS today."

---

### Script 4: Mean vs. Median — The Salary Lie in Job Ads
- **Course:** STA 111 (Descriptive Statistics)
- **Visual:** Observable Plot dot plot in 4YOS. 9 workers earning ₦70,000 and 1 CEO earning ₦5,000,000. Moving the slider dynamically shifts the mean while median stays rock solid.
- **Ayo Pose:** `think` -> `point` -> `teach`.
- **Audio / Voiceover:**
  > "A company advertises: 'Our average salary is ₦560,000!'  
  > You apply, get hired, and your monthly pay is... ₦70,000. Did they lie?  
  > Mathematically, no! 9 junior staff earn ₦70k each, but the CEO takes ₦5 million.  
  > The arithmetic MEAN is ₦563,000! That one outlier dragged the entire average up.  
  > That's why honest statisticians use the MEDIAN — the middle value — which is ₦70,000!  
  > Understand how numbers deceive before your statistics exams. Master STA 111 on 4YOS."

---

### Script 5: The Infinite While-Loop Trap
- **Course:** COS 102 (Programming 1)
- **Visual:** Browser tab freezing with an infinite loop `while balance > 0: transport += 100`. 4YOS Python runner catching the execution timeout and highlighting the exact line.
- **Ayo Pose:** `sleep` -> `wake` -> `teach`.
- **Audio / Voiceover:**
  > "You write a program to track your weekly allowance.  
  > You type `while balance > 0:` but inside the loop, you forgot to subtract your spending from `balance`!  
  > You hit Run... your phone gets hot, the fan spins, and the browser freezes!  
  > In 4YOS, our Pyodide engine isolates your code in a dedicated web worker with an automatic timeout guard.  
  > It catches the runaway loop, shows you the exact line missing state change, and restores your code checkpoint without losing a single keystroke.  
  > Learn programming safely at your own pace on 4YOS."

---

### Script 6: The 5-Point CGPA Reality — How One F Destroys Your 2:1
- **Course:** Academic Strategy & Results Engine
- **Visual:** 4YOS Result Slip view showing 100L First Semester. Changing MTH 101 from F (0.0) to B (4.0) jumps the GPA from 2.85 to 3.75.
- **Ayo Pose:** `point` -> `teach`.
- **Audio / Voiceover:**
  > "Listen carefully: under the NUC 5.0 CGPA system, a 3-unit course carries 15 potential quality points!  
  > If you score an F in MTH 101, you get 0 points, but those 3 units are still added to your total divisor.  
  > That single course pulls a 4.0 First Class down to a 2.8 Second Class Lower in one semester.  
  > And even when you clear the carry-over later, that original attempt remains part of your permanent academic transcript.  
  > Don't wait until exam week. 4YOS calculates your exact practice GPA, units, and grade targets from Day 1. Start preparing now."

---

### Script 7: Logic Gates with Lightbulbs — Building an AND Gate
- **Course:** COS 101 (Computer Architecture)
- **Visual:** 4YOS interactive circuit: two mechanical switches in series connected to a battery and a glowing lamp. Flipping switch A doesn't light it; flipping switch B doesn't light it; flipping BOTH lights the lamp.
- **Ayo Pose:** `teach` -> `celebrate`.
- **Audio / Voiceover:**
  > "How does a computer with billions of microscopic transistors actually 'think'?  
  > It starts with something as simple as two light switches in your room.  
  > Wire two switches in series on one wire.  
  > If Switch A is closed (1), does the bulb turn on? No!  
  > If Switch B is closed (1), does the bulb turn on? No!  
  > The bulb ONLY turns on when Switch A AND Switch B are closed. That is an AND gate!  
  > From simple switches, you build half-adders, ALUs, and modern CPUs.  
  > Play with real circuit models inside 4YOS."

---

### Script 8: Why You Can't Divide By Zero
- **Course:** MTH 101 (Numbers & Algebra)
- **Visual:** Step-by-step algebraic proof: $a = b \implies a^2 = ab \implies a^2 - b^2 = ab - b^2 \implies (a-b)(a+b) = b(a-b)$. Dividing by $(a-b)$ yields $2 = 1$.
- **Ayo Pose:** `think` -> `point` -> `teach`.
- **Audio / Voiceover:**
  > "Someone shows you this math trick that proves $2 = 1$:  
  > 'Let $a = b$. Multiply both sides by $a$. Subtract $b^2$. Factorize both sides. Divide by $(a - b)$... and suddenly $a + b = b$, so $2 = 1$!'  
  > Where did the math break?  
  > Line 4: they divided by $(a - b)$! But since $a = b$, $(a - b)$ is ZERO!  
  > Division by zero is undefined because multiplication by zero destroys uniqueness: $0 \times 1 = 0$ and $0 \times 2 = 0$. If you could divide by zero, all numbers would equal each other!  
  > Never get tricked by algebraic boundary traps again. Study with 4YOS."

---

### Script 9: Study Groups That Actually Work — The 3-Ginger Rule
- **Course:** Together Study Hub
- **Visual:** Together tab in 4YOS. Two friends in a 45-minute synchronized timer session. Sending a preset ginger: 'Oya, your turn!'.
- **Ayo Pose:** `greeting` -> `waddle` -> `celebrate`.
- **Audio / Voiceover:**
  > "WhatsApp study groups always turn into football debates, memes, and drama.  
  > That's why 4YOS built **Study Circles**.  
  > Create a private circle of 2 to 8 course mates.  
  > Start a 45-minute synchronized focus session. Everyone's timer ticks together while studying privately on their own phones.  
  > Need to encourage a friend who is lagging behind? Send a **Ginger**!  
  > Clean, preset encouragement like 'Oya, exam is Monday!' capped at strictly 3 per day so nobody spams.  
  > Grades stay private by default. Study together without the noise on 4YOS."

---

### Script 10: The 60-Day Offline Miracle — When NEPA & MTN Fail
- **Course:** 4YOS Core Feature Spotlight
- **Visual:** Student toggling Airplane Mode on phone. 4YOS opens instantly, loads lessons, checks math questions, runs Python, and tracks streak without a glitch.
- **Ayo Pose:** `celebrate` (confetti).
- **Audio / Voiceover:**
  > "Exam is in 3 days. Suddenly NEPA takes light. Your data subscription expires. Network bars show 'Emergency Calls Only'.  
  > If your study materials are online, you are completely stranded.  
  > Not with 4YOS.  
  > 4YOS is an installable Progressive Web App built with an in-browser SQLite database and offline service worker.  
  > Once downloaded, every lesson, past question, interactive diagram, and Python exercise works 100% offline for up to 60 days.  
  > When your network returns, your streak and progress sync automatically in seconds.  
  > Never let bad internet stop your First Class. Download 4YOS today."
