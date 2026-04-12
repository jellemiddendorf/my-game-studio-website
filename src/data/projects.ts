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
    tagline: 'Can you build something that stands the test of time?',//'Stand the test of time. Or despair.',//'Can you build something that stands the test of time?',
    description:
        'An incremental game about constructing the Great Pyramid.' +
        'Workers push limestone blocks across the desert while farms, workshops, and trade networks support the effort. ',
    engine: 'Godot 4',
    tags: ['Incremental', 'Simulation', 'Godot', 'Egypt'],
    status: 'wip',
    year: 2026,
    image: '/images/Visual test done v3 480x270 instead of 720x405.png',
    links: {
        steam: 'https://store.steampowered.com/app/YOUR_APP_ID',
        itch:  'https://yourname.itch.io/your-game',
    },
    featured: true,
  },
  {
    id: 'project-two',
    title: 'Rebel Run',
    tagline: 'One run. One shot. Good luck.',
    description:
        'A fast-paced action game where you pilot a starfighter through deadly trenches, dodging obstacles and enemies while a relentless battlecruiser hunts you, as you race to deliver a precise, mission-critical strike.',
    engine: 'Unity',
    tags: ['Action', 'Roguelike', 'C#', 'Unity'],
    status: 'prototype',
    year: 2025,
    image: '/images/rebel run image for website.png',
    links: {
        github: 'https://github.com/yourname/project-two',
    },
    featured: true,
  },
  {
    id: 'project-three',
    title: 'World Generator',
    tagline: 'Building better worlds.',
    description:
        'This deep fantasy map generator simulates living worlds by carving biomes, rivers, and mountain ranges into vast, emergent landscapes waiting to be explored.',
    engine: 'Java',
    tags: ['Simulation', 'Fantasy', 'Java', 'Procedural Generation'],
    status: 'prototype',
    year: 2025,
    image: '/images/Quintor Generated map.png',
    links: {
        github: 'https://github.com/yourname/project-two',
    },
    featured: true,
  },
  {
    id: 'project-four',
    title: 'Patients Please',
    tagline: 'Assess. Diagnose. Care.',
    description:
        'A thoughtful narrative game where you step into the role of a nurse, uncovering clues through observation and conversation to diagnose and care for your patient, culminating in a hands on final challenge that tests your judgment and skill.',
    engine: 'Unity',
    tags: ['Puzzle', 'Educational', '3D Immersive projector room', 'C#', 'Unity'],
    status: 'prototype',
    year: 2025,
    image: '/images/PatientsPlease Menu.jpeg',
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