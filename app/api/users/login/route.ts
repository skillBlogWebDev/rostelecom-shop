import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import {
  findUserByEmail,
  generateTokens,
  getDbAndReqBody,
} from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
  const user = await findUserByEmail(db, reqBody.email)

  if (!user) {
    return NextResponse.json({
      warningMessage: 'Пользователя не существует',
    })
  }

  if (!bcrypt.compareSync(reqBody.password, user.password)) {
    return NextResponse.json({
      warningMessage: 'Неправильный логин или пароль!',
    })
  }

  const tokens = generateTokens(user.name, reqBody.email)

  return NextResponse.json(tokens)
}
