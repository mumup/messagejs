const { expect } = require('chai')
const { Bark } = require('../dist/index')

const bark = new Bark({
  serverUrl: 'http://localhost:3000'
})

describe('Bark.ping check', function () {
  it('should return code 200, message pong', async function () {
    const res = await bark.ping()
    expect(res).to.be.a('object')
    expect(res).to.be.has.property('code').with.equal(200)
    expect(res).to.be.has.property('message').with.equal('pong')
    expect(res).to.be.has.property('timestamp')
  })
})
