// import got from 'got'
import nock from 'nock'
import { Bark } from '../src/index'

const MOCK_SERVER_URL = 'http://mockserverurl.com'

describe('bark network test', function() {
  const bark = new Bark({
    serverUrl: MOCK_SERVER_URL,
  })

  const options = {
    deviceKey: '3sDdttRXknKfkA2nBH1S6G',
    title: 'title',
    body: 'body',
  }

  test('should fetch status 200', async () => {
    const resp = {
      code: 200,
      message: 'success',
      timestamp: Date.now(),
    }
  
    nock(MOCK_SERVER_URL)
      .post(/[\w]{22}/)
      .reply(200, resp)
  
    const res = await bark.push(options)
    expect(res[0].code).toEqual(200)
  })

  test('should catch 400', async () => {
    nock(MOCK_SERVER_URL)
      .post(/[\w]{22}/)
      .reply(400, '')

    expect(
      bark.push(options)
    )
      .rejects.toThrowError()
  })
})

test('should throw error, no serverurl', async () => {
  expect(() => {
    // @ts-expect-error no serverurl
    new Bark({})
  }).toThrow()
})

test('should throw error', async () => {
  const bark = new Bark({
    serverUrl: 'http://baidu.com',
  })

  expect(bark.push({})).rejects.toThrowError()
})

test('should throw error, no body or title', async () => {
  const bark = new Bark({
    serverUrl: 'http://baidu.com',
    defaultPushOption: {
      deviceKey: '3sDdttRXknKfkA2nBH1S6G',
    },
  })

  expect(
    bark.push({
      body: 'test',
    })
  ).rejects.toThrowError()

  expect(bark.push({})).rejects.toThrowError()
})
