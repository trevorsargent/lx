import { keyTypes, commandTypes, commandSubjects, actions } from './config/types.js'
import { keyCompare } from '../lib/keyTools.js'
import keys from './config/keys.json'

const describeCommand = (x) => {
  let toReturn = ""

  if (x.subject === commandSubjects.CHANNEL) toReturn += "Channel "
  else if (x.subject === commandSubjects.ADDRESS) toReturn += "Address "
  else if (x.subject === commandSubjects.SUBMASTER) toReturn += "Submaster "

  x.collection.forEach((e, i) => {
    if (i != 0) {
      toReturn += " + "
    }
    toReturn += (e)

  })

  toReturn += " "

  if (x.action === actions.AT) toReturn += "@ "

  if (x.action != actions.UNSET) {
    toReturn += x.targetValue
  }

  if (x.complete) {
    toReturn += "•"
  }
  return toReturn;
}

const makeDefaultCommand = () => {
  return {
    subject: commandSubjects.UNSET,
    type: commandTypes.UNSET,
    action: actions.UNSET,
    collection: [""],
    time: 0,
    targetValue: "",
    complete: false,
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
      if (command.action === actions.UNSET) {
        command.collection[command.collection.length - 1] += a.key
      }

      if (command.action === actions.AT) {
        command.targetValue += a.key
      }
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
    if (a.type === keyTypes.ACTION) {
      if (keyCompare(a, keys.AT)) {
        command.action = actions.AT
      }
    }
    // deal with parameters

    // handle complete case
    if (a.type === keyTypes.ENTER) {
      command.complete = true
    }
  }


  return command

}

const buildCommands = input => input.map(assembleCommand)

export default {
  buildCommands
}



