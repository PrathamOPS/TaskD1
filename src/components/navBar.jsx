import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

function Navbar({ user, plan }) {
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await signOut(auth)
      navigate('/')
    } catch {
      window.alert('Could not log out. Please try again.')
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">DEV@Deakin</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/pricing">Pricing</Link>
      </div>
      <div className="nav-auth">
        <button type="button" onClick={() => navigate('/post')}>Post</button>
        {user ? (
          <>
            <span className="nav-user">{user.displayName || user.email} <span className="plan-pill">{plan}</span></span>
            <button type="button" className="nav-link-button" onClick={handleLogout}>Logout</button>
          </>
        ) : <Link to="/login">Login</Link>}
      </div>
    </nav>
  )
}

export default Navbar
