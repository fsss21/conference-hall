import { useState } from 'react'
import MenuButtons from '../../components/common/MenuButtons'
import Gallery from '../../components/gallery/Gallery'
import styles from './Exhibits.module.css'

function Exhibits() {
  const [selectedCategory, setSelectedCategory] = useState('ceramics')

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  return (
    <div className={styles.exhibitsPage}>
      <MenuButtons />
      <div className={styles.galleryContainer}>
        <Gallery category={selectedCategory} />
      </div>
    </div>
  )
}

export default Exhibits

