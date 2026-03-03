import { Server, Atom, Layers, Braces, Paintbrush, FileCode, Database } from 'lucide-react'

const frameworks = [
  {
    id: 'express',
    name: 'Express.js',
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    icon: Server,
    color: 'emerald',
  },
  {
    id: 'react',
    name: 'React.js',
    description: 'A JavaScript library for building user interfaces with components',
    icon: Atom,
    color: 'cyan',
  },
  {
    id: 'mern',
    name: 'MERN Stack',
    description: 'Full-stack MongoDB, Express, React, Node.js project patterns',
    icon: Layers,
    color: 'violet',
  },
  {
    id: 'javascript',
    name: 'JavaScript & OOP',
    description: 'Core JavaScript patterns, OOP, async programming, and modern syntax',
    icon: Braces,
    color: 'yellow',
  },
  {
    id: 'css',
    name: 'Advanced CSS',
    description: 'Sass architecture, BEM, responsive design, Grid, Flexbox, and animations',
    icon: Paintbrush,
    color: 'pink',
  },
  {
    id: 'html',
    name: 'HTML Semantic',
    description: 'Semantic elements, accessibility, forms, meta tags, and structured markup',
    icon: FileCode,
    color: 'orange',
  },
  {
    id: 'databases',
    name: 'Databases with Express.js',
    description: 'SQL & NoSQL database patterns, ORMs, query builders, and connection management',
    icon: Database,
    color: 'teal',
  },
]

export default frameworks
