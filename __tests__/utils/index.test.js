import {
  isNothing,
  collision
} from '../../src/js/utils'

test('isNothing', () => {
  expect(isNothing(1)).toEqual(false)
  expect(isNothing(null)).toEqual(true)
  expect(isNothing(undefined)).toEqual(true)
})

const boxFactory = (x, y, width, height) => ({
  x,
  y,
  width,
  height
})

describe('collision', () => {
  const box1 = boxFactory(0, 0, 20, 20)
  const box1Collision = collision(box1)

  it('no collision', () => {
    expect(box1Collision(boxFactory(30, 30, 20, 20))).toEqual(false)
  })

  it('overlap', () => {
    expect(box1Collision(boxFactory(10, 10, 20, 20))).toEqual(true)
  })

  it('inside', () => {
    expect(box1Collision(boxFactory(5, 5, 10, 10))).toEqual(true)
  })
})
