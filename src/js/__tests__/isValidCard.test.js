import isValidCard from "../isValidCard";

test('Удачная проверка номера карты', () => {
  const input = '4532304765775189';

  expect(isValidCard(input)).toBeTruthy()
});

test('Неудачная проверка номера карты', () => {
  const input = '45389';

  expect(isValidCard(input)).toBeFalsy()
});
