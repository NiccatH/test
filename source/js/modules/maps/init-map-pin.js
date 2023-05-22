let pinSize;  //переменная для записи значения
let offsetPin;  //переменная для записи значения
let pinContentLayout; //переменная для записи значения

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
}; // при вызове записывает параметры в глобальные переменные

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
};  // при вызове записывает параметры в глобальные переменные

const initMapPin = (mapBlock, ymap, pin) => {
  const placeCords = mapBlock.dataset.center.split(',');  //координата пина , совпадает с координатой центра на карте

  switch (pin) {
    case 'small':
      renderSmallPin();
      break;
    default:
      renderDefaultPin();
      break;
  }  //если будет передан pin со значением 'small' отриусует маленькую иконку renderSmallPin , если ничего не передавать то отрисует дефолт renderDefaultPin

  // Блок с меткой
  // eslint-disable-next-line no-undef
  const MyPlacemarkContentLayout = window.ymaps.templateLayoutFactory.createClass(pinContentLayout);  //создает кастомный класс для отрисовки , сам темплейт записан в глобальную переменню после вызова одной из функций рендера пина

  // eslint-disable-next-line no-undef
  const myPlacemark = new window.ymaps.Placemark(placeCords, null, {
    placemarkType: 'mainPin',  //устанавливаем тип пина
    iconLayout: 'default#imageWithContent',  //так как мы используем темплейт , а не просто иконку выбираем данный параметр
    iconImageHref: '', // Прячет стандартую иконку, в темплейте мы используем спрайт
    iconContentSize: pinSize,  //размерность иконки берет из заведенной глобальной переменной , в которую происходит записиь при вызове одного из двух рендеров
    iconContentOffset: offsetPin,  //оффсет пина, все так же как и с параметром выше
    iconContentLayout: MyPlacemarkContentLayout,  //все так же из глобальной переменной
    zIndex: 700,  // устанавливаем з индекс
  });  //создаем кастомный пин с параметрами , null отваечает за геометрию иконки

  ymap.geoObjects.add(myPlacemark);  //добавляем пин к карте
};  //функция принимает блок к которому привязана и берет с нее параметры координат , конст карты и опциональный параметр пин , который будет отвечать за вид иконки

export {initMapPin};
