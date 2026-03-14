"use strict";

window.onload = function () {
  const logo = document.querySelector(".logo");
  const menu_btn = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const navItem = document.querySelectorAll(".nav__link");
  const navBtn = document.querySelector(".nav__btn");
  const number = document.querySelectorAll(".number");
  const advantages = document.querySelector(".advantages");

  const toggleAndRemoveIsActive = () => {
    menu_btn.classList.toggle("is-active");
    nav.classList.remove("is-active");
  };

  for (let i = 0; i < navItem.length; i++) {
    navItem[i].addEventListener("click", function () {
      toggleAndRemoveIsActive();
    });
  }

  navBtn.addEventListener("click", function () {
    toggleAndRemoveIsActive();
  });

  menu_btn.addEventListener("click", function () {
    menu_btn.classList.toggle("is-active");
    nav.classList.toggle("is-active");
    const expanded = menu_btn.getAttribute("aria-expanded") === "true" || false;
    menu_btn.setAttribute("aria-expanded", !expanded);
  });

  document.addEventListener("scroll", function () {
    nav.classList.remove("is-active");
    menu_btn.classList.remove("is-active");
  });

  const speed = 175;
  function counter() {
    number.forEach((element) => {
      incNumber(element);
    });
    function incNumber(elem) {
      let text = +elem.innerText;
      const value = +elem.getAttribute("data-count");
      const inc = Math.ceil(value / speed);
      if (text < value) {
        elem.innerText = inc + text;
        setTimeout(() => {
          incNumber(elem);
        }, 20);
      } else {
        elem.innerText = value;
      }
    }
  }
  function countOnScroll(payload) {
    if (payload[0].intersectionRatio > 0.5035) {
      counter();
    }
  }

  function hideNav(payload) {
    if (payload[0].intersectionRatio === 1) {
      document.addEventListener("click", function handleClickOutsideBox(event) {
        if (!nav.contains(event.target) && !logo.contains(event.target)) {
          nav.classList.remove("is-active");
          menu_btn.classList.remove("is-active");
        }
      });
    }
  }

  const ob = new IntersectionObserver(countOnScroll, {
    threshold: [0, 0.5, 1],
  });

  const navOb = new IntersectionObserver(hideNav, {
    threshold: [0, 0.5, 1],
  });
  ob.observe(advantages);
  navOb.observe(nav);
};
