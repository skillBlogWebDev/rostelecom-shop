'use client'
import { createDomain } from 'effector'
import { AllowedLangs } from '@/constants/lang'

export const lang = createDomain()

export const setLang = lang.createEvent<AllowedLangs>()
