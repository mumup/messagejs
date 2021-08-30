import { expect, should } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { cloneDeep } from 'lodash'
chai.use(chaiAsPromised)
should()

import Bark from '../src/packages/bark'

const serverUrl = 'http://localhost:3000'
const config = { title: 'test', body: 'test', deviceKey: process.env.BARK_DEVICE_KEY }

describe('BARK push post', function () {
  const chek = ['deviceKey','title','body'] as const
  chek.forEach((item) => {
    const params = cloneDeep(config)

    delete params[item]

    it(`Bark.push no ${item}`, async function () {
      const bark = new Bark({
        serverUrl
      })
  
      expect(bark.push(params)).eventually.equal(
        `${item} is required!`
      )
    })
  })

  it('Bark.push res 200', async function () {
    const bark = new Bark({
      serverUrl
    })
    const res = await bark.push(config)
    expect(res).to.be.a('object')
    expect(res).be.has.property('code').with.equal(200)
    expect(res).be.has.property('message').with.equal('success')
  })
})
