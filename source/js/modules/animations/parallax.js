import {ScrollTrigger} from '../../vendor/scroll-trigger.js';
import {pageScroller} from '../../utils/page-scroller.js';


const vp767 = window.matchMedia('(max-width: 767px)');

const fadeScaleParallax = () => {
  const items = document.querySelectorAll('[data-parallax="fadeScale"]');
  if (!items.length) {
    return;
  }

  items.forEach((item) => {
    const animateContainer = item.querySelector('[data-parallax="item"]');
    gsap.set(animateContainer, {opacity: 0, scale: 0.5});
    const tl = gsap.to(animateContainer, {opacity: 1, scale: 1});
    ScrollTrigger.create({
      trigger: item,
      scroller: pageScroller,
      start: 'top bottom',
      end: vp767.matches ? 'center center' : 'top nottom',
      scrub: true,
      animation: tl,
    });
  });
};

const transformYParallax = () => {
  const items = document.querySelectorAll('[data-parallax="transformY"]');
  if (!items.length) {
    return;
  }

  items.forEach((item) => {
    const animateContainer = item.querySelector('[data-parallax="item"]');
    gsap.set(animateContainer, {y: item.dataset.from ? item.dataset.from : '100%', z: 0});
    const tl = gsap.to(animateContainer, {y: 0});
    ScrollTrigger.create({
      trigger: item,
      scroller: pageScroller,
      start: 'top bottom',
      end: vp767.matches ? 'center center' : 'top bottom',
      scrub: true,
      animation: tl,
    });
  });
};

export const initParallaxComponents = () => {
  fadeScaleParallax();
  transformYParallax();
};
