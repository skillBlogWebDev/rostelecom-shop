import ProductsPage from '@/components/templates/ProductsPage/ProductsPage'
import { SearchParams } from '@/types/catalog'

export default function Catalog({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  return <ProductsPage searchParams={searchParams || {}} pageName='catalog' />
}
