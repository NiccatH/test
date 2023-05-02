import LocomotiveScroll from '../../vendor/locomotive-scroll.js';

let locomotive;
const vp1023 = window.matchMedia('(max-width: 1023px)');
const vpTouch = window.matchMedia('(pointer: coarse)');
const locomotiveScroller = document.querySelector('[data-scroll-container]');
const nativeScroller = document.querySelector('body');
const pageScroller = () => vp1023.matches || vpTouch.matches ? nativeScroller : locomotiveScroller;

const resizeLocomotiveHandle = () => {
  if (document.documentElement.classList.contains('has-scroll-smooth') && !vpTouch.matches) {
    locomotive.update(); // если не тач и локо инициализирован, то обновляем локомотив
    return;
  } else if (document.documentElement.classList.contains('has-scroll-smooth') && (vpTouch.matches || vp1023.matches)) {
    locomotive.destroy(); // если мобилка или тач устройство и локо инициализирован - уничтожаем локомотив
    // eslint-disable-next-line no-undef
    gsap.set('.wrapper', {transform: 'none', duration: 0}); // обнуляем трансформ локомотива
    return;
  } else if (!document.documentElement.classList.contains('has-scroll-smooth') && (vp1023.matches || vpTouch.matches)) {
    return; // если мобилка или тач устройство и локо НЕ инициализирован
  }

  // главная переменная в этом файле. из неё можно получить все методы скролла для анимаций и любых других манипуляций
  locomotive = new LocomotiveScroll({
    el: locomotiveScroller,
    smooth: true,
    lerp: 0.05,
    getDirection: true,
    tablet: {
      breakpoint: 1023,
    },
  });
};

const initLocomotiveScroll = () => {
  if (!locomotiveScroller) {
    return;
  }

  resizeLocomotiveHandle(); // ресайз не всегда срабатывает при инициализации, поэтому дублируем
  const resizeObserver = new ResizeObserver(() => {
    // обновляем скролл по ресайзу
    resizeLocomotiveHandle();
  });

  resizeObserver.observe(document.documentElement);
};

export {initLocomotiveScroll, locomotive, pageScroller};
