// import got from 'got'
import nock from 'nock'
import { Bark } from '../dist'

const MOCK_SERVER_URL = 'http://mockserverurl.com'

test('should fetch status 200', async () => {
  nock(MOCK_SERVER_URL)
    .get('/ping')
    .reply(200, {
      code: 200,
      message: 'pong',
      timestamp: Date.now()
    })
  const bark = new Bark({
    serverUrl: MOCK_SERVER_URL
  })

  const res = await bark.ping()
  expect(res.code).toEqual(200)
})