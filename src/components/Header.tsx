interface HeaderProps {
  logCount: number
  loading: boolean
}

export function Header({ logCount, loading }: HeaderProps) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-900/60 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
            Toll Plaza Management
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Operations Dashboard
          </h1>
          <p className="mt-1 max-w-xl text-sm text-slate-400">
            Monitor toll entries, record vehicle crossings, and review lane activity in real time.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-lg shadow-black/20">
          <span
            className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px] shadow-cyan-400/60"
            aria-hidden
          />
          <div className="text-sm">
            <span className="text-slate-400">Active records</span>
            <p className="font-semibold text-slate-100">
              {loading ? '—' : logCount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
