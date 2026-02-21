import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.scss'

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="layout__body">
        <Sidebar />
        <main className="layout__content" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
