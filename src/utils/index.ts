import { createHash, createCipheriv } from 'crypto'
import { Buffer } from 'buffer'

/**
 * serverChan aes加密
 * @param content 要发送的信息
 * @param key 输入密码
 * @param uid 网页上获取的UID
 * @returns
 */
function ScEncode(content: string, key: string, uid: number | string): string {
  const algorithm = 'aes-128-cbc'
  const _key = md5(key).substring(0, 16)
  const _iv = md5('SCT' + uid).substring(0, 16)
  const _content = Buffer.from(content).toString('base64')

  const cipher = createCipheriv(algorithm, _key, _iv)

  let crypted = cipher.update(_content, 'utf8', 'binary')
  crypted += cipher.final('binary')
  crypted = Buffer.from(crypted, 'binary').toString('base64')
  return crypted
}

/**
 * MD5编码
 * @param str 要进行md5的字符串
 * @returns
 */
function md5(str: string): string {
  const hash = createHash('md5')
  return hash.update(str).digest('hex')
}

export { ScEncode, md5 }
