'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '/generate', label: 'Generate' },

    { href: '/#features', label: 'Features' },
  ]

  return (
    <nav
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(4,4,8,0.85)' : 'rgba(4,4,8,0.4)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" />
              </svg>
            </div>
            <span className="gradient-text" style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>ContentAI</span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="hidden-mobile">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ textDecoration: 'none' }}>
              <motion.span
                whileHover={{ y: -2 }}
                style={{
                  padding: '6px 16px', borderRadius: 8, fontSize: '0.9rem',
                  color: pathname === l.href ? '#f8fafc' : '#94a3b8',
                  background: pathname === l.href ? 'rgba(139,92,246,0.12)' : 'transparent',
                  transition: 'all 0.2s',
                  cursor: 'pointer', display: 'block',
                  borderBottom: pathname === l.href ? '2px solid #8b5cf6' : '2px solid transparent',
                }}
              >{l.label}</motion.span>
            </Link>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/generate" className="hidden-mobile" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="glow-pulse"
              style={{
                background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)',
                color: 'white', border: 'none', borderRadius: 9999,
                padding: '8px 20px', fontSize: '0.875rem', fontWeight: 600,
                cursor: 'pointer',
              }}
            >Try Free</motion.button>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#f8fafc' }}
          >
            <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ height: 2, background: menuOpen ? '#8b5cf6' : '#f8fafc', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none', display: 'block' }} />
              <span style={{ height: 2, background: '#f8fafc', borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1, display: 'block' }} />
              <span style={{ height: 2, background: menuOpen ? '#8b5cf6' : '#f8fafc', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none', display: 'block' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ background: 'rgba(4,4,8,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}
          >
            <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {links.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '12px 16px', borderRadius: 8, color: pathname === l.href ? '#a78bfa' : '#94a3b8', background: pathname === l.href ? 'rgba(139,92,246,0.1)' : 'transparent', fontSize: '1rem', fontWeight: 500 }}>
                    {l.label}
                  </div>
                </Link>
              ))}
              <Link href="/generate" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', marginTop: 8 }}>
                <div style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', color: 'white', padding: '12px 16px', borderRadius: 12, textAlign: 'center', fontWeight: 600 }}>
                  Start Generating Free
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
