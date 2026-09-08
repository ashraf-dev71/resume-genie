import { CVData, StudentIDData, SkillBadge, CertificateData } from '../types';

export const INITIAL_CV_DATA: CVData = {
  profile: {
    fullName: 'Arifur Rahman Chowdhury',
    jobTitle: 'Senior Full Stack Software Engineer',
    email: 'arifur.chowdhury@example.com',
    phone: '+880 1712 345678',
    location: 'Dhaka, Bangladesh',
    website: 'https://arifur.dev',
    linkedin: 'https://linkedin.com/in/arifur-rahman',
    github: 'https://github.com/arifur-dev',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    photoShape: 'circle',
  },
  summary: 'Results-driven Senior Full Stack Engineer with 5+ years of experience architecting distributed cloud systems and high-throughput web applications with TypeScript, React, and Node.js. Successfully scaled platforms to 2M+ active users and reduced API latency by 35%. Passionate about clean architecture, CI/CD automation, and mentoring junior engineers.',
  selectedTemplateId: 'corp-01',
  primaryColor: '#0f172a',
  secondaryColor: '#3b82f6',
  fontFamily: 'sans',
  fontSize: 'normal',
  outputLanguage: 'en',
  showPhoto: true,
  activeSectionsOrder: ['experience', 'education', 'skills', 'projects', 'certifications', 'awards', 'languages'],
  experiences: [
    {
      id: 'exp-1',
      title: 'Lead Software Engineer',
      company: 'Pathao Technologies Ltd.',
      location: 'Dhaka, Bangladesh',
      startDate: '2022 - Present',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected real-time logistics dispatch engine processing over 1.8M daily ride transactions with 99.98% uptime.',
        'Migrated monolith backend services into lightweight Go and Node.js microservices hosted on AWS EKS, slashing cloud infrastructure costs by 28%.',
        'Spearheaded design of internal React/TypeScript design system utilized across 6 frontend product teams, cutting feature release cycles by 40%.',
        'Mentored 8 mid-level and junior engineers through weekly technical design reviews and pair-programming sessions.'
      ]
    },
    {
      id: 'exp-2',
      title: 'Senior Frontend Developer',
      company: 'Brain Station 23',
      location: 'Dhaka, Bangladesh',
      startDate: '2019',
      endDate: '2022',
      current: false,
      bullets: [
        'Developed progressive web applications for multinational fintech banking clients using Next.js, Redux Toolkit, and Tailwind CSS.',
        'Optimized core web vitals and client-side bundle size, improving mobile page load speeds by 42% across low-bandwidth networks.',
        'Engineered automated e2e testing suites with Cypress, maintaining test coverage above 90% and eliminating critical release regressions.'
      ]
    }
  ],
  educations: [
    {
      id: 'edu-1',
      institution: 'Bangladesh University of Engineering and Technology (BUET)',
      degree: 'Bachelor of Science in Computer Science & Engineering',
      field: 'Computer Science and Engineering',
      location: 'Dhaka, Bangladesh',
      startDate: '2015',
      endDate: '2019',
      grade: 'CGPA: 3.86 / 4.00 (Distinction)',
      bullets: [
        'Conducted undergraduate thesis on High-Performance Distributed Computing.',
        'Represented university in ACM-ICPC Regional Programming Contest.'
      ]
    }
  ],
  skillCategories: [
    {
      id: 'sc-1',
      categoryName: 'Languages & Core',
      skills: ['TypeScript', 'JavaScript (ES6+)', 'Go', 'Python', 'SQL', 'HTML5/CSS3']
    },
    {
      id: 'sc-2',
      categoryName: 'Frameworks & Libraries',
      skills: ['React.js', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'GraphQL', 'Redux']
    },
    {
      id: 'sc-3',
      categoryName: 'Cloud & DevOps',
      skills: ['AWS (ECS, Lambda, S3)', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'PostgreSQL', 'Redis']
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'CloudPulse Monitoring Dashboard',
      role: 'Creator & Lead Architect',
      link: 'https://github.com/arifur-dev/cloudpulse',
      tools: 'React, TypeScript, Go, WebSocket, TimescaleDB',
      description: 'Open-source distributed metrics visualizer monitoring container health across multi-region Kubernetes clusters.',
      bullets: [
        'Garnered 1,400+ stars on GitHub with community contributions from 20+ international developers.',
        'Engineered real-time telemetry streaming via WebSockets with zero frame jitter.'
      ]
    },
    {
      id: 'proj-2',
      title: 'Shadhin Pay - Offline QR Wallet',
      role: 'Frontend Architect',
      link: 'https://shadhinpay.example.com',
      tools: 'React Native, WebAssembly, Crypto, SQLite',
      description: 'Peer-to-peer micro-payment protocol using encrypted optical QR signatures for unbanked communities.',
      bullets: [
        'Won 1st Runner Up in National FinTech Innovation Hackathon 2021.'
      ]
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services (AWS)',
      issueDate: 'Aug 2023',
      credentialId: 'AWS-SAA-839219',
      url: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert-2',
      name: 'Google Cloud Professional Cloud Architect',
      issuer: 'Google Cloud',
      issueDate: 'Jan 2024',
      credentialId: 'GCP-PCA-491028',
      url: 'https://cloud.google.com/certification'
    }
  ],
  awards: [
    {
      id: 'aw-1',
      title: 'Champion, National Hackathon on Digital Innovation',
      issuer: 'ICT Division, Government of Bangladesh',
      year: '2021',
      description: 'Led a 4-person team to build an automated disaster relief coordination tool used during flood emergencies.'
    }
  ],
  languages: [
    { id: 'lang-1', language: 'Bengali (বাংলা)', proficiency: 'Native' },
    { id: 'lang-2', language: 'English', proficiency: 'Fluent (Professional Proficiency)' }
  ],
  customSections: []
};

