import { expect } from 'chai'
import Bark from '../src/packages/bark'

const bark = new Bark({
  serverUrl: 'http://localhost:3000'
})

describe('BARK info post', function () {
  it('Bark.info res 200 check', async function () {
    const res = await bark.info()
    expect(res).to.be.a('object')
    expect(res).to.be.has.property('devices')
    expect(res).to.be.has.property('version')
    expect(res).to.be.has.property('build')
    expect(res).to.be.has.property('arch')
    expect(res).to.be.has.property('commit')
  })
})