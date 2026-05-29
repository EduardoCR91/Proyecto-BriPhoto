import { useEffect } from 'react'

export default function MediaModal({ open, onClose, content }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[120]">
      <button className="absolute inset-0 bg-[#0d0f14]/50 backdrop-blur-md" onClick={onClose} aria-label="Cerrar" />
      <div className="relative mx-auto mt-[7vh] w-[94vw] max-w-5xl">
        <button
          onClick={onClose}
          className="mb-3 ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl"
          aria-label="Cerrar"
        >
          ×
        </button>
        {content}
      </div>
    </div>
  )
}
