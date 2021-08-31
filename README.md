# Messagejs

## A message sending util

![example workflow](https://github.com/mumup/messagejs/actions/workflows/test.yml/badge.svg)

## Support List

- [Bark](https://github.com/Finb/bark-server)
- [ServerChan](https://sct.ftqq.com/)

## Install

```bash
npm install messagejs
```

## Usage

BARK

```javascript
const { Bark } = require('messagejs')

const bark = new Bark({
  serverUrl: 'http://foo.com',
})

//  push
bark.push({
  deviceKey: 'foo',
  title: 'bar',
  body: 'ahhhhhhhhh'
})
```

ServerChan

```javascript
const { ServerChan } = require('messagejs')

const serverchan = new ServerChan({
  sendKey: 'xxxx',
  encoded: {  //  option
    uid: 123,
    key: 'xxx'
  }
})

serverchan.send({
  title: 'xxx',
  desp: 'xxx',
  openid: 'axxx,bxxx,cxxx'
  encoded: true //  option
})

```

## Todo
