import {
  TOLL_FEE_SCHEDULE,
  type VehicleTypeValue,
  getTollFee,
} from '../types/toll'
import { formatCurrency } from '../utils/format'

interface TollFeeScheduleProps {
  selectedVehicleType?: VehicleTypeValue
  isOfficialVehicle?: boolean
}

export function TollFeeSchedule({
  selectedVehicleType,
  isOfficialVehicle = false,
}: TollFeeScheduleProps) {
  const estimatedFee =
    selectedVehicleType !== undefined
      ? getTollFee(selectedVehicleType, isOfficialVehicle)
      : null

  return (
    <aside className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Toll fee schedule
      </h3>
      <ul className="mt-2 space-y-1.5">
        {TOLL_FEE_SCHEDULE.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between text-sm text-slate-300"
          >
            <span>{item.label}</span>
            <span className="font-medium tabular-nums text-slate-100">
              {formatCurrency(item.fee)}
            </span>
          </li>
        ))}
      </ul>
      {estimatedFee !== null ? (
        <p className="mt-3 border-t border-slate-800 pt-3 text-sm text-slate-400">
          Selected entry:{' '}
          <span className="font-semibold text-cyan-300">{formatCurrency(estimatedFee)}</span>
        </p>
      ) : null}
    </aside>
  )
}
