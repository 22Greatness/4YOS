// Programme maps with entry years, institution catalog, and learning paths.
// Fulfills Section 14 and Section 17 step B7.

import { getGradingScheme } from './grades.ts';

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  type: 'university' | 'polytechnic' | 'distance' | 'national_minimum';
  defaultGradingSchemeId: string;
  location?: string;
}

export interface CourseSlot {
  level: number;
  code: string;
  title: string;
  units: number;
  unitsUnknown: boolean;
  category: 'core' | 'general' | 'elective' | 'siwes' | string;
  electiveGroup?: string;
  bankCourseIds: string[];
  semester?: 1 | 2;
  readiness?: 'ready' | 'in_progress' | 'pipeline';
  prerequisites?: string[];
  takeHomeDeliverable?: string;
}

export interface ProgrammeMap {
  id: string;
  institutionId: string;
  institutionName: string;
  programmeName: string;
  entryYear: string;
  source?: string;
  verified: boolean;
  gradingSchemeId: string;
  levels: number[];
  courses: CourseSlot[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  targetRole: string;
  bankCourseIds: string[];
  stages?: { name: string; bankCourseIds: string[] }[];
}

export interface Enrolment {
  id: string;
  type: 'programme' | 'path';
  institutionId?: string;
  programmeId?: string;
  entryYear?: string;
  pathId?: string;
  startingLevel: number; // 100 for freshers, 200 for direct entry
  selectedElectives?: Record<string, string>; // group -> code
  creditedCourseCodes?: string[]; // 100L courses credited for direct entry
  startedAt: string;
}

/** Built-in institutions catalog. */
export const INSTITUTIONS: Record<string, Institution> = {
  'uniport': {
    id: 'uniport',
    name: 'University of Port Harcourt',
    shortName: 'UNIPORT',
    type: 'university',
    defaultGradingSchemeId: 'nigerian-university-5pt',
    location: 'Choba, Rivers State, Nigeria',
  },
  'nuc-ccmas': {
    id: 'nuc-ccmas',
    name: 'National Universities Commission (CCMAS)',
    shortName: 'CCMAS',
    type: 'national_minimum',
    defaultGradingSchemeId: 'nigerian-university-5pt',
    location: 'Nigeria (National Minimum Standard)',
  },
  'noun': {
    id: 'noun',
    name: 'National Open University of Nigeria',
    shortName: 'NOUN',
    type: 'distance',
    defaultGradingSchemeId: 'noun-5pt',
    location: 'Nigeria (Open & Distance Learning)',
  },
  'nbte': {
    id: 'nbte',
    name: 'National Board for Technical Education (Polytechnics)',
    shortName: 'NBTE',
    type: 'polytechnic',
    defaultGradingSchemeId: 'nigerian-polytechnic-4pt',
    location: 'Nigeria (Polytechnics / Monotechnics)',
  },
  'universal-degree': {
    id: 'universal-degree',
    name: '4YOS Sovereign Degree Engine',
    shortName: 'Autonomous Degree',
    type: 'national_minimum',
    defaultGradingSchemeId: 'nigerian-university-5pt',
    location: 'Nigeria & Global (No University Required)',
  },
};

/** Built-in self-learner career & mastery paths. */
export const LEARNING_PATHS: Record<string, LearningPath> = {
  'software-engineering-from-zero': {
    id: 'software-engineering-from-zero',
    title: 'Software Engineering from Zero',
    description: 'Learn computing from physical bits to production software engineering, clean code, and algorithms.',
    targetRole: 'Software Engineer',
    bankCourseIds: [
      'how-computers-work',
      'programming-1',
      'programming-2',
      'data-structures-and-algorithms',
      'systems-analysis-and-software-basics',
      'software-engineering',
      'capstone-project',
    ],
    stages: [
      { name: 'Foundations', bankCourseIds: ['how-computers-work', 'programming-1'] },
      { name: 'Intermediate & Algorithms', bankCourseIds: ['programming-2', 'data-structures-and-algorithms'] },
      { name: 'Systems & Engineering', bankCourseIds: ['systems-analysis-and-software-basics', 'software-engineering', 'capstone-project'] },
    ],
  },
  'data-analysis-from-zero': {
    id: 'data-analysis-from-zero',
    title: 'Data Analysis & Statistics from Zero',
    description: 'Master numerical reasoning, descriptive statistics with real Nigerian data, probability, spreadsheets, and SQL.',
    targetRole: 'Data Analyst',
    bankCourseIds: [
      'numbers-and-algebra',
      'describing-data',
      'probability-1',
      'probability-2-and-distributions',
      'spreadsheets-for-real-work',
      'databases-and-sql',
    ],
    stages: [
      { name: 'Mathematical Foundations', bankCourseIds: ['numbers-and-algebra', 'describing-data'] },
      { name: 'Probability & Distributions', bankCourseIds: ['probability-1', 'probability-2-and-distributions'] },
      { name: 'Applied Tools & SQL', bankCourseIds: ['spreadsheets-for-real-work', 'databases-and-sql'] },
    ],
  },
  'become-a-security-analyst': {
    id: 'become-a-security-analyst',
    title: 'Become a Security Analyst',
    description: 'Build safe, practical defensive computing skills: networking, operating systems, threat analysis, and security governance.',
    targetRole: 'Security Analyst',
    bankCourseIds: [
      'how-computers-work',
      'programming-1',
      'networking',
      'operating-systems',
      'security-foundations',
      'risk-law-privacy-and-governance',
    ],
    stages: [
      { name: 'Core Computing', bankCourseIds: ['how-computers-work', 'programming-1'] },
      { name: 'Infrastructure & Protocols', bankCourseIds: ['networking', 'operating-systems'] },
      { name: 'Cybersecurity Practice', bankCourseIds: ['security-foundations', 'risk-law-privacy-and-governance'] },
    ],
  },
  'foundational-mathematics': {
    id: 'foundational-mathematics',
    title: 'Mathematics for Computing & Science',
    description: 'Master numbers, functions, calculus, linear algebra, and discrete structures from first principles.',
    targetRole: 'Applied Mathematician & Computer Scientist',
    bankCourseIds: [
      'numbers-and-algebra',
      'functions-graphs-and-trigonometry',
      'sets-logic-and-proof',
      'calculus-1',
      'linear-algebra',
      'discrete-mathematics',
    ],
  },
  'autonomous-4y-degree': {
    id: 'autonomous-4y-degree',
    title: 'Autonomous 4-Year Computer Science Degree',
    description: 'Complete, sovereign degree curriculum from first basics to master-level systems engineering. No physical university needed.',
    targetRole: 'Computer Scientist & Systems Engineer',
    bankCourseIds: [
      'how-computers-work',
      'numbers-and-algebra',
      'programming-1',
      'describing-data',
      'how-to-study',
      'data-structures-and-algorithms',
      'computer-architecture',
      'databases-and-sql',
      'operating-systems',
      'networking',
      'software-engineering',
      'security-foundations',
      'cloud-computing',
      'distributed-systems',
      'capstone-project',
    ],
  },
};

export function resolveCourseSlotReadiness(slot: CourseSlot): 'ready' | 'in_progress' | 'pipeline' {
  if (slot.readiness) return slot.readiness;
  const readyBankCourses = new Set(['how-computers-work', 'numbers-and-algebra', 'programming-1', 'describing-data', 'how-to-study']);
  const inProgressBankCourses = new Set(['sets-logic-proof']);
  if (slot.bankCourseIds.some(id => readyBankCourses.has(id))) return 'ready';
  if (slot.bankCourseIds.some(id => inProgressBankCourses.has(id))) return 'in_progress';
  return 'pipeline';
}

export function inferCourseSemester(slot: CourseSlot): 1 | 2 {
  if (slot.semester) return slot.semester;
  const match = slot.code.match(/\d+/);
  if (!match) return 1;
  const num = parseInt(match[0], 10);
  return num % 2 === 1 ? 1 : 2;
}

/** Parse a programme map text file. */
export function parseProgrammeMap(
  text: string,
  options?: {
    id?: string;
    institutionId?: string;
    defaultYear?: string;
    gradingSchemeId?: string;
  }
): ProgrammeMap {
  const head: Record<string, string> = {};
  const courses: CourseSlot[] = [];
  const lines = text.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith('#')) {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const key = line.slice(1, idx).trim().toLowerCase();
        const value = line.slice(idx + 1).trim();
        head[key] = value;
      }
      continue;
    }

    const parts = line.split('|').map(s => s.trim());
    if (parts.length < 5) continue;
    const [levelStr, code, title, unitsStr, category, bankCoursesStr = ''] = parts;

    const level = parseInt(levelStr, 10) || 100;
    const unitsUnknown = unitsStr === '?' || !/^\d+$/.test(unitsStr);
    const units = unitsUnknown ? 1 : parseInt(unitsStr, 10);
    const bankCourseIds = bankCoursesStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    courses.push({
      level,
      code,
      title,
      units,
      unitsUnknown,
      category: category.toLowerCase(),
      bankCourseIds,
    });
  }

  const universityRaw = head['university'] ?? '';
  let institutionId = options?.institutionId;
  if (!institutionId) {
    if (universityRaw.toLowerCase().includes('uniport')) institutionId = 'uniport';
    else if (universityRaw.toLowerCase().includes('ccmas')) institutionId = 'nuc-ccmas';
    else if (universityRaw.toLowerCase().includes('noun')) institutionId = 'noun';
    else if (universityRaw.toLowerCase().includes('nbte') || universityRaw.toLowerCase().includes('polytechnic')) institutionId = 'nbte';
    else institutionId = 'nuc-ccmas';
  }

  const institution = INSTITUTIONS[institutionId];
  const institutionName = institution ? institution.name : (head['university'] || 'Unknown Institution');
  const programmeName = head['name'] || 'Computer Science';

  // Extract entry year, e.g. "2015/16" -> "2015/2016" or "2023" -> "2023/2024"
  let entryYear = options?.defaultYear || head['year'] || '';
  if (!entryYear) {
    if (text.includes('2015') || programmeName.includes('2015')) entryYear = '2015/2016';
    else if (text.includes('2023') || universityRaw.includes('2023')) entryYear = '2023/2024';
    else entryYear = '2023/2024';
  }

  const id = options?.id || `${institutionId}-${programmeName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${entryYear.slice(0, 4)}`;
  const gradingSchemeId = options?.gradingSchemeId || institution?.defaultGradingSchemeId || 'nigerian-university-5pt';
  const levels = [...new Set(courses.map(c => c.level))].sort((a, b) => a - b);

  return {
    id,
    institutionId,
    institutionName,
    programmeName,
    entryYear,
    source: head['source'],
    verified: head['verified'] === 'yes',
    gradingSchemeId,
    levels,
    courses,
  };
}

