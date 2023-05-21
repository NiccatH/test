import {ScrollTrigger} from '../../vendor/scroll-trigger.js';
import {pageScroller} from '../../utils/page-scroller.js';

// const fadeElements = document.querySelectorAll('[data-animate="fade"] [data-animate-item]');
// gsap.set(fadeElements, {autoAlpha: 0});

ScrollTrigger.batch('[data-animate="fade"] [data-animate-item]', {
  onEnter: (batch) => gsap.to(batch, {autoAlpha: 1, duration: 1, stagger: 0.5}), //когда скролим вниз при появление элемента во вьюпорте происходит анимация
  onLeave: (batch) => gsap.to(batch, {autoAlpha: 0, duration: 1, stagger: 0.5}), //когда элеменет пропадает с вьюпорта
  onEnterBack: (batch) => gsap.to(batch, {autoAlpha: 1, duration: 1, stagger: -0.5, delay: 1}), //когда скролим снизу вверх при повялении элемента во вьюпорте
  onLeaveBack: (batch) => gsap.to(batch, {autoAlpha: 0, duration: 1, stagger: -0.5, delay: 0}),  //когда скролим снизу вверх и элемент пропадает из вьюпорта
  start: 'bottom bottom',  //первой значение област анимируемого элемента , второй параметр вьюпорт
  end: 'top top',  //первой значение област анимируемого элемента , второй параметр вьюпорт
  scroller: pageScroller,  //область где происходит скролл
});  //мы вешаем анимацию на все элементы c data-animate="fade", а точнее на ребенка внутри него

// const fadeInElements = document.querySelectorAll('[data-animate="fadeIn"] [data-animate-item]');
// gsap.set(fadeInElements, {autoAlpha: 0, y: '10%'});

ScrollTrigger.batch('[data-animate="fadeIn"] [data-animate-item]', {
  onEnter: (batch) => gsap.to(batch, {autoAlpha: 1, y: 0, duration: 1, stagger: 0.5, delay: 0.5}),
  onLeave: (batch) => gsap.to(batch, {autoAlpha: 0, y: '10%', duration: 1, stagger: 0.5, delay: 0}),
  onEnterBack: (batch) => gsap.to(batch, {autoAlpha: 1, y: 0, duration: 1, stagger: -0.5, delay: 0.5}),
  onLeaveBack: (batch) => gsap.to(batch, {autoAlpha: 0, y: '10%', duration: 1, stagger: -0.5, delay: 0}),
  start: 'bottom bottom',
  end: 'top top',
  scroller: pageScroller,
});  //мы вешаем анимацию на все элементы c data-animate="fadeIn", а точнее на ребенка внутри него

// const fadeScaleElements = document.querySelectorAll('[data-animate="fadeScale"] [data-animate-item]');
// gsap.set(fadeScaleElements, {autoAlpha: 0, scale: 0});

ScrollTrigger.batch('[data-animate="fadeScale"] [data-animate-item]', {
  onEnter: (batch) => gsap.to(batch, {autoAlpha: 1, scale: 1, duration: 1, ease: 'back.out(1.5)', stagger: 0.5, delay: 1}),
  onLeave: (batch) => gsap.to(batch, {autoAlpha: 0, scale: 0, duration: 1, ease: 'back.out(1.5)', stagger: 0.5, delay: 0}),
  onEnterBack: (batch) => gsap.to(batch, {autoAlpha: 1, scale: 1, duration: 1, ease: 'back.out(1.5)', stagger: -0.5, delay: 0}),
  onLeaveBack: (batch) => gsap.to(batch, {autoAlpha: 0, scale: 0, duration: 1, ease: 'back.out(1.5)', stagger: -0.5, delay: 0}),
  start: 'bottom+=57.5 bottom', //увеличиваем боттом на половину высоты элемента как как изначальное его скейл равен 0
  end: 'top top',
  scroller: pageScroller,
});  //мы вешаем анимацию на все элементы c data-animate="fadeScale", а точнее на ребенка внутри него
