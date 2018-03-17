import bomberFactory from '../../src/js/factories/bomber'

describe('Bomber', () => {
  let bomber

  beforeEach(() => {
    bomber = bomberFactory({ position: { x: 0, y: 0 }})
  })

  it('should start with 1 bomb', () => {
    expect(bomber.bombs.count).toEqual(1)
  })

  it('dropBomb', () => {
    const startingBombCount = bomber.bombs.count

    expect(startingBombCount).toEqual(1)

    bomber.dropBomb()
    expect(bomber.bombs.count).toEqual(0)

    bomber.dropBomb()
    expect(bomber.bombs.count).toEqual(0)
  })

  it('replenishBomb', () => {
    bomber.dropBomb()
    bomber.replenishBomb()
    expect(bomber.bombs.count).toEqual(1)

    bomber.replenishBomb()
    expect(bomber.bombs.count).toEqual(1)
  })
})
