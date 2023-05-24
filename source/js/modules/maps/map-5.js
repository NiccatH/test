const initMap5 = (mapBlock) => {
  const controls = mapBlock.dataset.controls ? mapBlock.dataset.controls.split(' ') : [];
  const behaviorsMap = ['drag', 'multiTouch'];

  const addMarker = (myMap, coordinates, hintContent) => {
    const marker = new ymaps.Placemark(coordinates, {
      hintContent,
    });
    myMap.geoObjects.add(marker);
  };

  const addGeoObject = (map, sss, aaa) => {
    const geoObject = new ymaps.GeoObject(sss, aaa);
    map.geoObjects.add(geoObject);
  };

  window.ymaps.ready(() => {
    const myMap = new ymaps.Map(mapBlock, {
      center: [49.5, 18.5],
      zoom: 0,
      controls,
      type: 'yandex#map',
    }, {
      autoFitToViewport: 'always',
      restrictMapArea: null,
    });

    addMarker(myMap, [50.0755, 14.4378], 'Prague');
    addMarker(myMap, [48.1486, 17.1077], 'Bratislava');

    ymaps.borders.load('001', {
      lang: 'ru',
      quality: 2,
    }).then((result) => {
      const customGeometry = [];
      const customProperties = {
        iso3166: 'CZ+SK',
        name: 'ChechoSlovakia',
      };

      const cheSlovakiaBorders = [...new Set([...result.features.find((feature) => feature.properties.iso3166 === 'CZ').properties.neighbors, ...result.features.find((feature) => feature.properties.iso3166 === 'SK').properties.neighbors])];

      const cheSlovakiaNeighbours = result.features.filter((feature) => {
        const iso3166 = feature.properties.iso3166;
        return cheSlovakiaBorders.includes(iso3166) && iso3166 !== 'CZ' && iso3166 !== 'SK';
      });

      console.log(cheSlovakiaNeighbours);

      const nearNeigbors = [];
      const outerNeighbors = [];

      cheSlovakiaNeighbours.forEach((feature) => {
        const neighborCountries = feature.properties.neighbors.filter((iso3166) => !cheSlovakiaBorders.includes(iso3166));
        outerNeighbors.push(...neighborCountries);
        nearNeigbors.push(feature.properties.iso3166);
      });

      const uniqueOuterNeigbors = [...new Set(outerNeighbors)];

      uniqueOuterNeigbors.forEach((iso3166) => {
        const neighborFeature = result.features.find((feature) => feature.properties.iso3166 === iso3166);
        const neighborGeometry = {
          type: 'Polygon',
          coordinates: neighborFeature.geometry.coordinates,
        };
        const neighborProperties = {
          iso3166: neighborFeature.properties.iso3166,
          name: neighborFeature.properties.name,
        };
        const neighborOptions = {
          fillColor: '#FAC898',
          fillOpacity: 1,
          strokeColor: '#000000',
          strokeOpacity: 1,
          strokeWidth: 1,
        };
        const sss = {
          geometry: {
            type: 'Polygon',
            coordinates: neighborFeature.geometry.coordinates,
          },
          properties: {
            iso3166: neighborFeature.properties.iso3166,
            name: neighborFeature.properties.name,
          },
        };
        const aaa = {
          fillColor: '#FAC898',
          fillOpacity: 1,
          strokeColor: '#000000',
          strokeOpacity: 1,
          strokeWidth: 1,
        };
        addGeoObject(myMap, sss, aaa);
      });

      nearNeigbors.forEach((iso3166) => {
        const neighborFeature = result.features.find((feature) => feature.properties.iso3166 === iso3166);
        const nearNeighborGeometry = new ymaps.GeoObject({
          geometry: {
            type: 'Polygon',
            coordinates: neighborFeature.geometry.coordinates,
          },
          properties: {
            iso3166: neighborFeature.properties.iso3166,
            name: neighborFeature.properties.name,
          },
        }, {
          fillColor: '#77DD77',
          fillOpacity: 1,
          strokeColor: '#000000',
          strokeOpacity: 1,
          strokeWidth: 1,
        });
        myMap.geoObjects.add(nearNeighborGeometry);
      });

      result.features.forEach((feature) => {
        if (feature.properties.iso3166 === 'CZ' || feature.properties.iso3166 === 'SK') {
          customGeometry.push(...feature.geometry.coordinates);
        } else if (!cheSlovakiaBorders.includes(feature.properties.iso3166) && !uniqueOuterNeigbors.includes(feature.properties.iso3166)) {
          const otherCountryGeometry = new ymaps.GeoObject({
            geometry: {
              type: 'Polygon',
              coordinates: feature.geometry.coordinates,
            },
            properties: {
              iso3166: feature.properties.iso3166,
              name: feature.properties.name,
            },
          }, {
            fillColor: '#8F8F88',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeOpacity: 1,
            strokeWidth: 1,
          });

          myMap.geoObjects.add(otherCountryGeometry);
        }
      });

      const customCountry = new ymaps.GeoObject({
        geometry: {
          type: 'Polygon',
          coordinates: customGeometry,
        },
        properties: customProperties,
      }, {
        fillColor: 'rgba(255, 255, 255, 0)',
        fillOpacity: 0,
        strokeColor: '#96281b',
        strokeOpacity: 1,
        strokeWidth: 1,
      });

      const splitterGeometry = new ymaps.GeoObject({
        geometry: {
          type: 'Polygon',
          coordinates: customGeometry,
        },
        properties: customProperties,
      }, {
        fillColor: '#c23b22',
        fillOpacity: 1,
        strokeWidth: 2,
        strokeColor: '#000000',
      });

      myMap.geoObjects.add(customCountry);
      myMap.geoObjects.add(splitterGeometry);
      myMap.setBounds(customCountry.geometry.getBounds(), {
        checkZoomRange: true,
        zoomMargin: 119,
      });
    });
  });
};

export {initMap5};
