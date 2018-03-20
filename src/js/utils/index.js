export const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

export const isNothing = x => x === null || x === undefined

export const noARightBLeftCollision = a => b => a.x + a.width < b.x

export const noABottomBTopCollision = a => b => a.y + a.height < b.y

export const noALeftBRightCollision = a => b => a.x > b.x + b.width

export const noATopBBottomCollision = a => b => a.y > b.y + b.height

export const collision = a => b =>
  !(
    noARightBLeftCollision(a)(b) ||
    noABottomBTopCollision(a)(b) ||
    noALeftBRightCollision(a)(b) ||
    noATopBBottomCollision(a)(b)
  )
