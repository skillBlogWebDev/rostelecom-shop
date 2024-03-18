'use client'
import ComparisonList from '@/components/modules/Comparison/ComparisonList'
import { productTypes } from '@/constants/product'
import { useComparisonItems } from '@/hooks/useComparisonItems'
import { notFound } from 'next/navigation'

export default function ComparisonType({
  params,
}: {
  params: { type: string }
}) {
  if (!productTypes.includes(params.type)) {
    notFound()
  }

  const { items } = useComparisonItems(params.type)

  return <ComparisonList items={items} />
}
