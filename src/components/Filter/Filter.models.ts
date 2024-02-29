import { DishInterface } from "@/types/dish"
import { DropdownData } from "@/types/dropdown"

export interface Props {
    className?: string
    dishes: DishInterface[]
    //
    setDishes: (dishes: DishInterface[]) => void
}

export type CategoryFilterType = {
    className?: string
    cateId: string
    categories: DropdownData[]
    //
    setCateId: (cateId: string) => void
}