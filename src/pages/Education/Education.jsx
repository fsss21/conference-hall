import { useState, useEffect } from 'react'
import MenuButtons from '../../components/common/MenuButtons'
import styles from './Education.module.css'

function Education() {
  const [activeCategory, setActiveCategory] = useState('lectures')
  const [educationData, setEducationData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentLectureGroup, setCurrentLectureGroup] = useState(0)
  const [currentExcursionGroup, setCurrentExcursionGroup] = useState(0)
  const [currentMasterclassGroup, setCurrentMasterclassGroup] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/data/education.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setEducationData(data)
      } catch (error) {
        console.error('Error loading education data:', error)
        setEducationData(null)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Сбрасываем индексы групп при переключении категорий
  useEffect(() => {
    if (activeCategory === 'lectures') {
      setCurrentLectureGroup(0)
    } else if (activeCategory === 'excursions') {
      setCurrentExcursionGroup(0)
    } else if (activeCategory === 'masterclasses') {
      setCurrentMasterclassGroup(0)
    }
  }, [activeCategory])

  // Группируем элементы по 3
  const itemsPerPage = 3

  // Лекции
  const lectures = educationData?.lectures || []
  const totalLectureGroups = lectures.length > 0 ? Math.ceil(lectures.length / itemsPerPage) : 0
  const currentLectures = lectures.slice(
    currentLectureGroup * itemsPerPage,
    (currentLectureGroup + 1) * itemsPerPage
  )

  const handlePrevLectures = () => {
    setCurrentLectureGroup(prev => (prev > 0 ? prev - 1 : totalLectureGroups - 1))
  }

  const handleNextLectures = () => {
    setCurrentLectureGroup(prev => (prev < totalLectureGroups - 1 ? prev + 1 : 0))
  }

  // Экскурсии
  const excursions = educationData?.excursions || []
  const totalExcursionGroups = excursions.length > 0 ? Math.ceil(excursions.length / itemsPerPage) : 0
  const currentExcursions = excursions.slice(
    currentExcursionGroup * itemsPerPage,
    (currentExcursionGroup + 1) * itemsPerPage
  )

  const handlePrevExcursions = () => {
    setCurrentExcursionGroup(prev => (prev > 0 ? prev - 1 : totalExcursionGroups - 1))
  }

  const handleNextExcursions = () => {
    setCurrentExcursionGroup(prev => (prev < totalExcursionGroups - 1 ? prev + 1 : 0))
  }

  // Мастер-классы
  const masterclasses = educationData?.masterclasses || []
  const totalMasterclassGroups = Math.ceil(masterclasses.length / itemsPerPage)
  const currentMasterclasses = masterclasses.slice(
    currentMasterclassGroup * itemsPerPage,
    (currentMasterclassGroup + 1) * itemsPerPage
  )

  const handlePrevMasterclasses = () => {
    setCurrentMasterclassGroup(prev => (prev > 0 ? prev - 1 : totalMasterclassGroups - 1))
  }

  const handleNextMasterclasses = () => {
    setCurrentMasterclassGroup(prev => (prev < totalMasterclassGroups - 1 ? prev + 1 : 0))
  }

  return (
    <div className={styles.educationPage}>
      <MenuButtons />
      <div className={styles.content}>
        <div className={styles.mainLayout}>
          <div className={styles.rightPanel}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tabButton} ${activeCategory === 'lectures' ? styles.active : ''}`}
                onClick={() => setActiveCategory('lectures')}
              >
                ЛЕКЦИИ
              </button>
              <button
                className={`${styles.tabButton} ${activeCategory === 'excursions' ? styles.active : ''}`}
                onClick={() => setActiveCategory('excursions')}
              >
                ЭКСКУРСИИ
              </button>
              <button
                className={`${styles.tabButton} ${activeCategory === 'masterclasses' ? styles.active : ''}`}
                onClick={() => setActiveCategory('masterclasses')}
              >
                МАСТЕР-КЛАССЫ
              </button>
            </div>
            {loading ? (
              <div className={styles.loading}>ЗАГРУЗКА...</div>
            ) : (
              <>
                {activeCategory === 'lectures' && (
                  <div className={styles.itemsContainer}>
                    {lectures.length > 0 ? (
                      <>
                        <div className={styles.itemsGrid}>
                          {currentLectures.map((lecture) => (
                            <div key={lecture.id} className={styles.mediaCard}>
                              <div className={styles.mediaCardWrapper}>
                                {lecture.type === 'video' ? (
                                  <video
                                    className={styles.mediaCardVideo}
                                    controls
                                    poster={lecture.thumbnail}
                                    src={lecture.url}
                                  >
                                    Ваш браузер не поддерживает видео.
                                  </video>
                                ) : (
                                  <div className={styles.mediaCardAudio}>
                                    <div className={styles.audioIcon}>🎵</div>
                                    <audio
                                      className={styles.audioPlayer}
                                      controls
                                      src={lecture.url}
                                    >
                                      Ваш браузер не поддерживает аудио.
                                    </audio>
                                  </div>
                                )}
                              </div>
                              <div className={styles.mediaCardInfo}>
                                <h3 className={styles.mediaCardTitle}>{lecture.title.toUpperCase()}</h3>
                                {lecture.duration && (
                                  <span className={styles.mediaCardDuration}>{lecture.duration}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {totalLectureGroups > 1 && (
                          <div className={styles.itemsNavigation}>
                            <button
                              className={styles.itemsNavButton}
                              onClick={handlePrevLectures}
                            >
                              ←
                            </button>
                            <span className={styles.itemsCounter}>
                              {currentLectureGroup + 1} / {totalLectureGroups}
                            </span>
                            <button
                              className={styles.itemsNavButton}
                              onClick={handleNextLectures}
                            >
                              →
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={styles.emptyState}>
                        <p>ЛЕКЦИИ ВРЕМЕННО НЕДОСТУПНЫ</p>
                      </div>
                    )}
                  </div>
                )}
                {activeCategory === 'excursions' && (
                  <div className={styles.itemsContainer}>
                    {excursions.length > 0 ? (
                      <>
                        <div className={styles.itemsGrid}>
                          {currentExcursions.map((excursion) => (
                            <div key={excursion.id} className={styles.mediaCard}>
                              <div className={styles.mediaCardWrapper}>
                                {excursion.type === 'video' ? (
                                  <video
                                    className={styles.mediaCardVideo}
                                    controls
                                    poster={excursion.thumbnail}
                                    src={excursion.url}
                                  >
                                    Ваш браузер не поддерживает видео.
                                  </video>
                                ) : (
                                  <div className={styles.mediaCardAudio}>
                                    <div className={styles.audioIcon}>🎵</div>
                                    <audio
                                      className={styles.audioPlayer}
                                      controls
                                      src={excursion.url}
                                    >
                                      Ваш браузер не поддерживает аудио.
                                    </audio>
                                  </div>
                                )}
                              </div>
                              <div className={styles.mediaCardInfo}>
                                <h3 className={styles.mediaCardTitle}>{excursion.title.toUpperCase()}</h3>
                                {excursion.duration && (
                                  <span className={styles.mediaCardDuration}>{excursion.duration}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {totalExcursionGroups > 1 && (
                          <div className={styles.itemsNavigation}>
                            <button
                              className={styles.itemsNavButton}
                              onClick={handlePrevExcursions}
                            >
                              ←
                            </button>
                            <span className={styles.itemsCounter}>
                              {currentExcursionGroup + 1} / {totalExcursionGroups}
                            </span>
                            <button
                              className={styles.itemsNavButton}
                              onClick={handleNextExcursions}
                            >
                              →
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={styles.emptyState}>
                        <p>ЭКСКУРСИИ ВРЕМЕННО НЕДОСТУПНЫ</p>
                      </div>
                    )}
                  </div>
                )}
                {activeCategory === 'masterclasses' && (
                  <div className={styles.itemsContainer}>
                    {masterclasses.length > 0 ? (
                      <>
                        <div className={styles.itemsGrid}>
                          {currentMasterclasses.map((masterclass) => (
                            <div key={masterclass.id} className={styles.mediaCard}>
                              <div className={styles.mediaCardWrapper}>
                                <video
                                  className={styles.mediaCardVideo}
                                  controls
                                  poster={masterclass.thumbnail}
                                  src={masterclass.url}
                                >
                                  Ваш браузер не поддерживает видео.
                                </video>
                              </div>
                              <div className={styles.mediaCardInfo}>
                                <h3 className={styles.mediaCardTitle}>{masterclass.title.toUpperCase()}</h3>
                                {masterclass.duration && (
                                  <span className={styles.mediaCardDuration}>{masterclass.duration}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {masterclasses.length > itemsPerPage && (
                          <div className={styles.itemsNavigation}>
                            <button
                              className={styles.itemsNavButton}
                              onClick={handlePrevMasterclasses}
                            >
                              ←
                            </button>
                            <span className={styles.itemsCounter}>
                              {currentMasterclassGroup + 1} / {totalMasterclassGroups}
                            </span>
                            <button
                              className={styles.itemsNavButton}
                              onClick={handleNextMasterclasses}
                            >
                              →
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={styles.emptyState}>
                        <p>МАСТЕР-КЛАССЫ ВРЕМЕННО НЕДОСТУПНЫ</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education

