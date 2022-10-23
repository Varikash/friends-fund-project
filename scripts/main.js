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



