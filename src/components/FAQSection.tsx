import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from '../i18n/context';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { fadeUp } from '../utils/motion';

export const FAQSection: React.FC = () => {
  const { t } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-navy/15 backdrop-blur-[1px] border-t border-white/20 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-white/80 text-prof-blue text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <HelpCircle size={15} />
            <span>{t.faq.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight drop-shadow-md">
            {t.faq.subtitle}
          </h2>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {t.faq.questions.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white/88 backdrop-blur-md rounded-2xl border border-white/70 overflow-hidden shadow-md hover:shadow-xl hover:border-prof-blue/40 transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-navy leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-prof-blue flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-prof-blue text-white' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-800 text-sm sm:text-base leading-relaxed border-t border-slate-100/90 font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
