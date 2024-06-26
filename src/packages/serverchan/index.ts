import got from "got"
import { assignIn, isObject } from 'lodash-es'
import { SEND_CONFIG, SEND_RESPONSE, SERVERCHAN_BASE_CONFIG } from "./types/api.js"
import { ScEncode } from '../../utils/index.js'

class ServerChan {
  private BASE_URL = 'https://sctapi.ftqq.com/'

  private baseOptions: SERVERCHAN_BASE_CONFIG = {
    sendKey: ''
  }

    /**
   * 
   * @param options 
   * @param options.sendKey 网页中获取的sendKey
   * @param options.encodeOptions 端对端加密配置
   * @param options.encodeOptions.uid 用户uid, 网页中可获取
   * @param options.encodeOptions.key 查看消息的密码
   */
     constructor(options: SERVERCHAN_BASE_CONFIG) {
      if (!options.sendKey) {
        throw Error('sendKey is required!')
      }
      this.baseOptions = assignIn(this.baseOptions, options)
    }

  /**
   * ServerChan send api
   * @param sendOptions 配置
   * @param sendOptions.title 标题
   * @param sendOptions.desp 内容
   * @param sendOptions.openid 收信人openid
   * @param sendOptions.encoded 是否进行端对端加密, 需要先配置key和uid
   * @param sendOptions.channel 发送通道, '|'好分隔，最多2个
   * @returns
   */
  public send = (sendOptions: SEND_CONFIG): Promise<SEND_RESPONSE> => {
    return new Promise((resolve, reject) => {

      const url = `${this.BASE_URL}${this.baseOptions.sendKey}.send`

      const { title, desp, encoded, openid, channel } = sendOptions

      const postForm = {
        title,
        openid,
        desp: '',
        encoded: encoded ? 1 : '',
        channel
      }

      if (encoded && isObject(this.baseOptions.encodeOptions)) {
        if (!this.baseOptions.encodeOptions.uid || !this.baseOptions.encodeOptions.key) {
          reject(new Error('encoded params is requird!'))
        } else {
          postForm.desp = ScEncode(desp, this.baseOptions.encodeOptions.key ,this.baseOptions.encodeOptions.uid)
        }
      } else {
        postForm.desp = desp
      }

      got.post(url, {
        form: postForm,
        hooks: {
          beforeError: [
            (error) => {
              const { response } = error
              if (response?.statusCode === 400) {
                if (typeof response.body === 'string') {
                  error.message = JSON.parse(response.body).message
                }
              }
              return error
            }
          ]
        }
      })
        .then((res) => {
          if (res.statusCode === 200) {
            const body: SEND_RESPONSE = JSON.parse(res.body)
            resolve(body)
          }
        })
        .catch(err => {
          reject('ERROR: ' + err.message || 'unknow error')
        })
    })
  }
}

export default ServerChan