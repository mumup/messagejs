// import got from 'got'
import nock from 'nock'
import { ServerChan } from '../dist'

const MOCK_SERVER_URL = 'https://sctapi.ftqq.com'

describe('serverChan network test', function () {
  const resp = {
    code: 200,
  }

  test('should fetch status 200', async () => {
    nock(MOCK_SERVER_URL)
      .post(/[\w]\.send/)
      .reply(200, resp)

    const serverChan = new ServerChan({
      sendKey: 'aaaaa',
    })

    const res = await serverChan.send({
      title: 'test',
      desp: 'context',
      openid: 'asfasfasfasfasf',
    })
    expect(res.code).toEqual(200)
  })

  test('should fetch status 200 [encoded]', async () => {
    const resp = {
      code: 200,
    }

    nock(MOCK_SERVER_URL)
      .post(/[\w]\.send/)
      .reply(200, resp)

    const serverChan = new ServerChan({
      sendKey: 'aaaaa',
      encodeOptions: {
        key: '123',
        uid: '123456',
      },
    })

    const res = await serverChan.send({
      title: 'test',
      desp: 'context',
      openid: 'asfasfasfasfasf',
    })
    expect(res.code).toEqual(200)
  })
})

describe('serverChan function test', function () {
  test('should threw sendkey error', () => {
    expect(function () {
      // @ts-expect-error no sendkey
      new ServerChan({})
    }).toThrowError('sendKey is required!')
  })

  test('encoded test', async () => {
    const resp = {
      code: 200,
      message: '',
    }

    nock(MOCK_SERVER_URL).post('/aaa.send').reply(200, resp)

    const serverchan = new ServerChan({
      sendKey: 'aaa',
      encodeOptions: {
        key: '123',
        uid: '666666',
      },
    })

    const res = await serverchan.send({
      encoded: true,
      title: 'test',
      desp: '666',
      openid: 'test',
    })

    expect(res.code).toEqual(200)
  })

  test('encoded test no uid', async () => {
    const resp = {
      code: 200,
      message: '',
    }

    nock(MOCK_SERVER_URL).post('/aaa.send').reply(200, resp)

    const serverchan = new ServerChan({
      sendKey: 'aaa',
      // @ts-expect-error no uid
      encodeOptions: {
        key: '123',
        // uid: '666666'
      },
    })

    expect(
      serverchan.send({
        encoded: true,
        title: 'test',
        desp: '666',
        openid: 'test',
      })
    ).rejects.toThrowError('encoded params is requird!')
  })
})

describe('server return status 400', function () {

  test('encoded test no uid', async () => {
    const resp = {
      code: 400,
      message: 'errrrrrrrro',
    }

    nock(MOCK_SERVER_URL).post('/aaa1.send').reply(400, JSON.stringify(resp))

    const serverchan = new ServerChan({
      sendKey: 'aaa1',
      encodeOptions: {
        key: '123',
        uid: '666666'
      },
    })

    expect(serverchan.send({
      encoded: true,
      title: 'test',
      desp: '666',
      openid: 'test',
    }))
      .rejects.toMatch('errrrrrrrro')
  })
})
