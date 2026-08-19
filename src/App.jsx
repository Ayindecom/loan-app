import { useState } from 'react'
import './App.css'

const activity = [
  { merchant: 'Stone & Pine Market', date: 'Today, 10:42 AM', amount: '-$184.62', type: 'card', color: 'coral' },
  { merchant: 'Direct deposit · Acme Inc.', date: 'Aug 15, 2026', amount: '+$12,450.00', type: 'deposit', color: 'mint' },
  { merchant: 'Horizon Air 382', date: 'Aug 14, 2026', amount: '-$624.18', type: 'travel', color: 'gold' },
  { merchant: 'Oak Street Properties', date: 'Aug 12, 2026', amount: '-$3,250.00', type: 'home', color: 'blue' },
]

const quickActions = [
  { icon: '↗', label: 'Transfer money' },
  { icon: '⌁', label: 'Pay bills' },
  { icon: '+', label: 'Deposit check' },
  { icon: '▣', label: 'View statements' },
]

function App() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [showNotice, setShowNotice] = useState(false)

  const handleAction = (label) => {
    setShowNotice(`${label} is ready when you are.`)
    window.setTimeout(() => setShowNotice(false), 2800)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="chase-mark" aria-hidden="true"><span /><span /><span /><span /></div>
          <span>Chase</span>
        </div>
        <nav className="main-nav" aria-label="Primary navigation">
          {['Overview', 'Pay & transfer', 'Plan & learn'].map((tab) => (
            <button key={tab} className={activeTab === tab ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </nav>
        <div className="top-actions">
          <button className="icon-button" aria-label="Search">⌕</button>
          <button className="icon-button" aria-label="Notifications">♧<i /></button>
          <div className="avatar">DR</div>
        </div>
      </header>

      <main className="dashboard">
        <div className="welcome-row">
          <div>
            <p className="overline">{activeTab}</p>
            <h1>Good morning, Donnie Reynold</h1>
          </div>
          <button className="help-link" onClick={() => handleAction('Your secure message center')}>Need help? <span>→</span></button>
        </div>

        <section className="balance-hero">
          <div className="balance-copy">
            <div className="account-label"><span className="status-dot" /> Premier Checking <span className="account-number">•••• 4821</span></div>
            <p className="balance-label">Available balance</p>
            <div className="balance">$2,000,000<span>.00</span></div>
            <p className="balance-note">Updated just now <span>•</span> Primary account</p>
            <button className="balance-action" onClick={() => handleAction('Account details')}>Account details <span>→</span></button>
          </div>
          <div className="balance-art" aria-hidden="true">
            <div className="ring ring-one" /><div className="ring ring-two" /><div className="art-line" />
            <span className="art-caption">Your money,<br />moving forward.</span>
          </div>
        </section>

        <section className="quick-actions" aria-label="Quick actions">
          {quickActions.map((action) => <button key={action.label} onClick={() => handleAction(action.label)}><span className="action-icon">{action.icon}</span><span>{action.label}</span><b>→</b></button>)}
        </section>

        <div className="content-grid">
          <section className="panel activity-panel">
            <div className="panel-heading"><div><p className="overline">Your money</p><h2>Recent activity</h2></div><button className="text-button" onClick={() => handleAction('All transactions')}>See all <span>→</span></button></div>
            <div className="activity-list">
              {activity.map((item) => <div className="activity-row" key={item.merchant}><div className={`activity-icon ${item.color}`}>{item.type === 'deposit' ? '↓' : item.type === 'travel' ? '✈' : item.type === 'home' ? '⌂' : '◈'}</div><div className="activity-info"><strong>{item.merchant}</strong><span>{item.date}</span></div><strong className={item.amount.startsWith('+') ? 'positive activity-amount' : 'activity-amount'}>{item.amount}</strong></div>)}
            </div>
          </section>

          <aside className="side-column">
            <section className="panel snapshot-panel"><div className="panel-heading"><div><p className="overline">At a glance</p><h2>Money snapshot</h2></div><span className="more">•••</span></div><div className="snapshot-item"><span>Monthly spending</span><strong>$8,426.18</strong><div className="progress"><i /></div><small>18% less than last month</small></div><div className="snapshot-item"><span>Net worth</span><strong>$2,486,920.00</strong><small className="positive">↑ 6.4% this year</small></div></section>
            <section className="panel insight-panel"><div className="insight-icon">✦</div><p className="overline">A little insight</p><h3>Your cash is working hard.</h3><p>Move extra cash into a Chase investment account and keep your goals in motion.</p><button onClick={() => handleAction('Investment options')}>Explore investing <span>→</span></button></section>
          </aside>
        </div>

        <section className="security-banner"><div className="shield">✓</div><div><strong>You’re in control of your security</strong><span>Last sign-in: Today at 9:18 AM from Chrome on Windows</span></div><button onClick={() => handleAction('Security center')}>Security center <span>→</span></button></section>
      </main>
      <footer><span>© 2026 JPMorgan Chase Bank, N.A.</span><div><a href="#privacy">Privacy</a><a href="#security">Security</a><a href="#contact">Contact us</a></div><span className="fdic">Member FDIC <b>Equal Housing Lender</b></span></footer>
      {showNotice && <div className="toast" role="status">{showNotice}<button onClick={() => setShowNotice(false)}>×</button></div>}
    </div>
  )
}

export default App
