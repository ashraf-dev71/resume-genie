import { ExperienceItem, EducationItem } from '../types';

export interface BangladeshiEducationPreset {
  id: string;
  category: 'Secondary (SSC)' | 'Higher Secondary (HSC)' | 'Diploma' | 'Bachelor / Honours' | 'Masters / Postgrad' | 'Medical & Health';
  label: string;
  labelBn: string;
  data: Omit<EducationItem, 'id'>;
}

export interface BangladeshiJobPreset {
  id: string;
  category: 'Banking & Finance' | 'RMG & Textile' | 'Software & IT' | 'NGO & Development' | 'MFS & Telecom' | 'FMCG Sales & Marketing' | 'Healthcare & Pharma' | 'Teaching & Academia' | 'Govt & Administration';
  categoryBn: string;
  title: string;
  titleBn: string;
  company: string;
  companyBn: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bulletsEn: string[];
  bulletsBn: string[];
}

export const BANGLADESHI_BOARDS = [
  'Dhaka Education Board',
  'Chattogram Education Board',
  'Rajshahi Education Board',
  'Cumilla Education Board',
  'Jashore Education Board',
  'Sylhet Education Board',
  'Barishal Education Board',
  'Dinajpur Education Board',
  'Mymensingh Education Board',
  'Bangladesh Madrasah Education Board',
  'Bangladesh Technical Education Board (BTEB)',
];

export const BANGLADESHI_UNIVERSITIES = [
  // Public Universities
  'University of Dhaka (DU)',
  'Bangladesh University of Engineering and Technology (BUET)',
  'Jahangirnagar University (JU)',
  'University of Rajshahi (RU)',
  'University of Chittagong (CU)',
  'Shahjalal University of Science and Technology (SUST)',
  'Khulna University of Engineering & Technology (KUET)',
  'Rajshahi University of Engineering & Technology (RUET)',
  'Chittagong University of Engineering & Technology (CUET)',
  'Dhaka University of Engineering & Technology (DUET)',
  'Bangladesh Textile University (BUTEX)',
  'Bangladesh Agricultural University (BAU)',
  'Sher-e-Bangla Agricultural University (SAU)',
  'Bangladesh University of Professionals (BUP)',
  'Jagannath University (JnU)',
  'Khulna University (KU)',
  'Comilla University (CoU)',
  'Begum Rokeya University, Rangpur (BRUR)',
  'National University, Bangladesh (NU)',
  'Bangladesh Open University (BOU)',
  // Top Private Universities
  'North South University (NSU)',
  'BRAC University',
  'Independent University, Bangladesh (IUB)',
  'Ahsanullah University of Science and Technology (AUST)',
  'American International University-Bangladesh (AIUB)',
  'United International University (UIU)',
  'East West University (EWU)',
  'Daffodil International University (DIU)',
  'University of Liberal Arts Bangladesh (ULAB)',
  'Southeast University',
  'Green University of Bangladesh',
  // Medical Colleges
  'Dhaka Medical College (DMC)',
  'Sir Salimullah Medical College (SSMC)',
  'Shaheed Suhrawardy Medical College',
  'Chittagong Medical College (CMC)',
  'Rajshahi Medical College (RMC)',
  'Mymensingh Medical College (MMC)',
  'Bangabandhu Sheikh Mujib Medical University (BSMMU)',
];

export const BANGLADESHI_COLLEGES = [
  'Notre Dame College, Dhaka',
  'Dhaka College',
  'Holy Cross College, Dhaka',
  'Rajuk Uttara Model College',
  'Viqarunnisa Noon School and College',
  'Adamjee Cantonment College',
  'Dhaka City College',
  'Chittagong College',
  'Government Hazi Mohammad Mohsin College',
  'Rajshahi College',
  'Government Brojomohun (BM) College, Barisal',
  'Murari Chand (MC) College, Sylhet',
  'Comilla Victoria Government College',
  'Dhaka Polytechnic Institute',
  'Chittagong Polytechnic Institute',
];

