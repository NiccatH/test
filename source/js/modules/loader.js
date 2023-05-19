import {ScrollLock} from '../utils/scroll-lock';

export class Loader {
  constructor() {
    this.container = document.querySelector('[data-loader="container"]');  //получаем контейнер в переменную
    if (!this.container) {
      return;
    }  //если в дом нет data-loader='container' останавливаем дальнейшие действия
    this.box = this.container.querySelector('[data-loader="box"]');  //получем лоадер бокс внутри контейнера
    this.animateIntro = document.querySelector('[data-animate="intro"]');  //получаем блок интро

    this.scrollLock = new ScrollLock();  //создаем скролл лок
    this.event = new Event('loaderOff');  //назначает новый объект Event с именем события «loaderOff». Это событие будет отправлено позже, чтобы указать, что загрузчик выключен.

    this.off = this.off.bind(this); //функция привязывается к текущему экземпляру класса Loader с помощью метода bind(). Это гарантирует, что ключевое слово this в этой функции относится к экземпляру Loader, даже если оно вызывается из разных контекстов.
    this.hide = this.hide.bind(this);  //функция привязывается к текущему экземпляру класса Loader с помощью метода bind(). Это гарантирует, что ключевое слово this в этой функции относится к экземпляру Loader, даже если оно вызывается из разных контекстов.

    this.init();  //метод инициализации лоадера
  }  // функция вызывается когда сущность лоадера создана

  hide() {
    this.hideTimeline = gsap.timeline(); //создаем gsap.timeline() объект
    this.hideTimeline = gsap.fromTo(this.container, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 110%)',
    }, {
      duration: 0.6,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    });  //указываем анимацию скрытия от изначального состояния до конечного и указываем длительность перехода
    this.hideTimeline.then(this.off);  //после отработки таймлайна вызываем метод off
  }  //метод показывающий анимацию закрытия прелоадера и после запускающий метод off

  on() {
    window.addEventListener('load', this.hide);
  }  // когда весь контент страницы загружен вызывается метод hide

  off() {
    document.querySelector('body').classList.remove('scroll-lock-ios'); //убираем класс с бади
    this.container.classList.add('is-hidden');  //добавляем контейнеру пролоадера класс
    window.dispatchEvent(this.event);  //отправляет событие в общую систему событий
    if (this.animateIntro) {
      this.animateIntro.classList.add('is-shown');
    }  //чекает есть ли на странице блок интро , если да - то добавляет класс
  } //метод полного скрытия прелоадера и запуск анимации интро

  init() {
    this.on();
  }  //инициализация лоадера
}
