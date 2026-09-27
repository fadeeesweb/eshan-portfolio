import { useSpotlight } from '../hooks/useSpotlight'
import { scrollToId } from '../utils/scroll'
import { IconArrowUpRight } from './icons'

export default function ServiceCard({ service, Icon, delay = 0 }) {
  const spotlight = useSpotlight()

  return (
    <article
      className={`service glass service--${service.id}`}
      data-reveal
      style={{ '--rd': `${delay}ms` }}
      {...spotlight}
    >
      <span className="spotlight" aria-hidden="true" />
      <span className="service__accent" aria-hidden="true" />
      <span className="service__ghost" aria-hidden="true">
        {service.index}
      </span>

      <div className="service__head">
        <span className="service__icon" aria-hidden="true">
          <Icon />
        </span>
      </div>

      <h3 className="service__title">{service.title}</h3>
      <p className="service__desc">{service.description}</p>

      <ul className="service__features">
        {service.features.map((feature, index) => (
          <li key={feature} style={{ '--i': index }}>
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="link-arrow service__link"
        onClick={() => scrollToId('contact')}
      >
        Discuss this service
        <IconArrowUpRight />
      </button>
    </article>
  )
}
