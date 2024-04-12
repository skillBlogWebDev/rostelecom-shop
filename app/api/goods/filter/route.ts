import { allowedColors, allowedSizes } from '@/constants/product'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { checkPriceParam, getCheckedArrayParam } from '@/lib/utils/common'
import { Sort } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const limit = url.searchParams.get('limit') || 12
    const offset = url.searchParams.get('offset') || 0
    const isCatalogParam = url.searchParams.get('catalog')
    const typeParam = url.searchParams.get('type')
    const categoryParam = url.searchParams.get('category')
    const priceFromParam = url.searchParams.get('priceFrom')
    const priceToParam = url.searchParams.get('priceTo')
    const sizesParam = url.searchParams.get('sizes')
    const colorsParam = url.searchParams.get('colors')
    const sortParam = url.searchParams.get('sort') || 'default'
    const isFullPriceRange =
      priceFromParam &&
      priceToParam &&
      checkPriceParam(+priceFromParam) &&
      checkPriceParam(+priceToParam)
    const sizesArr = getCheckedArrayParam(sizesParam as string)
    const colorsArr = getCheckedArrayParam(colorsParam as string)
    const isValidColors =
      colorsArr && colorsArr.every((color) => allowedColors.includes(color))
    const isValidSizes =
      sizesArr &&
      sizesArr.every((size) => allowedSizes.includes(size.toLowerCase()))
    const filter = {
      ...(typeParam && { type: typeParam }),
      ...(isFullPriceRange && {
        price: { $gt: +priceFromParam, $lt: +priceToParam },
      }),
      ...(isValidSizes && {
        $and: (sizesArr as string[]).map((sizes) => ({
          [`sizes.${sizes.toLowerCase()}`]: true,
        })),
      }),
      ...(isValidColors && {
        $or: (colorsArr as string[]).map((color) => ({
          ['characteristics.color']: color.toLowerCase(),
        })),
      }),
    }
    const sort = {
      ...(sortParam.includes('cheap_first') && {
        price: 1,
      }),
      ...(sortParam.includes('expensive_first') && {
        price: -1,
      }),
      ...(sortParam.includes('new') && {
        isNew: -1,
      }),
      ...(sortParam.includes('popular') && {
        popularity: -1,
      }),
    }

    if (isCatalogParam) {
      const getFilteredCollection = async (collection: string) => {
        const goods = await db
          .collection(collection)
          .find(filter)
          .sort(sort as Sort)
          .toArray()

        return goods
      }

      const [cloth, accessories, office, souvenirs] = await Promise.allSettled([
        getFilteredCollection('cloth'),
        getFilteredCollection('accessories'),
        getFilteredCollection('office'),
        getFilteredCollection('souvenirs'),
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
        items: allGoods.slice(+offset, +limit),
      })
    }

    const currentGoods = await db
      .collection(categoryParam as string)
      .find(filter)
      .sort(sort as Sort)
      .toArray()

    return NextResponse.json({
      count: currentGoods.length,
      items: currentGoods.slice(+offset, +limit),
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
