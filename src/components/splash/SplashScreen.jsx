import { useState, useEffect } from 'react'
import styles from './SplashScreen.module.css'

function SplashScreen({ onComplete }) {
  const [showSkip, setShowSkip] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const skipTimer = setTimeout(() => {
      setShowSkip(true)
    }, 2000)

    const autoTimer = setTimeout(() => {
      handleSkip()
    }, 5000)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(autoTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSkip = () => {
    setIsAnimating(false)
    setTimeout(() => {
      if (onComplete) {
        onComplete()
      }
    }, 300)
  }

  return (
    <div className={`${styles.splashScreen} ${!isAnimating ? styles.fadeOut : ''}`}>
      <div className={styles.splashContent}>
        <div className={styles.logo}>
          <h1>Conference Hall</h1>
          <p>Музейный комплекс</p>
        </div>
        {showSkip && (
            <button className={styles.skipButton} onClick={handleSkip}>
            ПРОПУСТИТЬ
          </button>
        )}
      </div>
    </div>
  )
}

export default SplashScreen

