# Messagejs

## A message sending util

![example workflow](https://github.com/mumup/messagejs/actions/workflows/test.yml/badge.svg)

## Support List

- [Bark](https://github.com/Finb/bark-server)
- [ServerChan](https://sct.ftqq.com/)
- [alisms](https://www.aliyun.com/product/sms?spm=5176.21213303.1128094.3.6e6f3eda2HN1z7)

## Install

```bash
npm install messagejs
```

## Usage

BARK

```javascript
import { Bark } from '@666666/messagejs'

const bark = new Bark({
  serverUrl: 'http://foo.com',
  defaultPushOption: {
    deviceKey: 'foo,bar',
    sound: 'bloom.caf'
  }
})

//  push
bark.push({
  deviceKey: 'bar',
  title: 'bar',
  body: 'ahhhhhhhhh'
})
```

ServerChan

```javascript
import { ServerChan } from '@666666/messagejs'

const serverchan = new ServerChan({
  sendKey: 'xxxx',
  encodeOptions: {  //  option
    uid: 123,
    key: 'xxx'
  }
})

serverchan.send({
  title: 'xxx',
  desp: 'xxx',
  openid: 'axxx,bxxx,cxxx',
  encoded: true, //  option
  channel: '9|66'
})

```

alisms(前阿里大于)

```javascript
import { Alisms } from '@666666/messagejs'

const alisms = new Alisms({
  accessKeyId: 'xxx',
  accessKeySecret: 'xxx'
})

alisms.sendSms({
  phoneNumbers: '13xxxxxxx',
  signName: '测试',
  templateCode: 'xxxx',
  templateParam: '{a: 123, b: 456}'
})

```

## Todo
