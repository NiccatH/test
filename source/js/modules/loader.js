import {ScrollLock} from '../utils/scroll-lock';

export class Loader {
  constructor() {
    this.container = document.querySelector('[data-loader="container"]');
    if (!this.container) {
      return;
    }
    this.box = this.container.querySelector('[data-loader="box"]');
    this.animateIntro = document.querySelector('[data-animate="intro"]');

    this.scrollLock = new ScrollLock();
    this.event = new Event('loaderOff');

    this.off = this.off.bind(this);
    this.hide = this.hide.bind(this);

    this.init();
  }

  hide() {
    this.hideTimeline = gsap.timeline();
    this.hideTimeline = gsap.fromTo(this.container, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 110%)',
    }, {
      duration: 0.6,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    });
    this.hideTimeline.then(this.off);
  }

  on() {
    window.addEventListener('load', this.hide);
  }

  off() {
    document.querySelector('body').classList.remove('scroll-lock-ios');
    this.container.classList.add('is-hidden');
    window.dispatchEvent(this.event);
    if (this.animateIntro) {
      this.animateIntro.classList.add('is-shown');
    }
  }

  init() {
    document.querySelector('body').classList.add('scroll-lock-ios');
    this.on();
  }
}
