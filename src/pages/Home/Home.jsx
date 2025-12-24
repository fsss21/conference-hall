import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    // Перенаправляем на страницу экспонатов
    navigate('/exhibits', { replace: true })
  }, [navigate])

  return null
}

export default Home

