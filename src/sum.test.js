const sum = require('./sum')

test ('sum', () => {
  const actual = sum(2,3)
  const expected = 5
  expect(actual).toEqual(expected)
})