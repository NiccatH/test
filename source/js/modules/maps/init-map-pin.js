let pinSize;
let offsetPin;
let pinContentLayout;

const renderDefaultPin = () => {
  pinSize = [90, 108];
  offsetPin = [-45, -120];
  pinContentLayout = `
    <div class="map-pin">
      <div class="map-pin__logo">
        <svg width="90" height="108" aria-hidden="true">
          <use xlink:href="#icon-dino-pin"></use>
        </svg>
      </div>
    </div>
  `;
};

const renderSmallPin = () => {
  pinSize = [50, 60];
  offsetPin = [-25, -75];
  pinContentLayout = `
    <div class="map-pin">
      <div class="map-pin__logo">
        <svg width="50" height="60" aria-hidden="true">
          <use xlink:href="#icon-dino-pin"></use>
        </svg>
      </div>
    </div>
  `;
};

const initMapPin = (mapBlock, ymap, pin) => {
  const placeCords = mapBlock.dataset.center.split(',');

  switch (pin) {
    case 'small':
      renderSmallPin();
      break;
    default:
      renderDefaultPin();
      break;
  }

  // Блок с меткой
  // eslint-disable-next-line no-undef
  const MyPlacemarkContentLayout = window.ymaps.templateLayoutFactory.createClass(pinContentLayout);

  // eslint-disable-next-line no-undef
  const myPlacemark = new window.ymaps.Placemark(placeCords, null, {
    // Опции.
    // Для меток с содержимым
    placemarkType: 'mainPin',
    iconLayout: 'default#imageWithContent',
    // Прячет стандартую иконку
    iconImageHref: '',
    // Размеры метки с содержимым
    iconContentSize: pinSize,
    // Смещение от точки привязки (левого верхнего угла) до ножки
    iconContentOffset: offsetPin,
    iconContentLayout: MyPlacemarkContentLayout,
    zIndex: 700,
  });

  ymap.geoObjects.add(myPlacemark);
};

export {initMapPin};
