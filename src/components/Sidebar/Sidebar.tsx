import arrowDownIcon from '@/assets/icons/arrow-down.svg'
import briefcaseIcon from '@/assets/svg/briefcase.svg'
import { sidebarOptions, type SidebarOption } from '@/const/sidebar'
import { useNavigate, useLocation } from 'react-router-dom'
import './Sidebar.scss'

interface SidebarProps {
  onClose?: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigate = (path: string) => {
    navigate(path)
    onClose?.()
  }

  const isActive = (path: string): boolean => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  const renderSection = (title: string | null, options: SidebarOption[]) => (
    <>
      {title && <p className="sidebar__section-label">{title}</p>}
      <nav className="sidebar__section" aria-label={title || 'Navigation'}>
        {options.map((option) => (
          <button
            key={option.path}
            className={`sidebar__nav-item ${isActive(option.path) ? 'sidebar__nav-item--active' : ''}`}
            onClick={() => handleNavigate(option.path)}
            aria-current={isActive(option.path) ? 'page' : undefined}
            aria-label={option.name}
            type="button"
          >
            <img src={option.icon} alt="" className="sidebar__nav-item-icon" aria-hidden="true" />
            {option.name}
          </button>
        ))}
      </nav>
    </>
  )

  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      <button className="sidebar__org-button" title="Switch Organization" type="button">
        <img src={briefcaseIcon} alt="" className="sidebar__org-icon" aria-hidden="true" />
        Switch Organization
        <img src={arrowDownIcon} alt="" className="sidebar__org-icon" aria-hidden="true" />
      </button>

      {renderSection(null, sidebarOptions.default)}
      {renderSection('Customers', sidebarOptions.customers)}
      {renderSection('Businesses', sidebarOptions.businesses)}
      {renderSection('Settings', sidebarOptions.settings)}

      <hr className="sidebar__divider" />

      {renderSection(null, sidebarOptions.footer)}

      <p className="sidebar__version">v1.2.0</p>
    </aside>
  )
}
