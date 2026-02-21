/**
 * User Service
 * Loads user data from local JSON file
 */

import usersData from '@/data/users.json'

export interface UserData {
  id: string
  organization: string
  username: string
  email: string
  phoneNumber: string
  dateJoined: string
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted'
}

export interface UserDetailsData {
  id: string
  fullName: string
  username: string
  tier: number
  amount: number
  accountNumber: string
  phoneNumber: string
  emailAddress: string
  bvn: string
  gender: string
  maritalStatus: string
  children: string
  residenceType: string
  levelOfEducation: string
  employmentStatus: string
  sectorOfEmployment: string
  durationOfEmployment: string
  officeEmail: string
  monthlyIncome: string
  loanRepayment: string
  twitter: string
  facebook: string
  instagram: string
  guarantors: Guarantor[]
}

export interface Guarantor {
  id: string
  fullName: string
  phoneNumber: string
  emailAddress: string
  relationship: string
}

/**
 * Fetch users list from local data
 * Simulates network delay for realistic UX
 */
export async function fetchUsers(): Promise<UserData[]> {
  return new Promise((resolve) => {
    // Simulate network delay (500ms)
    setTimeout(() => {
      try {
        const users = usersData.map((user: Record<string, unknown>) => ({
          id: String(user.id || ''),
          organization: String(user.organization || 'N/A'),
          username: String(user.username || ''),
          email: String(user.email || ''),
          phoneNumber: String(user.phoneNumber || ''),
          dateJoined: String(user.dateJoined || new Date().toLocaleDateString()),
          status: (user.status as 'Active' | 'Inactive' | 'Pending' | 'Blacklisted') || 'Active'
        }))
        resolve(users)
      } catch (error) {
        console.error('Failed to load users:', error)
        resolve([])
      }
    }, 500)
  })
}

/**
 * Fetch single user details from local data
 * Simulates network delay for realistic UX
 * @param userId - User ID to fetch
 */
export async function fetchUserDetails(userId: string): Promise<UserDetailsData> {
  return new Promise((resolve, reject) => {
    // Simulate network delay (500ms)
    setTimeout(() => {
      try {
        const user = usersData.find((u: Record<string, unknown>) => String(u.id) === userId)

        if (!user) {
          reject(new Error('User not found'))
          return
        }

        const userDetails: UserDetailsData = {
          id: String(user.id || ''),
          fullName: String(user.fullName || ''),
          username: String(user.username || ''),
          tier: Number(user.tier) || 1,
          amount: Number(user.amount) || 0,
          accountNumber: String(user.accountNumber || 'N/A'),
          phoneNumber: String(user.phoneNumber || ''),
          emailAddress: String(user.emailAddress || ''),
          bvn: String(user.bvn || 'N/A'),
          gender: String(user.gender || 'Not specified'),
          maritalStatus: String(user.maritalStatus || 'Not specified'),
          children: String(user.children || 'None'),
          residenceType: String(user.residenceType || 'Not specified'),
          levelOfEducation: String(user.levelOfEducation || 'Not specified'),
          employmentStatus: String(user.employmentStatus || 'Not specified'),
          sectorOfEmployment: String(user.sectorOfEmployment || 'Not specified'),
          durationOfEmployment: String(user.durationOfEmployment || 'Not specified'),
          officeEmail: String(user.officeEmail || ''),
          monthlyIncome: String(user.monthlyIncome || '₦0'),
          loanRepayment: String(user.loanRepayment || '0'),
          twitter: String(user.twitter || 'N/A'),
          facebook: String(user.facebook || 'N/A'),
          instagram: String(user.instagram || 'N/A'),
          guarantors: Array.isArray(user.guarantors)
            ? user.guarantors.map((g: Record<string, unknown>) => ({
                id: String(g.id || ''),
                fullName: String(g.fullName || ''),
                phoneNumber: String(g.phoneNumber || ''),
                emailAddress: String(g.emailAddress || ''),
                relationship: String(g.relationship || '')
              }))
            : []
        }
        resolve(userDetails)
      } catch (error) {
        console.error('Failed to fetch user details:', error)
        reject(new Error('Failed to load user details'))
      }
    }, 500)
  })
}
