/**
 * Single place to wire up real contact details later.
 * Replace the placeholder values below — nothing else needs to change.
 */
export const contactConfig = {
  email: 'eshaan.eshaan488@gmail.com',
  availability: '24 hours',
  response: 'Within 1–2 business days',
  location: 'Remote · Worldwide',

  /** Optional: POST endpoint for the contact form (Formspree, API route, etc.). */
  endpoint: null,

  socials: {
    instagram: 'https://www.instagram.com/oye_eshany/',
    discord: 'https://discord.com/users/1540570885881069618',
  },
}

export const isPlaceholder = (value) =>
  !value || value === '#' || value.includes('yourdomain.com')
