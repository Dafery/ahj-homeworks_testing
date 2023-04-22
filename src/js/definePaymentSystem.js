import {
  amexRegEx,
  dinersclubRegEx,
  discoverRegEx,
  jcbRegEx,
  mastercardRegEx,
  mirRegEx,
  visaRegEx,
} from "./consts";

export default function definePaymentSystem(cardNumber) {
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
