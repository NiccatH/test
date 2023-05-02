export const setHeaderHeight = () => {
  const header = document.querySelector('.header');
  if (!header) {
    return;
  }

  const headerRect = header.getBoundingClientRect();
  document.documentElement.style.setProperty('--header-height', headerRect.height + 'px');
};
