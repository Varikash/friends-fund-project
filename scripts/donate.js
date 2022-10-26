const contactForm = document.querySelector('.contact');

const userName = document?.querySelector('.contact__user-name');
const userEmail = document?.querySelector('.contact__user-email');
const userMessage = document?.querySelector('.contact__user-message');
const userAgreement = document?.querySelector('#checkbox-user-agreement');

const menuIcon = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.popup-menu-1__close-btn');
const backwardBtn = document.querySelector('.popup-menu-2__backward');
const secondLevelPopupOpener = document.querySelector('#secondLevel');
const popupOne = document.querySelector('.popup-menu-1');
const popupTwo = document.querySelector('.popup-menu-2');

const donationTimeMonthly = document.querySelector('#monthly-donation');
const donationTimeSingle = document.querySelector('#single-donation');
const donationText = document.querySelector('.max-donation__description');
const monthlySum = document.querySelector('.max-donation__fieldset_closed');
const singleSum = document.querySelector('#fieldset-single-sum');
const bankCard = document.querySelector('.max-donation__card-element');
const googlePay = document.querySelector('.donation__item_el_donation-google');
const bankCardVisa = document.querySelector('#bank-card');

const donation5000 = document.querySelector('#sum5000');
const anotherSum = document.querySelector('.donation__field-sum');
const donation10000 = document.querySelector('#sum10000');
const donation50000 = document.querySelector('#sum50000');
const donation10000r = document.querySelector('#sum10000r');
const donation5000r = document.querySelector('#sum5000r');
const donation1000 = document.querySelector('#sum1000');

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


donationTimeMonthly.addEventListener('click', function() {
  openMonthlyForm();
});

donationTimeSingle.addEventListener('click', function() {
  closeMonthlyForm();
});

anotherSum.addEventListener('click',function(e) {
  donation5000.checked = false;
  donation10000.checked = false;
  donation50000.checked = false;
  donation10000r.checked = false;
  donation5000r.checked = false;
  donation1000.checked = false;
});

googlePay.addEventListener('click', function() {
  bankCard.style.display='none';
});

bankCardVisa.addEventListener('click', function() {
  bankCard.style.display='block';
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


function openMonthlyForm() {
  donationText.classList.add('max-donation__description_visibility');
  monthlySum.classList.add('max-donation__description_visibility');
  singleSum.classList.add('max-donation__fieldset_closed');
};

function closeMonthlyForm() {
  donationText.classList.remove('max-donation__description_visibility');
  monthlySum.classList.remove('max-donation__description_visibility');
  singleSum.classList.remove('max-donation__fieldset_closed');
}

