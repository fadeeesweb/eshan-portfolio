/**
 * Single place to wire up real contact details later.
 * Replace the placeholder values below — nothing else needs to change.
 */
export const contactConfig = {
  email: 'eshaan.eshaan488@gmail.com',
  availability: '24 hours',
  response: 'Within 1–2 business days',
  location: 'Remote · Worldwide',

  /**
   * Form delivery — ON HOLD for now. Set this to a real endpoint
   * (e.g. FormSubmit / Web3Forms) and the form will deliver messages;
   * while it is null the form only validates and says nothing was sent.
   */
  endpoint: null,

  socials: {
    instagram: 'https://www.instagram.com/oye_eshany/',
    discord: 'https://discord.com/users/1540570885881069618',
  },
}

export const isPlaceholder = (value) =>
  !value || value === '#' || value.includes('yourdomain.com')
