const vpTouch = window.matchMedia('(pointer: coarse)');

export const pageScroller = vpTouch.matches ? '.wrapper' : 'body';
