import { keyTypes } from './config/types.js'

const commandLine = document.getElementById('command-line')

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

const processKeystrokes = (keyboard) => keyboard.scan([], processKey)

export default {
  processKeystrokes,
  setCommandLineText
}