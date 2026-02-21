import { useLocation } from 'react-router-dom'
import { sidebarOptions } from '@/const/sidebar'

export default function NotFoundPage() {
  const location = useLocation()
  
  // Find the sidebar option name that matches the current path
  let pageTitle = 'Page'
  
  Object.values(sidebarOptions).forEach(section => {
    const option = section.find(item => item.path === location.pathname)
    if (option) {
      pageTitle = option.name
    }
  })

  return (
    <div className="dashboard-placeholder">
      <h2>{pageTitle} in Progress</h2>
      <p>This page is currently being developed.</p>
    </div>
  )
}

