import Dysmsapi, * as $Dysmsapi from '@alicloud/dysmsapi20170525'
import * as $OpenApi from '@alicloud/openapi-client'

/**
 * 阿里sms
 */
export default class Alisms {
  private accessKeyId: string
  private accessKeySecret: string

  constructor({ accessKeyId, accessKeySecret }: InitParams) {
    this.accessKeyId = accessKeyId
    this.accessKeySecret = accessKeySecret
  }

  static createClient(accessKeyId: string, accessKeySecret: string): Dysmsapi {
    const config = new $OpenApi.Config({
      accessKeyId,
      accessKeySecret
    })

    config.endpoint = "dysmsapi.aliyuncs.com"
    return new Dysmsapi(config)
  }

  /**
   * 发送短信
   */
  public async sendSms(
    sendParams: SendParams
  ): Promise<$Dysmsapi.SendSmsResponse> {
    const { phoneNumbers, signName, templateCode, templateParam } = sendParams

    const client = Alisms.createClient(this.accessKeyId, this.accessKeySecret)

    const sendReq = new $Dysmsapi.SendSmsRequest({
      phoneNumbers,
      signName,
      templateCode,
      templateParam,
    })

    const sendResp = await client.sendSms(sendReq)

    if (sendResp.body.code === 'OK') {
      console.log('sms send ok: %s', sendResp.body.requestId)
      return Promise.resolve(sendResp)
    } else {
      return Promise.reject(sendResp.body.message || 'sms error')
    }
  }
}

interface InitParams {
  accessKeyId: string
  accessKeySecret: string
}

interface SendParams {
  phoneNumbers: string
  signName: string
  templateCode: string
  templateParam: string
}
