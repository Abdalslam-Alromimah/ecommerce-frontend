import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import './Login.css';

const Login: React.FC = () => {
  const [idToken, setIdToken] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(idToken);
      localStorage.setItem('token', idToken); // Store the Firebase ID token
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/'); // Redirect to home
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={idToken}
        onChange={(e) => setIdToken(e.target.value)}
        placeholder="Firebase ID Token"
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;