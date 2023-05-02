import {clickObserver} from '../../utils/observers.js';

let isMenuOpen = false;

const closeMenu = () => {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('[data-menu="toggle"]');
  const menuNav = document.querySelector('[data-menu="nav"]');

  menuNav.classList.remove('is-active');
  menuToggle.classList.remove('is-active');
  header.classList.remove('menu-opened');
  window.scrollLock.enableScrolling();
  isMenuOpen = false;
};

const openMenu = () => {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('[data-menu="toggle"]');
  const menuNav = document.querySelector('[data-menu="nav"]');

  menuNav.classList.add('is-active');
  menuToggle.classList.add('is-active');
  header.classList.add('menu-opened');
  window.scrollLock.disableScrolling();
  isMenuOpen = true;
};

const toggleMenu = (evt) => {
  const target = evt.target;
  const menuToggle = target.closest('[data-menu="toggle"]');
  const menuNav = document.querySelector('[data-menu="nav"]');

  if (!menuToggle || !menuNav) {
    return;
  }

  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
};

export const initToggleMenu = () => {
  const menuNav = document.querySelector('[data-menu="nav"]');
  const menuToggle = document.querySelector('[data-menu="toggle"]');

  if (!menuNav || !menuToggle) {
    return;
  }

  clickObserver.subscribe(toggleMenu);
};
