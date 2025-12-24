import { useState } from 'react'
import styles from './MediaPlayer.module.css'

function MediaPlayer({ items, currentIndex, onNext, onPrev }) {
  if (!items || items.length === 0) {
    return <div className={styles.mediaPlayer}>Нет доступного контента</div>
  }

  const currentItem = items[currentIndex]
  const hasMultiple = items.length > 1

  return (
    <div className={styles.mediaPlayer}>
      <div className={styles.mediaContainer}>
        {currentItem.type === 'video' || !currentItem.type ? (
          <video
            className={styles.media}
            controls
            poster={currentItem.thumbnail}
            src={currentItem.url}
          >
            Ваш браузер не поддерживает видео.
          </video>
        ) : (
          <div className={styles.audioContainer}>
            <img
              src={currentItem.thumbnail}
              alt={currentItem.title}
              className={styles.audioThumbnail}
            />
            <audio className={styles.audio} controls src={currentItem.url}>
              Ваш браузер не поддерживает аудио.
            </audio>
          </div>
        )}
        <div className={styles.mediaInfo}>
          <h3>{currentItem.title}</h3>
          {currentItem.duration && (
            <span className={styles.duration}>{currentItem.duration}</span>
          )}
        </div>
      </div>

      {hasMultiple && (
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={onPrev}
            disabled={currentIndex === 0}
          >
            ← Предыдущее
          </button>
          <span className={styles.counter}>
            {currentIndex + 1} / {items.length}
          </span>
          <button
            className={styles.navButton}
            onClick={onNext}
            disabled={currentIndex === items.length - 1}
          >
            Следующее →
          </button>
        </div>
      )}
      {items.length > 3 && (
        <div className={styles.navigationHint}>
          Используйте стрелки для навигации по всем материалам
        </div>
      )}
    </div>
  )
}

export default MediaPlayer

