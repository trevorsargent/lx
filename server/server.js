import _ from 'highland'

let commandStreams = _();

let allCommands = commandStreams.merge();

const registerCommandStream = stream => commandStreams.write(stream)

const commandStrings = allCommands.observe().map(x => x.toString(x))
allCommands.resume();

export default {
  registerCommandStream,
  commandStrings
}

