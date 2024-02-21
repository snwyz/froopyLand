import moment, { Moment } from 'moment'
import { LICENSE_DURATION_CONVERT } from 'packages/constants'
import Web3 from 'web3'

import { ErrorMetamask } from '@ts'

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function timeFromNow(end: Moment, withoutSuffix = true) {
  return moment(end).fromNow(withoutSuffix)
}

export function weiToEtherString(wei: string) {
  const roundUpDigits = 3
  const ether: any = Web3.utils.fromWei(wei, 'ether')
  const roundedEther =
    Math.ceil(ether * Math.pow(10, roundUpDigits)) /
    (Math.pow(10, roundUpDigits) * 1.0)
  return roundedEther
}

export function convertUrlImage(url: string) {
  if (url) {
    const convertUrl = url?.includes('https://')
      ? url
      : url?.replace('ipfs://', 'https://ipfs.io/ipfs/')

    return convertUrl
  }
  return '/static/license-template/template.png'
}

export function ellipseAddress(address = '', width = 6): string {
  if (!address) {
    return ''
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`
}

export function getTitleErrorMetamask(error: any) {
  const titleError =
    error?.code === ErrorMetamask.ACTION_REJECTED
      ? 'User rejected transaction'
      : error?.error?.message

  return titleError
}

export const validVideoUrl = (url: string): boolean => {
  const regex = /\S+(\.mp4|\.mkv|\.avi)/g.test(url || '')
  if (!regex) {
    return false
  }
  return true
}

export const getColorTab = (duration: string) => {
  switch (duration) {
    case 'a few seconds':
      return 'green'

    case 'a minute':
      return 'yellow'

    case 'a month':
      return 'linkedin'

    case '3 months':
      return 'whatsapp'

    case '6 months':
      return 'orange'

    case '1 year':
      return 'whatsapp'

    default:
      return 'steal'
  }
}

export function generateTimeString(sec_num = 0): string {
  if (sec_num < 0) {
    sec_num = 0
  }
  const hours = Math.floor(sec_num / 3600)
  const minutes = Math.floor((sec_num - hours * 3600) / 60)
  const seconds = sec_num - hours * 3600 - minutes * 60
  let hourStr = hours.toString()
  let minStr = minutes.toString()
  let secStr = seconds.toString()
  if (hours < 10) {
    hourStr = '0' + hours
  }
  if (minutes < 10) {
    minStr = '0' + minutes
  }

  return hourStr + ' hour(s) ' + minStr + ' minute(s)'
}

export function convertValidDurationToString(validDuration = 0): string {
  const getLicenseDuration = LICENSE_DURATION_CONVERT.filter(
    (item) => item.value === validDuration,
  )
  return getLicenseDuration[0]?.name
}

export function convertDurationToValue(expDuration = ''): number {
  const getLicenseDuration = LICENSE_DURATION_CONVERT.filter(
    (item) => item.expDuration === expDuration,
  )
  return getLicenseDuration[0]?.value
}

export function removeDuplicate(array): string[] {
  const uniqueArray = array.filter(function (item, pos) {
    return array.indexOf(item) == pos
  })

  return uniqueArray
}
