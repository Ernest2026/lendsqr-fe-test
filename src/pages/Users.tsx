import Users from "@/components/Users";
import UserDetails from "@/components/Users/UserDetails";
import { useState } from "react";

type UserPageState = 'users' | 'userdetails'

export default function UsersPage() {
    const [userPage, setUserPage] = useState<UserPageState>('users')
    return (
        <>
            {userPage === 'users' && <Users setUserPage={setUserPage} />}
            {userPage === 'userdetails' && <UserDetails setUserPage={setUserPage} />}
        </>
    )
}
