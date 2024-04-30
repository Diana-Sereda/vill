document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".program__slider-container");
  const slider = document.querySelector(".program__slider");
  const allSlides = document.querySelectorAll(".program__item");
  const img = document.querySelector(".item-4 img");

  // Анимация карточек
  function isElementInViewport() {
    const block = sliderContainer.getBoundingClientRect();
    return (
      block.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      block.bottom >= 0
    );
  }

  window.addEventListener("scroll", function () {
    if (isElementInViewport()) {
      allSlides.forEach((s) => {
        s.classList.add("fadeInLeft");
      });
      img.classList.add("fadeInLeft");
    }
  });

  //   Перетаскивание слайдов

  let isDragging = false;
  let startPosition = 0;
  let currentTranslate = 0;
  let previousTranslate = 0;
  let animationId = 0;

  const maxTranslate = 0; //предел справа
  const minTranslate = sliderContainer.clientWidth - slider.scrollWidth; // предел слева

  slider.addEventListener("touchstart", (event) => {
    isDragging = true;
    startPosition = event.touches[0].pageX - sliderContainer.offsetLeft;
    previousTranslate = currentTranslate;
    event.preventDefault();
  });

  slider.addEventListener("touchmove", (event) => {
    if (isDragging) {
      const currentPosition =
        event.touches[0].pageX - sliderContainer.offsetLeft;
      currentTranslate = currentPosition - startPosition + previousTranslate;

      // Ограничиваем смещение карточек в пределах контейнера
      currentTranslate = Math.max(
        minTranslate,
        Math.min(maxTranslate, currentTranslate)
      );

      setSliderPosition();
    }
  });

  slider.addEventListener("touchend", () => {
    isDragging = false;
    animateSlider();
  });

  function animateSlider() {
    cancelAnimationFrame(animationId);

    const itemWidth =
      slider.firstElementChild.offsetWidth +
      parseInt(getComputedStyle(slider.firstElementChild).marginRight);

    const closestPosition =
      Math.round(currentTranslate / itemWidth) * itemWidth;

    const animate = () => {
      currentTranslate += (closestPosition - currentTranslate) * 0.1;
      setSliderPosition();

      if (Math.abs(closestPosition - currentTranslate) > 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setSliderPosition();
      }
    };

    animate();
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  //   Видимиость кнопки прокрутки наверх
  const upBtn = document.querySelector(".up-btn");
  function toggleUpButtonVisibility() {
    const firstBlock = document.querySelector(".header");
    const firstBlockHeight = firstBlock.clientHeight;
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > firstBlockHeight) {
      upBtn.style.opacity = "1";
    } else {
      upBtn.style.opacity = "0";
    }
  }

  window.addEventListener("scroll", toggleUpButtonVisibility);

  toggleUpButtonVisibility();

  //   Анимация кругов
  /*circle бонус*/

  let bg = document.querySelector(".mouse-parallax-bg");
  let fog1 = document.querySelector(".mouse-parallax-fog-1");
  let fog2 = document.querySelector(".mouse-parallax-fog-2");
  window.addEventListener("mousemove", function (e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    bg.style.transform = "translate(-" + x * 50 + "px, -" + y * 50 + "px)";
    fog1.style.transform = "translate(+" + x * 50 + "px, -" + y * 50 + "px)";
    fog2.style.transform = "translate(-" + x * 20 + "px, -" + y * 20 + "px)";
  });

  /*circle регистрация*/

  let fog3 = document.querySelector(".mouse-parallax-fog-3");
  let fog4 = document.querySelector(".mouse-parallax-fog-4");
  window.addEventListener("mousemove", function (element) {
    let x = element.clientX / window.innerWidth;
    let y = element.clientY / window.innerHeight;

    fog3.style.transform = "translate(+" + x * 50 + "px, -" + y * 50 + "px)";
    fog4.style.transform = "translate(-" + x * 20 + "px, -" + y * 20 + "px)";
  });

  //   tutortop
  (function () {
    const tutortopBadgeWrapper = document.querySelector(
      ".tutortop-badge-wrapper-own"
    );
    if (!tutortopBadgeWrapper) {
      console.error("Tutortop Badge not found");
      return;
    }

    tutortopBadgeWrapper.href = tutortopBadgeWrapper.href.concat(
      `?utm_medium=badge&utm_source=${window.location.href}`
    );
    tutortopBadgeWrapper.target = "_blank";
    tutortopBadgeWrapper.style = "text-decoration: none; display: inline-block";

    const req = new XMLHttpRequest();
    req.onload = function () {
      const tutortopBadgeData = JSON.parse(this.responseText).data;
      const tutortopDiv = document.createElement("div");
      tutortopDiv.className = "tutortop-container";
      var style = document.createElement("style");
      style.innerHTML = `.tutortop-badge {
              font-family: 'Raleway', sans-serif;
              font-style: normal;
              font-weight: 500;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              box-sizing: border-box;
          }
          .tutortop-rating {
              text-align: center;
              font-feature-settings: 'pnum' on, 'lnum' on;
          }
          .tutortop-reviews {
              text-align: center;
              font-feature-settings: 'pnum' on, 'lnum' on;
          }
          .tutortop-name {
              font-weight: 700;
              text-align: center;
          }
          .tutortop-badge.desktop-large {
              width: 324px;
              height: 308px;
              border-radius: 60px 60px 60px 0px;
              padding-top: 20px;
              padding-bottom: 30px;
          }
          .tutortop-badge.desktop-large .tutortop-rating svg {
              width: 76px;
              height: 76px;
          }
          .tutortop-badge.desktop-large .tutortop-rating {
              font-size: 94px;
              line-height: 108px;
          }
          .tutortop-badge.desktop-large .tutortop-reviews {
              font-size: 36px;
              line-height: 40px;
              margin-bottom: 15px;
          }
          .tutortop-badge.desktop-large .tutortop-name {
              font-size: 50px;
              line-height: 60px;
          }
          .tutortop-badge.desktop-medium {
              width: 274px;
              height: 260px;
              border-radius: 52px 52px 52px 0px;
              padding-top: 16px;
              padding-bottom: 26px;
          }
          .tutortop-badge.desktop-medium .tutortop-rating svg {
              width: 64px;
              height: 64px;
          }
          .tutortop-badge.desktop-medium .tutortop-rating {
              font-size: 80px;
              line-height: 92px;
          }
          .tutortop-badge.desktop-medium .tutortop-reviews {
              font-size: 30px;
              line-height: 34px;
              margin-bottom: 12px;
          }
          .tutortop-badge.desktop-medium .tutortop-name {
              font-size: 44px;
              line-height: 50px;
          }
          .tutortop-badge.desktop-small {
              width: 136px;
              height: 122px;
              border-radius: 22px 22px 22px 0px;
              padding-top: 12px;
              padding-bottom: 12px;
          }
          .tutortop-badge.desktop-small .tutortop-rating svg {
              width: 28px;
              height: 28px;
          }
          .tutortop-badge.desktop-small .tutortop-rating {
              font-size: 36px;
              line-height: 40px;
          }
          .tutortop-badge.desktop-small .tutortop-reviews {
              font-size: 14px;
              line-height: 14px;
              margin-bottom: 6px;
          }
          .tutortop-badge.desktop-small .tutortop-name {
              font-size: 18px;
              line-height: 22px;
          }
          .tutortop-badge.tablet-large {
              width: 210px;
              height: 190px;
              border-radius: 36px 36px 36px 0px;
              padding-top: 12px;
              padding-bottom: 18px;
          }
          .tutortop-badge.tablet-large .tutortop-rating svg {
              width: 46px;
              height: 46px;
          }
          .tutortop-badge.tablet-large .tutortop-rating {
              font-size: 58px;
              line-height: 66px;
          }
          .tutortop-badge.tablet-large .tutortop-reviews {
              font-size: 22px;
              line-height: 24px;
              margin-bottom: 9px;
          }
          .tutortop-badge.tablet-large .tutortop-name {
              font-size: 30px;
              line-height: 36px;
          }
          .tutortop-badge.tablet-medium {
              width: 178px;
              height: 160px;
              border-radius: 32px 32px 32px 0px;
              padding-top: 10px;
              padding-bottom: 16px;
          }
          .tutortop-badge.tablet-medium .tutortop-rating svg {
              width: 40px;
              height: 40px;
          }
          .tutortop-badge.tablet-medium .tutortop-rating {
              font-size: 48px;
              line-height: 56px;
          }
          .tutortop-badge.tablet-medium .tutortop-reviews {
              font-size: 18px;
              line-height: 20px;
              margin-bottom: 8px;
          }
          .tutortop-badge.tablet-medium .tutortop-name {
              font-size: 26px;
              line-height: 30px;
          }
          .tutortop-badge.tablet-small {
              width: 136px;
              height: 122px;
              border-radius: 22px 22px 22px 0px;
              padding-top: 12px;
              padding-bottom: 12px;
          }
          .tutortop-badge.tablet-small .tutortop-rating svg {
              width: 34px;
              height: 34px;
          }
          .tutortop-badge.tablet-small .tutortop-rating {
              font-size: 42px;
              line-height: 48px;
          }
          .tutortop-badge.tablet-small .tutortop-reviews {
              font-size: 16px;
              line-height: 18px;
              margin-bottom: 6px;
          }
          .tutortop-badge.tablet-small .tutortop-name {
              font-size: 22px;
              line-height: 26px;
          }
          .tutortop-badge.mobile-large {
              width: 136px;
              height: 116px;
              border-radius: 22px 22px 22px 0px;
              padding-top: 8px;
              padding-bottom: 11px;
          }
          .tutortop-badge.mobile-large .tutortop-rating svg {
              width: 28px;
              height: 28px;
          }
          .tutortop-badge.mobile-large .tutortop-rating {
              font-size: 36px;
              line-height: 40px;
          }
          .tutortop-badge.mobile-large .tutortop-reviews {
              font-size: 14px;
              line-height: 14px;
              margin-bottom: 6px;
          }
          .tutortop-badge.mobile-large .tutortop-name {
              font-size: 18px;
              line-height: 22px;
          }
          .tutortop-badge.mobile-medium {
              width: 116px;
              height: 98px;
              border-radius: 20px 20px 20px 0px;
              padding-top: 10px;
              padding-bottom: 10px;
          }
          .tutortop-badge.mobile-medium .tutortop-rating svg {
              width: 24px;
              height: 24px;
          }
          .tutortop-badge.mobile-medium .tutortop-rating {
              font-size: 30px;
              line-height: 34px;
          }
          .tutortop-badge.mobile-medium .tutortop-reviews {
              font-size: 12px;
              line-height: 13px;
              margin-bottom: 5px;
          }
          .tutortop-badge.mobile-medium .tutortop-name {
              font-size: 16px;
              line-height: 18px;
          }
          .tutortop-badge.mobile-small {
              width: 98px;
              height: 84px;
              border-radius: 16px 16px 16px 0px;
              padding-top: 8px;
              padding-bottom: 8px;
          }
          .tutortop-badge.mobile-small .tutortop-rating svg {
              width: 20px;
              height: 20px;
          }
          .tutortop-badge.mobile-small .tutortop-rating {
              font-size: 26px;
              line-height: 30px;
          }
          .tutortop-badge.mobile-small .tutortop-reviews {
              font-size: 12px;
              line-height: 10px;
              margin-bottom: 4px;
          }
          .tutortop-badge.mobile-small .tutortop-name {
              font-size: 14px;
              line-height: 16px;
          }`;
      document.head.appendChild(style);
      var link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute(
        "href",
        "https://fonts.googleapis.com/css2?family=Raleway:wght@500;700&display=swap"
      );
      document.head.appendChild(link);
      reviewsInflection = function (num) {
        const reviews = ["отзыв", "отзыва", "отзывов"];
        num %= 100;
        if (num >= 5 && num <= 20) {
          return reviews[2];
        }
        num %= 10;
        if (num == 1) {
          return reviews[0];
        }
        if (num > 1 && num < 5) {
          return reviews[1];
        }
        return reviews[2];
      };
      tutortopDiv.innerHTML = `<div class="tutortop-badge ${
        tutortopBadgeWrapper.dataset.size
      }" 
      style="background-color: ${tutortopBadgeWrapper.dataset.backgroundColor};
      color: ${tutortopBadgeWrapper.dataset.fontColor};">
          <div class="tutortop-rating">
              <svg  viewBox="0 0 74 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M37 0.708496L45.5315 26.9659H73.1402L50.8043 43.1938L59.3358 69.4511L37 53.2232L14.6642 69.4511L23.1957 43.1938L0.859852 26.9659H28.4685L37 0.708496Z" fill="${
                    tutortopBadgeWrapper.dataset.fontColor
                  }"/>
              </svg>
              ${tutortopBadgeData.averageRating}
          </div>
          <span class="tutortop-reviews">${
            tutortopBadgeData.totalPoint
          } ${reviewsInflection(tutortopBadgeData.totalPoint)}</span>
          <span class="tutortop-name">tutortop</span>
      </div>`;
      tutortopBadgeWrapper.appendChild(tutortopDiv);
    };
    req.onerror = function () {
      console.error("Can not load Tutortop Badge");
    };
    req.open(
      "GET",
      `https://tutortop.ru/api/badge/${tutortopBadgeWrapper.dataset.school}/`
    );
    req.send();
  })();
});
