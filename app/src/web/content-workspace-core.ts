// Section 25 Owner Content Workspace Core Models & Utilities
// Fulfills Section 25: Catalog Data, WebVTT Parser, Media Library, and Staging / Release Models

export interface VttCue {
  start: string;
  startSec: number;
  end: string;
  endSec: number;
  text: string;
}

export interface StagedRevision {
  id: string;
  lessonId: string;
  cues: VttCue[];
  vttSource: string;
  author: string;
  timestamp: number;
  summary: string;
  status: 'staged' | 'published';
}

export interface ContentRelease {
  id: string;
  publishedAt: number;
  publisher: string;
  summary: string;
  affectedLessons: string[];
  affectedCourses: string[];
  status: 'active' | 'archived' | 'rolled_back';
}

export interface CourseCatalogItem {
  code: string;
  title: string;
  units: number;
  level: string;
  department: string;
  prerequisites: string;
  packStatus: 'ready' | 'in_progress' | 'partial' | 'planned';
  lessonsCount: number;
  videosCount: number;
  previewTier: 'full_free' | 'unit1_free' | 'partial_course' | 'paid';
  outcomes: string[];
  sharedTrackCount: number;
}

export interface MediaLibraryItem {
  id: string;
  filename: string;
  type: 'video' | 'caption' | 'poster' | 'audio';
  duration: string;
  sizeBytes: number;
  license: string;
  provenance: string;
  associatedLesson: string;
  status: 'live' | 'audition_pending' | 'staging';
}

export const DEFAULT_VTT_SOURCES: Record<string, string> = {
  'p1-test-function': `WEBVTT

00:00:00.000 --> 00:00:06.377
Imagine you're checking a delivery rule
before it goes live. The fee is waived
when the order has at least ten items.

00:00:06.577 --> 00:00:12.190
Before you touch the code, decide what
should happen at exactly ten. That's the
value we will come back to.

00:00:15.390 --> 00:00:21.443
The first function uses greater than ten.
Nine returns false, and eleven returns
true. Both answers look fine.

00:00:21.643 --> 00:00:26.549
Now try ten. The function returns false.
Our rule includes ten, so the expected
answer is true.

00:00:27.749 --> 00:00:33.389
An assert checks that a condition is true.
If it is false, Python stops and tells us
which check failed.

00:00:33.589 --> 00:00:40.292
Here, the test records our expectation.
The failure tells us where to look. It
doesn't tell us to change the expectation.

00:00:41.492 --> 00:00:47.365
Change greater than to greater than or
equal to. Run all three tests, including
the ones that already passed.

00:00:47.565 --> 00:00:54.029
A boundary test checks the point where the
result changes. The neighbouring values
help catch a repair that breaks either
side.

00:00:55.229 --> 00:01:02.317
A parcel is accepted if it weighs at most
five kilograms. Which values would catch a
function that rejects exactly five?

00:01:02.517 --> 00:01:08.215
Pause and write the expected answer for
each value. Then explain which of your
tests distinguishes the two rules.`,

  'dd-quartiles': `WEBVTT

00:00:00.000 --> 00:00:05.992
Five requests took twelve, fourteen,
fifteen, sixteen and eighteen minutes.
Picture them in order, one dot per
request.

00:00:06.192 --> 00:00:11.820
The middle is the third position. That
puts the median at fifteen minutes. There
are two positions on either side.

00:00:13.020 --> 00:00:19.065
For the mean, add the waits and divide by
how many there are. Seventy-five divided
by five gives fifteen.

00:00:19.265 --> 00:00:25.683
Now imagine the longest request took
forty-eight minutes. Pause and predict
which number moves, the mean or the
median.

00:00:28.883 --> 00:00:35.122
The sum rises by thirty minutes. Shared
across five requests, that raises the mean
by six, from fifteen to twenty-one.

00:00:35.322 --> 00:00:42.386
The third position still holds fifteen.
The median stays there. One number reports
the average cost in minutes. The other
locates the middle wait.

00:00:43.586 --> 00:00:49.850
For quartiles, leave out the centre of
this odd-sized batch and find the median
of each half. Twelve and fourteen give
thirteen.

00:00:50.050 --> 00:00:59.686
The upper half changes from sixteen and
eighteen to sixteen and forty-eight. Its
median moves from seventeen to thirty-two.
The gap between the quartiles grows from
four to nineteen.

00:01:00.886 --> 00:01:07.436
Try these six waits. Find the middle using
both central positions, then split the
data into two halves to find the
quartiles.

00:01:07.636 --> 00:01:14.840
In your handover, say what the typical
middle wait was and mention the longest
wait separately. Tell the reader how many
requests you observed.`,

  'mth-sets': `WEBVTT

00:00:00.000 --> 00:00:05.529
A team has twenty-four people. Twelve can
review code, nine can test releases, and
five can do both.

00:00:05.729 --> 00:00:10.862
If you add twelve and nine, who gets
counted twice? Think about one person who
belongs to both groups.

00:00:14.062 --> 00:00:19.356
Put the five people who do both in the
overlap. Seven people review only, and
four test only.

00:00:19.556 --> 00:00:23.796
These are disjoint groups. That means no
one belongs to two of the three regions we
just made.

00:00:24.996 --> 00:00:30.857
Seven plus five plus four gives sixteen
people who do at least one of the tasks.
The other eight do neither.

00:00:31.057 --> 00:00:38.034
We can get sixteen another way. Add twelve
and nine, then subtract five to undo the
double count.

00:00:39.234 --> 00:00:45.312
The rule is the size of A plus the size of
B, minus the size of their intersection.
That gives the union without duplicates.

00:00:46.512 --> 00:00:53.308
Work this case with sixteen people. Ten
write SQL, eight build APIs, and four do
both. How many do neither?`
};

