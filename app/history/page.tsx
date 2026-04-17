'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import ParticlesBg from '@/components/layout/ParticlesBg'
import { ToastContainer } from '@/components/ui/Toast'
import { useToast } from '@/hooks/index'
import { fetchHistory, deleteFromHistory, BlogEntry } from '@/lib/api'

export default function HistoryPage() {
  const [blogs, setBlogs] = useState<BlogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const { toasts, addToast, removeToast } = useToast()

  useEffect(() => {
    fetchHistory().then(d => { setBlogs(d.blogs); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = blogs.filter(b => {
    const matchSearch = b.topic.toLowerCase().includes(search.toLowerCase()) || b.content.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || b.tone === filter
    return matchSearch && matchFilter
  })

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteFromHistory(id)
      setBlogs(p => p.filter(b => b._id !== id))
      addToast('Deleted successfully', 'success')
    } catch {
      addToast('Delete failed', 'error')
    } finally {
      setDeletingId(null)
      setConfirmId(null)
    }
  }

  const toneFilters = ['All', ...Array.from(new Set(blogs.map(b => b.tone))).slice(0, 5)]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      <ParticlesBg />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem,4vw,2.2rem)', color: '#f8fafc' }}>
                Content <span className="gradient-text">History</span>
              </h1>
              <p style={{ color: '#64748b', marginTop: 4 }}>All your generated blogs in one place</p>
            </div>
            <div style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 9999, padding: '6px 16px', color: '#a78bfa', fontSize: '0.85rem', fontWeight: 600 }}>
              {blogs.length} articles
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#475569', fontSize: '1rem' }}>⌕</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search your content..."
              className="glass-input"
              style={{ width: '100%', padding: '12px 44px', borderRadius: 12, fontSize: '0.95rem' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '1.1rem' }}>×</button>
            )}
          </div>
        </motion.div>

        {/* Filter pills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2rem' }}>
          {toneFilters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`tone-pill${filter === f ? ' selected' : ''}`}>{f}</button>
          ))}
        </motion.div>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass-card shimmer" style={{ height: 200 }} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '5rem 2rem' }}>
            <div className="float" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📭</div>
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, color: '#f8fafc', fontSize: '1.25rem', marginBottom: '0.6rem' }}>
              {search ? 'No results found' : 'No content yet'}
            </h3>
            <p style={{ color: '#475569', marginBottom: '2rem' }}>
              {search ? `Try a different search term` : 'Generate your first blog to see it here'}
            </p>
            {!search && (
              <Link href="/generate" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', color: 'white', border: 'none', borderRadius: 12, padding: '12px 28px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
                  Create First Blog
                </motion.button>
              </Link>
            )}
          </motion.div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
            <AnimatePresence>
              {filtered.map((blog, i) => (
                <motion.div key={blog._id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -60 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -5, boxShadow: '0 16px 36px rgba(139,92,246,0.2)' }}
                  className="glass-card"
                  style={{ padding: '1.5rem', cursor: 'default', transition: 'all 0.3s', border: '1px solid rgba(255,255,255,0.08)' }}>

                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', color: 'white', borderRadius: 9999, padding: '3px 12px', fontSize: '0.72rem', fontWeight: 600 }}>{blog.tone}</span>
                      {blog.cinematicMode && <span style={{ background: 'rgba(236,72,153,0.15)', color: '#f472b6', borderRadius: 9999, padding: '3px 10px', fontSize: '0.72rem', border: '1px solid rgba(236,72,153,0.3)' }}>🎬</span>}
                    </div>
                    <span style={{ color: '#334155', fontSize: '0.72rem' }}>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Title */}
                  <h3 style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {blog.topic}
                  </h3>

                  {/* Preview */}
                  <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {blog.content.replace(/[#*]/g, '').slice(0, 120)}...
                  </p>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: 12, marginBottom: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                    <span style={{ color: '#475569', fontSize: '0.75rem' }}>~{blog.wordCount}w</span>
                    <span style={{ color: '#475569', fontSize: '0.75rem' }}>📖 {blog.readingTime}m</span>
                    <span style={{ color: '#475569', fontSize: '0.75rem', textTransform: 'capitalize' }}>{blog.length}</span>
                  </div>

                  {/* Expanded */}
                  <AnimatePresence>
                    {expanded === blog._id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem', marginBottom: '0.75rem' }}>
                        <div style={{ maxHeight: 200, overflowY: 'auto', color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.7 }}>
                          {blog.content.replace(/[#*]/g, '').slice(0, 600)}...
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => setExpanded(expanded === blog._id ? null : blog._id)}
                      style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', borderRadius: 8, padding: '7px 0', fontSize: '0.78rem', cursor: 'pointer' }}>
                      {expanded === blog._id ? 'Close' : 'View'}
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => { navigator.clipboard.writeText(blog.content) }}
                      style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', borderRadius: 8, padding: '7px 0', fontSize: '0.78rem', cursor: 'pointer' }}>
                      Copy
                    </motion.button>
                    {confirmId === blog._id ? (
                      <div style={{ display: 'flex', gap: 4 }}>
                        <motion.button whileTap={{ scale: 0.96 }} onClick={() => handleDelete(blog._id)}
                          style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', borderRadius: 8, padding: '7px 10px', fontSize: '0.75rem', cursor: 'pointer' }}>
                          {deletingId === blog._id ? '...' : 'Yes'}
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.96 }} onClick={() => setConfirmId(null)}
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', borderRadius: 8, padding: '7px 10px', fontSize: '0.75rem', cursor: 'pointer' }}>
                          No
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        onHoverStart={e => (e.target as HTMLElement).classList.add('shake')}
                        onHoverEnd={e => (e.target as HTMLElement).classList.remove('shake')}
                        onClick={() => setConfirmId(blog._id)}
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', borderRadius: 8, padding: '7px 12px', fontSize: '0.78rem', cursor: 'pointer' }}>
                        🗑
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
