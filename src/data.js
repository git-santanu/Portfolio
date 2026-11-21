export const NODES=[
 {g:'Re',n:'React',c:'Frontend',w:3,d:'My home base. Most of what I build every day: complex workflows, dashboards and admin tools.'},
 {g:'Nx',n:'Nx',c:'Build & quality',w:2,d:'I work in large Nx monorepos and enjoy keeping them fast and tidy.'},
 {g:'Mt',n:'Mantine UI v7',c:'Frontend',w:2,d:'My go-to component library for building design-system wrappers.'},
 {g:'Rs',n:'Rspack',c:'Build & quality',w:2,d:'Currently moving a big monorepo from webpack to Rspack for quicker builds.'},
 {g:'RTK',n:'Redux Toolkit · RTK Query',c:'Frontend',w:2,d:'How I handle app state and server-data caching.'},
 {g:'tw',n:'Tailwind CSS',c:'Frontend',w:2,d:'Utility styling, including setups that live side by side with a component library.'},
 {g:'WS',n:'WebSockets',c:'Frontend',w:1,d:'Live progress and status updates without page refreshes.'},
 {g:'Hc',n:'Highcharts',c:'Frontend',w:1,d:'Dashboards and charts, themed to match light and dark mode.'},
 {g:'Pw',n:'Playwright',c:'Build & quality',w:2,d:'End-to-end tests that decide whether a release ships.'},
 {g:'TS',n:'TypeScript',c:'Frontend',w:2,d:'Typed components and API contracts.'},
 {g:'Hp',n:'Hapi.js',c:'Backend & data',w:2,d:'My favourite Node framework for APIs. See jwt-Auth-Hapi and Vue-Hapi-CRUD.'},
 {g:'MF',n:'Module Federation',c:'Build & quality',w:1,d:'Micro-frontends in Next.js and Nx setups.'},
 {g:'JS',n:'JavaScript',c:'Frontend',w:3,d:'Where it all started: DSA in JS, a food app and a Swiggy clone.'},
 {g:'Sb',n:'Storybook',c:'Build & quality',w:1,d:'Building and testing components in isolation.'},
 {g:'Nd',n:'Node.js',c:'Backend & data',w:2,d:'APIs and the tooling around my frontends.'},
 {g:'Nx.',n:'Next.js',c:'Frontend',w:1,d:'Server rendering, hydration and micro-frontend hosts.'},
 {g:'My',n:'MySQL · Sequelize',c:'Backend & data',w:2,d:'Relational data through the Sequelize ORM.'},
 {g:'CI',n:'GitHub Actions · Jenkins',c:'Build & quality',w:1,d:'Pipelines with test gates between dev, pre-release and release.'},
 {g:'V',n:'Vue',c:'Frontend',w:1,d:'A Vue + Hapi CRUD app on my GitHub.'},
 {g:'Ex',n:'Express.js',c:'Backend & data',w:1,d:'Lightweight Node services.'},
 {g:'Pg',n:'PostgreSQL',c:'Backend & data',w:1,d:'Relational data on Postgres.'},
 {g:'Ol',n:'Ollama',c:'AI',w:1,d:'Playing with local LLMs and wiring them into apps.'}
];
export const WORK=[
 {k:'Theming',t:'Dark mode, done properly',d:'Brought three styling systems (a component library, Tailwind and a charting library) under one set of semantic design tokens, so a single switch themes the whole app.',s:['Design tokens','Mantine','Tailwind','Highcharts']},
 {k:'Interaction',t:'Drag-and-drop role assignment',d:'A Kanban-style board for giving people access: drag users onto roles, assign in bulk, and keep it usable from five users to five hundred.',s:['React','Redux Toolkit','Drag and drop']},
 {k:'Real time',t:'Live status, no refresh',d:'Long-running jobs report progress live as a small pill badge, pushed over WebSockets from a pub/sub backend.',s:['WebSockets','React','Pub/sub']},
 {k:'Performance',t:'webpack → Rspack',d:'Moving a large monorepo to Rspack for faster builds, with a plan to bring Nx and Node up to date alongside it.',s:['Rspack','Nx','Node.js'],b:'In progress'},
 {k:'Quality',t:'Tests that guard releases',d:'A pipeline where component tests run on every merge and end-to-end tests have to pass before anything reaches QA.',s:['Storybook','Playwright','CI/CD']},
 {k:'Data',t:'Version diff viewer',d:'A side-by-side before / after view for comparing two versions of a large rule set, including removed items.',s:['React','Data grid']}
];
export const REPOS=[
 ['dsa_js-by-Santanu','JavaScript','Data structures and algorithms, worked through in JavaScript.'],
 ['jwt-Auth-Hapi','JavaScript','JWT authentication API built on Hapi.js.'],
 ['Vue-Hapi-CRUD','Vue','CRUD app with a Vue front end and a Hapi API.'],
 ['swiggy-clone-by-santanu','JavaScript','A Swiggy-style food delivery UI clone.'],
 ['foodapp','JavaScript','A food ordering app.'],
 ['jwtAuth','JavaScript','JWT sign-in and protected-route flow.']
];
export const LANG={JavaScript:'#f1e05a',Vue:'#41b883'};
export const CATS=['Frontend','Backend & data','Build & quality','AI'];
