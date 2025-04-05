export type SlideAnimation = 'fade' | 'slide' | 'zoom';

export interface Slide {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  animation: SlideAnimation;
}

export interface SliderSection {
  id: string;
  type: 'slider';
  title: string;
  content: string;
  isActive: boolean;
  slides: Slide[];
  autoplaySpeed: number;
}