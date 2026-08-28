import React from 'react';
import { ScrollStoryBackground } from './ScrollStoryBackground';
import { StorySceneConfig } from '../config/images';

interface ScrollBackgroundExperienceProps {
  children: React.ReactNode;
  scenes?: StorySceneConfig[];
  className?: string;
}

export const ScrollBackgroundExperience: React.FC<ScrollBackgroundExperienceProps> = ({
  children,
  scenes,
  className,
}) => {
  return (
    <ScrollStoryBackground scenes={scenes} className={className}>
      {children}
    </ScrollStoryBackground>
  );
};

