import {ScrollSlider} from './scroll-slider';
import {generateTimeline} from './generate-timeline.js';
import './batch-blocks';
import {initParallaxComponents} from './parallax.js';

export const initAnimationModule = () => {
  const sliderContainer = document.querySelector('[data-scroll-slider="parent"]');
  new ScrollSlider(sliderContainer);
  generateTimeline();
  initParallaxComponents();
};
