import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuButtons from '../../components/common/MenuButtons'
import styles from './ScientificActivity.module.css'

function ScientificActivity() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('research')
  const [researchList, setResearchList] = useState([])
  const [publicationsList, setPublicationsList] = useState([])
  const [conferencesList, setConferencesList] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentVideoGroup, setCurrentVideoGroup] = useState(0)
  const [currentResearchGroup, setCurrentResearchGroup] = useState(0)
  const [currentPublicationGroup, setCurrentPublicationGroup] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [researchRes, publicationsRes, conferencesRes] = await Promise.all([
          fetch('/data/research.json'),
          fetch('/data/publications.json'),
          fetch('/data/conferences.json')
        ])

        const research = await researchRes.json()
        const publications = await publicationsRes.json()
        const conferences = await conferencesRes.json()

        setResearchList(research)
        setPublicationsList(publications)
        setConferencesList(conferences)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Сбрасываем индексы групп при переключении вкладок
  useEffect(() => {
    if (activeTab === 'conferences') {
      setCurrentVideoGroup(0)
    } else if (activeTab === 'research') {
      setCurrentResearchGroup(0)
    } else if (activeTab === 'publications') {
      setCurrentPublicationGroup(0)
    }
  }, [activeTab])

  const handleResearchClick = (researchId) => {
    navigate(`/research/${researchId}`)
  }

  // Группируем элементы по 3
  const itemsPerPage = 3

  // Исследования
  const totalResearchGroups = Math.ceil(researchList.length / itemsPerPage)
  const currentResearchItems = researchList.slice(
    currentResearchGroup * itemsPerPage,
    (currentResearchGroup + 1) * itemsPerPage
  )

  const handlePrevResearch = () => {
    setCurrentResearchGroup(prev => (prev > 0 ? prev - 1 : totalResearchGroups - 1))
  }

  const handleNextResearch = () => {
    setCurrentResearchGroup(prev => (prev < totalResearchGroups - 1 ? prev + 1 : 0))
  }

  // Публикации
  const totalPublicationGroups = Math.ceil(publicationsList.length / itemsPerPage)
  const currentPublicationItems = publicationsList.slice(
    currentPublicationGroup * itemsPerPage,
    (currentPublicationGroup + 1) * itemsPerPage
  )

  const handlePrevPublications = () => {
    setCurrentPublicationGroup(prev => (prev > 0 ? prev - 1 : totalPublicationGroups - 1))
  }

  const handleNextPublications = () => {
    setCurrentPublicationGroup(prev => (prev < totalPublicationGroups - 1 ? prev + 1 : 0))
  }

  // Видео конференций
  const allVideos = conferencesList.flatMap(conference => 
    (conference.videos || []).map(video => ({
      ...video,
      conferenceTitle: conference.title,
      conferenceDate: conference.date
    }))
  )

  const totalVideoGroups = Math.ceil(allVideos.length / itemsPerPage)
  const currentVideos = allVideos.slice(
    currentVideoGroup * itemsPerPage,
    (currentVideoGroup + 1) * itemsPerPage
  )

  const handlePrevVideos = () => {
    setCurrentVideoGroup(prev => (prev > 0 ? prev - 1 : totalVideoGroups - 1))
  }

  const handleNextVideos = () => {
    setCurrentVideoGroup(prev => (prev < totalVideoGroups - 1 ? prev + 1 : 0))
  }

  return (
    <div className={styles.scientificActivityPage}>
      <MenuButtons />
      <div className={styles.content}>
        <div className={styles.mainLayout}>
          <div className={styles.rightPanel}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tabButton} ${activeTab === 'research' ? styles.active : ''}`}
                onClick={() => setActiveTab('research')}
              >
                ИССЛЕДОВАНИЯ
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === 'publications' ? styles.active : ''}`}
                onClick={() => setActiveTab('publications')}
              >
                ПУБЛИКАЦИИ
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === 'conferences' ? styles.active : ''}`}
                onClick={() => setActiveTab('conferences')}
              >
                КОНФЕРЕНЦИИ
              </button>
            </div>
            {loading ? (
              <div className={styles.loading}>ЗАГРУЗКА...</div>
            ) : (
              <>
                {activeTab === 'research' && (
                  <div className={styles.researchContainer}>
                    {researchList.length > 0 ? (
                      <>
                        <div className={styles.researchGrid}>
                          {currentResearchItems.map((research) => (
                            <div
                              key={research.id}
                              className={styles.researchCard}
                              onClick={() => handleResearchClick(research.id)}
                            >
                              <div className={styles.researchCardInfo}>
                                <h3 className={styles.researchCardTitle}>{research.title}</h3>
                                <p className={styles.researchCardDescription}>{research.description}</p>
                                <span className={styles.researchCardDate}>{research.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {researchList.length > itemsPerPage && (
                          <div className={styles.itemsNavigation}>
                            <button
                              className={styles.itemsNavButton}
                              onClick={handlePrevResearch}
                            >
                              ←
                            </button>
                            <span className={styles.itemsCounter}>
                              {currentResearchGroup + 1} / {totalResearchGroups}
                            </span>
                            <button
                              className={styles.itemsNavButton}
                              onClick={handleNextResearch}
                            >
                              →
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={styles.emptyState}>
                        <p>ИССЛЕДОВАНИЯ ВРЕМЕННО НЕДОСТУПНЫ</p>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'publications' && (
                  <div className={styles.publicationsContainer}>
                    {publicationsList.length > 0 ? (
                      <>
                        <div className={styles.publicationsGrid}>
                          {currentPublicationItems.map((publication) => (
                            <div key={publication.id} className={styles.publicationCard}>
                              {publication.type === 'link' ? (
                                <a
                                  href={publication.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.publicationCardLink}
                                >
                                  <div className={styles.publicationCardInfo}>
                                    <h3 className={styles.publicationCardTitle}>{publication.title}</h3>
                                    <p className={styles.publicationCardAuthors}>Авторы: {publication.authors}</p>
                                    <div className={styles.publicationCardFooter}>
                                      <span className={styles.publicationCardDate}>{publication.date}</span>
                                      <span className={styles.linkIcon}>🔗</span>
                                    </div>
                                  </div>
                                </a>
                              ) : (
                                <div className={styles.publicationCardContent}>
                                  {publication.image && (
                                    <div className={styles.publicationCardImageWrapper}>
                                      <img
                                        src={publication.image}
                                        alt={publication.title}
                                        className={styles.publicationCardImage}
                                      />
                                    </div>
                                  )}
                                  <div className={styles.publicationCardInfo}>
                                    <h3 className={styles.publicationCardTitle}>{publication.title}</h3>
                                    <p className={styles.publicationCardText}>{publication.text}</p>
                                    <div className={styles.publicationCardFooter}>
                                      <span className={styles.publicationCardAuthors}>Авторы: {publication.authors}</span>
                                      <span className={styles.publicationCardDate}>{publication.date}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {publicationsList.length > itemsPerPage && (
                          <div className={styles.itemsNavigation}>
                            <button
                              className={styles.itemsNavButton}
                              onClick={handlePrevPublications}
                            >
                              ←
                            </button>
                            <span className={styles.itemsCounter}>
                              {currentPublicationGroup + 1} / {totalPublicationGroups}
                            </span>
                            <button
                              className={styles.itemsNavButton}
                              onClick={handleNextPublications}
                            >
                              →
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={styles.emptyState}>
                        <p>ПУБЛИКАЦИИ ВРЕМЕННО НЕДОСТУПНЫ</p>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'conferences' && (
                  <div className={styles.conferencesContainer}>
                    {allVideos.length > 0 ? (
                      <>
                        <div className={styles.videosGrid}>
                          {currentVideos.map((video, index) => (
                            <div key={`${video.id}-${index}`} className={styles.videoCard}>
                              <div className={styles.videoWrapper}>
                                <video
                                  className={styles.video}
                                  controls
                                  poster={video.thumbnail}
                                  src={video.url}
                                >
                                  Ваш браузер не поддерживает видео.
                                </video>
                              </div>
                              <div className={styles.videoCardInfo}>
                                <h4 className={styles.videoCardTitle}>{video.title}</h4>
                                <p className={styles.videoCardConference}>{video.conferenceTitle}</p>
                                <span className={styles.videoCardDate}>{video.conferenceDate}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {allVideos.length > itemsPerPage && (
                          <div className={styles.videosNavigation}>
                            <button
                              className={styles.videosNavButton}
                              onClick={handlePrevVideos}
                            >
                              ←
                            </button>
                            <span className={styles.videosCounter}>
                              {currentVideoGroup + 1} / {totalVideoGroups}
                            </span>
                            <button
                              className={styles.videosNavButton}
                              onClick={handleNextVideos}
                            >
                              →
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={styles.emptyState}>
                        <p>ВИДЕО КОНФЕРЕНЦИЙ ВРЕМЕННО НЕДОСТУПНЫ</p>
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

export default ScientificActivity

