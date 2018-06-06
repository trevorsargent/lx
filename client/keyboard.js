import _ from "highland";
import { keyTypes } from './config/types.js'
import keys from './config/keys.json'
import { keyCompare } from '../lib/keyTools.js'



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
  if (keyCompare(e, keys.CHANNEL) ||
    keyCompare(e, keys.ADDRESS) ||
    keyCompare(e, keys.SUBMASTER)) {
    e.type = keyTypes.COLLECTION
    return e
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

const filterKeyUp = ({ key }) => {
  return false
    || key === "Backspace"
    || key === "Delete"
    || key === "Escape"
    || key === "Tab"
    || key.indexOf("Arrow") > -1
    || key.match(/F\d/)

}

const presses = _()
const up = _()
  .filter(filterKeyUp)

window.onkeypress = e => presses.write(e)
window.onkeyup = e => up.write(e)

export const keyboard = _([presses, up]).merge().map(extractKeyInfo)
