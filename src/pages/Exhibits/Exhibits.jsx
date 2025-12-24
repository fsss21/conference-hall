import MenuButtons from '../../components/common/MenuButtons'
import Gallery from '../../components/gallery/Gallery'
import styles from './Exhibits.module.css'

function Exhibits() {
  return (
    <div className={styles.exhibitsPage}>
      <MenuButtons />
      <div className={styles.galleryContainer}>
        <Gallery category="ceramics" />
      </div>
    </div>
  )
}

export default Exhibits

