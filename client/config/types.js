export const keyTypes = {
  UNSET: Symbol('unset'),
  DIGIT: Symbol('digit'),
  LETTER: Symbol('letter'),
  ARROW: Symbol('arrow'),
  BACKSPACE: Symbol('backspace'),
  COLLECTION: Symbol('collection'),
  COLLECTION_MODIFIER: Symbol('collection-modifier')
}

export const commandSubjects = {
  UNSET: Symbol('unset'),
  CHANNEL: Symbol('channel'),
  ADDRESS: Symbol('address'),
  SUBMASTER: Symbol('submaster')
}
export const commandTypes = {
  UNSET: Symbol('unset'),

  // Channels and Addresses
  LEVEL_MOVE: Symbol('level-move'),
}