export const INITIAL_STUDENT_ID_DATA: StudentIDData = {
  instituteName: 'Dhaka University of Engineering & Technology',
  instituteSub: 'Department of Computer Science & Engineering',
  instituteLogoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=160&auto=format&fit=crop&q=80',
  studentName: 'Tasmia Nahian Kabir',
  idNumber: 'CSE-2023-0482',
  department: 'Computer Science & Engineering',
  program: 'B.Sc. in Engineering',
  batch: 'Batch 2022-2026',
  bloodGroup: 'B+ Positive',
  dob: '14 Oct 2003',
  validity: 'Dec 2026',
  emergencyContact: '+880 1819 876543',
  studentPhone: '+880 1711 223344',
  studentEmail: 'tasmia.nahian@duet.ac.bd',
  address: 'Room 402, Hall of Residence, Gazipur-1700',
  studentPhotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  signatureUrl: '',
  qrPayload: 'https://duet.ac.bd/verify/student/CSE-2023-0482',
  barcodeNumber: '8901234567890',
  layout: 'vertical',
  theme: 'university-blue',
  primaryColor: '#1e3a8a',
  secondaryColor: '#0284c7',
};

export const INITIAL_SKILL_BADGES: SkillBadge[] = [
  {
    id: 'badge-1',
    title: 'Google Cloud Certified Professional Cloud Architect',
    provider: 'Google',
    iconType: 'cloud',
    credentialId: 'GCP-7719-2024',
    verificationUrl: 'https://google.accredible.com/verify/sample',
    issueDate: '2024',
    level: 'Specialist',
    showOnCV: true,
  },
  {
    id: 'badge-2',
    title: 'AWS Certified Solutions Architect Associate',
    provider: 'AWS',
    iconType: 'server',
    credentialId: 'AWS-ARCH-9921',
    verificationUrl: 'https://aws.amazon.com/verification',
    issueDate: '2023',
    level: 'Advanced',
    showOnCV: true,
  },
  {
    id: 'badge-3',
    title: 'Meta Frontend Developer Professional Certificate',
    provider: 'Meta',
    iconType: 'code',
    credentialId: 'META-FRONT-4491',
    verificationUrl: 'https://coursera.org/verify/meta-sample',
    issueDate: '2023',
    level: 'Specialist',
    showOnCV: true,
  },
  {
    id: 'badge-4',
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    provider: 'Microsoft',
    iconType: 'shield',
    credentialId: 'MSFT-AZ900-5510',
    verificationUrl: 'https://learn.microsoft.com/credentials',
    issueDate: '2022',
    level: 'Intermediate',
    showOnCV: false,
  }
];

export const INITIAL_CERTIFICATE_DATA: CertificateData = {
  certificateId: 'GENIE-CERT-2026-8841',
  recipientName: 'Sadia Jahan Mim',
  title: 'Certificate of Excellence',
  courseOrEvent: 'Advanced Full Stack Web Development & Cloud Deployment',
  organizationName: 'Open Tech Innovation Guild',
  organizationLogoUrl: '',
  description: 'In recognition of outstanding dedication, technical proficiency, and exemplary completion of the intensive 12-week workshop program.',
  issueDate: 'September 2026',
  signatory1Name: 'Prof. Mahbubur Rahman, Ph.D.',
  signatory1Title: 'Director of Academic Affairs',
  signatory1SignatureUrl: '',
  signatory2Name: 'Farhana Akhter',
  signatory2Title: 'Lead Program Coordinator',
  signatory2SignatureUrl: '',
  sealStyle: 'gold',
  themeColor: '#1e3a8a',
};
