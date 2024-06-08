import { NextResponse } from 'next/server'
import { sendMail } from '@/service/mailService'

export async function POST(req: Request) {
  try {
    const reqBody = await req.json()

    await sendMail('Rostelecom Shop', reqBody.email, reqBody.message)

    return NextResponse.json({ status: 200 })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
