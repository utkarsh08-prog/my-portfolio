// Single source of truth for CV content. Fill more fields later.
export const cv = {
  name: 'Utkarsh',
  title: 'MERN Stack Developer',
  summary: '',
  email: 'vishu.utkarsh8@gmail.com',
  phone: '9889359375',
  location: 'India',
  links: {
    linkedin: '',
    github: '',
    portfolio: '',
  },
  skills: {
    frontend: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'React',
      'Tailwind CSS',
      'Framer Motion',
      'Vite'
    ],
    backend: [
      'Node.js',
      'Express',
      'REST APIs',
      'MongoDB'
    ],
    tools: [
      'Git & GitHub',
      'VS Code',
      'Postman',
      'Figma'
    ],
  },
  projects: [
    {
      title: 'ShopEasy',
      tag: 'E-commerce',
      desc: 'Full-featured online shopping platform with user authentication, product management, cart functionality, and secure payment integration.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT'],
      live: '',
      github: '',
    },
    {
      title: 'E-commerce Website',
      tag: 'Full Stack',
      desc: 'Complete e-commerce platform with product catalog, cart, and checkout flow.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      live: '',
      github: '',
    },
    {
      title: 'Portfolio Website',
      tag: 'Frontend',
      desc: 'Personal portfolio showcasing projects with modern design and smooth animations.',
      tech: ['React', 'Tailwind CSS', 'Framer Motion'],
      live: '',
      github: '',
    },
  ],
  experience: [
    // {
    //   company: 'Company',
    //   role: 'Role',
    //   dates: '2023 — Present',
    //   bullets: [
    //     'Achievement or responsibility',
    //   ],
    // },
  ],
  education: [
    // { school: 'University', degree: 'B.Tech', dates: '2019 — 2023' },
  ],
  resumePath: '/UTKARSH CV.pdf',
};
