import { useState } from 'react'
import styles from './VideoCarousel.module.css'

function VideoCarousel({ videos }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!videos || videos.length === 0) {
    return <div className={styles.videoCarousel}>Нет доступных видео</div>
  }

  const currentVideo = videos[currentIndex]
  const hasMultiple = videos.length > 1

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className={styles.videoCarousel}>
      <div className={styles.videoContainer}>
        <video
          className={styles.video}
          controls
          poster={currentVideo.thumbnail}
          src={currentVideo.url}
        >
          Ваш браузер не поддерживает видео.
        </video>
        <div className={styles.videoInfo}>
          <h3>{currentVideo.title}</h3>
        </div>
      </div>

      {hasMultiple && (
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={handlePrev}
          >
            ← Предыдущее
          </button>
          <span className={styles.counter}>
            {currentIndex + 1} / {videos.length}
          </span>
          <button
            className={styles.navButton}
            onClick={handleNext}
          >
            Следующее →
          </button>
        </div>
      )}
    </div>
  )
}

export default VideoCarousel

