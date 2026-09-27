import { useState } from 'react'
import { contact } from '../data/content'
import { contactConfig, isPlaceholder } from '../config/contact'
import { useSpotlight } from '../hooks/useSpotlight'
import '../styles/contact.css'

const EMPTY = { name: '', email: '', projectType: '', message: '' }

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please add your name.'
  if (!values.email.trim()) errors.email = 'Please add your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'That email address does not look right.'
  if (!values.projectType) errors.projectType = 'Choose the closest project type.'
  if (values.message.trim().length < 12)
    errors.message = 'Share a little more detail — a sentence is enough.'

  return errors
}

function Field({ id, label, error, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default function Contact() {
  const spotlight = useSpotlight()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const update = (key) => (event) => {
    setValues((current) => ({ ...current, [key]: event.target.value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    if (status !== 'idle') setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    if (!contactConfig.endpoint) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(contactConfig.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('sent')
      setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const details = {
    email: contactConfig.email,
    availability: contactConfig.availability,
    response: contactConfig.response,
    location: contactConfig.location,
  }

  return (
    <section className="section contact" id="contact">
      <div className="shell contact__grid">
        <div className="contact__intro">
          <p className="eyebrow" data-reveal>
            Contact
          </p>
          <h2 className="section-title contact__title" data-reveal style={{ '--rd': '70ms' }}>
            {contact.heading}
          </h2>
          <p className="section-lead contact__lead" data-reveal style={{ '--rd': '140ms' }}>
            {contact.lead}
          </p>

          <dl className="contact__details" data-reveal style={{ '--rd': '210ms' }}>
            {contact.details.map((detail) => (
              <div className="contact__detail" key={detail.key}>
                <dt className="mono">{detail.label}</dt>
                <dd>
                  {detail.key === 'email' && !isPlaceholder(details.email) ? (
                    <a className="link-underline" href={`mailto:${details.email}`}>
                      {details.email}
                    </a>
                  ) : (
                    <span className="contact__value">
                      {details[detail.key]}
                      {detail.key === 'email' && isPlaceholder(details.email) ? (
                        <span className="contact__tag mono">placeholder</span>
                      ) : null}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <form className="contact__form glass" onSubmit={handleSubmit} noValidate data-reveal {...spotlight}>
          <span className="spotlight" aria-hidden="true" />

          <div className="contact__form-inner">
            <div className="contact__form-head">
              <span className="mono">Project enquiry</span>
              <span className="mono contact__form-note">All fields required</span>
            </div>

            <Field id="name" label="Name" error={errors.name}>
              <input
                className="field__input"
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={values.name}
                onChange={update('name')}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
            </Field>

            <Field id="email" label="Email" error={errors.email}>
              <input
                className="field__input"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={values.email}
                onChange={update('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </Field>

            <Field id="projectType" label="Project Type" error={errors.projectType}>
              <select
                className="field__input field__select"
                id="projectType"
                name="projectType"
                value={values.projectType}
                onChange={update('projectType')}
                aria-invalid={Boolean(errors.projectType)}
                aria-describedby={errors.projectType ? 'projectType-error' : undefined}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {contact.projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="message" label="Message" error={errors.message}>
              <textarea
                className="field__input field__textarea"
                id="message"
                name="message"
                rows="5"
                placeholder="What are you trying to build, fix or grow?"
                value={values.message}
                onChange={update('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
            </Field>

            <div className="contact__submit">
              <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
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
              <p className="contact__aside mono">No spam · Direct reply</p>
            </div>

            {status !== 'idle' && status !== 'sending' ? (
              <p className={`contact__status contact__status--${status}`} role="status">
                {status === 'unconfigured'
                  ? 'Form validated — nothing was sent yet. Connect a backend endpoint in src/config/contact.js and this form will deliver messages.'
                  : status === 'sent'
                    ? 'Thanks — your message has been sent. I will get back to you shortly.'
                    : 'Something went wrong sending your message. Please try again or use the email address listed here.'}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  )
}
