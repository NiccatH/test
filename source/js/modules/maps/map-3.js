import {initMapPin} from './init-map-pin.js';
import {initCategoryPins} from './init-map-pins.js';
import {initMapFilter} from './init-map-filter.js';
import {initZoomMap} from './init-map-zoom.js';

const initMap3 = (mapBlock) => {
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
    initMapFilter(myMap);
    initZoomMap(myMap);
  });
};

export {initMap3};
