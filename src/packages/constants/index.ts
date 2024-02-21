import { SortType } from 'packages/store/types'

import { LicenseDuration } from '@ts'
import { EnvTypes } from '@ts'

export const isProd = process.env.NEXT_PUBLIC_ENV === EnvTypes.Production

const MINION_DURATIONS_PROD: LicenseDuration[] = [
  {
    value: 2592000,
    name: '1 Month',
    expDuration: 'a month',
  },
  {
    value: 7776000,
    name: '3 Months',
    expDuration: '3 months',
  },
  {
    value: 15552000,
    name: '6 Months',
    expDuration: '6 months',
  },
]

const MINION_DURATIONS_DEV = MINION_DURATIONS_PROD.concat([
  {
    value: 60,
    name: '1 Mintue',
    expDuration: 'a minute',
  },
  {
    value: 31104000,
    name: '1 Year',
    expDuration: '1 year',
  },
])

export const LICENSE_DURATION: LicenseDuration[] = isProd
  ? MINION_DURATIONS_PROD
  : MINION_DURATIONS_DEV

export const LICENSE_DURATION_CONVERT: LicenseDuration[] = isProd
  ? MINION_DURATIONS_PROD
  : MINION_DURATIONS_DEV

export const LICENSE_DURATION_SIDEBAR: LicenseDuration[] = [
  {
    value: 2592000,
    name: '1 Month',
    expDuration: 'a month',
  },
  {
    value: 7776000,
    name: '3 Months',
    expDuration: '3 months',
  },
  {
    value: 15552000,
    name: '6 Months',
    expDuration: '6 months',
  },
]

export const optionSortBy: SortType[] = [
  {
    value: 'price-low-to-high',
    title: 'Price low to high',
  },
  {
    value: 'price-high-to-low',
    title: 'Price high to low',
  },
  {
    value: 'duration-low-to-high',
    title: 'Duration low to high',
  },
  {
    value: 'duration-high-to-low',
    title: 'Duration high to low',
  },
]
