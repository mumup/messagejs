import { expect } from 'chai'
import { ServerChan } from '../src/packages/serverchan'

describe('ServerChan test', function () {
  it('ServerChan.send check', async function () {
    const serverchan = new ServerChan({
      sendKey: process.env.SEVERCHAN_SENDKEY
    })

    const res = await serverchan.send({
      title: 'ci test',
      desp: 'ci test:' + new Date().toLocaleDateString()
    })

    expect(res).to.be.a('object')
    expect(res).to.be.has.property('code')
    expect(res.code).be.equal(0)
  })

  it('ServerChan.send[encoded] check', async function () {
    const serverchan = new ServerChan({
      sendKey: process.env.SEVERCHAN_SENDKEY,
      encoded: {
        uid: process.env.SEVERCHAN_UID,
        key: '123456'
      }
    })

    const res = await serverchan.send({
      title: 'ci test',
      desp: 'ci test[encoded]:' + new Date().toLocaleDateString(),
      encoded: true
    })

    expect(res).to.be.a('object')
    expect(res).to.be.has.property('code')
    expect(res.code).be.equal(0)
  })
})