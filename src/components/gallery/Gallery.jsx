import { useState, useEffect } from 'react'
import ExhibitModal from '../modals/ExhibitModal'
import styles from './Gallery.module.css'

function Gallery({ category }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedExhibit, setSelectedExhibit] = useState(null)
  const [exhibitsData, setExhibitsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 9

  // Загружаем данные из JSON файла
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/data/${category}.json`)
        if (!response.ok) {
          throw new Error('Failed to load data')
        }
        const data = await response.json()
        setExhibitsData(data)
      } catch (error) {
        console.error('Error loading exhibits data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [category])

  if (loading || !exhibitsData) {
    return (
      <div className={styles.gallery}>
        <div className={styles.galleryGrid}>
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className={styles.galleryItem} style={{ opacity: 0.3 }}>
              <div style={{ width: '100%', height: '140px', background: '#f0f0f0' }}></div>
              <div className={styles.galleryItemTitle} style={{ background: '#f5f5f5' }}></div>
            </div>
          ))}
        </div>
        <div className={styles.galleryNavigation} style={{ opacity: 0.3 }}>
          <div className={styles.navArrow} style={{ pointerEvents: 'none' }}>←</div>
          <div className={styles.pageIndicator}>Загрузка...</div>
          <div className={styles.navArrow} style={{ pointerEvents: 'none' }}>→</div>
        </div>
      </div>
    )
  }

  // Получаем все экспонаты из всех подкатегорий
  const exhibits = getAllExhibits(exhibitsData)
  
  const totalPages = Math.ceil(exhibits.length / itemsPerPage)
  const currentExhibits = exhibits.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  const handleExhibitClick = (exhibit) => {
    setSelectedExhibit(exhibit)
  }

  const handleCloseModal = () => {
    setSelectedExhibit(null)
  }

  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.galleryGrid}>
          {currentExhibits.map((exhibit, index) => (
            <div 
              key={exhibit.id} 
              className={styles.galleryItem}
              onClick={() => handleExhibitClick(exhibit)}
            >
              <img 
                src={exhibit.images[0]} 
                alt={exhibit.name}
                loading="lazy"
              />
              <p className={styles.galleryItemTitle}>{exhibit.name}</p>
            </div>
          ))}
        </div>

        <div className={styles.galleryNavigation} style={{ opacity: totalPages > 1 ? 1 : 0.3 }}>
          <button 
            className={styles.navArrow} 
            onClick={handlePrevPage}
            disabled={totalPages <= 1}
            style={{ opacity: totalPages > 1 ? 1 : 0.5, cursor: totalPages > 1 ? 'pointer' : 'not-allowed' }}
          >
            ←
          </button>
          <span className={styles.pageIndicator}>
            {totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : '0 / 0'}
          </span>
          <button 
            className={styles.navArrow} 
            onClick={handleNextPage}
            disabled={totalPages <= 1}
            style={{ opacity: totalPages > 1 ? 1 : 0.5, cursor: totalPages > 1 ? 'pointer' : 'not-allowed' }}
          >
            →
          </button>
        </div>
      </div>

      {selectedExhibit && (
        <ExhibitModal 
          exhibit={selectedExhibit} 
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}

// Функция для получения всех экспонатов из всех подкатегорий
function getAllExhibits(exhibitsData) {
  if (!exhibitsData) return []
  
  // Собираем все экспонаты из всех подкатегорий в один массив
  const allExhibits = []
  Object.keys(exhibitsData).forEach(key => {
    if (Array.isArray(exhibitsData[key])) {
      allExhibits.push(...exhibitsData[key])
    }
  })
  
  return allExhibits
}

export default Gallery

