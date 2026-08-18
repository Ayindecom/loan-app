import { useState } from 'react'
import './App.css'

const stats = [
  { value: '$3.2B', label: 'funded to families and small businesses' },
  { value: '4.9/5', label: 'average client satisfaction score' },
  { value: '48 hrs', label: 'average decision time for qualified applicants' },
]

const loanOptions = [
  {
    title: 'Personal Loans',
    rate: 'From 7.49% APR',
    description: 'Flexible financing for home improvements, life events, and major purchases.',
    badge: 'Most popular',
  },
  {
    title: 'Home Equity',
    rate: 'From 5.99% APR',
    description: 'Unlock value in your home with a streamlined refinancing or equity solution.',
    badge: 'Best rates',
  },
  {
    title: 'Business Loans',
    rate: 'From 8.25% APR',
    description: 'Fuel growth, manage inventory, or invest in equipment with capital built for momentum.',
    badge: 'Fast-track',
  },
]

const features = [
  'Same-day pre-qualification',
  'Transparent terms and rates',
  'Dedicated loan advisors',
  'No hidden fees or surprises',
]

const steps = [
  {
    number: '01',
    title: 'Tell us about your goals',
    text: 'Share your loan needs and timeline in a quick, secure application.',
  },
  {
    number: '02',
    title: 'Compare tailored offers',
    text: 'Review loan options built around your credit profile and repayment plan.',
  },
  {
    number: '03',
    title: 'Get funded faster',
    text: 'Move from approval to funding with guided support every step of the way.',
  },
]

