export default function SummaryCard({ title, value, icon: Icon, tone = 'green' }) {
  const tones = {
    green: 'from-pitch-600 to-pitch-700 text-white',
    light: 'from-white to-pitch-50 text-pitch-900 border border-pitch-100',
    amber: 'from-amber-500 to-amber-600 text-white',
    rose: 'from-rose-500 to-rose-600 text-white',
  }

  return (
    <div className={`animate-fade-up rounded-2xl bg-gradient-to-br p-4 shadow-sm ${tones[tone] || tones.green}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wide ${tone === 'light' ? 'text-muted' : 'text-white/80'}`}>
            {title}
          </p>
          <p className="mt-2 font-display text-xl font-bold sm:text-2xl">{value}</p>
        </div>
        {Icon ? (
          <div className={`rounded-xl p-2 ${tone === 'light' ? 'bg-pitch-100 text-pitch-700' : 'bg-white/15'}`}>
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
