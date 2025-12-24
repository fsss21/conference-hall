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
        const data = await response.json()
        const found = data.find(item => item.id === parseInt(id))
        setResearch(found)
      } catch (error) {
        console.error('Error loading research:', error)
      } finally {
        setLoading(false)
      }
    }

    loadResearch()
  }, [id])

  if (loading) {
    return (
      <div className={styles.researchDetailPage}>
        <MenuButtons />
        <div className={styles.content}>
          <div className={styles.loading}>Загрузка...</div>
        </div>
      </div>
    )
  }

  if (!research) {
    return (
      <div className={styles.researchDetailPage}>
        <MenuButtons />
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Исследование не найдено</h1>
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