export const BANGLADESHI_EDUCATION_PRESETS: BangladeshiEducationPreset[] = [
  // SSC
  {
    id: 'bd-edu-ssc-science',
    category: 'Secondary (SSC)',
    label: 'SSC - Science (বিজ্ঞান)',
    labelBn: 'এসএসসি - বিজ্ঞান বিভাগ',
    data: {
      institution: 'Rajuk Uttara Model College, Dhaka',
      degree: 'Secondary School Certificate (SSC)',
      field: 'Science (বিজ্ঞান)',
      location: 'Dhaka Education Board, Bangladesh',
      startDate: '2015',
      endDate: '2017',
      grade: 'GPA: 5.00 / 5.00 (Golden A+)',
      bullets: [
        'Achieved GPA 5.00 in all subjects including Higher Mathematics, Physics, and Chemistry.',
        'Recipient of Dhaka Education Board Talentpool Junior Scholarship.'
      ]
    }
  },
  {
    id: 'bd-edu-ssc-commerce',
    category: 'Secondary (SSC)',
    label: 'SSC - Business Studies (ব্যবসায় শিক্ষা)',
    labelBn: 'এসএসসি - ব্যবসায় শিক্ষা বিভাগ',
    data: {
      institution: 'Dhaka City College',
      degree: 'Secondary School Certificate (SSC)',
      field: 'Business Studies (ব্যবসায় শিক্ষা)',
      location: 'Dhaka Education Board, Bangladesh',
      startDate: '2015',
      endDate: '2017',
      grade: 'GPA: 5.00 / 5.00',
      bullets: [
        'Secured GPA 5.00 with distinction in Accounting, Finance & Banking, and Business Entrepreneurship.'
      ]
    }
  },
  {
    id: 'bd-edu-ssc-arts',
    category: 'Secondary (SSC)',
    label: 'SSC - Humanities (মানবিক)',
    labelBn: 'এসএসসি - মানবিক বিভাগ',
    data: {
      institution: 'Ideal School and College, Motijheel',
      degree: 'Secondary School Certificate (SSC)',
      field: 'Humanities (মানবিক)',
      location: 'Dhaka Education Board, Bangladesh',
      startDate: '2015',
      endDate: '2017',
      grade: 'GPA: 4.89 / 5.00',
      bullets: [
        'Excellence in Economics, Geography & Environment, and Civics & Citizenship.'
      ]
    }
  },
  // HSC
  {
    id: 'bd-edu-hsc-science',
    category: 'Higher Secondary (HSC)',
    label: 'HSC - Science (বিজ্ঞান - Notre Dame / Dhaka College)',
    labelBn: 'এইচএসসি - বিজ্ঞান বিভাগ (নটর ডেম / ঢাকা কলেজ)',
    data: {
      institution: 'Notre Dame College, Dhaka',
      degree: 'Higher Secondary Certificate (HSC)',
      field: 'Science (বিজ্ঞান)',
      location: 'Dhaka Education Board, Bangladesh',
      startDate: '2017',
      endDate: '2019',
      grade: 'GPA: 5.00 / 5.00 (Golden A+)',
      bullets: [
        'Achieved Golden A+ across all core science subjects.',
        'Active member of Notre Dame Science Club and represented at National Science Olympiad.'
      ]
    }
  },
  {
    id: 'bd-edu-hsc-commerce',
    category: 'Higher Secondary (HSC)',
    label: 'HSC - Business Studies (ব্যবসায় শিক্ষা)',
    labelBn: 'এইচএসসি - ব্যবসায় শিক্ষা বিভাগ',
    data: {
      institution: 'Dhaka Commerce College',
      degree: 'Higher Secondary Certificate (HSC)',
      field: 'Business Studies (ব্যবসায় শিক্ষা)',
      location: 'Dhaka Education Board, Bangladesh',
      startDate: '2017',
      endDate: '2019',
      grade: 'GPA: 5.00 / 5.00',
      bullets: [
        'Secured General Grade Board Scholarship under Dhaka Education Board.'
      ]
    }
  },
  // Diploma
  {
    id: 'bd-edu-diploma-polytechnic',
    category: 'Diploma',
    label: 'Diploma in Engineering (BTEB - পলিটেকনিক)',
    labelBn: 'ডিপ্লোমা ইন ইঞ্জিনিয়ারিং (কারিগরি শিক্ষা বোর্ড)',
    data: {
      institution: 'Dhaka Polytechnic Institute, Tejgaon',
      degree: 'Diploma in Engineering',
      field: 'Computer Technology / Civil Engineering',
      location: 'Bangladesh Technical Education Board (BTEB)',
      startDate: '2018',
      endDate: '2022',
      grade: 'CGPA: 3.82 / 4.00',
      bullets: [
        'Completed 4-year technical diploma program with extensive hands-on laboratory workshops.',
        'Industrial attachment training completed with distinction.'
      ]
    }
  },
  // Bachelor
  {
    id: 'bd-edu-buet-cse',
    category: 'Bachelor / Honours',
    label: 'B.Sc. in CSE (BUET / DUET / CUET / RUET / KUET)',
    labelBn: 'বি.এস.সি. ইন সিএসই (বুয়েট / রুয়েট / কুয়েট / চুয়েট)',
    data: {
      institution: 'Bangladesh University of Engineering and Technology (BUET)',
      degree: 'Bachelor of Science in Computer Science & Engineering (B.Sc. Engg.)',
      field: 'Computer Science and Engineering',
      location: 'Dhaka, Bangladesh',
      startDate: '2019',
      endDate: '2023',
      grade: 'CGPA: 3.84 / 4.00 (First Class)',
      bullets: [
        'Undergraduate thesis focused on Machine Learning and High-Performance Distributed Computing.',
        'Contested in ACM-ICPC Regional Dhaka Programming Contest.'
      ]
    }
  },
  {
    id: 'bd-edu-du-bba',
    category: 'Bachelor / Honours',
    label: 'BBA - Finance / Marketing (University of Dhaka - IBA / FBS)',
    labelBn: 'বিবিএ - ফাইন্যান্স / মার্কেটিং (ঢাকা বিশ্ববিদ্যালয়)',
    data: {
      institution: 'Faculty of Business Studies, University of Dhaka',
      degree: 'Bachelor of Business Administration (BBA)',
      field: 'Finance & Banking',
      location: 'Dhaka, Bangladesh',
      startDate: '2019',
      endDate: '2023',
      grade: 'CGPA: 3.78 / 4.00',
      bullets: [
        'Major in Finance with minor in Business Analytics.',
        'Champion, Inter-University Business Strategy Case Competition 2022.'
      ]
    }
  },
  {
    id: 'bd-edu-nsu-bba',
    category: 'Bachelor / Honours',
    label: 'BBA / B.Sc. (North South University / BRAC University)',
    labelBn: 'বিবিএ / বি.এস.সি. (নর্থ সাউথ / ব্র্যাক ইউনিভার্সিটি)',
    data: {
      institution: 'North South University (NSU)',
      degree: 'Bachelor of Business Administration (BBA)',
      field: 'Marketing & Supply Chain Management',
      location: 'Dhaka, Bangladesh',
      startDate: '2019',
      endDate: '2023',
      grade: 'CGPA: 3.75 / 4.00 (Cum Laude)',
      bullets: [
        'Dean’s Honor List for 5 consecutive academic semesters.',
        'Completed capstone consulting internship project on consumer FMCG brand positioning.'
      ]
    }
  },
  {
    id: 'bd-edu-butex-textile',
    category: 'Bachelor / Honours',
    label: 'B.Sc. in Textile Engineering (BUTEX)',
    labelBn: 'বি.এস.সি. ইন টেক্সটাইল ইঞ্জিনিয়ারিং (বুটেক্স)',
    data: {
      institution: 'Bangladesh University of Textiles (BUTEX)',
      degree: 'Bachelor of Science in Textile Engineering',
      field: 'Apparel Manufacturing & Wet Processing',
      location: 'Dhaka, Bangladesh',
      startDate: '2018',
      endDate: '2022',
      grade: 'CGPA: 3.72 / 4.00',
      bullets: [
        'Comprehensive specialization in Garment Manufacturing, Quality Assurance, and Fabric Structure.',
        'Conducted 3-month in-plant industrial training at Beximco Industrial Park.'
      ]
    }
  },
  {
    id: 'bd-edu-nu-honours',
    category: 'Bachelor / Honours',
    label: 'B.A. / B.S.S. / B.Sc. (Honours - National University)',
    labelBn: 'অনার্স - বি.এ / বি.এস.এস / বি.এস.সি (জাতীয় বিশ্ববিদ্যালয়)',
    data: {
      institution: 'Dhaka College (Affiliated with National University)',
      degree: 'Bachelor of Social Sciences (B.S.S. Honours)',
      field: 'Economics',
      location: 'Dhaka, Bangladesh',
      startDate: '2018',
      endDate: '2022',
      grade: 'CGPA: 3.65 / 4.00 (First Class)',
      bullets: [
        'Specialized course modules in Macroeconomics, Microeconomics, Public Finance, and Econometrics.',
        'Published undergraduate paper on Rural Credit Disbursement and Microfinance in Bangladesh.'
      ]
    }
  },
  // Medical
  {
    id: 'bd-edu-mbbs',
    category: 'Medical & Health',
    label: 'MBBS (Dhaka Medical College / CMC / SSMC)',
    labelBn: 'এমবিবিএস (ঢাকা মেডিকেল কলেজ / সিএমসি / এসএসএমসি)',
    data: {
      institution: 'Dhaka Medical College (DMC), University of Dhaka',
      degree: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
      field: 'Medicine and Surgery',
      location: 'Dhaka, Bangladesh',
      startDate: '2016',
      endDate: '2021',
      grade: 'Passed with Honors Marks in Surgery & Pharmacology',
      bullets: [
        'Completed mandatory 1-year clinical rotatory internship at Dhaka Medical College Hospital.',
        'Registered Practitioner under Bangladesh Medical & Dental Council (BMDC Reg No: A-XXXXX).'
      ]
    }
  },
  // Masters
  {
    id: 'bd-edu-mba-iba',
    category: 'Masters / Postgrad',
    label: 'MBA (Institute of Business Administration - IBA, DU)',
    labelBn: 'এমবিএ (আইবিএ, ঢাকা বিশ্ববিদ্যালয়)',
    data: {
      institution: 'Institute of Business Administration (IBA), University of Dhaka',
      degree: 'Master of Business Administration (MBA)',
      field: 'Strategic Management & Finance',
      location: 'Dhaka, Bangladesh',
      startDate: '2022',
      endDate: '2024',
      grade: 'CGPA: 3.80 / 4.00',
      bullets: [
        'Rigorous case study methodology covering corporate valuation, mergers & acquisitions, and leadership.',
        'Graduate capstone project in collaboration with multinational banking institution.'
      ]
    }
  }
];

