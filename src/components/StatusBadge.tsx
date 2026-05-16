import { DisplayStatus, type DisplayStatusValue } from '../types/toll'

interface StatusBadgeProps {
  status: DisplayStatusValue
}

const statusStyles: Record<DisplayStatusValue, string> = {
  [DisplayStatus.Paid]:
    'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  [DisplayStatus.Pending]:
    'border-amber-500/30 bg-amber-500/10 text-amber-300',
  [DisplayStatus.Violation]:
    'border-rose-500/30 bg-rose-500/10 text-rose-300',
  [DisplayStatus.Unknown]:
    'border-slate-500/30 bg-slate-500/10 text-slate-300',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}
