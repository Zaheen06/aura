import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const REVIEWS = [
  {
    id: 1,
    product: 'NOVA X',
    rating: 5,
    title: 'The best headphone I\'ve ever owned. Period.',
    body: 'I\'ve tried the Sony XM5, Bose QC65, and three others at this price point. The NOVA X isn\'t just better — it\'s in a different category. The ANC is genuinely eerie. The sound is perfectly balanced without being boring. I\'ve been wearing these 6 hours a day for three months.',
    author: 'Marcus T.',
    location: 'New York, USA',
    date: 'Nov 2024',
    verified: true,
    score: '9.8/10',
    avatar: '🎧',
  },
  {
    id: 2,
    product: 'PULSE',
    rating: 5,
    title: 'My mastering career changed when I put these on.',
    body: 'I\'m a professional mixing/mastering engineer with 20 years in the industry. I own $6,000 Audeze LCD-4s and several other references. The PULSE at $299 competes with my $1,200 open-backs. The frequency response is honest, the soundstage is natural, and I trust my mixes on them. Absolutely embarrassing for the competition.',
    author: 'Elena R.',
    location: 'Berlin, Germany',
    date: 'Oct 2024',
    verified: true,
    score: '9.5/10',
    avatar: '🎼',
  },
  {
    id: 3,
    product: 'ARC',
    rating: 5,
    title: '60 hours of battery is not a marketing gimmick.',
    body: 'I went on a 3-week hiking trip. Charged the ARC once before I left. Came back with battery to spare. The sound is punchy and fun, the IP67 rating is real (I\'ve dunked these in streams), and the fit never loosened on 8-hour days. No other sport headphone I\'ve tried comes close.',
    author: 'James K.',
    location: 'Sydney, Australia',
    date: 'Dec 2024',
    verified: true,
    score: '9.2/10',
    avatar: '🏔️',
  },
  {
    id: 4,
    product: 'NOVA X',
    rating: 5,
    title: 'My commute is now my favorite part of the day.',
    body: 'Chicago subway is notoriously loud. I used to arrive at work already exhausted from the noise. With the NOVA X, I step off the train having actually enjoyed 40 minutes of music. The ANC removes everything. The soundstage makes my playlist feel alive. Worth every cent.',
    author: 'Priya S.',
    location: 'Chicago, USA',
    date: 'Jan 2025',
    verified: true,
    score: '9.7/10',
    avatar: '🚇',
  },
  {
    id: 5,
    product: 'PULSE',
    rating: 4,
    title: 'Better than my $700 pair. Genuinely surprised.',
    body: 'Skeptical going in — always am with "disruptive" audio brands. But after 30 days with the PULSE, I sold my previous open-backs. The planar drivers have textural detail in the midrange I\'ve never heard in this price range. My only critique: the cable could be sturdier. Everything else: exceptional.',
    author: 'David L.',
    location: 'London, UK',
    date: 'Nov 2024',
    verified: true,
    score: '8.9/10',
    avatar: '🎵',
  },
  {
    id: 6,
    product: 'ARC',
    rating: 5,
    title: 'Finally, a sport headphone that sounds GOOD.',
    body: 'Every sport headphone I\'ve tried either sounds like it\'s playing from inside a tin can or falls off during a jog. The ARC fits like a second skin and sounds genuinely excellent. Ran a half marathon in the rain. These didn\'t flinch. My new workout essential.',
    author: 'Sofia M.',
    location: 'São Paulo, Brazil',
    date: 'Dec 2024',
    verified: true,
    score: '9.4/10',
    avatar: '🏃‍♀️',
  },
];

const PRESS = [
  { outlet: 'AudiophileToday', quote: '2024 Headphone of the Year. A new benchmark.', score: '9.8' },
  { outlet: 'StudioSound Magazine', quote: 'Editor\'s Choice. Audiophiles, your prayers are answered.', score: '9.5' },
  { outlet: 'GearLab', quote: 'Best Sport Headphone 2024. The ARC redefines the category.', score: '9.2' },
  { outlet: 'TechRadar', quote: 'The first headphone that made us reconsider everything.', score: '4.5/5' },
];

