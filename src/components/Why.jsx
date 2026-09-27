import { why } from '../data/content'
import '../styles/why.css'

export default function Why() {
  return (
    <section className="section why" id="why">
      <div className="shell">
        <div className="why__head">
          <div className="why__head-main">
            <p className="eyebrow" data-reveal>
              Why work with me
            </p>
            <h2 className="section-title why__title" data-reveal style={{ '--rd': '70ms' }}>
              {why.heading}
            </h2>
          </div>
          <p className="section-lead why__lead" data-reveal style={{ '--rd': '150ms' }}>
            {why.lead}
          </p>
        </div>

        <ol className="why__list">
          {why.points.map((point, index) => (
            <li className="why__row" key={point.index} data-reveal style={{ '--rd': `${index * 80}ms` }}>
              <span className="why__index mono">{point.index}</span>
              <h3 className="why__point-title">{point.title}</h3>
              <p className="why__point-desc">{point.description}</p>
              <span className="why__rule" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
