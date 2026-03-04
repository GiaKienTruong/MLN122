import { SectionWrap, SLabel, STitle, Reveal, InfoBox } from './UI'

const POINTS = [
  {
    method: 'Giá trị thặng dư Tương Đối', color: 'var(--gold)',
    icon: '⚡', icon2: 'QL.TƯƠNG ĐỐI',
    body: 'Shopee/Lazada tận dụng AI gợi ý hàng hóa, kho tự động, logistics thông minh → rút ngắn lao động tất yếu, tăng mạnh phần thặng dư từ mỗi giao dịch mà không cần tăng giờ làm của công nhân.'
  },
  {
    method: 'Giá trị thặng dư Siêu Ngạch', color: 'var(--red)',
    icon: '⭐', icon2: 'QL.SIÊU NGẠCH',
    body: 'Nhờ lợi thế quy mô và dữ liệu hàng triệu người dùng, các nền tảng lớn có năng suất vượt trội so với mức trung bình ngành → thu lợi nhuận siêu ngạch theo đúng lý luận của Mác.'
  },
  {
    method: 'Tích Tụ & Tập Trung Tư Bản', color: '#2980b9',
    icon: '📊', icon2: 'QUY LUẬT',
    body: 'Cạnh tranh gay gắt khiến tiểu thương nhỏ lẻ khó tồn tại. Thể hiện xu hướng tập trung và tích tụ tư bản — tư bản lớn nuốt tư bản nhỏ theo quy luật cạnh tranh TBCN.'
  },
]

export function CaseStudy() {
  return (
    <SectionWrap id="case">
      <Reveal><SLabel>Mục 3.1.3 — Liên Hệ Thực Tiễn</SLabel></Reveal>
      <Reveal delay={0.05}><STitle>Case Study: Ngày 11.11<br />Qua Lăng Kính Mác-Lênin</STitle></Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2.5rem', alignItems: 'start' }}>
        <Reveal delay={0.1}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '2rem', position: 'sticky', top: '4.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🛍️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.3rem' }}>Shopee / Lazada</h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '2rem' }}>11.11 — SIÊU SALE</div>
            {[
              { n: 'Tỷ $', l: 'Doanh thu trong 24h', c: 'var(--red)' },
              { n: '×5', l: 'Năng suất so với tiểu thương', c: 'var(--gold)' },
              { n: '~70%', l: 'Thị phần top 3 nền tảng', c: '#2980b9' },
            ].map(s => (
              <div key={s.n} style={{ marginBottom: '0.8rem', padding: '0.9rem', background: 'var(--bg3)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 700, color: s.c }}>{s.n}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted2)', marginTop: '0.2rem', lineHeight: 1.4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
            {POINTS.map((p, i) => (
              <Reveal key={p.method} delay={i * 0.12}>
                <div style={{ background: 'var(--bg2)', border: `1px solid var(--border)`, borderLeft: `3px solid ${p.color}`, borderRadius: '6px', padding: '1.6rem', transition: 'transform 0.25s', cursor: 'default' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{p.icon}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: p.color, letterSpacing: '0.1em' }}>{p.icon2}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cream)' }}>{p.method}</span>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.8 }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderLeft: '3px solid var(--red)', borderRadius: '6px', padding: '1.6rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.7rem' }}>❓ Thị trường có luôn công bằng không?</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--cream)' }}>Không.</strong> Trong cạnh tranh, các doanh nghiệp có vốn lớn, công nghệ mạnh và quyền kiểm soát nền tảng sẽ có lợi thế vượt trội. Người yếu thế có nguy cơ bị loại khỏi cuộc chơi.
              </p>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Cần bổ sung</div>
              {['Vai trò điều tiết của Nhà nước — đặc biệt luật chống độc quyền', 'Chính sách hỗ trợ doanh nghiệp nhỏ và vừa', 'Bảo đảm cạnh tranh minh bạch và công bằng', 'Mô hình kinh tế thị trường định hướng XHCN — kết hợp thị trường và Nhà nước'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.82rem', color: 'rgba(238,232,216,0.65)', marginBottom: '0.5rem', lineHeight: 1.65 }}>
                  <span style={{ color: 'var(--gold)', flexShrink: 0, fontFamily: 'var(--font-mono)' }}>{i + 1}.</span>
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionWrap>
  )
}

export function KetLuan() {
  return (
    <section style={{ padding: '6rem 2rem', background: 'var(--bg2)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
      <Reveal>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted2)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Kết Luận</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
            Để Thị Trường Phát Triển<br /><span style={{ color: 'var(--red)', fontStyle: 'italic' }}>Không Bỏ Lại Người Yếu Thế</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
            Vận dụng mô hình <strong style={{ color: 'var(--gold2)' }}>kinh tế thị trường định hướng XHCN</strong> của Việt Nam — kết hợp cơ chế thị trường với vai trò quản lý chủ động của Nhà nước để hài hòa lợi ích xã hội.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.7rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            {['⚖️ Chống độc quyền', '🏪 Hỗ trợ DNNVV', '🔍 Cạnh tranh minh bạch', '🏛️ Điều tiết Nhà nước', '🤝 Hài hòa lợi ích'].map(label => (
              <div key={label} style={{ padding: '0.6rem 1.1rem', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '3px', fontSize: '0.8rem', color: 'var(--muted)', transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold2)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
                {label}
              </div>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--border2)', letterSpacing: '0.08em' }}>G = c + v + m</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted2)', marginTop: '0.4rem' }}>Học thuyết giá trị thặng dư của C. Mác — nền tảng phân tích kinh tế hiện đại</div>
        </div>
      </Reveal>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted2)' }}>MLN 122 — Kinh Tế Chính Trị Mác-Lênin</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted2)' }}>Sản phẩm sáng tạo nhóm · <span style={{ color: 'var(--red)' }}>©2025</span></span>
    </footer>
  )
}