export const BANGLADESHI_JOB_PRESETS: BangladeshiJobPreset[] = [
  // 1. Banking & Finance
  {
    id: 'bd-job-bank-mto',
    category: 'Banking & Finance',
    categoryBn: 'ব্যাংকিং ও ফাইন্যান্স',
    title: 'Senior Officer / Management Trainee Officer (MTO)',
    titleBn: 'ম্যানেজমেন্ট ট্রেইনি অফিসার (MTO) / সিনিয়র অফিসার',
    company: 'BRAC Bank PLC',
    companyBn: 'ব্র্যাক ব্যাংক পিএলসি',
    location: 'Dhaka, Bangladesh',
    startDate: 'Jan 2021',
    endDate: 'Present',
    current: true,
    bulletsEn: [
      'Appraised commercial credit proposals, analyzing audited financial statements and cash flow models for SME loan disbursements exceeding BDT 450M with 0% NPL.',
      'Managed corporate and retail customer portfolio, mobilizing BDT 180M+ in fixed and current deposits within fiscal year 2023.',
      'Ensured 100% compliance with Bangladesh Bank prudential guidelines, KYC/AML directives, and internal auditing standards.',
      'Operated core banking software (Temenos T24 / Finacle) for foreign exchange remittance, letter of credit (LC), and RTGS/BEFTN settlements.'
    ],
    bulletsBn: [
      '৪৫ কোটি টাকার অধিক এসএমই ও বাণিজ্যিক ঋণ প্রস্তাবনার আর্থিক বিবরণী ও ক্রেডিট রিস্ক বিশ্লেষণ সম্পন্ন করে শূন্য এনপিএল হার বজায় রেখেছি।',
      '২০২৩ অর্থবছরে ১৮ কোটি টাকার অধিক করপোরেট ও রিটেইল ফিক্সড ও কারেন্ট ডিপোজিট সংগ্রহ করেছি।',
      'বাংলাদেশ ব্যাংকের সকল প্রুডেনশিয়াল রেগুলেশন, কেওয়াইসি (KYC) এবং অ্যান্টি-মানি লন্ডারিং (AML) নীতিমালা শতভাগ নিশ্চিত করেছি।',
      'কোর ব্যাংকিং সফটওয়্যার (Temenos T24 / Finacle)-এর মাধ্যমে বৈদেশিক বাণিজ্য, এলসি এবং আরটিজিএস/বিইএফটিএন লেনদেন সফলভাবে পরিচালনা করেছি।'
    ]
  },
  {
    id: 'bd-job-bank-dbbl',
    category: 'Banking & Finance',
    categoryBn: 'ব্যাংকিং ও ফাইন্যান্স',
    title: 'Branch Operations Officer / Credit Analyst',
    titleBn: 'ব্রাঞ্চ অপারেশনস অফিসার / ক্রেডিট অ্যানালিস্ট',
    company: 'Dutch-Bangla Bank PLC (DBBL)',
    companyBn: 'ডাচ-বাংলা ব্যাংক পিএলসি',
    location: 'Motijheel, Dhaka, Bangladesh',
    startDate: 'Feb 2020',
    endDate: 'Dec 2023',
    current: false,
    bulletsEn: [
      'Supervised high-volume daily cash and clearing operations handling BDT 25M+ in daily footfall transactions with zero ledger discrepancy.',
      'Conducted rigorous CIB (Credit Information Bureau) reporting and security document verifications for consumer auto and home loan files.',
      'Promoted DBBL NexusPay and Agent Banking retail adoption, registering 2,400+ new verified digital accounts.'
    ],
    bulletsBn: [
      'দৈনিক আড়াই কোটি টাকার অধিক নগদ ও ক্লিয়ারিং লেনদেন তদারকি করে ক্যাশ লেজারে শতভাগ নির্ভুলতা বজায় রেখেছি।',
      'ভোক্তা ও গৃহ ঋণের ফাইলগুলোর জন্য বাংলাদেশ ব্যাংক সিআইবি রিপোর্ট ও সিকিউরিটি ডকুমেন্ট যাচাই সম্পন্ন করেছি।',
      'নেক্সাসপে এবং এজেন্ট ব্যাংকিং সেবা সম্প্রসারণ করে ২,৪০০+ নতুন গ্রাহক অনবোর্ডিং করেছি।'
    ]
  },

  // 2. RMG & Textile
  {
    id: 'bd-job-rmg-merchandiser',
    category: 'RMG & Textile',
    categoryBn: 'গার্মেন্টস ও টেক্সটাইল মার্চেন্ডাইজিং',
    title: 'Senior Apparel Merchandiser',
    titleBn: 'সিনিয়র অ্যাপারেল মার্চেন্ডাইজার',
    company: 'Beximco Apparel & Textile Park',
    companyBn: 'বেক্সিমকো অ্যাপারেল অ্যান্ড টেক্সটাইল পার্ক',
    location: 'Gazipur, Bangladesh',
    startDate: 'Mar 2021',
    endDate: 'Present',
    current: true,
    bulletsEn: [
      'Managed end-to-end merchandising lifecycle for European retail accounts (H&M, Zara, Primark) totaling $8.5M in annual FOB export volume.',
      'Prepared detailed garment consumption sheets, CM costing, and fabric/trims booking to safeguard 14% factory gross profit margin.',
      'Monitored lab dips, strike-offs, proto, and fit sample approvals through Tech Pack revisions with buyers, hitting 98.4% On-Time In-Full (OTIF) shipment.',
      'Coordinated with production planning (PPC), knitting, dyeing, and washing units to ensure strict adherence to AQL 1.5 quality standards.'
    ],
    bulletsBn: [
      'ইউরোপীয় শীর্ষ ব্র্যান্ডের (H&M, Zara, Primark) জন্য বার্ষিক ৮.৫ মিলিয়ন ডলারের রফতানি অর্ডারের মার্চেন্ডাইজিং পরিচালনা করেছি।',
      'নিখুঁত গার্মেন্টস কনজাম্পশন শিট, সিএম কস্টিং ও ফেব্রিক বুকিং প্রস্তুত করে কারখানার ১৪% গ্রস প্রফিট মার্জিন নিশ্চিত করেছি।',
      'বায়ারদের টেক প্যাক অনুযায়ী ফিট ও প্রোতো স্যাম্পল অনুমোদন তদারকি করে ৯৮.৪% অন-টাইম চালান নিশ্চিত করেছি।',
      'পিপিসি, ডাইং, ওয়াশিং ও কোয়ালিটি কন্ট্রোল বিভাগের সাথে সমন্বয় করে AQL 1.5 আন্তর্জাতিক মান নিশ্চিত করেছি।'
    ]
  },
  {
    id: 'bd-job-rmg-qa',
    category: 'RMG & Textile',
    categoryBn: 'গার্মেন্টস ও টেক্সটাইল কোয়ালিটি',
    title: 'Quality Assurance (QA) Manager',
    titleBn: 'কোয়ালিটি অ্যাসুরেন্স (QA) ম্যানেজার',
    company: 'Ha-Meem Group Ltd.',
    companyBn: 'হা-মীম গ্রুপ লিমিটেড',
    location: 'Tongi, Gazipur, Bangladesh',
    startDate: 'Aug 2019',
    endDate: 'Feb 2024',
    current: false,
    bulletsEn: [
      'Spearheaded quality assurance operations across 18 sewing and finishing lines producing 450,000 woven denim garments monthly.',
      'Reduced end-line sewing defect rate (DHU) from 4.8% to 1.9% by introducing 7-point in-line statistical audit controls.',
      'Achieved zero buyer re-inspection rejection for 24 consecutive months during third-party SGS and Bureau Veritas audits.'
    ],
    bulletsBn: [
      'প্রতি মাসে সাড়ে চার লাখ ডেনিম পোশাক প্রস্তুতকারী ১৮টি সুইং ও ফিনিশিং লাইনের কোয়ালিটি অ্যাসুরেন্স পরিচালনা করেছি।',
      '৭-পয়েন্ট ইন-লাইন পরিসংখ্যানিক নিয়ন্ত্রণের মাধ্যমে সুইং ডিফেক্ট হার (DHU) ৪.৮% থেকে ১.৯%-এ নামিয়ে এনেছি।',
      'টানা ২৪ মাস এসজিএস (SGS) ও ব্যুরো ভেরিটাস আন্তর্জাতিক অডিটে শূন্য রিজেকশন অর্জন করেছি।'
    ]
  },

  // 3. Software & IT
  {
    id: 'bd-job-swe-brainstation',
    category: 'Software & IT',
    categoryBn: 'বাংলাদেশি আইটি ও সফটওয়্যার',
    title: 'Senior Full Stack Software Engineer',
    titleBn: 'সিনিয়র ফুল স্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার',
    company: 'Brain Station 23 PLC',
    companyBn: 'ব্রেন স্টেশন ২৩ পিএলসি',
    location: 'Mohakhali DOHS, Dhaka, Bangladesh',
    startDate: 'Jan 2022',
    endDate: 'Present',
    current: true,
    bulletsEn: [
      'Architected cloud-native fintech banking web applications using React, TypeScript, Node.js, and Docker, serving over 1.5M active end users.',
      'Integrated real-time bKash, Nagad, and Bangladesh Bank NPSB/RTGS payment rails with automated ledger reconciliation.',
      'Optimized PostgreSQL query execution and Redis caching strategies, slashing database latency by 44% during peak payroll traffic.',
      'Mentored a cross-functional squad of 7 junior and mid-level software engineers through rigorous code reviews and CI/CD pipelines.'
    ],
    bulletsBn: [
      'React, TypeScript, Node.js এবং Docker ব্যবহার করে ১৫ লক্ষাধিক ব্যবহারকারীর জন্য আধুনিক ক্লাউড-নেটিভ ব্যাংকিং প্ল্যাটফর্ম তৈরি করেছি।',
      'বিকাশ, নগদ এবং বাংলাদেশ ব্যাংক NPSB/RTGS পেমেন্ট গেটওয়ে স্বয়ংক্রিয় লেজার সমন্বয়সহ সফলভাবে ইন্টিগ্রেট করেছি।',
      'পোস্টগ্রেএসকিউএল কোয়েরি ও রেডিস ক্যাশিং অপ্টিমাইজেশনের মাধ্যমে সিস্টেম লেটেন্সি ৪৪% হ্রাস করেছি।',
      '৭ জন প্রকৌশলীর দলকে ক্লিন কোড, গিট ওয়ার্কফ্লো ও সিআই/সিডি অটোমেশনের মাধ্যমে মেন্টর করেছি।'
    ]
  },
  {
    id: 'bd-job-swe-pathao',
    category: 'Software & IT',
    categoryBn: 'বাংলাদেশি আইটি ও সফটওয়্যার',
    title: 'Software Engineer - Logistics & Core Systems',
    titleBn: 'সফটওয়্যার ইঞ্জিনিয়ার - লজিস্টিকস ও প্ল্যাটফর্ম',
    company: 'Pathao Technologies Ltd.',
    companyBn: 'পাঠাও লিমিটেড',
    location: 'Dhaka, Bangladesh',
    startDate: 'Jul 2020',
    endDate: 'Dec 2021',
    current: false,
    bulletsEn: [
      'Engineered real-time dispatch matching algorithms in Go and WebSockets handling 350,000+ daily ride and parcel deliveries.',
      'Maintained 99.98% platform uptime across high-concurrency peak hours on AWS Elastic Kubernetes Service (EKS).',
      'Developed automated partner payout computation service processing BDT 45M weekly with strict zero-error financial safety.'
    ],
    bulletsBn: [
      'Go এবং ওয়েবসকেট ব্যবহার করে প্রতিদিন সাড়ে তিন লাখ রাইড ও পার্সেল ডেলিভারির রিয়েল-টাইম ডিসপ্যাচ অ্যালগরিদম তৈরি করেছি।',
      'এডব্লিউএস কুবারনেটিস (EKS) ক্লাস্টারে পিক আওয়ারে ৯৯.৯৮% প্ল্যাটফর্ম আপটাইম বজায় রেখেছি।',
      'সাপ্তাহিক সাড়ে চার কোটি টাকার স্বয়ংক্রিয় রাইডার পে-আউট ক্যালকুলেশন ইঞ্জিন তৈরি করেছি।'
    ]
  },

  // 4. NGO & Development
  {
    id: 'bd-job-ngo-brac',
    category: 'NGO & Development',
    categoryBn: 'এনজিও ও আন্তর্জাতিক উন্নয়ন সংস্থা',
    title: 'Project Coordinator - Climate & Community Resilience',
    titleBn: 'প্রজেক্ট কো-অর্ডিনেটর - জলবায়ু ও কমিউনিটি প্রকল্প',
    company: 'BRAC Bangladesh',
    companyBn: 'ব্র্যাক বাংলাদেশ',
    location: 'Dhaka & Field Offices, Bangladesh',
    startDate: 'Jan 2021',
    endDate: 'Present',
    current: true,
    bulletsEn: [
      'Directed multi-district field implementation of $1.8M donor-funded climate adaptation project across 24 coastal upazilas in southern Bangladesh.',
      'Monitored livelihood support and micro-grant distribution to 12,500+ vulnerable women-headed households, exceeding annual milestones by 18%.',
      'Authored quarterly Monitoring & Evaluation (M&E) reports, donor balance scorecards, and human-interest impact case studies for international agencies.',
      'Facilitated high-level advocacy meetings with local government officials (Deputy Commissioners, UNOs, and Union Parishad Chairmen).'
    ],
    bulletsBn: [
      'দক্ষিণাঞ্চলের ২৪টি উপকূলীয় উপজেলায় ১.৮ মিলিয়ন ডলারের জলবায়ু অভিযোজন প্রকল্পের মাঠপর্যায়ের কার্যক্রম সফলভাবে পরিচালনা করেছি।',
      '১২,৫০০+ ঝুঁকিপূর্ণ নারী-প্রধান পরিবারে ক্ষুদ্র অনুদান ও টেকসই জীবিকা সহায়তা প্রদান তদারকি করেছি।',
      'আন্তর্জাতিক দাতা সংস্থার জন্য নিয়মিত মনিটরিং ও ইভ্যালুয়েশন (M&E) রিপোর্ট ও প্রভাব কেস স্টাডি প্রস্তুত করেছি।',
      'জেলা প্রশাসন (ডিসি), উপজেলা নির্বাহী কর্মকর্তা (ইউএনও) এবং ইউনিয়ন পরিষদের সাথে সরকারি সমন্বয় সভা পরিচালনা করেছি।'
    ]
  },
  {
    id: 'bd-job-ngo-icddrb',
    category: 'NGO & Development',
    categoryBn: 'এনজিও ও আন্তর্জাতিক উন্নয়ন সংস্থা',
    title: 'Research Officer / Field Epidemiologist',
    titleBn: 'রিসার্চ অফিসার / ফিল্ড এপিডেমিওলজিস্ট',
    company: 'icddr,b (International Centre for Diarrhoeal Disease Research, Bangladesh)',
    companyBn: 'আইসিডিডিআর,বি',
    location: 'Mohakhali, Dhaka, Bangladesh',
    startDate: 'Jun 2019',
    endDate: 'Dec 2023',
    current: false,
    bulletsEn: [
      'Coordinated large-scale longitudinal public health surveillance cohort involving 45,000 rural participants across Matlab and urban Dhaka.',
      'Supervised 22 field research assistants for biological specimen collection, digital survey administration (ODK/KoboToolbox), and data cleaning.',
      'Co-authored 3 peer-reviewed epidemiological research manuscripts published in international medical journals.'
    ],
    bulletsBn: [
      'মতলব ও ঢাকায় ৪৫,০০০ জনগোষ্ঠীর উপর পরিচালিত জনস্বাস্থ্য নজরদারি গবেষণা প্রকল্পের ফিল্ড ডেটা সংগ্রহ সমন্বয় করেছি।',
      '২২ জন ফিল্ড রিসার্চ অ্যাসিস্ট্যান্টের বায়োলজিক্যাল স্যাম্পল সংগ্রহ ও কোবো টুলবক্স (KoboToolbox) জরিপ পরিচালনা তদারকি করেছি।',
      'আন্তর্জাতিক পিয়ার-রিভিউড জার্নালে প্রকাশিত ৩টি বৈজ্ঞানিক গবেষণাপত্রের সহ-লেখক হিসেবে অবদান রেখেছি।'
    ]
  },

  // 5. MFS & Telecom
  {
    id: 'bd-job-mfs-bkash',
    category: 'MFS & Telecom',
    categoryBn: 'এমএফএস ও টেলিকম',
    title: 'Key Account Manager / Commercial Operations Specialist',
    titleBn: 'কি অ্যাকাউন্ট ম্যানেজার / কমার্শিয়াল স্পেশালিস্ট',
    company: 'bKash Limited',
    companyBn: 'বিকাশ লিমিটেড',
    location: 'Dhaka, Bangladesh',
    startDate: 'Feb 2021',
    endDate: 'Present',
    current: true,
    bulletsEn: [
      'Managed strategic merchant partnerships for retail chains and enterprise billing, driving BDT 850M in monthly gross transaction value (GTV).',
      'Onboarded 420+ tier-1 enterprise merchants onto bKash dynamic QR payment gateway and automated payroll disbursement APIs.',
      'Collaborated with risk and fraud analytics squads to identify suspicious transaction velocity patterns, cutting chargeback anomalies by 30%.'
    ],
    bulletsBn: [
      'রিটেইল ও করপোরেট মার্চেন্ট অংশীদারিত্ব পরিচালনা করে মাসিক ৮৫ কোটি টাকার গ্রস ট্রানজ্যাকশন ভলিউম (GTV) অর্জন করেছি।',
      '৪২০টিরও বেশি শীর্ষ মার্চেন্টকে বিকাশ ডায়নামিক কিউআর ও স্বয়ংক্রিয় পে-রোল ডিসবার্সমেন্ট এপিআই-এ সফলভাবে যুক্ত করেছি।',
      'জালিয়াতি প্রতিরোধ ও অ্যানালিটিক্স দলের সাথে সমন্বয় করে সন্দেহজনক লেনদেন শনাক্ত ও চার্জব্যাক সমস্যা ৩০% কমিয়েছি।'
    ]
  },
  {
    id: 'bd-job-telecom-gp',
    category: 'MFS & Telecom',
    categoryBn: 'এমএফএস ও টেলিকম',
    title: 'Territory Sales Manager (TSM)',
    titleBn: 'টেরিটরি সেলস ম্যানেজার (TSM)',
    company: 'Grameenphone Ltd. (Telenor Group)',
    companyBn: 'গ্রামীণফোন লিমিটেড',
    location: 'Chittagong Metro, Bangladesh',
    startDate: 'Aug 2019',
    endDate: 'Jan 2023',
    current: false,
    bulletsEn: [
      'Supervised distributor network of 1,800+ retail recharge points across designated metropolitan cluster, achieving 104% of annual revenue target.',
      'Increased 4G SIM conversion and bundled data package penetration by 26% through structured retailer incentive campaigns.',
      'Conducted weekly audits of distribution inventory, ensuring 100% on-shelf availability of scratch cards and digital flexiload wallets.'
    ],
    bulletsBn: [
      '১,৮০০+ খুচরা রিচার্জ পয়েন্টের ডিস্ট্রিবিউটর নেটওয়ার্ক তদারকি করে বার্ষিক লক্ষ্যমাত্রার ১০৪% রাজস্ব অর্জন করেছি।',
      'রিটেইলার ইনসেনটিভ ক্যাম্পেইনের মাধ্যমে ৪জি সিম রূপান্তর এবং ডাটা প্যাকের বিক্রি ২৬% বৃদ্ধি করেছি।',
      'ডিস্ট্রিবিউশন ইনভেন্টরি নিয়মিত অডিট করে ডিজিটাল ফ্লেক্সিলোডের শতভাগ পর্যাপ্ততা নিশ্চিত করেছি।'
    ]
  },

  // 6. FMCG Sales & Marketing
  {
    id: 'bd-job-fmcg-square',
    category: 'FMCG Sales & Marketing',
    categoryBn: 'এফএমসিজি সেলস ও মার্কেটিং',
    title: 'Area Sales Manager (ASM) - Consumer Goods',
    titleBn: 'এরিয়া সেলস ম্যানেজার (ASM)',
    company: 'Square Toiletries Ltd. / Square Pharmaceuticals',
    companyBn: 'স্কয়ার টয়লেট্রিজ / স্কয়ার ফার্মাসিউটিক্যালস',
    location: 'Bogura & Rajshahi Division, Bangladesh',
    startDate: 'Jan 2020',
    endDate: 'Present',
    current: true,
    bulletsEn: [
      'Oversaw primary and secondary sales operations generating BDT 320M in annual revenue across 14 authorized dealer distribution houses.',
      'Led a high-performing sales force of 38 Territory Officers (TO) and Sales Representatives (SR), providing weekly coaching and route-to-market audits.',
      'Expanded direct retail coverage into 3,500+ rural and semi-urban grocery outlets, growing regional market share by 4.2%.'
    ],
    bulletsBn: [
      '১৪টি অনুমোদিত ডিস্ট্রিবিউটর হাউসের মাধ্যমে বছরে ৩২ কোটি টাকার প্রাইমারি ও সেকেন্ডারি সেলস পরিচালনা করেছি।',
      '৩৮ জন টেরিটরি অফিসার ও সেলস রিপ্রেজেন্টেটিভের দলকে ফিল্ড ট্রেনিং ও রুট-টু-মার্কেট অডিটের মাধ্যমে সফলভাবে নেতৃত্ব দিয়েছি।',
      '৩,৫০০+ নতুন গ্রোসারি আউটলেটে সরাসরি সেলস নেটওয়ার্ক বিস্তার করে আঞ্চলিক মার্কেট শেয়ার ৪.২% বাড়িয়েছি।'
    ]
  },

  // 7. Healthcare & Pharma
  {
    id: 'bd-job-doctor-evercare',
    category: 'Healthcare & Pharma',
    categoryBn: 'চিকিৎসক ও স্বাস্থ্যসেবা',
    title: 'Resident Medical Officer (RMO) - Internal Medicine & Emergency',
    titleBn: 'রেসিডেন্ট মেডিকেল অফিসার (RMO)',
    company: 'Evercare Hospital Dhaka (formerly Apollo)',
    companyBn: 'এভারকেয়ার হসপিটাল ঢাকা',
    location: 'Bashundhara R/A, Dhaka, Bangladesh',
    startDate: 'May 2021',
    endDate: 'Present',
    current: true,
    bulletsEn: [
      'Delivered critical care resuscitation, rapid clinical triage, and management for 30+ emergency acute patients per 12-hour shift in JCI-accredited tertiary hospital.',
      'Formulated comprehensive inpatient treatment plans under consultant guidance for internal medicine, cardiology, and ICU transition wards.',
      'Maintained meticulous electronic medical records (EMR) adhering to BMDC and international infection prevention protocols.'
    ],
    bulletsBn: [
      'জেসিআই (JCI) স্বীকৃত টারশিয়ারি হাসপাতালে ১২ ঘণ্টার শিফটে ৩০+ ইমার্জেন্সি ও ক্রিটিক্যাল রোগীর ট্রায়াজ ও চিকিৎসা প্রদান করেছি।',
      'কনসালটেন্ট চিকিৎসকদের নির্দেশনায় ইন্টারনাল মেডিসিন ও সিসিইউ রোগীদের ইনপেশেন্ট চিকিৎসা পরিকল্পনা প্রণয়ন করেছি।',
      'বিএমডিসি এবং আন্তর্জাতিক সংক্রমণ প্রতিরোধ বিধিমালা অনুসরণ করে নির্ভুল ইলেকট্রনিক মেডিকেল রেকর্ড (EMR) সংরক্ষণ করেছি।'
    ]
  },

  // 8. Teaching & Academia
  {
    id: 'bd-job-teacher-college',
    category: 'Teaching & Academia',
    categoryBn: 'শিক্ষকতা ও শিক্ষা ব্যবস্থাপনা',
    title: 'Lecturer in English / Physics / Computer Science',
    titleBn: 'প্রভাষক (ইংরেজি / পদার্থবিজ্ঞান / আইসিটি)',
    company: 'Rajuk Uttara Model College / Dhaka City College',
    companyBn: 'রাজউক উত্তরা মডেল কলেজ / ঢাকা সিটি কলেজ',
    location: 'Dhaka, Bangladesh',
    startDate: 'Sep 2020',
    endDate: 'Present',
    current: true,
    bulletsEn: [
      'Delivered interactive lectures for 450+ HSC and Degree students, utilizing multimedia pedagogical materials and practical laboratory sessions.',
      'Prepared creative question papers (CQ & MCQ) moderations aligned with national curriculum guidelines for internal and model examinations.',
      'Mentored students for National Science Fair, Debating Championships, and Olympiads, securing 3 regional championship trophies.'
    ],
    bulletsBn: [
      'এইচএসসি ও ডিগ্রি স্তরের ৪৫০+ শিক্ষার্থীকে আধুনিক মাল্টিমিডিয়া ও ব্যবহারিক ক্লাসের মাধ্যমে শিক্ষাদান করেছি।',
      'জাতীয় শিক্ষাক্রমের আলোকে অভ্যন্তরীণ ও মডেল টেস্টের সৃজনশীল ও বহুনির্বাচনী প্রশ্নপত্র প্রণয়ন করেছি।',
      'জাতীয় বিজ্ঞান মেলা ও আন্তঃকলেজ বিতর্ক প্রতিযোগিতায় ছাত্রদের প্রস্তুত করে ৩টি আঞ্চলিক চ্যাম্পিয়নশিপ ট্রফি অর্জন করেছি।'
    ]
  },

  // 9. Govt & Administration
  {
    id: 'bd-job-govt-admin',
    category: 'Govt & Administration',
    categoryBn: 'প্রশাসন ও সরকারি ব্যবস্থাপনা',
    title: 'Administrative Officer / Executive Officer',
    titleBn: 'প্রশাসনিক কর্মকর্তা / এক্সিকিউটিভ অফিসার',
    company: 'Ministry / Directorate of Government of Bangladesh',
    companyBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
    location: 'Bangladesh Secretariat, Dhaka',
    startDate: 'Jan 2019',
    endDate: 'Present',
    current: true,
    bulletsEn: [
      'Processed official government correspondence, e-Nothi digital files, and procurement proposals in strict alignment with Public Procurement Rules (PPR-2008).',
      'Coordinated citizen service delivery and Citizen Charter monitoring across subordinate field administrative offices.',
      'Drafted executive briefs, inter-ministerial meeting minutes, and annual performance agreements (APA) reports.'
    ],
    bulletsBn: [
      'পাবলিক প্রকিউরমেন্ট রুলস (PPR-2008) অনুসরণ করে সরকারি ই-নথি ও উন্নয়ন প্রকল্পের ফাইল সফলভাবে নিষ্পত্তি করেছি।',
      'মাঠপর্যায়ের নাগরিক সেবার মানোন্নয়ন ও সিটিজেন চার্টার বাস্তবায়ন তদারকি করেছি।',
      'আন্তঃমন্ত্রণালয় সমন্বয় সভার কার্যবিবরণী এবং বার্ষিক কর্মসম্পাদন চুক্তি (APA) প্রতিবেদন প্রস্তুত করেছি।'
    ]
  }
];
