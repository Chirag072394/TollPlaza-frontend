import { useMemo, useState } from 'react'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { TollEntryForm } from '../components/TollEntryForm'
import { TollLogsTable } from '../components/TollLogsTable'
import { VehicleFilter } from '../components/VehicleFilter'
import { useTollLogs } from '../hooks/useTollLogs'
import { ALL_VEHICLE_FILTER, type VehicleFilterValue } from '../types/toll'
import { parseVehicleType } from '../utils/format'

export function Dashboard() {
  const {
    logs,
    loading,
    error,
    submitting,
    submitError,
    refresh,
    createLog,
    clearSubmitError,
  } = useTollLogs()

  const [searchQuery, setSearchQuery] = useState('')
  const [vehicleFilter, setVehicleFilter] = useState<VehicleFilterValue>(
    ALL_VEHICLE_FILTER,
  )

  const filteredLogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return logs.filter((log) => {
      const matchesPlate =
        query.length === 0 || log.licensePlate.toLowerCase().includes(query)

      const matchesVehicle =
        vehicleFilter === ALL_VEHICLE_FILTER ||
        parseVehicleType(log.vehicleType) === vehicleFilter

      return matchesPlate && matchesVehicle
    })
  }, [logs, searchQuery, vehicleFilter])

  return (
    <div className="min-h-screen bg-slate-950">
      <Header logCount={logs.length} loading={loading} />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {error ? (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => void refresh()}
              className="rounded-lg border border-rose-400/40 bg-rose-500/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-rose-50 hover:bg-rose-500/30"
            >
              Retry
            </button>
          </div>
        ) : null}

        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 shadow-lg shadow-black/20 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <VehicleFilter value={vehicleFilter} onChange={setVehicleFilter} />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <TollEntryForm
            submitting={submitting}
            submitError={submitError}
            onSubmit={createLog}
            onClearError={clearSubmitError}
          />
          <TollLogsTable logs={filteredLogs} loading={loading} />
        </div>
      </main>
    </div>
  )
}
