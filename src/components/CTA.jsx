import { cta } from '../data/content'
import { scrollToId } from '../utils/scroll'
import { useSpotlight } from '../hooks/useSpotlight'
import '../styles/cta.css'

export default function CTA() {
  const spotlight = useSpotlight()

  return (
    <section className="section cta">
      <div className="shell">
        <div className="cta__panel glass glass--level4" data-reveal {...spotlight}>
          <span className="spotlight" aria-hidden="true" />
          <span className="cta__aurora" aria-hidden="true" />
          <span className="cta__ring cta__ring--one" aria-hidden="true" />
          <span className="cta__ring cta__ring--two" aria-hidden="true" />

          <div className="cta__inner">
            <p className="eyebrow">Next step</p>
            <h2 className="cta__title">{cta.heading}</h2>
            <p className="cta__text">{cta.supporting}</p>

            <div className="cta__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => scrollToId('contact')}
              >
                {cta.button}
                <svg
                  className="btn__arrow"
                  width="15"
                  height="15"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 11 11 3M11 3H5M11 3v6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <p className="cta__meta mono">{cta.meta}</p>
          </div>

          <span className="cta__edge mono" aria-hidden="true">
            Eshan Shah — Digital Solutions
          </span>
        </div>
      </div>
    </section>
  )
}
