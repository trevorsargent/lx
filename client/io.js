import _ from "highland";
import { keyTypes } from './config/types.js'
import keys from './config/keys.json'
import { keyCompare } from '../lib/keyTools.js'

const commandLine = document.getElementById('command-line')

const cleanKeyCode = e => {

  return e
    .replace("Key", "")
    .replace("Digit", "")
    .replace("Arrow", "")
    .toUpperCase()

}

const getKeyType = e => {
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

const extractAndApplyKeyInfo = ({ code, altKey, ctrlKey, shiftKey }) => {
  const newKey = {
    key: cleanKeyCode(code),
    type: getKeyType(code),
    alt: altKey,
    ctrl: ctrlKey,
    shift: shiftKey
  }
  return applyKeyTypes(newKey)
}

const setCommandLineText = (text) => {
  commandLine.innerText = text
}

const handleInput = (prev, a) => {

  if (prev.length > 0 && prev[prev.length - 1].type === keyTypes.ENTER) {
    prev = []
  }

  if (a.type === keyTypes.BACKSPACE) {
    prev = prev.slice(0, prev.length - 1);
    return prev;
  }

  prev.push(a)
  return prev
}

const handleAndTypeInput = keyboard => {
  return keyboard
    .map(extractAndApplyKeyInfo)
    .scan([], handleInput)
}

const updateDisplay = (change) => {
  const channelDisplay = document.getElementById(`output-level-${change.channel}`)
  channelDisplay.style.width = change.value + '%'
}

export default {
  handleAndTypeInput,
  setCommandLineText,
  updateDisplay
}
