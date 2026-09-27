import { footer, profile } from '../data/content'
import { contactConfig, isPlaceholder } from '../config/contact'
import { scrollToId } from '../utils/scroll'
import '../styles/footer.css'

export default function Footer() {
  const goTo = (id) => (event) => {
    event.preventDefault()
    scrollToId(id)
  }

  const socials = footer.socials.map((social) => ({
    ...social,
    url: contactConfig.socials[social.key],
  }))

  const handleSocial = (event, url) => {
    if (isPlaceholder(url)) {
      event.preventDefault()
      return
    }
    if (url.startsWith('/')) {
      event.preventDefault()
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__name">{profile.name}</p>
            <p className="footer__role">{profile.role}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {footer.links.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="footer__link" onClick={goTo(link.id)}>
                {link.label}
              </a>
            ))}
          </nav>

          <ul className="footer__socials">
            {socials.map((social) => (
              <li key={social.key}>
                <a
                  className="footer__social"
                  href={social.url}
                  onClick={(event) => handleSocial(event, social.url)}
                  aria-disabled={isPlaceholder(social.url) || undefined}
                  title={
                    isPlaceholder(social.url)
                      ? 'Add your profile URL in src/config/contact.js'
                      : undefined
                  }
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">{footer.copyright}</p>
          <button type="button" className="footer__top-btn" onClick={() => scrollToId('home')}>
            Back to top
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M7 11.5v-9M3.4 6 7 2.4 10.6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
