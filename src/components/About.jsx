import { about } from '../data/content'
import { useSpotlight } from '../hooks/useSpotlight'
import '../styles/about.css'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M3 7h8M7.6 3.4 11.2 7l-3.6 3.6"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function About() {
  const spotlight = useSpotlight()
  const [intro, ...rest] = about.paragraphs
  const quote = rest[rest.length - 1]
  const body = rest.slice(0, -1)

  return (
    <section className="section about" id="about">
      <div className="shell">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal>
              About
            </p>
            <h2 className="section-title" data-reveal style={{ '--rd': '70ms' }}>
              {about.heading}
            </h2>
          </div>
          <p className="section-lead" data-reveal style={{ '--rd': '150ms' }}>
            A practical partner for the parts of your digital presence that keep getting in the way.
          </p>
        </div>

        <div className="about__grid">
          <div className="about__text">
            <p className="about__lead" data-reveal>
              {intro}
            </p>
            {body.map((paragraph, index) => (
              <p className="about__para" data-reveal key={paragraph} style={{ '--rd': `${index * 70}ms` }}>
                {paragraph}
              </p>
            ))}
            <blockquote className="about__quote" data-reveal>
              {quote}
            </blockquote>
          </div>

          <aside
            className="about__panel glass"
            data-reveal
            style={{ '--rd': '120ms' }}
            {...spotlight}
          >
            <span className="spotlight" aria-hidden="true" />
            <div className="about__panel-inner">
              <div className="about__panel-head">
                <span className="mono about__panel-label">Focus</span>
                <h3 className="about__panel-title">{about.panelTitle}</h3>
              </div>

              <ul className="about__list">
                {about.panelItems.map((item) => (
                  <li className="about__item" key={item.index}>
                    <span className="about__index mono">{item.index}</span>
                    <div className="about__item-body">
                      <p className="about__item-title">{item.title}</p>
                      <p className="about__item-note">{item.note}</p>
                    </div>
                    <span className="about__item-arrow" aria-hidden="true">
                      <Arrow />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
