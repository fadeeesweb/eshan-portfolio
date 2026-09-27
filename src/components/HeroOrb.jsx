import '../styles/hero-orb.css'

export default function HeroOrb({ labels }) {
  return (
    <div className="orb" aria-hidden="true">
      <div className="orb__halo" />

      <svg className="orb__rings" viewBox="0 0 480 480" fill="none">
        <circle
          className="orb__ring orb__ring--one"
          cx="240"
          cy="240"
          r="222"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
          strokeDasharray="3 10"
        />
        <circle
          className="orb__ring orb__ring--two"
          cx="240"
          cy="240"
          r="188"
          stroke="rgba(120,160,255,0.32)"
          strokeWidth="1"
          strokeDasharray="52 210"
          strokeLinecap="round"
        />
        <ellipse
          className="orb__ring orb__ring--tilt"
          cx="240"
          cy="240"
          rx="234"
          ry="96"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
      </svg>

      <div className="orb__stage">
        <div className="orb__sphere">
          <img className="orb__photo" src={`${import.meta.env.BASE_URL}portrait.jpg`} alt="" />
          <div className="orb__shade" />
          <div className="orb__latitudes" />
          <div className="orb__meridians" />
          <div className="orb__sweep" />
          <div className="orb__sheen" />
          <div className="orb__rim" />
        </div>

        <span className="orb__node orb__node--1" />
        <span className="orb__node orb__node--2" />
        <span className="orb__node orb__node--3" />
      </div>

      <span className="orb__tag orb__tag--1">{labels[0]}</span>
      <span className="orb__tag orb__tag--2">{labels[1]}</span>
      <span className="orb__tag orb__tag--3">{labels[2]}</span>
      <span className="orb__tag orb__tag--4">{labels[3]}</span>

      <div className="orb__ticker mono">
        <span>automate</span>
        <i />
        <span>build</span>
        <i />
        <span>rank</span>
      </div>
    </div>
  )
}