// Bundled text definitions of UNIPORT 2015/16 and CCMAS 2023
export const BUNDLED_CCMAS_CS_TEXT = `# name: Computer Science
# university: NUC CCMAS 2023 (national minimum)
# source: docs/research/official/ccmas_computing.txt. Units marked ? were unreadable in the text copy
# verified: no
100 | GST 111 | Communication in English | 2 | general | communication-and-research
100 | GST 112 | Nigerian Peoples and Culture | 2 | general | nigeria-society-and-ethics
100 | MTH 101 | Elementary Mathematics I | 2 | core | numbers-and-algebra, functions-graphs-and-trigonometry, sets-logic-and-proof
100 | MTH 102 | Elementary Mathematics II | 2 | core | calculus-1
100 | PHY 101 | General Physics I | 2 | core | physics-1-motion-energy-and-matter
100 | PHY 102 | General Physics II | 2 | core | physics-2-electricity-magnetism-and-electronics
100 | PHY 107 | General Practical Physics I | 1 | core | physics-1-motion-energy-and-matter
100 | PHY 108 | General Practical Physics II | 1 | core | physics-2-electricity-magnetism-and-electronics
100 | STA 111 | Descriptive Statistics | 3 | core | describing-data
100 | COS 101 | Introduction to Computing Sciences | 3 | core | how-computers-work
100 | COS 102 | Problem Solving | 2 | core | programming-1
200 | GST 212 | Philosophy, Logic and Human Existence | ? | general | sets-logic-and-proof, nigeria-society-and-ethics
200 | ENT 211 | Entrepreneurship and Innovation | 2 | general | career-and-business
200 | MTH 201 | Mathematical Methods I | ? | core | calculus-2-and-differential-equations
200 | MTH 202 | Elementary Differential Equations | 2 | core | calculus-2-and-differential-equations
200 | COS 201 | Computer Programming I | ? | core | programming-1
200 | COS 202 | Computer Programming II | 3 | core | programming-2
200 | CSC 203 | Discrete Structures | ? | core | discrete-mathematics
200 | IFT 211 | Digital Logic Design | ? | core | computer-organisation-and-logic
200 | IFT 212 | Computer Architecture and Organisation | 2 | core | computer-organisation-and-logic
200 | SEN 201 | Introduction to Software Engineering | 2 | core | software-engineering
200 | CSC 299 | SIWES I | ? | siwes |
300 | GST 312 | Peace and Conflict Resolution | 2 | general |
300 | ENT 312 | Venture Creation | 2 | general | career-and-business
300 | CSC 301 | Data Structures | ? | core | data-structures-and-algorithms
300 | CSC 308 | Operating Systems | ? | core | operating-systems
300 | CSC 309 | Artificial Intelligence | ? | core | artificial-intelligence-and-machine-learning
300 | CSC 322 | Computer Science Innovation and New Technologies | ? | core |
300 | CYB 201 | Introduction to Cybersecurity and Strategy | ? | core | security-foundations
300 | DTS 304 | Data Management I | ? | core | databases-and-sql
300 | ICT 305 | Data Communication System and Network | ? | core | networking
300 | CSC 399 | SIWES II | ? | siwes |
400 | COS 409 | Research Methodology and Technical Report Writing | ? | core | research-methods-and-final-projects
400 | CSC 401 | Algorithms and Complexity Analysis | ? | core | advanced-algorithms-and-theory
400 | CSC 402 | Ethics and Legal Issues in Computer Science | ? | core | risk-law-privacy-and-governance
400 | CSC 497 | Final Year Project I | ? | core | capstone-project
400 | CSC 498 | Final Year Project II | ? | core | capstone-project
400 | INS 401 | Project Management | ? | core |`;

