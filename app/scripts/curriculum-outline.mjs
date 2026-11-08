// Publish the agreed curriculum outline from its source document.
export function curriculumOutline(markdown) {
  const courses = [];
  let year = 0;
  let course;
  for (const line of markdown.split(/\r?\n/)) {
    const nextYear = line.match(/^## Year (\d+):/);
    if (nextYear) {
      year = Number(nextYear[1]);
      course = undefined;
    }
    if (!year) continue;
    const heading = line.match(/^### (.+) \((\d+) lessons\)$/);
    if (heading) {
      course = { title: heading[1], lessonCount: Number(heading[2]), year, units: [] };
      courses.push(course);
      continue;
    }
    if (!course) continue;
    const description = line.match(/^\*\*Subject:\*\* (.+?)\. \*\*Starts from:\*\* (.+?)\. \*\*Needs:\*\* (.+?)\. \*\*Project:\*\* (.+?\.)(?: \*\*.*)?$/);
    if (description) {
      [, course.subject, course.starts, course.needs, course.project] = description;
      continue;
    }
    const unit = line.match(/^\*\*(.+?):\*\* (.+)$/);
    if (unit) course.units.push({ title: unit[1], lessons: unit[2].split(' · ') });
  }
  for (const item of courses) {
    if (!item.subject || item.units.reduce((sum, unit) => sum + unit.lessons.length, 0) !== item.lessonCount)
      throw Error('Curriculum outline is incomplete for ' + item.title);
  }
  if (courses.length !== 53 || courses.reduce((sum, item) => sum + item.lessonCount, 0) !== 1282)
    throw Error('Curriculum outline totals do not match the approved plan.');
  return courses;
}
