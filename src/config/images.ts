// Images asset configuration and storytelling background layers

import heroImageLocal from '../assets/images/regenerated_image_1787408721725.png';
import aboutImageLocal from '../assets/images/regenerated_image_1787409122111.jpg';

export interface StorySceneConfig {
  id: string;
  src: string;
  alt: {
    ar: string;
    en: string;
  };
  title?: {
    ar: string;
    en: string;
  };
  subtitle?: {
    ar: string;
    en: string;
  };
  // Progress points for normalized scroll [0 -> 1]
  // [fadeInStart, fullOpacityStart, fadeOutStart, fullFadeOut]
  scrollProgressRange: [number, number, number, number];
  scaleRange: [number, number]; // [initialScale, targetScale]
  yRange: [number, number]; // [initialY%, targetY%]
  xRange?: [number, number]; // [initialX%, targetX%]
  overlayGradient?: string;
  objectPosition?: string;
}

/**
 * 3-Stage Storytelling Visual Backgrounds from CDN:
 * Stage 1: background-alaydi-2.jpeg (Intro, TrustBar, About preview)
 * Stage 2: background-alaydi-1.png (Services & Sectors)
 * Stage 3: background-alaydi-3.png (How It Works, FAQ & Closing CTA)
 */
export const storyScenes: StorySceneConfig[] = [
  {
    id: 'story-scene-1',
    src: 'https://nmolabs-cdn.b-cdn.net/al-ayadi_website/Home/Sectors-Section/Images/background-alaydi-1.png',
    alt: {
      ar: 'جاهزية الكوادر الميدانية والتشغيلية',
      en: 'Field Workforce Readiness and Operations',
    },
    title: {
      ar: 'المرحلة الأولى: انطلاقة المشاريع والجاهزية الميدانية',
      en: 'Phase 1: Project Launch & Workforce Readiness',
    },
    subtitle: {
      ar: 'إمداد متكامل للكوادر المؤهلة والامتثال التام للأنظمة',
      en: 'Integrated qualified personnel and full regulatory compliance',
    },
    // Fades in at entry, holds through Trust bar, then crossfades into scene 2 as user approaches services
    scrollProgressRange: [0.0, 0.01, 0.07, 0.15],
    scaleRange: [1.03, 1.07],
    yRange: [0, -6],
    xRange: [0, 0],
    objectPosition: 'center center',
    overlayGradient: 'linear-gradient(180deg, rgba(11,31,58,0.20) 0%, rgba(11,31,58,0.05) 50%, rgba(11,31,58,0.20) 100%)',
  },
  {
    id: 'story-scene-2',
    src: 'https://nmolabs-cdn.b-cdn.net/al-ayadi_website/Home/Sectors-Section/Images/background-alaydi-2.jpeg',
    alt: {
      ar: 'المرحلة الثانية: الكفاءة والتميز في مواقع العمل',
      en: 'Phase 2: On-site Efficiency & Operational Excellence',
    },
    title: {
      ar: 'المرحلة الثانية: الكفاءة والتميز في مواقع العمل',
      en: 'Phase 2: On-site Efficiency & Operational Excellence',
    },
    subtitle: {
      ar: 'فرق عمل متكاملة بإشراف ميداني مستمر ومتابعة دقيقة للإنتاجية',
      en: 'Integrated teams with continuous field supervision and productivity tracking',
    },
    // Fades in starting at 0.10, fully locked at opacity 1.0 by 0.16, stays 1.0 through Services (0.34), then fades out to 0 by 0.44
    scrollProgressRange: [0.10, 0.16, 0.34, 0.44],
    scaleRange: [1.04, 1.00],
    yRange: [4, -4],
    xRange: [0, 0],
    objectPosition: 'center 35%',
    overlayGradient: 'linear-gradient(180deg, rgba(11,31,58,0.18) 0%, rgba(11,31,58,0.06) 50%, rgba(11,31,58,0.22) 100%)',
  },
  {
    id: 'story-scene-3',
    src: 'https://nmolabs-cdn.b-cdn.net/al-ayadi_website/Home/Sectors-Section/Images/background-alaydi-3.png',
    alt: {
      ar: 'المرحلة الثالثة: الإنجاز والاستدامة التشغيلية',
      en: 'Phase 3: Operational Achievement & Sustainability',
    },
    title: {
      ar: 'المرحلة الثالثة: الإنجاز والاستدامة التشغيلية',
      en: 'Phase 3: Operational Achievement & Sustainability',
    },
    subtitle: {
      ar: 'حلول مستدامة واستمرارية تشغيلية متكاملة لجميع القطاعات',
      en: 'Sustainable solutions and uninterrupted operational continuity for all sectors',
    },
    // Crossfade in from 0.42 to 0.50 as Scene 2 fades out, staying at full opacity 1.0 through Sectors, How It Works & FAQ
    scrollProgressRange: [0.42, 0.50, 0.90, 1.00],
    scaleRange: [1.02, 1.06],
    yRange: [0, -6],
    xRange: [0, 0],
    objectPosition: 'center center',
    overlayGradient: 'linear-gradient(180deg, rgba(11,31,58,0.25) 0%, rgba(11,31,58,0.10) 50%, rgba(11,31,58,0.30) 100%)',
  },
];

