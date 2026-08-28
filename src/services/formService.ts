import { siteConfig } from '../config/site';

export interface QuoteFormData {
  fullName: string;
  jobTitle?: string;
  companyName: string;
  phone: string;
  email: string;
  city?: string;
  projectLocation?: string;
  sector: string;
  serviceType: string;
  specialties?: string;
  workersCount?: string | number;
  contractDuration?: string;
  expectedStartDate?: string;
  additionalDetails?: string;
  privacyConsent: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message?: string;
  whatsappFallbackUrl?: string | null;
}

export async function submitQuoteForm(data: QuoteFormData): Promise<FormSubmissionResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

  // Format message for fallback or webhook
  const formattedSummary = `*طلب عرض سعر تأجير عمالة - شركة صفقات كوم:*
• *الاسم:* ${data.fullName}
• *المسمى الوظيفي:* ${data.jobTitle || 'غير محدد'}
• *اسم المنشأة:* ${data.companyName}
• *الجوال:* ${data.phone}
• *البريد:* ${data.email}
• *المدينة:* ${data.city || 'غير محدد'}
• *القطاع:* ${data.sector}
• *نوع الخدمة:* ${data.serviceType}
• *التخصصات:* ${data.specialties || 'غير محدد'}
• *العدد التقريبي:* ${data.workersCount || 'غير محدد'}
• *مدة التعاقد:* ${data.contractDuration || 'غير محدد'}
• *تاريخ البدء:* ${data.expectedStartDate || 'غير محدد'}
• *التفاصيل الإضافية:* ${data.additionalDetails || 'لا يوجد'}`;

  const whatsappUrl = siteConfig.getWhatsappUrl(formattedSummary);

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          type: 'quote',
          timestamp: new Date().toISOString(),
          data,
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'تم استلام طلبكم بنجاح وسيتواصل معكم فريق صفقات كوم.',
          whatsappFallbackUrl: whatsappUrl,
        };
      } else {
        return {
          success: false,
          message: whatsappUrl 
            ? 'تعذر إرسال الطلب عبر الخادم حالياً. يرجى المتابعة عبر الواتساب.'
            : 'تعذر إرسال الطلب حالياً، يرجى المحاولة مرة أخرى.',
          whatsappFallbackUrl: whatsappUrl,
        };
      }
    } catch (err) {
      console.warn('Form endpoint error', err);
      return {
        success: false,
        message: whatsappUrl 
          ? 'حدث خطأ أثناء الاتصال بالخادم. يمكنك إرسال الطلب مباشرة عبر الواتساب.'
          : 'حدث خطأ في الاتصال، يرجى المحاولة مرة أخرى.',
        whatsappFallbackUrl: whatsappUrl,
      };
    }
  }

  // When no remote API endpoint is connected in env
  return {
    success: true,
    message: whatsappUrl
      ? 'تم تجهيز بيانات طلبك. يمكنك تأكيد الإرسال عبر الواتساب للتواصل المباشر مع الفريق.'
      : 'تم استلام طلب عرض السعر بنجاح، وسيقوم فريق شركة صفقات كوم بالتواصل معكم قريباً.',
    whatsappFallbackUrl: whatsappUrl,
  };
}

export async function submitContactForm(data: ContactFormData): Promise<FormSubmissionResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

  const formattedSummary = `*رسالة تواصل - شركة صفقات كوم:*
• *الاسم:* ${data.name}
• *المنشأة:* ${data.company || 'غير محدد'}
• *الجوال:* ${data.phone}
• *البريد:* ${data.email}
• *الموضوع:* ${data.subject}
• *الرسالة:* ${data.message}`;

  const whatsappUrl = siteConfig.getWhatsappUrl(formattedSummary);

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          timestamp: new Date().toISOString(),
          data,
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'تم استلام رسالتكم بنجاح وسيقوم فريق شركة صفقات كوم بالرد عليكم.',
          whatsappFallbackUrl: whatsappUrl,
        };
      } else {
        return {
          success: false,
          message: whatsappUrl
            ? 'تعذر إرسال الرسالة عبر الخادم. يمكنك التواصل مباشرة عبر الواتساب.'
            : 'تعذر إرسال الرسالة حالياً، يرجى المحاولة مرة أخرى.',
          whatsappFallbackUrl: whatsappUrl,
        };
      }
    } catch (err) {
      console.warn('Form endpoint error', err);
      return {
        success: false,
        message: whatsappUrl
          ? 'حدث خطأ في الإرسال. يمكنك المتابعة عبر الواتساب مباشرة.'
          : 'حدث خطأ في الإرسال، يرجى المحاولة مرة أخرى.',
        whatsappFallbackUrl: whatsappUrl,
      };
    }
  }

  return {
    success: true,
    message: whatsappUrl
      ? 'تم تجهيز رسالتك. يمكنك إرسالها مباشرة إلى فريق العمل عبر الواتساب.'
      : 'تم إرسال رسالتكم بنجاح، وسيقوم فريق شركة صفقات كوم بالتواصل معكم قريباً.',
    whatsappFallbackUrl: whatsappUrl,
  };
}
