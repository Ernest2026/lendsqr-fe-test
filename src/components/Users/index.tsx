import { UsersTable } from './UsersTable'
import usersIcon from '@/assets/svg/np-users.svg'
import activeUsersIcon from '@/assets/svg/np-active-users.svg'
import usersWithLoanIcon from '@/assets/svg/np-database.svg'
import usersWithSavingsIcon from '@/assets/svg/np-money-stacks.svg'
import './Users.scss'

interface UserCardItem {
    name: string
    number: string
    icon: string
}

interface UsersProps {
    setUserPage: React.Dispatch<React.SetStateAction<'users' | 'userdetails'>>
}

const userCardItems: UserCardItem[] = [
    {
        name: "Users",
        number: "2,453",
        icon: usersIcon
    },
    {
        name: "Active users",
        number: "2,453",
        icon: activeUsersIcon
    },
    {
        name: "Users with loans",
        number: "12,453",
        icon: usersWithLoanIcon
    },
    {
        name: "Users with savings",
        number: "102,453",
        icon: usersWithSavingsIcon
    },
]

export default function Users({ setUserPage }: UsersProps) {
    return (
        <div className="users-page">
            <h1 className="users-page__title">Users</h1>

            {/* Users stats */}
            <div className="users-stats-grid" role="region" aria-label="User statistics">
                {
                    userCardItems.map((item, idx) => (
                        <div key={idx} className="user-stat-card">
                            <div className="user-stat-card__icon" role="img" aria-label={`${item.name} icon`}>
                                <img src={item.icon} alt="" aria-hidden="true" />
                            </div>
                            <p className="user-stat-card__name">{item.name}</p>
                            <p className="user-stat-card__number">{item.number}</p>
                        </div>
                    ))
                }
            </div>

            {/* Users table */}
            <UsersTable setUserPage={setUserPage} />
        </div>
    )
}
