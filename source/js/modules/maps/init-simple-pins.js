const initSimplePins = (pins, map) => {
  const addMarker = (coordinates, hintContent) => {
    const marker = new ymaps.Placemark(coordinates, {
      hintContent,
    });
    map.geoObjects.add(marker);
  };
  pins.forEach((pin) => {
    addMarker(pin.coordinates, pin.hintContent);
  });
};

export {initSimplePins};
