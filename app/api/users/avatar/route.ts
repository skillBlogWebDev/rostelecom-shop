/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextResponse } from 'next/server'
import path from 'path'
import { ObjectId } from 'mongodb'
import fs from 'fs'
import { writeFile } from 'fs/promises'
import clientPromise from '@/lib/mongodb'
import { getAuthRouteData, parseJwt } from '@/lib/utils/api-routes'

export const POST = async (req: Request) => {
  const { db, validatedTokenResult, token } = await getAuthRouteData(
    clientPromise,
    req,
    false
  )

  if (validatedTokenResult.status !== 200) {
    return NextResponse.json(validatedTokenResult)
  }

  const formData = await req.formData()

  const file = formData.get('binaryContent')

  if (!file) {
    return NextResponse.json({ error: 'No files received.' }, { status: 400 })
  }

  const user = await db
    .collection('users')
    .findOne({ email: parseJwt(token as string).email })

  const filenames = fs.readdirSync(
    path.join(process.cwd(), './public', 'avatars')
  )
  const existingImage = filenames.find((name) =>
    name.includes(new ObjectId(user?._id).toString())
  )

  if (existingImage) {
    fs.unlinkSync(path.join(process.cwd(), 'public/avatars/' + existingImage))
  }

  //@ts-ignore
  const buffer = Buffer.from(await file.arrayBuffer())
  //@ts-ignore
  const filename = `${user?._id}__${file.name.replaceAll(' ', '_')}`

  try {
    await writeFile(
      path.join(process.cwd(), 'public/avatars/' + filename),
      buffer
    )

    await db.collection('users').updateOne(
      {
        _id: new ObjectId(user?._id),
      },
      {
        $set: {
          image: `/avatars/${filename}`,
        },
      }
    )

    return NextResponse.json({
      Message: 'Success',
      status: 201,
      image: `/avatars/${filename}`,
    })
  } catch (error) {
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
