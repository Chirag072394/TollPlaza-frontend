import {
  DisplayStatus,
  type DisplayStatusValue,
  TollStatusApi,
  type TollStatusApiValue,
  VehicleType,
  VehicleTypeLabel,
  type VehicleTypeValue,
} from '../types/toll'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount)
}

export function formatDateTime(isoUtc: string): string {
  const date = new Date(isoUtc)
  if (Number.isNaN(date.getTime())) {
    return '—'
  }
  return dateTimeFormatter.format(date)
}

export function parseVehicleType(value: VehicleTypeValue | string): VehicleTypeValue {
  if (typeof value === 'number') {
    return value in VehicleTypeLabel ? value : VehicleType.None
  }

  const normalized = value.trim().toLowerCase()
  switch (normalized) {
    case 'car':
      return VehicleType.Car
    case 'motorcycle':
      return VehicleType.Motorcycle
    case 'truck':
      return VehicleType.Truck
    default:
      return VehicleType.None
  }
}

export function formatVehicleType(value: VehicleTypeValue | string): string {
  const parsed = parseVehicleType(value)
  return VehicleTypeLabel[parsed]
}

export function formatDetectionSource(source: string): string {
  if (!source) {
    return '—'
  }
  return source.charAt(0).toUpperCase() + source.slice(1)
}

export function mapStatusToDisplay(status: TollStatusApiValue | string): DisplayStatusValue {
  const normalized = status.toLowerCase()

  switch (normalized) {
    case TollStatusApi.Completed:
    case 'paid':
      return DisplayStatus.Paid
    case TollStatusApi.Pending:
      return DisplayStatus.Pending
    case TollStatusApi.Voided:
    case 'violation':
      return DisplayStatus.Violation
    default:
      return DisplayStatus.Unknown
  }
}
