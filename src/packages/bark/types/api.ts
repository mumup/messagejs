export interface BaseConfig {
  deviceKey?: string
  extParams?: ExtParams
  category?: string
  sound?:
    | 'gotosleep.caf'
    | 'paymentsuccess.caf'
    | 'shake.caf'
    | 'alarm.caf'
    | 'bloom.caf'
    | 'sherwoodforest.caf'
    | 'healthnotification.caf'
    | 'calypso.caf'
    | 'descent.caf'
    | 'ladder.caf'
    | 'tiptoes.caf'
    | 'fanfare.caf'
    | 'birdsong.caf'
    | 'typewriters.caf'
    | 'anticipate.caf'
    | 'choo.caf'
    | 'glass.caf'
    | 'telegraph.caf'
    | 'multiwayinvitation.caf'
    | 'newmail.caf'
    | 'update.caf'
    | 'minuet.caf'
    | 'suspense.caf'
    | 'mailsent.caf'
    | 'noir.caf'
    | 'chime.caf'
    | 'spell.caf'
    | 'electronic.caf'
    | 'bell.caf'
    | 'horn.caf'
    | 'newsflash.caf'
}

export interface BarkBaseConfig {
  serverUrl: string,
  defaultPushOption?: BaseConfig
}

export type ExtParams = {
  url?: string
}

export interface PushConfig extends BaseConfig {
  title?: string
  body?: string
}

export type BaseResponse = {
  code: number
  message: string
  timestamp: number
}

export type InfoResponse = {
  devices: number
  version: string
  build: string
  arch: string
  commit: string
}
