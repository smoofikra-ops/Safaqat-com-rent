import React from 'react';
import { useI18n } from '../i18n/context';
import { HardHat, Factory, Truck, Building2, Wrench, UtensilsCrossed, ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { staticImages } from '../config/images';

export const Sectors: React.FC = () => {
  const { t, lang } = useI18n();
  const isRtl = lang === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const sectorIcons = [
    <HardHat className="w-6 h-6 text-gold" key="1" />,
    <Factory className="w-6 h-6 text-gold" key="2" />,
    <Truck className="w-6 h-6 text-gold" key="3" />,
    <Building2 className="w-6 h-6 text-gold" key="4" />,
    <Wrench className="w-6 h-6 text-gold" key="5" />,
    <UtensilsCrossed className="w-6 h-6 text-gold" key="6" />,
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={t.sectorsPage.title}
        description={t.sectorsPage.subtitle}
        lang={lang}
        breadcrumbs={[{ name: t.sectorsPage.title, path: `/${lang}/sectors` }]}
      />

      {/* Page Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-24 border-b border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-prof-blue/10 border border-prof-blue/20 text-prof-blue text-xs sm:text-sm font-bold mb-4">
            <span>{t.home.sectors.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight mb-4">
            {t.sectorsPage.title}
          </h1>
          <p className="text-base sm:text-lg text-secondary-text">
            {t.sectorsPage.subtitle}
          </p>
        </div>
      </div>

      {/* Sectors Grid */}
      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.sectorsPage.items.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-lg border border-border-color block"
            >
              <img
                src={staticImages.sectors[index]}
                alt={sector.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent group-hover:from-navy/95 transition-opacity" />

              <div className="absolute inset-0 p-7 flex flex-col justify-end text-start">
                <div className="w-12 h-12 rounded-xl bg-prof-blue/90 backdrop-blur-md flex items-center justify-center border border-white/20 mb-4 shadow-md group-hover:scale-105 transition-transform">
                  {sectorIcons[index]}
                </div>

                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {sector.title}
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {sector.desc}
                </p>

                <Link
                  to={`/${lang}/quote`}
                  className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider"
                >
                  <span>{t.common.requestQuote}</span>
                  <Arrow size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
