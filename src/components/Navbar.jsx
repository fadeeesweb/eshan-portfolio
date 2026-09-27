import { useEffect, useRef, useState } from 'react'
import { nav, profile } from '../data/content'
import '../styles/navbar.css'

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Navbar() {
  const headerRef = useRef(null)
  const scrolledRef = useRef(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    let frame = 0

    const apply = () => {
      frame = 0
      const next = window.scrollY > 24
      if (next !== scrolledRef.current) {
        scrolledRef.current = next
        if (headerRef.current) headerRef.current.classList.toggle('is-scrolled', next)
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const sections = nav
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const id = entry.target.id
          setActive((current) => (current === id ? current : id))
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('nav-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const navigate = (id) => (event) => {
    event.preventDefault()
    setOpen(false)
    const target = document.getElementById(id)
    if (!target) return
    target.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
    setActive(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <header ref={headerRef} className={`nav${open ? ' is-open' : ''}`}>
      <div className="nav__inner glass glass--level4">
        <a className="nav__brand" href="#home" onClick={navigate('home')}>
          <span className="nav__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path
                d="M4 17.5 12 4l8 13.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M7.6 13.4h8.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__link${active === item.id ? ' is-active' : ''}`}
              aria-current={active === item.id ? 'page' : undefined}
              onClick={navigate(item.id)}
            >
              {item.label}
              <span className="nav__indicator" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            className="btn btn--primary btn--sm nav__cta"
            href="#contact"
            onClick={navigate('contact')}
          >
            Let&apos;s Talk
            <svg className="btn__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11 11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <button
            className={`nav__burger${open ? ' is-open' : ''}`}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav__menu" id="mobile-menu">
        <nav className="nav__menu-links" aria-label="Mobile">
          {nav.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__menu-link${active === item.id ? ' is-active' : ''}`}
              style={{ '--i': index }}
              onClick={navigate(item.id)}
            >
              <span className="mono">0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav__menu-foot">
          <span className="pill">
            <span className="pill__dot" />
            Available for selected projects
          </span>
          <a className="btn btn--primary" href="#contact" onClick={navigate('contact')}>
            Let&apos;s Work Together
          </a>
        </div>
      </div>
    </header>
  )
}
