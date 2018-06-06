import { keyTypes, commandTypes, commandSubjects } from './types.js'
import { keyCompare } from './keyTools.js'
import keys from './keys.json'

const describeCommand = (x) => {
  let toReturn = ""

  if (x.subject === commandSubjects.CHANNEL) toReturn += "Channel "
  else if (x.subject === commandSubjects.ADDRESS) toReturn += "Address "
  else if (x.subject === commandSubjects.SUBMASTER) toReturn += "Submaster "

  x.collection.forEach(e => {
    toReturn += (e + " ")
  })
  return toReturn;
}

const makeDefaultCommand = () => {
  return {
    subject: commandSubjects.UNSET,
    type: commandTypes.UNSET,
    collection: [""],
    time: 0,
    targetValue: -1,
    toString: describeCommand
  }
}

const assembleCommand = x => {

  let command = makeDefaultCommand();
  for (let a of x) {
    // deal with digits
    if (a.type === keyTypes.DIGIT) {
      if (command.subject === commandSubjects.UNSET) {
        command.subject = commandSubjects.CHANNEL;
      }
      command.collection[command.collection.length - 1] += a.key
    }

    // deal with collections
    if (a.type === keyTypes.COLLECTION && command.subject === commandSubjects.UNSET) {
      if (keyCompare(a, keys.CHANNEL)) {
        command.subject = commandSubjects.CHANNEL
      }
      if (keyCompare(a, keys.ADDRESS)) {
        command.subject = commandSubjects.ADDRESS
      }
    }

    if (a.type === keyTypes.COLLECTION_MODIFIER) {
      if (keyCompare(a, keys.AND)) {
        command.collection.push("")
      }
    }

    // deal with actions
    // deal with parameters
  }

  return command

}

export const buildCommands = input => input.map(assembleCommand)


