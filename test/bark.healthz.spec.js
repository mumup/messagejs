import nock from 'nock'
import { Bark } from '../dist'

const MOCK_SERVER_URL = 'http://mockserverurl.com'

test('should fetch ok', async () => {
  nock(MOCK_SERVER_URL)
    .get('/healthz')
    .reply(200, 'ok')
  const bark = new Bark({
    serverUrl: MOCK_SERVER_URL
  })

  const res = await bark.healthz()
  expect(res).toEqual('ok')
})