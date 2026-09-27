import { memo } from 'react'
import { useSpotlight } from '../hooks/useSpotlight'
import { scrollToId } from '../utils/scroll'
import { IconArrowUpRight } from './icons'

function Visual({ variant }) {
  if (variant === 'website') {
    return (
      <div className="shot shot--website" aria-hidden="true">
        <div className="shot__browser">
          <div className="shot__browser-bar">
            <i />
            <i />
            <i />
            <span />
          </div>
          <div className="shot__browser-body">
            <span className="shot__block shot__block--hero" />
            <div className="shot__cols">
              <span />
              <span />
              <span />
            </div>
            <span className="shot__block shot__block--cta" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'automation') {
    return (
      <div className="shot shot--automation" aria-hidden="true">
        <span className="shot__wire shot__wire--h" />
        <span className="shot__wire shot__wire--v" />
        <span className="shot__chip shot__chip--1">Trigger</span>
        <span className="shot__chip shot__chip--2">AI Agent</span>
        <span className="shot__chip shot__chip--3">Action</span>
        <span className="shot__pulse" />
      </div>
    )
  }

  if (variant === 'seo') {
    return (
      <div className="shot shot--seo" aria-hidden="true">
        <span className="shot__mesh" />
        <div className="shot__bars">
          {[34, 46, 40, 58, 70, 84, 96].map((height, index) => (
            <i key={index} style={{ '--h': `${height}%`, '--i': index }} />
          ))}
        </div>
        <svg className="shot__trend" viewBox="0 0 240 110" preserveAspectRatio="none">
          <path
            pathLength="1"
            d="M4 100C46 96 70 84 96 74s46-6 66-24 44-34 74-40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="shot shot--showcase" aria-hidden="true">
      <span className="shot__plate shot__plate--3" />
      <span className="shot__plate shot__plate--2" />
      <span className="shot__plate shot__plate--1">
        <span className="shot__plate-bar" />
        <span className="shot__plate-bar shot__plate-bar--short" />
        <span className="shot__plate-chip" />
      </span>
      <span className="shot__glow" />
    </div>
  )
}

function WorkCard({ project, onPlaceholder, delay = 0 }) {
  const spotlight = useSpotlight()

  return (
    <article
      className={`work__card work__card--${project.id} glass`}
      data-reveal
      style={{ '--rd': `${delay}ms` }}
      {...spotlight}
    >
      <span className="spotlight" aria-hidden="true" />
      <Visual variant={project.visual} />

      <div className="work__body">
        <p className="work__category mono">{project.category}</p>
        <h3 className="work__title">{project.title}</h3>
        <p className="work__desc">{project.description}</p>

        <div className="work__foot">
          {project.url ? (
            <a className="link-arrow" href={project.url}>
              View Project
              <IconArrowUpRight />
            </a>
          ) : (
            <button type="button" className="link-arrow" onClick={onPlaceholder}>
              View Project
              <IconArrowUpRight />
            </button>
          )}
          <button
            type="button"
            className="link-arrow work__brief"
            onClick={() => scrollToId('contact')}
          >
            Start a similar project
          </button>
        </div>
      </div>
    </article>
  )
}

export default memo(WorkCard)
