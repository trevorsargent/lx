export const shatterCommand = x => {
  return x.collection.map(e => {
    return {
      channel: Number.parseInt(e),
      targetValue: x.targetValue,
      time: x.time
    }
  })
}

export const filterIncompleteCommands = x => x.complete