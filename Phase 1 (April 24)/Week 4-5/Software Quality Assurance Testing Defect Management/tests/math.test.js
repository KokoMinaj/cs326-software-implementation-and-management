const { add, subtract, multiply } = require('../src/math');

test('adds 1 + 2 = 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('adds negative numbers', () => {
  expect(add(-1, -2)).toBe(-3);
});

test('subtract 5 - 2 = 3', () => {
  expect(subtract(5, 2)).toBe(3);
});

test('subtract negative numbers', () => {
  expect(subtract(-5, -2)).toBe(-3);
});

test('add zero', () => {
  expect(add(5, 0)).toBe(5);
});

test('multiplies 2 * 3 = 6', () => {
  expect(multiply(2, 3)).toBe(6);
});

test('multiplies by zero', () => {
  expect(multiply(5, 0)).toBe(0);
});

test('multiplies negative numbers', () => {
  expect(multiply(-2, 3)).toBe(-6);
});