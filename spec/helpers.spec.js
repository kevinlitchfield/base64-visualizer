import expect from 'expect'
import * as helpers from '../js/helpers.js'
import _ from 'lodash'

describe('decimalToBinaryOctet', () => {
  it('should convert a decimal number from 0 to 255 to a binary octet', () => {
    expect(helpers.decimalToBinaryOctet(0)).toEqual('00000000')
    expect(helpers.decimalToBinaryOctet(10)).toEqual('00001010')
  })
})

describe('binaryToDecimal', () => {
  it('should convert a binary number to decimal in string form', () => {
    expect(helpers.binaryToDecimal(1010)).toEqual(10)
  })
})

describe('toBase64', () => {
  it('should convert a string to Base64', () => {
    expect(helpers.toBase64('m')).toEqual('bQ==')
  })
})

describe('indexToBase64', () => {
  it('should convert a Base64 index to a Base64 value, per the specification in RFC 1421', () => {
    const digits = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/']
    _.times(64, (i) => {
      expect(helpers.indexToBase64(i)).toEqual(digits[i])
    })
    expect(helpers.indexToBase64(undefined)).toEqual('=')
  })
})
