export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-pitch-700">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-pitch-200 border-t-pitch-600" />
      <p className="animate-pulse-soft text-sm font-medium">{label}</p>
    </div>
  )
}
