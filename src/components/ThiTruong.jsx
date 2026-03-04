import { useState } from 'react'
import { SectionWrap, SLabel, STitle, Reveal, Tag, InfoBox } from './UI'

const RULES = [
  {
    code: 'QL.01', name: 'Quy Luật Giá Trị',
    short: 'Sản xuất và trao đổi phải dựa trên hao phí lao động xã hội cần thiết.',
    detail: 'Hàng hóa được trao đổi theo nguyên tắc ngang giá. Giá cả thị trường vận động xoay quanh giá trị dưới tác động cung–cầu. Quy luật này điều tiết sản xuất và lưu thông, kích thích cải tiến kỹ thuật, tăng năng suất lao động, đồng thời dẫn đến phân hóa giàu–nghèo giữa những người sản xuất.',
    tag: 'Nền tảng', color: 'var(--red)',
  },
  {
    code: 'QL.02', name: 'Quy Luật Cung – Cầu',
    short: 'Cung > Cầu → giá giảm. Cung < Cầu → giá tăng. Cung = Cầu → giá ổn định.',
    detail: 'Phản ánh mối quan hệ tác động qua lại giữa người bán và người mua trên thị trường. Quy luật này điều tiết sản xuất, lưu thông hàng hóa và giúp dự báo xu hướng biến động của thị trường.',
    tag: 'Điều tiết', color: 'var(--gold)',
  },
  {
    code: 'QL.03', name: 'Quy Luật Cạnh Tranh',
    short: 'Ganh đua giữa các chủ thể kinh tế nhằm giành lợi thế, thu lợi nhuận tối đa.',
    detail: 'Cạnh tranh thúc đẩy đổi mới công nghệ, nâng cao năng suất và phân bổ nguồn lực hiệu quả. Nhưng nếu thiếu lành mạnh có thể gây lãng phí nguồn lực và ảnh hưởng tiêu cực đến xã hội — dẫn đến độc quyền.',
    tag: 'Hai mặt', color: 'var(--blue)',
  },
  {
    code: 'QL.04', name: 'Quy Luật Lưu Thông Tiền Tệ',
    short: 'Lượng tiền cần thiết phụ thuộc vào tổng giá cả hàng hóa và tốc độ lưu thông.',
    detail: 'Nếu phát hành tiền vượt quá nhu cầu lưu thông hàng hóa sẽ làm tiền mất giá và gây lạm phát. Vì vậy, việc phát hành tiền phải phù hợp với yêu cầu thực tế của nền kinh tế.',
    tag: 'Ổn định', color: 'var(--green)',
  },
]

const LOAI = [
  { title: 'Theo đối tượng hàng hóa', items: ['Thị trường tư liệu sản xuất (máy móc, nguyên liệu)', 'Thị trường tư liệu tiêu dùng (lương thực, dịch vụ)'] },
  { title: 'Theo phạm vi hoạt động', items: ['Thị trường trong nước', 'Thị trường thế giới (xuất nhập khẩu)'] },
  { title: 'Theo đầu vào/đầu ra', items: ['Thị trường các yếu tố đầu vào (lao động, vốn, đất đai)', 'Thị trường hàng hóa đầu ra'] },
  { title: 'Theo tính chất vận hành', items: ['Thị trường tự do — theo cung–cầu, ít can thiệp', 'Thị trường có điều tiết — có quản lý của Nhà nước', 'Cạnh tranh hoàn hảo / Độc quyền'] },
]

