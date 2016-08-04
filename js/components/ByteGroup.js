import React from 'react'

export default React.createClass({
  showCharacter: function(byte) {
     const character = byte.character
     if (character) {
       return character.replace(' ', '\u00A0')
     } 
  },

  colspansFor: function(byteGroup) {
    const firstByteColspan = Math.min(8 + 8 * (byteGroup.bytes[0].numberOfAdditionalBytesToRightInCharacter), 24) 
    const secondByteColspan = firstByteColspan > 8 ? 0 : Math.min(8 * (byteGroup.bytes[1].maxIndex + 1), 16)
    const thirdByteColspan = firstByteColspan + secondByteColspan > 16 ? 0 : 8
    return [firstByteColspan, secondByteColspan, thirdByteColspan]
  },

  cssClassesFor: function(byteGroup) {
    let classes = ''
    if (byteGroup.bytes[0].characterContinuesToLeft) {
      classes += ' character-bytes-continue-to-left'
    }
    if (byteGroup.bytes[2].characterContinuesToRight) {
      classes += ' character-bytes-continue-to-right'
    }
    return classes
  },

  bits: function() {
    const bits = this.props.byteGroup.binary
    return (bits + "000000000000000000000000".substr(bits.length)).split('')
  },

  character: function(byte) {
    const showCharacter = this.showCharacter
    if (byte.character) {
      return(
        <code className='result-input'>{showCharacter(byte)}</code>
      )
    } 
  },

  renderByteGroupCharacters: function() {
    const byteGroup = this.props.byteGroup
    const classes = this.cssClassesFor(byteGroup)
    const colspans = this.colspansFor(byteGroup)
    const showCharacter = this.showCharacter
    const character = this.character
    return (
      <tr className={'characters' + classes}>
          { 
            byteGroup.bytes.map(function(byte, i) { 
              return (
                <td className='byte-character' colSpan={ colspans[i] } data-byte-index={i} >
                  {character(byteGroup.bytes[i])}
                </td> 
              )
            })
          }
      </tr>
    )
  },

  render: function () {
    const byteGroup = this.props.byteGroup
    const byteGroupIndex = this.props.byteGroupIndex
    const renderByteGroupCharacters = this.renderByteGroupCharacters
    const bits = this.bits()
    return (
      <table className="bytegroup" data-bytegroup-index={byteGroupIndex}>
        <tbody>
          {renderByteGroupCharacters()}

          <tr className='result-bytes'>
            {byteGroup.bytes.map(function(byte) { return <td colSpan='8' className='result-byte'>{byte.value}</td> })}
          </tr>

          <tr className='result-bits'>
            {bits.map(function(bit) { return <td colSpan='1' className='result-bit'>{bit}</td> })}
          </tr>

          <tr className='indices'>
            { byteGroup.base64indices().map(function(index){return <td colSpan='6' className='result-index'>{index}</td> }) }
          </tr>

          <tr className='base64-encoded'>
            { 
              byteGroup.base64values.map(function(character){
                return (
                  <td colSpan='6' className='base64-character'>
                    <code className='result-base64'>{character}</code>
                  </td> 
                )
              }) 
            }
          </tr>
        </tbody>
      </table>
    )
  }
})
