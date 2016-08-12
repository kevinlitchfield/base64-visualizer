import { decimalToBinaryOctet } from '../helpers.js'

export default function ({ value, character, index, maxIndex } = {}) {
    
  // `value` is a number from 0 to 255.
  this.value = value
  this.binary = (function() { 
    if (value) {
      return decimalToBinaryOctet(value) 
    } 
  })()

  // `character` stores the character this byte represents either entirely or in part.
  this.character = character

  // Some characters, for example 好 and 😀, are stored using multiple bytes. If this byte is part of the representation of a multi-byte character, `index` stores its position (from zero) and `maxIndex` stores the maximum index for that character.
  this.index = index 
  this.maxIndex = maxIndex

  this.characterContinuesToLeft = this.maxIndex && this.index > 0
  this.characterContinuesToRight =  this.maxIndex && this.index < this.maxIndex
  this.numberOfAdditionalBytesToRightInCharacter = this.maxIndex - this.index
}
