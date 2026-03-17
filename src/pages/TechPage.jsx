import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';

const TECH_PILLARS = [
  {
    label: 'Driver Technology',
    title: 'Beryllium. Not<br/>Because It\'s Trendy.',
    desc: 'Beryllium is 7x stiffer than titanium at one-third the weight. A beryllium diaphragm moves precisely where and when it\'s told — with zero breakup resonance in the audible range. No other material comes close.',
    stat: '40mm',
    statLabel: 'Pure Beryllium Driver',
    detail: 'Breakup resonance moved to 87kHz, far beyond the 20kHz limit of human hearing. The result: perfect transient response, every time.',
    accent: '#e8c97a',
  },
  {
    label: 'Noise Control',
    title: 'ANC That Actually<br/>Works.',
    desc: 'Most ANC systems pump white noise behind your audio to "mask" ambient sound. Ours doesn\'t. Hybrid feedforward/feedback topology with 6 microphones creates a true photographic negative of noise — and cancels it before it reaches your ears.',
    stat: '-40dB',
    statLabel: 'ANC Reduction',
    detail: 'Three times the isolation of standard single-mic ANC systems. We measured. You can too.',
    accent: '#7eb8d4',
  },
  {
    label: 'Open-Back Design',
    title: 'When Closed<br/>Sounds Smaller.',
    desc: 'Closed-back headphones trap air in the ear cup, creating artificial low-frequency bloom and a narrow soundstage. PULSE\'s open-back architecture breathes — delivering a natural, room-filling presentation that mastering engineers spend careers trying to recreate with speakers.',
    stat: '180°',
    statLabel: 'Soundstage Width',
    detail: 'Tested against leading closed-back competitors in double-blind evaluations. PULSE won in 94% of trials.',
    accent: '#c084fc',
  },
  {
    label: 'Acoustic Tuning',
    title: 'Flat Isn\'t Boring.<br/>It\'s Honest.',
    desc: 'Consumer audio is tuned for the parking lot. Bass-heavy. Mid-scooped. Anything to impress in 10 seconds. AURA tunes to the Harman Target Response — the most scientifically validated target for listener preference — but adapts it per product based on thousands of real listening tests.',
    stat: '±0.5dB',
    statLabel: 'Frequency Accuracy',
    detail: 'Measured channel matching across 500 units. Every AURA leaves our facility within spec.',
    accent: '#34d399',
  },
];

const SPECS_COMPARE = [
  { label: 'Driver Material', aura: 'Beryllium', other: 'Mylar / Titanium' },
  { label: 'Frequency Response', aura: '5Hz – 40kHz', other: '20Hz – 20kHz' },
  { label: 'THD @ 94dB', aura: '< 0.05%', other: '0.3 – 1.2%' },
  { label: 'ANC Reduction', aura: '−40dB', other: '−15 to −25dB' },
  { label: 'Battery Life', aura: '60 hours', other: '20 – 30 hours' },
  { label: 'Impedance', aura: '32Ω', other: '32– 64Ω' },
];

export default function TechPage() {
  return (
    <div className="tech-page">
      {/* ── HERO ── */}
      <section className="tech-hero">
        <div className="tech-hero-inner">
          <ScrollReveal>
            <div className="section-label">The Science</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="tech-hero-title">
              Engineering<br />for Your Ears.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="tech-hero-sub">
              Premium audio isn't magic. It's physics, materials science, and thousands of hours of iteration. Here's exactly how we do it — and why it matters to you.
            </p>
          </ScrollReveal>
        </div>
        <div className="tech-hero-glow" />
      </section>

      {/* ── TECH PILLARS ── */}
      {TECH_PILLARS.map((pillar, i) => (
        <section key={pillar.label} className={`tech-pillar ${i % 2 === 1 ? 'tech-pillar--alt' : ''}`}>
          <div className="tech-pillar-inner">
            <div className="tech-pillar-content">
              <ScrollReveal>
                <div className="section-label">{pillar.label}</div>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h2
                  className="tech-pillar-title"
                  dangerouslySetInnerHTML={{ __html: pillar.title }}
                />
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <p className="tech-pillar-desc">{pillar.desc}</p>
              </ScrollReveal>
              <ScrollReveal delay={240}>
                <div className="tech-pillar-detail">{pillar.detail}</div>
              </ScrollReveal>
            </div>
            <div className="tech-pillar-visual">
              <ScrollReveal delay={120}>
                <div className="tech-stat-card" style={{ '--accent': pillar.accent }}>
                  <div className="tech-stat-val">{pillar.stat}</div>
                  <div className="tech-stat-label">{pillar.statLabel}</div>
                  <div className="tech-stat-glow" style={{ background: `radial-gradient(circle, ${pillar.accent}33, transparent 70%)` }} />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── COMPARISON TABLE ── */}
      <section className="tech-compare">
        <div className="tech-compare-inner">
          <ScrollReveal>
            <div className="section-label">The Numbers</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="about-section-title">AURA vs. The Field.</h2>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <div className="compare-table">
              <div className="compare-header">
                <div className="compare-col-label">Specification</div>
                <div className="compare-col-aura">AURA NOVA X</div>
                <div className="compare-col-other">Category Average</div>
              </div>
              {SPECS_COMPARE.map((row, i) => (
                <div key={row.label} className="compare-row" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="compare-col-label">{row.label}</div>
                  <div className="compare-col-aura compare-val--aura">{row.aura}</div>
                  <div className="compare-col-other compare-val--other">{row.other}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
        <ScrollReveal>
          <div className="section-label" style={{ justifyContent: 'center' }}>Your Turn</div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="about-cta-title">Numbers Are One Thing.<br />Listening Is Another.</h2>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="about-cta-sub">60-day home trial. No questions asked return. The data already convinced us — let us convince your ears.</p>
        </ScrollReveal>
        <ScrollReveal delay={240}>
          <a href="/#products" className="hero-cta">Shop Collection →</a>
        </ScrollReveal>
        <div className="about-cta-glow" />
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
