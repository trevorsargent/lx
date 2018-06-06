import _ from "highland";




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

export const keyboard = _([presses, up]).merge()