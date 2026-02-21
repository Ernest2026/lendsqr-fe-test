import homeIcon from '@/assets/svg/home.svg'
import usersIcon from '@/assets/svg/user-friends.svg'
import guarantorsIcon from '@/assets/svg/users.svg'
import loansIcon from '@/assets/svg/sack.svg'
import decisionModelsIcon from '@/assets/svg/handshake-regular.svg'
import savingsIcon from '@/assets/svg/piggy-bank.svg'
import loanRequestIcon from '@/assets/svg/loan-request.svg'
import whitelistIcon from '@/assets/svg/user-check.svg'
import karmaIcon from '@/assets/svg/user-times.svg'
import organizationIcon from '@/assets/svg/briefcase.svg'
import savingsProductsIcon from '@/assets/svg/bank.svg'
import feesChargesIcon from '@/assets/svg/coins-solid.svg'
import transactionsIcon from '@/assets/svg/transaction.svg'
import servicesIcon from '@/assets/svg/galaxy.svg'
import serviceAccountIcon from '@/assets/svg/user-cog.svg'
import settlementsIcon from '@/assets/svg/scroll.svg'
import reportsIcon from '@/assets/svg/chart-bar.svg'
import preferencesIcon from '@/assets/svg/sliders-h.svg'
import feesPricingIcon from '@/assets/svg/badge-percent.svg'
import auditLogsIcon from '@/assets/svg/clipboard-list.svg'
import systemsMessagesIcon from '@/assets/svg/tire.svg'
import logoutIcon from '@/assets/svg/sign-out.svg'

export type SidebarOption = {
    name: string
    path: string
    icon: string
}

export type SidebarOptionsType = Record<"default" | "customers" | "businesses" | "settings" | "footer", SidebarOption[]>

export const sidebarOptions: SidebarOptionsType = {
    default: [
        {
            name: "Dashboard",
            path: "/",
            icon: homeIcon,
        }
    ],
    customers: [
        {
            name: "Users",
            path: "/users",
            icon: usersIcon,
        },
        {
            name: "Guarantors",
            path: "/guarantors",
            icon: guarantorsIcon,
        },
        {
            name: "Loans",
            path: "/loans",
            icon: loansIcon,
        },
        {
            name: "Decision Models",
            path: "/decision-models",
            icon: decisionModelsIcon,
        },
        {
            name: "Savings",
            path: "/savings",
            icon: savingsIcon,
        },
        {
            name: "Loan Requests",
            path: "/loan-requests",
            icon: loanRequestIcon,
        },
        {
            name: "Whitelist",
            path: "/whitelist",
            icon: whitelistIcon,
        },
        {
            name: "Karma",
            path: "/karma",
            icon: karmaIcon,
        },
    ],
    businesses: [
        {
            name: "Organization",
            path: "/organization",
            icon: organizationIcon,
        },
        {
            name: "Loan Products",
            path: "/loan-products",
            icon: loanRequestIcon,
        },
        {
            name: "Savings Products",
            path: "/savings-products",
            icon: savingsProductsIcon,
        },
        {
            name: "Fees and Charges",
            path: "/fees-charges",
            icon: feesChargesIcon,
        },
        {
            name: "Transactions",
            path: "/transactions",
            icon: transactionsIcon,
        },
        {
            name: "Services",
            path: "/services",
            icon: servicesIcon,
        },
        {
            name: "Service Account",
            path: "/service-account",
            icon: serviceAccountIcon,
        },
        {
            name: "Settlements",
            path: "/settlements",
            icon: settlementsIcon,
        },
        {
            name: "Reports",
            path: "/reports",
            icon: reportsIcon,
        },
    ],
    settings: [
        {
            name: "Preferences",
            path: "/preferences",
            icon: preferencesIcon,
        },
        {
            name: "Fees and Pricing",
            path: "/fees-pricing",
            icon: feesPricingIcon,
        },
        {
            name: "Audit Logs",
            path: "/audit-logs",
            icon: auditLogsIcon,
        },
        {
            name: "Systems Messages",
            path: "/systems-messages",
            icon: systemsMessagesIcon,
        },
    ],
    footer: [
        {
            name: "Logout",
            path: "/logout",
            icon: logoutIcon,
        },
    ]
}