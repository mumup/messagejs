import { expect } from 'chai'
import Bark from '../src/packages/bark'

const bark = new Bark({
  serverUrl: 'http://localhost:3000'
})

describe('BARK ping post', function () {
  it('Bark.ping res 200 check', async function () {
    const res = await bark.ping()
    expect(res).to.be.a('object')
    expect(res).to.be.has.property('code').with.equal(200)
    expect(res).to.be.has.property('message').with.equal('pong')
    expect(res).to.be.has.property('timestamp')
  })
})
