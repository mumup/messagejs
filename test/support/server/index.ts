// Copyright (c) 2021 666666
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import app from './app'
import debug from 'debug'

debug('test:server')

const port = parseInt(process.env.PORT || '3001', 10)
app.set('port', port)

app.listen(app.get('port'), function () {
  debug(`Express server listening on port ${app.get('port')}`)
})
