const addGeoObject = (map, paramOptions, decorOptions) => {
  const geoObject = new ymaps.GeoObject(paramOptions, decorOptions);
  map.geoObjects.add(geoObject);
};

const processNeighbor = (iso3166, result, map, decorOptions) => {
  const neighborFeature = result.features.find((feature) => feature.properties.iso3166 === iso3166);
  const paramOptions = {
    geometry: {
      type: 'Polygon',
      coordinates: neighborFeature.geometry.coordinates,
    },
    properties: {
      iso3166: neighborFeature.properties.iso3166,
      name: neighborFeature.properties.name,
    },
  };
  addGeoObject(map, paramOptions, decorOptions);
};

const processZone = (map, coordinates, properties, decorOptions) => {
  const paramOptions = {
    geometry: {
      type: 'Polygon',
      coordinates,
    },
    properties,
  };
  addGeoObject(map, paramOptions, decorOptions);
};

const initCheSlov = (arr, map, coordinates, properties) => {
  arr.forEach((el) => {
    processZone(map, coordinates, properties, el.decorOptions);
  });
};

const processNeighbors = (neighbors, decorOptions, result, map) => {
  neighbors.forEach((iso3166) => {
    processNeighbor(iso3166, result, map, decorOptions);
  });
};

export {processNeighbors, initCheSlov};
