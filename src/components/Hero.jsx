import { useEffect, useRef } from 'react'
import { hero, profile } from '../data/content'
import { scrollToId } from '../utils/scroll'
import { useFinePointer } from '../hooks/useMediaQuery'
import HeroOrb from './HeroOrb'
import '../styles/hero.css'

const Arrow = () => (
  <svg className="btn__arrow" width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M3 11 11 3M11 3H5M11 3v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Hero() {
  const sectionRef = useRef(null)
  const frameRef = useRef(0)
  const pointerRef = useRef(null)
  const lastRef = useRef({ x: 0, y: 0 })
  const finePointer = useFinePointer()

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  const flushParallax = () => {
    frameRef.current = 0
    const node = sectionRef.current
    const point = pointerRef.current
    if (!node || !point) return

    const rect = node.getBoundingClientRect()
    const x = ((point.x - rect.left) / rect.width) * 2 - 1
    const y = ((point.y - rect.top) / rect.height) * 2 - 1

    if (Math.abs(x - lastRef.current.x) < 0.02 && Math.abs(y - lastRef.current.y) < 0.02) return
    lastRef.current = { x, y }

    node.style.setProperty('--px', x.toFixed(3))
    node.style.setProperty('--py', y.toFixed(3))
  }

  const onPointerMove = (event) => {
    if (!finePointer || event.pointerType === 'touch') return
    pointerRef.current = { x: event.clientX, y: event.clientY }
    if (!frameRef.current) frameRef.current = requestAnimationFrame(flushParallax)
  }

  const onPointerLeave = () => {
    pointerRef.current = null
    const node = sectionRef.current
    if (!node) return
    node.style.setProperty('--px', '0')
    node.style.setProperty('--py', '0')
  }

  return (
    <section
      ref={sectionRef}
      className="hero"
      id="home"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="shell hero__grid">
        <div className="hero__content">
          <p className="hero__eyebrow" style={{ '--d': '0.2s' }}>
            {hero.eyebrow.map((item, index) => (
              <span key={item} className="hero__eyebrow-item">
                {index > 0 && <i aria-hidden="true">·</i>}
                {item}
              </span>
            ))}
          </p>

          <h1 className="hero__title">
            <span className="hero__line" style={{ '--d': '0.34s' }}>
              <span className="hero__line-inner">{hero.headlineTop}</span>
            </span>
            <span className="hero__line" style={{ '--d': '0.46s' }}>
              <span className="hero__line-inner hero__line-inner--accent">
                {hero.headlineBottom}
              </span>
            </span>
          </h1>

          <p className="hero__sub" style={{ '--d': '0.62s' }}>
            {hero.subheading}
          </p>

          <p className="hero__tagline" style={{ '--d': '0.72s' }}>
            {profile.tagline}
          </p>

          <div className="hero__actions" style={{ '--d': '0.84s' }}>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => scrollToId('contact')}
            >
              {hero.primaryCta}
              <Arrow />
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => scrollToId('services')}
            >
              {hero.secondaryCta}
              <svg className="btn__arrow" width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M7 2.5v9M3.2 7.8 7 11.5l3.8-3.7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="hero__status" style={{ '--d': '0.96s' }}>
            <span className="pill">
              <span className="pill__dot" />
              {hero.availability}
            </span>
            <span className="hero__scroll mono" aria-hidden="true">
              Scroll
              <span className="hero__scroll-track">
                <span className="hero__scroll-thumb" />
              </span>
            </span>
          </div>
        </div>

        <div className="hero__visual" style={{ '--d': '0.55s' }}>
          <HeroOrb labels={hero.orbLabels} />
        </div>
      </div>

      <div className="hero__rule" aria-hidden="true">
        <span className="mono">01 — Introduction</span>
        <span className="hero__rule-line" />
        <span className="mono">AI · Automation · Web · SEO</span>
      </div>
    </section>
  )
}
