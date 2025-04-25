'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import styles from './page.module.scss'
import Sidebar from '@/components/sidebar'
import Loading from '@/components/his'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

interface HistoryEntry {
  tasks: string[]
  date: string
  timestamp: string
}

interface ChartData {
  date: string
  taskCount: number
  tasks: string[]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { tasks, date } = payload[0].payload

    return (
      <div className={styles.tooltip}>
        <p><strong>{date}</strong></p>
        <ul>
          {tasks.map((task: string, index: number) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    )
  }

  return null
}

export default function HistoryPage() {
  const { user } = useUser()
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/get-history')
        const data = await res.json()
        setHistory(data)
      } catch (err) {
        console.error('Failed to fetch history:', err)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }
    }

    fetchHistory()
  }, [])

  if (loading) return <Loading />

  const chartData: ChartData[] = history.map(entry => ({
    date: entry.date,
    taskCount: Math.min(entry.tasks.length, 10), // min 0, max 10
    tasks: entry.tasks
  }))

  return (
    <div className={styles.container}>
      <Sidebar />
      <h1 className={styles.heading}>
        Hi {user?.firstName || 'there'}, here’s your task history
      </h1>

      {chartData.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No task history found.</p>
      ) : (
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="taskCount" fill="#5fa8f5" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
