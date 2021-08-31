import got from "got/dist/source"
import { assignIn } from 'lodash'
import { SEND_CONFIG, SEND_RESPONSE, SERVERCHAN_BASE_CONFIG } from "./types/api"
import { ScEncode } from '../../utils/index'

class ServerChan {
  /**
   * 
   * @param options 
   * @param options.sendKey 网页中获取的sendKey
   * @param options.encoded 端对端加密配置
   * @param options.encoded.uid 用户uid, 网页中可获取
   * @param options.encoded.key 查看消息的密码
   */
  constructor(options: SERVERCHAN_BASE_CONFIG) {
    this._options = assignIn(this.defaultOptions, options)
  }
  private BASE_URL = 'https://sctapi.ftqq.com/'

  private defaultOptions = {}

  private _options: SERVERCHAN_BASE_CONFIG = {
    sendKey: ''
  }

  /**
   * ServerChan send api
   * @param sendOptions 配置
   * @param sendOptions.title 标题
   * @param sendOptions.desp 内容
   * @param sendOptions.openid 收信人openid
   * @param sendOptions.encoded 是否进行端对端加密, 需要先配置key和uid
   * @returns
   */
  public send = (sendOptions: SEND_CONFIG): Promise<SEND_RESPONSE> => {
    return new Promise((resolve, reject) => {
      if (!this._options.sendKey) {
        reject(new Error('sendKey is requird!'))
      }

      if (this._options.encoded !== undefined && typeof this._options.encoded === 'object') {
        if (this._options.encoded.uid === undefined || this._options.encoded.key === undefined) {
          reject(new Error('encoded params is requird!'))
        }
      }

      const url = `${this.BASE_URL}${this._options.sendKey}.send`

      const { title, desp, encoded, openid } = sendOptions

      const postForm = {
        title,
        openid,
        desp: '',
        encoded: encoded ? 1 : ''
      }

      if (this._options.encoded?.key && this._options.encoded.uid) {
        postForm.desp = ScEncode(desp, this._options.encoded.key ,this._options.encoded.uid)
      } else {
        postForm.desp = desp
      }

      got.post(url, {
        form: postForm
      })
        .then((res) => {
          if (res.statusCode === 200) {
            const body: SEND_RESPONSE = JSON.parse(res.body)
            resolve(body)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default ServerChan