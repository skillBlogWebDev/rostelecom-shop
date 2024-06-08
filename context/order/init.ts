import { sample } from 'effector'
import {
  getRostelecomOfficesByCity,
  getRostelecomOfficesByCityFx,
  makePayment,
  makePaymentFx,
} from '.'

sample({
  clock: getRostelecomOfficesByCity,
  source: {},
  fn: (_, data) => data,
  target: getRostelecomOfficesByCityFx,
})

sample({
  clock: makePayment,
  source: {},
  fn: (_, data) => data,
  target: makePaymentFx,
})
