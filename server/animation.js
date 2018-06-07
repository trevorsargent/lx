const T = require('@tweenjs/tween.js')

export const fadeValue = (channel, target, time, outputFunc) => {
  new T.Tween(channel)
    .to({
      value: target
    }, time * 1000)
    .onUpdate(() => {
      outputFunc(channel.value)
    })
    .start();
}

export default {
  fadeValue
}