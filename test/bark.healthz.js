const { expect } = require('chai')
const { Bark } = require('../dist/index')

const bark = new Bark({
  serverUrl: 'http://localhost:3000'
})

describe('Bark.healthz check', function () {
  it('should res ok', async function () {
    const res = await bark.healthz()
    expect(res).to.be.equal('ok')
  })
})