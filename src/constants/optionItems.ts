import { OptionType } from "@/types/header";

export const optionItems: { key: OptionType, url?: string, text: string }[] = [
    
    {
        key: 'DISH',
        url: '/dish',
        text: 'Món'
    },
    {
        key: 'CATEGORY',
        url: '/category',
        text: 'Loại'
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