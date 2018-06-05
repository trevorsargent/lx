import { fadeValue } from './animation.js'
import { command } from './input.js'
import './setup.js'

const makeSetOutputLevel = (channel) => {
  return setOutputLevel = (level) => {
    const bar = document.getElementById('output-level-' + channel)
    bar.style.width = level + "%"
  }
}

command.resume()