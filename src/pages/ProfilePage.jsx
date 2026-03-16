// ─────────────────────────────────────────────
// ProfilePage — Content rendered inside the
// Profile SidePanel. Login / signup form.
// No props required.
// ─────────────────────────────────────────────

export default function ProfilePage() {
  return (
    <div style={{ marginTop: '2rem' }}>
      <p style={{ color: '#888', lineHeight: 1.7, marginBottom: '2rem' }}>
        Log in to view orders, saved items, and personalized acoustic profiles.
      </p>

      <input
        type="email"
        placeholder="Email Address"
        style={{
          width: '100%',
          padding: '1rem',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,.07)',
          borderRadius: '10px',
          color: '#fff',
          outline: 'none',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '.95rem',
        }}
      />

      <button className="btn-primary">Continue with Email</button>
      <button className="btn-outline">Create Account</button>
    </div>
  );
}
