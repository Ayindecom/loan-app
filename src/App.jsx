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

function createReply(message, history) {
  const normalizedMessage = message.toLowerCase().trim()
  const words = normalizedMessage.split(/\s+/)
  const calculation = normalizedMessage.match(/(?:what is|calculate)\s*(-?\d+(?:\.\d+)?)\s*([+\-*x×÷/]?)\s*(-?\d+(?:\.\d+)?)/i)
  const definitions = {
    photosynthesis: 'Photosynthesis is how plants use sunlight, water, and carbon dioxide to make food. It releases oxygen as a by-product.',
    'artificial intelligence': 'Artificial intelligence is software that learns patterns from data and uses them to perform tasks such as understanding language, recognizing images, or making predictions.',
    ai: 'AI, or artificial intelligence, is software that learns patterns from data and uses them to perform tasks such as understanding language, recognizing images, or making predictions.',
    algorithm: 'An algorithm is a precise set of steps for solving a problem or completing a task. A recipe is a simple everyday example.',
    api: 'An API is a set of rules that lets one piece of software request data or actions from another piece of software.',
    blockchain: 'A blockchain is a shared digital record that stores transactions in linked groups called blocks. Its design makes past records difficult to change without detection.',
  }

  if (calculation && calculation[2]) {
    const [, first, operator, second] = calculation
    const left = Number(first)
    const right = Number(second)
    const operations = { '+': left + right, '-': left - right, '*': left * right, x: left * right, '×': left * right, '/': right ? left / right : null, '÷': right ? left / right : null }
    const result = operations[operator]
    return result === null ? 'That calculation is undefined because division by zero is not possible.' : `The answer is ${Number.isInteger(result) ? result : result.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')}.`
  }
  if (/\b(hi|hello|hey|good morning|good evening)\b/.test(normalizedMessage)) {
    return 'Hello. I’m AYINDE, and I’m ready to help. Ask me a question, give me a task, or share something you are working through.'
  }
  if (normalizedMessage.includes('who are you') || normalizedMessage.includes('what are you')) {
    return 'I’m AYINDE, an intelligent assistant for thinking, creating, learning, and solving problems. I aim to be useful and honest, so I’ll say when I need more information.'
  }
  if (normalizedMessage.includes('what is ayinde') || normalizedMessage.includes('who is ayinde')) {
    return 'AYINDE is an intelligent, reliable, and creative AI companion designed to make technology easier and more useful. I can help you understand, create, plan, and solve.'
  }
  if (normalizedMessage.includes('plan') || normalizedMessage.includes('day') || normalizedMessage.includes('schedule')) {
    return 'Start with one priority that would make today feel successful. Put it first, then add two smaller tasks, a realistic break, and a clear stopping time. Everything else can wait or move to tomorrow.'
  }
  if (normalizedMessage.includes('decid') || normalizedMessage.includes('choose') || normalizedMessage.includes('tough')) {
    return 'Use this quick filter: which option best serves your main goal, what is the worst realistic downside, and which choice keeps the most doors open? If the options are close, choose the one you can learn from fastest.'
  }
  if (normalizedMessage.includes('write') || normalizedMessage.includes('note') || normalizedMessage.includes('email')) {
    return 'Here is a simple structure: state the purpose in the first sentence, give only the context the reader needs, make the requested action explicit, and close with a warm, specific next step. Share your rough notes and I’ll draft it.'
  }
  if (normalizedMessage.includes('explain') || normalizedMessage.includes('simple') || normalizedMessage.includes('understand') || normalizedMessage.startsWith('what is ')) {
    const subject = message.replace(/^(can you |please )?(explain|what is)\s+/i, '').replace(/[?!.]+$/, '')
    const definition = definitions[subject.toLowerCase()]
    return definition || `I don’t have a reliable definition for “${subject}” yet. Tell me where you encountered it or share the sentence around it, and I’ll explain it accurately instead of guessing.`
  }
  if (normalizedMessage.includes('how do i') || normalizedMessage.includes('how can i') || normalizedMessage.includes('help me')) {
    return 'Break it into the smallest useful next action, do that first, then check the result before adding more complexity. Tell me your goal and what is blocking you, and I’ll give you a practical step-by-step answer.'
  }
  if (normalizedMessage.includes('thank')) {
    return 'You’re welcome. I’m glad that helped. Send the next question whenever you’re ready.'
  }
  if ((words.length <= 3 || normalizedMessage === 'yes' || normalizedMessage === 'no') && history.length > 1) {
    return 'I can take that further. Tell me which part you want to explore, and I’ll keep the answer focused.'
  }
  return `Here’s the direct answer I can give from what you shared: I need a little more context to answer “${message}” reliably. Add the goal, the relevant details, or an example, and I’ll give you a specific answer rather than guess.`
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
      setConversation((current) => [...current, { role: 'ayinde', text: createReply(cleanMessage, current) }])
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
          {(conversation.length > 0 || isResponding) && <div className="conversation-list" aria-live="polite">{conversation.map((item, index) => <div className={`message ${item.role}`} key={`${item.role}-${index}`}><span className="message-label">{item.role === 'ayinde' ? 'AYINDE' : 'YOU'}</span><p>{item.text}</p></div>)}{isResponding && <div className="message ayinde responding"><span className="message-label">AYINDE</span><p>Thinking through that<span className="typing-dots">...</span></p></div>}</div>}
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
