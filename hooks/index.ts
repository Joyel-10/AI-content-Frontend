'use client'
import { useState, useCallback, useRef } from 'react'

/* ── useToast ─────────────────────────────────── */
export type ToastType = 'success' | 'error' | 'info' | 'warning'
export interface Toast { id: string; message: string; type: ToastType }

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(p => p.filter(t => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}

/* ── useClipboard ─────────────────────────────── */
export function useClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error('Copy failed')
    }
  }, [])

  return { copied, copy }
}

/* ── useLocalStorage ──────────────────────────── */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch { return initial }
  })

  const set = useCallback((val: T) => {
    setValue(val)
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(val))
    }
  }, [key])

  return [value, set] as const
}

/* ── useScrolled ──────────────────────────────── */
export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > threshold)
    }, { passive: true })
  }
  return scrolled
}
