import {initMapPin} from './init-map-pin.js';
import {initCategoryPins} from './init-map-pins.js';
import {initMapFilter} from './init-map-filter.js';
import {initZoomMap} from './init-map-zoom.js';

const initMap3 = (mapBlock) => {
  const center = mapBlock.dataset.center.split(', ').map((str) => +str);  //создает массив из строки дата атра
  const zoom = +mapBlock.dataset.zoom;  //значение зум из датасета
  const controls = mapBlock.dataset.controls ? mapBlock.dataset.controls.split(' ') : [];  //опционально создает массив из контролов , если они есть в дата атр
  const behaviorsMap = ['drag', 'multiTouch'];  //включает мультитач и перемещалку(перетаскивание)

  window.ymaps.ready(() => {
    const myMap = new ymaps.Map(mapBlock, {
      center,
      zoom,
      controls,
      behaviors: behaviorsMap,
    },
    {
      autoFitToViewport: 'always',
    });

    initMapPin(mapBlock, myMap, 'small');  //отрисовка пина в данном случае передаем 'small' третьим параметром для отрисовки малого пина
    initCategoryPins(mapBlock, myMap);  //отрисовка категорий
    initMapFilter(myMap);  //инициализирует инпуты фильтрации
    initZoomMap(myMap);  //инизиализирует поведение по зуму для десктопа включает зум по контролу , на мобильном снимает слушаетля на эти события
  });
};

export {initMap3};
