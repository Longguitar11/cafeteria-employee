import { DishType } from "@/types/dish"
import { DropdownData } from "@/types/dropdown"

export interface Props {
    className?: string
    dishes: DishType[]
    allDishes: DishType[]
    //
    setDishes: (dishes: DishType[]) => void
}

export type CategoryFilterType = {
    className?: string
    cateId: number | null
    //
    setCateId: (cateId: number | null) => void
}