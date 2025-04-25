// src/app/api/get-history/route.ts

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { Client } from '@elastic/elasticsearch'

const client = new Client({
  node: process.env.ELASTIC_URL,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY!,
  },
})

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await client.search<{
      user_id: string
      tasks: string[]
      date: string
      timestamp: string
    }>({
      index: 'task-history',
      size: 100,
      query: {
        match: { user_id: userId },
      },
      sort: [{ timestamp: { order: 'desc' } }],
    })

    const hits = result.hits.hits.map((hit) => hit._source)
    return NextResponse.json(hits, { status: 200 })
  } catch (error) {
    console.error('Error fetching history:', error)
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 })
  }
}
