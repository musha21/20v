import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatLKR } from '../utils/format'

function buildCells(year, month) {
  const firstDay = new Date(year, month, 1)
  const startWeekday = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []

  for (let i = 0; i < startWeekday; i += 1) {
    cells.push(null)
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    cells.push({ day, date })
  }
  return cells
}

export default function MonthCalendar({
  year,
  month,
  amountsByDate = {},
  selectedDate,
  onSelectDate,
  onChangeMonth,
}) {
  const cells = buildCells(year, month)
  const label = new Date(year, month, 1).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="card-surface rounded-2xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className="rounded-lg p-2 text-pitch-700 hover:bg-pitch-50"
          onClick={() => onChangeMonth(-1)}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-display text-lg text-pitch-900">{label}</h3>
        <button
          type="button"
          className="rounded-lg p-2 text-pitch-700 hover:bg-pitch-50"
          onClick={() => onChangeMonth(1)}
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wide text-muted">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, index) => {
          if (!cell) return <div key={`empty-${index}`} className="min-h-[4.5rem] rounded-xl bg-transparent sm:min-h-16" />

          const amount = amountsByDate[cell.date]
          const selected = selectedDate === cell.date
          const hasAmount = amount != null && Number(amount) > 0

          return (
            <button
              key={cell.date}
              type="button"
              onClick={() => onSelectDate(cell.date)}
              className={`min-h-[4.5rem] rounded-xl border p-1.5 text-left transition sm:min-h-16 ${
                selected
                  ? 'border-pitch-600 bg-pitch-600 text-white shadow-md'
                  : hasAmount
                    ? 'border-pitch-200 bg-pitch-50 hover:border-pitch-400'
                    : 'border-transparent bg-white/70 hover:border-pitch-200'
              }`}
            >
              <div className={`text-sm font-semibold ${selected ? 'text-white' : 'text-pitch-900'}`}>
                {cell.day}
              </div>
              {hasAmount ? (
                <div className={`mt-1 text-[10px] leading-tight sm:text-xs ${selected ? 'text-pitch-100' : 'text-pitch-700'}`}>
                  {formatLKR(amount)}
                </div>
              ) : (
                <div className={`mt-1 text-[10px] ${selected ? 'text-white/70' : 'text-muted'}`}>—</div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
