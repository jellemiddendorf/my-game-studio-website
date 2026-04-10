// src/data/projects.ts
// The single source of truth. Edit this and the whole site updates.

export interface Project {
  id: string;
  title: string;
  tagline: string;        // one punchy line
  description: string;    // 2-3 sentences for the card
  engine: string;         // e.g. "Godot 4", "Unity"
  tags: string[];
  status: 'released' | 'wip' | 'prototype';
  year: number;
  image: string;          // path from /public, e.g. "/images/mygame.jpg"
  links: {
    steam?:   string;
    itch?:    string;
    github?:  string;
    trailer?: string;
  };
  featured: boolean;      // show on homepage?
}

export const projects: Project[] = [
  {
    id: 'project-one',
    title: 'Project Giza',
    tagline: 'Can you build something that stands the test of time?',
    description:
        'An incremental game about constructing the Great Pyramid using a living, physical economy. ' +
        'Workers haul real limestone blocks across the desert while farms, workshops, and trade networks support the effort. ',// +
        // 'Blending tactile logistics with idle progression, making every step of the build satisfying.',
    engine: 'Godot 4',
    tags: ['Incremental', 'Simulation', 'Godot'],
    status: 'wip',
    year: 2026,
    image: '/images/placeholder.svg',
    links: {
        steam: 'https://store.steampowered.com/app/YOUR_APP_ID',
        itch:  'https://yourname.itch.io/your-game',
    },
    featured: true,
  },
  {
    id: 'project-two',
    title: 'Second Project',
    tagline: 'Another thing I built.',
    description:
        'What was this? What was technically interesting about it?',
    engine: 'Unity',
    tags: ['Puzzle', 'C#', 'Unity'],
    status: 'wip',
    year: 2025,
    image: '/images/placeholder.svg',
    links: {
        github: 'https://github.com/yourname/project-two',
    },
    featured: false,
  },
];

// Readable status labels
export const statusLabel: Record<Project['status'], string> = {
  released:  'Released',
  wip:       'In Development',
  prototype: 'Prototype',
};