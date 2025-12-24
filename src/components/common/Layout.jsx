import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="layout">
      <main className="main-content" style={{ padding: 0 }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

