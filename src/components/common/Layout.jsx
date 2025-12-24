import { Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  
  // Не показываем навигацию на страницах с экспонатами
  const hideNav = ['/exhibits', '/museum-history', '/scientific-activity', '/education'].some(
    path => location.pathname === path || location.pathname.startsWith(path + '/')
  )

  if (hideNav) {
    return (
      <div className="layout">
        <main className="main-content" style={{ padding: 0 }}>
          <Outlet />
        </main>
      </div>
    )
  }

  return (
    <div className="layout">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

