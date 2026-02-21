import { useState, useRef, useEffect } from 'react'
import './UserFilters.scss'
import sortIcon from '@/assets/icons/filter.svg'

interface UserFiltersProps {
    onFilter?: (filters: unknown) => void
    onReset?: () => void
}

export default function UserFilters({ onFilter, onReset }: UserFiltersProps) {
    const [filterOpen, setFilterOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [organization, setOrganization] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState('')
    const [phone, setPhone] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setFilterOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onFilter?.({ organization, username, email, date, phone, status })
    }

    const handleReset = () => {
        setOrganization('')
        setUsername('')
        setEmail('')
        setDate('')
        setPhone('')
        setStatus('')
        onReset?.()
    }

    return (
        <div className="user-filters-container" ref={containerRef}>
            <button
                className="user-filters__toggle"
                onClick={() => setFilterOpen(!filterOpen)}
            >
                <img src={sortIcon} alt="Sort" />
            </button>
            {filterOpen && <div className="user-filters">
                <form className="user-filters__form" onSubmit={handleFilter}>
                    <div className="user-filters__group">
                        <label htmlFor="organization" className="user-filters__label">Organization</label>
                        <select
                            id="organization"
                            className="user-filters__input"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="org1">Organization 1</option>
                            <option value="org2">Organization 2</option>
                            <option value="org3">Organization 3</option>
                        </select>
                    </div>

                    <div className="user-filters__group">
                        <label htmlFor="username" className="user-filters__label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="user-filters__input"
                            placeholder="User"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="user-filters__group">
                        <label htmlFor="email" className="user-filters__label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="user-filters__input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="user-filters__group">
                        <label htmlFor="date" className="user-filters__label">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="user-filters__input"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="user-filters__group">
                        <label htmlFor="phone" className="user-filters__label">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            className="user-filters__input"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="user-filters__group">
                        <label htmlFor="status" className="user-filters__label">Status</label>
                        <select
                            id="status"
                            className="user-filters__input"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                            <option value="blacklisted">Blacklisted</option>
                        </select>
                    </div>

                    <div className="user-filters__actions">
                        <button type="button" className="user-filters__reset" onClick={handleReset}>
                            Reset
                        </button>
                        <button type="submit" className="user-filters__submit">
                            Filter
                        </button>
                    </div>
                </form>
            </div>}
        </div>
    )
}
