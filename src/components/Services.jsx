import { services } from '../data/content'
import ServiceCard from './ServiceCard'
import { IconAutomation, IconWeb, IconSeo, IconGrowth } from './icons'
import '../styles/services.css'

const icons = {
  'ai-automation': IconAutomation,
  'web-development': IconWeb,
  seo: IconSeo,
  'digital-growth': IconGrowth,
}

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="shell">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal>
              Services
            </p>
            <h2 className="section-title" data-reveal style={{ '--rd': '70ms' }}>
              {services.heading}
            </h2>
          </div>
          <p className="section-lead" data-reveal style={{ '--rd': '150ms' }}>
            {services.lead}
          </p>
        </div>

        <div className="services__grid">
          {services.items.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              Icon={icons[service.id]}
              delay={(index % 2) * 90}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
