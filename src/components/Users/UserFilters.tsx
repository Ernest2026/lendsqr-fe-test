import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './UserFilters.scss'
import sortIcon from '@/assets/icons/filter.svg'
import { FormInput, FormSelect } from '../Form'

interface FilterFormValues {
    organization: string
    username: string
    email: string
    date: string
    phone: string
    status: string
}

interface UserFiltersProps {
    onFilter?: (filters: FilterFormValues) => void
    onReset?: () => void
}

const organizationOptions = [
    { value: '', label: 'Select' },
    { value: 'org1', label: 'Organization 1' },
    { value: 'org2', label: 'Organization 2' },
    { value: 'org3', label: 'Organization 3' },
]

const statusOptions = [
    { value: '', label: 'Select' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'blacklisted', label: 'Blacklisted' },
]

export default function UserFilters({ onFilter, onReset }: UserFiltersProps) {
    const [filterOpen, setFilterOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { control, handleSubmit, reset } = useForm<FilterFormValues>({
        defaultValues: {
            organization: '',
            username: '',
            email: '',
            date: '',
            phone: '',
            status: '',
        }
    })

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setFilterOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleFilter = (data: FilterFormValues) => {
        onFilter?.(data)
    }

    const handleReset = () => {
        reset()
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
            {filterOpen && (
                <div className="user-filters">
                    <form className="user-filters__form" onSubmit={handleSubmit(handleFilter)}>
                        <FormSelect<FilterFormValues>
                            name="organization"
                            control={control}
                            label="Organization"
                            options={organizationOptions}
                        />
                        <FormInput<FilterFormValues>
                            name="username"
                            control={control}
                            label="Username"
                            placeholder="User"
                        />
                        <FormInput<FilterFormValues>
                            name="email"
                            control={control}
                            label="Email"
                            type="email"
                            placeholder="Email"
                        />
                        <FormInput<FilterFormValues>
                            name="date"
                            control={control}
                            label="Date"
                            type="date"
                        />
                        <FormInput<FilterFormValues>
                            name="phone"
                            control={control}
                            label="Phone Number"
                            type="tel"
                            placeholder="Phone Number"
                        />
                        <FormSelect<FilterFormValues>
                            name="status"
                            control={control}
                            label="Status"
                            options={statusOptions}
                        />
                        <div className="user-filters__actions">
                            <button type="button" className="user-filters__reset" onClick={handleReset}>
                                Reset
                            </button>
                            <button type="submit" className="user-filters__submit">
                                Filter
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
