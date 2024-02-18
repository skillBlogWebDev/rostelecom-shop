import clientPromise from '@/lib/mongodb'
import { getDataFromDBByCollection } from '@/lib/utils/api-routes'

export async function GET(req: Request) {
  try {
    return getDataFromDBByCollection(clientPromise, req, 'cart')
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
