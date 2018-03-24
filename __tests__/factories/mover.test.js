import moverFactory from '../../src/js/factories/mover'

describe('Mover', () => {
  let mover

  beforeEach(() => {
    mover = moverFactory({})
  })

  it('should have a default starting point of 0, 0', () => {
    expect(mover.x).toEqual(0)
    expect(mover.y).toEqual(0)
  })
})
