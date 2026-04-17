'use client'
import { Toast, ToastType } from '@/hooks/index'

const colors: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)', icon: '✓' },
  error:   { bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.3)',  icon: '✕' },
  info:    { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.3)', icon: 'ℹ' },
  warning: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', icon: '⚠' },
}

export function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
      {toasts.map(t => {
        const c = colors[t.type]
        return (
          <div key={t.id} className="toast-enter" style={{ pointerEvents: 'all', background: c.bg, border: `1px solid ${c.border}`, backdropFilter: 'blur(12px)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, minWidth: 280, maxWidth: 360 }}>
            <span style={{ fontSize: '1rem', fontWeight: 700 }}>{c.icon}</span>
            <span style={{ color: '#f8fafc', fontSize: '0.875rem', flex: 1 }}>{t.message}</span>
            <button onClick={() => onRemove(t.id)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem', padding: 0, lineHeight: 1 }}>×</button>
          </div>
        )
      })}
    </div>
  )
}
