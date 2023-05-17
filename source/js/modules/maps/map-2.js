import {initMapPin} from './init-map-pin.js';
import {initCategoryPins} from './init-map-pins.js';

const initMap2 = (mapBlock) => {
  const center = mapBlock.dataset.center.split(', ').map((str) => +str);
  const zoom = +mapBlock.dataset.zoom;
  const controls = mapBlock.dataset.controls ? mapBlock.dataset.controls.split(' ') : [];
  const behaviorsMap = ['drag', 'multiTouch'];

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

    initMapPin(mapBlock, myMap, 'small');
    initCategoryPins(mapBlock, myMap);
  });
};

export {initMap2};
