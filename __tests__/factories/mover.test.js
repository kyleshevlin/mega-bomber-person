import moverFactory from '../../src/js/factories/mover'

describe('Mover', () => {
  let mover

  beforeEach(() => {
    mover = moverFactory({})
  })

  it('should have a default starting point of 0, 0', () => {
    expect(mover.position.x).toEqual(0)
    expect(mover.position.y).toEqual(0)
  })

  it('moveLeft', () => {
    const startingX = mover.position.x

    expect(startingX).toEqual(0)

    mover.moveLeft()
    expect(mover.position.x).toEqual(startingX - mover.speed)
  })

  it('moveUp', () => {
    const startingY = mover.position.y

    expect(startingY).toEqual(0)

    mover.moveUp()
    expect(mover.position.y).toEqual(startingY - mover.speed)
  })

  it('moveRight', () => {
    const startingX = mover.position.x

    expect(startingX).toEqual(0)

    mover.moveRight()
    expect(mover.position.x).toEqual(startingX + mover.speed)
  })

  it('moveDown', () => {
    const startingY = mover.position.y

    expect(startingY).toEqual(0)

    mover.moveDown()
    expect(mover.position.y).toEqual(startingY + mover.speed)
  })

  it('adjust', () => {
    const startingX = mover.position.x
    const startingY = mover.position.y

    mover.adjust(2, 3)

    expect(mover.position.x).toEqual(2)
    expect(mover.position.y).toEqual(3)

    mover.adjust(-2, -3)

    expect(mover.position.x).toEqual(0)
    expect(mover.position.y).toEqual(0)
  })
})
