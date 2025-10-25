import type { ReactNode } from 'react'
import { GraduationCap, Heart, Users, Award, Sparkles } from 'lucide-react'

export const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'grid', gap: 8, justifyItems: 'center', marginBottom: 18 }}>
          <h2 style={{ margin: 0 }}>
            About <strong>Me</strong>
          </h2>
          <p className="text-muted" style={{ margin: 0, maxWidth: 720 }}>
            Passion meets precision in every project.
            {/* We combine precision engineering with design craft to deliver reliable, beautiful results. */}
          </p>
        </div>

        {/* Combined card with features and stats */}
        <div className="card" style={{ padding: 24, display: 'grid', gap: 24 }}>
          {/* Feature items */}
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              {
                icon: <GraduationCap size={20} />,
                title: 'R&D and Fabrication',
                description: 'Applied research meets production-grade workflows to move from idea to part quickly.',
              },
              {
                icon: <Heart size={20} />,
                title: 'Design-led, Results-driven',
                description: 'Every brief is executed with care, balancing aesthetics, function, and manufacturability.',
              },
              {
                icon: <Users size={20} />,
                title: 'Partner-first',
                description: 'Clear communication, fast iteration, and guidance from scoping through delivery.',
              },
            ].map(({ icon, title, description }, i) => (
              <div key={i} style={{ position: 'relative', minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: 'grid',
                    placeItems: 'center',
                    border: '1px solid var(--border)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),radial-gradient(60% 60% at 40% 40%, rgba(108,140,255,0.25), rgba(154,108,255,0.25))',
                    boxShadow: 'var(--glow)',
                    color: 'var(--text)',
                  }}
                  aria-hidden
                >
                  {icon}
                </div>

                {/* centered text */}
                <div style={{ textAlign: 'center', maxWidth: 920 }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem' }}>{title}</h3>
                  <p className="text-muted" style={{ margin: 0 }}>
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border)' }} />

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            <Stat icon={<Users size={16} />} label="Avg. response time" value="1h" />
            <Stat icon={<Sparkles size={16} />} label="Typical lead time" value="2–5 days" />
            <Stat icon={<Award size={16} />} label="Satisfaction" value="100%" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 6,
        justifyItems: 'center',
        padding: 10,
        borderRadius: 10,
        border: '1px solid var(--border)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--muted)' }}>
        {icon}
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.02em' }}>{label}</span>
      </div>
      <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>{value}</div>
    </div>
  )
}