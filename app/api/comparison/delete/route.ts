import clientPromise from '@/lib/mongodb'
import { deleteProduct } from '@/lib/utils/api-routes'

export async function DELETE(req: Request) {
  try {
    return deleteProduct(
      clientPromise,
      req,
      req.url.split('id=')[1],
      'comparison'
    )
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
