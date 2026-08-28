import React, { useState } from 'react';
import { useI18n } from '../i18n/context';
import { MapPin, Phone, Mail, CheckCircle2, AlertCircle, Send, MessageSquare, FileText, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { siteConfig } from '../config/site';
import { submitContactForm, ContactFormData } from '../services/formService';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { fadeUp } from '../utils/motion';

export const Contact: React.FC = () => {
  const { t, lang } = useI18n();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [resultMessage, setResultMessage] = useState<string>('');
  const [whatsappFallback, setWhatsappFallback] = useState<string>('');
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setResultMessage('');

    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus('success');
      setResultMessage(result.message || t.common.successMessage);
      if (result.whatsappFallbackUrl) {
        setWhatsappFallback(result.whatsappFallbackUrl);
      }
    } else {
      setStatus('error');
      setResultMessage(result.message || 'حدث خطأ أثناء الإرسال');
      if (result.whatsappFallbackUrl) {
        setWhatsappFallback(result.whatsappFallbackUrl);
      }
    }
  };

  const hasPhone = Boolean(siteConfig.contact.phone);
  const hasEmail = Boolean(siteConfig.contact.email);
  const hasAddress = Boolean(siteConfig.contact.address[lang]);
  const whatsappUrl = siteConfig.getWhatsappUrl();

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={t.contact.title}
        description={t.contact.subtitle}
        lang={lang}
        breadcrumbs={[{ name: t.contact.title, path: `/${lang}/contact` }]}
      />

      {/* Page Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-14 sm:py-20 border-b border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-prof-blue/10 border border-prof-blue/20 text-prof-blue text-xs sm:text-sm font-bold mb-4">
            <MessageSquare size={14} />
            <span>{t.contact.title}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight mb-4">
            {t.contact.title}
          </h1>
          <p className="text-base sm:text-lg text-secondary-text max-w-2xl">
            {t.contact.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Contact Details Column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-6 text-start"
          >
            <div>
              <h2 className="text-2xl font-bold text-navy mb-3">
                {lang === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
              </h2>
              <p className="text-sm text-secondary-text leading-relaxed">
                {lang === 'ar'
                  ? 'يسعدنا تواصلكم لمناقشة احتياجات مشاريعكم وتقديم الدعم والحلول التشغيلية وتوفير الأيادي العاملة.'
                  : 'We are pleased to connect and discuss your workforce requirements and operational staffing solutions.'}
              </p>
            </div>

            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-light-bg border border-border-color">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-prof-blue flex items-center justify-center flex-shrink-0 border border-prof-blue/15 shadow-xs">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-sm mb-1">{t.contact.labels.address}</h3>
                  <p className="text-secondary-text text-sm leading-relaxed">
                    {hasAddress 
                      ? siteConfig.contact.fullAddress[lang]
                      : (lang === 'ar' ? 'المملكة العربية السعودية - تغطية شاملة لكافة المناطق والمشاريع' : 'Kingdom of Saudi Arabia - Nationwide Service Coverage')}
                  </p>
                </div>
              </div>

              {/* Phone if available */}
              {hasPhone && (
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-light-bg border border-border-color">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-prof-blue flex items-center justify-center flex-shrink-0 border border-prof-blue/15 shadow-xs">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm mb-1">{t.contact.labels.phone}</h3>
                    <div className="text-secondary-text text-sm" dir="ltr">
                      <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-prof-blue transition-colors font-medium">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Email if available */}
              {hasEmail && (
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-light-bg border border-border-color">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-prof-blue flex items-center justify-center flex-shrink-0 border border-prof-blue/15 shadow-xs">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm mb-1">{t.contact.labels.email}</h3>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-secondary-text hover:text-prof-blue text-sm transition-colors font-medium">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Quote Fast Action Box */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-start space-y-3">
                <div className="flex items-center gap-2 text-prof-blue font-bold text-sm">
                  <FileText size={18} />
                  <span>{t.quote.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                  {lang === 'ar'
                    ? 'هل ترغب في الحصول على دراسة لاحتياج منشأتك وعرض سعر فوري للعمالة المطلوبة؟'
                    : 'Looking for a comprehensive workforce assessment and a tailored quotation for your project?'}
                </p>
                <Link
                  to={`/${lang}/quote`}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-navy hover:bg-prof-blue text-white font-bold text-xs transition-colors"
                >
                  <span>{t.common.requestQuote}</span>
                </Link>
              </div>

              {/* Direct WhatsApp Box if configured */}
              {whatsappUrl && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-start">
                  <h3 className="font-bold text-navy text-base mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {lang === 'ar' ? 'الرد الفوري عبر الواتساب' : 'Instant WhatsApp Response'}
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary-text mb-4">
                    {lang === 'ar' ? 'تواصل مباشرة مع مسؤول العمليات لسرعة الرد والمتابعة.' : 'Connect directly with our operations desk for prompt answers.'}
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors"
                  >
                    <Phone size={16} />
                    <span>{t.common.whatsapp}</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            {status === 'success' ? (
              <div className="bg-light-bg p-8 sm:p-12 rounded-3xl border border-border-color text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-navy mb-2">{t.common.successMessage}</h3>
                  <p className="text-sm text-secondary-text max-w-md mx-auto">{resultMessage}</p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  {whatsappFallback && (
                    <a
                      href={whatsappFallback}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#20bd5a] transition-colors shadow-sm"
                    >
                      <Phone size={18} />
                      <span>{t.common.whatsapp}</span>
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
                    }}
                    className="px-6 py-3 rounded-xl border border-border-color text-navy font-bold hover:bg-slate-50 transition-colors"
                  >
                    {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-7 sm:p-10 rounded-3xl border border-border-color shadow-sm space-y-6 text-start">
                
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
                    <AlertCircle size={18} className="flex-shrink-0" />
                    <span>{resultMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      {t.contact.fields.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                      className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none transition-all text-sm bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      {t.contact.fields.company}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={lang === 'ar' ? 'اسم الشركة أو المنشأة' : 'Company Name'}
                      className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none transition-all text-sm bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      {t.contact.fields.phone} <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      dir="ltr"
                      placeholder="05XXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none transition-all text-sm bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      {t.contact.fields.email} <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none transition-all text-sm bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    {t.contact.fields.subject} <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={lang === 'ar' ? 'موضوع الاستفسار أو طلب العمالة' : 'Inquiry subject'}
                    className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none transition-all text-sm bg-slate-50/50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    {t.contact.fields.message} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={lang === 'ar' ? 'اكتب تفاصيل استفسارك أو احتياجك من العمالة...' : 'Write your inquiry details here...'}
                    className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none transition-all text-sm bg-slate-50/50 focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full h-13 rounded-xl bg-gradient-to-r from-prof-blue to-deep-blue hover:from-deep-blue hover:to-navy text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send size={18} />
                  <span>{status === 'submitting' ? t.common.submitting : t.common.send}</span>
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};
