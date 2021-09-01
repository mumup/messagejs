// Copyright (c) 2021 666666
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { app } = require('./app')
const debug = require('debug')

debug('test:server')

const port = parseInt(process.env.PORT || '3001', 10)
app.set('port', port)

const server = app.listen(app.get('port'), function () {
  console.log(`Express server listening on port ${app.get('port')}`)
})

module.exports.server = server