export const COURSE_CATALOG_ITEMS: CourseCatalogItem[] = [
  {
    code: 'COS 101',
    title: 'How Computers Work',
    units: 2,
    level: '100L',
    department: 'Computer Science',
    prerequisites: 'None',
    packStatus: 'ready',
    lessonsCount: 13,
    videosCount: 0,
    previewTier: 'full_free',
    outcomes: [
      'Understand binary logic, memory registers, ALU execution cycles',
      'Distinguish OS kernel supervisor space from userland applications',
      'Diagnose persistent disk I/O, file permissions and storage hierarchy'
    ],
    sharedTrackCount: 8
  },
  {
    code: 'MTH 101',
    title: 'Numbers and Algebra',
    units: 3,
    level: '100L',
    department: 'Mathematics',
    prerequisites: 'None',
    packStatus: 'ready',
    lessonsCount: 35,
    videosCount: 0,
    previewTier: 'full_free',
    outcomes: [
      'Master fundamental arithmetic, integer signs and place values by hand',
      'Manipulate surds, indices, logarithms and binomial expansions',
      'Solve quadratic, polynomial and simultaneous algebraic equations'
    ],
    sharedTrackCount: 12
  },
  {
    code: 'COS 102',
    title: 'Programming 1',
    units: 3,
    level: '100L',
    department: 'Computer Science',
    prerequisites: 'COS 101',
    packStatus: 'ready',
    lessonsCount: 39,
    videosCount: 1,
    previewTier: 'unit1_free',
    outcomes: [
      'Decompose computational problems into deterministic sequential logic',
      'Write and debug Python functions with parameter validation and boundary assertions',
      'Implement real take-home POS cash audits using exact integer kobo arithmetic'
    ],
    sharedTrackCount: 7
  },
  {
    code: 'STA 111',
    title: 'Describing Data',
    units: 3,
    level: '100L',
    department: 'Statistics',
    prerequisites: 'None',
    packStatus: 'ready',
    lessonsCount: 27,
    videosCount: 1,
    previewTier: 'unit1_free',
    outcomes: [
      'Construct frequency distributions, relative counts and cumulative ogives',
      'Compute location and spread: mean, median, mode, variance, IQR and quartiles',
      'Audit real Nigerian NBS inflation and food price datasets without misleading charts'
    ],
    sharedTrackCount: 6
  },
  {
    code: 'MTH 111',
    title: 'Sets, Logic and Proof',
    units: 2,
    level: '100L',
    department: 'Mathematics',
    prerequisites: 'None',
    packStatus: 'partial',
    lessonsCount: 1,
    videosCount: 1,
    previewTier: 'partial_course',
    outcomes: [
      'Represent sets, universal sets, complements, unions and intersections via Venn diagrams',
      'Formulate propositions, evaluate truth tables, and test logical equivalence',
      'Understand direct proofs, contrapositive reasoning and counterexamples'
    ],
    sharedTrackCount: 5
  },
  {
    code: 'SE 101',
    title: 'Software Engineering Foundations',
    units: 2,
    level: '100L',
    department: 'Software Engineering',
    prerequisites: 'COS 102',
    packStatus: 'planned',
    lessonsCount: 24,
    videosCount: 0,
    previewTier: 'paid',
    outcomes: [
      'Apply modular software architecture and separation of concerns',
      'Practice test-driven development, integration fixtures and regression suites',
      'Conduct code reviews with evidence-backed rubric scoring'
    ],
    sharedTrackCount: 4
  },
  {
    code: 'CYB 101',
    title: 'Security Foundations',
    units: 2,
    level: '100L',
    department: 'Cybersecurity',
    prerequisites: 'COS 101',
    packStatus: 'planned',
    lessonsCount: 20,
    videosCount: 0,
    previewTier: 'paid',
    outcomes: [
      'Analyze authentication models, replay vectors and cryptographic signatures',
      'Execute isolated browser labs for input sanitization and access control',
      'Understand legal and ethical authorization requirements'
    ],
    sharedTrackCount: 4
  }
];

