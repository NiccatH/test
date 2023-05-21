import {resizeObserver} from '../../utils/observers';
import {ScrollTrigger} from '../../vendor/scroll-trigger.js';

export class ScrollSlider {
  constructor(slider) {
    if (!slider) {
      return;
    }
    this.container = slider;
    this.slides = this.container.querySelectorAll('[data-scroll-slider="slide"]');

    this.slidesCount = this.slides.length;
    this.currentSlide = 0;
    this.timeline = null;
    this.vpTouch = window.matchMedia('(pointer: coarse)');

    this.setSlider = this.setSlider.bind(this);
    this.switchSlide = this.switchSlide.bind(this);

    this.init();
  } //кастом класс конструктор принимает элемент слайдер как параметр и инициализирует свойства и методы относящиеся к нему

  switchSlide(scroll) {
    if (scroll.progress === 0) {
      this.currentSlide = 0;
    } else {
      this.currentSlide = Math.ceil((scroll.progress) / (1 / this.slidesCount)) - 1;
    }
    [...this.slides].map((slide) => slide.classList.remove('is-active'));
    this.slides[this.currentSlide].classList.add('is-active');
  } //метод вызывается каждый раз , когда изменяется позиция скролла. Он высчитывает текущий слайд основываясь на скролл прогрессе и обновляет актив класс на текущем слайде снимая с других актив.

  updateHeight() {
    this.height = this.slidesCount * window.innerHeight;
    this.container.style.minHeight = this.height + 'px';
  } // метод умножает высоюту вьюпорта на количество слайдов и вешает на контейнер минимальню высоту в пискселях основываясь на этих данных

  setSlider() {
    this.updateHeight();  //апдейт высоты контейнера

    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    } //проверка на существование сущности таймлайна для контейнера , если есть чистит

    this.timeline = gsap.timeline();
    ScrollTrigger.create({
      scroller: this.vpTouch.matches ? '.wrapper' : 'body', //контейнер скролла
      trigger: this.container,  //на ком запускается анимация
      start: 'top top',  //верх контейнера и верх вьюпорта
      end: 'bottom bottom',  //низ контейнера и низ вьюпорта
      scrub: true,  //плавность
      onUpdate: this.switchSlide,  //при обновлении скоролла запускается функция смены слайдов
      animation: this.timeline,
    });
  } //инициализирует слайдер

  init() {
    this.setSlider();
    resizeObserver.subscribe(this.setSlider); //привязываем сет к ресайзу , что б если высота слайдов менялась , а у нас она по высоте вьюпорта корректно перелистывались слайды
  } //вызывается во время инициализации класса слайдера
}
