import {processNeighbors} from './init-map-zones-fill';
import {initSimplePins} from './init-simple-pins';

const initMap5 = (mapBlock) => {
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

  window.ymaps.ready(() => {
    const myMap = new ymaps.Map(mapBlock, {
      center,
      zoom,
      type: 'yandex#map',
      behaviors: behaviorsMap,
      controls,
    }, {
      autoFitToViewport: 'always',
    });

    initSimplePins(markers, myMap);

    ymaps.borders.load('001', {
      lang: 'ru',
      quality: 2,
    }).then((result) => {
      const allCountries = result.features.map((feature) => feature.properties.iso3166);
      const cheSlovAndNearNeigbors = [...new Set([...result.features.find((feature) => feature.properties.iso3166 === 'CZ').properties.neighbors, ...result.features.find((feature) => feature.properties.iso3166 === 'SK').properties.neighbors])];
      const nearNeigbors = [];
      const outerNeighbors = [];
      const cheSlovakiaNeighboursFeatures = result.features.filter((feature) => {
        const iso3166 = feature.properties.iso3166;
        return cheSlovAndNearNeigbors.includes(iso3166) && iso3166 !== 'CZ' && iso3166 !== 'SK';
      });
      cheSlovakiaNeighboursFeatures.forEach((feature) => {
        const neighborCountries = feature.properties.neighbors.filter((iso3166) => !cheSlovAndNearNeigbors.includes(iso3166));
        outerNeighbors.push(...neighborCountries);
        nearNeigbors.push(feature.properties.iso3166);
      });

      const uniqueOuterNeigbors = [...new Set(outerNeighbors)];
      const cheSlovAndAllNeighbors = [...uniqueOuterNeigbors, ...cheSlovAndNearNeigbors];
      const remainingCountries = allCountries.filter((value) => !cheSlovAndAllNeighbors.includes(value)).concat(cheSlovAndAllNeighbors.filter((value) => !allCountries.includes(value)));

      const outerDecor = {
        fillColor: '#fac898',
        fillOpacity: 0.5,
        strokeColor: '#000000',
        strokeOpacity: 1,
        strokeWidth: 2,
      };

      const nearDecor = {
        fillColor: '#77dd77',
        fillOpacity: 0.5,
        strokeColor: '#000000',
        strokeOpacity: 1,
        strokeWidth: 2,
      };

      const remainDecor = {
        fillColor: '#c23b22',
        fillOpacity: 0.5,
        strokeColor: '#000000',
        strokeOpacity: 1,
        strokeWidth: 2,
      };

      processNeighbors(uniqueOuterNeigbors, outerDecor, result, myMap);
      processNeighbors(nearNeigbors, nearDecor, result, myMap);
      processNeighbors(remainingCountries, remainDecor, result, myMap);
    });
  });
};

export {initMap5};
