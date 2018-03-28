import { LEVEL_CHARACTERS } from '../constants'

export default function levelFactory(plan) {
  const planArray = plan
    .trim()
    .split('\n')
    .map(line => [...line])

  const height = planArray.length
  const width = planArray[0].length
  const startActors = []

  const rows = planArray.map((row, y) =>
    row.map((ch, x) => {
      const type = LEVEL_CHARACTERS[ch]

      if (typeof type === 'string') {
        return type
      }

      startActors.push(type({ x, y }))

      return 'empty'
    })
  )

  return {
    height,
    width,
    startActors,
    rows
  }
}
