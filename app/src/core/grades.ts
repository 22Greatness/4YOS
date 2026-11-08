// Nigerian university & polytechnic grading schemes, used by the results page.
// Scores are percentages from 0 to 100.

/** An exam passes at grade E (40%), as at university. */
export const EXAM_PASS = 0.4;
export const UNIT_TEST_PASS = 0.8;

/** Default Nigerian 5-point university bands (A-F). */
export const GRADES = [
  [70, 'A', 5],
  [60, 'B', 4],
  [50, 'C', 3],
  [45, 'D', 2],
  [40, 'E', 1],
  [0, 'F', 0],
] as const;

export interface GradeBand {
  minScore: number;
  letter: string;
  points: number;
  description?: string;
  isPass?: boolean;
}

export interface DegreeClassification {
  minCgpa: number;
  title: string;
}

export interface GradingScheme {
  id: string;
  name: string;
  scale: number;
  examPass: number; // e.g. 0.40
  unitPass: number; // e.g. 0.80
  caWeight: number; // e.g. 0.30
  examWeight: number; // e.g. 0.70
  bands: GradeBand[];
  degreeClasses: DegreeClassification[];
}

/** Standard Nigerian University 5-point scale (NUC CCMAS / UNIPORT / Federal & State Universities). */
export const NIGERIAN_UNIVERSITY_5PT: GradingScheme = {
  id: 'nigerian-university-5pt',
  name: 'Nigerian University 5-Point Scale (NUC CCMAS)',
  scale: 5.0,
  examPass: 0.4,
  unitPass: 0.8,
  caWeight: 0.3,
  examWeight: 0.7,
  bands: [
    { minScore: 70, letter: 'A', points: 5, description: 'Excellent', isPass: true },
    { minScore: 60, letter: 'B', points: 4, description: 'Very Good', isPass: true },
    { minScore: 50, letter: 'C', points: 3, description: 'Good', isPass: true },
    { minScore: 45, letter: 'D', points: 2, description: 'Fair', isPass: true },
    { minScore: 40, letter: 'E', points: 1, description: 'Pass', isPass: true },
    { minScore: 0, letter: 'F', points: 0, description: 'Fail', isPass: false },
  ],
  degreeClasses: [
    { minCgpa: 4.5, title: 'First Class' },
    { minCgpa: 3.5, title: 'Second Class Upper' },
    { minCgpa: 2.4, title: 'Second Class Lower' },
    { minCgpa: 1.5, title: 'Third Class' },
    { minCgpa: 1.0, title: 'Pass' },
    { minCgpa: 0.0, title: 'Below a pass' },
  ],
};

/** Standard Nigerian Polytechnic 4-point scale (NBTE Unified Grading for ND/HND). */
export const NIGERIAN_POLYTECHNIC_4PT: GradingScheme = {
  id: 'nigerian-polytechnic-4pt',
  name: 'Nigerian Polytechnic 4-Point Scale (NBTE)',
  scale: 4.0,
  examPass: 0.4,
  unitPass: 0.8,
  caWeight: 0.3,
  examWeight: 0.7,
  bands: [
    { minScore: 75, letter: 'AA', points: 4.0, description: 'Distinction', isPass: true },
    { minScore: 65, letter: 'AB', points: 3.5, description: 'Upper Credit', isPass: true },
    { minScore: 50, letter: 'B', points: 2.5, description: 'Lower Credit', isPass: true },
    { minScore: 40, letter: 'C', points: 2.0, description: 'Pass', isPass: true },
    { minScore: 0, letter: 'F', points: 0.0, description: 'Fail', isPass: false },
  ],
  degreeClasses: [
    { minCgpa: 3.5, title: 'Distinction' },
    { minCgpa: 3.0, title: 'Upper Credit' },
    { minCgpa: 2.5, title: 'Lower Credit' },
    { minCgpa: 2.0, title: 'Pass' },
    { minCgpa: 0.0, title: 'Fail' },
  ],
};

