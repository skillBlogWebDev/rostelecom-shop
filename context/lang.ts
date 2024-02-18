'use client'
import { AllowedLangs } from '@/constants/lang'
import { createDomain } from 'effector'

const lang = createDomain()

export const setLang = lang.createEvent<AllowedLangs>()

export const $lang = lang
  .createStore(AllowedLangs.RU)
  .on(setLang, (_, lang) => lang)
