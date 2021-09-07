// Copyright (c) 2021 666666
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ServerChan } from './dist/index'

const serverchan = new ServerChan({
  sendKey: 'abc',
  encodeOptions: {
    uid: '123',
    key: '321'
  }
})

serverchan.send({
  title: '33333',
  desp: '6767666'
})