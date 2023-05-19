import {resizeObserver} from '../../utils/observers.js';
import {setHeaderHeight} from './set-header-height.js';
import {initToggleMenu} from './toggle-menu.js';

export const initHeaderModules = () => {
  resizeObserver.subscribe(setHeaderHeight);  //добавляет в массив обсорверс ресайз обсервера функцию
  initToggleMenu();  //инициализация переключения состояний меню
};
