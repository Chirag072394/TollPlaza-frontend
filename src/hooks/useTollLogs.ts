import { useCallback, useEffect, useState } from 'react'
import { tollService } from '../services/tollService'
import type { CreateTollLogRequest, TollLog } from '../types/toll'

interface UseTollLogsResult {
  logs: TollLog[]
  loading: boolean
  error: string | null
  submitting: boolean
  submitError: string | null
  refresh: () => Promise<void>
  createLog: (request: CreateTollLogRequest) => Promise<void>
  clearSubmitError: () => void
}

export function useTollLogs(): UseTollLogsResult {
  const [logs, setLogs] = useState<TollLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await tollService.getLogs()
      setLogs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load toll logs')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const createLog = useCallback(
    async (request: CreateTollLogRequest) => {
      setSubmitting(true)
      setSubmitError(null)

      try {
        await tollService.createLog(request)
        await refresh()
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : 'Failed to record toll entry',
        )
        throw err
      } finally {
        setSubmitting(false)
      }
    },
    [refresh],
  )

  const clearSubmitError = useCallback(() => {
    setSubmitError(null)
  }, [])

  return {
    logs,
    loading,
    error,
    submitting,
    submitError,
    refresh,
    createLog,
    clearSubmitError,
  }
}
