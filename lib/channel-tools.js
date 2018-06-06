const newChannel = () => {
  return {
    value: 0
  }
}

export const setupChannels = (numChannels) => {
  let s = {}
  for (let i = 1; i <= numChannels; i++) {
    s[i] = newChannel();
  }
  return s
}