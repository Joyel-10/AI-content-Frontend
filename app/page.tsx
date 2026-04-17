'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import ParticlesBg from '@/components/layout/ParticlesBg'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <ParticlesBg />

      {/* ── HERO ─────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 1.5rem 60px', overflow: 'hidden' }}>
        {/* Radial glows */}
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 860, width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>

          {/* Badge */}
          <motion.div {...fadeUp(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 9999, padding: '6px 18px', marginBottom: '2rem' }}>
            <span style={{ color: '#c4b5fd', fontSize: '0.85rem', fontWeight: 500 }}>✦ Powered by Claude AI</span>
          </motion.div>

          {/* H1 */}
          <motion.h1 {...fadeUp(0.1)} style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', fontSize: 'clamp(2.4rem, 6vw, 4.8rem)' }}>
            <span style={{ color: '#f8fafc' }}>Create Stunning</span><br />
            <span className="gradient-text">Content with AI</span><br />
            <span style={{ color: '#f8fafc' }}>In Seconds.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p {...fadeUp(0.2)} style={{ color: '#94a3b8', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', maxWidth: 600, margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Transform any topic into a professional blog post, article, or story with the power of AI. No writing skills required.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.3)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link href="/generate" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="glow-pulse"
                style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', color: 'white', border: 'none', borderRadius: 9999, padding: '14px 32px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                Start Creating →
              </motion.button>
            </Link>
            <motion.button whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.06)' }} whileTap={{ scale: 0.97 }}
              style={{ background: 'transparent', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 9999, padding: '14px 32px', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
              See Examples
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            {[['10K+', 'Blogs Generated'], ['10+', 'Writing Tones'], ['100%', 'Free MVP']].map(([num, lbl], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="gradient-text" style={{ fontWeight: 700, fontSize: '1.3rem', fontFamily: 'Syne,sans-serif' }}>{num}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{lbl}</div>
                </div>
                {i < 2 && <span style={{ color: '#334155', fontSize: '1.5rem' }}>|</span>}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────── */}
      <section id="features" style={{ padding: '80px 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="gradient-text" style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '0.75rem' }}>Everything You Need</h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>Powerful features to supercharge your content</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            { icon: '✦', title: 'Smart AI Writing', desc: 'Advanced Claude AI understands context and generates human-quality content instantly', glow: 'rgba(139,92,246,0.3)', border: 'rgba(139,92,246,0.5)', grad: 'linear-gradient(135deg,#8b5cf6,#06b6d4)' },
            { icon: '⊞', title: '10+ Writing Tones', desc: 'From professional to cinematic — choose the perfect voice for your content', glow: 'rgba(6,182,212,0.3)', border: 'rgba(6,182,212,0.5)', grad: 'linear-gradient(135deg,#06b6d4,#8b5cf6)' },
            { icon: '↓', title: 'One-Click Export', desc: 'Copy, download as TXT or MD, save to history — your content, your way', glow: 'rgba(236,72,153,0.3)', border: 'rgba(236,72,153,0.5)', grad: 'linear-gradient(135deg,#ec4899,#8b5cf6)' },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px ${card.glow}` }}
              className="glass-card"
              style={{ padding: '2rem', transition: 'all 0.3s', cursor: 'default' }}>
              <div style={{ width: 52, height: 52, background: card.grad, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', fontSize: '1.4rem', color: 'white', fontWeight: 700 }}>
                {card.icon}
              </div>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, color: '#f8fafc', fontSize: '1.1rem', marginBottom: '0.6rem' }}>{card.title}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.9rem' }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section style={{ padding: '80px 1.5rem', maxWidth: 1000, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#f8fafc', marginBottom: '0.75rem' }}>How It Works</h2>
          <p style={{ color: '#64748b' }}>Three simple steps to amazing content</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40, alignItems: 'start' }}>
          {[
            { num: '01', icon: '✏', title: 'Enter Topic', desc: 'Type your topic or idea in the input box' },
            { num: '02', icon: '⚙', title: 'Choose Options', desc: 'Select your tone, length and writing style' },
            { num: '03', icon: '✦', title: 'Get Content', desc: 'AI generates your full blog post instantly' },
          ].map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
              style={{ textAlign: 'center' }}>
              <div className="gradient-text" style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '3rem', marginBottom: '1rem' }}>{step.num}</div>
              <div style={{ width: 64, height: 64, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem' }}>
                {step.icon}
              </div>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, color: '#f8fafc', fontSize: '1.05rem', marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────── */}
      <section style={{ padding: '80px 1.5rem' }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="glass-card"
          style={{ maxWidth: 700, margin: '0 auto', padding: '3rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))' }}>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '2rem', color: '#f8fafc', marginBottom: '0.75rem' }}>Ready to Create?</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.05rem' }}>Join thousands of creators using AI to write better content faster.</p>
          <Link href="/generate" style={{ textDecoration: 'none' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="glow-pulse"
              style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', color: 'white', border: 'none', borderRadius: 12, padding: '14px 36px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
              Start Generating Free ✦
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <span className="gradient-text" style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700 }}>ContentAI</span>
        <p style={{ color: '#334155', fontSize: '0.8rem', marginTop: 8 }}>Built with Claude AI · Next.js · Express · MongoDB</p>
      </footer>
    </div>
  )
}
