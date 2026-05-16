import { useForm } from 'react-hook-form'
import {
  LICENSE_PLATE_MAX_LENGTH,
  LICENSE_PLATE_MIN_LENGTH,
  VEHICLE_TYPE_OPTIONS,
  VehicleType,
  type CreateTollLogRequest,
  type TollEntryFormValues,
} from '../types/toll'
import { TollFeeSchedule } from './TollFeeSchedule'

interface TollEntryFormProps {
  submitting: boolean
  submitError: string | null
  onSubmit: (request: CreateTollLogRequest) => Promise<void>
  onClearError: () => void
}

const defaultValues: TollEntryFormValues = {
  licensePlate: '',
  vehicleType: VehicleType.Car,
  isOfficialVehicle: false,
}

export function TollEntryForm({
  submitting,
  submitError,
  onSubmit,
  onClearError,
}: TollEntryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TollEntryFormValues>({
    defaultValues,
    mode: 'onBlur',
  })

  const selectedVehicleType = watch('vehicleType')
  const isOfficialVehicle = watch('isOfficialVehicle')

  const submitHandler = handleSubmit(async (values) => {
    onClearError()
    try {
      await onSubmit({
        licensePlate: values.licensePlate.trim().toUpperCase(),
        vehicleType: values.vehicleType,
        isOfficialVehicle: values.isOfficialVehicle,
      })
      reset(defaultValues)
    } catch {
      // submitError is set by the hook
    }
  })

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 shadow-lg shadow-black/20">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-50">Record toll entry</h2>
        <p className="mt-1 text-sm text-slate-400">
          Register a vehicle crossing at the plaza gate.
        </p>
      </div>

      {submitError ? (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200"
        >
          {submitError}
        </div>
      ) : null}

      <form onSubmit={submitHandler} className="space-y-4" noValidate>
        <div>
          <label htmlFor="licensePlate" className="mb-1.5 block text-xs font-medium text-slate-400">
            License plate
          </label>
          <input
            id="licensePlate"
            type="text"
            autoComplete="off"
            disabled={submitting}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm uppercase tracking-wide text-slate-100 placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-500 focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-60"
            placeholder="UP14AB1234"
            {...register('licensePlate', {
              required: 'License plate is required',
              minLength: {
                value: LICENSE_PLATE_MIN_LENGTH,
                message: `Plate must be at least ${LICENSE_PLATE_MIN_LENGTH} characters`,
              },
              maxLength: {
                value: LICENSE_PLATE_MAX_LENGTH,
                message: `Plate must be at most ${LICENSE_PLATE_MAX_LENGTH} characters`,
              },
              pattern: {
                value: /^[A-Za-z0-9-]+$/,
                message: 'Plate may only contain letters, numbers, and hyphens',
              },
            })}
          />
          {errors.licensePlate ? (
            <p className="mt-1 text-xs text-rose-300">{errors.licensePlate.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="vehicleType" className="mb-1.5 block text-xs font-medium text-slate-400">
            Vehicle type
          </label>
          <select
            id="vehicleType"
            disabled={submitting}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-60"
            {...register('vehicleType', {
              required: 'Vehicle type is required',
              valueAsNumber: true,
            })}
          >
            {VEHICLE_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.vehicleType ? (
            <p className="mt-1 text-xs text-rose-300">{errors.vehicleType.message}</p>
          ) : null}
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5">
          <input
            type="checkbox"
            disabled={submitting}
            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-500/30"
            {...register('isOfficialVehicle')}
          />
          <span className="text-sm text-slate-300">Official / Government vehicle (no toll)</span>
        </label>

        <TollFeeSchedule
          selectedVehicleType={selectedVehicleType}
          isOfficialVehicle={isOfficialVehicle}
        />

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-cyan-900/30 transition hover:from-cyan-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Recording entry…
            </>
          ) : (
            'Record toll entry'
          )}
        </button>
      </form>
    </section>
  )
}
