import {
  formatCurrency,
  formatDateTime,
  formatDetectionSource,
  formatVehicleType,
  mapStatusToDisplay,
} from '../utils/format'
import type { TollLog } from '../types/toll'
import { StatusBadge } from './StatusBadge'

interface TollLogsTableProps {
  logs: TollLog[]
  loading: boolean
}

export function TollLogsTable({ logs, loading }: TollLogsTableProps) {
  if (loading) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 shadow-lg shadow-black/20">
        <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-cyan-400" />
          <p className="text-sm">Loading toll logs…</p>
        </div>
      </section>
    )
  }

  if (logs.length === 0) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-10 text-center shadow-lg shadow-black/20">
        <p className="text-base font-medium text-slate-200">No toll logs found</p>
        <p className="mt-1 text-sm text-slate-400">
          Adjust your filters or record a new toll entry to populate this table.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 shadow-lg shadow-black/20">
      <div className="border-b border-slate-800 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-50">Toll activity log</h2>
        <p className="mt-1 text-sm text-slate-400">
          {logs.length} record{logs.length === 1 ? '' : 's'} shown
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
          <thead className="bg-slate-950/50 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">License plate</th>
              <th className="px-5 py-3 font-medium">Vehicle type</th>
              <th className="px-5 py-3 font-medium">Timestamp</th>
              <th className="px-5 py-3 font-medium">Toll fee</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Detection</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {logs.map((log) => {
              const displayStatus = mapStatusToDisplay(log.status)

              return (
                <tr
                  key={log.id}
                  className="odd:bg-slate-900/30 even:bg-slate-900/10 hover:bg-slate-800/40"
                >
                  <td className="whitespace-nowrap px-5 py-3 font-medium text-slate-100">
                    {log.licensePlate}
                    {log.isOfficialVehicle ? (
                      <span className="ml-2 rounded border border-indigo-500/30 bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-indigo-300">
                        Official
                      </span>
                    ) : null}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-300">
                    {formatVehicleType(log.vehicleType)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-300">
                    {formatDateTime(log.timestampUtc)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 font-medium text-slate-100">
                    {formatCurrency(log.tollFee)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <StatusBadge status={displayStatus} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-300">
                    {formatDetectionSource(String(log.detectionSource))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
