import axios, { type AxiosError } from 'axios'
import type { ApiResponse } from '../types/toll'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7007/api'

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback
  }

  const axiosError = error as AxiosError<ApiResponse<unknown>>
  const payload = axiosError.response?.data

  if (payload?.errors && payload.errors.length > 0) {
    return payload.errors.join(', ')
  }

  if (payload?.message) {
    return payload.message
  }

  if (axiosError.message) {
    return axiosError.message
  }

  return fallback
}
