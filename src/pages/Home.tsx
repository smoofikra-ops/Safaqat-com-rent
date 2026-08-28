import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Users,
  Settings,
  Activity,
  ShieldCheck,
  HardHat,
  Factory,
  Truck,
  Building2,
  Wrench,
  UtensilsCrossed,
  Phone,
  Briefcase,
  Layers,
  Sparkles,
  FileText,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { ScrollBackgroundExperience } from '../components/ScrollBackgroundExperience';
import { HowItWorksJourney } from '../components/HowItWorksJourney';
import { FAQSection } from '../components/FAQSection';
import { staticImages } from '../config/images';
import { siteConfig } from '../config/site';
import { fadeUp, fadeInLeft, fadeInRight, scaleFade, staggerContainer } from '../utils/motion';

export const Home: React.FC = () => {
  const { t, lang } = useI18n();
  const isRtl = lang === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const trustIcons = [
    <Users className="w-6 h-6 text-prof-blue group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" key="1" />,
    <Settings className="w-6 h-6 text-prof-blue group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" key="2" />,
    <Activity className="w-6 h-6 text-prof-blue group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" key="3" />,
    <ShieldCheck className="w-6 h-6 text-prof-blue group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" key="4" />,
  ];

  const serviceIcons = [
    <Users className="w-8 h-8 text-prof-blue" key="1" />,
    <Briefcase className="w-8 h-8 text-prof-blue" key="2" />,
    <Activity className="w-8 h-8 text-prof-blue" key="3" />,
    <Settings className="w-8 h-8 text-prof-blue" key="4" />,
    <Wrench className="w-8 h-8 text-prof-blue" key="5" />,
    <Layers className="w-8 h-8 text-prof-blue" key="6" />,
  ];

  const sectorIcons = [
    <HardHat className="w-6 h-6 text-gold" key="1" />,
    <Factory className="w-6 h-6 text-gold" key="2" />,
    <Truck className="w-6 h-6 text-gold" key="3" />,
    <Building2 className="w-6 h-6 text-gold" key="4" />,
    <Wrench className="w-6 h-6 text-gold" key="5" />,
    <UtensilsCrossed className="w-6 h-6 text-gold" key="6" />,
  ];

  const hasPhone = Boolean(siteConfig.contact.phone);
  const whatsappUrl = siteConfig.getWhatsappUrl();

  return (
    <div className="w-full">
      <SEO lang={lang} />

      {/* 1. Hero Section with Full-Width Background Video */}
      <section className="relative overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center pt-16 pb-20 lg:pt-24 lg:pb-32">
        {/* Full-Width Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-slate-900">
          <video
            src="https://nmolabs-cdn.b-cdn.net/al-ayadi_website/Home/Hero/Videos/alaydi-hero%201.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center scale-[1.02]"
          />
          {/* Light overlay for maximum video brightness and sharpness while preserving text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-navy/30" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center max-w-4xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-navy text-xs sm:text-sm font-bold mb-6 border border-slate-200/90 shadow-lg">
              <Sparkles size={15} className="text-prof-blue flex-shrink-0" />
              <span>{t.home.hero.badge}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.25] tracking-tight mb-4 drop-shadow-md">
              <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold text-gold mb-2">
                {siteConfig.fullName[lang]}
              </span>
              {t.home.hero.title}{' '}
              <span className="text-gold">
                {t.home.hero.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-100 leading-relaxed mb-8 max-w-2xl drop-shadow-sm font-normal">
              {t.home.hero.desc}
            </p>

            {/* CTAs Area */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                to={`/${lang}/quote`}
                className="h-13 px-8 rounded-xl bg-gradient-to-r from-prof-blue to-deep-blue hover:from-deep-blue hover:to-navy text-white text-base font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.98] border border-white/20"
              >
                <FileText size={18} />
                <span>{t.nav.quote}</span>
                <Arrow size={18} />
              </Link>

              <Link
                to={`/${lang}/services`}
                className="h-13 px-8 rounded-xl bg-white/90 hover:bg-white text-navy text-base font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 border border-white/40"
              >
                <span>{t.common.exploreServices}</span>
              </Link>

              {hasPhone && (
                <div className="flex items-center justify-center gap-2.5 text-slate-200 font-medium py-1">
                  <span className="text-xs sm:text-sm">{t.home.hero.orCall}</span>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-navy font-bold hover:text-prof-blue transition-colors flex items-center gap-1.5 text-sm sm:text-base border border-white/40 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md"
                    dir="ltr"
                  >
                    <Phone size={15} className="text-prof-blue" />
                    <span>{siteConfig.contact.phone}</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Storytelling Visual Experience starting strictly after the Hero */}
      <ScrollBackgroundExperience>
        {/* 2. Redesigned Features Section (2x2 Grid on Mobile, 4-col on Desktop) */}
        <section className="py-8 sm:py-14 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6"
            >
              {t.home.trustBar.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="group relative bg-white/25 hover:bg-white/35 backdrop-blur-md p-4 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl border border-white/50 hover:border-white/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-start"
                >
                  {/* Micro-Interaction Icon Container */}
                  <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-lg sm:rounded-xl bg-white/40 backdrop-blur-sm border border-white/60 flex items-center justify-center mb-3 sm:mb-5 shadow-xs group-hover:bg-white/60 group-hover:border-white/90 group-hover:scale-105 transition-all duration-300">
                    {trustIcons[index]}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-navy mb-1 sm:mb-2 group-hover:text-prof-blue transition-colors drop-shadow-xs">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs sm:text-sm text-navy/85 font-medium leading-snug sm:leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Subtle Bottom Accent Indicator */}
                  <div className="absolute bottom-0 inset-x-4 sm:inset-x-6 h-0.5 bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/80 transition-all duration-300 rounded-full" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. About Teaser Section (Editorial Split Layout) */}
        <section className="py-16 sm:py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Visual Column */}
              <motion.div
                variants={scaleFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="lg:col-span-5 relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-white/60 bg-white/30 backdrop-blur-xs">
                  <img
                    src={staticImages.about}
                    alt="About Safqatcom Company"
                    className="w-full h-[320px] sm:h-[440px] object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 inset-x-6 text-white text-start">
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider block mb-1">
                      {siteConfig.fullName[lang]}
                    </span>
                    <p className="text-sm sm:text-base font-bold text-white/90 leading-snug">
                      {lang === 'ar' ? 'حلول مهنية تلبي طموحات شركائنا في المملكة' : 'Professional solutions meeting the ambitions of our partners'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div
                variants={isRtl ? fadeInLeft : fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="lg:col-span-7 text-start"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-xs text-white/90 text-xs sm:text-sm font-bold mb-4 border border-white/30 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                  {t.home.aboutTeaser.badge}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#e3e7ef] mb-5 leading-tight tracking-tight drop-shadow-sm">
                  {t.home.aboutTeaser.title}
                </h2>

                <p className="text-base sm:text-lg text-[#f6f2f2] font-normal leading-relaxed mb-6 drop-shadow-xs">
                  {t.home.aboutTeaser.desc}
                </p>

                <ul className="space-y-3.5 mb-8">
                  {t.home.aboutTeaser.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[#eff2f6]">
                      <div className="w-5 h-5 rounded-full bg-white/20 text-[#eaeef4] flex items-center justify-center flex-shrink-0 border border-white/30">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-[#eaeef4] font-medium text-sm sm:text-base drop-shadow-xs">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/${lang}/about`}
                  className="inline-flex items-center gap-2 text-white hover:text-blue-200 font-bold text-base transition-colors group py-1 drop-shadow-xs"
                >
                  <span>{t.home.aboutTeaser.btn}</span>
                  <Arrow size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 4. Services Section */}
        <section
          className="relative bg-transparent py-16 sm:py-24 lg:py-32 z-10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/60 backdrop-blur-xs border border-white/20 text-white text-xs sm:text-sm font-bold mb-4 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-gold"></span>
                <span>{t.home.services.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
                {t.home.services.title}
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-medium drop-shadow-sm">
                {t.home.services.desc}
              </p>
            </motion.div>

            {/* Services Grid: 2 rows with 3 equal cards in each row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-5 lg:gap-8 perspective-1000 items-stretch">
              {t.servicesPage.items.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="card-3d-hover group bg-navy/30 hover:bg-navy/45 backdrop-blur-sm p-2.5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-white/20 hover:border-white/40 shadow-md sm:shadow-xl hover:shadow-2xl flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="flex-1 flex flex-col">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl lg:rounded-2xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center mb-2 sm:mb-5 shadow-xs group-hover:bg-white/25 group-hover:border-white/50 group-hover:scale-105 transition-all duration-300">
                      <div className="text-gold group-hover:text-white transition-colors [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-6 sm:[&>svg]:h-6 lg:[&>svg]:w-8 lg:[&>svg]:h-8">
                        {serviceIcons[index]}
                      </div>
                    </div>

                    <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2.5 group-hover:text-gold transition-colors leading-tight sm:leading-snug drop-shadow-sm min-h-[2rem] sm:min-h-[3.25rem] flex items-center">
                      {service.title}
                    </h3>

                    <p className="text-[10px] sm:text-sm lg:text-base text-white/80 font-normal leading-relaxed mb-2.5 sm:mb-6 drop-shadow-xs flex-1 line-clamp-3 sm:line-clamp-none">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-4 border-t border-white/15 flex items-center justify-between mt-auto">
                    <Link
                      to={`/${lang}/quote`}
                      className="inline-flex items-center gap-1 text-[10px] sm:text-xs lg:text-sm font-bold text-gold hover:text-white transition-colors"
                    >
                      <span>{t.common.requestQuote}</span>
                      <Arrow size={12} className="sm:w-3.5 sm:h-3.5" />
                    </Link>
                    <span className="text-[9px] sm:text-xs font-bold text-white/50">0{index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to={`/${lang}/services`}
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-navy/40 hover:bg-navy/60 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl drop-shadow-xs"
              >
                <span>{t.common.exploreServices}</span>
                <Arrow size={16} />
              </Link>
            </div>

          </div>
        </section>

        {/* 5. Sectors Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#071527]/75 via-[#0B1F3A]/60 to-[#071527]/80 backdrop-blur-md text-white relative overflow-hidden border-y border-white/10 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-gold text-xs sm:text-sm font-bold mb-4">
                <span className="w-2 h-2 rounded-full bg-gold"></span>
                <span>{t.home.sectors.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-tight">
                {t.home.sectors.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                {t.home.sectors.desc}
              </p>
            </motion.div>

            {/* Sectors Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
              {t.sectorsPage.items.map((sector, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Link
                    to={`/${lang}/quote`}
                    className="group relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg border border-white/10 block focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <img
                      src={staticImages.sectors[index]}
                      alt={sector.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent transition-opacity duration-300 group-hover:from-navy/95" />

                    <div className="absolute inset-0 p-3.5 sm:p-6 sm:p-7 flex flex-col justify-end text-start">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-prof-blue/80 backdrop-blur-md flex items-center justify-center border border-white/20 mb-2.5 sm:mb-4 shadow-md group-hover:scale-105 transition-transform">
                        {sectorIcons[index]}
                      </div>

                      <h3 className="text-sm sm:text-lg lg:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-gold transition-colors leading-snug">
                        {sector.title}
                      </h3>

                      <p className="text-slate-300 text-[11px] sm:text-xs sm:text-sm leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-4">
                        {sector.desc}
                      </p>

                      <div className="flex items-center gap-1.5 sm:gap-2 text-gold text-[11px] sm:text-xs font-bold tracking-wide">
                        <span>{t.common.requestQuote}</span>
                        <Arrow size={12} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. Interactive How It Works Scroll Journey */}
        <HowItWorksJourney />

        {/* 7. FAQ Accordion Section */}
        <FAQSection />

        {/* 8. Conversion CTA Section */}
        <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-br from-[#071527]/85 via-deep-blue/80 to-prof-blue/85 backdrop-blur-md relative overflow-hidden text-white border-t border-white/20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Content Side */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-7 text-start"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
                  {t.home.cta.title}
                </h2>
                
                <p className="text-sm sm:text-base lg:text-lg text-blue-100 mb-8 max-w-xl leading-relaxed">
                  {t.home.cta.desc}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <Link
                    to={`/${lang}/quote`}
                    className="h-13 px-8 rounded-xl bg-gold hover:bg-gold-hover text-navy font-bold text-base shadow-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <FileText size={18} />
                    <span>{t.nav.quote}</span>
                    <Arrow size={18} />
                  </Link>

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-13 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-base shadow-md flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                    >
                      <Phone size={18} />
                      <span>{t.common.whatsapp}</span>
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Right Side: Operational Trust Showcase Cards */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-white/20 shadow-xl space-y-4">
                  {/* Widget 1 */}
                  <div className="bg-white/95 backdrop-blur-md p-4 sm:p-4.5 rounded-2xl shadow-md flex items-center gap-3.5 border border-white/90 transition-transform hover:scale-[1.02]">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-navy text-sm sm:text-base leading-snug">
                        {t.home.hero.floating1}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                        {lang === 'ar' ? 'كوادر متخصصة جاهزة للانطلاق الفوري' : 'Specialized cadres ready for immediate deployment'}
                      </div>
                    </div>
                  </div>

                  {/* Widget 2 */}
                  <div className="bg-white/95 backdrop-blur-md p-4 sm:p-4.5 rounded-2xl shadow-md flex items-center gap-3.5 border border-white/90 transition-transform hover:scale-[1.02]">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-prof-blue flex items-center justify-center flex-shrink-0 shadow-xs">
                      <Activity size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-navy text-sm sm:text-base leading-snug">
                        {t.home.hero.floating2}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                        {lang === 'ar' ? 'إشراف ميداني مستمر وتقارير دورية' : 'Continuous field supervision & periodic reporting'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </ScrollBackgroundExperience>
    </div>
  );
};