export const BUNDLED_UNIPORT_CS_TEXT = `# name: Computer Science (2015/16 handbook)
# university: UNIPORT
# source: docs/research/official/uniport_cs.txt, the only official UNIPORT list found. Old: replace with the owner's current list
# verified: no
100 | GES 100 | Communication Skills in English | ? | general | communication-and-research
100 | GES 101 | Computer Appreciation | ? | general | how-computers-work
100 | GES 102 | Introduction to Philosophy and Logic | ? | general | sets-logic-and-proof
100 | GES 103 | Nigerian Peoples and Culture | ? | general | nigeria-society-and-ethics
100 | MTH 110 | Algebra and Trigonometry | ? | core | numbers-and-algebra, functions-graphs-and-trigonometry
100 | MTH 120 | Calculus | ? | core | calculus-1
100 | MTH 114 | Sets, Logic and Numbers | ? | core | sets-logic-and-proof
100 | MTH 124 | Coordinate Geometry | ? | core | functions-graphs-and-trigonometry
100 | PHY 101 | Mechanics and Properties of Matter | ? | core | physics-1-motion-energy-and-matter
100 | PHY 102 | Electricity and Magnetism | ? | core | physics-2-electricity-magnetism-and-electronics
100 | PHY 103 | Heat and Thermodynamics | ? | core | physics-1-motion-energy-and-matter
100 | PHY 112 | Experimental Physics | ? | core | physics-1-motion-energy-and-matter
100 | CHM 130 | General Chemistry | ? | core | science-for-computing-and-statistics
100 | FSB 101 | Introductory Biology | ? | core | science-for-computing-and-statistics
100 | CSC 180 | Introduction to Computer Science and BASIC | ? | core | how-computers-work, programming-1
100 | CSC 182 | Computer Applications | ? | core | spreadsheets-for-real-work
100 | CSC 183 | Problem Solving | ? | core | programming-1
100 | STA 160 | Descriptive Statistics | ? | core | describing-data
200 | CSC 280 | Introduction to Programming | ? | core | programming-1
200 | CSC 281 | System Fundamentals | ? | core | how-computers-work
200 | CSC 282 | Database Programming | ? | core | databases-and-sql
200 | CSC 283 | Information Systems and File Structures | ? | core | systems-analysis-and-software-basics
200 | CSC 284 | Logic Design | ? | core | computer-organisation-and-logic
200 | CSC 285 | Digital Design and Microprocessor | ? | core | computer-organisation-and-logic
200 | CSC 286 | Data Structures | ? | core | data-structures-and-algorithms
200 | CSC 287 | Object-Oriented Programming I | ? | core | programming-2
200 | CSC 288 | Structured Programming | ? | core | programming-2
200 | MTH 210 | Linear Algebra | ? | core | linear-algebra
200 | MTH 224 | Mathematical Methods I | ? | core | calculus-2-and-differential-equations
200 | MTH 230 | Modern Algebra | ? | core | discrete-mathematics
200 | MTH 250 | Differential Equations | ? | core | calculus-2-and-differential-equations
200 | MTH 270 | Numerical Analysis | ? | core | calculus-2-and-differential-equations
200 | STA 260 | Probability and Statistics | ? | core | probability-1
200 | STA 262 | Mathematical Statistics I | ? | core | probability-2-and-distributions
200 | PHY 351 | Electronics I | ? | core | physics-2-electricity-magnetism-and-electronics
300 | GES 300 | Entrepreneurship | ? | general | career-and-business
300 | CSC 382 | Computer Architecture I | ? | core | computer-organisation-and-logic
300 | CSC 394 | Operating Systems | ? | core | operating-systems
300 | CSC 395 | Software Engineering | ? | core | software-engineering
300 | CSC 396 | Automata and Computability | ? | core | advanced-algorithms-and-theory
300 | CSC 397 | Computational Methods | ? | core |
300 | STA 370 | Operations Research | ? | core |
300 | CSC 300 | Industrial Training | ? | siwes |
400 | GES 400 | General Studies IV | ? | general |
400 | CSC 470 | Project | ? | core | capstone-project
400 | CSC 480 | Database Management | ? | core | databases-and-sql
400 | CSC 481 | Object-Oriented Programming II | ? | core | programming-2
400 | CSC 482 | Compiler Construction | ? | core |
400 | CSC 483 | Algorithms | ? | core | advanced-algorithms-and-theory
400 | CSC 486 | Systems Analysis and Design | ? | core | systems-analysis-and-software-basics
400 | CSC 491 | Modelling and Simulation | ? | core |
400 | CSC 492 | Computer Graphics | ? | core |
400 | CSC 493 | Internet and Web Programming | ? | core | web-development
400 | CSC 494 | Introduction to Artificial Intelligence | ? | core | artificial-intelligence-and-machine-learning
400 | CSC 495 | Computer Architecture II | ? | core | computer-organisation-and-logic
400 | CSC 496 | Programming Languages | ? | core |
400 | CSC 497 | Project Management | ? | core |
400 | CSC 498 | Computer Networks | ? | core | networking`;

