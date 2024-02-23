import { MouseEventHandler } from 'react';

export type DropdownData = {
  id: string;
  name: string;
};

export type DropdownType = {
  className?: string;
  data: DropdownData[];
  //
  onMouseOver: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  onClick: (id: string) => void;
};
