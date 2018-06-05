import _ from "highland";
import keyboard from './keyboard.js'
import { keyTypes, commandTypes, commandSubjects } from './types.js'
import keys from './keys.json'
import { keyCompare } from './keyTools.js'
import { setCommandLineText } from './gui.js'


const processKey = (prev, a) => {
  if (a.type === keyTypes.BACKSPACE) {
    prev = prev.slice(0, prev.length - 1);
    return prev;
  }
  prev.push(a)
  return prev
}

const input = keyboard.scan([], processKey)

const makeDefaultCommand = () => {
  return {
    subject: commandSubjects.UNSET,
    type: commandTypes.UNSET,
    collection: [""],
    time: 0,
    targetValue: -1,
    toString: () => { return }
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

const concat = (a, b) => {
  return a + b + ""
}

const makeCommandString = x => {
  let toReturn = ""
  if (x.subject === commandSubjects.CHANNEL) toReturn += "Channel "
  else if (x.subject === commandSubjects.ADDRESS) toReturn += "Address "
  else if (x.subject === commandSubjects.SUBMASTER) toReturn += "Submaster "

  x.collection.forEach(e => {
    toReturn += (e + " ")
  })
  return toReturn;
}

export const command = input.map(assembleCommand);

command.observe().map(makeCommandString).each(setCommandLineText)
