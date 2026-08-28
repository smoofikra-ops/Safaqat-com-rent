import React from 'react';
import { useI18n } from '../i18n/context';
import { Users, Briefcase, Activity, Settings, Wrench, Layers, ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { staticImages } from '../config/images';

export const Services: React.FC = () => {
  const { t, lang } = useI18n();
  const isRtl = lang === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const serviceIcons = [
    <Users className="w-8 h-8 text-prof-blue" key="1" />,
    <Briefcase className="w-8 h-8 text-prof-blue" key="2" />,
    <Activity className="w-8 h-8 text-prof-blue" key="3" />,
    <Settings className="w-8 h-8 text-prof-blue" key="4" />,
    <Wrench className="w-8 h-8 text-prof-blue" key="5" />,
    <Layers className="w-8 h-8 text-prof-blue" key="6" />,
  ];

  return (
    <div className="bg-light-bg min-h-screen">
      <SEO
        title={t.servicesPage.title}
        description={t.servicesPage.subtitle}
        lang={lang}
        breadcrumbs={[{ name: t.servicesPage.title, path: `/${lang}/services` }]}
      />

      {/* Page Header */}
      <div className="bg-white py-16 sm:py-24 border-b border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-prof-blue/10 border border-prof-blue/20 text-prof-blue text-xs sm:text-sm font-bold mb-4">
            <span>{t.home.services.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight mb-4">
            {t.servicesPage.title}
          </h1>
          <p className="text-base sm:text-lg text-secondary-text">
            {t.servicesPage.subtitle}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {t.servicesPage.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-3d-hover bg-white p-8 rounded-3xl border border-border-color hover:border-prof-blue/40 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 rounded-2xl overflow-hidden mb-6 bg-slate-100">
                  <img
                    src={staticImages.services[index]}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 start-3 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center border border-white/60 shadow-sm">
                    {serviceIcons[index]}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-navy mb-3">
                  {service.title}
                </h2>

                <p className="text-sm text-secondary-text leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/${lang}/quote`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-prof-blue hover:text-deep-blue transition-colors"
                >
                  <span>{t.common.requestQuote}</span>
                  <Arrow size={14} />
                </Link>
                <span className="text-xs font-bold text-slate-300">0{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
