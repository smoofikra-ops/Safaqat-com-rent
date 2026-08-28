import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Sectors } from './pages/Sectors';
import { Quote } from './pages/Quote';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { I18nProvider, useI18n } from './i18n/context';
import { Language } from './i18n/translations';

const LanguageRouter = () => {
  const { lang, setLang, t } = useI18n();
  const location = useLocation();

  useEffect(() => {
    const pathLang = location.pathname.split('/')[1];
    if ((pathLang === 'ar' || pathLang === 'en') && pathLang !== lang) {
      setLang(pathLang as Language);
    }
  }, [location, lang, setLang]);

  useEffect(() => {
    document.title = t.common.companyName;
  }, [t, lang]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${lang}`} replace />} />
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="sectors" element={<Sectors />} />
        <Route path="quote" element={<Quote />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <LanguageRouter />
      </I18nProvider>
    </BrowserRouter>
  );
}
