import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useI18n } from '../i18n/context';
import { Search, UserCheck, ShieldAlert, TrendingUp } from 'lucide-react';
import { smoothEasing } from '../utils/motion';

export const HowItWorksJourney: React.FC = () => {
  const { t, lang } = useI18n();
  const isRtl = lang === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 30%'],
  });

  // Progress line width (Desktop: 0% -> 100%)
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);
  
  // Progress line height (Mobile: 0% -> 100%)
  const verticalLineProgress = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);

  const stepIcons = [
    <Search key="1" className="w-6 h-6 text-prof-blue" />,
    <UserCheck key="2" className="w-6 h-6 text-prof-blue" />,
    <ShieldAlert key="3" className="w-6 h-6 text-prof-blue" />,
    <TrendingUp key="4" className="w-6 h-6 text-prof-blue" />,
  ];

  const stepDescriptions = isRtl ? [
    'تحليل طبيعة المشروع والمواقع وتحديد التخصصات والأعداد المطلوبة بدقة.',
    'اختيار وتدريب الكوادر المطابقة لمتطلبات العمل والمواصفات الفنية.',
    'نقل وتجهيز العمالة وبدء المهام الميدانية مع الإشراف المباشر.',
    'تقييم دوري لمستوى الإنتاجية وتوفير البدائل التشغيلية لضمان الاستقرار.',
  ] : [
    'Analyzing project nature, site locations, and defining required specialties and numbers.',
    'Selecting and preparing qualified personnel matching technical specifications.',
    'Deploying the workforce to the site and commencing field tasks with direct oversight.',
    'Continuous evaluation of productivity and providing operational alternatives for stability.',
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-16 sm:py-24 lg:py-32 bg-white/75 backdrop-blur-md border-b border-white/40 relative overflow-hidden z-10"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-prof-blue/15 text-prof-blue text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-prof-blue animate-pulse"></span>
            {t.nav.howItWorks}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-navy tracking-tight leading-tight">
            {t.home.howItWorks.title}
          </h2>
        </div>

        {/* Desktop Interactive Horizontal Timeline */}
        <div className="hidden lg:block relative py-8">
          {/* Base Background Track Line */}
          <div className="absolute top-[80px] left-8 right-8 h-1 bg-gray-200/80 rounded-full"></div>

          {/* Animated Dynamic Progress Line */}
          <motion.div
            style={{
              width: prefersReducedMotion ? '100%' : lineProgress,
              left: isRtl ? 'auto' : '2rem',
              right: isRtl ? '2rem' : 'auto',
            }}
            className="absolute top-[80px] h-1 bg-gradient-to-r from-prof-blue via-deep-blue to-gold rounded-full shadow-[0_0_12px_rgba(30,99,213,0.5)] z-0"
          />

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-4 gap-8 relative z-10">
            {t.home.howItWorks.steps.map((step, index) => {
              // Activation thresholds for scroll position
              const threshold = (index + 1) * 0.22;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: smoothEasing }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Circle with Pulse and Badge */}
                  <div className="relative mb-6">
                    {/* Ring animation on hover/active */}
                    <div className="absolute -inset-2 rounded-full bg-prof-blue/10 group-hover:bg-prof-blue/20 transition-all duration-300 scale-90 group-hover:scale-105" />
                    
                    <div className="relative w-20 h-20 rounded-full bg-white border-2 border-border-color group-hover:border-prof-blue flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                      {stepIcons[index]}
                      
                      {/* Step Number Badge */}
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center ring-2 ring-white shadow">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-prof-blue transition-colors">
                    {step}
                  </h3>
                  <p className="text-sm text-secondary-text leading-relaxed max-w-[240px]">
                    {stepDescriptions[index]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline */}
        <div className="lg:hidden relative">
          {/* Vertical Base Line */}
          <div className="absolute top-4 bottom-4 start-6 w-1 bg-gray-200 rounded-full"></div>

          {/* Animated Vertical Progress Line */}
          <motion.div
            style={{
              height: prefersReducedMotion ? '100%' : verticalLineProgress,
            }}
            className="absolute top-4 start-6 w-1 bg-gradient-to-b from-prof-blue to-gold rounded-full z-0"
          />

          {/* Vertical Steps */}
          <div className="space-y-8 relative z-10">
            {t.home.howItWorks.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-5 ps-2"
              >
                {/* Step Node */}
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-white border-2 border-prof-blue text-prof-blue font-bold flex items-center justify-center shadow-md">
                    {stepIcons[index]}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-navy text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {index + 1}
                  </span>
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-white/85 backdrop-blur-xs p-5 rounded-2xl border border-border-color shadow-sm">
                  <h3 className="text-lg font-bold text-navy mb-2">
                    {step}
                  </h3>
                  <p className="text-sm text-secondary-text leading-relaxed">
                    {stepDescriptions[index]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
