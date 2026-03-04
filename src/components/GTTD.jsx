import { useState } from 'react'
import { SectionWrap, SLabel, STitle, Reveal, Tag } from './UI'

export default function GTTD() {
  const [tab, setTab] = useState('ban-chat')

  const tabs = [
    { id: 'ban-chat', label: 'Bản chất' },
    { id: 'cong-thuc', label: 'Công thức G = c + v + m' },
    { id: 'phan-chia', label: 'Phân chia ngày lao động' },
    { id: 'do-luong', label: 'Đo lường bóc lột' },
  ]

  return (
    <SectionWrap id="gttd">
      <Reveal><SLabel>Mục 3.1.2 — Kiện</SLabel></Reveal>
      <Reveal delay={0.05}><STitle>Bản Chất Của<br />Giá Trị Thặng Dư</STitle></Reveal>

      {/* Tabs */}
      <Reveal delay={0.1}>
        <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: 'none', border: 'none', padding: '0.75rem 1.2rem',
              fontSize: '0.8rem', fontWeight: 500, color: tab === t.id ? 'var(--cream)' : 'var(--muted)',
              borderBottom: tab === t.id ? '2px solid var(--red)' : '2px solid transparent',
              marginBottom: '-1px', transition: 'all 0.2s', letterSpacing: '0.03em',
            }}>{t.label}</button>
          ))}
        </div>
      </Reveal>

      {tab === 'ban-chat' && (
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.8rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted2)', letterSpacing: '0.1em', marginBottom: '0.7rem' }}>ĐỊNH NGHĨA</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.8rem' }}>Giá trị thặng dư là gì?</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.8 }}>
                Là <strong style={{ color: 'var(--gold2)' }}>bộ phận giá trị mới dôi ra ngoài giá trị sức lao động</strong> do công nhân làm thuê tạo ra và bị nhà tư bản chiếm đoạt không công.
              </p>
              <div style={{ marginTop: '1.2rem', padding: '0.9rem 1rem', background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: '4px', fontSize: '0.82rem', color: 'rgba(238,232,216,0.7)', lineHeight: 1.7 }}>
                Nhà tư bản chỉ trả tiền lương tương đương <em>giá trị sức lao động</em> — phần <strong style={{ color: 'var(--red)' }}>lao động không công</strong> vượt quá đó chính là giá trị thặng dư (m).
              </div>
            </div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.8rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted2)', letterSpacing: '0.1em', marginBottom: '0.7rem' }}>BẢN CHẤT XÃ HỘI</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.8rem' }}>Quan hệ sản xuất TBCN</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {[
                  { n: '1.', t: 'Nhà tư bản sở hữu tư liệu sản xuất (c)' },
                  { n: '2.', t: 'Công nhân tự do nhưng không có TLSX → phải bán sức lao động' },
                  { n: '3.', t: 'Chiếm đoạt (m) = chiếm lao động không công dựa trên sở hữu tư nhân TLSX' },
                ].map(item => (
                  <div key={item.n} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.83rem', color: 'rgba(238,232,216,0.65)', lineHeight: 1.65 }}>
                    <span style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{item.n}</span>
                    {item.t}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.2rem' }}>
                <Tag color="var(--red)">Phạm trù lịch sử</Tag>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {tab === 'cong-thuc' && (
        <Reveal>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', fontWeight: 500, padding: '1.2rem 2.5rem', background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: '8px', letterSpacing: '0.08em', color: 'var(--cream)' }}>
              G = <span style={{ color: 'var(--blue)' }}>c</span> + <span style={{ color: 'var(--gold2)' }}>v</span> + <span style={{ color: 'var(--red)' }}>m</span>
            </div>
            <div style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: 'var(--muted2)' }}>Cấu tạo giá trị hàng hóa theo C. Mác</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { sym: 'c', name: 'Tư bản bất biến', color: 'var(--blue)', desc: 'Giá trị máy móc, thiết bị, nguyên vật liệu. Được bảo tồn và chuyển dịch nguyên vẹn vào sản phẩm mới. Không tạo ra giá trị mới — chỉ là điều kiện sản xuất.' },
              { sym: 'v', name: 'Tư bản khả biến', color: 'var(--gold2)', desc: 'Giá trị sức lao động (tiền lương). Không chỉ tái sản xuất ra giá trị của chính nó mà còn là nguồn gốc duy nhất tạo ra giá trị mới lớn hơn (v + m).' },
              { sym: 'm', name: 'Giá trị thặng dư', color: 'var(--red)', desc: 'Phần giá trị mới dôi ra ngoài v. Kết quả của sự bóc lột — thể hiện quan hệ bất bình đẳng giữa giai cấp tư sản và giai cấp công nhân.' },
            ].map(item => (
              <div key={item.sym} style={{ background: 'var(--bg2)', border: `1px solid var(--border)`, borderTop: `3px solid ${item.color}`, borderRadius: '6px', padding: '1.6rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 500, color: item.color, marginBottom: '0.7rem' }}>{item.sym}</div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.7rem' }}>{item.name}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {tab === 'phan-chia' && (
        <Reveal>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '1.5rem' }}>Ngày lao động của công nhân (8 giờ)</div>
              <div style={{ display: 'flex', borderRadius: '4px', overflow: 'hidden', height: 52, marginBottom: '0.8rem' }}>
                <div style={{ width: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#000' }}>4h — Lao động tất yếu</div>
                <div style={{ width: '50%', background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>4h — Lao động thặng dư</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted2)' }}>
                <span>0h</span><span>4h</span><span>8h</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(201,150,58,0.08)', border: '1px solid rgba(201,150,58,0.25)', borderRadius: '6px', padding: '1.4rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>THỜI GIAN TẤT YẾU</div>
                <p style={{ fontSize: '0.84rem', color: 'rgba(238,232,216,0.7)', lineHeight: 1.7 }}>Công nhân tạo ra lượng giá trị ngang bằng giá trị sức lao động của mình → dùng để nhận lương <strong style={{ color: 'var(--gold2)' }}>(v)</strong></p>
              </div>
              <div style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.25)', borderRadius: '6px', padding: '1.4rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--red)', marginBottom: '0.5rem' }}>THỜI GIAN THẶNG DƯ</div>
                <p style={{ fontSize: '0.84rem', color: 'rgba(238,232,216,0.7)', lineHeight: 1.7 }}>Công nhân lao động vượt quá thời gian tất yếu. Toàn bộ giá trị trong phần này <strong style={{ color: 'var(--red)' }}>(m)</strong> thuộc về nhà tư bản, không bồi hoàn.</p>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {tab === 'do-luong' && (
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: 700, margin: '0 auto' }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.8rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted2)', marginBottom: '0.7rem' }}>TỶ SUẤT GIÁ TRỊ THẶNG DƯ</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: 'var(--red)', marginBottom: '0.8rem' }}>m' = (m/v) × 100%</div>
              <p style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.7 }}>Phản ánh chính xác <strong style={{ color: 'var(--cream)' }}>trình độ bóc lột</strong> của nhà tư bản đối với công nhân. Cho biết trên mỗi đồng tiền lương, nhà tư bản thu được bao nhiêu giá trị thặng dư.</p>
              <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'var(--bg3)', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--muted2)', fontFamily: 'var(--font-mono)' }}>VD: m=200k, v=200k → m'=100%</div>
            </div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.8rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted2)', marginBottom: '0.7rem' }}>KHỐI LƯỢNG GIÁ TRỊ THẶNG DƯ</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.8rem' }}>M = m' × V</div>
              <p style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.7 }}>Tổng lượng giá trị thặng dư nhà tư bản thu được. Phụ thuộc vào <strong style={{ color: 'var(--cream)' }}>tỷ suất bóc lột (m')</strong> và <strong style={{ color: 'var(--cream)' }}>tổng số công nhân bị bóc lột (V)</strong>.</p>
              <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'var(--bg3)', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--muted2)', fontFamily: 'var(--font-mono)' }}>Càng nhiều công nhân → M càng lớn</div>
            </div>
          </div>
        </Reveal>
      )}
    </SectionWrap>
  )
}
