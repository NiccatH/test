// ---
// generateTimeline module
// создает анимации по скроллу с помощью дата атрибута
const vpTouch = window.matchMedia('(pointer: coarse)');

const getObjectFromString = (str) => {
  const output = {};

  if (str.includes('clipPath')) {
    const clipPathMatch = str.match(/clipPath: \((.*?)\)/);
    if (clipPathMatch) {
      output.clipPath = `(${clipPathMatch[1].trim()})`;
      str = str.replace(clipPathMatch[0], '');
    }
  } // добавляет в аутпут ключ clipPath и его значение + удаляет из передаваемой строки clipPath

  const properties = str.split(',') //оставшуюся строку преобразует в массив деля по запятой
  properties.forEach((property) => {
    const [key, value] = property.split(':').map((item) => item.trim());
    if (key && value) {
      output[key] = isNaN(Number(value)) ? value : Number(value);
    }
  });  //проходися по массиву и каждый элемент с помощью деструкции преобразуем в пару ключ значение , если значение число , делаем числом иначе строка

  return output;
};  //функция принимает строку парметр и конвертирует ее в объект джава скрипта

function getAnimationObject(el) {
  const obj = {};
  obj.direction = el.dataset.animationDirection;
  obj.duration = +el.dataset.animationDuration || 1;
  obj.delay = +el.dataset.animationDelay || 0;
  obj.position = el.dataset.position;
  obj.element = el;
  obj.animation = getObjectFromString(el.dataset.animation.toString());
  return obj;
}  //возвращает обьект настроек для анимаций из дата атрибьюта элемента

const generateTimeline = () => {
  const sections = document.querySelectorAll('[data-section-animation]') //ищем и записываем в констунту все элементы с соответствующем дата атрибьютом
  sections.forEach((section) => {
    const blocks = gsap.utils.toArray(section.querySelectorAll("[data-animation]")).sort((a, b) => {
      const aIndex = +a.dataset.index || 1;
      const bIndex = +b.dataset.index || 1;
      return aIndex - bIndex;
    });  //сортирует анимируемые блоки внутри родителей

    const tl = window.gsap.timeline({
      scrollTrigger: {
        scroller: vpTouch.matches ? '.wrapper' : 'body',  //контейнер скролла
        trigger: section,  //элемент на котором отрабатывают анимации
        start: section.dataset.start,  //берем начало анимации из дата атрибьюта
        end: section.dataset.end,   //берем конец анимации из дата атрибьюта
        scrub: section.dataset.scrub ? Number(section.dataset.scrub) : 1, ////анимация апдейтится в реальном времени по скролу , более плавно выглядит
      }
    }); //создаем кастомный таймлайн

    blocks.forEach(block => {
      const obj = getAnimationObject(block);
      if (obj.position) {
        tl[obj.direction](obj.element, {duration: obj.duration, delay: obj.delay, ...obj.animation}, obj.position);
      } else {
        tl[obj.direction](obj.element, {duration: obj.duration, delay: obj.delay, ...obj.animation});
      }
    }); //для каждого блока полученного через гсап утилс ту аррэй мы устанавливаем параметры анимации обращаясь к созданному таймлайну, сами настрой мы получем из дата атр анимируемового блока использую функцию getAnimationObject()
  });
};

export {generateTimeline};
