import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await api.post('/token/', {
        username,
        password,
      });

      // SAVE TOKENS
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      // SUCCESS
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f3f4f6',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'white',
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: '#111827',
          }}
        >
          🏥 Smart Clinic
        </h1>

        <p
          style={{
            textAlign: 'center',
            color: '#6b7280',
            marginBottom: '2rem',
          }}
        >
          Sign in to access the ERP dashboard
        </p>

        {error && (
          <div
            style={{
              background: '#fee2e2',
              color: '#991b1b',
              padding: '0.9rem 1rem',
              borderRadius: '10px',
              marginBottom: '1rem',
              fontWeight: '600',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151',
              }}
            >
              Username
            </label>

            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='admin'
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151',
              }}
            >
              Password
            </label>

            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              required
              style={inputStyle}
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#93c5fd' : '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.9rem',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
            }}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.9rem 1rem',
  borderRadius: '12px',
  border: '1px solid #d1d5db',
  outline: 'none',
  fontSize: '1rem',
  boxSizing: 'border-box',
};