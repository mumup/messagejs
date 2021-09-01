// Copyright (c) 2021 mms
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

exports.mochaGlobalSetup = function () {
  const { server } = require('../support/server/index')
  this.server = server
}

exports.mochaGlobalTeardown = function () {
  this.server.close(function() {
    console.log('server stopped!')
  })
}
