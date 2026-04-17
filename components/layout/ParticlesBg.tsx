'use client'
export default function ParticlesBg() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: Math.random() * 20 + 10,
    color: i % 2 === 0 ? 'rgba(139,92,246,' : 'rgba(6,182,212,',
    opacity: Math.random() * 0.2 + 0.1,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-10px',
            borderRadius: '50%',
            background: `${p.color}${p.opacity})`,
            animation: `particle-float ${p.duration}s ${p.delay}s ease-in infinite`,
          }}
        />
      ))}
    </div>
  )
}