export const INITIAL_MEDIA_LIBRARY: MediaLibraryItem[] = [
  {
    id: 'med-p1-vid',
    filename: 'p1-test-function.mp4',
    type: 'video',
    duration: '1m 19s (79s)',
    sizeBytes: 3588675,
    license: 'CC-BY-4.0 original production',
    provenance: '4YOS Camp Original Lecture Video',
    associatedLesson: 'p1-test-function',
    status: 'live'
  },
  {
    id: 'med-p1-vtt',
    filename: 'p1-test-function.vtt',
    type: 'caption',
    duration: '1m 19s',
    sizeBytes: 1812,
    license: 'CC-BY-4.0 original production',
    provenance: 'Original English WebVTT Captions',
    associatedLesson: 'p1-test-function',
    status: 'live'
  },
  {
    id: 'med-p1-webp',
    filename: 'p1-test-function.webp',
    type: 'poster',
    duration: 'Still poster',
    sizeBytes: 16588,
    license: 'CC-BY-4.0 original production',
    provenance: 'Original Camp poster frame',
    associatedLesson: 'p1-test-function',
    status: 'live'
  },
  {
    id: 'med-dd-vid',
    filename: 'dd-quartiles.mp4',
    type: 'video',
    duration: '1m 04s (64s)',
    sizeBytes: 2897221,
    license: 'CC-BY-4.0 original production',
    provenance: '4YOS Camp Original Lecture Video',
    associatedLesson: 'dd-quartiles',
    status: 'live'
  },
  {
    id: 'med-dd-vtt',
    filename: 'dd-quartiles.vtt',
    type: 'caption',
    duration: '1m 04s',
    sizeBytes: 1940,
    license: 'CC-BY-4.0 original production',
    provenance: 'Original English WebVTT Captions',
    associatedLesson: 'dd-quartiles',
    status: 'live'
  },
  {
    id: 'med-dd-webp',
    filename: 'dd-quartiles.webp',
    type: 'poster',
    duration: 'Still poster',
    sizeBytes: 18832,
    license: 'CC-BY-4.0 original production',
    provenance: 'Original Camp poster frame',
    associatedLesson: 'dd-quartiles',
    status: 'live'
  },
  {
    id: 'med-mth-vid',
    filename: 'mth-sets.mp4',
    type: 'video',
    duration: '58s',
    sizeBytes: 2284512,
    license: 'CC-BY-4.0 original production',
    provenance: '4YOS Camp Original Lecture Video',
    associatedLesson: 'mth-sets',
    status: 'live'
  },
  {
    id: 'med-mth-vtt',
    filename: 'mth-sets.vtt',
    type: 'caption',
    duration: '58s',
    sizeBytes: 1745,
    license: 'CC-BY-4.0 original production',
    provenance: 'Original English WebVTT Captions',
    associatedLesson: 'mth-sets',
    status: 'live'
  },
  {
    id: 'med-mth-webp',
    filename: 'mth-sets.webp',
    type: 'poster',
    duration: 'Still poster',
    sizeBytes: 16192,
    license: 'CC-BY-4.0 original production',
    provenance: 'Original Camp poster frame',
    associatedLesson: 'mth-sets',
    status: 'live'
  },
  {
    id: 'med-yarngpt-audition',
    filename: 'audition-yarngpt-nigerian-english.wav',
    type: 'audio',
    duration: '32s audition sample',
    sizeBytes: 1536000,
    license: 'Internal draft production',
    provenance: 'YarnGPT local Nigerian English voice audition take',
    associatedLesson: 'p1-test-function',
    status: 'audition_pending'
  }
];

