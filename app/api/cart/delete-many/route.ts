import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthRouteData, parseJwt } from '@/lib/utils/api-routes'

export async function DELETE(req: Request) {
  try {
    const { db, validatedTokenResult, token } = await getAuthRouteData(
      clientPromise,
      req,
      false
    )

    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult)
    }

    const user = await db
      .collection('users')
      .findOne({ email: parseJwt(token as string).email })

    await db.collection('cart').deleteMany({ userId: user?._id })

    return NextResponse.json({ status: 204 })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
