import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const user = await db.collection('users').findOne({ email: reqBody.email })
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(reqBody.password, salt)

    await db.collection('users').updateOne(
      {
        _id: new ObjectId(user?._id),
      },
      {
        $set: {
          password: hash,
        },
      }
    )

    return NextResponse.json({ status: 200 })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
