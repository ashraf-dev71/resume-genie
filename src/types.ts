export type Language = 'en' | 'bn';
export type AppTab = 'cv-builder' | 'id-creator' | 'skill-badges' | 'certificate-maker';
export type ThemeMode = 'light' | 'dark';

export type TemplateCategory = 'corporate' | 'creative' | 'it' | 'academic';

export type CVLayoutType = 
  | 'single'
  | 'two-column-left'
  | 'two-column-right'
  | 'modern-header'
  | 'harvard-classic'
  | 'compact-ats'
  | 'boxed'
  | 'timeline';

export type CVFontFamily = 'sans' | 'serif' | 'mono' | 'display' | 'bengali';

export interface CVTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  layout: CVLayoutType;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: CVFontFamily;
  atsScore: number;
  tags: string[];
  description: string;
  hasPhoto: boolean;
  borderStyle?: 'none' | 'thin' | 'accent-top' | 'frame';
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
  bullets: string[];
}

export interface SkillCategoryItem {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  link: string;
  tools: string;
  description: string;
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  url: string;
  badgeType?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
}

export interface CustomSectionItem {
  id: string;
  heading: string;
  subheading: string;
  date: string;
  bullets: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CVProfile {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl: string;
  photoShape: 'circle' | 'rounded' | 'square';
}

export interface CVData {
  profile: CVProfile;
  summary: string;
  selectedTemplateId: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: CVFontFamily;
  fontSize: 'compact' | 'normal' | 'spacious';
  outputLanguage: Language;
  showPhoto: boolean;
  activeSectionsOrder: string[]; // ['experience', 'education', 'skills', 'projects', 'certifications', 'awards', 'languages', custom...]
  experiences: ExperienceItem[];
  educations: EducationItem[];
  skillCategories: SkillCategoryItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  languages: LanguageItem[];
  customSections: CustomSection[];
}

// Student ID Card Types
export type IDCardLayout = 'vertical' | 'horizontal';
export type IDCardTheme = 'university-blue' | 'tech-emerald' | 'crimson-academy' | 'midnight-gold' | 'medical-cyan' | 'cyber-slate';

export interface StudentIDData {
  instituteName: string;
  instituteSub: string;
  instituteLogoUrl: string;
  studentName: string;
  idNumber: string;
  department: string;
  program: string;
  batch: string;
  bloodGroup: string;
  dob: string;
  validity: string;
  emergencyContact: string;
  studentPhone: string;
  studentEmail: string;
  address: string;
  studentPhotoUrl: string;
  signatureUrl: string;
  qrPayload: string;
  barcodeNumber: string;
  layout: IDCardLayout;
  theme: IDCardTheme;
  primaryColor: string;
  secondaryColor: string;
}

// Skill Badge Types
export interface SkillBadge {
  id: string;
  title: string;
  provider: 'Google' | 'Microsoft' | 'AWS' | 'Coursera' | 'Meta' | 'Harvard' | 'IBM' | 'Other';
  iconType: string;
  credentialId: string;
  verificationUrl: string;
  issueDate: string;
  expiryDate?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Specialist';
  showOnCV: boolean;
}

// Generic Certificate Types
export type CertificateTheme = 'gold-classic' | 'navy-ivy' | 'emerald-modern' | 'burgundy-royal';

export interface CertificateData {
  certificateId: string;
  recipientName: string;
  title: string; // e.g. "Certificate of Completion"
  courseOrEvent: string;
  courseOrWorkshop?: string;
  organizationName: string;
  organization?: string;
  organizationLogoUrl?: string;
  description: string;
  issueDate: string;
  signatory1Name: string;
  signatory1Title: string;
  signatory1SignatureUrl?: string;
  signatory1Signature?: string;
  signatory2Name: string;
  signatory2Title: string;
  signatory2SignatureUrl?: string;
  signatory2Signature?: string;
  sealStyle?: 'gold' | 'silver' | 'bronze' | 'emerald';
  themeColor?: string;
  theme?: CertificateTheme;
}

export type { RoleSuggestion } from './data/suggestions';
