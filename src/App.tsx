import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  DisclaimerModal 
} from './components/DisclaimerModal';
import { 
  ImageCropperModal 
} from './components/ImageCropperModal';
import { 
  SignatureCanvas 
} from './components/SignatureCanvas';
import { 
  CVTemplateModal 
} from './components/CVBuilder/CVTemplateModal';
import { 
  CVSuggestionsModal 
} from './components/CVBuilder/CVSuggestionsModal';
import { 
  CVEditor 
} from './components/CVBuilder/CVEditor';
import { 
  CVPreview 
} from './components/CVBuilder/CVPreview';
import { 
  IDCardEditor 
} from './components/IDCardCreator/IDCardEditor';
import { 
  IDCardPreview 
} from './components/IDCardCreator/IDCardPreview';
import { 
  SkillBadgesManager 
} from './components/SkillBadges/SkillBadgesManager';
import { 
  CertificateMaker 
} from './components/CertificateMaker/CertificateMaker';
import { 
  IDCardTemplateModal 
} from './components/IDCardCreator/IDCardTemplateModal';
import { 
  CertificateTemplateModal 
} from './components/CertificateMaker/CertificateTemplateModal';
import { 
  AppTab, 
  Language, 
  CVData, 
  CVTemplate,
  IDCardTemplate,
  CertificateTemplate,
  StudentIDData, 
  SkillBadge, 
  CertificateData, 
  RoleSuggestion 
} from './types';
import { 
  INITIAL_CV_DATA, 
  INITIAL_STUDENT_ID_DATA, 
  INITIAL_SKILL_BADGES, 
  INITIAL_CERTIFICATE_DATA 
} from './data/initialData';
import { 
  loadFromLocalStorage, 
  saveToLocalStorage, 
  triggerPrint 
} from './utils/helpers';
import { downloadElementAsPDF } from './utils/exportUtils';
import { Edit3, Eye } from 'lucide-react';

const CV_STORAGE_KEY = 'resumegenie_cv_data_v1';
const ID_STORAGE_KEY = 'resumegenie_id_data_v1';
const BADGES_STORAGE_KEY = 'resumegenie_badges_data_v1';
const CERT_STORAGE_KEY = 'resumegenie_cert_data_v1';
const LANG_STORAGE_KEY = 'resumegenie_lang_v1';
const THEME_STORAGE_KEY = 'resumegenie_dark_theme_v1';

