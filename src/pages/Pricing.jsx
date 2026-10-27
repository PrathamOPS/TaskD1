import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import './Pricing.css'

const initialPayment = { name: '', cardNumber: '', expiry: '', cvv: '' }

function Pricing({ user, plan, onPlanChanged }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [payment, setPayment] = useState(initialPayment)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    setNotice('')
  }, [user?.uid])

  function updatePayment(event) {
    const { name, value } = event.target
    if (name === 'cardNumber') {
      setPayment(current => ({ ...current, [name]: value.replace(/\D/g, '').slice(0, 16) }))
    } else if (name === 'cvv') {
      setPayment(current => ({ ...current, [name]: value.replace(/\D/g, '').slice(0, 4) }))
    } else {
      setPayment(current => ({ ...current, [name]: value }))
    }
    setError('')
  }

  async function submitUpgrade(event) {
    event.preventDefault()
    setError('')
    if (!auth.currentUser) {
      setModalOpen(false)
      setNotice('Please log in before upgrading your plan.')
      return
    }
    if (plan === 'Paid') {
      setModalOpen(false)
      setNotice('Your account is already on the Paid plan.')
      return
    }
    const digits = payment.cardNumber.replace(/\s/g, '')
    if (!payment.name.trim() || !/^\d{16}$/.test(digits) || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry) || !/^\d{3,4}$/.test(payment.cvv)) {
      setError('Enter a name, 16-digit card number, valid MM/YY expiry, and 3–4 digit CVV.')
      return
    }
    try {
      setBusy(true)
      const userRef = doc(db, 'users', auth.currentUser.uid)
      const snapshot = await getDoc(userRef)
      await setDoc(userRef, {
        ...(snapshot.exists() ? snapshot.data() : {}),
        name: auth.currentUser.displayName || payment.name.trim(),
        email: auth.currentUser.email,
        plan: 'Paid',
        upgradedAt: serverTimestamp(),
      }, { merge: true })
      setModalOpen(false)
      setPayment(initialPayment)
      setNotice('Success! Your account has been upgraded to the Paid plan.')
      await onPlanChanged?.()
    } catch (err) {
      console.error('Plan upgrade failed:', err)
      setError('Upgrade failed. Check your Firestore rules and try again.')
    } finally {
      setBusy(false)
    }
  }

  function handleUpgradeClick() {
    setNotice('')
    if (!user) {
      setNotice('Please log in or create an account before upgrading.')
      return
    }
    if (plan === 'Paid') {
      setNotice('Your account is already on the Paid plan.')
      return
    }
    setModalOpen(true)
  }

  return (
    <main className="pricing-page">
      <section className="pricing-heading">
        <p className="eyebrow">DEV@DEAKIN MEMBERSHIP</p>
        <h1>Choose a plan that fits your journey.</h1>
        <p>Start free, share your knowledge, and unlock more room to grow when you are ready.</p>
        {user && <p className="current-plan">Signed in as <strong>{user.email}</strong> · Current plan: <strong>{plan}</strong></p>}
      </section>

      {notice && <div className="pricing-notice" role="status">{notice}</div>}

      <section className="pricing-grid" aria-label="Subscription plans">
        <article className={`price-card ${plan === 'Free' ? 'current' : ''}`}>
          <div className="price-card-top"><span className="plan-label">STARTER</span>{plan === 'Free' && user && <span className="current-tag">YOUR PLAN</span>}</div>
          <h2>Free</h2><p className="price">$0 <span>/ forever</span></p>
          <p className="price-description">A welcoming place to learn and contribute.</p>
          <ul>
            <li>Read community questions and articles</li>
            <li>Create up to 5 posts per month</li>
            <li>Upload images up to 2 MB</li>
            <li>Save useful learning resources</li>
            <li>Community support</li>
          </ul>
          <button className="plan-button secondary" type="button" disabled={Boolean(user && plan === 'Free')} onClick={() => user ? setNotice('You are currently using the Free plan.') : setNotice('Create an account or log in to start using DEV@Deakin.')}>{user && plan === 'Free' ? 'Current plan' : 'Get started'}</button>
        </article>

        <article className={`price-card paid-card ${plan === 'Paid' ? 'current' : ''}`}>
          <div className="price-card-top"><span className="plan-label">FOR ACTIVE CREATORS</span><span className="popular-tag">POPULAR</span></div>
          <h2>Paid</h2><p className="price">$9 <span>/ month · demo price</span></p>
          <p className="price-description">More space to share ideas and build your profile.</p>
          <ul>
            <li>Everything in Free</li>
            <li>Unlimited posts per month</li>
            <li>Upload images up to 20 MB</li>
            <li>Paid-member article badge</li>
            <li>Priority community support</li>
          </ul>
          <button className="plan-button primary" type="button" onClick={handleUpgradeClick} disabled={Boolean(user && plan === 'Paid')}>{plan === 'Paid' && user ? 'Already on Paid' : 'Upgrade plan'}</button>
        </article>
      </section>
      <p className="pricing-footnote">Plans are for demonstration purposes for this task. No payment is processed. Do not enter real payment details.</p>

      {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setModalOpen(false) }}>
        <section className="payment-modal" role="dialog" aria-modal="true" aria-labelledby="upgrade-title">
          <button className="modal-close" type="button" aria-label="Close upgrade form" onClick={() => setModalOpen(false)}>×</button>
          <p className="eyebrow">MEMBERSHIP UPGRADE</p>
          <h2 id="upgrade-title">Upgrade to Paid</h2>
          <p className="modal-intro">This is a demo checkout. Use test details only; card information is not stored.</p>
          <form onSubmit={submitUpgrade}>
            <label htmlFor="payment-name">Name on card</label>
            <input id="payment-name" name="name" value={payment.name} onChange={updatePayment} autoComplete="cc-name" required />
            <label htmlFor="payment-card">Card number</label>
            <input id="payment-card" name="cardNumber" inputMode="numeric" value={payment.cardNumber} onChange={updatePayment} placeholder="16 digits" autoComplete="off" required />
            <div className="payment-row"><div><label htmlFor="payment-expiry">Expiry (MM/YY)</label><input id="payment-expiry" name="expiry" value={payment.expiry} onChange={updatePayment} placeholder="08/28" autoComplete="off" required /></div><div><label htmlFor="payment-cvv">CVV</label><input id="payment-cvv" name="cvv" inputMode="numeric" value={payment.cvv} onChange={updatePayment} placeholder="123" autoComplete="off" required /></div></div>
            {error && <p className="payment-error" role="alert">{error}</p>}
            <button className="plan-button primary modal-submit" type="submit" disabled={busy}>{busy ? 'Upgrading…' : 'Confirm demo upgrade'}</button>
          </form>
          <p className="secure-note">Only your plan status is saved to Firestore. Card number, expiry and CVV are never saved.</p>
        </section>
      </div>}
      {!user && <p className="login-nudge"><Link to="/login">Log in</Link> or <Link to="/register">create an account</Link> to manage your subscription.</p>}
    </main>
  )
}

export default Pricing
