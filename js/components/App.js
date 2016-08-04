import React from 'react'
import queryString from 'query-string'
import Byte from '../models/byte.js'
import Input from '../models/input'
import ByteGroup from './ByteGroup.js'
import { toBase64 } from '../helpers.js'

export default React.createClass({
  getInitialState: function () {
    const input = queryString.parse(location.search).string
    return {input: input || ''}
  },

  handleInputChange: function (e) {
    const input = e.target.value
    if (input) {
      window.history.replaceState('','', [location.protocol, '//', location.host, location.pathname].join('') + '?' + queryString.stringify({string: input}))
    } else {
      window.history.replaceState('','', [location.protocol, '//', location.host, location.pathname].join(''))
    }
    this.setState({input: input})
  },

  result: function (input) {
    if (input.string) {
      return(
        <div className='result'>
          <hr/>
          <p className='result-explanation'>The Base64 representation of <code className='result-input'>{input.string.replace(/ /g, '\u00A0')}</code> is <code className='result-base64'>{toBase64(input.string)}</code>. Here's how each character gets converted:</p>
          <div className='results-table'>
            <table className='bytegroup-labels'>
              <tr className='label-characters'>Characters</tr>
              <tr>Code Units</tr>
              <tr>Bits</tr>
              <tr>Indices</tr>
              <tr className='label-base64-values'>Base64 values</tr>
            </table>

            <div className='bytegroups'>
              {
                input.byteGroups.map(function (byteGroup, i) {
                  return <ByteGroup byteGroup={byteGroup} byteGroupIndex={i}/>
                })
              }
            </div>
          </div>
        </div>
      )
    }
  },

  render: function () {
    const input = new Input(this.state.input)
    return (
      <div>
        <h1>Base64 visualizer</h1>
        <p>See how a UTF-8 string is converted to Base64 (as specified in <a href='https://tools.ietf.org/html/rfc1421'>RFC 1421</a>). <a href='https://github.com/kevinlitchfield/base64-visualizer'>Source code</a></p>

        <p>Enter a string (special characters like ü, 好, and 😉 are OK): <input type='text' value={input.string} onChange={this.handleInputChange} /></p>

        {this.result(input)}
      </div>
    )
  }
})
