import { OptionType } from "@/types/header";

export const optionItems: { key: OptionType, url?: string, text: string }[] = [
    {
        key: 'BESTSELLING',
        url: '/best-selling',
        text: 'Bán chạy'
    },
    {
        key: 'CATEGORY',
        url: '/category',
        text: 'Phân loại'
    },
    {
        key: 'TRANSACTIONHISTORY',
        url: '/transaction-history',
        text: 'Lịch sử giao dịch'
    },
    {
        key: 'ACCOUNT',
        text: 'Tài khoản'
    },
]