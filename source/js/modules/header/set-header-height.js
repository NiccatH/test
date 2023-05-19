export const setHeaderHeight = () => {
  const header = document.querySelector('.header');  //константа хэдера
  if (!header) {
    return;
  }  //если хэдера нет останавливаем выполнение
  const headerRect = header.getBoundingClientRect();  //получаем параметры хэдера
  document.documentElement.style.setProperty('--header-height', headerRect.height + 'px');  //создание css переменной c значением высоты и запись ее на html
};
