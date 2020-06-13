const sum = require('./sum')

jest.mock('./sum', () => {
  return jest.fn((p1,p2) => p2)
})

test ('sum', () => {
  const actual = sum(2,5)
  const expected = 5
  expect(sum).toHaveBeenCalledTimes(1)
  expect(actual).toEqual(expected)
})