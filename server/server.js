import _ from 'highland'
const T = require('@tweenjs/tween.js')
import Animator from './animation.js'
import { shatterCommand, filterIncompleteCommands } from '../lib/command-tools.js'
import { setupChannels } from '../lib/channel-tools.js'

const NUM_CHANNELS = 3;
let channels = setupChannels(NUM_CHANNELS)
// Command Streams
const channelChanges = _();
const commandStreams = _();
const allCommands = commandStreams.merge();
const commandDescriptions = allCommands.observe().map(x => x.toString(x))


// Very Important Functions
const registerCommandStream = stream => commandStreams.write(stream)

const writeToChannelStream = (channel) => (x) => {
  channelChanges.write({
    channel,
    value: x
  })
}

const executeCommandShard = s => {
  const { channel, time, targetValue } = s
  Animator.fadeValue(channels[channel], targetValue, 1, writeToChannelStream(channel))
}

// shatter and then execute the commands
allCommands
  .filter(filterIncompleteCommands)
  .map(shatterCommand)
  .flatten()
  .each(executeCommandShard)



// Start Animation Engine
function animate (time) {
  requestAnimationFrame(animate);
  T.update(time);
}
requestAnimationFrame(animate);

// Export The Things
export default {
  registerCommandStream,
  commandDescriptions,
  channelChanges
}

