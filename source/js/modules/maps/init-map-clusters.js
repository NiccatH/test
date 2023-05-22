const initClustersPins = (mapBlock, ymap) => {
  const pinsArray = [];  //  заводим пустой массив
  ymap.geoObjects.each(function (geoObject) {
    const pinType = geoObject.options.get('placemarkType');
    if (pinType !== 'mainPin') {
      pinsArray.push(geoObject);
    }
  });  //проходимся по всем пинам и получаем значение плейсмаркТайп, если оно не равно динозавру пушим обьект пина в массив, те мы исключаем мейн пин

  const customItemContentLayout = ymaps.templateLayoutFactory.createClass(
      `<div class="cluster-balloon">
          <div class="cluster-balloon__image">
            <img src="$[properties.imagePath]" width="101" height="94" alt="$[properties.imageAlt]">
          </div>
          <div class="cluster-balloon__wrap">
            <p class="cluster-balloon__head">$[properties.textHead]</p>
            <p class="cluster-balloon__title">$[properties.title]</p>
            <p class="cluster-balloon__text {% if properties.textLeft %} cluster-balloon__text--right-text {% endif %}">
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
        </div>`
  ); //темплейт контента слайда

  const clusterer = new ymaps.Clusterer({
    gridSize: 12800,  //размер сетки для кластеринга(объединение нескольких элементов в кластер)
    preset: 'islands#brownClusterIcons',  //стиль кружочка кластера
    hasBalloon: true,  //включаем балуны для кластеров
    clusterDisableClickZoom: true,  //отключаем зум к месту при клике на кластер

    clusterOpenBalloonOnClick: true,  //включаем появление балуна при нажатии на кластер
    clusterBalloonContentLayout: 'cluster#balloonCarousel',  // Устанавливаем стандартный макет балуна кластера "Карусель".
    clusterBalloonItemContentLayout: customItemContentLayout,  // Устанавливаем контент слайда
    clusterBalloonPanelMaxMapArea: 0, //убирает максимальный лимит занятия балуном карты
    clusterBalloonContentLayoutWidth: 300,  //ширина контента слайда
    clusterBalloonContentLayoutHeight: 180,  //высота контента слайда
    clusterBalloonPagerSize: 5,  //макс количество сладов в балуне
    clusterBalloonPagerType: 'number',  //пагинация
  });

  clusterer.add(pinsArray);  //передаем массив пинов в кластер
  ymap.geoObjects.add(clusterer);  //добавляем кластеры

  ymap.setBounds(clusterer.getBounds(), {
    checkZoomRange: true,
  });  //установка границ для корректного отображения кластеров при зуме
};

export {initClustersPins};