export const CCMAS_CS_MAP = parseProgrammeMap(BUNDLED_CCMAS_CS_TEXT, {
  id: 'ccmas-cs-2023',
  institutionId: 'nuc-ccmas',
  defaultYear: '2023/2024',
});

export const UNIPORT_CS_2015_MAP = parseProgrammeMap(BUNDLED_UNIPORT_CS_TEXT, {
  id: 'uniport-cs-2015',
  institutionId: 'uniport',
  defaultYear: '2015/2016',
});

export const AUTONOMOUS_CS_DEGREE_MAP: ProgrammeMap = {
  id: 'autonomous-cs-degree',
  institutionId: 'universal-degree',
  institutionName: '4YOS Sovereign Degree Engine',
  programmeName: 'Autonomous 4-Year Computer Science & Systems Engineering',
  entryYear: 'Autonomous Track (No University Needed)',
  verified: true,
  gradingSchemeId: 'nigerian-university-5pt',
  levels: [100, 200, 300, 400],
  courses: [
    // 100 Level: Semester 1 (Harmattan)
    {
      level: 100,
      semester: 1,
      code: 'DEG 101',
      title: 'How Computers Work: Bits to Logic',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['how-computers-work'],
      readiness: 'ready',
      prerequisites: [],
      takeHomeDeliverable: 'Digital Logic & Binary Breadboard Audit'
    },
    {
      level: 100,
      semester: 1,
      code: 'DEG 102',
      title: 'Numbers, Algebra & Discrete Foundations',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['numbers-and-algebra'],
      readiness: 'ready',
      prerequisites: [],
      takeHomeDeliverable: 'Financial Algebra & Quadratic Revenue Model'
    },
    {
      level: 100,
      semester: 1,
      code: 'DEG 105',
      title: 'Metacognition, Study Strategy & Deep Focus',
      units: 2,
      unitsUnknown: false,
      category: 'general',
      bankCourseIds: ['how-to-study'],
      readiness: 'ready',
      prerequisites: [],
      takeHomeDeliverable: 'Spaced Retrieval & Interleaving Study Protocol'
    },
    // 100 Level: Semester 2 (Rain)
    {
      level: 100,
      semester: 2,
      code: 'DEG 103',
      title: 'Problem Solving & Algorithmic Code (Python)',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['programming-1'],
      readiness: 'ready',
      prerequisites: ['DEG 101'],
      takeHomeDeliverable: 'POS Terminal Cash Drawer Daily Reconciliation'
    },
    {
      level: 100,
      semester: 2,
      code: 'DEG 104',
      title: 'Descriptive Statistics & Real Data Analysis',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['describing-data'],
      readiness: 'ready',
      prerequisites: ['DEG 102'],
      takeHomeDeliverable: 'Transit Fare Dispersion & Outlier Inflation Audit'
    },
    {
      level: 100,
      semester: 2,
      code: 'DEG 106',
      title: 'Sets, Deductive Logic & Mathematical Proof',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['sets-logic-proof'],
      readiness: 'in_progress',
      prerequisites: ['DEG 102'],
      takeHomeDeliverable: 'Inclusion-Exclusion Team Partition & Contrapositive Audit'
    },
    // 200 Level: Semester 1
    {
      level: 200,
      semester: 1,
      code: 'DEG 201',
      title: 'Data Structures & Algorithmic Analysis',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['data-structures-and-algorithms'],
      readiness: 'pipeline',
      prerequisites: ['DEG 103'],
      takeHomeDeliverable: 'Binary Search Tree & LRU Cache Implementation'
    },
    {
      level: 200,
      semester: 1,
      code: 'DEG 202',
      title: 'Computer Organization & Assembly Architecture',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['computer-architecture'],
      readiness: 'pipeline',
      prerequisites: ['DEG 101'],
      takeHomeDeliverable: 'MIPS Single-Cycle CPU Simulator'
    },
    // 200 Level: Semester 2
    {
      level: 200,
      semester: 2,
      code: 'DEG 203',
      title: 'Relational Database Engineering & SQL',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['databases-and-sql'],
      readiness: 'pipeline',
      prerequisites: ['DEG 103'],
      takeHomeDeliverable: '3NF Relational Pharmacy Database Schema'
    },
    {
      level: 200,
      semester: 2,
      code: 'DEG 204',
      title: 'Operating Systems Principles & Concurrency',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['operating-systems'],
      readiness: 'pipeline',
      prerequisites: ['DEG 202'],
      takeHomeDeliverable: 'Multi-threaded Producer-Consumer Semaphore Buffer'
    },
    // 300 Level: Semester 1
    {
      level: 300,
      semester: 1,
      code: 'DEG 301',
      title: 'Computer Networks & Internet Protocols',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['networking'],
      readiness: 'pipeline',
      prerequisites: ['DEG 204'],
      takeHomeDeliverable: 'PCAP Packet Sniffer & TCP Window Inspector'
    },
    {
      level: 300,
      semester: 1,
      code: 'DEG 302',
      title: 'Software Engineering & Clean Architecture',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['software-engineering'],
      readiness: 'pipeline',
      prerequisites: ['DEG 201', 'DEG 203'],
      takeHomeDeliverable: 'Decoupled Hexagonal API Architecture'
    },
    // 300 Level: Semester 2
    {
      level: 300,
      semester: 2,
      code: 'DEG 303',
      title: 'Cybersecurity Foundations & Applied Cryptography',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['security-foundations'],
      readiness: 'pipeline',
      prerequisites: ['DEG 301'],
      takeHomeDeliverable: 'AES-GCM Authenticated Encryption & Incident Audit'
    },
    {
      level: 300,
      semester: 2,
      code: 'DEG 304',
      title: 'Cloud Computing & Systems Virtualization',
      units: 3,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['cloud-computing'],
      readiness: 'pipeline',
      prerequisites: ['DEG 301'],
      takeHomeDeliverable: 'Serverless Worker Topology & Edge KV Store'
    },
    // 400 Level: Semester 1
    {
      level: 400,
      semester: 1,
      code: 'DEG 401',
      title: 'High-Scale Distributed Systems & Fintech Ledgers',
      units: 4,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['distributed-systems'],
      readiness: 'pipeline',
      prerequisites: ['DEG 301', 'DEG 302'],
      takeHomeDeliverable: 'Idempotent Outbox Reconciler & 3-Way Offline Conflict Resolver'
    },
    // 400 Level: Semester 2
    {
      level: 400,
      semester: 2,
      code: 'DEG 402',
      title: 'Capstone Systems Viva & Production Degree Project',
      units: 6,
      unitsUnknown: false,
      category: 'core',
      bankCourseIds: ['capstone-project'],
      readiness: 'pipeline',
      prerequisites: ['DEG 401'],
      takeHomeDeliverable: 'Production Viva Defense, Architecture Runbook & Verified Evidence'
    }
  ],
};

