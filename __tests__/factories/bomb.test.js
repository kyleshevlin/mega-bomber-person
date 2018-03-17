import bombFactory from '../../src/js/factories/bomb'

jest.useFakeTimers()

describe('Bomb', () => {
  let bomb
  let addBomb
  let dropBomb

  beforeEach(() => {
    addBomb = jest.fn()
    dropBomb = jest.fn()

    bomb = bombFactory({
      addBomb,
      dropBomb
    })
  })

  it('fuse', () => {
    expect(bomb.fuse).toEqual(3000)
  })

  it('blast radius', () => {
    expect(bomb.blastRadius).toEqual(1)
  })

  it('plant', () => {
    bomb.plant()

    expect(dropBomb.mock.calls.length).toEqual(1)

    jest.runAllTimers()
    expect(addBomb.mock.calls.length).toEqual(1)
  })

  it('detonate', () => {
    bomb.detonate() // don't know what this does yet.
  })
})
