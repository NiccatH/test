import {initMapPin} from './init-map-pin.js';
import {initCategoryPins} from './init-map-pins.js';
import {initZoomMap} from './init-map-zoom.js';

const initMap4 = (mapBlock) => {
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
    initCategoryPins(mapBlock, myMap);  //отрисовка пинов категории, кластеры зашиты внуть при условии что мэмблок будет иметь дата атр кластер
    initZoomMap(myMap);  //инициализации зума
  });
};

export {initMap4};
