import Character from '../models/character.js'
import Byte from '../models/byte.js'
import ByteGroup from '../models/byteGroup.js'
// `spliddit` takes surrogate pairs into account, unlike `String.prototype.split()`
import splitOnRealCharacters from 'spliddit' 
import _ from 'lodash'

export default function (string) {
  this.string = string

  this.bytes = splitOnRealCharacters(this.string).map(function(character) {
    return new Character(character).codeunits.map(function(codeunit, i, codeunits) {
      return new Byte({ value: codeunit.charCodeAt(0), character: character, index: i, maxIndex: codeunits.length - 1 })
    })
  }).reduce(function (a, b) { return a.concat(b) }, [] )

  this.byteGroups = _.chunk(this.bytes, 3).map(function (bytes) {
    return new ByteGroup(bytes)
  })
}
