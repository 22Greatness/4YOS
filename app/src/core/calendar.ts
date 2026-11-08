import ICAL from 'ical.js';

export const MAX_CALENDAR_BYTES = 256 * 1024;
const MAX_EVENTS = 200;
const lagosDate = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Africa/Lagos' });

export type CalendarDate = { title: string; date: string };
export type CalendarPreview = { id: string; rows: CalendarDate[]; skipped: number; duplicates: number };

export function calendarDateKey({ title, date }: CalendarDate) {
  return date + '\n' + title.normalize('NFKC').replace(/\s+/gu, ' ').trim().toLowerCase();
}

function eventDate(event: InstanceType<typeof ICAL.Component>): string | null {
  const start = event.getFirstProperty('dtstart');
  if (!start || event.getAllProperties('dtstart').length !== 1) return null;
  // The library decodes ICS DATE and DATE-TIME into jCal strings. Check the
  // original day before converting so dates like 30 February never roll over.
  const value: unknown = start.toJSON()[3];
  if (typeof value !== 'string') return null;
  const day = value.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return null;
  const midnight = new Date(day + 'T00:00:00Z');
  if (!Number.isFinite(+midnight) || midnight.toISOString().slice(0, 10) !== day) return null;
  if (start.type === 'date' && value === day && !start.getParameter('tzid')) return day;
  if (start.type !== 'date-time' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z?$/.test(value)) return null;
  const utc = value.endsWith('Z');
  const at = new Date(utc ? value : value + 'Z');
  if (!Number.isFinite(+at) || at.toISOString().slice(0, 19) !== value.slice(0, 19)) return null;
  const zone = start.getParameter('tzid');
  if (utc && !zone) return lagosDate.format(at);
  if (!utc && (zone === 'Africa/Lagos' || zone === 'W. Central Africa Standard Time')) return day;
  return null;
}

export function readCalendar(input: unknown): { rows: CalendarDate[]; skipped: number } {
  if (typeof input !== 'string' || Buffer.byteLength(input, 'utf8') > MAX_CALENDAR_BYTES) {
    throw Error('Choose an .ics calendar file no larger than 256 KB.');
  }
  let calendar: InstanceType<typeof ICAL.Component>;
  try {
    calendar = new ICAL.Component(ICAL.parse(input.replace(/^\uFEFF/, '')));
    if (calendar.name !== 'vcalendar' || calendar.getFirstPropertyValue('version') !== '2.0') throw Error();
  } catch {
    throw Error('This file is not a readable iCalendar (.ics) file.');
  }
  const events = calendar.getAllSubcomponents('vevent');
  if (events.length > MAX_EVENTS) throw Error('Choose an .ics file with 200 events or fewer.');
  const rows: CalendarDate[] = [];
  const cancelled = String(calendar.getFirstPropertyValue('method')).toUpperCase() === 'CANCEL';
  for (const event of events) {
    if (cancelled || String(event.getFirstPropertyValue('status')).toUpperCase() === 'CANCELLED') continue;
    if (['rrule', 'rdate', 'exrule', 'exdate', 'recurrence-id'].some(name => event.hasProperty(name))) continue;
    const summary = event.getFirstPropertyValue('summary');
    if (typeof summary !== 'string') continue;
    const title = summary.replace(/\s+/gu, ' ').trim();
    if (!title || title.length > 180 || /[\u0000-\u001f\u007f]/.test(title)) continue;
    const date = eventDate(event);
    if (date) rows.push({ title, date });
  }
  return { rows: rows.sort((left, right) => left.date.localeCompare(right.date)), skipped: events.length - rows.length };
}
