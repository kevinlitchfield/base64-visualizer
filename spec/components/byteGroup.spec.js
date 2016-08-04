import React from 'react'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import expectJSX from 'expect-jsx'
import Input from '../../js/models/input.js'
import ByteGroup from '../../js/components/ByteGroup.js'

expect.extend(expectJSX)


describe('<ByteGroup/>', () => {
  const renderByteGroup = function(inputString) {
    const input = new Input(inputString)
    const byteGroup = input.byteGroups[0]
    const renderer = TestUtils.createRenderer()
    renderer.render(<ByteGroup byteGroup={byteGroup} />)
    return renderer.getRenderOutput()
  }

  it('displays single-byte characters and empty bytes properly', () => {
    expect(renderByteGroup('a')).toIncludeJSX(<td className="byte-character" colSpan={8} data-byte-index={0}><code className="result-input">a</code></td>)
    expect(renderByteGroup('a')).toIncludeJSX(<td className="byte-character" colSpan={8} data-byte-index={1}></td>)
    expect(renderByteGroup('a')).toIncludeJSX(<td className="byte-character" colSpan={8} data-byte-index={2}></td>)
  })

  it('displays multi-byte characters properly', () => {
    expect(renderByteGroup('a你')).toIncludeJSX(<td className="byte-character" colSpan={8} data-byte-index={0}><code className="result-input">a</code></td>)
    expect(renderByteGroup('a你')).toIncludeJSX(<td className="byte-character" colSpan={16} data-byte-index={1}><code className="result-input">你</code></td>)
    expect(renderByteGroup('a你')).toIncludeJSX(<td className="byte-character" colSpan={0} data-byte-index={2}><code className="result-input">你</code></td>)
  })
})
