import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import {
  generateTokens,
  getAuthRouteData,
  parseJwt,
} from '@/lib/utils/api-routes'

export async function PATCH(req: Request) {
  try {
    const { db, validatedTokenResult, reqBody, token } = await getAuthRouteData(
      clientPromise,
      req
    )

    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult)
    }

    if (!reqBody.email) {
      return NextResponse.json({
        error: { message: 'email field is required' },
        status: 400,
      })
    }

    const user = await db
      .collection('users')
      .findOne({ email: parseJwt(token as string).email })

    await db.collection('users').updateOne(
      {
        _id: new ObjectId(user?._id),
      },
      {
        $set: {
          email: reqBody.email,
        },
      }
    )

    const tokens = generateTokens(user?.name, reqBody.email)

    return NextResponse.json({ status: 200, email: reqBody.email, tokens })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
