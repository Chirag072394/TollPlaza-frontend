interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="min-w-[200px] flex-1">
      <label htmlFor="plate-search" className="mb-1.5 block text-xs font-medium text-slate-400">
        Search license plate
      </label>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
        <input
          id="plate-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="e.g. UP14AB1234"
          className="w-full rounded-lg border border-slate-700 bg-slate-900/80 py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
        />
      </div>
    </div>
  )
}
