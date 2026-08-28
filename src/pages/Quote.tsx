import React, { useState } from 'react';
import { useI18n } from '../i18n/context';
import { FileText, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Send, Phone, Building2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { submitQuoteForm, QuoteFormData } from '../services/formService';
import { motion, AnimatePresence } from 'motion/react';

export const Quote: React.FC = () => {
  const { t, lang } = useI18n();
  const isRtl = lang === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [resultMessage, setResultMessage] = useState<string>('');
  const [whatsappFallback, setWhatsappFallback] = useState<string>('');

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    jobTitle: '',
    companyName: '',
    phone: '',
    email: '',
    city: '',
    projectLocation: '',
    sector: '',
    serviceType: '',
    specialties: '',
    workersCount: '',
    contractDuration: '',
    expectedStartDate: '',
    additionalDetails: '',
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = t.quote.validation.required;
    if (!formData.companyName.trim()) newErrors.companyName = t.quote.validation.required;
    if (!formData.phone.trim()) newErrors.phone = t.quote.validation.required;
    if (!formData.email.trim()) {
      newErrors.email = t.quote.validation.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.quote.validation.email;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.sector.trim()) newErrors.sector = t.quote.validation.required;
    if (!formData.serviceType.trim()) newErrors.serviceType = t.quote.validation.required;
    if (!formData.privacyConsent) newErrors.privacyConsent = t.quote.validation.privacy;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setStatus('submitting');
    setResultMessage('');

    const result = await submitQuoteForm(formData);

    if (result.success) {
      setStatus('success');
      setResultMessage(result.message || t.common.successMessage);
      if (result.whatsappFallbackUrl) {
        setWhatsappFallback(result.whatsappFallbackUrl);
      }
    } else {
      setStatus('error');
      setResultMessage(result.message || 'حدث خطأ أثناء إرسال الطلب');
      if (result.whatsappFallbackUrl) {
        setWhatsappFallback(result.whatsappFallbackUrl);
      }
    }
  };

  return (
    <div className="bg-light-bg min-h-screen py-12 sm:py-20">
      <SEO
        title={t.quote.title}
        description={t.quote.subtitle}
        lang={lang}
        breadcrumbs={[{ name: t.quote.title, path: `/${lang}/quote` }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-prof-blue/10 border border-prof-blue/20 text-prof-blue text-xs sm:text-sm font-bold mb-4">
            <FileText size={14} />
            <span>{t.quote.title}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy tracking-tight mb-3">
            {t.quote.title}
          </h1>
          <p className="text-sm sm:text-base text-secondary-text max-w-xl mx-auto">
            {t.quote.subtitle}
          </p>
        </div>

        {/* Step Indicators */}
        {status !== 'success' && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors ${currentStep === 1 ? 'bg-navy text-white border-navy' : 'bg-white text-secondary-text border-border-color'}`}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">1</span>
              <span>{t.quote.steps.step1}</span>
            </div>
            <div className="w-6 h-0.5 bg-slate-300"></div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors ${currentStep === 2 ? 'bg-navy text-white border-navy' : 'bg-white text-secondary-text border-border-color'}`}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">2</span>
              <span>{t.quote.steps.step2}</span>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-border-color shadow-sm p-6 sm:p-10 text-start">
          {status === 'success' ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy mb-2">{t.common.successMessage}</h2>
                <p className="text-sm text-secondary-text max-w-md mx-auto">{resultMessage}</p>
              </div>

              {whatsappFallback && (
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={whatsappFallback}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#20bd5a] transition-colors shadow-sm"
                  >
                    <Phone size={18} />
                    <span>{t.common.whatsapp}</span>
                  </a>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setCurrentStep(1);
                      setFormData({
                        fullName: '',
                        jobTitle: '',
                        companyName: '',
                        phone: '',
                        email: '',
                        city: '',
                        projectLocation: '',
                        sector: '',
                        serviceType: '',
                        specialties: '',
                        workersCount: '',
                        contractDuration: '',
                        expectedStartDate: '',
                        additionalDetails: '',
                        privacyConsent: false,
                      });
                    }}
                    className="px-6 py-3 rounded-xl border border-border-color text-navy font-bold hover:bg-slate-50 transition-colors"
                  >
                    {lang === 'ar' ? 'تقديم طلب جديد' : 'Submit Another Request'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={currentStep === 1 ? handleNext : handleSubmit}>
              
              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <span>{resultMessage}</span>
                </div>
              )}

              <AnimatePresence mode="wait">
                {currentStep === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? -15 : 15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          {t.quote.fields.fullName} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-border-color'} focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white`}
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          {t.quote.fields.jobTitle}
                        </label>
                        <input
                          type="text"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleChange}
                          placeholder={lang === 'ar' ? 'مثال: مدير المشاريع' : 'e.g. Project Manager'}
                          className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                        {t.quote.fields.companyName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.companyName ? 'border-red-500 ring-1 ring-red-500' : 'border-border-color'} focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white`}
                      />
                      {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          {t.quote.fields.phone} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          dir="ltr"
                          placeholder="05XXXXXXXX"
                          className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-border-color'} focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white`}
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          {t.quote.fields.email} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-border-color'} focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          {t.quote.fields.city}
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder={lang === 'ar' ? 'الرياض، جدة، الدمام...' : 'Riyadh, Jeddah...'}
                          className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          {t.quote.fields.projectLocation}
                        </label>
                        <input
                          type="text"
                          name="projectLocation"
                          value={formData.projectLocation}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        className="h-12 px-8 rounded-xl bg-prof-blue hover:bg-deep-blue text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>{t.common.next}</span>
                        <Arrow size={16} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? -15 : 15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          {t.quote.fields.sector} <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="sector"
                          value={formData.sector}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.sector ? 'border-red-500' : 'border-border-color'} focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white`}
                        >
                          <option value="">{lang === 'ar' ? 'اختر القطاع...' : 'Select Sector...'}</option>
                          {t.sectorsPage.items.map((sec, idx) => (
                            <option key={idx} value={sec.title}>{sec.title}</option>
                          ))}
                        </select>
                        {errors.sector && <p className="text-xs text-red-500 mt-1">{errors.sector}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          {t.quote.fields.serviceType} <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.serviceType ? 'border-red-500' : 'border-border-color'} focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white`}
                        >
                          <option value="">{lang === 'ar' ? 'اختر نوع الخدمة...' : 'Select Service Type...'}</option>
                          {t.servicesPage.items.map((srv, idx) => (
                            <option key={idx} value={srv.title}>{srv.title}</option>
                          ))}
                        </select>
                        {errors.serviceType && <p className="text-xs text-red-500 mt-1">{errors.serviceType}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          {t.quote.fields.workersCount}
                        </label>
                        <input
                          type="text"
                          name="workersCount"
                          value={formData.workersCount}
                          onChange={handleChange}
                          placeholder={lang === 'ar' ? 'مثال: 25 عامل' : 'e.g. 25 workers'}
                          className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                          {t.quote.fields.contractDuration}
                        </label>
                        <input
                          type="text"
                          name="contractDuration"
                          value={formData.contractDuration}
                          onChange={handleChange}
                          placeholder={lang === 'ar' ? 'مثال: 6 أشهر، سنة قابلة للتجديد' : 'e.g. 6 months, 1 year'}
                          className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                        {t.quote.fields.specialties}
                      </label>
                      <input
                        type="text"
                        name="specialties"
                        value={formData.specialties}
                        onChange={handleChange}
                        placeholder={lang === 'ar' ? 'التخصصات الفنية أو المهن المطلوبة' : 'Required technical trades'}
                        className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                        {t.quote.fields.additionalDetails}
                      </label>
                      <textarea
                        rows={3}
                        name="additionalDetails"
                        value={formData.additionalDetails}
                        onChange={handleChange}
                        placeholder={lang === 'ar' ? 'أي تفاصيل أخرى ترغب بإضافتها...' : 'Any other specifications...'}
                        className="w-full px-4 py-3 rounded-xl border border-border-color focus:border-prof-blue focus:ring-2 focus:ring-prof-blue/20 outline-none text-sm bg-slate-50/50 focus:bg-white resize-none"
                      />
                    </div>

                    {/* Privacy Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="privacyConsent"
                          checked={formData.privacyConsent}
                          onChange={handleChange}
                          className="w-4 h-4 mt-0.5 rounded border-border-color text-prof-blue focus:ring-prof-blue"
                        />
                        <span className="text-xs text-secondary-text leading-relaxed">
                          {t.quote.fields.privacyConsent} <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {errors.privacyConsent && <p className="text-xs text-red-500 mt-1">{errors.privacyConsent}</p>}
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="h-12 px-6 rounded-xl border border-border-color text-secondary-text font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <BackArrow size={16} />
                        <span>{t.common.prev}</span>
                      </button>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="h-12 px-8 rounded-xl bg-gradient-to-r from-prof-blue to-deep-blue hover:from-deep-blue hover:to-navy text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Send size={16} />
                        <span>{status === 'submitting' ? t.common.submitting : t.common.submit}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
