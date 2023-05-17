const mediaPoint = matchMedia('(max-width: 767px)');

const initZoomMap = (ymap) => {
  const messageBlock = document.querySelector('.ya-map__message');

  if (!messageBlock) {
    return;
  }

  const CTRL_KEY = 'Control';
  const TIMEOUT = 1500;
  let isCtrlKeyDown;
  let isCtrlMessageVisible;

  let timer;

  const showMessageBlock = () => {
    messageBlock.classList.add('is-active');
    isCtrlMessageVisible = true;
    clearTimeout(timer);
    timer = setTimeout(hiddenMessageBlock, TIMEOUT);
  };

  const hiddenMessageBlock = () => {
    if (isCtrlMessageVisible) {
      messageBlock.classList.remove('is-active');
      isCtrlMessageVisible = false;
    }
  };

  const hiddenMessageBlockOnMousedown = () => {
    hiddenMessageBlock();
  };

  const enableScrollMapZoomOnKeydown = (evt) => {
    if (evt.key === CTRL_KEY && !isCtrlKeyDown) {
      isCtrlKeyDown = true;
      ymap.behaviors.enable('scrollZoom');
      // scroll.stop();
      hiddenMessageBlockOnMousedown();
    }
  };

  const disableScrollMapZoomOnKeyup = (evt) => {
    if (evt.key === CTRL_KEY) {
      isCtrlKeyDown = false;
      ymap.behaviors.disable('scrollZoom');
      // scroll.start();
    }
  };

  const onMapWheel = () => {
    if (!isCtrlKeyDown) {
      showMessageBlock();
    } else {
      hiddenMessageBlock();
    }
  };

  const breakpointChecker = () => {
    if (!mediaPoint.matches) {
      document.addEventListener('keydown', enableScrollMapZoomOnKeydown);
      document.addEventListener('keyup', disableScrollMapZoomOnKeyup);
      messageBlock.addEventListener('mousedown', hiddenMessageBlockOnMousedown);
      messageBlock.addEventListener('wheel', onMapWheel);
      ymap.events.add('wheel', onMapWheel);
    } else {
      document.removeEventListener('keydown', enableScrollMapZoomOnKeydown);
      document.removeEventListener('keyup', disableScrollMapZoomOnKeyup);
      messageBlock.removeEventListener('mousedown', hiddenMessageBlockOnMousedown);
      messageBlock.removeEventListener('wheel', onMapWheel);
      ymap.events.remove('wheel', onMapWheel);
    }
  };

  breakpointChecker();
  mediaPoint.addListener(breakpointChecker);
};

export {initZoomMap};
