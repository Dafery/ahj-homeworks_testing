import definePaymentSystem from "../definePaymentSystem";

test.each([
  ["2200000000000053", "#mir"],
  ["347828159180773", "#amex"],
  ["4539723080743551", "#visa"],
  ["2221006426417685", "#mastercard"],
  ["30569309025904", "#dinersclub"],
  ["6011743449676971", "#discover"],
  ["3545443366571329", "#jcb"],
  ["3329", undefined],
])(
  "Проверка принадлежности определённой платёжной системе.",
  (cardNumber, result) => {
    expect(definePaymentSystem(cardNumber)).toEqual(result);
  }
);