/** NOUN 5-point scale (National Open University of Nigeria: TMA 30% + Exam 70%, Good Standing CGPA 1.00). */
export const NOUN_5PT: GradingScheme = {
  id: 'noun-5pt',
  name: 'National Open University of Nigeria (NOUN 5-Point)',
  scale: 5.0,
  examPass: 0.4,
  unitPass: 0.8,
  caWeight: 0.3,
  examWeight: 0.7,
  bands: [
    { minScore: 70, letter: 'A', points: 5, description: 'Excellent', isPass: true },
    { minScore: 60, letter: 'B', points: 4, description: 'Very Good', isPass: true },
    { minScore: 50, letter: 'C', points: 3, description: 'Good', isPass: true },
    { minScore: 45, letter: 'D', points: 2, description: 'Fair', isPass: true },
    { minScore: 40, letter: 'E', points: 1, description: 'Pass', isPass: true },
    { minScore: 0, letter: 'F', points: 0, description: 'Fail', isPass: false },
  ],
  degreeClasses: [
    { minCgpa: 4.5, title: 'First Class' },
    { minCgpa: 3.5, title: 'Second Class Upper' },
    { minCgpa: 2.4, title: 'Second Class Lower' },
    { minCgpa: 1.5, title: 'Third Class' },
    { minCgpa: 1.0, title: 'Pass' },
    { minCgpa: 0.0, title: 'Below a pass' },
  ],
};

/** Self-learner scheme: skill and mastery based, no GPA or degree classification. */
export const SELF_LEARNER_SCHEME: GradingScheme = {
  id: 'self-learner',
  name: 'Self-Learner Mastery Path',
  scale: 0,
  examPass: 0.4,
  unitPass: 0.8,
  caWeight: 0.3,
  examWeight: 0.7,
  bands: [
    { minScore: 70, letter: 'Distinction', points: 0, description: 'Mastery', isPass: true },
    { minScore: 40, letter: 'Proficient', points: 0, description: 'Competent', isPass: true },
    { minScore: 0, letter: 'Practicing', points: 0, description: 'In Progress', isPass: false },
  ],
  degreeClasses: [],
};

export const BUILTIN_GRADING_SCHEMES: Record<string, GradingScheme> = {
  'nigerian-university-5pt': NIGERIAN_UNIVERSITY_5PT,
  'uniport-5pt': NIGERIAN_UNIVERSITY_5PT,
  'ccmas-5pt': NIGERIAN_UNIVERSITY_5PT,
  'nigerian-polytechnic-4pt': NIGERIAN_POLYTECHNIC_4PT,
  'nbte-4pt': NIGERIAN_POLYTECHNIC_4PT,
  'noun-5pt': NOUN_5PT,
  'self-learner': SELF_LEARNER_SCHEME,
};

/** Resolve grading scheme by identifier, defaulting to Nigerian University 5-point scale. */
export function getGradingScheme(id?: string): GradingScheme {
  if (!id) return NIGERIAN_UNIVERSITY_5PT;
  return BUILTIN_GRADING_SCHEMES[id] ?? NIGERIAN_UNIVERSITY_5PT;
}

/** Legacy & default 5-point grade lookup. */
export const grade = (score: number) => {
  const [, letter, points] = GRADES.find(([min]) => score >= min)!;
  return { letter, points };
};

/** Lookup grade band under a given scheme. */
export function gradeWithScheme(score: number, schemeOrId?: GradingScheme | string) {
  const scheme = typeof schemeOrId === 'string' ? getGradingScheme(schemeOrId) : (schemeOrId ?? NIGERIAN_UNIVERSITY_5PT);
  const found = scheme.bands.find(b => score >= b.minScore);
  const band = found ?? scheme.bands[scheme.bands.length - 1];
  return {
    letter: band.letter,
    points: band.points,
    description: band.description,
    isPass: band.isPass ?? (score >= scheme.examPass * 100),
  };
}

/** Continuous assessment counts 30%, the exam 70% (CCMAS standard). */
export function courseScore(
  unitBest: (number | null)[],
  examBest: number | null,
  schemeOrId?: GradingScheme | string
): number | null {
  if (examBest === null) return null;
  const scheme = typeof schemeOrId === 'string' ? getGradingScheme(schemeOrId) : (schemeOrId ?? NIGERIAN_UNIVERSITY_5PT);
  const ca = unitBest.length
    ? unitBest.reduce<number>((sum, score) => sum + (score ?? 0), 0) / unitBest.length
    : examBest;
  return Math.round(scheme.caWeight * ca + scheme.examWeight * examBest);
}

