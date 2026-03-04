import { SectionWrap, SLabel, STitle, Reveal } from './UI'

const ENTITIES = [
  {
    icon: '🏭', code: 'CT.01', title: 'Người Sản Xuất',
    def: 'Những người trực tiếp tạo ra hàng hóa, dịch vụ để cung cấp cho thị trường nhằm đáp ứng nhu cầu tiêu dùng của xã hội.',
    roles: [
      'Sử dụng các yếu tố đầu vào (vốn, sức lao động, tài nguyên) để tạo ra sản phẩm',
      'Có trách nhiệm cung cấp hàng hóa đúng chất lượng, an toàn và có trách nhiệm với xã hội',
    ],
    color: 'var(--red)',
  },
  {
    icon: '🛒', code: 'CT.02', title: 'Người Tiêu Dùng',
    def: 'Những người mua hàng hóa, dịch vụ trên thị trường để thỏa mãn nhu cầu tiêu dùng.',
    roles: [
      'Quyết định sự tồn tại của người sản xuất thông qua việc lựa chọn mua sản phẩm',
      'Sức mua là động lực quan trọng thúc đẩy sản xuất phát triển',
      '"Khách hàng là thượng đế" — vai trò định hướng sản xuất',
    ],
    color: 'var(--gold)',
  },
  {
    icon: '🔗', code: 'CT.03', title: 'Chủ Thể Trung Gian',
    def: 'Thương nhân, môi giới, hệ thống ngân hàng, thị trường chứng khoán...',
    roles: [
      'Kết nối người sản xuất và người tiêu dùng, giúp lưu thông hàng hóa thông suốt',
      'Giảm chi phí giao dịch và nâng cao hiệu quả kinh tế cho cả bên bán lẫn bên mua',
    ],
    color: 'var(--blue)',
  },
  {
    icon: '🏛️', code: 'CT.04', title: 'Nhà Nước',
    def: 'Chủ thể đặc biệt — không tham gia trực tiếp vào sản xuất kinh doanh mà thực hiện chức năng quản lý và điều tiết.',
    roles: [
      'Quản lý, điều tiết nền kinh tế thông qua pháp luật và các chính sách kinh tế',
      'Khắc phục khuyết tật của thị trường (độc quyền, ô nhiễm môi trường, bất bình đẳng)',
      'Tạo môi trường vĩ mô thuận lợi để các chủ thể khác hoạt động hiệu quả',
    ],
    color: 'var(--green)',
  },
]

export default function ChuThe() {
  return (
    <SectionWrap id="chu-the">
      <Reveal><SLabel>Mục 2.2.3</SLabel></Reveal>
      <Reveal delay={0.05}><STitle>Vai Trò Các Chủ Thể<br />Tham Gia Thị Trường</STitle></Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
        {ENTITIES.map((e, i) => (
          <Reveal key={e.code} delay={i * 0.1}>
            <div style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderTop: `2px solid ${e.color}`, borderRadius: '6px',
              padding: '1.8rem', height: '100%', transition: 'transform 0.25s',
            }}
              onMouseEnter={el => el.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={el => el.currentTarget.style.transform = 'none'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.8rem' }}>{e.icon}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted2)', letterSpacing: '0.1em' }}>{e.code}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--cream)', marginBottom: '0.7rem' }}>{e.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.2rem', fontStyle: 'italic', borderLeft: `2px solid ${e.color}`, paddingLeft: '0.8rem' }}>{e.def}</p>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: e.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Vai trò</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {e.roles.map((r, ri) => (
                  <li key={ri} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.82rem', color: 'rgba(238,232,216,0.65)', lineHeight: 1.65 }}>
                    <span style={{ color: e.color, flexShrink: 0, marginTop: '2px' }}>—</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Flow diagram */}
      <Reveal delay={0.3}>
        <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '6px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted2)', letterSpacing: '0.12em', marginBottom: '1.2rem' }}>VÒNG TUẦN HOÀN</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['🏭 Sản xuất', '→', '🔗 Lưu thông', '→', '🛒 Tiêu dùng', '→', '📊 Tín hiệu thị trường', '→', '🏭 Sản xuất'].map((item, i) => (
              <span key={i} style={{ fontSize: item === '→' ? '1rem' : '0.82rem', color: item === '→' ? 'var(--muted2)' : 'var(--muted)', padding: item !== '→' ? '0.35rem 0.8rem' : '0', background: item !== '→' ? 'var(--bg3)' : 'none', borderRadius: '3px', border: item !== '→' ? '1px solid var(--border)' : 'none' }}>{item}</span>
            ))}
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--muted2)', textAlign: 'center', lineHeight: 1.6 }}>Nhà nước điều tiết toàn bộ vòng này — đảm bảo ổn định và công bằng</p>
        </div>
      </Reveal>
    </SectionWrap>
  )
}
