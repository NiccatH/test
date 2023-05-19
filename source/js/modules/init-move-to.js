import {ScrollToPlugin} from '../vendor/scroll-to-plugin';
import {pageScroller} from '../utils/page-scroller.js';
import {clickObserver} from '../utils/observers';

const scrollToHandler = (evt) => {
  const btn = evt.target.closest('[data-move-to]');  //кнопка которая запускает событие
  if (!btn) {
    return;
  }
  evt.preventDefault();  //отмена дефолтного поведения
  const target = document.querySelector(btn.dataset.moveTo);  //цель куда перемещатся по нажатию на кнопку

  const options = {
    duration: Math.abs(btn.getBoundingClientRect().top - target.getBoundingClientRect().top) / (window.innerHeight * 2),
    offset: 0,
  }; //объект настроек


  gsap.to(pageScroller === 'body' ? window : pageScroller, options.duration, {
    scrollTo: {
      y: target,
      offsetY: options.offset,
    },
    ease: 'power4.out',
  }); //идет выбор к кому привязать анимацию , далее передаем настройки цели и оффсет
};  //хэндлер события нажатия на ссылку

export const initScrollTo = () => {
  gsap.registerPlugin(ScrollToPlugin);  //ругистрируем плагин
  if (!document.querySelector('[data-move-to]')) {
    return;
  }
  clickObserver.subscribe(scrollToHandler);  //добавление в массив обсерверс клик обсервера функцию
}; //инициализация функции
