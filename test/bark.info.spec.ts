// import got from 'got'
import nock from 'nock'
import { Bark } from '../src/index'

const MOCK_SERVER_URL = 'http://mockserverurl.com'

test('should fetch status 200', async () => {

  const resp = {
    devices: 'number',
    version: 'string',
    build: 'string',
    arch: 'string',
    commit: 'string',
  }

  nock(MOCK_SERVER_URL)
    .get('/info')
    .reply(200, resp)

  const bark = new Bark({
    serverUrl: MOCK_SERVER_URL
  })

  const res = await bark.info()
  expect(res.devices).toEqual('number')
})