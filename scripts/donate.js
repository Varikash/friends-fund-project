const contactForm = document.querySelector('.contact');

const userName = document?.querySelector('.contact__user-name');
const userEmail = document?.querySelector('.contact__user-email');
const userMessage = document?.querySelector('.contact__user-message');
const userAgreement = document?.querySelector('.contact__check-user-agreement');

const menuIcon = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.popup-menu-1__close-btn');
const backwardBtn = document.querySelector('.popup-menu-2__backward');
const secondLevelPopupOpener = document.querySelector('#secondLevel');
const popupOne = document.querySelector('.popup-menu-1');
const popupTwo = document.querySelector('.popup-menu-2');


menuIcon?.addEventListener('click', () => {
  burgerMenuOpen(popupOne);
})

closeBtn?.addEventListener('click', () => {
  burgerMenuClose(popupOne);
})

secondLevelPopupOpener?.addEventListener('click', () => {
  burgerMenuOpen(popupTwo);
})

backwardBtn?.addEventListener('click', () => {
  burgerMenuClose(popupTwo);
  burgerMenuOpen(popupOne);
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 1049) {
    burgerMenuClose(popupOne);
    burgerMenuClose(popupTwo);
  }
});

const buttonContact = document?.querySelector('.contact__form-btn');

function changingButtonContactState () {
  if (userName?.value.length != 0 && userEmail?.value.length != 0 && userMessage?.value.length != 0 && userAgreement?.checked == true) {
    buttonContact?.classList.add('contact__form-btn_active');
  } else {
    buttonContact?.classList.remove('contact__form-btn_active');
  }
};

contactForm?.addEventListener('mouseover', function () {
  changingButtonContactState ()
});

contactForm?.addEventListener('keyup', function () {
  changingButtonContactState ()
});

contactForm?.addEventListener('click', function () {
  changingButtonContactState ()
});

contactForm?.addEventListener('compositionend', function () {
  changingButtonContactState ()
});


/* ----------------------------Функции----------------------------------- */

/**
 * Открытие бургерного меню
 */
function burgerMenuOpen (popupElement) {
  popupElement.classList.add('popup_active');
}

/**
 * Закрытие бургерного меню
 */
function burgerMenuClose (popupElement) {
  popupElement.classList.remove('popup_active');
}