import { MouseEventHandler } from 'react';

export type DropdownData = {
  id: string;
  value?: string
  label: string;
  url?: string
};

export type DropdownType = {
  className?: string;
  data: DropdownData[];
  //
  onMouseOver: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  onClick: (id: string) => void;
};
