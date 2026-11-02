import { useEffect, useState } from 'react'
import { Download, Share, X } from 'lucide-react'

const STORAGE_KEY = 'mvg_install_banner_dismissed_at'
const DISMISS_DAYS = 5

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

function isIos() {
  const ua = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(ua)
}

function wasDismissedRecently() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return false
  const dismissedAt = Number(raw)
  if (!Number.isFinite(dismissedAt)) return false
  const ageMs = Date.now() - dismissedAt
  return ageMs < DISMISS_DAYS * 24 * 60 * 60 * 1000
}

export default function InstallBanner() {
  const [visible, setVisible] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [ios, setIos] = useState(false)

  useEffect(() => {
    if (isStandalone() || wasDismissedRecently()) return

    setIos(isIos())
    setVisible(true)

    function onBeforeInstall(e) {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
    setVisible(false)
  }

  async function handleInstall() {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    dismiss()
  }

  if (!visible) return null

  return (
    <div className="install-banner fixed inset-x-0 z-40 px-3">
      <div className="mx-auto flex max-w-lg items-start gap-3 rounded-2xl border border-pitch-200 bg-white p-3 shadow-lg shadow-pitch-900/10">
        <img src="/pwa-192.png" alt="" className="mt-0.5 h-11 w-11 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold text-pitch-900">Install Malwanahinna VG</p>
          {ios ? (
            <p className="mt-1 text-xs leading-relaxed text-muted">
              On iPhone: tap <Share className="inline h-3.5 w-3.5" /> Share, then <strong>Add to Home Screen</strong>.
            </p>
          ) : (
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Install this app for quick access on your phone.
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {!ios && deferredPrompt ? (
              <button type="button" className="btn-primary min-h-10 px-3 py-1.5 text-sm" onClick={handleInstall}>
                <Download className="h-4 w-4" />
                Install
              </button>
            ) : null}
            <button type="button" className="btn-secondary min-h-10 px-3 py-1.5 text-sm" onClick={dismiss}>
              Not now
            </button>
          </div>
        </div>
        <button type="button" className="rounded-lg p-1 text-muted hover:bg-pitch-50" onClick={dismiss} aria-label="Dismiss">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
