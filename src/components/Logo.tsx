import React from 'react';
import { useI18n } from '../i18n/context';
import { siteConfig } from '../config/site';
import { Layers } from 'lucide-react';

interface LogoProps {
  className?: string;
  isLight?: boolean;
  hideSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  isLight = false,
  hideSubtitle = false 
}) => {
  const { lang } = useI18n();
  const isRtl = lang === 'ar';

  const companyName = siteConfig.name[lang];
  const companySubtitle = siteConfig.subtitle[lang];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Brand Icon / Monogram */}
      <div 
        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${
          isLight 
            ? 'bg-white/10 text-white border border-white/20' 
            : 'bg-navy text-white border border-navy/20 shadow-prof-blue/10'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <Layers className={`w-6 h-6 ${isLight ? 'text-gold' : 'text-prof-blue'}`} />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-gold ring-2 ring-navy"></span>
        </div>
      </div>

      {/* Brand Typography */}
      <div className={`flex flex-col text-start leading-none ${isRtl ? 'font-sans' : 'font-sans'}`}>
        <span 
          className={`font-black text-lg sm:text-xl tracking-tight transition-colors ${
            isLight ? 'text-white' : 'text-navy'
          }`}
        >
          {companyName}
        </span>
        {!hideSubtitle && (
          <span 
            className={`text-[11px] sm:text-xs font-semibold mt-0.5 tracking-normal transition-colors ${
              isLight ? 'text-slate-300' : 'text-prof-blue'
            }`}
          >
            {companySubtitle}
          </span>
        )}
      </div>
    </div>
  );
};
