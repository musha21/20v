export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-pitch-200 bg-white/60 px-6 py-10 text-center">
      {Icon ? <Icon className="h-8 w-8 text-pitch-500" /> : null}
      <h3 className="font-display text-lg text-pitch-800">{title}</h3>
      {description ? <p className="max-w-sm text-sm text-muted">{description}</p> : null}
    </div>
  )
}
