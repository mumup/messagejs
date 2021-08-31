# Messagejs

## A message sending util

![example workflow](https://github.com/mumup/messagejs/actions/workflows/test.yml/badge.svg)

## Support List

- [Bark](https://github.com/Finb/bark-server)

## Install

```bash
npm install messagejs
```

## Usage

BARK

```javascript
const { Bark } = require('messagejs')

const bark = new Bark({
  serverUrl: 'xxxxx.com',
})

//  push
bark.push({
  deviceKey: 'foo',
})
```

ServerChan

```javascript
const { ServerChan } = require('messagejs')

const serverchan = new ServerChan({
  sendKey: 'xxxx',
  encoded: {  //  options
    uid: 123,
    key: 'xxx'
  }
})

serverchan.send({
  title: 'xxx',
  desp: 'xxx',
  openid: 'axxx,bxxx,cxxx'
  encoded: true //  options
})

```

## Todo

- [ServerChan](https://sct.ftqq.com/)
