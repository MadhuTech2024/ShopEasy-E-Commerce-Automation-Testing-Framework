import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import './index.css';

const Login = ({ switchToRegister, onClose }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

const getRedirectPath = () => {
  const requestedPath = new URLSearchParams(location.search)
    .get('redirect');

  // Accept only safe, internal application paths.
  if (
    requestedPath &&
    requestedPath.startsWith('/') &&
    !requestedPath.startsWith('//')
  ) {
    return requestedPath;
  }

  return '/';
};

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
try {
  await login(formData);

  if (onClose) {
    // Preserve existing modal behavior.
    onClose();
  } else {
    navigate(getRedirectPath(), { replace: true });
  }
} catch (err) {
  setError(
    err.response?.data?.message ||
    err.message ||
    'Login failed. Please check your credentials.'
  );
} finally {
  setLoading(false);
}
  };

  return (
    <div className="login-container">
      <h2 className="login-title">
        Login to <span>ShopEasy</span>
      </h2>

      {error && <div className="error-box">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="login-btn"
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>

      <p className="signup-text">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={switchToRegister}
          className="signup-link"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;