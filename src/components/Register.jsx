import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (name.trim().split(/\s+/).length < 2) {
      setError('Please enter your first and last name.')
      return
    }

    if (password.length < 6) {
      setError('Your password must contain at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setLoading(true)

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      )

      const user = userCredential.user

      await updateProfile(user, {
        displayName: name.trim()
      })

      await setDoc(doc(db, 'users', user.uid), {
        name: name.trim(),
        email: user.email,
        plan: 'Free',
        createdAt: serverTimestamp()
      })

      await auth.signOut()

      navigate('/login', {
        state: { message: 'Account created successfully. Please log in.' }
      })
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please log in.')
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else if (error.code === 'auth/weak-password') {
        setError('Please choose a stronger password.')
      } else {
        setError('Registration failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card register-card">
        <h2>Create a DEV@Deakin Account</h2>

        <form onSubmit={handleRegister}>
          <label htmlFor="register-name">Name*</label>

          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First and last name"
            autoComplete="name"
            required
          />

          <label htmlFor="register-email">Email*</label>

          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <label htmlFor="register-password">Password*</label>

          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            minLength={6}
            required
          />

          <label htmlFor="confirm-password">Confirm password*</label>

          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            required
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create'}
          </button>
        </form>

        <p className="signup-prompt">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  )
}

export default Register