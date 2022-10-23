const contactForm = document.querySelector('.contact');

const userName = document?.querySelector('.contact__user-name');
const userEmail = document?.querySelector('.contact__user-email');
const userMessage = document?.querySelector('.contact__user-message');
const userAgreement = document?.querySelector('.contact__check-user-agreement');

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