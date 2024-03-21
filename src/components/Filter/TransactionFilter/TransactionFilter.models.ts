import { DishType } from "@/types/dish"
import { BillInterface } from "@/types/order"

export interface Props {
    className?: string
    bills: BillInterface[]
    allBills: BillInterface[]
    //
    setBills: (bills: BillInterface[]) => void
}