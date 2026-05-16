export const VehicleType = {
  None: 0,
  Car: 1,
  Motorcycle: 2,
  Truck: 3,
} as const

export type VehicleTypeValue = (typeof VehicleType)[keyof typeof VehicleType]

export const VehicleTypeLabel: Record<VehicleTypeValue, string> = {
  [VehicleType.None]: 'Unknown',
  [VehicleType.Car]: 'Car',
  [VehicleType.Motorcycle]: 'Motorcycle',
  [VehicleType.Truck]: 'Truck',
}

export const VEHICLE_TYPE_OPTIONS = [
  { value: VehicleType.Car, label: VehicleTypeLabel[VehicleType.Car] },
  { value: VehicleType.Motorcycle, label: VehicleTypeLabel[VehicleType.Motorcycle] },
  { value: VehicleType.Truck, label: VehicleTypeLabel[VehicleType.Truck] },
] as const

/** Matches backend TollFeeCalculator rates */
export const TOLL_FEE_BY_VEHICLE_TYPE: Record<VehicleTypeValue, number> = {
  [VehicleType.None]: 0,
  [VehicleType.Car]: 5,
  [VehicleType.Motorcycle]: 2,
  [VehicleType.Truck]: 10,
}

export const OFFICIAL_VEHICLE_TOLL_FEE = 0

export const TOLL_FEE_SCHEDULE = [
  { label: VehicleTypeLabel[VehicleType.Car], fee: TOLL_FEE_BY_VEHICLE_TYPE[VehicleType.Car] },
  {
    label: VehicleTypeLabel[VehicleType.Motorcycle],
    fee: TOLL_FEE_BY_VEHICLE_TYPE[VehicleType.Motorcycle],
  },
  { label: VehicleTypeLabel[VehicleType.Truck], fee: TOLL_FEE_BY_VEHICLE_TYPE[VehicleType.Truck] },
  { label: 'Official / Government', fee: OFFICIAL_VEHICLE_TOLL_FEE },
] as const

export function getTollFee(vehicleType: VehicleTypeValue, isOfficialVehicle: boolean): number {
  if (isOfficialVehicle) {
    return OFFICIAL_VEHICLE_TOLL_FEE
  }
  return TOLL_FEE_BY_VEHICLE_TYPE[vehicleType] ?? 0
}

export const TollStatusApi = {
  None: 'none',
  Pending: 'pending',
  Completed: 'completed',
  Voided: 'voided',
} as const

export type TollStatusApiValue =
  (typeof TollStatusApi)[keyof typeof TollStatusApi]

export const DisplayStatus = {
  Paid: 'Paid',
  Pending: 'Pending',
  Violation: 'Violation',
  Unknown: 'Unknown',
} as const

export type DisplayStatusValue =
  (typeof DisplayStatus)[keyof typeof DisplayStatus]

export const DetectionSource = {
  None: 'none',
  Camera: 'camera',
  Sensor: 'sensor',
  Manual: 'manual',
} as const

export type DetectionSourceValue =
  (typeof DetectionSource)[keyof typeof DetectionSource]

export interface TollLog {
  id: string
  licensePlate: string
  vehicleType: VehicleTypeValue | string
  tollFee: number
  status: TollStatusApiValue | string
  timestampUtc: string
  detectionSource: DetectionSourceValue | string
  isOfficialVehicle: boolean
}

export interface CreateTollLogRequest {
  licensePlate: string
  vehicleType: VehicleTypeValue
  isOfficialVehicle: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data: T | null
  message?: string | null
  errors?: string[] | null
}

export interface TollEntryFormValues {
  licensePlate: string
  vehicleType: VehicleTypeValue
  isOfficialVehicle: boolean
}

export const LICENSE_PLATE_MIN_LENGTH = 4
export const LICENSE_PLATE_MAX_LENGTH = 32

export const ALL_VEHICLE_FILTER = 'all' as const
export type VehicleFilterValue = VehicleTypeValue | typeof ALL_VEHICLE_FILTER
