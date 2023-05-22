import {initMap1} from './map-1.js';
import {initMap2} from './map-2.js';
import {initMap3} from './map-3.js';
import {initMap4} from './map-4.js';

const initDefaultMap = (mapBlock) => {
  // eslint-disable-next-line
  window.ymaps.ready(() => {
    // eslint-disable-next-line
    const myMap = new window.ymaps.Map(mapBlock, {
      center: [55.755819, 37.617644],
      zoom: 15,
      behaviors: ['drag', 'multiTouch'],
    }, {
      suppressMapOpenBlock: true,
      searchControlProvider: 'yandex#search',
    });
  });
};  //инициализация дефолтной карты , в случае если нет значения дата-мэп

const initSetupMap = (mapId, mapBlock) => {
  switch (mapId) {
    case 'map-4':
      initMap4(mapBlock);
      break;
    case 'map-3':
      initMap3(mapBlock);
      break;
    case 'map-2':
      initMap2(mapBlock);
      break;
    case 'map-1':
      initMap1(mapBlock);
      break;
    default:
      initDefaultMap(mapBlock);
  }
};  //отрисовка в зависимости от дата-мэп

const initMaps = () => {
  const mapBlocks = document.querySelectorAll('.ya-map__map');  //ищем все обертки куда добавляется карта

  if (!mapBlocks.length) {
    return;
  }  //останавливаем дальнейшее выполнение если оберток под карты нет

  mapBlocks.forEach((mapBlock) => {
    const mapId = mapBlock.dataset.map;
    initSetupMap(mapId, mapBlock);
  });  //проходимся по всем оберкатм получаем их дата-мэп и на каждой запускаем функцию отрисовки карты
};

export {initMaps};
