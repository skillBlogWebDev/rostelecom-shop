import clientPromise from '@/lib/mongodb'
import { getAuthRouteData, parseJwt } from '@/lib/utils/api-routes'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { db, validatedTokenResult, reqBody, token } = await getAuthRouteData(
      clientPromise,
      req
    )

    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult)
    }

    if (Object.keys(reqBody).length < 4) {
      return NextResponse.json({
        message: 'Not all fields passed',
        status: 404,
      })
    }

    const user = await db
      .collection('users')
      .findOne({ email: parseJwt(token as string).email })

    const productItem = await db
      .collection(reqBody.category)
      .findOne({ _id: new ObjectId(reqBody.productId) })

    if (!productItem) {
      return NextResponse.json({
        message: 'Wrong product id',
        status: 404,
      })
    }

    const newFavoriteItem = {
      userId: user?._id,
      productId: productItem._id,
      image: productItem.images[0],
      name: productItem.name,
      size: productItem.type === 'umbrella' ? '' : reqBody.size,
      price: productItem.price,
      vendorCode: productItem.vendorCode,
      category: reqBody.category,
      clientId: reqBody.clientId,
    }

    const { insertedId } = await db
      .collection('favorites')
      .insertOne(newFavoriteItem)

    return NextResponse.json({
      status: 201,
      newFavoriteItem: { _id: insertedId, ...newFavoriteItem },
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
