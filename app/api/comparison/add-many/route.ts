import clientPromise from '@/lib/mongodb'
import { replaceProductsInCollection } from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    return replaceProductsInCollection(clientPromise, req, 'comparison')
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
