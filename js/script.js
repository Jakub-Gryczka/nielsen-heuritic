"use strict";

window.onload = function () {
  const logo = document.querySelector(".logo");
  const menu_btn = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const navItem = document.querySelectorAll(".nav__link");
  const navBtn = document.querySelector(".nav__btn");
  const number = document.querySelectorAll(".number");
  const advantages = document.querySelector(".advantages");

  console.log("menu_btn:", menu_btn);
  console.log("nav:", nav);
  console.log("logo:", logo);

  for (let i = 1; i <= 10; i++) {
    const navItem = document.createElement("li");
    navItem.className = "nav__item";
    navItem.innerHTML = `<a href="#rule-${i}" class="nav__link">Zasada ${i}</a>`;
    const navList = document.querySelector(".nav__list");
    if (navList) navList.appendChild(navItem);
  }

  // Toggle menu na klik hamburger
  menu_btn.addEventListener("click", function () {
    menu_btn.classList.toggle("is-active");
    nav.classList.toggle("is-active");
    menu_btn.setAttribute(
      "aria-expanded",
      menu_btn.classList.contains("is-active"),
    );
  });

  // Zamknij menu po kliknięciu na item
  document.addEventListener("click", function (e) {
    if (e.target.closest(".nav__link")) {
      menu_btn.classList.remove("is-active");
      nav.classList.remove("is-active");
      menu_btn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("scroll", function () {
    menu_btn.classList.remove("is-active");
    nav.classList.remove("is-active");
    menu_btn.setAttribute("aria-expanded", "false");
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
