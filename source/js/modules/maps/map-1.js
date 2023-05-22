import {initMapPin} from './init-map-pin.js';

const initMap1 = (mapBlock) => {
  const center = mapBlock.dataset.center.split(', ').map((str) => +str);  //создает массив из строки дата атра
  const zoom = +mapBlock.dataset.zoom;  //значение зум из датасета
  const controls = mapBlock.dataset.controls ? mapBlock.dataset.controls.split(' ') : [];  //опционально создает массив из контролов , если они есть в дата атр
  const behaviorsMap = ['drag', 'multiTouch'];  //включает мультитач и перемещалку(перетаскивание)

  window.ymaps.ready(() => {
    const myMap = new ymaps.Map(mapBlock, {
      center,  //параметр центра координат
      zoom,  //зуум
      controls,  //у нас он будет пустым , тк в дата атр ничего нет
      behaviors: behaviorsMap,  //отвечает за интерактивность
    },
    {
      autoFitToViewport: 'always',  //авторазмерность
    });

    initMapPin(mapBlock, myMap); //отрисовка пина в данном случае не передаем 'small' третьим параметром для отрисовки дефолт пина
  });
};

export {initMap1};
