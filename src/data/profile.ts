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
    'iOS engineer based in Seoul. Currently building the Baemin app — Korea\'s largest food delivery service — with a focus on SwiftUI, modular architecture, and the parts of the codebase that everyone else avoids.',
  now: {
    company: 'Woowa Brothers (Baemin)',
    role: 'iOS Engineer',
    start: '2021',
    end: 'Present',
    summary:
      'Working on the time-sale and order detail features. Migrated legacy UIKit modules to SwiftUI, wrote the new logging layer.',
    stack: ['Swift 6', 'SwiftUI', 'Tuist', 'Factory DI'],
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
    { label: 'X', href: 'https://x.com/ray_dev_suh' },
  ],
  email: 'hi@wooseok.dev',
};
