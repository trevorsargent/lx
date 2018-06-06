import { keyTypes } from './config/types.js'
import keys from './config/keys.json'
import { keyCompare } from '../lib/keyTools.js'

const commandLine = document.getElementById('command-line')



const extractKeyValue = e => {

  return e
    .replace("Key", "")
    .replace("Digit", "")
    .replace("Arrow", "")
    .toUpperCase()

}

const extractKeyType = e => {
  if (e.indexOf("Digit") > -1) {
    return keyTypes.DIGIT
  }
  if (e.indexOf("Arrow") > -1) {
    return keyTypes.ARROW
  }
  return keyTypes.UNSET
}

const applyKeyTypes = (e) => {
  if (e.key.indexOf("EQUAL") > -1) {
    e.type = keyTypes.COLLECTION_MODIFIER
    return e
  }
  if (e.key.indexOf("MINUS") > -1) {
    e.type = keyTypes.COLLECTION_MODIFIER
    return e
  }
  if (e.key.indexOf("BACKSPACE") > -1) {
    e.type = keyTypes.BACKSPACE
    return e
  }

  if (e.key.indexOf("ENTER") > -1) {
    e.type = keyTypes.ENTER
    return e
  }

  if (keyCompare(e, keys.CHANNEL) ||
    keyCompare(e, keys.ADDRESS) ||
    keyCompare(e, keys.SUBMASTER)) {
    e.type = keyTypes.COLLECTION
    return e
  }

  if (keyCompare(e, keys.AT)) {
    e.type = keyTypes.ACTION
  }

  e.type = e.type || keyTypes.UNSET;
  return e
}

const extractKeyInfo = ({ code, altKey, ctrlKey, shiftKey }) => {
  const newKey = {
    key: extractKeyValue(code),
    type: extractKeyType(code),
    alt: altKey,
    ctrl: ctrlKey,
    shift: shiftKey
  }
  return applyKeyTypes(newKey)
}

const setCommandLineText = (text) => {
  commandLine.innerText = text
}

const processKey = (prev, a) => {
  if (a.type === keyTypes.BACKSPACE) {
    prev = prev.slice(0, prev.length - 1);
    return prev;
  }
  prev.push(a)
  return prev
}


const processKeystrokes = keyboard => {
  return keyboard
    .map(extractKeyInfo)

    .scan([], processKey)
}

export default {
  processKeystrokes,
  setCommandLineText
}