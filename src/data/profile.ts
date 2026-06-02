export interface WorkEntry {
  company: string;
  role: string;
  start: string;   // "2023"
  end: string;     // "Present" | "2023"
  summary?: string;
  stack?: string[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  start: string;
  end: string;
}

export interface ProjectEntry {
  name: string;
  year: string;
  description: string;
  url?: string;
}

export interface ElsewhereLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  role: string;             // one-line role for sidebar
  lede: string;             // long-form opener for About page
  now: WorkEntry;
  previously: WorkEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  elsewhere: ElsewhereLink[];
  email: string;
}

export const profile: Profile = {
  name: 'Ray WooSeok Suh',
  role: 'iOS Engineer',
  lede:
    'iOS engineer based in Seoul. Currently on the Baemin app — Korea\'s largest food delivery service — where my work tends to live in the deeper layers: Clean Architecture, Microfeatures with Tuist, Swift 6 migration, and the parts of the codebase most people prefer to leave alone. I\'m drawn to animations that feel right, performance work, and going down to the core when it matters.',
  now: {
    company: 'Woowa Brothers (Baemin)',
    role: 'iOS Engineer',
    start: '2021',
    end: 'Present',
    summary:
      'Several years on Baemin Commerce — grocery delivery (B마트, 장보기), Swift 6 migration, modularization, architectural overhaul. Recently moved to Mobile Platform, closer to the core. Now the sole iOS engineer on the task force shipping Baemin 2.0\'s fluid animation layer.',
    stack: ['Swift 6', 'Tuist', 'Microfeatures', 'Factory DI', 'Core Animation'],
  },
  previously: [
    // TODO: fill in prior roles
  ],
  education: [
    // TODO: fill in education
  ],
  projects: [
    // TODO: add 2-5 selected projects
  ],
  elsewhere: [
    { label: 'GitHub', href: 'https://github.com/torch-ray' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wooseok-suh-2655b6232/' },
    { label: 'X', href: 'https://x.com/raywooseoksuh' },
  ],
  email: 'ddarjae@naver.com',
};
