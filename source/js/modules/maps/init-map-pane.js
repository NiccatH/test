const initMapPane = (color, map) => {
  const pane = new ymaps.pane.StaticPane(map, {
    zIndex: 100,
    css: {
      width: '100%',
      height: '100%',
      backgroundColor: color,
    },
  });

  map.panes.append('white', pane);
};

export {initMapPane};
