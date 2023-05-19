import {clickObserver} from '../../utils/observers.js';
import {keyObserver} from '../../utils/observers.js';

let isMenuOpen = false; //Создаем переменную с дефолтным значением

const menuElements = {
  header: document.querySelector('.header'),  //константа хэдера
  menuToggle: document.querySelector('[data-menu="toggle"]'),  //константа бургер кнопки
  menuNav: document.querySelector('[data-menu="nav"]'),  //константа навигации
};

const closeMenu = () => {
  menuElements.menuNav.classList.remove('is-active');  //снятие класса
  menuElements.menuToggle.classList.remove('is-active');  //снятие класса
  menuElements.header.classList.remove('menu-opened');  //снятие класса
  window.scrollLock.enableScrolling(); //включает скроллинг страницы
  isMenuOpen = false;  //задает значение для переменной isMenuOpen
  keyObserver.unsubscribe(escKeyHandler);  //убирает из массива обсерверс ки обсервера функцию
};  //функция закрытия меню

const openMenu = () => {
  menuElements.menuNav.classList.add('is-active'); //добавление класса
  menuElements.menuToggle.classList.add('is-active'); //добавление класса
  menuElements.header.classList.add('menu-opened'); //добавление класса
  window.scrollLock.disableScrolling(); //выключает скроллинг страницы
  isMenuOpen = true;  //задает значение для переменной isMenuOpen
  keyObserver.subscribe(escKeyHandler);  //добавляет в массив обсерверс ки обсервера функцию
};  //функция открытия меню

const escKeyHandler = (evt) => {
  if (evt.key === 'Escape') {
    closeMenu();
  }
};  //хэндлер нажатия на esc

const toggleMenu = (evt) => {
  const target = evt.target; //цель клика
  const menuToggle = target.closest('[data-menu="toggle"]'); //получаем бургер как цель клика

  if (!menuToggle || !menuElements.menuNav) {
    return;
  }  // еслин на странице нет бургер кнопки и нет навигации останавливаем дальнешие выполнение

  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }  //если наша дефолтная переменная имеет значение true запускается функция closeMenu() , иначе openMenu()
}; //функция переключения двух состояний меню

export const initToggleMenu = () => {
  if (!menuElements.menuNav || !menuElements.menuToggle) {
    return;
  }  //если на странице нет навигации или бургер кнопки, остановить функцию

  clickObserver.subscribe(toggleMenu); //добавление в массив обсерверс клик обсервера функцию
};
