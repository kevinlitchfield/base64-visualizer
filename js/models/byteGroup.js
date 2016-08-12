// In effect, Base64 is generated three bytes at a time. ByteGroup wraps an array of three bytes and provides functions that return their binary, Base64 indices, and Base64 values.

import Byte from './byte.js'
import { indexToBase64 } from '../helpers.js'
import { binaryToDecimal } from '../helpers.js'

export default function (bytes) {
  this.bytes = Array(3).fill(new Byte({ value: null, character: null, index: 0, maxIndex: 0 })).map(function(_, i) {
    return (bytes[i] || new Byte({ value: null, character: null, index: 0, maxIndex: 0 }))
  })

  this.binary = this.bytes.map(function (byte) {
    return byte.binary
  }).join('')

  this.binarySextets = this.binary.split(/([01]{6})/).filter(function(match) {
    return match !== ''
  }).map(function(match) {
    return match + "000000".substr(match.length)
  })

  this.base64indices = function () {
    const binarySextets = this.binarySextets
    return [undefined, undefined, undefined, undefined].map(function(_, i) {
      if (binarySextets[i]) {
        return binaryToDecimal(binarySextets[i])
      } 
    })
  }

  this.base64values = this.base64indices().map(function(index) {
    return indexToBase64(index)
  })
}
