import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { Client } from '@elastic/elasticsearch'

console.log('🔍 ELASTIC_URL:', process.env.ELASTIC_URL);
console.log('🔍 ELASTIC_API_KEY:', process.env.ELASTIC_API_KEY);

const client = new Client({
  node: process.env.ELASTIC_URL,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY!,
  },
})

export async function POST(req: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { tasks } = body

  if (!tasks || !Array.isArray(tasks)) {
    return NextResponse.json({ error: 'Invalid task data' }, { status: 400 })
  }

  const date = new Date().toISOString().split('T')[0]

  try {
    await client.index({
      index: 'task-history',
      body: {
        user_id: userId,
        tasks,
        date,
        timestamp: new Date().toISOString(),
      },
    })

    return NextResponse.json({ message: 'Task history saved' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to save task history' }, { status: 500 })
  }
}
