import { MouseEventHandler } from "react"

export interface Props {
    className?: string
    quantity: number
    //
    onClick: MouseEventHandler<HTMLDivElement>
}