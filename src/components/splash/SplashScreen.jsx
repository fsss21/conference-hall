import { useState, useEffect } from 'react'
import styles from './SplashScreen.module.css'

function SplashScreen({ onComplete }) {
  const [showSkip, setShowSkip] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Показываем кнопку пропустить через 2 секунды, если анимация еще идет
    const skipTimer = setTimeout(() => {
      setShowSkip(true)
    }, 2000)

    // Автоматический переход через 5 секунд
    const autoTimer = setTimeout(() => {
      handleSkip()
    }, 5000)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(autoTimer)
    }
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
            Пропустить
          </button>
        )}
      </div>
    </div>
  )
}

export default SplashScreen

