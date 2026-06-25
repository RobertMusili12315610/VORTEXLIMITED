import React, { useEffect, useRef, useState } from 'react'

export default function App() {
  const formRef = useRef(null)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')

  const headerRef = useRef(null)
  let lastScrollTop = 0

  useEffect(() => {
    const header = document.querySelector('.NavBar__Header')
    if (!header) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.top = '-100px'
      } else {
        header.style.top = '0'
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (window.ScrollReveal) {
      const sr = window.ScrollReveal({ origin: 'top', distance: '80px', duration: 2000, reset: true })
      sr.reveal('.Home__Title', { delay: 200 })
      sr.reveal('.Home__Button__Contact', { delay: 200 })
      sr.reveal('.Home__img', { delay: 400 })
      sr.reveal('.About__Image', { delay: 200 })
      sr.reveal('.About__Subtitle', { delay: 400 })
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const handleDocumentClick = (event) => {
      const target = event.target
      const isClickOnMenu = menuRef.current && menuRef.current.contains(target)
      const isClickOnToggle = toggleRef.current && toggleRef.current.contains(target)
      
      if (!isClickOnMenu && !isClickOnToggle) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)
    
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [menuOpen])

  function handleNavClick(section) {
    setActive(section)
    setMenuOpen(false)
    const el = document.getElementById(section)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = formRef.current
    if (!form) return
    const data = new FormData(form)
    const button = form.querySelector('button')
    if (button) {
      button.disabled = true
      button.innerText = 'Sending...'
    }
    try {
      const res = await fetch('https://formspree.io/f/mbdpqkao', { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (res.ok) {
        showMessage('Message sent successfully.')
        form.reset()
      } else {
        showMessage('Something went wrong.', true)
      }
    } catch (err) {
      showMessage('Network error.', true)
    }
    if (button) {
      button.disabled = false
      button.innerText = 'SEND'
    }
  }

  function showMessage(msg, isError = false) {
    const existing = document.getElementById('form-status-floating')
    if (existing) existing.remove()
    const status = document.createElement('div')
    status.id = 'form-status-floating'
    if (isError) status.classList.add('error')
    status.innerText = msg
    const wrapper = formRef.current.querySelector('.TextareaWrapper')
    wrapper.appendChild(status)
    requestAnimationFrame(() => {
      status.style.opacity = 1
      status.style.transform = 'translateX(-50%) translateY(0)'
    })
    setTimeout(() => {
      status.style.opacity = 0
      status.style.transform = 'translateX(-50%) translateY(-20px)'
      setTimeout(() => status.remove(), 300)
    }, 3000)
  }

  return (
    <div>
      <header className="NavBar__Header">
        <nav className="Nav Grid">
          <div>
            <a href="#" className="NavBar__Logo">VORTEX LIMITED</a>
          </div>

          <div className={`NavBar__Menu ${menuOpen ? 'Show' : ''}`} id="NavBar__Menu" ref={menuRef}>
            <ul className="NavBar__List">
              {['Home', 'About', 'Skills', 'Work', 'Contact'].map((s) => (
                <li className="NavBar__Item" key={s}>
                  <a
                    className={`NavBar__Link ${active === s ? 'Active' : ''}`}
                    onClick={(ev) => { ev.preventDefault(); handleNavClick(s) }}
                    href={`#${s}`}
                  >{s.toUpperCase()}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="NavBar__Toggle Show" id="NavBar__Toggle" ref={toggleRef} onClick={() => setMenuOpen((v) => !v)}>
            <i className="bx bx-menu"></i>
          </div>
        </nav>
      </header>

      {/* Backdrop removed - using document click listener instead */}

      <main>
        <section className="Home Grid" id="Home">
          <div className="Home__Data">
            <h1 className="Home__Title">
              Hi,
              <br />
              Welcome to
              <span className="home__Title__color"> VORTEX LIMITED </span>
              <br />
              We build
              <br />
              FULL-STACK WEBSITES.
            </h1>
            <a href="#Contact" className="Home__Button__Contact">CONTACT</a>
          </div>
          <div className="Home__img">
            <img src="/images/perfil2.png" alt="" />
          </div>
        </section>

        <section className="About Section" id="About">
          <h2 className="Section__Title">ABOUT</h2>
          <div className="About__Container Grid">
            <div className="About__Image">
              <img src="/images/perfil2.png" alt="" />
            </div>
            <div>
              <h2 className="About__SubTitle"> VORTEX LIMITED </h2>
              <p className="About__Text">A full stack web development company built on a builder’s mindset and a security first instinct. The focus is close to the core of the web engineering solutions with HTML, CSS, JavaScript, and PHP because fundamentals are not optional. They are the foundation of everything that works.</p>
            </div>
          </div>
        </section>

        <section className="Work Section" id="Work">
          <h2 className="Section__Title">OUR WORK</h2>
          <p style={{ textAlign: 'center', fontSize: '1rem', color: '#ffffff', maxWidth: '700px', margin: '0 auto 3rem auto' }}>Websites we've crafted for our clients; modern, responsive, and built to perform.</p>
          <div className="Work__Container Grid">
            <a href="https://kamaudoreen.vercel.app/" target="_blank" rel="noopener" className="work-card">
              <img src="/images/work1.png" alt="Project 1" />
              <span className="card-title">PORTFOLIO</span>
              <span className="scroll-text">CLICK THIS CARD TO VIEW THE PORTFOLIO</span>
            </a>
            <a href="https://afiyabora.wuaze.com/" target="_blank" rel="noopener" className="work-card">
              <img src="/images/work7.png" alt="Project 2" />
              <span className="card-title">HOSPITAL MANAGEMENT SYSTEM</span>
              <span className="scroll-text">CLICK THIS CARD TO VIEW THE HOSPITAL MANAGEMENT SYSTEM</span>
            </a>
          </div>
        </section>

        <section className="Contact Section" id="Contact">
          <h2 className="Section__Title">CONTACT</h2>
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem auto', color: '#ffffff' }}>Have a project in mind or a question ? Fill out the form below and we'll get back to you promptly.</p>
          <div className="Contact__Container Grid">
            <form id="contact-form" className="Contact__Form" ref={formRef} onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Full Name" className="Contact__Input" required />
              <input type="tel" name="phone" placeholder="Your Phone Number" className="Contact__Input" />
              <input type="email" name="email" placeholder="Your Email" className="Contact__Input" required />
              <div className="TextareaWrapper" style={{ position: 'relative' }}>
                <textarea name="message" rows="10" className="Contact__Input" placeholder="Your Message..." required></textarea>
              </div>
              <button type="submit" className="Contact__Button Button">SEND</button>
            </form>
          </div>
        </section>

        <section className="Skills Section" id="Skills" style={{ padding: '4rem 2rem', background: 'transparent', color: '#e6eefc' }}>
          <h2 className="Section__Title" style={{ textAlign: 'center', marginBottom: '2rem', textTransform: 'uppercase', fontSize: '2.5rem' }}>STACK</h2>
          <h2 className="Skills__Subtitle" style={{ textAlign: 'center', marginBottom: '4rem', textTransform: 'uppercase', fontSize: '1.8rem' }}>ENGINEERING CAPABILITIES</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto', marginBottom: '3rem' }}>
            <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(96, 165, 250, 0.3)', backdropFilter: 'blur(8px)' }}>
              <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>SEMANTIC HTML ARCHITECTURE</h3>
              <p style={{ color: '#e6eefc', fontSize: '0.95rem', lineHeight: '1.6' }}>Clean, structured markup built for accessibility, SEO, and maintainability.</p>
              <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', color: '#60a5fa', fontWeight: 600 }}>CORE</span>
            </div>

            <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(96, 165, 250, 0.3)', backdropFilter: 'blur(8px)' }}>
              <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>STRUCTURED CSS & RESPONSIVE DESIGN</h3>
              <p style={{ color: '#e6eefc', fontSize: '0.95rem', lineHeight: '1.6' }}>Layout systems engineered for responsiveness across all devices.</p>
              <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', color: '#60a5fa', fontWeight: 600 }}>CORE</span>
            </div>

            <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(96, 165, 250, 0.3)', backdropFilter: 'blur(8px)' }}>
              <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>JAVASCRIPT & REACT INTERACTIVITY</h3>
              <p style={{ color: '#e6eefc', fontSize: '0.95rem', lineHeight: '1.6' }}>Modern technologies like React for dynamic behavior, async processes, and real-time interaction handling.</p>
              <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', color: '#3b82f6', fontWeight: 600 }}>ADVANCED</span>
            </div>

            <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(96, 165, 250, 0.3)', backdropFilter: 'blur(8px)' }}>
              <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>BACKEND SYSTEMS (PHP)</h3>
              <p style={{ color: '#e6eefc', fontSize: '0.95rem', lineHeight: '1.6' }}>Server-side logic, API development, and stable data-driven systems.</p>
              <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', color: '#3b82f6', fontWeight: 600 }}>ADVANCED</span>
            </div>

            <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(96, 165, 250, 0.3)', backdropFilter: 'blur(8px)' }}>
              <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>UI/UX SYSTEMS DESIGN</h3>
              <p style={{ color: '#e6eefc', fontSize: '0.95rem', lineHeight: '1.6' }}>Interfaces built for clarity, usability, and consistent user experience.</p>
              <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', color: '#3b82f6', fontWeight: 600 }}>INTEGRATED</span>
            </div>
          </div>

          <div style={{ maxWidth: '300px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
            <img src="/images/work3.jpg" alt="Vortex Limited Engineering" style={{ width: '100%', borderRadius: '1rem', boxShadow: '0 8px 30px rgba(3,10,34,0.6)' }} />
          </div>
        </section>

        <footer className="Footers">
          <p className="Footer__Title">OUR SOCIAL MEDIA</p>
          <div className="Footer__Social">
            <a href="https://www.tiktok.com/@vortexl1mited" className="Footer__Icon"><i className="bx bxl-tiktok"></i></a>
            <a href="https://twitter.com/VORTEXL1MITED" className="Footer__Icon"><i className="bx bxl-twitter"></i></a>
          </div>
          <p>© 2026 COPYRIGHT ALL RIGHT RESERVED</p>
        </footer>
      </main>
    </div>
  )
}
