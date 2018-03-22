import bombFactory from '../../src/js/factories/bomb'

jest.useFakeTimers()

describe('Bomb', () => {
  let bomb
  let addBomb
  let dropBomb
  let replenishBomb

  beforeEach(() => {
    addBomb = jest.fn()
    dropBomb = jest.fn()
    replenishBomb = jest.fn()

    bomb = bombFactory({
      addBomb,
      dropBomb,
      replenishBomb
    })
  })

  it('fuse', () => {
    expect(bomb.fuse).toEqual(3000)
  })

  it('updateFuse', () => {
    bomb.updateFuse(1500)
    expect(bomb.fuse).toEqual(1500)
  })

  describe('blast', () => {
    it('duration', () => {
      expect(bomb.blast.duration).toEqual(750)
    })

    it('radius', () => {
      expect(bomb.blast.radius).toEqual(1)
    })
  })

  it('detonate', () => {
    bomb.detonate() // don't know what this does yet.
  })

  it('decrementBlastRadius', () => {
    bomb.decrementBlastRadius()
    expect(bomb.blast.radius).toEqual(0)
  })

  it('incrementBlastRadius', () => {
    bomb.incrementBlastRadius()
    expect(bomb.blast.radius).toEqual(2)
  })

  describe('plant', () => {
    it('should work with autoDetonate', () => {
      bomb.plant()

      jest.runAllTimers()
      expect(replenishBomb.mock.calls.length).toEqual(1)
    })

    it('should fail to detonate with autoDetonate off', () => {
      bomb.toggleAutoDetonation()

      expect(bomb.autoDetonate).toEqual(false)

      bomb.plant()

      expect(replenishBomb.mock.calls.length).toEqual(0)
    })
  })
})
