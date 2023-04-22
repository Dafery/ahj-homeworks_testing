import { visa, mastercard, mir, discover, dinersclub, amex, jcb } from "../img";
import definePaymentSystem from "./definePaymentSystem";
import isValidCard from "./isValidCard";

export default class CreditCardWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    const cards = [
      { id: "visa", src: visa, title: "Visa" },
      { id: "mastercard", src: mastercard, title: "MasterCard" },
      { id: "mir", src: mir, title: "Мир" },
      { id: "discover", src: discover, title: "Discover" },
      { id: "dinersclub", src: dinersclub, title: "Diners Club" },
      { id: "amex", src: amex, title: "American Express" },
      { id: "jcb", src: jcb, title: "JCB" },
    ];

    const cardItems = cards.reduce((acc, el) => {
      return acc.concat(
        `<li id="${el.id}" class="card-item">
          <img src="${el.src}" title="${el.title}" class="card-img">
        </li>`
      );
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
    this.item = this.parentEl.querySelector(
      definePaymentSystem(e.target.value)
    );
    this.items = [...this.parentEl.querySelectorAll(".card-item")];

    if (this.item) {
      this.items.forEach((el) => (el.style = "opacity: 0.3"));
      this.item.style = "opacity: 1";
    } else {
      this.items.forEach((el) => el.removeAttribute("style"));
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
