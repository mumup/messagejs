import {
  BarkBaseConfig,
  BaseResponse,
  InfoResponse,
  PushConfig
} from './types/api'
import got from 'got/dist/source'
import { RequestError } from 'got/dist/source'
import { URL } from 'url'
import { assignIn } from 'lodash'

class Bark {
  constructor(config: BarkBaseConfig) {
    this._config = {
      serverUrl: ''
    }
    assignIn(this._config, config)
  }

  private _config: BarkBaseConfig

  private getBaseUrl(path: string | '') {
    const baseUrl = new URL(
      this._config.deviceKey + path,
      this._config.serverUrl
    )
    return baseUrl.toString()
  }

  public push = (option: PushConfig): Promise<BaseResponse> => {
    return new Promise((resolve, reject) => {
      if (
        option.deviceKey === undefined &&
        this._config.deviceKey === undefined
      ) {
        reject(new Error('deviceKey is required!'))
      }

      if (option.title === undefined) {
        reject(new Error('title is required!'))
      }

      if (option.body === undefined) {
        reject(new Error('body is required!'))
      }

      const url = this.getBaseUrl('')

      got
        .post(url, {
          json: option
        })
        .then((res) => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(res.body))
          }
        })
        .catch((err: RequestError) => {
          reject(err)
        })
    })
  }

  public info = (): Promise<InfoResponse> => {
    return new Promise((resolve, reject) => {
      got
        .get(this._config.serverUrl + '/info')
        .then((res) => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(res.body))
          }
        })
        .catch((err: RequestError) => {
          reject(err)
        })
    })
  }

  public ping = (): Promise<BaseResponse> => {
    return new Promise((resolve, reject) => {
      got
        .get(this._config.serverUrl + '/ping')
        .then((res) => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(res.body))
          }
        })
        .catch((err: RequestError) => {
          reject(err)
        })
    })
  }

  public healthz = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      got
        .get(this._config.serverUrl + '/healthz')
        .then((res) => {
          if (res.statusCode === 200) {
            resolve(res.body)
          }
        })
        .catch((err: RequestError) => {
          reject(err)
        })
    })
  }
}

export default Bark