export function parseWebVTT(vttText: string): { cues: VttCue[]; error?: string } {
  const trimmed = vttText.trim();
  if (!trimmed.startsWith('WEBVTT')) {
    return { cues: [], error: 'Invalid WebVTT: file must start with "WEBVTT" header' };
  }

  const blocks = trimmed.split(/\r?\n\r?\n/);
  const cues: VttCue[] = [];
  const timeRegex = /^(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})\s+-->\s+(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})/;

  let lastStartSec = -1;

  for (let i = 0; i < blocks.length; i++) {
    const lines = blocks[i].trim().split(/\r?\n/);
    if (!lines[0] || lines[0].startsWith('WEBVTT') || lines[0].startsWith('NOTE')) continue;

    let timeLine = lines[0];
    let textStartIndex = 1;
    if (!timeRegex.test(timeLine) && lines.length > 1 && timeRegex.test(lines[1])) {
      timeLine = lines[1];
      textStartIndex = 2;
    }

    const match = timeLine.match(timeRegex);
    if (!match) continue;

    const startH = match[1] ? parseInt(match[1], 10) : 0;
    const startM = parseInt(match[2], 10);
    const startS = parseInt(match[3], 10);
    const startMs = parseInt(match[4], 10);
    const startSec = startH * 3600 + startM * 60 + startS + startMs / 1000;
    const startLabel = `${String(startH * 60 + startM).padStart(2, '0')}:${String(startS).padStart(2, '0')}`;

    const endH = match[5] ? parseInt(match[5], 10) : 0;
    const endM = parseInt(match[6], 10);
    const endS = parseInt(match[7], 10);
    const endMs = parseInt(match[8], 10);
    const endSec = endH * 3600 + endM * 60 + endS + endMs / 1000;
    const endLabel = `${String(endH * 60 + endM).padStart(2, '0')}:${String(endS).padStart(2, '0')}`;

    if (endSec <= startSec) {
      return {
        cues: [],
        error: `Validation error at cue ${cues.length + 1}: end timestamp (${endLabel}) must be strictly greater than start timestamp (${startLabel})`
      };
    }

    if (startSec < lastStartSec) {
      return {
        cues: [],
        error: `Validation error at cue ${cues.length + 1}: timestamps must be monotonic (${startLabel} appears after previous cue)`
      };
    }
    lastStartSec = startSec;

    const text = lines.slice(textStartIndex).join(' ').replace(/<[^>]+>/g, '').trim();
    if (!text) {
      return { cues: [], error: `Validation error at cue ${cues.length + 1}: cue text cannot be empty` };
    }

    cues.push({
      start: startLabel,
      startSec,
      end: endLabel,
      endSec,
      text
    });
  }

  if (cues.length === 0) {
    return { cues: [], error: 'No valid timestamp cues found in WebVTT input' };
  }

  return { cues };
}
