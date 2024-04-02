
export interface DishType {
  id?: number,
  categoryId: number,
  categoryName?: string,
  name: string
  description: string
  price: number
  status?: string
  imageProduct: string;
  fileName?: string;
}
