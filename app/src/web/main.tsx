import { createRoot } from 'react-dom/client';
import { WebAyo } from './WebAyo.tsx';
import { CAMP_PREVIEWS } from './camp-previews.ts';
import './web.css';
import './landing.css';

const location = new URL(window.location.href);
const study = location.searchParams.get('study') === '1';

function Welcome() {
  const entry = new URL(location);
  entry.hash = '';
  entry.searchParams.set('study', '1');
  const account = new URL(entry);
  account.searchParams.set('screen', 'account');
  const courses = new URL(entry);
  courses.searchParams.set('screen', 'learn');
  const lessonLink = (id: string) => {
    const lesson = new URL(courses);
    lesson.searchParams.set('lesson', id);
    return lesson.href;
  };
  return <main className="camp-welcome" aria-labelledby="camp-welcome-title">
    <header className="camp-site-header">
      <div className="camp-site-width">
        <a className="camp-wordmark" href="#camp-welcome-title">4YOS <span>Camp</span></a>
        <nav aria-label="Explore 4YOS Camp">
          <a href="#camp-courses">Courses</a>
          <a className="camp-how-link" href="#camp-how">How it works</a>
        </nav>
        <a className="camp-welcome-account" href={account.href} aria-label="Open account settings">Account</a>
      </div>
    </header>
    <div className="camp-welcome-inner camp-site-width">
      <div className="camp-welcome-copy">
        <h1 id="camp-welcome-title">Pass your courses by really understanding them</h1>
        <p>Start with the basics. Work through real examples in computing and maths, then see what you can do on your own.</p>
        <div className="camp-site-actions">
          <a className="btn btn-primary" href={entry.href}>Start free</a>
          <a className="camp-text-link" href="#camp-courses">Explore courses <span aria-hidden="true">↓</span></a>
        </div>
        <p className="camp-welcome-note">Free lessons are open to guests.</p>
      </div>
      <div className="camp-welcome-stage">
        <div className="camp-ayo-scene"><WebAyo className="camp-welcome-ayo" /></div>
        <a className="camp-featured-lesson" href={lessonLink(CAMP_PREVIEWS[1].id)}>
          <span><small>Try a free lesson</small><strong>{CAMP_PREVIEWS[1].title}</strong></span>
          <span className="camp-featured-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
    <div className="camp-public-courses">
      <section className="camp-site-width camp-site-section" id="camp-courses" aria-labelledby="camp-courses-title">
        <div className="camp-site-section-heading">
          <div><h2 id="camp-courses-title">Find a place to start</h2><p>Pick a free lesson and try it in the study workspace.</p></div>
          <a className="camp-text-link" href={courses.href}>Browse all courses <span aria-hidden="true">→</span></a>
        </div>
        <div className="camp-public-course-grid">
          {CAMP_PREVIEWS.map(preview => (
            <article className="camp-public-course" data-tone={preview.tone} key={preview.id}>
              <span className="camp-course-code">{preview.course}</span>
              <h3>{preview.name}</h3>
              <p>{preview.description}</p>
              <a className="camp-text-link" href={lessonLink(preview.id)}>{preview.title} <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </section>
    </div>
    <section className="camp-site-width camp-site-section" id="camp-how" aria-labelledby="camp-how-title">
      <div className="camp-site-section-heading"><h2 id="camp-how-title">How study works</h2></div>
      <ol className="camp-how-steps">
        <li><h3>Pick a lesson</h3><p>Start with the topic you need now. Home gives you a next step when you return.</p></li>
        <li><h3>Work through an example</h3><p>Read the steps or watch a captioned lecture where one is available.</p></li>
        <li><h3>Try it yourself</h3><p>Answer a check, read the explanation and see the progress you’ve saved.</p></li>
      </ol>
    </section>
    <footer className="camp-site-footer">
      <div className="camp-site-width">
        <div><strong>4YOS Camp</strong><p>Independent study support for university learners.</p></div>
        <a className="camp-text-link" href={entry.href}>Open study workspace <span aria-hidden="true">→</span></a>
      </div>
    </footer>
  </main>;
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  if (study) {
    root.render(<p className="camp-loading" role="status">Opening your study space…</p>);
    void import('./App.tsx').then(({ App }) => root.render(<App />)).catch(() => {
      root.render(<p className="camp-loading" role="alert">The study space could not open. <a href={location.href}>Try again</a></p>);
    });
  } else {
    root.render(<Welcome />);
  }
}
