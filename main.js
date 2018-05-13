const _ = require('highland')

const bar = document.getElementById('output-level')

const setOutputLevel = (level) => {
  bar.style.width = level + "%"
}

const fadeValue = (start, target, time, outputFunc) => {
  let startTime = null
  let distance = target - start
  function step (timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = timestamp - startTime;
    let now = start + (distance * progress / (time * 1000))
    outputFunc(now)
    if (progress < time * 1000) {
      window.requestAnimationFrame(step);
    } else {
      outputFunc(target)
    }
  }
  window.requestAnimationFrame(step); //starts the animation
}

const form = document.getElementById('form')
const levelField = document.getElementById('input-level')
const timeField = document.getElementById('input-time')

let currentValue = 0

form.onsubmit = (e) => {
  e.preventDefault()
  const target = Number.parseFloat(levelField.value)
  const time = Number.parseFloat(timeField.value)
  fadeValue(currentValue, target, time, setOutputLevel)
  currentValue = target
}

