const initMapFilter = (mapBlock) => {
  const list = document.querySelector('.map-filter');  //ищем блок филтрации

  const getMapFilter = (element) => {
    let allPins = ymaps.geoQuery(mapBlock.geoObjects);  //ищем пины этой карты
    if (element === 'all') {
      allPins.each(function (pm) {
        pm.options.set('visible', true);
      });
      return;
    }  //если цель нажатия показать все обьекты - то показывает все пины
    const arr = [];
    allPins.each(function (pm) {
      if (pm.options.get('placemarkType') === element) {
        pm.options.set('visible', true);
        arr.push(pm.balloon.isOpen());
      } else {
        pm.options.set('visible', false);
      }  // нажимая на кнопку переключения категорий идет сравнения инпут валью с плейсмарктайп каждого пина , если строго равны - то их отображает , а остальные скрывает
      if (pm.options.get('placemarkType') === 'mainPin') {
        pm.options.set('visible', true);
      }  // условия для того чтобы главный пин с динозавром оставался видимы при переключении категорий
    });
    if (!arr.includes(true)) {
      mapBlock.balloon.close();
    }  // эта проверка добавлена для того чтобы скрывать открытый балун , который не относится к текущей открытой категории , те при переключении между категориями мы скрываем не подходящую под нее всплывашку
  };

  list.addEventListener('change', (evt) => {
    evt.preventDefault(); //предотварщаем дефолтное поведение

    const target = evt.target.value;
    if (!target) {
      return;
    }

    getMapFilter(target);  //запускаем функцию фильтрации
  });  // вешаем слушатель изменение на инпуты
};

export {initMapFilter};
