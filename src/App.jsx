import { Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import Home from './pages/Home/Home'
import Exhibits from './pages/Exhibits/Exhibits'
import MuseumHistory from './pages/MuseumHistory/MuseumHistory'
import ScientificActivity from './pages/ScientificActivity/ScientificActivity'
import Education from './pages/Education/Education'
import ResearchDetail from './pages/ResearchDetail/ResearchDetail'
import NotFound from './pages/NotFound/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="exhibits" element={<Exhibits />} />
        <Route path="museum-history" element={<MuseumHistory />} />
        <Route path="scientific-activity" element={<ScientificActivity />} />
        <Route path="education" element={<Education />} />
        <Route path="research/:id" element={<ResearchDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

