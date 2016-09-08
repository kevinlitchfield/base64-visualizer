import expect from 'expect'
import Byte from '../../js/models/byte.js'

const aByte = new Byte({ value: 97, character: 'a', index: 0, maxIndex: 0 })
const firstHaoByte = new Byte({ value: 229, character: '好', index: 0, maxIndex: 2 })
const middleHaoByte = new Byte({ value: 165, character: '好', index: 1, maxIndex: 2 })
const lastHaoByte = new Byte({ value: 189, character: '好', index: 2, maxIndex: 2 })

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
