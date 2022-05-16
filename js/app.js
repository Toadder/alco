/* SLIDE UP */
function _slideUp(target, duration = 500) {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.boxSizing = "border-box";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = `none`;
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
}

/* SLIDE DOWN */
function _slideDown(target, mode, duration = 500) {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;
    if (display === "none") display = `${mode}`;
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = "border-box";
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
}

/* TOOGLE */
function _slideToggle(target, mode = "block", duration = 500) {
  if (window.getComputedStyle(target).display === "none") {
    return _slideDown(target, mode, duration);
  } else {
    return _slideUp(target, duration);
  }
}

const sliders = () => {
  const getConfig = (selector) => {
    return {
      slidesPerView: 5,
      spaceBetween: 10,
      speed: 700,
      navigation: {
        nextEl: `${selector}__next`,
        prevEl: `${selector}__prev`,
      },

      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
        },
        700: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1600: {
          slidesPerView: 5,
        },
      },
    };
  };

  if (document.querySelector(".offer")) {
    new Swiper(".offer__slider", getConfig(".offer"));
  }
  if (document.querySelector(".hot")) {
    new Swiper(".hot__slider", getConfig(".hot"));
  }
};

const header = () => {
  const burger = document.querySelector(".top-header__burger");
  const menu = document.querySelector(".bottom-header");

  if (burger) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("_active");
      menu.classList.toggle("_active");
      document.body.classList.toggle("_lock");
    });
  }
};

const openCatalog = () => {
  const trigger = document.querySelector(".bottom-header__dropdown-inner");
  const sublist = document.querySelector(".bottom-header__sublist");

  if (trigger) {
    if (window.innerWidth <= 992) {
      trigger.classList.add("_trigger");
      initTrigger(trigger.classList.contains("_trigger"));
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 992) {
        trigger.classList.add("_trigger");
      } else {
        trigger.classList.remove("_trigger");
      }

      initTrigger(trigger.classList.contains("_trigger"));
    });
  }

  function initTrigger(flag) {
    if (flag && !trigger.classList.contains("_trigger_active")) {
      trigger.addEventListener("click", handleClick);
      trigger.classList.add("_trigger_active");
    } else if (!flag && trigger.classList.contains("_trigger_active")) {
      trigger.removeEventListener("click", handleClick);
      _slideDown(sublist, "grid", 1);
      trigger.classList.remove("_trigger_active");
    }
  }

  function handleClick() {
    _slideToggle(sublist, "grid", 600);
  }
};

const select = () => {
  const selects = document.querySelectorAll(".select");

  if (selects.length > 0) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const btn = select.querySelector(".select__button");
      const list = select.querySelector(".select__list");
      const items = select.querySelectorAll(".select__list-item");
      const input = select.querySelector(".select__input-hidden");

      btn.addEventListener("click", function () {
        btn.classList.toggle("select__button_clicked");
        list.classList.toggle("select__list_visible");
      });

      items.forEach((item) => {
        item.addEventListener("click", function (event) {
          event.stopPropagation();

          btn.textContent = this.textContent;
          input.value = this.dataset.value;

          btn.classList.remove("select__button_clicked");
          list.classList.remove("select__list_visible");
        });
      });

      document.addEventListener("click", (event) => {
        if (event.target !== btn) {
          btn.classList.remove("select__button_clicked");
          list.classList.remove("select__list_visible");
        }
      });
    }
  }
};

