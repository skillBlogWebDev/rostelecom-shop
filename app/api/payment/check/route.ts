import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const reqBody = await req.json()

    const { data } = await axios({
      method: 'get',
      url: `https://api.yookassa.ru/v3/payments/${reqBody.paymentId}`,
      auth: {
        username: '284434',
        password: 'test_qDOAK1qBsglEy7Pbf2ZkSq7-uWERPH-LNAwPyPNS8hc',
      },
    })

    return NextResponse.json({ result: data })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