export const BUILTIN_PROGRAMME_MAPS: Record<string, ProgrammeMap> = {
  'autonomous-cs-degree': AUTONOMOUS_CS_DEGREE_MAP,
  'ccmas-cs-2023': CCMAS_CS_MAP,
  'uniport-cs-2015': UNIPORT_CS_2015_MAP,
};

/** Get a programme map by ID or return fallback. */
export function getProgrammeMap(id: string): ProgrammeMap | null {
  return BUILTIN_PROGRAMME_MAPS[id] ?? null;
}

/** All unique bank course IDs in a programme level (used for level bundle purchasing). */
export function resolveBankCoursesForLevel(map: ProgrammeMap, level: number): string[] {
  const ids = new Set<string>();
  for (const course of map.courses) {
    if (course.level === level) {
      for (const id of course.bankCourseIds) ids.add(id);
    }
  }
  return [...ids];
}

/** All unique bank course IDs in a programme (used for full programme purchasing). */
export function resolveBankCoursesForProgramme(map: ProgrammeMap): string[] {
  const ids = new Set<string>();
  for (const course of map.courses) {
    for (const id of course.bankCourseIds) ids.add(id);
  }
  return [...ids];
}

/** Find all course slots across a programme that map to a given bank course. */
export function resolveCourseSlotsForBankCourse(map: ProgrammeMap, bankCourseId: string): CourseSlot[] {
  return map.courses.filter(c => c.bankCourseIds.includes(bankCourseId));
}

