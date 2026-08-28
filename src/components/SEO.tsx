import React, { useEffect } from 'react';
import { siteConfig } from '../config/site';

interface SEOProps {
  title?: string;
  description?: string;
  lang?: 'ar' | 'en';
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  breadcrumbs?: Array<{ name: string; path: string }>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  lang = 'ar',
  canonical,
  image = '/og-image.jpg',
  type = 'website',
  breadcrumbs,
}) => {
  const isAr = lang === 'ar';
  const companyName = siteConfig.name[lang];
  const companySubtitle = siteConfig.subtitle[lang];
  const fullBrandName = `${companyName} ${companySubtitle}`;

  const defaultTitle = isAr
    ? 'شركة صفقات كوم لتأجير الأيادي العاملة | حلول توفير وتأجير الكوادر المهنية والتشغيلية'
    : 'Safqatcom Company for Manpower Leasing | Workforce Solutions in Saudi Arabia';

  const defaultDescription = isAr
    ? 'شركة صفقات كوم لتأجير الأيادي العاملة - حلول متكاملة لتوفير وتأجير الكوادر المهنية والعمالة للمنشآت والشركات والمشاريع في المملكة العربية السعودية.'
    : 'Safqatcom Company for Manpower Leasing provides integrated workforce rental and manpower supply solutions for enterprises, companies, and projects in Saudi Arabia.';

  const finalTitle = title 
    ? `${title} | ${fullBrandName}`
    : defaultTitle;
  
  const finalDescription = description || defaultDescription;

  useEffect(() => {
    // 1. Update Document Title & HTML attributes
    document.title = finalTitle;
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    // Helper to update or create meta tags
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Set Standard Meta Tags
    setMetaTag('name', 'description', finalDescription);
    setMetaTag(
      'name',
      'keywords',
      isAr
        ? 'شركة تأجير عمالة, تأجير الأيادي العاملة, توفير عمالة مهنية, شركة صفقات كوم, صفقات كوم لتأجير الأيادي العاملة, استقدام وتأجير عمالة للشركات, عمالة مقاولات, عمالة مصانع, عمالة لوجستية, السعودية'
        : 'manpower leasing company, workforce supply Saudi Arabia, manpower rental, Safqatcom company, Safqatcom manpower leasing, skilled labor rental, construction labor, factory workforce'
    );

    // 3. Set OpenGraph Meta Tags
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDescription);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', fullBrandName);
    setMetaTag('property', 'og:locale', isAr ? 'ar_SA' : 'en_US');
    if (image) setMetaTag('property', 'og:image', image);

    // 4. Set Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDescription);
    if (image) setMetaTag('name', 'twitter:image', image);

    // 5. Manage JSON-LD Schema
    const scriptId = 'schema-org-safqatcom';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaOrganization: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: fullBrandName,
      alternateName: companyName,
      description: finalDescription,
    };

    if (siteConfig.website) {
      schemaOrganization.url = siteConfig.website;
    }
    if (siteConfig.contact.phone) {
      schemaOrganization.telephone = siteConfig.contact.phone;
    }
    if (siteConfig.contact.email) {
      schemaOrganization.email = siteConfig.contact.email;
    }
    if (siteConfig.contact.address[lang]) {
      schemaOrganization.address = {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.contact.city[lang] || 'Saudi Arabia',
        addressCountry: 'SA',
        streetAddress: siteConfig.contact.address[lang],
      };
    }

    scriptTag.textContent = JSON.stringify(schemaOrganization);
  }, [finalTitle, finalDescription, lang, isAr, type, image, companyName, companySubtitle, fullBrandName]);

  return null;
};