function RuleCard({ rule, idx }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal delay={idx * 0.1}>
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderTop: `2px solid ${rule.color}`,
        borderRadius: '6px', padding: '1.6rem',
        transition: 'all 0.25s', cursor: 'pointer',
      }}
        onClick={() => setOpen(o => !o)}
        onMouseEnter={e => e.currentTarget.style.borderColor = rule.color}
        onMouseLeave={e => { if (!open) e.currentTarget.style.borderColor = 'var(--border)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: rule.color, letterSpacing: '0.1em' }}>{rule.code}</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--muted2)', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.6rem' }}>{rule.name}</h3>
        <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.7 }}>{rule.short}</p>
        {open && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.84rem', color: 'rgba(238,232,216,0.65)', lineHeight: 1.8, animation: 'fadeIn 0.3s ease' }}>
            {rule.detail}
          </div>
        )}
        <div style={{ marginTop: '1rem' }}><Tag color={rule.color}>{rule.tag}</Tag></div>
      </div>
    </Reveal>
  )
}

export default function ThiTruong() {
  const [showLoai, setShowLoai] = useState(false)
  return (
    <SectionWrap id="thi-truong">
      <Reveal><SLabel>Mục 2.2.2 — Thảo</SLabel></Reveal>
      <Reveal delay={0.05}><STitle>Thị Trường & Các<br />Quy Luật Kinh Tế</STitle></Reveal>

      {/* Definition */}
      <Reveal delay={0.1}>
        <div style={{ marginBottom: '2.5rem', padding: '1.6rem 2rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '6px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted2)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>ĐỊNH NGHĨA</div>
          <p style={{ fontSize: '0.95rem', color: 'var(--cream)', lineHeight: 1.8 }}>
            Thị trường là <strong style={{ color: 'var(--gold2)' }}>tổng hòa các mối quan hệ kinh tế</strong> mà ở đó việc trao đổi hàng hóa, dịch vụ được thực hiện thông qua giá cả và các quy luật cung–cầu.
          </p>
        </div>
      </Reveal>

      {/* Phân loại toggle */}
      <Reveal delay={0.12}>
        <button onClick={() => setShowLoai(s => !s)} style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem',
          background: 'none', border: '1px solid var(--border2)', borderRadius: '4px',
          padding: '0.6rem 1.2rem', color: 'var(--muted)', fontSize: '0.78rem',
          fontWeight: 500, letterSpacing: '0.05em', transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border2)'}
        >
          <span style={{ transition: 'transform 0.2s', transform: showLoai ? 'rotate(90deg)' : 'none', display: 'inline-block' }}>▶</span>
          {showLoai ? 'Ẩn' : 'Xem'} phân loại thị trường (4 tiêu chí)
        </button>
        {showLoai && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem', animation: 'fadeIn 0.35s ease' }}>
            {LOAI.map(l => (
              <div key={l.title} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.2rem 1.4rem' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.7rem' }}>{l.title}</div>
                {l.items.map(item => (
                  <div key={item} style={{ fontSize: '0.82rem', color: 'var(--muted)', paddingLeft: '0.8rem', borderLeft: '2px solid var(--border2)', marginBottom: '0.5rem', lineHeight: 1.6 }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        )}
      </Reveal>

      {/* Vai trò */}
      <Reveal delay={0.15}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '1.2rem' }}>Vai trò của Thị trường</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
          {[
            { n: '01', t: 'Thực hiện giá trị', b: 'Kiểm chứng hàng hóa có được xã hội thừa nhận.' },
            { n: '02', t: 'Kích thích sản xuất', b: 'Áp lực cạnh tranh buộc cải tiến kỹ thuật, giảm chi phí.' },
            { n: '03', t: 'Điều tiết nguồn lực', b: 'Biến động giá cả phân bổ nguồn lực vào ngành hiệu quả.' },
          ].map(v => (
            <div key={v.n} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.4rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 500, color: 'rgba(192,57,43,0.18)', marginBottom: '0.5rem' }}>{v.n}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--cream)', marginBottom: '0.4rem' }}>{v.t}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>{v.b}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Quy luật */}
      <Reveal delay={0.18}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '1.2rem' }}>4 Quy Luật Chủ Yếu <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)', color: 'var(--muted)', fontWeight: 400 }}>(click để xem chi tiết)</span></div>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {RULES.map((r, i) => <RuleCard key={r.code} rule={r} idx={i} />)}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </SectionWrap>
  )
}
