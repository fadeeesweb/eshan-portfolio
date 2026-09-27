/**
 * Single place to wire up real contact details later.
 * Replace the placeholder values below — nothing else needs to change.
 */
export const contactConfig = {
  email: 'hello@yourdomain.com',
  availability: 'Available for selected projects',
  response: 'Within 1–2 business days',
  location: 'Remote · Worldwide',

  /** Optional: POST endpoint for the contact form (Formspree, API route, etc.). */
  endpoint: null,

  socials: {
    linkedin: '#',
    instagram: '#',
    x: '#',
    emailLink: '#',
  },
}

export const isPlaceholder = (value) =>
  !value || value === '#' || value.includes('yourdomain.com')
