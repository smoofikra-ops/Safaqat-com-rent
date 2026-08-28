import React from 'react';
import { useI18n } from '../i18n/context';
import { Shield } from 'lucide-react';
import { SEO } from '../components/SEO';
import { siteConfig } from '../config/site';

export const Privacy: React.FC = () => {
  const { t, lang } = useI18n();
  const companyFullName = siteConfig.fullName[lang];

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <SEO
        title={t.common.privacy}
        lang={lang}
        breadcrumbs={[{ name: t.common.privacy, path: `/${lang}/privacy` }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-prof-blue/10 border border-prof-blue/20 text-prof-blue text-xs sm:text-sm font-bold mb-4">
          <Shield size={14} />
          <span>{t.common.privacy}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8">
          {t.common.privacy} - {companyFullName}
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-secondary-text text-sm sm:text-base leading-relaxed">
          <p>
            {lang === 'ar'
              ? `تلتزم ${companyFullName} بحماية خصوصية بيانات عملائها وزوار موقعها الإلكتروني وفقاً للأنظمة واللوائح المعمول بها في المملكة العربية السعودية.`
              : `${companyFullName} is committed to protecting the privacy of our clients and website visitors in accordance with applicable laws in the Kingdom of Saudi Arabia.`}
          </p>

          <h2 className="text-xl font-bold text-navy mt-6 mb-3">
            {lang === 'ar' ? '1. جمع واستخدام البيانات' : '1. Data Collection & Use'}
          </h2>
          <p>
            {lang === 'ar'
              ? 'نقوم بجمع المعلومات التي تقدمها لنا طوعاً من خلال نماذج طلب عروض الأسعار ونماذج التواصل (مثل: الاسم، اسم المنشأة، الجوال، البريد الإلكتروني، وتفاصيل احتياج المشروع من الأيادي العاملة) وذلك لغرض دراسة احتياج منشأتك وتقديم عروض الأسعار والخدمات المناسبة.'
              : 'We collect information you voluntarily provide via quote request and contact forms (e.g. name, facility name, phone, email, and workforce requirements) solely to assess your operational requirements and deliver suitable manpower proposals.'}
          </p>

          <h2 className="text-xl font-bold text-navy mt-6 mb-3">
            {lang === 'ar' ? '2. سرية المعلومات وأمنها' : '2. Information Confidentiality & Security'}
          </h2>
          <p>
            {lang === 'ar'
              ? 'نلتزم باتخاذ التدابير التقنية والتنظيمية المناسبة للمحافظة على سرية بياناتك وعدم مشاركتها أو بيعها لأي أطراف خارجية إلا بموجب المتطلبات القانونية المعمول بها.'
              : 'We implement appropriate technical and organizational measures to safeguard your information and ensure it is not shared or sold to third parties, except as required by applicable laws.'}
          </p>

          <h2 className="text-xl font-bold text-navy mt-6 mb-3">
            {lang === 'ar' ? '3. التواصل والاستفسار' : '3. Inquiries & Contact'}
          </h2>
          <p>
            {lang === 'ar'
              ? 'لأي استفسارات بخصوص سياسة الخصوصية، يرجى التواصل معنا عبر نموذج التواصل المتاح على الموقع الإلكتروني.'
              : 'For inquiries regarding this privacy policy, please reach out via our contact form available on this website.'}
          </p>
        </div>
      </div>
    </div>
  );
};
