const T = require('@tweenjs/tween.js')
import { setupChannels } from '/lib/channel-tools.js'


// START ANIMATION ENGINE 
function animate (time) {
  requestAnimationFrame(animate);
  T.update(time);
}
requestAnimationFrame(animate);


// INITIALIZE CHANNELS

const NUM_CHANNELS = 10;
let channels = setupChannels(NUM_CHANNELS)
