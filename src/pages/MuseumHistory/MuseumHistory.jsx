import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuButtons from '../../components/common/MenuButtons'
import PhotoGallery from '../../components/gallery/PhotoGallery'
import styles from './MuseumHistory.module.css'

function MuseumHistory() {
  const navigate = useNavigate()
  const [historyData, setHistoryData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/data/museum-history.json')
        const data = await response.json()
        setHistoryData(data)
      } catch (error) {
        console.error('Error loading museum history data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className={styles.museumHistoryPage}>
      <MenuButtons />
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : historyData ? (
          <>
            <div className={styles.textContent}>
              {historyData.text.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            {historyData.photos && historyData.photos.length > 0 && (
              <div className={styles.photoSection}>
                <PhotoGallery photos={historyData.photos} />
              </div>
            )}
          </>
        ) : (
          <div className={styles.error}>Не удалось загрузить данные</div>
        )}
      </div>
    </div>
  )
}

export default MuseumHistory

