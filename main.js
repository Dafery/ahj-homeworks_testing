/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/img/amex.png
const amex_namespaceObject = __webpack_require__.p + "a46ff562aaed21e0f75a.png";
;// CONCATENATED MODULE: ./src/img/dinersclub.png
const dinersclub_namespaceObject = __webpack_require__.p + "33c6606d98946f87c8a6.png";
;// CONCATENATED MODULE: ./src/img/discover.png
const discover_namespaceObject = __webpack_require__.p + "520192035404e56c7e64.png";
;// CONCATENATED MODULE: ./src/img/jcb.png
const jcb_namespaceObject = __webpack_require__.p + "8e2811822a2c78766670.png";
;// CONCATENATED MODULE: ./src/img/mastercard.png
const mastercard_namespaceObject = __webpack_require__.p + "33b0749235f6e5060a1c.png";
;// CONCATENATED MODULE: ./src/img/mir.png
const mir_namespaceObject = __webpack_require__.p + "9d7af37aaffc2fff5b02.png";
;// CONCATENATED MODULE: ./src/img/visa.png
const visa_namespaceObject = __webpack_require__.p + "779c4e3ba6ecf557eb1a.png";
;// CONCATENATED MODULE: ./src/img/index.js








;// CONCATENATED MODULE: ./src/js/consts.js
const visaRegEx = /(^(4026|417500|4508|4844|491(3|7)))|(^4)/;
const mirRegEx = /^(220[0-4])/;
const mastercardRegEx = /^(5[1-5]\d{14})|(2(((2)((2[1-9])|([3-9][0-9])))|([3-6][0-9][0-9])|(7)(([0-1][0-9])|(20)))\d{12})$/;
const discoverRegEx = /^(6011|64|65)/;
const amexRegEx = /^3[47]/;
const dinersclubRegEx = /(^30[0-5])|(^36)/;
const jcbRegEx = /^35(2[89]|[3-8][0-9])/;
;// CONCATENATED MODULE: ./src/js/definePaymentSystem.js

function definePaymentSystem(cardNumber) {
  if (mirRegEx.test(cardNumber)) {
    return "#mir";
  }
  if (visaRegEx.test(cardNumber)) {
    return "#visa";
  }
  if (amexRegEx.test(cardNumber)) {
    return "#amex";
  }
  if (mastercardRegEx.test(cardNumber)) {
    return "#mastercard";
  }
  if (dinersclubRegEx.test(cardNumber)) {
    return "#dinersclub";
  }
  if (discoverRegEx.test(cardNumber)) {
    return "#discover";
  }
  if (jcbRegEx.test(cardNumber)) {
    return "#jcb";
  }
}
;// CONCATENATED MODULE: ./src/js/isValidCard.js
function isValidCard(value) {
  if (/[^0-9-\s]+/.test(value) || value.length < 13) {
    return false;
  }
  let nCheck = 0,
    nDigit = 0,
    bEven = false;
  value = value.replace(/\D/g, "");
  for (let n = value.length - 1; n >= 0; n--) {
    let cDigit = value.charAt(n);
    nDigit = parseInt(cDigit, 10);
    if (bEven) {
      if ((nDigit *= 2) > 9) {
        nDigit -= 9;
      }
    }
    nCheck += nDigit;
    bEven = !bEven;
  }
  return nCheck % 10 == 0;
}
;// CONCATENATED MODULE: ./src/js/CreditCardWidget.js



class CreditCardWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  static get markup() {
    const cards = [{
      id: "visa",
      src: visa_namespaceObject,
      title: "Visa"
    }, {
      id: "mastercard",
      src: mastercard_namespaceObject,
      title: "MasterCard"
    }, {
      id: "mir",
      src: mir_namespaceObject,
      title: "Мир"
    }, {
      id: "discover",
      src: discover_namespaceObject,
      title: "Discover"
    }, {
      id: "dinersclub",
      src: dinersclub_namespaceObject,
      title: "Diners Club"
    }, {
      id: "amex",
      src: amex_namespaceObject,
      title: "American Express"
    }, {
      id: "jcb",
      src: jcb_namespaceObject,
      title: "JCB"
    }];
    const cardItems = cards.reduce((acc, el) => {
      return acc.concat(`<li id="${el.id}" class="card-item">
          <img src="${el.src}" title="${el.title}" class="card-img">
        </li>`);
    }, "");
    return `
          <h3>Введите номер карты</h3>
          <form class="card-form-widget">
            <ul class="cards-list">
              ${cardItems}
            </ul>
            <input class="input" type="text" placeholder="Номер карты" maxlength="19">
            <button class="submit">Click to Validate</button>
          </form>
        `;
  }
  static get submitSelector() {
    return ".submit";
  }
  static get inputSelector() {
    return ".input";
  }
  static get selector() {
    return ".card-form-widget";
  }
  bindToDOM() {
    this.parentEl.innerHTML = CreditCardWidget.markup;
    this.element = this.parentEl.querySelector(CreditCardWidget.selector);
    this.submit = this.element.querySelector(CreditCardWidget.submitSelector);
    this.input = this.element.querySelector(CreditCardWidget.inputSelector);
    this.input.addEventListener("input", this.onInput);
    this.element.addEventListener("submit", this.onSubmit);
  }
  onInput(e) {
    e.preventDefault();
    this.input.removeAttribute("style");
    this.item = this.parentEl.querySelector(definePaymentSystem(e.target.value));
    this.items = [...this.parentEl.querySelectorAll(".card-item")];
    if (this.item) {
      this.items.forEach(el => el.style = "opacity: 0.3");
      this.item.style = "opacity: 1";
    } else {
      this.items.forEach(el => el.removeAttribute("style"));
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const value = this.input.value;
    if (isValidCard(value)) {
      this.input.style = "border-color: #5cb85c";
    } else {
      this.input.style = "border-color: #dd2b2b";
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const container = document.querySelector(".container");
const app_form = new CreditCardWidget(container);
app_form.bindToDOM();
;// CONCATENATED MODULE: ./src/index.js


// TODO: write your code in app.js
/******/ })()
;