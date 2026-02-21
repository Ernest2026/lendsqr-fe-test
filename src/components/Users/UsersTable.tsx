import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './UsersTable.scss'
import sortIcon from '@/assets/icons/filter.svg'
import arrowDownIcon from '@/assets/icons/arrow-down.svg'
import { fetchUsers } from '@/services/userService'
import UserActions from './UserActions'
import UserFilters from './UserFilters'

interface UsersTableProps {
  onUserSelect?: () => void
  setUserPage?: React.Dispatch<React.SetStateAction<'users' | 'userdetails'>>
}

export const UsersTable = ({ setUserPage, onUserSelect }: UsersTableProps) => {
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 10

    const { data: users = [], isLoading: loading, error, refetch } = useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
      staleTime: 5 * 60 * 1000,
      retry: 2
    })

    const handleRowClick = () => {
        onUserSelect?.()
        if (setUserPage) {
            setUserPage('userdetails')
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleRetry = () => {
      refetch()
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem)
    const totalItems = users.length

    const getStatusClass = (status: string): string => {
        return `status-badge status-${status.toLowerCase()}`
    }

    // Loading state
    if (loading) {
      return (
        <div className="users-table-container">
          <div className="table-loading" role="status" aria-live="polite">
            Loading users...
          </div>
        </div>
      )
    }

    // Error state
    if (error) {
      return (
        <div className="users-table-container">
          <div className="table-error" role="alert">
            <p>Error: {error instanceof Error ? error.message : 'Failed to load users'}</p>
            <button onClick={handleRetry} type="button" className="retry-button">
              Retry
            </button>
          </div>
        </div>
      )
    }

    // Empty state
    if (users.length === 0) {
      return (
        <div className="users-table-container">
          <div className="table-empty" role="status">
            No users found
          </div>
        </div>
      )
    }

    return (
        <>
            <div className="users-table-container">
                <div className="table-wrapper">
                    <table className="users-table" role="table" aria-label="Users list table">
                        <thead>
                            <tr>
                                <th scope="col"><span>ORGANIZATION <UserFilters /></span></th>
                                <th scope="col"><span>USERNAME <img src={sortIcon} alt="Sort" /></span></th>
                                <th scope="col"><span>EMAIL <img src={sortIcon} alt="Sort" /></span></th>
                                <th scope="col"><span>PHONE NUMBER <img src={sortIcon} alt="Sort" /></span></th>
                                <th scope="col"><span>DATE JOINED <img src={sortIcon} alt="Sort" /></span></th>
                                <th scope="col"><span>STATUS <img src={sortIcon} alt="Sort" /></span></th>
                                <th scope="col" aria-label="Actions"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    tabIndex={0}
                                    className="users-table__row"
                                >
                                    <td>{user.organization}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.dateJoined}</td>
                                    <td>
                                        <span className={getStatusClass(user.status)} role="status">
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <UserActions
                                          username={user.username}
                                          onViewDetails={handleRowClick}
                                          onBlacklist={() => console.log(`Blacklist ${user.username}`)}
                                          onActivate={() => console.log(`Activate ${user.username}`)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <nav className="pagination-container" aria-label="Table pagination">
                <div className="showing-text">
                    Showing
                    <button type="button" aria-label="Items per page">
                        100
                        <img src={arrowDownIcon} alt="" aria-hidden="true" /></button> out of {totalItems}
                </div>
                <div className="pagination-controls" role="group" aria-label="Page navigation">
                    <button
                        type="button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                        aria-label="Previous page"
                    >
                        <img src={arrowDownIcon} alt="" aria-hidden="true" />
                    </button>
                    {[1, 2, 3].map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => handlePageChange(page)}
                            className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button type="button" className="pagination-btn" disabled aria-label="More pages indicator">
                        ...
                    </button>
                    {[15, 16].map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => handlePageChange(page)}
                            className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => handlePageChange(Math.ceil(totalItems / itemsPerPage))}
                        disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
                        className="pagination-btn"
                        aria-label="Next page"
                    >
                        <img src={arrowDownIcon} alt="" aria-hidden="true" />
                    </button>
                </div>
            </nav>
        </>
    )
}