export default function App() {
  // App state
  const [activeTab, setActiveTab] = useState<AppTab>('cv-builder');
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem(LANG_STORAGE_KEY) as Language) || 'en';
  });
  // Force Night (Dark) mode permanently
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem(THEME_STORAGE_KEY, 'true');
  }, []);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [mobileViewMode, setMobileViewMode] = useState<'editor' | 'preview'>('editor');

  // Core Data models
  const [cvData, setCvData] = useState<CVData>(() => {
    return loadFromLocalStorage<CVData>(CV_STORAGE_KEY, INITIAL_CV_DATA);
  });
  const [studentIdData, setStudentIdData] = useState<StudentIDData>(() => {
    return loadFromLocalStorage<StudentIDData>(ID_STORAGE_KEY, INITIAL_STUDENT_ID_DATA);
  });
  const [skillBadges, setSkillBadges] = useState<SkillBadge[]>(() => {
    return loadFromLocalStorage<SkillBadge[]>(BADGES_STORAGE_KEY, INITIAL_SKILL_BADGES);
  });
  const [certificateData, setCertificateData] = useState<CertificateData>(() => {
    return loadFromLocalStorage<CertificateData>(CERT_STORAGE_KEY, INITIAL_CERTIFICATE_DATA);
  });

  // Modal states
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);
  const [isIdCardTemplateModalOpen, setIsIdCardTemplateModalOpen] = useState<boolean>(false);
  const [isCertificateTemplateModalOpen, setIsCertificateTemplateModalOpen] = useState<boolean>(false);
  const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState<boolean>(false);
  const [imageCropData, setImageCropData] = useState<{
    imageSrc: string;
    onSave: (cropped: string) => void;
  } | null>(null);
  const [signatureModal, setSignatureModal] = useState<{
    onSave: (sig: string) => void;
  } | null>(null);

  // Language effect - permanently English
  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, 'en');
  }, []);

  // Auto-save effect for CV
  useEffect(() => {
    saveToLocalStorage(CV_STORAGE_KEY, cvData);
    setIsSaved(true);
  }, [cvData]);

  // Auto-save effect for ID Card
  useEffect(() => {
    saveToLocalStorage(ID_STORAGE_KEY, studentIdData);
    setIsSaved(true);
  }, [studentIdData]);

  // Auto-save effect for Badges
  useEffect(() => {
    saveToLocalStorage(BADGES_STORAGE_KEY, skillBadges);
    setIsSaved(true);
  }, [skillBadges]);

  // Auto-save effect for Certificate
  useEffect(() => {
    saveToLocalStorage(CERT_STORAGE_KEY, certificateData);
    setIsSaved(true);
  }, [certificateData]);

  const handleToggleLanguage = () => {};

  // CV Handlers
  const handleCvChange = (updated: CVData) => {
    setIsSaved(false);
    setCvData(updated);
  };

  const handleSelectTemplate = (template: CVTemplate) => {
    setCvData((prev) => ({
      ...prev,
      selectedTemplateId: template.id,
      primaryColor: template.primaryColor,
      secondaryColor: template.secondaryColor,
      fontFamily: template.fontFamily,
      showPhoto: template.hasPhoto,
    }));
  };

  const handleSelectIdCardTemplate = (template: IDCardTemplate) => {
    setIsSaved(false);
    setStudentIdData((prev) => ({
      ...prev,
      selectedTemplateId: template.id,
      layout: template.layout,
      designType: template.designType,
      primaryColor: template.primaryColor,
      secondaryColor: template.secondaryColor,
      accentColor: template.accentColor,
      headerStyle: template.headerStyle,
      bgPattern: template.bgPattern,
      borderStyle: template.borderStyle,
      badgeText: template.badgeText,
    }));
  };

  const handleSelectCertificateTemplate = (template: CertificateTemplate) => {
    setIsSaved(false);
    setCertificateData((prev) => ({
      ...prev,
      selectedTemplateId: template.id,
      layoutType: template.layoutType,
      title: template.title,
      primaryColor: template.primaryColor,
      secondaryColor: template.secondaryColor,
      accentColor: template.accentColor,
      backgroundColor: template.backgroundColor,
      borderStyle: template.borderStyle,
      sealType: template.sealType,
      fontPairing: template.fontPairing,
      description: template.description || prev.description,
    }));
  };

  const handleApplySummary = (summaryText: string) => {
    setCvData((prev) => ({
      ...prev,
      summary: summaryText,
    }));
  };

  const handleAddBulletPoint = (bulletText: string) => {
    setCvData((prev) => {
      if (prev.experiences.length === 0) return prev;
      const updated = [...prev.experiences];
      updated[0] = {
        ...updated[0],
        bullets: [...updated[0].bullets, bulletText],
      };
      return {
        ...prev,
        experiences: updated,
      };
    });
  };

  const handleAddSkills = (skillsToAdd: string[]) => {
    setCvData((prev) => {
      if (prev.skillCategories.length === 0) {
        return {
          ...prev,
          skillCategories: [
            {
              id: `sc-${Date.now()}`,
              categoryName: 'Core Competencies',
              skills: skillsToAdd,
            }
          ],
        };
      }
      const updatedCategories = [...prev.skillCategories];
      const merged = Array.from(new Set([...updatedCategories[0].skills, ...skillsToAdd]));
      updatedCategories[0] = {
        ...updatedCategories[0],
        skills: merged,
      };
      return {
        ...prev,
        skillCategories: updatedCategories,
      };
    });
  };

  // Sync Verified Badges to CV Certifications
  const handleSyncBadgesToCV = () => {
    const verifiedBadges = skillBadges.filter((b) => b.showOnCV);
    const newCerts = verifiedBadges.map((b) => ({
      id: `cert-sync-${b.id}`,
      name: b.title,
      issuer: b.provider,
      issueDate: b.issueDate,
      credentialId: b.credentialId,
      url: b.verificationUrl,
    }));

    setCvData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications.filter((c) => !c.id.startsWith('cert-sync-')),
        ...newCerts,
      ],
    }));
  };

  const handlePrintCurrent = () => {
    if (activeTab === 'cv-builder') {
      triggerPrint(`${cvData.profile.fullName || 'Resume'}_CV`, 'portrait');
    } else if (activeTab === 'id-creator') {
      triggerPrint(`${studentIdData.studentName || 'Student'}_ID_Card`, studentIdData.layout === 'vertical' ? 'portrait' : 'landscape');
    } else if (activeTab === 'certificate-maker') {
      triggerPrint(`${certificateData.recipientName || 'Certificate'}_Certificate`, 'landscape');
    } else {
      window.print();
    }
  };

  const handleDownloadCurrentPDF = async () => {
    if (activeTab === 'certificate-maker') {
      const el = document.getElementById('certificate-print-node');
      if (el) {
        await downloadElementAsPDF(el, `${certificateData.recipientName || 'Certificate'}_Certificate`, {
          orientation: 'landscape',
          format: 'a4',
          pixelRatio: 2.5,
        });
        return;
      }
    } else if (activeTab === 'id-creator') {
      const el = document.getElementById('idcard-print-stage');
      if (el) {
        await downloadElementAsPDF(el, `${studentIdData.studentName || 'Student'}_ID_Card`, {
          orientation: studentIdData.layout === 'vertical' ? 'portrait' : 'landscape',
          format: 'cr80',
          pixelRatio: 3,
        });
        return;
      }
    } else if (activeTab === 'cv-builder') {
      const el = document.getElementById('cv-document-node');
      if (el) {
        await downloadElementAsPDF(el, `${cvData.profile.fullName || 'Resume'}_CV`, {
          orientation: 'portrait',
          format: 'a4',
          pixelRatio: 2.5,
        });
        return;
      }
    }

    // Fallback to print
    handlePrintCurrent();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Top Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setMobileViewMode('editor');
        }}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setMobileViewMode('editor');
        }}
        lang={lang}
        onToggleLanguage={handleToggleLanguage}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        onExport={handleDownloadCurrentPDF}
        onDownloadPDF={handleDownloadCurrentPDF}
        onPrint={handlePrintCurrent}
        isSaved={isSaved}
      />

      {/* Main Workspace Stage */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Mobile View Toggle (Editor vs Preview) for CV and ID Maker */}
        {(activeTab === 'cv-builder' || activeTab === 'id-creator') && (
          <div className="lg:hidden no-print flex items-center justify-center p-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setMobileViewMode('editor')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md transition ${
                  mobileViewMode === 'editor'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Form Editor</span>
              </button>
              <button
                onClick={() => setMobileViewMode('preview')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md transition ${
                  mobileViewMode === 'preview'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>
            </div>
          </div>
        )}

        {/* 1. CV BUILDER TAB */}
        {activeTab === 'cv-builder' && (
          <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
            {/* Editor Column */}
            <div className={`flex-1 overflow-y-auto ${mobileViewMode === 'preview' ? 'hidden lg:block' : 'block'}`}>
              <CVEditor
                data={cvData}
                onChange={handleCvChange}
                onOpenCrop={(imgSrc) => {
                  setImageCropData({
                    imageSrc: imgSrc,
                    onSave: (cropped) => {
                      setCvData((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, photoUrl: cropped },
                      }));
                    },
                  });
                }}
                onOpenSuggestions={() => setIsSuggestionsModalOpen(true)}
                onOpenTemplates={() => setIsTemplateModalOpen(true)}
                lang={lang}
              />
            </div>

            {/* Live Preview Column */}
            <div className={`flex-1 h-full overflow-hidden ${mobileViewMode === 'editor' ? 'hidden lg:block' : 'block'}`}>
              <CVPreview
                data={cvData}
                onChange={handleCvChange}
                onOpenTemplates={() => setIsTemplateModalOpen(true)}
                lang={lang}
              />
            </div>
          </div>
        )}

        {/* 2. STUDENT ID CARD GENERATOR TAB */}
        {activeTab === 'id-creator' && (
          <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
            {/* Editor Column */}
            <div className={`flex-1 overflow-y-auto ${mobileViewMode === 'preview' ? 'hidden lg:block' : 'block'}`}>
              <IDCardEditor
                data={studentIdData}
                onChange={(updated) => {
                  setIsSaved(false);
                  setStudentIdData(updated);
                }}
                onOpenCrop={(imgSrc) => {
                  setImageCropData({
                    imageSrc: imgSrc,
                    onSave: (cropped) => {
                      setStudentIdData((prev) => ({ ...prev, studentPhotoUrl: cropped }));
                    },
                  });
                }}
                onOpenSignature={() => {
                  setSignatureModal({
                    onSave: (sig) => {
                      setStudentIdData((prev) => ({ ...prev, signatureUrl: sig }));
                    },
                  });
                }}
                onOpenTemplates={() => setIsIdCardTemplateModalOpen(true)}
                lang={lang}
              />
            </div>

            {/* Preview Column */}
            <div className={`flex-1 h-full overflow-hidden ${mobileViewMode === 'editor' ? 'hidden lg:block' : 'block'}`}>
              <IDCardPreview
                data={studentIdData}
                onOpenTemplates={() => setIsIdCardTemplateModalOpen(true)}
                lang={lang}
              />
            </div>
          </div>
        )}

        {/* 3. SKILL BADGES MANAGER TAB */}
        {activeTab === 'skill-badges' && (
          <SkillBadgesManager
            badges={skillBadges}
            onChange={(updated) => {
              setIsSaved(false);
              setSkillBadges(updated);
            }}
            onSyncWithCV={handleSyncBadgesToCV}
            lang={lang}
          />
        )}

        {/* 4. CERTIFICATE MAKER TAB */}
        {activeTab === 'certificate-maker' && (
          <CertificateMaker
            data={certificateData}
            onChange={(updated) => {
              setIsSaved(false);
              setCertificateData(updated);
            }}
            onOpenSignature={(signerKey) => {
              setSignatureModal({
                onSave: (sig) => {
                  setCertificateData((prev) => ({
                    ...prev,
                    [signerKey === 'sign1' ? 'signatory1Signature' : 'signatory2Signature']: sig,
                  }));
                },
              });
            }}
            onOpenTemplates={() => setIsCertificateTemplateModalOpen(true)}
            lang={lang}
          />
        )}

      </main>

      {/* Global Modals */}

      {/* 1. Legal Disclaimer & Privacy Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        lang={lang}
      />

      {/* 2. 112+ CV Template Library Modal */}
      <CVTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        selectedTemplateId={cvData.selectedTemplateId}
        onSelectTemplate={handleSelectTemplate}
        lang={lang}
        currentCvData={cvData}
      />

      {/* 3. 72+ ID Card Template Library Modal */}
      <IDCardTemplateModal
        isOpen={isIdCardTemplateModalOpen}
        onClose={() => setIsIdCardTemplateModalOpen(false)}
        selectedTemplateId={studentIdData.selectedTemplateId}
        onSelectTemplate={handleSelectIdCardTemplate}
        currentData={studentIdData}
        lang={lang}
      />

      {/* 4. 75+ Certificate Template Library Modal */}
      <CertificateTemplateModal
        isOpen={isCertificateTemplateModalOpen}
        onClose={() => setIsCertificateTemplateModalOpen(false)}
        selectedTemplateId={certificateData.selectedTemplateId}
        onSelectTemplate={handleSelectCertificateTemplate}
        currentData={certificateData}
        lang={lang}
      />

      {/* 5. Role-Based AI Suggestions Modal */}
      <CVSuggestionsModal
        isOpen={isSuggestionsModalOpen}
        onClose={() => setIsSuggestionsModalOpen(false)}
        onApplySummary={handleApplySummary}
        onAddBulletPoint={handleAddBulletPoint}
        onAddSkills={handleAddSkills}
        lang={lang}
      />

      {/* 6. Client-Side Image Cropper Modal */}
      {imageCropData && (
        <ImageCropperModal
          isOpen={true}
          imageSrc={imageCropData.imageSrc}
          onClose={() => setImageCropData(null)}
          onCropComplete={(croppedUrl) => {
            imageCropData.onSave(croppedUrl);
            setImageCropData(null);
          }}
          lang={lang}
        />
      )}

      {/* 7. Draw / Upload Signature Canvas Modal */}
      {signatureModal && (
        <SignatureCanvas
          isOpen={true}
          onClose={() => setSignatureModal(null)}
          onSave={(sigUrl) => {
            signatureModal.onSave(sigUrl);
            setSignatureModal(null);
          }}
          lang={lang}
        />
      )}

    </div>
  );
}
