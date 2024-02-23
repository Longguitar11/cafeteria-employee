import { SetStateAction } from "react"

export interface Props {
    className?: string
    quantity: number
    //
    setQuantity: (value: SetStateAction<number>) => void
}