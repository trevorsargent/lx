import _ from "highland";

const cleanKeyValue = e => {
  return e
    .replace("Key", "")
    .replace("Digit", "")
    .replace("Arrow", "")
    .toUpperCase()

}

const extractKeyInfo = ({ code, altKey, ctrlKey, shiftKey }) => {
  return {
    key: cleanKeyValue(code),
    alt: altKey,
    ctrl: ctrlKey,
    shift: shiftKey
  }
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

export const keys = _([presses, up]).merge().map(extractKeyInfo)