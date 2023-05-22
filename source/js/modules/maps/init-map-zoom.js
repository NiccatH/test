const mediaPoint = matchMedia('(max-width: 767px)');

const initZoomMap = (ymap) => {
  const messageBlock = document.querySelector('.ya-map__message'); //находим блок сообщения

  if (!messageBlock) {
    return;
  } //если нет останавливаем дальнешие действия

  const CTRL_KEY = 'Control';  // кнопка
  const TIMEOUT = 1500;  //значение таймаута
  let isCtrlKeyDown;  //переменная состояния true или false
  let isCtrlMessageVisible;  //переменная состояния true или false

  let timer;

  const showMessageBlock = () => {
    messageBlock.classList.add('is-active');
    isCtrlMessageVisible = true;
    clearTimeout(timer);
    timer = setTimeout(hiddenMessageBlock, TIMEOUT);
  };  //функция отображения сообщения

  const hiddenMessageBlock = () => {
    if (isCtrlMessageVisible) {
      messageBlock.classList.remove('is-active');
      isCtrlMessageVisible = false;
    }
  };  //фунуция скрытия сообщения по таймеру

  const hiddenMessageBlockOnMousedown = () => {
    hiddenMessageBlock();
  };  //хэндлер скрытия сообщения по нажатию мышкой

  const enableScrollMapZoomOnKeydown = (evt) => {
    if (evt.key === CTRL_KEY && !isCtrlKeyDown) {
      isCtrlKeyDown = true;
      ymap.behaviors.enable('scrollZoom');
      // scroll.stop();
      hiddenMessageBlockOnMousedown();
    }
  }; //хэндлер прячет сообщение и позволяет делать зум при зажатом контроле по скроллу

  const disableScrollMapZoomOnKeyup = (evt) => {
    if (evt.key === CTRL_KEY) {
      isCtrlKeyDown = false;
      ymap.behaviors.disable('scrollZoom');
      // scroll.start();
    }
  };  //хэндлер при поднятии клавиши контрола отключает скролл

  const onMapWheel = () => {
    if (!isCtrlKeyDown) {
      showMessageBlock();
    } else {
      hiddenMessageBlock();
    }
  };  //хэндлер по скроллу выоводит сообщение если не зажат контрол

  const breakpointChecker = () => {
    if (!mediaPoint.matches) {  //если десктоп
      document.addEventListener('keydown', enableScrollMapZoomOnKeydown); // при зажатии контрола прячет сообщение и включает скролл
      document.addEventListener('keyup', disableScrollMapZoomOnKeyup);  //при отпускании клавиши контрол отключает зум по скроллу
      messageBlock.addEventListener('mousedown', hiddenMessageBlockOnMousedown);  //при нажатии мышкой на вспывающее сообщение скрывает его
      messageBlock.addEventListener('wheel', onMapWheel);  //по скроллу если контрол зажат скрывает подсказку , если не зажат показывает
      ymap.events.add('wheel', onMapWheel);  //вешаем слушать скролла на яндекс карте
    } else {  //не десктоп
      document.removeEventListener('keydown', enableScrollMapZoomOnKeydown);
      document.removeEventListener('keyup', disableScrollMapZoomOnKeyup);
      messageBlock.removeEventListener('mousedown', hiddenMessageBlockOnMousedown);
      messageBlock.removeEventListener('wheel', onMapWheel);
      ymap.events.remove('wheel', onMapWheel);
    } //убираем все слушатели для мобилки
  };

  breakpointChecker();
  mediaPoint.addListener(breakpointChecker); //следим по соответствию с брейкпоинтом
};

export {initZoomMap};
