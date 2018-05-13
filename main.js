const _ = require('highland')
const T = require('@tweenjs/tween.js')

const NUM_CHANNELS = 10;

const setupChannels = () => {
  let s = {}
  for (let i = 1; i <= NUM_CHANNELS; i++) {
    s[i] = 0;
  }
  return s
}

let channels = setupChannels()

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

const fadeValue = (channel, target, time, outputFunc) => {
  new T.Tween(channels)
    .to({ [channel]: target }, time * 1000)
    .onUpdate((() => {
      outputFunc(channel)(channels[channel])
    }))
    .start();
}