/** Check if two programmes share a bank course (study once, count everywhere). */
export function isBankCourseShared(mapA: ProgrammeMap, mapB: ProgrammeMap, bankCourseId: string): boolean {
  return mapA.courses.some(c => c.bankCourseIds.includes(bankCourseId)) &&
         mapB.courses.some(c => c.bankCourseIds.includes(bankCourseId));
}

export interface ProgrammeProgressSlot {
  slot: CourseSlot;
  satisfied: boolean;
  status: 'passed' | 'credited' | 'in_progress' | 'unmet';
}

export interface ProgrammeProgress {
  mapId: string;
  totalCourses: number;
  satisfiedCourses: number;
  totalUnits: number;
  satisfiedUnits: number;
  slots: ProgrammeProgressSlot[];
}

/**
 * Calculate progress against a programme map given completed bank courses.
 * Supports direct-entry (startingLevel 200) where earlier level courses are marked credited.
 */
export function calculateProgrammeProgress(
  map: ProgrammeMap,
  completedBankCourseIds: Set<string> | string[],
  options?: {
    startingLevel?: number;
    creditedCodes?: string[];
  }
): ProgrammeProgress {
  const completed = completedBankCourseIds instanceof Set
    ? completedBankCourseIds
    : new Set(completedBankCourseIds);
  const startingLevel = options?.startingLevel ?? 100;
  const creditedCodes = new Set(options?.creditedCodes ?? []);

  let totalUnits = 0;
  let satisfiedUnits = 0;
  let satisfiedCourses = 0;

  const slots: ProgrammeProgressSlot[] = map.courses.map(slot => {
    totalUnits += slot.units;

    // Direct entry exemption: courses below starting level are credited
    if (slot.level < startingLevel || creditedCodes.has(slot.code)) {
      satisfiedUnits += slot.units;
      satisfiedCourses++;
      return { slot, satisfied: true, status: 'credited' };
    }

    // A course slot is satisfied if all its mapped bank courses are passed
    const isPassed = slot.bankCourseIds.length > 0 &&
      slot.bankCourseIds.every(id => completed.has(id));

    if (isPassed) {
      satisfiedUnits += slot.units;
      satisfiedCourses++;
      return { slot, satisfied: true, status: 'passed' };
    }

    const hasAnyStarted = slot.bankCourseIds.some(id => completed.has(id));
    return {
      slot,
      satisfied: false,
      status: hasAnyStarted ? 'in_progress' : 'unmet',
    };
  });

  return {
    mapId: map.id,
    totalCourses: map.courses.length,
    satisfiedCourses,
    totalUnits,
    satisfiedUnits,
    slots,
  };
}

