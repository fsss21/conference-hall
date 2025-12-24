import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SplashScreen from '../../components/splash/SplashScreen'

function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Проверяем, была ли уже показана заставка в этой сессии
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    if (hasSeenSplash) {
      setShowSplash(false)
      navigate('/exhibits')
    }
  }, [navigate])

  const handleSplashComplete = () => {
    setShowSplash(false)
    sessionStorage.setItem('hasSeenSplash', 'true')
    navigate('/exhibits')
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return null
}

export default Home

