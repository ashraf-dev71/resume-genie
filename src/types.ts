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

export type IDCardDesignType = 
  | 'standard-corporate'
  | 'tech-silicon'
  | 'executive-smartchip'
  | 'medical-emergency'
  | 'cyber-keycard'
  | 'university-classic'
  | 'conference-vip'
  | 'swiss-minimalist'
  | 'sports-athletic'
  | 'police-security'
  | 'horizontal-dualcol'
  | 'horizontal-campus'
  | 'horizontal-transit';

export interface IDCardTemplate {
  id: string;
  name: string;
  category: 'corporate' | 'academic' | 'medical' | 'school' | 'tech' | 'event' | 'minimalist' | 'security';
  layout: IDCardLayout;
  designType?: IDCardDesignType;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headerStyle: 'gradient' | 'curved' | 'slanted' | 'minimal' | 'badge-top' | 'split-vertical' | 'frame' | 'cyber' | 'shield';
  bgPattern?: 'dots' | 'grid' | 'waves' | 'hex' | 'circuit' | 'stripes' | 'none';
  borderStyle?: 'rounded-2xl' | 'rounded-xl' | 'pill' | 'chamfer';
  badgeText: string;
  description: string;
  previewGradient: string;
}

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
  designType?: IDCardDesignType;
  primaryColor: string;
  secondaryColor: string;
  selectedTemplateId?: string;
  headerStyle?: 'gradient' | 'curved' | 'slanted' | 'minimal' | 'badge-top' | 'split-vertical' | 'frame' | 'cyber' | 'shield';
  bgPattern?: 'dots' | 'grid' | 'waves' | 'hex' | 'circuit' | 'stripes' | 'none';
  accentColor?: string;
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

export type CertificateLayoutType =
  | 'classic-royal'
  | 'modern-bauhaus'
  | 'corporate-sash'
  | 'art-deco'
  | 'cyber-matrix'
  | 'academic-diploma'
  | 'botanical-ivy'
  | 'sports-championship'
  | 'minimalist-monoline'
  | 'youth-achievement';

export type CertificateBorderStyle = 
  | 'double-gold' 
  | 'ornate-crest' 
  | 'modern-geometric' 
  | 'ribbon-frame' 
  | 'minimalist-line' 
  | 'vintage-guilloche' 
  | 'cyber-bracket' 
  | 'diploma-classic' 
  | 'botanical-ivy' 
  | 'royal-seal';

export type CertificateSealType = 
  | 'gold-sunburst' 
  | 'silver-star' 
  | 'emerald-shield' 
  | 'bronze-medal' 
  | 'ruby-crest' 
  | 'sapphire-ribbon';

export type CertificateFontPairing = 
  | 'serif-regal' 
  | 'playfair-modern' 
  | 'cinzel-academic' 
  | 'sans-tech' 
  | 'classic-formal';

export interface CertificateTemplate {
  id: string;
  name: string;
  category: 'academic' | 'corporate' | 'course' | 'honors' | 'tech' | 'creative' | 'sports' | 'appreciation';
  layoutType?: CertificateLayoutType;
  borderStyle: CertificateBorderStyle;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  sealType: CertificateSealType;
  fontPairing: CertificateFontPairing;
  headerText: string;
  title: string;
  description: string;
  tags: string[];
}

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
  layoutType?: CertificateLayoutType;
  selectedTemplateId?: string;
  borderStyle?: CertificateBorderStyle;
  sealType?: CertificateSealType;
  fontPairing?: CertificateFontPairing;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
}

export type { RoleSuggestion } from './data/suggestions';
