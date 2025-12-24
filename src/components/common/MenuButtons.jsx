import { useNavigate, useLocation } from 'react-router-dom'
import styles from './MenuButtons.module.css'

function MenuButtons() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleExhibitsClick = () => {
    navigate('/exhibits')
  }

  const handleHistoryClick = () => {
    navigate('/museum-history')
  }

  const handleScientificClick = () => {
    navigate('/scientific-activity')
  }

  const handleEducationClick = () => {
    navigate('/education')
  }

  const isActive = (path) => {
    if (path === '/exhibits') {
      return location.pathname === '/exhibits'
    }
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const handleBack = () => {
    // Возвращаемся назад в истории браузера
    // navigate(-1) возвращает на предыдущую страницу в истории
    // Если истории нет, просто переходим на главную страницу экспонатов
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/exhibits', { replace: true })
    }
  }

  return (
    <div className={styles.menuButtons}>
      <div className={styles.menuButtonsList}>
        <button
          className={`${styles.menuButton} ${isActive('/exhibits') ? styles.active : ''}`}
          onClick={handleExhibitsClick}
        >
          Экспонаты выставки
        </button>
        <button
          className={`${styles.menuButton} ${isActive('/museum-history') ? styles.active : ''}`}
          onClick={handleHistoryClick}
        >
          История создания музейного комплекса
        </button>
        <button
          className={`${styles.menuButton} ${isActive('/scientific-activity') ? styles.active : ''}`}
          onClick={handleScientificClick}
        >
          Научная деятельность
        </button>
        <button
          className={`${styles.menuButton} ${isActive('/education') ? styles.active : ''}`}
          onClick={handleEducationClick}
        >
          Образовательные программы
        </button>
      </div>
      <button
        className={styles.backButton}
        onClick={handleBack}
      >
        Назад
      </button>
    </div>
  )
}

export default MenuButtons

