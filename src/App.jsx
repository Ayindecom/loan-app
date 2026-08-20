import { useState } from 'react'
import './App.css'

const starterPrompts = [
  { icon: '✦', label: 'Help me think through a tough decision' },
  { icon: '↗', label: 'Turn my notes into a clear plan' },
  { icon: '⌁', label: 'Explain something in a simpler way' },
]

const capabilityCards = [
  { number: '01', title: 'Think clearly', text: 'Break down complexity and find the next useful step.' },
  { number: '02', title: 'Create freely', text: 'Shape rough ideas into words, plans, and possibilities.' },
  { number: '03', title: 'Learn continuously', text: 'Stay curious, ask better questions, and keep moving.' },
]

function createReply(message) {
  const normalizedMessage = message.toLowerCase()

  if (normalizedMessage.includes('plan') || normalizedMessage.includes('day') || normalizedMessage.includes('schedule')) {
    return 'Absolutely. Start with one priority, then group the smaller tasks around it. What must be done today, what would be helpful, and what can wait?'
  }
  if (normalizedMessage.includes('decid') || normalizedMessage.includes('choose') || normalizedMessage.includes('tough')) {
    return 'Let’s make the decision easier to see. Name the options, the outcome you care about most, and the biggest risk of each choice. I can help you compare them without rushing.'
  }
  if (normalizedMessage.includes('write') || normalizedMessage.includes('note') || normalizedMessage.includes('email')) {
    return 'I can help shape that into something clear. Share the notes or the main point you want the reader to remember, and I’ll help turn it into a concise draft.'
  }
  if (normalizedMessage.includes('explain') || normalizedMessage.includes('simple') || normalizedMessage.includes('understand')) {
    return 'Of course. Send me the idea, phrase, or topic and I’ll explain it plainly, then give you an example so it feels practical.'
  }
  if (/\b(hi|hello|hey)\b/.test(normalizedMessage)) {
    return 'Hello. I’m ready when you are. We can solve a problem, explore an idea, or simply make something feel clearer.'
  }
  return `I hear you. The best next step is to make the goal more specific: what would a useful outcome look like for “${message}”? I can help you work toward it.`
}

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState([])
  const [isResponding, setIsResponding] = useState(false)

  const submitMessage = (value = message) => {
    const cleanMessage = value.trim()
    if (!cleanMessage) return
    setConversation((current) => [...current, { role: 'user', text: cleanMessage }])
    setMessage('')
    setIsResponding(true)
    window.setTimeout(() => {
      setConversation((current) => [...current, { role: 'ayinde', text: createReply(cleanMessage) }])
      setIsResponding(false)
    }, 450)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="ayinde-mark" aria-hidden="true">A</div>
          <span>AYINDE</span>
        </div>
        <nav className="main-nav" aria-label="Primary navigation">
          {['Home', 'Conversations', 'Explore'].map((tab) => (
            <button key={tab} className={activeTab === tab ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </nav>
        <div className="top-actions">
          <button className="icon-button" aria-label="Search">⌕</button>
          <button className="new-chat" onClick={() => setConversation([])}>New conversation <span>+</span></button>
          <div className="avatar">Y</div>
        </div>
      </header>

      <main className="dashboard">
        <div className="welcome-row">
          <div>
            <p className="overline">{activeTab} <span className="live-dot" /></p>
            <h1>Good morning. What’s on your mind?</h1>
          </div>
          <span className="date-label">Thursday, August 20</span>
        </div>

        <section className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow">Your intelligent companion</span>
            <h2>Bring your thoughts.<br /><em>Leave with clarity.</em></h2>
            <p>AYINDE is here to help you understand, create, and solve — with patience, honesty, and a little spark.</p>
          </div>
          <div className="hero-orbit" aria-hidden="true"><span className="orbit-core">✦</span><i /><i /><i /></div>
        </section>

        <section className="conversation-panel">
          <div className="conversation-heading"><div><p className="overline">Start here</p><h2>A conversation with AYINDE</h2></div><span className="secure-label">● Private by design</span></div>
          {(conversation.length > 0 || isResponding) && <div className="conversation-list">{conversation.map((item, index) => <div className={`message ${item.role}`} key={`${item.role}-${index}`}><span className="message-label">{item.role === 'ayinde' ? 'AYINDE' : 'YOU'}</span><p>{item.text}</p></div>)}{isResponding && <div className="message ayinde responding"><span className="message-label">AYINDE</span><p>Thinking through that<span className="typing-dots">...</span></p></div>}</div>}
          <form className="composer" onSubmit={(event) => { event.preventDefault(); submitMessage() }}>
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask AYINDE anything..." aria-label="Message AYINDE" />
            <button type="submit" aria-label="Send message" disabled={isResponding || !message.trim()}>↑</button>
          </form>
          <div className="starter-row">{starterPrompts.map((prompt) => <button key={prompt.label} onClick={() => submitMessage(prompt.label)}><span>{prompt.icon}</span>{prompt.label}</button>)}</div>
        </section>

        <section className="capability-section"><div className="section-heading"><p className="overline">Built for the whole you</p><h2>More than answers.</h2></div><div className="capability-grid">{capabilityCards.map((card) => <article key={card.number}><span>{card.number}</span><h3>{card.title}</h3><p>{card.text}</p><b>↗</b></article>)}</div></section>
      </main>
      <footer><span>© 2026 AYINDE</span><div><a href="#about">About</a><a href="#privacy">Privacy</a><a href="#contact">Contact</a></div><span className="footer-note">Smart. Reliable. Always ready.</span></footer>
    </div>
  )
}

export default App
