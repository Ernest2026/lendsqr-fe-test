import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.scss'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="layout">
      <Header onToggleSidebar={handleToggleSidebar} isSidebarOpen={sidebarOpen} />
      <div className="layout__body">
        <div className={`layout__sidebar-wrapper ${sidebarOpen ? 'layout__sidebar-wrapper--open' : ''}`}>
          <Sidebar onClose={handleCloseSidebar} />
        </div>
        <main className="layout__content" role="main">
          <Outlet />
        </main>
      </div>
      {sidebarOpen && <div className="layout__overlay" onClick={handleCloseSidebar} />}
    </div>
  )
}
