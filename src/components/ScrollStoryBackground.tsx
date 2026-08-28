import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'motion/react';
import { storyScenes, StorySceneConfig } from '../config/images';
import { useI18n } from '../i18n/context';

interface ScrollStoryBackgroundProps {
  children: React.ReactNode;
  scenes?: StorySceneConfig[];
  className?: string;
}

interface SceneLayerProps {
  scene: StorySceneConfig;
  scrollYProgress: MotionValue<number>;
  isFirst: boolean;
  isLast: boolean;
  prefersReducedMotion: boolean | null;
  lang: 'ar' | 'en';
}

const SceneLayer: React.FC<SceneLayerProps> = ({
  scene,
  scrollYProgress,
  isFirst,
  isLast,
  prefersReducedMotion,
  lang,
}) => {
  const [p0, p1, p2, p3] = scene.scrollProgressRange;

  // Opacity interpolation based on normalized scroll range:
  // Fades in from opacity 0 to 1 as user scrolls into the section [p0 -> p1], then sustains through [p1 -> p2]
  const opacityValues = isFirst && isLast
    ? [1, 1, 1, 1]
    : isFirst
    ? [1, 1, 1, 0]
    : isLast
    ? [0, 1, 1, 1]
    : [0, 1, 1, 0];

  const progressPoints = [p0, p1, p2, p3];

  const opacity = useTransform(scrollYProgress, progressPoints, opacityValues);

  // Micro-motion: Scale transform
  const scale = useTransform(
    scrollYProgress,
    [p0, p3],
    prefersReducedMotion ? [1, 1] : [scene.scaleRange[0], scene.scaleRange[1]]
  );

  // Micro-motion: Subtle Y Parallax
  const translateY = useTransform(
    scrollYProgress,
    [p0, p3],
    prefersReducedMotion ? ['0%', '0%'] : [`${scene.yRange[0]}%`, `${scene.yRange[1]}%`]
  );

  // Micro-motion: Subtle X Shift (if configured)
  const translateX = useTransform(
    scrollYProgress,
    [p0, p3],
    prefersReducedMotion || !scene.xRange ? ['0%', '0%'] : [`${scene.xRange[0]}%`, `${scene.xRange[1]}%`]
  );

  return (
    <motion.div
      style={{
        opacity: prefersReducedMotion ? (isFirst ? 1 : 0) : opacity,
        scale,
        y: translateY,
        x: translateX,
      }}
      className="absolute inset-0 w-full h-full will-change-[opacity,transform] overflow-hidden"
    >
      {/* High-res CDN Layer Image */}
      <img
        src={scene.src}
        alt={scene.alt[lang] || 'Storytelling Background'}
        className="w-full h-full object-cover select-none"
        style={{
          objectPosition: scene.objectPosition || 'center center',
        }}
        loading={isFirst ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
      />

      {/* Layer-specific Color & Contrast Grading */}
      <div
        className="absolute inset-0"
        style={{
          background:
            scene.overlayGradient ||
            'linear-gradient(180deg, rgba(11,31,58,0.4) 0%, rgba(11,31,58,0.2) 50%, rgba(11,31,58,0.5) 100%)',
        }}
      />
    </motion.div>
  );
};

export const ScrollStoryBackground: React.FC<ScrollStoryBackgroundProps> = ({
  children,
  scenes = storyScenes,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  // Normalized scroll tracking across the entire story section within main content [0 -> 1]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Master canvas fade-out before reaching footer:
  // Stays 100% visible through hero, about, services, sectors, how-it-works, FAQ,
  // and smoothly dissolves to 0 before the end of the container, so footer is 100% independent.
  const masterCanvasOpacity = useTransform(
    scrollYProgress,
    [0, 0.88, 0.96, 1.0],
    [1, 1, 0, 0]
  );

  // Preload CDN images smoothly in background
  useEffect(() => {
    scenes.forEach((scene) => {
      if (scene.src) {
        const img = new Image();
        img.src = scene.src;
      }
    });
  }, [scenes]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* 
        Scoped Sticky Viewport Canvas for Scroll-Driven Storytelling
        Contained strictly within main container bounds — naturally terminates before footer.
      */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <motion.div
          style={{
            opacity: prefersReducedMotion ? 1 : masterCanvasOpacity,
          }}
          className="sticky top-0 h-screen w-full overflow-hidden bg-navy-dark will-change-[opacity]"
        >
          {/* Base Ambient Architectural Gradient Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071527] via-[#0B1F3A] to-[#071527]" />

          {/* Storytelling Layers Stack */}
          {scenes.map((scene, idx) => (
            <SceneLayer
              key={scene.id}
              scene={scene}
              scrollYProgress={scrollYProgress}
              isFirst={idx === 0}
              isLast={idx === scenes.length - 1}
              prefersReducedMotion={prefersReducedMotion}
              lang={lang}
            />
          ))}

          {/* Global Dynamic Overlay: Refined Architectural Mesh */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          {/* Global Cinematic Vignette & Text Readability Wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/30 via-transparent to-navy-dark/40 pointer-events-none" />
        </motion.div>
      </div>

      {/* Foreground Content Stack */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
