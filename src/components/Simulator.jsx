import { useState, useEffect, useRef } from 'react'
import { SectionWrap, SLabel, STitle, Reveal } from './UI'

function AnimatedBar({ label, value, total, color, sublabel }) {
  const [w, setW] = useState(0)
  const pct = total > 0 ? (value / total) * 100 : 0
  useEffect(() => {
    const t = setTimeout(() => setW(pct), 80)
    return () => clearTimeout(t)
  }, [pct])
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', alignItems: 'baseline' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color, fontWeight: 500 }}>{value.toLocaleString()}k</span>
      </div>
      <div style={{ background: 'var(--bg3)', borderRadius: '2px', height: 8, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${w}%`, background: color, borderRadius: '2px', transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
      {sublabel && <div style={{ marginTop: '0.3rem', fontSize: '0.7rem', color: 'var(--muted2)' }}>{sublabel}</div>}
    </div>
  )
}

function Slider({ label, value, min, max, step = 1, unit, onChange, color = 'var(--red)' }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color, fontWeight: 500 }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: color, cursor: 'pointer', height: 4 }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem' }}>
        <span style={{ fontSize: '0.62rem', color: 'var(--muted2)', fontFamily: 'var(--font-mono)' }}>{min}{unit}</span>
        <span style={{ fontSize: '0.62rem', color: 'var(--muted2)', fontFamily: 'var(--font-mono)' }}>{max}{unit}</span>
      </div>
    </div>
  )
}

export default function Simulator() {
  // Parameters
  const [workers, setWorkers] = useState(10)          // số công nhân
  const [totalHours, setTotalHours] = useState(8)     // giờ làm/ngày
  const [necessaryHours, setNecessaryHours] = useState(4) // giờ tất yếu
  const [hourlyValue, setHourlyValue] = useState(50)  // giá trị tạo ra/giờ (nghìn đồng)
  const [machineCost, setMachineCost] = useState(800) // chi phí máy móc (c)
  const [tab, setTab] = useState('slider')

  // Computed
  const surplusHours = Math.max(0, totalHours - necessaryHours)
  const v = necessaryHours * hourlyValue * workers      // tư bản khả biến (lương)
  const m = surplusHours * hourlyValue * workers        // giá trị thặng dư
  const c = machineCost                                 // tư bản bất biến
  const G = c + v + m                                   // tổng giá trị hàng hóa
  const mRate = necessaryHours > 0 ? Math.round((surplusHours / necessaryHours) * 100) : 0
  const M = mRate * v / 100

  // Method detection
  const method = necessaryHours <= 3
    ? { label: 'Thặng Dư Tương Đối', color: 'var(--gold)', desc: 'Thời gian lao động tất yếu thấp → tăng năng suất qua công nghệ' }
    : totalHours > 8
    ? { label: 'Thặng Dư Tuyệt Đối', color: 'var(--red)', desc: 'Ngày lao động kéo dài → tăng giờ thặng dư trực tiếp' }
    : { label: 'Cân bằng tiêu chuẩn', color: 'var(--blue)', desc: '8h làm việc, phân chia lao động tất yếu và thặng dư cân bằng' }

  return (
    <SectionWrap id="simulator">
      <Reveal><SLabel>Điểm Nhấn Sáng Tạo — Trực Quan Hóa</SLabel></Reveal>
      <Reveal delay={0.05}><STitle>Simulator<br />G = c + v + m</STitle></Reveal>
      <Reveal delay={0.1}>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 600 }}>
          Kéo các thanh bên dưới để thay đổi thông số sản xuất — công thức và biểu đồ cập nhật <strong style={{ color: 'var(--cream)' }}>theo thời gian thực</strong>. Quan sát giá trị thặng dư thay đổi như thế nào.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem' }}>

          {/* LEFT — Controls */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted2)', letterSpacing: '0.12em', marginBottom: '1.5rem' }}>THÔNG SỐ SẢN XUẤT</div>

            <Slider label="Số công nhân" value={workers} min={1} max={50} unit=" người" onChange={setWorkers} color="var(--blue)" />
            <Slider label="Giờ làm / ngày" value={totalHours} min={4} max={14} unit="h" onChange={v => { setTotalHours(v); if (necessaryHours >= v) setNecessaryHours(v - 1) }} color="var(--red)" />
            <Slider label="Giờ lao động tất yếu" value={necessaryHours} min={1} max={Math.max(1, totalHours - 1)} unit="h" onChange={setNecessaryHours} color="var(--gold)" />
            <Slider label="Giá trị tạo ra / giờ / người" value={hourlyValue} min={10} max={200} step={5} unit="k" onChange={setHourlyValue} color="var(--green)" />
            <Slider label="Chi phí máy móc, NVL (c)" value={machineCost} min={0} max={10000} step={100} unit="k" onChange={setMachineCost} color="var(--blue)" />

            {/* Method badge */}
            <div style={{ marginTop: '1.5rem', padding: '1rem 1.2rem', background: 'var(--bg3)', borderRadius: '4px', borderLeft: `3px solid ${method.color}` }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: method.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Phương pháp nhận diện</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--cream)', marginBottom: '0.2rem' }}>{method.label}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>{method.desc}</div>
            </div>
          </div>

          {/* RIGHT — Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

            {/* Formula display */}
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.8rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted2)', letterSpacing: '0.12em', marginBottom: '1rem' }}>CÔNG THỨC THỜI GIAN THỰC</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', color: 'var(--cream)', letterSpacing: '0.05em', marginBottom: '0.5rem', lineHeight: 2 }}>
                G = <span style={{ color: 'var(--blue)' }}>c</span> + <span style={{ color: 'var(--gold)' }}>v</span> + <span style={{ color: 'var(--red)' }}>m</span><br />
                <span style={{ color: 'var(--muted2)', fontSize: '0.75em' }}>= </span>
                <span style={{ color: 'var(--blue)' }}>{c.toLocaleString()}k</span>
                <span style={{ color: 'var(--muted2)' }}> + </span>
                <span style={{ color: 'var(--gold)' }}>{v.toLocaleString()}k</span>
                <span style={{ color: 'var(--muted2)' }}> + </span>
                <span style={{ color: 'var(--red)' }}>{m.toLocaleString()}k</span>
                <span style={{ color: 'var(--muted2)' }}> = </span>
                <span style={{ color: 'var(--cream)', fontWeight: 700 }}>{G.toLocaleString()}k</span>
              </div>
            </div>

            {/* Bar chart */}
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.8rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted2)', letterSpacing: '0.12em', marginBottom: '1.5rem' }}>CẤU TRÚC GIÁ TRỊ HÀNG HÓA</div>

              {/* Stacked bar */}
              <div style={{ display: 'flex', height: 28, borderRadius: '3px', overflow: 'hidden', marginBottom: '0.6rem' }}>
                {[
                  { val: c, color: 'var(--blue)', label: 'c' },
                  { val: v, color: 'var(--gold)', label: 'v' },
                  { val: m, color: 'var(--red)', label: 'm' },
                ].map(seg => {
                  const pct = G > 0 ? (seg.val / G) * 100 : 33.3
                  return (
                    <div key={seg.label} title={`${seg.label}: ${seg.val}k (${Math.round(pct)}%)`} style={{ width: `${pct}%`, background: seg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 500, color: seg.label === 'v' ? '#000' : '#fff', overflow: 'hidden', whiteSpace: 'nowrap', transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
                      {pct > 8 ? `${seg.label} ${Math.round(pct)}%` : ''}
                    </div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {[{ label: 'c — Tư bản bất biến', color: 'var(--blue)' }, { label: 'v — Tư bản khả biến', color: 'var(--gold)' }, { label: 'm — Giá trị thặng dư', color: 'var(--red)' }].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: 'var(--muted2)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, display: 'inline-block', flexShrink: 0 }} />
                    {l.label}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <AnimatedBar label="c — Tư bản bất biến (máy móc, NVL)" value={c} total={G} color="var(--blue)" sublabel={`${G > 0 ? Math.round(c / G * 100) : 0}% tổng giá trị`} />
                <AnimatedBar label="v — Tư bản khả biến (tiền lương)" value={v} total={G} color="var(--gold)" sublabel={`${workers} công nhân × ${necessaryHours}h × ${hourlyValue}k`} />
                <AnimatedBar label="m — Giá trị thặng dư (bị chiếm đoạt)" value={m} total={G} color="var(--red)" sublabel={`${workers} công nhân × ${surplusHours}h × ${hourlyValue}k`} />
              </div>
            </div>

            {/* Key metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              <div style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.25)', borderRadius: '6px', padding: '1.2rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--red)', lineHeight: 1 }}>{mRate}%</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.4rem' }}>Tỷ suất m' = m/v × 100%</div>
              </div>
              <div style={{ background: 'rgba(39,174,96,0.08)', border: '1px solid rgba(39,174,96,0.2)', borderRadius: '6px', padding: '1.2rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--green)', lineHeight: 1 }}>{surplusHours}h</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.4rem' }}>Giờ lao động thặng dư / người / ngày</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Time bar comparison */}
      <Reveal delay={0.25}>
        <div style={{ marginTop: '2rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted2)', letterSpacing: '0.12em', marginBottom: '1.2rem' }}>PHÂN CHIA NGÀY LAO ĐỘNG — {totalHours}H</div>
          <div style={{ display: 'flex', height: 44, borderRadius: '4px', overflow: 'hidden', marginBottom: '0.7rem' }}>
            <div style={{ width: `${(necessaryHours / totalHours) * 100}%`, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 600, color: '#000', transition: 'width 0.5s ease', whiteSpace: 'nowrap', overflow: 'hidden', paddingInline: '0.3rem' }}>
              {necessaryHours}h tất yếu
            </div>
            <div style={{ width: `${(surplusHours / totalHours) * 100}%`, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 600, color: '#fff', transition: 'width 0.5s ease', whiteSpace: 'nowrap', overflow: 'hidden', paddingInline: '0.3rem' }}>
              {surplusHours}h thặng dư
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7 }}>
            Mỗi ngày, <strong style={{ color: 'var(--cream)' }}>{workers} công nhân</strong> làm {totalHours}h — trong đó {necessaryHours}h để tạo ra lương của chính họ,
            còn <strong style={{ color: 'var(--red)' }}>{surplusHours}h lao động không công</strong> tạo ra {m.toLocaleString()}k giá trị thặng dư cho nhà tư bản.
          </div>
        </div>
      </Reveal>
    </SectionWrap>
  )
}
