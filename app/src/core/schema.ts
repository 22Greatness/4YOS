// Every personal record says where it came from: origin and created_at. Plans and evidence aren't overwritten.
export const MIGRATIONS: string[] = [`
create table settings(k text primary key, v text not null);

create table memory_items(
  id integer primary key, text text not null, kind text not null,
  origin text not null check(origin in ('user_said','observed','imported','inferred','calculated')),
  status text not null default 'confirmed' check(status in ('confirmed','uncertain')),
  source_ref text, excluded_from_ai integer not null default 0, created_at text not null, updated_at text not null);

create table goals(
  id integer primary key, area text not null check(area in ('school','career','money','personal','channel')),
  title text not null, why text, target_date text, status text not null default 'active',
  origin text not null default 'user_said', created_at text not null);
create table goal_steps(
  id integer primary key, goal_id integer not null references goals(id) on delete cascade,
  title text not null, minutes integer not null default 20, position integer not null default 0,
  done_at text, skipped_until text, created_at text not null);

create table commitments(
  id integer primary key, school text, title text not null, kind text not null,
  course_code text, date text, all_day integer not null default 1, protected integer not null default 1,
  origin text not null default 'user_said', created_at text not null);

create table enrolled(course_key text primary key, added_at text not null);

create table session_progress(
  session_id text primary key, status text not null default 'not_started', step integer not null default 0,
  video_seconds real not null default 0, started_at text, finished_at text, minutes_active real not null default 0);

create table activity(
  id integer primary key, kind text not null, ref text, detail text, at text not null, minutes real);

create table evidence(
  id integer primary key, session_id text not null, skill text, task text not null, answer text,
  result text not null check(result in ('passed','failed','attempted')),
  reviewer text not null check(reviewer in ('self_reported','assistant_reviewed','directly_checked','human_reviewed')),
  assistance text not null default 'none', at text not null);

create table notes(
  id integer primary key, session_id text, course_key text, body text not null, video_seconds real,
  origin text not null default 'user_said', created_at text not null, updated_at text not null);
create virtual table search_index using fts5(kind unindexed, ref unindexed, title, body, tokenize='porter unicode61');

create table cards(
  id integer primary key, session_id text, front text not null, back text not null, state text not null,
  due text not null, origin text not null default 'imported', created_at text not null);
create table card_reviews(id integer primary key, card_id integer not null references cards(id) on delete cascade, rating integer not null, at text not null);

create table defers(ref text primary key, until text not null, reason text, at text not null);

create table plan_log(id integer primary key, day text not null, minutes integer not null, plan text not null, reason text, at text not null);

create table materials(
  id integer primary key, course_key text, title text not null, stored_as text not null, bytes integer not null,
  origin text not null default 'user_said', added_at text not null);

create table downloads(
  id text primary key, url text not null, title text not null, licence text, source text, path text not null,
  bytes_total integer, bytes_done integer not null default 0, status text not null default 'queued', error text, last_used text, added_at text not null);

create table action_log(id integer primary key, action text not null, reason text, destination text, basis text, outcome text not null, at text not null);
`, `
create table money_entries(
  id integer primary key, label text not null, currency text not null check(currency in ('NGN','USD')),
  kind text not null check(kind in ('income','expense','savings')), minor_units integer not null check(minor_units>0),
  status text not null check(status in ('actual','estimate')), date text not null,
  origin text not null default 'user_said', created_at text not null);
create table job_entries(
  id integer primary key, role text not null, organization text not null, status text not null
    check(status in ('Interested','Applied','Interview','Closed')),
  follow_up text, origin text not null default 'user_said', created_at text not null, updated_at text not null);
`, `
create table session_drafts(session_id text primary key, work text not null, code text not null, updated_at text not null);
`, `
alter table commitments add column prep_minutes integer;
alter table commitments add column prepared_at text;
`, `
create table channel_episodes(
  id integer primary key, title text not null, pillar text, status text not null default 'Idea'
    check(status in ('Idea','Writing','Making','Ready','Published')),
  checked_sources integer not null default 0, checked_privacy integer not null default 0, checked_safe integer not null default 0,
  hours real not null default 0, published_on text, origin text not null default 'user_said', created_at text not null, updated_at text not null);
`, `
create table lesson_proofs(
  session_id text primary key, due text not null, status text not null default 'due' check(status in ('due','held')),
  passed_at text, attempts integer not null default 0);
`, `
create table course_assessments(
  id text primary key, status text not null default 'open' check(status in ('open','passed','done')),
  score real, attempts integer not null default 0, work text, passed_at text);
`, `
alter table session_progress add column reading_part integer not null default 0 check(reading_part >= 0);
`, `
create table lesson_feedback(
  id integer primary key, session_id text not null, part text not null, body text not null, at text not null);
`, `
create table attempts(
  id integer primary key, assessment text not null, percent real check(percent between 0 and 100),
  passed integer not null check(passed in (0,1)), at text not null);
create index attempts_by_assessment on attempts(assessment);
insert into attempts(assessment,percent,passed,at)
  select id, null, status = 'passed', coalesce(passed_at, datetime('now')) from course_assessments where id not like 'project:%';
`];
