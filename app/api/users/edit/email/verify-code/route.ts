import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { ObjectId } from 'mongodb'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)

    const codeData = await db
      .collection('codes')
      .findOne({ _id: new ObjectId(reqBody.codeId) })

    if (!codeData) {
      return NextResponse.json({
        status: 400,
        error: { message: 'Неправильный айди кода!' },
      })
    }

    if (codeData.code === reqBody.code) {
      await db
        .collection('codes')
        .deleteOne({ _id: new ObjectId(reqBody.codeId) })

      return NextResponse.json({
        status: 200,
        result: true,
        newEmail: codeData.newEmail,
      })
    }

    return NextResponse.json({
      status: 400,
      result: false,
      error: { message: 'Неправильный код!' },
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
