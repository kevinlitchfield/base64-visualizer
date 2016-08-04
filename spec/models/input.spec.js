import expect from 'expect'
import Input from '../../js/models/input.js'
import _ from 'lodash'

describe('Input', () => {
  describe('bytes', () => {
    const input = new Input('a好😉ü')

    it('creates bytes with the right values', () => {
      expect(input.bytes.map((byte) => {return byte.value})).toEqual([97, 229, 165, 189, 240, 159, 152, 137, 195, 188])
    })
  })

  describe('byteGroups', () => {
    const oneByteInput = new Input('a')
    const sixByteInput = new Input('123456')
    const tenByteInput = new Input('a好😉ü')

    it('creates byteGroups from bytes, padding the last one with null bytes if length < 3', () => {
      [oneByteInput, sixByteInput, tenByteInput].forEach((input) => {
        expect(_.every(input.byteGroups, (byteGroup) => { return byteGroup.bytes.length === 3 })).toEqual(true)
      })
    })
  })
})
