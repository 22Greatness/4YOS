import type { PlanResult } from './core/planner';
import type { DiagramSpec } from './core/paper';
export type { PlanResult };
export type Block =
  | { type: 'p'; text: string } | { type: 'heading'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'callout'; kind: string; text: string }
  | { type: 'code'; lang: string; code: string; output?: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'pause'; question: string; answer: string }
  | { type: 'math'; tex: string }
  | { type: 'chart'; spec: ChartSpec }
  | { type: 'diagram'; spec: DiagramSpec };
export type ChartSpec = { alt: string; note: string; title?: string; xLabel?: string; yLabel?: string } & (
  | { kind: 'bar' | 'line' | 'dot'; data: Record<string, string | number>[]; x: string; y: string }
  | { kind: 'hist'; values: number[]; thresholds?: number }
  | { kind: 'function'; fn: string; domain: [number, number] });
export type Lesson = {
  id: string; pack: string; title: string; minutes: number; source: string; url: string; courses: string;
  video?: string; youtube?: string; bundledLecture?: boolean; originalLecture?: boolean; campLecture?: boolean; lectureTranscript?: string;
  lectureCredit?: string; lectureLicence?: 'CC BY-SA 4.0' | 'CC BY-NC-ND 4.0'; start?: number; end?: number; python?: boolean;
  goal: string; why: string; warmup?: Block[]; teaches?: string[]; uses?: string[]; sections: { title: string; blocks: Block[] }[];
  exercises: Block[]; summary: string[]; further: { title: string; url: string }[];
  practice: { blocks: Block[]; rubric: string[]; command?: string; starter?: string }; tests?: string;
};
export type CourseUnit = { id: string; title: string; focus?: string; lessons: string[] };
export type CourseInfo = { id: string; subject: string; title: string; goal: string; minutes: number; level?: number; needs?: string[]; partial?: boolean; units: CourseUnit[]; project: { title: string; blocks: Block[]; rubric: string[] } };
export type Assessment = { id: string; status: string; score: number | null; attempts: number; passed_at: string | null };
export type { DiagramSpec, PaperQuestion } from './core/paper';
export type CheckResult = { passed: boolean; recorded: boolean; correct: number; total: number; feedback: { question: string; feedback: string }[]; proofDue?: string };
export type Proof = { session_id: string; due: string; status: string; passed_at: string | null; attempts: number };
export type Course = {
  code: string; title: string; programme: string; level: number; semester: number | null; units: number | null;
  topics: string[]; resources: { title: string; url: string; kind: string; licence: string; verified: boolean }[];
};
export type Settings = { hideAyo: boolean; reduceMotion: boolean; onlineVideo: boolean };
export type Profile = { uniport: string; noun: string; minutes: number; off: number[]; internet: string; priority: string; planning: number | null };
export type Progress = { session_id: string; step: number; status: string; video_seconds: number; reading_part: number };
export type Note = { id: number; body: string; session_id: string; video_seconds: number | null; created_at: string };
export type Result = { id: number; session_id: string; task: string; answer: string; result: string; reviewer: string; assistance: string };
export type Goal = { id: number; title: string; area: string; target_date: string | null };
export type GoalStep = { id: number; goal_id: number; title: string; minutes: number; done_at: string | null };
export type Card = { id: number; front: string; back: string };

