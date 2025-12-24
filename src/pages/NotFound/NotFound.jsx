import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundContent}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>СТРАНИЦА НЕ НАЙДЕНА</h2>
        <p className={styles.errorMessage}>
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link to="/exhibits" className={styles.homeLink}>
          ВЕРНУТЬСЯ НА ГЛАВНУЮ
        </Link>
      </div>
    </div>
  )
}

export default NotFound
