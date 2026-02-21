import searchIcon from '@/assets/icons/search.svg'
import notificationIcon from '@/assets/icons/notification-bell.svg'
import chevronDownIcon from '@/assets/icons/chevron-down.svg'
import logoIcon from '@/assets/icons/lendsqr-logo.svg'
import avatarIcon from '@/assets/avatar.png'
import './Header.scss'

interface HeaderProps {
  userName?: string
  onToggleSidebar?: () => void
  isSidebarOpen?: boolean
}

export default function Header({ userName = 'Admin', onToggleSidebar, isSidebarOpen = false }: HeaderProps) {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: Implement search functionality
  }

  return (
    <header className="header" role="banner">
      <div className="header__left">
        <button
          className={`header__hamburger ${isSidebarOpen ? 'header__hamburger--open' : ''}`}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle navigation"
          type="button"
        >
          <span className="header__hamburger-line" />
          <span className="header__hamburger-line" />
          <span className="header__hamburger-line" />
        </button>
        <img src={logoIcon} alt="Lendsqr Logo" className="header__logo" />
      </div>

      <div className="header__center">
        <form className="header__search" onSubmit={handleSearch}>
          <input
            type="text"
            className="header__search-input"
            placeholder="Search for anything"
            aria-label="Search input"
          />
          <button
            type="submit"
            className="header__search-button"
            aria-label="Search"
          >
            <img src={searchIcon} alt="" className="header__search-icon" aria-hidden="true" />
          </button>
        </form>
      </div>

      <div className="header__right">
        <a href="#docs" className="header__link" aria-label="Documentation">
          Docs
        </a>

        <button
          className="header__icon-button"
          aria-label="Notifications"
          type="button"
        >
          <img src={notificationIcon} alt="" aria-hidden="true" />
        </button>

        <div className="header__user-menu">
          <img src={avatarIcon} alt={`${userName}'s avatar`} className="header__avatar" />
          <span className="header__user-name">{userName}</span>
          <button
            className="header__dropdown-button"
            aria-label="User menu"
            type="button"
          >
            <img src={chevronDownIcon} alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
