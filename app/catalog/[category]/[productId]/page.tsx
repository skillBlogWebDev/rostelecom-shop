import { notFound } from 'next/navigation'
import { productCategories } from '@/constants/product'
import ProductPage from '@/components/templates/ProductPage/ProductPage'

export default function Product({
  params,
}: {
  params: { productId: string; category: string }
}) {
  if (!productCategories.includes(params.category)) {
    notFound()
  }

  return <ProductPage productId={params.productId} category={params.category} />
}
