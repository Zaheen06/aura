// ─────────────────────────────────────────────
// SoundRecommender — AI Sound Recommender modal.
// A 3-step quiz that recommends the best AURA
// headphone based on user preferences.
//
// Props:
//   products      — full products array
//   onClose       — close the modal
//   onProductClick— open showcase for a product
// ─────────────────────────────────────────────

import { useState } from 'react';

// Quiz questions and logic
const STEPS = [
  {
    id:   'genre',
    q:    "What's your primary music?",
    opts: [
      { label: '🎵 Pop & Electronic',  val: 'pop' },
      { label: '🎸 Rock & Metal',      val: 'rock' },
      { label: '🎻 Classical & Jazz',  val: 'classical' },
      { label: '🏃 Workout / Sport',   val: 'sport' },
    ],
  },
  {
    id:   'bass',
    q:    'How do you like your bass?',
    opts: [
      { label: '🔊 Heavy & Punchy',   val: 'heavy' },
      { label: '⚖️ Balanced & Flat',  val: 'flat' },
      { label: '🎯 Tight & Precise',  val: 'tight' },
    ],
  },
  {
    id:   'usecase',
    q:    'Primary use case?',
    opts: [
      { label: '🏠 Home Listening',   val: 'home' },
      { label: '✈️ Travel & Commute', val: 'travel' },
      { label: '🎙️ Studio Work',     val: 'studio' },
      { label: '🏋️ Gym & Outdoors',  val: 'outdoor' },
    ],
  },
];

// Scoring: each answer adds points to [nova, pulse, arc]
const SCORES = {
  genre:   { pop: [2,0,1], rock: [1,0,2], classical: [0,3,0], sport: [0,0,3] },
  bass:    { heavy: [1,0,2], flat: [0,3,0], tight: [2,1,0] },
  usecase: { home: [1,2,0], travel: [3,0,0], studio: [0,3,0], outdoor: [0,0,3] },
};

export default function SoundRecommender({ products, onClose, onProductClick }) {
  const [step,    setStep]    = useState(0);
  const [answers, setAnswers] = useState({});
  const [result,  setResult]  = useState(null);

  const currentStep = STEPS[step];

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [currentStep.id]: val };
    setAnswers(newAnswers);

    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // Compute scores
      const totals = [0, 0, 0];
      for (const [key, chosen] of Object.entries(newAnswers)) {
        const pts = SCORES[key][chosen] || [0, 0, 0];
        pts.forEach((p, i) => { totals[i] += p; });
      }
      const maxIdx = totals.indexOf(Math.max(...totals));
      const ids = ['nova', 'pulse', 'arc'];
      const recommended = products.find((p) => p.id === ids[maxIdx]) || products[0];
      setResult(recommended);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1200,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(145deg,#161616,#0a0a0a)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: '28px',
          padding: '3rem',
          width: '100%',
          maxWidth: '480px',
          position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.2rem', right: '1.2rem',
            background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)',
            color: '#888', borderRadius: '50%', width: '32px', height: '32px',
            cursor: 'pointer', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {!result ? (
          <>
            {/* Progress dots */}
            <div style={{ display: 'flex', gap: '.4rem', marginBottom: '2rem' }}>
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: '3px', flex: 1, borderRadius: '2px',
                    background: i <= step ? '#fff' : 'rgba(255,255,255,.12)',
                    transition: 'background .4s',
                  }}
                />
              ))}
            </div>

            {/* Step label */}
            <div style={{ fontSize: '.65rem', letterSpacing: '.2em', color: '#555', textTransform: 'uppercase', marginBottom: '.8rem' }}>
              Step {step + 1} of {STEPS.length}
            </div>

            {/* Question */}
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '2rem', letterSpacing: '1px',
              marginBottom: '2rem', lineHeight: 1.1,
            }}>
              {currentStep.q}
            </h2>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
              {currentStep.opts.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleAnswer(opt.val)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,.04)',
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: '14px',
                    color: '#ccc',
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '.9rem',
                    fontFamily: "'Outfit', sans-serif",
                    transition: 'background .2s, border-color .2s, color .2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)';
                    e.currentTarget.style.color = '#ccc';
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Result screen */
          <>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '.65rem', letterSpacing: '.2em', color: '#555', textTransform: 'uppercase', marginBottom: '1rem' }}>
                AI Recommendation
              </div>
              <img
                src={result.image}
                alt={result.name}
                style={{ width: '200px', height: '200px', objectFit: 'contain', marginBottom: '1.5rem' }}
                loading="lazy"
              />
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '3rem', letterSpacing: '2px', lineHeight: 1,
                marginBottom: '.4rem',
              }}>
                {result.name}
              </h2>
              <p style={{ color: '#888', fontSize: '.88rem', marginBottom: '.5rem' }}>{result.sub}</p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', marginBottom: '2rem' }}>
                {result.price}
              </p>
              <p style={{ color: '#666', fontSize: '.82rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                {result.tagline}
              </p>

              <div style={{ display: 'flex', gap: '.8rem', justifyContent: 'center' }}>
                <button
                  className="btn-primary"
                  style={{ width: 'auto', padding: '.85rem 2rem', marginTop: 0 }}
                  onClick={() => onProductClick(result)}
                >
                  Explore {result.name} →
                </button>
                <button
                  className="btn-outline"
                  style={{ width: 'auto', padding: '.85rem 1.5rem', marginTop: 0 }}
                  onClick={handleRestart}
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
