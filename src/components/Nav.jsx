import { useState, useEffect } from 'react'

const LINKS = [
  ['#thi-truong', 'Thị Trường'],
  ['#chu-the', 'Chủ Thể'],
  ['#gttd', 'Giá Trị Thặng Dư'],
  ['#simulator', '⚙ Simulator'],
  ['#game', '🎮 Đóng Vai'],
  ['#case', 'Case 11.11'],
]

export default function Nav() {
  const [sc, setSc] = useState(false)
  const [mob, setMob] = useState(false)

  useEffect(() => {
    const f = () => setSc(window.scrollY > 50)
    window.addEventListener('scroll', f)
    return () => window.removeEventListener('scroll', f)
  }, [])

  const go = (href) => {
    setMob(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 2.5rem', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: sc ? 'rgba(11,12,14,0.96)' : 'rgba(11,12,14,0.5)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${sc ? 'var(--border2)' : 'transparent'}`,
        transition: 'all 0.3s',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '1.15rem', color: 'var(--gold)', letterSpacing: '0.03em'
        }}>MLN 122</div>

        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {LINKS.map(([href, label]) => (
            <button key={href} onClick={() => go(href)} style={{
              background: 'none', border: 'none', padding: '0.4rem 0.75rem',
              fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.06em',
              textTransform: 'uppercase', color: href === '#simulator' || href === '#game' ? 'var(--gold2)' : 'var(--muted)',
              borderRadius: '4px', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.color = 'var(--cream)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { e.target.style.color = href === '#simulator' || href === '#game' ? 'var(--gold2)' : 'var(--muted)'; e.target.style.background = 'none' }}
            >{label}</button>
          ))}
        </div>
      </nav>
    </>
  )
}
