import React from 'react';
import { useI18n } from '../i18n/context';
import { FileCheck } from 'lucide-react';
import { SEO } from '../components/SEO';
import { siteConfig } from '../config/site';

export const Terms: React.FC = () => {
  const { t, lang } = useI18n();
  const companyFullName = siteConfig.fullName[lang];

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24">
      <SEO
        title={t.common.terms}
        lang={lang}
        breadcrumbs={[{ name: t.common.terms, path: `/${lang}/terms` }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-prof-blue/10 border border-prof-blue/20 text-prof-blue text-xs sm:text-sm font-bold mb-4">
          <FileCheck size={14} />
          <span>{t.common.terms}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8">
          {t.common.terms} - {companyFullName}
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-secondary-text text-sm sm:text-base leading-relaxed">
          <p>
            {lang === 'ar'
              ? `مرحباً بكم في الموقع الإلكتروني لـ ${companyFullName}. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بالشروط والأحكام التالية.`
              : `Welcome to the official website of ${companyFullName}. By using this website, you agree to comply with the following terms and conditions.`}
          </p>

          <h2 className="text-xl font-bold text-navy mt-6 mb-3">
            {lang === 'ar' ? '1. طبيعة المحتوى وعروض تأجير العمالة' : '1. Content & Manpower Proposals'}
          </h2>
          <p>
            {lang === 'ar'
              ? 'المعلومات الواردة في الموقع تهدف إلى التعريف بخدمات ونشاط الشركة في تأجير وإمداد الأيادي العاملة. عروض الأسعار والاتفاقيات التشغيلية تخضع لعقود رسمية مستقلة تحدد نطاق العمل والأعداد والالتزامات المتبادلة وفق شروط التعاقد.'
              : 'Information provided on this site serves an informational purpose regarding our company services in manpower supply and leasing. Operational quotes and agreements are subject to formal contracts defining scope, workforce numbers, and mutual obligations under agreed terms.'}
          </p>

          <h2 className="text-xl font-bold text-navy mt-6 mb-3">
            {lang === 'ar' ? '2. الملكية الفكرية' : '2. Intellectual Property'}
          </h2>
          <p>
            {lang === 'ar'
              ? `جميع حقوق الملكية الفكرية والعلامات التجارية والمحتوى والنصوص المنشورة في هذا الموقع محفوظة لـ ${companyFullName}.`
              : `All intellectual property, trademarks, content, and text published on this website are reserved to ${companyFullName}.`}
          </p>

          <h2 className="text-xl font-bold text-navy mt-6 mb-3">
            {lang === 'ar' ? '3. تعديل الشروط' : '3. Terms Modifications'}
          </h2>
          <p>
            {lang === 'ar'
              ? 'تحتفظ الشركة بحق تعديل أو تحديث هذه الشروط في أي وقت، ويسري مفعول أي تعديل بمجرد نشره على هذه الصفحة.'
              : 'The company reserves the right to modify or update these terms at any time, effective immediately upon posting to this page.'}
          </p>
        </div>
      </div>
    </div>
  );
};
