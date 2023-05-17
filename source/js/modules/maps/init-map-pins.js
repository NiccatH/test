import {fetchApi} from '../../utils/fetch.js';
import {initClustersPins} from './init-map-clusters.js';

const initCategoryPins = (mapBlock, ymap) => {
  const requestURL = mapBlock.dataset.markersUrl;

  const renderPins = (data) => {
    // Создаём макет содержимого.
    // eslint-disable-next-line no-undef
    let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        `<div class="placemark" data-placemark tabindex="0" data-map-marker="$[properties.category]">
            <div class="placemark__inner">
              <div class="placemark__icon">
                <svg width="40" height="40" aria-hidden="true">
                  <use xlink:href="#$[properties.icon]"></use>
                </svg>
              </div>
            </div>
          </div>`
    );

    // eslint-disable-next-line no-undef
    let MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        `<div class="placemark-balloon">
          $[[options.contentLayout]]
        </div>`
        , {
          build() {
            this.constructor.superclass.build.call(this);
            this._$parent = this.getParentElement();
            this._$element = this._$parent.querySelector('.placemark-balloon');

            this._$closeBtn = this._$element.querySelector('.placemark-balloon__close-btn');
            this.closeBtnCallback = window.ymaps.util.bind(this.onCloseClick, this);

            this._$closeBtn.addEventListener('click', this.closeBtnCallback);
            mapBlock.addEventListener('closeBalloon', this.closeBtnCallback);
          },
          onCloseClick(evt) {
            evt.preventDefault();
            ymap.balloon.close();
          },
        });

    // eslint-disable-next-line no-undef
    let MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        `<div class="placemark-balloon__inner">
          {% if properties.imagePath %}
            <div class="placemark-balloon__image">
              <img src="$[properties.imagePath]" width="101" height="94" alt="$[properties.imageAlt]">
            </div>
          {% endif %}
          <div class="placemark-balloon__wrap">
            <p class="placemark-balloon__head">$[properties.textHead]</p>
            <p class="placemark-balloon__title">$[properties.title]</p>
            <p class="placemark-balloon__text {% if properties.textLeft %} placemark-balloon__text--right-text {% endif %}">
              {% if properties.text %}
                {% if properties.linkHref %}
                  <a href="$[properties.linkHref]">$[properties.text]</a>
                {% else %}
                  <span>$[properties.text]</span>
                {% endif %}
              {% endif %}
              {% if properties.textRight %}
                <span class="right">$[properties.textRight]</span>
              {% endif %}
            </p>
          </div>
          <button class="placemark-balloon__close-btn" type="button">
            <svg width="12" height="12" aria-hidden="true">
              <use xlink:href="#icon-close"></use>
            </svg>
          </button>
        </div>`
    );

    data.forEach((obj) => {
      // eslint-disable-next-line no-undef
      let markers = new ymaps.Placemark(obj.latLng,
          {
            textHead: obj.textHead,
            title: obj.title,
            text: obj.text,
            textRight: obj.textRight,
            linkHref: obj.linkHref,
            imagePath: obj.imagePath,
            imageAlt: obj.imageAlt,
            category: obj.category,
            icon: obj.icon,
          },
          {
          // Опции.
          // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: '',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно`
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            // iconContentOffset: [15, 15],

            // Макет содержимого.
            placemarkType: obj.category,
            iconContentLayout: MyIconContentLayout,
            balloonLayout: MyBalloonLayout,
            balloonContentLayout: MyBalloonContentLayout,
            balloonPanelMaxMapArea: 0,
            // Не скрываем иконку при открытом балуне.
            hideIconOnBalloonOpen: false,
            balloonOffset: [0, -126],
          }
      );

      ymap.geoObjects.add(markers);
    });

    if (mapBlock.dataset.cluster) {
      initClustersPins(mapBlock, ymap);
    }
  };

  const onSuccess = (data) => {
    const mapMarkers = data.mapMarkers;
    renderPins(mapMarkers);
  };

  fetchApi(requestURL, onSuccess);
};

export {initCategoryPins};
