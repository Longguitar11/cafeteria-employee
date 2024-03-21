export interface props {
  className?: string;
}

export type Hovered = { header?: boolean; option?: boolean };

export type DropdownHoverType = {
  categories?: Hovered;
  account?: Hovered;
};

export type OptionsType = {
  className?: string;
  isOpen: boolean;
  //
  setIsOpen: (value: boolean) => void;
};
