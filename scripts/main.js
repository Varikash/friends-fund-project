const menuIcon = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.popup-menu-1__close-btn');
const popupOne = document.querySelector('.popup-menu-1');
const mediaSize = document.body.clientWidth;

menuIcon?.addEventListener('click', () => {
  burgerMenuOpen(popupOne);
})

closeBtn?.addEventListener('click', () => {
  burgerMenuClose(popupOne);
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 1049) {
    burgerMenuClose(popupOne);
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



