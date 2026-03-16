import { useState, useEffect, useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';

/* ── Data ─────────────────────────────────────────────────── */
const TIMELINE = [
  {
    year: '2019',
    title: 'The Obsession Begins',
    tag: 'Origin',
    desc: 'Three audio engineers quit their jobs at a major studio to chase a single question: why does consumer audio still sound bad?',
    icon: '🔥',
  },
  {
    year: '2021',
    title: 'NOVA X Prototype',
    tag: 'Breakthrough',
    desc: 'After 18 months and 212 failed driver iterations, the first reference-grade beryllium driver leaves our lab. Audiophiles call it "a miracle from a garage."',
    icon: '⚡',
  },
  {
    year: '2022',
    title: 'PULSE Launches',
    tag: 'Launch',
    desc: 'Open-back planar magnetic drivers debut to universal critical acclaim. Five professional mastering engineers ask where they can buy a pair.',
    icon: '🎚️',
  },
  {
    year: '2023',
    title: 'ARC Redefines Sport Audio',
    tag: 'Innovation',
    desc: '60-hour battery and IP67 rating. The ARC proves performance and durability don\'t have to be a tradeoff.',
    icon: '🏆',
  },
  {
    year: '2024',
    title: '40,000+ Audiophiles',
    tag: 'Community',
    desc: 'AURA ships to 60+ countries. Our community of listeners grows faster than our ability to keep up. We\'re grateful every day.',
    icon: '🌍',
  },
];

const TEAM_STATS = [
  { val: 3,    suffix: '',  label: 'Co-Founders' },
  { val: 47,   suffix: '+', label: 'Team Members' },
  { val: 212,  suffix: '',  label: 'Driver Prototypes' },
  { val: 60,   suffix: '+', label: 'Countries Shipped' },
];

const VALUES = [
  {
    icon: '🔬',
    title: 'Science First',
    color: '#6B8CFF',
    colorRgb: '107,140,255',
    desc: 'Every decision starts with physics, acoustics, and materials science. We don\'t guess — we measure, test, and iterate until the data confirms what our ears already knew.',
  },
  {
    icon: '🤝',
    title: 'Radical Honesty',
    color: '#C9A84C',
    colorRgb: '201,168,76',
    desc: 'We publish our frequency response graphs, THD measurements, and impedance curves. If our product isn\'t right for you, we\'ll tell you — and point you to who is.',
  },
  {
    icon: '🌱',
    title: 'Sustainable by Design',
    color: '#4ECFA8',
    colorRgb: '78,207,168',
    desc: 'Modular parts. Repairable hardware. Recycled packaging. We build things that last because the best product is the one you never have to throw away.',
  },
  {
    icon: '♾️',
    title: 'Obsessive Iteration',
    color: '#FF7C5C',
    colorRgb: '255,124,92',
    desc: 'NOVA X went through 212 driver prototypes. We\'ll spend another year on a single detail if it means the person who buys it feels the difference.',
  },
];

const FOUNDERS = [
  {
    name: 'Kai Reeves',
    role: 'Co-Founder & Chief Audio Engineer',
    note: '15 years at Sony. Built drivers for Grammy-winning studios.',
    emoji: '🎧',
  },
  {
    name: 'Priya Nair',
    role: 'Co-Founder & CEO',
    note: 'Former VP at Bose. Believes great audio is a human right.',
    emoji: '🚀',
  },
  {
    name: 'Leo Müller',
    role: 'Co-Founder & CTO',
    note: 'PhD in Acoustic Engineering, MIT. Coined "truth-first tuning."',
    emoji: '🧪',
  },
];

/* ── Animated counter hook ───────────────────────────────── */
function useCountUp(target, duration = 1400, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── Stat item with intersection-triggered counter ───────── */
function AnimatedStat({ val, suffix, label }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const count = useCountUp(val, 1600, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ap-stat" ref={ref}>
      <div className="ap-stat__val">
        {count}{suffix}
      </div>
      <div className="ap-stat__label">{label}</div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="about-page">

      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className="ap-hero">
        {/* Noise / grain texture layer */}
        <div className="ap-hero__noise" />
        {/* Large ambient glow */}
        <div className="ap-hero__glow" />

        <div className="ap-hero__inner">
          <ScrollReveal>
            <div className="section-label">Our Story</div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="ap-hero__title">
              Sound Is Not<br />
              <span className="ap-hero__title-stroke">a Compromise.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <p className="ap-hero__sub">
              Three engineers. One obsession. A refusal to accept that premium
              audio should cost $2,000 — or sound mediocre at $500. AURA exists
              in that gap, and we intend to close it forever.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={280}>
            <div className="ap-hero__badges">
              <span className="ap-hero__badge">Est. 2019</span>
              <span className="ap-hero__badge">San Francisco</span>
              <span className="ap-hero__badge">60+ Countries</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Decorative scrolling text strip */}
        <div className="ap-marquee" aria-hidden="true">
          <div className="ap-marquee__track">
            {'PRECISION · HONESTY · CRAFT · SCIENCE · OBSESSION · SOUND · '.repeat(6)}
          </div>
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════ */}
      <section className="ap-stats">
        <div className="ap-stats__inner">
          {TEAM_STATS.map((s) => (
            <AnimatedStat key={s.label} val={s.val} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* ══ FOUNDERS ═══════════════════════════════════════════ */}
      <section className="ap-founders">
        <div className="ap-founders__inner">
          <ScrollReveal>
            <div className="section-label">The People</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="ap-section-title">Three Engineers.<br />One Mission.</h2>
          </ScrollReveal>

          <div className="ap-founders__grid">
            {FOUNDERS.map((f, i) => (
              <ScrollReveal key={f.name} delay={i * 100}>
                <div className="ap-founder-card">
                  <div className="ap-founder-card__emoji">{f.emoji}</div>
                  <div className="ap-founder-card__body">
                    <p className="ap-founder-card__name">{f.name}</p>
                    <p className="ap-founder-card__role">{f.role}</p>
                    <p className="ap-founder-card__note">{f.note}</p>
                  </div>
                  <div className="ap-founder-card__glow" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MANIFESTO ══════════════════════════════════════════ */}
      <section className="ap-manifesto">
        <div className="ap-manifesto__line ap-manifesto__line--top" />
        <div className="ap-manifesto__inner">
          <ScrollReveal>
            <div className="section-label" style={{ justifyContent: 'center' }}>Why We Exist</div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <blockquote className="ap-manifesto__quote">
              <span className="ap-manifesto__quote-mark">"</span>
              The headphone market has a dirty secret. Most consumer audio is tuned to sound{' '}
              <em>impressive for 30 seconds in a store</em> — not truthful for 30 years in your ears.
              We made AURA because we were angry about it.
              <span className="ap-manifesto__quote-mark">"</span>
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="ap-manifesto__attr">— Kai Reeves, Co-Founder & Chief Audio Engineer</p>
          </ScrollReveal>
        </div>
        <div className="ap-manifesto__line ap-manifesto__line--bottom" />
      </section>

      {/* ══ VALUES ═════════════════════════════════════════════ */}
      <section className="ap-values">
        <div className="ap-values__inner">
          <ScrollReveal>
            <div className="section-label">What We Stand For</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="ap-section-title">
              Built on Four<br />Unbreakable Rules.
            </h2>
          </ScrollReveal>

          <div className="ap-values__grid">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 90}>
                <div
                  className="ap-value-card"
                  style={{ '--vc': v.color, '--vc-rgb': v.colorRgb }}
                >
                  <div className="ap-value-card__num">0{i + 1}</div>
                  <div className="ap-value-card__icon-wrap">
                    <span>{v.icon}</span>
                  </div>
                  <h3 className="ap-value-card__title">{v.title}</h3>
                  <p className="ap-value-card__desc">{v.desc}</p>
                  <div className="ap-value-card__accent-bar" />
                  <div className="ap-value-card__glow" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ═══════════════════════════════════════════ */}
      <section className="ap-timeline">
        <div className="ap-timeline__inner">
          <ScrollReveal>
            <div className="section-label">The Journey</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="ap-section-title">Five Years.<br />One Mission.</h2>
          </ScrollReveal>

          <div className="ap-timeline__track">
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 110}>
                <div className={`ap-tl-item ${i % 2 === 0 ? 'ap-tl-item--left' : 'ap-tl-item--right'}`}>
                  {/* Connector dot */}
                  <div className="ap-tl-item__dot">
                    <span className="ap-tl-item__dot-icon">{item.icon}</span>
                  </div>

                  {/* Card */}
                  <div className="ap-tl-card">
                    <div className="ap-tl-card__header">
                      <span className="ap-tl-card__year">{item.year}</span>
                      <span className="ap-tl-card__tag">{item.tag}</span>
                    </div>
                    <h4 className="ap-tl-card__title">{item.title}</h4>
                    <p className="ap-tl-card__desc">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            {/* Vertical line */}
            <div className="ap-timeline__line" />
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════ */}
      <section className="ap-cta">
        <div className="ap-cta__glow" />
        <div className="ap-cta__inner">
          <ScrollReveal>
            <div className="section-label" style={{ justifyContent: 'center' }}>Ready?</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="ap-cta__title">Hear What<br />We Hear.</h2>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="ap-cta__sub">
              Every AURA headphone comes with a 60-day trial. If you can go back after that, we'll be shocked.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <div className="ap-cta__actions">
              <a href="/#products" className="hero-cta">Explore Collection →</a>
              <a href="/technology" className="hero-cta-secondary" style={{ textDecoration: 'none' }}>
                Our Technology
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