const testimonials = [
  {
    quote:
      'The process was transparent, fast, and honestly stress-free. We locked in a better rate and paid off high-interest debt in one move.',
    name: 'Maria T.',
    role: 'Homeowner',
  },
  {
    quote:
      'NorthStar helped us secure working capital before our busy season hit. Their team was proactive, responsive, and genuinely invested in our growth.',
    name: 'Daniel R.',
    role: 'Business owner',
  },
]

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">N</div>
          <div>
            <div className="brand-name">NorthStar Lending</div>
            <div className="brand-tag">Smart financing for real life</div>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#solutions">Solutions</a>
          <a href="#process">How it works</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </nav>

        <button type="button" className="nav-button" onClick={() => setIsFormOpen(true)}>
          Apply now
        </button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Flexible financing you can trust</p>
            <h1>Borrow with confidence and move forward.</h1>
            <p className="subhead">
              Personalized loan solutions for homes, families, and growing businesses—designed to make your next step simpler.
            </p>

            <div className="cta-row">
              <button type="button" className="primary-btn" onClick={() => setIsFormOpen(true)}>
                Check my rate
              </button>
              <a className="secondary-btn" href="#solutions">
                Explore options
              </a>
            </div>

            <div className="trust-row" aria-label="Trust metrics">
              <div>
                <strong>28k+</strong>
                <span>happy clients</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>customer rating</span>
              </div>
            </div>
          </div>

          <div className="hero-card" aria-label="Loan summary card">
            <div className="mini-label">Estimated monthly payment</div>
            <div className="amount-row">
              <span className="currency">$</span>
              <span className="amount">1,245</span>
            </div>
            <div className="loan-slab">
              <span>Borrow</span>
              <strong>$35,000</strong>
            </div>
            <div className="loan-slab">
              <span>Term</span>
              <strong>60 months</strong>
            </div>
            <div className="loan-slab">
              <span>Rate</span>
              <strong>7.49% APR</strong>
            </div>
            <button type="button" className="card-button" onClick={() => setIsFormOpen(true)}>
              Get pre-qualified
            </button>
          </div>
        </section>

        <section className="stats-strip" aria-label="Key company stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="solutions" id="solutions">
          <div className="section-heading">
            <p className="eyebrow">Loan solutions</p>
            <h2>Built around the way you live and grow.</h2>
          </div>

          <div className="loan-grid">
            {loanOptions.map((loan) => (
              <article key={loan.title} className="loan-card">
                <span className="badge">{loan.badge}</span>
                <h3>{loan.title}</h3>
                <p className="rate">{loan.rate}</p>
                <p>{loan.description}</p>
                <button type="button" className="card-link" onClick={() => setIsFormOpen(true)}>
                  Learn more
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-banner">
          <div>
            <p className="eyebrow">Why NorthStar</p>
            <h2>Simple guidance. Better terms. Real support.</h2>
          </div>

          <ul className="feature-list">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="process" id="process">
          <div className="section-heading narrow">
            <p className="eyebrow">How it works</p>
            <h2>Your path to funding in three easy steps.</h2>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.number} className="step-card">
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="reviews" id="reviews">
          <div className="section-heading narrow">
            <p className="eyebrow">Client stories</p>
            <h2>People trust us when it matters most.</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <blockquote key={item.name} className="quote-card">
                <div className="stars" aria-label="5 star review">★★★★★</div>
                <p>“{item.quote}”</p>
                <footer>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="faq" id="faq">
          <div className="section-heading narrow">
            <p className="eyebrow">FAQs</p>
            <h2>Answers to the questions we hear most often.</h2>
          </div>

          <div className="faq-list">
            <div>
              <h3>How fast can I get approved?</h3>
              <p>Most applicants receive a decision within 24 to 48 hours after submitting the required documents.</p>
            </div>
            <div>
              <h3>Do you offer fixed rates?</h3>
              <p>Yes. We offer fixed-rate options on many loan products to keep monthly payments predictable.</p>
            </div>
            <div>
              <h3>Is there a prepayment penalty?</h3>
              <p>No. We do not charge prepayment penalties for most qualifying loan products.</p>
            </div>
          </div>
        </section>

        <section className="cta-panel" id="apply">
          <div>
            <p className="eyebrow">Ready to get started?</p>
            <h2>Find a smarter loan for the next chapter of your life.</h2>
          </div>
          <button type="button" className="primary-btn" onClick={() => setIsFormOpen(true)}>
            Apply today
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <div className="brand-wrap footer-brand">
            <div className="brand-mark">N</div>
            <div>
              <div className="brand-name">NorthStar Lending</div>
            </div>
          </div>
        </div>
        <div className="footer-links">
          <a href="#solutions">Solutions</a>
          <a href="#process">Process</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="footer-meta">© 2026 NorthStar Lending</div>
      </footer>

      {isFormOpen && (
        <div className="modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="eyebrow">Pre-qualify</p>
                <h3>Register for a loan consultation</h3>
              </div>
              <button type="button" className="close-button" onClick={() => setIsFormOpen(false)} aria-label="Close form">
                ×
              </button>
            </div>

            {isSubmitted ? (
              <div className="success-state">
                <h4>Thanks! Your request has been received.</h4>
                <p>A lending advisor will contact you within one business day.</p>
                <button type="button" className="primary-btn" onClick={() => setIsFormOpen(false)}>
                  Close
                </button>
              </div>
            ) : (
              <form className="loan-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <label>
                    Full name
                    <input type="text" placeholder="Jane Doe" required />
                  </label>
                  <label>
                    Email address
                    <input type="email" placeholder="jane@email.com" required />
                  </label>
                  <label>
                    Phone number
                    <input type="tel" placeholder="(555) 123-4567" required />
                  </label>
                  <label>
                    Desired loan amount
                    <input type="number" min="1000" placeholder="25000" required />
                  </label>
                  <label className="full-width">
                    Loan type
                    <select defaultValue="">
                      <option value="" disabled>
                        Select a loan option
                      </option>
                      <option value="personal">Personal Loan</option>
                      <option value="home-equity">Home Equity</option>
                      <option value="business">Business Loan</option>
                    </select>
                  </label>
                  <label className="full-width">
                    Tell us about your goals
                    <textarea rows="4" placeholder="I need funding for..." />
                  </label>
                </div>

                <div className="form-actions">
                  <button type="button" className="secondary-btn" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="primary-btn">
                    Register now
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
