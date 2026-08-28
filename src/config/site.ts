export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'instagram';
  url: string;
  label: string;
}

export interface CompanyConfig {
  name: {
    ar: string;
    en: string;
  };
  subtitle: {
    ar: string;
    en: string;
  };
  shortName: {
    ar: string;
    en: string;
  };
  fullName: {
    ar: string;
    en: string;
  };
  website: string;
  contact: {
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    city: {
      ar: string | null;
      en: string | null;
    };
    address: {
      ar: string | null;
      en: string | null;
    };
    fullAddress: {
      ar: string | null;
      en: string | null;
    };
    workingHours: {
      ar: string | null;
      en: string | null;
    };
  };
  socialLinks: SocialLink[];
  getWhatsappUrl: (customMessage?: string) => string | null;
}

/**
 * Central Configuration for Safqatcom Company
 * All contact information is managed here centrally.
 * When phone/whatsapp/email are provided later, updating these variables
 * will reflect throughout the application immediately.
 */
export const companyConfig: CompanyConfig = {
  name: {
    ar: 'شركة صفقات كوم',
    en: 'Safqatcom Company',
  },
  subtitle: {
    ar: 'لتأجير الأيادي العاملة',
    en: 'For Manpower Leasing',
  },
  shortName: {
    ar: 'صفقات كوم',
    en: 'Safqatcom',
  },
  fullName: {
    ar: 'شركة صفقات كوم لتأجير الأيادي العاملة',
    en: 'Safqatcom Company for Manpower Leasing',
  },
  website: '', // To be added when custom domain is ready
  contact: {
    phone: null, // Placeholder: Leave null/empty until user provides Safqatcom phone
    whatsapp: null, // Placeholder: Leave null/empty until user provides Safqatcom WhatsApp
    email: null, // Placeholder: Leave null/empty until user provides Safqatcom email
    city: {
      ar: 'المملكة العربية السعودية',
      en: 'Saudi Arabia',
    },
    address: {
      ar: null,
      en: null,
    },
    fullAddress: {
      ar: null,
      en: null,
    },
    workingHours: {
      ar: null,
      en: null,
    },
  },
  socialLinks: [],

  // Safe WhatsApp URL helper - returns null if no number is configured
  getWhatsappUrl: (customMessage?: string) => {
    const number = companyConfig.contact.whatsapp;
    if (!number) return null;
    const cleanNumber = number.replace(/\D/g, '');
    const defaultMsg = 'مرحباً، أود الاستفسار عن خدمات شركة صفقات كوم لتأجير الأيادي العاملة.';
    const text = encodeURIComponent(customMessage || defaultMsg);
    return `https://wa.me/${cleanNumber}?text=${text}`;
  },
};

// Backwards-compatible alias for existing imports
export const siteConfig = companyConfig;
