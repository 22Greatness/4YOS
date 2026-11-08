# 4YOS · Result-Card Share Template & Visual Asset Specification

> **IMPORTANT NOTICE:** Draft for Owner Approval only. All shareable achievement and result cards must strictly incorporate the mandated notice: *"Practice estimate, not an official result"*. Under no circumstance shall any generated graphic pose as an official transcript or university document.

---

## 1. Purpose & Design Objectives
When a student completes a course exam, hits a 30-day streak milestone, or clears a semester mock with a high CGPA, they naturally want to share their achievement on WhatsApp Status, Instagram Stories, LinkedIn, or X (Twitter).

The **4YOS Result Card** is designed to:
1. Provide a beautiful, celebratory summary of genuine student effort.
2. Maintain 100% legal and academic honesty (clear practice estimate notice, no official university logos).
3. Act as an organic viral loop via clean branding, subtle QR verification link, and Ayo character graphics.

---

## 2. Layout & Dimensions

| Aspect Ratio | Canvas Dimensions | Target Platforms | Key Content Focus |
|---|---|---|---|
| **9:16 (Story)** | 1080 × 1920 px | WhatsApp Status, Instagram Stories, TikTok | Hero CGPA / Grade reveal, Ayo celebration pose, course units |
| **1:1 (Square)** | 1080 × 1080 px | Instagram Feed, LinkedIn, WhatsApp DP | Clean tabular results summary, pass badge, verification URL |

---

## 3. Visual Elements & Anatomy

```
+-------------------------------------------------------------+
|  [4YOS Wordmark]                       [Academic Level: 100L]|
|                                                             |
|                   MTH 101: ELEMENTARY MATH I                |
|                    (Numbers & Algebra · 3 Units)            |
|                                                             |
|                       +------------------+                  |
|                       |     SCORE: 84%   |                  |
|                       |     GRADE: A     |                  |
|                       |   POINTS: 15/15  |                  |
|                       +------------------+                  |
|                                                             |
|         [Ayo Celebration WebP: confetti / victory pose]     |
|                                                             |
|  Institution: UNIPORT / NUC CCMAS (5.0 Scale)               |
|  Verified Assessment Date: 07 Nov 2026                      |
|                                                             |
|  =========================================================  |
|  ⚠️ PRACTICE ESTIMATE, NOT AN OFFICIAL UNIVERSITY RESULT    |
|  =========================================================  |
|                                                             |
|  [QR Code] Scan to study MTH 101 offline on 4YOS            |
|  https://4yos.app · Pass from first basics                  |
+-------------------------------------------------------------+
```

---

## 4. Typography & Colour Tokens

All styling adheres to the 4YOS design system tokens (`app/src/web/App.css`):

- **Background:** Deep Navy (`#0f172a` in Dark Mode) or Clean Ivory (`#f8fafc` in Light Mode) with subtle grid texture.
- **Header Font:** *Grandstander* (bold, warm, distinctive, humanist).
- **Body & Tabular Data:** *Atkinson Hyperlegible Next* (maximum character disambiguation under low contrast/glare).
- **Primary Accent:** Warm Amber Gold (`#f59e0b`).
- **Grade Badges:**
  - Grade A (70%+): Vivid Emerald (`#10b981`)
  - Grade B (60–69%): Soft Cyan (`#06b6d4`)
  - Grade C (50–59%): Warm Amber (`#f59e0b`)
  - Grade D/E (40–49%): Slate Indigo (`#6366f1`)
- **Mandatory Warning Banner:** Slate 700 background with Bright White bold uppercase text.

---

## 5. Technical Implementation (Client-Side HTML5 Canvas / SVG Export)

To ensure zero server load and instant offline sharing, the card is rendered directly on the user's phone using an off-screen HTML5 `<canvas>` element:

```typescript
export async function generateResultCardBlob(
  result: {
    courseCode: string;
    courseTitle: string;
    units: number;
    score: number;
    grade: string;
    scale: string;
    date: string;
  }
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  // 1. Draw Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 1920);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1920);

  // 2. Draw Top Branding
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 56px Grandstander, sans-serif';
  ctx.fillText('4YOS', 80, 140);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '32px Atkinson Hyperlegible, sans-serif';
  ctx.fillText('Degree Operating System', 80, 190);

  // 3. Draw Course & Grade Card
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 4;
  ctx.roundRect(80, 260, 920, 600, 32);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px Grandstander, sans-serif';
  ctx.fillText(result.courseCode, 140, 380);

  ctx.font = '36px Atkinson Hyperlegible, sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText(`${result.courseTitle} · ${result.units} Units`, 140, 440);

  // Score & Grade
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 120px Grandstander, sans-serif';
  ctx.fillText(`Grade ${result.grade}`, 140, 600);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '40px Atkinson Hyperlegible, sans-serif';
  ctx.fillText(`Score: ${result.score}%  ·  Scale: ${result.scale}`, 140, 680);

  // 4. Draw Mandatory Legal Disclaimer Box
  ctx.fillStyle = '#1e1b4b';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.roundRect(80, 1500, 920, 180, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 30px Atkinson Hyperlegible, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚠️ PRACTICE ESTIMATE, NOT AN OFFICIAL RESULT', 540, 1580);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '24px Atkinson Hyperlegible, sans-serif';
  ctx.fillText('Calculated under Nigerian academic standard rules for study preparation.', 540, 1630);

  // 5. Draw Footer & QR Link
  ctx.fillStyle = '#64748b';
  ctx.font = '28px Atkinson Hyperlegible, sans-serif';
  ctx.fillText('https://4yos.app · Learn every subject from first basics offline', 540, 1820);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png');
  });
}
```

---

## 6. Social Sharing Integration
When the user taps **Share Result** in the 4YOS Results tab:
1. The canvas renders the image blob offline in `<100ms`.
2. Uses the native **Web Share API** (`navigator.share({ files: [imageFile], title: 'My 4YOS Practice Result', url: 'https://4yos.app' })`).
3. If Web Share API is unsupported (e.g. older desktop browsers), triggers direct file download as `4YOS-Result-${courseCode}.png` with an option to copy the share link to clipboard.
