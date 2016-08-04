import expect from 'expect'
import Byte from '../../js/models/byte.js'

const aByte = new Byte(97, 'a', 0, 0)
const firstHaoByte = new Byte(229, '好', 0, 2)
const middleHaoByte = new Byte(165, '好', 1, 2)
const lastHaoByte = new Byte(189, '好', 2, 2)

describe('Byte', () => {
  describe('characterContinuesToRight', () => {
    it('should be true if character continues to right', () => {
      expect(firstHaoByte.characterContinuesToRight).toEqual(true)
      expect(middleHaoByte.characterContinuesToRight).toEqual(true)
    })
    it('should be false if character doesnt continue to right', () => {
      expect(aByte.characterContinuesToRight).toEqual(false)
      expect(lastHaoByte.characterContinuesToRight).toEqual(false)
    })
  })

  describe('characterContinuesToLeft', () => {
    it('should be true if character continues to left', () => {
      expect(lastHaoByte.characterContinuesToLeft).toEqual(true)
      expect(middleHaoByte.characterContinuesToLeft).toEqual(true)
    })
    it('should be false if character doesnt continue to left', () => {
      expect(aByte.characterContinuesToLeft).toEqual(false)
      expect(firstHaoByte.characterContinuesToLeft).toEqual(false)
    })
  })
})
