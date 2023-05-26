import {initMapPane} from "./init-map-pane";
import {initSimplePins} from "./init-simple-pins";
import {initCheSlov} from "./init-map-zones-fill";

const initMap6 = (mapBlock) => {
  const center = mapBlock.dataset.center.split(', ').map((str) => +str);
  const zoom = +mapBlock.dataset.zoom;
  const controls = mapBlock.dataset.controls ? mapBlock.dataset.controls.split(' ') : [];
  const behaviorsMap = ['drag', 'multiTouch'];
  const markers = [
    {
      coordinates: [50.0755, 14.4378],
      hintContent: 'Prague',
    },
    {
      coordinates: [48.1486, 17.1077],
      hintContent: 'Bratislava',
    }
  ];
  const newArr = [
    {decorOptions: {
      fillColor: 'rgba(255, 255, 255, 0)',
      fillOpacity: 0,
      strokeColor: '#ff0000',
      strokeOpacity: 1,
      strokeWidth: 5,
    }},
    {decorOptions: {
      fillColor: '#aaf0d1',
      fillOpacity: 1,
      strokeWidth: 0,
      strokeOpacity: 0,
      strokeColor: 'rgba(255, 255, 255, 1)',
    }}
  ];

  window.ymaps.ready(() => {
    const myMap = new ymaps.Map(mapBlock, {
      center,
      zoom,
      controls,
      type: null,
      behaviors: behaviorsMap,
    }, {
      autoFitToViewport: 'always',
    });

    initSimplePins(markers, myMap);
    initMapPane('#808080', myMap);

    ymaps.borders.load('001', {
      lang: 'ru',
      quality: 2,
    }).then(function (result) {
      const customGeometry = [];
      const customProperties = {
        iso3166: 'CZ+SK',
        name: 'Custom Country',
      };

      result.features.forEach(function (feature) {
        if (feature.properties.iso3166 === 'CZ' || feature.properties.iso3166 === 'SK') {
          customGeometry.push(...feature.geometry.coordinates);
        }
      });
      initCheSlov(newArr, myMap, customGeometry, customProperties);
    });
  });
};

export {initMap6};
