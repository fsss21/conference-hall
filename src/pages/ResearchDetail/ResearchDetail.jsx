import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MenuButtons from '../../components/common/MenuButtons'
import styles from './ResearchDetail.module.css'

function ResearchDetail() {
  const { id } = useParams()
  const [research, setResearch] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadResearch = async () => {
      try {
        setLoading(true)
        const response = await fetch('/data/research.json')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const researchId = parseInt(id, 10)
        if (isNaN(researchId)) {
          throw new Error('Invalid research ID')
        }
        const found = data.find(item => item.id === researchId)
        setResearch(found || null)
      } catch (error) {
        console.error('Error loading research:', error)
        setResearch(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadResearch()
    }
  }, [id])

  if (loading) {
    return (
      <div className={styles.researchDetailPage}>
        <MenuButtons />
        <div className={styles.content}>
          <div className={styles.loading}>ЗАГРУЗКА...</div>
        </div>
      </div>
    )
  }

  if (!research) {
    return (
      <div className={styles.researchDetailPage}>
        <MenuButtons />
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>ИССЛЕДОВАНИЕ НЕ НАЙДЕНО</h1>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.researchDetailPage}>
      <MenuButtons />
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>{research.title}</h1>
        <div className={styles.textContent}>
          <div className={styles.researchMeta}>
            <span className={styles.researchDate}>{research.date}</span>
          </div>
          <div className={styles.researchDescription}>
            <h2>Описание</h2>
            <p>{research.description}</p>
          </div>
          <div className={styles.researchFullText}>
            <h2>Полный текст</h2>
            <p>{research.fullText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchDetail

