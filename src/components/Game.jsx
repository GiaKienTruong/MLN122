import { useState } from 'react'
import { SectionWrap, SLabel, STitle, Reveal, Tag } from './UI'

const GREEN = '#27ae60'

const SCENARIOS = [
  {
    id: 1, title: 'Năm đầu — Khởi nghiệp xưởng may',
    context: 'Bạn mở xưởng may nhỏ với 5 công nhân. Mỗi người làm 8h/ngày, lương 200k/ngày. Mỗi giờ họ tạo ra 40k giá trị. Chi phí máy móc: 500k/ngày.',
    workers: 5, totalH: 8, necessaryH: 5, valuePerH: 40, c: 500, v: 1000,
    choices: [
      { id: 'A', icon: '⏰', label: 'Tăng ca lên 10h/ngày', desc: 'Kéo dài ngày lao động, không tăng lương', extraH: 2, extraC: 0, vBoost: 1 },
      { id: 'B', icon: '🤖', label: 'Mua máy may tự động (+800k/ngày)', desc: 'Máy giúp giảm lao động tất yếu từ 5h → 3h', extraH: 0, extraC: 800, reducedNec: 3, vBoost: 1 },
      { id: 'C', icon: '📋', label: 'Cải tiến quy trình quản lý', desc: 'Tổ chức lại sản xuất, giảm lao động tất yếu xuống 4h', extraH: 0, extraC: 100, reducedNec: 4, vBoost: 1 },
    ]
  },
  {
    id: 2, title: 'Cạnh tranh gay gắt — Đối thủ hạ giá 30%',
    context: 'Một xưởng lớn vừa tung ra sản phẩm rẻ hơn. Bạn đang thua lỗ. Cần quyết định ngay để tồn tại. 8 công nhân, máy móc 1000k/ngày.',
    workers: 8, totalH: 8, necessaryH: 4, valuePerH: 50, c: 1000, v: 1600,
    choices: [
      { id: 'A', icon: '✂️', label: 'Cắt giảm lương 20%', desc: 'Giảm chi phí nhân công — tăng m nhưng gây bất mãn', extraH: 0, extraC: -320, reducedNec: 4, vBoost: 1 },
      { id: 'B', icon: '📚', label: 'Đào tạo nâng cao tay nghề (+600k, năng suất +50%)', desc: 'Tăng giá trị tạo ra mỗi giờ lên 75k', extraH: 0, extraC: 600, reducedNec: 4, vBoost: 1.5 },
      { id: 'C', icon: '🎯', label: 'Chuyển sang phân khúc hàng cao cấp', desc: 'Giá trị sản phẩm tăng gấp đôi — siêu ngạch!', extraH: 0, extraC: 500, reducedNec: 4, vBoost: 2.2 },
    ]
  },
  {
    id: 3, title: 'Mùa 11.11 — Đơn hàng tăng 300%',
    context: 'Shopee yêu cầu giao 3.000 sản phẩm trong 3 ngày. Năng lực hiện tại: 1.000 sản phẩm. 12 công nhân, chi phí máy 2.000k/ngày.',
    workers: 12, totalH: 8, necessaryH: 4, valuePerH: 60, c: 2000, v: 2880,
    choices: [
      { id: 'A', icon: '🔥', label: 'Tăng ca 12h + thuê thêm 6 công nhân thời vụ', desc: 'Tuyệt đối: tăng giờ và tăng số lượng lao động', extraH: 4, extraC: 720, reducedNec: 4, vBoost: 1, extraWorkers: 6 },
      { id: 'B', icon: '🏭', label: 'Thuê thêm dây chuyền tự động (+5.000k/ngày)', desc: 'Tương đối + siêu ngạch: máy giảm tất yếu xuống 2h', extraH: 0, extraC: 5000, reducedNec: 2, vBoost: 1 },
      { id: 'C', icon: '🤝', label: 'Hợp tác với xưởng khác, chia đơn hàng', desc: 'Không tối đa thặng dư nhưng bền vững', extraH: 0, extraC: 1500, reducedNec: 4, vBoost: 0.8 },
    ]
  },
]

const METHODS = {
  tuyet_doi: { label: 'Thặng Dư TUYỆT ĐỐI', color: 'var(--red)', explain: 'Tăng thặng dư bằng cách kéo dài hoặc tăng cường độ lao động — không thay đổi năng suất.' },
  tuong_doi: { label: 'Thặng Dư TƯƠNG ĐỐI', color: 'var(--gold)', explain: 'Rút ngắn thời gian lao động tất yếu nhờ công nghệ, quản lý — tổng giờ làm không đổi.' },
  sieu_ngach: { label: 'Thặng Dư SIÊU NGẠCH', color: GREEN, explain: 'Năng suất vượt trội so với mức trung bình ngành — thu lợi nhuận hơn hẳn đối thủ.' },
  none: { label: 'Không tối ưu thặng dư', color: '#888', explain: 'Lựa chọn này ưu tiên sự ổn định hơn là tối đa hóa giá trị thặng dư.' },
}

function detectMethod(choice, scenario) {
  if (choice.extraH > 0) return 'tuyet_doi'
  if (choice.vBoost >= 2) return 'sieu_ngach'
  if (choice.reducedNec && choice.reducedNec < scenario.necessaryH) return 'tuong_doi'
  return 'none'
}

function calcResult(scenario, choice) {
  const workers = scenario.workers + (choice.extraWorkers || 0)
  const nec = choice.reducedNec ?? scenario.necessaryH
  const totalH = scenario.totalH + (choice.extraH || 0)
  const surplusH = Math.max(0, totalH - nec)
  const vph = scenario.valuePerH * (choice.vBoost || 1)
  const totalValue = workers * totalH * vph
  const c = scenario.c + (choice.extraC || 0)
  const v = workers * nec * vph
  const m = workers * surplusH * vph
  const mRate = nec > 0 ? Math.round((surplusH / nec) * 100) : 0
  return { totalValue: Math.round(totalValue), c: Math.round(c), v: Math.round(v), m: Math.round(m), mRate, surplusH, nec, totalH, workers }
}

