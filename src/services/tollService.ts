import { apiClient, getApiErrorMessage } from '../api/axios'
import type {
  ApiResponse,
  CreateTollLogRequest,
  TollLog,
  VehicleTypeValue,
} from '../types/toll'
import { parseVehicleType } from '../utils/format'

interface TollLogApiDto {
  id: string
  licensePlate: string
  vehicleType: string | number
  tollFee: number
  status: string
  createdOnUtc?: string
  timestampUtc?: string
  detectionSource: string
  isOfficialVehicle: boolean
}

function normalizeLog(dto: TollLogApiDto): TollLog {
  return {
    id: dto.id,
    licensePlate: dto.licensePlate,
    vehicleType: parseVehicleType(dto.vehicleType as VehicleTypeValue | string),
    tollFee: dto.tollFee,
    status: dto.status,
    timestampUtc: dto.timestampUtc ?? dto.createdOnUtc ?? '',
    detectionSource: dto.detectionSource,
    isOfficialVehicle: dto.isOfficialVehicle,
  }
}

function unwrapData<T>(response: ApiResponse<T>, fallbackMessage: string): T {
  if (!response.success || response.data === null || response.data === undefined) {
    const detail =
      response.errors?.join(', ') ?? response.message ?? fallbackMessage
    throw new Error(detail)
  }
  return response.data
}

export const tollService = {
  async getLogs(): Promise<TollLog[]> {
    try {
      const { data } = await apiClient.get<ApiResponse<TollLogApiDto[]>>('/logs')
      const logs = unwrapData(data, 'Failed to load toll logs')
      return logs.map(normalizeLog)
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Failed to load toll logs'))
    }
  },

  async createLog(request: CreateTollLogRequest): Promise<TollLog> {
    try {
      const { data } = await apiClient.post<ApiResponse<TollLogApiDto>>('/logs', {
        licensePlate: request.licensePlate.trim(),
        vehicleType: request.vehicleType,
        isOfficialVehicle: request.isOfficialVehicle,
      })
      const created = unwrapData(data, 'Failed to record toll entry')
      return normalizeLog(created)
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Failed to record toll entry'))
    }
  },
}
