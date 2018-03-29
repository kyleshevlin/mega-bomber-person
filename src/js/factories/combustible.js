export default function combustibleFactory({ x, y }) {
  return {
    type: 'combustible',
    x,
    y,
    onDestroy() {
      console.log('Random chance at a consumable!')
    }
  }
}
