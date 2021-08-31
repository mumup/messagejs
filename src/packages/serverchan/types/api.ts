export type SERVERCHAN_BASE_CONFIG = {
  sendKey: string,
  encoded?: ENCODED
}

export interface SEND_CONFIG {
  title: string,
  desp: string,
  openid?: string,
  encoded?: boolean
}

export type ENCODED = {
  uid: number | string,
  key: string
}

export interface BASE_RESPONSE {
  code: number,
  message: string
}

export interface SEND_RESPONSE extends BASE_RESPONSE {
  data: SEND_RESPONSE_DATA
}

export type SEND_RESPONSE_DATA = {
  pushid: number,
  readkey: string,
  error: string,
  errno: number
}

// {"code":0,"message":"","data":{"pushid":"11471138","readkey":"SCTd8YiLnAAV2dq","error":"SUCCESS","errno":0}}