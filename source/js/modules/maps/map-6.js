const initMap6 = (mapBlock) => {
  // const center = mapBlock.dataset.center.split(', ').map((str) => +str);
  // const zoom = +mapBlock.dataset.zoom;
  const controls = mapBlock.dataset.controls ? mapBlock.dataset.controls.split(' ') : [];
  // const behaviorsMap = ['drag', 'multiTouch'];  //включает мультитач и перемещалку(перетаскивание)

  window.ymaps.ready(() => {
    const myMap = new ymaps.Map(mapBlock, {
      center: [49.5, 18.5],
      zoom: 7,
      controls,
      type: 'yandex#map',
    }, {
      autoFitToViewport: 'always',
    });

    const pragueMarker = new ymaps.Placemark([50.0755, 14.4378], {
      hintContent: 'Prague',
    });

    const bratislavaMarker = new ymaps.Placemark([48.1486, 17.1077], {
      hintContent: 'Bratislava',
    });

    myMap.geoObjects.add(pragueMarker);
    myMap.geoObjects.add(bratislavaMarker);

    const pane = new ymaps.pane.StaticPane(myMap, {
      zIndex: 100,
      css: {
        width: '100%',
        height: '100%',
        backgroundColor: '#808080',
      },
    });

    // myMap.panes.append('white', pane);

    ymaps.borders.load('001', {
      lang: 'ru',
      quality: 2,
    }).then(function (result) {
      const czFeature = result.features.find(function (feature) {
        return feature.properties.iso3166 === 'CZ';
      });

      console.log(czFeature);

      const czGeometry = czFeature.geometry.coordinates;
      const czProperties = czFeature.properties;

      czGeometry.forEach(function (regionGeometry) {
        // Create a GeoObject for each region of the Czech Republic
        const regionGeoObject = new ymaps.GeoObject({
          geometry: {
            type: 'Polygon',
            coordinates: regionGeometry,
          },
          properties: czProperties,
        }, {
          fillColor: 'rgba(128, 128, 128, 0.5)',
          strokeColor: '#ff0000',
          strokeWidth: 2,
        });

        // Add the region GeoObject to the map
        myMap.geoObjects.add(regionGeoObject);
      });
    });
  });
};

export {initMap6};
