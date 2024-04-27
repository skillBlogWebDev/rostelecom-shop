import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const productsPayload: { _id: string; category: string }[] = reqBody.payload

    if (!productsPayload) {
      return NextResponse.json({
        message: 'payload field is required',
        status: 404,
      })
    }

    const getWatchedProducts = async (category: string) => {
      const goods = await db
        .collection(category)
        .find({
          _id: { $in: productsPayload.map(({ _id }) => new ObjectId(_id)) },
        })
        .toArray()

      return goods
    }

    const [cloth, accessories, office, souvenirs] = await Promise.allSettled([
      getWatchedProducts('cloth'),
      getWatchedProducts('accessories'),
      getWatchedProducts('office'),
      getWatchedProducts('souvenirs'),
    ])

    if (
      cloth.status !== 'fulfilled' ||
      accessories.status !== 'fulfilled' ||
      office.status !== 'fulfilled' ||
      souvenirs.status !== 'fulfilled'
    ) {
      return NextResponse.json({
        count: 0,
        items: [],
      })
    }

    const allGoods = [
      ...cloth.value,
      ...accessories.value,
      ...office.value,
      ...souvenirs.value,
    ]

    return NextResponse.json({
      count: allGoods.length,
      items: allGoods,
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
