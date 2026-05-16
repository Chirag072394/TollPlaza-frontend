import {
  ALL_VEHICLE_FILTER,
  VEHICLE_TYPE_OPTIONS,
  VehicleTypeLabel,
  type VehicleFilterValue,
  type VehicleTypeValue,
} from '../types/toll'

interface VehicleFilterProps {
  value: VehicleFilterValue
  onChange: (value: VehicleFilterValue) => void
}

export function VehicleFilter({ value, onChange }: VehicleFilterProps) {
  return (
    <div className="w-full sm:w-56">
      <label htmlFor="vehicle-filter" className="mb-1.5 block text-xs font-medium text-slate-400">
        Vehicle type
      </label>
      <select
        id="vehicle-filter"
        value={value}
        onChange={(event) => {
          const next = event.target.value
          onChange(
            next === ALL_VEHICLE_FILTER
              ? ALL_VEHICLE_FILTER
              : (Number(next) as VehicleTypeValue),
          )
        }}
        className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        <option value={ALL_VEHICLE_FILTER}>All vehicle types</option>
        {VEHICLE_TYPE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {VehicleTypeLabel[option.value]}
          </option>
        ))}
      </select>
    </div>
  )
}