export interface GapReportItem {
  code: string;
  title: string;
  level: number;
  state: 'ready' | 'planned' | 'missing' | 'placement';
  missingBankCourses: string[];
}

export interface ProgrammeGapReport {
  mapId: string;
  programmeName: string;
  institutionName: string;
  totalCourses: number;
  readyCount: number;
  plannedCount: number;
  missingCount: number;
  placementCount: number;
  unknownUnitsCount: number;
  items: GapReportItem[];
}

/** Generate an automatic gap report showing what is ready vs needed in the bank. */
export function generateGapReport(
  map: ProgrammeMap,
  readyBankCourses: Set<string> | string[]
): ProgrammeGapReport {
  const ready = readyBankCourses instanceof Set ? readyBankCourses : new Set(readyBankCourses);
  let readyCount = 0;
  let plannedCount = 0;
  let missingCount = 0;
  let placementCount = 0;
  let unknownUnitsCount = 0;

  const items: GapReportItem[] = map.courses.map(slot => {
    if (slot.unitsUnknown) unknownUnitsCount++;

    if (!slot.bankCourseIds.length) {
      if (slot.category === 'siwes') {
        placementCount++;
        return { code: slot.code, title: slot.title, level: slot.level, state: 'placement', missingBankCourses: [] };
      }
      missingCount++;
      return { code: slot.code, title: slot.title, level: slot.level, state: 'missing', missingBankCourses: [] };
    }

    const allReady = slot.bankCourseIds.every(id => ready.has(id));
    const missing = slot.bankCourseIds.filter(id => !ready.has(id));

    if (allReady) {
      readyCount++;
      return { code: slot.code, title: slot.title, level: slot.level, state: 'ready', missingBankCourses: [] };
    }

    plannedCount++;
    return { code: slot.code, title: slot.title, level: slot.level, state: 'planned', missingBankCourses: missing };
  });

  return {
    mapId: map.id,
    programmeName: map.programmeName,
    institutionName: map.institutionName,
    totalCourses: map.courses.length,
    readyCount,
    plannedCount,
    missingCount,
    placementCount,
    unknownUnitsCount,
    items,
  };
}
