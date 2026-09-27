import { useCallback, useEffect, useRef, useState } from 'react'
import { work } from '../data/content'
import WorkCard from './WorkCard'
import '../styles/work.css'

export default function Work() {
  const [notice, setNotice] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const showNotice = useCallback(() => {
    setNotice(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setNotice(false), 2800)
  }, [])

  return (
    <section className="section work" id="work">
      <div className="shell">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal>
              Selected Work
            </p>
            <h2 className="section-title" data-reveal style={{ '--rd': '70ms' }}>
              {work.heading}
            </h2>
          </div>
          <p className="section-lead" data-reveal style={{ '--rd': '150ms' }}>
            {work.lead}
          </p>
        </div>

        <div className="work__grid">
          {work.items.map((project, index) => (
            <WorkCard
              key={project.id}
              project={project}
              delay={(index % 2) * 80}
              onPlaceholder={showNotice}
            />
          ))}
        </div>
      </div>

      <div className={`work__notice${notice ? ' is-visible' : ''}`} role="status" aria-live="polite">
        <span className="mono">Placeholder</span>
        Project details will be published here once the case study is ready.
      </div>
    </section>
  )
}
