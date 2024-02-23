import { HeaderType } from "@/types/header";

export const sideBarItems: { key: HeaderType, url: string, text: string }[] = [
    {
        key: 'BESTSELLING',
        url: '/best-selling',
        text: 'Bán chạy'
    },
    {
        key: 'CATEGORIES',
        url: '/categories',
        text: 'Phân loại'
    },
    {
        key: 'TRANSACTIONHISTORY',
        url: '/transaction-history',
        text: 'Lịch sử giao dịch'
    },
    {
        key: 'ACCOUNT',
        url: '/account',
        text: 'Tài khoản'
    },
]