export interface ScrollBgImage {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  subtitle: {
    ar: string;
    en: string;
  };
  src?: string;
  gradient: string;
}

export const scrollBackgrounds: ScrollBgImage[] = [
  {
    id: 'scroll-bg-01',
    title: {
      ar: 'جاهزية الكوادر الميدانية',
      en: 'Field Workforce Readiness',
    },
    subtitle: {
      ar: 'إمداد مستمر يلبي معايير الجودة والسلامة',
      en: 'Continuous supply meeting quality and safety standards',
    },
    src: storyScenes[0]?.src,
    gradient: 'radial-gradient(ellipse at 80% 20%, rgba(30, 99, 213, 0.15) 0%, rgba(11, 31, 58, 0.05) 70%)',
  },
  {
    id: 'scroll-bg-02',
    title: {
      ar: 'إشراف ومتابعة تشغيلية',
      en: 'Supervision & Operational Monitoring',
    },
    subtitle: {
      ar: 'متابعة ميدانية دقيقة للمحافظة على الانضباط والإنتاجية',
      en: 'Precise on-site monitoring to maintain discipline and productivity',
    },
    src: storyScenes[1]?.src,
    gradient: 'radial-gradient(ellipse at 20% 50%, rgba(18, 59, 112, 0.18) 0%, rgba(214, 168, 75, 0.08) 70%)',
  },
  {
    id: 'scroll-bg-03',
    title: {
      ar: 'مرونة في تغطية المشاريع الكبرى',
      en: 'Flexibility for Mega Projects',
    },
    subtitle: {
      ar: 'توسيع وتعديل الفرق حسب متطلبات مراحل العمل',
      en: 'Scaling teams according to project phase requirements',
    },
    src: storyScenes[2]?.src,
    gradient: 'radial-gradient(ellipse at 70% 80%, rgba(30, 99, 213, 0.12) 0%, rgba(11, 31, 58, 0.06) 70%)',
  },
  {
    id: 'scroll-bg-04',
    title: {
      ar: 'استمرارية العمل بلا انقطاع',
      en: 'Uninterrupted Business Continuity',
    },
    subtitle: {
      ar: 'بدائل تشغيلية فورية وفق شروط التعاقد',
      en: 'Operational alternatives per contract terms',
    },
    src: undefined,
    gradient: 'radial-gradient(ellipse at 40% 30%, rgba(214, 168, 75, 0.12) 0%, rgba(18, 59, 112, 0.08) 80%)',
  },
];

export const staticImages = {
  hero: heroImageLocal,
  about: aboutImageLocal,
  sectors: [
    // 1. Contracting & Construction
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=900',
    // 2. Factories & Industrial
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900',
    // 3. Logistics & Warehouses
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=900',
    // 4. Mega Projects
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=900',
    // 5. Operations & Maintenance
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=900',
    // 6. Hospitality Sector
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=900',
  ],
  services: [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
  ],
};

