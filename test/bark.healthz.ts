import { expect } from 'chai'
import Bark from '../src/packages/bark'

const bark = new Bark({
  serverUrl: 'http://localhost:3000'
})

describe('BARK healthz post', function () {
  it('Bark.healthz res 200 check', async function () {
    const res = await bark.healthz()
    expect(res).to.be.equal('ok')
  })
})