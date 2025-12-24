import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundContent}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>Страница не найдена</h2>
        <p className={styles.errorMessage}>
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link to="/" className={styles.homeLink}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}

export default NotFound
