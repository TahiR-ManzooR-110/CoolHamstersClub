'use strict';

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});


const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElementOnScroll = function () {
  if (window.scrollY > 200) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);


const sliders = document.querySelectorAll("[data-slider]");

const sliderInit = function (currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  const totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-item"));
  const totalSliderItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSliderItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);


  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSliderItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSliderItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.setAttribute("disabled", "");
    sliderPrevBtn.setAttribute("disabled", "");
  }

  let autoSlideInterval;

  const startAutoSlide = () => autoSlideInterval = setInterval(slideNext, 3000);
  startAutoSlide();
  const stopAutoSlide = () => clearInterval(autoSlideInterval);

  currentSlider.addEventListener("mouseover", stopAutoSlide);

  currentSlider.addEventListener("mouseout", startAutoSlide);

  window.addEventListener("resize", moveSliderItem);

}

for (let i = 0, len = sliders.length; i < len; i++) { sliderInit(sliders[i]); }

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion;

const accordionInit = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  accordionBtn.addEventListener("click", function () {

    if (currentAccordion.classList.contains("active")) {
      currentAccordion.classList.toggle("active");
    } else {
      if (lastActiveAccordion) lastActiveAccordion.classList.remove("active");
      currentAccordion.classList.add("active");
    }

    lastActiveAccordion = currentAccordion;

  });

}

for (let i = 0, len = accordions.length; i < len; i++) { accordionInit(accordions[i]); }

/***************POP UP******************/
// const popup = document.querySelector('.popup');
// const x = document.querySelector('.popup-content h1')

// window.addEventListener('load', () => {
//   popup.classList.add('showPopup');
//   popup.childNodes[1].classList.add('showPopup');
// })
// x.addEventListener('click', () => {
//   popup.classList.remove('showPopup');
//   popup.childNodes[1].classList.remove('showPopup');
// })
/*****************************************************/
// const popup = document.querySelector('.popup');
// const popupContent = document.querySelector('.popup-content');
// const x = document.querySelector('.popup-content h1');
// const popupSound = document.getElementById('popup-sound');
// const hasPopupShown = sessionStorage.getItem('popupShown');

// if (!hasPopupShown) {
//   popup.classList.add('showPopup');
//   popupContent.classList.remove('hidden');
//   sessionStorage.setItem('popupShown', true);
//   popupSound.play();
// }
// x.addEventListener('click', () => {
//   popup.classList.remove('showPopup');
//   popupContent.classList.add('hidden');
// })
/*************************************************/
// const popup = document.querySelector('.popup');
// const popupContent = document.querySelector('.popup-content');
// const x = document.querySelector('.popup-content h1');
// const popupSound = document.getElementById('popup-sound');
// const lastPopupTime = localStorage.getItem('lastPopupTime');

// if (!lastPopupTime || Date.now() - lastPopupTime >= 24 * 60 * 60 * 1000) {
//   popup.classList.add('showPopup');
//   popupContent.classList.remove('hidden');
//   localStorage.setItem('lastPopupTime', Date.now());
//   popupSound.play();
// }
// x.addEventListener('click', () => {
//   popup.classList.remove('showPopup');
//   popupContent.classList.add('hidden');
// })

/**************************************************************/

// const popup = document.querySelector('.popup');
// const popupContent = document.querySelector('.popup-content');
// const x = document.querySelector('.popup-content h1');
// const popupSound = document.getElementById('popup-sound');
// const hasPopupShown = sessionStorage.getItem('popupShown');
// const lastShown = localStorage.getItem('popupLastShown');
// if (!hasPopupShown && (!lastShown || (Date.now() - lastShown > 86400000))) {
//   popup.classList.add('showPopup');
//   popupContent.classList.remove('hidden');
//   sessionStorage.setItem('popupShown', true);
//   localStorage.setItem('popupLastShown', Date.now());
//   popupSound.play();
// }

// x.addEventListener('click', () => {
//   popup.classList.remove('showPopup');
//   popupContent.classList.add('hidden');
// });

// window.addEventListener('beforeunload', () => {
//   sessionStorage.removeItem('popupShown');
// });

/***********************************************************/
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup-content');
const x = document.querySelector('.popup-content h1');
const popupSound = document.getElementById('popup-sound');
popup.classList.add('showPopup');
popupContent.classList.remove('hidden');
popupSound.play();
x.addEventListener('click', () => {
  popup.classList.remove('showPopup');
  popupContent.classList.add('hidden');
});
window.addEventListener('load', () => {
  popupSound.play();
});

/***********************Email Validation********************************/

function validateEmail(email) {
  let pattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;
  return pattern.test(email);
}
let emailInput = document.querySelector("#form__email");
let validEmail = false;
emailInput.addEventListener("keyup", () => {
  validEmail = validateEmail(emailInput.value);
  let emailIcon = document.querySelector(".email-icon");
  if (emailInput.value === "") {
    emailIcon.classList.replace("uil-check-circle", "uil-envelope");
    emailIcon.style.color = "#b4b4b4";
  } else if (validEmail) {
    emailIcon.classList.replace("uil-envelope", "uil-check-circle");
    emailIcon.style.color = "#4bb543";
  } else {
    emailIcon.classList.replace("uil-check-circle", "uil-envelope");
    emailIcon.style.color = "#de0611";
  }
});
function sendmail() {
  let name = document.getElementById("form__name");
  let email = document.getElementById("form__email");
  let msg = document.getElementById("form__msg");
  let submit = document.getElementById("email_btn");
  submit.addEventListener("click", () => {
    if (
      email.value == "" ||
      name.value == "" ||
      msg.value == ""
    ) {
      error();
    }
    if (validEmail === true) {
      sendEmail();
      alert("Message sent successfully!");
      let form = document.getElementById("contact__form");
      form.reset();
    } else {
      alert("Please enter a valid email address.");
    }
  });
}
sendmail();
function error() {
  alert("Please fill all the details");
}
function sendEmail() {
  var templateParams = {
    from_name: document.getElementById("form__name").value,
    mesg: document.getElementById("form__msg").value,
    from_email: document.getElementById("form__email").value,
  };
  emailjs.send("service_zsnzgwf", "template_gnv1kdg", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}

/*******************************Subscribe***************************************/

let popup_subs = document.getElementById("popup-subscribe");

function openPopup() {
  popup_subs.classList.add("open-popup");
}

function closePopup() {
  popup_subs.classList.remove("open-popup");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendmail_subs() {
  let email_subs = document.getElementById("email-subs");
  let btn_subs = document.getElementById("btn-subs");
  btn_subs.addEventListener("click", () => {
    let email = email_subs.value;
    if (isValidEmail(email)) {
      var templateParams = {
        from_email: email,
      };
      openPopup();
      emailjs.send("service_te4wntg", "template_jeibhlf", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
      email_subs.value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  });
}
sendmail_subs();