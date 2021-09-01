const { expect } = require('chai')
const { Bark } = require('../dist/index')

const bark = new Bark({
  serverUrl: 'http://localhost:3000'
})

describe('Bark.info check', function () {
  it('should return info object', async function () {
    const res = await bark.info()
    expect(res).to.be.a('object')
    expect(res).to.be.has.property('devices')
    expect(res).to.be.has.property('version')
    expect(res).to.be.has.property('build')
    expect(res).to.be.has.property('arch')
    expect(res).to.be.has.property('commit')
  })
})