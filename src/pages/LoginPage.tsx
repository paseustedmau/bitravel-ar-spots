import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    navigate('/admin', { replace: true });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
        padding: 24,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 380,
          padding: 32,
          backgroundColor: 'var(--color-surface)',
          borderRadius: 20,
          border: '1px solid var(--color-border)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img 
            src="/bitravel-logo.png" 
            alt="Bitravel AR" 
            style={{ 
              height: 48, 
              objectFit: 'contain',
              marginBottom: 12
            }} 
          />
          <p
            style={{
              fontSize: 13,
              color: 'var(--color-muted)',
              marginTop: 4,
            }}
          >
            Panel de administración
          </p>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 6,
              color: 'var(--color-text)',
            }}
          >
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@bitravel.app"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 12,
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 6,
              color: 'var(--color-text)',
            }}
          >
            Contraseña
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 12,
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <p
            style={{
              fontSize: 13,
              color: '#e53e3e',
              textAlign: 'center',
              marginBottom: 16,
              padding: '8px 12px',
              backgroundColor: 'rgba(229,62,62,0.08)',
              borderRadius: 10,
            }}
          >
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px 0',
            borderRadius: 14,
            border: 'none',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            fontSize: 15,
            fontWeight: 700,
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'all 0.15s',
          }}
        >
          {loading ? 'Entrando…' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}
