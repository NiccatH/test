import {ScrollTrigger} from '../../vendor/scroll-trigger.js';
import {locomotive, pageScroller} from './init-locomotive.js';
let scrollTrigger;
window.gsap.registerPlugin(ScrollTrigger);

const setScrollTrigger = () => {
  if (!locomotive || !document.documentElement.classList.contains('has-scroll-smooth')) {
    ScrollTrigger.scrollerProxy(document.body);
    scrollTrigger = ScrollTrigger;
    return;
  }


  // при каждом обновлении локомотив будет дергать ScrollTrigger (синхронизируем их)
  locomotive.on('scroll', ScrollTrigger.update);

  // через scrollerProxy просим ScrollTrigger использовать ивенты локомотива вместо ивентов скролла js, пока локомотив работает
  ScrollTrigger.scrollerProxy(pageScroller(), {
    scrollTop(value) {
      return arguments.length ? locomotive.scrollTo(value, 0, 0) : locomotive.scroll.instance.scroll.y;
    }, // настраиваем только по оси Y для вертикального скролла
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // хак для локомотива
    pinType: pageScroller().style.transform ? 'transform' : 'fixed',
  });

  // связываем локомотив и скроллтригер
  ScrollTrigger.addEventListener('refresh', () => locomotive.update());
  ScrollTrigger.defaults({scroller: pageScroller()});

  window.addEventListener('scrolltrigger.update', () => {
    ScrollTrigger.refresh();
  });

  scrollTrigger = ScrollTrigger;
};

const initScrollTrigger = () => {
  setScrollTrigger();
  const resizeObserver = new ResizeObserver(() => {
    setScrollTrigger();
  });

  resizeObserver.observe(document.documentElement);
};

export {initScrollTrigger, scrollTrigger};

