import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './firebase'
import Navbar from './components/navBar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Gallery from './components/Gallery'
import Articles from './components/Articles'
import Tutorials from './components/Tutorials'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Post from './pages/Post'
import Pricing from './pages/Pricing'
import './App.css'
import './Auth.css'

function Home() {
  return <><Hero /><About /><Projects /><Gallery /><Articles /><Tutorials /></>
}

function AppContent() {
  const [user, setUser] = useState(null)
  const [plan, setPlan] = useState('Free')
  const [authLoading, setAuthLoading] = useState(true)

  const refreshPlan = useCallback(async () => {
    const currentUser = auth.currentUser
    if (!currentUser) {
      setPlan('Free')
      return
    }
    try {
      const snapshot = await getDoc(doc(db, 'users', currentUser.uid))
      setPlan(snapshot.exists() && snapshot.data().plan === 'Paid' ? 'Paid' : 'Free')
    } catch (error) {
      console.error('Could not load subscription plan:', error)
      setPlan('Free')
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid)
          const snapshot = await getDoc(userRef)
          if (!snapshot.exists()) {
            await setDoc(userRef, {
              name: currentUser.displayName || '',
              email: currentUser.email || '',
              plan: 'Free',
              createdAt: serverTimestamp(),
            }, { merge: true })
            setPlan('Free')
          } else {
            setPlan(snapshot.data().plan === 'Paid' ? 'Paid' : 'Free')
          }
        } catch (error) {
          console.error('Could not load user profile:', error)
          setPlan('Free')
        }
      } else {
        setPlan('Free')
      }
      setAuthLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <>
      <Navbar user={user} plan={plan} />
      {authLoading ? <div className="app-loading" role="status">Loading your session…</div> : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<Post />} />
          <Route path="/pricing" element={<Pricing user={user} plan={plan} onPlanChanged={refreshPlan} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      )}
      <Footer />
    </>
  )
}

function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>
}

export default App
