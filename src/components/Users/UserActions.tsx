import { useState, useRef, useEffect } from 'react'
import './UserActions.scss'

interface UserActionsProps {
  username: string
  onViewDetails?: () => void
  onBlacklist?: () => void
  onActivate?: () => void
}

export default function UserActions({ username, onViewDetails, onBlacklist, onActivate }: UserActionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAction = (action?: () => void) => {
    action?.()
    setIsOpen(false)
  }

  return (
    <div className="user-actions" ref={menuRef}>
      <button
        className="user-actions__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Actions for ${username}`}
        aria-expanded={isOpen}
        type="button"
      >
        <img src="/src/assets/icons/three-dots.svg" alt="" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="user-actions__menu" role="menu">
          <button
            className="user-actions__item"
            onClick={() => handleAction(onViewDetails)}
            role="menuitem"
            type="button"
          >
            <img src="/src/assets/svg/npa-view.svg" alt="" aria-hidden="true" />
            View Details
          </button>
          <button
            className="user-actions__item"
            onClick={() => handleAction(onBlacklist)}
            role="menuitem"
            type="button"
          >
            <img src="/src/assets/svg/npa-delete.svg" alt="" aria-hidden="true" />
            Blacklist User
          </button>
          <button
            className="user-actions__item"
            onClick={() => handleAction(onActivate)}
            role="menuitem"
            type="button"
          >
            <img src="/src/assets/svg/npa-user.svg" alt="" aria-hidden="true" />
            Activate User
          </button>
        </div>
      )}
    </div>
  )
}
