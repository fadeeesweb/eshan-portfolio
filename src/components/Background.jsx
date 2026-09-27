import { useEffect, useRef } from 'react'
import '../styles/background.css'

export default function Background() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (mq.matches) {
        video.pause()
      } else {
        const play = video.play()
        if (play && typeof play.catch === 'function') play.catch(() => {})
      }
    }

    apply()
    document.addEventListener('visibilitychange', apply)
    mq.addEventListener('change', apply)

    return () => {
      document.removeEventListener('visibilitychange', apply)
      mq.removeEventListener('change', apply)
    }
  }, [])

  return (
    <div className="bg" aria-hidden="true">
      <video
        ref={videoRef}
        className="bg__video"
        src={`${import.meta.env.BASE_URL}bg-video.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      <div className="bg__base" />
      <div className="bg__mesh" />
      <div className="bg__blob bg__blob--a" />
      <div className="bg__blob bg__blob--b" />
      <div className="bg__blob bg__blob--c" />
      <div className="bg__grid" />
      <div className="bg__grain" />
      <div className="bg__vignette" />
    </div>
  )
}
