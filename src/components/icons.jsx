const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconAutomation(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <rect x="2.8" y="3" width="7.4" height="7.4" rx="2.4" />
      <rect x="13.8" y="13.6" width="7.4" height="7.4" rx="2.4" />
      <path d="M10.2 6.7h4.4a3 3 0 0 1 3 3v3.9" />
      <path d="M6.5 10.4v4.2a3 3 0 0 0 3 3h4.3" />
      <circle cx="17.6" cy="6.6" r="1.7" />
      <circle cx="6.4" cy="17.6" r="1.7" />
    </svg>
  )
}

export function IconWeb(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <rect x="2.6" y="4.2" width="18.8" height="15.6" rx="3.2" />
      <path d="M2.6 9.2h18.8" />
      <circle cx="6.2" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9.2" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      <path d="m11.4 12.6 5.6 2.3-2.4.9-.9 2.4z" />
    </svg>
  )
}

export function IconSeo(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <circle cx="10.6" cy="10.6" r="6.9" />
      <path d="m15.7 15.7 4.6 4.6" />
      <path d="m7.6 12.6 2.4-2.5 1.9 1.9 3.1-3.4" />
      <path d="M12.6 8.6h2.4V11" />
    </svg>
  )
}

export function IconGrowth(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <path d="M12 3.4 3.6 7.6 12 11.8l8.4-4.2z" />
      <path d="M3.6 12.1 12 16.3l8.4-4.2" />
      <path d="M3.6 16.4 12 20.6l8.4-4.2" />
    </svg>
  )
}

export function IconArrowUpRight(props) {
  return (
    <svg viewBox="0 0 14 14" width="14" height="14" {...base} {...props}>
      <path d="M3.4 10.6 10.6 3.4M10.6 3.4H5.2M10.6 3.4v5.4" />
    </svg>
  )
}
