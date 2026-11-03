import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import { siteConfig } from '../config/site';
import { Logo } from './Logo';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const Layout: React.FC = () => {
  const { t, lang, setLang } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isRtl = lang === 'ar';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0 && (pathParts[0] === 'ar' || pathParts[0] === 'en')) {
      pathParts[0] = newLang;
      navigate('/' + pathParts.join('/'));
    } else {
      navigate(`/${newLang}`);
    }
  };

  const navLinks = [
    { name: t.nav.home, path: `/${lang}` },
    { name: t.nav.about, path: `/${lang}/about` },
    { name: t.nav.services, path: `/${lang}/services` },
    { name: t.nav.sectors, path: `/${lang}/sectors` },
    { name: t.nav.quote, path: `/${lang}/quote` },
    { name: t.nav.contact, path: `/${lang}/contact` },
  ];

  const isActive = (path: string) => {
    if (path === `/${lang}` && (location.pathname === `/${lang}` || location.pathname === `/${lang}/` || location.pathname === '/')) {
      return true;
    }
    return location.pathname.startsWith(path) && path !== `/${lang}`;
  };

  const whatsappUrl = siteConfig.getWhatsappUrl();
  const hasPhone = Boolean(siteConfig.contact.phone);
  const hasEmail = Boolean(siteConfig.contact.email);
  const hasAddress = Boolean(siteConfig.contact.address[lang]);

  return (
    <div className={`min-h-screen flex flex-col bg-white text-navy font-sans ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* Top Announcement & Utility Bar */}
      <div className="bg-navy text-white text-xs py-2 px-4 border-b border-navy-light/40 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          <div className="flex items-center gap-4 text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isRtl ? 'حلول تأجير وتوفير الأيادي العاملة في المملكة العربية السعودية' : 'Manpower Supply & Leasing in Saudi Arabia'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {hasPhone && (
              <a 
                href={`tel:${siteConfig.contact.phone}`} 
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                dir="ltr"
              >
                <Phone size={13} className="text-gold" />
                <span className="font-semibold text-xs">{siteConfig.contact.phone}</span>
              </a>
            )}

            {hasEmail && (
              <a 
                href={`mailto:${siteConfig.contact.email}`} 
                className="hidden md:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Mail size={13} className="text-gold" />
                <span>{siteConfig.contact.email}</span>
              </a>
            )}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors cursor-pointer border border-white/15"
              aria-label="Switch Language"
            >
              <Globe size={12} />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border-color shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <Link to={`/${lang}`} className="flex items-center group">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                      active
                        ? 'text-prof-blue bg-prof-blue/10'
                        : 'text-secondary-text hover:text-navy hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to={`/${lang}/quote`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-prof-blue hover:bg-deep-blue text-white text-sm font-bold shadow-sm transition-all hover:shadow-md cursor-pointer"
              >
                <FileText size={16} />
                <span>{t.common.requestQuote}</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 text-navy text-xs font-bold"
              >
                <Globe size={14} />
                <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-navy bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-border-color shadow-lg overflow-hidden relative z-30"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 max-w-md mx-auto">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      active
                        ? 'bg-prof-blue text-white'
                        : 'text-navy hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={16} className={`opacity-60 ${isRtl ? 'rotate-180' : ''}`} />
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to={`/${lang}/quote`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-prof-blue text-white text-sm font-bold shadow-sm"
                >
                  <FileText size={16} />
                  <span>{t.common.requestQuote}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Body */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-navy-dark text-white border-t border-navy-light/40 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            
            {/* Col 1: Brand Info */}
            <div className="space-y-4 text-start">
              <Logo isLight />
              <p className="text-slate-300 text-sm leading-relaxed max-w-sm pt-2">
                {isRtl
                  ? 'شركة صفقات كوم لتأجير الأيادي العاملة، حلول متكاملة لتوفير وتأجير الكوادر المهنية والتشغيلية للشركات والمشاريع في المملكة العربية السعودية.'
                  : 'Safqatcom Company for Manpower Leasing provides comprehensive manpower supply and workforce leasing solutions for enterprises in Saudi Arabia.'}
              </p>
              <div className="flex items-center gap-2 text-gold text-xs font-semibold pt-1">
                <ShieldCheck size={16} />
                <span>{isRtl ? 'التزام بالجودة واللوائح المعتمدة' : 'Committed to Quality & Standards'}</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="text-start">
              <h4 className="text-white text-base font-bold mb-4 pb-1 border-b border-navy-light/40 inline-block">
                {isRtl ? 'روابط سريعة' : 'Quick Links'}
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to={`/${lang}`} className="text-slate-300 hover:text-gold transition-colors inline-flex items-center gap-1.5">
                    <Arrow size={12} className="text-prof-blue" />
                    <span>{t.nav.home}</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/about`} className="text-slate-300 hover:text-gold transition-colors inline-flex items-center gap-1.5">
                    <Arrow size={12} className="text-prof-blue" />
                    <span>{t.nav.about}</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/services`} className="text-slate-300 hover:text-gold transition-colors inline-flex items-center gap-1.5">
                    <Arrow size={12} className="text-prof-blue" />
                    <span>{t.nav.services}</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/sectors`} className="text-slate-300 hover:text-gold transition-colors inline-flex items-center gap-1.5">
                    <Arrow size={12} className="text-prof-blue" />
                    <span>{t.nav.sectors}</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/${lang}/quote`} className="text-slate-300 hover:text-gold transition-colors inline-flex items-center gap-1.5">
                    <Arrow size={12} className="text-prof-blue" />
                    <span>{t.nav.quote}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Sectors & Solutions */}
            <div className="text-start">
              <h4 className="text-white text-base font-bold mb-4 pb-1 border-b border-navy-light/40 inline-block">
                {isRtl ? 'القطاعات والحلول' : 'Sectors & Solutions'}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {t.sectorsPage.items.slice(0, 5).map((sec, idx) => (
                  <li key={idx}>
                    <Link to={`/${lang}/sectors`} className="text-slate-300 hover:text-gold transition-colors inline-flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-gold" />
                      <span>{sec.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact & Location */}
            <div className="text-start space-y-4">
              <h4 className="text-white text-base font-bold mb-1 pb-1 border-b border-navy-light/40 inline-block">
                {t.nav.contact}
              </h4>
              
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.city[lang] || (isRtl ? 'المملكة العربية السعودية' : 'Saudi Arabia')}</span>
                </div>

                {hasPhone && (
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="text-gold flex-shrink-0" />
                    <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors" dir="ltr">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                )}

                {hasEmail && (
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="text-gold flex-shrink-0" />
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                )}

                <div className="pt-2">
                  <Link
                    to={`/${lang}/quote`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-prof-blue/30 hover:bg-prof-blue text-white text-xs font-bold border border-prof-blue/40 transition-colors"
                  >
                    <FileText size={14} />
                    <span>{t.common.requestQuote}</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="mt-12 pt-6 border-t border-navy-light/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} {siteConfig.fullName[lang]}. {t.common.allRightsReserved}.
            </p>
            <div className="flex items-center gap-6">
              <Link to={`/${lang}/privacy`} className="hover:text-gold transition-colors">
                {t.common.privacy}
              </Link>
              <Link to={`/${lang}/terms`} className="hover:text-gold transition-colors">
                {t.common.terms}
              </Link>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating WhatsApp Action Button (only if whatsapp number configured) */}
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 end-6 z-50 p-3.5 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 hover:bg-[#20bd5a] transition-all flex items-center justify-center"
          aria-label="WhatsApp Contact"
        >
          <Phone size={24} />
        </a>
      )}

    </div>
  );
};
