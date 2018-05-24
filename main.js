import { fadeValue } from './animation.js'


import { keys } from './keyboard.js'
import './setup.js'

const makeSetOutputLevel = (channel) => {
  return setOutputLevel = (level) => {
    const bar = document.getElementById('output-level-' + channel)
    bar.style.width = level + "%"
  }
}

keys.each(console.log)