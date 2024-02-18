import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { corsHeaders } from '@/constants/corsHeaders'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const category = url.searchParams.get('category')

    await db
      .collection(category as string)
      .deleteOne({ _id: new ObjectId(id as string) })

    return NextResponse.json(
      {
        status: 204,
      },
      corsHeaders
    )
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
