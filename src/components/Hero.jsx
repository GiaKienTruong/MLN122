import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])

  const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '0 2.5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(201,150,58,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,150,58,0.04) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 70% 60% at 20% 50%, rgba(192,57,43,0.1) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 85% 30%, rgba(201,150,58,0.07) 0%, transparent 55%)`
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 860 }}>
        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
          marginBottom: '2.5rem',
          opacity: mounted ? 1 : 0, transition: 'opacity 0.8s 0.1s ease',
        }}>
          <span style={{ display: 'block', width: 40, height: 1, background: 'var(--gold)' }} />
          <span style={{
            fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)'
          }}>Kinh Tế Chính Trị Mác-Lênin · MLN 122 · Sản phẩm sáng tạo</span>
        </div>

        {/* Main title */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 8vw, 6.5rem)',
          fontWeight: 700, lineHeight: 1.0,
          color: 'var(--cream)', marginBottom: '1.5rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(30px)',
          transition: 'opacity 0.9s 0.25s ease, transform 0.9s 0.25s ease',
        }}>
          Kinh Tế<br />
          <span style={{ color: 'var(--red)', fontStyle: 'italic' }}>Thị Trường</span><br />
          Tư Bản Chủ Nghĩa
        </h1>

        {/* Formula teaser */}
        <div style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 2vw, 1.35rem)',
          color: 'var(--gold2)', letterSpacing: '0.08em',
          marginBottom: '2.5rem', padding: '0.6rem 1.2rem',
          background: 'rgba(201,150,58,0.08)',
          border: '1px solid rgba(201,150,58,0.2)', borderRadius: '4px',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s 0.5s ease',
        }}>G = c + v + m</div>

        <p style={{
          fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.8,
          maxWidth: 560, marginBottom: '3rem',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s 0.6s ease',
        }}>
          Khám phá bản chất của nền kinh tế tư bản qua lý thuyết C. Mác —
          từ quy luật thị trường đến giá trị thặng dư, được visualize
          trực quan và liên hệ thực tiễn ngày 11.11.
        </p>

        <div style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s 0.75s ease',
        }}>
          <button onClick={() => go('#thi-truong')} style={{
            background: 'var(--red)', color: 'white',
            border: 'none', padding: '0.85rem 2rem',
            fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em',
            borderRadius: '4px', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.target.style.background = '#a93226'; e.target.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.target.style.background = 'var(--red)'; e.target.style.transform = 'none' }}
          >Xem nội dung →</button>

          <button onClick={() => go('#simulator')} style={{
            background: 'transparent', color: 'var(--gold2)',
            border: '1px solid rgba(201,150,58,0.4)', padding: '0.85rem 2rem',
            fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em',
            borderRadius: '4px', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.target.style.background = 'rgba(201,150,58,0.1)'; e.target.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.transform = 'none' }}
          >⚙ Simulator G = c + v + m</button>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '2.5rem', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem',
        opacity: mounted ? 0.4 : 0, transition: 'opacity 1s 1.2s ease',
      }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted2)' }}>Cuộn xuống</span>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--muted2), transparent)' }} />
      </div>

      {/* Page number aesthetic */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', right: '2.5rem', zIndex: 2,
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
        color: 'var(--muted2)', letterSpacing: '0.1em',
        opacity: mounted ? 1 : 0, transition: 'opacity 1s 1.2s ease',
      }}>01 / 06</div>
    </section>
  )
}
