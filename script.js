'use strict';
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(btn =>
  btn.addEventListener('click', openModalWindow)
);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});
// ................
const btnScrolTo = document.querySelector('.btn--scroll-to'); //Дізнатися більше ↓
const section1 = document.querySelector('#section--1');

btnScrolTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});
// ///////////////////////
const curDate = new Date();
const year = curDate.getFullYear();
 
/////////
const mainImg = document.querySelector('.header__img');

const scaleUp = function () {
  mainImg.style.transform = 'scale(1.3)';
};

const scaleDown = function () {
  mainImg.style.transform = 'scale(1)';
};₴

mainImg.addEventListener('mouseenter', scaleUp);
mainImg.addEventListener('mouseleave', scaleDown);
//////////
const navLogo = document.querySelector('.nav__logo');
navLogo.addEventListener('click', function () {
  document.documentElement.scrollIntoView({ behavior: 'smooth' });
});
///////////////////
const yslygi = document.querySelector('.nav__link');
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const hreg = e.target.getAttribute('href');
    document.querySelector(hreg).scrollIntoView({ behavior: 'smooth' });
  }
});
// ..............
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clickedBtn = e.target.closest('.operations__tab');

  if (!clickedBtn) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedBtn.classList.add('operations__tab--active');
  tabContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedBtn.dataset.tab}`)
    .classList.add('operations__content--active');
});

const nav = document.querySelector('.nav');
const navLinksHoverAnima = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLinks = linkOver
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(el => {
      if (el !== linkOver) el.style.opacity = this;
    });
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};
nav.addEventListener('mouseover', navLinksHoverAnima.bind(0.4));
nav.addEventListener('mouseout', navLinksHoverAnima.bind(1));
// ............
const s1coords = section1.getBoundingClientRect();
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const getStikyNav = function (entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerobserver = new IntersectionObserver(getStikyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerobserver.observe(header);
// ...............
const allSections = document.querySelectorAll('.section');
const apperSection = function (entri, observer) {
  const enry = entri[0];
  if (!enry.isIntersecting) return;
  enry.target.classList.remove('section--hidden');
  observer.unobserve(enry.target);
};
const sectionsObserver = new IntersectionObserver(apperSection, {
  root: null,
  threshold: 0.1,
});
allSections.forEach(function (section) {
  sectionsObserver.observe(section);
  section.classList.add('section--hidden');
});
// ............
const lazyImg = document.querySelectorAll('img[data-src]');
const loadImg = function (entri, observer) {
  const enry = entri[0];

  if (!enry.isIntersecting) return;
  enry.target.src = enry.target.dataset.src;
  enry.target.addEventListener('load', function () {
    enry.target.classList.remove('lazy-img');
  });

  observer.unobserve(enry.target);
};
const lazyImgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.6,
});
lazyImg.forEach(image => lazyImgObserver.observe(image));
// .........
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let curSlide = 0;
const slideNum = slides.length;
const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};
createDots();

const activateCurrentDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activateCurrentDot(0);

const moveToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};
moveToSlide(0);

const nextSlide = function () {
  if (curSlide === slideNum - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  moveToSlide(curSlide);
  activateCurrentDot(curSlide);
};
const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = slideNum - 1;
  } else {
    curSlide--;
  }
  moveToSlide(curSlide);
  activateCurrentDot(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
});
