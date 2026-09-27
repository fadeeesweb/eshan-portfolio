import { useRef } from 'react'
import { process } from '../data/content'
import { useScrollProgress } from '../hooks/useScrollProgress'
import '../styles/process.css'

export default function Process() {
  const trackRef = useRef(null)
  useScrollProgress(trackRef)

  return (
    <section className="section process" id="process">
      <div className="shell">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal>
              Process
            </p>
            <h2 className="section-title" data-reveal style={{ '--rd': '70ms' }}>
              {process.heading}
            </h2>
          </div>
          <p className="section-lead" data-reveal style={{ '--rd': '150ms' }}>
            {process.lead}
          </p>
        </div>

        <div className="process__track" ref={trackRef}>
          <div className="process__line" aria-hidden="true">
            <span className="process__line-base" />
            <span className="process__line-fill" />
            <span className="process__line-head" />
          </div>

          <ol className="process__steps">
            {process.steps.map((step, index) => (
              <li
                key={step.index}
                className="process__step"
                data-reveal
                style={{ '--rd': `${index * 90}ms` }}
              >
                <span className="process__dot" aria-hidden="true" />
                <span className="process__index mono">{step.index}</span>
                <h3 className="process__title">{step.title}</h3>
                <p className="process__desc">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
