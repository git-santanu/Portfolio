import { useState } from 'react';
import Galaxy from './components/Galaxy';
import profile from 'url:./assets/profile.jpg';
import { NODES, WORK, REPOS, LANG, CATS } from './data';

const GITHUB = 'https://github.com/git-santanu';

function Nav() {
  return (
    <nav>
      <div className="wrap">
        <a className="mark" href="#top"><i>S</i>Santanu Dutta</a>
        <div className="links">
          <a href="#about">About</a><a href="#work">Work</a><a href="#code">Projects</a>
          <a href="#experience">Experience</a><a href="#contact">Contact</a>
        </div>
        <a className="btn ghost sm" href={GITHUB}>GitHub ↗</a>
      </div>
    </nav>
  );
}

function Avatar() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="avatar">
      {failed ? <span aria-hidden="true">S</span> : (
        <img src={profile} alt="Santanu Dutta" width="120" height="120" decoding="async" fetchpriority="high" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <Galaxy />
      <div className="copy wrap">
        <Avatar />
        <h1>Hi, I'm Santanu</h1>
        <p>A frontend engineer based on Kolkata, India. I take complicated products and turn them into calm, fast interfaces, mostly with React, TypeScript and a good design system.</p>
        <div className="cta">
          <a className="btn pri" href="#work">See my work</a>
          <a className="btn ghost" href={GITHUB}>GitHub profile ↗</a>
        </div>
        <div className="stats">
          <div><b>4+</b><span>years of experience</span></div>
          <div><b>37</b><span>GitHub repos</span></div>
          <div><b>{NODES.length}</b><span>tools I use</span></div>
        </div>
      </div>
      <div className="hint">Drag to spin · grab the S to turn it · hover a star</div>
    </header>
  );
}

function About() {
  return (
    <section className="wrap about" id="about">
      <h2>About me</h2>
      <div>
        <p>I've spent the last four years building web apps, mostly the heavy kind: dashboards, approval flows, admin tools and the design systems that hold them together. I care about the details people feel but rarely notice, like a layout that never jumps, a theme that just works, or a build that finishes before your coffee does.</p>
        <p>Outside the day job, I keep building small things to learn, and lately I've been deep into build tooling, testing pipelines and playing with local AI models.</p>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="band" id="work">
      <div className="wrap">
        <h2>Things I've built</h2>
        <p className="lede">A few pieces of work I'm proud of, from my day job building enterprise web apps.</p>
        <div className="grid">
          {WORK.map(w => (
            <article className="card" key={w.t}>
              <div className="k"><span>{w.k}</span>{w.b && <b>{w.b}</b>}</div>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
              <div className="tags">{w.s.map(s => <span key={s}>{s}</span>)}</div>
            </article>
          ))}
        </div>
        <p className="also">Also: single sign-on login, permission-aware dashboard charts and file upload with validation.</p>
      </div>
    </section>
  );
}

function Repos() {
  return (
    <section className="band" id="code">
      <div className="wrap">
        <h2>Side projects</h2>
        <p className="lede">Things I built to learn, from algorithm practice to full-stack auth and CRUD apps. All on GitHub.</p>
        <div className="repos">
          {REPOS.map(([n, l, d]) => (
            <a className="repo" key={n} href={`${GITHUB}/${n}`}>
              <b>{n}</b><p>{d}</p>
              <span className="lang"><i style={{ background: LANG[l] }}></i>{l}</span>
            </a>
          ))}
        </div>
        <a className="more" href={`${GITHUB}?tab=repositories`}>All 37 repositories →</a>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="band" id="experience">
      <div className="wrap two">
        <div>
          <h2>Experience</h2>
          <p className="lede">Frontend first, but I also enjoy product design and working closely with the people who use what I build.</p>
        </div>
        <ol className="tl">
          <li className="now">
            <h3>TRPGlobal <span style={{ color: 'var(--mute)', fontWeight: 500 }}>· Risk Success Pvt Ltd</span></h3>
            <div className="when">Software Development Engineer · Current</div>
            <p>Building the frontend of an enterprise risk and compliance platform, plus a hand in product design and business analysis.</p>
          </li>
          <li>
            <h3>CodeLogicx Pvt Ltd</h3>
            <div className="when">From September 2022</div>
            <p>Building web applications.</p>
          </li>
          <li>
            <h3>SDI</h3>
            <div className="when">Earlier</div>
            <p>Where my professional journey started.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="band" id="stack">
      <div className="wrap">
        <h2>Skills</h2>
        <p className="lede">The same tools you see in the galaxy above, grouped by what I use them for.</p>
        <div className="stack">
          {CATS.map(c => (
            <div key={c}>
              <h3>{c}</h3>
              <ul>
                {NODES.filter(n => n.c === c).map(n => (
                  <li key={n.n}><i>{n.g.replace('.', '')}</i>{n.n}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <h2>Let's talk</h2>
        <p>Whether it's a role, a project or just a chat about frontend, I'd love to hear from you.</p>
        <div className="cta"><a className="btn pri" href={GITHUB}>Say hi on GitHub ↗</a></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>Designed and built by Santanu Dutta · 2026</span>
        <span>Salkia, Howrah · India</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Work />
      <Repos />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
