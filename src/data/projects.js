export const PROJECT_CATEGORIES = ['All', 'Full Stack', 'AI / ML', 'Web Applications'];

export const PRIMARY_PROJECTS = [
  {
    id: 'nexa-ai',
    name: 'NEXA AI',
    subtitle: 'One Intelligence. Every Possibility.',
    category: 'AI / ML',
    secondaryCategories: ['Full Stack'],
    featured: true,
    shortDescription:
      'A full-stack AI application platform featuring Gemini-powered conversations, research views with citations, file management, and interactive CSV/JSON dataset analysis.',
    longDescription:
      'NEXA AI is built as an organized digital intelligence workspace combining conversational AI, research workflows, and dataset analytics. Backed by an Express and PostgreSQL (Prisma) API layer alongside a React and TypeScript interface, it integrates @google/genai for intelligent responses, KaTeX rendering, project workspaces, and structured data views.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Gemini API', 'Tailwind CSS'],
    highlights: [
      'AI-powered conversational workspace with persistent conversation history',
      'Research-oriented workflows and citation views via dedicated research endpoints',
      'Dataset interaction and CSV/JSON data analysis views',
      'Project workspaces, file management, and user preferences persisted in PostgreSQL',
    ],
    liveUrl: 'https://nexa-ai-f1y0.onrender.com',
    githubUrl: 'https://github.com/soumik88s/NEXA-AI',
    image: '/assets/aistudio/Screenshot_2026-11-16_162610_6d9bed16.png',
    imageAlt: 'NEXA AI landing interface reading One Intelligence. Every Possibility. with navigation for Capabilities, Global Data, Research, Security, and Start Creating CTA',
    imageFit: 'contain',
    imageBg: '#060606',
  },
  {
    id: 'cvforge',
    name: 'CVFORGE',
    subtitle: 'AI-Powered ATS-Friendly CV Builder & Optimizer',
    category: 'Full Stack',
    secondaryCategories: ['AI / ML'],
    featured: true,
    shortDescription:
      'A full-stack ATS-friendly CV builder and job-description analyzer with keyword matching, Gemini-assisted refinement, and PDF/DOCX export.',
    longDescription:
      'CVFORGE pairs a multi-step structured CV builder with target job-description analysis so users can align real experience with role requirements without fabricating details. Engineered with React, Node.js, Express, PostgreSQL, Zod validation, JWT authentication, jspdf, docx, and @google/genai.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'JWT', 'Gemini API', 'PDF / DOCX Export'],
    highlights: [
      'Guided multi-step structured CV builder with isolated per-user accounts',
      'Job description parsing, keyword matching, and gap identification',
      'Measurable ATS formatting checks and AI-assisted wording refinement',
      'Production-ready PDF and DOCX document export pipeline',
    ],
    liveUrl: 'https://cvforge-2.onrender.com/',
    githubUrl: 'https://github.com/soumik88s/CVFORGE',
    image: '/assets/aistudio/Screenshot_2026-11-16_161837_be76f25e.png',
    imageAlt: 'CVFORGE landing interface reading Your experience. Structured for the job. with Build Your CV and ATS navigation controls',
  },
  {
    id: 'ai-career-intelligence',
    name: 'AI Career Intelligence System',
    subtitle: 'Explainable Resume Analysis & Semantic Job Matching',
    category: 'AI / ML',
    secondaryCategories: ['Full Stack'],
    featured: true,
    shortDescription:
      'An explainable AI career platform combining Sentence-BERT semantic embeddings, NLP extraction, SHAP feature attribution, and RAG advisory.',
    longDescription:
      'Designed to move beyond brittle keyword counting, this hybrid intelligence system parses resumes (PDF, DOCX, TXT), extracts skills and entities via NLP, computes dense semantic similarity with Sentence-BERT, explains match weights using SHAP attributions, and offers RAG-backed career guidance via FastAPI and React.',
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'NLP', 'Sentence-BERT', 'RAG', 'SHAP', 'PostgreSQL'],
    highlights: [
      'Multi-format resume extraction supporting PDF, DOCX, and TXT files',
      'NLP skill identification paired with Sentence-BERT semantic job matching',
      'Transparent SHAP feature attribution explaining skills, experience, and education scores',
      'RAG-based career guidance running on a Python FastAPI ML microservice',
    ],
    liveUrl: 'https://ai-career-intelligence-system-deployment.onrender.com/',
    githubUrl: 'https://github.com/soumik88s/ai-career-intelligence-system-deployment-fixed',
    image: '/src/assets/images/project_career_intel_1794823763648.jpg',
    imageAlt: 'AI Career Intelligence System dashboard showing semantic similarity gauges and SHAP feature attribution bars',
  },
  {
    id: 'devconnect',
    name: 'DevConnect',
    subtitle: 'Developer Collaboration Platform',
    category: 'Full Stack',
    secondaryCategories: ['Web Applications'],
    featured: true,
    shortDescription:
      'A collaborative workspace for developers with project and task tracking, code snippet sharing, developer profiles, and real-time Socket.IO messaging.',
    longDescription:
      'DevConnect brings developer workflows together in one full-stack application built with React, TypeScript, Node.js, Express, MongoDB, and Socket.IO. It includes JWT access/refresh token authentication, bcrypt password security, role-based access control, developer networking, and live real-time notifications.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT'],
    highlights: [
      'Secure JWT authentication with refresh tokens, bcrypt hashing, and RBAC',
      'Project workspaces, task boards, and code snippet collaboration',
      'Real-time team chat and instant notifications powered by Socket.IO',
      'Developer profiles with follow system, bookmarks, and portfolio links',
    ],
    liveUrl: 'https://devconnect-kqgn.onrender.com',
    githubUrl: 'https://github.com/soumik88s/Devconnect',
    image: '/src/assets/images/project_devconnect_1794823764473.jpg',
    imageAlt: 'DevConnect collaborative developer workspace showing task board, code card, and team messaging',
  },
  {
    id: 'scholarship-management',
    name: 'Online Scholarship Management System',
    subtitle: 'Role-Based Academic Scholarship Portal',
    category: 'Web Applications',
    secondaryCategories: ['Full Stack'],
    featured: true,
    shortDescription:
      'A MERN and Firebase platform simplifying scholarship discovery, document submission, application tracking, and multi-role administrative review.',
    longDescription:
      'Built to replace fragmented manual scholarship workflows, this platform provides separate portals for applicants, reviewers, and administrators. Applicants can browse opportunities, upload required documents, and monitor real-time status updates while reviewers and admins process approvals and rejections securely through Firebase Auth and REST APIs.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Authentication', 'Tailwind CSS'],
    highlights: [
      'Firebase Authentication with separate portals for applicants, reviewers, and admins',
      'Structured scholarship browsing, application forms, and document uploads',
      'Real-time application status tracking from submission to decision',
      'Administrative review dashboard for approving or rejecting submissions',
    ],
    liveUrl: "https://akademi-uni.web.app/",
    githubUrl: 'https://github.com/soumik88s/Online-Scholarship-Management-System',
    image: '/assets/aistudio/Screenshot_2026-11-16_161958_0c5f5d76.png',
    imageAlt: 'Online Scholarship Management System homepage reading Unlock Your Future with Scholarships alongside navigation for All Scholarship, Dashboard, and Register',
  },
];

export const SECONDARY_PROJECTS = [
  {
    id: 'DATAFORGE 95',
    name: 'DATAFORGE 95',
    category: 'Web Applications',
    shortDescription:
      'A full-stack data analytics and intelligence platform that transforms raw datasets into meaningful insights through automated processing, statistical analysis, interactive visualizations, and intelligent data interpretation.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    liveUrl: 'https://dataforge-95.onrender.com/',
    githubUrl: 'https://github.com/soumik88s/DATAFORGE-95',
  },
];
