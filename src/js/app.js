import CreditCardWidget from "./CreditCardWidget";

const container = document.querySelector(".container");
const form = new CreditCardWidget(container);

form.bindToDOM();
