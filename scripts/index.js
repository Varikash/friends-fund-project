const menuIcon = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.popup-menu-1__close-btn');
const backwardBtn = document.querySelector('.popup-menu-2__backward');
const secondLevelPopupOpener = document.querySelector('#secondLevel');
const popupOne = document.querySelector('.popup-menu-1');
const popupTwo = document.querySelector('.popup-menu-2');

const donation5000 = document.querySelector('#sum5000');
const anotherSum = document.querySelector('.donation__field-sum');
const donation10000 = document.querySelector('#sum10000');
const donation50000 = document.querySelector('#sum50000');

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


anotherSum.addEventListener('click',function(e) {
    donation5000.checked = false;
    donation10000.checked = false;
    donation50000.checked = false;
});