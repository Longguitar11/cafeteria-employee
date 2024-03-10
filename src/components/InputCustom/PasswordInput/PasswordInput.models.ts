import { Control } from "react-hook-form";

export interface Props {
    className?: string
    control: Control<any>
    name: string
    label?: string
    placeholder?: string
}