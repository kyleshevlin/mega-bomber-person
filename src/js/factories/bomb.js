import { CELL_SIZE } from '../constants'

export default function bombFactory(bomber) {
  return {
    autoDetonate: true,
    background: 'black',
    blast: {
      duration: 750,
      radius: 1
    },
    fuse: 3000,
    height: CELL_SIZE,
    width: CELL_SIZE,

    detonate() {
      console.log('Boom 💥')
      // logic here to handle blast radius
      bomber.replenishBomb()
    },

    plant() {
      if (this.autoDetonate) {
        // logic here to add bomb to game and position it
        setTimeout(this.detonate, this.fuse)
      }
    },

    decrementBlastRadius() {
      this.blast.radius--
    },

    incrementBlastRadius() {
      this.blast.radius++
    },

    toggleAutoDetonation() {
      this.autoDetonate = !this.autoDetonate
    },

    updateFuse(time) {
      this.fuse = time
    }
  }
}
