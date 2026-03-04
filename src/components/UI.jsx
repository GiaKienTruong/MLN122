import { useRef, useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

export function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal()
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(22px)',
      transition: `opacity .65s ${delay}s ease, transform .65s ${delay}s ease`,
      ...style
    }}>
      {children}
    </div>
  )
}

export function SectionWrap({ id, children }) {
  return (
    <section id={id} style={{ padding: '7rem 0', maxWidth: 1060, margin: '0 auto', padding: '7rem 2rem' }}>
      {children}
    </section>
  )
}

export function SLabel({ children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.22em',
      textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem',
      fontFamily: 'var(--font-body)'
    }}>
      <span style={{ display: 'block', width: 28, height: 1, background: 'var(--gold)' }} />
      {children}
    </div>
  )
}

export function STitle({ children }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
      fontWeight: 700, lineHeight: 1.15,
      color: 'var(--cream)', marginBottom: '3rem'
    }}>{children}</h2>
  )
}

export function Divider() {
  return <div style={{ borderTop: '1px solid var(--border)', margin: '0' }} />
}

export function Tag({ children, color = 'var(--red)' }) {
  return (
    <span style={{
      fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.14em',
      textTransform: 'uppercase', color,
      background: color === 'var(--red)' ? 'rgba(192,57,43,0.15)' : 'rgba(201,150,58,0.15)',
      padding: '0.2rem 0.65rem', borderRadius: '2px',
      border: `1px solid ${color === 'var(--red)' ? 'rgba(192,57,43,0.3)' : 'rgba(201,150,58,0.3)'}`,
      fontFamily: 'var(--font-body)'
    }}>{children}</span>
  )
}

export function InfoBox({ icon, title, children, accent = 'var(--red)' }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: `1px solid var(--border)`,
      borderLeft: `3px solid ${accent}`, borderRadius: '6px',
      padding: '1.6rem 2rem', marginTop: '2rem'
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700,
        color: 'var(--cream)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.6rem'
      }}>{icon && <span>{icon}</span>}{title}</div>
      <div style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}