const PRODUCTS_FILTER = ['All', 'NOVA X', 'PULSE', 'ARC'];

export default function ReviewsPage() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? REVIEWS : REVIEWS.filter(r => r.product === filter);

  return (
    <div className="reviews-page">
      {/* ── HERO ── */}
      <section className="reviews-hero">
        <div className="reviews-hero-inner">
          <ScrollReveal>
            <div className="section-label">Community Reviews</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="reviews-hero-title">40,000 Listeners.<br />One Verdict.</h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="reviews-hero-sub">
              We don't pay for reviews. We don't cherry-pick. Every word below is from a real AURA customer — verified purchase.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <div className="reviews-aggregate">
              <div className="reviews-big-score">4.9</div>
              <div className="reviews-agg-right">
                <div className="reviews-stars">★★★★★</div>
                <div className="reviews-agg-label">Average across 2,600+ reviews</div>
                <div className="reviews-bars">
                  {[
                    { stars: 5, pct: 82 },
                    { stars: 4, pct: 14 },
                    { stars: 3, pct: 3 },
                    { stars: 2, pct: 0.5 },
                    { stars: 1, pct: 0.5 },
                  ].map(b => (
                    <div key={b.stars} className="reviews-bar-row">
                      <span className="reviews-bar-label">{b.stars}★</span>
                      <div className="reviews-bar-track">
                        <div className="reviews-bar-fill" style={{ width: `${b.pct}%` }} />
                      </div>
                      <span className="reviews-bar-pct">{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        <div className="tech-hero-glow" />
      </section>

      {/* ── PRESS STRIP ── */}
      <section className="press-strip">
        <div className="press-strip-inner">
          <ScrollReveal>
            <div className="section-label">In the Press</div>
          </ScrollReveal>
          <div className="press-grid">
            {PRESS.map((p, i) => (
              <ScrollReveal key={p.outlet} delay={i * 80}>
                <div className="press-card">
                  <div className="press-score">{p.score}</div>
                  <div className="press-outlet">{p.outlet}</div>
                  <p className="press-quote">"{p.quote}"</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY REVIEWS ── */}
      <section className="community-reviews">
        <div className="community-inner">
          <ScrollReveal>
            <div className="section-label">From Our Community</div>
          </ScrollReveal>

          {/* Filter tabs */}
          <div className="reviews-filter">
            {PRODUCTS_FILTER.map(f => (
              <button
                key={f}
                className={`reviews-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Review cards grid */}
          <div className="reviews-grid">
            {filtered.map((review, i) => (
              <ScrollReveal key={review.id} delay={i * 60}>
                <div className="review-tile">
                  <div className="review-tile-top">
                    <div className="review-tile-avatar">{review.avatar}</div>
                    <div>
                      <div className="review-tile-author">{review.author}</div>
                      <div className="review-tile-meta">{review.location} · {review.date}</div>
                    </div>
                    <div className="review-tile-badge">{review.score}</div>
                  </div>
                  <div className="review-tile-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                  <h3 className="review-tile-title">{review.title}</h3>
                  <p className="review-tile-body">{review.body}</p>
                  <div className="review-tile-footer">
                    <span className="review-tile-product">{review.product}</span>
                    {review.verified && (
                      <span className="review-tile-verified">✓ Verified Purchase</span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
        <ScrollReveal>
          <div className="section-label" style={{ justifyContent: 'center' }}>Join Them</div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="about-cta-title">Your Review Starts<br />with a First Listen.</h2>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="about-cta-sub">60-day trial. Free worldwide shipping. Full refund if you don't love it.</p>
        </ScrollReveal>
        <ScrollReveal delay={240}>
          <a href="/#products" className="hero-cta">Explore Collection →</a>
        </ScrollReveal>
        <div className="about-cta-glow" />
      </section>
    </div>
  );
}
