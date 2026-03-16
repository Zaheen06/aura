// ─────────────────────────────────────────────
// ProfilePage — Content rendered inside the
// Profile SidePanel. Login / signup form.
// No props required.
// ─────────────────────────────────────────────

import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('aura_user_profile');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    // Simple localstorage auth simulation
    const userProfile = {
      email,
      name: mode === 'register' && name ? name : email.split('@')[0],
      joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    
    localStorage.setItem('aura_user_profile', JSON.stringify(userProfile));
    setUser(userProfile);
  };

  const handleLogout = () => {
    localStorage.removeItem('aura_user_profile');
    setUser(null);
    setEmail('');
    setPassword('');
    setName('');
    setMode('login');
  };

  const inputStyle = {
    width: '100%',
    padding: '1.2rem',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    color: '#fff',
    outline: 'none',
    fontFamily: 'Outfit, sans-serif',
    fontSize: '0.95rem',
    marginBottom: '1rem',
    transition: 'border-color 0.3s, background 0.3s'
  };

  if (user) {
    return (
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '1.5rem', 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))', 
          padding: '2rem', 
          borderRadius: '20px', 
          border: '1px solid rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', right: '-20%', top: '-30%', 
            width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(192,132,252,0.15), transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, #cda73b, #f0c040)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', color: '#000', fontWeight: 'bold',
            flexShrink: 0
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: '600', letterSpacing: '0.02em' }}>{user.name}</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>{user.email}</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2.5rem', marginTop: '1rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>
            Account Details
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '0.95rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Member Since</span>
            <span>{user.joined}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '0.95rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Acoustic Profile</span>
            <span style={{ color: '#c084fc', background: 'rgba(192,132,252,0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '500' }}>Harman Target</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '0.95rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Saved Models</span>
            <span>0 Items</span>
          </div>
        </div>

        <button onClick={handleLogout} className="btn-outline" style={{ marginTop: 'auto', marginBottom: '2rem' }}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1.05rem', fontWeight: 300 }}>
        {mode === 'login' 
          ? 'Log in to view orders, saved items, and personalized acoustic profiles.'
          : 'Create your AURA ID to unlock premium audio features and track your orders.'}
      </p>

      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />

        <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem' }}>
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
        {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
        <button 
          type="button"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          style={{
            background: 'none', border: 'none', color: '#fff', marginLeft: '0.5rem',
            textDecoration: 'underline', cursor: 'pointer', fontFamily: 'Outfit, sans-serif'
          }}
        >
          {mode === 'login' ? 'Register' : 'Log in'}
        </button>
      </div>
    </div>
  );
}