export default function Game() {
  const [step, setStep] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [history, setHistory] = useState([])

  const scenario = step >= 1 && step <= 3 ? SCENARIOS[step - 1] : null
  const choiceObj = chosen && scenario ? scenario.choices.find(c => c.id === chosen) : null
  const result = choiceObj ? calcResult(scenario, choiceObj) : null
  const method = choiceObj && scenario ? detectMethod(choiceObj, scenario) : null
  const totalM = history.reduce((s, h) => s + h.m, 0)

  const next = () => {
    if (!result || !method) return
    setHistory(h => [...h, { title: scenario.title, choiceLabel: choiceObj.label, m: result.m, mRate: result.mRate, method }])
    setChosen(null); setShowResult(false)
    setStep(s => s + 1)
  }
  const restart = () => { setStep(0); setChosen(null); setShowResult(false); setHistory([]) }

  return (
    <SectionWrap id="game">
      <Reveal><SLabel>Tương Tác Sáng Tạo — Mục 3.1.3</SLabel></Reveal>
      <Reveal delay={0.05}><STitle>🎮 Đóng Vai Nhà Tư Bản<br /><span style={{ fontSize: '0.55em', fontStyle: 'italic', color: 'var(--muted)', fontWeight: 400 }}>Quyết định — Tính toán — Hiểu lý thuyết</span></STitle></Reveal>

      {/* Intro */}
      {step === 0 && (
        <Reveal delay={0.1}>
          <div style={{ maxWidth: 580, margin: '0 auto', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🏭</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.8rem' }}>Bạn là chủ xưởng may</h3>
            <p style={{ fontSize: '0.87rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '2rem' }}>
              Trải qua <strong style={{ color: 'var(--gold2)' }}>3 tình huống kinh doanh thực tế</strong>. Sau mỗi quyết định, hệ thống sẽ tự động tính <strong style={{ color: 'var(--red)' }}>G = c + v + m</strong> và cho bạn biết mình đang áp dụng phương pháp nào theo lý thuyết của C. Mác.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {Object.values(METHODS).slice(0, 3).map(mt => (
                <span key={mt.label} style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: mt.color, background: `${mt.color}18`, padding: '0.3rem 0.8rem', borderRadius: '2px', border: `1px solid ${mt.color}44` }}>{mt.label.split(' ')[0]} {mt.label.split(' ')[1]}</span>
              ))}
            </div>
            <button onClick={() => setStep(1)} style={{ background: 'var(--red)', color: '#fff', border: 'none', padding: '0.95rem 2.5rem', fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.06em', borderRadius: '4px', transition: 'all 0.25s', cursor: 'pointer' }}
              onMouseEnter={e => { e.target.style.background = '#a93226'; e.target.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.target.style.background = 'var(--red)'; e.target.style.transform = 'none' }}>
              Bắt đầu →
            </button>
          </div>
        </Reveal>
      )}

      {/* Scenario */}
      {scenario && (
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          {/* Progress */}
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
              {[1, 2, 3].map(n => (
                <div key={n} style={{ flex: 1, height: 3, borderRadius: '2px', background: n < step ? 'var(--red)' : n === step ? 'var(--gold)' : 'var(--border)', transition: 'background 0.4s' }} />
              ))}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted2)', marginLeft: '0.3rem', whiteSpace: 'nowrap' }}>{step} / 3</span>
            </div>
          </Reveal>

          {/* Context card */}
          <Reveal delay={0.12}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.8rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--gold)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>TÌNH HUỐNG {step}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.8rem' }}>{scenario.title}</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.2rem' }}>{scenario.context}</p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  { l: 'Công nhân', v: `${scenario.workers} người` },
                  { l: 'Giờ làm', v: `${scenario.totalH}h/ngày` },
                  { l: 'Lao động tất yếu', v: `${scenario.necessaryH}h` },
                  { l: 'Giá trị/giờ/người', v: `${scenario.valuePerH}k` },
                ].map(item => (
                  <div key={item.l} style={{ fontSize: '0.78rem' }}>
                    <div style={{ color: 'var(--muted2)', marginBottom: '0.2rem' }}>{item.l}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--cream)', fontWeight: 500 }}>{item.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Choices */}
          <Reveal delay={0.15}>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--muted2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem', fontFamily: 'var(--font-body)' }}>Bạn sẽ làm gì?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {scenario.choices.map(c => {
                const sel = chosen === c.id
                return (
                  <button key={c.id} onClick={() => { setChosen(c.id); setShowResult(false) }} style={{
                    background: sel ? 'rgba(192,57,43,0.1)' : 'var(--bg2)',
                    border: `1.5px solid ${sel ? 'var(--red)' : 'var(--border)'}`,
                    borderRadius: '6px', padding: '1.1rem 1.4rem',
                    textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                  }}
                    onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = 'var(--border2)' }}
                    onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{c.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.87rem', fontWeight: 600, color: sel ? 'var(--cream)' : 'rgba(238,232,216,0.75)', marginBottom: '0.25rem' }}>{c.label}</div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--muted2)' }}>{c.desc}</div>
                    </div>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${sel ? 'var(--red)' : 'var(--border2)'}`, background: sel ? 'var(--red)' : 'none', flexShrink: 0, transition: 'all 0.2s' }} />
                  </button>
                )
              })}
            </div>
          </Reveal>

          {chosen && !showResult && (
            <Reveal>
              <button onClick={() => setShowResult(true)} style={{ width: '100%', background: 'var(--red)', color: '#fff', border: 'none', padding: '0.95rem', fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.06em', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => e.target.style.background = '#a93226'}
                onMouseLeave={e => e.target.style.background = 'var(--red)'}>
                Tính toán kết quả →
              </button>
            </Reveal>
          )}

          {/* Result */}
          {showResult && result && method && (
            <Reveal>
              <div style={{ background: 'var(--bg2)', border: `1px solid ${METHODS[method].color}44`, borderTop: `2px solid ${METHODS[method].color}`, borderRadius: '8px', padding: '2rem', marginTop: '0.5rem', animation: 'fadeIn 0.4s ease' }}>
                <Tag color={METHODS[method].color}>{METHODS[method].label}</Tag>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.8, margin: '1rem 0 1.5rem', paddingLeft: '1rem', borderLeft: `2px solid ${METHODS[method].color}` }}>{METHODS[method].explain}</p>

                {/* Formula */}
                <div style={{ background: 'var(--bg3)', borderRadius: '6px', padding: '1.2rem 1.5rem', marginBottom: '1.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', lineHeight: 2 }}>
                  G = <span style={{ color: 'var(--blue)' }}>c({result.c.toLocaleString()}k)</span> + <span style={{ color: 'var(--gold)' }}>v({result.v.toLocaleString()}k)</span> + <span style={{ color: 'var(--red)' }}>m({result.m.toLocaleString()}k)</span><br />
                  = <span style={{ color: 'var(--cream)', fontWeight: 700 }}>{result.totalValue.toLocaleString()}k</span>
                  <span style={{ color: 'var(--muted2)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', marginLeft: '1rem' }}>Tỷ suất m' = {result.mRate}%</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.7rem', marginBottom: '1.5rem' }}>
                  {[
                    { l: 'Tổng giá trị G', v: `${result.totalValue.toLocaleString()}k`, c: 'var(--cream)' },
                    { l: 'Thặng dư m', v: `${result.m.toLocaleString()}k`, c: 'var(--red)' },
                    { l: "Tỷ suất m'", v: `${result.mRate}%`, c: 'var(--gold)' },
                    { l: 'Giờ thặng dư', v: `${result.surplusH}h/người`, c: GREEN },
                  ].map(item => (
                    <div key={item.l} style={{ background: 'var(--bg3)', borderRadius: '4px', padding: '0.8rem', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: item.c }}>{item.v}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--muted2)', marginTop: '0.3rem', lineHeight: 1.4 }}>{item.l}</div>
                    </div>
                  ))}
                </div>

                <button onClick={next} style={{ width: '100%', background: step < 3 ? 'var(--gold)' : GREEN, color: step < 3 ? '#000' : '#fff', border: 'none', padding: '0.95rem', fontSize: '0.88rem', fontWeight: 600, borderRadius: '4px', cursor: 'pointer', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.target.style.opacity = '0.85'}
                  onMouseLeave={e => e.target.style.opacity = '1'}>
                  {step < 3 ? 'Tình huống tiếp theo →' : 'Xem tổng kết →'}
                </button>
              </div>
            </Reveal>
          )}
        </div>
      )}

      {/* Summary */}
      {step === 4 && (
        <Reveal delay={0.1}>
          <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 700, color: totalM > 0 ? GREEN : 'var(--red)', marginBottom: '0.5rem' }}>
              {totalM > 0 ? '+' : ''}{totalM.toLocaleString()}k
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '3rem' }}>Tổng giá trị thặng dư thu được qua 3 tình huống</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'left', marginBottom: '2.5rem' }}>
              {history.map((h, i) => (
                <div key={i} style={{ background: 'var(--bg2)', border: `1px solid ${METHODS[h.method].color}33`, borderLeft: `3px solid ${METHODS[h.method].color}`, borderRadius: '6px', padding: '1rem 1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted2)', marginBottom: '0.25rem' }}>Tình huống {i + 1}: {h.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--cream)', marginBottom: '0.4rem' }}>{h.choiceLabel}</div>
                    <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: METHODS[h.method].color }}>{METHODS[h.method].label}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: h.m > 0 ? GREEN : 'var(--red)' }}>
                    {h.m > 0 ? '+' : ''}{h.m.toLocaleString()}k
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.8rem', marginBottom: '2rem', textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--gold2)', marginBottom: '0.7rem' }}>💡 Bài học từ C. Mác</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.85 }}>
                Dù bạn chọn kéo dài giờ làm (<strong style={{ color: 'var(--red)' }}>tuyệt đối</strong>), tăng năng suất công nghệ (<strong style={{ color: 'var(--gold)' }}>tương đối</strong>), hay vượt trội ngành (<strong style={{ color: GREEN }}>siêu ngạch</strong>) — tất cả đều là những cách nhà tư bản tối đa hóa <strong style={{ color: 'var(--cream)' }}>m</strong> trong công thức G = c + v + m. Đây là động lực cốt lõi của nền kinh tế tư bản.
              </p>
            </div>

            <button onClick={restart} style={{ background: 'none', border: '1px solid var(--border2)', color: 'var(--muted)', padding: '0.85rem 2rem', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--cream)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--muted)' }}>
              🔄 Chơi lại
            </button>
          </div>
        </Reveal>
      )}
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </SectionWrap>
  )
}
