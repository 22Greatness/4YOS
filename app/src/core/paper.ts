// Which questions a learner sees on a given attempt. Pure, so the same attempt always gives the same paper,
// and a retry gets different questions from the one whose feedback they just read.
import { compile, formatNumber, type Vars } from '../expr.ts';

export type DiagramSpec =
  | { kind: 'venn'; alt: string; a: string; b: string; aOnly?: string[]; both?: string[]; bOnly?: string[]; neither?: string[] }
  | { kind: 'bits'; alt: string; bits: number; value?: string; showTotal?: boolean }
  | { kind: 'numberline'; alt: string; min: number; max: number; step: number; marks?: number[] }
  | { kind: 'graph'; alt: string; x: [number, number]; y: [number, number]; sliders?: { name: string; min: number; max: number; value: number; step?: number }[]; curves?: { fn: string; label?: string }[]; points?: { x: number; y: number; label?: string }[] };

export type Question = {
  question: string; choices?: string[]; answers: string[]; feedback: string; transfer: boolean;
  /** Put these in order. `answers[0]` is the items joined with the separator below. */
  order?: string[];
  /** Match each left item to its right item. */
  match?: [string, string][];
  /** Generated numbers: each name's range, a condition they must meet, and the answer's formula. */
  vars?: Record<string, [number, number]>; where?: string; formula?: string; tolerance?: number;
  /** Answer by using a diagram. */
  diagram?: DiagramSpec;
  /** The section of the lesson this tests. */
  part?: string;
  /** The stem as written, before numbers were filled in. */
  origin?: string;
  numeric?: boolean;
};
export type PaperQuestion = {
  id: number; question: string; transfer: boolean; choices?: string[];
  order?: string[]; matchLeft?: string[]; matchRight?: string[]; diagram?: DiagramSpec;
};

export const SEPARATOR = ' | ';
export const PASS_MARK = 0.8;
export const passed = (correct: number, total: number) => total > 0 && correct / total >= PASS_MARK;
export const normalize = (answer: string) => answer.trim().replace(/−/g, '-').replace(/\s+/g, ' ').toLowerCase();

/** Reads what a person types as a number: 1,500 or 25% or 3/4. */
export function readNumber(answer: string) {
  const normalized = normalize(answer).replace(/%$/, '').trim();
  if (normalized.includes(',') && !/^[+-]?\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(normalized)) return NaN;
  const text = normalized.replace(/,/g, '');
  const fraction = text.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (fraction) return Number(fraction[2]) === 0 ? NaN : Number(fraction[1]) / Number(fraction[2]);
  return text !== '' && !Number.isNaN(Number(text)) ? Number(text) : NaN;
}
export const correct = (question: Question, answer: string) => {
  if (question.answers.some(item => normalize(item) === normalize(answer))) return true;
  if (!question.numeric) return false;
  if (answer.trim().endsWith('%') && !question.answers.some(item => item.trim().endsWith('%'))) return false;
  const given = readNumber(answer);
  return !Number.isNaN(given) && question.answers.some(item => Math.abs(readNumber(item) - given) <= (question.tolerance ?? 1e-9));
};

function generator(seed: number) {
  let state = (Math.imul(seed + 1, 2654435761) + 11) >>> 0;
  return () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
}
function shuffled<T>(items: T[], seed: number) {
  const out = [...items];
  const random = generator(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
/** Shuffled so it never starts in the right order, which would give the answer away. */
function shuffledAway<T>(items: T[], seed: number) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const out = shuffled(items, seed + attempt);
    if (out.some((item, index) => item !== items[index])) return out;
  }
  return [...items].reverse();
}

/** Fills in `{a}` or `{a*b}`. Anything that isn't a formula over known names, such as LaTeX, stays as written. */
export function fill(text: string, vars: Vars) {
  // One pass only, and only where a generated name appears. `\frac{{a}}{{b}}` must keep the braces around each number.
  return text.replace(/\{([^{}]+)\}/g, (whole, source: string) => {
    if (!(source.match(/[A-Za-z_]\w*/g) ?? []).some(name => Object.hasOwn(vars, name))) return whole;
    try { return formatNumber(compile(source)(vars)); } catch { return whole; }
  });
}

/** Turns a question with generated numbers into a concrete one. Everything else passes through unchanged. */
export function instantiate(question: Question, seed: number): Question {
  if (!question.vars) return question;
  const random = generator(seed);
  const names = Object.entries(question.vars);
  const test = question.where ? compile(question.where) : null;
  let vars: Vars = {};
  for (let attempt = 0; ; attempt++) {
    if (attempt > 500) throw Error('Could not generate numbers for: ' + question.question);
    vars = Object.fromEntries(names.map(([name, [min, max]]) => [name, min + Math.floor(random() * (max - min + 1))]));
    if (!test || test(vars)) break;
  }
  const concrete: Question = {
    ...question, origin: question.question, question: fill(question.question, vars), feedback: fill(question.feedback, vars),
    answers: question.answers.map(item => fill(item, vars)),
    ...(question.choices ? { choices: question.choices.map(item => fill(item, vars)) } : {}),
  };
  if (question.formula) { concrete.answers = [formatNumber(compile(question.formula)(vars))]; concrete.numeric = true; }
  return concrete;
}

const seedFor = (attempt: number, id: number) => attempt * 1009 + id * 31;

/** Four core questions and one that uses the idea somewhere new, moving on through the pool with each attempt. */
export function drawPaper(pool: Question[], attempt: number, coreCount = 4, transferCount = 1) {
  const indexed = pool.map((question, id) => ({ question, id }));
  const core = indexed.filter(item => !item.question.transfer);
  const transfer = indexed.filter(item => item.question.transfer);
  const take = <T,>(list: T[], start: number, count: number) => Array.from({ length: Math.min(count, list.length) }, (_, index) => list[(start + index) % list.length]);
  return [...take(core, attempt * coreCount, coreCount), ...take(transfer, attempt * transferCount, transferCount)]
    .map(({ question, id }) => ({ id, question: instantiate(question, seedFor(attempt, id)) }));
}

/** What the interface may see: no answers and no feedback, and an arrangement that gives nothing away. */
export function publicPaper(pool: Question[], attempt: number, coreCount = 4, transferCount = 1): PaperQuestion[] {
  return drawPaper(pool, attempt, coreCount, transferCount).map(({ question, id }) => {
    const seed = attempt * 31 + id;
    return {
      id, question: question.question, transfer: question.transfer,
      ...(question.choices ? { choices: shuffled(question.choices, seed) } : {}),
      ...(question.order ? { order: shuffledAway(question.order, seed) } : {}),
      ...(question.match ? { matchLeft: question.match.map(([left]) => left), matchRight: shuffled(question.match.map(([, right]) => right), seed) } : {}),
      ...(question.diagram ? { diagram: question.diagram } : {}),
    };
  });
}

export const PROOF_DAYS = 7;
export const RETRY_DAYS = 3;
