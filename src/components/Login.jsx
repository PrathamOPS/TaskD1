import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

 const navigate = useNavigate()
 const location = useLocation()
 const successMessage = location.state?.message

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    try {
      setLoading(true)

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      )

      navigate('/')
    } catch (error) {
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        setError('Incorrect email or password. Please try again or sign up.')
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else {
        setError('Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card login-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <label htmlFor="login-email">Your email</label>

          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <label htmlFor="login-password">Your password</label>

          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

        {successMessage && (
        <p className="auth-success" role="status">
            {successMessage}
        </p>
        )}

        {error && (
        <p className="auth-error" role="alert">
            {error}
        </p>
        )}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-prompt">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </section>
    </main>
  )
}

export default Login