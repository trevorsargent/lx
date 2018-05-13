const _ = require('highland')
const T = require('@tweenjs/tween.js')

const makeSetOutputLevel = (channel) => {
  return setOutputLevel = (level) => {
    const bar = document.getElementById('output-level-' + channel)
    bar.style.width = level + "%"
  }
}

function animate (time) {
  requestAnimationFrame(animate);
  T.update(time);
}
requestAnimationFrame(animate);

const form1 = document.getElementById('form-1')
const form2 = document.getElementById('form-2')

const levelField1 = document.getElementById('input-level-1')
const levelField2 = document.getElementById('input-level-2')
const timeField1 = document.getElementById('input-time-1')
const timeField2 = document.getElementById('input-time-2')

form1.onsubmit = (e) => {
  e.preventDefault()
  const target = Number.parseFloat(levelField1.value)
  const time = Number.parseFloat(timeField1.value)
  fadeValue(1, target, time, makeSetOutputLevel)
}

form2.onsubmit = (e) => {
  e.preventDefault()
  const target = Number.parseFloat(levelField2.value)
  const time = Number.parseFloat(timeField2.value)
  fadeValue(2, target, time, makeSetOutputLevel)
}

let channels = {
  1: 0,
  2: 0
}

const fadeValue = (channel, target, time, outputFunc) => {
  new T.Tween(channels)
    .to({ [channel]: target }, time * 1000)
    .onUpdate((() => {
      outputFunc(channel)(channels[channel])
    }))
    .start();
}
