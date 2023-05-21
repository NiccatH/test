import {ScrollTrigger} from '../../vendor/scroll-trigger.js';
import {pageScroller} from '../../utils/page-scroller.js';


const vp767 = window.matchMedia('(max-width: 767px)');  //возвращает true или false

const fadeScaleParallax = () => {
  const items = document.querySelectorAll('[data-parallax="fadeScale"]');  //ищем анимируемые элементы
  if (!items.length) {
    return;
  } //если их нет останавливаем дальнейшее выполнение

  items.forEach((item) => {
    const animateContainer = item.querySelector('[data-parallax="item"]');
    gsap.set(animateContainer, {opacity: 0, scale: 0.7}); //устанавливает изначальные свойства
    const tl = gsap.to(animateContainer, {opacity: 1, scale: 1});  //устанавливает финальный свойста
    ScrollTrigger.create({
      trigger: item,  //на ком запускается анимация
      scroller: pageScroller, //контейнер скролла
      start: 'bottom bottom',  //начало анимации нижняя граница элемента + низ вьюпорта
      end: vp767.matches ? 'center center' : 'top center',  //конец анимациии на мобиле центр элемента центр вьюпорта, выше верх элемента центр вьюпорта
      scrub: true,  //анимация апдейтится в реальном времени по скролу , более плавно выглядит
      animation: tl,  //константа анимации , что мы прописали выше
    });
  });
};  //функция добавляет анимации на элементы

const transformYParallax = () => {
  const items = document.querySelectorAll('[data-parallax="transformY"]');  //ищем анимируемые элементы
  if (!items.length) {
    return;
  }  //если их нет останавливаем дальнейшее выполнение

  items.forEach((item) => {
    const animateContainer = item.querySelector('[data-parallax="item"]');
    gsap.set(animateContainer, {y: item.dataset.from ? item.dataset.from : '100%'});  //устанавливает изначальные свойства , если есть дата атрибьют на элементе - то выставит его значение , если нет - то 100%
    const tl = gsap.to(animateContainer, {y: 0});  //устанавливает финальный свойста
    ScrollTrigger.create({
      trigger: item,  //на ком запускается анимация
      scroller: pageScroller,  //контейнер скролла
      start: 'top bottom',   //начало анимации верхняя граница элемента + низ вьюпорта
      end: vp767.matches ? 'center center' : 'top center', //конец анимациии на мобиле центр элемента центр вьюпорта, выше верх элемента центр вьюпорта
      scrub: true,  //анимация апдейтится в реальном времени по скролу , более плавно выглядит
      animation: tl,  //константа анимации , что мы прописали выше
    });
  });
};

export const initParallaxComponents = () => {
  fadeScaleParallax();
  transformYParallax();
};
