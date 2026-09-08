import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  tabs: {
    cvBuilder: string;
    idCreator: string;
    skillBadges: string;
    certificateMaker: string;
  };
  actions: {
    downloadPdf: string;
    print: string;
    preview: string;
    edit: string;
    save: string;
    saved: string;
    autoSaved: string;
    reset: string;
    loadSample: string;
    selectTemplate: string;
    smartSuggestions: string;
    uploadPhoto: string;
    cropPhoto: string;
    removePhoto: string;
    addExperience: string;
    addEducation: string;
    addSkillCategory: string;
    addProject: string;
    addCertification: string;
    addAward: string;
    addLanguage: string;
    addCustomSection: string;
    delete: string;
    moveUp: string;
    moveDown: string;
    close: string;
    apply: string;
    cancel: string;
    disclaimer: string;
    privacyNotice: string;
    changeLanguage: string;
    darkMode: string;
    lightMode: string;
    zoomIn: string;
    zoomOut: string;
    fitScreen: string;
    backSide: string;
    frontSide: string;
    drawSignature: string;
    clearSignature: string;
    uploadSignature: string;
    generateQr: string;
  };
  cvHeadings: {
    contact: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    certifications: string;
    awards: string;
    languages: string;
    custom: string;
    present: string;
  };
  cvEditor: {
    personalDetails: string;
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    professionalSummary: string;
    summaryPlaceholder: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    currentlyWorking: string;
    bullets: string;
    bulletPlaceholder: string;
    addBullet: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    gradeGpa: string;
    skillCategoryName: string;
    skillsCommaSeparated: string;
    projectTitle: string;
    projectRole: string;
    projectLink: string;
    toolsUsed: string;
    projectDescription: string;
    certName: string;
    issuer: string;
    issueDate: string;
    credentialId: string;
    credentialUrl: string;
    awardTitle: string;
    awardIssuer: string;
    awardYear: string;
    languageName: string;
    proficiency: string;
    customSectionTitle: string;
    outputLanguageLabel: string;
    templateStyle: string;
    colorCustomizer: string;
    fontFamilyLabel: string;
  };
  idCard: {
    title: string;
    subtitle: string;
    instituteName: string;
    instituteSub: string;
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
    uploadLogo: string;
    uploadPhoto: string;
    authorizedSign: string;
    qrPayload: string;
    barcode: string;
    themeStyle: string;
    cardOrientation: string;
    vertical: string;
    horizontal: string;
    instructionsNotice: string;
  };
  skillBadges: {
    title: string;
    subtitle: string;
    addBadge: string;
    badgeTitle: string;
    provider: string;
    credentialId: string;
    verifyUrl: string;
    issueDate: string;
    showOnCv: string;
    presetBadges: string;
  };
  certificate: {
    title: string;
    subtitle: string;
    recipientName: string;
    certTitle: string;
    courseOrEvent: string;
    organization: string;
    date: string;
    description: string;
    signer1Name: string;
    signer1Title: string;
    signer2Name: string;
    signer2Title: string;
    sealStyle: string;
    downloadCert: string;
  };
  legal: {
    title: string;
    usageDisclaimerTitle: string;
    usageDisclaimer: string;
    privacyTitle: string;
    privacyPolicy: string;
    licensingTitle: string;
    licensing: string;
    closeBtn: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'ResumeGenie & ID Creator',
    tagline: 'Professional ATS-friendly CVs, Student ID Cards & Verified Skill Showcase',
    tabs: {
      cvBuilder: 'CV / Resume Builder',
      idCreator: 'Student ID Generator',
      skillBadges: 'Verified Skill Badges',
      certificateMaker: 'Custom Certificate',
    },
    actions: {
      downloadPdf: 'Export PDF / Print',
      print: 'Print A4 Document',
      preview: 'Live Preview',
      edit: 'Editor',
      save: 'Save Changes',
      saved: 'Saved',
      autoSaved: 'Auto-saved locally',
      reset: 'Reset to Default',
      loadSample: 'Load Professional Sample',
      selectTemplate: 'Template Gallery (100+)',
      smartSuggestions: 'Smart AI Suggestions',
      uploadPhoto: 'Upload Photo',
      cropPhoto: 'Crop & Position',
      removePhoto: 'Remove',
      addExperience: '+ Add Experience',
      addEducation: '+ Add Education',
      addSkillCategory: '+ Add Skill Category',
      addProject: '+ Add Project',
      addCertification: '+ Add Certification',
      addAward: '+ Add Award / Honor',
      addLanguage: '+ Add Language',
      addCustomSection: '+ Add Custom Section',
      delete: 'Delete',
      moveUp: 'Move Up',
      moveDown: 'Move Down',
      close: 'Close',
      apply: 'Apply Changes',
      cancel: 'Cancel',
      disclaimer: 'Legal & Privacy',
      privacyNotice: '100% Client-Side Privacy',
      changeLanguage: 'বাংলা',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      fitScreen: 'Fit Screen',
      backSide: 'Back Side',
      frontSide: 'Front Side',
      drawSignature: 'Sign on Screen',
      clearSignature: 'Clear',
      uploadSignature: 'Upload Signature Image',
      generateQr: 'Generate QR Code',
    },
    cvHeadings: {
      contact: 'Contact Information',
      summary: 'Professional Summary',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills & Competencies',
      projects: 'Key Projects',
      certifications: 'Licenses & Certifications',
      awards: 'Honors & Awards',
      languages: 'Languages',
      custom: 'Additional Information',
      present: 'Present',
    },
    cvEditor: {
      personalDetails: 'Personal & Contact Information',
      fullName: 'Full Name',
      jobTitle: 'Professional Title / Target Role',
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'City, Country',
      website: 'Portfolio / Website URL',
      linkedin: 'LinkedIn Profile URL',
      github: 'GitHub / GitLab Profile URL',
      professionalSummary: 'Professional Summary / Objective',
      summaryPlaceholder: 'Brief 2-3 sentence overview highlighting your core value proposition, key achievements, and domain expertise...',
      company: 'Company / Organization',
      role: 'Job Role / Title',
      startDate: 'Start Date (e.g. Jan 2022)',
      endDate: 'End Date (e.g. Present)',
      currentlyWorking: 'Currently working here',
      bullets: 'Accomplishment Bullet Points',
      bulletPlaceholder: 'Describe an achievement using action verb + metric (e.g., Led migration of X reducing Y by 25%)...',
      addBullet: '+ Add Achievement Bullet',
      institution: 'Institution / University',
      degree: 'Degree / Certificate',
      fieldOfStudy: 'Field of Study / Major',
      gradeGpa: 'GPA / Distinction (Optional)',
      skillCategoryName: 'Category Name (e.g. Languages, Cloud, Frameworks)',
      skillsCommaSeparated: 'Skills (separated by commas or hit Enter)',
      projectTitle: 'Project Name',
      projectRole: 'Role / Contribution',
      projectLink: 'Live Link or Repo URL',
      toolsUsed: 'Tech Stack / Tools Used',
      projectDescription: 'Brief description of the project impact and problem solved...',
      certName: 'Certification Name',
      issuer: 'Issuing Organization (Google, AWS, Meta, etc.)',
      issueDate: 'Issue Date',
      credentialId: 'Credential ID / License Number',
      credentialUrl: 'Verification URL',
      awardTitle: 'Award / Honor Title',
      awardIssuer: 'Granting Organization / Event',
      awardYear: 'Year Received',
      languageName: 'Language',
      proficiency: 'Proficiency Level (e.g. Native, Fluent, Professional)',
      customSectionTitle: 'Custom Section Title',
      outputLanguageLabel: 'CV Headings Language',
      templateStyle: 'Template & Visual Theme',
      colorCustomizer: 'Primary Accent Color',
      fontFamilyLabel: 'Typography Family',
    },
    idCard: {
      title: 'Student ID Card Generator',
      subtitle: 'Standard CR80 Credit Card Size (85.6mm × 53.98mm) Front & Back with QR Verification',
      instituteName: 'Institution / University Name',
      instituteSub: 'Campus / Faculty Subtitle',
      studentName: 'Student Full Name',
      idNumber: 'Student ID / Roll No.',
      department: 'Department / Faculty',
      program: 'Program / Major',
      batch: 'Batch / Session',
      bloodGroup: 'Blood Group',
      dob: 'Date of Birth',
      validity: 'Valid Till / Expiry Date',
      emergencyContact: 'Emergency Contact Phone',
      studentPhone: 'Student Contact Phone',
      studentEmail: 'Student Email Address',
      address: 'Present Address',
      uploadLogo: 'Upload Institute Logo',
      uploadPhoto: 'Upload Student Photograph',
      authorizedSign: 'Authorized Signatory',
      qrPayload: 'QR Code Verification Link / Payload',
      barcode: 'Barcode Number',
      themeStyle: 'Card Theme & Colors',
      cardOrientation: 'Card Layout Orientation',
      vertical: 'Vertical (Portrait CR80)',
      horizontal: 'Horizontal (Landscape CR80)',
      instructionsNotice: 'Strictly for genuine academic identification, campus clubs, and workshop badges.',
    },
    skillBadges: {
      title: 'Verified Skill Badges & Credentials',
      subtitle: 'Showcase authentic cloud and tech badges seamlessly on your CV and portfolio',
      addBadge: '+ Add Verified Badge',
      badgeTitle: 'Badge / Certification Name',
      provider: 'Credential Issuer',
      credentialId: 'Credential ID',
      verifyUrl: 'Public Verification URL',
      issueDate: 'Issue Date',
      showOnCv: 'Display Badge on CV',
      presetBadges: 'Quick Add Popular Badges',
    },
    certificate: {
      title: 'Custom Generic Certificate Generator',
      subtitle: 'Create completion certificates for local workshops, hackathons, and student clubs',
      recipientName: 'Recipient Full Name',
      certTitle: 'Certificate Heading (e.g., Certificate of Completion)',
      courseOrEvent: 'Workshop, Course, or Hackathon Title',
      organization: 'Issuing Organization / Club Name',
      date: 'Date of Issuance',
      description: 'Citation / Reason of Award (e.g. For outstanding participation and successful completion of...)',
      signer1Name: 'Primary Signer Name',
      signer1Title: 'Primary Signer Title (e.g. Lead Instructor)',
      signer2Name: 'Secondary Signer Name',
      signer2Title: 'Secondary Signer Title (e.g. Club President)',
      sealStyle: 'Seal Badge Tone',
      downloadCert: 'Export High-Res Certificate',
    },
    legal: {
      title: 'Legal Disclaimers & Privacy Assurance',
      usageDisclaimerTitle: 'Mandatory Usage Disclaimer',
      usageDisclaimer: 'This tool is intended for personal, educational, and formatting purposes only. The user is solely responsible for the inputted information. Generating forged institutional ID cards or fake corporate certificates is strictly prohibited. The developer(s) assume no liability for misuse.',
      privacyTitle: 'Zero-Server Privacy Guarantee',
      privacyPolicy: 'All data entered in ResumeGenie & ID Creator is processed 100% locally within your browser using modern Web APIs and localStorage. No personal data, resumes, student photographs, or signatures are ever uploaded to any remote database, cloud server, or third-party endpoint.',
      licensingTitle: 'Open-Source Template Licensing',
      licensing: 'All CV layouts and designs provided in this suite are open-source and free to use under permissible licensing for personal and commercial job application purposes.',
      closeBtn: 'I Understand & Agree',
    },
  },
  bn: {
    appName: 'রিজিউমিজিনি ও আইডি মেকার',
    tagline: 'পেশাদার এটিএস-বান্ধব সিভি, স্টুডেন্ট আইডি কার্ড এবং ভেরিফাইড স্কিল শোকেস',
    tabs: {
      cvBuilder: 'সিভি / রিজিউম মেকার',
      idCreator: 'স্টুডেন্ট আইডি কার্ড',
      skillBadges: 'ভেরিফাইড স্কিল ব্যাজ',
      certificateMaker: 'সার্টিফিকেট জেনারেটর',
    },
    actions: {
      downloadPdf: 'পিডিএফ ডাউনলোড / প্রিন্ট',
      print: 'A4 প্রিন্ট করুন',
      preview: 'লাইভ প্রিভিউ',
      edit: 'এডিট প্যানেল',
      save: 'সংরক্ষণ করুন',
      saved: 'সংরক্ষিত',
      autoSaved: 'স্বয়ংক্রিয়ভাবে লোকাল মেমোরিতে সংরক্ষিত',
      reset: 'রিসেট করুন',
      loadSample: 'নমুনা তথ্য লোড করুন',
      selectTemplate: '১০০+ টেমপ্লেট গ্যালারি',
      smartSuggestions: 'স্মার্ট পরামর্শ (AI)',
      uploadPhoto: 'ছবি আপলোড',
      cropPhoto: 'ক্রপ ও পজিশন',
      removePhoto: 'মুছুন',
      addExperience: '+ কর্মঅভিজ্ঞতা যোগ করুন',
      addEducation: '+ শিক্ষা যোগ করুন',
      addSkillCategory: '+ দক্ষতার ক্যাটাগরি যোগ',
      addProject: '+ প্রজেক্ট যোগ করুন',
      addCertification: '+ সার্টিফিকেট যোগ করুন',
      addAward: '+ সম্মাননা ও পুরস্কার যোগ',
      addLanguage: '+ ভাষা যোগ করুন',
      addCustomSection: '+ কাস্টম সেকশন যোগ',
      delete: 'মুছুন',
      moveUp: 'উপরে নিন',
      moveDown: 'নিচে নিন',
      close: 'বন্ধ করুন',
      apply: 'প্রয়োগ করুন',
      cancel: 'বাতিল',
      disclaimer: 'আইনি নোটিশ ও প্রাইভেসী',
      privacyNotice: '১০০% ব্রাউজার প্রাইভেসী',
      changeLanguage: 'English',
      darkMode: 'ডার্ক মোড',
      lightMode: 'লাইট মোড',
      zoomIn: 'বড় করুন',
      zoomOut: 'ছোট করুন',
      fitScreen: 'স্ক্রিন ফিট',
      backSide: 'পেছনের দিক',
      frontSide: 'সামনের দিক',
      drawSignature: 'স্ক্রিনে স্বাক্ষর দিন',
      clearSignature: 'মুছুন',
      uploadSignature: 'স্বাক্ষর ছবি আপলোড',
      generateQr: 'কিউআর কোড তৈরি করুন',
    },
    cvHeadings: {
      contact: 'যোগাযোগের তথ্য',
      summary: 'পেশাগত বিবরণ',
      experience: 'কর্মঅভিজ্ঞতা',
      education: 'শিক্ষাগত যোগ্যতা',
      skills: 'দক্ষতা ও পারদর্শিতা',
      projects: 'গুরুত্বপূর্ণ প্রকল্পসমূহ',
      certifications: 'সার্টিফিকেশন ও লাইসেন্স',
      awards: 'পুরস্কার ও সম্মাননা',
      languages: 'ভাষাসমূহ',
      custom: 'অন্যান্য তথ্য',
      present: 'বর্তমান',
    },
    cvEditor: {
      personalDetails: 'ব্যক্তিগত ও যোগাযোগের বিবরণ',
      fullName: 'পুরো নাম',
      jobTitle: 'পদবী / কাঙ্ক্ষিত ভূমিকা',
      email: 'ইমেইল ঠিকানা',
      phone: 'ফোন নম্বর',
      location: 'শহর, দেশ',
      website: 'পোর্টফোলিও / ওয়েবসাইট',
      linkedin: 'লিঙ্কডইন প্রোফাইল',
      github: 'গিটহাব / গিটল্যাব প্রোফাইল',
      professionalSummary: 'পেশাগত সারাংশ / ক্যারিয়ার অবজেক্টিভ',
      summaryPlaceholder: 'আপনার মূল শক্তি, কাজের অভিজ্ঞতা এবং ক্যারিয়ার লক্ষ্য সংক্ষেপে লিখুন...',
      company: 'প্রতিষ্ঠান / কোম্পানি',
      role: 'কাজের পদবী',
      startDate: 'শুরুর সময় (যেমন: জানু ২০২২)',
      endDate: 'শেষের সময় (যেমন: বর্তমান)',
      currentlyWorking: 'বর্তমানে এখানে কর্মরত',
      bullets: 'কাজের মূল অর্জনসমূহ',
      bulletPlaceholder: 'অ্যাকশন ভার্ব ও সংখ্যাসহ কাজের প্রভাব লিখুন (যেমন: এক্স সিস্টেম তৈরি করে উৎপাদনশীলতা ৩০% বৃদ্ধি)...',
      addBullet: '+ অর্জনের পয়েন্ট যোগ করুন',
      institution: 'শিক্ষা প্রতিষ্ঠান / বিশ্ববিদ্যালয়',
      degree: 'ডিগ্রি / সনদ',
      fieldOfStudy: 'বিভাগ / পড়ার বিষয়',
      gradeGpa: 'সিজিপিএ / গ্রেড (ঐচ্ছিক)',
      skillCategoryName: 'ক্যাটাগরির নাম (যেমন: প্রোগ্রামিং ভাষা, ফ্রেমওয়ার্ক)',
      skillsCommaSeparated: 'দক্ষতাসমূহ (কমা দিয়ে লিখুন)',
      projectTitle: 'প্রকল্পের নাম',
      projectRole: 'ভূমিকা / অবদান',
      projectLink: 'লাইভ লিংক বা রিপোজিটরি',
      toolsUsed: 'ব্যবহৃত প্রযুক্তি ও টুলস',
      projectDescription: 'প্রকল্পের সারসংক্ষেপ ও সমাধানের বিবরণ...',
      certName: 'সার্টিফিকেশনের নাম',
      issuer: 'প্রদানকারী সংস্থা (Google, AWS, Meta ইত্যাদি)',
      issueDate: 'প্রদানের তারিখ',
      credentialId: 'ক্রেডেনশিয়াল আইডি / নম্বর',
      credentialUrl: 'ভেরিফিকেশন লিংক',
      awardTitle: 'পুরস্কার / সম্মানের শিরোনাম',
      awardIssuer: 'প্রদানকারী সংস্থা',
      awardYear: 'প্রাপ্তির বছর',
      languageName: 'ভাষা',
      proficiency: 'দক্ষতার স্তর (যেমন: মাতৃভাষা, সাবলীল, প্রাতিষ্ঠানিক)',
      customSectionTitle: 'কাস্টম সেকশনের শিরোনাম',
      outputLanguageLabel: 'সিভি শিরোনামের ভাষা',
      templateStyle: 'টেমপ্লেট ও ভিজ্যুয়াল থিম',
      colorCustomizer: 'মূল অ্যাকসেন্ট রং',
      fontFamilyLabel: 'ফন্ট স্টাইল',
    },
    idCard: {
      title: 'স্টুডেন্ট আইডি কার্ড জেনারেটর',
      subtitle: 'স্ট্যান্ডার্ড CR80 কার্ড সাইজ (৮৫.৬ মিমি × ৫৩.৯৮ মিমি) কিউআর ভেরিফিকেশনসহ',
      instituteName: 'শিক্ষা প্রতিষ্ঠান / বিশ্ববিদ্যালয়ের নাম',
      instituteSub: 'ক্যাম্পাস / অনুষদের নাম',
      studentName: 'শিক্ষার্থীর পুরো নাম',
      idNumber: 'স্টুডেন্ট আইডি / রোল নম্বর',
      department: 'বিভাগ / ডিপার্টমেন্ট',
      program: 'প্রোগ্রাম / ডিগ্রি',
      batch: 'ব্যাচ / শিক্ষাবর্ষ',
      bloodGroup: 'রক্তের গ্রুপ',
      dob: 'জন্ম তারিখ',
      validity: 'মেয়াদ উত্তীর্ণের তারিখ',
      emergencyContact: 'জরুরি যোগাযোগের ফোন',
      studentPhone: 'শিক্ষার্থীর মোবাইল নম্বর',
      studentEmail: 'শিক্ষার্থীর ইমেইল',
      address: 'বর্তমান ঠিকানা',
      uploadLogo: 'প্রতিষ্ঠানের লোগো আপলোড',
      uploadPhoto: 'শিক্ষার্থীর পাসপোর্ট ছবি আপলোড',
      authorizedSign: 'অনুমোদিত স্বাক্ষর',
      qrPayload: 'কিউআর কোড লিংক / তথ্য',
      barcode: 'বারকোড নম্বর',
      themeStyle: 'কার্ড থিম ও কালার',
      cardOrientation: 'কার্ডের অনুভূমিক/উল্লম্ব রূপ',
      vertical: 'উল্লম্ব (Portrait CR80)',
      horizontal: 'অনুভূমিক (Landscape CR80)',
      instructionsNotice: 'শুধুমাত্র বৈধ প্রাতিষ্ঠানিক ও শিক্ষামূলক ক্লাব ব্যবহারের জন্য।',
    },
    skillBadges: {
      title: 'ভেরিফাইড স্কিল ব্যাজ ও সনদ',
      subtitle: 'গুগল, মাইক্রোসফট, এডব্লিউএস ইত্যাদির সনদ সিভিতে সুন্দরভাবে প্রদর্শন করুন',
      addBadge: '+ ভেরিফাইড ব্যাজ যোগ',
      badgeTitle: 'ব্যাজ / সার্টিফিকেটের নাম',
      provider: 'প্রদানকারী সংস্থা',
      credentialId: 'ক্রেডেনশিয়াল আইডি',
      verifyUrl: 'পাবলিক ভেরিফিকেশন লিংক',
      issueDate: 'প্রদানের তারিখ',
      showOnCv: 'সিভিতে ব্যাজ দেখান',
      presetBadges: 'জনপ্রিয় ব্যাজসমূহ',
    },
    certificate: {
      title: 'কাস্টম সনদপত্র জেনারেটর',
      subtitle: 'লোকাল ওয়ার্কশপ, হ্যাকাথন বা ক্লাবের জন্য দৃষ্টিনন্দন সনদ তৈরি করুন',
      recipientName: 'প্রাপকের পুরো নাম',
      certTitle: 'সনদের শিরোনাম (যেমন: সমাপনী সনদপত্র)',
      courseOrEvent: 'ওয়ার্কশপ, কোর্স বা ইভেন্টের নাম',
      organization: 'প্রদানকারী ক্লাব বা সংস্থা',
      date: 'প্রদানের তারিখ',
      description: 'প্রশংসাপত্র / সফলভাবে সম্পন্ন করার বিবরণ',
      signer1Name: 'প্রথম স্বাক্ষরকারীর নাম',
      signer1Title: 'পদবী (যেমন: মুখ্য প্রশিক্ষক)',
      signer2Name: 'দ্বিতীয় স্বাক্ষরকারীর নাম',
      signer2Title: 'পদবী (যেমন: ক্লাব সভাপতি)',
      sealStyle: 'সিল মোহরের রং',
      downloadCert: 'হাই-রেজুলিউশন সনদ ডাউনলোড',
    },
    legal: {
      title: 'আইনি শর্তাবলী ও গোপনীয়তার নিশ্চয়তা',
      usageDisclaimerTitle: 'বাধ্যতামূলক ব্যবহারের শর্তাবলী',
      usageDisclaimer: 'এই টুলটি শুধুমাত্র ব্যক্তিগত, শিক্ষামূলক এবং ফরম্যাটিং কাজের জন্য তৈরি। ব্যবহারকারীর ইনপুটকৃত সমস্ত তথ্যের জন্য ব্যবহারকারী নিজেই সম্পূর্ণভাবে দায়ী। কোন প্রতিষ্ঠানের জাল বা ভুয়া আইডি কার্ড তৈরি করা সম্পূর্ণ বেআইনি এবং নিষিদ্ধ। কোন অপব্যবহারের জন্য ডেভেলপার(গণ) দায়ী থাকবেন না।',
      privacyTitle: '১০০% জিরো-সার্ভার প্রাইভেসী গ্যারান্টি',
      privacyPolicy: 'রিজিউমিজিনি ও আইডি মেকারে ব্যবহৃত সমস্ত তথ্য এবং ছবি শুধুমাত্র আপনার ডিভাইসের ব্রাউজারে লোকালভাবে প্রসেস হয়। কোন দূরবর্তী সার্ভার বা ক্লাউডে ব্যক্তিগত তথ্য, ছবি বা স্বাক্ষর আপলোড হয় না।',
      licensingTitle: 'ওপেন-সোর্স লাইসেন্সিং',
      licensing: 'এই অ্যাপের সমস্ত সিভি টেমপ্লেট ওপেন-সোর্স এবং চাকরি ও ব্যক্তিগত ব্যবহারের জন্য সম্পূর্ণ উন্মুক্ত ও ফ্রি।',
      closeBtn: 'আমি শর্তাবলী মেনে নিলাম',
    },
  },
};
