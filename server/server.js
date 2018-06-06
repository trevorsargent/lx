import _ from 'highland'

const commandStreams = _();

const allCommands = commandStreams.merge();

const commandStrings = allCommands.observe().map(x => x.toString(x))
const registerCommandStream = stream => commandStreams.write(stream)

const filterIncompleteCommands = x => x.complete

const executeCommand = x => {
  console.log(x)
}

allCommands
  .filter(filterIncompleteCommands)
  .each(executeCommand)

export default {
  registerCommandStream,
  commandStrings
}

