
const { expect, should } = require('chai')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const { cloneDeep } = require('lodash')
chai.use(chaiAsPromised)
should()

const { Bark } = require('../dist/index')

const serverUrl = 'http://localhost:3001/bark/'
const config = { title: 'test', body: 'test for cli mian', deviceKey: process.env.BARK_DEVICE_KEY }

describe('Bark.push check', function() {
  it('should return code 200', async function () {
    const bark = new Bark({
      serverUrl
    })
    const res = await bark.push(config)
    expect(res).to.be.a('object')
    expect(res).be.has.property('code').with.equal(200)
    expect(res).be.has.property('message').with.equal('success')
  })
})

describe('Bark.push params no value check', function () {
  const chek = ['deviceKey','title','body']
  chek.forEach((item) => {
    const params = cloneDeep(config)

    delete params[item]

    it(`should throw ${item} error`, async function () {
      const bark = new Bark({
        serverUrl
      })
  
      expect(bark.push(params)).eventually.equal(
        `${item} is required!`
      )
    })
  })
})