/** Grade point average: total quality points (units × points) / total units. */
export function gpa(rows: { units: number; points: number }[]): number | null {
  const units = rows.reduce((sum, row) => sum + row.units, 0);
  return units
    ? Math.round((rows.reduce((sum, row) => sum + row.units * row.points, 0) / units) * 100) / 100
    : null;
}

/** Default 5-point degree classification. */
export const degreeClass = (cgpa: number): string =>
  degreeClassWithScheme(cgpa, NIGERIAN_UNIVERSITY_5PT);

/** Degree classification under an institution's scheme. */
export function degreeClassWithScheme(cgpa: number, schemeOrId?: GradingScheme | string): string {
  const scheme = typeof schemeOrId === 'string' ? getGradingScheme(schemeOrId) : (schemeOrId ?? NIGERIAN_UNIVERSITY_5PT);
  if (!scheme.degreeClasses.length) return 'Completed';
  for (const c of scheme.degreeClasses) {
    if (cgpa >= c.minCgpa) return c.title;
  }
  return scheme.degreeClasses[scheme.degreeClasses.length - 1]?.title ?? 'Below a pass';
}

export interface CourseResultInput {
  courseId: string;
  courseCode?: string;
  courseTitle?: string;
  units: number;
  unitScores: (number | null)[];
  examScore: number | null;
}

export interface CourseResultOutput {
  courseId: string;
  courseCode?: string;
  courseTitle?: string;
  units: number;
  caScore: number | null;
  examScore: number | null;
  finalScore: number | null;
  letter: string;
  points: number;
  qualityPoints: number;
  passed: boolean;
}

export interface ResultsSummary {
  courses: CourseResultOutput[];
  totalUnitsRegistered: number;
  totalUnitsPassed: number;
  totalQualityPoints: number;
  cgpa: number | null;
  degreeClass: string | null;
  schemeName: string;
  isSelfLearner: boolean;
  notice: string;
}

/**
 * Calculates a complete results slip adhering to Nigerian standards and Section 14:
 * Always includes the mandated practice estimate notice.
 */
export function calculateResultsSummary(
  inputs: CourseResultInput[],
  schemeOrId?: GradingScheme | string
): ResultsSummary {
  const scheme = typeof schemeOrId === 'string' ? getGradingScheme(schemeOrId) : (schemeOrId ?? NIGERIAN_UNIVERSITY_5PT);
  const isSelfLearner = scheme.id === 'self-learner';

  const courses: CourseResultOutput[] = inputs.map(input => {
    const finalScore = courseScore(input.unitScores, input.examScore, scheme);
    const caScore = input.unitScores.length
      ? Math.round(input.unitScores.reduce<number>((s, v) => s + (v ?? 0), 0) / input.unitScores.length)
      : null;

    if (finalScore === null) {
      return {
        courseId: input.courseId,
        courseCode: input.courseCode,
        courseTitle: input.courseTitle,
        units: input.units,
        caScore,
        examScore: input.examScore,
        finalScore: null,
        letter: '—',
        points: 0,
        qualityPoints: 0,
        passed: false,
      };
    }

    const { letter, points, isPass } = gradeWithScheme(finalScore, scheme);
    return {
      courseId: input.courseId,
      courseCode: input.courseCode,
      courseTitle: input.courseTitle,
      units: input.units,
      caScore,
      examScore: input.examScore,
      finalScore,
      letter,
      points,
      qualityPoints: input.units * points,
      passed: isPass,
    };
  });

  const gradedCourses = courses.filter(c => c.finalScore !== null);
  const totalUnitsRegistered = inputs.reduce((sum, c) => sum + c.units, 0);
  const totalUnitsPassed = courses.filter(c => c.passed).reduce((sum, c) => sum + c.units, 0);
  const totalQualityPoints = gradedCourses.reduce((sum, c) => sum + c.qualityPoints, 0);
  const cgpa = isSelfLearner ? null : gpa(gradedCourses.map(c => ({ units: c.units, points: c.points })));
  const classification = isSelfLearner || cgpa === null ? null : degreeClassWithScheme(cgpa, scheme);

  return {
    courses,
    totalUnitsRegistered,
    totalUnitsPassed,
    totalQualityPoints,
    cgpa,
    degreeClass: classification,
    schemeName: scheme.name,
    isSelfLearner,
    notice: 'Practice estimate, not an official result. Your best exam attempt counts. Continuous assessment counts 30% and the exam 70%.',
  };
}
