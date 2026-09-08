export interface RoleSuggestion {
  roleId: string;
  title: string;
  category: string;
  summaries: { en: string; bn: string }[];
  bulletPoints: { en: string; bn: string }[];
  recommendedSkills: string[];
}

export const ROLE_SUGGESTIONS: RoleSuggestion[] = [
  {
    roleId: 'swe',
    title: 'Software Engineer / Fullstack Developer',
    category: 'IT & Software',
    summaries: [
      {
        en: 'Results-driven Fullstack Software Engineer with 4+ years of expertise in architecting high-throughput distributed systems, scalable microservices, and modern React/Node.js web applications. Passionate about clean code, automated CI/CD pipelines, and cloud optimization.',
        bn: '৪+ বছরের অভিজ্ঞতাসম্পন্ন দক্ষ ফুলস্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার। ডিস্ট্রিবিউটেড সিস্টেম, স্কেলেবল মাইক্রোসার্ভিস এবং আধুনিক React/Node.js ওয়েব অ্যাপ্লিকেশন তৈরিতে অভিজ্ঞ। ক্লিন কোড ও অটোমেটেড সিআই/সিডি পাইপলাইনে পারদর্শী।'
      },
      {
        en: 'Detail-oriented Frontend Engineer specializing in responsive UI architectures, TypeScript, and state management. Proven track record of optimizing Core Web Vitals and elevating user conversion rates by 28%.',
        bn: 'রেসপন্সিভ ইউআই আর্কিটেকচার, TypeScript এবং স্টেট ম্যানেজমেন্টে অভিজ্ঞ ফ্রন্টএন্ড ইঞ্জিনিয়ার। কোর ওয়েব ভাইটালস বৃদ্ধি ও রূপান্তর হার ২৮% বাড়াতে সফল।'
      }
    ],
    bulletPoints: [
      {
        en: 'Architected and deployed microservices handling 2.5M+ daily requests, improving end-to-end API response latency by 38%.',
        bn: 'প্রতিদিন ২৫ লক্ষাধিক রিকোয়েস্ট পরিচালনাকারী মাইক্রোসার্ভিস আর্কিটেকচার তৈরি করে এপিআই রেসপন্স লেটেন্সি ৩৮% উন্নত করেছি।'
      },
      {
        en: 'Engineered reusable component libraries in React and TypeScript, reducing development turnaround time across 4 squad teams by 30%.',
        bn: 'React এবং TypeScript-এ রিইউজেবল কম্পোনেন্ট লাইব্রেরি তৈরি করে ৪টি প্রকৌশল দলের ডেভেলপমেন্ট সময় ৩০% হ্রাস করেছি।'
      },
      {
        en: 'Spearheaded migration of legacy monolith to containerized Docker & Kubernetes infrastructure on AWS, slashing infrastructure overhead costs by 22%.',
        bn: 'এডব্লিউএস ক্লাউডে ডকার ও কুবারনেটিসের মাধ্যমে লিগ্যাসি মনোলিথ মাইগ্রেশন পরিচালনা করে ক্লাউড খরচ ২২% হ্রাস করেছি।'
      },
      {
        en: 'Implemented automated end-to-end test suites using Playwright and Jest, increasing code coverage to 92% and preventing regression bugs in production.',
        bn: 'Playwright এবং Jest-এর মাধ্যমে অটোমেটেড টেস্টিং নিশ্চিত করে কোড কভারেজ ৯২%-এ উন্নীত করেছি।'
      }
    ],
    recommendedSkills: ['TypeScript', 'React.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Git', 'CI/CD', 'RESTful APIs']
  },
  {
    roleId: 'pm',
    title: 'Product Manager',
    category: 'Corporate',
    summaries: [
      {
        en: 'Strategic Product Manager with a proven record of leading cross-functional squads to launch consumer-facing digital products from 0 to 1. Adept at user research, data-driven prioritization, and roadmapping to drive retention and ARR growth.',
        bn: 'ক্রস-ফাংশনাল দল পরিচালনায় অভিজ্ঞ স্ট্র্যাটেজিক প্রোডাক্ট ম্যানেজার। ব্যবহারকারী গবেষণা, ডেটা-ভিত্তিক অগ্রাধিকার এবং রোডম্যাপ তৈরির মাধ্যমে প্রোডাক্ট লঞ্চে দক্ষ।'
      }
    ],
    bulletPoints: [
      {
        en: 'Led product discovery and GTM strategy for flagship SaaS mobile app, resulting in 150K+ downloads and $1.2M ARR within 9 months.',
        bn: 'ফ্ল্যাগশিপ SaaS অ্যাপের প্রোডাক্ট ডিসকভারি ও জিটিএম পরিচালনা করে ৯ মাসে দেড় লক্ষাধিক ডাউনলোড এবং ১.২ মিলিয়ন ডলার এআরআর অর্জন করেছি।'
      },
      {
        en: 'Defined OKRs, prioritized product backlog using RICE framework, and aligned engineering, design, and marketing teams for bi-weekly releases.',
        bn: 'RICE ফ্রেমওয়ার্ক ব্যবহার করে ব্যাকলগ অগ্রাধিকার এবং ইঞ্জিনিয়ারিং, ডিজাইন ও মার্কেটিং দলের সাথে নিয়মিত রিলিজ নিশ্চিত করেছি।'
      },
      {
        en: 'Conducted 50+ qualitative customer interviews and A/B test experiments, lifting checkout funnel conversion by 19%.',
        bn: '৫০টির বেশি কাস্টমার ইন্টারভিউ ও এ/বি টেস্টিং পরিচালনা করে চেকআউট ফানেল রূপান্তর ১৯% বৃদ্ধি করেছি।'
      }
    ],
    recommendedSkills: ['Product Strategy', 'Agile & Scrum', 'User Research', 'A/B Testing', 'Roadmapping', 'Jira', 'Mixpanel', 'Figma', 'Data Analytics']
  },
  {
    roleId: 'ds',
    title: 'Data Scientist / AI Engineer',
    category: 'IT & Software',
    summaries: [
      {
        en: 'Analytical Data Scientist with strong background in predictive modeling, NLP, and machine learning pipelines. Experienced in translating raw data into actionable enterprise insights and deploying LLM applications to production.',
        bn: 'প্রেডিক্টিভ মডেলিং, এনএলপি এবং মেশিন লার্নিং পাইপলাইনে অভিজ্ঞ ডেটা সায়েন্টিস্ট। কাঁচা ডেটাকে কার্যকর ব্যবসায়িক সিদ্ধান্তে রূপান্তর ও এআই মডেল ডিপ্লয়মেন্টে দক্ষ।'
      }
    ],
    bulletPoints: [
      {
        en: 'Developed and productionized XGBoost & Random Forest churn prediction models, boosting customer retention by 14% and saving $400K annually.',
        bn: 'মেশিন লার্নিং চার্ন প্রেডিকশন মডেল তৈরি করে গ্রাহক ধরে রাখার হার ১৪% বৃদ্ধি এবং বার্ষিক ৪ লাখ ডলার সাশ্রয় নিশ্চিত করেছি।'
      },
      {
        en: 'Fine-tuned open-source LLMs using LoRA on domain-specific corpora, improving query comprehension accuracy to 94.6%.',
        bn: 'ডোমেন-নির্দিষ্ট ডেটায় এলএলএম ফাইন-টিউনিং সম্পন্ন করে কোয়েরি বোঝার নির্ভুলতা ৯৪.৬%-এ উন্নীত করেছি।'
      },
      {
        en: 'Constructed automated ETL data pipelines in Apache Airflow and Snowflake, processing 10TB+ telemetry data weekly.',
        bn: 'Apache Airflow এবং Snowflake-এ অটোমেটেড ইটিএল পাইপলাইন তৈরি করে সপ্তাহে ১০ টেরাবাইট ডেটা প্রসেসিং পরিচালনা করেছি।'
      }
    ],
    recommendedSkills: ['Python', 'PyTorch', 'TensorFlow', 'SQL', 'Scikit-Learn', 'Pandas', 'Snowflake', 'NLP', 'Docker', 'Tableau']
  },
  {
    roleId: 'uiux',
    title: 'UI/UX & Product Designer',
    category: 'Creative',
    summaries: [
      {
        en: 'Creative Product Designer with a passion for human-centered design systems, clean typography, and seamless micro-interactions. Adept at translating ambiguous problem statements into elegant, accessible multi-platform user journeys.',
        bn: 'হিউম্যান-সেন্টার্ড ডিজাইন সিস্টেম, ক্লিন টাইপোগ্রাফি এবং নিরবচ্ছিন্ন মাইক্রো-ইন্টারঅ্যাকশনে অভিজ্ঞ ক্রিয়েটিভ প্রোডাক্ট ডিজাইনার।'
      }
    ],
    bulletPoints: [
      {
        en: 'Redesigned the primary onboarding experience across iOS and Android, reducing customer drop-off by 34% within the first month.',
        bn: 'আইওএস ও অ্যান্ড্রয়েডের অনবোর্ডিং অভিজ্ঞতা রি-ডিজাইন করে প্রথম মাসেই গ্রাহক ড্রপ-অফ ৩৪% কমিয়েছি।'
      },
      {
        en: 'Built comprehensive enterprise Figma design system comprising 200+ tokens and components, unifying UX consistency across 5 distinct products.',
        bn: '২০০+ কম্পোনেন্ট সমন্বিত ফিগমা ডিজাইন সিস্টেম তৈরি করে ৫টি ভিন্ন প্রোডাক্টের ভিজ্যুয়াল সামঞ্জস্য নিশ্চিত করেছি।'
      },
      {
        en: 'Executed usability benchmarking, heuristic evaluations, and interactive prototypes to validate hypotheses with 100+ target users.',
        bn: '১০০+ ব্যবহারকারীর সাথে ইউজেবিলিটি বেঞ্চমার্কিং ও ইন্টারঅ্যাক্টিভ প্রোটোটাইপিং পরিচালনা করে ফিচার যাচাই করেছি।'
      }
    ],
    recommendedSkills: ['Figma', 'Design Systems', 'Wireframing', 'Prototyping', 'User Research', 'Design Thinking', 'WCAG Accessibility', 'Micro-interactions']
  },
  {
    roleId: 'marketing',
    title: 'Digital Marketing & Growth Manager',
    category: 'Corporate',
    summaries: [
      {
        en: 'Data-informed Growth Marketer with 5+ years of experience orchestrating omnichannel acquisition campaigns, SEO strategies, and lifecycle email automation to scale CAC and maximize LTV.',
        bn: '৫+ বছরের অভিজ্ঞতাসম্পন্ন গ্রোথ মার্কেটার। ওমনিচ্যানেল অ্যাকুইজিশন, এসইও কৌশল এবং ইমেইল অটোমেশনের মাধ্যমে গ্রাহক বৃদ্ধির সফল রেকর্ড।'
      }
    ],
    bulletPoints: [
      {
        en: 'Managed $600K annual PPC budget across Google & Meta Ads, lowering customer acquisition cost (CAC) by 27% while growing organic pipeline 3x.',
        bn: 'গুগল ও মেটা বিজ্ঞাপনে বার্ষিক ৬ লাখ ডলারের বাজেট পরিচালনা করে কাস্টমার অ্যাকুইজিশন খরচ ২৭% কমিয়েছি।'
      },
      {
        en: 'Engineered automated lifecycle email drip funnels using HubSpot, resulting in a 42% open rate and a 16% lift in month-over-month renewals.',
        bn: 'হাবস্পটের মাধ্যমে অটোমেটেড ইমেইল ফানেল তৈরি করে ৪২% ওপেন রেট এবং রিনিউয়ালে ১৬% প্রবৃদ্ধি অর্জন করেছি।'
      }
    ],
    recommendedSkills: ['Google Ads', 'Meta Ads', 'SEO Optimization', 'Google Analytics 4', 'HubSpot', 'Content Strategy', 'Copywriting', 'A/B Testing']
  },
  {
    roleId: 'acad',
    title: 'Academic Researcher / University Lecturer',
    category: 'Academic',
    summaries: [
      {
        en: 'Dedicated Academic Researcher and Educator with 6+ years of university teaching and peer-reviewed research experience. Author of 8 publications in high-impact international journals with expertise in curriculum design and research grant procurement.',
        bn: '৬+ বছরের বিশ্ববিদ্যালয় শিক্ষকতা ও গবেষণায় অভিজ্ঞ গবেষক ও শিক্ষক। আন্তর্জাতিক পিয়ার-রিভিউড জার্নালে ৮টি প্রকাশনা এবং কারিকুলাম ডিজাইনে পারদর্শী।'
      }
    ],
    bulletPoints: [
      {
        en: 'Published 4 primary-author peer-reviewed journal papers (h-index: 9) presenting novel findings in computational analysis.',
        bn: 'কম্পিউটেশনাল অ্যানালাইসিসে ৪টি মূল গবেষণাপত্র আন্তর্জাতিক জার্নালে প্রকাশ করেছি (এইচ-ইনডেক্স: ৯)।'
      },
      {
        en: 'Secured $85,000 research grant from national scientific council to spearhead a 2-year multi-institution academic inquiry.',
        bn: 'জাতীয় বিজ্ঞান পরিষদ থেকে ৮৫,০০০ ডলারের গবেষণা অনুদান সংগ্রহ করে ২ বছর মেয়াদী প্রকল্প পরিচালনা করেছি।'
      },
      {
        en: 'Instructed undergraduate and graduate lectures for 400+ students, receiving an average 4.8/5.0 student evaluation score.',
        bn: '৪০০+ স্নাতক ও স্নাতকোত্তর শিক্ষার্থীদের পাঠদান করে গড়ে ৪.৮/৫.০ মূল্যায়ন রেটিং অর্জন করেছি।'
      }
    ],
    recommendedSkills: ['Peer-Reviewed Research', 'Curriculum Design', 'Grant Writing', 'Statistical Analysis', 'LaTeX', 'Public Speaking', 'Academic Mentorship']
  },
  {
    roleId: 'bd-bank',
    title: 'Bank Management Trainee Officer (MTO) / Senior Officer',
    category: 'Banking & Finance (বাংলাদেশি ব্যাংক)',
    summaries: [
      {
        en: 'Proactive and analytically rigorous Banking Professional with expertise in credit risk assessment, SME loan appraisal, foreign exchange operations (LC/RTGS), and regulatory compliance under Bangladesh Bank prudential guidelines.',
        bn: 'ক্রেডিট রিস্ক বিশ্লেষণ, এসএমই ঋণ প্রস্তাবনা মূল্যায়ন, বৈদেশিক বাণিজ্য (LC/RTGS) এবং বাংলাদেশ ব্যাংকের প্রুডেনশিয়াল রেগুলেশন পরিপালনে অভিজ্ঞ পেশাদার ব্যাংকার।'
      }
    ],
    bulletPoints: [
      {
        en: 'Appraised and disbursed SME and commercial credit portfolios exceeding BDT 450M with 100% recovery and 0% non-performing loan (NPL) ratio.',
        bn: '৪৫ কোটি টাকার অধিক এসএমই ও করপোরেট ঋণ প্রস্তাবনা মূল্যায়ন করে শূন্য এনপিএল (NPL) হার বজায় রেখেছি।'
      },
      {
        en: 'Mobilized BDT 180M in retail and corporate term deposits through structured financial advisory and relationship banking.',
        bn: '১৮ কোটি টাকার অধিক করপোরেট ও রিটেইল ডিপোজিট সংগ্রহ করে ব্রাঞ্চের বার্ষিক আমানত লক্ষ্যমাত্রা অতিক্রম করেছি।'
      },
      {
        en: 'Executed core banking transactions on Temenos T24 and Finacle adhering strictly to AML/CFT and Bangladesh Bank guidelines.',
        bn: 'Temenos T24 এবং Finacle কোর ব্যাংকিং সফটওয়্যারের মাধ্যমে অ্যান্টি-মানি লন্ডারিং ও রেগুলেটরি নীতিমালা মেনে নির্ভুল লেনদেন পরিচালনা করেছি।'
      }
    ],
    recommendedSkills: ['Credit Risk Appraisal', 'Financial Statement Analysis', 'Temenos T24', 'Finacle', 'Bangladesh Bank Regulations', 'KYC & AML Compliance', 'Foreign Trade (LC)', 'SME Banking', 'Retail Deposit Mobilization']
  },
  {
    roleId: 'bd-rmg',
    title: 'RMG Apparel Merchandiser / QA Manager',
    category: 'RMG & Textile (গার্মেন্টস ও মার্চেন্ডাইজিং)',
    summaries: [
      {
        en: 'Result-oriented Apparel Merchandiser with 5+ years of experience managing global buyer accounts (H&M, Zara, Inditex) across knit and woven categories. Skilled in CM costing, Tech Pack execution, AQL 1.5 inspection, and achieving 98%+ on-time shipment.',
        bn: '৫+ বছরের অভিজ্ঞতাসম্পন্ন অ্যাপারেল মার্চেন্ডাইজার। নিট ও ওভেন ক্যাটাগরিতে বৈশ্বিক শীর্ষ বায়ারদের (H&M, Zara) অ্যাকাউন্ট পরিচালনা, সিএম কস্টিং, টেক প্যাক ও AQL 1.5 কোয়ালিটি নিয়ন্ত্রণের মাধ্যমে ৯৮%+ অন-টাইম চালান নিশ্চিতকরণে দক্ষ।'
      }
    ],
    bulletPoints: [
      {
        en: 'Managed end-to-end merchandising operations for European buyers generating $8.5M in annual FOB export shipments.',
        bn: 'বার্ষিক ৮.৫ মিলিয়ন ডলারের রফতানি অর্ডারের মার্চেন্ডাইজিং কার্যক্রম সফলভাবে পরিচালনা করেছি।'
      },
      {
        en: 'Prepared accurate consumption costing sheets, fabric booking, and production tracking, safeguarding 14% factory gross profit margin.',
        bn: 'নিখুঁত গার্মেন্টস কনজাম্পশন শিট, সিএম কস্টিং ও ফেব্রিক বুকিং প্রস্তুত করে কারখানার ১৪% গ্রস মার্জিন নিশ্চিত করেছি।'
      },
      {
        en: 'Supervised sample submissions (proto, fit, size set) and in-line inspections, hitting a 98.6% On-Time In-Full (OTIF) delivery rate.',
        bn: 'বায়ারের টেক প্যাক অনুযায়ী ফিট ও সাইজ সেট স্যাম্পল অনুমোদন এবং ইন-লাইন অডিট পরিচালনা করে ৯৮.৬% অন-টাইম ডেলিভারি নিশ্চিত করেছি।'
      }
    ],
    recommendedSkills: ['Garment Costing & Consumption', 'Tech Pack Analysis', 'Buyer Communication (H&M, Zara)', 'AQL 1.5 Inspection', 'Fabric & Trims Sourcing', 'Time & Action (T&A) Calendar', 'PPC & Production Monitoring', 'ERP Software']
  },
  {
    roleId: 'bd-ngo',
    title: 'NGO Project Coordinator / M&E Officer',
    category: 'Development & NGO (এনজিও - BRAC / ICDDR,B)',
    summaries: [
      {
        en: 'Development practitioner with extensive field experience coordinating donor-funded livelihood, climate adaptation, and public health projects in Bangladesh (BRAC, ICDDR,B, UNDP). Expert in qualitative/quantitative research, M&E framework design, and local government liaisons.',
        bn: 'বাংলাদেশে দাতা সংস্থা-অর্থায়িত জলবায়ু অভিযোজন, দারিদ্র্য বিমোচন ও জনস্বাস্থ্য প্রকল্প পরিচালনায় অভিজ্ঞ উন্নয়নকর্মী (BRAC, ICDDR,B)। মনিটরিং ও ইভ্যালুয়েশন (M&E) ফ্রেমওয়ার্ক ও মাঠপর্যায়ের সমন্বয়ে পারদর্শী।'
      }
    ],
    bulletPoints: [
      {
        en: 'Coordinated multi-district field operations of $1.8M donor project benefiting 12,000+ vulnerable rural households.',
        bn: '১২,০০০+ সুবিধাবঞ্চিত পরিবারের জন্য ১.৮ মিলিয়ন ডলারের সামাজিক উন্নয়ন প্রকল্পের মাঠপর্যায়ের কার্যক্রম সমন্বয় করেছি।'
      },
      {
        en: 'Designed and deployed digital baseline/endline data collection frameworks using KoboToolbox and ODK, training 20+ field enumerators.',
        bn: 'কোবো টুলবক্স (KoboToolbox) ও ওডিকে (ODK) ব্যবহার করে ডিজিটাল ফিল্ড জরিপ ও ডেটা কালেকশন ফ্রেমওয়ার্ক প্রণয়ন করেছি।'
      },
      {
        en: 'Drafted comprehensive donor compliance reports, balance scorecards, and human-interest case studies for international agencies.',
        bn: 'আন্তর্জাতিক দাতা সংস্থার জন্য নিয়মিত প্রজেক্ট অডিট রিপোর্ট, মনিটরিং স্কোরকার্ড ও ইমপ্যাক্ট কেস স্টাডি প্রস্তুত করেছি।'
      }
    ],
    recommendedSkills: ['Monitoring & Evaluation (M&E)', 'Project Management', 'KoboToolbox / ODK', 'Donor Reporting', 'Stakeholder Management', 'Community Mobilization', 'Field Survey Administration', 'SPSS / Stata']
  },
  {
    roleId: 'bd-mfs',
    title: 'MFS & Telecom Operations Specialist',
    category: 'FinTech & Telecom (বিকাশ / নগদ / জিপি)',
    summaries: [
      {
        en: 'Dynamic FinTech Operations Specialist with proven track record in agent banking, dynamic QR merchant onboarding, and daily transaction reconciliation across Bangladeshi digital payment rails (bKash, Nagad, NPSB).',
        bn: 'বাংলাদেশি ডিজিটাল পেমেন্ট নেটওয়ার্কে (বিকাশ, নগদ, এনপিএসবি) এজেন্ট নেটওয়ার্ক সম্প্রসারণ, ডায়নামিক কিউআর মার্চেন্ট অনবোর্ডিং এবং দৈনিক লেনদেন রিকনসিলিয়েশনে অভিজ্ঞ ফিনটেক বিশেষজ্ঞ।'
      }
    ],
    bulletPoints: [
      {
        en: 'Spearheaded merchant acquisition driving BDT 850M monthly Gross Transaction Value (GTV) across 420+ top retail enterprise outlets.',
        bn: '৪২০টির বেশি শীর্ষ রিটেইল মার্চেন্ট যুক্ত করে মাসিক ৮৫ কোটি টাকার গ্রস ট্রানজ্যাকশন ভলিউম (GTV) অর্জন করেছি।'
      },
      {
        en: 'Optimized automated payment API integration pipelines and webhook alerts, slashing merchant support ticket volume by 32%.',
        bn: 'পেমেন্ট গেটওয়ে এপিআই ইন্টিগ্রেশন সহজতর করে মার্চেন্ট সাপোর্ট টিকিটের সংখ্যা ৩২% হ্রাস করেছি।'
      },
      {
        en: 'Conducted merchant transaction velocity analysis to safeguard against fraud, reducing anomalous chargebacks to under 0.02%.',
        bn: 'সন্দেহজনক লেনদেনের প্যাটার্ন শনাক্ত করে জালিয়াতি প্রতিরোধ এবং অস্বাভাবিক চার্জব্যাক ০.০২% এর নিচে নামিয়ে এনেছি।'
      }
    ],
    recommendedSkills: ['Mobile Financial Services (MFS)', 'bKash / Nagad Payment Rails', 'Merchant Acquisition', 'Transaction Reconciliation', 'Agent Banking', 'FinTech APIs', 'KYC Verification', 'Fraud Risk Management']
  },
  {
    roleId: 'bd-fmcg',
    title: 'FMCG Area Sales Manager / Territory Officer',
    category: 'Sales & FMCG (স্কয়ার / ইউনিলিভার / প্রাণ)',
    summaries: [
      {
        en: 'Target-driven FMCG Sales Leader with solid experience driving primary and secondary distribution growth across urban and rural Bangladeshi retail markets (Square, Unilever, PRAN-RFL). Skilled in distributor management, team coaching, and market share expansion.',
        bn: 'বাংলাদেশে নগর ও গ্রামীণ রিটেইল বাজারে (স্কয়ার, ইউনিলিভার, প্রাণ-আরএফএল) প্রাইমারি ও সেকেন্ডারি সেলস বৃদ্ধি, ডিস্ট্রিবিউটর পরিচালনা এবং মার্কেট শেয়ার সম্প্রসারণে অভিজ্ঞ লক্ষ্যভিত্তিক সেলস লিডার।'
      }
    ],
    bulletPoints: [
      {
        en: 'Delivered BDT 320M in annual sales turnover across 14 authorized distributors, surpassing assigned regional revenue targets by 108%.',
        bn: '১৪টি অনুমোদিত ডিস্ট্রিবিউটর হাউসের মাধ্যমে বছরে ৩২ কোটি টাকার সেলস পরিচালনা করে নির্ধারিত বার্ষিক লক্ষ্যমাত্রার ১০৮% অর্জন করেছি।'
      },
      {
        en: 'Expanded direct retail coverage to 3,500+ grocery and departmental outlets, achieving 94% on-shelf availability of hero SKUs.',
        bn: '৩,৫০০+ নতুন রিটেইল আউটলেটে সরাসরি সেলস নেটওয়ার্ক বিস্তার করে পণ্যের পর্যাপ্ত উপস্থিতি ৯৪%-এ উন্নীত করেছি।'
      },
      {
        en: 'Led and mentored a 35-member sales force of Territory Officers and Sales Representatives, optimizing route-to-market planning.',
        bn: '৩৫ সদস্যের টেরিটরি অফিসার ও সেলস দলের কর্মদক্ষতা বৃদ্ধি এবং ফিল্ড রুট প্ল্যানিং অপ্টিমাইজ করেছি।'
      }
    ],
    recommendedSkills: ['Primary & Secondary Sales', 'Distributor Management', 'Route-to-Market (RTM)', 'Retail Coverage Expansion', 'FMCG Distribution', 'Sales Force Automation (SFA)', 'Trade Marketing & Promotions']
  },
  {
    roleId: 'bd-doctor',
    title: 'Medical Officer / Resident Physician',
    category: 'Healthcare & Medical (চিকিৎসক ও স্বাস্থ্যসেবা)',
    summaries: [
      {
        en: 'Compassionate BMDC-registered Medical Practitioner with 4+ years of clinical experience delivering emergency triage, inpatient ward management, and post-operative critical care in prominent Bangladeshi tertiary hospitals (Evercare, Square, DMC).',
        bn: 'বিএমডিসি নিবন্ধিত অভিজ্ঞ চিকিৎসক। এভারকেয়ার, স্কয়ার ও ঢাকা মেডিকেল কলেজ হাসপাতালে জরুরি বিভাগ, ইনপেশেন্ট ওয়ার্ড এবং পোস্ট-অপারেটিভ ক্রিটিক্যাল কেয়ার ব্যবস্থাপনায় ৪+ বছরের অভিজ্ঞতা।'
      }
    ],
    bulletPoints: [
      {
        en: 'Provided prompt emergency triage and acute resuscitation for 30+ patients per 12-hour shift in high-volume emergency trauma center.',
        bn: 'জরুরি বিভাগে ১২ ঘণ্টার শিফটে ৩০+ রোগীর তাত্ক্ষণিক ট্রায়াজ, লাইফ সাপোর্ট ও চিকিৎসা সেবা প্রদান করেছি।'
      },
      {
        en: 'Formulated tailored diagnostic workups and medication regimens in cardiology and internal medicine wards under consultant supervision.',
        bn: 'সিনিয়র কনসালটেন্ট চিকিৎসকের নির্দেশনায় মেডিসিন ও কার্ডিওলজি ওয়ার্ডের রোগীদের জন্য যথাযথ টেস্ট ও প্রেসক্রিপশন প্রণয়ন করেছি।'
      },
      {
        en: 'Strictly adhered to BMDC clinical protocols, electronic health record (EHR) documentation, and hospital infection prevention standards.',
        bn: 'বিএমডিসি চিকিৎসা বিধিমালা, ইএইচআর রেকর্ড সংরক্ষণ এবং হাসপাতালের ইনফেকশন কন্ট্রোল প্রোটোকল কঠোরভাবে পরিপালন করেছি।'
      }
    ],
    recommendedSkills: ['Emergency Resuscitation & Triage', 'Internal Medicine', 'Inpatient Ward Management', 'BMDC Clinical Protocols', 'BLS / ACLS Certified', 'Electronic Medical Records (EMR)', 'Patient Communication']
  },
  {
    roleId: 'bd-teacher',
    title: 'School / College Lecturer & Educator',
    category: 'Education & Teaching (শিক্ষকতা ও শিক্ষা ব্যবস্থাপনা)',
    summaries: [
      {
        en: 'Dedicated Educator with 5+ years of experience delivering curriculum-aligned classroom instruction in top Bangladeshi schools and colleges. Skilled in creative question paper setting (CQ/MCQ), digital multimedia teaching, and student mentoring.',
        bn: 'বাংলাদেশের স্বনামধন্য শিক্ষা প্রতিষ্ঠানে জাতীয় শিক্ষাক্রম অনুসারে ৫+ বছর ধরে পাঠদানে অভিজ্ঞ শিক্ষক। সৃজনশীল ও বহুনির্বাচনী প্রশ্নপত্র প্রণয়ন, ডিজিটাল মাল্টিমিডিয়া ক্লাস ও শিক্ষার্থীদের মেন্টরিংয়ে দক্ষ।'
      }
    ],
    bulletPoints: [
      {
        en: 'Conducted interactive classes for 450+ HSC and SSC students, maintaining an average 98.5% board examination pass rate.',
        bn: '৪৫০+ এসএসসি ও এইচএসসি শিক্ষার্থীকে নিয়মিত পাঠদান করিয়ে বোর্ড পরীক্ষায় ৯৮.৫% পাসের হার নিশ্চিত করেছি।'
      },
      {
        en: 'Moderated creative question papers (CQ & MCQ) strictly aligned with National Curriculum and Textbook Board (NCTB) standards.',
        bn: 'এনসিটিবি (NCTB) নির্দেশিকা অনুসারে অভ্যন্তরীণ ও মডেল পরীক্ষার সৃজনশীল প্রশ্নপত্র প্রস্তুত করেছি।'
      },
      {
        en: 'Mentored college science and debating clubs, leading student delegations to win 3 national inter-college championships.',
        bn: 'বিজ্ঞান ও বিতর্ক ক্লাবের মেন্টরিং করে জাতীয় পর্যায়ে ৩টি আন্তঃকলেজ চ্যাম্পিয়নশিপ ট্রফি অর্জনে ভূমিকা রেখেছি।'
      }
    ],
    recommendedSkills: ['Classroom Pedagogical Instruction', 'NCTB Curriculum Alignment', 'Creative Question (CQ) Setting', 'Multimedia Teaching', 'Student Counseling', 'Science Club Mentorship', 'Board Exam Preparation']
  }
];
