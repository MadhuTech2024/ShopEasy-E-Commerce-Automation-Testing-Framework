
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router';
import './index.css';

const SignUp = ({ switchToLogin, onClose }) => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const getRedirectPath = () => {
    const requestedPath = new URLSearchParams(location.search)
      .get('redirect');

    if (
      requestedPath &&
      requestedPath.startsWith('/') &&
      !requestedPath.startsWith('//')
    ) {
      return requestedPath;
    }

    return '/';
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      setMessage('Registration successful! Please log in.');

      // Give the user time to see the confirmation.
      setTimeout(() => {
        const redirectPath = getRedirectPath();

        if (onClose) {
          onClose();
        }

        if (switchToLogin) {
          switchToLogin();
        } else {
          navigate(
            `/login?redirect=${encodeURIComponent(redirectPath)}`,
            { replace: true }
          );
        }
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">
        Create <span>ShopEasy</span> Account
      </h2>

      {error && (
        <div className="error-box" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div
          className="success-box"
          role="status"
          style={{
            backgroundColor: '#dcfce7',
            color: '#166534',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="signup-name">Full Name</label>
          <input
            id="signup-name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-email">Email Address</label>
          <input
            id="signup-email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            name="password"
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="signup-btn"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p className="login-text">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => {
            if (switchToLogin) {
              switchToLogin();
            } else {
              navigate(
                `/login?redirect=${encodeURIComponent(getRedirectPath())}`
              );
            }
          }}
          className="login-link"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignUp;
