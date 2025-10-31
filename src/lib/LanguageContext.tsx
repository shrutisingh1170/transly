import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ne' | 'si';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('transly-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('transly-language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translation dictionaries
const translations: Record<Language, any> = {
  en: {
    nav: {
      features: 'Features',
      tools: 'Demo Tools',
      dashboards: 'Dashboards',
      pricing: 'Pricing',
      contact: 'Contact',
      getStarted: 'Get Started',
      login: 'Login'
    },
    hero: {
      title1: 'AI-Powered',
      title2: 'Multilingual Translation',
      subtitle: 'Break language barriers with advanced AI/ML technology. Translate between Nepali, Sinhalese, and English instantly with offline capabilities.',
      cta: 'Start Translating',
      learnMore: 'Learn More',
      offlineCapable: 'Offline Capable',
      aiPowered: 'AI-Powered',
      accurateTranslation: 'Accurate Translation'
    },
    features: {
      title: 'Powerful Features',
      subtitle: 'Everything you need for seamless translation and learning',
      realtime: {
        title: 'Real-time Translation',
        description: 'Instant translation between Nepali, Sinhalese, and English with AI accuracy'
      },
      voice: {
        title: 'Voice Assistant',
        description: 'Speak naturally and get instant voice translations with STT/TTS'
      },
      document: {
        title: 'Document OCR',
        description: 'Upload documents and extract text with advanced OCR technology'
      },
      chatbot: {
        title: 'AI Chatbot Tutor',
        description: 'Interactive AI tutor for personalized language learning'
      },
      gamified: {
        title: 'Gamified Learning',
        description: 'Fun quizzes and challenges with leaderboards and rewards'
      },
      offline: {
        title: 'Offline Mode',
        description: 'Work without internet using preloaded AI/ML models'
      }
    },
    stats: {
      users: 'Active Users',
      translations: 'Translations',
      languages: 'Languages',
      accuracy: 'Accuracy'
    },
    tools: {
      title: 'Interactive Demo Tools',
      subtitle: 'Try our 20+ powerful translation and learning tools',
      textTranslation: 'Text Translation',
      voiceTranslation: 'Voice Translation',
      documentOcr: 'Document OCR',
      chatbotTutor: 'Chatbot Tutor',
      gamifiedQuizzes: 'Gamified Quizzes',
      leaderboard: 'Leaderboard',
      offlineMode: 'Offline Mode',
      communityPlatform: 'Community Platform'
    },
    dashboards: {
      title: 'Role-Based Dashboards',
      subtitle: 'Comprehensive analytics and management for every user type',
      analytics: {
        title: 'Analytics Dashboard',
        description: 'Track usage, performance metrics, and user engagement'
      },
      educator: {
        title: 'Educator Dashboard',
        description: 'Manage students, assignments, and track learning progress'
      },
      researcher: {
        title: 'Researcher Dashboard',
        description: 'Access ML model insights and federated learning data'
      },
      reports: {
        title: 'Reports Dashboard',
        description: 'Generate detailed reports with export functionality'
      }
    },
    pricing: {
      title: 'Choose Your Plan',
      subtitle: 'Flexible pricing for individuals, educators, and organizations',
      free: {
        title: 'Free',
        price: '0',
        description: 'Perfect for getting started',
        features: [
          'Basic text translation',
          '100 translations/month',
          'Voice translation',
          'Community support'
        ]
      },
      pro: {
        title: 'Pro',
        price: '9.99',
        description: 'For power users',
        features: [
          'Unlimited translations',
          'Document OCR',
          'AI chatbot tutor',
          'Priority support',
          'Offline mode',
          'Advanced analytics'
        ]
      },
      enterprise: {
        title: 'Enterprise',
        price: 'Custom',
        description: 'For organizations',
        features: [
          'Everything in Pro',
          'Custom AI models',
          'API access',
          'Dedicated support',
          'White-label option',
          'Advanced security'
        ]
      },
      choosePlan: 'Choose Plan',
      month: 'month'
    },
    testimonials: {
      title: 'What Our Users Say',
      subtitle: 'Join thousands of satisfied users worldwide'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Have questions? We\'d love to hear from you',
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      send: 'Send Message',
      address: 'Kathmandu, Nepal',
      phone: '+977 1234567890',
      emailLabel: 'support@transly.ai'
    },
    footer: {
      description: 'Breaking language barriers with AI-powered translation technology',
      product: 'Product',
      company: 'Company',
      support: 'Support',
      legal: 'Legal',
      rights: 'All rights reserved'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      viewAll: 'View All',
      seeMore: 'See More',
      tryNow: 'Try Now'
    }
  },
  ne: {
    nav: {
      features: 'विशेषताहरू',
      tools: 'डेमो उपकरणहरू',
      dashboards: 'ड्यासबोर्डहरू',
      pricing: 'मूल्य निर्धारण',
      contact: 'सम्पर्क',
      getStarted: 'सुरु गर्नुहोस्',
      login: 'लगइन'
    },
    hero: {
      title1: 'एआई-संचालित',
      title2: 'बहुभाषिक अनुवाद',
      subtitle: 'उन्नत AI/ML प्रविधिको साथ भाषा बाधाहरू तोड्नुहोस्। नेपाली, सिंहली र अंग्रेजी बीच तुरुन्तै अफलाइन क्षमताको साथ अनुवाद गर्नुहोस्।',
      cta: 'अनुवाद सुरु गर्नुहोस्',
      learnMore: 'थप जान्नुहोस्',
      offlineCapable: 'अफलाइन क्षमता',
      aiPowered: 'AI-संचालित',
      accurateTranslation: 'सही अनुवाद'
    },
    features: {
      title: 'शक्तिशाली विशेषताहरू',
      subtitle: 'निर्बाध अनुवाद र सिकाइको लागि तपाईंलाई आवश्यक सबै कुरा',
      realtime: {
        title: 'वास्तविक-समय अनुवाद',
        description: 'AI सटीकताको साथ नेपाली, सिंहली र अंग्रेजी बीच तुरुन्त अनुवाद'
      },
      voice: {
        title: 'आवाज सहायक',
        description: 'स्वाभाविक रूपमा बोल्नुहोस् र STT/TTS को साथ तुरुन्त आवाज अनुवाद प्राप्त गर्नुहोस्'
      },
      document: {
        title: 'कागजात OCR',
        description: 'कागजातहरू अपलोड गर्नुहोस् र उन्नत OCR प्रविधिको साथ पाठ निकाल्नुहोस्'
      },
      chatbot: {
        title: 'AI च्याटबट शिक्षक',
        description: 'व्यक्तिगत भाषा सिकाइको लागि अन्तरक्रियात्मक AI शिक्षक'
      },
      gamified: {
        title: 'गेमिफाइड सिकाइ',
        description: 'लिडरबोर्ड र पुरस्कारको साथ रमाइलो क्विजहरू र चुनौतीहरू'
      },
      offline: {
        title: 'अफलाइन मोड',
        description: 'पूर्व-लोड गरिएको AI/ML मोडेलहरू प्रयोग गरेर इन्टरनेट बिना काम गर्नुहोस्'
      }
    },
    stats: {
      users: 'सक्रिय प्रयोगकर्ताहरू',
      translations: 'अनुवादहरू',
      languages: 'भाषाहरू',
      accuracy: 'सटीकता'
    },
    tools: {
      title: 'अन्तरक्रियात्मक डेमो उपकरणहरू',
      subtitle: 'हाम्रा २०+ शक्तिशाली अनुवाद र सिकाइ उपकरणहरू प्रयास गर्नुहोस्',
      textTranslation: 'पाठ अनुवाद',
      voiceTranslation: 'आवाज अनुवाद',
      documentOcr: 'कागजात OCR',
      chatbotTutor: 'च्याटबट शिक्षक',
      gamifiedQuizzes: 'गेमिफाइड क्विजहरू',
      leaderboard: 'लिडरबोर्ड',
      offlineMode: 'अफलाइन मोड',
      communityPlatform: 'समुदाय प्लेटफर्म'
    },
    dashboards: {
      title: 'भूमिका-आधारित ड्यासबोर्डहरू',
      subtitle: 'प्रत्येक प्रयोगकर्ता प्रकारको लागि व्यापक विश्लेषण र व्यवस्थापन',
      analytics: {
        title: 'विश्लेषण ड्यासबोर्ड',
        description: 'प्रयोग, प्रदर्शन मेट्रिक्स र प्रयोगकर्ता संलग्नता ट्र्याक गर्नुहोस्'
      },
      educator: {
        title: 'शिक्षक ड्यासबोर्ड',
        description: 'विद्यार्थीहरू, असाइनमेन्टहरू व्यवस्थापन गर्नुहोस् र सिकाइ प्रगति ट्र्याक गर्नुहोस्'
      },
      researcher: {
        title: 'अनुसन्धानकर्ता ड्यासबोर्ड',
        description: 'ML मोडेल अन्तर्दृष्टि र संघीय सिकाइ डेटा पहुँच गर्नुहोस्'
      },
      reports: {
        title: 'रिपोर्ट ड्यासबोर्ड',
        description: 'निर्यात कार्यक्षमताको साथ विस्तृत रिपोर्टहरू उत्पन्न गर्नुहोस्'
      }
    },
    pricing: {
      title: 'आफ्नो योजना छन्नुहोस्',
      subtitle: 'व्यक्तिहरू, शिक्षकहरू र संगठनहरूको लागि लचिलो मूल्य निर्धारण',
      free: {
        title: 'नि:शुल्क',
        price: '०',
        description: 'सुरु गर्नको लागि उत्तम',
        features: [
          'आधारभूत पाठ अनुवाद',
          '१०० अनुवादहरू/महिना',
          'आवाज अनुवाद',
          'समुदाय समर्थन'
        ]
      },
      pro: {
        title: 'प्रो',
        price: '९.९९',
        description: 'शक्ति प्रयोगकर्ताहरूको लागि',
        features: [
          'असीमित अनुवादहरू',
          'कागजात OCR',
          'AI च्याटबट शिक्षक',
          'प्राथमिकता समर्थन',
          'अफलाइन मोड',
          'उन्नत विश्लेषण'
        ]
      },
      enterprise: {
        title: 'इन्टरप्राइज',
        price: 'अनुकूलित',
        description: 'संगठनहरूको लागि',
        features: [
          'प्रो मा सबै कुरा',
          'अनुकूलित AI मोडेलहरू',
          'API पहुँच',
          'समर्पित समर्थन',
          'सेतो-लेबल विकल्प',
          'उन्नत सुरक्षा'
        ]
      },
      choosePlan: 'योजना छन्नुहोस्',
      month: 'महिना'
    },
    testimonials: {
      title: 'हाम्रा प्रयोगकर्ताहरूले के भन्छन्',
      subtitle: 'विश्वभरका हजारौं सन्तुष्ट प्रयोगकर्ताहरूसँग सामेल हुनुहोस्'
    },
    contact: {
      title: 'सम्पर्कमा रहनुहोस्',
      subtitle: 'प्रश्नहरू छन्? हामी तपाईंबाट सुन्न चाहन्छौं',
      name: 'तपाईंको नाम',
      email: 'तपाईंको इमेल',
      message: 'तपाईंको सन्देश',
      send: 'सन्देश पठाउनुहोस्',
      address: 'काठमाडौं, नेपाल',
      phone: '+९७७ १२३४५६७८९०',
      emailLabel: 'support@transly.ai'
    },
    footer: {
      description: 'AI-संचालित अनुवाद प्रविधिको साथ भाषा बाधाहरू तोड्दै',
      product: 'उत्पादन',
      company: 'कम्पनी',
      support: 'समर्थन',
      legal: 'कानूनी',
      rights: 'सबै अधिकार सुरक्षित'
    },
    common: {
      loading: 'लोड हुँदैछ...',
      error: 'त्रुटि',
      success: 'सफलता',
      cancel: 'रद्द गर्नुहोस्',
      save: 'बचत गर्नुहोस्',
      delete: 'मेटाउनुहोस्',
      edit: 'सम्पादन गर्नुहोस्',
      close: 'बन्द गर्नुहोस्',
      back: 'फिर्ता',
      next: 'अर्को',
      previous: 'अघिल्लो',
      search: 'खोज्नुहोस्',
      filter: 'फिल्टर',
      sort: 'क्रमबद्ध गर्नुहोस्',
      viewAll: 'सबै हेर्नुहोस्',
      seeMore: 'थप हेर्नुहोस्',
      tryNow: 'अहिले प्रयास गर्नुहोस्'
    }
  },
  si: {
    nav: {
      features: 'විශේෂාංග',
      tools: 'ආදර්ශ මෙවලම්',
      dashboards: 'උපකරණ පුවරු',
      pricing: 'මිල ගණන්',
      contact: 'සම්බන්ධ වන්න',
      getStarted: 'ආරම්භ කරන්න',
      login: 'පිවිසෙන්න'
    },
    hero: {
      title1: 'AI-බලගැන්වූ',
      title2: 'බහුභාෂා පරිවර්තනය',
      subtitle: 'උසස් AI/ML තාක්ෂණය සමඟ භාෂා බාධා බිඳ දමන්න. නේපාල, සිංහල සහ ඉංග්‍රීසි අතර ක්ෂණිකව නොබැඳි හැකියාවන් සමඟ පරිවර්තනය කරන්න.',
      cta: 'පරිවර්තනය ආරම්භ කරන්න',
      learnMore: 'තව දැනගන්න',
      offlineCapable: 'නොබැඳි හැකියාව',
      aiPowered: 'AI-බලගැන්වූ',
      accurateTranslation: 'නිවැරදි පරිවර්තනය'
    },
    features: {
      title: 'ප්‍රබල විශේෂාංග',
      subtitle: 'බාධාවකින් තොර පරිවර්තනය සහ ඉගෙනීම සඳහා ඔබට අවශ්‍ය සියල්ල',
      realtime: {
        title: 'තත්‍ය කාලීන පරිවර්තනය',
        description: 'AI නිවැරදිකම සමඟ නේපාල, සිංහල සහ ඉංග්‍රීසි අතර ක්ෂණික පරිවර්තනය'
      },
      voice: {
        title: 'හඬ සහායක',
        description: 'ස්වභාවිකව කථා කරන්න සහ STT/TTS සමඟ ක්ෂණික හඬ පරිවර්තන ලබා ගන්න'
      },
      document: {
        title: 'ලේඛන OCR',
        description: 'ලේඛන උඩුගත කර උසස් OCR තාක්ෂණය සමඟ පෙළ නිස්සාරණය කරන්න'
      },
      chatbot: {
        title: 'AI චැට්බොට් ගුරු',
        description: 'පුද්ගලික භාෂා ඉගෙනීම සඳහා අන්තර්ක්‍රියාකාරී AI ගුරු'
      },
      gamified: {
        title: 'ක්‍රීඩාකරණය කළ ඉගෙනීම',
        description: 'ලීඩර්බෝඩ් සහ ත්‍යාග සමඟ විනෝදජනක ප්‍රශ්නාවලි සහ අභියෝග'
      },
      offline: {
        title: 'නොබැඳි මාදිලිය',
        description: 'පූර්ව-පූරණය කළ AI/ML ආකෘති භාවිතා කරමින් අන්තර්ජාලය නොමැතිව වැඩ කරන්න'
      }
    },
    stats: {
      users: 'ක්‍රියාකාරී පරිශීලකයින්',
      translations: 'පරිවර්තන',
      languages: 'භාෂා',
      accuracy: 'නිවැරදිකම'
    },
    tools: {
      title: 'අන්තර්ක්‍රියාකාරී ආදර්ශ මෙවලම්',
      subtitle: 'අපගේ 20+ ප්‍රබල පරිවර්තන සහ ඉගෙනුම් මෙවලම් උත්සාහ කරන්න',
      textTranslation: 'පෙළ පරිවර්තනය',
      voiceTranslation: 'හඬ පරිවර්තනය',
      documentOcr: 'ලේඛන OCR',
      chatbotTutor: 'චැට්බොට් ගුරු',
      gamifiedQuizzes: 'ක්‍රීඩාකරණය කළ ප්‍රශ්නාවලි',
      leaderboard: 'ලීඩර්බෝඩ්',
      offlineMode: 'නොබැඳි මාදිලිය',
      communityPlatform: 'ප්‍රජා වේදිකාව'
    },
    dashboards: {
      title: 'භූමිකාව-පාදක උපකරණ පුවරු',
      subtitle: 'සෑම පරිශීලක වර්ගයක් සඳහාම සවිස්තරාත්මක විශ්ලේෂණ සහ කළමනාකරණය',
      analytics: {
        title: 'විශ්ලේෂණ උපකරණ පුවරුව',
        description: 'භාවිතය, ක්‍රියාකාරිත්ව මිනුම් සහ පරිශීලක නිරතභාවය නිරීක්ෂණය කරන්න'
      },
      educator: {
        title: 'අධ්‍යාපනික උපකරණ පුවරුව',
        description: 'සිසුන්, පැවරුම් කළමනාකරණය කර ඉගෙනුම් ප්‍රගතිය නිරීක්ෂණය කරන්න'
      },
      researcher: {
        title: 'පර්යේෂක උපකරණ පුවරුව',
        description: 'ML ආකෘති අවබෝධය සහ ෆෙඩරේටඩ් ඉගෙනුම් දත්ත ප්‍රවේශ කරන්න'
      },
      reports: {
        title: 'වාර්තා උපකරණ පුවරුව',
        description: 'අපනයන කාර්යය සමඟ සවිස්තරාත්මක වාර්තා උත්පාදනය කරන්න'
      }
    },
    pricing: {
      title: 'ඔබේ සැලැස්ම තෝරන්න',
      subtitle: 'පුද්ගලයන්, අධ්‍යාපනික සහ සංවිධාන සඳහා නම්‍යශීලී මිල ගණන්',
      free: {
        title: 'නොමිලේ',
        price: '0',
        description: 'ආරම්භ කිරීම සඳහා පරිපූර්ණ',
        features: [
          'මූලික පෙළ පරිවර්තනය',
          'පරිවර්තන 100/මාසය',
          'හඬ පරිවර්තනය',
          'ප්‍රජා සහාය'
        ]
      },
      pro: {
        title: 'ප්‍රෝ',
        price: '9.99',
        description: 'බල පරිශීලකයන් සඳහා',
        features: [
          'අසීමිත පරිවර්තන',
          'ලේඛන OCR',
          'AI චැට්බොට් ගුරු',
          'ප්‍රමුඛතා සහාය',
          'නොබැඳි මාදිලිය',
          'උසස් විශ්ලේෂණ'
        ]
      },
      enterprise: {
        title: 'ව්‍යවසාය',
        price: 'අභිරුචි',
        description: 'සංවිධාන සඳහා',
        features: [
          'ප්‍රෝ හි සියල්ල',
          'අභිරුචි AI ආකෘති',
          'API ප්‍රවේශය',
          'කැපවූ සහාය',
          'සුදු-ලේබල් විකල්පය',
          'උසස් ආරක්ෂාව'
        ]
      },
      choosePlan: 'සැලැස්ම තෝරන්න',
      month: 'මාසය'
    },
    testimonials: {
      title: 'අපගේ පරිශීලකයන් කියන දේ',
      subtitle: 'ලොව පුරා සෑහීමකට පත් පරිශීලකයන් දහස් ගණනක් සමඟ එක්වන්න'
    },
    contact: {
      title: 'සම්බන්ධ වන්න',
      subtitle: 'ප්‍රශ්න තිබේද? අපි ඔබෙන් ඇසීමට කැමතියි',
      name: 'ඔබේ නම',
      email: 'ඔබේ විද්‍යුත් තැපෑල',
      message: 'ඔබේ පණිවිඩය',
      send: 'පණිවිඩය යවන්න',
      address: 'කත්මන්ඩු, නේපාලය',
      phone: '+977 1234567890',
      emailLabel: 'support@transly.ai'
    },
    footer: {
      description: 'AI-බලගැන්වූ පරිවර්තන තාක්ෂණය සමඟ භාෂා බාධා බිඳ දැමීම',
      product: 'නිෂ්පාදනය',
      company: 'සමාගම',
      support: 'සහාය',
      legal: 'නීතිමය',
      rights: 'සියලුම හිමිකම් ඇවිරිණි'
    },
    common: {
      loading: 'පූරණය වෙමින්...',
      error: 'දෝෂය',
      success: 'සාර්ථකත්වය',
      cancel: 'අවලංගු කරන්න',
      save: 'සුරකින්න',
      delete: 'මකන්න',
      edit: 'සංස්කරණය කරන්න',
      close: 'වසන්න',
      back: 'ආපසු',
      next: 'ඊළඟ',
      previous: 'පෙර',
      search: 'සොයන්න',
      filter: 'පෙරහන',
      sort: 'පිළිවෙළට',
      viewAll: 'සියල්ල බලන්න',
      seeMore: 'තව බලන්න',
      tryNow: 'දැන් උත්සාහ කරන්න'
    }
  }
};
