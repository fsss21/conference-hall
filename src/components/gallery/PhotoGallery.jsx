import { useState, useEffect } from 'react'
import styles from './PhotoGallery.module.css'

function PhotoGallery({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setCurrentIndex(0)
  }, [photos])

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  if (!photos || photos.length === 0) {
    return null
  }

  const currentPhoto = photos[currentIndex]
  const totalPhotos = photos.length

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPhotos - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPhotos - 1 ? prev + 1 : 0))
  }

  const handleImageClick = () => {
    setIsFullscreen(true)
  }

  const handleCloseFullscreen = () => {
    setIsFullscreen(false)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return
      
      if (e.key === 'Escape') {
        setIsFullscreen(false)
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPhotos - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < totalPhotos - 1 ? prev + 1 : 0))
      }
    }

    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isFullscreen, totalPhotos])

  return (
    <>
      <div className={styles.photoGallery}>
        <div className={styles.photoContainer}>
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className={styles.photoImage}
            onClick={handleImageClick}
          />
          {totalPhotos > 1 && (
            <>
              <button
                className={`${styles.navArrow} ${styles.navArrowPrev}`}
                onClick={handlePrev}
              >
                ←
              </button>
              <button
                className={`${styles.navArrow} ${styles.navArrowNext}`}
                onClick={handleNext}
              >
                →
              </button>
              <div className={styles.photoCounter}>
                {currentIndex + 1} / {totalPhotos}
              </div>
            </>
          )}
        </div>
        <div className={styles.photoInfo}>
          <h3 className={styles.photoTitle}>{currentPhoto.title}</h3>
          {currentPhoto.description && (
            <p className={styles.photoDescription}>{currentPhoto.description}</p>
          )}
        </div>
      </div>

      {isFullscreen && (
        <div className={styles.fullscreenOverlay} onClick={handleCloseFullscreen}>
          <button className={styles.fullscreenClose} onClick={handleCloseFullscreen}>
            ×
          </button>
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className={styles.fullscreenImage}
            onClick={(e) => e.stopPropagation()}
          />
          {totalPhotos > 1 && (
            <>
              <button
                className={`${styles.fullscreenNavArrow} ${styles.fullscreenNavPrev}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
              >
                ←
              </button>
              <button
                className={`${styles.fullscreenNavArrow} ${styles.fullscreenNavNext}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
              >
                →
              </button>
              <div className={styles.fullscreenCounter}>
                {currentIndex + 1} / {totalPhotos}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default PhotoGallery