const phoneMask = () => {
  let phoneInputs = document.querySelectorAll("input[data-tel-input]");

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener("keydown", onPhoneKeyDown);
    phoneInput.addEventListener("input", onPhoneInput, false);
    phoneInput.addEventListener("paste", onPhonePaste, false);
  }

  function getInputNumbersValue(input) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, "");
  }

  function onPhonePaste(e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  function onPhoneInput(e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length != selectionStart) {
      // Editing in the middle of input, not last symbol
      if (e.data && /\D/g.test(e.data)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }

  function onPhoneKeyDown(e) {
    // Clear input after remove last symbol
    let inputValue = e.target.value.replace(/\D/g, "");
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  }
};

const showBalloon = () => {
  const hints = document.querySelectorAll(".product-item__hint");

  if (hints.length > 0 && window.innerWidth <= 991.98) {
    for (let index = 0; index < hints.length; index++) {
      const hint = hints[index];
      const qn = hint.querySelector(".product-item__qn");

      qn.addEventListener("click", (event) => {
        event.stopPropagation();
        const parent = qn.parentElement;
        parent.classList.toggle("_shown");
      });

      document.addEventListener("click", (event) => {
        if (event.target !== hint) {
          const parent = qn.parentElement;
          parent.classList.remove("_shown");
        }
      });
    }
  }
};

const popup = () => {
  const popupLinks = document.querySelectorAll(".popup-link");
  const body = document.querySelector("body");
  const lockPadding = document.querySelectorAll(".lock-padding");
  let unlock = true;
  const timeout = 450;

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute("href").replace("#", "");
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll(".close-popup");
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
        popupClose(el.closest(".popup"));
        e.preventDefault();
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector(".popup._open");
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      currentPopup.classList.add("_open");
      currentPopup.addEventListener("click", function (e) {
        if (!e.target.closest(".popup__content")) {
          popupClose(e.target.closest(".popup"));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove("_open");
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("_lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnlock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = "0px";
        }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("_lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener("keydown", function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector(".popup._open");
      popupClose(popupActive);
    }
  });
};

const ymap = () => {
  let sectionMap = document.querySelector(".info-page__map");

  function ymapInit() {
    if (typeof ymaps === "undefined") return;
    let ymap = document.getElementById("ymap");

    ymaps.ready(function () {
      let map = new ymaps.Map("ymap", {
        center: [59.96502956414705, 30.278920499999966],
        zoom: 17,
        controls: ["zoomControl"],
        behaviors: ["drag"],
      });

      // Placemark
      let placemark = new ymaps.Placemark(
        [59.96502956414705, 30.278920499999966],
        {
          // Hint
          hintContent: "ALKO CLUB",
          balloonContent: "ALKO CLUB",
        },
        {
          preset: "islands#icon",
          iconColor: "#FFA800",
        }
      );

      map.geoObjects.add(placemark);
    });
  }

  window.addEventListener("scroll", checkYmapInit);
  checkYmapInit();

  function checkYmapInit() {
    if (!sectionMap) return;
    let sectionMapTop = sectionMap.getBoundingClientRect().top;
    let scrollTop = window.pageYOffset;
    let sectionMapOffsetTop = sectionMapTop + scrollTop;

    if (scrollTop + window.innerHeight > sectionMapOffsetTop) {
      ymapLoad();
      window.removeEventListener("scroll", checkYmapInit);
    }
  }

  function ymapLoad() {
    let script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    document.body.appendChild(script);
    script.onload = ymapInit;
  }
};

const anchorLinks = () => {
  const links = document.querySelectorAll("a._anchor-scroll");

  for (let index = 0; index < links.length; index++) {
    const link = links[index];

    link.addEventListener("click", (e) => {
      e.preventDefault();

      const href = link.getAttribute("href").replace("#", ""),
        scrollTarget = document.getElementById(href),
        topOffset =
          window.innerWidth <= 992
            ? document.querySelector(".header").offsetHeight
            : 0,
        elementPosition = scrollTarget.getBoundingClientRect().top,
        offsetPosition = elementPosition - topOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  }
};

const isWebp = () => {
  function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector("body").classList.add("webp");
    } else {
      document.querySelector("body").classList.add("no-webp");
    }
  });
};

isWebp();
header();
sliders();
openCatalog();
select();
phoneMask();
showBalloon();
popup();
anchorLinks();
ymap();
