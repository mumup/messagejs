import {
  BarkBaseConfig,
  BaseResponse,
  InfoResponse,
  PushConfig,
} from './types/api.js'
import got, { CancelableRequest, Response } from 'got'
import { URL } from 'url'
import { assignIn } from 'lodash-es'

class Bark {
  private barkConfig: BarkBaseConfig = {
    serverUrl: ''
  }
  private baseUrl = ''

  private getBaseUrl(deviceKey: string, path: string | '') {
    const baseUrl = new URL(deviceKey + path, this.baseUrl)
    return baseUrl.toString()
  }

  constructor(config: BarkBaseConfig) {
    if (!config.serverUrl) {
      throw Error('serverUrl is required!')
    }

    this.baseUrl = config.serverUrl

    assignIn(this.barkConfig, config)
  }

  /**
   * push
   */
  public async push(option: PushConfig): Promise<BaseResponse[]> {
    const pushList: CancelableRequest<Response<string>>[] = []

    const currentDeviceKeys =
      option.deviceKey || this.barkConfig.defaultPushOption?.deviceKey

    if (!currentDeviceKeys) {
      throw Error('deviceKey is required!')
    }

    const { title, body } = option

    if (!title || !body) {
      throw Error('title and body is required!')
    }

    const deviceKeys = currentDeviceKeys.split(',')

    deviceKeys.forEach((deviceKey) => {
      const url = this.getBaseUrl(deviceKey, '')
      pushList.push(
        got.post(url, {
          json: assignIn(this.barkConfig.defaultPushOption, option),
        })
      )
    })

    try {
      const res = await Promise.all(pushList)
      return res.map((d) => {
        return JSON.parse(d.body)
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * info
   */
  public async info(): Promise<InfoResponse> {
    try {
      const res = await got(`${this.barkConfig.serverUrl}/info`)
      return JSON.parse(res.body)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * ping
   */
  public async ping(): Promise<BaseResponse> {
    try {
      const res = await got(`${this.barkConfig.serverUrl}/ping`)
      return JSON.parse(res.body)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * healthz
   */
  public async healthz(): Promise<string> {
    try {
      const res = await got(`${this.barkConfig.serverUrl}/healthz`)
      return res.body
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default Bark
