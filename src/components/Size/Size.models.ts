import { SizeType } from "@/types/size";

export interface Props {
  className?: string;
  classNameItem?: string;
  value: SizeType;
  //
  onClick: ({size, price} : {size: SizeType, price: string}) => void;
}
