import {ScrollTrigger} from '../../vendor/scroll-trigger.js';
import {pageScroller} from '../../utils/page-scroller.js';

ScrollTrigger.batch('[data-animate="fade"]', {
  onEnter: () => gsap.to('[data-animate="fade"] [data-animate-item]', {
    autoAlpha: 1, duration: 1, stagger: 0.5,
  }),
  start: 'top center',
  scroller: pageScroller,
});

ScrollTrigger.batch('[data-animate="fadeIn"]', {
  onEnter: () => gsap.to('[data-animate="fadeIn"] [data-animate-item]', {
    autoAlpha: 1, y: 0, duration: 1, stagger: 0.5,
  }),
  start: 'top center',
  scroller: pageScroller,
});

ScrollTrigger.batch('[data-animate="fadeScale"]', {
  onEnter: () => gsap.to('[data-animate="fadeScale"] [data-animate-item]', {
    autoAlpha: 1, scale: 1, duration: 1, ease: 'back.out(1.5)', stagger: 0.5,
  }),
  start: 'top center+=115px',
  scroller: pageScroller,
});
