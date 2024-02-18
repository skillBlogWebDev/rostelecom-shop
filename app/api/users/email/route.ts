import { NextResponse } from 'next/server'
import { sendMail } from '@/service/mailService'

export async function POST(req: Request) {
  const res = await req.json()
  try {
    await sendMail(
      'Rostelecom',
      res.email,
      `Ваши данные для входа - пароль: ${res.password}, логин: ${res.email}`
    )
    return NextResponse.json({ message: 'Success' })
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message })
  }
}
