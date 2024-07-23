import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { findUserByEmail, getDbAndReqBody } from '@/lib/utils/api-routes'
import { sendMail } from '@/service/mailService'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const user = await findUserByEmail(db, reqBody.email)

    if (!user) {
      return NextResponse.json({
        error: { message: 'Пользователь с таким email не найден' },
        status: 400,
      })
    }

    const code = Math.floor(100000 + Math.random() * 900000)

    await sendMail(
      'Rostelecom',
      reqBody.email,
      `Ваш код подтверждения для восстановления пароля: ${code}`
    )

    const { insertedId } = await db.collection('codes').insertOne({
      code,
    })

    return NextResponse.json({ status: 200, codeId: insertedId })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
