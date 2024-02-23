export interface props {
  className?: string;
}

export type Hovered = { header?: boolean; sidebar?: boolean };

export type DropdownHoverType = {
  categories?: Hovered;
  bestSelling?: Hovered;
};


