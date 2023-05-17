import {ScrollToPlugin} from '../vendor/scroll-to-plugin';
import {pageScroller} from '../utils/page-scroller.js';

const header = document.querySelector('.header');

const setOffset = (offset) => {
  if (offset === 'header') {
    if (!header) {
      return 0; // если нет шапки на странице, то отступ = 0
    }
    return header.getBoundingClientRect().height; // отступ = высота шапки
  }

  return offset;
};

const scrollToHandler = (e) => {
  e.preventDefault();
  const btn = e.target.closest('[data-move-to]');
  const target = document.querySelector(btn.dataset.moveTo);

  const options = {
    duration: Math.abs(btn.getBoundingClientRect().top - target.getBoundingClientRect().top) / (window.innerHeight * 1.5),
    offset: btn.dataset.offset ? setOffset(btn.dataset.offset) : 0,
  };


  gsap.to(pageScroller === 'body' ? window : pageScroller, options.duration, {
    scrollTo: {
      y: target,
      offsetY: options.offset,
    },
    ease: 'power4.out',
  });
};

export const initScrollTo = () => {
  gsap.registerPlugin(ScrollToPlugin);
  const scrollToButtons = document.querySelectorAll('[data-move-to]');

  scrollToButtons.forEach((btn) => {
    btn.addEventListener('click', scrollToHandler);
  });
};
