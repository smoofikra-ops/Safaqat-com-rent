import React from 'react';
import { useI18n } from '../i18n/context';
import { ShieldCheck, Target, Eye, Award, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { fadeUp, scaleFade } from '../utils/motion';
import { staticImages } from '../config/images';
import { siteConfig } from '../config/site';

export const About: React.FC = () => {
  const { t, lang } = useI18n();
  const isRtl = lang === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={t.about.title}
        description={t.about.defDesc}
        lang={lang}
        breadcrumbs={[{ name: t.about.title, path: `/${lang}/about` }]}
      />

      {/* Page Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-24 border-b border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-prof-blue/10 border border-prof-blue/20 text-prof-blue text-xs sm:text-sm font-bold mb-4">
            <ShieldCheck size={14} />
            <span>{t.about.title}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight mb-6">
            {t.about.defTitle}
          </h1>
          <p className="text-base sm:text-lg text-secondary-text leading-relaxed">
            {t.about.defDesc}
          </p>
        </div>
      </div>

      {/* Strategic Goal & Image Split */}
      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <motion.div
            variants={scaleFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
              <img
                src={staticImages.about}
                alt="Corporate Operations"
                className="w-full h-[360px] sm:h-[480px] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6 text-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gold/10 text-gold text-xs font-bold">
              <Target size={14} />
              <span>{t.about.goalTitle}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-navy leading-tight">
              {lang === 'ar' ? 'تمكين المنشآت من التركيز على النمو والتوسع' : 'Empowering facilities to focus on core growth'}
            </h2>

            <p className="text-base text-secondary-text leading-relaxed">
              {t.about.goalDesc}
            </p>

            <div className="p-6 rounded-2xl bg-light-bg border border-border-color space-y-3">
              <h3 className="font-bold text-navy text-sm flex items-center gap-2">
                <CheckCircle2 size={18} className="text-prof-blue" />
                <span>{lang === 'ar' ? 'التزام بالجودة والمعايير المهنية' : 'Commitment to Quality & Standards'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                {lang === 'ar'
                  ? 'نحرص على تطبيق أعلى المعايير التنظيمية والمهنية لضمان سلامة وانضباط الكوادر الميدانية بما يخدم أهداف المشروع.'
                  : 'We strictly implement top regulatory and professional standards to ensure on-site workforce discipline and safety.'}
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="py-16 sm:py-24 bg-light-bg border-y border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-border-color shadow-xs text-start space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-prof-blue/10 text-prof-blue flex items-center justify-center border border-prof-blue/20">
                <Eye size={24} />
              </div>
              <h3 className="text-2xl font-bold text-navy">{t.about.visionTitle}</h3>
              <p className="text-secondary-text leading-relaxed text-sm sm:text-base">
                {t.about.visionDesc}
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-border-color shadow-xs text-start space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center border border-gold/20">
                <Award size={24} />
              </div>
              <h3 className="text-2xl font-bold text-navy">{t.about.messageTitle}</h3>
              <p className="text-secondary-text leading-relaxed text-sm sm:text-base">
                {t.about.messageDesc}
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Pillars of Institutional Work */}
      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4">
            {t.about.pillarsTitle}
          </h2>
          <p className="text-secondary-text text-sm sm:text-base">
            {lang === 'ar' ? 'المبادئ الأساسية التي تحكم جودة خدماتنا التشغيلية' : 'The core principles governing our operational delivery'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.about.pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-7 rounded-2xl bg-white border border-border-color shadow-xs hover:border-prof-blue/40 transition-colors text-start"
            >
              <div className="w-8 h-8 rounded-lg bg-prof-blue/10 text-prof-blue font-bold text-xs flex items-center justify-center mb-4">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{pillar.title}</h3>
              <p className="text-sm text-secondary-text leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to={`/${lang}/quote`}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-prof-blue hover:bg-deep-blue text-white font-bold text-sm shadow-md transition-all"
          >
            <span>{t.nav.quote}</span>
            <Arrow size={16} />
          </Link>
        </div>
      </div>

    </div>
  );
};
